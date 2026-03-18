/**
 * PauseListingSheet Component
 * Sheet for pausing/reactivating a listing
 * Includes reason selection and duration
 */

import { useState } from 'react';
import { Pause, Play, Clock, ChevronLeft } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { toast } from 'sonner@2.0.3';

interface PauseListingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productImage: string;
  isPaused?: boolean;
  onStatusChanged?: (paused: boolean) => void;
}

const PAUSE_REASONS = [
  { id: 'not-available', label: 'Temporarily not available', icon: '🚫' },
  { id: 'too-many-messages', label: 'Too many messages', icon: '💬' },
  { id: 'price-change', label: 'Need to update price/details', icon: '💰' },
  { id: 'pending-sale', label: 'Sale in progress', icon: '🤝' },
  { id: 'vacation', label: 'Going on vacation', icon: '✈️' },
  { id: 'other', label: 'Other reason', icon: '📝' },
];

const PAUSE_DURATIONS = [
  { id: '1-day', label: '1 day' },
  { id: '3-days', label: '3 days' },
  { id: '1-week', label: '1 week' },
  { id: '2-weeks', label: '2 weeks' },
  { id: 'indefinite', label: 'Until I reactivate' },
];

export function PauseListingSheet({
  open,
  onOpenChange,
  productTitle,
  productImage,
  isPaused = false,
  onStatusChanged,
}: PauseListingSheetProps) {
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<string>('indefinite');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePause = async () => {
    if (!selectedReason && !isPaused) return;

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 600));

    if (isPaused) {
      toast.success('Listing reactivated! 🎉', {
        description: 'Your listing is now visible to buyers',
      });
      onStatusChanged?.(false);
    } else {
      const duration = PAUSE_DURATIONS.find(d => d.id === selectedDuration);
      toast.success('Listing paused', {
        description: `Paused for ${duration?.label}`,
      });
      onStatusChanged?.(true);
    }

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset
    setSelectedReason('');
    setSelectedDuration('indefinite');
  };

  // Reactivate View (if already paused)
  if (isPaused) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[70vh] p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Reactivate Listing</SheetTitle>
            <SheetDescription>Reactivate {productTitle}</SheetDescription>
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
                <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Reactivate</h2>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(70vh-140px)]">
            <div className="px-4 py-6 space-y-6">
              {/* Product Preview */}
              <div className="flex gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                <img
                  src={productImage}
                  alt={productTitle}
                  className="w-16 h-16 object-cover rounded-md opacity-60"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{productTitle}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Pause className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-700 font-medium">Currently Paused</span>
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p className="text-sm font-medium text-blue-900">📢 Reactivate Your Listing</p>
                <p className="text-xs text-blue-700">
                  Your listing will become visible to all buyers again and will appear in search results.
                </p>
              </div>

              {/* What happens */}
              <div className="space-y-2">
                <p className="text-sm font-medium">What happens when you reactivate?</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Listing appears in search and feeds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Buyers can contact you again</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Gets a small visibility boost</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>Expiration timer continues</span>
                  </li>
                </ul>
              </div>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t p-4">
            <Button
              onClick={handlePause}
              disabled={isSubmitting}
              className="w-full h-12 bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                'Reactivating...'
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Reactivate Listing
                </>
              )}
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Pause View
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Pause Listing</SheetTitle>
          <SheetDescription>Temporarily pause {productTitle}</SheetDescription>
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
              <h2 className="text-sm text-muted-foreground uppercase tracking-wide">Pause Listing</h2>
            </div>
          </div>
        </div>

        <ScrollArea className="h-[calc(90vh-140px)]">
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
                <p className="text-sm text-muted-foreground mt-1">Active listing</p>
              </div>
            </div>

            {/* Info Banner */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 space-y-2">
              <p className="text-sm font-medium text-yellow-900">⏸️ Pause your listing</p>
              <p className="text-xs text-yellow-700">
                Paused listings are hidden from search and buyers cannot contact you. You can reactivate anytime.
              </p>
            </div>

            {/* Reason Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">Why are you pausing? *</label>
              <div className="space-y-2">
                {PAUSE_REASONS.map((reason) => (
                  <button
                    key={reason.id}
                    onClick={() => setSelectedReason(reason.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                      selectedReason === reason.id
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <span className="text-2xl">{reason.icon}</span>
                    <span className="flex-1 text-sm">{reason.label}</span>
                    {selectedReason === reason.id && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Duration Selection */}
            <div className="space-y-3">
              <label className="text-sm font-medium">
                <Clock className="w-4 h-4 inline mr-1" />
                Pause Duration
              </label>
              <div className="grid grid-cols-2 gap-2">
                {PAUSE_DURATIONS.map((duration) => (
                  <button
                    key={duration.id}
                    onClick={() => setSelectedDuration(duration.id)}
                    className={`p-3 rounded-lg border-2 transition-all text-sm text-center ${
                      selectedDuration === duration.id
                        ? 'border-primary bg-primary/5 font-medium'
                        : 'border-gray-200 hover:border-primary/50'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            {/* What happens when paused */}
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-medium">While paused:</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Your listing won't appear in search results</li>
                <li>• Buyers cannot contact you about this item</li>
                <li>• Your existing conversations remain accessible</li>
                <li>• The listing doesn't count towards your active limit</li>
                <li>• You can reactivate anytime from My Listings</li>
              </ul>
            </div>
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t p-4">
          <Button
            onClick={handlePause}
            disabled={!selectedReason || isSubmitting}
            variant="outline"
            className="w-full h-12"
          >
            {isSubmitting ? (
              'Pausing...'
            ) : (
              <>
                <Pause className="w-4 h-4 mr-2" />
                Pause Listing
              </>
            )}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
