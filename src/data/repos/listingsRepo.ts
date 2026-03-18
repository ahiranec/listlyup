/**
 * ListingsRepo — Pre-Supabase Repository Layer
 *
 * SOURCE OF TRUTH: canonicalListings (src/data/products.ts)
 * This is the ONLY mock source consumed by this repository.
 *
 * INTENTIONALLY IGNORED legacy mock sources:
 * - mockProducts (legacy Product[] format, raw — not canonical)
 * - mockUserListings (My Listings view, write-path mocks, plan-specific variants)
 * - trailListings (Trail view, out-of-scope read surface)
 * - actionItems (Action Center, out-of-MVP for data layer)
 * - mockListingForEdit (draft/edit flow mocks, write-path)
 *
 * When Supabase is connected:
 * → Replace the body of getAllListings and getListingById
 * → Keep the same return types (CanonicalListing)
 * → No hook changes required
 */

import { canonicalListings } from "../products";
import type { CanonicalListing } from "../../types/canonical";

export const listingsRepo = {
  /**
   * Returns all MVP-safe canonical listings.
   * Filtering/pagination will be applied here when Supabase is integrated.
   */
  getAllListings(): CanonicalListing[] {
    return canonicalListings;
  },

  /**
   * Returns a single listing by ID, or undefined if not found.
   * Will become a Supabase .eq('id', id).single() call.
   */
  getListingById(id: string): CanonicalListing | undefined {
    return canonicalListings.find((l) => l.id === id);
  },
};
