/**
 * MiniProductCard - Versión compacta de ProductCard
 * Para mostrar en hover sobre pins del mapa
 * 
 * Badge Strategy (100% consistente con ProductCard):
 * - Badge superior (sobre imagen): Category Type (Product/Service/Event) 
 * - Badges inferiores (debajo de locación), máximo 2:
 *   • Product: Offer Mode + Condition
 *   • Service/Rental: Pricing Model only
 *   • Event: Duration only (Single day / Multi-day)
 * 
 * Normalización:
 * - "Rental" → "Service" (via getCategory en utils)
 * - Event no muestra Free/Paid badge (redundante con precio)
 */

import { MapPin, Calendar } from "lucide-react";
import { motion } from "motion/react";
import type { Product } from '../data/products';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { CategoryTypeBadge } from './product-card/CategoryTypeBadge';
import { TypeBadge } from './product-card/TypeBadge';
import { ConditionBadge } from './product-card/ConditionBadge';
import { PricingModelBadge } from './product-card/PricingModelBadge';
import { DurationBadge } from './product-card/DurationBadge';
import { formatPrice } from './product-card/productCardUtils';
import { formatEventDateRange } from '../utils/helpers';

interface MiniProductCardProps {
  image: string;
  title: string;
  price?: string;
  condition?: string;
  location?: string;
  type?: Product['type'];
  eventDate?: string;
  eventEndDate?: string;
  eventTime?: string;
  eventTimeEnd?: string;
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  duration?: 'single' | 'multi';
  onClick?: () => void;
}

export function MiniProductCard({
  image,
  title,
  price,
  condition,
  location,
  type = "sale",
  eventDate,
  eventEndDate,
  eventTime,
  eventTimeEnd,
  pricingModel,
  duration,
  onClick,
}: MiniProductCardProps) {
  // Determine listing category for badge logic
  const isProduct = type === 'sale' || type === 'trade' || type === 'free' || type === 'sale_or_trade';
  const isService = type === 'service' || type === 'rent';
  const isEvent = type === 'event';
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: 10 }}
      transition={{ 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.2 
      }}
      onClick={onClick}
      className="w-[200px] bg-white rounded-lg border border-gray-200 shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow"
    >
      {/* Imagen - agrandada para mejor visibilidad */}
      <div className="relative h-[120px] bg-muted overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        
        {/* Category Type Badge - reutiliza componente modular con size compact */}
        <CategoryTypeBadge type={type} size="compact" />
      </div>

      {/* Content - compacto */}
      <div className="px-[var(--space-sm)] py-[var(--space-sm)] space-y-1.5">
        {/* Título */}
        <h4 className="text-xs font-semibold text-foreground line-clamp-1 leading-tight">
          {title}
        </h4>

        {/* Precio/Tipo - usa formatPrice compartido */}
        <div className="flex items-center gap-1 text-[11px] font-medium text-primary">
          <span className="truncate">{formatPrice(type, price)}</span>
        </div>
        
        {/* Event Date - Only for events */}
        {isEvent && eventDate && (
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <Calendar className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{formatEventDateRange(eventDate, eventTime, eventTimeEnd, duration, eventEndDate)}</span>
          </div>
        )}
        
        {/* Ubicación */}
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <MapPin className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{location || "Zapallar"}</span>
        </div>

        {/* Badges - Reutiliza componentes modulares con size="compact" */}
        <div className="flex items-center gap-1 flex-wrap">
          {/* PRODUCT: Offer Mode + Condition (máx 2 badges) */}
          {isProduct && (
            <>
              <TypeBadge type={type} size="compact" />
              <ConditionBadge condition={condition} size="compact" />
            </>
          )}

          {/* SERVICE/RENTAL: Pricing Model only (1 badge) */}
          {isService && (
            <PricingModelBadge pricingModel={pricingModel} size="compact" />
          )}

          {/* EVENT: Duration only (1 badge) - NO Free/Paid */}
          {isEvent && (
            <DurationBadge duration={duration} size="compact" />
          )}
        </div>
      </div>
    </motion.div>
  );
}