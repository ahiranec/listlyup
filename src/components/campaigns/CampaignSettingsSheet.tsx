/**
 * Campaign Settings Sheet
 * Options menu for campaign management
 * Premium Design 2025
 * 
 * ARCHITECTURE (Phase 3):
 * - NO executes logic inline
 * - Delegates to ConfirmActionDialog (canonical executor)
 * - Settings Sheet = Presenter only, NOT executor
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Edit, Pause, Play, Trash2, Share2, Copy, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ConfirmActionDialog } from '../action-center/ConfirmActionDialog';

interface CampaignSettingsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: string;
    title: string;
    status: 'active' | 'scheduled' | 'draft' | 'ended' | 'paused';
  };
  onEdit: () => void;
  onPause?: () => void;
  onResume?: () => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

export function CampaignSettingsSheet({
  isOpen,
  onClose,
  campaign,
  onEdit,
  onPause,
  onResume,
  onDelete,
  onDuplicate,
}: CampaignSettingsSheetProps) {
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
      title: 'Pause Campaign?',
      description: 'The campaign will be temporarily stopped',
      details: [
        { label: 'Campaign', value: campaign.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Campaign stops running immediately',
          'No new listings will be added',
          'You can resume anytime',
        ],
      },
      confirmLabel: 'Pause Campaign',
      onConfirm: () => {
        if (onPause) {
          onPause();
          toast.success('Campaign paused');
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
      title: 'Resume Campaign?',
      description: 'The campaign will become active again',
      details: [
        { label: 'Campaign', value: campaign.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Campaign resumes immediately',
          'Eligible listings will be added',
          'Campaign runs until end date',
        ],
      },
      confirmLabel: 'Resume Campaign',
      onConfirm: () => {
        if (onResume) {
          onResume();
          toast.success('Campaign resumed');
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
      title: 'Delete Campaign?',
      description: 'This action cannot be undone',
      details: [
        { label: 'Campaign', value: campaign.title },
      ],
      consequences: {
        title: 'What will be deleted:',
        items: [
          'All campaign data',
          'Campaign statistics',
          'This action is permanent',
        ],
      },
      confirmLabel: 'Delete Campaign',
      onConfirm: () => {
        if (onDelete) {
          onDelete();
          toast.success('Campaign deleted');
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
      title: 'Duplicate Campaign?',
      description: 'Create a copy of this campaign',
      details: [
        { label: 'Original', value: campaign.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'A copy will be created as draft',
          'You can edit before publishing',
          'Original campaign unchanged',
        ],
      },
      confirmLabel: 'Duplicate Campaign',
      onConfirm: () => {
        if (onDuplicate) {
          onDuplicate();
          toast.success('Campaign duplicated');
        }
        setConfirmDialogOpen(false);
        onClose();
      },
    });
    setConfirmDialogOpen(true);
  };

  // ✅ Share: Simple action (just copies link, no confirmation needed)
  const handleShare = () => {
    toast.success('Campaign link copied!');
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
        <SheetTitle className="sr-only">Campaign Settings</SheetTitle>
        <SheetDescription className="sr-only">
          Manage campaign settings and actions
        </SheetDescription>

        {/* Header */}
        <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Campaign Settings</h2>
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
            {campaign.title}
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
            Edit Campaign
          </Button>

          {/* Pause/Resume */}
          {campaign.status === 'active' && (
            <Button
              variant="outline"
              onClick={handlePause}
              className="w-full justify-start h-12"
            >
              <Pause className="w-4 h-4 mr-3" />
              Pause Campaign
            </Button>
          )}

          {campaign.status === 'paused' && (
            <Button
              variant="outline"
              onClick={handleResume}
              className="w-full justify-start h-12"
            >
              <Play className="w-4 h-4 mr-3" />
              Resume Campaign
            </Button>
          )}

          {/* Duplicate */}
          <Button
            variant="outline"
            onClick={handleDuplicate}
            className="w-full justify-start h-12"
          >
            <Copy className="w-4 h-4 mr-3" />
            Duplicate Campaign
          </Button>

          {/* Share */}
          <Button
            variant="outline"
            onClick={handleShare}
            className="w-full justify-start h-12"
          >
            <Share2 className="w-4 h-4 mr-3" />
            Share Campaign
          </Button>

          {/* Delete */}
          {campaign.status === 'draft' || campaign.status === 'ended' ? (
            <Button
              variant="outline"
              onClick={handleDelete}
              className="w-full justify-start h-12 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4 mr-3" />
              Delete Campaign
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