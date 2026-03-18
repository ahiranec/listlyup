/**
 * Map Bottom Carousel Component
 * Bottom carousel obligatorio para Map View (MVP canonical)
 * - Instagram-style centered carousel with navigation arrows
 * - Cards super juntas (2px gap)
 * - Ordenamiento geográfico: abajo→arriba (filas), izquierda→derecha (dentro de fila)
 * - Arrow buttons + swipe support
 * - Syncs with map pins (pin ↔ card interaction)
 */

import { useEffect, useRef, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MiniProductCard } from '../MiniProductCard';
import type { CanonicalListing } from '../../types/canonical';
import { PIN_POSITIONS } from './pinPositions';

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
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ordenar productos por posición geográfica (izquierda → derecha en el mapa)
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const pinA = PIN_POSITIONS.find(p => p.id === a.id);
      const pinB = PIN_POSITIONS.find(p => p.id === b.id);
      
      if (!pinA || !pinB) return 0;
      
      // Extraer valores numéricos de porcentajes
      const leftA = parseFloat(pinA.left);
      const leftB = parseFloat(pinB.left);
      const topA = parseFloat(pinA.top);
      const topB = parseFloat(pinB.top);
      
      // Ordenar primero de ABAJO hacia ARRIBA (top mayor primero)
      // Luego dentro de cada fila, de OESTE a ESTE (left menor primero)
      const TOP_THRESHOLD = 5; // Considerar misma fila si diff < 5%
      
      if (Math.abs(topA - topB) > TOP_THRESHOLD) {
        // Diferentes filas: abajo primero (top mayor primero)
        return topB - topA;
      } else {
        // Misma fila: izquierda primero
        return leftA - leftB;
      }
    });
  }, [products]);

  const activeIndex = sortedProducts.findIndex(p => p.id === activeProductId);
  const currentIndex = activeIndex >= 0 ? activeIndex : 0;

  // Auto-scroll to active card when activeProductId changes (from pin click)
  useEffect(() => {
    if (activeProductId && cardRefs.current[activeProductId]) {
      const activeCard = cardRefs.current[activeProductId];
      const carousel = carouselRef.current;
      
      if (activeCard && carousel) {
        const cardLeft = activeCard.offsetLeft;
        const cardWidth = activeCard.offsetWidth;
        const carouselWidth = carousel.offsetWidth;
        const scrollLeft = cardLeft - (carouselWidth / 2) + (cardWidth / 2);
        
        carousel.scrollTo({
          left: scrollLeft,
          behavior: 'smooth'
        });
      }
    }
  }, [activeProductId]);

  // Detect which card is centered on scroll
  const handleScroll = () => {
    // Clear previous timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Debounce to detect when scroll stops
    scrollTimeoutRef.current = setTimeout(() => {
      const carousel = carouselRef.current;
      if (!carousel) return;

      const carouselCenter = carousel.scrollLeft + (carousel.offsetWidth / 2);
      
      let closestProductId: string | null = null;
      let closestDistance = Infinity;

      sortedProducts.forEach(product => {
        const card = cardRefs.current[product.id];
        if (!card) return;

        const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
        const distance = Math.abs(cardCenter - carouselCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestProductId = product.id;
        }
      });

      if (closestProductId && closestProductId !== activeProductId) {
        onProductChange(closestProductId);
      }
    }, 100); // Wait 100ms after scroll stops
  };

  // Navigate to next card
  const handleNext = () => {
    if (currentIndex < sortedProducts.length - 1) {
      const nextProduct = sortedProducts[currentIndex + 1];
      onProductChange(nextProduct.id);
    }
  };

  // Navigate to previous card
  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevProduct = sortedProducts[currentIndex - 1];
      onProductChange(prevProduct.id);
    }
  };

  if (sortedProducts.length === 0) {
    return (
      <div className="w-full px-4 py-4 bg-white border-t border-gray-200 shadow-lg">
        <p className="text-center text-sm text-gray-500">No listings found in this area</p>
      </div>
    );
  }

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < sortedProducts.length - 1;

  return (
    <div className="w-full bg-white border-t border-gray-200 shadow-[0_-4px_16px_rgba(0,0,0,0.1)] relative">
      {/* Counter - movido arriba, integrado en el carousel */}
      <div className="absolute top-2 right-3 z-20 bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
        {currentIndex + 1} / {sortedProducts.length}
      </div>

      {/* Left Arrow Button */}
      {canGoPrev && (
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Previous listing"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Right Arrow Button */}
      {canGoNext && (
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all hover:scale-110 active:scale-95"
          aria-label="Next listing"
        >
          <ChevronRight className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Carousel Container - padding superior normal, inferior mínimo */}
      <div 
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-0.5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pt-3 pb-1"
        style={{ 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Left padding to center first card - 200px card width */}
        <div className="flex-shrink-0" style={{ width: 'calc(50% - 100px)' }} />
        
        {sortedProducts.map((product, index) => {
          const isActive = product.id === activeProductId;
          
          // Map canonical fields to MiniProductCard props
          const priceDisplay = product.price_amount && product.price_currency 
            ? `${product.price_amount} ${product.price_currency}` 
            : undefined;
          const legacyType = product.listing_type === 'product' ? product.offer_mode : product.listing_type;
          const imageUrl = product.primary_image_url || '';
          
          return (
            <div
              key={product.id}
              ref={(el) => { cardRefs.current[product.id] = el; }}
              className="flex-shrink-0 snap-center"
            >
              <div 
                className={`transition-all duration-300 ease-out ${
                  isActive 
                    ? 'scale-100 opacity-100' 
                    : 'scale-95 opacity-50'
                }`}
                onClick={() => {
                  onProductChange(product.id);
                }}
              >
                <MiniProductCard
                  image={imageUrl}
                  title={product.title}
                  price={priceDisplay}
                  condition={product.condition}
                  location="Approx. location"
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
        
        {/* Right padding to center last card */}
        <div className="flex-shrink-0" style={{ width: 'calc(50% - 100px)' }} />
      </div>
    </div>
  );
}