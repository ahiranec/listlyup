/**
 * Statistics Page - MVP Compliant
 * Mobile-first design optimized for iPhone
 * Clean, simple, user-level aggregate statistics
 */

import { useState } from 'react';
import { ArrowLeft, ChevronRight, TrendingUp, Eye, Heart, Package, Share2, TrendingDown, Camera, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { PerformanceCard } from './statistics/PerformanceCard';
import { ActivityCard } from './statistics/ActivityCard';

interface StatisticsPageProps {
  onBack: () => void;
  user?: {
    id: string;
    name: string;
    email: string;
    plan: 'Free' | 'Plus' | 'Pro';
  };
}

export function StatisticsPage({ onBack }: StatisticsPageProps) {
  const [expandedPerformanceTips, setExpandedPerformanceTips] = useState(false);
  const [expandedActivityHistory, setExpandedActivityHistory] = useState(false);

  // Mock stats - MVP compliant (user-level aggregates)
  const quickStats = {
    activeListings: 12,
    totalViews: 455,
    favorites: 84,
    shares: 28,
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="h-9 w-9 p-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">Statistics</h1>
          
          <div className="w-9" />
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        <div className="px-4 space-y-0">
          {/* Quick Stats - Always Visible */}
          <div className="pt-3 pb-2">
            <p className="text-xs text-muted-foreground mb-2.5">Quick Stats (Last 7d)</p>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Active Listings */}
              <div className="p-2.5 rounded-lg border border-border bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Package className="w-3.5 h-3.5 text-blue-600" />
                  <span className="text-[10px] text-muted-foreground">Active</span>
                </div>
                <p className="text-xl font-semibold text-blue-600">{quickStats.activeListings}</p>
                <p className="text-[9px] text-muted-foreground">Listings</p>
              </div>

              {/* Total Views */}
              <div className="p-2.5 rounded-lg border border-border bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/20 dark:to-purple-900/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye className="w-3.5 h-3.5 text-purple-600" />
                  <span className="text-[10px] text-muted-foreground">Views</span>
                </div>
                <p className="text-xl font-semibold text-purple-600">{quickStats.totalViews}</p>
                <p className="text-[9px] text-muted-foreground">Total views</p>
              </div>

              {/* Favorites */}
              <div className="p-2.5 rounded-lg border border-border bg-gradient-to-br from-pink-50 to-pink-100/50 dark:from-pink-950/20 dark:to-pink-900/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Heart className="w-3.5 h-3.5 text-pink-600" />
                  <span className="text-[10px] text-muted-foreground">Favorites</span>
                </div>
                <p className="text-xl font-semibold text-pink-600">{quickStats.favorites}</p>
                <p className="text-[9px] text-muted-foreground">Saved by users</p>
              </div>

              {/* Shares */}
              <div className="p-2.5 rounded-lg border border-border bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Share2 className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-[10px] text-muted-foreground">Shares</span>
                </div>
                <p className="text-xl font-semibold text-green-600">{quickStats.shares}</p>
                <p className="text-[9px] text-muted-foreground">Total shares</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Performance Tips - Collapsible */}
          <div>
            <button
              onClick={() => setExpandedPerformanceTips(!expandedPerformanceTips)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Performance Tips</span>
                <Badge variant="secondary" className="text-[9px] h-4 px-1.5">
                  2
                </Badge>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedPerformanceTips ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedPerformanceTips && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2">
                    <p className="text-[10px] text-muted-foreground">
                      Smart suggestions to improve your listing performance
                    </p>

                    <PerformanceCard
                      type="low-views"
                      title="Vintage Camera"
                      metric="8 views in 3 days"
                      suggestion="💡 Add 2-3 more photos to increase interest"
                      badge="LOW ENGAGEMENT"
                      actions={[
                        { label: 'Boost Listing', variant: 'default', fullWidth: false, onClick: () => toast.info('Coming soon') },
                        { label: 'View Tips', variant: 'outline', fullWidth: false, onClick: () => toast.info('Coming soon') },
                      ]}
                    />

                    <PerformanceCard
                      type="high-views-no-messages"
                      title="MacBook Pro M1"
                      metric="234 views · 0 messages"
                      subtitle="Price might be high ($1,200)"
                      suggestion="💡 Similar listings: $800-$900"
                      badge="234 VIEWS"
                      actions={[
                        { label: 'Adjust Price', variant: 'default', fullWidth: true, onClick: () => toast.info('Coming soon') },
                      ]}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Activity History - Collapsible */}
          <div>
            <button
              onClick={() => setExpandedActivityHistory(!expandedActivityHistory)}
              className="w-full flex items-center justify-between py-2 text-left"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs font-semibold text-foreground">Activity History</span>
                <Badge variant="secondary" className="text-[9px] h-4 px-1.5">
                  3
                </Badge>
              </div>
              <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedActivityHistory ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {expandedActivityHistory && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-2 pb-2">
                    <p className="text-[10px] text-muted-foreground">
                      Recent activity on your listings
                    </p>

                    {/* MVP TODO: Connect Activity History to shared Action Center event log */}
                    <ActivityCard
                      type="favorites"
                      count={5}
                      listing="Vintage Camera"
                      time="12h ago"
                      onClick={() => toast.info('Coming soon')}
                    />

                    <ActivityCard
                      type="shares"
                      count={3}
                      listing="Gaming Laptop"
                      time="1d ago"
                      onClick={() => toast.info('Coming soon')}
                    />

                    <ActivityCard
                      type="profile-views"
                      count={12}
                      time="2d ago"
                      onClick={() => toast.info('Coming soon')}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Advanced Analytics - Coming Soon */}
          <div>
            <div className="flex items-center gap-2 py-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs font-semibold text-foreground">Advanced Analytics</span>
              <Badge variant="secondary" className="text-[9px] h-4 px-1.5">
                Coming Soon
              </Badge>
            </div>
            
            <div className="pb-2">
              <div className="p-3 rounded-lg border border-border bg-muted/20 text-center">
                <p className="text-[10px] text-muted-foreground">
                  Advanced analytics features coming in future updates
                </p>
              </div>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-3" />
        </div>
      </main>
    </div>
  );
}

export default StatisticsPage;
