import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "../ui/sheet";
import { 
  StatusSection, 
  AlertsSection, 
  ListingTypeSection, 
  VisibilityGroupsSection, 
  ExtrasSection 
} from "./filters";
import type { FilterState } from "./types";
import type { Group, ListingLifecycle, ListingType, ListingVisibility } from "../../types";

interface MyListingsFilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  groups: Group[];
  activeFilterCount: number;
  
  // Status handlers
  onStatusChange: (status: ListingLifecycle) => void;
  
  // Alerts handlers
  onHasMessagesChange: (value: boolean) => void;
  onIsReportedChange: (value: boolean) => void;
  onIsExpiringSoonChange: (value: boolean) => void;
  
  // Type handlers
  onTypeChange: (type: ListingType) => void;
  
  // Visibility & Groups handlers
  onVisibilityChange: (visibility: ListingVisibility) => void;
  onGroupsScopeChange: (scope: "all" | "public" | "my-groups" | "specific") => void;
  onGroupToggle: (groupId: string) => void;
  
  // Extras handlers
  onHasDiscountChange: (value: boolean) => void;
  onLowViewsChange: (value: boolean) => void;
  onHighViewsChange: (value: boolean) => void;
  
  // Actions
  onClearAll: () => void;
}

interface OpenSections {
  status: boolean;
  alerts: boolean;
  type: boolean;
  visibility: boolean;
  extras: boolean;
}

export function MyListingsFilterSheet({
  open,
  onOpenChange,
  filters,
  groups,
  activeFilterCount,
  onStatusChange,
  onHasMessagesChange,
  onIsReportedChange,
  onIsExpiringSoonChange,
  onTypeChange,
  onVisibilityChange,
  onGroupsScopeChange,
  onGroupToggle,
  onHasDiscountChange,
  onLowViewsChange,
  onHighViewsChange,
  onClearAll,
}: MyListingsFilterSheetProps) {
  const [openSections, setOpenSections] = useState<OpenSections>({
    status: false,
    alerts: false,
    type: false,
    visibility: false,
    extras: false,
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
        <SheetTitle className="sr-only">Filter My Listings</SheetTitle>
        <SheetDescription className="sr-only">
          Filter and refine your listings by status, alerts, type, visibility, groups, and more
        </SheetDescription>

        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* Header - Same style as FilterSheetHeader */}
          <div className="flex-shrink-0 relative">
            {/* Handle bar */}
            <div className="w-full flex justify-center pt-3 pb-2">
              <div className="w-12 h-1 bg-gray-300 rounded-full" />
            </div>
            
            {/* Title and close button */}
            <div className="px-4 sm:px-6 pb-3 border-b border-gray-200/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">My Listings Filters</h2>
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

          {/* Scrollable Content - Same pattern as FilterSheetContent */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6">
            <div className="space-y-3 py-4">
              {/* 1. Status */}
              <StatusSection
                isOpen={openSections.status}
                onToggle={() => toggleSection("status")}
                selectedStatuses={filters.status}
                onStatusChange={onStatusChange}
              />

              {/* 2. Alerts */}
              <AlertsSection
                isOpen={openSections.alerts}
                onToggle={() => toggleSection("alerts")}
                hasMessages={filters.hasMessages}
                isReported={filters.isReported}
                isExpiringSoon={filters.isExpiringSoon}
                onHasMessagesChange={onHasMessagesChange}
                onIsReportedChange={onIsReportedChange}
                onIsExpiringSoonChange={onIsExpiringSoonChange}
              />

              {/* 3. Listing Type */}
              <ListingTypeSection
                isOpen={openSections.type}
                onToggle={() => toggleSection("type")}
                selectedTypes={filters.type}
                onTypeChange={onTypeChange}
              />

              {/* 4. Visibility & Groups */}
              <VisibilityGroupsSection
                isOpen={openSections.visibility}
                onToggle={() => toggleSection("visibility")}
                selectedVisibilities={filters.visibility}
                onVisibilityChange={onVisibilityChange}
                groupsScope={filters.groupsScope}
                selectedGroups={filters.selectedGroups}
                groups={groups}
                onGroupsScopeChange={onGroupsScopeChange}
                onGroupToggle={onGroupToggle}
              />

              {/* 5. Extras */}
              <ExtrasSection
                isOpen={openSections.extras}
                onToggle={() => toggleSection("extras")}
                hasDiscount={filters.discounted}
                lowViews={filters.lowEngagement}
                highViews={filters.highEngagement}
                onHasDiscountChange={onHasDiscountChange}
                onLowViewsChange={onLowViewsChange}
                onHighViewsChange={onHighViewsChange}
              />
            </div>
          </div>

          {/* Footer - Same style as FilterFooter */}
          <div className="flex-shrink-0 border-t border-gray-200/50 bg-white p-4 sm:p-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClearAll}
                className="flex-1"
              >
                Reset
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