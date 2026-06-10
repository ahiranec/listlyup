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
  TicketType,
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

    category:
      (row.category as string) ||
      (row.listing_type === "product"
        ? "Producto"
        : row.listing_type === "service"
          ? "Servicio"
          : row.listing_type === "event"
            ? "Evento"
            : "Sin categoría"),

    subcategory:
      (row.subcategory as string | undefined) ??
      ((row.tags as string[] | undefined)?.[0] ?? "General"),
    tags: (row.tags as string[]) ?? [],

    primary_image_url: row.primary_image_url as string,

    price_amount:
      row.price_amount != null ? Number(row.price_amount) : undefined,

    price_currency: (row.price_currency as string | undefined) ?? undefined,

    condition: (row.condition as ProductCondition | undefined) ?? undefined,
    pricing_model: (row.pricing_model as PricingModel | undefined) ?? undefined,

    listing_location_id: row.location_id as string,
    location_name: (row.locations as any)?.formatted_text ?? undefined,
    latitude: (row.locations as any)?.lat != null ? Number((row.locations as any).lat) : undefined,
    longitude: (row.locations as any)?.lng != null ? Number((row.locations as any).lng) : undefined,

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

    ticket_type: (row.ticket_type as TicketType | undefined) ?? undefined,

    // Lifecycle Extensions
    refreshed_at: (row.refreshed_at as string | null) ?? null,
    expiring_soon_at: (row.expiring_soon_at as string | null) ?? null,
    expires_at: (row.expires_at as string | null) ?? null,
    refresh_count: (row.refresh_count as number | null) ?? 0,
    media: (row.listing_media as any[])?.map(m => ({
      url: m.url,
      sort_order: m.sort_order,
      media_type: m.media_type
    })) ?? [],
  };
}

// ---------------------------------------------------------------------------
// INTERNAL CACHE: Stores fetched real listings
// ---------------------------------------------------------------------------
let cachedListings: CanonicalListing[] = [];

export const listingsRepo = {
  // -------------------------------------------------------------------------
  // SYNC (using cache)
  // -------------------------------------------------------------------------
  getAllListings(): CanonicalListing[] {
    return cachedListings;
  },

  getListingById(id: string): CanonicalListing | undefined {
    return cachedListings.find((l) => l.id === id);
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
      formatted_text,
      lat,
      lng
    )
  `)
      .eq("status", "active")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[listingsRepo] fetchAllListings error:", error.message);
      return [];
    }

    const fetchedListings = (data ?? []).map((row) =>
      rowToCanonical(row as Record<string, unknown>)
    );

    const listingsWithOwners = await Promise.all(
      fetchedListings.map(async (listing) => ({
        ...listing,
        owner_user: listing.owner_user_id
          ? await usersRepo.getUserById(listing.owner_user_id)
          : null,
      }))
    );

    // Update internal cache
    cachedListings = listingsWithOwners;
    return listingsWithOwners;
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
      formatted_text,
      lat,
      lng
    ),
    listing_media (
      url,
      sort_order,
      media_type
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

  async refreshListing(listingId: string): Promise<void> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("Supabase is not configured");
    }

    const { error } = await supabase.rpc("rpc_refresh_listing", {
      p_listing_id: listingId,
    });

    if (error) {
      console.error("[listingsRepo] refreshListing error:", error.message);
      throw error;
    }
  },

  // -------------------------------------------------------------------------
  // WRITE — Create a new listing (minimal insert)
  // -------------------------------------------------------------------------
  async createListing(input: CreateListingInput): Promise<{ id: string }> {
    if (!isSupabaseConfigured || !supabase) {
      throw new Error("[listingsRepo] Supabase is not configured — cannot create listing");
    }

    const row = {
      user_id: input.user_id,
      location_id: input.location_id,
      title: input.title,
      description: input.description ?? "",
      listing_type: input.listing_type,
      offer_mode: input.offer_mode ?? null,
      primary_image_url: input.primary_image_url ?? null,
      price_amount: input.price_amount ?? null,
      price_currency: input.price_currency ?? null,
      visibility_mode: input.visibility_mode ?? "public",
      status: input.status ?? "active",
      ai_prefill_used: input.ai_prefill_used ?? false,
      ai_flagged: input.ai_flagged ?? false,
      
      category: input.category ?? null,
      subcategory: input.subcategory ?? null,
      tags: input.tags ?? [],
      condition: input.condition ?? null,
      pricing_model: input.pricing_model ?? null,
      contact_methods: input.contact_methods ?? [],
      contact_whatsapp_phone: input.contact_whatsapp_phone ?? null,
      contact_website_url: input.contact_website_url ?? null,
      contact_social_url: input.contact_social_url ?? null,
      access_mode: input.access_mode ?? [],
      start_date: input.start_date ?? null,
      end_date: input.end_date ?? null,
      event_time_text: input.event_time_text ?? null,
      event_duration_type: input.event_duration_type ?? null,
      ticket_type: input.ticket_type ?? null,
    };

    console.log("[listingsRepo] Creating listing with payload:", row);

    const { data, error } = await supabase
      .from("listings")
      .insert(row)
      .select("id")
      .single();

    if (error) {
      console.error("[listingsRepo] createListing error:", error.message);
      throw new Error(`Failed to create listing: ${error.message}`);
    }

    if (!data?.id) {
      throw new Error("[listingsRepo] createListing returned no id");
    }

    console.log("[listingsRepo] ✅ Listing created:", data.id);

    // ──────────────────────────────────────────────
    // STEP 2: Batch insert into listing_media
    // ──────────────────────────────────────────────
    if (input.image_urls && input.image_urls.length > 0) {
      const mediaRows = input.image_urls.map((url, index) => ({
        listing_id: data.id,
        url: url,
        sort_order: index,
        media_type: 'image'
      }));

      const { error: mediaError } = await supabase
        .from("listing_media")
        .insert(mediaRows);

      if (mediaError) {
        console.error("❌ [listingsRepo] listing_media BATCH INSERT FAILED");
        console.error("   - Listing ID:", data.id);
        console.error("   - Payload:", JSON.stringify(mediaRows, null, 2));
        console.error("   - Error Message:", mediaError.message);
        console.error("   - Details:", mediaError.details);
        console.error("   - Hint:", mediaError.hint);
        console.error("   - Code:", mediaError.code);
        
        // BLOCKING FIX: If media fails, we MUST throw so the caller knows the publish is incomplete.
        throw new Error(`Failed to save listing gallery: ${mediaError.message}`);
      } else {
        console.log(`✅ [listingsRepo] ${mediaRows.length} media rows inserted successfully`);
      }
    }

    // Invalidate cache so next fetch picks up the new listing
    cachedListings = [];

    // Notify listeners (like useListings hook) that the data is stale
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('listings_updated'));
    }

    return { id: data.id as string };
  },
};

// ---------------------------------------------------------------------------
// Input type for createListing (minimal MVP)
// ---------------------------------------------------------------------------
export interface CreateListingInput {
  user_id: string;
  location_id: string | null;
  title: string;
  description?: string;
  listing_type: ListingType;
  offer_mode?: OfferMode | null;
  primary_image_url?: string | null;
  price_amount?: number | null;
  price_currency?: string | null;
  visibility_mode?: VisibilityMode;
  status?: ListingStatus;
  ai_prefill_used?: boolean;
  ai_flagged?: boolean;

  category?: string | null;
  subcategory?: string | null;
  tags?: string[];
  condition?: ProductCondition | null;
  pricing_model?: PricingModel | null;
  contact_methods?: ContactMethod[];
  contact_whatsapp_phone?: string | null;
  contact_website_url?: string | null;
  contact_social_url?: string | null;
  access_mode?: AccessMode[];
  start_date?: string | null;
  end_date?: string | null;
  event_time_text?: string | null;
  event_duration_type?: EventDurationType | null;
  ticket_type?: TicketType | null;
  image_urls?: string[];
}
