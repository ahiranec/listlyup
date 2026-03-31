/**
 * LocationsRepo — Supabase Repository Layer for Locations
 *
 * Handles reading and creating rows in the `locations` table.
 *
 * createLocation() is used by the Publish Flow to persist the
 * user-selected location before inserting the listing.
 */

import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Minimal input required to create a location from the Publish Flow */
export interface CreateLocationInput {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
}

// ---------------------------------------------------------------------------
// Cache (read-only helper)
// ---------------------------------------------------------------------------
const cache: Record<string, string> = {};

// ---------------------------------------------------------------------------
// Repository
// ---------------------------------------------------------------------------
export const locationsRepo = {
  // -------------------------------------------------------------------------
  // READ — Get location name by ID (existing)
  // -------------------------------------------------------------------------
  async getLocationNameById(id: string | undefined): Promise<string | undefined> {
    if (!id) return undefined;

    if (cache[id]) return cache[id];

    if (!isSupabaseConfigured || !supabase) {
      console.warn("[locationsRepo] Supabase not configured");
      return undefined;
    }

    const { data, error } = await supabase
      .from("locations")
      .select("formatted_text")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[locationsRepo] getLocationNameById error:", error.message);
      return undefined;
    }

    const name = data?.formatted_text as string | undefined;

    if (name) {
      cache[id] = name;
    }

    return name;
  },

  // -------------------------------------------------------------------------
  // WRITE — Create a new location row and return its id
  // -------------------------------------------------------------------------
  async createLocation(input: CreateLocationInput): Promise<string> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("[locationsRepo] Supabase is not configured — cannot create location");
    }

    const row = {
      formatted_text: input.address || `${input.city ?? ""}, ${input.region ?? ""}`.trim(),
      city: input.city ?? null,
      region: input.region ?? null,
      country: input.country ?? null,
      lat: input.latitude,
      lng: input.longitude,
      place_id: null,
      privacy_mode: null,
      privacy_radius_m: null,
    };

    const { data, error } = await supabase
      .from("locations")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[locationsRepo] createLocation error:", error.message);
      throw new Error(`Failed to create location: ${error.message}`);
    }

    if (!data?.id) {
      throw new Error("[locationsRepo] createLocation returned no id");
    }

    console.log("[locationsRepo] ✅ Location created:", data.id);
    return data.id as string;
  },
};
