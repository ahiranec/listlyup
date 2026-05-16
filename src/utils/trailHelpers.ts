/**
 * Trail Helpers
 * Utilities for working with Trail listings
 */

import type { TrailListing } from '../components/my-trail/types';
import type { PublishFormData } from '../components/publish/types';

/**
 * Convert a TrailListing to PublishFormData for re-publishing
 * Maps closed listing data back to the publish flow format
 */
export function trailListingToPublishFormData(listing: TrailListing): Partial<PublishFormData> {
  return {
    // Step 1: Media + Type (images would need to be fetched separately)
    images: listing.thumbnail ? [listing.thumbnail] : [],
    type: listing.type,
    
    // Step 2: Basic Info
    title: listing.title,
    description: '', // Not stored in TrailListing, user will need to re-enter
    category: '', // Not stored in TrailListing
    subcategory: '', // Not stored in TrailListing
    tags: [], // Not stored in TrailListing
    
    // Product-specific
    offerType: ((): any => {
      const map: Record<string, string> = {
        'sale': 'sell',
        'free': 'giveaway',
        'trade': 'trade',
        'sale_or_trade': 'sell_or_trade'
      };
      return listing.offerType ? map[listing.offerType] : undefined;
    })(),
    condition: undefined, // Not stored in TrailListing
    
    // Step 3: Location
    location: listing.location ? {
      latitude: 0, // Mock data, would need geocoding
      longitude: 0,
      address: listing.location,
      city: listing.location,
      region: '',
    } : null,
    locationPrecision: 'approximate' as const,
    
    // Step 4: Pricing
    price: listing.price,
    currency: 'CLP', // Default
    priceNegotiable: false,
    access_mode: ['pickup'], // Changed from access_mode to access_mode (CANONICAL)
    contact_methods: ['in_app_chat'], // Changed from contact_methods to contact_methods (CANONICAL)
    
    // Step 5: Visibility
    visibility_mode: (listing.visibility === 'group') ? 'groups_only' : 'public', // Corrected comparison and property name
    selectedGroups: listing.groupIds || [],
  };
}

/**
 * Get a user-friendly message for re-publishing
 */
export function getRepublishMessage(listing: TrailListing): { title: string; description: string } {
  return {
    title: `Re-publishing: ${listing.title}`,
    description: 'Review and update your listing details before publishing',
  };
}
