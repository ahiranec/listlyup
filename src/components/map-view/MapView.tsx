/**
 * Map View Component (Refactored)
 * Displays products on an interactive map
 * Shows geolocated products between Valparaíso and Zapallar
 */

import { useState } from 'react';
import { Header } from '../header';
import { SearchBar } from '../search-bar';
import { BottomNav } from '../bottom-nav';
import { MapBackground } from './MapBackground';
import { MapControls } from './MapControls';
import { MapLabels } from './MapLabels';
import { MapPinsLayer } from './MapPinsLayer';
import { MapBottomCarousel } from './MapBottomCarousel';
import type { CanonicalListing } from '../../types/canonical';
import type { FilterOptions } from '../filter-sheet';
import { useAppState } from '../../hooks/useAppState';
import { PIN_POSITIONS } from './pinPositions';

interface MapViewProps {
  products: CanonicalListing[];
  onBack: () => void;
  logo: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  onFilterClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  hasActiveFilters?: boolean;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onProductClick?: (productId: string) => void;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

export function MapView({ 
  products, 
  onBack,
  logo,
  notificationCount,
  onNotificationClick,
  onProfileClick,
  onFilterClick,
  searchQuery = "",
  onSearchChange,
  hasActiveFilters,
  activeTab = "home",
  onTabChange,
  onProductClick,
  filters,
  onFiltersChange,
}: MapViewProps) {
  // Filtrar productos: SOLO los que tienen pin en el mapa
  // El mapa solo muestra 12-15 productos geolocalizados de PIN_POSITIONS
  const visibleProducts = products.filter(product => 
    PIN_POSITIONS.some(pin => pin.id === product.id)
  );
  
  // Calcular el producto inicial más cercano al centro del mapa (50%, 50%)
  const getInitialProductId = () => {
    if (visibleProducts.length === 0) return null;
    
    const MAP_CENTER_X = 50; // 50% left
    const MAP_CENTER_Y = 50; // 50% top
    
    let closestProduct: CanonicalListing | null = null;
    let closestDistance = Infinity;
    
    visibleProducts.forEach(product => {
      const pin = PIN_POSITIONS.find(p => p.id === product.id);
      if (!pin) return;
      
      const pinX = parseFloat(pin.left);
      const pinY = parseFloat(pin.top);
      
      // Calcular distancia euclidiana al centro
      const distance = Math.sqrt(
        Math.pow(pinX - MAP_CENTER_X, 2) + 
        Math.pow(pinY - MAP_CENTER_Y, 2)
      );
      
      if (distance < closestDistance) {
        closestDistance = distance;
        closestProduct = product;
      }
    });
    
    return closestProduct?.id || visibleProducts[0].id;
  };
  
  // Estado para el producto activo (sincronización pin ↔ carousel)
  const [activeProductId, setActiveProductId] = useState<string | null>(
    getInitialProductId()
  );
  
  // Obtener estado de autenticación
  const { isAuthenticated } = useAppState();

  const handleZoomIn = () => {
    // Future: Implement zoom functionality
  };

  const handleZoomOut = () => {
    // Future: Implement zoom functionality
  };

  const handlePinClick = (productId: string) => {
    setActiveProductId(productId);
  };

  const handleProductChange = (productId: string) => {
    setActiveProductId(productId);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex-shrink-0">
        <Header
          logo={logo}
          notificationCount={notificationCount}
          onNotificationClick={onNotificationClick}
          searchValue={searchQuery}
          onSearchChange={onSearchChange}
          searchPlaceholder="Search on map..."
          onMapViewClick={onBack}
          isMapView={true}
        />
      </div>

      {/* Search Bar con botón para volver a Home */}
      <div className="flex-shrink-0">
        <SearchBar
          filters={filters}
          onFiltersChange={onFiltersChange}
          onFilterClick={onFilterClick}
          onMapViewClick={onBack}
          hasActiveFilters={hasActiveFilters}
          isMapView={true}
        />
      </div>

      {/* Map Container - Simula Google Maps */}
      <div className="flex-1 relative bg-white flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <MapBackground />
          
          <MapControls 
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
          />
          
          <MapLabels 
            locationName="Valparaíso - Zapallar"
            mapType="satellite"
          />
          
          <MapPinsLayer
            visibleProducts={visibleProducts}
            activeProductId={activeProductId}
            onPinClick={handlePinClick}
            isAuthenticated={isAuthenticated}
          />
        </div>

        {/* Bottom Carousel (MVP canonical requirement) */}
        <div className="flex-shrink-0 mb-16">
          <MapBottomCarousel
            products={visibleProducts}
            activeProductId={activeProductId}
            onProductChange={handleProductChange}
            onProductClick={onProductClick}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

export default MapView;