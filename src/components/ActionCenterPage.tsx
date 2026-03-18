/**
 * Action Center Page - MVP Final
 * Mobile-first design optimized for iPhone
 * Premium Design 2025
 * 
 * ARCHITECTURE: Centralized Action Hub with Horizontal Tabs (MVP ONLY)
 * 
 * TABS:
 * 1. 📋 Listings (always visible)
 *    - Chat/Messages (unanswered only)
 *    - Q&A/Questions (awaiting answer)
 *    - Listing Status/Actions (draft, expiring, pending, rejected)
 * 
 * 2. 🏘️ Groups (only if user is admin/moderator of any group)
 *    - Group Reports (from ALL groups where user is admin/mod)
 */

import { useState } from 'react';
import { ArrowLeft, Settings, Bell, MessageSquare, AlertTriangle, HelpCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { ReplySheet } from './ReplySheet';
import {
  QuickCountCard,
  ActionSection,
  MessageCard,
  QuestionCard,
  ListingActionCard,
  mockMessages,
  mockQuestions,
  mockListingActions,
} from './action-center';
import { ReportCard } from './groups/ReportCard';
import { ViewStatusDialog } from './action-center/ViewStatusDialog';
import { RejectionReasonsDialog } from './action-center/RejectionReasonsDialog';
import { useGlobalActionModal } from './global-action-modal';

// Mock data for Groups tab
const mockGroupReports = [
  {
    id: 'gr-1',
    type: 'Spam/Scam',
    reported: 'MacBook Pro listing',
    by: '@concerned_user',
    group: 'Tech Lovers Chile',
    priority: 'High' as const,
    time: '2h ago',
    role: 'Group Admin' as const,
  },
  {
    id: 'gr-2',
    type: 'Inappropriate Content',
    reported: '@spam_account profile',
    by: '@community_watch',
    group: 'Gamers Community',
    priority: 'Medium' as const,
    time: '1d ago',
    role: 'Group Moderator' as const,
  },
];

interface ActionCenterPageProps {
  onBack: () => void;
  onChatClick?: (chatId: string) => void;
  onContinueDraft?: (draftId: string) => void;
  onViewListing?: (listingId: string) => void;
  onReviewGroupReport?: (reportId: string) => void;
}

type Tab = 'listings' | 'groups';

export function ActionCenterPage({ 
  onBack, 
  onChatClick, 
  onContinueDraft, 
  onViewListing, 
  onReviewGroupReport 
}: ActionCenterPageProps) {
  const { dispatch } = useGlobalActionModal();
  
  const [activeTab, setActiveTab] = useState<Tab>('listings');
  const [replySheetOpen, setReplySheetOpen] = useState(false);
  const [selectedQuestionData, setSelectedQuestionData] = useState<{
    question: string;
    askedBy: string;
    listing: string;
    time: string;
    waiting?: number;
  } | null>(null);

  // State for reactive card removal
  const [listingActions, setListingActions] = useState(mockListingActions);
  const [questions, setQuestions] = useState(mockQuestions);

  // View Status Dialog State
  const [viewStatusDialogOpen, setViewStatusDialogOpen] = useState(false);
  const [viewStatusDialogData, setViewStatusDialogData] = useState<{
    title: string;
    groupName: string;
    submittedTime: string;
    estimatedReview?: string;
  } | null>(null);

  // Rejection Reasons Dialog State
  const [rejectionReasonsDialogOpen, setRejectionReasonsDialogOpen] = useState(false);
  const [rejectionReasonsDialogData, setRejectionReasonsDialogData] = useState<{
    title: string;
    groupName: string;
    rejectedTime: string;
    reasons: Array<{
      type: 'error' | 'warning' | 'suggestion';
      message: string;
    }>;
    moderatorNote?: string;
  } | null>(null);

  // Mock: Check if user has admin/moderator roles
  const isGroupAdminOrMod = true; // In real app: check if user is admin/mod of any group

  const handleNotificationClick = () => {
    toast.info('Opening notifications...');
  };

  const handleSettingsClick = () => {
    toast.info('Opening settings...');
  };

  const handleQuestionClick = (question: string, askedBy: string, listing: string, time: string, waiting?: number) => {
    setSelectedQuestionData({ question, askedBy, listing, time, waiting });
    setReplySheetOpen(true);
  };

  // Listing Action Handlers
  const handleListingAction = (listingId: string, listingTitle: string, action: string, status: string) => {
    switch (action) {
      case 'Continue':
        if (onContinueDraft) {
          onContinueDraft(listingId);
        } else {
          toast.success('Opening draft...');
        }
        break;

      case 'Renew':
        dispatch({
          actionId: 'renew-listing',
          context: {
            listingTitle,
          },
          onConfirm: () => {
            toast.success(`✅ "${listingTitle}" renewed for 30 days`);
          },
        });
        break;

      case 'Resume':
        dispatch({
          actionId: 'resume-listing',
          context: {
            listingTitle,
          },
          onConfirm: () => {
            toast.success(`✅ "${listingTitle}" is now active`);
          },
        });
        break;

      case 'Delete':
        dispatch({
          actionId: 'delete-listing',
          context: {
            listingTitle,
            status,
          },
          onConfirm: () => {
            toast.success(`Listing deleted successfully`);
          },
        });
        break;

      case 'Edit First':
        toast.info('Opening listing editor...');
        break;

      case 'View Status':
        setViewStatusDialogData({
          title: listingTitle,
          groupName: 'Tech Lovers',
          submittedTime: '2h ago',
          estimatedReview: 'Within 24-48 hours',
        });
        setViewStatusDialogOpen(true);
        break;

      case 'Edit & Resubmit':
        setRejectionReasonsDialogData({
          title: listingTitle,
          groupName: 'Vecinos Valparaíso',
          rejectedTime: '1d ago',
          reasons: [
            { type: 'error', message: 'Missing product photos (required: at least 3 clear images)' },
            { type: 'warning', message: 'Title could be more descriptive (recommended: add brand and model)' },
            { type: 'suggestion', message: 'Consider adding shipping information to increase buyer confidence' },
          ],
          moderatorNote: 'Please add clearer photos showing the item from different angles. Your listing will be reconsidered once updated.',
        });
        setRejectionReasonsDialogOpen(true);
        break;

      case 'Details':
        setRejectionReasonsDialogData({
          title: listingTitle,
          groupName: 'Vecinos Valparaíso',
          rejectedTime: '1d ago',
          reasons: [
            { type: 'error', message: 'Missing product photos (required: at least 3 clear images)' },
            { type: 'warning', message: 'Title could be more descriptive (recommended: add brand and model)' },
            { type: 'suggestion', message: 'Consider adding shipping information to increase buyer confidence' },
          ],
          moderatorNote: 'Please add clearer photos showing the item from different angles. Your listing will be reconsidered once updated.',
        });
        setRejectionReasonsDialogOpen(true);
        break;

      default:
        toast.error('Unknown action');
    }
  };

  // Group Report Handlers
  const handleReviewReport = (reportId: string) => {
    if (onReviewGroupReport) {
      onReviewGroupReport(reportId);
    }
  };

  const handleTakeActionOnReport = (reportType: string, reported: string, reportedBy: string, group?: string) => {
    dispatch({
      actionId: 'take-action-report',
      context: {
        reportType,
        reported,
        groupName: group,
      },
      onConfirm: () => {
        toast.success('Action taken on report');
      },
    });
  };

  const handleDismissReport = (reportType: string, reported: string) => {
    dispatch({
      actionId: 'dismiss-report',
      context: {
        reportType,
        reported,
      },
      onConfirm: () => {
        toast.success('Report dismissed');
      },
    });
  };

  // Calculate counts
  const listingsCount = 
    mockMessages.filter(m => m.unread).length +
    questions.length +
    listingActions.length;

  const groupsCount = mockGroupReports.length;

  const totalCount = listingsCount + groupsCount;

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[1024px] mx-auto">
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
          
          <h1 className="font-semibold">Action Center</h1>
          
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSettingsClick}
              className="h-9 w-9 p-0"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleNotificationClick}
              className="h-9 w-9 p-0 relative"
            >
              <Bell className="w-4 h-4" />
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 min-w-[16px] px-1 rounded-full bg-red-300 dark:bg-red-900/60 text-red-900 dark:text-red-200 text-[9px] flex items-center justify-center font-medium">
                  {totalCount}
                </span>
              )}
            </Button>
          </div>
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
            <span className="flex items-center justify-center gap-2">
              📋 Listings
              {listingsCount > 0 && (
                <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                  {listingsCount}
                </Badge>
              )}
            </span>
            {activeTab === 'listings' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
            )}
          </button>

          {isGroupAdminOrMod && (
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex-1 relative px-4 py-3 text-sm transition-colors ${
                activeTab === 'groups'
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                🏘️ Groups
                {groupsCount > 0 && (
                  <Badge variant="secondary" className="h-4 px-1.5 text-[9px]">
                    {groupsCount}
                  </Badge>
                )}
              </span>
              {activeTab === 'groups' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          )}
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {/* LISTINGS TAB */}
        {activeTab === 'listings' && (
          <div className="px-4 space-y-0">
            {/* Quick Counts */}
            <div className="pt-3 pb-2">
              <p className="text-xs text-muted-foreground mb-2.5">Urgent Actions (Requires Your Attention)</p>
              
              <div className="grid grid-cols-3 gap-2">
                <QuickCountCard
                  icon={MessageSquare}
                  count={mockMessages.filter(m => m.unread).length}
                  label="Messages"
                  gradient="blue"
                />
                <QuickCountCard
                  icon={HelpCircle}
                  count={questions.length}
                  label="Questions"
                  gradient="purple"
                />
                <QuickCountCard
                  icon={AlertTriangle}
                  count={listingActions.length}
                  label="Listings"
                  gradient="amber"
                />
              </div>
            </div>

            <div className="h-px bg-border my-2" />

            {/* Action List */}
            <div className="space-y-0">
              {/* Messages */}
              {mockMessages.filter(m => m.unread).length > 0 && (
                <>
                  <ActionSection
                    id="messages"
                    emoji="📨"
                    title="Messages"
                    count={mockMessages.filter(m => m.unread).length}
                    variant="urgent"
                  >
                    {mockMessages
                      .filter(m => m.unread)
                      .map(msg => (
                        <MessageCard key={msg.id} {...msg} onClick={() => onChatClick?.(msg.id)} />
                      ))}
                  </ActionSection>
                  <div className="h-px bg-border my-2" />
                </>
              )}

              {/* Questions */}
              {questions.length > 0 && (
                <>
                  <ActionSection
                    id="questions"
                    emoji="❓"
                    title="Questions"
                    count={questions.length}
                    variant="default"
                  >
                    {questions.map(q => (
                      <QuestionCard 
                        key={q.id} 
                        {...q} 
                        onClick={() => handleQuestionClick(q.question, q.askedBy, q.listing, q.time, q.waiting)} 
                      />
                    ))}
                  </ActionSection>
                  <div className="h-px bg-border my-2" />
                </>
              )}

              {/* Listing Actions */}
              {listingActions.length > 0 && (
                <ActionSection
                  id="listing-actions"
                  emoji="⚠️"
                  title="Listing Actions"
                  count={listingActions.length}
                  variant="urgent"
                >
                  {listingActions.map(listing => (
                    <ListingActionCard
                      key={listing.id}
                      status={listing.status}
                      title={listing.title}
                      subtitle={listing.subtitle}
                      badge={listing.badge}
                      badgeVariant={listing.badgeVariant}
                      actions={[
                        { 
                          label: listing.status === 'draft' ? 'Continue' : 
                                 listing.status === 'expiring' ? 'Renew' : 
                                 listing.status === 'paused' ? 'Resume' : 
                                 listing.status === 'pending' ? 'View Status' : 
                                 'Edit & Resubmit', 
                          variant: 'default' 
                        },
                        ...(listing.status !== 'pending' ? [{ 
                          label: listing.status === 'expiring' ? 'Edit First' : 
                                 listing.status === 'rejected' ? 'Details' : 
                                 'Delete', 
                          variant: listing.status === 'expiring' ? 'outline' as const : 'ghost' as const 
                        }] : []),
                      ]}
                      onAction={(action) => handleListingAction(listing.id, listing.title, action, listing.status)}
                    />
                  ))}
                </ActionSection>
              )}

              {/* Empty State */}
              {listingsCount === 0 && (
                <div className="text-center py-12 px-4">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-medium mb-1">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">
                    No listing actions require your attention right now.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* GROUPS TAB */}
        {activeTab === 'groups' && (
          <div className="px-4 space-y-0">
            {/* Quick Counts */}
            <div className="pt-3 pb-2">
              <p className="text-xs text-muted-foreground mb-2.5">Group Management (All Your Groups)</p>
              
              <div className="grid grid-cols-1 gap-2">
                <QuickCountCard
                  icon={AlertTriangle}
                  count={mockGroupReports.length}
                  label="Reports"
                  gradient="red"
                />
              </div>
            </div>

            <div className="h-px bg-border my-2" />

            {/* Action List */}
            <div className="space-y-0">
              {/* Group Reports */}
              {mockGroupReports.length > 0 && (
                <ActionSection
                  id="group-reports"
                  emoji="🚨"
                  title="Group Reports"
                  count={mockGroupReports.length}
                  variant="urgent"
                >
                  {mockGroupReports.map((report, idx) => (
                    <ReportCard 
                      key={idx} 
                      {...report}
                      onReview={() => handleReviewReport(report.id)}
                      onTakeAction={() => handleTakeActionOnReport(report.type, report.reported, report.by, report.group)}
                      onDismiss={() => handleDismissReport(report.type, report.reported)}
                    />
                  ))}
                </ActionSection>
              )}

              {/* Empty State */}
              {groupsCount === 0 && (
                <div className="text-center py-12 px-4">
                  <div className="text-4xl mb-3">✅</div>
                  <h3 className="font-medium mb-1">All Caught Up!</h3>
                  <p className="text-sm text-muted-foreground">
                    No group actions require your attention right now.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Reply Sheet */}
      <ReplySheet
        open={replySheetOpen}
        onOpenChange={setReplySheetOpen}
        question={selectedQuestionData?.question || ''}
        askedBy={selectedQuestionData?.askedBy || ''}
        askedAt={selectedQuestionData?.time || ''}
        listingTitle={selectedQuestionData?.listing || ''}
        listingImage=""
        waitingCount={selectedQuestionData?.waiting}
        onSubmit={async (answer) => {
          console.log('Publishing answer:', answer);
          console.log('For question:', selectedQuestionData?.question);
          console.log('Asked by:', selectedQuestionData?.askedBy);
          
          await new Promise(resolve => setTimeout(resolve, 500));
          
          setQuestions(prev => prev.filter(q => 
            q.question !== selectedQuestionData?.question || 
            q.askedBy !== selectedQuestionData?.askedBy
          ));
        }}
      />

      {/* View Status Dialog */}
      <ViewStatusDialog
        open={viewStatusDialogOpen}
        onOpenChange={setViewStatusDialogOpen}
        listing={viewStatusDialogData || {
          title: '',
          groupName: '',
          submittedTime: '',
        }}
        onContactMods={() => {
          toast.info('Opening chat with moderators...');
        }}
        onCancel={() => {
          toast.success('Submission cancelled');
        }}
      />

      {/* Rejection Reasons Dialog */}
      <RejectionReasonsDialog
        open={rejectionReasonsDialogOpen}
        onOpenChange={setRejectionReasonsDialogOpen}
        listing={rejectionReasonsDialogData || {
          title: '',
          groupName: '',
          rejectedTime: '',
          reasons: [],
        }}
        onEditResubmit={() => {
          toast.info('Opening listing editor...');
        }}
        onContactMods={() => {
          toast.info('Opening chat with moderators...');
        }}
      />
    </div>
  );
}

export default ActionCenterPage;
