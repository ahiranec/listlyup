/**
 * SuperAdmin Constants
 * Configuration for feature flags admin panel
 */

/**
 * Feature flag display names
 */
export const FEATURE_LABELS: Record<string, string> = {
  'ai_suggestions': 'AI Suggestions',
  'ai_auto_analyze': 'AI Auto-Analyze',
  'maps_google': 'Google Maps',
  'maps_auto_gps': 'Auto GPS',
  'premium_listings': 'Premium Listings',
  'analytics': 'Analytics',
};

/**
 * Plan options for feature access
 */
export const PLAN_OPTIONS = [
  { value: 'free', label: 'Free' },
  { value: 'premium', label: 'Premium' },
  { value: 'enterprise', label: 'Enterprise' },
] as const;

/**
 * Rollout percentage options
 */
export const ROLLOUT_OPTIONS = [
  { value: '10', label: '10% (Testing)' },
  { value: '25', label: '25% (Beta)' },
  { value: '50', label: '50% (Staged)' },
  { value: '75', label: '75% (Almost)' },
  { value: '100', label: '100% (Full)' },
] as const;

/**
 * Future features coming with Supabase
 */
export const FUTURE_FEATURES = [
  'Per-user overrides (whitelist/blacklist)',
  'Regional restrictions (per country)',
  'Group-based access control',
  'Audit logs (who changed what)',
  'Usage analytics per feature',
  'Scheduled rollouts',
];
