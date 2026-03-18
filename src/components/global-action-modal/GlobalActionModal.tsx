/**
 * GlobalActionModal (GAM) — Phase 5 V1 + Approval/Rejection Sheets
 * 
 * ROLE: Central dispatcher/router for all modal actions
 * PATTERN: Entry Point → GAM → Canonical Executor (Dialog OR Sheet)
 * 
 * CRITICAL RULES:
 * - GAM does NOT execute business logic
 * - GAM does NOT show toast
 * - GAM ONLY routes to appropriate canonical
 * - All business logic remains in onConfirm callbacks
 * 
 * SCOPE (Phase 5 V1 + Approval/Rejection):
 * - Confirmation actions via ConfirmActionDialog
 * - Approval/Rejection actions via specialized Sheets
 * - No navigation or toggle actions (future phases)
 */

import { useState, createContext, useContext, ReactNode } from 'react';
import { ConfirmActionDialog, type ConfirmActionDialogData } from '../action-center/ConfirmActionDialog';
import { CampaignApprovalSheet } from '../campaigns/CampaignApprovalSheet';
import { CampaignRejectionSheet } from '../campaigns/CampaignRejectionSheet';
import { EventApprovalSheet } from '../events/EventApprovalSheet';
import { EventRejectionSheet } from '../events/EventRejectionSheet';
import { MakeOfferSheet } from '../sheets/MakeOfferSheet';
import { ReportSheet } from '../product-detail/ReportSheet';
import ShareSheet from '../share/ShareSheet';
import { ShareToGroupSheet } from '../groups/ShareToGroupSheet';
import { ROUTING_TABLE, type ActionId, type ActionContext, type ActionConfig, type SheetConfig } from './routing-table';

// ============================================================================
// Types
// ============================================================================

interface GlobalActionPayload {
  actionId: ActionId;
  context: ActionContext;
  onConfirm: () => void;
}

interface GlobalActionModalContextValue {
  /**
   * Dispatch an action through GAM
   * @param payload - Action configuration
   */
  dispatch: (payload: GlobalActionPayload) => void;
  
  /**
   * Close the active modal
   */
  close: () => void;
}

// ============================================================================
// Context
// ============================================================================

const GlobalActionModalContext = createContext<GlobalActionModalContextValue | null>(null);

export function useGlobalActionModal() {
  const context = useContext(GlobalActionModalContext);
  if (!context) {
    throw new Error('useGlobalActionModal must be used within GlobalActionModalProvider');
  }
  return context;
}

// ============================================================================
// Provider Component
// ============================================================================

interface GlobalActionModalProviderProps {
  children: ReactNode;
}

// Sheet configuration for rendering
interface SheetState {
  type: 'campaign-approval' | 'campaign-rejection' | 'event-approval' | 'event-rejection' | 'make-offer' | 'report-listing' | 'share-listing' | 'share-to-group';
  listing: string;
  listingImage: string;
  entityName: string;
  requestedBy: string;
  productId?: string;
  productPrice?: string;
  productLocation?: string;
  productType?: string;
  sellerId?: string;
  sellerName?: string;
  onComplete: () => void;
}

export function GlobalActionModalProvider({ children }: GlobalActionModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);
  const [sheetState, setSheetState] = useState<SheetState | null>(null);

  const dispatch = (payload: GlobalActionPayload) => {
    const { actionId, context: actionContext, onConfirm } = payload;

    // ✅ STEP 1: Lookup routing table
    const route = ROUTING_TABLE[actionId];
    
    if (!route) {
      console.error(`[GAM] No route found for actionId: ${actionId}`);
      return;
    }

    // ✅ STEP 2: Get configuration for this context
    const config = route.getConfig(actionContext);

    if (!config) {
      console.error(`[GAM] No config found for actionId: ${actionId}, context:`, actionContext);
      return;
    }

    // ✅ STEP 3: Route to appropriate executor based on type
    if (route.type === 'dialog') {
      // Confirmation Dialog Route
      const dialogData: ConfirmActionDialogData = {
        variant: (config as ActionConfig).variant,
        icon: (config as ActionConfig).icon,
        title: (config as ActionConfig).title,
        description: (config as ActionConfig).description,
        details: (config as ActionConfig).details,
        consequences: (config as ActionConfig).consequences,
        confirmLabel: (config as ActionConfig).confirmLabel,
        cancelLabel: (config as ActionConfig).cancelLabel,
        onConfirm: () => {
          // ✅ CRITICAL: Execute callback (contains business logic + toast)
          onConfirm();
          // ✅ CRITICAL: Close modal after execution
          setIsOpen(false);
          setConfirmDialogData(null);
        },
      };

      setConfirmDialogData(dialogData);
      setSheetState(null);
      setIsOpen(true);
    } else if (route.type === 'sheet') {
      // Approval/Rejection Sheet Route
      const sheetData: SheetState = {
        type: (config as SheetConfig).sheetType,
        listing: (config as SheetConfig).listing,
        listingImage: (config as SheetConfig).listingImage,
        entityName: (config as SheetConfig).entityName,
        requestedBy: (config as SheetConfig).requestedBy,
        productId: (config as SheetConfig).productId,
        productPrice: (config as SheetConfig).productPrice,
        productLocation: (config as SheetConfig).productLocation,
        productType: (config as SheetConfig).productType,
        sellerId: (config as SheetConfig).sellerId,
        sellerName: (config as SheetConfig).sellerName,
        onComplete: () => {
          // ✅ CRITICAL: Execute callback (contains business logic + toast)
          onConfirm();
          // ✅ CRITICAL: Close sheet after execution
          setIsOpen(false);
          setSheetState(null);
        },
      };

      setSheetState(sheetData);
      setConfirmDialogData(null);
      setIsOpen(true);
    }
  };

  const close = () => {
    setIsOpen(false);
    setConfirmDialogData(null);
    setSheetState(null);
  };

  const value: GlobalActionModalContextValue = {
    dispatch,
    close,
  };

  return (
    <GlobalActionModalContext.Provider value={value}>
      {children}

      {/* ========== CONFIRMATION DIALOG EXECUTOR ========== */}
      {confirmDialogData && (
        <ConfirmActionDialog
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setConfirmDialogData(null);
            }
          }}
          data={confirmDialogData}
        />
      )}

      {/* ========== APPROVAL/REJECTION SHEET EXECUTORS ========== */}
      {sheetState && sheetState.type === 'campaign-approval' && (
        <CampaignApprovalSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          listing={sheetState.listing}
          listingImage={sheetState.listingImage}
          campaign={sheetState.entityName}
          requestedBy={sheetState.requestedBy}
          onComplete={sheetState.onComplete}
        />
      )}

      {sheetState && sheetState.type === 'campaign-rejection' && (
        <CampaignRejectionSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          listing={sheetState.listing}
          listingImage={sheetState.listingImage}
          campaign={sheetState.entityName}
          requestedBy={sheetState.requestedBy}
          onComplete={sheetState.onComplete}
        />
      )}

      {sheetState && sheetState.type === 'event-approval' && (
        <EventApprovalSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          listing={sheetState.listing}
          listingImage={sheetState.listingImage}
          eventHub={sheetState.entityName}
          requestedBy={sheetState.requestedBy}
          onComplete={sheetState.onComplete}
        />
      )}

      {sheetState && sheetState.type === 'event-rejection' && (
        <EventRejectionSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          listing={sheetState.listing}
          listingImage={sheetState.listingImage}
          eventHub={sheetState.entityName}
          requestedBy={sheetState.requestedBy}
          onComplete={sheetState.onComplete}
        />
      )}

      {sheetState && sheetState.type === 'make-offer' && (
        <MakeOfferSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          productTitle={sheetState.listing}
          productPrice={sheetState.productPrice || '0'}
          productImage={sheetState.listingImage}
          sellerId={sheetState.sellerId || 'unknown'}
          sellerName={sheetState.sellerName || 'Seller'}
          onOfferSubmitted={() => sheetState.onComplete()}
        />
      )}

      {sheetState && sheetState.type === 'report-listing' && (
        <ReportSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
        />
      )}

      {sheetState && sheetState.type === 'share-listing' && (
        <ShareSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          product={{
            id: sheetState.productId || '',
            title: sheetState.listing,
            price: sheetState.productPrice,
            image: sheetState.listingImage,
            location: sheetState.productLocation,
            type: sheetState.productType as any,
          }}
          isOwner={false}
          username={sheetState.sellerName || 'user'}
        />
      )}

      {sheetState && sheetState.type === 'share-to-group' && (
        <ShareToGroupSheet
          open={isOpen}
          onOpenChange={(open) => {
            setIsOpen(open);
            if (!open) {
              setSheetState(null);
            }
          }}
          productTitle={sheetState.listing}
          productId={sheetState.productId || ''}
        />
      )}
    </GlobalActionModalContext.Provider>
  );
}