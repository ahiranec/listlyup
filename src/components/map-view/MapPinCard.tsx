/**
 * Map Pin Card Component
 * Mini product card that appears on pin hover
 */

import { MiniProductCard } from '../MiniProductCard';
import { Product } from '../../types';

interface MapPinCardProps {
  product: Product;
  showOnLeft: boolean;
  onClick?: () => void;
}

export function MapPinCard({ 
  product, 
  showOnLeft,
  onClick 
}: MapPinCardProps) {
  return (
    <div 
      className={`absolute top-1/2 -translate-y-1/2 z-50 ${
        showOnLeft ? 'right-full mr-3' : 'left-full ml-3'
      }`}
      style={{ pointerEvents: 'auto' }}
    >
      <MiniProductCard
        image={product.image}
        title={product.title}
        price={product.price}
        condition={product.condition}
        location={product.location ? `${product.location} (approx.)` : "Approx. location"}
        type={product.type}
        eventDate={product.eventDate}
        eventEndDate={product.eventEndDate}
        eventTime={product.eventTime}
        eventTimeEnd={product.eventTimeEnd}
        pricingModel={product.pricingModel}
        duration={product.duration}
        onClick={onClick}
      />
    </div>
  );
}