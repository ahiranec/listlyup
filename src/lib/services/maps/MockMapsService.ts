/**
 * Mock Maps Service
 * Returns hardcoded locations in Valparaíso region for development
 */

import type { IMapsService } from './MapsService';
import type { Location, GeocodingResult, SearchLocationOptions, ServiceResult } from '../types';

export class MockMapsService implements IMapsService {
  
  private readonly mockLocations = [
    {
      name: 'Valparaíso Centro',
      location: { 
        latitude: -33.0472, 
        longitude: -71.6127,
        address: 'Plaza Sotomayor, Valparaíso, Chile',
        city: 'Valparaíso',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2340000',
      },
    },
    {
      name: 'Viña del Mar',
      location: { 
        latitude: -33.0245, 
        longitude: -71.5518,
        address: 'Av. Libertad 1348, Viña del Mar, Chile',
        city: 'Viña del Mar',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2520000',
      },
    },
    {
      name: 'Concón',
      location: { 
        latitude: -32.9253, 
        longitude: -71.5198,
        address: 'Concón, Región de Valparaíso, Chile',
        city: 'Concón',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2510000',
      },
    },
    {
      name: 'Quilpué',
      location: { 
        latitude: -33.0475, 
        longitude: -71.4425,
        address: 'Plaza de Quilpué, Chile',
        city: 'Quilpué',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2430000',
      },
    },
    {
      name: 'Villa Alemana',
      location: { 
        latitude: -33.0442, 
        longitude: -71.3736,
        address: 'Villa Alemana, Región de Valparaíso, Chile',
        city: 'Villa Alemana',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2800000',
      },
    },
    {
      name: 'Zapallar',
      location: { 
        latitude: -32.5547, 
        longitude: -71.4569,
        address: 'Zapallar, Región de Valparaíso, Chile',
        city: 'Zapallar',
        region: 'Valparaíso',
        country: 'Chile',
        postalCode: '2050000',
      },
    },
  ];
  
  async getCurrentLocation(): Promise<ServiceResult<Location>> {
    await this.simulateDelay(500, 1000);
    
    // Return Valparaíso Centro as default
    const defaultLocation = this.mockLocations[0];
    
    return {
      success: true,
      data: { ...defaultLocation.location },
      fallbackUsed: true,
    };
  }
  
  async searchLocation(
    options: SearchLocationOptions
  ): Promise<ServiceResult<GeocodingResult[]>> {
    await this.simulateDelay(300, 600);
    
    const query = options.query.toLowerCase();
    
    // Filter mock locations that match the query
    const results = this.mockLocations
      .filter(loc => 
        loc.name.toLowerCase().includes(query) ||
        loc.location.address?.toLowerCase().includes(query) ||
        loc.location.city?.toLowerCase().includes(query)
      )
      .slice(0, options.limit || 5)
      .map(loc => ({
        location: { ...loc.location },
        formattedAddress: loc.location.address || loc.name,
        placeId: `mock_${loc.name.replace(/\s+/g, '_').toLowerCase()}`,
      }));
    
    return {
      success: true,
      data: results,
      fallbackUsed: true,
    };
  }
  
  async reverseGeocode(
    latitude: number,
    longitude: number
  ): Promise<ServiceResult<GeocodingResult>> {
    await this.simulateDelay(300, 600);
    
    // Find closest mock location
    const closest = this.findClosest(latitude, longitude);
    
    return {
      success: true,
      data: {
        location: {
          latitude,
          longitude,
          address: closest.location.address,
          city: closest.location.city,
          region: closest.location.region,
          country: closest.location.country,
          postalCode: closest.location.postalCode,
        },
        formattedAddress: closest.location.address || closest.name,
        placeId: `mock_${closest.name.replace(/\s+/g, '_').toLowerCase()}`,
      },
      fallbackUsed: true,
    };
  }
  
  async geocode(address: string): Promise<ServiceResult<GeocodingResult>> {
    // Use search and return first result
    const searchResult = await this.searchLocation({ query: address, limit: 1 });
    
    if (searchResult.success && searchResult.data && searchResult.data.length > 0) {
      return {
        success: true,
        data: searchResult.data[0],
        fallbackUsed: true,
      };
    }
    
    return {
      success: false,
      error: 'No results found',
    };
  }
  
  isAvailable(): boolean {
    return true; // Mock is always available
  }
  
  getServiceType(): 'mock' | 'real' {
    return 'mock';
  }
  
  // ============================================
  // PRIVATE HELPERS
  // ============================================
  
  private async simulateDelay(min: number, max: number): Promise<void> {
    const delay = Math.random() * (max - min) + min;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  
  private findClosest(lat: number, lng: number) {
    let closest = this.mockLocations[0];
    let minDistance = this.calculateDistance(
      lat, lng, 
      closest.location.latitude, 
      closest.location.longitude
    );
    
    for (const loc of this.mockLocations.slice(1)) {
      const distance = this.calculateDistance(
        lat, lng,
        loc.location.latitude,
        loc.location.longitude
      );
      
      if (distance < minDistance) {
        minDistance = distance;
        closest = loc;
      }
    }
    
    return closest;
  }
  
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Haversine formula (simplified)
    const R = 6371; // Earth's radius in km
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  
  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}
