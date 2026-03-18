/**
 * GroupFiltersSheet - REFACTORED to match Listings FilterSheet exactly
 * 
 * Bottom sheet with 11 filter sections matching the new DB model:
 * 1. Status (active, suspended, archived, deleted)
 * 2. Group Type (general, event, community, marketplace)
 * 3. Visibility (public, discoverable, invite_only, hidden)
 * 4. Join Policy (open, request, approval_required, closed)
 * 5. Location (Country → Municipality + nearby toggle)
 * 6. Category (hierarchical with subcategories)
 * 7. Tags (multi-select)
 * 8. Members (multi-select from my groups)
 * 9. Member Role (admin, moderator, member)
 * 10. Member Status (invited, pending, joined, removed)
 * 11. Content (has products, services, events, experiences)
 */

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "../ui/sheet";
import {
  StatusSection,
  GroupTypeSection,
  VisibilitySection,
  JoinPolicySection,
  LocationSection,
  CategorySection,
  TagsSection,
  MembersSection,
  MemberRoleSection,
  MemberStatusSection,
  ContentSection,
} from "./filters";
import type {
  GroupFilterState,
  GroupStatus,
  GroupType,
  GroupVisibility,
  JoinPolicy,
  MemberRole,
  MemberStatus,
  Country,
  GroupCategory,
  GroupTag,
  GroupMember,
} from "./newTypes";

interface GroupFiltersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: GroupFilterState;
  activeFilterCount: number;
  
  // Data sources
  countries: Country[];
  categories: GroupCategory[];
  tags: GroupTag[];
  members: GroupMember[];
  
  // Handlers
  onStatusChange: (status: GroupStatus) => void;
  onGroupTypeChange: (type: GroupType) => void;
  onVisibilityChange: (visibility: GroupVisibility) => void;
  onJoinPolicyChange: (policy: JoinPolicy) => void;
  onCountryChange: (countryId: string | null) => void;
  onMunicipalityToggle: (municipalityId: string) => void;
  onIncludeNearbyChange: (value: boolean) => void;
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryToggle: (subcategoryId: string) => void;
  onTagToggle: (tagId: string) => void;
  onMemberToggle: (memberId: string) => void;
  onMemberRoleChange: (role: MemberRole) => void;
  onMemberStatusChange: (status: MemberStatus) => void;
  onHasProductsChange: (value: boolean) => void;
  onHasServicesChange: (value: boolean) => void;
  onHasEventsChange: (value: boolean) => void;
  onHasExperiencesChange: (value: boolean) => void;
  onClearAll: () => void;
}

interface OpenSections {
  status: boolean;
  groupType: boolean;
  visibility: boolean;
  joinPolicy: boolean;
  location: boolean;
  category: boolean;
  tags: boolean;
  members: boolean;
  memberRole: boolean;
  memberStatus: boolean;
  content: boolean;
}

export function GroupFiltersSheet({
  open,
  onOpenChange,
  filters,
  activeFilterCount,
  countries,
  categories,
  tags,
  members,
  onStatusChange,
  onGroupTypeChange,
  onVisibilityChange,
  onJoinPolicyChange,
  onCountryChange,
  onMunicipalityToggle,
  onIncludeNearbyChange,
  onCategoryChange,
  onSubcategoryToggle,
  onTagToggle,
  onMemberToggle,
  onMemberRoleChange,
  onMemberStatusChange,
  onHasProductsChange,
  onHasServicesChange,
  onHasEventsChange,
  onHasExperiencesChange,
  onClearAll,
}: GroupFiltersSheetProps) {
  const [openSections, setOpenSections] = useState<OpenSections>({
    status: false,
    groupType: false,
    visibility: false,
    joinPolicy: false,
    location: false,
    category: false,
    tags: false,
    members: false,
    memberRole: false,
    memberStatus: false,
    content: false,
  });

  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleApply = () => {
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-3xl border-t border-gray-200/50 shadow-2xl">
        
        {/* Accessibility elements - hidden but required */}
        <SheetTitle className="sr-only">Filter Groups</SheetTitle>
        <SheetDescription className="sr-only">
          Filter and refine groups by status, type, visibility, join policy, location, category, tags, members, and content
        </SheetDescription>

        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* Header - Same style as Listings FilterSheet */}
          <div className="flex-shrink-0 relative">
            {/* Handle bar */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {/* Title and close button */}
            <div className="px-4 sm:px-6 pb-3 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Group Filters</h2>
                <div className="flex items-center gap-2">
                  {activeFilterCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onClearAll}
                      className="h-8 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear all
                    </Button>
                  )}
                  <button
                    onClick={() => onOpenChange(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close filters"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scrollable Content - Same pattern as Listings FilterSheet */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            <div className="space-y-3 py-4">
              {/* 1. Status */}
              <StatusSection
                isOpen={openSections.status}
                onToggle={() => toggleSection("status")}
                selectedStatuses={filters.status}
                onStatusChange={onStatusChange}
              />

              {/* 2. Group Type */}
              <GroupTypeSection
                isOpen={openSections.groupType}
                onToggle={() => toggleSection("groupType")}
                selectedTypes={filters.groupType}
                onTypeChange={onGroupTypeChange}
              />

              {/* 3. Visibility */}
              <VisibilitySection
                isOpen={openSections.visibility}
                onToggle={() => toggleSection("visibility")}
                selectedVisibilities={filters.visibility}
                onVisibilityChange={onVisibilityChange}
              />

              {/* 4. Join Policy */}
              <JoinPolicySection
                isOpen={openSections.joinPolicy}
                onToggle={() => toggleSection("joinPolicy")}
                selectedPolicies={filters.joinPolicy}
                onPolicyChange={onJoinPolicyChange}
              />

              {/* 5. Location */}
              <LocationSection
                isOpen={openSections.location}
                onToggle={() => toggleSection("location")}
                selectedCountry={filters.selectedCountry}
                selectedMunicipalities={filters.selectedMunicipalities}
                includeNearby={filters.includeNearby}
                countries={countries}
                onCountryChange={onCountryChange}
                onMunicipalityToggle={onMunicipalityToggle}
                onIncludeNearbyChange={onIncludeNearbyChange}
              />

              {/* 6. Category */}
              <CategorySection
                isOpen={openSections.category}
                onToggle={() => toggleSection("category")}
                selectedCategory={filters.selectedCategory}
                selectedSubcategories={filters.selectedSubcategories}
                categories={categories}
                onCategoryChange={onCategoryChange}
                onSubcategoryToggle={onSubcategoryToggle}
              />

              {/* 7. Tags */}
              <TagsSection
                isOpen={openSections.tags}
                onToggle={() => toggleSection("tags")}
                selectedTags={filters.selectedTags}
                tags={tags}
                onTagToggle={onTagToggle}
              />

              {/* 8. Members */}
              <MembersSection
                isOpen={openSections.members}
                onToggle={() => toggleSection("members")}
                selectedMembers={filters.selectedMembers}
                members={members}
                onMemberToggle={onMemberToggle}
              />

              {/* 9. Member Role */}
              <MemberRoleSection
                isOpen={openSections.memberRole}
                onToggle={() => toggleSection("memberRole")}
                selectedRoles={filters.memberRole}
                onRoleChange={onMemberRoleChange}
              />

              {/* 10. Member Status */}
              <MemberStatusSection
                isOpen={openSections.memberStatus}
                onToggle={() => toggleSection("memberStatus")}
                selectedStatuses={filters.memberStatus}
                onStatusChange={onMemberStatusChange}
              />

              {/* 11. Content */}
              <ContentSection
                isOpen={openSections.content}
                onToggle={() => toggleSection("content")}
                hasProducts={filters.hasProducts}
                hasServices={filters.hasServices}
                hasEvents={filters.hasEvents}
                hasExperiences={filters.hasExperiences}
                onHasProductsChange={onHasProductsChange}
                onHasServicesChange={onHasServicesChange}
                onHasEventsChange={onHasEventsChange}
                onHasExperiencesChange={onHasExperiencesChange}
              />
            </div>
          </div>

          {/* Footer - Same style as Listings FilterSheet */}
          <div className="flex-shrink-0 border-t border-gray-200/50 bg-white p-4 sm:p-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClearAll}
                className="flex-1"
              >
                Reset All
              </Button>
              <Button
                onClick={handleApply}
                className="flex-1"
              >
                Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}