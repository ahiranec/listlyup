import { useState } from "react";
import { motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "../ui/sheet";
import type { FilterState } from "./types";
import type { Group, EventType } from "../../types";

interface FilterSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearAll: () => void;
  groups: Group[];
  eventTypes: EventType[];
  activeFilterCount: number;
}

export function FilterSheet({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearAll,
  groups,
  eventTypes,
  activeFilterCount,
}: FilterSheetProps) {
  const [isGroupsSectionExpanded, setIsGroupsSectionExpanded] = useState(false);
  const [isEventsSectionExpanded, setIsEventsSectionExpanded] = useState(false);

  // Toggle filter helpers
  const toggleFilter = <K extends "type" | "visibility" | "status">(
    category: K,
    value: any
  ) => {
    const newFilters = { ...filters };
    const categorySet = new Set(filters[category]);
    if (categorySet.has(value)) {
      categorySet.delete(value);
    } else {
      categorySet.add(value);
    }
    newFilters[category] = categorySet as any;
    onFiltersChange(newFilters);
  };

  const toggleGroupFilter = (groupId: string) => {
    const newFilters = { ...filters };
    const groupSet = new Set(filters.selectedGroups);
    if (groupSet.has(groupId)) {
      groupSet.delete(groupId);
    } else {
      groupSet.add(groupId);
    }
    newFilters.selectedGroups = groupSet;
    onFiltersChange(newFilters);
  };

  const toggleEventTypeFilter = (eventTypeId: string) => {
    const newFilters = { ...filters };
    const eventTypeSet = new Set(filters.selectedEventTypes);
    if (eventTypeSet.has(eventTypeId)) {
      eventTypeSet.delete(eventTypeId);
    } else {
      eventTypeSet.add(eventTypeId);
    }
    newFilters.selectedEventTypes = eventTypeSet;
    onFiltersChange(newFilters);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 pt-[45px] pb-4 border-b">
          <div className="flex items-center justify-between pt-3">
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription className="sr-only">
              Filter and refine your listings by lifecycle, type, visibility, and more
            </SheetDescription>
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="h-7 text-xs text-muted-foreground"
              >
                Clear all
              </Button>
            )}
          </div>
          <SheetDescription className="sr-only">
            Filter your listings by status, interactions, performance, type, and visibility
          </SheetDescription>
        </SheetHeader>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <div className="space-y-6 pt-4">
            {/* Status */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">⚡ Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.has("active")}
                    onCheckedChange={() => toggleFilter("status", "active")}
                  />
                  <span className="text-sm">🟢 Active</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.has("draft")}
                    onCheckedChange={() => toggleFilter("status", "draft")}
                  />
                  <span className="text-sm">⚪ Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.has("paused")}
                    onCheckedChange={() => toggleFilter("status", "paused")}
                  />
                  <span className="text-sm">🟡 Paused</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.has("expired")}
                    onCheckedChange={() => toggleFilter("status", "expired")}
                  />
                  <span className="text-sm">🔴 Expired</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.status.has("archived")}
                    onCheckedChange={() => toggleFilter("status", "archived")}
                  />
                  <span className="text-sm">⚫ Archived</span>
                </label>
              </div>
            </div>

            {/* Alerts */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">🔔 Alerts</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.hasMessages}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, hasMessages: !!checked })}
                  />
                  <span className="text-sm">💬 Has Messages</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.isReported}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, isReported: !!checked })}
                  />
                  <span className="text-sm">🚨 Reported</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.isExpiringSoon}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, isExpiringSoon: !!checked })}
                  />
                  <span className="text-sm">⏰ Expiring Soon</span>
                </label>
              </div>
            </div>

            {/* Type */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">🎨 Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.type.has("product")}
                    onCheckedChange={() => toggleFilter("type", "product")}
                  />
                  <span className="text-sm">📦 Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.type.has("service")}
                    onCheckedChange={() => toggleFilter("type", "service")}
                  />
                  <span className="text-sm">🛠️ Service</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 w-full hover:bg-muted/50 p-1 rounded -ml-1">
                    <Checkbox
                      checked={filters.type.has("event")}
                      onCheckedChange={() => toggleFilter("type", "event")}
                    />
                    <button
                      onClick={() => setIsEventsSectionExpanded(!isEventsSectionExpanded)}
                      className="flex items-center gap-2 flex-1 cursor-pointer text-left"
                    >
                      <span className="text-sm flex-1">🎭 Event</span>
                      {isEventsSectionExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>

                  {/* Event Types Expansion */}
                  {isEventsSectionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 pl-7 pt-2"
                    >
                      {eventTypes.map(eventType => (
                        <label key={eventType.id} className="flex items-center justify-between gap-2 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={filters.selectedEventTypes.has(eventType.id)}
                              onCheckedChange={() => toggleEventTypeFilter(eventType.id)}
                            />
                            <span className="text-sm">{eventType.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{eventType.emoji}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.type.has("experience")}
                    onCheckedChange={() => toggleFilter("type", "experience")}
                  />
                  <span className="text-sm">✨ Experience</span>
                </label>
              </div>
            </div>

            {/* Visibility */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">🌐 Visibility</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.visibility.has("public")}
                    onCheckedChange={() => toggleFilter("visibility", "public")}
                  />
                  <span className="text-sm">🌍 Public</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.visibility.has("private")}
                    onCheckedChange={() => toggleFilter("visibility", "private")}
                  />
                  <span className="text-sm">🔒 Private</span>
                </label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 w-full hover:bg-muted/50 p-1 rounded -ml-1">
                    <Checkbox
                      checked={filters.visibility.has("groups")}
                      onCheckedChange={() => toggleFilter("visibility", "groups")}
                    />
                    <button
                      onClick={() => setIsGroupsSectionExpanded(!isGroupsSectionExpanded)}
                      className="flex items-center gap-2 flex-1 cursor-pointer text-left"
                    >
                      <span className="text-sm flex-1">👥 Groups</span>
                      {isGroupsSectionExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground" />
                      )}
                      {filters.selectedGroups.size > 0 && (
                        <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 text-[10px]">
                          {filters.selectedGroups.size}
                        </Badge>
                      )}
                    </button>
                  </div>
                  
                  {isGroupsSectionExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-2 pl-7 pt-2"
                    >
                      {groups.map(group => (
                        <label key={group.id} className="flex items-center justify-between gap-2 cursor-pointer">
                          <div className="flex items-center gap-2">
                            <Checkbox
                              checked={filters.selectedGroups.has(group.id)}
                              onCheckedChange={() => toggleGroupFilter(group.id)}
                            />
                            <span className="text-sm">{group.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{group.memberCount}</span>
                        </label>
                      ))}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Extras */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium">💰 Extras</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.discounted}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, discounted: !!checked })}
                  />
                  <span className="text-sm">💰 Has Discount</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={filters.lowEngagement}
                    onCheckedChange={(checked) => onFiltersChange({ ...filters, lowEngagement: !!checked })}
                  />
                  <span className="text-sm">👁️ Low Views</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="sticky bottom-0 pt-4 pb-6 px-6 border-t bg-background">
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full"
          >
            Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}