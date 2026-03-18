import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Eye, MessageCircle, Heart, Users } from 'lucide-react';
import type { Product } from '../../data/products';

interface ListingStatsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: Product;
}

/**
 * ListingStatsModal - Stats dedicado para un listing individual
 * Scope: SOLO el listing actual
 * MVP-ALIGNED: Views, Messages, Favorites, Shares only
 */
export function ListingStatsModal({ open, onOpenChange, listing }: ListingStatsModalProps) {
  // Mock stats - En producción vendría del backend
  const stats = {
    views: listing.stats?.views || 127,
    messages: listing.stats?.messages || 8,
    favorites: listing.stats?.favorites || 23,
    shares: listing.stats?.shares || 5,
  };

  const statCards = [
    {
      label: 'Total Views',
      value: stats.views,
      icon: Eye,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Messages',
      value: stats.messages,
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Favorites',
      value: stats.favorites,
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
    },
    {
      label: 'Shares',
      value: stats.shares,
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Listing Stats</DialogTitle>
          <DialogDescription>
            Performance metrics for "{listing.title}"
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className={`${stat.bgColor} rounded-lg p-4 flex flex-col items-center justify-center text-center`}
              >
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className="font-semibold text-lg">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground">
            Stats are updated in real-time and help you understand how your listing is performing.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}