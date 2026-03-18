/**
 * Filter constants and default values
 * Single source of truth for filter configurations
 */

import type { FilterOptions } from "../components/filter-sheet";

/**
 * Default filter state
 * Used for initial state and reset functionality
 */
export const DEFAULT_FILTERS: FilterOptions = {
  sortBy: "newest",
  type: "all",
  offerModes: [],
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
  deliveryModes: [],
  contactModes: [],
  currency: "CLP",
  minPrice: "",
  maxPrice: "",
  hiddenFilter: "exclude",
  reportedFilter: "exclude",
};