/**
 * NotificationCard Component
 * Card base para notificaciones con diferentes variantes
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  Eye, 
  ArrowRightLeft,
  AlertCircle,
  Package,
  Users,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { getAction } from '../../actions/registry';
import type { ActionId } from '../../actions/types';

export type NotificationPriority = 'urgent' | 'pending' | 'info';
export type NotificationType = 
  | 'trade-offer' 
  | 'question' 
  | 'sale' 
  | 'group-invite' 
  | 'message' 
  | 'listing-expiring'
  | 'milestone'
  | 'event-new-request'
  | 'event-request-approved'
  | 'event-request-rejected'
  | 'event-starting-soon'
  | 'event-cancelled';

interface NotificationCardProps {
  id: string;
  type: NotificationType;
  priority: NotificationPriority;
  icon?: React.ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  time: string;
  isRead?: boolean;
  onAction?: (actionId: string) => void;
  
  // Legacy support: array de acciones hardcoded
  actions?: Array<{
    id: string;
    label: string;
    variant?: 'default' | 'outline' | 'ghost' | 'destructive';
    icon?: React.ReactNode;
  }>;
  
  // New: IDs de acciones desde registry
  actionIds?: ActionId[];
  
  badge?: {
    label: string;
    variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  };
}

const priorityColors = {
  urgent: 'border-red-500/20 bg-red-50/30 dark:bg-red-950/10',
  pending: 'border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10',
  info: 'border-border/50 bg-card/50',
};

const typeIcons = {
  'trade-offer': <ArrowRightLeft className="w-4 h-4" />,
  'question': <HelpCircle className="w-4 h-4" />,
  'sale': <Package className="w-4 h-4" />,
  'group-invite': <Users className="w-4 h-4" />,
  'message': <MessageSquare className="w-4 h-4" />,
  'listing-expiring': <AlertCircle className="w-4 h-4" />,
  'milestone': <TrendingUp className="w-4 h-4" />,
};

export function NotificationCard({
  id,
  type,
  priority,
  icon,
  title,
  subtitle,
  description,
  time,
  isRead = false,
  onAction,
  actions = [],
  actionIds,
  badge,
}: NotificationCardProps) {
  // Si actionIds existe, usar registry; si no, usar actions legacy
  const displayActions = actionIds 
    ? actionIds.map(actionId => {
        const action = getAction(actionId);
        if (!action) return null;
        
        const Icon = action.icon;
        return {
          id: actionId,
          label: action.label,
          variant: action.variant || 'default',
          icon: <Icon className="w-4 h-4" />,
        };
      }).filter(Boolean)
    : actions;

  const cardClasses = `
    relative p-3 rounded-lg border transition-all
    ${priorityColors[priority]}
    ${isRead ? 'opacity-60' : ''}
    ${!isRead ? 'border-l-4' : ''}
  `;

  return (
    <div className={cardClasses}>
      {/* Unread indicator dot */}
      {!isRead && (
        <div className="absolute top-2 left-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
      )}

      {/* Header */}
      <div className="flex items-start gap-2 mb-2 pl-3">
        <div className="shrink-0 mt-0.5 text-muted-foreground">
          {icon || typeIcons[type]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="text-sm font-medium line-clamp-1">{title}</h4>
            <span className="text-[10px] text-muted-foreground shrink-0">{time}</span>
          </div>
          {subtitle && (
            <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="text-xs text-muted-foreground line-clamp-2 mb-2 px-3">{description}</p>
      )}

      {/* Badge */}
      {badge && (
        <div className="mb-2 px-3">
          <Badge variant={badge.variant || 'secondary'} className="text-[10px] h-5">
            {badge.label}
          </Badge>
        </div>
      )}

      {/* Actions */}
      {displayActions.length > 0 && (
        <div className="flex gap-1.5 mt-2">
          {displayActions.map((action: any) => (
            <Button
              key={action.id}
              size="sm"
              variant={action.variant || 'default'}
              className="h-7 flex-1 text-xs"
              onClick={() => onAction?.(action.id)}
            >
              {action.icon && <span className="mr-1">{action.icon}</span>}
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}