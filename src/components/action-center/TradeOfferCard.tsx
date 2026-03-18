/**
 * TradeOfferCard Component
 * Compact card for pending trade offers
 * 
 * Features:
 * - Optional product image
 * - Additional cash shown in soft green-400 color
 * - Three CTAs: Accept / Counter / Decline
 * - Premium 2025 design with soft tones
 * - Complete workflow with confirmations and notifications
 * 
 * @example
 * <TradeOfferCard
 *   from="@maria_g"
 *   offering='iPad Pro 11" 2021'
 *   additionalCash="+ $50"
 *   forListing="Vintage Camera"
 *   time="1d ago"
 *   onAccept={() => {}}
 *   onCounter={() => {}}
 *   onDecline={() => {}}
 * />
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { CounterOfferSheet } from './CounterOfferSheet';
import { ConfirmActionDialog, ConfirmActionDialogData } from './ConfirmActionDialog';
import { buildTradeAcceptDialogData, buildTradeDeclineDialogData } from '../../utils/tradeOfferConfirmPresets';
import { toast } from 'sonner@2.0.3';

interface TradeOfferCardProps {
  from: string;
  offering: string;
  additionalCash?: string;
  forListing: string;
  time: string;
  image?: string;
  onAccept?: () => void;
  onCounter?: (counterOffer: { requestedItem: string; offeredCash: number; message?: string }) => void;
  onDecline?: () => void;
}

export function TradeOfferCard({ 
  from, 
  offering, 
  additionalCash, 
  forListing, 
  time, 
  image,
  onAccept,
  onCounter,
  onDecline 
}: TradeOfferCardProps) {
  const [showCounterSheet, setShowCounterSheet] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);

  const handleAcceptClick = () => {
    const dialogData = buildTradeAcceptDialogData(
      { from, offering, additionalCash, forListing },
      handleConfirmAccept
    );
    setConfirmDialogData(dialogData);
    setShowConfirmDialog(true);
  };

  const handleDeclineClick = () => {
    const dialogData = buildTradeDeclineDialogData(
      { from, offering, additionalCash, forListing },
      handleConfirmDecline
    );
    setConfirmDialogData(dialogData);
    setShowConfirmDialog(true);
  };

  const handleConfirmAccept = () => {
    onAccept?.();
    toast.success('Trade offer accepted!', {
      description: `${from} has been notified. Check your messages to coordinate.`,
    });
  };

  const handleConfirmDecline = () => {
    onDecline?.();
    toast.success('Trade offer declined', {
      description: `${from} has been notified of your decision.`,
    });
  };

  // Build the offer text
  const offerText = additionalCash 
    ? `${offering} ${additionalCash}` 
    : offering;

  return (
    <>
      <div className="p-3 rounded border bg-card border-border space-y-2">
        {/* Main offer text */}
        <div className="flex items-start gap-2">
          {image && (
            <ImageWithFallback 
              src={image} 
              alt={offering}
              className="w-12 h-12 rounded object-cover shrink-0" 
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-snug">
              <span className="text-muted-foreground">{from} offers </span>
              <span className="font-semibold">{offerText}</span>
              <span className="text-muted-foreground"> for your </span>
              <span className="font-medium">{forListing}</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">{time}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-1.5">
          <Button 
            size="sm" 
            className="h-8 flex-1 text-xs"
            onClick={handleAcceptClick}
          >
            Accept
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 flex-1 text-xs"
            onClick={() => setShowCounterSheet(true)}
          >
            Counter
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="h-8 px-3 text-xs"
            onClick={handleDeclineClick}
          >
            Decline
          </Button>
        </div>
      </div>

      {/* Counter Offer Sheet */}
      <CounterOfferSheet
        open={showCounterSheet}
        onOpenChange={setShowCounterSheet}
        originalOffer={{
          from,
          offering,
          additionalCash,
          forListing,
        }}
        onSubmit={(counterOffer) => {
          onCounter?.(counterOffer);
        }}
      />

      {/* Confirmation Dialog */}
      <ConfirmActionDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        data={confirmDialogData}
      />
    </>
  );
}