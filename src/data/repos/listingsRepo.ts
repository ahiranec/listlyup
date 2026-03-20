import { canonicalListings } from "../products";
import { usersRepo } from "./usersRepo";
import type { CanonicalListing } from "../../types/canonical";
import type {
  ListingType,
  OfferMode,
  VisibilityMode,
  ContactMethod,
  AccessMode,
  ListingStatus,
  EventDurationType,
  PricingModel,
  ProductCondition,
} from "../../types/canonical";
import { supabase, isSupabaseConfigured } from "../../lib/supabaseClient";

// ---------------------------------------------------------------------------
// Mapper REAL Supabase → CanonicalListing
// ---------------------------------------------------------------------------
function rowToCanonical(row: Record<string, unknown>): CanonicalListing {
  return {
    id: row.id as string,

    owner_user_id: row.user_id as string,

    listing_type: row.listing_type as ListingType,
    offer_mode: row.offer_mode as OfferMode,

    title: row.title as string,
    description: row.description as string,

    category: row.category as string,
    subcategory: (row.subcategory as string | undefined) ?? undefined,
    tags: (row.tags as string[]) ?? [],

    primary_image_url: row.primary_image_url as string,

    price_amount:
      row.price_amount != null ? Number(row.price_amount) : undefined,

    price_currency: (row.price_currency as string | undefined) ?? undefined,

    condition: (row.condition as ProductCondition | undefined) ?? undefined,
    pricing_model: (row.pricing_model as PricingModel | undefined) ?? undefined,

    listing_location_id: row.location_id as string,
    location_name: (row.locations as any)?.location_text ?? undefined,

    visibility_mode: row.visibility_mode as VisibilityMode,

    contact_methods: (row.contact_methods as ContactMethod[]) ?? [],
    contact_whatsapp_phone:
      (row.contact_whatsapp_phone as string | undefined) ?? undefined,
    contact_website_url:
      (row.contact_website_url as string | undefined) ?? undefined,
    contact_social_url:
      (row.contact_social_url as string | undefined) ?? undefined,

    access_mode: (row.access_mode as AccessMode[]) ?? [],

    start_date: (row.start_date as string | undefined) ?? undefined,
    end_date: (row.end_date as string | undefined) ?? undefined,
    event_time_text: (row.event_time_text as string | undefined) ?? undefined,
    event_duration_type:
      (row.event_duration_type as EventDurationType | undefined) ?? undefined,

    business_hours: (row.business_hours as string | undefined) ?? undefined,

    status: row.status as ListingStatus,

    created_at: row.created_at as string,
    updated_at: row.updated_at as string,

    ticket_type: (row.ticket_type as string | undefined) ?? undefined,
  };
}

export const listingsRepo = {
  // -------------------------------------------------------------------------
  // SYNC (mock actual)
  // -------------------------------------------------------------------------
  getAllListings(): CanonicalListing[] {
    return canonicalListings;
  },

  getListingById(id: string): CanonicalListing | undefined {
    return canonicalListings.find((l) => l.id === id);
  },

  // -------------------------------------------------------------------------
  // ASYNC (Supabase)
  // -------------------------------------------------------------------------
  async fetchAllListings(): Promise<CanonicalListing[]> {
    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        "[listingsRepo] Supabase not configured — fetchAllListings returning empty."
      );
      return [];
    }

    const { data, error } = await supabase
      .from("listings")
      .select(`
    *,
    locations (
      location_text
    )
  `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[listingsRepo] fetchAllListings error:", error.message);
      return [];
    }

    const canonicalListings = (data ?? []).map((row) =>
      rowToCanonical(row as Record<string, unknown>)
    );

    return await Promise.all(
      canonicalListings.map(async (listing) => ({
        ...listing,
        owner_user: listing.owner_user_id
          ? await usersRepo.getUserById(listing.owner_user_id)
          : null,
      }))
    );
  },

  async fetchListingById(id: string): Promise<CanonicalListing | undefined> {
    if (!isSupabaseConfigured || !supabase) {
      console.warn(
        "[listingsRepo] Supabase not configured — fetchListingById returning undefined."
      );
      return undefined;
    }

    const { data, error } = await supabase
      .from("listings")
      .select(`
    *,
    locations (
      location_text
    )
  `)
      .eq("id", id)
      .single();

    if (error) {
      console.error("[listingsRepo] fetchListingById error:", error.message);
      return undefined;
    }

    if (!data) return undefined;

    const listing = rowToCanonical(data as Record<string, unknown>);

    return {
      ...listing,
      owner_user: listing.owner_user_id
        ? await usersRepo.getUserById(listing.owner_user_id)
        : null,
    };
  },
};
