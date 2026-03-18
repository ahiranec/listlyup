/**
 * Type Badge Component
 * Shows listing offer mode (For Sale, For Trade, For Free, etc.)
 * Normalized size and style to match other badges
 */

import { ShoppingBag, Repeat, Gift, RefreshCcw } from 'lucide-react';
import type { Product } from '../../data/products';
import { getTypeBadgeColor, getTypeLabel } from './productCardUtils';

interface TypeBadgeProps {
  type: Product['type'];
  size?: 'default' | 'compact';
}

export function TypeBadge({ type, size = 'default' }: TypeBadgeProps) {
  const colorClasses = getTypeBadgeColor(type);
  
  // Size-specific classes
  const sizeClasses = size === 'compact' 
    ? 'px-1.5 py-0.5 text-[9px]' 
    : 'px-2 py-1 text-[10px]';
  
  const iconSize = size === 'compact' ? 'w-2 h-2' : 'w-2.5 h-2.5';
  
  const getIcon = () => {
    switch (type) {
      case 'free':
        return <Gift className={iconSize} />;
      case 'trade':
        return <Repeat className={iconSize} />;
      case 'sale_or_trade':
        return <RefreshCcw className={iconSize} />;
      case 'sale':
      default:
        return <ShoppingBag className={iconSize} />;
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium backdrop-blur-md shadow-lg ring-1 ring-inset ${colorClasses} ${sizeClasses}`}>
      {getIcon()}
      <span>{getTypeLabel(type)}</span>
    </span>
  );
}