/**
 * RelatedProducts - Recently Viewed + Similar Listings + More from Seller
 * Usa MiniProductCard en carousel horizontal
 * Orden: 1) Recently Viewed  2) Similar Listings  3) More from [Seller]
 * 
 * LÓGICA:
 * - Recently Viewed: Historial personal del buyer (max 6)
 * - Similar Listings: Solo para buyers (!isOwner), filtrado inteligente por categoría/tags/ubicación
 * - More from Seller: Solo aparece si hay productos del seller (length > 0)
 */

import { ShoppingBag, Clock } from "lucide-react";
import { Button } from "../ui/button";
import { MiniProductCard } from "../MiniProductCard";
import type { Product } from "../../data/products";

interface RelatedProductsProps {
  sellerName?: string;
  isOwner?: boolean;
  recentlyViewedProducts?: Array<{
    id: string;
    title: string;
    price?: string;
    image: string;
    condition?: string;
    location?: string;
    type?: Product['type'];
  }>;
  similarProducts: Array<{
    id: string;
    title: string;
    price?: string;
    image: string;
    condition?: string;
    location?: string;
    type?: Product['type'];
  }>;
  sellerProducts: Array<{
    id: string;
    title: string;
    price?: string;
    image: string;
    condition?: string;
    location?: string;
    type?: Product['type'];
  }>;
  onProductClick: (productId: string) => void; // NEW: Navigate to listing detail
  onClearHistory?: () => void; // NEW: Clear recently viewed history
}

export function RelatedProducts({ 
  sellerName, 
  isOwner = false, 
  recentlyViewedProducts = [],
  similarProducts, 
  sellerProducts, 
  onProductClick,
  onClearHistory
}: RelatedProductsProps) {
  // Si no hay productos de ningún tipo, no renderizar nada
  if (
    (!isOwner && recentlyViewedProducts.length === 0 && similarProducts.length === 0) && 
    sellerProducts.length === 0
  ) {
    return null;
  }

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Recently Viewed - Solo para buyers */}
      {!isOwner && recentlyViewedProducts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Recently Viewed
            </h3>
            {onClearHistory && (
              <Button 
                variant="link" 
                size="sm" 
                className="h-auto p-0 text-xs"
                onClick={onClearHistory}
              >
                Clear history →
              </Button>
            )}
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {recentlyViewedProducts.map((item) => (
              <div key={`recent-${item.id}`} className="flex-shrink-0 w-32">
                <MiniProductCard
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  condition={item.condition}
                  location={item.location}
                  type={item.type}
                  onClick={() => onProductClick(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Similar Listings - Solo para buyers */}
      {!isOwner && similarProducts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              Similar Listings
            </h3>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              View all →
            </Button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {similarProducts.map((item) => (
              <div key={`sim-${item.id}`} className="flex-shrink-0 w-32">
                <MiniProductCard
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  condition={item.condition}
                  location={item.location}
                  type={item.type}
                  onClick={() => onProductClick(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* More from Seller - Solo aparece si hay productos del seller */}
      {sellerProducts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm flex items-center gap-2">
              <ShoppingBag className="w-4 h-4" />
              {isOwner ? "Your Other Listings" : `More from ${sellerName}`}
            </h3>
            <Button variant="link" size="sm" className="h-auto p-0 text-xs">
              See all →
            </Button>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {sellerProducts.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-32">
                <MiniProductCard
                  image={item.image}
                  title={item.title}
                  price={item.price}
                  condition={item.condition}
                  location={item.location}
                  type={item.type}
                  onClick={() => onProductClick(item.id)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}