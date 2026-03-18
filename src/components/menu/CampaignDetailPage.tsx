/**
 * Campaign Detail Page - FASE 1 MVP
 * Premium Design 2025
 * 
 * Shows campaign details with tabs:
 * - Active: Associated listings
 * - Rules: Eligibility criteria
 * - Pending: Approval requests (Phase 2)
 */

import { useState } from 'react';
import { ArrowLeft, MoreVertical, Calendar, Package, Plus, X, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { CampaignSettingsSheet } from '../campaigns/CampaignSettingsSheet';
import { ConfirmActionDialog } from '../action-center/ConfirmActionDialog';

interface Listing {
  id: string;
  title: string;
  price: string;
  image: string;
  status?: string;
  qualifies: boolean;
  discount?: number;
  owner: string;
  reason?: string;
}

interface CampaignDetailPageProps {
  campaignId: string;
  onBack: () => void;
  onEdit: () => void;
  onViewListing?: (listingId: string) => void;
}

export function CampaignDetailPage({ campaignId, onBack, onEdit, onViewListing }: CampaignDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'rules' | 'pending'>('active');
  const [showAddListingsSheet, setShowAddListingsSheet] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<any>(null);

  // FIX 49/50: Reactive state for active listings
  const [activeListingsData, setActiveListingsData] = useState<Listing[]>([
    {
      id: '1',
      title: 'iPhone 13 Pro',
      price: '$899',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      status: 'active',
      qualifies: true,
      discount: 20,
      owner: '@john_doe',
    },
    {
      id: '2',
      title: 'MacBook Air M2',
      price: '$1,199',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      status: 'active',
      qualifies: true,
      discount: 20,
      owner: '@seller_pro',
    },
  ]);

  // FIX 49/50: Reactive campaign stats
  const [campaignStats, setCampaignStats] = useState({
    activeListings: 24,
    pendingRequests: 3,
    totalViews: 1250,
  });

  // Mock data
  const campaign = {
    id: campaignId,
    title: 'Holiday Sale 2025',
    type: 'discount' as const,
    status: 'active' as const,
    startDate: '2025-12-15',
    endDate: '2025-12-31',
    scope: 'public' as const,
    approvalMode: 'auto' as 'auto' | 'manual',
    whoCanAdd: 'anyone' as const,
    discount: 20,
    stats: campaignStats,
    rules: {
      allowProducts: true,
      allowServices: false,
      categories: ['Electronics', 'Computers & Tablets'],
      discountPercentage: 20,
    },
  };

  // Mock listings in campaign - now using reactive state
  const activeListings = activeListingsData;

  // Mock user's listings available to add
  const myListings: Listing[] = [
    {
      id: '3',
      title: 'iPad Pro 11"',
      price: '$849',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      status: 'active',
      qualifies: true,
      discount: 20,
      owner: '@current_user',
    },
    {
      id: '4',
      title: 'AirPods Max',
      price: '$549',
      image: 'https://images.unsplash.com/photo-1625082994248-09347a0fdade?w=400',
      status: 'active',
      qualifies: false,
      reason: 'No discount applied',
      owner: '@current_user',
    },
    {
      id: '5',
      title: 'Office Chair',
      price: '$199',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
      status: 'active',
      qualifies: false,
      reason: 'Wrong category (Furniture)',
      owner: '@current_user',
    },
  ];

  const [selectedListings, setSelectedListings] = useState<string[]>([]);

  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return `${startDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })} - ${endDate.toLocaleDateString('en', { month: 'short', day: 'numeric' })}`;
  };

  // FIX 49: Remove listing with reactive update
  const handleRemoveListing = (listingId: string) => {
    // Remove from active listings
    setActiveListingsData(prev => prev.filter(l => l.id !== listingId));
    
    // Update counter
    setCampaignStats(prev => ({
      ...prev,
      activeListings: prev.activeListings - 1,
    }));
    
    toast.success('Listing removed from campaign');
  };

  // FIX 50: Add listings with reactive update
  const handleAddSelectedListings = () => {
    if (selectedListings.length === 0) {
      toast.error('Please select at least one listing');
      return;
    }

    // Get selected listings data
    const listingsToAdd = myListings.filter(l => selectedListings.includes(l.id));
    
    // Append to active listings
    setActiveListingsData(prev => [...prev, ...listingsToAdd]);
    
    // Update counter
    setCampaignStats(prev => ({
      ...prev,
      activeListings: prev.activeListings + selectedListings.length,
    }));

    if (campaign.approvalMode === 'auto') {
      toast.success(`${selectedListings.length} listing(s) added to campaign`);
    } else {
      toast.success(`${selectedListings.length} listing(s) submitted for approval`);
    }

    setSelectedListings([]);
    setShowAddListingsSheet(false);
  };

  const toggleListingSelection = (listingId: string, qualifies: boolean) => {
    if (!qualifies) return;

    setSelectedListings(prev => 
      prev.includes(listingId) 
        ? prev.filter(id => id !== listingId)
        : [...prev, listingId]
    );
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
          
          <h1 className="font-semibold truncate flex-1 mx-3 text-center">
            {campaign.title}
          </h1>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettingsSheet(true)}
            className="h-9 w-9 p-0"
          >
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>

        {/* Summary Strip */}
        <div className="px-4 py-3 bg-gradient-to-br from-primary/5 to-primary/10 border-b border-primary/20">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span>🏷️ Discount</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-semibold text-primary">-{campaign.discount}%</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{formatDateRange(campaign.startDate, campaign.endDate)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
            <span>🌍 {campaign.scope}</span>
            <span>•</span>
            <span>{campaign.approvalMode === 'auto' ? '✅ Auto-approve' : '👤 Manual'}</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="px-4 py-3 bg-white border-b border-border">
          <div className="flex items-center justify-around text-center">
            <div>
              <p className="text-xl font-bold text-primary">{campaign.stats.activeListings}</p>
              <p className="text-xs text-muted-foreground">Active Listings</p>
            </div>
            {campaign.approvalMode === 'manual' && campaign.stats.pendingRequests > 0 && (
              <>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-xl font-bold text-amber-600">{campaign.stats.pendingRequests}</p>
                  <p className="text-xs text-muted-foreground">Pending Review</p>
                </div>
              </>
            )}
            <div className="h-8 w-px bg-border" />
            <div>
              <p className="text-xl font-bold">{campaign.stats.totalViews}</p>
              <p className="text-xs text-muted-foreground">Views</p>
            </div>
          </div>
        </div>

        {/* CTA Primary */}
        <div className="px-4 py-3 bg-background border-b border-border">
          <Button 
            onClick={() => setShowAddListingsSheet(true)}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add My Listings
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border overflow-x-auto">
          {(['active', 'rules', ...(campaign.approvalMode === 'manual' ? ['pending'] as const : [])] as const).map((tab) => (
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
              {tab === 'pending' && campaign.stats.pendingRequests > 0 && (
                <Badge variant="default" className="ml-2 h-5 px-1.5 text-xs">
                  {campaign.stats.pendingRequests}
                </Badge>
              )}
              {activeTab === tab && (
                <motion.div
                  layoutId="campaign-detail-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          ))}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* Active Tab */}
        {activeTab === 'active' && (
          <div className="p-4">
            {activeListings.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No listings yet</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Add your first listing to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground mb-3">
                  {activeListings.length} listing{activeListings.length !== 1 ? 's' : ''} in campaign
                </p>
                {activeListings.map((listing) => (
                  <div
                    key={listing.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-3">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-lg font-bold text-primary">{listing.price}</span>
                          {listing.discount && (
                            <Badge variant="secondary" className="text-xs">
                              -{listing.discount}% off
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">by {listing.owner}</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewListing?.(listing.id)}
                        className="flex-1"
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemoveListing(listing.id)}
                        className="flex-1 text-red-600 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Rules Tab */}
        {activeTab === 'rules' && (
          <div className="p-4 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-muted-foreground">
              Eligibility Rules
            </h3>

            <div className="space-y-3">
              {/* Listing Types */}
              <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                <p className="text-sm font-medium mb-2">Allowed Listing Types</p>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <span>{campaign.rules.allowProducts ? '✅' : '❌'}</span>
                    <span className={campaign.rules.allowProducts ? '' : 'text-muted-foreground'}>
                      Products
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span>{campaign.rules.allowServices ? '✅' : '❌'}</span>
                    <span className={campaign.rules.allowServices ? '' : 'text-muted-foreground'}>
                      Services
                    </span>
                  </div>
                </div>
              </div>

              {/* Categories */}
              {campaign.rules.categories.length > 0 && (
                <div className="bg-white border-2 border-gray-200 rounded-xl p-4">
                  <p className="text-sm font-medium mb-2">Allowed Categories</p>
                  <div className="flex flex-wrap gap-2">
                    {campaign.rules.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" className="text-xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Discount */}
              {campaign.rules.discountPercentage && (
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                  <p className="text-sm font-medium text-green-900 mb-1">Required Discount</p>
                  <p className="text-2xl font-bold text-green-600">
                    -{campaign.rules.discountPercentage}%
                  </p>
                  <p className="text-xs text-green-700 mt-1">
                    Listings must apply this discount to qualify
                  </p>
                </div>
              )}

              {/* Edit Rules Button */}
              <Button
                variant="outline"
                onClick={onEdit}
                className="w-full"
              >
                Edit Rules
              </Button>
            </div>
          </div>
        )}

        {/* Pending Tab */}
        {activeTab === 'pending' && campaign.approvalMode === 'manual' && (
          <div className="p-4">
            {campaign.stats.pendingRequests > 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  {campaign.stats.pendingRequests} listing{campaign.stats.pendingRequests !== 1 ? 's' : ''} awaiting review
                </p>
                
                {/* Mock pending requests */}
                {[
                  {
                    id: 'p1',
                    listing: 'iPad Pro 11"',
                    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
                    requestedBy: '@maria_tech',
                    time: '2h ago',
                    qualifies: true,
                  },
                  {
                    id: 'p2',
                    listing: 'AirPods Max',
                    image: 'https://images.unsplash.com/photo-1625082994248-09347a0fdade?w=400',
                    requestedBy: '@audio_lover',
                    time: '5h ago',
                    qualifies: false,
                    reason: 'No discount applied',
                  },
                ].map((req) => (
                  <div
                    key={req.id}
                    className="bg-white border-2 border-gray-200 rounded-xl p-3 hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-3 mb-3">
                      <img
                        src={req.image}
                        alt={req.listing}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">{req.listing}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          by {req.requestedBy} • {req.time}
                        </p>
                        {req.qualifies ? (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-green-600 font-medium">✅ Qualifies</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-xs text-red-600 font-medium">❌ {req.reason}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onViewListing?.(req.id)}
                        className="flex-1"
                      >
                        View
                      </Button>
                      {req.qualifies ? (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toast.success('Listing rejected')}
                            className="flex-1 text-red-600 hover:text-red-700"
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => toast.success(`✅ ${req.listing} approved`)}
                            className="flex-1"
                          >
                            Approve
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toast.success('Listing rejected')}
                          className="flex-1"
                        >
                          Reject
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-green-100 flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
                <p className="text-sm font-medium">No pending requests</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All listings have been reviewed
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Add Listings Sheet */}
      <Sheet open={showAddListingsSheet} onOpenChange={setShowAddListingsSheet}>
        <SheetContent
          side="bottom"
          className="h-[80vh] max-w-[480px] mx-auto p-0 rounded-t-3xl"
        >
          <SheetTitle className="sr-only">Add Listings to Campaign</SheetTitle>
          <SheetDescription className="sr-only">
            Select which of your listings to add to this campaign
          </SheetDescription>

          {/* Header */}
          <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Add Your Listings</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddListingsSheet(false)}
                className="h-8 w-8 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedListings.length} selected
            </p>
          </div>

          {/* Content */}
          <div className="overflow-auto h-[calc(100%-140px)] px-4 py-4 space-y-3">
            {myListings.length === 0 ? (
              <div className="text-center py-16">
                <Package className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No listings available</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Create a listing first
                </p>
              </div>
            ) : (
              myListings.map((listing) => (
                <button
                  key={listing.id}
                  onClick={() => toggleListingSelection(listing.id, listing.qualifies)}
                  disabled={!listing.qualifies}
                  className={`w-full bg-white border-2 rounded-xl p-3 text-left transition-all ${
                    !listing.qualifies
                      ? 'border-gray-200 opacity-50 cursor-not-allowed'
                      : selectedListings.includes(listing.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-primary/30'
                  }`}
                >
                  <div className="flex gap-3">
                    <div className="relative">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      {selectedListings.includes(listing.id) && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate">{listing.title}</h3>
                      <p className="text-sm text-primary font-semibold mt-1">{listing.price}</p>
                      {listing.qualifies ? (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-green-600">✅ Qualifies</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 mt-1">
                          <span className="text-xs text-red-600">❌ {listing.reason}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-background border-t border-border p-4">
            <Button
              onClick={handleAddSelectedListings}
              disabled={selectedListings.length === 0}
              className="w-full"
            >
              {campaign.approvalMode === 'auto' 
                ? `Add ${selectedListings.length || ''} Listing${selectedListings.length !== 1 ? 's' : ''}`
                : `Submit ${selectedListings.length || ''} for Approval`
              }
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Campaign Settings Sheet */}
      <CampaignSettingsSheet
        isOpen={showSettingsSheet}
        onClose={() => setShowSettingsSheet(false)}
        campaign={campaign}
        onEdit={() => {
          setShowSettingsSheet(false);
          onEdit();
        }}
        onPause={() => {
          toast.success('Campaign paused');
        }}
        onResume={() => {
          toast.success('Campaign resumed');
        }}
        onDelete={() => {
          toast.success('Campaign deleted');
          onBack();
        }}
        onDuplicate={() => {
          toast.success('Campaign duplicated as draft');
        }}
      />

      {/* Confirm Action Dialog */}
      <ConfirmActionDialog
        open={confirmDialogOpen}
        onOpenChange={setConfirmDialogOpen}
        data={confirmDialogData}
      />
    </div>
  );
}

export default CampaignDetailPage;