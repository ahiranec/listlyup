/**
 * Product Visibility Utilities
 * CANONICAL NATIVE
 * Helper functions to determine if a user can view a listing based on visibility rules
 */

import type { CanonicalListing } from "../types/canonical";
import type { CurrentUser } from "../types";

/**
 * Determines if a user can view a specific listing based on visibility rules
 * 
 * VISIBILITY RULES:
 * 1. "public" listings → visible to everyone (logged in or not)
 * 2. "groups_only" listings → only visible to authenticated users who belong to at least one of the listing's groups
 * 
 * LIFECYCLE STATUS RULES (for Home/Browse):
 * - status 'paused', 'sold' → NOT shown in Home (only in My Listings)
 * - status 'active' → shown in Home
 * 
 * @param listing - The listing to check visibility for
 * @param currentUser - The current user (can be guest/unauthenticated)
 * @param context - Context where listing is being viewed ('home' | 'my-listings' | 'detail')
 * @returns true if the user can view the listing, false otherwise
 */
export function canUserViewCanonicalListing(
  listing: CanonicalListing,
  currentUser: CurrentUser | null,
  context: 'home' | 'my-listings' | 'detail' = 'home'
): boolean {
  // Context: My Listings - owner can see all their listings regardless of status
  if (context === 'my-listings' && currentUser?.isAuthenticated && listing.owner_user_id === currentUser.id) {
    return true;
  }

  // Context: Home/Browse - hide non-active listings
  if (context === 'home') {
    // Hide listings with non-active status from Home (CANONICAL: uses 'status' field)
    if (listing.status && listing.status !== 'active') {
      return false;
    }
  }

  // Rule 1: Public listings are visible to everyone
  if (listing.visibility_mode === "public") {
    return true;
  }

  // If user is not authenticated, they can only see public listings
  if (!currentUser || !currentUser.isAuthenticated) {
    return false;
  }

  // Rule 2: Groups only listings are visible if user belongs to at least one of the listing's groups
  if (listing.visibility_mode === "groups_only") {
    // NOTE: group_ids is NOT part of the canonical contract
    // Group membership should be checked via backend listing_groups table
    // For MVP, we allow all groups_only listings to authenticated users
    // TODO: Implement proper group membership check via backend
    return true;
  }

  // Default: listing is not visible
  return false;
}

/**
 * Filters an array of listings to only include those visible to the current user
 * 
 * @param listings - Array of listings to filter
 * @param currentUser - The current user (can be guest/unauthenticated)
 * @param context - Context where listings are being viewed
 * @returns Filtered array of visible listings
 */
export function filterVisibleCanonicalListings(
  listings: CanonicalListing[],
  currentUser: CurrentUser | null,
  context: 'home' | 'my-listings' | 'detail' = 'home'
): CanonicalListing[] {
  return listings.filter((listing) =>
    canUserViewCanonicalListing(listing, currentUser, context)
  );
}