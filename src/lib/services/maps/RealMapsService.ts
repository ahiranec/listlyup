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
      const env = (import.meta as any).env || {};
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
            // Return coordinates with a clear fallback address
            resolve({
              success: true,
              data: { 
                latitude, 
                longitude,
                address: `Ubicación detectada (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
              },
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
      const isReady = await this.waitForGoogleMaps();
      if (!isReady) {
        throw new Error('Google Maps SDK not ready');
      }

      const autocompleteService = new google.maps.places.AutocompleteService();
      
      const request: google.maps.places.AutocompletionRequest = {
        input: options.query,
        language: options.language || 'es',
      };

      // Add location bias if bounds are provided
      if (options.bounds) {
        request.locationBias = {
          north: options.bounds.north,
          south: options.bounds.south,
          east: options.bounds.east,
          west: options.bounds.west,
        };
      }

      const response = await autocompleteService.getPlacePredictions(request);

      if (!response || !response.predictions) {
        return { success: true, data: [] };
      }

      // Return light results as requested (no coordinates yet)
      const results: GeocodingResult[] = response.predictions.map(prediction => ({
        location: {
          latitude: null,
          longitude: null,
          address: prediction.description,
          placeId: prediction.place_id,
        },
        formattedAddress: prediction.description,
        placeId: prediction.place_id,
      }));

      return {
        success: true,
        data: results,
      };
      
    } catch (error) {
      console.error('Maps search error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Search failed',
      };
    }
  }
  
  private async waitForGoogleMaps(retries = 3, delay = 500): Promise<boolean> {
    for (let i = 0; i < retries; i++) {
      if (typeof google !== 'undefined' && google.maps && google.maps.Geocoder && google.maps.places) {
        return true;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    return false;
  }

  async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<ServiceResult<GeocodingResult>> {
    
    try {
      // Wait for Google Maps API to be available
      const isReady = await this.waitForGoogleMaps();
      if (!isReady) {
        throw new Error('Google Maps API not loaded after waiting');
      }

      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({
        location: { lat: latitude, lng: longitude }
      });

      if (!response.results || response.results.length === 0) {
        throw new Error('No results found');
      }

      return {
        success: true,
        data: this.parseGeocodingResult(response.results[0]),
      };
      
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Geocoding failed',
        data: {
          location: {
            latitude,
            longitude,
            address: `Coordenadas detectadas (${latitude.toFixed(4)}, ${longitude.toFixed(4)})`,
            city: '',
            region: '',
            country: '',
          },
          formattedAddress: `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
        }
      };
    }
  }
  
  async geocode(address: string): Promise<ServiceResult<GeocodingResult>> {
    try {
      // Wait for Google Maps API to be available
      const isReady = await this.waitForGoogleMaps();
      if (!isReady) {
        throw new Error('Google Maps API not loaded after waiting');
      }

      const geocoder = new google.maps.Geocoder();
      const response = await geocoder.geocode({ address });

      if (!response.results || response.results.length === 0) {
        throw new Error('Address not found');
      }

      return {
        success: true,
        data: this.parseGeocodingResult(response.results[0]),
      };
      
    } catch (error) {
      console.error('Geocoding error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Geocoding failed',
      };
    }
  }

  async getPlaceDetails(placeId: string): Promise<ServiceResult<GeocodingResult>> {
    try {
      const isReady = await this.waitForGoogleMaps();
      if (!isReady) {
        throw new Error('Google Maps SDK not ready');
      }

      // PlacesService requires an HTML element (even if not visible)
      const dummyElement = document.createElement('div');
      const service = new google.maps.places.PlacesService(dummyElement);

      return new Promise((resolve) => {
        service.getDetails(
          {
            placeId,
            fields: ['geometry', 'formatted_address', 'address_components', 'place_id'],
          },
          (result, status) => {
            if (status === google.maps.places.PlacesServiceStatus.OK && result) {
              resolve({
                success: true,
                data: this.parseGeocodingResult(result),
              });
            } else {
              resolve({
                success: false,
                error: `Places details failed with status: ${status}`,
              });
            }
          }
        );
      });
    } catch (error) {
      console.error('Error getting place details:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to get details',
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
  
  private parseGeocodingResult(result: any): GeocodingResult {
    // Handle both JS API (lat/lng as functions) and REST API (lat/lng as numbers)
    const lat = typeof result.geometry.location.lat === 'function' 
      ? result.geometry.location.lat() 
      : result.geometry.location.lat;
      
    const lng = typeof result.geometry.location.lng === 'function' 
      ? result.geometry.location.lng() 
      : result.geometry.location.lng;
    
    // Extract address components
    const addressComponents = result.address_components || [];
    const city = this.findAddressComponent(addressComponents, 'locality') || 
                 this.findAddressComponent(addressComponents, 'sublocality_level_1') ||
                 this.findAddressComponent(addressComponents, 'administrative_area_level_2');
    const region = this.findAddressComponent(addressComponents, 'administrative_area_level_1');
    const country = this.findAddressComponent(addressComponents, 'country');
    const postalCode = this.findAddressComponent(addressComponents, 'postal_code');
    
    return {
      location: {
        latitude: lat,
        longitude: lng,
        address: result.formatted_address,
        city: city || '',
        region: region || '',
        country: country || '',
        postalCode: postalCode || '',
        placeId: result.place_id || '',
      },
      formattedAddress: result.formatted_address || '',
      placeId: result.place_id || '',
    };
  }
  
  private findAddressComponent(components: any[], type: string): string | undefined {
    const component = components.find((c: any) => c.types.includes(type));
    return component?.long_name;
  }
}
