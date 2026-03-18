/**
 * Event Rejection Sheet
 * 
 * CANONICAL EXECUTOR for reject-event-request action
 * 
 * PURPOSE:
 * - Shows listing details + event context
 * - REQUIRES rejection reason (dropdown)
 * - Allows optional additional notes
 * - Executes rejection via Action Registry
 * - Shows toast confirmation
 * 
 * INVOKED BY:
 * - GlobalActionModal (centralized)
 * - Direct invocation (legacy, will be deprecated)
 * 
 * PATTERN: Identical to CampaignRejectionSheet
 */

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { XCircle, AlertCircle } from 'lucide-react';

interface EventRejectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: string;
  listingImage: string;
  eventHub: string;
  requestedBy: string;
  onComplete?: () => void;
}

const REJECTION_REASONS = [
  { value: 'not-eligible', label: 'Does not meet event criteria' },
  { value: 'category-mismatch', label: 'Wrong category for event' },
  { value: 'quality-standards', label: 'Does not meet quality standards' },
  { value: 'duplicate', label: 'Duplicate listing in event' },
  { value: 'timing', label: 'Not aligned with event dates' },
  { value: 'location', label: 'Location not supported by event' },
  { value: 'other', label: 'Other reason (specify below)' },
] as const;

export function EventRejectionSheet({
  open,
  onOpenChange,
  listing,
  listingImage,
  eventHub,
  requestedBy,
  onComplete,
}: EventRejectionSheetProps) {
  const [reason, setReason] = useState<string>('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async () => {
    if (!reason) {
      toast.error('Rejection reason required', {
        description: 'Please select a reason for rejecting this request',
      });
      return;
    }

    if (reason === 'other' && !notes.trim()) {
      toast.error('Additional details required', {
        description: 'Please provide details when selecting "Other reason"',
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Execute via Action Registry (future: real backend call)
    const selectedReasonLabel = REJECTION_REASONS.find(r => r.value === reason)?.label;
    
    toast.success('Event hub request rejected', {
      description: `${listing} has been rejected from "${eventHub}"`,
      icon: <XCircle className="w-5 h-5 text-red-600" />,
    });
    
    setIsSubmitting(false);
    setReason('');
    setNotes('');
    onOpenChange(false);
    onComplete?.();
  };

  const handleCancel = () => {
    setReason('');
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh]">
        <SheetHeader className="mb-6">
          <SheetTitle>Reject Listing Request</SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Listing Preview */}
          <div className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <img
              src={listingImage}
              alt={listing}
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm truncate">{listing}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                by {requestedBy}
              </p>
              <p className="text-xs text-muted-foreground">
                Event: {eventHub}
              </p>
            </div>
          </div>

          {/* Warning */}
          <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-orange-900">
                  Provide constructive feedback
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Help the requester understand why their listing doesn't qualify
                </p>
              </div>
            </div>
          </div>

          {/* Required Reason */}
          <div className="space-y-2">
            <Label htmlFor="rejection-reason" className="text-sm font-medium">
              Rejection Reason <span className="text-red-500">*</span>
            </Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="rejection-reason" className={!reason ? 'border-red-300' : ''}>
                <SelectValue placeholder="Select a reason..." />
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!reason && (
              <p className="text-xs text-red-600">
                Please select a rejection reason
              </p>
            )}
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label htmlFor="rejection-notes" className="text-sm font-medium">
              Additional Notes {reason === 'other' && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="rejection-notes"
              placeholder={
                reason === 'other'
                  ? 'Please explain the reason for rejection...'
                  : 'Add optional details to help the requester...'
              }
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`h-24 resize-none ${reason === 'other' && !notes.trim() ? 'border-red-300' : ''}`}
            />
            <p className="text-xs text-muted-foreground">
              These notes will be sent to {requestedBy}
            </p>
          </div>

          {/* Info Box */}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>What happens next:</strong>
              <br />
              • The request will be marked as rejected
              <br />
              • {requestedBy} will receive a notification with your feedback
              <br />
              • They can modify their listing and request again
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleReject}
            disabled={isSubmitting || !reason}
            variant="destructive"
            className="flex-1"
          >
            {isSubmitting ? 'Rejecting...' : 'Reject Request'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
