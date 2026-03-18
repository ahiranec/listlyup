/**
 * My Trail Types
 * Trail listings are closed listings (sold or archived)
 */

import type { MyListing } from "../my-listings/types";

/**
 * TrailListing extends MyListing but only allows sold/archived lifecycles
 * and adds closedDate tracking
 */
export interface TrailListing extends Omit<MyListing, 'stats' | 'lifecycle'> {
  lifecycle: 'sold' | 'archived';
  closedDate: Date;
  // stats removed - not needed for closed listings
  // All other MyListing properties inherited
}

/**
 * Helper to check if a listing is a trail listing
 */
export function isTrailListing(listing: MyListing): listing is TrailListing {
  return listing.lifecycle === 'sold' || listing.lifecycle === 'archived';
}
