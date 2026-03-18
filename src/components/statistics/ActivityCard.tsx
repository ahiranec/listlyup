/**
 * ActivityCard Component
 * Card for passive activity notifications (favorites, shares, profile views)
 * 
 * Features:
 * - Type-based icon with soft -400 colors
 * - Count display with descriptive label
 * - Optional listing reference
 * - Single ghost CTA for viewing details
 * - Premium 2025 design with soft tones
 * 
 * @example
 * <ActivityCard
 *   type="favorites"
 *   count={5}
 *   listing="Vintage Camera"
 *   time="12h ago"
 * />
 */

import { Button } from '../ui/button';
import { Heart, Share2, Eye } from 'lucide-react';

interface ActivityCardProps {
  type: 'favorites' | 'shares' | 'profile-views';
  count: number;
  listing?: string;
  time: string;
  onClick?: () => void; // ✅ PHASE 3.5: Add optional onClick handler
}

// Soft 2025 palette with -400/-500 tones
const typeConfig = {
  favorites: {
    icon: Heart,
    color: 'text-red-400 dark:text-red-500',
    label: 'new favorites',
    action: 'View Users',
  },
  shares: {
    icon: Share2,
    color: 'text-blue-400 dark:text-blue-500',
    label: 'shares',
    action: 'View Activity',
  },
  'profile-views': {
    icon: Eye,
    color: 'text-purple-400 dark:text-purple-500',
    label: 'profile views',
    action: 'View Details',
  },
};

export function ActivityCard({ type, count, listing, time, onClick }: ActivityCardProps) {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className="p-2 rounded border bg-card border-border space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Icon className={`w-3.5 h-3.5 ${config.color}`} />
          <span className="text-xs font-medium">
            {count} {config.label}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      {listing && (
        <p className="text-[10px] text-muted-foreground truncate">
          On: {listing}
        </p>
      )}
      <Button size="sm" variant="ghost" className="h-6 w-full text-[10px]" onClick={onClick}>
        {config.action}
      </Button>
    </div>
  );
}