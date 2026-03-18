/**
 * Shared types for ListlyUp application
 * Centralized type definitions to avoid duplication
 * 
 * NOTE: Canonical types are in /types/canonical.ts
 * This file maintains legacy types for backward compatibility during transition
 */

// ==================== CANONICAL TYPES (Re-export) ====================

export * from './canonical';

// ==================== LISTING TYPES ====================

export type ListingType = "product" | "service" | "event";

export type ListingLifecycle = "active" | "draft" | "paused" | "expired" | "archived" | "sold";

/**
 * Product Visibility Types
 * - public: Visible to everyone (logged in or not)
 * - group: Visible only to members of specific groups (LEGACY - use groups_only)
 * - private: Visible only to the owner (OUT OF MVP)
 * 
 * CANONICAL: visibility_mode: 'public' | 'groups_only'
 */
export type ListingVisibility = "public" | "group" | "private";

export type OfferType = "sale" | "trade" | "donate" | "loan";

export type Condition = "new" | "like-new" | "used" | "fair";

// ==================== NAVIGATION ====================

export type NavigationTab = "home" | "groups" | "publish" | "products" | "menu";

export type ViewType = "home" | "map" | "product-detail" | "publish" | "edit-listing" | "my-listings" | "groups" | "group-detail" | "group-management" | "sign-in" | "sign-up" | "admin-login" | "superadmin-v2" | "profile" | "settings" | "billing" | "statistics" | "action-center" | "admin-dashboard" | "notifications" | "messages" | "chat-conversation" | "saved-items" | "my-trail" | "campaigns" | "campaign-detail" | "events-hub" | "event-hub-detail" | "create-event-hub" | "help-support" | "group-report-detail" | "platform-report-detail" | "user-issue-detail" | "report-detail";

// ==================== SORT & FILTER ====================

export type SortOption = 
  | "newest" 
  | "oldest" 
  | "price-low" 
  | "price-low-high" 
  | "price-high" 
  | "price-high-low" 
  | "popular" 
  | "rating";

export type LocationMode = "current" | "custom";

export type SellerType = "all" | "individual" | "store" | "verified";

export type MinRating = "none" | "3" | "4" | "4.5";

export type ContactStatus = "all" | "online" | "offline";

export type EventScope = "all" | "upcoming" | "specific";

export type DiscountFilter = "all" | "any" | "custom";

export type DiscountPreset = "none" | "10" | "25" | "50";

export type LifecycleFilter = "all" | "active" | "draft" | "paused" | "expired" | "archived" | "sold";

export type HiddenFilter = "exclude" | "only" | "include";

export type ReportedFilter = "exclude" | "only" | "include";

// ==================== USER & SELLER ====================

/**
 * Current authenticated user
 * Contains information about the logged in user and their group memberships
 */
export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  username?: string;
  avatarUrl?: string;
  isAuthenticated: boolean;
  isVerified?: boolean; // Whether the user is verified (e.g., email verified, phone verified, etc.)
  role?: 'user' | 'admin' | 'moderator' | 'super_admin'; // User role for access control
  groupIds: string[]; // IDs of groups the user belongs to
  plan?: 'free' | 'plus' | 'pro'; // User plan tier
  accountType?: 'individual' | 'store'; // Account type for location precision defaults
  location?: {
    city: string;
    region: string;
    country?: string;
  }; // User's default location from profile
}

export interface Seller {
  id: string;
  name: string;
  username: string;
  rating?: number;
  reviews?: number;
  verified: boolean;
  isStore: boolean;
  memberSince: string;
  responseTime: string;
  itemsSold?: number;
}

// ==================== GROUP ====================

export interface Group {
  id: string;
  name: string;
  memberCount: number;
}

// ==================== EVENT ====================

export interface EventType {
  id: string;
  name: string;
  emoji: string;
}

// ==================== STATS ====================

export interface ListingStats {
  views: number;
  messages: number;
  likes: number;
  favorites?: number;
  shares?: number;
  viewsChange?: number;
}

// ==================== CONTACT & DELIVERY ====================

/**
 * Contact Methods Structure
 * Defines how sellers can be contacted
 */
export interface ContactMethods {
  whatsapp?: { 
    enabled: boolean; 
    preferred?: boolean; 
    hours?: string;
  };
  phone?: { 
    enabled: boolean; 
    hours?: string;
  };
  sms?: boolean;
  telegram?: boolean;
  email?: boolean;
}

/**
 * Delivery Options Structure
 * Defines how products can be delivered
 */
export interface DeliveryOptions {
  pickup?: boolean;
  meetup?: { 
    enabled: boolean; 
    radius?: string; 
    cost?: string;
  };
  courier?: { 
    enabled: boolean; 
    cost?: string; 
    area?: string;
  };
  postal?: { 
    enabled: boolean; 
    cost?: string; 
    coverage?: string;
  };
  locker?: boolean;
  digital?: boolean;
}

// ==================== PRIVACY ====================

export interface PrivacyPin {
  enabled: boolean;
  radius?: string;
}

// ==================== Q&A ====================

export interface Answer {
  text: string;
  answeredAt: string;
  helpful: number;
}

export interface Question {
  id: string;
  question: string;
  askedBy: string;
  askedAt: string;
  helpful: number;
  answer?: Answer;
}

// ==================== CONVERSATION ====================

export interface Conversation {
  id: string;
  userName: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

// ==================== MEDIA ====================

export interface MediaItem {
  type: "image" | "video";
  url: string;
  thumbnail?: string;
}

// ==================== PRICE ====================

export interface PriceHistoryItem {
  date: string;
  price: string;
}

// ==================== PRODUCT ====================

/**
 * Base Product interface from data layer
 */
export interface Product {
  id: string;
  image: string;
  title: string;
  price?: string;
  condition?: "New" | "Used" | "Like New";
  visibility: "public" | "group" | "private";
  location?: string;
  type: "service" | "sale" | "trade" | "free" | "sale_or_trade" | "rent" | "event";
  createdAt?: string;
  rating?: number;
  groupIds?: string[];
  ownerId?: string;
  contactModes?: ('chat' | 'phone' | 'whatsapp')[];
  phoneNumber?: string;
  description?: string;
  eventDate?: string;
  eventTime?: string;
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  ticketType?: 'free' | 'paid';
  duration?: 'single' | 'multi';
  // Search and categorization fields
  tags?: string[];
  category?: string;
  subcategory?: string;
  // Service-specific fields
  businessHours?: string; // e.g., "Monday to Friday 8:30 AM - 6:00 PM"
}

/**
 * Extended Product with additional detail page fields
 * Extends the base Product interface with contact and delivery information
 */
export interface ExtendedProduct {
  id: string;
  image: string;
  title: string;
  price?: string;
  condition?: "New" | "Used" | "Like New";
  visibility: "public" | "group" | "private";
  location?: string;
  type: "service" | "sale" | "trade" | "free" | "sale_or_trade" | "rent" | "event";
  createdAt?: string;
  rating?: number;
  groupIds?: string[];
  ownerId?: string;
  contactMethods?: ContactMethods;
  deliveryOptions?: DeliveryOptions;
  eventDate?: string;
  eventTime?: string;
  seller?: {
    id: string;
    name: string;
    avatar?: string;
    rating?: number;
    responseTime?: string;
    verified?: boolean;
  };
}