/**
 * Map View Component (Refactored)
 * Displays products on an interactive map
 * Shows geolocated products between Valparaíso and Zapallar
 */

import { useState, useEffect, useMemo } from 'react';
import { Header } from '../header';
import { SearchBar } from '../search-bar';
import { BottomNav } from '../bottom-nav';
import { APIProvider, Map, useMap } from '@vis.gl/react-google-maps';
import { MapPinsLayer } from './MapPinsLayer';
import { MapBottomCarousel } from './MapBottomCarousel';
import type { CanonicalListing } from '../../types/canonical';
import type { FilterOptions } from '../filter-sheet';
import { useAppState } from '../../hooks/useAppState';
interface MapViewProps {
  products: CanonicalListing[];
  onBack: () => void;
  logo: string;
  notificationCount?: number;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  userAvatar?: string;
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
  userAvatar,
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
  const [bounds, setBounds] = useState<any>(null);

  // Filtrar productos: SOLO los que tienen coordenadas válidas y están dentro del viewport
  const visibleProducts = products.filter(product => {
    if (product.latitude == null || product.longitude == null) return false;
    if (!bounds) return true; // Carga inicial
    return (
      product.latitude <= bounds.north &&
      product.latitude >= bounds.south &&
      product.longitude <= bounds.east &&
      product.longitude >= bounds.west
    );
  });
  
  const handleBoundsChanged = (e: any) => {
    setBounds(e.detail.bounds);
  };
  
  // Producto inicial
  const getInitialProductId = () => {
    if (visibleProducts.length === 0) return null;
    return visibleProducts[0].id;
  };
  
  // Estado para el producto activo (sincronización pin ↔ carousel)
  const [activeProductId, setActiveProductId] = useState<string | null>(
    getInitialProductId()
  );
  
  // Agrupar elementos con exactamente la misma lat/lng
  const groupedProducts = useMemo(() => {
    const groups: Record<string, CanonicalListing[]> = {};
    visibleProducts.forEach(p => {
      const key = `${p.latitude},${p.longitude}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(p);
    });
    return Object.entries(groups).map(([key, prods]) => ({
      key,
      lat: prods[0].latitude!,
      lng: prods[0].longitude!,
      products: prods
    }));
  }, [visibleProducts]);

  // Obtener grupo activo actual basado en el ID
  const activeProduct = visibleProducts.find(p => p.id === activeProductId);
  const activeGroupKey = activeProduct ? `${activeProduct.latitude},${activeProduct.longitude}` : null;
  
  // Obtener estado de autenticación
  const { isAuthenticated } = useAppState();

  const handlePinClick = (productId: string) => {
    setActiveProductId(productId);
  };

  const handleProductChange = (productId: string) => {
    setActiveProductId(productId);
  };

  // Subcomponente ligero para mover la cámara cuando cambia el pin activo
  const MapCameraHandler = () => {
    const map = useMap("DEMO_MAP_ID");
    
    useEffect(() => {
      if (map && activeProductId) {
        const p = products.find(x => x.id === activeProductId);
        if (p && p.latitude && p.longitude) {
          map.panTo({ lat: p.latitude, lng: p.longitude });
        }
      }
    }, [map, activeProductId]);
    
    return null;
  };

  return (
    <div className="flex-1 w-full relative bg-white flex flex-col rounded-xl overflow-hidden shadow-sm h-full">
      <div className="flex-1 relative overflow-hidden">
        <Map
          mapId="DEMO_MAP_ID"
          defaultZoom={11}
          defaultCenter={{ lat: -33.0456, lng: -71.6212 }} // Valparaíso as default
          disableDefaultUI={true}
          zoomControl={true}
          onBoundsChanged={handleBoundsChanged}
          onClick={() => setActiveProductId(null)}
        >
          <MapCameraHandler />
          <MapPinsLayer
            groupedProducts={groupedProducts}
            activeGroupKey={activeGroupKey}
            onPinClick={handlePinClick}
            isAuthenticated={isAuthenticated}
          />
        </Map>
      </div>

      {/* Bottom Carousel (MVP canonical requirement) */}
      <div className="flex-shrink-0 z-10 relative bg-background/50 backdrop-blur-sm border-t border-border">
        <MapBottomCarousel
          products={visibleProducts}
          activeProductId={activeProductId}
          onProductChange={handleProductChange}
          onProductClick={onProductClick}
        />
      </div>
    </div>
  );
}

export default MapView;
