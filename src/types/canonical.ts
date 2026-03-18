/**
 * CANONICAL TYPES — ListlyUp Backend/Frontend Contract
 * 
 * SOURCE OF TRUTH for data structures.
 * DO NOT modify without backend alignment.
 * 
 * Last Updated: 2026-03-18
 */

// ============================================================================
// LISTING CANONICAL CONTRACT
// ============================================================================

export type ListingType = 'product' | 'service' | 'event';

export type OfferMode = 
  | 'sell' 
  | 'trade' 
  | 'giveaway' 
  | 'sell_or_trade' 
  | 'for_sale' 
  | 'for_rent' 
  | 'free' 
  | 'paid';

export type VisibilityMode = 'public' | 'groups_only';

export type ListingStatus = 'active' | 'paused' | 'sold';

export type ContactMethod = 'in_app_chat' | 'whatsapp' | 'website' | 'social_media';

export type AccessMode = 'pickup' | 'meetup' | 'delivery' | 'virtual';

export type EventDurationType = 'single_day' | 'multi_day';

export type PricingModel = 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';

export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair' | 'for-parts';

export type TicketType = 'free' | 'paid';

/**
 * Canonical Listing Interface
 * Aligned with backend schema
 */
export interface CanonicalListing {
  // Core Identity
  id: string;
  owner_user_id: string;
  
  // Classification
  listing_type: ListingType;
  offer_mode: OfferMode;
  
  // Basic Info
  title: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  
  // Media
  primary_image_url: string;
  
  // Pricing
  price_amount?: number;
  price_currency?: string;
  condition?: ProductCondition;
  pricing_model?: PricingModel;
  
  // Location
  listing_location_id: string; // Reference to locations table
  
  // Visibility
  visibility_mode: VisibilityMode;
  
  // Contact
  contact_methods: ContactMethod[];
  contact_whatsapp_phone?: string;
  contact_website_url?: string;
  contact_social_url?: string;
  
  // Access
  access_mode: AccessMode[];
  
  // Event-Specific
  start_date?: string;
  end_date?: string;
  event_time_text?: string;
  event_duration_type?: EventDurationType;
  ticket_type?: TicketType;
  
  // Service-Specific
  business_hours?: string;
  
  // Lifecycle
  status: ListingStatus;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// USER CANONICAL CONTRACT (Relevant to Frontend)
// ============================================================================

export type AccountType = 'individual' | 'store';

export interface CanonicalUser {
  id: string;
  email: string;
  username: string;
  name: string;
  account_type: AccountType;
  avatar_url?: string;
  bio?: string;
  phone?: string;
  profile_location_id: string;
  
  // Publishing Defaults
  default_contact_method: ContactMethod;
  default_whatsapp_phone?: string;
  default_website_url?: string;
  default_social_url?: string;
  default_access_mode: AccessMode[];
  default_visibility: VisibilityMode;
  default_location_id: string;
  
  // Localization
  language: string;
  region: string;
}

// ============================================================================
// GROUP CANONICAL CONTRACT (Relevant to Frontend)
// ============================================================================

export type GroupAccessType = 'open' | 'closed' | 'invite_only';

export interface CanonicalGroup {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  access_type: GroupAccessType;
  location_id?: string;
  who_can_post: string;
  who_can_invite: string;
  who_can_moderate: string;
  auto_approve_listings: boolean;
  is_archived: boolean;
  is_deleted: boolean;
  members_count: number;
  listings_count: number;
  created_at: string;
  updated_at: string;
}

// ============================================================================
// CONVERSATION CANONICAL CONTRACT
// ============================================================================

export interface CanonicalConversation {
  id: string;
  created_at: string;
  updated_at: string;
  last_message_at?: string;
}

export interface ConversationParticipant {
  conversation_id: string;
  user_id: string;
  joined_at: string;
}

// ============================================================================
// MESSAGE CANONICAL CONTRACT
// ============================================================================

export interface CanonicalMessage {
  id: string;
  conversation_id: string;
  sender_user_id: string;
  text: string;
  is_read: boolean;
  created_at: string;
}

// ============================================================================
// Q&A CANONICAL CONTRACT
// ============================================================================

export interface ListingQuestion {
  id: string;
  listing_id: string;
  asker_user_id: string;
  question_text: string;
  asked_at: string;
}

export interface ListingQuestionAnswer {
  id: string;
  question_id: string;
  answer_text: string;
  answered_at: string;
}

// ============================================================================
// LOCATION CANONICAL CONTRACT
// ============================================================================

export interface CanonicalLocation {
  id: string;
  city: string;
  region: string;
  country: string;
  latitude?: number;
  longitude?: number;
  formatted_address?: string;
}

// ============================================================================
// LEGACY TO CANONICAL MAPPERS
// ============================================================================

/**
 * Maps legacy Product.type to canonical listing_type + offer_mode
 */
export function mapLegacyTypeToCanonical(legacyType: string): {
  listing_type: ListingType;
  offer_mode: OfferMode;
} {
  const mapping: Record<string, { listing_type: ListingType; offer_mode: OfferMode }> = {
    'sale': { listing_type: 'product', offer_mode: 'sell' },
    'trade': { listing_type: 'product', offer_mode: 'trade' },
    'free': { listing_type: 'product', offer_mode: 'giveaway' },
    'sale_or_trade': { listing_type: 'product', offer_mode: 'sell_or_trade' },
    'rent': { listing_type: 'product', offer_mode: 'for_rent' },
    'service': { listing_type: 'service', offer_mode: 'for_sale' },
    'event': { listing_type: 'event', offer_mode: 'free' }, // Default to free, adjust if paid
  };
  
  return mapping[legacyType] || { listing_type: 'product', offer_mode: 'sell' };
}

/**
 * Maps canonical listing_type + offer_mode back to legacy type
 * (for backward compatibility during transition)
 */
export function mapCanonicalToLegacyType(listing_type: ListingType, offer_mode: OfferMode): string {
  if (listing_type === 'service') return 'service';
  if (listing_type === 'event') return 'event';
  
  // Product types
  const modeMap: Record<string, string> = {
    'sell': 'sale',
    'trade': 'trade',
    'giveaway': 'free',
    'sell_or_trade': 'sale_or_trade',
    'for_rent': 'rent',
  };
  
  return modeMap[offer_mode] || 'sale';
}

/**
 * Maps legacy contactModes to canonical contact_methods
 */
export function mapLegacyContactModes(legacyModes?: string[]): ContactMethod[] {
  if (!legacyModes) return ['in_app_chat'];
  
  return legacyModes
    .map(mode => {
      if (mode === 'chat') return 'in_app_chat';
      if (mode === 'whatsapp') return 'whatsapp';
      return null;
    })
    .filter((m): m is ContactMethod => m !== null);
}

/**
 * Maps canonical contact_methods back to legacy contactModes
 */
export function mapCanonicalContactToLegacy(canonical: ContactMethod[]): string[] {
  return canonical.map(method => {
    if (method === 'in_app_chat') return 'chat';
    if (method === 'whatsapp') return 'whatsapp';
    return method;
  });
}

/**
 * Maps legacy visibility to canonical visibility_mode
 */
export function mapLegacyVisibility(legacyVisibility?: string): VisibilityMode {
  if (legacyVisibility === 'group' || legacyVisibility === 'groups') return 'groups_only';
  return 'public';
}

/**
 * Maps canonical visibility_mode back to legacy visibility
 */
export function mapCanonicalVisibilityToLegacy(canonical: VisibilityMode): string {
  return canonical === 'groups_only' ? 'group' : 'public';
}

/**
 * Maps legacy deliveryModes to canonical access_mode
 */
export function mapLegacyDeliveryToAccess(legacyDelivery?: string[]): AccessMode[] {
  if (!legacyDelivery) return ['pickup'];
  
  return legacyDelivery
    .map(mode => {
      if (mode === 'shipping') return 'delivery'; // shipping → delivery
      if (mode === 'pickup') return 'pickup';
      if (mode === 'meetup') return 'meetup';
      if (mode === 'delivery') return 'delivery';
      if (mode === 'virtual') return 'virtual';
      return null;
    })
    .filter((m): m is AccessMode => m !== null);
}

/**
 * Maps canonical access_mode back to legacy deliveryModes
 */
export function mapCanonicalAccessToLegacy(canonical: AccessMode[]): string[] {
  return canonical; // Values align except shipping was removed
}
