/**
 * Feature Mapping Service
 * Bridge between SuperAdmin Features and SmartFeatures (User Settings)
 * 
 * Architecture:
 * - SuperAdmin uses FeatureFlag (with plan overrides: free, plus, pro, enterprise, internal)
 * - SmartFeatures uses AdminFeatureConfig (with allowedPlans: Free, Plus, Pro)
 * 
 * This service:
 * 1. Maps feature IDs between both systems
 * 2. Converts plan names (lowercase → capitalized)
 * 3. Syncs SuperAdmin changes to SmartFeatures localStorage
 */

export interface FeatureFlag {
  id: string;
  name: string;
  category: 'content' | 'social' | 'commerce';
  description: string;
  globalEnabled: boolean;
  rolloutPercentage: number;
  dependencies?: string[];
  planOverrides: {
    free: boolean;
    plus: boolean;
    pro: boolean;
    enterprise: boolean;
    internal: boolean;
  };
  userOverrides: Array<{
    userId: string;
    userName: string;
    email: string;
    enabled: boolean;
  }>;
  forcedOn?: boolean; // Phase 3 feature
}

export interface AdminFeatureConfig {
  features: {
    [featureId: string]: {
      available: boolean;
      forcedOn: boolean;
      allowedPlans: string[];
    };
  };
}

export type Plan = 'Free' | 'Plus' | 'Pro';

/**
 * Plan mapping: SuperAdmin lowercase → SmartFeatures capitalized
 */
const PLAN_MAP: Record<string, Plan> = {
  free: 'Free',
  plus: 'Plus',
  pro: 'Pro',
  enterprise: 'Pro', // Enterprise maps to Pro in SmartFeatures
  internal: 'Pro',   // Internal maps to Pro in SmartFeatures
};

/**
 * Feature ID mapping: SuperAdmin ID → SmartFeatures ID
 * 
 * Phase 1: Manual mapping for existing features
 * Phase 2: Identity mapping (same IDs in both systems)
 */
const FEATURE_ID_MAP: Record<string, string | null> = {
  // Phase 2 unified features (identity mapping)
  aiPublishingAssistance: 'aiPublishingAssistance',
  photoEnhancement: 'photoEnhancement',
  voiceToText: 'voiceToText',
  smartFilters: 'smartFilters',
  personalizedFeed: 'personalizedFeed',
  
  // Legacy SuperAdmin features (no SmartFeatures equivalent yet)
  ai_tagging: 'aiPublishingAssistance', // Mapped to closest equivalent
  auto_moderate: null, // No mapping
  groups: null,
  messaging: null,
  advanced_analytics: null,
  experimental_ui: null,
};

/**
 * Converts SuperAdmin FeatureFlag array to SmartFeatures AdminFeatureConfig
 * 
 * Process:
 * 1. Filter out unmapped features
 * 2. Convert globalEnabled → available
 * 3. Convert planOverrides → allowedPlans array
 * 4. Apply plan name mapping
 */
export function syncSuperAdminToSmartFeatures(
  superAdminFeatures: FeatureFlag[]
): AdminFeatureConfig {
  const smartConfig: AdminFeatureConfig = { features: {} };

  superAdminFeatures.forEach((feature) => {
    // Get mapped ID (or use identity if exists)
    const mappedId = FEATURE_ID_MAP[feature.id];
    
    if (mappedId === null) {
      console.log(`[FEATURE MAPPING] Skipping unmapped feature: ${feature.id}`);
      return; // Skip features without SmartFeatures equivalent
    }

    // Convert plan overrides to allowed plans array
    const allowedPlans: Plan[] = Object.entries(feature.planOverrides)
      .filter(([_plan, enabled]) => enabled)
      .map(([plan]) => PLAN_MAP[plan])
      .filter(Boolean) as Plan[];

    smartConfig.features[mappedId] = {
      available: feature.globalEnabled,
      forcedOn: feature.forcedOn || false,
      allowedPlans,
    };

    console.log(`[FEATURE MAPPING] Mapped: ${feature.id} → ${mappedId}`, {
      available: feature.globalEnabled,
      forcedOn: feature.forcedOn || false,
      allowedPlans,
    });
  });

  return smartConfig;
}

/**
 * Sync SuperAdmin features to SmartFeatures localStorage
 * Preserves features that only exist in SmartFeatures (merge strategy)
 */
export function syncToLocalStorage(superAdminFeatures: FeatureFlag[]): void {
  try {
    // 1. Save SuperAdmin features
    localStorage.setItem(
      'listlyup_superadmin_features',
      JSON.stringify(superAdminFeatures)
    );

    // 2. Convert to SmartFeatures format
    const newSmartConfig = syncSuperAdminToSmartFeatures(superAdminFeatures);

    // 3. Load existing SmartFeatures config
    const existingConfigRaw = localStorage.getItem('listlyup_admin_feature_config');
    const existingConfig: AdminFeatureConfig = existingConfigRaw
      ? JSON.parse(existingConfigRaw)
      : { features: {} };

    // 4. Merge: SuperAdmin features override, but preserve SmartFeatures-only features
    const mergedConfig: AdminFeatureConfig = {
      features: {
        ...existingConfig.features, // Keep existing
        ...newSmartConfig.features, // Override with SuperAdmin
      },
    };

    // 5. Save merged config
    localStorage.setItem(
      'listlyup_admin_feature_config',
      JSON.stringify(mergedConfig)
    );

    console.log('[SYNC] SuperAdmin → SmartFeatures completed:', {
      superAdminCount: superAdminFeatures.length,
      mappedCount: Object.keys(newSmartConfig.features).length,
      totalCount: Object.keys(mergedConfig.features).length,
    });

    // 6. Dispatch custom event for same-tab sync (Phase 3)
    window.dispatchEvent(
      new CustomEvent('superadmin-features-changed', {
        detail: { features: superAdminFeatures },
      })
    );
  } catch (error) {
    console.error('[SYNC ERROR] Failed to sync features:', error);
  }
}

/**
 * Load SuperAdmin features from localStorage
 * Returns null if not found (fallback to default mock)
 */
export function loadSuperAdminFeatures(): FeatureFlag[] | null {
  try {
    const saved = localStorage.getItem('listlyup_superadmin_features');
    if (saved) {
      const features = JSON.parse(saved);
      console.log('[LOAD] SuperAdmin features loaded from localStorage:', features.length);
      return features;
    }
  } catch (error) {
    console.error('[LOAD ERROR] Failed to load SuperAdmin features:', error);
  }
  return null;
}

/**
 * Delete feature from both SuperAdmin and SmartFeatures (Phase 3)
 */
export function deleteFeatureFromBothSystems(featureId: string): void {
  try {
    // 1. Remove from SuperAdmin
    const superAdminFeatures = loadSuperAdminFeatures() || [];
    const updatedFeatures = superAdminFeatures.filter((f) => f.id !== featureId);
    localStorage.setItem(
      'listlyup_superadmin_features',
      JSON.stringify(updatedFeatures)
    );

    // 2. Remove from SmartFeatures
    const smartConfigRaw = localStorage.getItem('listlyup_admin_feature_config');
    if (smartConfigRaw) {
      const smartConfig: AdminFeatureConfig = JSON.parse(smartConfigRaw);
      delete smartConfig.features[featureId];
      localStorage.setItem(
        'listlyup_admin_feature_config',
        JSON.stringify(smartConfig)
      );
    }

    console.log('[DELETE] Feature removed from both systems:', featureId);

    // Dispatch event for real-time sync
    window.dispatchEvent(
      new CustomEvent('superadmin-features-changed', {
        detail: { features: updatedFeatures },
      })
    );
  } catch (error) {
    console.error('[DELETE ERROR] Failed to delete feature:', error);
  }
}
