/**
ListingLifecycleAlertCardCompact (WF-4)
Compact alert for listing lifecycle events requiring quick actions
Links to: H-A (Listing Details) or H-C (Renew/Edit Actions)

Event types:
- expiring: Listing about to expire
- sold-reserved: Listing sold or reserved
- flagged-paused: Listing flagged/paused by system
- confirm-received: Buyer needs to confirm receipt
- needs-update: Listing needs information update
 */

import type { ReactNode } from "react";
import { Package, AlertCircle, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '../../ui/button';

type ListingEventType = 
  | 'expiring' 
  | 'sold-reserved'
  | 'flagged-paused'
  | 'confirm-received'
  | 'needs-update';

interface ListingLifecycleAlertCardCompactProps {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  eventType: ListingEventType;
  isRead: boolean;
  onAction: () => void;
  actionLabel?: string;
  onOpenChat?: () => void; // ✅ PHASE 2.4: Optional chat button for sold items
}

const EVENT_CONFIG: Record<ListingEventType, {
  icon: ReactNode;
  color: string;
  bgColor: string;
  borderColor: string;
  defaultAction: string;
  unreadDotColor: string;
}> = {
  'expiring': {
    icon: <Clock className="h-5 w-5" />,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-l-orange-300',
    defaultAction: 'Renew Listing',
    unreadDotColor: 'bg-orange-300',
  },
  'sold-reserved': {
    icon: <CheckCircle className="h-5 w-5" />,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-l-green-300',
    defaultAction: 'View Details',
    unreadDotColor: 'bg-green-300',
  },
  'flagged-paused': {
    icon: <AlertTriangle className="h-5 w-5" />,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-l-red-300',
    defaultAction: 'Review & Fix',
    unreadDotColor: 'bg-red-300',
  },
  'confirm-received': {
    icon: <Package className="h-5 w-5" />,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-l-blue-300',
    defaultAction: 'Confirm Receipt',
    unreadDotColor: 'bg-blue-300',
  },
  'needs-update': {
    icon: <AlertCircle className="h-5 w-5" />,
    color: 'text-amber-400',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-l-amber-300',
    defaultAction: 'Update Listing',
    unreadDotColor: 'bg-amber-300',
  },
};

export function ListingLifecycleAlertCardCompact({
  title,
  subtitle,
  time,
  eventType,
  isRead,
  onAction,
  actionLabel,
  onOpenChat, // ✅ PHASE 2.4: Optional chat button for sold items
}: ListingLifecycleAlertCardCompactProps) {
  const config = EVENT_CONFIG[eventType];

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
          
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{subtitle}</p>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {/* Primary CTA */}
            <Button 
              size="sm" 
              onClick={onAction} 
              className="h-8 text-xs font-medium"
              variant={eventType === 'expiring' || eventType === 'flagged-paused' ? 'default' : 'outline'}
            >
              {actionLabel || config.defaultAction}
            </Button>

            {/* Optional Chat Button for Sold Items */}
            {onOpenChat && eventType === 'sold-reserved' && (
              <Button 
                size="sm" 
                onClick={onOpenChat} 
                className="h-8 text-xs font-medium"
                variant="outline"
              >
                Chat
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Unread Indicator */}
      {!isRead && (
        <div className={`absolute top-3 right-3 h-2.5 w-2.5 rounded-full ${config.unreadDotColor} ring-2 ring-background`} />
      )}
    </div>
  );
}