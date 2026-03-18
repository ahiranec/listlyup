/**
 * Product Card Content Component
 * Title, price, location, and badges
 * 
 * Badge Strategy:
 * - Product: Offer Mode + Condition
 * - Service/Rental: Pricing Model only
 * - Event: Duration only (ticket type is redundant with price)
 */

import { MapPin, Calendar } from 'lucide-react';
import { TypeBadge } from './TypeBadge';
import { ConditionBadge } from './ConditionBadge';
import { PricingModelBadge } from './PricingModelBadge';
import { DurationBadge } from './DurationBadge';
import { formatPrice } from './productCardUtils';
import { formatEventDateRange } from '../../utils/helpers';

interface ProductCardContentProps {
  title: string;
  price?: string;
  location?: string;
  visibility?: string;
  type?: 'sale' | 'trade' | 'free' | 'sale_or_trade' | 'rent' | 'service' | 'event';
  eventDate?: string;
  eventEndDate?: string;
  eventTime?: string;
  eventTimeEnd?: string;
  condition?: string;
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly'; // SERVICE/RENTAL: Pricing model
  ticketType?: 'free' | 'paid'; // EVENT: Ticket type (not shown in badge)
  duration?: 'single' | 'multi'; // EVENT: Duration
}

export function ProductCardContent({
  title,
  price,
  location,
  visibility,
  type,
  eventDate,
  eventEndDate,
  eventTime,
  eventTimeEnd,
  condition,
  pricingModel,
  ticketType,
  duration
}: ProductCardContentProps) {
  // Determine which badges to show based on listing type
  const isProduct = type === 'sale' || type === 'trade' || type === 'free' || type === 'sale_or_trade';
  const isService = type === 'service' || type === 'rent';
  const isEvent = type === 'event';

  return (
    <div className="flex flex-col gap-2.5 px-[var(--space-md)] py-[var(--space-md)] sm:px-[var(--space-lg)] sm:py-[var(--space-lg)]">
      {/* Title */}
      <h3 className="text-lg font-semibold text-foreground line-clamp-2 leading-tight" data-field="listing-title">
        {title}
      </h3>

      {/* Info - Price and Location */}
      <div className="flex flex-col gap-1.5 text-sm">
        {/* Price */}
        <div className="flex items-center gap-1.5 font-medium text-primary" data-field="price-type">
          <span className="truncate">{formatPrice(type, price)}</span>
        </div>
        
        {/* Event Date - Only for events */}
        {type === 'event' && eventDate && (
          <div className="flex items-center gap-1.5 text-muted-foreground" data-field="event-date">
            <Calendar className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{formatEventDateRange(eventDate, eventTime, eventTimeEnd, duration, eventEndDate)}</span>
          </div>
        )}
        
        {/* Location */}
        <div className="flex items-center gap-1.5 text-muted-foreground" data-field="location">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{location || "Zapallar"}</span>
        </div>
      </div>

      {/* Badges - Max 2, same visual hierarchy */}
      <div className="flex items-center gap-2 flex-wrap" data-field="badges">
        {/* Product: Show Offer Mode + Condition */}
        {isProduct && (
          <>
            <TypeBadge type={type} />
            <ConditionBadge condition={condition} />
          </>
        )}

        {/* Service/Rental: Show Pricing Model only */}
        {isService && (
          <PricingModelBadge pricingModel={pricingModel} />
        )}

        {/* Event: Show Duration only (ticket type is redundant with price display) */}
        {isEvent && (
          <DurationBadge duration={duration} />
        )}
      </div>
    </div>
  );
}