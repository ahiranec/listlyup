/**
 * TradeOfferConfirmDialog Component
 * 
 * ⚠️ DEPRECATED — 0 CALLERS (as of 2026-01-16)
 * 
 * This component has been deprecated and replaced by ConfirmActionDialog with presets.
 * 
 * Migration: P1 — TradeOfferConfirmDialog → ConfirmActionDialog (COMPLETED)
 * 
 * Old usage:
 *   <TradeOfferConfirmDialog action="accept" offer={...} onConfirm={...} />
 * 
 * New usage:
 *   import { buildTradeAcceptDialogData } from '../../utils/tradeOfferConfirmPresets';
 *   const data = buildTradeAcceptDialogData(offer, onConfirm);
 *   <ConfirmActionDialog data={data} />
 * 
 * Entry points migrated:
 *   - TradeOfferCard (Accept button) ✅ DONE
 *   - TradeOfferCard (Decline button) ✅ DONE
 * 
 * Remaining callers: 0
 * 
 * Safe to delete after: 2026-01-20 (after P1 verification complete)
 * 
 * ---
 * 
 * Original description (for reference):
 * Dialog de confirmación para Accept/Decline de Trade Offers
 * 
 * Features:
 * - Confirmación visual clara
 * - Diferentes estilos para Accept (verde) y Decline (rojo)
 * - Muestra resumen de la oferta
 * - Explicación de consecuencias
 */

import { CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface TradeOfferConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: 'accept' | 'decline';
  offer: {
    from: string;
    offering: string;
    additionalCash?: string;
    forListing: string;
  };
  onConfirm: () => void;
}

export function TradeOfferConfirmDialog({ 
  open, 
  onOpenChange, 
  action,
  offer,
  onConfirm 
}: TradeOfferConfirmDialogProps) {
  if (!open) return null;

  const isAccept = action === 'accept';

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 max-w-[480px] mx-auto">
        <div className="bg-background rounded-2xl shadow-2xl max-w-md w-full animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className={`p-6 rounded-t-2xl ${isAccept ? 'bg-green-50 dark:bg-green-950/30' : 'bg-red-50 dark:bg-red-950/30'}`}>
            <div className="flex items-center gap-3">
              {isAccept ? (
                <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-500" />
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {isAccept ? 'Accept Trade Offer?' : 'Decline Trade Offer?'}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {isAccept ? 'Confirm to proceed with this trade' : 'This will reject the offer'}
                </p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Offer Summary */}
            <div className="p-4 rounded-lg bg-muted/50 border border-border space-y-2">
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">From:</span>
                <span className="font-medium">{offer.from}</span>
              </div>
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">Offering:</span>
                <span className="font-medium text-right">{offer.offering}</span>
              </div>
              {offer.additionalCash && (
                <div className="flex items-start justify-between text-sm">
                  <span className="text-muted-foreground">Additional:</span>
                  <span className="font-medium text-green-600 dark:text-green-500">{offer.additionalCash}</span>
                </div>
              )}
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground">For:</span>
                <span className="font-medium text-right">{offer.forListing}</span>
              </div>
            </div>

            {/* Consequences */}
            {isAccept ? (
              <div className="flex gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900">
                <AlertTriangle className="w-5 h-5 text-green-600 dark:text-green-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 dark:text-green-100 mb-1">What happens next:</p>
                  <ul className="text-green-700 dark:text-green-300 space-y-1 text-xs">
                    <li>• {offer.from} will be notified of your acceptance</li>
                    <li>• A chat will be opened to coordinate the exchange</li>
                    <li>• Your listing "{offer.forListing}" will be marked as "Trade Pending"</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-900 dark:text-amber-100 mb-1">What happens next:</p>
                  <ul className="text-amber-700 dark:text-amber-300 space-y-1 text-xs">
                    <li>• {offer.from} will be notified of the decline</li>
                    <li>• The trade offer will be removed from your Action Center</li>
                    <li>• They can send a new offer if they wish</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="px-6 pb-6 flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                onConfirm();
                onOpenChange(false);
              }}
              className={`flex-1 ${isAccept ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}`}
            >
              {isAccept ? 'Confirm Accept' : 'Confirm Decline'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}