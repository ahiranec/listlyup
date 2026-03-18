/**
 * MarkAsSoldSheet Component
 * Sheet for marking listing as sold and selecting buyer
 * Includes option to leave review immediately
 */

import { useState } from 'react';
import { CheckCircle2, User, Calendar, DollarSign, ChevronLeft, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface Buyer {
  id: string;
  name: string;
  avatar?: string;
  hadOffer?: boolean;
  offerAmount?: string;
}

interface MarkAsSoldSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
  productImage: string;
  onMarkedAsSold?: (buyerId: string, finalPrice: string) => void;
}

export function MarkAsSoldSheet({
  open,
  onOpenChange,
  productTitle,
  productPrice,
  productImage,
  onMarkedAsSold,
}: MarkAsSoldSheetProps) {
  // Mock recent conversations (in real app, would come from props)
  const [recentBuyers] = useState<Buyer[]>([
    { id: 'buyer-1', name: 'Juan Pérez', hadOffer: true, offerAmount: '22 USD' },
    { id: 'buyer-2', name: 'María González', hadOffer: true, offerAmount: '20 USD' },
    { id: 'buyer-3', name: 'Carlos Silva', hadOffer: false },
  ]);

  const [selectedBuyerId, setSelectedBuyerId] = useState<string>('');
  const [finalPrice, setFinalPrice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedBuyer = recentBuyers.find(b => b.id === selectedBuyerId);
  const isValid = selectedBuyerId && finalPrice.trim();

  const handleSubmit = async () => {
    if (!isValid) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 800));

    toast.success('Listing marked as sold! 🎉', {
      description: `Sold to ${selectedBuyer?.name}`,
    });

    onMarkedAsSold?.(selectedBuyerId, finalPrice);
    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset
    setSelectedBuyerId('');
    setFinalPrice('');
  };

  const handleQuickSelect = (buyer: Buyer) => {
    setSelectedBuyerId(buyer.id);
    if (buyer.offerAmount) {
      setFinalPrice(buyer.offerAmount);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Mark as Sold</SheetTitle>
          <SheetDescription>Mark {productTitle} as sold</SheetDescription>
        </SheetHeader>

        {/* Header */}
        <div className="sticky top-0 bg-white border-b z-10">
          <div className="flex items-center h-14 px-4">
            <button
              onClick={() => onOpenChange(false)}
              className="icon-button hover:bg-muted transition-fast"
              aria-label="Go back"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center pr-10">
              <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Mark as Sold</h2>
            </div>
          </div>

          {/* Product Preview */}
          <div className="px-4 pb-4 pt-2">
            <div className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <img
                src={productImage}
                alt={productTitle}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{productTitle}</p>
                <div className="flex items-center gap-2 mt-1">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700 font-medium">Ready to mark as sold</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(85vh-170px)]">
          <div className="px-4 py-6 space-y-6">
            {/* Info Banner */}
            <div className="bg-blue-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium text-blue-900">🎉 Congratulations on your sale!</p>
              <p className="text-xs text-blue-700">
                Let us know who bought it so we can update your stats and help build trust in the community.
              </p>
            </div>

            {/* Select Buyer */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Who bought it? *</label>
              
              {/* Recent Conversations */}
              {recentBuyers.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground">Recent conversations:</p>
                  {recentBuyers.map((buyer) => (
                    <button
                      key={buyer.id}
                      onClick={() => handleQuickSelect(buyer)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                        selectedBuyerId === buyer.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {buyer.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{buyer.name}</p>
                        {buyer.hadOffer && buyer.offerAmount ? (
                          <p className="text-xs text-muted-foreground">Offered {buyer.offerAmount}</p>
                        ) : (
                          <p className="text-xs text-muted-foreground">Messaged you</p>
                        )}
                      </div>
                      {selectedBuyerId === buyer.id && (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Other Buyer Option */}
              <button
                onClick={() => {
                  setSelectedBuyerId('other');
                  setFinalPrice('');
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                  selectedBuyerId === 'other'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">Someone else</p>
                  <p className="text-xs text-muted-foreground">Buyer not in your conversations</p>
                </div>
                {selectedBuyerId === 'other' && (
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                )}
              </button>
            </div>

            <Separator />

            {/* Final Sale Price */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Final Sale Price *</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  value={finalPrice}
                  onChange={(e) => setFinalPrice(e.target.value)}
                  placeholder="e.g., 22 USD"
                  className="pl-10 text-lg h-12"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Original price: {productPrice}</span>
                {selectedBuyer?.offerAmount && (
                  <button
                    onClick={() => setFinalPrice(selectedBuyer.offerAmount || '')}
                    className="text-primary hover:underline"
                  >
                    Use their offer ({selectedBuyer.offerAmount})
                  </button>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium">What happens next?</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>✓ Your listing will be marked as SOLD</li>
                  <li>✓ It will appear in your sold items history</li>
                  <li>✓ You can leave a review for the buyer</li>
                  <li>✓ Your success rate will be updated</li>
                  <li>✓ Other users won't see this listing anymore</li>
                </ul>
              </div>

              {selectedBuyerId && selectedBuyerId !== 'other' && (
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-900">Leave a Review</p>
                  </div>
                  <p className="text-xs text-yellow-700">
                    After marking as sold, you can rate your experience with {selectedBuyer?.name}
                  </p>
                </div>
              )}
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button
            onClick={handleSubmit}
            disabled={!isValid || isSubmitting}
            className="w-full h-12 bg-green-600 hover:bg-green-700"
          >
            {isSubmitting ? (
              'Marking as Sold...'
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Mark as Sold
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
