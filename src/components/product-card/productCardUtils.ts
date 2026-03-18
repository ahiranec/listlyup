/**
 * Product Card Utilities
 * Helper functions for ProductCard components
 */

import type { Product } from '../../data/products';

/**
 * Get category from product type
 * Rental maps to Service per design system requirements
 */
export function getCategory(type: Product['type']): 'Product' | 'Service' | 'Event' {
  switch (type) {
    case 'service':
    case 'rent': // Rental is treated as Service
      return 'Service';
    case 'event':
      return 'Event';
    case 'sale':
    case 'trade':
    case 'free':
    case 'sale_or_trade':
    default:
      return 'Product';
  }
}

/**
 * Get category color classes with glassmorphism ultra-light design
 */
export function getCategoryColor(category: string): string {
  switch (category) {
    case 'Service':
      return 'bg-white/20 text-white ring-1 ring-cyan-400/40';
    case 'Event':
      return 'bg-white/20 text-white ring-1 ring-amber-400/40';
    case 'Product':
    default:
      return 'bg-white/20 text-white ring-1 ring-blue-400/40';
  }
}

/**
 * Get condition badge color classes
 */
export function getConditionColor(condition?: string): string {
  if (!condition) return "bg-gray-50 text-gray-700 ring-gray-200";
  
  const lower = condition.toLowerCase();
  if (lower === "new") return "bg-green-50 text-green-700 ring-green-200";
  if (lower === "like new") return "bg-blue-50 text-blue-700 ring-blue-200";
  
  return "bg-orange-50 text-orange-700 ring-orange-200";
}

/**
 * Get condition indicator dot color
 */
export function getConditionDotColor(condition?: string): string {
  if (!condition) return "bg-gray-500";
  
  const lower = condition.toLowerCase();
  if (lower === "new") return "bg-green-500 animate-pulse";
  if (lower === "like new") return "bg-blue-500";
  
  return "bg-orange-500";
}

/**
 * Get type badge color classes
 */
export function getTypeBadgeColor(type: string): string {
  switch (type) {
    case 'free':
      return 'bg-green-50 text-green-700 ring-1 ring-green-200';
    case 'trade':
      return 'bg-purple-50 text-purple-700 ring-1 ring-purple-200';
    case 'sale_or_trade':
      return 'bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200';
    case 'rent':
      return 'bg-orange-50 text-orange-700 ring-1 ring-orange-200';
    case 'service':
      return 'bg-cyan-50 text-cyan-700 ring-1 ring-cyan-200';
    case 'event':
      return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200';
    default:
      return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200';
  }
}

/**
 * Format price display based on type
 */
export function formatPrice(
  type: string,
  price?: string
): string {
  if (type === 'free') return '0 USD';
  if (type === 'trade') return "Let's make a swap";
  if (type === 'sale_or_trade' && price) return `${price} or swap`;
  if (type === 'rent' && price) return price;
  if (type === 'service' && price) return price;
  if (type === 'event' && price) return price;
  if (price) return price;
  return '0 USD';
}

/**
 * Get type badge label
 */
export function getTypeLabel(type: string): string {
  switch (type) {
    case 'free':
      return 'For Free';
    case 'trade':
      return 'For Trade';
    case 'sale_or_trade':
      return 'For Sale or Trade';
    case 'rent':
      return 'For Rent';
    case 'service':
      return 'Service';
    case 'event':
      return 'Event';
    default:
      return 'For Sale';
  }
}