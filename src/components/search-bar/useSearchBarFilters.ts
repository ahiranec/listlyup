/**
 * Search Bar Filters Hook
 * Manages filter state and handlers
 */

import { useState } from 'react';
import type { FilterOptions } from '../FilterSheet';
import { getGroupById } from '../../data/groups';
import { 
  TYPE_OPTIONS, 
  GROUP_SCOPE_OPTIONS, 
  OFFER_MODE_OPTIONS 
} from './filterOptions';
import { filterCompatibleOfferModes, hasIncompatibleOfferModes } from '../filters/offerModeUtils';

interface UseSearchBarFiltersProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onOpenAdvancedFilters?: () => void; // Callback to open FilterSheet
}

export function useSearchBarFilters({ 
  filters, 
  onFiltersChange,
  onOpenAdvancedFilters
}: UseSearchBarFiltersProps) {
  // Popover states
  const [typeOpen, setTypeOpen] = useState(false);
  const [groupsOpen, setGroupsOpen] = useState(false);
  const [offerOpen, setOfferOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  // Active filter detection
  const hasTypeFilter = filters.type !== "all";
  const hasGroupsFilter = filters.groupsScope !== "all" || filters.specificGroups.length > 0;
  const hasOfferFilter = filters.offerModes.length > 0;
  const hasSortFilter = filters.sortBy !== "newest";

  // Handlers
  const handleTypeChange = (value: string) => {
    const newType = value as FilterOptions["type"];
    
    // Limpiar offer modes incompatibles al cambiar de tipo
    const currentOfferModes = filters.offerModes || [];
    const cleanedOfferModes = filterCompatibleOfferModes(newType, currentOfferModes);
    
    // Solo actualizar offerModes si hay incompatibles
    if (hasIncompatibleOfferModes(newType, currentOfferModes)) {
      onFiltersChange({ ...filters, type: newType, offerModes: cleanedOfferModes });
    } else {
      onFiltersChange({ ...filters, type: newType });
    }
    
    setTypeOpen(false);
  };

  const handleGroupsChange = (value: string) => {
    if (value !== "specific") {
      // For other options, apply immediately and close popover
      onFiltersChange({ ...filters, groupsScope: value as any, specificGroups: [] });
      setGroupsOpen(false);
    } else {
      // For "Specific Groups", set the scope and open FilterSheet
      onFiltersChange({ ...filters, groupsScope: value as any });
      setGroupsOpen(false);
      // Open the advanced filters sheet to select specific groups
      if (onOpenAdvancedFilters) {
        onOpenAdvancedFilters();
      }
    }
  };

  const handleOfferChange = (value: string) => {
    // For quick filters, we use single selection (not multi-select like in full modal)
    // "all" = empty array, otherwise set single value in array
    const newOfferModes = value === "all" ? [] : [value as any];
    onFiltersChange({ ...filters, offerModes: newOfferModes });
    setOfferOpen(false);
  };

  const handleSortChange = (value: string) => {
    onFiltersChange({ ...filters, sortBy: value as any });
    setSortOpen(false);
  };

  // Label getters
  const getSelectedTypeLabel = () => {
    return TYPE_OPTIONS.find(opt => opt.value === filters.type)?.label || "All Types";
  };

  const getSelectedGroupsLabel = () => {
    if (filters.groupsScope === "specific" && filters.specificGroups.length > 0) {
      // If only one specific group, show the group name
      if (filters.specificGroups.length === 1) {
        const group = getGroupById(filters.specificGroups[0]);
        if (group) {
          return group.name.length > 15 ? `${group.name.substring(0, 15)}...` : group.name;
        }
      }
      return `${filters.specificGroups.length} selected`;
    }
    const option = GROUP_SCOPE_OPTIONS.find(opt => opt.value === filters.groupsScope);
    if (option?.value === "all") return "All";
    if (option?.value === "public") return "Public";
    if (option?.value === "my-groups") return "My Groups";
    return "Groups";
  };

  const getSelectedOfferLabel = () => {
    // If no modes selected, show "All"
    if (filters.offerModes.length === 0) return "All";
    
    // If exactly one mode selected, show its short label
    if (filters.offerModes.length === 1) {
      const selectedValue = filters.offerModes[0];
      if (selectedValue === "for_sale") return "Sale";
      if (selectedValue === "for_trade") return "Trade";
      if (selectedValue === "for_free") return "Free";
      if (selectedValue === "for_rent") return "Rent";
    }
    
    // If multiple modes selected
    return `${filters.offerModes.length} modes`;
  };

  return {
    // States
    typeOpen,
    setTypeOpen,
    groupsOpen,
    setGroupsOpen,
    offerOpen,
    setOfferOpen,
    sortOpen,
    setSortOpen,
    
    // Active filters
    hasTypeFilter,
    hasGroupsFilter,
    hasOfferFilter,
    hasSortFilter,
    
    // Handlers
    handleTypeChange,
    handleGroupsChange,
    handleOfferChange,
    handleSortChange,
    
    // Label getters
    getSelectedTypeLabel,
    getSelectedGroupsLabel,
    getSelectedOfferLabel,
    onOpenAdvancedFilters
  };
}