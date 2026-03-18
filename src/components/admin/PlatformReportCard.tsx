/**
 * Platform Report Card Component
 * For Admin Dashboard
 * 
 * Displays platform-wide reports from all groups/users
 * Similar to ReportCard but with platform-wide scope and status indicator
 * 
 * Features:
 * - Priority badges (High/Medium/Low) with soft colors
 * - Status indicator (pending/reviewed/resolved)
 * - Location/context display
 * - Action buttons (Review/Resolve/Dismiss)
 * 
 * @example
 * <PlatformReportCard
 *   reportType="Spam/Scam"
 *   reported="iPhone 14 listing by @suspect_user"
 *   reportedBy="@user123"
 *   location="Tech Lovers Chile"
 *   priority="High"
 *   status="pending"
 *   time="2h ago"
 * />
 */

import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface PlatformReportCardProps {
  reportType: string;
  reported: string;
  reportedBy: string;
  location?: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'reviewed' | 'resolved';
  time: string;
  onReview?: () => void;
  onResolve?: () => void;
  onDismiss?: () => void;
  onMessageUser?: () => void; // ✅ DUAL FLOW: Entry point to open moderation chat
  targetUserId?: string; // ✅ DUAL FLOW: Target user ID for moderation chat
}

export function PlatformReportCard({
  reportType,
  reported,
  reportedBy,
  location,
  priority,
  status,
  time,
  onReview,
  onResolve,
  onDismiss,
  onMessageUser,
  targetUserId,
}: PlatformReportCardProps) {
  const handleReview = () => {
    if (onReview) {
      onReview();
    } else {
      toast.success('Opening report details...');
    }
  };

  const handleResolve = () => {
    if (onResolve) {
      onResolve();
    } else {
      toast.success('Report marked as resolved');
    }
  };

  const handleDismiss = () => {
    if (onDismiss) {
      onDismiss();
    } else {
      toast.info('Report dismissed');
    }
  };

  // Priority colors (soft palette)
  const priorityStyles = {
    High: 'bg-red-300 text-red-900 dark:bg-red-900/40 dark:text-red-200',
    Medium: 'bg-amber-300 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200',
    Low: 'bg-blue-300 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200',
  };

  // Status colors (soft palette)
  const statusStyles = {
    pending: 'text-amber-400 dark:text-amber-500',
    reviewed: 'text-blue-400 dark:text-blue-500',
    resolved: 'text-green-400 dark:text-green-500',
  };

  const statusLabels = {
    pending: 'Pending Review',
    reviewed: 'Reviewed',
    resolved: 'Resolved',
  };

  return (
    <div className="p-3 bg-card border border-border rounded-lg hover:border-border/80 transition-colors">
      {/* Header */}
      <div className="flex items-start gap-2 mb-2">
        <AlertTriangle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
          priority === 'High' ? 'text-red-400 dark:text-red-500' :
          priority === 'Medium' ? 'text-amber-400 dark:text-amber-500' :
          'text-blue-400 dark:text-blue-500'
        }`} />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge className={`text-[10px] px-1.5 py-0 h-4 ${priorityStyles[priority]}`}>
              {priority.toUpperCase()}
            </Badge>
            <span className={`text-xs ${statusStyles[status]}`}>
              {statusLabels[status]}
            </span>
          </div>
          <p className="text-xs mb-0.5">
            <span className="text-muted-foreground">Type:</span>{' '}
            <span className="font-medium">{reportType}</span>
          </p>
          <p className="text-xs text-foreground/90 line-clamp-2 mb-1">
            {reported}
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="flex items-center gap-3 text-[11px] text-muted-foreground mb-2">
        <span>By {reportedBy}</span>
        {location && (
          <>
            <span>·</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {location}
            </span>
          </>
        )}
        <span>·</span>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {time}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {status === 'pending' && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={handleReview}
              className="flex-1 h-7 text-xs"
            >
              Review
            </Button>
            {onMessageUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMessageUser}
                className="h-7 text-xs px-3"
              >
                Message
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleDismiss}
              className="h-7 text-xs px-3"
            >
              Dismiss
            </Button>
          </>
        )}
        {status === 'reviewed' && (
          <>
            <Button
              variant="default"
              size="sm"
              onClick={handleResolve}
              className="flex-1 h-7 text-xs"
            >
              Resolve
            </Button>
            {onMessageUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMessageUser}
                className="h-7 text-xs px-3"
              >
                Message
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleReview}
              className="h-7 text-xs px-3"
            >
              Details
            </Button>
          </>
        )}
        {status === 'resolved' && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReview}
              className="flex-1 h-7 text-xs"
            >
              View Details
            </Button>
            {onMessageUser && (
              <Button
                variant="outline"
                size="sm"
                onClick={onMessageUser}
                className="h-7 text-xs px-3"
              >
                Message
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}