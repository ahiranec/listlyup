import { useState, useMemo } from "react";
import { toast } from "sonner@2.0.3";
import {
  GroupsHeader,
  GroupCard,
  GroupFiltersSheet,
  ExploreGroupsSheet,
  EmptyState,
  type MyGroup,
  type GroupFilterState,
  type GroupStatus,
  type GroupType,
  type GroupVisibility,
  type JoinPolicy,
  type MemberRole,
  type MemberStatus,
} from "./index";
import { CreateGroupSheet } from "./CreateGroupSheet";
import { MuteNotificationsDialog, type MuteDuration } from "./MuteNotificationsDialog";
import { LeaveGroupDialog } from "./LeaveGroupDialog";
import { SearchAndFilterBar } from "./SearchAndFilterBar";
import { GroupActionsBar } from "./GroupActionsBar";
import { GroupSheetsProvider } from "../group-detail/GroupSheetsProvider";
import { BottomNav } from "../bottom-nav";
import {
  mockCountries,
  mockGroupCategories,
  mockGroupTags,
  mockGroupMembers,
} from "./mockData";

interface MyGroupsPageProps {
  onBack: () => void;
  groups?: MyGroup[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  onGroupClick?: (groupId: string, userRole?: "admin" | "moderator" | "member") => void;
  isAuthenticated?: boolean; // NEW: To differentiate "Explore Groups" vs "My Groups"
  onAuthRequired?: (context: 'groups' | 'publish') => void; // NEW: Callback to trigger auth modal
}

// Mock data
const mockGroups: MyGroup[] = [
  {
    id: "1",
    name: "Vecinos Valparaíso",
    description: "Grupo para vecinos de Valparaíso",
    memberCount: 234,
    productCount: 45,
    serviceCount: 23,
    location: "Valparaíso",
    role: "admin",
    status: "joined",
    groupType: "general", // NEW ENUM
    visibility: "public", // NEW FIELD
    joinPolicy: "open", // NEW FIELD
    groupStatus: "active", // NEW FIELD
    isActive: true,
    createdAt: new Date("2024-01-15"),
    lastActivityAt: new Date("2024-11-11"),
  },
  {
    id: "2",
    name: "Tech Lovers Chile",
    description: "Comunidad de tecnología y programación",
    memberCount: 1205,
    productCount: 189,
    serviceCount: 67,
    location: "Viña del Mar",
    role: "member",
    status: "joined",
    groupType: "community", // NEW ENUM
    visibility: "public",
    joinPolicy: "open",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-02-20"),
    lastActivityAt: new Date("2024-11-12"),
  },
  {
    id: "3",
    name: "Deportes Viña del Mar",
    description: "Para los amantes del deporte",
    memberCount: 567,
    productCount: 78,
    serviceCount: 34,
    location: "Viña del Mar",
    role: "moderator",
    status: "joined",
    groupType: "event", // NEW ENUM
    visibility: "discoverable",
    joinPolicy: "request",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-03-10"),
    lastActivityAt: new Date("2024-11-10"),
  },
  {
    id: "4",
    name: "Compra/Venta Reñaca",
    description: "Marketplace local de Reñaca",
    memberCount: 892,
    productCount: 234,
    serviceCount: 89,
    location: "Reñaca",
    role: "member",
    status: "joined",
    groupType: "marketplace", // NEW ENUM
    visibility: "public",
    joinPolicy: "open",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-04-05"),
    lastActivityAt: new Date("2024-11-09"),
  },
  {
    id: "5",
    name: "Familia & Amigos",
    description: "Grupo privado familiar",
    memberCount: 45,
    productCount: 12,
    serviceCount: 5,
    location: "Valparaíso",
    role: "admin",
    status: "joined",
    groupType: "general",
    visibility: "hidden",
    joinPolicy: "closed",
    groupStatus: "active",
    isActive: false,
    createdAt: new Date("2024-05-12"),
    lastActivityAt: new Date("2024-10-01"),
  },
  {
    id: "6",
    name: "Emprendedores Locales",
    description: "Red de emprendedores de la zona",
    memberCount: 345,
    productCount: 156,
    serviceCount: 234,
    location: "Valparaíso",
    role: "member",
    status: "pending",
    groupType: "community",
    visibility: "discoverable",
    joinPolicy: "approval_required",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-06-18"),
    lastActivityAt: new Date("2024-11-11"),
  },
  {
    id: "7",
    name: "Runners Viña del Mar",
    description: "Grupo de corredores",
    memberCount: 178,
    productCount: 23,
    serviceCount: 12,
    location: "Viña del Mar",
    role: "member",
    status: "invited",
    groupType: "event",
    visibility: "invite_only",
    joinPolicy: "request",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-07-22"),
    lastActivityAt: new Date("2024-11-08"),
  },
  {
    id: "8",
    name: "Artesanos de Valparaíso",
    description: "Comunidad de artesanos locales",
    memberCount: 456,
    productCount: 345,
    serviceCount: 123,
    location: "Valparaíso",
    role: "member",
    status: "joined",
    groupType: "marketplace",
    visibility: "public",
    joinPolicy: "open",
    groupStatus: "active",
    isActive: true,
    createdAt: new Date("2024-08-14"),
    lastActivityAt: new Date("2024-11-12"),
  },
];

export function MyGroupsPage({ onBack, groups = mockGroups, activeTab, onTabChange, onGroupClick, isAuthenticated = true, onAuthRequired }: MyGroupsPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [isExploreSheetOpen, setIsExploreSheetOpen] = useState(false);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  
  // LOTE 2 GROUPS: State for reactive group management
  const [myGroups, setMyGroups] = useState<MyGroup[]>(groups);
  
  // New dialogs state
  const [selectedGroup, setSelectedGroup] = useState<MyGroup | null>(null);
  const [isMuteDialogOpen, setIsMuteDialogOpen] = useState(false);
  const [isLeaveDialogOpen, setIsLeaveDialogOpen] = useState(false);
  
  // Pin/Mute state (in real app, this would be persisted)
  const [pinnedGroupIds, setPinnedGroupIds] = useState<Set<string>>(new Set());
  const [mutedGroupIds, setMutedGroupIds] = useState<Set<string>>(new Set());

  // NEW FILTER STATE - Using GroupFilterState
  const [filters, setFilters] = useState<GroupFilterState>({
    status: new Set<GroupStatus>(),
    groupType: new Set<GroupType>(),
    visibility: new Set<GroupVisibility>(),
    joinPolicy: new Set<JoinPolicy>(),
    selectedCountry: null,
    selectedMunicipalities: new Set(),
    includeNearby: false,
    selectedCategory: null,
    selectedSubcategories: new Set(),
    selectedTags: new Set(),
    selectedMembers: new Set(),
    memberRole: new Set<MemberRole>(),
    memberStatus: new Set<MemberStatus>(),
    hasProducts: false,
    hasServices: false,
    hasEvents: false,
    hasExperiences: false,
  });

  // Calculate active filter count
  const activeFilterCount =
    filters.status.size +
    filters.groupType.size +
    filters.visibility.size +
    filters.joinPolicy.size +
    (filters.selectedCountry ? 1 : 0) +
    filters.selectedMunicipalities.size +
    (filters.selectedCategory ? 1 : 0) +
    filters.selectedSubcategories.size +
    filters.selectedTags.size +
    filters.selectedMembers.size +
    filters.memberRole.size +
    filters.memberStatus.size +
    (filters.hasProducts ? 1 : 0) +
    (filters.hasServices ? 1 : 0) +
    (filters.hasEvents ? 1 : 0) +
    (filters.hasExperiences ? 1 : 0);

  // Filter groups with useMemo for performance
  const filteredGroups = useMemo(() => {
    return myGroups.filter((group) => {
      // Search
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (group.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

      // Group Status filter
      const matchesGroupStatus = filters.status.size === 0 || filters.status.has(group.groupStatus || "active");
      
      // Group Type filter (general/event/community/marketplace)
      const matchesGroupType = filters.groupType.size === 0 || filters.groupType.has(group.groupType || "general");
      
      // Visibility filter
      const matchesVisibility = filters.visibility.size === 0 || filters.visibility.has(group.visibility || "public");
      
      // Join Policy filter
      const matchesJoinPolicy = filters.joinPolicy.size === 0 || filters.joinPolicy.has(group.joinPolicy || "open");

      // Member Role filter (my role in the group)
      const matchesMemberRole = filters.memberRole.size === 0 || filters.memberRole.has(group.role);
      
      // Member Status filter (my status in the group)
      const matchesMemberStatus = filters.memberStatus.size === 0 || filters.memberStatus.has(group.status);

      // Content filters
      const matchesHasProducts = !filters.hasProducts || group.productCount > 0;
      const matchesHasServices = !filters.hasServices || group.serviceCount > 0;
      const matchesHasEvents = !filters.hasEvents; // TODO: Add eventsCount to MyGroup
      const matchesHasExperiences = !filters.hasExperiences; // TODO: Add experiencesCount to MyGroup

      return (
        matchesSearch &&
        matchesGroupStatus &&
        matchesGroupType &&
        matchesVisibility &&
        matchesJoinPolicy &&
        matchesMemberRole &&
        matchesMemberStatus &&
        matchesHasProducts &&
        matchesHasServices &&
        matchesHasEvents &&
        matchesHasExperiences
      );
    });
  }, [myGroups, searchQuery, filters]);

  // NEW FILTER HANDLERS
  const handleStatusChange = (status: GroupStatus) => {
    setFilters(prev => {
      const newStatus = new Set(prev.status);
      if (newStatus.has(status)) {
        newStatus.delete(status);
      } else {
        newStatus.add(status);
      }
      return { ...prev, status: newStatus };
    });
  };

  const handleGroupTypeChange = (type: GroupType) => {
    setFilters(prev => {
      const newType = new Set(prev.groupType);
      if (newType.has(type)) {
        newType.delete(type);
      } else {
        newType.add(type);
      }
      return { ...prev, groupType: newType };
    });
  };

  const handleVisibilityChange = (visibility: GroupVisibility) => {
    setFilters(prev => {
      const newVisibility = new Set(prev.visibility);
      if (newVisibility.has(visibility)) {
        newVisibility.delete(visibility);
      } else {
        newVisibility.add(visibility);
      }
      return { ...prev, visibility: newVisibility };
    });
  };

  const handleJoinPolicyChange = (policy: JoinPolicy) => {
    setFilters(prev => {
      const newPolicy = new Set(prev.joinPolicy);
      if (newPolicy.has(policy)) {
        newPolicy.delete(policy);
      } else {
        newPolicy.add(policy);
      }
      return { ...prev, joinPolicy: newPolicy };
    });
  };

  const handleCountryChange = (countryId: string | null) => {
    setFilters(prev => ({
      ...prev,
      selectedCountry: countryId,
      selectedMunicipalities: new Set(), // Reset municipalities when country changes
    }));
  };

  const handleMunicipalityToggle = (municipalityId: string) => {
    setFilters(prev => {
      const newMunicipalities = new Set(prev.selectedMunicipalities);
      if (newMunicipalities.has(municipalityId)) {
        newMunicipalities.delete(municipalityId);
      } else {
        newMunicipalities.add(municipalityId);
      }
      return { ...prev, selectedMunicipalities: newMunicipalities };
    });
  };

  const handleIncludeNearbyChange = (value: boolean) => {
    setFilters(prev => ({ ...prev, includeNearby: value }));
  };

  const handleCategoryChange = (categoryId: string | null) => {
    setFilters(prev => ({
      ...prev,
      selectedCategory: categoryId,
      selectedSubcategories: new Set(), // Reset subcategories when category changes
    }));
  };

  const handleSubcategoryToggle = (subcategoryId: string) => {
    setFilters(prev => {
      const newSubcategories = new Set(prev.selectedSubcategories);
      if (newSubcategories.has(subcategoryId)) {
        newSubcategories.delete(subcategoryId);
      } else {
        newSubcategories.add(subcategoryId);
      }
      return { ...prev, selectedSubcategories: newSubcategories };
    });
  };

  const handleTagToggle = (tagId: string) => {
    setFilters(prev => {
      const newTags = new Set(prev.selectedTags);
      if (newTags.has(tagId)) {
        newTags.delete(tagId);
      } else {
        newTags.add(tagId);
      }
      return { ...prev, selectedTags: newTags };
    });
  };

  const handleMemberToggle = (memberId: string) => {
    setFilters(prev => {
      const newMembers = new Set(prev.selectedMembers);
      if (newMembers.has(memberId)) {
        newMembers.delete(memberId);
      } else {
        newMembers.add(memberId);
      }
      return { ...prev, selectedMembers: newMembers };
    });
  };

  const handleMemberRoleChange = (role: MemberRole) => {
    setFilters(prev => {
      const newRole = new Set(prev.memberRole);
      if (newRole.has(role)) {
        newRole.delete(role);
      } else {
        newRole.add(role);
      }
      return { ...prev, memberRole: newRole };
    });
  };

  const handleMemberStatusChange = (status: MemberStatus) => {
    setFilters(prev => {
      const newStatus = new Set(prev.memberStatus);
      if (newStatus.has(status)) {
        newStatus.delete(status);
      } else {
        newStatus.add(status);
      }
      return { ...prev, memberStatus: newStatus };
    });
  };

  const clearAllFilters = () => {
    setFilters({
      status: new Set(),
      groupType: new Set(),
      visibility: new Set(),
      joinPolicy: new Set(),
      selectedCountry: null,
      selectedMunicipalities: new Set(),
      includeNearby: false,
      selectedCategory: null,
      selectedSubcategories: new Set(),
      selectedTags: new Set(),
      selectedMembers: new Set(),
      memberRole: new Set(),
      memberStatus: new Set(),
      hasProducts: false,
      hasServices: false,
      hasEvents: false,
      hasExperiences: false,
    });
  };

  // Other action handlers
  const handleMute = (group: MyGroup) => {
    if (mutedGroupIds.has(group.id)) {
      setMutedGroupIds(prev => {
        const next = new Set(prev);
        next.delete(group.id);
        return next;
      });
      toast.success(`Unmuted "${group.name}"`);
    } else {
      setSelectedGroup(group);
      setIsMuteDialogOpen(true);
    }
  };

  const handleMuteConfirm = (duration: MuteDuration) => {
    if (!selectedGroup) return;
    setMutedGroupIds(prev => new Set(prev).add(selectedGroup.id));
    const durationLabels: Record<MuteDuration, string> = {
      '1h': '1 hour',
      '8h': '8 hours',
      '1d': '1 day',
      '1w': '1 week',
      'forever': 'until you unmute',
    };
    toast.success(`Muted "${selectedGroup.name}" for ${durationLabels[duration]}`);
  };

  const handlePin = (group: MyGroup) => {
    if (pinnedGroupIds.has(group.id)) {
      setPinnedGroupIds(prev => {
        const next = new Set(prev);
        next.delete(group.id);
        return next;
      });
      toast.success(`Unpinned "${group.name}"`);
    } else {
      if (pinnedGroupIds.size >= 3) {
        toast.error("You can only pin 3 groups. Unpin another first.");
        return;
      }
      setPinnedGroupIds(prev => new Set(prev).add(group.id));
      toast.success(`Pinned "${group.name}" to top`);
    }
  };

  const handleLeaveClick = (group: MyGroup) => {
    setSelectedGroup(group);
    setIsLeaveDialogOpen(true);
  };

  const handleLeaveConfirm = () => {
    if (!selectedGroup) return;
    // FIX 26: Leave group - AlertDialog + Toast + reactive removal (LOTE 3 standard)
    setMyGroups(prev => prev.filter(g => g.id !== selectedGroup.id));
    toast.success(`Left group: ${selectedGroup.name}`);
    setIsLeaveDialogOpen(false);
  };

  const isOnlyAdmin = (group: MyGroup) => {
    return group.role === 'admin';
  };

  // Enrich groups with pin/mute state
  const enrichedGroups = useMemo(() => {
    return filteredGroups.map(group => ({
      ...group,
      isPinned: pinnedGroupIds.has(group.id),
      isMuted: mutedGroupIds.has(group.id),
    }));
  }, [filteredGroups, pinnedGroupIds, mutedGroupIds]);

  const pinnedGroups = enrichedGroups.filter(g => g.isPinned);
  const unpinnedGroups = enrichedGroups.filter(g => !g.isPinned);

  const handleGroupClick = (group: MyGroup) => {
    if (onGroupClick) {
      onGroupClick(group.id, group.role);
    }
  };

  const handleCancelRequest = (group: MyGroup) => {
    toast.success(`Request cancelled: ${group.name}`);
  };

  const handleAcceptInvite = (group: MyGroup) => {
    // FIX 24: Accept invitation - Toast + reactive update (change status + append to myGroups)
    setMyGroups(prev => prev.map(g => 
      g.id === group.id ? { ...g, status: 'joined' as const } : g
    ));
    toast.success(`Joined group: ${group.name}`);
  };

  const handleDeclineInvite = (group: MyGroup) => {
    // FIX 25: Decline invitation - Toast + reactive removal (LOTE 3 standard)
    setMyGroups(prev => prev.filter(g => g.id !== group.id));
    toast.success(`Invitation declined: ${group.name}`);
  };

  const handleInvitationsClick = () => {
    toast.info("Opening invitations...");
  };

  const handleManageGroup = (group: MyGroup) => {
    toast.info(`Manage group: ${group.name}`);
  };

  return (
    <div className="flex flex-col h-full bg-background max-w-[480px] lg:max-w-[1280px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <GroupsHeader onBack={onBack} isAuthenticated={isAuthenticated} />

      {/* Group Actions Bar */}
      <GroupActionsBar
        onCreateGroup={() => setIsCreateSheetOpen(true)}
        onExploreGroups={() => setIsExploreSheetOpen(true)}
        onInvitations={handleInvitationsClick}
        invitationsCount={3}
        isAuthenticated={isAuthenticated}
        onAuthRequired={onAuthRequired}
      />

      {/* Search + Filters Bar */}
      <SearchAndFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeFilterCount={activeFilterCount}
        onOpenFilterSheet={() => setIsFilterSheetOpen(true)}
      />

      {/* Groups List */}
      <div className="flex-1 overflow-auto">
        {enrichedGroups.length === 0 ? (
          <EmptyState searchQuery={searchQuery} />
        ) : (
          <div>
            {/* Pinned Section */}
            {pinnedGroups.length > 0 && (
              <div className="border-b">
                <div className="px-4 py-2 bg-muted/30">
                  <h2 className="text-xs uppercase tracking-wide text-muted-foreground">
                    📌 Pinned ({pinnedGroups.length})
                  </h2>
                </div>
                <div className="divide-y divide-border">
                  {pinnedGroups.map((group, index) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      index={index}
                      onClick={() => handleGroupClick(group)}
                      onMute={() => handleMute(group)}
                      onPin={() => handlePin(group)}
                      onLeave={() => handleLeaveClick(group)}
                      onCancelRequest={() => handleCancelRequest(group)}
                      onAcceptInvite={() => handleAcceptInvite(group)}
                      onDeclineInvite={() => handleDeclineInvite(group)}
                      isAuthenticated={isAuthenticated}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Groups Section */}
            <div>
              {unpinnedGroups.length > 0 && pinnedGroups.length > 0 && (
                <div className="px-4 py-2 bg-muted/30">
                  <h2 className="text-xs uppercase tracking-wide text-muted-foreground">
                    All Groups ({unpinnedGroups.length})
                  </h2>
                </div>
              )}
              <div className="divide-y divide-border">
                {unpinnedGroups.map((group, index) => (
                  <GroupCard
                    key={group.id}
                    group={group}
                    index={pinnedGroups.length + index}
                    onClick={() => handleGroupClick(group)}
                    onMute={() => handleMute(group)}
                    onPin={() => handlePin(group)}
                    onLeave={() => handleLeaveClick(group)}
                    onCancelRequest={() => handleCancelRequest(group)}
                    onAcceptInvite={() => handleAcceptInvite(group)}
                    onDeclineInvite={() => handleDeclineInvite(group)}
                    isAuthenticated={isAuthenticated}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* NEW BOTTOM SHEET FILTER */}
      <GroupFiltersSheet
        open={isFilterSheetOpen}
        onOpenChange={setIsFilterSheetOpen}
        filters={filters}
        activeFilterCount={activeFilterCount}
        countries={mockCountries}
        categories={mockGroupCategories}
        tags={mockGroupTags}
        members={mockGroupMembers}
        onStatusChange={handleStatusChange}
        onGroupTypeChange={handleGroupTypeChange}
        onVisibilityChange={handleVisibilityChange}
        onJoinPolicyChange={handleJoinPolicyChange}
        onCountryChange={handleCountryChange}
        onMunicipalityToggle={handleMunicipalityToggle}
        onIncludeNearbyChange={handleIncludeNearbyChange}
        onCategoryChange={handleCategoryChange}
        onSubcategoryToggle={handleSubcategoryToggle}
        onTagToggle={handleTagToggle}
        onMemberToggle={handleMemberToggle}
        onMemberRoleChange={handleMemberRoleChange}
        onMemberStatusChange={handleMemberStatusChange}
        onHasProductsChange={(value) => setFilters(prev => ({ ...prev, hasProducts: value }))}
        onHasServicesChange={(value) => setFilters(prev => ({ ...prev, hasServices: value }))}
        onHasEventsChange={(value) => setFilters(prev => ({ ...prev, hasEvents: value }))}
        onHasExperiencesChange={(value) => setFilters(prev => ({ ...prev, hasExperiences: value }))}
        onClearAll={clearAllFilters}
      />

      {/* Explore Groups Sheet */}
      <ExploreGroupsSheet
        open={isExploreSheetOpen}
        onOpenChange={setIsExploreSheetOpen}
        myGroups={groups.map(g => ({ id: g.id, role: g.role, status: g.status }))}
        isAuthenticated={isAuthenticated}
        onGroupClick={(groupId, userRole) => {
          if (onGroupClick) {
            onGroupClick(groupId, userRole);
          }
        }}
      />

      {/* Create Group Sheet */}
      <CreateGroupSheet 
        open={isCreateSheetOpen} 
        onOpenChange={setIsCreateSheetOpen}
        onComplete={() => {
          // FIX 21: Create Group - Toast + append new group to myGroups (LOTE 3 standard)
          // Note: In real app, the CreateGroupSheet would return the new group data
          // For now, we just close and show toast
          setIsCreateSheetOpen(false);
          toast.success("Group created successfully!");
          // TODO: Append new group to myGroups when API returns group data
        }}
      />
      
      {/* Mute Notifications Dialog */}
      {selectedGroup && (
        <MuteNotificationsDialog
          open={isMuteDialogOpen}
          onOpenChange={setIsMuteDialogOpen}
          groupName={selectedGroup.name}
          userRole={selectedGroup.role}
          onConfirm={handleMuteConfirm}
        />
      )}

      {/* Leave Group Dialog */}
      {selectedGroup && (
        <LeaveGroupDialog
          open={isLeaveDialogOpen}
          onOpenChange={setIsLeaveDialogOpen}
          groupName={selectedGroup.name}
          isOnlyAdmin={isOnlyAdmin(selectedGroup)}
          onConfirm={handleLeaveConfirm}
          onManageGroup={() => {
            setIsLeaveDialogOpen(false);
            handleManageGroup(selectedGroup);
          }}
        />
      )}

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      
      {/* Global Sheets Provider */}
      <GroupSheetsProvider />
    </div>
  );
}

export default MyGroupsPage;