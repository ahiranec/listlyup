/**
 * ManageOffersSheet Component
 * Full-screen sheet for sellers to view and manage offers received
 * Includes accept, counter, and decline actions
 */

import { useState } from 'react';
import { DollarSign, Check, X, MessageSquare, ChevronLeft, TrendingUp, Clock, User } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { toast } from 'sonner@2.0.3';

interface Offer {
  id: string;
  buyerName: string;
  buyerAvatar?: string;
  amount: string;
  message?: string;
  createdAt: string;
  status: 'pending' | 'accepted' | 'declined' | 'countered';
  expiresAt: string;
}

interface ManageOffersSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
  productImage: string;
  onNavigateToChat?: (chatId: string) => void;
}

export function ManageOffersSheet({
  open,
  onOpenChange,
  productTitle,
  productPrice,
  productImage,
  onNavigateToChat,
}: ManageOffersSheetProps) {
  // Mock offers data (in real app, would come from props or API)
  const [offers, setOffers] = useState<Offer[]>([
    {
      id: 'offer-1',
      buyerName: 'Juan Pérez',
      amount: '22 USD',
      message: 'Hi! I\'m very interested. Can you accept this offer?',
      createdAt: '2h ago',
      status: 'pending',
      expiresAt: '46h left',
    },
    {
      id: 'offer-2',
      buyerName: 'María González',
      amount: '20 USD',
      message: 'Would you consider this price? I can pick up today.',
      createdAt: '5h ago',
      status: 'pending',
      expiresAt: '43h left',
    },
    {
      id: 'offer-3',
      buyerName: 'Carlos Silva',
      amount: '18 USD',
      createdAt: '1d ago',
      status: 'declined',
      expiresAt: 'Expired',
    },
  ]);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [counterAmount, setCounterAmount] = useState('');
  const [counterMessage, setCounterMessage] = useState('');
  const [actionInProgress, setActionInProgress] = useState(false);

  const originalPriceNum = parseFloat((productPrice || '0').replace(/[^0-9.]/g, ''));
  const currency = (productPrice || '$0').replace(/[0-9.,\s]/g, '').trim() || '$';

  const pendingOffers = offers.filter(o => o.status === 'pending');
  const otherOffers = offers.filter(o => o.status !== 'pending');

  const handleAccept = async (offer: Offer) => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setOffers(prev => prev.map(o => 
      o.id === offer.id ? { ...o, status: 'accepted' as const } : o
    ));
    
    toast.success('Offer accepted! 🎉', {
      description: `Opening chat with ${offer.buyerName}...`,
    });
    
    setActionInProgress(false);
    onOpenChange(false);
    
    // Navigate to chat
    onNavigateToChat?.(offer.id);
  };

  const handleDecline = async (offer: Offer) => {
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 400));
    
    setOffers(prev => prev.map(o => 
      o.id === offer.id ? { ...o, status: 'declined' as const } : o
    ));
    
    toast.info('Offer declined', {
      description: `${offer.buyerName} has been notified`,
    });
    
    setActionInProgress(false);
    setSelectedOffer(null);
  };

  const handleCounter = async () => {
    if (!selectedOffer || !counterAmount) return;
    
    setActionInProgress(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    
    setOffers(prev => prev.map(o => 
      o.id === selectedOffer.id ? { ...o, status: 'countered' as const } : o
    ));
    
    toast.success('Counter offer sent! 💬', {
      description: `${selectedOffer.buyerName} will be notified`,
    });
    
    setActionInProgress(false);
    setSelectedOffer(null);
    setCounterAmount('');
    setCounterMessage('');
  };

  const handleMessageBuyer = (offer: Offer) => {
    toast.success(`Opening chat with ${offer.buyerName}...`);
    onNavigateToChat?.(offer.id);
    onOpenChange(false);
  };

  if (selectedOffer) {
    // Counter Offer View
    const offerNum = parseFloat(selectedOffer.amount.replace(/[^0-9.]/g, ''));
    const counterNum = parseFloat(counterAmount);
    const isValidCounter = !isNaN(counterNum) && counterNum > offerNum && counterNum < originalPriceNum;

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Counter Offer</SheetTitle>
            <SheetDescription>Send a counter offer to {selectedOffer.buyerName}</SheetDescription>
          </SheetHeader>

          {/* Header */}
          <div className="sticky top-0 bg-white border-b z-10">
            <div className="flex items-center h-14 px-4">
              <button
                onClick={() => setSelectedOffer(null)}
                className="icon-button hover:bg-muted transition-fast"
                aria-label="Go back"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center pr-10">
                <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Counter Offer</h2>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(85vh-140px)]">
            <div className="px-4 py-6 space-y-6">
              {/* Buyer Info */}
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                  {selectedOffer.buyerName.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{selectedOffer.buyerName}</p>
                  <p className="text-sm text-muted-foreground">{selectedOffer.createdAt}</p>
                </div>
              </div>

              {/* Current Offer */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Their Offer</label>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-700">Offered Amount</span>
                    <span className="text-2xl font-bold text-orange-600">{selectedOffer.amount}</span>
                  </div>
                  {selectedOffer.message && (
                    <p className="text-sm text-orange-700 mt-2 pt-2 border-t border-orange-200">
                      "{selectedOffer.message}"
                    </p>
                  )}
                </div>
              </div>

              {/* Your Listed Price */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your listed price:</span>
                <span className="font-semibold">{productPrice}</span>
              </div>

              <Separator />

              {/* Counter Amount */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Counter Offer *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="number"
                    value={counterAmount}
                    onChange={(e) => setCounterAmount(e.target.value)}
                    placeholder="Enter counter amount"
                    className="pl-10 text-lg h-12"
                    min={offerNum}
                    max={originalPriceNum}
                    step="0.01"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Must be between {selectedOffer.amount} and {productPrice}
                </p>
              </div>

              {/* Counter Message */}
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Message <span className="text-muted-foreground">(optional)</span>
                </label>
                <Textarea
                  value={counterMessage}
                  onChange={(e) => setCounterMessage(e.target.value)}
                  placeholder={`Hi ${selectedOffer.buyerName}, I can accept ${counterAmount || '___'} ${currency}. Let me know!`}
                  className="min-h-[100px] resize-none"
                  maxLength={300}
                />
                <p className="text-xs text-muted-foreground text-right">
                  {counterMessage.length}/300
                </p>
              </div>

              {/* Info */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-blue-900">💡 Counter Offer Tips</p>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Meet somewhere in the middle</li>
                  <li>• Be polite and professional</li>
                  <li>• They can accept, decline, or counter back</li>
                  <li>• Counter offers expire after 48 hours</li>
                </ul>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <Button
              onClick={handleCounter}
              disabled={!isValidCounter || actionInProgress}
              className="w-full h-12"
            >
              {actionInProgress ? 'Sending...' : `Send Counter (${counterAmount || '...'} ${currency})`}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Main Offers List View
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Manage Offers</SheetTitle>
          <SheetDescription>View and respond to offers for {productTitle}</SheetDescription>
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
              <h2 className="text-sm text-muted-foreground uppercase tracking-wide">
                Offers ({pendingOffers.length})
              </h2>
            </div>
          </div>

          {/* Product Preview */}
          <div className="px-4 pb-4">
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
          </div>
        </div>

        <ScrollArea className="h-[calc(90vh-150px)]">
          <div className="px-4 py-4 space-y-6">
            {/* Pending Offers */}
            {pendingOffers.length > 0 ? (
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                  Pending ({pendingOffers.length})
                </h3>
                {pendingOffers.map((offer) => {
                  const offerNum = parseFloat(offer.amount.replace(/[^0-9.]/g, ''));
                  const percentOfAsking = Math.round((offerNum / originalPriceNum) * 100);
                  
                  return (
                    <div key={offer.id} className="border-2 border-orange-200 bg-orange-50 rounded-lg p-4 space-y-3">
                      {/* Buyer Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                            {offer.buyerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{offer.buyerName}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{offer.createdAt}</span>
                              <span>•</span>
                              <span className="text-orange-600">{offer.expiresAt}</span>
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                          {percentOfAsking}% of asking
                        </Badge>
                      </div>

                      {/* Offer Amount */}
                      <div className="bg-white rounded-lg p-3 border border-orange-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Offer Amount</span>
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-orange-600" />
                            <span className="text-xl font-bold text-orange-600">{offer.amount}</span>
                          </div>
                        </div>
                      </div>

                      {/* Message */}
                      {offer.message && (
                        <div className="bg-white rounded-lg p-3 border border-orange-200">
                          <p className="text-sm text-muted-foreground mb-1">Message:</p>
                          <p className="text-sm">"{offer.message}"</p>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          onClick={() => handleAccept(offer)}
                          disabled={actionInProgress}
                          variant="default"
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Accept
                        </Button>
                        <Button
                          onClick={() => {
                            setSelectedOffer(offer);
                            setCounterAmount(originalPriceNum.toString());
                          }}
                          disabled={actionInProgress}
                          variant="outline"
                          size="sm"
                        >
                          <DollarSign className="w-4 h-4 mr-1" />
                          Counter
                        </Button>
                        <Button
                          onClick={() => handleDecline(offer)}
                          disabled={actionInProgress}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Decline
                        </Button>
                      </div>

                      {/* Quick Message */}
                      <Button
                        onClick={() => handleMessageBuyer(offer)}
                        variant="ghost"
                        size="sm"
                        className="w-full"
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message {offer.buyerName}
                      </Button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <DollarSign className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No pending offers</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You'll see offers here when buyers make them
                </p>
              </div>
            )}

            {/* Previous Offers */}
            {otherOffers.length > 0 && (
              <>
                <Separator />
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                    Previous ({otherOffers.length})
                  </h3>
                  {otherOffers.map((offer) => (
                    <div key={offer.id} className="border rounded-lg p-4 opacity-60">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm">
                            {offer.buyerName.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium">{offer.buyerName}</p>
                            <p className="text-sm text-muted-foreground">{offer.amount}</p>
                          </div>
                        </div>
                        <Badge variant={offer.status === 'declined' ? 'destructive' : 'secondary'}>
                          {offer.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}