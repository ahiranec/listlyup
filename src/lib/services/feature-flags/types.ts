/**
 * Feature Flags Types
 * Multi-level feature control system
 */

export type FeatureName = 
  | 'ai_suggestions'
  | 'ai_auto_analyze'
  | 'maps_google'
  | 'maps_auto_gps'
  | 'premium_listings'
  | 'analytics';

export type UserPlan = 'free' | 'plus' | 'pro';

export type FeatureScope = 
  | 'global'      // Superadmin master switch
  | 'regional'    // Country/region level
  | 'plan'        // Subscription plan level
  | 'group'       // User groups (beta, vip, etc)
  | 'user';       // Individual user level

/**
 * Feature flag configuration
 */
export interface FeatureFlag {
  name: FeatureName;
  enabled: boolean;
  scope: FeatureScope;
  
  // Regional restrictions
  allowedCountries?: string[];  // ['CL', 'AR', 'PE']
  blockedCountries?: string[];  // ['US', 'CA']
  
  // Plan restrictions
  allowedPlans?: UserPlan[];    // ['premium', 'enterprise']
  minPlan?: UserPlan;           // 'premium' = requires premium+
  
  // Group restrictions
  allowedGroups?: string[];     // ['beta_testers', 'vip']
  blockedGroups?: string[];     // ['problematic_users']
  
  // User overrides
  allowedUsers?: string[];      // Whitelist
  blockedUsers?: string[];      // Blacklist
  
  // Rollout control
  rolloutPercentage?: number;   // 0-100, for gradual rollout
  
  // Metadata
  description?: string;
  reason?: string;              // Why it's disabled
  disabledAt?: Date;
  disabledBy?: string;          // Admin user ID
}

/**
 * User context for permission checks
 */
export interface UserContext {
  userId?: string;
  country?: string;
  plan?: UserPlan;
  groups?: string[];
  email?: string;
}

/**
 * Feature access result
 */
export interface FeatureAccessResult {
  allowed: boolean;
  reason?: string;
  blockedBy?: FeatureScope;  // Which level blocked it
}

/**
 * Feature usage log (for analytics)
 */
export interface FeatureUsageLog {
  id: string;
  userId: string;
  feature: FeatureName;
  allowed: boolean;
  reason?: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}