/**
 * Campaigns Page - Campaign Management Hub
 * Mobile-first design optimized for iPhone
 * Premium Design 2025
 * 
 * Manage promotional campaigns with tabs:
 * - Active: Currently running campaigns
 * - Scheduled: Future campaigns
 * - Drafts: Unfinished campaigns
 * - Ended: Past campaigns
 */

import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Search, Calendar, Tag, Users, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface Campaign {
  id: string;
  title: string;
  type: 'discount' | 'promotion' | 'flash-sale';
  status: 'active' | 'scheduled' | 'draft' | 'ended';
  startDate: string;
  endDate: string;
  scope: 'public' | 'groups' | 'users';
  listingsCount: number;
  requestsCount?: number;
  discount?: number; // Percentage
}

interface CampaignsPageProps {
  onBack: () => void;
  onCreateCampaign: () => void;
  onCampaignClick: (campaignId: string) => void;
}

export function CampaignsPage({ onBack, onCreateCampaign, onCampaignClick }: CampaignsPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'scheduled' | 'drafts' | 'ended'>('active');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const mockCampaigns: Campaign[] = [
    {
      id: 'camp-1',
      title: 'Holiday Sale 2025',
      type: 'flash-sale',
      status: 'active',
      startDate: '2025-12-15',
      endDate: '2025-12-31',
      scope: 'public',
      listingsCount: 24,
      requestsCount: 3,
      discount: 20,
    },
    {
      id: 'camp-2',
      title: 'Tech Community Special',
      type: 'discount',
      status: 'active',
      startDate: '2025-12-01',
      endDate: '2025-12-30',
      scope: 'groups',
      listingsCount: 12,
      requestsCount: 0,
      discount: 15,
    },
    {
      id: 'camp-3',
      title: 'New Year Promo',
      type: 'promotion',
      status: 'scheduled',
      startDate: '2026-01-01',
      endDate: '2026-01-15',
      scope: 'public',
      listingsCount: 0,
    },
    {
      id: 'camp-4',
      title: 'Black Friday Draft',
      type: 'flash-sale',
      status: 'draft',
      startDate: '2025-11-29',
      endDate: '2025-11-29',
      scope: 'public',
      listingsCount: 0,
      discount: 30,
    },
    {
      id: 'camp-5',
      title: 'Summer Clearance',
      type: 'discount',
      status: 'ended',
      startDate: '2025-03-01',
      endDate: '2025-03-31',
      scope: 'public',
      listingsCount: 45,
      discount: 25,
    },
  ];

  // Filter campaigns
  const filteredCampaigns = useMemo(() => {
    const filtered = mockCampaigns.filter(campaign => {
      // Tab filter
      if (campaign.status !== activeTab) return false;

      // Search filter
      if (searchQuery && !campaign.title.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      return true;
    });

    return filtered;
  }, [activeTab, searchQuery]);

  const getTypeConfig = (type: Campaign['type']) => {
    const config = {
      'discount': { emoji: '💰', label: 'Discount', color: 'text-green-600' },
      'promotion': { emoji: '🎯', label: 'Promotion', color: 'text-blue-600' },
      'flash-sale': { emoji: '⚡', label: 'Flash Sale', color: 'text-orange-600' },
    };
    return config[type];
  };

  const getScopeIcon = (scope: Campaign['scope']) => {
    if (scope === 'public') return '🌍';
    if (scope === 'groups') return '👥';
    return '👤';
  };

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const sameMonth = startDate.getMonth() === endDate.getMonth();
    
    if (sameMonth) {
      return `${startDate.getDate()}-${endDate.getDate()} ${startDate.toLocaleDateString('en', { month: 'short' })}`;
    }
    
    return `${startDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[1024px] mx-auto">
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
          
          <h1 className="font-semibold">Campaigns</h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onCreateCampaign}
            className="h-9 w-9 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          >
            <Plus className="w-5 h-5" />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {(['active', 'scheduled', 'drafts', 'ended'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors relative whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {activeTab === tab && (
                <motion.div
                  layoutId="campaign-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Search Bar */}
      <div className="p-4 border-b border-border bg-background sticky top-[113px] z-40">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search campaigns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 space-y-3"
          >
            {filteredCampaigns.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <Tag className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {searchQuery ? 'No campaigns found' : `No ${activeTab} campaigns`}
                </p>
                {activeTab === 'active' && !searchQuery && (
                  <Button onClick={onCreateCampaign} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Campaign
                  </Button>
                )}
              </div>
            ) : (
              filteredCampaigns.map((campaign, index) => (
                <motion.button
                  key={campaign.id}
                  onClick={() => onCampaignClick(campaign.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full bg-white border-2 border-gray-200 rounded-xl p-4 hover:border-primary/30 hover:shadow-md transition-all text-left"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-3">
                    {/* Type Icon */}
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                      <span className="text-xl">{getTypeConfig(campaign.type).emoji}</span>
                    </div>

                    {/* Title + Type */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm mb-1 truncate">
                        {campaign.title}
                      </h3>
                      <Badge variant="secondary" className="text-xs h-5 px-2">
                        {getTypeConfig(campaign.type).label}
                      </Badge>
                    </div>

                    {/* Discount Badge */}
                    {campaign.discount && (
                      <div className="text-right shrink-0">
                        <p className="text-lg font-bold text-primary">-{campaign.discount}%</p>
                      </div>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDateRange(campaign.startDate, campaign.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{getScopeIcon(campaign.scope)}</span>
                      <span className="capitalize">{campaign.scope}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="text-muted-foreground">
                        📦 {campaign.listingsCount} listings
                      </span>
                      {campaign.requestsCount !== undefined && campaign.requestsCount > 0 && (
                        <Badge variant="secondary" className="h-5 px-2 text-xs">
                          {campaign.requestsCount} pending
                        </Badge>
                      )}
                    </div>
                    {campaign.status === 'active' && (
                      <div className="flex items-center gap-1 text-xs text-green-600">
                        <div className="w-2 h-2 rounded-full bg-green-600 animate-pulse" />
                        Live
                      </div>
                    )}
                  </div>
                </motion.button>
              ))
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default CampaignsPage;