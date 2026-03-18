/**
 * LocationsRepo — Pre-Supabase Repository Layer
 *
 * Locations are currently embedded as string fields (e.g. location: "Valparaíso")
 * directly inside mock listings. There is no normalized locations table in the mocks yet.
 *
 * This repository acts as a forwarding stub to prepare the swap surface:
 * → When Supabase is connected, this becomes supabase.from('locations').eq('id', id).single()
 * → The canonical schema defines locations as a separate normalized table
 * → The frontend currently does NOT resolve listing_location_id to a location object
 *
 * INTENTIONALLY IGNORED:
 * - All location string fields embedded inside Product mocks (legacy, not canonical)
 * - mockUserAna.location, mockUserCarlos.location (CurrentUser embedded location strings)
 *
 * When Supabase is connected:
 * → Populate with real locations table data
 * → ProductCard map pins + filter-by-location features will use this repo
 */

import type { CanonicalLocation } from "../../types/canonical";

export const locationsRepo = {
  /**
   * Stub: Returns undefined for now.
   * No normalized locations table exists in the current mock layer.
   * Will become supabase.from('locations').eq('id', id).single().
   */
  getLocationById(_id: string): CanonicalLocation | undefined {
    return undefined;
  },
};
