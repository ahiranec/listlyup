/**
 * Map Pins Layer Component
 * Renders all pins on the map
 * Each pin is matched to a product by ID
 */

import { MapPin } from './MapPin';
import { PIN_POSITIONS } from './pinPositions';
import type { CanonicalListing } from '../../types/canonical';
import { useCurrentUser } from '../../hooks/useCurrentUser';

interface MapPinsLayerProps {
  visibleProducts: CanonicalListing[];
  activeProductId: string | null;
  onPinClick: (productId: string) => void;
  isAuthenticated: boolean;
}

export function MapPinsLayer({ 
  visibleProducts, 
  activeProductId,
  onPinClick,
  isAuthenticated
}: MapPinsLayerProps) {
  const { currentUser } = useCurrentUser({ isAuthenticated });

  return (
    <div className="absolute inset-0 z-10">
      {PIN_POSITIONS.map((pin) => {
        // Buscar el producto que corresponde a este pin por ID
        const product = visibleProducts.find(p => p.id === pin.id);
        const isActive = activeProductId === pin.id;
        
        // IMPORTANTE: Renderizar TODOS los pins, incluso sin producto
        // Si no hay producto, significa que es privado (grupo no accesible)
        // MapPin mostrará el tooltip "Private Group Listing" automáticamente

        return (
          <MapPin
            key={pin.id}
            id={pin.id}
            left={pin.left}
            top={pin.top}
            visible={pin.visible}
            product={product || null}
            currentUser={currentUser}
            isHovered={isActive}
            index={parseInt(pin.id) || 0}
            onHoverStart={() => {
              // Solo permitir selección si hay producto accesible
              if (product) {
                onPinClick(pin.id);
              }
            }}
            onHoverEnd={() => {}}
          >
            {/* Card removed - now shown in bottom carousel */}
          </MapPin>
        );
      })}
    </div>
  );
}