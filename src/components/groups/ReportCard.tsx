/**
 * ReportCard Component
 * Card for reports requiring review in Groups
 * 
 * Features:
 * - Priority badges with soft colors (High/Medium/Low)
 * - AlertTriangle icon with soft -400 tones
 * - Role badge
 * - Three CTAs: Review / Take Action / Dismiss
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <ReportCard
 *   type="Spam/Scam"
 *   reported="iPhone 14 listing"
 *   by="@user123"
 *   group="Tech Lovers Chile"
 *   priority="High"
 *   time="2h ago"
 *   role="Group Admin"
 * />
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { AlertTriangle } from 'lucide-react';

interface ReportCardProps {
  type: string;
  reported: string;
  by: string;
  group?: string;
  priority: 'High' | 'Medium' | 'Low';
  time: string;
  role: 'Group Admin' | 'Group Moderator' | 'Platform Admin' | 'Platform Moderator';
  onReview?: () => void;
  onTakeAction?: () => void;
  onDismiss?: () => void;
}

// Soft 2025 palette with -300/-400 tones
const priorityConfig = {
  High: { 
    badgeClass: 'bg-red-300 text-red-900 dark:bg-red-900/40 dark:text-red-200',
    iconClass: 'text-red-400 dark:text-red-500',
  },
  Medium: { 
    badgeClass: 'bg-amber-300 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200',
    iconClass: 'text-amber-400 dark:text-amber-500',
  },
  Low: { 
    badgeClass: 'bg-blue-300 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200',
    iconClass: 'text-blue-400 dark:text-blue-500',
  },
};

export function ReportCard({ type, reported, by, group, priority, time, role, onReview, onTakeAction, onDismiss }: ReportCardProps) {
  const config = priorityConfig[priority];

  return (
    <div className="p-2 rounded border bg-card border-border space-y-1">
      <div className="flex items-center gap-1.5">
        <AlertTriangle className={`w-3.5 h-3.5 ${config.iconClass}`} />
        <Badge className={`h-4 px-1.5 text-[9px] font-medium ${config.badgeClass}`}>
          {priority}
        </Badge>
        <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
          {role.replace(' ', ' ')}
        </Badge>
      </div>
      <p className="text-xs font-medium">
        {type}: {reported}
      </p>
      <p className="text-[10px] text-muted-foreground">
        Reported by: {by}
        {group && <> · Group: {group}</>}
      </p>
      <p className="text-[10px] text-muted-foreground">{time}</p>
      <div className="flex gap-1 pt-1">
        <Button 
          size="sm" 
          variant="default"
          className="h-6 flex-1 text-[10px]" 
          onClick={onReview}
        >
          Review
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          className="h-6 flex-1 text-[10px]" 
          onClick={onTakeAction}
        >
          Take Action
        </Button>
        <Button 
          size="sm" 
          variant="ghost" 
          className="h-6 px-2 text-[10px] text-muted-foreground" 
          onClick={onDismiss}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
}