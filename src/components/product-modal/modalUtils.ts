/**
 * Product Modal Utilities
 * Helper functions for modal displays
 */

import type { Product } from '../../data/products';

/**
 * Get formatted price text based on product type
 */
export function getModalPriceText(product: Product): string {
  if (product.type === 'free') {
    return '$0 USD';
  }
  
  if (product.type === 'trade') {
    return "Let's make a swap";
  }
  
  if (product.type === 'rent') {
    return product.price || 'Rental available';
  }
  
  if (product.type === 'event') {
    return product.price || 'Free event';
  }
  
  if (product.type === 'sale_or_trade' && product.price) {
    return `${product.price} or swap`;
  }
  
  if (product.price) {
    return product.price;
  }
  
  return '$0 USD';
}

/**
 * Get description for screen readers
 */
export function getModalDescription(product: Product): string {
  const typeText = 
    product.type === 'free' ? 'Free item' :
    product.type === 'trade' ? 'Available for trade' :
    product.type === 'sale_or_trade' ? 'Available for sale or trade' :
    product.type === 'rent' ? 'Available for rent' :
    product.type === 'service' ? 'Service offered' :
    product.type === 'event' ? 'Event listing' :
    'Available for sale';
  
  return `Product details for ${product.title}. ${product.condition} condition. ${typeText}.`;
}