/**
 * Feature Flag Service Interface
 * Multi-level permission system for features
 */

import type { FeatureName, FeatureFlag, UserContext, FeatureAccessResult } from './types';

export interface FeatureFlagService {
  /**
   * Check if a user can access a feature
   * Evaluates all permission levels: global → regional → plan → group → user
   */
  checkAccess(
    feature: FeatureName,
    userContext?: UserContext
  ): Promise<FeatureAccessResult>;
  
  /**
   * Get all feature flags (for admin panel)
   */
  getAllFlags(): Promise<FeatureFlag[]>;
  
  /**
   * Get a specific feature flag
   */
  getFlag(feature: FeatureName): Promise<FeatureFlag | null>;
  
  /**
   * Update a feature flag (superadmin only)
   */
  updateFlag(feature: FeatureName, updates: Partial<FeatureFlag>): Promise<void>;
  
  /**
   * Toggle a feature on/off globally (emergency kill switch)
   */
  toggleFeature(feature: FeatureName, enabled: boolean, reason?: string): Promise<void>;
  
  /**
   * Check multiple features at once
   */
  checkMultiple(
    features: FeatureName[],
    userContext?: UserContext
  ): Promise<Record<FeatureName, FeatureAccessResult>>;
}
