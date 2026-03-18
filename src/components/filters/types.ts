import type { ContactMethod, AccessMode } from '../../types/canonical';

export interface FilterOptions {
  // Sort
  sortBy: string;
  
  // Type (maps to backend enum listing_type)
  type: "all" | "product" | "service" | "event";
  
  // Offer Mode (multi-select, maps to backend enum offer_mode[])
  offerModes: string[]; // ["for_sale", "for_trade", "for_free", "for_rent"]
  
  // Groups
  groupsScope: "all" | "public" | "my-groups" | "specific";
  specificGroups: string[];
  
  // Tags
  includeTags: string[];
  excludeTags: string[];
  
  // Category
  category: string;
  subcategory: string;
  
  // Condition (maps to backend enum condition - part of CanonicalListing)
  condition: "all" | "new" | "like-new" | "used" | "refurbished" | "for-parts";
  
  // Location
  locationMode: "current" | "map" | "city";
  locationCity: string;
  radius: number;
  includeShipping: boolean;
  privacyPin: boolean;
  
  // Seller/User
  sellerType: "all" | "individual" | "store";
  specificSeller: string;
  
  // Access Mode (CANONICAL - replaces deliveryModes)
  access_mode: AccessMode[];
  
  // Contact (CANONICAL)
  contact_methods: ContactMethod[];
  
  // Price
  currency: "CLP" | "USD" | "EUR" | "BRL" | "ARS";
  minPrice: string;
  maxPrice: string;
  
  // Advanced (Admin) - NOT shown in public filters
  hiddenFilter: "exclude" | "include";
  reportedFilter: "exclude" | "show";
}

export interface OpenSections {
  sortBy: boolean;
  type: boolean;
  offerMode: boolean;
  groups: boolean;
  tags: boolean;
  category: boolean;
  condition: boolean;
  location: boolean;
  seller: boolean;
  delivery: boolean;
  contact: boolean;
  price: boolean;
  advanced: boolean;
}

export interface Category {
  value: string;
  label: string;
  subcategories: string[];
}

export interface MockGroup {
  value: string;
  label: string;
}

export interface MockEvent {
  value: string;
  label: string;
}