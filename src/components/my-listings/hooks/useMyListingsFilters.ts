import { useState, useMemo } from "react";
import type { FilterState, MyListing } from "../types";
import type { ListingLifecycle, ListingType, ListingVisibility } from "../../../types";

const defaultFilters: FilterState = {
  status: new Set(),
  type: new Set(),
  visibility: new Set(),
  selectedGroups: new Set(),
  groupsScope: "all",
  selectedEventTypes: new Set(),
  hasMessages: false,
  isReported: false,
  isExpiringSoon: false,
  discounted: false,
  lowEngagement: false,
  highEngagement: false,
};

export function useMyListingsFilters(listings: MyListing[]) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Toggle helpers
  const toggleStatus = (status: ListingLifecycle) => {
    setFilters(prev => {
      const newSet = new Set(prev.status);
      if (newSet.has(status)) {
        newSet.delete(status);
      } else {
        newSet.add(status);
      }
      return { ...prev, status: newSet };
    });
  };

  const toggleType = (type: ListingType) => {
    setFilters(prev => {
      const newSet = new Set(prev.type);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return { ...prev, type: newSet };
    });
  };

  const toggleVisibility = (visibility: ListingVisibility) => {
    setFilters(prev => {
      const newSet = new Set(prev.visibility);
      if (newSet.has(visibility)) {
        newSet.delete(visibility);
      } else {
        newSet.add(visibility);
      }
      return { ...prev, visibility: newSet };
    });
  };

  const toggleGroup = (groupId: string) => {
    setFilters(prev => {
      const newSet = new Set(prev.selectedGroups);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return { ...prev, selectedGroups: newSet };
    });
  };

  const setGroupsScope = (scope: "all" | "public" | "my-groups" | "specific") => {
    setFilters(prev => ({ ...prev, groupsScope: scope }));
  };

  const setHasMessages = (value: boolean) => {
    setFilters(prev => ({ ...prev, hasMessages: value }));
  };

  const setIsReported = (value: boolean) => {
    setFilters(prev => ({ ...prev, isReported: value }));
  };

  const setIsExpiringSoon = (value: boolean) => {
    setFilters(prev => ({ ...prev, isExpiringSoon: value }));
  };

  const setHasDiscount = (value: boolean) => {
    setFilters(prev => ({ ...prev, discounted: value }));
  };

  const setLowViews = (value: boolean) => {
    setFilters(prev => ({ ...prev, lowEngagement: value }));
  };

  const setHighViews = (value: boolean) => {
    setFilters(prev => ({ ...prev, highEngagement: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    count += filters.status.size;
    count += filters.type.size;
    count += filters.visibility.size;
    if (filters.groupsScope !== "all") count++;
    if (filters.groupsScope === "specific") count += filters.selectedGroups.size;
    if (filters.hasMessages) count++;
    if (filters.isReported) count++;
    if (filters.isExpiringSoon) count++;
    if (filters.discounted) count++;
    if (filters.lowEngagement) count++;
    if (filters.highEngagement) count++;
    return count;
  }, [filters]);

  // Apply filters to listings
  const filteredListings = useMemo(() => {
    return listings.filter(listing => {
      // Status filter
      if (filters.status.size > 0 && !filters.status.has(listing.lifecycle)) {
        return false;
      }

      // Type filter
      if (filters.type.size > 0 && !filters.type.has(listing.type)) {
        return false;
      }

      // Visibility filter
      if (filters.visibility.size > 0 && !filters.visibility.has(listing.visibility)) {
        return false;
      }

      // Groups filter
      if (filters.groupsScope === "public" && listing.groupIds && listing.groupIds.length > 0) {
        return false; // Exclude listings in groups
      }
      if (filters.groupsScope === "my-groups" && (!listing.groupIds || listing.groupIds.length === 0)) {
        return false; // Exclude public listings
      }
      if (filters.groupsScope === "specific" && filters.selectedGroups.size > 0) {
        const hasSelectedGroup = listing.groupIds?.some(gid => filters.selectedGroups.has(gid));
        if (!hasSelectedGroup) return false;
      }

      // Alerts filters
      if (filters.hasMessages && listing.stats.messages === 0) {
        return false;
      }
      if (filters.isReported && !listing.stats.reported) {
        return false;
      }
      if (filters.isExpiringSoon && listing.lifecycle !== "expiring_soon") {
        return false;
      }

      // Extras filters
      if (filters.discounted && !listing.stats.discounted) {
        return false;
      }
      if (filters.lowEngagement && listing.stats.views >= 50) {
        return false; // Example threshold
      }
      if (filters.highEngagement && listing.stats.views < 100) {
        return false; // Example threshold
      }

      return true;
    });
  }, [listings, filters]);

  return {
    filters,
    setFilters,
    toggleStatus,
    toggleType,
    toggleVisibility,
    toggleGroup,
    setGroupsScope,
    setHasMessages,
    setIsReported,
    setIsExpiringSoon,
    setHasDiscount,
    setLowViews,
    setHighViews,
    resetFilters,
    activeFilterCount,
    filteredListings,
  };
}
