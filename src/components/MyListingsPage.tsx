import { useState, useMemo } from "react";
import { toast } from "sonner@2.0.3";
import { isExpiringSoon, hasLowEngagement, shareContent } from "../utils/helpers";
import type { Group, EventType } from "../types";
import {
  MyListingsHeader,
  SearchAndFilterBar,
  FilterButton,
  BulkActionsToolbar,
  SelectAllRow,
  ListingCard,
  MyListingsFilterSheet,
  EmptyState,
  useMyListingsFilters,
  type MyListing,
  type FilterChip,
} from "./my-listings";
import { ShareToGroupSheet } from "./groups/ShareToGroupSheet";
import { BottomNav } from "./bottom-nav";
import { ConfirmActionDialog } from "./action-center/ConfirmActionDialog";
import { useGlobalActionModal } from "./global-action-modal"; // ✅ Phase 5.1: GAM for confirmations

interface MyListingsPageProps {
  onBack: () => void;
  listings?: MyListing[];
  groups?: Group[];
  eventTypes?: EventType[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onNavigateToDetail?: (listingId: string) => void;
  onEditListing?: (listingId: string) => void; // NEW: Edit listing handler
}

// Mock event types
const mockEventTypes: EventType[] = [
  { id: "black-friday", name: "Black Friday", emoji: "🖤" },
  { id: "cyber-monday", name: "Cyber Monday", emoji: "💻" },
  { id: "christmas", name: "Christmas", emoji: "🎄" },
  { id: "new-year", name: "New Year", emoji: "🎆" },
  { id: "valentines", name: "Valentine's Day", emoji: "💝" },
  { id: "mothers-day", name: "Mother's Day", emoji: "🌸" },
];

// Mock groups
const mockGroups: Group[] = [
  { id: "g1", name: "Vecinos Valparaíso", memberCount: 234 },
  { id: "g2", name: "Tech Lovers Chile", memberCount: 1205 },
  { id: "g3", name: "Deportes Viña del Mar", memberCount: 567 },
  { id: "g4", name: "Compra/Venta Reñaca", memberCount: 892 },
  { id: "g5", name: "Familia & Amigos", memberCount: 45 },
];

// Mock data - MVP aligned with favorites instead of likes
const mockListings: MyListing[] = [
  {
    id: "1",
    title: "iPhone 14 Pro Max 256GB",
    type: "product",
    offerType: "sale",
    price: "$899.990",
    location: "Valparaíso",
    username: "techseller",
    lifecycle: "active",
    visibility: "public",
    stats: { views: 1234, messages: 45, favorites: 89 },
    createdAt: new Date("2024-11-01"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "2",
    title: "Clases de Yoga Online",
    type: "service",
    price: "$15.000/clase",
    location: "Viña del Mar",
    username: "yogainstructor",
    lifecycle: "active",
    visibility: "public",
    stats: { views: 567, messages: 23, favorites: 34 },
    createdAt: new Date("2024-10-28"),
    updatedAt: new Date("2024-11-09"),
  },
  {
    id: "3",
    title: "Bicicleta Montaña Scott",
    type: "product",
    offerType: "sale",
    price: "$450.000",
    location: "Reñaca",
    username: "techseller",
    lifecycle: "draft",
    visibility: "private",
    stats: { views: 0, messages: 0, favorites: 0 },
    createdAt: new Date("2024-11-10"),
    updatedAt: new Date("2024-11-10"),
  },
  {
    id: "4",
    title: "Concierto Rock en Vivo",
    type: "event",
    price: "$12.000",
    location: "Valparaíso",
    username: "eventplanner",
    lifecycle: "active",
    visibility: "groups",
    groupIds: ["g2", "g3"], // Tech Lovers + Deportes Viña
    eventTypeId: "black-friday", // Black Friday event
    stats: { views: 890, messages: 67, favorites: 123 },
    createdAt: new Date("2024-10-25"),
    updatedAt: new Date("2024-11-08"),
  },
  {
    id: "5",
    title: "Reparación Computadores",
    type: "service",
    price: "Desde $20.000",
    location: "Viña del Mar",
    username: "techseller",
    lifecycle: "paused",
    visibility: "public",
    stats: { views: 345, messages: 12, favorites: 18 },
    createdAt: new Date("2024-10-20"),
    updatedAt: new Date("2024-11-05"),
  },
  {
    id: "6",
    title: "Mueble Vintage Restaurado",
    type: "product",
    offerType: "sale",
    price: "$180.000",
    location: "Concón",
    username: "antiqueseller",
    lifecycle: "active",
    visibility: "public",
    stats: { views: 234, messages: 5, favorites: 12 },
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "7",
    title: "Tour Gastronómico Valparaíso",
    type: "service",
    price: "$35.000/persona",
    location: "Valparaíso",
    username: "tourguide",
    lifecycle: "active",
    visibility: "groups",
    groupIds: ["g1", "g5"], // Vecinos Valparaíso + Familia & Amigos
    stats: { views: 678, messages: 34, favorites: 56 },
    createdAt: new Date("2024-10-30"),
    updatedAt: new Date("2024-11-11"),
  },
  {
    id: "8",
    title: "Laptop Gaming MSI",
    type: "product",
    offerType: "sale",
    price: "$1.200.000",
    location: "Valparaíso",
    username: "techseller",
    lifecycle: "expired",
    visibility: "public",
    stats: { views: 456, messages: 8, favorites: 15 },
    createdAt: new Date("2024-08-15"),
    updatedAt: new Date("2024-09-15"),
  },
];

export function MyListingsPage({ onBack, listings = mockListings, groups = mockGroups, eventTypes = mockEventTypes, activeTab = "all", onTabChange, onNavigateToDetail, onEditListing }: MyListingsPageProps) {
  // ✅ Phase 5.1: Global Action Modal for confirmations
  const { dispatch } = useGlobalActionModal();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState<"all" | "paused" | "messages" | "reported" | "expiring">("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isShareToGroupSheetOpen, setIsShareToGroupSheetOpen] = useState(false);
  const [listingToShare, setListingToShare] = useState<MyListing | null>(null);

  // ✅ Phase 5.1: Confirm Dialog State removed - now handled by GAM

  // Advanced filters state
  const [filters, setFilters] = useState<FilterState>({
    status: new Set(),
    type: new Set(),
    visibility: new Set(),
    selectedGroups: new Set(),
    groupsScope: "all", // Add missing field
    selectedEventTypes: new Set(),
    hasMessages: false,
    isReported: false,
    isExpiringSoon: false,
    discounted: false,
    lowEngagement: false,
    highEngagement: false, // Add missing field
  });

  // Calculate active filter count
  const activeFilterCount = 
    filters.status.size + 
    filters.type.size + 
    filters.visibility.size +
    filters.selectedGroups.size +
    filters.selectedEventTypes.size +
    (filters.hasMessages ? 1 : 0) +
    (filters.isReported ? 1 : 0) +
    (filters.isExpiringSoon ? 1 : 0) +
    (filters.discounted ? 1 : 0) +
    (filters.lowEngagement ? 1 : 0) +
    (filters.highEngagement ? 1 : 0);

  // Helper: Check if listing has unread messages
  const hasUnreadMessages = (listing: MyListing) => {
    // Check if listing has the hasUnreadMessages field from Product
    return (listing as any).hasUnreadMessages === true;
  };

  // Helper: Check if listing is reported
  const isReported = (listing: MyListing) => {
    // Check if listing has the isReported field from Product
    return (listing as any).isReported === true;
  };

  // Helper: Check if listing is expiring (within 7 days)
  const isListingExpiring = (listing: MyListing) => {
    // Check if listing has daysUntilExpiration field and it's <= 7
    const days = (listing as any).daysUntilExpiration;
    return typeof days === 'number' && days <= 7;
  };

  // Filter listings with useMemo for performance
  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      // Search
      const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Tab
      let matchesTab = true;
      if (selectedTab === "paused") {
        matchesTab = listing.lifecycle === "paused";
      } else if (selectedTab === "messages") {
        matchesTab = hasUnreadMessages(listing);
      } else if (selectedTab === "reported") {
        matchesTab = isReported(listing);
      } else if (selectedTab === "expiring") {
        matchesTab = isListingExpiring(listing);
      }

      // Advanced filters - AND between categories, OR within category
      const matchesStatus = filters.status.size === 0 || filters.status.has(listing.lifecycle);
      const matchesType = filters.type.size === 0 || filters.type.has(listing.type);
      const matchesVisibility = filters.visibility.size === 0 || filters.visibility.has(listing.visibility);
      const matchesGroups = filters.selectedGroups.size === 0 || (listing.groupIds && listing.groupIds.some(id => filters.selectedGroups.has(id)));
      const matchesEventTypes = filters.selectedEventTypes.size === 0 || (listing.eventTypeId && filters.selectedEventTypes.has(listing.eventTypeId));
      
      // Alert filters
      const matchesHasMessages = !filters.hasMessages || hasUnreadMessages(listing);
      const matchesIsReported = !filters.isReported || isReported(listing);
      const matchesIsExpiringSoon = !filters.isExpiringSoon || isListingExpiring(listing);
      const matchesDiscounted = !filters.discounted || false; // Mock: none discounted
      const matchesLowEngagement = !filters.lowEngagement || hasLowEngagement(listing);
      const matchesHighEngagement = !filters.highEngagement || false; // Mock: none high engagement

      return matchesSearch && matchesTab && matchesStatus && matchesType && matchesVisibility && matchesGroups && matchesEventTypes && matchesHasMessages && matchesIsReported && matchesIsExpiringSoon && matchesDiscounted && matchesLowEngagement && matchesHighEngagement;
    });
  }, [listings, searchQuery, selectedTab, filters]);

  // Toggle filter helpers
  const toggleFilter = <K extends "type" | "visibility" | "status">(
    category: K, 
    value: any
  ) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const categorySet = new Set(prev[category]);
      if (categorySet.has(value)) {
        categorySet.delete(value);
      } else {
        categorySet.add(value);
      }
      newFilters[category] = categorySet as any;
      return newFilters;
    });
  };

  const toggleGroupFilter = (groupId: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const groupSet = new Set(prev.selectedGroups);
      if (groupSet.has(groupId)) {
        groupSet.delete(groupId);
      } else {
        groupSet.add(groupId);
      }
      newFilters.selectedGroups = groupSet;
      return newFilters;
    });
  };

  const toggleEventTypeFilter = (eventTypeId: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      const eventTypeSet = new Set(prev.selectedEventTypes);
      if (eventTypeSet.has(eventTypeId)) {
        eventTypeSet.delete(eventTypeId);
      } else {
        eventTypeSet.add(eventTypeId);
      }
      newFilters.selectedEventTypes = eventTypeSet;
      return newFilters;
    });
  };

  // Clear all filters
  const clearAllFilters = () => {
    setFilters({
      status: new Set(),
      type: new Set(),
      visibility: new Set(),
      selectedGroups: new Set(),
      groupsScope: "all", // Add missing field
      selectedEventTypes: new Set(),
      hasMessages: false,
      isReported: false,
      isExpiringSoon: false,
      discounted: false,
      lowEngagement: false,
      highEngagement: false, // Add missing field
    });
  };

  // Get active filter chips
  const getFilterChips = (): FilterChip[] => {
    const chips: FilterChip[] = [];
    
    const filterLabels = {
      status: {
        "active": "🟢 Active",
        "draft": "⚪ Draft",
        "paused": "🟡 Paused",
        "expired": "🔴 Expired",
        "archived": "⚫ Archived",
      },
      type: {
        "product": "📦 Product",
        "service": "🛠️ Service",
        "event": "🎭 Event",
        "experience": "✨ Experience",
      },
      visibility: {
        "public": "🌍 Public",
        "private": "🔒 Private",
        "groups": "👥 Groups",
      },
    };

    (["status", "type", "visibility"] as const).forEach(category => {
      filters[category].forEach((value: any) => {
        chips.push({
          label: filterLabels[category][value as keyof typeof filterLabels[typeof category]],
          key: `${category}-${value}`,
          onRemove: () => toggleFilter(category, value),
        });
      });
    });

    if (filters.selectedGroups.size > 0) {
      filters.selectedGroups.forEach(groupId => {
        const group = groups.find(g => g.id === groupId);
        if (group) {
          chips.push({
            label: `👥 ${group.name}`,
            key: `group-${groupId}`,
            onRemove: () => toggleGroupFilter(groupId),
          });
        }
      });
    }

    if (filters.selectedEventTypes.size > 0) {
      filters.selectedEventTypes.forEach(eventTypeId => {
        const eventType = eventTypes.find(e => e.id === eventTypeId);
        if (eventType) {
          chips.push({
            label: `📅 ${eventType.name}`,
            key: `event-type-${eventTypeId}`,
            onRemove: () => toggleEventTypeFilter(eventTypeId),
          });
        }
      });
    }

    if (filters.hasMessages) {
      chips.push({
        label: "💬 Has Messages",
        key: "has-messages",
        onRemove: () => setFilters(prev => ({ ...prev, hasMessages: false })),
      });
    }

    if (filters.isReported) {
      chips.push({
        label: "🚨 Reported",
        key: "is-reported",
        onRemove: () => setFilters(prev => ({ ...prev, isReported: false })),
      });
    }

    if (filters.isExpiringSoon) {
      chips.push({
        label: "⏰ Expiring Soon",
        key: "is-expiring-soon",
        onRemove: () => setFilters(prev => ({ ...prev, isExpiringSoon: false })),
      });
    }

    if (filters.discounted) {
      chips.push({
        label: "💰 Has Discount",
        key: "discounted",
        onRemove: () => setFilters(prev => ({ ...prev, discounted: false })),
      });
    }

    if (filters.lowEngagement) {
      chips.push({
        label: "👁️ Low Views",
        key: "low-engagement",
        onRemove: () => setFilters(prev => ({ ...prev, lowEngagement: false })),
      });
    }

    if (filters.highEngagement) {
      chips.push({
        label: "👁️ High Views",
        key: "high-engagement",
        onRemove: () => setFilters(prev => ({ ...prev, highEngagement: false })),
      });
    }

    return chips;
  };

  const filterChips = useMemo(() => getFilterChips(), [filters, groups, eventTypes]);

  // Selection handlers
  const toggleSelection = (id: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(id)) {
      newSelection.delete(id);
    } else {
      newSelection.add(id);
    }
    setSelectedIds(newSelection);
    setIsSelectionMode(newSelection.size > 0);
  };

  const selectAll = () => {
    setSelectedIds(new Set(filteredListings.map((l) => l.id)));
    setIsSelectionMode(true);
  };

  const deselectAll = () => {
    setSelectedIds(new Set());
    setIsSelectionMode(false);
  };

  // Bulk actions
  const handleBulkDelete = () => {
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: 'delete-listing',
      context: {
        count: selectedIds.size,
      },
      onConfirm: () => {
        toast.success(`Deleted ${selectedIds.size} listings`);
        deselectAll();
      },
    });
  };

  const handleBulkPause = () => {
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: 'pause-listing',
      context: {
        count: selectedIds.size,
      },
      onConfirm: () => {
        toast.success(`Paused ${selectedIds.size} listings`);
        deselectAll();
      },
    });
  };

  const handleBulkArchive = () => {
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: 'archive-listing',
      context: {
        count: selectedIds.size,
      },
      onConfirm: () => {
        toast.success(`Archived ${selectedIds.size} listings`);
        deselectAll();
      },
    });
  };

  // Individual actions
  const handlePreview = (listing: MyListing) => {
    if (onNavigateToDetail) {
      onNavigateToDetail(listing.id);
    } else {
      toast.info(`Preview: ${listing.title}`);
    }
  };

  const handleEdit = (listing: MyListing) => {
    if (onEditListing) {
      onEditListing(listing.id);
    } else {
      toast.info(`Edit: ${listing.title}`);
    }
  };

  const handleShare = async (listing: MyListing) => {
    const result = await shareContent({
      title: listing.title,
      text: `Check out: ${listing.title}`,
      url: window.location.href
    });
    
    if (result.success) {
      if (result.method === "clipboard" || result.method === "manual") {
        toast.success("Link copied to clipboard!");
      } else {
        toast.success("Shared successfully!");
      }
    } else {
      toast.error("Failed to share");
    }
  };

  const handleTogglePause = (listing: MyListing) => {
    const isPaused = listing.lifecycle === "paused";
    
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: isPaused ? 'resume-listing' : 'pause-listing',
      context: {
        listingTitle: listing.title,
      },
      onConfirm: () => {
        const action = isPaused ? "resume" : "pause";
        toast.success(`Listing ${action}d`);
      },
    });
  };

  const handleDelete = (listing: MyListing) => {
    // ✅ Phase 5.1: Migrated to GAM
    dispatch({
      actionId: 'delete-listing',
      context: {
        listingTitle: listing.title,
      },
      onConfirm: () => {
        toast.success(`Deleted: ${listing.title}`);
      },
    });
  };

  const handleShareToGroup = (listing: MyListing) => {
    // ✅ P2: Migrated to GAM
    dispatch({
      actionId: 'share-to-group',
      context: {
        listingId: listing.id,
        listingTitle: listing.title,
        listingImage: listing.image,
        productId: listing.id,
      },
      onConfirm: () => {
        // ShareToGroupSheet handles internal share logic
        // Toast is shown by the sheet internally
      },
    });
  };

  const handleCreateListing = () => {
    toast.info("Opening create listing wizard...");
    // TODO: Open create listing wizard
  };

  const handleToggleSelectionMode = () => {
    if (isSelectionMode) {
      deselectAll();
    } else {
      setIsSelectionMode(true);
    }
  };

  const handleAnalytics = () => {
    toast.info("Opening analytics dashboard...");
    // TODO: Open analytics view
  };

  // Count by lifecycle
  const counts = useMemo(() => ({
    all: listings.length,
    active: listings.filter((l) => l.lifecycle === "active").length,
    paused: listings.filter((l) => l.lifecycle === "paused").length,
    messages: listings.filter(l => hasUnreadMessages(l)).length,
    reported: listings.filter(l => isReported(l)).length,
    expiring: listings.filter(l => isListingExpiring(l)).length,
  }), [listings]);

  return (
    <div className="flex flex-col h-full bg-background max-w-[480px] lg:max-w-[1024px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}
      
      {/* Header with Search and Tabs */}
      <MyListingsHeader
        onBack={onBack}
        counts={counts}
        selectedTab={selectedTab}
        onTabChange={setSelectedTab}
      />

      {/* Search and Filter Bar */}
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilterCount={activeFilterCount}
        onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
      />

      {/* Filter Chips */}
      {filterChips.length > 0 && (
        <div className="px-4 py-2 bg-muted/30 border-b flex-shrink-0">
          <div className="flex flex-wrap gap-2">
            {filterChips.map((chip) => (
              <button
                key={chip.key}
                onClick={chip.onRemove}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 text-primary rounded-full text-xs hover:bg-primary/20 transition-colors"
              >
                <span>{chip.label}</span>
                <span className="text-primary/60">×</span>
              </button>
            ))}
            <button
              onClick={clearAllFilters}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-destructive/10 text-destructive rounded-full text-xs hover:bg-destructive/20 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* Bulk Actions Toolbar */}
      <BulkActionsToolbar
        isVisible={isSelectionMode}
        selectedCount={selectedIds.size}
        onDeselectAll={deselectAll}
        onBulkPause={handleBulkPause}
        onBulkArchive={handleBulkArchive}
        onBulkDelete={handleBulkDelete}
      />

      {/* Listings List */}
      <div className="flex-1 overflow-auto">
        {filteredListings.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <>
            {/* Mobile: Vertical List */}
            <div className="divide-y divide-border lg:hidden">
              {/* Select All Row */}
              <SelectAllRow
                totalCount={filteredListings.length}
                isAllSelected={selectedIds.size === filteredListings.length}
                onSelectAll={selectAll}
                onDeselectAll={deselectAll}
              />

              {/* Listing Rows */}
              {filteredListings.map((listing, index) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  index={index}
                  isSelected={selectedIds.has(listing.id)}
                  onToggleSelection={toggleSelection}
                  onNavigateToDetail={onNavigateToDetail}
                  onEdit={onEditListing}
                  activeTab={selectedTab}
                  onActionComplete={() => {
                    // Callback cuando se completa una acción (ej: después de marcar como sold)
                    // Podríamos actualizar la lista aquí si fuera necesario
                  }}
                />
              ))}
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden lg:block p-4">
              {/* Select All Row */}
              <div className="mb-4">
                <SelectAllRow
                  totalCount={filteredListings.length}
                  isAllSelected={selectedIds.size === filteredListings.length}
                  onSelectAll={selectAll}
                  onDeselectAll={deselectAll}
                />
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredListings.map((listing, index) => (
                  <ListingCard
                    key={listing.id}
                    listing={listing}
                    index={index}
                    isSelected={selectedIds.has(listing.id)}
                    onToggleSelection={toggleSelection}
                    onNavigateToDetail={onNavigateToDetail}
                    onEdit={onEditListing}
                    activeTab={selectedTab}
                    onActionComplete={() => {
                      // Callback cuando se completa una acción (ej: después de marcar como sold)
                      // Podríamos actualizar la lista aquí si fuera necesario
                    }}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Filter Sheet */}
      <MyListingsFilterSheet
        open={isFilterSheetOpen}
        onOpenChange={setIsFilterSheetOpen}
        filters={filters}
        groups={groups}
        activeFilterCount={activeFilterCount}
        onStatusChange={(status) => toggleFilter("status", status)}
        onHasMessagesChange={(val) => setFilters(prev => ({ ...prev, hasMessages: val }))}
        onIsReportedChange={(val) => setFilters(prev => ({ ...prev, isReported: val }))}
        onIsExpiringSoonChange={(val) => setFilters(prev => ({ ...prev, isExpiringSoon: val }))}
        onTypeChange={(type) => toggleFilter("type", type)}
        onVisibilityChange={(visibility) => toggleFilter("visibility", visibility)}
        onGroupsScopeChange={(scope) => setFilters(prev => ({ ...prev, groupsScope: scope }))}
        onGroupToggle={toggleGroupFilter}
        onHasDiscountChange={(val) => setFilters(prev => ({ ...prev, discounted: val }))}
        onLowViewsChange={(val) => setFilters(prev => ({ ...prev, lowEngagement: val }))}
        onHighViewsChange={(val) => setFilters(prev => ({ ...prev, highEngagement: val }))}
        onClearAll={clearAllFilters}
      />

      {/* Share to Group Sheet */}
      {listingToShare && (
        <ShareToGroupSheet
          open={isShareToGroupSheetOpen}
          onOpenChange={setIsShareToGroupSheetOpen}
          productTitle={listingToShare.title}
          productId={listingToShare.id}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />

      {/* ✅ Phase 5.1: Confirm Dialog removed - now handled by GAM Provider */}
    </div>
  );
}

export default MyListingsPage;