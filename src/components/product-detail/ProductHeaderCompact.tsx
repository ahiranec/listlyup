/**
 * ProductHeaderCompact - TRANSVERSAL
 * Bloque clave bajo la foto: Title + Price + Meta principal
 * CRÍTICO: Siempre visible en primer viewport
 * 
 * PRODUCT finalizado: Price con descuento, Negotiable discreto, Trade interests
 */

import { Repeat, Clock, Calendar } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { PricingModelBadge } from "../product-card/PricingModelBadge";
import { DurationBadge } from "../product-card/DurationBadge";
import { type CanonicalListing, mapCanonicalToLegacyType } from "../../types/canonical";
import { formatEventDateRange } from "../../utils/helpers";
import { formatPrice } from "../../utils/formatPrice";

interface ProductHeaderCompactProps {
  product: CanonicalListing;
  isOwner?: boolean;
}

export function ProductHeaderCompact({
  product,
  isOwner = false,
}: ProductHeaderCompactProps) {
  // Map canonical listing_type + offer_mode to legacy type
  const legacyType = mapCanonicalToLegacyType(product.listing_type, product.offer_mode);
  
  // Determinar si es tipo PRODUCT (sale, trade, free, sale_or_trade)
  const isProduct =
    legacyType === "sale" ||
    legacyType === "trade" ||
    legacyType === "free" ||
    legacyType === "sale_or_trade";

  // Canonical price display
  const priceDisplay = product.price_amount && product.price_currency 
    ? formatPrice(product.price_amount, product.price_currency)
    : undefined;

  return (
    <section className="px-4 py-3 space-y-1.5">
      {/* 1. TITLE - Prioridad visual máxima */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl leading-tight"
      >
        {product.title}
      </motion.h1>

      {/* 2. PRICE CONTAINER - Contenedor único transversal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-1"
      >
        {/* ========== PRODUCT PRICE ========== */}
        {isProduct && (
          <>
            {/* Línea 1: Precio principal + % descuento */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {legacyType === "free" ? (
                <span className="text-xl text-green-600">FREE</span>
              ) : legacyType === "trade" ? (
                <span className="text-xl text-purple-600">For Trade</span>
              ) : (
                <span className="text-xl text-primary text-[16px]">
                  {priceDisplay || "0"}
                </span>
              )}
              {legacyType === "sale_or_trade" && (
                <span className="text-sm text-muted-foreground">or trade</span>
              )}
            </div>

            {/* Línea 2: Edit (owner) */}
            {isOwner && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <button className="text-primary ml-auto hover:underline">
                  Edit Price →
                </button>
              </div>
            )}
          </>
        )}

        {/* ========== SERVICE PRICE ========== */}
        {legacyType === "service" && (
          <>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl text-primary">
                {priceDisplay || "Contact for quote"}
              </span>
            </div>
            {product.pricing_model && (
              <PricingModelBadge pricingModel={product.pricing_model} />
            )}
            {product.business_hours && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="w-3 h-3" />
                <span>{product.business_hours}</span>
              </div>
            )}
          </>
        )}

        {/* ========== EVENT PRICE ========== */}
        {legacyType === "event" && (
          <>
            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              {priceDisplay ? (
                <span className="text-2xl text-primary">{priceDisplay}</span>
              ) : (
                <span className="text-2xl text-green-600">FREE</span>
              )}
            </div>
            
            {/* Event Date & Time - Single line */}
            {product.start_date && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4 flex-shrink-0" />
                <span>
                  {product.event_time_text || new Date(product.start_date).toLocaleDateString()}
                </span>
              </div>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}
