/**
 * CounterOfferSheet Component
 * Sheet para hacer contraofertas en Trade Offers
 * 
 * Permite al usuario:
 * - Ver la oferta original
 * - Modificar el producto ofrecido
 * - Ajustar dinero adicional con input directo o botones rápidos
 * - Agregar un mensaje opcional
 */

import { useState } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { Button } from '../ui/button';
import { toast } from 'sonner@2.0.3';

interface CounterOfferSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalOffer: {
    from: string;
    offering: string;
    additionalCash?: string;
    forListing: string;
  };
  onSubmit: (counterOffer: {
    requestedItem: string;
    offeredCash: number;
    message?: string;
  }) => void;
  currency?: string; // Default: 'USD'
}

export function CounterOfferSheet({ 
  open, 
  onOpenChange, 
  originalOffer,
  onSubmit,
  currency = 'USD'
}: CounterOfferSheetProps) {
  const [offeredCash, setOfferedCash] = useState(0);
  const [message, setMessage] = useState('');

  const handleCashInput = (value: string) => {
    // Remove non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9]/g, '');
    const parsedValue = numericValue === '' ? 0 : parseInt(numericValue, 10);
    setOfferedCash(Math.max(0, parsedValue));
  };

  const handleQuickAdd = (amount: number) => {
    setOfferedCash(Math.max(0, offeredCash + amount));
  };

  const handleSubmit = () => {
    onSubmit({
      requestedItem: originalOffer.offering,
      offeredCash,
      message: message.trim() || undefined,
    });
    
    // Reset form
    setOfferedCash(0);
    setMessage('');
    onOpenChange(false);
    
    toast.success('Counter offer sent!', {
      description: `Your counter offer has been sent to ${originalOffer.from}`,
    });
  };

  if (!open) return null;

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'CLP' ? '$' : '$';

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-3xl shadow-2xl max-h-[85vh] overflow-auto animate-in slide-in-from-bottom duration-300 max-w-[480px] mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-4 py-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Make Counter Offer</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Original Offer Summary */}
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground mb-2">Original Offer from {originalOffer.from}</p>
            <div className="space-y-1">
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground">They give you:</span>
                <div className="text-right">
                  <p className="text-sm font-medium">{originalOffer.offering}</p>
                  {originalOffer.additionalCash && (
                    <p className="text-sm text-green-600 dark:text-green-500 font-medium">
                      {originalOffer.additionalCash}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-xs text-muted-foreground">They want:</span>
                <p className="text-sm font-medium text-right">{originalOffer.forListing}</p>
              </div>
            </div>
          </div>

          {/* Your Counter Offer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Your Counter Offer:</h3>
            </div>

            {/* What you want */}
            <div className="p-3 rounded-lg border border-primary/20 bg-primary/5">
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-muted-foreground">You want:</span>
                  <div className="text-right flex-1 ml-2">
                    <p className="text-sm font-medium">{originalOffer.offering}</p>
                    
                    {/* Cash Input - Direct editable */}
                    <div className="mt-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm text-muted-foreground">+</span>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-green-600 dark:text-green-500">
                            {currencySymbol}
                          </span>
                          <input
                            type="text"
                            inputMode="numeric"
                            value={offeredCash || ''}
                            onChange={(e) => handleCashInput(e.target.value)}
                            placeholder="0"
                            className="w-24 h-10 pl-7 pr-3 rounded-lg border border-border bg-background text-center text-sm font-semibold text-green-600 dark:text-green-500 focus:outline-none focus:ring-2 focus:ring-primary/20"
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{currency}</span>
                      </div>
                    </div>

                    {/* Quick add buttons */}
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAdd(5)}
                        className="h-7 px-2 text-xs"
                      >
                        +{currencySymbol}5
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAdd(10)}
                        className="h-7 px-2 text-xs"
                      >
                        +{currencySymbol}10
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAdd(50)}
                        className="h-7 px-2 text-xs"
                      >
                        +{currencySymbol}50
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQuickAdd(100)}
                        className="h-7 px-2 text-xs"
                      >
                        +{currencySymbol}100
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-start pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">You give:</span>
                  <p className="text-sm font-medium text-right">{originalOffer.forListing}</p>
                </div>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Type the exact amount or use quick buttons to adjust
            </p>

            {/* Optional Message */}
            <div>
              <label className="text-sm font-medium block mb-2 flex items-center gap-1">
                <MessageSquare className="w-4 h-4" />
                Message (optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Add a message to explain your counter offer..."
                rows={3}
                maxLength={200}
                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">
                {message.length}/200 characters
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="flex-1"
            >
              Send Counter Offer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}