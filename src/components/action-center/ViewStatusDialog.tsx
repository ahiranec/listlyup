/**
 * ViewStatusDialog Component
 * Dialog informativo para listings con status PENDING
 * 
 * Features:
 * - Muestra por qué está pendiente (esperando aprobación de grupo)
 * - Timeline de aprobación estimada
 * - Información del grupo moderador
 * - Opción para contactar moderadores o cancelar
 */

import { Clock, Info, Users } from 'lucide-react';
import { Button } from '../ui/button';

interface ViewStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    title: string;
    groupName: string;
    submittedTime: string;
    estimatedReview?: string;
  };
  onContactMods?: () => void;
  onCancel?: () => void;
}

export function ViewStatusDialog({ 
  open, 
  onOpenChange, 
  listing,
  onContactMods,
  onCancel
}: ViewStatusDialogProps) {
  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-w-[480px] mx-auto">
        <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-6 rounded-t-2xl bg-blue-50 dark:bg-blue-950/30">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600 dark:text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Pending Approval
                </h3>
                <p className="text-sm text-muted-foreground">
                  Waiting for group moderators
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Listing Details */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">Listing:</span>
                <span className="font-medium text-right max-w-[60%]">{listing.title}</span>
              </div>
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">Group:</span>
                <span className="font-medium">{listing.groupName}</span>
              </div>
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">Submitted:</span>
                <span className="font-medium">{listing.submittedTime}</span>
              </div>
              {listing.estimatedReview && (
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">Est. Review:</span>
                  <span className="font-medium text-blue-600 dark:text-blue-500">{listing.estimatedReview}</span>
                </div>
              )}
            </div>

            {/* Status Explanation */}
            <div className="flex gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900">
              <Info className="w-5 h-5 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100 mb-1">Why is this pending?</p>
                <ul className="text-blue-700 dark:text-blue-300 space-y-1 text-xs">
                  <li>• This group requires moderator approval for all listings</li>
                  <li>• Moderators review submissions to ensure quality and compliance</li>
                  <li>• You'll receive a notification once it's reviewed</li>
                </ul>
              </div>
            </div>

            {/* Timeline */}
            <div className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">What happens next:</p>
                <ul className="text-amber-700 dark:text-amber-300 space-y-1 text-xs">
                  <li>• Moderators will review within 24-48 hours</li>
                  <li>• If approved, your listing goes live immediately</li>
                  <li>• If rejected, you'll receive reasons and can edit & resubmit</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex flex-col gap-2">
            {onContactMods && (
              <Button
                onClick={() => {
                  onContactMods();
                  onOpenChange(false);
                }}
                className="w-full"
                variant="outline"
              >
                <Users className="w-4 h-4 mr-2" />
                Contact Moderators
              </Button>
            )}
            <div className="flex gap-2">
              {onCancel && (
                <Button
                  onClick={() => {
                    onCancel();
                    onOpenChange(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel Submission
                </Button>
              )}
              <Button
                onClick={() => onOpenChange(false)}
                className={onCancel ? 'flex-1' : 'w-full'}
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
