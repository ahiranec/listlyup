/**
 * Features Context (GLOBAL)
 * Manages Smart Features state across the entire app
 * Used by: Settings, Publish Flow, Search, Feed
 */

import { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import {
  Plan,
  AdminFeatureConfig,
  UserFeaturePreferences,
  FeatureState,
  FeatureBadge,
  FeatureDisplayState,
  SMART_FEATURES,
} from '../components/settings/types';
import { toast } from 'sonner@2.0.3';

interface FeaturesContextValue {
  // State
  adminConfig: AdminFeatureConfig | null;
  userPrefs: UserFeaturePreferences | null;
  isLoading: boolean;
  
  // Computed
  getFeatureState: (featureId: string) => FeatureState | null;
  isFeatureActive: (featureId: string) => boolean;
  
  // Actions
  toggleFeature: (featureId: string, enabled: boolean) => void;
  refreshFeatureStates: () => void;
}

const FeaturesContext = createContext<FeaturesContextValue | undefined>(undefined);

const STORAGE_KEY_ADMIN = 'listlyup_admin_feature_config';
const STORAGE_KEY_USER = 'listlyup_user_feature_prefs';

// Mock Admin Config (in real app, this comes from API)
const DEFAULT_ADMIN_CONFIG: AdminFeatureConfig = {
  features: {
    aiPublishingAssistance: {
      available: true,
      forcedOn: false,
      allowedPlans: ['Free', 'Plus', 'Pro'],
    },
    photoEnhancement: {
      available: true,
      forcedOn: false,
      allowedPlans: ['Plus', 'Pro'],
    },
    voiceToText: {
      available: true,
      forcedOn: false,
      allowedPlans: ['Plus', 'Pro'],
    },
    smartFilters: {
      available: true,
      forcedOn: false,
      allowedPlans: ['Free', 'Plus', 'Pro'],
    },
    personalizedFeed: {
      available: true,
      forcedOn: false,
      allowedPlans: ['Pro'],
    },
  },
};

const DEFAULT_USER_PREFS: UserFeaturePreferences = {
  aiPublishingAssistance: true,
  photoEnhancement: true,
  voiceToText: true,
  smartFilters: true,
  personalizedFeed: true,
};

export function FeaturesProvider({ children }: { children: ReactNode }) {
  const [adminConfig, setAdminConfig] = useState<AdminFeatureConfig | null>(null);
  const [userPrefs, setUserPrefs] = useState<UserFeaturePreferences | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        // Load admin config (in real app, fetch from API)
        const savedAdminConfig = localStorage.getItem(STORAGE_KEY_ADMIN);
        setAdminConfig(
          savedAdminConfig ? JSON.parse(savedAdminConfig) : DEFAULT_ADMIN_CONFIG
        );
        
        // Load user prefs
        const savedUserPrefs = localStorage.getItem(STORAGE_KEY_USER);
        setUserPrefs(
          savedUserPrefs ? JSON.parse(savedUserPrefs) : DEFAULT_USER_PREFS
        );
      } catch (error) {
        console.error('Failed to load feature config:', error);
        setAdminConfig(DEFAULT_ADMIN_CONFIG);
        setUserPrefs(DEFAULT_USER_PREFS);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // PHASE 1 & 3: Listen to SuperAdmin feature changes (same-tab sync)
  useEffect(() => {
    const handleFeatureChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log('[FEATURES CONTEXT] SuperAdmin features changed (same-tab sync)');
      
      // Reload admin config from localStorage
      try {
        const savedAdminConfig = localStorage.getItem(STORAGE_KEY_ADMIN);
        if (savedAdminConfig) {
          const newConfig = JSON.parse(savedAdminConfig);
          setAdminConfig(newConfig);
          toast.info('Feature settings updated by admin');
          console.log('[FEATURES CONTEXT] Reloaded admin config:', newConfig);
        }
      } catch (error) {
        console.error('[FEATURES CONTEXT] Failed to reload admin config:', error);
      }
    };
    
    window.addEventListener('superadmin-features-changed', handleFeatureChange);
    return () => window.removeEventListener('superadmin-features-changed', handleFeatureChange);
  }, []);

  // PHASE 3: Listen to cross-tab localStorage changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY_ADMIN && e.newValue) {
        console.log('[FEATURES CONTEXT] Admin config changed (cross-tab sync)');
        
        try {
          const newConfig = JSON.parse(e.newValue);
          setAdminConfig(newConfig);
          toast.info('Feature settings updated by admin');
          console.log('[FEATURES CONTEXT] Reloaded admin config (cross-tab):', newConfig);
        } catch (error) {
          console.error('[FEATURES CONTEXT] Failed to parse new admin config:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Plan change detection
  const prevPlanRef = useRef<Plan>('Free');
  
  useEffect(() => {
    // In real app, get from useAuth() or ProfileContext
    // For now, get from localStorage profile
    try {
      const profileData = localStorage.getItem('listlyup_profile_data');
      if (profileData) {
        const profile = JSON.parse(profileData);
        const currentPlan = profile.plan as Plan;
        
        if (prevPlanRef.current !== currentPlan) {
          toast.warning('Your plan changed. Some features may be locked.');
          prevPlanRef.current = currentPlan;
        }
      }
    } catch (error) {
      console.error('Plan detection error:', error);
    }
  });

  const getUserPlan = (): Plan => {
    try {
      const profileData = localStorage.getItem('listlyup_profile_data');
      if (profileData) {
        const profile = JSON.parse(profileData);
        return profile.plan as Plan || 'Free';
      }
    } catch (error) {
      console.error('Failed to get user plan:', error);
    }
    return 'Free';
  };

  const getBadgeForPlans = (allowedPlans: Plan[]): FeatureBadge => {
    if (allowedPlans.includes('Free')) return 'Free';
    if (allowedPlans.includes('Plus')) return 'Plus';
    if (allowedPlans.includes('Pro')) return 'Pro';
    return 'Unavailable';
  };

  const getRequiredPlanBadge = (allowedPlans: Plan[], userPlan: Plan): FeatureBadge => {
    if (allowedPlans.includes('Plus')) return 'Plus';
    if (allowedPlans.includes('Pro')) return 'Pro';
    return 'Unavailable';
  };

  const getFeatureState = (featureId: string): FeatureState | null => {
    // LOADING STATE
    if (!adminConfig || !userPrefs) {
      return null;
    }
    
    const userPlan = getUserPlan();
    
    // SAFE DEFAULTS (if config missing)
    const config = adminConfig.features[featureId] ?? {
      available: true,
      forcedOn: false,
      allowedPlans: ['Free', 'Plus', 'Pro'] as Plan[],
    };
    
    const planAllowed = config.allowedPlans.includes(userPlan);
    const userEnabled = userPrefs[featureId] ?? true;  // Default ON
    
    // COMPUTE STATE
    const available = config.available;
    const forcedOn = config.forcedOn;
    const canToggle = available && !forcedOn && planAllowed;
    const isActive = available && (forcedOn || (planAllowed && userEnabled));
    
    // DISPLAY STATE
    let displayState: FeatureDisplayState;
    let badge: FeatureBadge;
    let helperText: string | undefined;
    
    if (!available) {
      displayState = 'disabled';
      badge = 'Unavailable';
      helperText = 'Temporarily disabled by the platform';
    } else if (forcedOn) {
      displayState = 'forced';
      badge = getBadgeForPlans(config.allowedPlans);
      helperText = 'Managed by ListlyUp';
    } else if (!planAllowed) {
      displayState = 'locked';
      badge = getRequiredPlanBadge(config.allowedPlans, userPlan);
      helperText = `Upgrade to ${badge} to unlock`;
    } else {
      displayState = 'available';
      badge = getBadgeForPlans(config.allowedPlans);
      helperText = undefined;
    }
    
    return {
      available,
      forcedOn,
      planAllowed,
      userEnabled,
      canToggle,
      isActive,
      displayState,
      badge,
      helperText,
    };
  };

  const isFeatureActive = (featureId: string): boolean => {
    const state = getFeatureState(featureId);
    return state?.isActive ?? false;
  };

  const toggleFeature = (featureId: string, enabled: boolean) => {
    if (!userPrefs) return;
    
    // Optimistic update
    const newPrefs = { ...userPrefs, [featureId]: enabled };
    setUserPrefs(newPrefs);
    
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newPrefs));
      
      // TODO: In real app, save to API
      // api.updateFeaturePreference(featureId, enabled)
      //   .catch(error => {
      //     // Rollback on error
      //     setUserPrefs(userPrefs);
      //     toast.error('Failed to update setting');
      //   });
    } catch (error) {
      console.error('Failed to save feature preference:', error);
      toast.error('Failed to save setting');
      setUserPrefs(userPrefs); // Rollback
    }
  };

  const refreshFeatureStates = () => {
    // Force re-render and re-fetch
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  };

  return (
    <FeaturesContext.Provider
      value={{
        adminConfig,
        userPrefs,
        isLoading,
        getFeatureState,
        isFeatureActive,
        toggleFeature,
        refreshFeatureStates,
      }}
    >
      {children}
    </FeaturesContext.Provider>
  );
}

export function useFeatures() {
  const context = useContext(FeaturesContext);
  if (!context) {
    throw new Error('useFeatures must be used within FeaturesProvider');
  }
  return context;
}