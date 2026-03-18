/**
NotificationsPage Component - Redesigned
Chronological alert inbox with quick CTAs (NOT a task manager)

Architecture:
- Collapsible sections: URGENT (expanded), PENDING (expanded), TODAY (collapsed), THIS WEEK (collapsed)
- 6 compact alert card types with max 1 primary CTA (2 for Accept/Reject only)
- Section-level actions: "Mark all as read" and "Clear section"
- Priority counters in header + filter sheet
- Links to child views (H-A: Details, H-C: Actions)

Premium Design 2025 · ListlyUp
 */

import { useState, useMemo } from 'react';
import { ArrowLeft, Filter, MoreVertical, CheckCheck } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';
import { NotificationSection } from './NotificationSection';
import { mockNotifications, type Notification } from '../../data/notifications';
import { NotificationsFilterSheet, type NotificationFilters } from './NotificationsFilterSheet';
import { ReplySheet } from '../ReplySheet';
import { useGlobalActionModal } from '../global-action-modal'; // ✅ P2: GAM for group invites

// Compact Alert Cards
import { TradeOfferAlertCardCompact } from './compact-cards/TradeOfferAlertCardCompact';
import { QuestionAlertCardCompact } from './compact-cards/QuestionAlertCardCompact';
import { MessageAlertCardCompact } from './compact-cards/MessageAlertCardCompact';
import { ListingLifecycleAlertCardCompact } from './compact-cards/ListingLifecycleAlertCardCompact';
import { GroupInviteAlertCardCompact } from './compact-cards/GroupInviteAlertCardCompact';
import { ReportStatusAlertCardCompact } from './compact-cards/ReportStatusAlertCardCompact';

interface NotificationsPageProps {
  onBack: () => void;
  onChatClick?: (chatId: string) => void;
  onViewProduct?: (productId: string) => void; // ✅ VD-1: Added for View Details navigation
  onViewReport?: (reportId: string) => void; // ✅ VD-1: Added for Report Details navigation
}

export function NotificationsPage({ onBack, onChatClick, onViewProduct, onViewReport }: NotificationsPageProps) {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showFilterSheet, setShowFilterSheet] = useState(false);
  const [replySheetOpen, setReplySheetOpen] = useState(false);
  const [selectedQuestionNotif, setSelectedQuestionNotif] = useState<Notification | null>(null);
  const [filters, setFilters] = useState<NotificationFilters>({
    priority: 'all',
    type: 'all',
    status: 'all',
    timeRange: 'all',
  });

  // ✅ P2: GAM dispatch for group invites
  const { dispatch } = useGlobalActionModal();

  // Apply filters
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Priority filter
    if (filters.priority !== 'all') {
      filtered = filtered.filter((n) => n.priority === filters.priority);
    }

    // Type filter
    if (filters.type !== 'all') {
      filtered = filtered.filter((n) => {
        if (filters.type === 'listing') {
          return n.type === 'listing-expiring' || n.type === 'sale';
        }
        if (filters.type === 'report') {
          return n.type === 'report-status';
        }
        return n.type === filters.type;
      });
    }

    // Status filter
    if (filters.status === 'unread') {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (filters.status === 'read') {
      filtered = filtered.filter((n) => n.isRead);
    }

    // Time range filter
    if (filters.timeRange !== 'all') {
      const now = Date.now();
      const ranges = {
        today: 86400000, // 24h
        week: 604800000, // 7 days
        month: 2592000000, // 30 days
      };
      const range = ranges[filters.timeRange];
      filtered = filtered.filter((n) => now - n.timestamp < range);
    }

    return filtered;
  }, [notifications, filters]);

  // Separate by sections (BUCKETING FIX ✅)
  const urgentNotifications = useMemo(
    () => filteredNotifications.filter((n) => n.priority === 'urgent'),
    [filteredNotifications]
  );

  const pendingNotifications = useMemo(
    () => filteredNotifications.filter((n) => n.priority === 'pending'),
    [filteredNotifications]
  );

  const todayNotifications = useMemo(
    () =>
      filteredNotifications.filter(
        (n) => n.priority === 'info' && Date.now() - n.timestamp < 86400000
      ),
    [filteredNotifications]
  );

  const weekNotifications = useMemo(
    () =>
      filteredNotifications.filter(
        (n) =>
          n.priority === 'info' &&
          Date.now() - n.timestamp >= 86400000 &&
          Date.now() - n.timestamp < 604800000
      ),
    [filteredNotifications]
  );

  // Counts
  const counts = useMemo(() => {
    const total = notifications.length;
    const unread = notifications.filter((n) => !n.isRead).length;

    const urgent = urgentNotifications.filter((n) => !n.isRead).length;
    const pending = pendingNotifications.filter((n) => !n.isRead).length;

    const info = todayNotifications.length + weekNotifications.length;

    return { total, unread, urgent, pending, info };
  }, [notifications, urgentNotifications, pendingNotifications, todayNotifications, weekNotifications]);

  // Handlers
  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleMarkSectionRead = (section: 'urgent' | 'pending' | 'today' | 'week') => {
    const sectionNotifications = {
      urgent: urgentNotifications,
      pending: pendingNotifications,
      today: todayNotifications,
      week: weekNotifications,
    }[section];

    const ids = sectionNotifications.map((n) => n.id);
    setNotifications((prev) =>
      prev.map((n) => (ids.includes(n.id) ? { ...n, isRead: true } : n))
    );
    toast.success(`${section.toUpperCase()} section marked as read`);
  };

  const handleClearSection = (section: 'urgent' | 'pending' | 'today' | 'week') => {
    const sectionNotifications = {
      urgent: urgentNotifications,
      pending: pendingNotifications,
      today: todayNotifications,
      week: weekNotifications,
    }[section];

    const ids = sectionNotifications.map((n) => n.id);
    setNotifications((prev) => prev.filter((n) => !ids.includes(n.id)));
    toast.success(`${section.toUpperCase()} section cleared`);
  };

  // Card action handlers (H-A: Details, H-C: Actions)
  const handleAcceptTradeOffer = (id: string) => {
    handleMarkAsRead(id);
    toast.success('Trade offer accepted!');
  };

  const handleRejectTradeOffer = (id: string) => {
    handleMarkAsRead(id);
    toast.info('Trade offer rejected');
  };

  const handleViewTradeDetails = (id: string) => {
    handleMarkAsRead(id);
    toast.info('→ H-A: Trade Offer Details View');
  };

  const handleReplyToQuestion = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    if (notification) {
      handleMarkAsRead(id);
      setSelectedQuestionNotif(notification);
      setReplySheetOpen(true);
    }
  };

  const handleOpenChat = (id: string) => {
    handleMarkAsRead(id);
    if (onChatClick) {
      onChatClick(id);
    } else {
      toast.info('→ Messages Page (Chats tab) with conversation opened');
    }
  };

  const handleListingAction = (id: string) => {
    handleMarkAsRead(id);
    const notification = notifications.find((n) => n.id === id);
    if (notification?.type === 'listing-expiring') {
      // ✅ N-1: Dispatch to GAM renew-listing (canonical flow)
      const listingTitle = notification.title.includes('"')
        ? notification.title.split('"')[1]
        : notification.title;
      
      dispatch({
        actionId: 'renew-listing',
        context: {
          listingTitle,
        },
        onConfirm: () => {
          toast.success(`✅ "${listingTitle}" renewed for 30 days`);
          // TODO: Backend - Extend listing expiration date
        },
      });
    } else if (notification?.type === 'sale' && notification.listingId && onViewProduct) {
      // ✅ VD-1: Navigate to ProductDetailPage for sold listings
      onViewProduct(notification.listingId);
    } else {
      toast.info('→ H-A: Listing Details View');
    }
  };

  const handleAcceptGroupInvite = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    const groupName = notification?.title.replace('Invitation: ', '').replace(/\"/g, '') || 'Unknown Group';
    
    // ✅ P2: Migrated to GAM
    dispatch({
      actionId: 'accept-group-invite',
      context: {
        groupName,
      },
      onConfirm: () => {
        handleMarkAsRead(id);
        toast.success('Group invitation accepted!');
        // TODO: Backend - Add user to group
        // TODO: Backend - Notify group owner
        // TODO: Backend - Remove invitation
      },
    });
  };

  const handleRejectGroupInvite = (id: string) => {
    const notification = notifications.find((n) => n.id === id);
    const groupName = notification?.title.replace('Invitation: ', '').replace(/\"/g, '') || 'Unknown Group';
    
    // ✅ P2: Migrated to GAM
    dispatch({
      actionId: 'reject-group-invite',
      context: {
        groupName,
      },
      onConfirm: () => {
        handleMarkAsRead(id);
        toast.info('Group invitation declined');
        // TODO: Backend - Decline invitation
        // TODO: Backend - Notify group owner (optional)
        // TODO: Backend - Remove invitation
      },
    });
  };

  const handleViewReportDetails = (id: string) => {
    handleMarkAsRead(id);
    if (onViewReport) {
      onViewReport(id);
    } else {
      toast.info('→ H-A: Report Details View');
    }
  };

  // Render compact card based on type
  const renderCompactCard = (notification: Notification) => {
    const commonProps = {
      id: notification.id,
      title: notification.title,
      subtitle: notification.subtitle || '',
      time: notification.time,
      isRead: notification.isRead,
    };

    switch (notification.type) {
      case 'trade-offer':
        return (
          <TradeOfferAlertCardCompact
            {...commonProps}
            expiresIn={notification.badge?.label.replace('⏰ ', '').replace(' left', '')}
            isCritical={notification.priority === 'urgent'}
            onAccept={() => handleAcceptTradeOffer(notification.id)}
            onReject={() => handleRejectTradeOffer(notification.id)}
            onViewOffer={() => handleViewTradeDetails(notification.id)}
          />
        );

      case 'question':
        return (
          <QuestionAlertCardCompact
            {...commonProps}
            listingTitle={
              notification.title.includes('"')
                ? notification.title.split('"')[1]
                : undefined
            }
            onReply={() => handleReplyToQuestion(notification.id)}
          />
        );

      case 'message':
        return (
          <MessageAlertCardCompact
            {...commonProps}
            messageCount={
              notification.title.includes('messages')
                ? parseInt(notification.title)
                : undefined
            }
            onOpenChat={() => handleOpenChat(notification.id)}
          />
        );

      case 'listing-expiring':
        return (
          <ListingLifecycleAlertCardCompact
            {...commonProps}
            eventType="expiring"
            onAction={() => handleListingAction(notification.id)}
          />
        );

      case 'sale':
        return (
          <ListingLifecycleAlertCardCompact
            {...commonProps}
            eventType="sold-reserved"
            onAction={() => handleListingAction(notification.id)}
            onOpenChat={() => handleOpenChat(notification.id)} // ✅ PHASE 2.4: Wire Chat button to navigateToChat
          />
        );

      case 'group-invite':
        return (
          <GroupInviteAlertCardCompact
            {...commonProps}
            groupName={notification.title.replace('Invitation: ', '').replace(/"/g, '')}
            memberCount={
              notification.subtitle?.includes('members')
                ? parseInt(notification.subtitle)
                : undefined
            }
            isPrivate={notification.subtitle?.includes('Private')}
            onAccept={() => handleAcceptGroupInvite(notification.id)}
            onReject={() => handleRejectGroupInvite(notification.id)}
            onPreview={() => toast.info('→ H-A: Group Preview')}
          />
        );

      case 'report-status':
        return (
          <ReportStatusAlertCardCompact
            {...commonProps}
            status="resolved"
            reportType="Spam Report"
            onViewDetails={() => handleViewReportDetails(notification.id)}
          />
        );

      default:
        return null;
    }
  };

  const activeFilterCount = Object.values(filters).filter((v) => v !== 'all').length;

  return (
    <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[1024px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="h-[52px] px-4 flex items-center justify-between border-b bg-background shrink-0">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-muted rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-base font-semibold">Notifications</h1>

        <button className="p-2 -mr-2 hover:bg-muted rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Priority Counters + Filter */}
      <div className="h-[48px] px-4 flex items-center justify-center border-b bg-muted/30 shrink-0 relative">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-red-300" />
            <span className="text-muted-foreground">Urgent</span>
            <span className="font-medium">{counts.urgent}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-300" />
            <span className="text-muted-foreground">Pending</span>
            <span className="font-medium">{counts.pending}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <span className="text-muted-foreground">Info</span>
            <span className="font-medium">{counts.info}</span>
          </div>
        </div>
        
        {/* Filter button (absolute positioned to the right) */}
        <button className="absolute right-4 p-1.5 hover:bg-muted/50 rounded-lg transition-colors">
          <Filter className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Content - Scrollable */}
      <main className="flex-1 overflow-auto p-4 space-y-5 pb-6">
        {/* URGENT Section */}
        {urgentNotifications.length > 0 && (
          <NotificationSection
            id="urgent"
            title="URGENT"
            emoji="🔴"
            count={urgentNotifications.length}
            priority="urgent"
            isOpen={true}
            onMarkAllRead={() => handleMarkSectionRead('urgent')}
            onClearSection={() => handleClearSection('urgent')}
          >
            <div className="space-y-3">
              {urgentNotifications.map((notification) => (
                <div key={notification.id}>{renderCompactCard(notification)}</div>
              ))}
            </div>
          </NotificationSection>
        )}

        {/* PENDING Section */}
        {pendingNotifications.length > 0 && (
          <NotificationSection
            id="pending"
            title="PENDING"
            emoji="🟡"
            count={pendingNotifications.length}
            priority="pending"
            isOpen={true}
            onMarkAllRead={() => handleMarkSectionRead('pending')}
            onClearSection={() => handleClearSection('pending')}
          >
            <div className="space-y-3">
              {pendingNotifications.map((notification) => (
                <div key={notification.id}>{renderCompactCard(notification)}</div>
              ))}
            </div>
          </NotificationSection>
        )}

        {/* TODAY Section */}
        {todayNotifications.length > 0 && (
          <NotificationSection
            id="today"
            title="TODAY"
            emoji="⚪"
            count={todayNotifications.length}
            priority="info"
            isOpen={false}
            onMarkAllRead={() => handleMarkSectionRead('today')}
            onClearSection={() => handleClearSection('today')}
          >
            <div className="space-y-3">
              {todayNotifications.slice(0, 5).map((notification) => (
                <div key={notification.id}>{renderCompactCard(notification)}</div>
              ))}

              {todayNotifications.length > 5 && (
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View {todayNotifications.length - 5} more
                </Button>
              )}
            </div>
          </NotificationSection>
        )}

        {/* THIS WEEK Section */}
        {weekNotifications.length > 0 && (
          <NotificationSection
            id="week"
            title="THIS WEEK"
            emoji="⚪"
            count={weekNotifications.length}
            priority="info"
            isOpen={false}
            onMarkAllRead={() => handleMarkSectionRead('week')}
            onClearSection={() => handleClearSection('week')}
          >
            <div className="space-y-3">
              {weekNotifications.slice(0, 3).map((notification) => (
                <div key={notification.id}>{renderCompactCard(notification)}</div>
              ))}

              {weekNotifications.length > 3 && (
                <Button variant="ghost" size="sm" className="w-full text-xs">
                  View {weekNotifications.length - 3} more
                </Button>
              )}
            </div>
          </NotificationSection>
        )}

        {/* Empty State */}
        {filteredNotifications.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 px-6">
            <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
              <CheckCheck className="w-8 h-8 text-green-500/60" />
            </div>
            <h3 className="text-base font-medium mb-1">All caught up!</h3>
            <p className="text-sm text-muted-foreground text-center">
              {activeFilterCount > 0
                ? 'No notifications match your filters'
                : 'You have no pending notifications'}
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="h-[48px] px-4 border-t bg-background flex items-center justify-center shrink-0">
        <span className="text-xs text-muted-foreground">
          {counts.unread} unread · {counts.total} total
        </span>
      </footer>

      {/* Filter Sheet */}
      <NotificationsFilterSheet
        isOpen={showFilterSheet}
        onClose={() => setShowFilterSheet(false)}
        filters={filters}
        onApplyFilters={setFilters}
        counts={counts}
      />

      {/* Reply Sheet */}
      {selectedQuestionNotif && (
        <ReplySheet
          open={replySheetOpen}
          onOpenChange={setReplySheetOpen}
          question={selectedQuestionNotif.subtitle || 'Question about your listing'}
          askedBy="@buyer"
          askedAt={selectedQuestionNotif.time}
          listingTitle={selectedQuestionNotif.title.includes('"') ? selectedQuestionNotif.title.split('"')[1] : 'Your Listing'}
          listingImage="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"
          waitingCount={selectedQuestionNotif.title.includes('unanswered') ? parseInt(selectedQuestionNotif.title) : undefined}
          onSubmit={async (answer) => {
            console.log('Publishing answer:', answer);
            // TODO: Backend call to publish answer
          }}
        />
      )}
    </div>
  );
}

export default NotificationsPage;