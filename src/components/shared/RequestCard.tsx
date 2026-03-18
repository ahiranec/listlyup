/**
 * Request Card - Universal Component
 * Handles both Campaign and Event Hub requests
 * Premium Design 2025
 */

import { Check, X, Eye, AlertCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface RequestCardProps {
  context: 'campaign' | 'event';
  listing: string;
  listingImage?: string;
  requestedBy?: string;
  containerTitle: string; // Campaign title or Event Hub title
  containerOwner?: string;
  time: string;
  qualifies?: boolean;
  reason?: string;
  status?: 'pending' | 'approved' | 'rejected';
  onApprove?: () => void;
  onReject?: () => void;
  onView?: () => void;
  disableView?: boolean; // ✅ Phase 1: Disable broken View buttons
  viewHelperText?: string; // ✅ Phase 1: Helper text for disabled View buttons
}

export function RequestCard({
  context,
  listing,
  listingImage,
  requestedBy,
  containerTitle,
  containerOwner,
  time,
  qualifies = true,
  reason,
  status,
  onApprove,
  onReject,
  onView,
  disableView,
  viewHelperText,
}: RequestCardProps) {
  const isOwnerView = !!requestedBy; // Owner reviews requests FROM others
  const isUserView = !!containerOwner; // User views their OWN request status

  return (
    <div className="bg-card border border-border rounded-xl p-3 space-y-3">
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Listing Image */}
        {listingImage && (
          <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <img
              src={listingImage}
              alt={listing}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{listing}</h4>
          
          {isOwnerView && (
            <p className="text-xs text-muted-foreground mt-0.5">
              Requested by <span className="text-foreground">{requestedBy}</span>
            </p>
          )}

          {isUserView && (
            <p className="text-xs text-muted-foreground mt-0.5">
              {context === 'campaign' ? 'Campaign' : 'Event'}: <span className="text-foreground">{containerTitle}</span>
            </p>
          )}

          <p className="text-xs text-muted-foreground mt-0.5">{time}</p>
        </div>
      </div>

      {/* Container Info (for owner view) */}
      {isOwnerView && (
        <div className="text-xs text-muted-foreground">
          {context === 'campaign' ? 'Campaign' : 'Event Hub'}: <span className="text-foreground">{containerTitle}</span>
        </div>
      )}

      {/* Owner Info (for user view) */}
      {isUserView && containerOwner && (
        <div className="text-xs text-muted-foreground">
          Owner: <span className="text-foreground">{containerOwner}</span>
        </div>
      )}

      {/* Eligibility Status */}
      {qualifies ? (
        <div className="flex items-center gap-1.5 text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2 py-1 rounded">
          <Check className="w-3 h-3" />
          <span>Qualifies for this {context === 'campaign' ? 'campaign' : 'event'}</span>
        </div>
      ) : (
        <div className="flex items-start gap-1.5 text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-2 py-1.5 rounded">
          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
          <span>{reason || 'Does not meet requirements'}</span>
        </div>
      )}

      {/* Status Badge (for user view) */}
      {isUserView && status && (
        <div>
          {status === 'pending' && (
            <Badge variant="secondary" className="text-xs">
              ⏳ Pending Review
            </Badge>
          )}
          {status === 'approved' && (
            <Badge variant="default" className="text-xs bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400">
              ✅ Approved
            </Badge>
          )}
          {status === 'rejected' && (
            <Badge variant="secondary" className="text-xs bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400">
              ❌ Rejected
            </Badge>
          )}
        </div>
      )}

      {/* Actions */}
      {isOwnerView && status !== 'approved' && status !== 'rejected' && (
        <div className="flex gap-2">
          {qualifies && onApprove && (
            <Button
              size="sm"
              onClick={onApprove}
              className="flex-1 h-9"
            >
              <Check className="w-4 h-4 mr-1.5" />
              Approve
            </Button>
          )}
          {onReject && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onReject}
              className="flex-1 h-9"
            >
              <X className="w-4 h-4 mr-1.5" />
              Reject
            </Button>
          )}
        </div>
      )}

      {/* View Button (always available) */}
      {onView && (
        <Button
          size="sm"
          variant="outline"
          onClick={onView}
          className="w-full h-9"
          disabled={disableView}
          title={viewHelperText}
        >
          <Eye className="w-4 h-4 mr-1.5" />
          View Listing
        </Button>
      )}
    </div>
  );
}