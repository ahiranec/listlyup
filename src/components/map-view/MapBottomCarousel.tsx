/**
 * Map Bottom Carousel Component
 * Bottom carousel obligatorio para Map View (MVP canonical)
 * - Instagram-style centered carousel with navigation arrows
 * - Cards super juntas (2px gap)
 * - Ordenamiento geográfico: abajo→arriba (filas), izquierda→derecha (dentro de fila)
 * - Arrow buttons + swipe support
 * - Syncs with map pins (pin ↔ card interaction)
 */

import { useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MiniProductCard } from '../MiniProductCard';
import { formatPrice } from '../../utils/formatPrice';
import type { CanonicalListing } from '../../types/canonical';

interface MapBottomCarouselProps {
  products: CanonicalListing[];
  activeProductId: string | null;
  onProductChange: (productId: string) => void;
  onProductClick?: (productId: string) => void;
}

export function MapBottomCarousel({ 
  products, 
  activeProductId,
  onProductChange,
  onProductClick 
}: MapBottomCarouselProps) {
  // ORDEN DEL CARRUSEL SEGÚN MVP:
  // - Si no hay nada seleccionado: orden original (basado en creación o fetch).
  // - Si hay pin agrupado (>1) activo: mostrar SÓLO los listings de ese grupo.
  // - Si hay pin normal (1) activo: mostrar todo el viewport pero ordenado por proximidad.
  const sortedProducts = useMemo(() => {
    const list = [...products];
    if (!activeProductId) return list;
    
    const activeP = list.find(p => p.id === activeProductId);
    if (!activeP || activeP.latitude == null || activeP.longitude == null) return list;
    
    // Identificar grupo con coordenadas idénticas al pin activo
    const exactGroup = list.filter(p => p.latitude === activeP.latitude && p.longitude === activeP.longitude);
    
    // Si hago clic en un grupo (más de 1 coincidencia idéntica), aíslo el carrusel
    const currentListToUse = exactGroup.length > 1 ? exactGroup : list;
    
    return currentListToUse.sort((a, b) => {
      // 1. Forzar el activo siempre al principio (índice 0)
      if (a.id === activeProductId) return -1;
      if (b.id === activeProductId) return 1;
      
      // 2. Proximidad al activo (si el grupo es aislado, esto dará 0 y se respetará orden nativo)
      const distA = Math.pow(a.latitude! - activeP.latitude!, 2) + Math.pow(a.longitude! - activeP.longitude!, 2);
      const distB = Math.pow(b.latitude! - activeP.latitude!, 2) + Math.pow(b.longitude! - activeP.longitude!, 2);
      return distA - distB;
    });
  }, [products, activeProductId]);

  const currentIndex = 0; // El activo siempre es el primero en este orden dinámico

  // Navigate to next card (el más cercano)
  const handleNext = () => {
    if (sortedProducts.length > 1) {
      onProductChange(sortedProducts[1].id);
    }
  };

  // Navigate to prev card (volvemos al centro lógico)
  const handlePrev = () => {
    if (sortedProducts.length > 0) {
      onProductChange(sortedProducts[0].id); 
    }
  };

  if (sortedProducts.length === 0) {
    return (
      <div className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-lg">
        <p className="text-center text-sm text-gray-500">No listings found in this area</p>
      </div>
    );
  }

  const canGoNext = sortedProducts.length > 1;

  return (
    <div className="w-full bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] relative">
      {/* Counter */}
      <div className="absolute top-2 right-3 z-20 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
        {sortedProducts.length > 0 ? `1 / ${sortedProducts.length}` : '0'}
      </div>

      {/* Right Arrow Button (Next closest item) */}
      {canGoNext && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Next closest listing"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Carousel Container - Simple, natural flow sin huecos absurdos */}
      <div 
        className="flex gap-4 overflow-x-auto scrollbar-hide py-4 px-4 items-center"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {sortedProducts.map((product) => {
          const isActive = product.id === activeProductId;
          
          // Map canonical fields to MiniProductCard props
          const priceDisplay = product.price_amount != null && product.price_currency 
            ? formatPrice(product.price_amount, product.price_currency)
            : undefined;
          const legacyType = product.listing_type === 'product' ? product.offer_mode : product.listing_type;
          const imageUrl = product.primary_image_url || '';
          
          return (
            <div
              key={product.id}
              className="flex-shrink-0"
              onClick={() => {
                onProductChange(product.id);
              }}
            >
              <div 
                className={`transition-all duration-300 ease-out cursor-pointer ${
                  isActive 
                    ? 'scale-105 opacity-100 ring-2 ring-primary rounded-xl' 
                    : 'scale-95 opacity-70 hover:opacity-100'
                }`}
              >
                <MiniProductCard
                  image={imageUrl}
                  title={product.title}
                  price={priceDisplay}
                  condition={product.condition}
                  location={product.location_name || 'Ubicación no especificada'}
                  type={legacyType as any}
                  eventDate={product.start_date}
                  eventEndDate={product.end_date}
                  eventTime={product.event_time_text}
                  eventTimeEnd={undefined}
                  pricingModel={product.pricing_model}
                  duration={undefined}
                  onClick={() => onProductClick?.(product.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
