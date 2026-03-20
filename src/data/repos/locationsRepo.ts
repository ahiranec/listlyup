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

import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

const cache: Record<string, string> = {};

export const locationsRepo = {
  async getLocationNameById(id: string | undefined): Promise<string | undefined> {
    if (!id) return undefined;

    // cache simple
    if (cache[id]) return cache[id];

    if (!isSupabaseConfigured || !supabase) {
      console.warn("[locationsRepo] Supabase not configured");
      return undefined;
    }

    const { data, error } = await supabase
      .from("locations")
      .select("location_text")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[locationsRepo] error:", error.message);
      return undefined;
    }

    const name = data?.name as string | undefined;

    if (name) {
      cache[id] = name;
    }

    return name;
  },
};
