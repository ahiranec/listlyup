/**
NotificationsFilterSheet
Bottom sheet for filtering notifications by Priority, Type, Status, and Time Range
 */

import { useState, useEffect } from 'react';
import { X, Filter } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';

export interface NotificationFilters {
  priority: 'all' | 'urgent' | 'pending' | 'info';
  type:
    | 'all'
    | 'trade-offer'
    | 'question'
    | 'message'
    | 'listing'
    | 'group-invite'
    | 'report';
  status: 'all' | 'unread' | 'read';
  timeRange: 'all' | 'today' | 'week' | 'month';
}

interface NotificationsFilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: NotificationFilters;
  onApplyFilters: (filters: NotificationFilters) => void;
  counts?: {
    total: number;
    urgent: number;
    pending: number;
    info: number;
    unread: number;
  };
}

export function NotificationsFilterSheet({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  counts,
}: NotificationsFilterSheetProps) {
  const [localFilters, setLocalFilters] = useState<NotificationFilters>(filters);

  // Keep local state in sync when opening
  useEffect(() => {
    if (isOpen) setLocalFilters(filters);
  }, [isOpen, filters]);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters: NotificationFilters = {
      priority: 'all',
      type: 'all',
      status: 'all',
      timeRange: 'all',
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  const activeFilterCount = Object.values(localFilters).filter((v) => v !== 'all')
    .length;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-2xl max-w-[480px] mx-auto animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            <h2 className="font-semibold">Filter Notifications</h2>
            {activeFilterCount > 0 && (
              <Badge variant="secondary" className="text-xs">
                {activeFilterCount} active
              </Badge>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="max-h-[70vh] overflow-auto p-4 space-y-6">
          {/* Priority Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Priority</Label>
            <RadioGroup
              value={localFilters.priority}
              onValueChange={(value) =>
                setLocalFilters({
                  ...localFilters,
                  priority: value as NotificationFilters['priority'],
                })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="priority-all" />
                    <Label htmlFor="priority-all" className="text-sm cursor-pointer">
                      All Priorities
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.total}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="urgent" id="priority-urgent" />
                    <Label
                      htmlFor="priority-urgent"
                      className="text-sm cursor-pointer flex items-center gap-1"
                    >
                      🔴 Urgent
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.urgent}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="pending" id="priority-pending" />
                    <Label
                      htmlFor="priority-pending"
                      className="text-sm cursor-pointer flex items-center gap-1"
                    >
                      🟡 Pending
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.pending}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="info" id="priority-info" />
                    <Label
                      htmlFor="priority-info"
                      className="text-sm cursor-pointer flex items-center gap-1"
                    >
                      ⚪ Info
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.info}
                    </span>
                  )}
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Type Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Type</Label>
            <RadioGroup
              value={localFilters.type}
              onValueChange={(value) =>
                setLocalFilters({
                  ...localFilters,
                  type: value as NotificationFilters['type'],
                })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="all" id="type-all" />
                  <Label htmlFor="type-all" className="text-sm cursor-pointer">
                    All Types
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="trade-offer" id="type-trade" />
                  <Label htmlFor="type-trade" className="text-sm cursor-pointer">
                    Trade Offers
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="question" id="type-question" />
                  <Label
                    htmlFor="type-question"
                    className="text-sm cursor-pointer"
                  >
                    Questions
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="message" id="type-message" />
                  <Label
                    htmlFor="type-message"
                    className="text-sm cursor-pointer"
                  >
                    Messages
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="listing" id="type-listing" />
                  <Label
                    htmlFor="type-listing"
                    className="text-sm cursor-pointer"
                  >
                    Listing Updates
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="group-invite" id="type-group" />
                  <Label htmlFor="type-group" className="text-sm cursor-pointer">
                    Group Invites
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="report" id="type-report" />
                  <Label
                    htmlFor="type-report"
                    className="text-sm cursor-pointer"
                  >
                    Report Status
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Status Filter */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Status</Label>
            <RadioGroup
              value={localFilters.status}
              onValueChange={(value) =>
                setLocalFilters({
                  ...localFilters,
                  status: value as NotificationFilters['status'],
                })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="all" id="status-all" />
                    <Label htmlFor="status-all" className="text-sm cursor-pointer">
                      All
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.total}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="unread" id="status-unread" />
                    <Label
                      htmlFor="status-unread"
                      className="text-sm cursor-pointer"
                    >
                      Unread Only
                    </Label>
                  </div>
                  {counts && (
                    <span className="text-xs text-muted-foreground">
                      {counts.unread}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="read" id="status-read" />
                  <Label htmlFor="status-read" className="text-sm cursor-pointer">
                    Read Only
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Time Range */}
          <div>
            <Label className="text-sm font-medium mb-3 block">Time Range</Label>
            <RadioGroup
              value={localFilters.timeRange}
              onValueChange={(value) =>
                setLocalFilters({
                  ...localFilters,
                  timeRange: value as NotificationFilters['timeRange'],
                })
              }
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="all" id="time-all" />
                  <Label htmlFor="time-all" className="text-sm cursor-pointer">
                    All Time
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="today" id="time-today" />
                  <Label htmlFor="time-today" className="text-sm cursor-pointer">
                    Today
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="week" id="time-week" />
                  <Label htmlFor="time-week" className="text-sm cursor-pointer">
                    This Week
                  </Label>
                </div>

                <div className="flex items-center gap-2">
                  <RadioGroupItem value="month" id="time-month" />
                  <Label htmlFor="time-month" className="text-sm cursor-pointer">
                    This Month
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex gap-3 p-4 border-t bg-background">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
            disabled={activeFilterCount === 0}
          >
            Reset All
          </Button>

          <Button onClick={handleApply} className="flex-1">
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
}
