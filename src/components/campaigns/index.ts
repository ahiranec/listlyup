/**
 * Campaigns Module Exports
 */

export { CampaignRequestCard } from './CampaignRequestCard';
export { CampaignSettingsSheet } from './CampaignSettingsSheet';

// ⚠️ DEPRECATED (2026-01-18): Use canonical GAM from /components/global-action-modal
// @deprecated Use useGlobalActionModal() hook instead
export { GlobalActionModal } from './GlobalActionModal';
// @deprecated Use ActionId from /components/global-action-modal/routing-table instead
export type { GlobalActionId, GlobalActionContext } from './GlobalActionModal';

export { CampaignApprovalSheet } from './CampaignApprovalSheet';
export { CampaignRejectionSheet } from './CampaignRejectionSheet';
