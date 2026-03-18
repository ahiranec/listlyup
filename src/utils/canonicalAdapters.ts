/**
 * Canonical Adapters — LEGACY BOUNDARY (Minimal Usage)
 * 
 * ⚠️ USAGE RESTRICTED - Only for legacy UI components
 * 
 * These adapters exist ONLY to support components that haven't been migrated to CanonicalListing yet.
 * 
 * CURRENT USAGE (keep minimal):
 * - ProductDetailPage: Uses Product interface (900+ lines, requires incremental migration)
 * - MapView: Uses Product[] for pin positioning
 * - GroupDetailPage: Uses Product[] for allProducts prop
 * 
 * CANONICAL-NATIVE FLOWS (✅ NO ADAPTERS):
 * - App.tsx main data source (canonicalListings)
 * - useAppFilters hook (CanonicalListing[])
 * - useVisibleProducts hook (CanonicalListing[])
 * - productVisibility utils (CanonicalListing)
 * - Publish Flow (canonical fields)
 * - Profile defaults (canonical fields)
 * - Home/Feed ProductCard rendering (accepts either)
 * 
 * MIGRATION STRATEGY:
 * 1. App.tsx uses canonicalListings natively
 * 2. Converts to Product ONLY at component boundary (ProductDetailPage, MapView, GroupDetailPage)
 * 3. All filtering/visibility logic operates on CanonicalListing
 * 4. Incremental migration: Create canonical versions of components, then switch over
 * 
 * RUNTIME SAFETY:
 * - All optional canonical fields have null safety in consuming components
 * - price_amount/price_currency always checked before display
 * - contact fields safely accessed with optional chaining
 * - primary_image_url has fallback handling
 * 
 * TODO: Remove this file once all components use canonical types directly.
 */

import type { Product } from '../data/products';
import type { 
  CanonicalListing,
  ListingType,
  OfferMode,
  VisibilityMode,
  ContactMethod,
  AccessMode,
  ListingStatus,
} from '../types/canonical';

import {
  mapLegacyTypeToCanonical,
  mapCanonicalToLegacyType,
  mapLegacyContactModes,
  mapCanonicalContactToLegacy,
  mapLegacyVisibility,
  mapCanonicalVisibilityToLegacy,
  mapLegacyDeliveryToAccess,
  mapCanonicalAccessToLegacy,
} from '../types/canonical';

/**
 * Converts legacy Product to CanonicalListing
 * Used when passing data to canonical-aware components
 */
export function productToCanonical(product: Product): CanonicalListing {
  const { listing_type, offer_mode } = mapLegacyTypeToCanonical(product.type);
  
  // Parse combined price string "25 USD" → amount + currency
  let price_amount: number | undefined;
  let price_currency: string | undefined;
  if (product.price) {
    const match = product.price.match(/^(\d+(?:\.\d+)?)\s*([A-Z]{3})$/);
    if (match) {
      price_amount = parseFloat(match[1]);
      price_currency = match[2];
    }
  }
  
  // Map status
  let status: ListingStatus = 'active';
  if (product.status === 'paused') status = 'paused';
  else if (product.status === 'sold' || product.status === 'archived') status = 'sold';
  
  return {
    id: product.id,
    owner_user_id: product.ownerId || 'unknown',
    listing_type,
    offer_mode,
    title: product.title,
    description: product.description || '',
    category: product.category || 'other',
    subcategory: product.subcategory,
    tags: product.tags || [],
    primary_image_url: product.image,
    price_amount,
    price_currency,
    condition: product.condition?.toLowerCase().replace(' ', '-') as any,
    pricing_model: product.pricingModel,
    listing_location_id: 'temp-location-id', // TODO: Create location records
    visibility_mode: mapLegacyVisibility(product.visibility),
    contact_methods: mapLegacyContactModes(product.contactModes),
    contact_whatsapp_phone: product.phoneNumber,
    access_mode: mapLegacyDeliveryToAccess(product.deliveryModes),
    start_date: product.eventDate,
    event_time_text: product.eventTime,
    event_duration_type: product.duration === 'multi' ? 'multi_day' : 'single_day',
    ticket_type: product.ticketType,
    business_hours: product.businessHours,
    status,
    created_at: product.createdAt || new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

/**
 * Converts CanonicalListing to legacy Product
 * Used when canonical data needs to be displayed in legacy components
 */
export function canonicalToProduct(canonical: CanonicalListing): Product {
  const legacyType = mapCanonicalToLegacyType(canonical.listing_type, canonical.offer_mode);
  
  // Combine price_amount + price_currency → "25 USD"
  const price = canonical.price_amount && canonical.price_currency
    ? `${canonical.price_amount} ${canonical.price_currency}`
    : undefined;
  
  return {
    id: canonical.id,
    image: canonical.primary_image_url,
    title: canonical.title,
    price,
    condition: canonical.condition?.replace('-', ' ') as any,
    visibility: mapCanonicalVisibilityToLegacy(canonical.visibility_mode) as any,
    location: 'Location', // TODO: Fetch from location_id
    type: legacyType as any,
    createdAt: canonical.created_at,
    groupIds: [], // TODO: Fetch from listing_groups table
    ownerId: canonical.owner_user_id,
    contactModes: mapCanonicalContactToLegacy(canonical.contact_methods) as any,
    phoneNumber: canonical.contact_whatsapp_phone,
    deliveryModes: mapCanonicalAccessToLegacy(canonical.access_mode) as any,
    description: canonical.description,
    eventDate: canonical.start_date,
    eventTime: canonical.event_time_text,
    pricingModel: canonical.pricing_model,
    ticketType: canonical.ticket_type,
    duration: canonical.event_duration_type === 'multi_day' ? 'multi' : 'single',
    tags: canonical.tags,
    category: canonical.category,
    subcategory: canonical.subcategory,
    businessHours: canonical.business_hours,
    status: canonical.status as any,
  };
}

/**
 * Partially updates a Product with canonical fields
 * Useful for incremental migration of components
 */
export function applyCanonicalFields(product: Product, updates: Partial<CanonicalListing>): Product {
  const updated = { ...product };
  
  if (updates.listing_type && updates.offer_mode) {
    updated.type = mapCanonicalToLegacyType(updates.listing_type, updates.offer_mode) as any;
  }
  
  if (updates.visibility_mode) {
    updated.visibility = mapCanonicalVisibilityToLegacy(updates.visibility_mode) as any;
  }
  
  if (updates.contact_methods) {
    updated.contactModes = mapCanonicalContactToLegacy(updates.contact_methods) as any;
  }
  
  if (updates.contact_whatsapp_phone !== undefined) {
    updated.phoneNumber = updates.contact_whatsapp_phone;
  }
  
  if (updates.access_mode) {
    updated.deliveryModes = mapCanonicalAccessToLegacy(updates.access_mode) as any;
  }
  
  if (updates.primary_image_url) {
    updated.image = updates.primary_image_url;
  }
  
  if (updates.owner_user_id) {
    updated.ownerId = updates.owner_user_id;
  }
  
  if (updates.created_at) {
    updated.createdAt = updates.created_at;
  }
  
  return updated;
}

/**
 * Validates that a Product conforms to canonical contract rules
 * Returns list of validation errors
 */
export function validateCanonicalCompliance(product: Product): string[] {
  const errors: string[] = [];
  
  // Check contact_methods don't include 'phone' or 'email'
  if (product.contactModes?.includes('phone' as any)) {
    errors.push('contactModes includes "phone" (should use whatsapp only)');
  }
  if (product.contactModes?.includes('email' as any)) {
    errors.push('contactModes includes "email" (not in canonical)');
  }
  
  // Check visibility doesn't use 'private'
  if (product.visibility === 'private') {
    errors.push('visibility is "private" (not in MVP canonical)');
  }
  
  // Check deliveryModes doesn't use 'shipping'
  if (product.deliveryModes?.includes('shipping' as any)) {
    errors.push('deliveryModes includes "shipping" (should use "delivery")');
  }
  
  // Check has owner_user_id (not optional in canonical)
  if (!product.ownerId) {
    errors.push('Missing owner_user_id (required in canonical)');
  }
  
  // Check status is MVP-compliant
  if (product.status && !['active', 'paused', 'sold'].includes(product.status)) {
    errors.push(`status "${product.status}" not in MVP canonical (active/paused/sold only)`);
  }
  
  return errors;
}

/**
 * Batch converts array of Products to Canonical
 */
export function productsToCanonical(products: Product[]): CanonicalListing[] {
  return products.map(productToCanonical);
}

/**
 * Batch converts array of Canonical to Products
 */
export function canonicalToProducts(canonical: CanonicalListing[]): Product[] {
  return canonical.map(canonicalToProduct);
}

/**
 * Alias for canonicalToProducts for clearer intent
 */
export function canonicalListingsToProducts(canonical: CanonicalListing[]): Product[] {
  return canonicalToProducts(canonical);
}