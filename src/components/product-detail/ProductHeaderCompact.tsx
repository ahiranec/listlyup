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
import type { CanonicalListing } from "../../types/canonical";
import type { ExtendedProduct } from "./types";
import { formatEventDateRange } from "../../utils/helpers";

interface ProductHeaderCompactProps {
  product: CanonicalListing;
  extendedProduct: ExtendedProduct;
  isOwner?: boolean;
}

export function ProductHeaderCompact({
  product,
  extendedProduct,
  isOwner = false,
}: ProductHeaderCompactProps) {
  // Map canonical listing_type + offer_mode to legacy type
  const legacyType = product.listing_type === 'product' ? product.offer_mode : product.listing_type;
  
  // Determinar si es tipo PRODUCT (sale, trade, free, sale_or_trade)
  const isProduct =
    legacyType === "sale" ||
    legacyType === "trade" ||
    legacyType === "free" ||
    legacyType === "sale_or_trade";

  // Canonical price display
  const priceDisplay = product.price_amount && product.price_currency 
    ? `${product.price_amount} ${product.price_currency}` 
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
                <>
                  <span className="text-xl text-primary text-[16px]">
                    {priceDisplay || "0 USD"}
                  </span>
                  {extendedProduct.discount && (
                    <Badge variant="destructive" className="text-xs h-5">
                      {extendedProduct.discount}% OFF
                    </Badge>
                  )}
                </>
              )}
              {legacyType === "sale_or_trade" && (
                <span className="text-sm text-muted-foreground">or trade</span>
              )}
            </div>

            {/* Línea 2: Precio original + Edit (owner) */}
            {(extendedProduct.originalPrice || isOwner) && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                {extendedProduct.originalPrice && (
                  <span className="text-muted-foreground line-through">
                    {extendedProduct.originalPrice}
                  </span>
                )}
                {isOwner && (
                  <button className="text-primary ml-auto hover:underline">
                    Edit Price →
                  </button>
                )}
              </div>
            )}

            {/* Línea 3: Negotiable (discreto, secundario) */}
            {extendedProduct.negotiable && legacyType !== "free" && legacyType !== "trade" && (
              <div className="text-xs text-muted-foreground">
                💰 Negotiable
              </div>
            )}

            {/* Línea 4: Looking for (si es trade) */}
            {extendedProduct.lookingFor && extendedProduct.lookingFor.length > 0 && (
              <div className="flex items-start gap-1.5 text-xs text-muted-foreground">
                <Repeat className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium">Looking for: </span>
                  {extendedProduct.lookingFor.map((tag, i) => (
                    <span key={i}>
                      #{tag}
                      {i < extendedProduct.lookingFor!.length - 1 && ", "}
                    </span>
                  ))}
                </div>
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