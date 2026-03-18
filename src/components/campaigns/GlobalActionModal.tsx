/**
 * Global Action Modal (Phase 1 + Phase 2)
 * 
 * ⚠️ DEPRECATED — 0 CALLERS (as of 2026-01-18)
 * 
 * This component has been DEPRECATED and replaced by canonical GlobalActionModal
 * located at /components/global-action-modal/GlobalActionModal.tsx with extended
 * routing table support for approval/rejection flows.
 * 
 * MIGRATION STATUS: COMPLETE ✅
 * - ActionCenterPage migrated to canonical GAM (2026-01-18)
 * - All 4 approval/rejection actions now route through canonical GAM
 * - 0 active callers remaining
 * 
 * DELETION GATE:
 * - ✅ Project-wide search confirms 0 imports (excluding docs)
 * - ⏳ Build/CI passes
 * - ⏳ Smoke test passes (4 approval/rejection flows)
 * 
 * Old usage:
 *   <GlobalActionModal
 *     open={globalActionModalOpen}
 *     onOpenChange={setGlobalActionModalOpen}
 *     actionId="approve-campaign-request"
 *     context={{ entityType: 'campaign', entityName: '...', ... }}
 *     onActionComplete={handleComplete}
 *   />
 * 
 * New usage:
 *   import { useGlobalActionModal } from './components/global-action-modal';
 *   const { dispatch } = useGlobalActionModal();
 *   
 *   dispatch({
 *     actionId: 'approve-campaign-request',
 *     context: { entityType: 'campaign', entityName: '...', ... },
 *     onConfirm: () => {
 *       // Business logic + toast here
 *     },
 *   });
 * 
 * Safe to delete after: Build verification + smoke test pass (est. 2026-01-20)
 * 
 * ARCHITECTURE: Dispatcher Only (NO Logic Execution)
 * 
 * PURPOSE:
 * - Receives actionId + context
 * - Resolves which canonical executor to open
 * - Opens appropriate Sheet/Dialog
 * - Closes self after delegation
 * 
 * DOES NOT:
 * ❌ Execute business logic
 * ❌ Show toasts
 * ❌ Mutate state
 * ❌ Call backend
 * 
 * DOES ONLY:
 * ✅ Receive ActionId + Context
 * ✅ Resolve which canonical to open
 * ✅ Open appropriate Sheet/Dialog
 * ✅ Pass context to canonical
 * 
 * CURRENT SCOPE (Phase 1 + Phase 2):
 * - approve-campaign-request → CampaignApprovalSheet
 * - reject-campaign-request → CampaignRejectionSheet
 * - approve-event-request → EventApprovalSheet
 * - reject-event-request → EventRejectionSheet
 * 
 * FUTURE (Phase 3+):
 * - pause/resume/delete/share → ConfirmActionDialog
 */

import { CampaignApprovalSheet } from './CampaignApprovalSheet';
import { CampaignRejectionSheet } from './CampaignRejectionSheet';
import { EventApprovalSheet } from '../events/EventApprovalSheet';
import { EventRejectionSheet } from '../events/EventRejectionSheet';

export type GlobalActionId = 
  | 'approve-campaign-request'
  | 'reject-campaign-request'
  | 'approve-event-request'
  | 'reject-event-request'
  // Future actions (Phase 3):
  // | 'pause-campaign'
  // | 'resume-campaign'
  // | 'delete-campaign'
  // | 'share-campaign';

export interface GlobalActionContext {
  // Entity info
  entityType: 'campaign' | 'event';
  entityId: string;
  entityName: string;
  
  // Listing info (for approval/rejection flows)
  listingId?: string;
  listingName?: string;
  listingImage?: string;
  requestedBy?: string;
  
  // Additional data
  qualifies?: boolean;
  reason?: string;
  additionalData?: Record<string, unknown>;
}

interface GlobalActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionId: GlobalActionId | null;
  context: GlobalActionContext | null;
  onActionComplete?: () => void;
}

export function GlobalActionModal({
  open,
  onOpenChange,
  actionId,
  context,
  onActionComplete,
}: GlobalActionModalProps) {
  // Close the dispatcher and trigger completion callback
  const handleComplete = () => {
    onOpenChange(false);
    onActionComplete?.();
  };

  // Phase 1 + Phase 2: Handle campaign and event approval/rejection
  // Future phases will add more actions via switch/case

  if (!actionId || !context) {
    return null;
  }

  // ROUTING LOGIC: ActionId → Canonical Executor
  return (
    <>
      {/* ROUTE 1: Approve Campaign Request → CampaignApprovalSheet */}
      {actionId === 'approve-campaign-request' && (
        <CampaignApprovalSheet
          open={open}
          onOpenChange={onOpenChange}
          listing={context.listingName || 'Unknown Listing'}
          listingImage={context.listingImage || ''}
          campaign={context.entityName}
          requestedBy={context.requestedBy || 'Unknown User'}
          onComplete={handleComplete}
        />
      )}

      {/* ROUTE 2: Reject Campaign Request → CampaignRejectionSheet */}
      {actionId === 'reject-campaign-request' && (
        <CampaignRejectionSheet
          open={open}
          onOpenChange={onOpenChange}
          listing={context.listingName || 'Unknown Listing'}
          listingImage={context.listingImage || ''}
          campaign={context.entityName}
          requestedBy={context.requestedBy || 'Unknown User'}
          onComplete={handleComplete}
        />
      )}

      {/* ROUTE 3: Approve Event Request → EventApprovalSheet */}
      {actionId === 'approve-event-request' && (
        <EventApprovalSheet
          open={open}
          onOpenChange={onOpenChange}
          listing={context.listingName || 'Unknown Listing'}
          listingImage={context.listingImage || ''}
          eventHub={context.entityName}
          requestedBy={context.requestedBy || 'Unknown User'}
          onComplete={handleComplete}
        />
      )}

      {/* ROUTE 4: Reject Event Request → EventRejectionSheet */}
      {actionId === 'reject-event-request' && (
        <EventRejectionSheet
          open={open}
          onOpenChange={onOpenChange}
          listing={context.listingName || 'Unknown Listing'}
          listingImage={context.listingImage || ''}
          eventHub={context.entityName}
          requestedBy={context.requestedBy || 'Unknown User'}
          onComplete={handleComplete}
        />
      )}

      {/* FUTURE ROUTES (Phase 2+):
      
      {['pause-campaign', 'resume-campaign', 'delete-campaign'].includes(actionId) && (
        <ConfirmActionDialog
          open={open}
          onOpenChange={onOpenChange}
          actionId={actionId}
          {...context}
          onComplete={handleComplete}
        />
      )}
      
      */}
    </>
  );
}

/**
 * ACTION ROUTING TABLE (Phase 1 + Phase 2)
 * =========================================
 * 
 * ActionId                    → Canonical Executor         → Variant/Context
 * ─────────────────────────────────────────────────────────────────────────
 * approve-campaign-request    → CampaignApprovalSheet      → campaign context
 * reject-campaign-request     → CampaignRejectionSheet     → campaign + reason
 * approve-event-request       → EventApprovalSheet         → event context
 * reject-event-request        → EventRejectionSheet        → event + reason
 * 
 * 
 * FUTURE ROUTING TABLE (Phase 3+)
 * ================================
 * 
 * pause-campaign              → ConfirmActionDialog        → warning variant
 * resume-campaign             → ConfirmActionDialog        → success variant
 * delete-campaign             → ConfirmActionDialog        → destructive variant
 * duplicate-campaign          → ConfirmActionDialog        → info variant
 * share-campaign              → ShareSheet                 → campaign context
 * pause-event                 → ConfirmActionDialog        → warning variant
 * resume-event                → ConfirmActionDialog        → success variant
 * cancel-event                → ConfirmActionDialog        → destructive variant
 * delete-event                → ConfirmActionDialog        → destructive variant
 * duplicate-event             → ConfirmActionDialog        → info variant
 * share-event                 → ShareSheet                 → event context
 */