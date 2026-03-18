/**
 * Mock Feature Flag Service
 * Uses localStorage for simulating superadmin controls
 */

import type { FeatureFlagService } from './FeatureFlagService';
import type { FeatureName, FeatureFlag, UserContext, FeatureAccessResult, UserPlan } from './types';

const STORAGE_KEY = 'listlyup_feature_flags';

// Default feature flags configuration
const DEFAULT_FLAGS: FeatureFlag[] = [
  {
    name: 'ai_suggestions',
    enabled: true,  // Globally enabled by superadmin
    scope: 'global',
    minPlan: 'free',  // Available to all plans
    description: 'AI-powered product detection from photos',
    rolloutPercentage: 100,  // 100% rollout
  },
  {
    name: 'ai_auto_analyze',
    enabled: true,
    scope: 'global',
    minPlan: 'plus',  // Plus feature
    description: 'Auto-analyze photos on upload',
  },
  {
    name: 'maps_google',
    enabled: true,
    scope: 'global',
    minPlan: 'free',
    description: 'Google Maps integration for location',
    rolloutPercentage: 100,
  },
  {
    name: 'maps_auto_gps',
    enabled: true,
    scope: 'global',
    minPlan: 'free',
    description: 'Auto-detect GPS location',
  },
  {
    name: 'premium_listings',
    enabled: true,
    scope: 'plan',
    allowedPlans: ['plus', 'pro'],
    description: 'Premium listing features',
  },
  {
    name: 'analytics',
    enabled: true,
    scope: 'global',
    minPlan: 'free',
    description: 'Usage analytics and insights',
  },
];

export class MockFeatureFlagService implements FeatureFlagService {
  
  /**
   * Load flags from localStorage or defaults
   */
  private loadFlags(): FeatureFlag[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load feature flags:', error);
    }
    return DEFAULT_FLAGS;
  }
  
  /**
   * Save flags to localStorage
   */
  private saveFlags(flags: FeatureFlag[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(flags));
      // Dispatch event for reactive updates
      window.dispatchEvent(new CustomEvent('feature-flags-changed'));
    } catch (error) {
      console.error('Failed to save feature flags:', error);
    }
  }
  
  /**
   * Check feature access with multi-level validation
   */
  async checkAccess(
    feature: FeatureName,
    userContext?: UserContext
  ): Promise<FeatureAccessResult> {
    const flags = this.loadFlags();
    const flag = flags.find(f => f.name === feature);
    
    if (!flag) {
      return {
        allowed: false,
        reason: 'Feature not found',
        blockedBy: 'global',
      };
    }
    
    // Level 1: Global enabled check
    if (!flag.enabled) {
      return {
        allowed: false,
        reason: flag.reason || 'Feature globally disabled by admin',
        blockedBy: 'global',
      };
    }
    
    // If no user context, just check global
    if (!userContext) {
      return { allowed: true };
    }
    
    // Level 2: User blacklist
    if (flag.blockedUsers?.includes(userContext.userId || '')) {
      return {
        allowed: false,
        reason: 'User blocked from this feature',
        blockedBy: 'user',
      };
    }
    
    // Level 3: User whitelist (overrides other checks)
    if (flag.allowedUsers?.includes(userContext.userId || '')) {
      return { allowed: true };
    }
    
    // Level 4: Regional restrictions
    if (userContext.country) {
      if (flag.blockedCountries?.includes(userContext.country)) {
        return {
          allowed: false,
          reason: `Feature not available in ${userContext.country}`,
          blockedBy: 'regional',
        };
      }
      
      if (flag.allowedCountries && !flag.allowedCountries.includes(userContext.country)) {
        return {
          allowed: false,
          reason: `Feature only available in: ${flag.allowedCountries.join(', ')}`,
          blockedBy: 'regional',
        };
      }
    }
    
    // Level 5: Plan restrictions
    if (userContext.plan) {
      // Check minimum plan requirement
      if (flag.minPlan) {
        const planHierarchy: UserPlan[] = ['free', 'plus', 'pro'];
        const userPlanIndex = planHierarchy.indexOf(userContext.plan);
        const minPlanIndex = planHierarchy.indexOf(flag.minPlan);
        
        if (userPlanIndex < minPlanIndex) {
          return {
            allowed: false,
            reason: `Feature requires ${flag.minPlan} plan or higher`,
            blockedBy: 'plan',
          };
        }
      }
      
      // Check allowed plans
      if (flag.allowedPlans && !flag.allowedPlans.includes(userContext.plan)) {
        return {
          allowed: false,
          reason: `Feature only available for: ${flag.allowedPlans.join(', ')}`,
          blockedBy: 'plan',
        };
      }
    }
    
    // Level 6: Group restrictions
    if (userContext.groups) {
      // Check blocked groups
      const hasBlockedGroup = flag.blockedGroups?.some(g => 
        userContext.groups?.includes(g)
      );
      if (hasBlockedGroup) {
        return {
          allowed: false,
          reason: 'Your group is blocked from this feature',
          blockedBy: 'group',
        };
      }
      
      // Check allowed groups
      if (flag.allowedGroups) {
        const hasAllowedGroup = flag.allowedGroups.some(g => 
          userContext.groups?.includes(g)
        );
        if (!hasAllowedGroup) {
          return {
            allowed: false,
            reason: `Feature only for groups: ${flag.allowedGroups.join(', ')}`,
            blockedBy: 'group',
          };
        }
      }
    }
    
    // Level 7: Rollout percentage (for gradual rollouts)
    if (flag.rolloutPercentage !== undefined && flag.rolloutPercentage < 100) {
      // Simple hash-based distribution
      const userId = userContext.userId || 'anonymous';
      const hash = this.simpleHash(userId + feature);
      const userPercentage = (hash % 100);
      
      if (userPercentage >= flag.rolloutPercentage) {
        return {
          allowed: false,
          reason: `Feature in gradual rollout (${flag.rolloutPercentage}%)`,
          blockedBy: 'global',
        };
      }
    }
    
    return { allowed: true };
  }
  
  /**
   * Simple hash function for rollout distribution
   */
  private simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  
  async getAllFlags(): Promise<FeatureFlag[]> {
    return this.loadFlags();
  }
  
  async getFlag(feature: FeatureName): Promise<FeatureFlag | null> {
    const flags = this.loadFlags();
    return flags.find(f => f.name === feature) || null;
  }
  
  async updateFlag(feature: FeatureName, updates: Partial<FeatureFlag>): Promise<void> {
    const flags = this.loadFlags();
    const index = flags.findIndex(f => f.name === feature);
    
    if (index !== -1) {
      flags[index] = { ...flags[index], ...updates };
      this.saveFlags(flags);
    }
  }
  
  async toggleFeature(feature: FeatureName, enabled: boolean, reason?: string): Promise<void> {
    const flags = this.loadFlags();
    const index = flags.findIndex(f => f.name === feature);
    
    if (index !== -1) {
      flags[index] = {
        ...flags[index],
        enabled,
        reason,
        disabledAt: enabled ? undefined : new Date(),
      };
      this.saveFlags(flags);
    }
  }
  
  async checkMultiple(
    features: FeatureName[],
    userContext?: UserContext
  ): Promise<Record<FeatureName, FeatureAccessResult>> {
    const results: Record<string, FeatureAccessResult> = {};
    
    for (const feature of features) {
      results[feature] = await this.checkAccess(feature, userContext);
    }
    
    return results as Record<FeatureName, FeatureAccessResult>;
  }
}