/**
 * Service Provider
 * Provides AI, Maps, and Feature Flag services via React Context
 * Services are created based on user settings
 */

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { getSettings, type UserSettings } from '../config/settings';
import { createAIService, type IAIService } from '../services/ai';
import { createMapsService, type IMapsService } from '../services/maps';
import { MockFeatureFlagService, type FeatureFlagService } from '../services/feature-flags';

interface Services {
  ai: IAIService;
  maps: IMapsService;
  featureFlags: FeatureFlagService;
}

const ServiceContext = createContext<Services | null>(null);

export function ServiceProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  
  // Listen for settings changes
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSettings());
    };
    
    window.addEventListener('settings-changed', handleSettingsChange);
    return () => window.removeEventListener('settings-changed', handleSettingsChange);
  }, []);
  
  // Create services based on current settings
  const services = useMemo<Services>(() => {
    return {
      ai: createAIService(settings.aiEnabled),
      maps: createMapsService(settings.mapsEnabled),
      featureFlags: new MockFeatureFlagService(), // TODO: Switch to RealFeatureFlagService when Supabase is ready
    };
  }, [settings.aiEnabled, settings.mapsEnabled]);
  
  return (
    <ServiceContext.Provider value={services}>
      {children}
    </ServiceContext.Provider>
  );
}

/**
 * Hook to access all services
 */
export function useServices(): Services {
  const context = useContext(ServiceContext);
  
  if (!context) {
    throw new Error('useServices must be used within ServiceProvider');
  }
  
  return context;
}

/**
 * Hook to access AI service
 */
export function useAIService(): IAIService {
  return useServices().ai;
}

/**
 * Hook to access Maps service
 */
export function useMapsService(): IMapsService {
  return useServices().maps;
}

/**
 * Hook to access Feature Flags service
 */
export function useFeatureFlags(): FeatureFlagService {
  return useServices().featureFlags;
}

/**
 * Hook to get current settings
 */
export function useSettings(): UserSettings {
  const [settings, setSettings] = useState<UserSettings>(getSettings());
  
  useEffect(() => {
    const handleSettingsChange = () => {
      setSettings(getSettings());
    };
    
    window.addEventListener('settings-changed', handleSettingsChange);
    return () => window.removeEventListener('settings-changed', handleSettingsChange);
  }, []);
  
  return settings;
}