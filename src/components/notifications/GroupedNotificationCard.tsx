/**
 * GroupedNotificationCard Component
 * Card compacto que agrupa múltiples notificaciones del mismo tipo
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ChevronRight } from 'lucide-react';

interface GroupedNotificationCardProps {
  id: string;
  icon: React.ReactNode;
  count: number;
  title: string;
  subtitle?: string;
  time: string;
  priority?: 'urgent' | 'pending' | 'info';
  onExpand: () => void;
}

const priorityColors = {
  urgent: 'border-red-500/20 bg-red-50/30 dark:bg-red-950/10',
  pending: 'border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10',
  info: 'border-border/50 bg-card/50',
};

export function GroupedNotificationCard({
  id,
  icon,
  count,
  title,
  subtitle,
  time,
  priority = 'pending',
  onExpand,
}: GroupedNotificationCardProps) {
  return (
    <button
      onClick={onExpand}
      className={`
        w-full p-3 rounded-lg border transition-all text-left
        hover:shadow-sm active:scale-[0.98]
        ${priorityColors[priority]}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icon with count badge */}
        <div className="relative shrink-0">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
            {icon}
          </div>
          <Badge 
            className="absolute -top-1 -right-1 h-5 min-w-[20px] px-1 text-[10px] flex items-center justify-center"
            variant="destructive"
          >
            {count}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium line-clamp-1">{title}</h4>
          {subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{subtitle}</p>
          )}
        </div>

        {/* Time and arrow */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[10px] text-muted-foreground">{time}</span>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </button>
  );
}