/**
 * Action Registry
 * Registro centralizado de las 51 acciones de ListlyUp
 */

import {
  Edit,
  Trash2,
  Pause,
  Play,
  Archive,
  BarChart3,
  Share2,
  Heart,
  MessageCircle,
  Eye,
  Copy,
  Check,
  X,
  CheckCircle2,
  Clock,
  DollarSign,
  Repeat,
  ShoppingCart,
  Package,
  Send,
  UserPlus,
  UserX,
  Star,
  Flag,
  BellOff,
  Save,
  Printer,
  FileText,
  TrendingUp,
  Users,
  Zap,
  AlertCircle,
  Bell,
  Search,
  UserCheck,
  ArrowUpCircle,
  Settings,
  PlayCircle,
  ArchiveRestore,
  Phone,
  Shield,
  Pin,
  PinOff,
  Edit2,
  RefreshCw, // NEW: Para renew-listing
  FileDown, // NEW: Para export-analytics
  QrCode, // NEW: Para print-qr
  Ban, // NEW: Para block-user
  Camera, // NEW: Para request-more-photos
  CheckCircle, // NEW: Para confirm-delivery-received
  MessageSquare, // NEW: Para respond-question
  XCircle, // NEW: Para reject-listing
  EyeOff, // NEW: Para hide-listing
  UserMinus, // NEW: Para remove-member
  UserCog, // NEW: Para change-role
  Globe, // NEW: Para open-website
  type LucideIcon,
} from 'lucide-react';

import type { ActionDefinition, ActionId } from './types';
import * as handlers from './handlers';

// Custom icon for WhatsApp
const WhatsAppIconWrapper: LucideIcon = () => null; // Placeholder, se renderizará custom

/**
 * Registro completo de las 51 acciones
 */
export const ACTION_REGISTRY: Record<ActionId, ActionDefinition> = {
  // ==================== LISTING MANAGEMENT ====================
  
  'edit-listing': {
    id: 'edit-listing',
    label: 'Edit',
    icon: Edit2,
    variant: 'ghost',
    uiPattern: 'navigation', // Changed from 'full-sheet' to 'navigation'
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings', 'notifications'],
    // Removed: fullSheetComponent: 'EditListingForm',
    handler: handlers.handleEditListing,
  },

  'view-stats': {
    id: 'view-stats',
    label: 'Stats',
    icon: BarChart3,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings', 'notifications'],
    handler: handlers.handleViewStats,
  },

  'pause-listing': {
    id: 'pause-listing',
    label: 'Pause',
    icon: Pause,
    variant: 'ghost',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings', 'notifications', 'bulk'],
    quickSheetTitle: 'Pause Listing',
    quickSheetFields: [
      {
        name: 'reason',
        label: 'Reason (optional)',
        type: 'select',
        options: [
          { value: 'sold', label: 'Item sold' },
          { value: 'unavailable', label: 'Temporarily unavailable' },
          { value: 'update', label: 'Need to update info' },
          { value: 'other', label: 'Other' },
        ],
      },
      {
        name: 'duration',
        label: 'Pause for',
        type: 'select',
        options: [
          { value: 'indefinite', label: 'Until I resume' },
          { value: '7', label: '7 days' },
          { value: '14', label: '14 days' },
          { value: '30', label: '30 days' },
        ],
        defaultValue: 'indefinite',
      },
    ],
    handler: handlers.handlePauseListing,
  },

  'delete-listing': {
    id: 'delete-listing',
    label: 'Delete',
    icon: Trash2,
    variant: 'destructive',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings', 'notifications', 'bulk'],
    confirmTitle: 'Delete listing?',
    confirmDescription: 'This action cannot be undone. Your listing will be permanently deleted.',
    confirmLabel: 'Delete',
    handler: handlers.handleDeleteListing,
  },

  'archive-listing': {
    id: 'archive-listing',
    label: 'Archive',
    icon: Archive,
    variant: 'ghost',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['my-listings', 'notifications', 'bulk'],
    confirmTitle: 'Archive listing?',
    confirmDescription: 'Archived listings are hidden from public view but can be restored later.',
    confirmLabel: 'Archive',
    handler: handlers.handleArchiveListing,
  },

  'mark-as-sold': {
    id: 'mark-as-sold',
    label: 'Mark as Sold',
    icon: CheckCircle,
    variant: 'default',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings', 'notifications'],
    quickSheetTitle: 'Mark as Sold',
    confirmDescription: 'Record the sale details for this listing',
    quickSheetFields: [
      {
        name: 'soldDate',
        label: 'Sale date',
        type: 'date',
        required: false,
        defaultValue: new Date().toISOString().split('T')[0], // Prellenado con fecha actual
      },
      {
        name: 'soldPrice',
        label: 'Final price (optional)',
        type: 'number',
        placeholder: 'Enter final sale price',
      },
    ],
    handler: handlers.handleMarkAsSold,
  },

  'reactivate-listing': {
    id: 'reactivate-listing',
    label: 'Resume',
    icon: Play,
    variant: 'default',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['my-listings', 'notifications', 'bulk', 'action-center'],
    confirmTitle: 'Resume listing?',
    confirmDescription: 'Your listing will be active again and visible in search results.',
    confirmLabel: 'Resume Listing',
    handler: handlers.handleReactivateListing,
  },

  'renew-listing': {
    id: 'renew-listing',
    label: 'Renew',
    icon: RefreshCw,
    variant: 'default',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['my-listings', 'notifications', 'product-detail'],
    confirmTitle: 'Renew listing for 30 days?',
    confirmDescription: 'Your listing will be renewed and stay active for 30 more days.',
    confirmLabel: 'Renew',
    handler: handlers.handleRenewListing,
  },

  'boost-listing': {
    id: 'boost-listing',
    label: 'Boost',
    icon: TrendingUp,
    variant: 'default',
    uiPattern: 'quick-sheet',
    permission: ['isOwner', 'isPremium'],
    group: 'listing-management',
    contexts: ['my-listings', 'product-detail', 'notifications', 'bulk'],
    quickSheetTitle: 'Boost Listing',
    quickSheetFields: [
      {
        name: 'duration',
        label: 'Boost duration',
        type: 'select',
        required: true,
        options: [
          { value: '3', label: '3 days - $5' },
          { value: '7', label: '7 days - $10' },
          { value: '14', label: '14 days - $18' },
          { value: '30', label: '30 days - $30' },
        ],
        defaultValue: '7',
      },
    ],
    handler: handlers.handleBoostListing,
  },

  'report-sold-elsewhere': {
    id: 'report-sold-elsewhere',
    label: 'Sold Elsewhere',
    icon: DollarSign,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['my-listings', 'product-detail'],
    confirmTitle: 'Mark as sold elsewhere?',
    confirmDescription: 'This listing will be marked as sold on another platform.',
    confirmLabel: 'Confirm',
    handler: handlers.handleReportSoldElsewhere,
  },

  'export-analytics': {
    id: 'export-analytics',
    label: 'Export CSV',
    icon: FileDown,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['profile'],
    handler: handlers.handleExportAnalytics,
  },

  'print-qr': {
    id: 'print-qr',
    label: 'QR Code',
    icon: QrCode,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'listing-management',
    contexts: ['product-detail', 'my-listings'],
    handler: handlers.handlePrintQR,
  },

  // ==================== TRANSACTIONS & OFFERS ====================

  'view-trade-offer': {
    id: 'view-trade-offer',
    label: 'View Offer',
    icon: Eye,
    variant: 'outline',
    uiPattern: 'full-sheet',
    permission: 'isAuthenticated',
    group: 'transaction',
    contexts: ['notifications', 'messages'],
    fullSheetComponent: 'TradeOfferDetail',
    handler: handlers.handleViewTradeOffer,
  },

  'accept-trade': {
    id: 'accept-trade',
    label: 'Accept',
    icon: Check,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'transaction',
    contexts: ['notifications', 'product-detail', 'messages'],
    confirmTitle: 'Accept trade offer?',
    confirmDescription: 'By accepting, you agree to exchange items with this user.',
    confirmLabel: 'Accept Trade',
    handler: handlers.handleAcceptTrade,
  },

  'reject-trade': {
    id: 'reject-trade',
    label: 'Reject',
    icon: X,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'transaction',
    contexts: ['notifications', 'product-detail', 'messages'],
    confirmTitle: 'Reject trade offer?',
    confirmDescription: 'The other user will be notified that their offer was declined.',
    confirmLabel: 'Reject',
    handler: handlers.handleRejectTrade,
  },

  'counter-offer': {
    id: 'counter-offer',
    label: 'Counter Offer',
    icon: MessageSquare,
    variant: 'outline',
    uiPattern: 'full-sheet',
    permission: 'isOwner',
    group: 'transaction',
    contexts: ['notifications', 'product-detail', 'messages'],
    fullSheetComponent: 'CounterOfferForm',
    handler: handlers.handleCounterOffer,
  },

  'reserve-item': {
    id: 'reserve-item',
    label: 'Reserve Item',
    icon: PlayCircle,
    variant: 'default',
    uiPattern: 'quick-sheet',
    permission: 'isNotOwner',
    group: 'transaction',
    contexts: ['product-detail'],
    quickSheetTitle: 'Reserve Item',
    quickSheetFields: [
      {
        name: 'hours',
        label: 'Reserve for',
        type: 'select',
        required: true,
        options: [
          { value: '6', label: '6 hours' },
          { value: '12', label: '12 hours' },
          { value: '24', label: '24 hours' },
          { value: '48', label: '48 hours' },
        ],
        defaultValue: '24',
      },
    ],
    handler: handlers.handleReserveItem,
  },

  'confirm-delivery-received': {
    id: 'confirm-delivery-received',
    label: 'Confirm Received',
    icon: CheckCircle,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'transaction',
    contexts: ['notifications', 'messages'],
    confirmTitle: 'Confirm delivery received?',
    confirmDescription: 'Please confirm that you received the item in good condition.',
    confirmLabel: 'Confirm',
    handler: handlers.handleConfirmDelivery,
  },

  // ==================== COMMUNICATION ====================

  'respond-question': {
    id: 'respond-question',
    label: 'Respond',
    icon: MessageSquare,
    variant: 'default',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'communication',
    contexts: ['notifications', 'product-detail', 'messages'],
    quickSheetTitle: 'Respond to Question',
    quickSheetFields: [
      {
        name: 'response',
        label: 'Your response',
        type: 'textarea',
        required: true,
        placeholder: 'Type your answer here...',
      },
    ],
    handler: handlers.handleRespondQuestion,
  },

  'open-chat': {
    id: 'open-chat',
    label: 'Chat', // ✅ P2 HOTFIX: Changed from "Reply" to "Chat" for clarity
    icon: MessageCircle,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'communication',
    contexts: ['notifications', 'product-detail', 'my-listings', 'profile'],
    handler: handlers.handleOpenChat,
  },

  'open-whatsapp': {
    id: 'open-whatsapp',
    label: 'WhatsApp',
    icon: WhatsAppIconWrapper, // Usamos MessageCircle, se diferenciará por color verde
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'communication',
    contexts: ['product-detail', 'profile'],
    handler: handlers.handleOpenWhatsApp,
  },

  'open-phone': {
    id: 'open-phone',
    label: 'Call',
    icon: Phone,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'communication',
    contexts: ['product-detail', 'profile'],
    handler: handlers.handleOpenPhone,
  },

  'open-website': {
    id: 'open-website',
    label: 'Website',
    icon: Globe,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'communication',
    contexts: ['product-detail', 'profile'],
    handler: handlers.handleOpenWebsite,
  },

  'open-social': {
    id: 'open-social',
    label: 'Social',
    icon: Share2,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'communication',
    contexts: ['product-detail', 'profile'],
    handler: handlers.handleOpenSocial,
  },

  'make-offer': {
    id: 'make-offer',
    label: 'Make Offer',
    icon: DollarSign,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isAuthenticated',
    group: 'transaction',
    contexts: ['product-detail', 'messages'],
    quickSheetTitle: 'Make an Offer',
    quickSheetFields: [
      {
        name: 'offerAmount',
        label: 'Your offer',
        type: 'number',
        required: true,
        placeholder: 'Enter your offer amount',
      },
      {
        name: 'message',
        label: 'Message (optional)',
        type: 'textarea',
        placeholder: 'Add a message with your offer...',
      },
    ],
    handler: handlers.handleMakeOffer,
  },

  'quick-reply': {
    id: 'quick-reply',
    label: 'Quick Reply',
    icon: Zap,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'communication',
    contexts: ['notifications', 'messages', 'product-detail', 'my-listings'],
    quickSheetTitle: 'Quick Reply',
    quickSheetFields: [
      {
        name: 'template',
        label: 'Select template',
        type: 'select',
        required: true,
        options: [
          { value: 'available', label: 'Yes, still available!' },
          { value: 'sold', label: 'Sorry, already sold' },
          { value: 'negotiate', label: 'Open to negotiate' },
          { value: 'meetup', label: 'Can meet in [location]' },
          { value: 'details', label: 'See full description' },
        ],
      },
    ],
    handler: handlers.handleQuickReply,
  },

  'request-more-photos': {
    id: 'request-more-photos',
    label: 'Request Photos',
    icon: Camera,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isNotOwner',
    group: 'communication',
    contexts: ['product-detail', 'messages'],
    confirmTitle: 'Request more photos?',
    confirmDescription: 'The seller will be notified of your request.',
    confirmLabel: 'Send Request',
    handler: handlers.handleRequestMorePhotos,
  },

  // ==================== SOCIAL & ENGAGEMENT ====================

  'save-listing': {
    id: 'save-listing',
    label: 'Save',
    icon: Heart,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['product-detail'],
    handler: handlers.handleSaveListing,
  },

  'share-listing': {
    id: 'share-listing',
    label: 'Share',
    icon: Share2,
    variant: 'ghost',
    uiPattern: 'inline', // Changed from 'quick-sheet' to use custom ShareSheet
    permission: undefined, // Anyone can share
    group: 'social',
    contexts: ['product-detail', 'my-listings', 'notifications'],
    handler: handlers.handleShareListing,
  },

  'follow-seller': {
    id: 'follow-seller',
    label: 'Follow',
    icon: UserPlus,
    variant: 'outline',
    uiPattern: 'inline',
    permission: 'isNotOwner',
    group: 'social',
    contexts: ['product-detail', 'profile', 'notifications'],
    handler: handlers.handleFollowSeller,
  },

  'block-user': {
    id: 'block-user',
    label: 'Block User',
    icon: Ban,
    variant: 'destructive',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['profile', 'messages', 'notifications', 'product-detail'],
    confirmTitle: 'Block this user?',
    confirmDescription: 'You will no longer see their listings or receive messages from them.',
    confirmLabel: 'Block',
    handler: handlers.handleBlockUser,
  },

  'leave-review': {
    id: 'leave-review',
    label: 'Leave Review',
    icon: Star,
    variant: 'default',
    uiPattern: 'full-sheet',
    permission: 'canReview',
    group: 'social',
    contexts: ['product-detail', 'notifications'],
    fullSheetComponent: 'ReviewForm',
    handler: handlers.handleLeaveReview,
  },

  'report-listing': {
    id: 'report-listing',
    label: 'Report',
    icon: Flag,
    variant: 'ghost',
    uiPattern: 'full-sheet',
    permission: undefined, // Anyone can report
    group: 'social',
    contexts: ['product-detail', 'notifications'],
    fullSheetComponent: 'ReportListingForm',
    handler: handlers.handleReportListing,
  },

  'report-user': {
    id: 'report-user',
    label: 'Report User',
    icon: AlertCircle,
    variant: 'destructive',
    uiPattern: 'full-sheet',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['profile', 'messages', 'product-detail'],
    fullSheetComponent: 'ReportUserForm',
    handler: handlers.handleReportUser,
  },

  'review-report': {
    id: 'review-report',
    label: 'Review',
    icon: Shield,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isOwner',
    group: 'moderation',
    contexts: ['my-listings', 'notifications'],
    handler: handlers.handleReviewReport,
  },

  // ==================== GROUPS ====================

  'accept-group-invite': {
    id: 'accept-group-invite',
    label: 'Accept',
    icon: Check,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['notifications', 'groups'],
    handler: handlers.handleAcceptGroupInvite,
  },

  'reject-group-invite': {
    id: 'reject-group-invite',
    label: 'Reject',
    icon: X,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['notifications', 'groups'],
    handler: handlers.handleRejectGroupInvite,
  },

  'preview-group': {
    id: 'preview-group',
    label: 'Preview',
    icon: Eye,
    variant: 'outline',
    uiPattern: 'inline',
    permission: undefined,
    group: 'group',
    contexts: ['notifications', 'groups'],
    handler: handlers.handlePreviewGroup,
  },

  'leave-group': {
    id: 'leave-group',
    label: 'Leave Group',
    icon: X,
    variant: 'destructive',
    uiPattern: 'alert',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['groups', 'notifications'],
    confirmTitle: 'Leave this group?',
    confirmDescription: 'You will lose access to all posts and conversations.',
    confirmLabel: 'Leave',
    handler: handlers.handleLeaveGroup,
  },

  'mute-group': {
    id: 'mute-group',
    label: 'Mute',
    icon: BellOff,
    variant: 'ghost',
    uiPattern: 'quick-sheet',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['groups', 'notifications'],
    quickSheetTitle: 'Mute Notifications',
    quickSheetDescription: 'Choose how long to mute notifications from this group',
    quickSheetInputs: [
      {
        type: 'radio',
        name: 'duration',
        label: 'Duration',
        options: [
          { value: '1h', label: '1 hour' },
          { value: '8h', label: '8 hours' },
          { value: '1d', label: '1 day' },
          { value: '1w', label: '1 week' },
          { value: 'forever', label: 'Until I unmute' },
        ],
        defaultValue: '1d',
      },
    ],
    handler: handlers.handleMuteGroup,
  },

  'invite-members': {
    id: 'invite-members',
    label: 'Invite Members',
    icon: UserPlus,
    variant: 'ghost',
    uiPattern: 'full-sheet',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['groups', 'group-detail'],
    fullSheetComponent: 'InviteMembersSheet',
    handler: handlers.handleInviteMembers,
  },

  'share-group': {
    id: 'share-group',
    label: 'Share',
    icon: Share2,
    variant: 'ghost',
    uiPattern: 'full-sheet',
    permission: undefined,
    group: 'group',
    contexts: ['groups', 'group-detail'],
    fullSheetComponent: 'ShareSheet',
    handler: handlers.handleShareGroup,
  },

  'report-group': {
    id: 'report-group',
    label: 'Report Group',
    icon: Flag,
    variant: 'destructive',
    uiPattern: 'full-sheet',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['groups', 'group-detail'],
    fullSheetComponent: 'ReportGroupForm',
    handler: handlers.handleReportGroup,
  },

  'pin-group': {
    id: 'pin-group',
    label: 'Pin',
    icon: Pin,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['groups'],
    handler: handlers.handlePinGroup,
  },

  'unpin-group': {
    id: 'unpin-group',
    label: 'Unpin',
    icon: PinOff,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'group',
    contexts: ['groups'],
    handler: handlers.handleUnpinGroup,
  },

  'view-group-reports': {
    id: 'view-group-reports',
    label: 'View Reports',
    icon: AlertCircle,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['group-detail'],
    handler: handlers.handleViewGroupReports,
  },

  'moderate-group-listings': {
    id: 'moderate-group-listings',
    label: 'Moderate Listings',
    icon: Shield,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['group-detail'],
    handler: handlers.handleModerateGroupListings,
  },

  'manage-group-members': {
    id: 'manage-group-members',
    label: 'Manage Members',
    icon: Users,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['group-detail'],
    handler: handlers.handleManageGroupMembers,
  },

  'edit-group-profile': {
    id: 'edit-group-profile',
    label: 'Edit Profile',
    icon: Edit2,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['group-detail'],
    handler: handlers.handleEditGroupProfile,
  },

  'group-settings': {
    id: 'group-settings',
    label: 'Settings',
    icon: Settings,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group',
    contexts: ['group-detail'],
    handler: handlers.handleGroupSettings,
  },

  // ==================== MODERATION (LISTINGS) ====================

  'approve-listing': {
    id: 'approve-listing',
    label: 'Approve',
    icon: CheckCircle2,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail', 'pending-listings'],
    handler: handlers.handleApproveListing,
  },

  'reject-listing': {
    id: 'reject-listing',
    label: 'Reject',
    icon: XCircle,
    variant: 'outline',
    uiPattern: 'inline',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail', 'pending-listings'],
    handler: handlers.handleRejectListing,
  },

  'hide-listing': {
    id: 'hide-listing',
    label: 'Hide',
    icon: EyeOff,
    variant: 'ghost',
    uiPattern: 'quick-sheet',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail'],
    quickSheetTitle: 'Hide Listing',
    quickSheetFields: [
      {
        name: 'reason',
        label: 'Reason',
        type: 'select',
        required: true,
        options: [
          { value: 'guidelines', label: 'Violates group guidelines' },
          { value: 'inappropriate', label: 'Inappropriate content' },
          { value: 'spam', label: 'Spam or misleading' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
    handler: handlers.handleHideListing,
  },

  'remove-listing': {
    id: 'remove-listing',
    label: 'Remove',
    icon: Trash2,
    variant: 'destructive',
    uiPattern: 'quick-sheet',
    permission: 'isGroupAdmin',
    group: 'moderation',
    contexts: ['group-detail'],
    quickSheetTitle: 'Remove Listing from Group',
    quickSheetFields: [
      {
        name: 'reason',
        label: 'Reason',
        type: 'select',
        required: true,
        options: [
          { value: 'guidelines', label: 'Violates group guidelines' },
          { value: 'inappropriate', label: 'Inappropriate content' },
          { value: 'spam', label: 'Spam or scam' },
          { value: 'illegal', label: 'Illegal content' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
    handler: handlers.handleRemoveListing,
  },

  'message-owner': {
    id: 'message-owner',
    label: 'Message Owner',
    icon: MessageSquare,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail'],
    handler: handlers.handleMessageOwner,
  },

  // ==================== MODERATION (MEMBERS) ====================

  'remove-member': {
    id: 'remove-member',
    label: 'Remove Member',
    icon: UserMinus,
    variant: 'destructive',
    uiPattern: 'quick-sheet',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail'],
    quickSheetTitle: 'Remove Member from Group',
    quickSheetFields: [
      {
        name: 'reason',
        label: 'Reason',
        type: 'select',
        required: true,
        options: [
          { value: 'guidelines', label: 'Violated group guidelines' },
          { value: 'spam', label: 'Spam or harassment' },
          { value: 'inactive', label: 'Inactive member' },
          { value: 'request', label: 'Member request' },
          { value: 'other', label: 'Other' },
        ],
      },
    ],
    handler: handlers.handleRemoveMember,
  },

  'change-role': {
    id: 'change-role',
    label: 'Change Role',
    icon: UserCog,
    variant: 'ghost',
    uiPattern: 'quick-sheet',
    permission: 'isGroupAdmin',
    group: 'moderation',
    contexts: ['group-detail'],
    quickSheetTitle: 'Change Member Role',
    quickSheetFields: [
      {
        name: 'newRole',
        label: 'New Role',
        type: 'select',
        required: true,
        options: [
          { value: 'moderator', label: 'Promote to Moderator' },
          { value: 'member', label: 'Demote to Member' },
        ],
      },
    ],
    handler: handlers.handleChangeRole,
  },

  'message-member': {
    id: 'message-member',
    label: 'Message',
    icon: MessageSquare,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupModerator',
    group: 'moderation',
    contexts: ['group-detail'],
    handler: handlers.handleMessageMember,
  },

  // ==================== GROUP CONFIGURATION ====================

  'edit-group-permissions': {
    id: 'edit-group-permissions',
    label: 'Edit Permissions',
    icon: Shield,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group-config',
    contexts: ['group-settings'],
    handler: handlers.handleEditGroupPermissions,
  },

  'edit-group-visibility': {
    id: 'edit-group-visibility',
    label: 'Edit Visibility',
    icon: Eye,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group-config',
    contexts: ['group-settings'],
    handler: handlers.handleEditGroupVisibility,
  },

  'edit-group-moderation': {
    id: 'edit-group-moderation',
    label: 'Moderation Settings',
    icon: Shield,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isGroupAdmin',
    group: 'group-config',
    contexts: ['group-settings'],
    handler: handlers.handleEditGroupModeration,
  },

  // ==================== ALERTS & TRACKING ====================

  'create-price-alert': {
    id: 'create-price-alert',
    label: 'Price Alert',
    icon: Bell,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['product-detail'],
    quickSheetTitle: 'Create Price Alert',
    quickSheetFields: [
      {
        name: 'targetPrice',
        label: 'Notify me when price drops to',
        type: 'number',
        required: true,
        placeholder: 'Enter target price',
      },
    ],
    handler: handlers.handleCreatePriceAlert,
  },

  'stop-watching': {
    id: 'stop-watching',
    label: 'Stop Watching',
    icon: BellOff,
    variant: 'ghost',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['notifications', 'product-detail'],
    handler: handlers.handleStopWatching,
  },

  'view-saved-search': {
    id: 'view-saved-search',
    label: 'View Results',
    icon: Search,
    variant: 'outline',
    uiPattern: 'inline',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['notifications', 'profile'],
    handler: handlers.handleViewSavedSearch,
  },

  // ==================== ORGANIZATION ====================

  'approve-member-listing': {
    id: 'approve-member-listing',
    label: 'Approve',
    icon: CheckCircle,
    variant: 'default',
    uiPattern: 'inline',
    permission: 'isAdmin',
    group: 'organization',
    contexts: ['notifications', 'org-dashboard', 'my-listings'],
    handler: handlers.handleApproveMemberListing,
  },

  'assign-listing': {
    id: 'assign-listing',
    label: 'Assign',
    icon: UserCheck,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isAdmin',
    group: 'organization',
    contexts: ['org-dashboard', 'my-listings', 'product-detail'],
    quickSheetTitle: 'Assign Listing',
    quickSheetFields: [
      {
        name: 'memberId',
        label: 'Assign to',
        type: 'select',
        required: true,
        options: [
          { value: 'member1', label: 'John Doe' },
          { value: 'member2', label: 'Jane Smith' },
        ],
      },
    ],
    handler: handlers.handleAssignListing,
  },

  'transfer-ownership': {
    id: 'transfer-ownership',
    label: 'Transfer',
    icon: ArrowUpCircle,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'organization',
    contexts: ['my-listings', 'product-detail', 'org-dashboard'],
    quickSheetTitle: 'Transfer Ownership',
    quickSheetFields: [
      {
        name: 'newOwnerId',
        label: 'Transfer to',
        type: 'select',
        required: true,
        options: [
          { value: 'member1', label: 'John Doe' },
          { value: 'member2', label: 'Jane Smith' },
        ],
      },
    ],
    handler: handlers.handleTransferOwnership,
  },

  'bulk-edit-prices': {
    id: 'bulk-edit-prices',
    label: 'Edit Prices',
    icon: DollarSign,
    variant: 'outline',
    uiPattern: 'quick-sheet',
    permission: 'isAdmin',
    group: 'organization',
    contexts: ['my-listings', 'org-dashboard'],
    quickSheetTitle: 'Bulk Edit Prices',
    quickSheetFields: [
      {
        name: 'priceChange',
        label: 'Adjust price by (%)',
        type: 'number',
        placeholder: 'e.g., -10 for 10% discount',
        required: true,
      },
    ],
    handler: handlers.handleBulkEditPrices,
  },

  'view-team-analytics': {
    id: 'view-team-analytics',
    label: 'Team Analytics',
    icon: BarChart3,
    variant: 'outline',
    uiPattern: 'inline',
    permission: 'isAdmin',
    group: 'organization',
    contexts: ['org-dashboard', 'profile'],
    handler: handlers.handleViewTeamAnalytics,
  },

  // ==================== VERIFICATION & ACCOUNT ====================

  'verify-identity': {
    id: 'verify-identity',
    label: 'Verify Identity',
    icon: UserCheck,
    variant: 'default',
    uiPattern: 'full-sheet',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['profile', 'notifications'],
    fullSheetComponent: 'VerifyIdentityForm',
    handler: handlers.handleVerifyIdentity,
  },

  'upgrade-plan': {
    id: 'upgrade-plan',
    label: 'Upgrade',
    icon: ArrowUpCircle,
    variant: 'default',
    uiPattern: 'full-sheet',
    permission: 'isAuthenticated',
    group: 'social',
    contexts: ['profile', 'notifications'],
    fullSheetComponent: 'UpgradePlanSheet',
    handler: handlers.handleUpgradePlan,
  },

  'manage-subscription': {
    id: 'manage-subscription',
    label: 'Manage Subscription',
    icon: Settings,
    variant: 'outline',
    uiPattern: 'inline',
    permission: 'hasActiveSubscription',
    group: 'social',
    contexts: ['profile', 'notifications'],
    handler: handlers.handleManageSubscription,
  },

  // ==================== BULK ACTIONS ====================

  'bulk-pause': {
    id: 'bulk-pause',
    label: 'Pause',
    icon: Pause,
    variant: 'ghost',
    uiPattern: 'quick-sheet',
    permission: 'isOwner',
    group: 'bulk',
    contexts: ['my-listings', 'org-dashboard'],
    quickSheetTitle: 'Pause Selected Listings',
    quickSheetFields: [
      {
        name: 'reason',
        label: 'Reason',
        type: 'select',
        options: [
          { value: 'sold', label: 'Items sold' },
          { value: 'unavailable', label: 'Temporarily unavailable' },
          { value: 'update', label: 'Need updates' },
        ],
      },
    ],
    handler: handlers.handleBulkPause,
  },

  'bulk-archive': {
    id: 'bulk-archive',
    label: 'Archive',
    icon: Archive,
    variant: 'ghost',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'bulk',
    contexts: ['my-listings', 'org-dashboard'],
    confirmTitle: 'Archive selected listings?',
    confirmDescription: 'These listings will be hidden but can be restored later.',
    confirmLabel: 'Archive All',
    handler: handlers.handleBulkArchive,
  },

  'bulk-delete': {
    id: 'bulk-delete',
    label: 'Delete',
    icon: Trash2,
    variant: 'destructive',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'bulk',
    contexts: ['my-listings', 'org-dashboard'],
    confirmTitle: 'Delete selected listings?',
    confirmDescription: 'This cannot be undone. All selected listings will be permanently deleted.',
    confirmLabel: 'Delete All',
    handler: handlers.handleBulkDelete,
  },

  'bulk-boost': {
    id: 'bulk-boost',
    label: 'Boost',
    icon: TrendingUp,
    variant: 'default',
    uiPattern: 'quick-sheet',
    permission: ['isOwner', 'isPremium'],
    group: 'bulk',
    contexts: ['my-listings', 'org-dashboard'],
    quickSheetTitle: 'Boost Selected Listings',
    quickSheetFields: [
      {
        name: 'duration',
        label: 'Boost duration',
        type: 'select',
        required: true,
        options: [
          { value: '7', label: '7 days - $10/listing' },
          { value: '14', label: '14 days - $18/listing' },
        ],
        defaultValue: '7',
      },
    ],
    handler: handlers.handleBulkBoost,
  },

  'bulk-reactivate': {
    id: 'bulk-reactivate',
    label: 'Reactivate',
    icon: ArchiveRestore,
    variant: 'default',
    uiPattern: 'alert',
    permission: 'isOwner',
    group: 'bulk',
    contexts: ['my-listings', 'org-dashboard'],
    confirmTitle: 'Reactivate selected listings?',
    confirmDescription: 'All selected listings will be active again.',
    confirmLabel: 'Reactivate All',
    handler: handlers.handleBulkReactivate,
  },
};

/**
 * Helper: Obtener acción por ID
 */
export function getAction(actionId: ActionId): ActionDefinition | undefined {
  return ACTION_REGISTRY[actionId];
}

/**
 * Export alias for compatibility
 */
export const actionRegistry = ACTION_REGISTRY;