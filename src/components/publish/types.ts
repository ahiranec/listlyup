/**
 * Types for the Publish Flow
 * CANONICAL ALIGNED: Uses canonical backend contract fields
 */

import type { ContactMethod, AccessMode, VisibilityMode } from '../../types/canonical';

// Listing types (Product / Service / Event)
export type ListingType = 'product' | 'service' | 'event';

// Offer types for products (CANONICAL: offer_mode)
export type OfferType = 'sell' | 'trade' | 'giveaway' | 'sell_or_trade';

// Product condition types (aligned with existing BasicInfoStepV2)
export type ProductCondition = 'new' | 'like-new' | 'good' | 'fair' | 'for-parts';

// Service mode types (NEW for v1.2)
export type ServiceMode = 'sale' | 'rent';

// Listing Intent (NEW for v1.2 - Intent-First Flow)
// Captures user's intention early in Step 1
export interface ListingIntent {
  listingType: ListingType;
  // Product intent
  offerMode?: OfferType;          // What they want to do (sell/trade/giveaway/sell_or_trade)
  condition?: ProductCondition;   // Item condition (new/like_new/used/offer_condition)
  // Service intent
  serviceMode?: ServiceMode;      // How service is offered (sale/rent)
  // Event intent
  ticketType?: 'free' | 'paid';   // Event ticket type
  eventDurationType?: 'single_day' | 'multi_day'; // Event duration (NEW v1.3)
}

// AI Suggestions interface
export interface AISuggestions {
  detectedType?: ListingType;
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  tags?: string[];
  suggestedPrice?: {
    min: number;
    max: number;
    currency: string;
  };
  confidence?: number;
}

export interface PublishFormData {
  // Step 1: Media + Type + Intent (v1.2)
  images: string[];
  type: ListingType;
  
  // NEW v1.2: Intent captured in Step 1
  // This is set early to enable smarter AI suggestions in Step 2
  intent?: ListingIntent;
  
  // Step 2: Basic Info
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  
  // Product-specific (kept for backward compatibility, but now read from intent)
  condition?: ProductCondition;  // Updated type to match ListingIntent
  offerType?: OfferType;
  tradeInterests?: string; // For trade/sell_or_trade
  
  // Service-specific
  duration?: string;
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  serviceMode?: ServiceMode;  // NEW v1.2: sale/rent (set from intent)
  
  // Event-specific
  eventDate?: string;
  eventTime?: string;
  eventEndTime?: string;
  eventEndDate?: string;
  hasMultipleDates?: boolean;
  ticketType?: 'free' | 'paid';
  eventDurationType?: 'single_day' | 'multi_day'; // Event duration (NEW v1.3)
  
  // Step 3: Location
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    region?: string;
  } | null;
  locationPrecision: 'approximate' | 'exact';
  deliveryIntent?: 'pickup' | 'shipping' | 'not-sure'; // For products only
  
  // Step 4: Pricing & Conditions
  price?: string;
  currency?: string;
  priceNegotiable?: boolean;
  discount?: {
    type: 'none' | 'percentage' | 'fixed';
    value?: number;
  };
  
  // CANONICAL: access_mode (replaces deliveryModes)
  access_mode: AccessMode[];
  
  // CANONICAL: contact_methods (replaces contactModes)
  contact_methods: ContactMethod[];
  contact_whatsapp_phone?: string;
  contact_website_url?: string;
  contact_social_url?: string;
  
  // Step 5: Preview (computed)
  // CANONICAL: visibility_mode (replaces visibility)
  visibility_mode: VisibilityMode;
  selectedGroups?: string[];
  
  // Campaigns & Events (optional)
  selectedCampaigns?: string[];
  selectedEvents?: string[];
}

export type PublishStep = 'media' | 'basic-info' | 'location' | 'pricing' | 'preview';

export interface StepConfig {
  id: PublishStep;
  title: string;
  description: string;
  icon: string;
  order: number;
}

export const PUBLISH_STEPS: StepConfig[] = [
  {
    id: 'media',
    title: 'Photos',
    description: 'Upload product images',
    icon: '📸',
    order: 1,
  },
  {
    id: 'basic-info',
    title: 'Details',
    description: 'Product information',
    icon: '📝',
    order: 2,
  },
  {
    id: 'location',
    title: 'Location',
    description: 'Where to find it',
    icon: '📍',
    order: 3,
  },
  {
    id: 'pricing',
    title: 'Groups & Contact',
    description: 'Visibility & contact',
    icon: '👥',
    order: 4,
  },
  {
    id: 'preview',
    title: 'Preview',
    description: 'Review & publish',
    icon: '👀',
    order: 5,
  },
];