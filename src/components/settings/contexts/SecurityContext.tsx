/**
 * Security Context (SCOPED)
 * Manages password, sessions, privacy settings, analytics
 * Only used in Settings > Security pages
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Session,
  PrivacySettings,
  AnalyticsSettings,
  DEFAULT_SETTINGS,
} from '../types';
import { toast } from 'sonner@2.0.3';

interface SecurityContextValue {
  // State
  sessions: Session[];
  privacy: PrivacySettings;
  analytics: AnalyticsSettings;
  isLoading: boolean;
  
  // Actions
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  logOutSession: (sessionId: string) => void;
  updatePrivacy: (updates: Partial<PrivacySettings>) => void;
  updateAnalytics: (enabled: boolean) => void;
  deleteAccount: (email: string) => Promise<void>;
}

const SecurityContext = createContext<SecurityContextValue | undefined>(undefined);

const STORAGE_KEY = 'listlyup_security_settings';

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [privacy, setPrivacy] = useState<PrivacySettings>(DEFAULT_SETTINGS.privacy);
  const [analytics, setAnalytics] = useState<AnalyticsSettings>(DEFAULT_SETTINGS.analytics);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setSessions(data.sessions || DEFAULT_SETTINGS.sessions);
          setPrivacy(data.privacy || DEFAULT_SETTINGS.privacy);
          setAnalytics(data.analytics || DEFAULT_SETTINGS.analytics);
        } else {
          setSessions(DEFAULT_SETTINGS.sessions);
          setPrivacy(DEFAULT_SETTINGS.privacy);
          setAnalytics(DEFAULT_SETTINGS.analytics);
        }
      } catch (error) {
        console.error('Failed to load security settings:', error);
        setSessions(DEFAULT_SETTINGS.sessions);
        setPrivacy(DEFAULT_SETTINGS.privacy);
        setAnalytics(DEFAULT_SETTINGS.analytics);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Auto-save
  useEffect(() => {
    if (!isLoading) {
      const data = { sessions, privacy, analytics };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [sessions, privacy, analytics, isLoading]);

  const changePassword = async (currentPassword: string, newPassword: string) => {
    // TODO: Implement actual password change
    await new Promise(resolve => setTimeout(resolve, 500));
    toast.success('Password changed successfully');
  };

  const logOutSession = (sessionId: string) => {
    if (sessions.find(s => s.id === sessionId)?.isCurrentDevice) {
      toast.error('Cannot log out current device');
      return;
    }
    
    setSessions(prev => prev.filter(s => s.id !== sessionId));
    toast.success('Session logged out');
  };

  const updatePrivacy = (updates: Partial<PrivacySettings>) => {
    setPrivacy(prev => ({ ...prev, ...updates }));
  };

  const updateAnalytics = (enabled: boolean) => {
    if (analytics.forced) {
      toast.error('Analytics cannot be changed (managed by platform)');
      return;
    }
    
    setAnalytics(prev => ({ ...prev, enabled }));
    toast.success(enabled ? 'Analytics enabled' : 'Analytics disabled');
  };

  const deleteAccount = async (email: string) => {
    // TODO: Implement actual account deletion
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Account deletion request submitted');
  };

  return (
    <SecurityContext.Provider
      value={{
        sessions,
        privacy,
        analytics,
        isLoading,
        changePassword,
        logOutSession,
        updatePrivacy,
        updateAnalytics,
        deleteAccount,
      }}
    >
      {children}
    </SecurityContext.Provider>
  );
}

export function useSecurity() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  return context;
}
