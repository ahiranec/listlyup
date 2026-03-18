/**
 * ListingActionCard Component
 * Card for listing-related actions (draft, expiring, paused, pending, rejected)
 * 
 * Features:
 * - Status-based icon and soft background colors
 * - Status badge with soft -300 tones
 * - Flexible action buttons (1-3 CTAs)
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <ListingActionCard
 *   status="expiring"
 *   title="iPhone 14 Pro Max"
 *   subtitle="156 views · 12 favorites"
 *   badge="EXPIRES IN 3 DAYS"
 *   badgeVariant="destructive"
 *   actions={[
 *     { label: 'Renew', variant: 'default' },
 *     { label: 'Edit First', variant: 'outline' },
 *   ]}
 * />
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Package, Clock, PauseCircle, XCircle, AlertCircle, Flag } from 'lucide-react';

interface ListingActionCardProps {
  status: 'draft' | 'expiring' | 'paused' | 'pending' | 'rejected' | 'under-review' | 'reported';
  title: string;
  subtitle: string;
  badge?: string;
  badgeVariant?: 'default' | 'secondary' | 'destructive';
  actions: Array<{
    label: string;
    variant?: 'default' | 'outline' | 'ghost';
    fullWidth?: boolean;
    onClick?: () => void;
  }>;
  onAction?: (action: string) => void;
}

// Soft 2025 palette with -400/-500 tones for icons
const statusConfig = {
  draft: {
    icon: Package,
    color: 'text-amber-400 dark:text-amber-500',
    bg: 'bg-amber-50/30 dark:bg-amber-950/10',
    border: 'border-amber-300/20 dark:border-amber-900/20',
  },
  expiring: {
    icon: Clock,
    color: 'text-red-400 dark:text-red-500',
    bg: 'bg-red-50/30 dark:bg-red-950/10',
    border: 'border-red-300/20 dark:border-red-900/20',
  },
  paused: {
    icon: PauseCircle,
    color: 'text-gray-400 dark:text-gray-500',
    bg: 'bg-gray-50/30 dark:bg-gray-950/10',
    border: 'border-gray-300/20 dark:border-gray-900/20',
  },
  pending: {
    icon: Clock,
    color: 'text-blue-400 dark:text-blue-500',
    bg: 'bg-blue-50/30 dark:bg-blue-950/10',
    border: 'border-blue-300/20 dark:border-blue-900/20',
  },
  rejected: {
    icon: XCircle,
    color: 'text-red-400 dark:text-red-500',
    bg: 'bg-red-50/30 dark:bg-red-950/10',
    border: 'border-red-300/20 dark:border-red-900/20',
  },
  'under-review': {
    icon: AlertCircle,
    color: 'text-amber-400 dark:text-amber-500',
    bg: 'bg-amber-50/30 dark:bg-amber-950/10',
    border: 'border-amber-300/20 dark:border-amber-900/20',
  },
  'reported': {
    icon: Flag,
    color: 'text-red-400 dark:text-red-500',
    bg: 'bg-red-50/30 dark:bg-red-950/10',
    border: 'border-red-300/20 dark:border-red-900/20',
  },
};

export function ListingActionCard({ 
  status, 
  title, 
  subtitle, 
  badge, 
  badgeVariant = 'secondary',
  actions,
  onAction
}: ListingActionCardProps) {
  const config = statusConfig[status] || statusConfig['draft']; // Fallback to draft if status is invalid
  const Icon = config.icon;

  return (
    <div className={`p-2 rounded border ${config.bg} ${config.border} space-y-1`}>
      <div className="flex items-center gap-1.5">
        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
        {badge && (
          <Badge variant={badgeVariant} className="h-4 px-1.5 text-[9px]">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-xs font-medium line-clamp-1">{title}</p>
      <p className="text-[10px] text-muted-foreground">{subtitle}</p>
      <div className={`flex gap-1 pt-1 ${actions.length === 1 && actions[0].fullWidth ? '' : ''}`}>
        {actions.map((action, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={action.variant || 'default'}
            onClick={() => {
              if (action.onClick) action.onClick();
              if (onAction) onAction(action.label);
            }}
            className={`h-6 text-[10px] ${
              action.fullWidth ? 'w-full' : 'flex-1'
            } ${action.variant === 'ghost' ? 'px-2' : ''}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}