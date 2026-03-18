/**
 * Action Handlers
 * Lógica de negocio para cada acción
 */

import { toast } from 'sonner@2.0.3';
import { shareContent } from '../utils/helpers';
import { toggleSaveItem, isItemSaved } from '../utils/savedItems';
import type { ActionEntity } from './types';
import { useGroupSheets } from '../lib/useGroupSheets';
import { useReportSheet } from '../hooks/useReportSheet';
import { createModerationChat } from '../data/chatMessages'; // ✅ DUAL FLOW: Import moderation chat helper

// ==================== LISTING MANAGEMENT ====================

export async function handleEditListing(entity: ActionEntity) {
  // NOTE: This handler is called from ActionButtons component
  // In a real app, this would:
  // 1. Navigate to edit-listing view
  // 2. Pass entity data as initialData to PublishFlow
  // 3. PublishFlow would open in mode="edit"
  
  // For now, just show a toast
  // The actual navigation should be handled by the parent component
  // via customHandlers prop in ActionButtons
  
  toast.info(`Opening edit mode for: ${entity.title || entity.id}`);
}

export async function handleViewStats(entity: ActionEntity) {
  toast.info(`Viewing stats for: ${entity.title || entity.id}`);
  console.log('View stats:', entity);
}

export async function handlePauseListing(entity: ActionEntity, data?: { reason?: string; duration?: string }) {
  const reason = data?.reason || 'No reason provided';
  toast.success(`Listing paused: ${reason}`);
  console.log('Pause listing:', entity, data);
}

export async function handleDeleteListing(entity: ActionEntity) {
  toast.success(`Listing deleted: ${entity.title || entity.id}`);
  console.log('Delete listing:', entity);
}

export async function handleArchiveListing(entity: ActionEntity) {
  toast.success(`Listing archived: ${entity.title || entity.id}`);
  console.log('Archive listing:', entity);
}

export async function handleMarkAsSold(entity: ActionEntity, data?: { soldDate?: string; soldPrice?: string }) {
  toast.success(`Marked as sold! 🎉`);
  console.log('Mark as sold:', entity, data);
}

export async function handleDuplicateListing(entity: ActionEntity) {
  toast.success(`Listing duplicated!`);
  console.log('Duplicate listing:', entity);
}

export async function handleReactivateListing(entity: ActionEntity) {
  toast.success(`Listing reactivated!`);
  console.log('Reactivate listing:', entity);
}

export async function handleRenewListing(entity: ActionEntity) {
  toast.success(`Listing renewed for 30 days!`);
  console.log('Renew listing:', entity);
}

export async function handleBoostListing(entity: ActionEntity, data?: { duration?: string }) {
  const duration = data?.duration || '7 days';
  toast.success(`Listing boosted for ${duration}! 🚀`);
  console.log('Boost listing:', entity, data);
}

export async function handleReportSoldElsewhere(entity: ActionEntity) {
  toast.info(`Marked as sold elsewhere`);
  console.log('Report sold elsewhere:', entity);
}

export async function handleExportAnalytics(entity: ActionEntity) {
  toast.success(`Analytics exported to CSV`);
  console.log('Export analytics:', entity);
}

export async function handlePrintQR(entity: ActionEntity) {
  toast.success(`QR code generated!`);
  console.log('Print QR:', entity);
}

// ==================== TRANSACTIONS & OFFERS ====================

export async function handleViewTradeOffer(entity: ActionEntity) {
  toast.info(`Viewing trade offer...`);
  console.log('View trade offer:', entity);
}

export async function handleAcceptTrade(entity: ActionEntity) {
  toast.success(`Trade accepted! 🤝`);
  console.log('Accept trade:', entity);
}

export async function handleRejectTrade(entity: ActionEntity) {
  toast.info(`Trade rejected`);
  console.log('Reject trade:', entity);
}

export async function handleCounterOffer(entity: ActionEntity, data?: any) {
  toast.success(`Counter-offer sent!`);
  console.log('Counter offer:', entity, data);
}

export async function handleReserveItem(entity: ActionEntity, data?: { hours?: number }) {
  const hours = data?.hours || 24;
  toast.success(`Item reserved for ${hours}h! ⏰`);
  console.log('Reserve item:', entity, data);
}

export async function handleConfirmDelivery(entity: ActionEntity) {
  toast.success(`Delivery confirmed! ✓`);
  console.log('Confirm delivery:', entity);
}

// ==================== COMMUNICATION ====================

export async function handleMessageOwner(entity: ActionEntity) {
  // ✅ DUAL FLOW: Create moderation chat with listing owner and navigate
  
  // Extract owner ID from entity metadata
  const ownerId = entity.metadata?.ownerId || `owner-${entity.id}`;
  const listingId = entity.id;
  
  // Create moderation conversation
  const chatId = createModerationChat(ownerId, listingId, 'listing');
  
  // Navigate to chat (in real app, use router navigation)
  // For now, we need to trigger navigation from the parent component
  // This would typically dispatch a navigation event or use a callback
  
  toast.success('Opening moderation chat...', {
    description: 'Starting conversation with listing owner.',
    duration: 2000,
  });
  
  // TODO: Add navigation callback or event
  console.log('[DUAL FLOW] Created moderation chat:', chatId, 'for listing:', listingId);
  
  // Return chatId so parent component can handle navigation
  return chatId;
}

export async function handleMessageMember(entity: ActionEntity) {
  // ✅ DUAL FLOW: Create moderation chat with member and navigate
  
  // Extract member ID from entity
  const memberId = entity.id;
  
  // Create moderation conversation
  const chatId = createModerationChat(memberId, undefined, 'user');
  
  // Navigate to chat
  toast.success('Opening moderation chat...', {
    description: 'Starting conversation with member.',
    duration: 2000,
  });
  
  console.log('[DUAL FLOW] Created moderation chat:', chatId, 'for member:', memberId);
  
  // Return chatId so parent component can handle navigation
  return chatId;
}

export async function handleRespondQuestion(entity: ActionEntity, data?: { response?: string }) {
  toast.success(`Response sent!`);
  console.log('Respond question:', entity, data);
}

export async function handleOpenChat(entity: ActionEntity) {
  // TODO: Implementar navegación real al chat
  // Necesita acceso al hook useAppNavigation
  toast.info(`Opening chat with seller...`);
  console.log('Open chat:', entity);
  
  // Por ahora mostramos un toast, será conectado en ProductActions
}

export async function handleOpenWhatsApp(entity: ActionEntity) {
  // Construir mensaje pre-llenado para WhatsApp
  const productTitle = entity.title || 'this item';
  const message = encodeURIComponent(`Hi! I'm interested in ${productTitle} on ListlyUp`);
  
  // Get WhatsApp phone from canonical field
  const whatsappPhone = entity.contact_whatsapp_phone || entity.phoneNumber;
  
  if (!whatsappPhone) {
    toast.error('WhatsApp number not available');
    return;
  }
  
  // Abrir WhatsApp (web o app dependiendo del dispositivo)
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const whatsappUrl = isMobile 
    ? `whatsapp://send?phone=${whatsappPhone}&text=${message}`
    : `https://web.whatsapp.com/send?phone=${whatsappPhone}&text=${message}`;
  
  window.open(whatsappUrl, '_blank');
  toast.success(`Opening WhatsApp...`);
  console.log('Open WhatsApp:', entity, whatsappPhone);
}

export async function handleOpenPhone(entity: ActionEntity) {
  const phoneNumber = entity.contact_whatsapp_phone || entity.phoneNumber;
  
  if (!phoneNumber) {
    toast.error('Phone number not available');
    return;
  }
  
  // Abrir el dialer del teléfono
  window.location.href = `tel:${phoneNumber}`;
  toast.success(`Calling ${phoneNumber}...`);
  console.log('Open phone:', entity, phoneNumber);
}

export async function handleOpenWebsite(entity: ActionEntity) {
  const websiteUrl = entity.contact_website_url;
  
  if (!websiteUrl) {
    toast.error('Website URL not available');
    return;
  }
  
  // Abrir website en nueva pestaña
  window.open(websiteUrl, '_blank');
  toast.success(`Opening website...`);
  console.log('Open website:', entity, websiteUrl);
}

export async function handleOpenSocial(entity: ActionEntity) {
  const socialUrl = entity.contact_social_url;
  
  if (!socialUrl) {
    toast.error('Social media URL not available');
    return;
  }
  
  // Abrir social media en nueva pestaña
  window.open(socialUrl, '_blank');
  toast.success(`Opening social media...`);
  console.log('Open social:', entity, socialUrl);
}

export async function handleMakeOffer(entity: ActionEntity, data?: { offerAmount?: number; message?: string }) {
  if (!data?.offerAmount) {
    toast.error('Please enter an offer amount');
    return;
  }
  
  toast.success(`Offer of $${data.offerAmount} sent!`);
  console.log('Make offer:', entity, data);
  
  // TODO: Esta función será llamada desde ChatConversationPage
  // para crear un mensaje tipo "offer" en el chat
}

export async function handleQuickReply(entity: ActionEntity, data?: { template?: string }) {
  toast.success(`Quick reply sent!`);
  console.log('Quick reply:', entity, data);
}

export async function handleRequestMorePhotos(entity: ActionEntity) {
  toast.info(`Photo request sent to seller`);
  console.log('Request more photos:', entity);
}

// ==================== SOCIAL & ENGAGEMENT ====================

export async function handleSaveListing(entity: ActionEntity) {
  const isSaved = toggleSaveItem({
    id: entity.id,
    title: entity.title || 'Unknown Item',
    price: entity.price,
    image: entity.image || 'https://via.placeholder.com/400',
    location: entity.location,
    type: entity.type,
  });

  if (isSaved) {
    toast.success(`Saved to your collection! 💾`, {
      description: 'View in Saved Items',
    });
  } else {
    toast.info('Removed from saved items');
  }
  
  console.log('Save listing:', entity, isSaved ? 'saved' : 'unsaved');
}

export async function handleShareListing(entity: ActionEntity, data?: { method?: 'whatsapp' | 'link' | 'qr' }) {
  const method = data?.method || 'link';
  
  if (method === 'link') {
    await shareContent({
      title: entity.title || 'Check this out!',
      text: `${entity.title} - ${entity.price || ''}`,
      url: window.location.href,
    });
  } else if (method === 'whatsapp') {
    const text = encodeURIComponent(`Check out: ${entity.title} - ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  } else {
    toast.success(`QR code generated!`);
  }
  
  console.log('Share listing:', entity, method);
}

export async function handleFollowSeller(entity: ActionEntity) {
  toast.success(`Following seller! 👤`);
  console.log('Follow seller:', entity);
}

export async function handleBlockUser(entity: ActionEntity) {
  toast.success(`User blocked`);
  console.log('Block user:', entity);
}

export async function handleLeaveReview(entity: ActionEntity, data?: any) {
  toast.success(`Review submitted! ⭐`);
  console.log('Leave review:', entity, data);
}

export async function handleReportListing(entity: ActionEntity) {
  // Open Report Listing Sheet
  const { open } = useReportSheet.getState();
  open(entity.id, entity.title || 'this listing');
  console.log('Report listing:', entity);
}

export async function handleReportUser(entity: ActionEntity) {
  toast.info(`Opening report form...`);
  console.log('Report user:', entity);
}

export async function handleReviewReport(entity: ActionEntity) {
  toast.info(`Opening report details for moderation...`);
  console.log('Review report:', entity);
  // TODO: Navigate to report moderation interface
}

// ==================== GROUPS ====================

export async function handleAcceptGroupInvite(entity: ActionEntity) {
  toast.success(`Joined group! 👥`);
  console.log('Accept group invite:', entity);
}

export async function handleRejectGroupInvite(entity: ActionEntity) {
  toast.info(`Group invitation declined`);
  console.log('Reject group invite:', entity);
}

export async function handlePreviewGroup(entity: ActionEntity) {
  toast.info(`Opening group preview...`);
  console.log('Preview group:', entity);
}

export async function handleLeaveGroup(entity: ActionEntity) {
  // Open Leave Group Dialog
  const { openLeaveGroup } = useGroupSheets.getState();
  openLeaveGroup(entity.id, entity.name || entity.title || 'this group');
  console.log('Leave group:', entity);
}

export async function handleMuteGroup(entity: ActionEntity) {
  // Open Mute Group Dialog
  const { openMuteGroup } = useGroupSheets.getState();
  openMuteGroup(entity.id, entity.name || entity.title || 'this group');
  console.log('Mute group:', entity);
}

export async function handleInviteMembers(entity: ActionEntity) {
  // Open Invite Members Sheet
  const { openInviteMembers } = useGroupSheets.getState();
  openInviteMembers(entity.id, entity.name || entity.title || 'this group');
  console.log('Invite members:', entity);
}

export async function handleShareGroup(entity: ActionEntity) {
  try {
    const result = await shareContent({
      title: entity.title || 'Check out this group!',
      text: `Join ${entity.title || 'this group'} on ListlyUp!`,
      url: window.location.href,
    });

    if (result.success) {
      if (result.method === 'clipboard' || result.method === 'manual') {
        toast.success('Link copied to clipboard!');
      } else if (result.method === 'native') {
        toast.success('Shared successfully!');
      }
    } else if (result.method === 'failed') {
      toast.error('Failed to copy link. Please try again.');
    }
  } catch (error) {
    console.error('Share error:', error);
    toast.error('Failed to share. Please try again.');
  }
  
  console.log('Share group:', entity);
}

export async function handleReportGroup(entity: ActionEntity) {
  // Open Report Group Sheet
  const { openReportGroup } = useGroupSheets.getState();
  openReportGroup(entity.id, entity.name || entity.title || 'this group');
  console.log('Report group:', entity);
}

export async function handlePinGroup(entity: ActionEntity) {
  toast.success(`Group pinned/unpinned`);
  console.log('Pin group:', entity);
  // TODO: Backend - Toggle pin status
}

export async function handleUnpinGroup(entity: ActionEntity) {
  toast.success(`Group unpinned`);
  console.log('Unpin group:', entity);
  // TODO: Backend - Toggle pin status
}

export async function handleViewGroupReports(entity: ActionEntity) {
  toast.info(`Opening group reports...`);
  console.log('View group reports:', entity);
  // TODO: Navigate to group reports page
}

export async function handleModerateGroupListings(entity: ActionEntity) {
  toast.info(`Opening listings moderation...`);
  console.log('Moderate group listings:', entity);
  // TODO: Navigate to moderation page
}

export async function handleManageGroupMembers(entity: ActionEntity) {
  toast.info(`Opening members management...`);
  console.log('Manage group members:', entity);
  // TODO: Navigate to members management page
}

export async function handleEditGroupProfile(entity: ActionEntity) {
  toast.info(`Opening group profile editor...`);
  console.log('Edit group profile:', entity);
  // TODO: Navigate to group profile editor
}

export async function handleGroupSettings(entity: ActionEntity) {
  toast.info(`Opening group settings...`);
  console.log('Group settings:', entity);
  // TODO: Navigate to group settings page
}

// ==================== MODERATION (LISTINGS) ====================

export async function handleHideListing(entity: ActionEntity, data?: { reason?: string }) {
  // If called directly with data (from sheet), execute
  if (data?.reason) {
    const reason = data.reason;
    toast.success(`Listing hidden (reversible)`, {
      description: `Reason: ${reason}`,
    });
    console.log('Hide listing:', entity, data);
    return;
  }
  
  // Otherwise open sheet
  const { openHideListing } = useGroupSheets.getState();
  openHideListing(entity.id, entity.title || 'this listing');
  console.log('Opening hide listing sheet:', entity);
}

export async function handleRemoveListing(entity: ActionEntity, data?: { reason?: string }) {
  // If called directly with data (from sheet), execute
  if (data?.reason) {
    const reason = data.reason;
    toast.success(`Listing removed from group`, {
      description: `Reason: ${reason}`,
    });
    console.log('Remove listing:', entity, data);
    return;
  }
  
  // Otherwise open sheet
  const { openRemoveListing } = useGroupSheets.getState();
  openRemoveListing(entity.id, entity.title || 'this listing');
  console.log('Opening remove listing sheet:', entity);
}

export async function handleApproveListing(entity: ActionEntity) {
  toast.success(`Listing approved! ✅`);
  console.log('Approve listing:', entity);
  // TODO: Backend - Update listing status to approved
}

export async function handleRejectListing(entity: ActionEntity) {
  toast.info(`Listing rejected`);
  console.log('Reject listing:', entity);
  // TODO: Backend - Update listing status to rejected
}

// ==================== MODERATION (MEMBERS) ====================

export async function handleRemoveMember(entity: ActionEntity, data?: { reason?: string }) {
  // If called directly with data (from sheet), execute
  if (data?.reason) {
    const memberName = entity.name || entity.username || 'member';
    const reason = data.reason;
    toast.success(`${memberName} removed from group`, {
      description: `Reason: ${reason}`,
    });
    console.log('Remove member:', entity, data);
    return;
  }
  
  // Otherwise open sheet
  const { openRemoveMember } = useGroupSheets.getState();
  const memberRole = (entity.role as 'member' | 'moderator') || 'member';
  openRemoveMember(entity.id, entity.name || 'member', memberRole);
  console.log('Opening remove member sheet:', entity);
}

export async function handleChangeRole(entity: ActionEntity, data?: { newRole?: 'member' | 'moderator' | 'admin' }) {
  // If called directly with data (from sheet), execute
  if (data?.newRole) {
    const memberName = entity.name || entity.username || 'member';
    const newRole = data.newRole;
    const actionLabel = newRole === 'moderator' ? 'promoted to Moderator' : 'demoted to Member';
    
    toast.success(`${memberName} ${actionLabel}`, {
      description: `Role changed successfully`,
    });
    console.log('Change role:', entity, data);
    return;
  }
  
  // Otherwise open sheet
  const { openChangeRole } = useGroupSheets.getState();
  const currentRole = (entity.role as 'member' | 'moderator') || 'member';
  openChangeRole(entity.id, entity.name || 'member', currentRole);
  console.log('Opening change role sheet:', entity);
}

// ==================== GROUP CONFIGURATION ====================

export async function handleEditGroupPermissions(entity: ActionEntity) {
  toast.info(`Opening permissions editor...`);
  console.log('Edit group permissions:', entity);
  // TODO: Navigate to permissions configuration
}

export async function handleEditGroupVisibility(entity: ActionEntity) {
  toast.info(`Opening visibility settings...`);
  console.log('Edit group visibility:', entity);
  // TODO: Navigate to visibility configuration
}

export async function handleEditGroupModeration(entity: ActionEntity) {
  toast.info(`Opening moderation settings...`);
  console.log('Edit group moderation:', entity);
  // TODO: Navigate to moderation configuration
}

// ==================== ALERTS & TRACKING ====================

export async function handleCreatePriceAlert(entity: ActionEntity, data?: { targetPrice?: number }) {
  toast.success(`Price alert created! 🔔`);
  console.log('Create price alert:', entity, data);
}

export async function handleStopWatching(entity: ActionEntity) {
  toast.info(`Stopped watching this item`);
  console.log('Stop watching:', entity);
}

export async function handleViewSavedSearch(entity: ActionEntity) {
  toast.info(`Loading saved search results...`);
  console.log('View saved search:', entity);
}

// ==================== ORGANIZATION ====================

export async function handleApproveMemberListing(entity: ActionEntity) {
  toast.success(`Listing approved! ✓`);
  console.log('Approve member listing:', entity);
}

export async function handleAssignListing(entity: ActionEntity, data?: { memberId?: string }) {
  toast.success(`Listing assigned!`);
  console.log('Assign listing:', entity, data);
}

export async function handleTransferOwnership(entity: ActionEntity, data?: { newOwnerId?: string }) {
  toast.success(`Ownership transferred!`);
  console.log('Transfer ownership:', entity, data);
}

export async function handleBulkEditPrices(entity: ActionEntity, data?: { priceChange?: number }) {
  toast.success(`Prices updated!`);
  console.log('Bulk edit prices:', entity, data);
}

export async function handleViewTeamAnalytics(entity: ActionEntity) {
  toast.info(`Loading team analytics...`);
  console.log('View team analytics:', entity);
}

// ==================== VERIFICATION & ACCOUNT ====================

export async function handleVerifyIdentity(entity: ActionEntity) {
  toast.info(`Opening identity verification...`);
  console.log('Verify identity:', entity);
}

export async function handleUpgradePlan(entity: ActionEntity) {
  toast.info(`Opening upgrade options...`);
  console.log('Upgrade plan:', entity);
}

export async function handleManageSubscription(entity: ActionEntity) {
  toast.info(`Opening subscription management...`);
  console.log('Manage subscription:', entity);
}

// ==================== BULK ACTIONS ====================

export async function handleBulkPause(entities: ActionEntity[], data?: { reason?: string }) {
  toast.success(`${entities.length} listings paused`);
  console.log('Bulk pause:', entities, data);
}

export async function handleBulkArchive(entities: ActionEntity[]) {
  toast.success(`${entities.length} listings archived`);
  console.log('Bulk archive:', entities);
}

export async function handleBulkDelete(entities: ActionEntity[]) {
  toast.success(`${entities.length} listings deleted`);
  console.log('Bulk delete:', entities);
}

export async function handleBulkBoost(entities: ActionEntity[], data?: { duration?: string }) {
  toast.success(`${entities.length} listings boosted! 🚀`);
  console.log('Bulk boost:', entities, data);
}

export async function handleBulkReactivate(entities: ActionEntity[]) {
  toast.success(`${entities.length} listings reactivated`);
  console.log('Bulk reactivate:', entities);
}