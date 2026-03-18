/**
 * GroupContentSection Component
 * Preview de productos del grupo (primeros 3-5)
 * Muestra mensaje bloqueado si no tiene permisos
 */

import { motion } from "motion/react";
import { Package, Lock, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface Product {
  id: string;
  title: string;
  price?: string;
  thumbnail?: string;
  location?: string;
}

interface GroupContentSectionProps {
  products?: Product[];
  canView: boolean; // true si es member o grupo public
  limit?: number; // Cuántos productos mostrar (default: 3)
  onViewAll?: () => void;
  onProductClick?: (productId: string) => void;
}

export function GroupContentSection({
  products = [],
  canView,
  limit = 3,
  onViewAll,
  onProductClick,
}: GroupContentSectionProps) {
  // Si no puede ver, mostrar mensaje bloqueado
  if (!canView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-4 mb-4 bg-muted/50 border border-border rounded-xl p-6 text-center"
      >
        <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-medium mb-1">Products Available to Members Only</h3>
        <p className="text-sm text-muted-foreground">
          Join this group to browse and share products with the community
        </p>
      </motion.div>
    );
  }

  // Si no hay productos
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mx-4 mb-4 bg-muted/50 border border-border rounded-xl p-6 text-center"
      >
        <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-medium mb-1">No Products Yet</h3>
        <p className="text-sm text-muted-foreground">
          Be the first to share a product in this group
        </p>
      </motion.div>
    );
  }

  const displayProducts = products.slice(0, limit);
  const hasMore = products.length > limit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mx-4 mb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium">
            Products {products.length > 0 && `(${products.length})`}
          </h3>
        </div>
        {hasMore && onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="h-8 text-xs"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>

      {/* Products List */}
      <div className="space-y-0 bg-card rounded-xl border overflow-hidden">
        {displayProducts.map((product, index) => (
          <motion.button
            key={product.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onProductClick?.(product.id)}
            className="w-full flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50 transition-fast text-left"
          >
            {/* Thumbnail */}
            <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
              <ImageWithFallback
                src={product.thumbnail || ""}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium truncate">{product.title}</h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                {product.price && (
                  <span className="font-semibold text-primary">
                    {product.price}
                  </span>
                )}
                {product.location && (
                  <>
                    <span>·</span>
                    <span className="truncate">{product.location}</span>
                  </>
                )}
              </div>
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
