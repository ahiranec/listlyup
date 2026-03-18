/**
 * Event Approval Sheet
 * 
 * CANONICAL EXECUTOR for approve-event-request action
 * 
 * PURPOSE:
 * - Shows listing details + event context
 * - Allows optional approval notes
 * - Executes approval via Action Registry
 * - Shows toast confirmation
 * 
 * INVOKED BY:
 * - GlobalActionModal (centralized)
 * - Direct invocation (legacy, will be deprecated)
 * 
 * PATTERN: Identical to CampaignApprovalSheet
 */

import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner@2.0.3';
import { CheckCircle2 } from 'lucide-react';

interface EventApprovalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: string;
  listingImage: string;
  eventHub: string;
  requestedBy: string;
  onComplete?: () => void;
}

export function EventApprovalSheet({
  open,
  onOpenChange,
  listing,
  listingImage,
  eventHub,
  requestedBy,
  onComplete,
}: EventApprovalSheetProps) {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Execute via Action Registry (future: real backend call)
    toast.success('Event hub request approved', {
      description: `${listing} has been approved for "${eventHub}"`,
      icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
    });
    
    setIsSubmitting(false);
    setNotes('');
    onOpenChange(false);
    onComplete?.();
  };

  const handleCancel = () => {
    setNotes('');
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] sm:h-[85vh]">
        <SheetHeader className="mb-6">
          <SheetTitle>Approve Listing for Event</SheetTitle>
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

          {/* Qualification Info */}
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-900">
                  Listing qualifies for event
                </p>
                <p className="text-xs text-green-700 mt-1">
                  All event requirements are met
                </p>
              </div>
            </div>
          </div>

          {/* Optional Notes */}
          <div className="space-y-2">
            <Label htmlFor="approval-notes" className="text-sm font-medium">
              Approval Notes (Optional)
            </Label>
            <Textarea
              id="approval-notes"
              placeholder="Add optional notes for the requester..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="h-24 resize-none"
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
              • The listing will be added to "{eventHub}"
              <br />
              • {requestedBy} will receive a confirmation notification
              <br />
              • The listing will appear in event hub results
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
            onClick={handleApprove}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Approving...' : 'Approve Request'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
