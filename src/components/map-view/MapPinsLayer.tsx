/**
 * Map Pins Layer Component
 * Renders all pins on the map using real coordinates
 */

import { AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import type { CanonicalListing } from '../../types/canonical';

interface Group {
  key: string;
  lat: number;
  lng: number;
  products: CanonicalListing[];
}

interface MapPinsLayerProps {
  groupedProducts: Group[];
  activeGroupKey: string | null;
  onPinClick: (productId: string) => void;
  isAuthenticated: boolean;
}

export function MapPinsLayer({ 
  groupedProducts, 
  activeGroupKey,
  onPinClick
}: MapPinsLayerProps) {
  return (
    <>
      {groupedProducts.map((group) => {
        const isActive = activeGroupKey === group.key;
        const count = group.products.length;
        
        return (
          <AdvancedMarker
            key={group.key}
            position={{ lat: group.lat, lng: group.lng }}
            onClick={() => onPinClick(group.products[0].id)}
            zIndex={isActive ? 50 : 1}
          >
            {count > 1 ? (
              <div 
                className={`flex items-center justify-center w-8 h-8 rounded-full border-2 shadow-lg transition-transform ${
                  isActive 
                    ? 'bg-primary text-white border-white scale-110 z-50' 
                    : 'bg-slate-900 text-white border-slate-700 scale-100'
                }`}
              >
                <span className="text-xs font-bold">{count}</span>
              </div>
            ) : (
              <Pin 
                background={isActive ? '#2563eb' : '#0f172a'} 
                borderColor={isActive ? '#ffffff' : '#475569'}
                glyphColor={isActive ? '#ffffff' : '#cbd5e1'}
                scale={isActive ? 1.2 : 1.0}
              />
            )}
          </AdvancedMarker>
        );
      })}
    </>
  );
}
