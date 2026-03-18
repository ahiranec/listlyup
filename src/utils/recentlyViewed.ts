/**
 * Recently Viewed Utility
 * Tracks products viewed by user automatically
 * Uses localStorage - similar pattern to savedItems.ts
 */

import type { Product } from '../data/products';

export interface RecentlyViewedItem {
  id: string;
  title: string;
  price?: string;
  image: string;
  location?: string;
  type?: Product['type'];
  condition?: string;
  viewedAt: string; // ISO timestamp
}

const STORAGE_KEY = 'listlyup_recently_viewed';
const MAX_ITEMS = 20; // Keep last 20 viewed products

// ==================== CORE FUNCTIONS ====================

/**
 * Get all recently viewed items
 */
export function getRecentlyViewed(): RecentlyViewedItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Return as-is (already sorted by viewedAt DESC from trackProductView)
    return parsed;
  } catch (error) {
    console.error('Error loading recently viewed:', error);
    return [];
  }
}

/**
 * Track a product view (auto-called when viewing product detail)
 */
export function trackProductView(product: Product): void {
  try {
    let items = getRecentlyViewed();
    
    // Remove if already exists (we'll re-add at the top with new timestamp)
    items = items.filter(item => item.id !== product.id);
    
    // Create new item
    const newItem: RecentlyViewedItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      location: product.location,
      type: product.type,
      condition: product.condition,
      viewedAt: new Date().toISOString(),
    };
    
    // Add to beginning (most recent first)
    items.unshift(newItem);
    
    // Keep only MAX_ITEMS
    if (items.length > MAX_ITEMS) {
      items = items.slice(0, MAX_ITEMS);
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error('Error tracking product view:', error);
  }
}

/**
 * Get recently viewed excluding a specific product ID
 * Useful for ProductDetailPage to exclude current product
 */
export function getRecentlyViewedExcluding(excludeId: string, limit: number = 6): RecentlyViewedItem[] {
  return getRecentlyViewed()
    .filter(item => item.id !== excludeId)
    .slice(0, limit);
}

/**
 * Clear all recently viewed history
 */
export function clearRecentlyViewed(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing recently viewed:', error);
    return false;
  }
}

/**
 * Get count of recently viewed items
 */
export function getRecentlyViewedCount(): number {
  return getRecentlyViewed().length;
}

/**
 * Remove a specific item from recently viewed
 */
export function removeRecentlyViewed(itemId: string): boolean {
  try {
    const items = getRecentlyViewed();
    const filtered = items.filter(i => i.id !== itemId);
    
    if (filtered.length === items.length) {
      return false; // Item wasn't in history
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing recently viewed item:', error);
    return false;
  }
}

// ==================== EXPORT FOR DEBUGGING ====================

export function exportRecentlyViewed(): string {
  return JSON.stringify(getRecentlyViewed(), null, 2);
}
