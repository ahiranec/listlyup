/**
 * SuperAdmin Utilities
 * Helper functions for admin panel
 */

import { ToggleRight, ToggleLeft } from 'lucide-react';
import type { FeatureFlag } from '../../lib/services/feature-flags';
import { FEATURE_LABELS } from './constants';

/**
 * Get icon component for feature flag state
 */
export function getFeatureIcon(flag: FeatureFlag) {
  return flag.enabled ? (
    <ToggleRight className="w-5 h-5 text-green-600" />
  ) : (
    <ToggleLeft className="w-5 h-5 text-gray-400" />
  );
}

/**
 * Get human-readable label for feature flag
 */
export function getFeatureLabel(name: string): string {
  return FEATURE_LABELS[name] || name;
}
