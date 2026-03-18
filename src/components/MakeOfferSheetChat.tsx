/**
 * Make Offer Sheet - Chat Version
 * Quick sheet for making an offer on a listing from the chat
 * Premium Design 2025
 * 
 * NOTE: For ProductDetailPage, use /components/sheets/MakeOfferSheet.tsx instead
 */

import { useState } from 'react';
import { DollarSign, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';
import { toast } from 'sonner@2.0.3';
import type { ChatListing } from '../data/chatMessages';

interface MakeOfferSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: ChatListing;
  onSubmitOffer: (amount: string, message: string) => void;
}

export function MakeOfferSheet({ open, onOpenChange, listing, onSubmitOffer }: MakeOfferSheetProps) {
  const [offerAmount, setOfferAmount] = useState('');
  const [offerMessage, setOfferMessage] = useState('');

  const handleSubmit = () => {
    if (!offerAmount || parseFloat(offerAmount) <= 0) {
      toast.error('Please enter a valid offer amount');
      return;
    }

    onSubmitOffer(offerAmount, offerMessage);
    
    // Reset form
    setOfferAmount('');
    setOfferMessage('');
    onOpenChange(false);
    
    toast.success(`Offer of $${offerAmount} sent! 💸`);
  };

  const listingPrice = listing.price.replace(/[^0-9.]/g, '');
  const suggestedOffer = listingPrice ? (parseFloat(listingPrice) * 0.9).toFixed(0) : '';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="max-w-[480px] mx-auto rounded-t-3xl border-t border-border px-0 pb-8"
      >
        <div className="px-6">
          <SheetHeader className="text-left mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <SheetTitle>Make an Offer</SheetTitle>
                  <SheetDescription className="mt-1">
                    {listing.title}
                  </SheetDescription>
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* Listing Preview */}
          <div className="bg-muted/50 rounded-xl p-4 mb-6 flex gap-3">
            {listing.image && (
              <img 
                src={listing.image} 
                alt={listing.title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            )}
            <div className="flex-1">
              <p className="font-medium text-sm line-clamp-1">{listing.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Listed at <span className="font-semibold text-foreground">{listing.price}</span>
              </p>
            </div>
          </div>

          {/* Offer Amount Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Your Offer <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                $
              </span>
              <input
                type="number"
                value={offerAmount}
                onChange={(e) => setOfferAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-9 pr-4 py-3 bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                min="0"
                step="1"
              />
            </div>
            {suggestedOffer && (
              <button
                onClick={() => setOfferAmount(suggestedOffer)}
                className="text-xs text-primary hover:underline mt-2"
              >
                Suggest: ${suggestedOffer} (10% off)
              </button>
            )}
          </div>

          {/* Optional Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Message (optional)
            </label>
            <textarea
              value={offerMessage}
              onChange={(e) => setOfferMessage(e.target.value)}
              placeholder="Add a message with your offer..."
              rows={3}
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 h-11 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
            >
              Send Offer
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}