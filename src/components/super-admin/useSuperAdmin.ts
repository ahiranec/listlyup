/**
 * SuperAdmin Hook
 * Manages feature flags state and operations
 */

import { useState, useEffect } from 'react';
import { useFeatureFlags } from '../../lib/providers/ServiceProvider';
import type { FeatureFlag, UserPlan } from '../../lib/services/feature-flags';

export function useSuperAdmin(isOpen: boolean) {
  const featureFlagService = useFeatureFlags();
  const [flags, setFlags] = useState<FeatureFlag[]>([]);
  const [loading, setLoading] = useState(false);
  
  const loadFlags = async () => {
    setLoading(true);
    try {
      const allFlags = await featureFlagService.getAllFlags();
      setFlags(allFlags);
    } catch (error) {
      console.error('Failed to load flags:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Load flags when panel opens
  useEffect(() => {
    if (isOpen) {
      loadFlags();
    }
  }, [isOpen]);
  
  // Listen for flag changes
  useEffect(() => {
    const handleFlagsChange = () => {
      loadFlags();
    };
    
    window.addEventListener('feature-flags-changed', handleFlagsChange);
    return () => window.removeEventListener('feature-flags-changed', handleFlagsChange);
  }, []);
  
  const toggleFeature = async (featureName: string, enabled: boolean) => {
    await featureFlagService.toggleFeature(
      featureName as any,
      enabled,
      enabled ? undefined : 'Disabled by admin'
    );
  };
  
  const updateMinPlan = async (featureName: string, plan: UserPlan) => {
    await featureFlagService.updateFlag(featureName as any, { minPlan: plan });
  };
  
  const updateRollout = async (featureName: string, percentage: number) => {
    await featureFlagService.updateFlag(featureName as any, { 
      rolloutPercentage: percentage 
    });
  };
  
  return {
    flags,
    loading,
    loadFlags,
    toggleFeature,
    updateMinPlan,
    updateRollout,
  };
}
