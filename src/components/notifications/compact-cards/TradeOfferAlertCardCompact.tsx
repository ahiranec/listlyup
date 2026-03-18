/**
TradeOfferAlertCardCompact (WF-3)
Compact alert for trade offer notifications
Links to: H-A (Trade Details View)
Primary CTA: Accept | Secondary (conditional): Reject
*/

import { ArrowLeftRight, Clock } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface TradeOfferAlertCardCompactProps {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  expiresIn?: string;
  isRead: boolean;
  isCritical?: boolean;
  onAccept: () => void;
  onReject: () => void;
  onViewOffer?: () => void;
}

export function TradeOfferAlertCardCompact({
  title,
  subtitle,
  time,
  expiresIn,
  isRead,
  isCritical,
  onAccept,
  onReject,
  onViewOffer,
}: TradeOfferAlertCardCompactProps) {
  // Check if expiring soon for pulse animation
  const expiringHours = expiresIn ? parseInt(expiresIn) : null;
  const shouldPulse = expiringHours && expiringHours < 3;

  return (
    <div
      className={`relative rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-lg ${
        !isRead ? 'border-l-[6px] border-l-orange-300' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
          <ArrowLeftRight className="h-5 w-5 text-orange-400" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>
            <span className="text-[11px] text-muted-foreground opacity-70 shrink-0">{time}</span>
          </div>
          
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">{subtitle}</p>

          {/* Expiration Badge */}
          {expiresIn && (
            <Badge variant="destructive" className={`mb-2 text-xs px-2.5 py-1 ${shouldPulse ? 'animate-pulse' : ''}`}>
              <Clock className="h-3 w-3 mr-1" />
              {expiresIn} left
            </Badge>
          )}

          {/* Tertiary link */}
          {onViewOffer && (
            <button
              onClick={onViewOffer}
              className="text-xs text-primary hover:underline mb-2 block"
            >
              View details →
            </button>
          )}

          {/* Primary CTA: Accept | Secondary CTA: Reject */}
          <div className="flex gap-2">
            <Button size="sm" onClick={onAccept} className="h-8 text-xs font-medium flex-1">
              Accept
            </Button>

            {(isCritical || !!expiresIn) && (
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={onReject} 
                className="h-8 text-xs font-medium"
              >
                Reject
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Unread Indicator */}
      {!isRead && (
        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-orange-300 ring-2 ring-background" />
      )}
    </div>
  );
}