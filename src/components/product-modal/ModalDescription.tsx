/**
 * Modal Description Component
 * Product description section
 */

import type { Product } from '../../data/products';

interface ModalDescriptionProps {
  product: Product;
}

export function ModalDescription({ product }: ModalDescriptionProps) {
  return (
    <div className="pt-4 border-t border-gray-200">
      <h4 className="font-semibold text-foreground mb-2">Description</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">
        This is a placeholder description for {product.title}. In a real
        application, this would contain detailed information about the
        product, its features, and condition.
      </p>
    </div>
  );
}
