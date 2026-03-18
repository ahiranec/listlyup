/**
 * Search Bar Component (Refactored)
 * Quick filters bar with type, groups, offer, sort, and advanced filters
 * Mobile-first design with horizontal scroll
 */

import { ShoppingBag, Users, Tag, ArrowUpDown } from 'lucide-react';
import { ViewToggleButton } from './ViewToggleButton';
import { FilterButton } from './FilterButton';
import { FilterPopover } from './FilterPopover';
import { AdvancedFiltersButton } from './AdvancedFiltersButton';
import { useSearchBarFilters } from './useSearchBarFilters';
import { 
  TYPE_OPTIONS,
  GROUP_SCOPE_OPTIONS,
  OFFER_MODE_OPTIONS,
  SORT_BY_OPTIONS 
} from './filterOptions';
import type { FilterOptions } from '../filter-sheet';
import { getValidOfferModes, type OfferMode } from '../filters/offerModeUtils';

interface SearchBarProps {
  onMapViewClick?: () => void;
  isMapView?: boolean;
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onFilterClick?: () => void;
  hasActiveFilters?: boolean;
}

export function SearchBar({
  onMapViewClick,
  isMapView = false,
  filters,
  onFiltersChange,
  onFilterClick,
  hasActiveFilters = false,
}: SearchBarProps) {
  const {
    typeOpen,
    setTypeOpen,
    groupsOpen,
    setGroupsOpen,
    offerOpen,
    setOfferOpen,
    sortOpen,
    setSortOpen,
    hasTypeFilter,
    hasGroupsFilter,
    hasOfferFilter,
    hasSortFilter,
    handleTypeChange,
    handleGroupsChange,
    handleOfferChange,
    handleSortChange,
    getSelectedTypeLabel,
    getSelectedGroupsLabel,
    getSelectedOfferLabel,
  } = useSearchBarFilters({ 
    filters, 
    onFiltersChange,
    onOpenAdvancedFilters: onFilterClick // Pass the callback to open FilterSheet
  });

  // Filtrar offer mode options según el listing type seleccionado
  const validOfferModes = getValidOfferModes(filters.type);
  const filteredOfferModeOptions = OFFER_MODE_OPTIONS.filter((opt) => 
    opt.value === 'all' || validOfferModes.includes(opt.value as OfferMode)
  );

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      {/* Quick Filters Bar */}
      <div className="relative flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 overflow-x-auto scrollbar-hide">
        {/* Left scroll gradient indicator */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" />
        
        {/* Right scroll gradient indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none z-10 opacity-0 transition-opacity duration-300" />
        
        {/* Map/List View Toggle - Hidden on desktop (now in Header) */}
        <div className="lg:hidden">
          <ViewToggleButton 
            isMapView={isMapView}
            onClick={onMapViewClick}
          />
        </div>

        {/* Listing Type Filter */}
        <FilterPopover
          open={typeOpen}
          onOpenChange={setTypeOpen}
          title="Listing Type"
          value={filters.type}
          options={TYPE_OPTIONS}
          onValueChange={handleTypeChange}
          align="start"
        >
          <FilterButton
            icon={ShoppingBag}
            label={getSelectedTypeLabel()}
            isActive={hasTypeFilter}
          />
        </FilterPopover>

        {/* Groups Filter */}
        <FilterPopover
          open={groupsOpen}
          onOpenChange={setGroupsOpen}
          title="Groups"
          value={filters.groupsScope}
          options={GROUP_SCOPE_OPTIONS}
          onValueChange={handleGroupsChange}
          align="start"
        >
          <FilterButton
            icon={Users}
            label={getSelectedGroupsLabel()}
            isActive={hasGroupsFilter}
          />
        </FilterPopover>

        {/* Offer Mode Filter - Opciones filtradas dinámicamente */}
        <FilterPopover
          open={offerOpen}
          onOpenChange={setOfferOpen}
          title="Offer Mode"
          value={filters.offerModes.length === 0 ? "all" : filters.offerModes[0]}
          options={filteredOfferModeOptions}
          onValueChange={handleOfferChange}
          align="start"
        >
          <FilterButton
            icon={Tag}
            label={getSelectedOfferLabel()}
            isActive={hasOfferFilter}
          />
        </FilterPopover>

        {/* Sort By */}
        <FilterPopover
          open={sortOpen}
          onOpenChange={setSortOpen}
          title="Sort By"
          value={filters.sortBy}
          options={SORT_BY_OPTIONS}
          onValueChange={handleSortChange}
          align="end"
        >
          <FilterButton
            icon={ArrowUpDown}
            label=""
            isActive={hasSortFilter}
            showLabelOnMobile={false}
          />
        </FilterPopover>

        {/* Advanced Filters Button */}
        <AdvancedFiltersButton
          onClick={onFilterClick}
          hasActiveFilters={hasActiveFilters}
          className="lg:hidden"
        />
      </div>
    </div>
  );
}