/**
 * Step 3: Location v2.0
 * Mobile-First, compact design with smart defaults
 */

import { useState, useEffect } from 'react';
import { MapPin, Navigation, Search, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { useMapsService } from '../../lib/providers/ServiceProvider';
import { useProfile } from '../../contexts/ProfileContext';
import type { Location, GeocodingResult } from '../../lib/services/types';
import type { CurrentUser } from '../../types';
import type { ListingType } from './types';

type LocationSource = 'profile' | 'gps' | 'search';

interface LocationStepV2Props {
  currentUser?: CurrentUser;
  location: Location | null;
  locationPrecision: 'approximate' | 'exact';
  listingType: ListingType;
  onDataChange: (data: { location: Location | null; locationPrecision: 'approximate' | 'exact' }) => void;
  onNext: () => void;
  onBack: () => void;
}

export function LocationStepV2({
  currentUser,
  location,
  locationPrecision,
  listingType,
  onDataChange,
  onNext,
  onBack,
}: LocationStepV2Props) {
  const mapsService = useMapsService();
  const { profile } = useProfile();
  
  // State
  const hasProfileLocation = profile.addresses.length > 0;
  const [source, setSource] = useState<LocationSource>(hasProfileLocation ? 'profile' : 'gps');
  const [localLocation, setLocalLocation] = useState<Location | null>(location);
  const [localPrecision, setLocalPrecision] = useState(locationPrecision);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GeocodingResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  
  // Auto-set precision based on account type and listing type
  useEffect(() => {
    const accountType = currentUser?.accountType || 'individual';
    
    let defaultPrecision: 'approximate' | 'exact' = 'approximate';
    
    if (listingType === 'product') {
      defaultPrecision = accountType === 'store' ? 'exact' : 'approximate';
    } else if (listingType === 'service') {
      defaultPrecision = 'approximate';
    } else if (listingType === 'event') {
      defaultPrecision = 'exact';
    }
    
    // Only set if not already set
    if (!location) {
      setLocalPrecision(defaultPrecision);
    }
  }, [listingType, currentUser?.accountType]);
  
  // Debounced search
  useEffect(() => {
    // Only search if we are in search tab and have enough characters
    if (source !== 'search' || !searchQuery.trim() || searchQuery.length < 3) {
      if (searchQuery.length === 0) setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      handleSearch();
    }, 600); // 600ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery, source]);
  
  // Sync with parent
  useEffect(() => {
    onDataChange({
      location: localLocation,
      locationPrecision: localPrecision,
    });
  }, [localLocation, localPrecision]);
  
  // Auto-set profile location when profile source is selected
  useEffect(() => {
    const setProfileLocation = async () => {
      if (source === 'profile' && hasProfileLocation && !localLocation) {
        setIsLoading(true);
        
        // Buscar primero la dirección por defecto, si no la primera
        const addressToUse = profile.addresses.find(a => a.isDefaultForPublishing) || profile.addresses[0];
        
        if (addressToUse) {
          // Si ya tiene coordenadas, cargar directamente (no geocodificar de nuevo)
          const hasCoords = addressToUse.coordinates && 
                           addressToUse.coordinates.latitude !== 0 && 
                           addressToUse.coordinates.longitude !== 0;

          if (hasCoords) {
            setLocalLocation({
              latitude: addressToUse.coordinates.latitude,
              longitude: addressToUse.coordinates.longitude,
              address: addressToUse.formattedAddress,
              city: addressToUse.city,
              region: addressToUse.region,
              country: addressToUse.country,
              placeId: addressToUse.placeId,
            });
            setIsLoading(false);
          } else {
            // Si no tiene coordenadas, intentar geocodificar el texto
            const addressText = addressToUse.formattedAddress;
            const result = await mapsService.geocode(addressText);
            
            if (result.success && result.data) {
              setLocalLocation(result.data.location);
            } else {
              // Fallback
              setLocalLocation({
                latitude: null,
                longitude: null,
                address: addressToUse.formattedAddress,
                city: addressToUse.city,
                region: addressToUse.region,
                country: addressToUse.country,
              });
            }
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      }
    };

    setProfileLocation();
  }, [source, hasProfileLocation, profile.addresses, mapsService]);
  
  const handleSourceChange = (newSource: LocationSource) => {
    setSource(newSource);
    setError(null);
    setSearchResults([]);
    setSearchQuery('');
    
    // Auto-trigger actions
    if (newSource === 'profile' && hasProfileLocation) {
      // Logic handled by useEffect above
      setLocalLocation(null); // Reset to trigger effect properly
    } else if (newSource === 'gps') {
      handleGetGPS();
    }
  };
  
  const handleGetGPS = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await mapsService.getCurrentLocation();
    
    if (result.success && result.data) {
      setLocalLocation(result.data);
      
      if (result.fallbackUsed) {
        setError('🌐 Running in Demo Mode. Results are simulated.');
      }
    } else {
      setError(result.error || 'Could not get location');
    }
    
    setIsLoading(false);
  };
  
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    const result = await mapsService.searchLocation({
      query: searchQuery,
      limit: 5,
      language: 'es',
    });
    
    if (result.success && result.data) {
      setSearchResults(result.data);
    } else {
      setError(result.error || 'Search failed');
    }
    
    setIsLoading(false);
  };
  
  const handleSelectResult = async (result: GeocodingResult) => {
    // If we don't have coordinates (light result), fetch details
    if (result.placeId && (result.location.latitude === null || result.location.latitude === undefined)) {
      setIsLoading(true);
      setError(null);
      
      const detailsResult = await mapsService.getPlaceDetails(result.placeId);
      
      if (detailsResult.success && detailsResult.data) {
        setLocalLocation(detailsResult.data.location);
      } else {
        setError(detailsResult.error || 'Failed to get location details');
      }
      setIsLoading(false);
    } else {
      setLocalLocation(result.location);
    }
    setSearchResults([]);
  };
  
  const canProceed = !!localLocation;
  
  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        
        {/* Header */}
        <div>
          <h2 className="text-xl font-semibold mb-1">📍 Where is your item located?</h2>
          <p className="text-sm text-muted-foreground">
            Select how to set the location
          </p>
        </div>
        
        {/* Location Source Options - TABS HORIZONTALES */}
        <Tabs value={source} onValueChange={(val) => handleSourceChange(val as LocationSource)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger 
              value="profile" 
              disabled={!hasProfileLocation}
              className="text-xs"
            >
              🏠 Profile
            </TabsTrigger>
            <TabsTrigger value="gps" className="text-xs">
              📍 Current
            </TabsTrigger>
            <TabsTrigger value="search" className="text-xs">
              🔍 Search
            </TabsTrigger>
          </TabsList>
          
          {/* Tab Content: PROFILE */}
          <TabsContent value="profile" className="mt-3">
            {hasProfileLocation ? (
              (() => {
                const addressToUse = profile.addresses.find(a => a.isDefaultForPublishing) || profile.addresses[0];
                return (
                  <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                        ✓ Using address: {addressToUse.label}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {addressToUse.formattedAddress}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {[addressToUse.city, addressToUse.region, addressToUse.country].filter(Boolean).join(', ')}
                    </p>
                  </div>
                );
              })()
            ) : (
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-muted-foreground">
                  No profile addresses saved. Go to your profile settings to add one.
                </p>
              </div>
            )}
          </TabsContent>
          
          {/* Tab Content: GPS */}
          <TabsContent value="gps" className="mt-3">
            <div className="space-y-2">
              <Button 
                onClick={handleGetGPS}
                disabled={isLoading}
                className="w-full"
                variant="outline"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Detecting location...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Detect Current Location
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Uses your device's GPS to detect location
              </p>
            </div>
          </TabsContent>
          
          {/* Tab Content: SEARCH */}
          <TabsContent value="search" className="mt-3">
            <div className="space-y-2">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter city, address, or place..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1"
                />
                <Button 
                  onClick={handleSearch}
                  disabled={isLoading || !searchQuery.trim()}
                  size="icon"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>
              
              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="border-2 border-gray-300 rounded-lg overflow-hidden">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectResult(result)}
                      className="w-full text-left p-3 hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
                    >
                      <p className="font-medium text-sm">{result.formattedAddress}</p>
                      <p className="text-xs text-muted-foreground">
                        {result.location.city}, {result.location.region}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Error message */}
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
            {error}
          </div>
        )}
        
        {/* SELECTED LOCATION CARD - MUY VISIBLE con borde punteado */}
        {localLocation && (
          <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 bg-gray-50">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-600 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 mb-1">Selected Location</p>
                <p className="text-sm text-gray-700 mb-1">
                  {localLocation.address || 
                   [localLocation.city, localLocation.region].filter(Boolean).join(", ") || 
                   "Ubicación sin dirección"}
                </p>
                <p className="text-xs text-muted-foreground font-mono bg-white/50 px-2 py-1 rounded inline-block">
                  {localLocation.latitude !== null && localLocation.latitude !== undefined && localLocation.longitude !== null && localLocation.longitude !== undefined
                    ? `📍 ${Number(localLocation.latitude).toFixed(4)}, ${Number(localLocation.longitude).toFixed(4)}`
                    : '🏢 Text-only location (No GPS)'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* LOCATION PRECISION - Two buttons */}
        <div className="space-y-3">
          <p className="font-medium">Location Precision</p>
          
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLocalPrecision('approximate')}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                localPrecision === 'approximate'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <p className="font-medium text-sm">Approximate</p>
            </button>
            
            <button
              type="button"
              onClick={() => setLocalPrecision('exact')}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                localPrecision === 'exact'
                  ? 'border-primary bg-primary/5 shadow-sm'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <p className="font-medium text-sm">Exact</p>
            </button>
          </div>
          
          {/* Microcopy educativo */}
          <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
            💡 {localPrecision === 'approximate' 
              ? 'Buyers will see your general area (approximately 500m radius)'
              : 'Buyers will see your precise location on the map'}
          </div>
        </div>
        
      </div>
      
      {/* Footer Buttons */}
      <div className="border-t border-border p-4 space-y-2 bg-background">
        <Button 
          onClick={onNext} 
          disabled={!canProceed}
          className="w-full"
        >
          {canProceed ? 'Continue' : 'Select location first'}
        </Button>
        <Button 
          onClick={onBack} 
          variant="outline"
          className="w-full"
        >
          Back
        </Button>
      </div>
    </div>
  );
}
