/**
 * Category Type Badge Component
 * Displays the main category type (Product, Service, Event)
 * Note: Rental is treated as Service for visual consistency
 */

import { Package, Wrench, Calendar } from 'lucide-react';
import type { Product } from '../../data/products';
import { getCategory, getCategoryColor } from './productCardUtils';

interface CategoryTypeBadgeProps {
  type: Product['type'];
  size?: 'default' | 'compact';
}

/**
 * Get category icon
 */
function getCategoryIcon(category: string, size: 'default' | 'compact' = 'default') {
  const iconClass = size === 'compact' ? 'w-2.5 h-2.5' : 'w-3 h-3';
  switch (category) {
    case 'Service':
      return <Wrench className={iconClass} />;
    case 'Event':
      return <Calendar className={iconClass} />;
    case 'Product':
    default:
      return <Package className={iconClass} />;
  }
}

export function CategoryTypeBadge({ type, size = 'default' }: CategoryTypeBadgeProps) {
  const category = getCategory(type);
  const colorClasses = getCategoryColor(category);
  
  // Size-specific classes
  const sizeClasses = size === 'compact' 
    ? 'px-2 py-0.5 text-[10px]' 
    : 'px-2.5 py-1 text-xs';
  
  return (
    <div className="absolute top-[var(--space-sm)] left-[var(--space-sm)]" data-field="category-type">
      <span className={`inline-flex items-center gap-1.5 backdrop-blur-md rounded-full font-medium shadow-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)] ${colorClasses} ${sizeClasses}`}>
        {getCategoryIcon(category, size)}
        {category}
      </span>
    </div>
  );
}