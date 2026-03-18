/**
 * Action System Types
 * Tipos centralizados para el sistema de acciones de ListlyUp
 */

import type { LucideIcon } from 'lucide-react';

// ==================== ACTION TYPES ====================

export type ActionId = 
  // Listing Management
  | 'edit-listing'
  | 'view-stats'
  | 'pause-listing'
  | 'delete-listing'
  | 'archive-listing'
  | 'mark-as-sold'
  | 'reactivate-listing'
  | 'renew-listing'
  | 'boost-listing'
  // Transactions & Offers
  | 'view-trade-offer'
  | 'accept-trade'
  | 'reject-trade'
  | 'counter-offer'
  | 'reserve-item'
  | 'confirm-delivery-received'
  | 'make-offer' // NEW: Hacer oferta desde el chat
  // Communication
  | 'respond-question'
  | 'ask-question' // NEW: Ask question on listing
  | 'reply-to-question' // NEW: Reply to question (owner)
  | 'edit-reply' // NEW: Edit existing reply
  | 'open-chat'
  | 'open-whatsapp' // NEW: Abrir WhatsApp externo
  | 'open-phone' // NEW: Llamar por teléfono
  | 'open-website' // NEW: Abrir website del vendedor (CANONICAL)
  | 'open-social' // NEW: Abrir social media del vendedor (CANONICAL)
  | 'quick-reply'
  | 'request-more-photos'
  | 'message-owner' // NEW: Message listing owner (moderator action)
  | 'message-member' // NEW: Message group member (moderator action)
  // Social & Engagement
  | 'save-listing'
  | 'share-listing'
  | 'rate-listing' // NEW: Rate product/seller
  | 'make-trade-offer' // NEW: Make trade offer on listing
  | 'follow-seller'
  | 'block-user'
  | 'leave-review'
  | 'report-listing'
  | 'report-user'
  | 'review-report' // NEW: Review/moderate a report
  // Moderation Actions
  | 'hide-listing' // NEW: Hide listing (reversible, moderator)
  | 'remove-listing' // NEW: Remove listing from group (admin)
  | 'remove-member' // NEW: Remove member from group (moderator/admin)
  | 'change-role' // NEW: Change member role (admin)
  | 'approve-listing' // NEW: Approve pending listing
  | 'reject-listing' // NEW: Reject pending listing
  // Groups
  | 'accept-group-invite'
  | 'reject-group-invite'
  | 'preview-group'
  | 'leave-group'
  | 'mute-group'
  | 'invite-members' // NEW: Invite members to group (Admin/Moderator)
  | 'share-group' // NEW: Share group with others
  | 'report-group' // NEW: Report inappropriate group
  | 'pin-group' // NEW: Pin group to top
  | 'unpin-group' // NEW: Unpin group
  | 'view-group-reports' // NEW: View reports in group (Admin)
  | 'moderate-group-listings' // NEW: Moderate pending listings (Admin/Mod)
  | 'manage-group-members' // NEW: Manage members (Admin/Mod)
  | 'edit-group-profile' // NEW: Edit group profile (Admin)
  | 'group-settings' // NEW: Manage group settings (Admin)
  // Alerts & Tracking
  | 'create-price-alert'
  | 'stop-watching'
  | 'view-saved-search'
  // Organization
  | 'approve-member-listing'
  | 'assign-listing'
  | 'transfer-ownership'
  | 'bulk-edit-prices'
  | 'view-team-analytics'
  // Verification & Account
  | 'verify-identity'
  | 'upgrade-plan'
  | 'manage-subscription'
  // Bulk Actions
  | 'bulk-pause'
  | 'bulk-archive'
  | 'bulk-delete'
  | 'bulk-boost'
  | 'bulk-reactivate';

export type ActionContext =
  | 'product-detail'
  | 'my-listings'
  | 'notifications'
  | 'groups'
  | 'group-detail'
  | 'messages'
  | 'profile'
  | 'org-dashboard'
  | 'bulk';

export type ActionUiPattern =
  | 'inline'        // Botón directo (Contact Seller, Accept)
  | 'alert'         // AlertDialog simple (Delete, Block)
  | 'quick-sheet'   // Sheet con 1-3 inputs (Pause reason, Reserve hours)
  | 'full-sheet';   // Sheet completo (Edit listing, Counter-offer)

export type ActionGroup =
  | 'listing-management'
  | 'listing-viewer'
  | 'transaction'
  | 'communication'
  | 'social'
  | 'group'
  | 'organization'
  | 'bulk';

export type PermissionRule = 
  | 'isOwner'
  | 'isNotOwner'
  | 'isAuthenticated'
  | 'isPremium'
  | 'isPro'
  | 'isAdmin'
  | 'isOrgMember'
  | 'isGroupAdmin' // Admin of group
  | 'isGroupModerator' // Moderator or Admin of group
  | 'hasActiveSubscription'
  | 'canTrade'
  | 'canReview';

// ==================== ACTION DEFINITION ====================

export interface ActionDefinition {
  id: ActionId;
  label: string;
  icon: LucideIcon;
  variant?: 'default' | 'outline' | 'ghost' | 'destructive';
  uiPattern: ActionUiPattern;
  permission?: PermissionRule | PermissionRule[];
  group: ActionGroup;
  contexts: ActionContext[];
  
  // Para AlertDialog
  confirmTitle?: string;
  confirmDescription?: string;
  confirmLabel?: string;
  
  // Para QuickSheet
  quickSheetTitle?: string;
  quickSheetFields?: QuickSheetField[];
  
  // Para FullSheet
  fullSheetComponent?: string; // Nombre del componente a cargar
  
  // Handler
  handler: (entity: any, data?: any) => Promise<void> | void;
}

export interface QuickSheetField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'number' | 'date';
  placeholder?: string;
  options?: { value: string; label: string }[];
  required?: boolean;
  defaultValue?: string | number;
}

// ==================== ENTITY TYPES ====================

export interface ActionEntity {
  id: string;
  type?: 'listing' | 'user' | 'group' | 'notification' | 'trade';
  [key: string]: any;
}

// ==================== PERMISSION CONTEXT ====================

export interface PermissionContext {
  userId?: string;
  userPlan?: 'free' | 'plus' | 'pro';
  userType?: 'individual' | 'store';
  isAuthenticated: boolean;
  organizationRole?: 'member' | 'admin' | 'owner';
  entity?: ActionEntity;
}