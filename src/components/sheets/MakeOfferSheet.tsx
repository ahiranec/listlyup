/**
 * MakeOfferSheet Component
 * Full-screen sheet for making price offers on listings
 * Includes price validation, suggested range, and optional message
 */

import { useState } from 'react';
import { DollarSign, MessageSquare, TrendingDown, CheckCircle2, ChevronLeft, AlertCircle } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface MakeOfferSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  onOfferSubmitted?: (offerId: string) => void;
}

export function MakeOfferSheet({
  open,
  onOpenChange,
  productTitle,
  productPrice,
  productImage,
  sellerId,
  sellerName,
  onOfferSubmitted,
}: MakeOfferSheetProps) {
  const [offerAmount, setOfferAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Parse original price (assuming format like "25 USD") - with safety checks
  const safeProductPrice = productPrice || '0';
  const originalPriceNum = parseFloat(safeProductPrice.replace(/[^0-9.]/g, ''));
  const currency = safeProductPrice.replace(/[0-9.,\s]/g, '').trim() || 'USD';
  
  // Calculate suggested range (70-90% of original)
  const minSuggested = Math.floor(originalPriceNum * 0.7);
  const maxSuggested = Math.floor(originalPriceNum * 0.9);
  
  const offerNum = parseFloat(offerAmount);
  const isValidOffer = !isNaN(offerNum) && offerNum > 0 && offerNum < originalPriceNum;
  const isInSuggestedRange = offerNum >= minSuggested && offerNum <= maxSuggested;
  const isTooLow = offerNum > 0 && offerNum < minSuggested;
  const isTooHigh = offerNum >= originalPriceNum;

  const handleSubmit = async () => {
    if (!isValidOffer) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // In real app, this would create an offer and navigate to chat
    const mockOfferId = `offer-${Date.now()}`;
    
    toast.success('Offer sent successfully! 🎉', {
      description: `${sellerName} will be notified`,
    });

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset form
    setOfferAmount('');
    setMessage('');

    // Notify parent
    onOfferSubmitted?.(mockOfferId);
  };

  const handleCancel = () => {
    onOpenChange(false);
    setOfferAmount('');
    setMessage('');
  };

  // Quick preset buttons (80%, 85%, 90%)
  const quickPresets = [
    { label: '-20%', value: Math.floor(originalPriceNum * 0.8) },
    { label: '-15%', value: Math.floor(originalPriceNum * 0.85) },
    { label: '-10%', value: Math.floor(originalPriceNum * 0.9) },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        {/* Accessibility Header */}
        <SheetHeader className="sr-only">
          <SheetTitle>Make an Offer</SheetTitle>
          <SheetDescription>
            Propose a price for {productTitle}
          </SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center h-14 px-4">
            <button
              onClick={handleCancel}
              className="icon-button hover:bg-muted transition-fast"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center pr-10">
              <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Make Offer</h2>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(90vh-170px)]">
          <div className="px-4 py-6 space-y-6">
            {/* Product Preview */}
            <div className="flex gap-3 p-3 bg-muted/50 rounded-lg">
              <img
                src={productImage}
                alt={productTitle}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{productTitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-muted-foreground">Listed at:</span>
                  <span className="font-semibold">{productPrice}</span>
                </div>
              </div>
            </div>

            {/* Suggested Range */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-blue-600" />
                <p className="text-sm font-medium text-blue-900">Suggested Range</p>
              </div>
              <p className="text-2xl font-bold text-blue-600">
                {minSuggested} - {maxSuggested} {currency}
              </p>
              <p className="text-xs text-blue-700">
                Offers in this range have higher acceptance rates
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quick Offers</label>
              <div className="grid grid-cols-3 gap-2">
                {quickPresets.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setOfferAmount(preset.value.toString())}
                    className="px-4 py-3 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
                  >
                    <div className="text-xs text-muted-foreground">{preset.label}</div>
                    <div className="font-semibold">{preset.value}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Offer Amount Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Offer *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="number"
                  value={offerAmount}
                  onChange={(e) => setOfferAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="pl-10 text-lg h-12"
                  min="0"
                  step="0.01"
                />
              </div>
              
              {/* Validation Messages */}
              {offerNum > 0 && (
                <div className="space-y-1">
                  {isTooHigh && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>Offer must be lower than the listed price</span>
                    </div>
                  )}
                  {isTooLow && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <AlertCircle className="w-4 h-4" />
                      <span>This offer might be too low ({Math.round((offerNum / originalPriceNum) * 100)}% of asking price)</span>
                    </div>
                  )}
                  {isInSuggestedRange && (
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Great offer! Within suggested range</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            <Separator />

            {/* Optional Message */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Message to Seller <span className="text-muted-foreground">(optional)</span>
              </label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Hi ${sellerName}, I'm interested in your ${productTitle}. Would you consider my offer?`}
                className="min-h-[100px] resize-none"
                maxLength={300}
              />
              <p className="text-xs text-muted-foreground text-right">
                {message.length}/300
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">How it works</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Seller receives your offer notification</li>
                <li>• They can accept, counter, or decline</li>
                <li>• You'll be notified of their response</li>
                <li>• Offers expire after 48 hours if not responded</li>
              </ul>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button
            onClick={handleSubmit}
            disabled={!isValidOffer || isSubmitting}
            className="w-full h-12"
          >
            {isSubmitting ? (
              'Sending...'
            ) : (
              <>
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Offer {isValidOffer && `(${offerAmount} ${currency})`}
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}