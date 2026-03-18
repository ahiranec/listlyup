/**
 * Settings Module - Type Definitions
 * Central types for modular Settings system
 */

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export type Plan = 'Free' | 'Plus' | 'Pro';

export interface AdminFeatureConfig {
  features: {
    [featureId: string]: {
      available: boolean;    // Globally enabled/disabled
      forcedOn: boolean;     // User cannot turn off
      allowedPlans: Plan[];  // Which plans can use this
    };
  };
}

export interface UserFeaturePreferences {
  [featureId: string]: boolean;  // User's ON/OFF choice
}

export type FeatureDisplayState = 'available' | 'locked' | 'forced' | 'disabled';
export type FeatureBadge = 'Free' | 'Plus' | 'Pro' | 'Unavailable';

export interface FeatureState {
  available: boolean;      // Admin enabled globally
  forcedOn: boolean;       // Admin forced ON
  planAllowed: boolean;    // User's plan allows
  userEnabled: boolean;    // User's preference
  
  // Computed properties
  canToggle: boolean;      // User can change toggle
  isActive: boolean;       // Feature is currently active
  displayState: FeatureDisplayState;
  
  // UI helpers
  badge: FeatureBadge;
  helperText?: string;     // "Managed by ListlyUp" or "Upgrade to unlock"
}

export interface SmartFeature {
  id: string;
  title: string;
  description: string;
  category: 'ai-publishing' | 'content-creation' | 'discovery-personalization';
  icon: string;
  allowedPlans: Plan[];
}

// ============================================================================
// SECURITY & PRIVACY
// ============================================================================

export interface Session {
  id: string;
  device: string;          // "iPhone 14 Pro", "Chrome on Mac"
  location: string;        // "Santiago"
  lastActive: string;      // ISO timestamp
  isCurrentDevice: boolean;
}

export type ProfileVisibility = 'everyone' | 'registered' | 'contacts';
export type ContactPermission = 'everyone' | 'verified' | 'none';

export interface PrivacySettings {
  profileVisibility: ProfileVisibility;
  allowMessages: ContactPermission;
  showOnline: boolean;
  showLastSeen: boolean;
  showReadReceipts: boolean;
}

export interface AnalyticsSettings {
  enabled: boolean;
  forced: boolean;  // Admin forced ON
}

// ============================================================================
// NOTIFICATIONS
// ============================================================================

export interface NotificationSettings {
  push: {
    newMessages: boolean;
    listingUpdates: boolean;
    tradeOffers: boolean;
    priceChanges: boolean;
    nearbyListings: boolean;
    savedSearchAlerts: boolean;
  };
  email: {
    dailyDigest: boolean;
    weeklySummary: boolean;
    marketing: boolean;
    productAnnouncements: boolean;
  };
  inApp: {
    sound: boolean;
    vibration: boolean;
    badgeCount: boolean;
  };
}

// ============================================================================
// DATA & PREFERENCES
// ============================================================================

export interface SavedSearch {
  id: string;
  query: string;
  location: string;
  priceRange?: string;
  notifyEnabled: boolean;
  createdAt: string;
}

export interface StorageInfo {
  cacheSize: number;   // bytes
  imageSize: number;   // bytes
  dataSize: number;    // bytes
  total: number;       // bytes
}

// ============================================================================
// SETTINGS DATA (Combined)
// ============================================================================

export interface SettingsData {
  // Features (global)
  features: UserFeaturePreferences;
  
  // Security
  password: {
    lastChanged?: string;
  };
  sessions: Session[];
  privacy: PrivacySettings;
  analytics: AnalyticsSettings;
  
  // Notifications
  notifications: NotificationSettings;
  
  // Data
  savedSearches: SavedSearch[];
  storage: StorageInfo;
}

// ============================================================================
// DEFAULTS
// ============================================================================

export const DEFAULT_SETTINGS: SettingsData = {
  features: {
    aiPublishingAssistance: true,
    photoEnhancement: true,
    voiceToText: true,
    smartFilters: true,
    personalizedFeed: true,
  },
  
  password: {},
  
  sessions: [
    {
      id: 'current',
      device: 'iPhone 14 Pro',
      location: 'Santiago',
      lastActive: new Date().toISOString(),
      isCurrentDevice: true,
    },
  ],
  
  privacy: {
    profileVisibility: 'registered',
    allowMessages: 'everyone',
    showOnline: true,
    showLastSeen: false,
    showReadReceipts: true,
  },
  
  analytics: {
    enabled: true,
    forced: false,
  },
  
  notifications: {
    push: {
      newMessages: true,
      listingUpdates: true,
      tradeOffers: true,
      priceChanges: false,
      nearbyListings: true,
      savedSearchAlerts: true,
    },
    email: {
      dailyDigest: true,
      weeklySummary: false,
      marketing: false,
      productAnnouncements: true,
    },
    inApp: {
      sound: true,
      vibration: true,
      badgeCount: true,
    },
  },
  
  savedSearches: [
    {
      id: '1',
      query: 'iPhone 14 Pro',
      location: 'Santiago',
      priceRange: 'Under $500',
      notifyEnabled: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      query: 'Mountain Bike',
      location: 'Providencia',
      notifyEnabled: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      query: 'Apartment for rent',
      location: 'Las Condes',
      priceRange: '$500-$1000',
      notifyEnabled: true,
      createdAt: new Date().toISOString(),
    },
  ],
  
  storage: {
    cacheSize: 45200000,      // 45.2 MB
    imageSize: 120800000,     // 120.8 MB
    dataSize: 8500000,        // 8.5 MB
    total: 174500000,         // 174.5 MB
  },
};

// ============================================================================
// FEATURE CONFIGURATION
// ============================================================================

export const SMART_FEATURES: SmartFeature[] = [
  {
    id: 'aiPublishingAssistance',
    title: 'AI Publishing Assistance',
    description: 'Suggests titles, prices, categories, and tags while you publish. You can always edit everything.',
    category: 'ai-publishing',
    icon: '🤖',
    allowedPlans: ['Free', 'Plus', 'Pro'],
  },
  {
    id: 'photoEnhancement',
    title: 'Photo Enhancement',
    description: 'Auto-enhance listing photos with marketplace-optimized filters',
    category: 'content-creation',
    icon: '📸',
    allowedPlans: ['Plus', 'Pro'],
  },
  {
    id: 'voiceToText',
    title: 'Voice-to-Text',
    description: 'Dictate descriptions and messages',
    category: 'content-creation',
    icon: '🎤',
    allowedPlans: ['Plus', 'Pro'],
  },
  {
    id: 'smartFilters',
    title: 'Smart Filters',
    description: 'Advanced search filters powered by AI',
    category: 'discovery-personalization',
    icon: '🔍',
    allowedPlans: ['Free', 'Plus', 'Pro'],
  },
  {
    id: 'personalizedFeed',
    title: 'Personalized Feed',
    description: 'AI-powered recommendations based on your activity and preferences',
    category: 'discovery-personalization',
    icon: '✨',
    allowedPlans: ['Pro'],
  },
];

// ============================================================================
// NAVIGATION
// ============================================================================

export type SettingsView =
  | 'hub'
  | 'password-security'
  | 'privacy-settings'
  | 'analytics-insights'
  | 'delete-account'
  | 'notifications'
  | 'smart-features'
  | 'saved-searches'
  | 'data-storage'
  | 'about'
  | 'help-support'; // ✅ PHASE 3.1: Help & Support page

export interface SettingsNavigation {
  navigateToHub: () => void;
  navigateToPasswordSecurity: () => void;
  navigateToPrivacySettings: () => void;
  navigateToAnalyticsInsights: () => void;
  navigateToDeleteAccount: () => void;
  navigateToNotifications: () => void;
  navigateToSmartFeatures: () => void;
  navigateToSavedSearches: () => void;
  navigateToDataStorage: () => void;
  navigateToAbout: () => void;
  navigateToHelpSupport: () => void; // ✅ PHASE 3.1: Help & Support navigation
  goBack: () => void;
}