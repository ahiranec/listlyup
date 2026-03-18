/**
 * Event Hub Detail Page
 * Premium Design 2025
 * Parity with CampaignDetailPage
 * 
 * Shows event hub details with tabs:
 * - Listings: Associated products/services
 * - Rules: Hub rules and eligibility
 * - Requests: Pending approvals (if approval required)
 */

import { useState } from 'react';
import { ArrowLeft, MoreVertical, Calendar, MapPin, Package, Plus, Eye, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { EventHubSettingsSheet } from '../events/EventHubSettingsSheet';
import { RequestCard } from '../shared/RequestCard';
import { ConfirmActionDialog } from '../action-center/ConfirmActionDialog';

interface Listing {
  id: string;
  title: string;
  image: string;
  addedBy?: string;
  addedTime?: string;
  qualifies?: boolean;
  reason?: string;
}

interface EventHubDetailPageProps {
  eventHubId: string;
  onBack: () => void;
  onEdit: () => void;
  onViewFlyer?: (flyerId: string) => void;
  onViewListing?: (listingId: string) => void;
}

export function EventHubDetailPage({ 
  eventHubId, 
  onBack, 
  onEdit, 
  onViewFlyer,
  onViewListing 
}: EventHubDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'listings' | 'rules' | 'requests'>('listings');
  const [showAddListingsSheet, setShowAddListingsSheet] = useState(false);
  const [showSettingsSheet, setShowSettingsSheet] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<any>(null);

  // FIX 51/52: Reactive state for listings
  const [listingsData, setListingsData] = useState<Listing[]>([
    {
      id: 'product-carlos-1', // ✅ PHASE 2.2: Changed from 'list-1' to valid mockProducts ID
      title: 'iPhone 14 Pro',
      image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400',
      addedBy: '@maria_tech',
      addedTime: '2d ago',
    },
    {
      id: '24', // ✅ PHASE 2.2: Changed from 'list-2' to valid mockProducts ID
      title: 'MacBook Pro M2',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      addedBy: '@carlos_dev',
      addedTime: '3d ago',
    },
  ]);

  // FIX 51/52: Reactive event stats
  const [eventStats, setEventStats] = useState({
    totalListings: 12,
    pendingRequests: 2,
  });

  // Mock data
  const eventHub = {
    id: eventHubId,
    title: 'Tech Meetup Santiago - Dec 2025',
    flyerId: 'flyer-event-1',
    flyerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
    eventDate: '2025-12-25',
    eventTime: '18:00',
    location: 'Santiago, RM',
    ticketType: 'free' as const,
    status: 'active' as const,
    visibility: 'public' as const,
    requireApproval: true,
    stats: eventStats,
    rules: {
      allowProducts: true,
      allowServices: true,
      allowedContributors: 'anyone' as const,
    },
  };

  // Mock listings - now using reactive state
  const mockListings = listingsData;

  // Mock pending requests
  const mockPendingRequests = [
    {
      id: '26', // ✅ PHASE 2.2: Changed from 'req-1' to valid mockProducts ID (iPad Pro 11")
      listing: 'iPad Pro 11\"',
      listingImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400',
      requestedBy: '@ana_tech',
      time: '1h ago',
      qualifies: true,
    },
    {
      id: '3', // ✅ PHASE 2.2: Changed from 'req-2' to valid mockProducts ID (Wireless Headphones)
      listing: 'Gaming Headset',
      listingImage: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=400',
      requestedBy: '@gamer_pro',
      time: '3h ago',
      qualifies: false,
      reason: 'Not related to tech meetup theme',
    },
  ];

  // Mock my listings for "Add My Listings" sheet
  const mockMyListings = [
    {
      id: 'my-1',
      title: 'Laptop Stand',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      qualifies: true,
    },
    {
      id: 'my-2',
      title: 'Office Chair',
      image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400',
      qualifies: false,
      reason: 'Not in allowed categories',
    },
  ];

  // FIX 51: Remove listing with reactive update
  const handleRemoveListing = (listingId: string, listingTitle: string) => {
    setConfirmDialogData({
      variant: 'warning' as const,
      icon: 'alert' as const,
      title: 'Remove Listing from Event?',
      description: 'The listing will be removed from this event hub',
      details: [
        { label: 'Listing', value: listingTitle },
        { label: 'Event', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The listing will be removed from this event hub',
          'The listing will remain active on your profile',
          'The owner will be notified',
        ],
      },
      confirmLabel: 'Remove',
      onConfirm: () => {
        // Remove from listings
        setListingsData(prev => prev.filter(l => l.id !== listingId));
        
        // Update counter
        setEventStats(prev => ({
          ...prev,
          totalListings: prev.totalListings - 1,
        }));
        
        toast.success('Listing removed from event');
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleApproveRequest = (requestId: string, listing: string, requestedBy: string) => {
    setConfirmDialogData({
      variant: 'success' as const,
      icon: 'check' as const,
      title: 'Approve Listing Request?',
      description: 'The listing will be added to your event hub',
      details: [
        { label: 'Listing', value: listing },
        { label: 'Requested by', value: requestedBy },
        { label: 'Event', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The listing will be added to the event hub',
          'The owner will be notified',
          'The listing will appear in the event listings',
        ],
      },
      confirmLabel: 'Approve',
      onConfirm: () => {
        toast.success(`✅ Listing approved`);
        // TODO: Backend - Approve request
      },
    });
    setConfirmDialogOpen(true);
  };

  const handleRejectRequest = (requestId: string, listing: string, requestedBy: string) => {
    setConfirmDialogData({
      variant: 'destructive' as const,
      icon: 'x' as const,
      title: 'Reject Listing Request?',
      description: 'The listing will not be added to your event hub',
      details: [
        { label: 'Listing', value: listing },
        { label: 'Requested by', value: requestedBy },
        { label: 'Event', value: eventHub.title },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The request will be declined',
          'The owner will be notified',
          'They can resubmit after making changes',
        ],
      },
      confirmLabel: 'Reject',
      onConfirm: () => {
        toast.success('Request rejected');
        // TODO: Backend - Reject request
      },
    });
    setConfirmDialogOpen(true);
  };

  // FIX 52: Add listing with reactive update
  const handleAddMyListings = (listingId: string) => {
    // Get listing data
    const listingToAdd = mockMyListings.find(l => l.id === listingId);
    if (!listingToAdd) return;
    
    // Append to listings (with basic data)
    setListingsData(prev => [...prev, {
      id: listingToAdd.id,
      title: listingToAdd.title,
      image: listingToAdd.image,
      addedBy: '@current_user',
      addedTime: 'Just now',
    }]);
    
    // Update counter
    setEventStats(prev => ({
      ...prev,
      totalListings: prev.totalListings + 1,
    }));
    
    toast.success('Listing added to event hub');
    setShowAddListingsSheet(false);
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
            Event Hub
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

        {/* Tabs */}
        <div className="flex border-b border-border">
          <button
            onClick={() => setActiveTab('listings')}
            className={`flex-1 relative px-4 py-3 text-sm transition-colors ${
              activeTab === 'listings'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Listings
            {activeTab === 'listings' && (
              <motion.div
                layoutId="event-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('rules')}
            className={`flex-1 relative px-4 py-3 text-sm transition-colors ${
              activeTab === 'rules'
                ? 'text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Rules
            {activeTab === 'rules' && (
              <motion.div
                layoutId="event-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>

          {eventHub.requireApproval && (
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 relative px-4 py-3 text-sm transition-colors ${
                activeTab === 'requests'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                Requests
                {eventHub.stats.pendingRequests > 0 && (
                  <Badge variant="default" className="h-4 px-1.5 text-[9px]">
                    {eventHub.stats.pendingRequests}
                  </Badge>
                )}
              </span>
              {activeTab === 'requests' && (
                <motion.div
                  layoutId="event-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {/* Event Header Card */}
        <div className="p-4">
          <div 
            className="bg-card border border-border rounded-xl overflow-hidden cursor-pointer hover:border-primary transition-colors"
            onClick={() => onViewFlyer?.(eventHub.flyerId)}
          >
            <img
              src={eventHub.flyerImage}
              alt={eventHub.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-3 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-medium text-sm flex-1">{eventHub.title}</h2>
                <Badge variant={eventHub.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                  {eventHub.status === 'active' && '🔴 Live'}
                  {eventHub.status === 'upcoming' && '📅 Upcoming'}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {new Date(eventHub.eventDate).toLocaleDateString('en', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric',
                    })} · {eventHub.eventTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MapPin className="w-3 h-3" />
                  <span>{eventHub.location}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Package className="w-3 h-3" />
                  <span>{eventHub.stats.totalListings} listings</span>
                </div>
              </div>

              <div className="pt-1">
                <button className="text-xs text-primary hover:underline flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  View Event Flyer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add My Listings Button */}
        <div className="px-4 pb-4">
          <Button
            onClick={() => setShowAddListingsSheet(true)}
            className="w-full"
            variant="outline"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add My Listings
          </Button>
        </div>

        {/* Tabs Content */}
        <div className="px-4 pb-6">
          {/* Listings Tab */}
          {activeTab === 'listings' && (
            <div className="space-y-3">
              {mockListings.length > 0 ? (
                mockListings.map((listing) => (
                  <div key={listing.id} className="bg-card border border-border rounded-xl p-3">
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{listing.title}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Added by {listing.addedBy} · {listing.addedTime}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onViewListing?.(listing.id)}
                        className="flex-1 h-9"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleRemoveListing(listing.id, listing.title)}
                        className="h-9 px-3"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="text-4xl mb-3">📦</div>
                  <h3 className="font-medium mb-1">No Listings Yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Add your listings to this event hub
                  </p>
                  <Button onClick={() => setShowAddListingsSheet(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add My Listings
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-xl p-4 space-y-3">
                <h3 className="font-medium text-sm">Event Hub Rules</h3>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground mt-2" />
                    <div>
                      <span className="text-muted-foreground">Visibility:</span>{' '}
                      <span className="capitalize">{eventHub.visibility}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground mt-2" />
                    <div>
                      <span className="text-muted-foreground">Who can add listings:</span>{' '}
                      <span className="capitalize">{eventHub.rules.allowedContributors}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground mt-2" />
                    <div>
                      <span className="text-muted-foreground">Allowed types:</span>{' '}
                      <span>
                        {[
                          eventHub.rules.allowProducts && 'Products',
                          eventHub.rules.allowServices && 'Services',
                        ].filter(Boolean).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <div className="w-1 h-1 rounded-full bg-foreground mt-2" />
                    <div>
                      <span className="text-muted-foreground">Approval required:</span>{' '}
                      <span>{eventHub.requireApproval ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Requests Tab */}
          {activeTab === 'requests' && eventHub.requireApproval && (
            <div className="space-y-3">
              {mockPendingRequests.length > 0 ? (
                mockPendingRequests.map((req) => (
                  <RequestCard
                    key={req.id}
                    context="event"
                    listing={req.listing}
                    listingImage={req.listingImage}
                    requestedBy={req.requestedBy}
                    containerTitle={eventHub.title}
                    time={req.time}
                    qualifies={req.qualifies}
                    reason={req.reason}
                    onApprove={() => handleApproveRequest(req.id, req.listing, req.requestedBy)}
                    onReject={() => handleRejectRequest(req.id, req.listing, req.requestedBy)}
                    onView={() => onViewListing?.(req.id)}
                  />
                ))
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-medium mb-1">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">
                    No pending requests at the moment
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Add My Listings Sheet */}
      <Sheet open={showAddListingsSheet} onOpenChange={setShowAddListingsSheet}>
        <SheetContent
          side="bottom"
          className="max-w-[480px] mx-auto rounded-t-3xl p-0 max-h-[80vh]"
        >
          <SheetTitle className="sr-only">Add My Listings</SheetTitle>
          <SheetDescription className="sr-only">
            Select listings to add to this event hub
          </SheetDescription>

          <div className="sticky top-0 z-10 bg-background border-b border-border p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Add My Listings</h2>
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
              Select listings to add to this event
            </p>
          </div>

          <div className="p-4 space-y-3 overflow-auto">
            {mockMyListings.map((listing) => (
              <div 
                key={listing.id} 
                className={`bg-card border border-border rounded-xl p-3 ${
                  !listing.qualifies ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{listing.title}</h4>
                    {listing.qualifies ? (
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        ✓ Qualifies
                      </p>
                    ) : (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                        ✗ {listing.reason}
                      </p>
                    )}
                  </div>
                </div>
                {listing.qualifies && (
                  <Button
                    size="sm"
                    onClick={() => handleAddMyListings(listing.id)}
                    className="w-full mt-3 h-9"
                  >
                    <Plus className="w-4 h-4 mr-1.5" />
                    Add to Event
                  </Button>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Event Hub Settings Sheet */}
      <EventHubSettingsSheet
        isOpen={showSettingsSheet}
        onClose={() => setShowSettingsSheet(false)}
        eventHub={eventHub}
        onEdit={() => {
          setShowSettingsSheet(false);
          onEdit();
        }}
        onPause={() => {
          toast.success('Event Hub paused');
        }}
        onResume={() => {
          toast.success('Event Hub resumed');
        }}
        onCancel={() => {
          toast.success('Event cancelled');
        }}
        onDelete={() => {
          toast.success('Event Hub deleted');
          onBack();
        }}
        onDuplicate={() => {
          toast.success('Event Hub duplicated as draft');
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

export default EventHubDetailPage;