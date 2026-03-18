/**
ReportStatusAlertCardCompact (WF-6)
Compact alert for report status updates
Links to: H-A (Report Details View)
 */

import type { ReactNode } from "react";
import { Flag, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

type ReportStatus = 'under-review' | 'resolved' | 'rejected' | 'action-taken';

interface ReportStatusAlertCardCompactProps {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  status: ReportStatus;
  reportType?: string;
  isRead: boolean;
  onViewDetails: () => void;
}

const STATUS_CONFIG: Record<ReportStatus, {
  icon: ReactNode;
  color: string;
  bgColor: string;
  badgeVariant: 'default' | 'secondary' | 'destructive' | 'outline';
  badgeLabel: string;
  borderColor: string;
  unreadDotColor: string;
}> = {
  'under-review': {
    icon: <Clock className="h-5 w-5" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    badgeVariant: 'secondary',
    badgeLabel: 'Under Review',
    borderColor: 'border-l-amber-300',
    unreadDotColor: 'bg-amber-300',
  },
  'resolved': {
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    badgeVariant: 'default',
    badgeLabel: 'Resolved',
    borderColor: 'border-l-green-300',
    unreadDotColor: 'bg-green-300',
  },
  'rejected': {
    icon: <XCircle className="h-5 w-5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    badgeVariant: 'destructive',
    badgeLabel: 'Rejected',
    borderColor: 'border-l-red-300',
    unreadDotColor: 'bg-red-300',
  },
  'action-taken': {
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    badgeVariant: 'default',
    badgeLabel: 'Action Taken',
    borderColor: 'border-l-blue-300',
    unreadDotColor: 'bg-blue-300',
  },
};

export function ReportStatusAlertCardCompact({
  title,
  subtitle,
  time,
  status,
  reportType,
  isRead,
  onViewDetails,
}: ReportStatusAlertCardCompactProps) {
  const config = STATUS_CONFIG[status];

  return (
    <div
      className={`relative rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-lg ${
        !isRead ? `border-l-[6px] ${config.borderColor}` : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${config.bgColor}`}>
          <div className={config.color}>{config.icon}</div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>
            <span className="text-[11px] text-muted-foreground opacity-70 shrink-0">{time}</span>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={config.badgeVariant} className="text-xs h-5 px-2.5 py-1">
              {config.badgeLabel}
            </Badge>
            {reportType && (
              <span className="text-xs text-muted-foreground">· {reportType}</span>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{subtitle}</p>

          {/* Primary CTA */}
          <Button 
            size="sm" 
            variant="outline"
            onClick={onViewDetails} 
            className="h-8 text-xs font-medium"
          >
            View Details
          </Button>
        </div>
      </div>

      {/* Unread Indicator */}
      {!isRead && (
        <div className={`absolute top-3 right-3 h-2.5 w-2.5 rounded-full ${config.unreadDotColor} ring-2 ring-background`} />
      )}
    </div>
  );
}