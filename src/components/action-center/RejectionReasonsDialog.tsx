/**
 * RejectionReasonsDialog Component
 * Dialog informativo para listings REJECTED
 * 
 * Features:
 * - Muestra razones específicas del rechazo
 * - Feedback del moderador
 * - Botón CTA para Edit & Resubmit
 * - Diseño empático y constructivo
 */

import { XCircle, AlertTriangle, Edit3, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface RejectionReasonsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: {
    title: string;
    groupName: string;
    rejectedTime: string;
    reasons: Array<{
      type: 'error' | 'warning' | 'suggestion';
      message: string;
    }>;
    moderatorNote?: string;
  };
  onEditResubmit?: () => void;
  onContactMods?: () => void;
}

export function RejectionReasonsDialog({ 
  open, 
  onOpenChange, 
  listing,
  onEditResubmit,
  onContactMods
}: RejectionReasonsDialogProps) {
  if (!open) return null;

  const errorReasons = listing.reasons.filter(r => r.type === 'error');
  const warningReasons = listing.reasons.filter(r => r.type === 'warning');
  const suggestions = listing.reasons.filter(r => r.type === 'suggestion');

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-w-[480px] mx-auto">
        <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="p-6 rounded-t-2xl bg-red-50 dark:bg-red-950/30 sticky top-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Listing Rejected
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review the reasons and resubmit
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
                <span className="text-muted-foreground">Rejected:</span>
                <span className="font-medium">{listing.rejectedTime}</span>
              </div>
            </div>

            {/* Error Reasons */}
            {errorReasons.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive" className="h-5 px-2 text-[10px]">
                    MUST FIX
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {errorReasons.length} {errorReasons.length === 1 ? 'issue' : 'issues'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {errorReasons.map((reason, idx) => (
                    <div 
                      key={idx}
                      className="flex gap-2 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                    >
                      <XCircle className="w-4 h-4 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-red-900 dark:text-red-100">
                        {reason.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Warning Reasons */}
            {warningReasons.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge className="h-5 px-2 text-[10px] bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                    SHOULD FIX
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {warningReasons.length} {warningReasons.length === 1 ? 'warning' : 'warnings'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {warningReasons.map((reason, idx) => (
                    <div 
                      key={idx}
                      className="flex gap-2 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-amber-900 dark:text-amber-100">
                        {reason.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="h-5 px-2 text-[10px]">
                    SUGGESTIONS
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {suggestions.length} {suggestions.length === 1 ? 'tip' : 'tips'}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {suggestions.map((reason, idx) => (
                    <div 
                      key={idx}
                      className="flex gap-2 p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900"
                    >
                      <AlertTriangle className="w-4 h-4 text-blue-600 dark:text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-xs text-blue-900 dark:text-blue-100">
                        {reason.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Moderator Note */}
            {listing.moderatorNote && (
              <div className="flex gap-3 p-3 rounded-lg bg-muted/50 border border-border">
                <MessageSquare className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium mb-1">Moderator Note:</p>
                  <p className="text-muted-foreground text-xs italic">
                    "{listing.moderatorNote}"
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex flex-col gap-2 sticky bottom-0 bg-background pt-2">
            {onEditResubmit && (
              <Button
                onClick={() => {
                  onEditResubmit();
                  onOpenChange(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Edit3 className="w-4 h-4 mr-2" />
                Edit & Resubmit
              </Button>
            )}
            <div className="flex gap-2">
              {onContactMods && (
                <Button
                  onClick={() => {
                    onContactMods();
                    onOpenChange(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Ask Mods
                </Button>
              )}
              <Button
                onClick={() => onOpenChange(false)}
                variant="outline"
                className={onContactMods ? 'flex-1' : 'w-full'}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
