import { Repeat, TrendingDown } from "lucide-react";
import { motion } from "motion/react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Product } from "../../data/products";
import type { ExtendedProduct } from "./types";

interface ProductHeaderProps {
  product: Product;
  extendedProduct: ExtendedProduct;
  isOwner?: boolean;
  isDescriptionExpanded: boolean;
  onDescriptionToggle: (expanded: boolean) => void;
}

export function ProductHeader({
  product,
  extendedProduct,
  isOwner = false,
  isDescriptionExpanded,
  onDescriptionToggle
}: ProductHeaderProps) {
  return (
    <section className="px-4 py-4 space-y-3">
      {/* Título */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h1>{product.title}</h1>
      </motion.div>

      {/* Pricing Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {/* Precio principal con badges inline */}
        <div className="flex items-baseline gap-2 flex-wrap">
          {product.type === 'free' ? (
            <span className="text-green-600">FREE</span>
          ) : product.type === 'trade' ? (
            <span className="text-purple-600">For Trade</span>
          ) : (
            <>
              <span className="text-primary">{product.price || "0 USD"}</span>
              {extendedProduct.discount && (
                <Badge variant="destructive" className="text-xs h-5">
                  🔥 {extendedProduct.discount}% OFF
                </Badge>
              )}
              {extendedProduct.negotiable && (
                <Badge variant="outline" className="text-xs h-5">
                  💰 Negotiable
                </Badge>
              )}
            </>
          )}
          {product.type === 'sale_or_trade' && (
            <span className="text-sm text-muted-foreground">or trade</span>
          )}
        </div>

        {/* Segunda línea: Precio original + Price dropped + Edit (owner) - Todo en una línea */}
        {(extendedProduct.originalPrice || isOwner) && (
          <div className="flex items-center gap-2 flex-wrap mt-1.5">
            {extendedProduct.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  {extendedProduct.originalPrice}
                </span>
                {extendedProduct.discount && extendedProduct.priceHistory && extendedProduct.priceHistory.length > 1 && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <div className="flex items-center gap-1 text-xs text-green-600">
                      <TrendingDown className="w-3 h-3" />
                      <span>Price dropped ${parseInt(extendedProduct.originalPrice || "0") - parseInt(product.price || "0")} USD this week</span>
                    </div>
                  </>
                )}
              </>
            )}
            {isOwner && (
              <button className="text-xs text-primary ml-auto hover:underline">
                Edit Price →
              </button>
            )}
          </div>
        )}

        {/* Looking for (si es trade) */}
        {extendedProduct.lookingFor && extendedProduct.lookingFor.length > 0 && (
          <div className="flex items-start gap-1.5 text-xs text-muted-foreground mt-1.5">
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
      </motion.div>

      {/* Description Collapsible */}
      <Collapsible open={isDescriptionExpanded} onOpenChange={onDescriptionToggle}>
        <div className="space-y-2">
          <CollapsibleTrigger className="touch-target w-full flex items-center justify-between text-sm hover:text-primary transition-fast">
            <span>Description</span>
            {isDescriptionExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </CollapsibleTrigger>
          <CollapsibleContent className="text-sm text-muted-foreground leading-relaxed">
            This is a {product.condition?.toLowerCase() || "used"} {product.title}. 
            Perfect for anyone looking for a quality product at a great price. 
            Includes original box and manual. Works perfectly, just upgrading to a new model.
            {product.type === 'trade' && " Open to trade offers."}
            {product.type === 'sale_or_trade' && " Willing to sell or trade."}
            {product.type === 'free' && " Free to a good home!"}
            {product.type === 'rent' && " Available for rent by day, week, or month."}
            {product.type === 'service' && " Professional service with quality guarantee."}
            {product.type === 'event' && " Join us for this amazing event! Mark your calendar."}
          </CollapsibleContent>
        </div>
      </Collapsible>
    </section>
  );
}