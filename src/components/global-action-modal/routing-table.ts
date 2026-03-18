/**
 * Routing Table — Global Action Modal V1
 * 
 * ROLE: Configuration registry for confirmation actions
 * PATTERN: actionId + context → ConfirmActionDialog config OR Sheet config
 * 
 * SCOPE (Phase 5 V1 + Approval/Rejection Sheets):
 * - Confirmation actions (ConfirmActionDialog)
 * - Listing actions: delete, resume, renew, pause, archive
 * - Group actions: leave, delete, archive
 * - Join request actions: approve, reject
 * - Trade actions: accept, decline
 * - Report actions: take-action, dismiss, resolve
 * - Admin actions: approve-listing, remove-listing, resolve-issue
 * - Approval/Rejection actions (Specialized Sheets)
 * - Campaign actions: approve-campaign-request, reject-campaign-request
 * - Event actions: approve-event-request, reject-event-request
 * 
 * NOT IN SCOPE (Future phases):
 * - Navigation actions
 * - Toggle actions (pin, mute)
 * - Share actions
 */

import type { ConfirmActionDialogData } from '../action-center/ConfirmActionDialog';

// ============================================================================
// Types
// ============================================================================

export type ActionId =
  // Listing Management
  | 'delete-listing'
  | 'resume-listing'
  | 'renew-listing'
  | 'pause-listing'
  | 'archive-listing'
  | 'reactivate-listing'
  
  // Group Management
  | 'leave-group'
  | 'delete-group'
  | 'archive-group'
  
  // Join Requests
  | 'approve-join-request'
  | 'reject-join-request'
  
  // Trade Offers
  | 'accept-trade'
  | 'decline-trade'
  
  // Reports (Group Mod)
  | 'take-action-report'
  | 'dismiss-report'
  
  // Reports (Platform Admin)
  | 'resolve-platform-report'
  | 'dismiss-platform-report'
  
  // Flagged Content (Admin)
  | 'approve-flagged-listing'
  | 'remove-flagged-listing'
  
  // User Issues (Admin)
  | 'resolve-user-issue'
  
  // Moderation Actions (Admin)
  | 'moderation-take-action'
  
  // Campaign/Event Approvals (Specialized Sheets)
  | 'approve-campaign-request'
  | 'reject-campaign-request'
  | 'approve-event-request'
  | 'reject-event-request'
  
  // Group Invitations
  | 'accept-group-invite'
  | 'reject-group-invite'
  
  // Product Detail Executors (SHEET routes)
  | 'make-offer'
  | 'report-listing'
  | 'share-listing'
  | 'share-to-group';

export interface ActionContext {
  // Entity identifiers
  listingId?: string;
  listingTitle?: string;
  groupId?: string;
  groupName?: string;
  userId?: string;
  userName?: string;
  reportId?: string;
  
  // Context-specific data
  status?: string;
  reason?: string;
  count?: number; // For bulk actions
  
  // Campaign/Event approval context
  entityType?: 'campaign' | 'event';
  entityId?: string;
  entityName?: string;
  listingName?: string;
  listingImage?: string;
  requestedBy?: string;
  qualifies?: boolean;
  
  // Additional details (flexible)
  [key: string]: any;
}

export interface ActionConfig {
  variant: ConfirmActionDialogData['variant'];
  icon: ConfirmActionDialogData['icon'];
  title: string;
  description: string;
  details?: { label: string; value: string }[];
  consequences?: {
    title: string;
    items: string[];
  };
  confirmLabel: string;
  cancelLabel?: string;
}

// Sheet configuration for approval/rejection flows
export interface SheetConfig {
  sheetType: 'campaign-approval' | 'campaign-rejection' | 'event-approval' | 'event-rejection' | 'make-offer' | 'report-listing' | 'share-listing' | 'share-to-group';
  listing: string;
  listingImage: string;
  entityName: string; // campaign or eventHub
  requestedBy: string;
  // Additional optional fields for extended sheet types
  productPrice?: string;
  productId?: string;
  productLocation?: string;
  productType?: string;
  sellerId?: string;
  sellerName?: string;
}

interface ActionRoute {
  /**
   * Route type: 'dialog' for ConfirmActionDialog, 'sheet' for specialized sheets
   */
  type: 'dialog' | 'sheet';
  
  /**
   * Get configuration for this action based on context
   */
  getConfig: (context: ActionContext) => ActionConfig | SheetConfig | null;
}

// ============================================================================
// Routing Table
// ============================================================================

export const ROUTING_TABLE: Record<ActionId, ActionRoute> = {
  // ==========================================================================
  // LISTING MANAGEMENT
  // ==========================================================================
  
  'delete-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'trash',
      title: ctx.status === 'draft' ? 'Delete Draft?' : 'Delete Listing?',
      description: 'This action cannot be undone',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: ctx.count
          ? [
              `${ctx.count} listings will be permanently removed`,
              'All photos and data will be deleted',
              'Users won\'t be able to find these listings anymore',
            ]
          : [
              'The listing will be permanently removed',
              'All photos and data will be deleted',
              ctx.status === 'draft'
                ? 'Your draft progress will be lost'
                : 'Users won\'t be able to find this listing anymore',
            ],
      },
      confirmLabel: 'Delete',
    }),
  },

  'resume-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Resume Listing?',
      description: 'Your listing will become active and visible to buyers',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The listing will be visible in search results',
          'Buyers can contact you about this item',
          'You can pause it again anytime',
        ],
      },
      confirmLabel: 'Resume Listing',
    }),
  },

  'renew-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'info',
      icon: 'info',
      title: 'Renew Listing?',
      description: 'Extend your listing for another 30 days',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'Your listing will be renewed for 30 days',
          'It will remain active and visible',
          'You can renew again before it expires',
        ],
      },
      confirmLabel: 'Renew for 30 Days',
    }),
  },

  'pause-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'warning',
      icon: 'alert',
      title: ctx.count ? `Pause ${ctx.count} listings?` : 'Pause Listing?',
      description: ctx.count
        ? 'Selected listings will be hidden from buyers'
        : 'Your listing will be temporarily hidden from buyers',
      details: ctx.listingTitle
        ? [{ label: 'Listing', value: ctx.listingTitle }]
        : undefined,
      consequences: {
        title: 'What happens next:',
        items: ctx.count
          ? [
              `${ctx.count} listings will be paused`,
              'They won\'t appear in search results',
              'You can resume them anytime',
            ]
          : [
              'The listing won\'t appear in search results',
              'Buyers can\'t contact you about it',
              'You can resume it anytime',
            ],
      },
      confirmLabel: 'Pause',
    }),
  },

  'archive-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'info',
      icon: 'info',
      title: ctx.count ? `Archive ${ctx.count} listings?` : 'Archive listing?',
      description: 'Archived listings are hidden from public view but can be restored later',
      details: ctx.listingTitle
        ? [{ label: 'Listing', value: ctx.listingTitle }]
        : undefined,
      consequences: {
        title: 'What happens next:',
        items: ctx.count
          ? [
              `${ctx.count} listings will be archived`,
              'They\'ll be moved to your archive folder',
              'You can restore them anytime',
            ]
          : [
              'The listing will be hidden from public view',
              'It will be moved to your archive folder',
              'You can restore it later',
            ],
      },
      confirmLabel: 'Archive',
    }),
  },

  'reactivate-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Reactivate listing?',
      description: 'Your listing will be active again and visible to buyers',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The listing will be visible in search results',
          'Buyers can contact you about this item',
          'You can pause or archive it anytime',
        ],
      },
      confirmLabel: 'Reactivate',
    }),
  },

  // ==========================================================================
  // GROUP MANAGEMENT
  // ==========================================================================

  'leave-group': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'trash',
      title: 'Leave Group?',
      description: 'You will no longer have access to this group',
      details: [
        { label: 'Group', value: ctx.groupName || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'You\'ll be removed from the group',
          'Your posts will remain visible',
          'You can request to join again later',
        ],
      },
      confirmLabel: 'Leave Group',
    }),
  },

  'delete-group': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'trash',
      title: 'Delete Group?',
      description: 'This action cannot be undone. All group data will be permanently deleted.',
      details: [
        { label: 'Group', value: ctx.groupName || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'All members will be removed',
          'All posts and content will be deleted',
          'The group cannot be recovered',
        ],
      },
      confirmLabel: 'Delete Group',
    }),
  },

  'archive-group': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'info',
      icon: 'info',
      title: 'Archive Group?',
      description: 'The group will be hidden but can be restored later',
      details: [
        { label: 'Group', value: ctx.groupName || 'Untitled' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The group will be hidden from public view',
          'Members can still see archived content',
          'You can restore it anytime',
        ],
      },
      confirmLabel: 'Archive Group',
    }),
  },

  // ==========================================================================
  // JOIN REQUESTS
  // ==========================================================================

  'approve-join-request': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Approve Join Request?',
      description: 'This user will become a member of the group',
      details: [
        { label: 'User', value: ctx.userName || 'Unknown' },
        { label: 'Group', value: ctx.groupName || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The user will be added as a member',
          'They can post and interact in the group',
          'They\'ll receive a notification',
        ],
      },
      confirmLabel: 'Approve',
    }),
  },

  'reject-join-request': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'x',
      title: 'Reject Join Request?',
      description: 'The user will be notified that their request was declined',
      details: [
        { label: 'User', value: ctx.userName || 'Unknown' },
        { label: 'Group', value: ctx.groupName || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The request will be removed',
          'The user will receive a notification',
          'They can request to join again later',
        ],
      },
      confirmLabel: 'Reject',
    }),
  },

  // ==========================================================================
  // TRADE OFFERS
  // ==========================================================================

  'accept-trade': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Accept Trade Offer?',
      description: 'You will proceed with this trade',
      details: ctx.tradeFrom && ctx.tradeOffer && ctx.tradeFor
        ? [
            { label: 'From', value: ctx.tradeFrom },
            { label: 'Offering', value: ctx.tradeOffer },
            { label: 'For', value: ctx.tradeFor },
          ]
        : [],
      consequences: {
        title: 'What happens next:',
        items: [
          'The offerer will be notified',
          'A chat will open to arrange the trade',
          'Your listing status will update to "Trade Pending"',
        ],
      },
      confirmLabel: 'Accept Trade',
    }),
  },

  'decline-trade': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'x',
      title: 'Decline Trade Offer?',
      description: 'The offerer will be notified',
      details: ctx.tradeFrom && ctx.tradeOffer
        ? [
            { label: 'From', value: ctx.tradeFrom },
            { label: 'Offering', value: ctx.tradeOffer },
          ]
        : [],
      consequences: {
        title: 'What happens next:',
        items: [
          'The trade offer will be declined',
          'The offerer will receive a notification',
          'This offer will be removed from your Action Center',
        ],
      },
      confirmLabel: 'Decline Offer',
    }),
  },

  // ==========================================================================
  // REPORTS (GROUP MOD)
  // ==========================================================================

  'take-action-report': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'warning',
      icon: 'alert',
      title: 'Take Action on Report?',
      description: ctx.reportType === 'post'
        ? 'The reported post will be removed'
        : ctx.reportType === 'listing'
        ? 'The reported listing will be removed'
        : 'Action will be taken on this report',
      details: [
        { label: 'Reported', value: ctx.reported || 'Unknown' },
        { label: 'Group', value: ctx.groupName || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The content will be removed',
          'The reporter will be notified',
          'The user may receive a warning',
        ],
      },
      confirmLabel: 'Take Action',
    }),
  },

  'dismiss-report': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'info',
      icon: 'x',
      title: 'Dismiss Report?',
      description: 'The report will be marked as resolved without action',
      details: [
        { label: 'Reported', value: ctx.reported || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The report will be dismissed',
          'No action will be taken',
          'The reporter will be notified',
        ],
      },
      confirmLabel: 'Dismiss',
    }),
  },

  // ==========================================================================
  // PLATFORM REPORTS (ADMIN)
  // ==========================================================================

  'resolve-platform-report': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Resolve Report?',
      description: 'This report will be marked as resolved',
      details: [
        { label: 'Report Type', value: ctx.reportType || 'Unknown' },
        { label: 'Reported', value: ctx.reported || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The report will be marked as resolved',
          'The reporter will be notified',
          'The content may be removed or actioned',
        ],
      },
      confirmLabel: 'Resolve',
    }),
  },

  'dismiss-platform-report': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'info',
      icon: 'x',
      title: 'Dismiss Report?',
      description: 'The report will be archived without action',
      details: [
        { label: 'Reported', value: ctx.reported || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The report will be dismissed',
          'No action will be taken',
          'The report will be archived',
        ],
      },
      confirmLabel: 'Dismiss',
    }),
  },

  // ==========================================================================
  // FLAGGED CONTENT (ADMIN)
  // ==========================================================================

  'approve-flagged-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Approve Listing?',
      description: 'The flag will be cleared and the listing will be published',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Unknown' },
        { label: 'Reason', value: ctx.reason || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The flag will be cleared',
          'The listing will be visible to buyers',
          'The seller will be notified',
        ],
      },
      confirmLabel: 'Approve',
    }),
  },

  'remove-flagged-listing': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'trash',
      title: 'Remove Listing?',
      description: 'The listing will be permanently removed from the platform',
      details: [
        { label: 'Listing', value: ctx.listingTitle || 'Unknown' },
        { label: 'Reason', value: ctx.reason || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The listing will be removed',
          'The seller will be notified with reason',
          'This action cannot be undone',
        ],
      },
      confirmLabel: 'Remove Listing',
    }),
  },

  // ==========================================================================
  // USER ISSUES (ADMIN)
  // ==========================================================================

  'resolve-user-issue': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: ctx.issueType === 'verification'
        ? 'Approve Verification?'
        : ctx.issueType === 'appeal'
        ? 'Restore Account?'
        : ctx.issueType === 'account-access'
        ? 'Reset Access?'
        : 'Resolve Issue?',
      description: ctx.issueType === 'verification'
        ? 'The user will be marked as verified'
        : ctx.issueType === 'appeal'
        ? 'The user\'s account will be restored'
        : ctx.issueType === 'account-access'
        ? 'Access reset link will be sent'
        : 'The issue will be marked as resolved',
      details: [
        { label: 'User', value: ctx.userName || 'Unknown' },
        { label: 'Issue', value: ctx.subject || 'Unknown' },
      ],
      consequences: {
        title: 'What happens next:',
        items:
          ctx.issueType === 'verification'
            ? [
                'The user will receive verified badge',
                'They\'ll have access to premium features',
                'Their listings will have higher trust',
              ]
            : ctx.issueType === 'appeal'
            ? [
                'Account restrictions will be lifted',
                'User can access their account normally',
                'They\'ll receive a notification',
              ]
            : ctx.issueType === 'account-access'
            ? [
                'Password reset email will be sent',
                'User can set a new password',
                'Old sessions will be invalidated',
              ]
            : [
                'The issue will be marked as resolved',
                'The user will be notified',
                'Case will be closed',
              ],
      },
      confirmLabel:
        ctx.issueType === 'verification'
          ? 'Approve Verification'
          : ctx.issueType === 'appeal'
          ? 'Restore Account'
          : ctx.issueType === 'account-access'
          ? 'Reset Access'
          : 'Resolve Issue',
    }),
  },

  // ==========================================================================
  // MODERATION ACTIONS (ADMIN)
  // ==========================================================================

  'moderation-take-action': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'warning',
      icon: 'alert',
      title: 'Take Moderation Action?',
      description: 'Choose action to take on this user or content',
      details: [
        ...(ctx.targetUserName ? [{ label: 'User', value: ctx.targetUserName }] : []),
        ...(ctx.listingTitle ? [{ label: 'Listing', value: ctx.listingTitle }] : []),
      ],
      consequences: {
        title: 'Available actions:',
        items: [
          'Ban User — Prevent access to platform',
          'Delete Content — Remove reported content',
          'Issue Warning — Send official warning',
          'Close Chat — Mark as resolved',
        ],
      },
      confirmLabel: 'Choose Action',
      cancelLabel: 'Cancel',
    }),
  },

  // ==========================================================================
  // CAMPAIGN/EVENT APPROVALS (SPECIALIZED SHEETS)
  // ==========================================================================

  'approve-campaign-request': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'campaign-approval',
      listing: ctx.listingName || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: ctx.entityName || 'Unknown Campaign',
      requestedBy: ctx.requestedBy || 'Unknown User',
    }),
  },

  'reject-campaign-request': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'campaign-rejection',
      listing: ctx.listingName || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: ctx.entityName || 'Unknown Campaign',
      requestedBy: ctx.requestedBy || 'Unknown User',
    }),
  },

  'approve-event-request': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'event-approval',
      listing: ctx.listingName || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: ctx.entityName || 'Unknown Event',
      requestedBy: ctx.requestedBy || 'Unknown User',
    }),
  },

  'reject-event-request': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'event-rejection',
      listing: ctx.listingName || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: ctx.entityName || 'Unknown Event',
      requestedBy: ctx.requestedBy || 'Unknown User',
    }),
  },

  // ==========================================================================
  // GROUP INVITATIONS
  // ==========================================================================

  'accept-group-invite': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'success',
      icon: 'check',
      title: 'Accept Group Invitation?',
      description: 'You will join this group',
      details: [
        { label: 'Group', value: ctx.groupName || 'Unknown Group' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'You\'ll become a member of the group',
          'You can post and interact with members',
          'You\'ll receive notifications about group activity',
        ],
      },
      confirmLabel: 'Accept',
    }),
  },

  'reject-group-invite': {
    type: 'dialog',
    getConfig: (ctx) => ({
      variant: 'destructive',
      icon: 'x',
      title: 'Decline Group Invitation?',
      description: 'The invitation will be removed',
      details: [
        { label: 'Group', value: ctx.groupName || 'Unknown Group' },
      ],
      consequences: {
        title: 'What happens next:',
        items: [
          'The invitation will be declined',
          'You won\'t join the group',
          'The group owner may be notified',
        ],
      },
      confirmLabel: 'Decline',
    }),
  },

  // ==========================================================================
  // PRODUCT DETAIL EXECUTORS (PLACEHOLDER - requires sheet extension)
  // ==========================================================================

  'make-offer': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'make-offer',
      listing: ctx.listingTitle || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: '', // Not used for make-offer
      requestedBy: '', // Not used for make-offer
      productPrice: ctx.productPrice,
      productId: ctx.productId,
      sellerId: ctx.sellerId,
      sellerName: ctx.sellerName,
    }),
  },

  'report-listing': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'report-listing',
      listing: ctx.listingTitle || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: '', // Not used for report
      requestedBy: '', // Not used for report
    }),
  },

  'share-listing': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'share-listing',
      listing: ctx.listingTitle || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: '', // Not used for share
      requestedBy: '', // Not used for share
      productId: ctx.productId,
      productPrice: ctx.productPrice,
      productLocation: ctx.productLocation,
      productType: ctx.productType,
      sellerName: ctx.sellerName,
    }),
  },

  'share-to-group': {
    type: 'sheet',
    getConfig: (ctx) => ({
      sheetType: 'share-to-group',
      listing: ctx.listingTitle || 'Unknown Listing',
      listingImage: ctx.listingImage || 'https://via.placeholder.com/150',
      entityName: '', // Not used for share-to-group
      requestedBy: '', // Not used for share-to-group
      productId: ctx.productId,
    }),
  },
};