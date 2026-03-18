/**
 * Trade Offer Confirmation Presets
 * 
 * Data mappers that convert trade offer data into ConfirmActionDialogData format.
 * These presets unify TradeOfferConfirmDialog functionality into the canonical
 * ConfirmActionDialog component.
 * 
 * Migration: P1 — TradeOfferConfirmDialog → ConfirmActionDialog
 */

import { ConfirmActionDialogData } from '../components/action-center/ConfirmActionDialog';

interface TradeOfferData {
  from: string;
  offering: string;
  additionalCash?: string;
  forListing: string;
}

/**
 * TRADE_ACCEPT Preset
 * Maps trade offer data to ConfirmActionDialog for accept flow
 */
export function buildTradeAcceptDialogData(
  offer: TradeOfferData,
  onConfirm: () => void
): ConfirmActionDialogData {
  const details: Array<{ label: string; value: string; highlight?: boolean }> = [
    { label: 'From', value: offer.from },
    { label: 'Offering', value: offer.offering },
  ];

  // Add additional cash if present (highlighted in green)
  if (offer.additionalCash) {
    details.push({
      label: 'Additional',
      value: offer.additionalCash,
      highlight: true, // Will use text-primary, which is close enough to green highlight
    });
  }

  details.push({
    label: 'For',
    value: offer.forListing,
  });

  return {
    variant: 'success',
    icon: 'check',
    title: 'Accept Trade Offer?',
    description: 'Confirm to proceed with this trade',
    details,
    consequences: {
      title: 'What happens next:',
      items: [
        `${offer.from} will be notified of your acceptance`,
        'A chat will be opened to coordinate the exchange',
        `Your listing "${offer.forListing}" will be marked as "Trade Pending"`,
      ],
    },
    confirmLabel: 'Confirm Accept',
    cancelLabel: 'Cancel',
    onConfirm,
  };
}

/**
 * TRADE_DECLINE Preset
 * Maps trade offer data to ConfirmActionDialog for decline flow
 */
export function buildTradeDeclineDialogData(
  offer: TradeOfferData,
  onConfirm: () => void
): ConfirmActionDialogData {
  const details: Array<{ label: string; value: string; highlight?: boolean }> = [
    { label: 'From', value: offer.from },
    { label: 'Offering', value: offer.offering },
  ];

  // Add additional cash if present
  if (offer.additionalCash) {
    details.push({
      label: 'Additional',
      value: offer.additionalCash,
      highlight: true,
    });
  }

  details.push({
    label: 'For',
    value: offer.forListing,
  });

  return {
    variant: 'destructive',
    icon: 'x',
    title: 'Decline Trade Offer?',
    description: 'This will reject the offer',
    details,
    consequences: {
      title: 'What happens next:',
      items: [
        `${offer.from} will be notified of the decline`,
        'The trade offer will be removed from your Action Center',
        'They can send a new offer if they wish',
      ],
    },
    confirmLabel: 'Confirm Decline',
    cancelLabel: 'Cancel',
    onConfirm,
  };
}
