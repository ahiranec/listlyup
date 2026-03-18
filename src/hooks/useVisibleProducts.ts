/**
 * useVisibleProducts Hook
 * Custom hook to filter products based on user visibility permissions
 * CANONICAL NATIVE
 * 
 * This hook encapsulates the logic for determining which products
 * a user can see based on their authentication status and group memberships.
 */

import { useMemo } from "react";
import type { CanonicalListing } from "../types/canonical";
import type { CurrentUser } from "../types";
import { filterVisibleCanonicalListings } from "../utils/productVisibility";

interface UseVisibleProductsOptions {
  listings: CanonicalListing[];
  currentUser: CurrentUser | null;
  enabled?: boolean; // Allows temporarily disabling the filter (e.g., for admin views)
}

interface UseVisibleProductsReturn {
  visibleListings: CanonicalListing[];
  totalListings: number;
  visibleCount: number;
  hiddenCount: number;
  isFiltering: boolean;
}

/**
 * Hook to get listings visible to the current user
 * 
 * USAGE:
 * ```tsx
 * const { visibleListings, visibleCount } = useVisibleProducts({
 *   listings: allListings,
 *   currentUser: currentUser,
 * });
 * ```
 * 
 * @param options - Configuration options
 * @returns Object with visible listings and metadata
 */
export function useVisibleProducts({
  listings,
  currentUser,
  enabled = true,
}: UseVisibleProductsOptions): UseVisibleProductsReturn {
  const visibleListings = useMemo(() => {
    // If filtering is disabled, return all listings (e.g., admin view)
    if (!enabled) {
      return listings;
    }

    // Apply visibility filtering
    return filterVisibleCanonicalListings(listings, currentUser);
  }, [listings, currentUser, enabled]);

  return {
    visibleListings,
    totalListings: listings.length,
    visibleCount: visibleListings.length,
    hiddenCount: listings.length - visibleListings.length,
    isFiltering: enabled,
  };
}
