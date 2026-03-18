/**
 * Modal Price Component
 * Displays price with icon, type badge, and condition badge
 */

import { Tag } from 'lucide-react';
import { TypeBadge } from '../product-card/TypeBadge';
import { ConditionBadge } from '../product-card/ConditionBadge';
import { getModalPriceText } from './modalUtils';
import type { Product } from '../../data/products';

interface ModalPriceProps {
  product: Product;
}

export function ModalPrice({ product }: ModalPriceProps) {
  return (
    <div className="space-y-3">
      {/* Price */}
      <div className="flex items-center gap-2 text-primary">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Tag className="w-5 h-5" />
        </div>
        <span className="text-xl font-semibold">
          {getModalPriceText(product)}
        </span>
      </div>
      
      {/* Badges - Type (Offer Mode) and Condition */}
      <div className="flex items-center gap-2 flex-wrap">
        <TypeBadge type={product.type} size="large" />
        <ConditionBadge condition={product.condition} />
      </div>
    </div>
  );
}