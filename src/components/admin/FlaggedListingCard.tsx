/**
 * Flagged Listing Card Component
 * For Admin Dashboard
 * 
 * Displays listings auto-flagged by AI or user reports
 * Shows reason, confidence level, and severity
 * 
 * Features:
 * - Severity badges (High/Medium/Low) with soft colors
 * - AI confidence indicator when flagged by AI
 * - Flagged by indicator (AI vs User Report)
 * - Action buttons (Review/Approve/Remove)
 * 
 * @example
 * <FlaggedListingCard
 *   listing="iPhone 14 Pro Max - $50 URGENT SALE"
 *   reason="Suspicious pricing (96% below market)"
 *   flaggedBy="AI"
 *   confidence="98% confidence"
 *   severity="High"
 *   time="2h ago"
 * />
 */

import { Flag, Bot, User, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface FlaggedListingCardProps {
  listing: string;
  reason: string;
  flaggedBy: 'AI' | 'User Report';
  confidence?: string;
  severity: 'High' | 'Medium' | 'Low';
  time: string;
  onReview?: () => void;
  onApprove?: () => void;
  onRemove?: () => void;
  onMessageOwner?: () => void; // ✅ DUAL FLOW: Entry point to open moderation chat with listing owner
  listingOwnerId?: string; // ✅ DUAL FLOW: Owner user ID for moderation chat
  listingId?: string; // ✅ DUAL FLOW: Listing ID to include in moderation context
}

export function FlaggedListingCard({
  listing,
  reason,
  flaggedBy,
  confidence,
  severity,
  time,
  onReview,
  onApprove,
  onRemove,
  onMessageOwner,
  listingOwnerId,
  listingId,
}: FlaggedListingCardProps) {
  const handleReview = () => {
    if (onReview) {
      onReview();
    } else {
      toast.success('Opening listing for review...');
    }
  };

  const handleApprove = () => {
    if (onApprove) {
      onApprove();
    } else {
      toast.success('Listing approved');
    }
  };

  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      toast.error('Listing removed from platform');
    }
  };

  // Severity colors (soft palette)
  const severityStyles = {
    High: 'bg-red-300 text-red-900 dark:bg-red-900/40 dark:text-red-200',
    Medium: 'bg-amber-300 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200',
    Low: 'bg-blue-300 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200',
  };

  return (
    <div className="p-3 bg-card border border-border rounded-lg hover:border-border/80 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <Flag className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
          severity === 'High' ? 'text-red-400 dark:text-red-500' :
          severity === 'Medium' ? 'text-amber-400 dark:text-amber-500' :
          'text-blue-400 dark:text-blue-500'
        }`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] px-1.5 py-0 h-4 ${severityStyles[severity]}`}>
              {severity.toUpperCase()}
            </Badge>
            {flaggedBy === 'AI' ? (
              <span className="flex items-center gap-1 text-[10px] text-purple-400 dark:text-purple-500">
                <Bot className="w-3 h-3" />
                AI Flagged
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[10px] text-blue-400 dark:text-blue-500">
                <User className="w-3 h-3" />
                User Report
              </span>
            )}
          </div>
          <p className="text-xs font-medium text-foreground/90 line-clamp-2 mb-1">
            {listing}
          </p>
        </div>
      </div>

      {/* Reason */}
      <div className="mb-2 pl-6">
        <div className="flex items-start gap-1.5">
          <AlertTriangle className="w-3 h-3 mt-0.5 text-amber-400 dark:text-amber-500 flex-shrink-0" />
          <div>
            <p className="text-[11px] text-foreground/80 leading-snug">
              {reason}
            </p>
            {confidence && (
              <p className="text-[10px] text-purple-400 dark:text-purple-500 mt-0.5">
                {confidence}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-2 text-[11px] text-muted-foreground mb-2 pl-6">
        <Clock className="w-3 h-3" />
        <span>{time}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleReview}
          className="flex-1 h-7 text-xs"
        >
          Review
        </Button>
        {onMessageOwner && (
          <Button
            variant="outline"
            size="sm"
            onClick={onMessageOwner}
            className="h-7 text-xs px-3"
          >
            Message
          </Button>
        )}
        <Button
          variant="outline"
          size="sm"
          onClick={handleApprove}
          className="h-7 text-xs px-3"
        >
          Approve
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          className="h-7 text-xs px-3 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-950/20"
        >
          Remove
        </Button>
      </div>
    </div>
  );
}