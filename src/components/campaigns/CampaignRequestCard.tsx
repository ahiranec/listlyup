/**
 * Campaign Request Card - Phase 2
 * For Action Center > Campaigns tab
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CampaignRequestCardProps {
  listing: string;
  listingImage: string;
  requestedBy?: string;
  campaignOwner?: string;
  campaign: string;
  time: string;
  qualifies: boolean;
  reason?: string;
  status?: 'pending' | 'approved';
  onApprove: () => void;
  onReject: () => void;
  onView?: () => void;
}

export function CampaignRequestCard({
  listing,
  listingImage,
  requestedBy,
  campaignOwner,
  campaign,
  time,
  qualifies,
  reason,
  status = 'pending',
  onApprove,
  onReject,
  onView,
}: CampaignRequestCardProps) {
  // Card para owner (recibe requests) o user (envió requests)
  const isOwnerView = !!requestedBy;
  
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-primary/30 transition-all">
      <div className="flex gap-3 mb-3">
        <img
          src={listingImage}
          alt={listing}
          className="w-16 h-16 object-cover rounded-lg"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm truncate">{listing}</h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {isOwnerView ? `by ${requestedBy} • ${time}` : `Campaign: ${campaign}`}
          </p>
          <p className="text-xs text-muted-foreground">
            {isOwnerView 
              ? `Campaign: ${campaign}`
              : `Owner: ${campaignOwner} • ${time}`
            }
          </p>
        </div>
      </div>

      {status === 'pending' && (
        <>
          <div className="mb-3">
            {qualifies ? (
              <div className="flex items-center gap-1">
                <span className="text-xs text-green-600 font-medium">✅ Qualifies for campaign</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-xs text-red-600 font-medium">❌ {reason}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {onView && (
              <Button
                variant="outline"
                size="sm"
                onClick={onView}
                className="flex-1"
              >
                View Details
              </Button>
            )}
            {isOwnerView && (
              <>
                {qualifies && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onReject}
                      className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                    >
                      Reject
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={onApprove}
                      className="flex-1"
                    >
                      Approve
                    </Button>
                  </>
                )}
                {!qualifies && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onReject}
                    className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
                  >
                    Reject
                  </Button>
                )}
              </>
            )}
            {!isOwnerView && (
              <div className="flex-1 text-center py-2 text-sm text-muted-foreground">
                ⏳ Waiting for approval...
              </div>
            )}
          </div>
        </>
      )}

      {status === 'approved' && (
        <div className="text-center py-2">
          <span className="text-xs text-green-600 font-medium">✅ Approved</span>
        </div>
      )}
    </div>
  );
}