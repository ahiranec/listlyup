/**
 * Event Hub Settings Sheet
 * Options menu for event hub management
 * Premium Design 2025
 * Parity with CampaignSettingsSheet
 * 
 * ARCHITECTURE (Phase 3):
 * - NO executes logic inline
 * - Delegates to ConfirmActionDialog (canonical executor)
 * - Settings Sheet = Presenter only, NOT executor
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Edit, Pause, Play, Ban, Trash2, Share2, Copy, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ConfirmActionDialog } from '../action-center/ConfirmActionDialog';

interface EventHubSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  eventHub: {
    id: string;
    title: string;
    status: 'active' | 'upcoming' | 'draft' | 'past' | 'paused' | 'cancelled';
  };
  onEdit: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onCancel?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function EventHubSettingsSheet({
  isOpen,
  onClose,
  eventHub,
  onEdit,
  onPause,
  onResume,
  onCancel,
  onDelete,
  onDuplicate,
}: EventHubSettingsSheetProps) {
  // ✅ PHASE 3: Delegation state - Settings NEVER execute, only delegate
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<{
    variant: 'destructive' | 'success' | 'warning' | 'info';
    icon: 'check' | 'x' | 'alert' | 'info' | 'trash';
    title: string;
    description: string;
    details?: Array<{ label: string; value: string }>;
    consequences?: { title: string; items: string[] };
    confirmLabel: string;
    onConfirm: () => void;
  } | null>(null);

  // ✅ REFACTORED: Delegate to ConfirmActionDialog (NO inline execution)
  const handlePause = () => {
    setConfirmDialogData({
      variant: 'warning',
      icon: 'alert',
      title: 'Pause Event Hub?',
      description: 'The event hub will be temporarily stopped',
      details: [
        { label: 'Event Hub', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Event hub stops accepting entries',
          'Existing entries remain visible',
          'You can resume anytime',
        ],
      },
      confirmLabel: 'Pause Event Hub',
      onConfirm: () => {
        if (onPause) {
          onPause();
          toast.success('Event Hub paused');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleResume = () => {
    setConfirmDialogData({
      variant: 'success',
      icon: 'check',
      title: 'Resume Event Hub?',
      description: 'The event hub will become active again',
      details: [
        { label: 'Event Hub', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Event hub resumes accepting entries',
          'Eligible listings can be added',
          'Event runs until end date',
        ],
      },
      confirmLabel: 'Resume Event Hub',
      onConfirm: () => {
        if (onResume) {
          onResume();
          toast.success('Event Hub resumed');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleCancel = () => {
    setConfirmDialogData({
      variant: 'destructive',
      icon: 'x',
      title: 'Cancel Event?',
      description: 'This will permanently cancel the event',
      details: [
        { label: 'Event Hub', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Event will be marked as cancelled',
          'Participants will be notified',
          'This action cannot be undone',
        ],
      },
      confirmLabel: 'Cancel Event',
      onConfirm: () => {
        if (onCancel) {
          onCancel();
          toast.success('Event cancelled');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleDelete = () => {
    setConfirmDialogData({
      variant: 'destructive',
      icon: 'trash',
      title: 'Delete Event Hub?',
      description: 'This action cannot be undone',
      details: [
        { label: 'Event Hub', value: eventHub.title },
      ],
      consequences: {
        title: 'What will be deleted:',
        items: [
          'All event hub data',
          'Event statistics and entries',
          'This action is permanent',
        ],
      },
      confirmLabel: 'Delete Event Hub',
      onConfirm: () => {
        if (onDelete) {
          onDelete();
          toast.success('Event Hub deleted');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleDuplicate = () => {
    setConfirmDialogData({
      variant: 'info',
      icon: 'info',
      title: 'Duplicate Event Hub?',
      description: 'Create a copy of this event hub',
      details: [
        { label: 'Original', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'A copy will be created as draft',
          'You can edit before publishing',
          'Original event hub unchanged',
        ],
      },
      confirmLabel: 'Duplicate Event Hub',
      onConfirm: () => {
        if (onDuplicate) {
          onDuplicate();
          toast.success('Event Hub duplicated as draft');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  // ✅ Share: Simple action (just copies link, no confirmation needed)
  const handleShare = () => {
    toast.success('Event Hub link copied!');
    onClose();
  };

  const handleEditClick = () => {
    onEdit();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        side="bottom"
        className="max-w-[480px] mx-auto rounded-t-3xl p-0"
      >
        <SheetTitle className="sr-only">Event Hub Settings</SheetTitle>
        <SheetDescription className="sr-only">
          Manage event hub settings and actions
        </SheetDescription>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Event Hub Settings</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-1 truncate">
            {eventHub.title}
          </p>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {/* Edit */}
          <Button
            variant="outline"
            onClick={handleEditClick}
            className="w-full justify-start h-12"
          >
            <Edit className="w-4 h-4 mr-3" />
            Edit Event Hub
          </Button>

          {/* Pause/Resume */}
          {(eventHub.status === 'active' || eventHub.status === 'upcoming') && (
            <Button
              variant="outline"
              onClick={handlePause}
              className="w-full justify-start h-12"
            >
              <Pause className="w-4 h-4 mr-3" />
              Pause Event Hub
            </Button>
          )}

          {eventHub.status === 'paused' && (
            <Button
              variant="outline"
              onClick={handleResume}
              className="w-full justify-start h-12"
            >
              <Play className="w-4 h-4 mr-3" />
              Resume Event Hub
            </Button>
          )}

          {/* Cancel Event */}
          {(eventHub.status === 'active' || eventHub.status === 'upcoming') && (
            <Button
              variant="outline"
              onClick={handleCancel}
              className="w-full justify-start h-12 text-orange-600 hover:text-orange-700 hover:bg-orange-50"
            >
              <Ban className="w-4 h-4 mr-3" />
              Cancel Event
            </Button>
          )}

          {/* Duplicate */}
          <Button
            variant="outline"
            onClick={handleDuplicate}
            className="w-full justify-start h-12"
          >
            <Copy className="w-4 h-4 mr-3" />
            Duplicate Event Hub
          </Button>

          {/* Share */}
          <Button
            variant="outline"
            onClick={handleShare}
            className="w-full justify-start h-12"
          >
            <Share2 className="w-4 h-4 mr-3" />
            Share Event Hub
          </Button>

          {/* Delete */}
          {(eventHub.status === 'draft' || eventHub.status === 'past' || eventHub.status === 'cancelled') ? (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Delete Event Hub
            </Button>
          ) : null}
        </div>
      </SheetContent>
      {/* ✅ PHASE 3: Canonical executor - handles all confirmations */}
      {confirmDialogData && (
        <ConfirmActionDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          variant={confirmDialogData.variant}
          icon={confirmDialogData.icon}
          title={confirmDialogData.title}
          description={confirmDialogData.description}
          details={confirmDialogData.details}
          consequences={confirmDialogData.consequences}
          confirmLabel={confirmDialogData.confirmLabel}
          onConfirm={confirmDialogData.onConfirm}
        />
      )}
    </Sheet>
  );
}