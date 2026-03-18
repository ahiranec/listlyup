/**
 * Real Maps Service
 * Uses Google Maps Geocoding API & Places API
 */

import type { IMapsService } from './MapsService';
import type { Location, GeocodingResult, SearchLocationOptions, ServiceResult } from '../types';

export class RealMapsService implements IMapsService {
  
  private readonly apiKey: string;
  
  constructor() {
    try {
      const env = import.meta?.env ?? {};
      this.apiKey = env.VITE_GOOGLE_MAPS_API_KEY || '';
    } catch {
      this.apiKey = '';
    }
  }
  
  async getCurrentLocation(): Promise<ServiceResult<Location>> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve({
          success: false,
          error: 'Geolocation is not supported by your browser',
        });
        return;
      }
      
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Get address via reverse geocoding
          const geocodeResult = await this.reverseGeocode(latitude, longitude);
          
          if (geocodeResult.success && geocodeResult.data) {
            resolve({
              success: true,
              data: geocodeResult.data.location,
            });
          } else {
            // Return just coordinates if geocoding fails
            resolve({
              success: true,
              data: { latitude, longitude },
            });
          }
        },
        (error) => {
          let errorMessage = 'Unable to get location';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location unavailable';
              break;
            case error.TIMEOUT:
              errorMessage = 'Location request timed out';
              break;
          }
          
          resolve({
            success: false,
            error: errorMessage,
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    });
  }
  
  async searchLocation(
    options: SearchLocationOptions
  ): Promise<ServiceResult<GeocodingResult[]>> {
    
    try {
      const params = new URLSearchParams({
        input: options.query,
        key: this.apiKey,
        language: options.language || 'es',
      });
      
      // Add bounds if provided
      if (options.bounds) {
        const center = {
          lat: (options.bounds.north + options.bounds.south) / 2,
          lng: (options.bounds.east + options.bounds.west) / 2,
        };
        params.append('location', `${center.lat},${center.lng}`);
        params.append('radius', '50000'); // 50km radius
      }
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(data.error_message || `API error: ${data.status}`);
      }
      
      if (data.status === 'ZERO_RESULTS') {
        return {
          success: true,
          data: [],
        };
      }
      
      // Get details for each prediction
      const results = await Promise.all(
        data.predictions
          .slice(0, options.limit || 5)
          .map((prediction: any) => this.getPlaceDetails(prediction.place_id))
      );
      
      return {
        success: true,
        data: results.filter((r): r is GeocodingResult => r !== null),
      };
      
    } catch (error) {
      console.error('Maps search error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Search failed',
      };
    }
  }
  
  async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<ServiceResult<GeocodingResult>> {
    
    try {
      const params = new URLSearchParams({
        latlng: `${latitude},${longitude}`,
        key: this.apiKey,
        language: 'es',
      });
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' || !data.results || data.results.length === 0) {
        throw new Error(data.error_message || 'No results found');
      }
      
      return {
        success: true,
        data: this.parseGeocodingResult(data.results[0]),
      };
      
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Geocoding failed',
      };
    }
  }
  
  async geocode(address: string): Promise<ServiceResult<GeocodingResult>> {
    try {
      const params = new URLSearchParams({
        address,
        key: this.apiKey,
        language: 'es',
      });
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?${params}`
      );
      
      if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' || !data.results || data.results.length === 0) {
        throw new Error(data.error_message || 'Address not found');
      }
      
      return {
        success: true,
        data: this.parseGeocodingResult(data.results[0]),
      };
      
    } catch (error) {
      console.error('Geocoding error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Geocoding failed',
      };
    }
  }
  
  isAvailable(): boolean {
    return !!this.apiKey;
  }
  
  getServiceType(): 'mock' | 'real' {
    return 'real';
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private async getPlaceDetails(placeId: string): Promise<GeocodingResult | null> {
    try {
      const params = new URLSearchParams({
        place_id: placeId,
        key: this.apiKey,
        fields: 'geometry,formatted_address,address_components',
        language: 'es',
      });
      
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?${params}`
      );
      
      if (!response.ok) {
        return null;
      }
      
      const data = await response.json();
      
      if (data.status !== 'OK' || !data.result) {
        return null;
      }
      
      return this.parseGeocodingResult(data.result);
      
    } catch (error) {
      console.error('Error getting place details:', error);
      return null;
    }
  }
  
  private parseGeocodingResult(result: any): GeocodingResult {
    const { lat, lng } = result.geometry.location;
    
    // Extract address components
    const addressComponents = result.address_components || [];
    const city = this.findAddressComponent(addressComponents, 'locality');
    const region = this.findAddressComponent(addressComponents, 'administrative_area_level_1');
    const country = this.findAddressComponent(addressComponents, 'country');
    const postalCode = this.findAddressComponent(addressComponents, 'postal_code');
    
    return {
      location: {
        latitude: lat,
        longitude: lng,
        address: result.formatted_address,
        city,
        region,
        country,
        postalCode,
      },
      formattedAddress: result.formatted_address,
      placeId: result.place_id,
    };
  }
  
  private findAddressComponent(components: any[], type: string): string | undefined {
    const component = components.find((c: any) => c.types.includes(type));
    return component?.long_name;
  }
}
