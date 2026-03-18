import {
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  ShoppingBag,
  Wrench,
  DollarSign,
  Repeat,
  Gift,
  Key,
  PartyPopper,
} from "lucide-react";
import type { Category, MockGroup, MockEvent, FilterOptions } from "./types";

export const sortByOptions = [
  { value: "newest", label: "Newest First", icon: Calendar },
  { value: "oldest", label: "Oldest First", icon: Clock },
  { value: "price-low", label: "Price: Low to High", icon: TrendingUp },
  { value: "price-high", label: "Price: High to Low", icon: TrendingDown },
  { value: "popular", label: "Most Popular", icon: ArrowUpDown },
];

// Listing Type Options - Maps to backend enum listing_type
export const typeOptions = [
  { value: "all", label: "All Types" },
  { value: "product", label: "Product", icon: ShoppingBag },
  { value: "service", label: "Service", icon: Wrench },
  { value: "event", label: "Event", icon: PartyPopper },
];

// Offer Mode Options - Maps to backend enum offer_mode
export const offerModeOptions = [
  { value: "for_sale", label: "For Sale", icon: DollarSign },
  { value: "for_trade", label: "For Trade", icon: Repeat },
  { value: "for_free", label: "For Free", icon: Gift },
  { value: "for_rent", label: "For Rent", icon: Key },
] as const;

export const groupScopeOptions = [
  { value: "all", label: "All (Public ∪ My Groups)" },
  { value: "public", label: "Public Only" },
  { value: "my-groups", label: "My Groups Only" },
  { value: "specific", label: "Specific Groups" },
];

// Condition Options - Maps to canonical field 'condition' (ProductCondition type)
export const conditionOptions = [
  { value: "all", label: "All Conditions" },
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
  { value: "for-parts", label: "For Parts" },
];

// Access Mode Options - CANONICAL (replaces deliveryModeOptions)
export const accessModeOptions = [
  { value: "pickup", label: "Pickup" },
  { value: "meetup", label: "Meetup" },
  { value: "delivery", label: "Delivery" },
  { value: "virtual", label: "Virtual" },
];

// Contact Methods - CANONICAL
export const contactMethodOptions = [
  { value: "in_app_chat", label: "In-App Chat" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "website", label: "Website" },
  { value: "social_media", label: "Social Media" },
];

// Lifecycle Status Options - Maps to canonical field 'status' (ListingStatus type)
export const lifecycleOptions = [
  { value: "all", label: "All" },
  { value: "draft", label: "Draft" },
  { value: "pending_review", label: "Pending Review" },
  { value: "active", label: "Active" },
  { value: "expiring_soon", label: "Expiring Soon" },
  { value: "expired", label: "Expired" },
  { value: "paused", label: "Paused" },
  { value: "removed", label: "Removed" },
  { value: "banned", label: "Banned" },
  { value: "reserved", label: "Reserved" },
  { value: "temp_unavailable", label: "Temporarily Unavailable" },
];

// Currency options with symbols and names
export const currencyOptions = {
  CLP: { symbol: "$", name: "Chilean Peso" },
  USD: { symbol: "$", name: "US Dollar" },
  EUR: { symbol: "€", name: "Euro" },
  BRL: { symbol: "R$", name: "Brazilian Real" },
  ARS: { symbol: "$", name: "Argentine Peso" },
};

export const categories: Category[] = [
  { value: "electronics", label: "Electronics", subcategories: ["Phones", "Laptops", "Tablets", "Accessories"] },
  { value: "vehicles", label: "Vehicles", subcategories: ["Cars", "Motorcycles", "Bicycles", "Parts"] },
  { value: "home", label: "Home & Garden", subcategories: ["Furniture", "Appliances", "Decor", "Tools"] },
  { value: "fashion", label: "Fashion", subcategories: ["Clothing", "Shoes", "Accessories", "Jewelry"] },
];

export const mockGroups: MockGroup[] = [
  { value: "group1", label: "Tech Enthusiasts Chile" },
  { value: "group2", label: "Vintage Marketplace" },
  { value: "group3", label: "Local Community V Region" },
];

export const mockCampaigns: MockEvent[] = [
  { value: "cybermonday2025", label: "CyberMonday 2025" },
  { value: "blackfriday2025", label: "Black Friday 2025" },
  { value: "summer-sale", label: "Summer Sale" },
  { value: "back-to-school", label: "Back to School" },
];

export const mockEvents: MockEvent[] = [
  { value: "laguna-flea-market", label: "Laguna Flea Market" },
  { value: "pioneros-charity-fair", label: "Pioneros Charity Fair" },
  { value: "vina-art-fair", label: "Viña Art Fair" },
  { value: "valpo-music-fest", label: "Valpo Music Fest" },
  { value: "renaca-beach-market", label: "Reñaca Beach Market" },
  { value: "concon-craft-fair", label: "Con Con Craft Fair" },
];

export const defaultFilters: FilterOptions = {
  sortBy: "newest",
  type: "all",
  offerModes: [], // Empty array = "All Offers" (no filter applied)
  groupsScope: "all",
  specificGroups: [],
  includeTags: [],
  excludeTags: [],
  category: "all",
  subcategory: "all",
  condition: "all",
  locationMode: "current",
  locationCity: "",
  radius: 10,
  includeShipping: false,
  privacyPin: false,
  sellerType: "all",
  specificSeller: "",
  access_mode: [],
  contact_methods: [],
  currency: "CLP",
  minPrice: "",
  maxPrice: "",
  hiddenFilter: "exclude",
  reportedFilter: "exclude",
};