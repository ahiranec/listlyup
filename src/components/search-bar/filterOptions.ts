/**
 * Filter Options Configuration
 * Centralized options for SearchBar filters
 */

import { 
  ShoppingBag, 
  Wrench, 
  DollarSign, 
  Repeat, 
  Gift,
  Key,
  Calendar,
  Clock,
  TrendingUp,
  TrendingDown,
  ArrowUpDown,
  PartyPopper,
  LucideIcon
} from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  icon?: LucideIcon;
}

// Listing Type options - Maps to backend enum listing_type
export const TYPE_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Types" },
  { value: "product", label: "Product", icon: ShoppingBag },
  { value: "service", label: "Service", icon: Wrench },
  { value: "event", label: "Event", icon: PartyPopper },
];

// Groups scope options
export const GROUP_SCOPE_OPTIONS: FilterOption[] = [
  { value: "all", label: "All (Public ∪ My Groups)" },
  { value: "public", label: "Public Only" },
  { value: "my-groups", label: "My Groups Only" },
  { value: "specific", label: "Specific Groups" },
];

// Offer Mode options - Maps to backend enum offer_mode
export const OFFER_MODE_OPTIONS: FilterOption[] = [
  { value: "all", label: "All Offers" },
  { value: "for_sale", label: "For Sale", icon: DollarSign },
  { value: "for_trade", label: "For Trade", icon: Repeat },
  { value: "for_free", label: "For Free", icon: Gift },
  { value: "for_rent", label: "For Rent", icon: Key },
];

// Sort options
export const SORT_BY_OPTIONS: FilterOption[] = [
  { value: "newest", label: "Newest First", icon: Calendar },
  { value: "oldest", label: "Oldest First", icon: Clock },
  { value: "price-low", label: "Price: Low to High", icon: TrendingUp },
  { value: "price-high", label: "Price: High to Low", icon: TrendingDown },
  { value: "popular", label: "Most Popular", icon: ArrowUpDown },
];

// Mock groups (same as FilterSheet)
export const MOCK_GROUPS: FilterOption[] = [
  { value: "group1", label: "Tech Enthusiasts Chile" },
  { value: "group2", label: "Vintage Marketplace" },
  { value: "group3", label: "Local Community V Region" },
];