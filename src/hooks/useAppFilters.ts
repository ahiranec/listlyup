import { useState, useMemo } from 'react';
import { toast } from 'sonner@2.0.3';
import { defaultFilters } from '../components/filters/constants';
import type { FilterOptions } from '../components/filters/types';
import type { CanonicalListing } from '../types/canonical';

interface UseAppFiltersProps {
  visibleListings: CanonicalListing[];
  searchQuery: string;
  filteredGroupId: string | null;
  skipGroupAccessibilityFilter?: boolean;
}

/**
 * Custom hook to manage filter state and logic
 * CANONICAL NATIVE
 * Handles all filter-related operations
 */
export function useAppFilters({ 
  visibleListings, 
  searchQuery,
  filteredGroupId,
  skipGroupAccessibilityFilter = false
}: UseAppFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(defaultFilters);

  // Filter and sort listings
  const filteredAndSortedListings = useMemo(() => {
    // Early return if no listings
    if (!visibleListings || visibleListings.length === 0) {
      return [];
    }
    
    // Filter listings
    const filtered = visibleListings.filter((listing) => {
      // Group filter
      if (filteredGroupId) {
        // NOTE: group_ids is NOT part of CanonicalListing contract
        // Group relations should be handled via external listing_groups table
        // For now, we skip group filtering at the listing level
        // TODO: Implement proper group filtering via backend query
      }

      // Search filter - searches in multiple fields
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        listing.title.toLowerCase().includes(searchLower) ||
        (listing.description?.toLowerCase().includes(searchLower) ?? false) ||
        (listing.category?.toLowerCase().includes(searchLower) ?? false) ||
        (listing.subcategory?.toLowerCase().includes(searchLower) ?? false) ||
        (listing.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ?? false);

      // Type filter (Listing Type: product/service/event)
      const matchesType = 
        activeFilters.type === 'all' ||
        activeFilters.type === listing.listing_type;

      // Offer Mode filter (multi-select)
      const matchesOfferMode = 
        activeFilters.offerModes.length === 0 ||
        activeFilters.offerModes.includes(listing.offer_mode);

      // Condition filter (CANONICAL: uses 'condition' field)
      const matchesCondition = 
        activeFilters.condition === 'all' ||
        activeFilters.condition === listing.condition;

      // Access mode filter (CANONICAL)
      const matchesAccessMode = 
        activeFilters.access_mode.length === 0 ||
        activeFilters.access_mode.some(mode => listing.access_mode?.includes(mode));

      // Contact methods filter (CANONICAL)
      const matchesContactMethods = 
        activeFilters.contact_methods.length === 0 ||
        activeFilters.contact_methods.some(method => listing.contact_methods?.includes(method));

      // Price filter
      const matchesPrice = (() => {
        if (!activeFilters.minPrice && !activeFilters.maxPrice) return true;
        
        const priceAmount = listing.price_amount;
        if (priceAmount === null || priceAmount === undefined) return false;
        
        const min = activeFilters.minPrice ? parseFloat(activeFilters.minPrice) : 0;
        const max = activeFilters.maxPrice ? parseFloat(activeFilters.maxPrice) : Infinity;
        
        return priceAmount >= min && priceAmount <= max;
      })();

      // Category filter (CANONICAL: uses 'category' field)
      const matchesCategory = 
        activeFilters.category === 'all' ||
        activeFilters.category === listing.category;

      // Tags filter
      const matchesTags = 
        activeFilters.includeTags.length === 0 ||
        activeFilters.includeTags.every(tag => listing.tags?.includes(tag));

      const excludesTags = 
        activeFilters.excludeTags.length === 0 ||
        !activeFilters.excludeTags.some(tag => listing.tags?.includes(tag));

      return matchesSearch && 
             matchesType && 
             matchesOfferMode && 
             matchesCondition && 
             matchesAccessMode && 
             matchesContactMethods && 
             matchesPrice && 
             matchesCategory && 
             matchesTags && 
             excludesTags;
    });

    // Sort listings
    const sorted = [...filtered].sort((a, b) => {
      switch (activeFilters.sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'price-low':
          return (a.price_amount || 0) - (b.price_amount || 0);
        case 'price-high':
          return (b.price_amount || 0) - (a.price_amount || 0);
        case 'popular':
          // Placeholder for popularity sorting
          return 0;
        default:
          return 0;
      }
    });

    return sorted;
  }, [visibleListings, searchQuery, filteredGroupId, activeFilters]);

  // Apply filters function
  const applyFilters = (newFilters: FilterOptions) => {
    setActiveFilters(newFilters);
  };

  // Clear filters function
  const clearFilters = () => {
    setActiveFilters(defaultFilters);
    toast.success('Filters cleared');
  };

  // Get active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    
    if (activeFilters.type !== 'all') count++;
    if (activeFilters.offerModes.length > 0) count++;
    if (activeFilters.condition !== 'all') count++;
    if (activeFilters.access_mode.length > 0) count++;
    if (activeFilters.contact_methods.length > 0) count++;
    if (activeFilters.minPrice || activeFilters.maxPrice) count++;
    if (activeFilters.category !== 'all') count++;
    if (activeFilters.includeTags.length > 0) count++;
    if (activeFilters.excludeTags.length > 0) count++;
    
    return count;
  };

  return {
    activeFilters,
    filteredAndSortedListings,
    applyFilters,
    clearFilters,
    activeFilterCount: getActiveFilterCount(),
    hasActiveFilters: getActiveFilterCount() > 0,
  };
}