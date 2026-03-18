/**
 * Maps Service Interface
 * Contract for both Mock and Real implementations
 */

import type { Location, GeocodingResult, SearchLocationOptions, ServiceResult } from '../types';

export interface IMapsService {
  /**
   * Get current location via GPS
   */
  getCurrentLocation(): Promise<ServiceResult<Location>>;
  
  /**
   * Search for locations by text query
   */
  searchLocation(
    options: SearchLocationOptions
  ): Promise<ServiceResult<GeocodingResult[]>>;
  
  /**
   * Reverse geocoding: coordinates → address
   */
  reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<ServiceResult<GeocodingResult>>;
  
  /**
   * Forward geocoding: address → coordinates
   */
  geocode(address: string): Promise<ServiceResult<GeocodingResult>>;
  
  /**
   * Check if the service is available and configured
   */
  isAvailable(): boolean;
  
  /**
   * Get service type for debugging/logging
   */
  getServiceType(): 'mock' | 'real';
}
