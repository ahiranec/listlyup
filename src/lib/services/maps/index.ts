/**
 * Maps Service Factory
 * Creates appropriate service based on user settings
 */

import { MockMapsService } from './MockMapsService';
import { RealMapsService } from './RealMapsService';
import type { IMapsService } from './MapsService';

/**
 * Create Maps service based on enabled flag
 * @param enabled - Whether to use real Maps service (from user settings)
 */
export function createMapsService(enabled: boolean): IMapsService {
  if (enabled) {
    const realService = new RealMapsService();
    
    if (realService.isAvailable()) {
      console.log('✅ Using Real Maps Service (Google Maps API)');
      return realService;
    } else {
      console.warn('⚠️ Maps enabled but Google Maps API key not found.');
      console.warn('📝 Add VITE_GOOGLE_MAPS_API_KEY to .env to activate.');
      console.warn('🎭 Falling back to Mock Maps Service');
    }
  }
  
  console.log('🎭 Using Mock Maps Service (Valparaíso region locations)');
  return new MockMapsService();
}

// Re-export types
export type { IMapsService } from './MapsService';
export type { Location, GeocodingResult, SearchLocationOptions } from '../types';
