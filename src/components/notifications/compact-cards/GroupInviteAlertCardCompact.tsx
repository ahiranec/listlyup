import { Users } from 'lucide-react';
import { Button } from '../../ui/button';

interface GroupInviteAlertCardCompactProps {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  isRead: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function GroupInviteAlertCardCompact({
  title,
  subtitle,
  time,
  isRead,
  onAccept,
  onDecline,
}: GroupInviteAlertCardCompactProps) {
  return (
    <div
      className={`relative rounded-xl border bg-card p-3 shadow-sm transition-all hover:shadow-lg ${
        !isRead ? 'border-l-[6px] border-l-teal-300' : ''
      }`}
    >
      <div className="flex items-start gap-3">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-teal-500/10">
          <Users className="h-5 w-5 text-teal-400" />
        </div>

        <div className="flex-1 min-w-0">

          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="font-semibold text-sm line-clamp-1">{title}</h4>
            <span className="text-[11px] text-muted-foreground opacity-70 shrink-0">{time}</span>
          </div>

          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {subtitle}
          </p>

          <div className="flex gap-2">
            <Button size="sm" onClick={onAccept} className="h-8 text-xs font-medium flex-1">
              Accept
            </Button>
            <Button size="sm" variant="ghost" onClick={onDecline} className="h-8 text-xs font-medium">
              Decline
            </Button>
          </div>

        </div>
      </div>

      {!isRead && (
        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-teal-300 ring-2 ring-background" />
      )}
    </div>
  );
}