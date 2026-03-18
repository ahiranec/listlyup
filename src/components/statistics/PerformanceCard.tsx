/**
 * PerformanceCard Component
 * Card for smart performance suggestions and tips
 * 
 * Features:
 * - Type-based icon and soft background colors
 * - Metric display with optional subtitle
 * - Suggestion text with soft purple-400 color
 * - Flexible action buttons (1-2 CTAs)
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <PerformanceCard
 *   type="high-views-no-messages"
 *   title="MacBook Pro M1"
 *   metric="234 views · 0 messages"
 *   subtitle="Price might be high ($1,200)"
 *   suggestion="💡 Similar listings: $800-$900"
 *   badge="234 VIEWS"
 *   actions={[{ label: 'Adjust Price', variant: 'default', fullWidth: true }]}
 * />
 */

import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { TrendingDown, Eye, Camera, RefreshCw } from 'lucide-react';

interface PerformanceCardProps {
  type: 'low-views' | 'high-views-no-messages' | 'update-photos' | 'refresh-suggested';
  title: string;
  metric: string;
  subtitle?: string;
  suggestion?: string;
  badge?: string;
  actions: Array<{
    label: string;
    variant?: 'default' | 'outline' | 'ghost';
    fullWidth?: boolean;
    onClick?: () => void;
  }>;
}

// Soft 2025 palette with -400/-500 tones
const typeConfig = {
  'low-views': {
    icon: TrendingDown,
    color: 'text-purple-400 dark:text-purple-500',
    bg: 'bg-purple-50/30 dark:bg-purple-950/10',
    border: 'border-purple-300/20 dark:border-purple-900/20',
  },
  'high-views-no-messages': {
    icon: Eye,
    color: 'text-amber-400 dark:text-amber-500',
    bg: 'bg-amber-50/30 dark:bg-amber-950/10',
    border: 'border-amber-300/20 dark:border-amber-900/20',
  },
  'update-photos': {
    icon: Camera,
    color: 'text-blue-400 dark:text-blue-500',
    bg: 'bg-blue-50/30 dark:bg-blue-950/10',
    border: 'border-blue-300/20 dark:border-blue-900/20',
  },
  'refresh-suggested': {
    icon: RefreshCw,
    color: 'text-green-400 dark:text-green-500',
    bg: 'bg-green-50/30 dark:bg-green-950/10',
    border: 'border-green-300/20 dark:border-green-900/20',
  },
};

export function PerformanceCard({ 
  type, 
  title, 
  metric, 
  subtitle, 
  suggestion, 
  badge,
  actions 
}: PerformanceCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={`p-2 rounded border ${config.bg} ${config.border} space-y-1`}>
      <div className="flex items-center gap-1.5">
        <Icon className={`w-3.5 h-3.5 ${config.color}`} />
        {badge && (
          <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-xs font-medium line-clamp-1">{title}</p>
      <p className="text-[10px] text-muted-foreground">{metric}</p>
      {subtitle && (
        <p className="text-[10px] text-muted-foreground">{subtitle}</p>
      )}
      {suggestion && (
        <p className="text-[9px] text-purple-400 dark:text-purple-500">{suggestion}</p>
      )}
      <div className={`flex gap-1 pt-1`}>
        {actions.map((action, idx) => (
          <Button
            key={idx}
            size="sm"
            variant={action.variant || 'default'}
            onClick={action.onClick}
            className={`h-6 text-[10px] ${action.fullWidth ? 'w-full' : 'flex-1'}`}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
