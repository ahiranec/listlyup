/**
 * NotificationSection Component
 * Collapsible section for grouping notifications by priority
 * Includes section-level actions: "Mark all as read" and "Clear section"
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCheck, Trash2 } from 'lucide-react';
import { Badge } from '../ui/badge';

interface NotificationSectionProps {
  id: string;
  title: string;
  emoji: string;
  count: number;
  isOpen?: boolean;
  priority: 'urgent' | 'pending' | 'info';
  children: React.ReactNode;
  onMarkAllRead?: () => void;
  onClearSection?: () => void;
}

const priorityColors = {
  urgent: 'bg-red-50/40 dark:bg-red-950/10 border-red-200/30 dark:border-red-900/20',
  pending: 'bg-amber-50/40 dark:bg-amber-950/10 border-amber-200/30 dark:border-amber-900/20',
  info: 'bg-muted/20 border-border/30',
};

const priorityBadgeColors = {
  urgent: 'bg-red-500 text-white',
  pending: 'bg-amber-500 text-white',
  info: 'bg-muted-foreground text-white',
};

export function NotificationSection({
  id,
  title,
  emoji,
  count,
  isOpen: defaultIsOpen = true,
  priority,
  children,
  onMarkAllRead,
  onClearSection,
}: NotificationSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <div className="space-y-2">
      {/* Section Header */}
      <div className="space-y-1">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full px-3 py-2 rounded-lg border flex items-center justify-between
            transition-all hover:shadow-sm active:scale-[0.98]
            ${priorityColors[priority]}
          `}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{emoji}</span>
            <span className="text-sm font-medium uppercase tracking-wide">{title}</span>
            <Badge 
              className={`h-5 min-w-[20px] px-1.5 text-[10px] ${priorityBadgeColors[priority]}`}
            >
              {count}
            </Badge>
          </div>
          {isOpen ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Section Actions - Only shown when expanded and has actions */}
        {isOpen && (onMarkAllRead || onClearSection) && (
          <div className="flex items-center gap-2 px-3">
            {onMarkAllRead && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onMarkAllRead();
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <CheckCheck className="w-3 h-3" />
                Mark all read
              </button>
            )}
            {onClearSection && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClearSection();
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                Clear section
              </button>
            )}
          </div>
        )}
      </div>

      {/* Section Content */}
      {isOpen && (
        <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}