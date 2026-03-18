/**
 * User Settings Configuration
 * Manages feature toggles via localStorage
 */

export interface UserSettings {
  // AI Features
  aiEnabled: boolean;
  aiAutoAnalyze: boolean; // Auto-analyze on image upload
  
  // Maps Features
  mapsEnabled: boolean;
  mapsAutoGPS: boolean; // Auto-use GPS on location step
  
  // Notifications
  notifications: {
    listingActivity: boolean;
    offersAndTrades: boolean;
    messages: boolean;
    systemAlerts: boolean;
    expiringItems: boolean;
    savedSearchAlerts: boolean;
    marketingPromotions: boolean;
  };
  
  // Privacy Controls
  privacy: {
    profilePublic: boolean;
    hidePhone: boolean;
    hideEmail: boolean;
    visibilityRadius: 'approximate' | 'exact';
  };
  
  // Saved Searches
  savedSearches: {
    alertsEnabled: boolean;
    defaultSort: string;
    preferredRadius: string;
    defaultPrivacyRadius: string;
  };
  
  // General
  theme: 'light' | 'dark' | 'system';
}

const STORAGE_KEY = 'listlyup_settings';

const DEFAULTS: UserSettings = {
  aiEnabled: false,        // OFF by default - ready to plug in
  aiAutoAnalyze: true,     // When enabled, auto-analyze
  mapsEnabled: false,      // OFF by default - ready to plug in
  mapsAutoGPS: false,      // Manual selection by default
  notifications: {
    listingActivity: true,
    offersAndTrades: true,
    messages: true,
    systemAlerts: true,
    expiringItems: true,
    savedSearchAlerts: false,
    marketingPromotions: false,
  },
  privacy: {
    profilePublic: true,
    hidePhone: false,
    hideEmail: true,
    visibilityRadius: 'approximate',
  },
  savedSearches: {
    alertsEnabled: true,
    defaultSort: 'recent',
    preferredRadius: '10km',
    defaultPrivacyRadius: 'approximate',
  },
  theme: 'system',
};

/**
 * Get current user settings from localStorage
 */
export function getSettings(): UserSettings {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Merge with defaults to handle new settings
      return { ...DEFAULTS, ...parsed };
    }
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
  return DEFAULTS;
}

/**
 * Update a single setting
 */
export function updateSetting<K extends keyof UserSettings>(
  key: K,
  value: UserSettings[K]
): void {
  try {
    const settings = getSettings();
    settings[key] = value;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    
    // Dispatch event for reactive updates
    window.dispatchEvent(new CustomEvent('settings-changed', { 
      detail: { key, value } 
    }));
  } catch (error) {
    console.error('Failed to update setting:', error);
  }
}

/**
 * Update multiple settings at once
 */
export function updateSettings(updates: Partial<UserSettings>): void {
  try {
    const settings = getSettings();
    const newSettings = { ...settings, ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
    
    window.dispatchEvent(new CustomEvent('settings-changed', { 
      detail: updates 
    }));
  } catch (error) {
    console.error('Failed to update settings:', error);
  }
}

/**
 * Reset to defaults
 */
export function resetSettings(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULTS));
    window.dispatchEvent(new CustomEvent('settings-changed', { 
      detail: DEFAULTS 
    }));
  } catch (error) {
    console.error('Failed to reset settings:', error);
  }
}

/**
 * Check if API keys are configured (for enabling features)
 */
export function checkAPIAvailability() {
  // Safe access to import.meta.env (might be undefined in some contexts)
  try {
    const env = import.meta?.env ?? {};
    
    return {
      ai: !!(
        env.VITE_GOOGLE_VISION_API_KEY || 
        env.VITE_OPENAI_API_KEY ||
        env.VITE_SUPABASE_URL
      ),
      maps: !!env.VITE_GOOGLE_MAPS_API_KEY,
    };
  } catch {
    // If import.meta is not available, return false for all
    return {
      ai: false,
      maps: false,
    };
  }
}