/**
 * Mark as Sold Sheet - Chat Version
 * Quick sheet for marking a listing as sold from the chat
 * Premium Design 2025
 * 
 * NOTE: For ProductDetailPage, use /components/sheets/MarkAsSoldSheet.tsx instead
 */

import { useState } from 'react';
import { CheckCircle, X } from 'lucide-react';
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

interface MarkAsSoldSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: ChatListing;
  buyerName: string;
  onConfirmSold: (soldTo: string, finalPrice: string) => void;
}

export function MarkAsSoldSheet({ 
  open, 
  onOpenChange, 
  listing, 
  buyerName,
  onConfirmSold 
}: MarkAsSoldSheetProps) {
  const [finalPrice, setFinalPrice] = useState(listing.price.replace(/[^0-9.]/g, ''));
  const [soldTo, setSoldTo] = useState(buyerName);

  const handleConfirm = () => {
    if (!finalPrice || parseFloat(finalPrice) <= 0) {
      toast.error('Please enter a valid sale price');
      return;
    }

    if (!soldTo.trim()) {
      toast.error('Please confirm buyer name');
      return;
    }

    onConfirmSold(soldTo, finalPrice);
    onOpenChange(false);
    
    toast.success(`${listing.title} marked as sold! 🎉`);
  };

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
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <SheetTitle>Mark as Sold</SheetTitle>
                  <SheetDescription className="mt-1">
                    Confirm sale details
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

          {/* Sold To Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Sold To <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              value={soldTo}
              onChange={(e) => setSoldTo(e.target.value)}
              placeholder="Buyer name"
              className="w-full px-4 py-3 bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Final Price Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Final Sale Price <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                $
              </span>
              <input
                type="number"
                value={finalPrice}
                onChange={(e) => setFinalPrice(e.target.value)}
                placeholder="Final price"
                className="w-full pl-9 pr-4 py-3 bg-muted border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                min="0"
                step="1"
              />
            </div>
          </div>

          {/* Warning Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
            <p className="text-sm text-yellow-800">
              ⚠️ This will mark your listing as <strong>SOLD</strong> and remove it from public view.
            </p>
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
              onClick={handleConfirm}
              className="flex-1 h-11 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
            >
              Confirm Sale
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}