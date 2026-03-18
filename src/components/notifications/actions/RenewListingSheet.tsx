/**
 * Renew Listing Action Sheet
 * Modal for renewing expired/expiring listings with payment confirmation
 */

import { DollarSign, Calendar, Eye } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface RenewListingSheetProps {
  isOpen: boolean;
  onClose: () => void;
  listingTitle: string;
  price: number;
  currentViews?: number;
  currentQuestions?: number;
  onConfirm: () => void;
}

export function RenewListingSheet({
  isOpen,
  onClose,
  listingTitle,
  price,
  currentViews = 0,
  currentQuestions = 0,
  onConfirm,
}: RenewListingSheetProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg">Renew Listing</SheetTitle>
          <SheetDescription>
            Extend your listing for 30 more days
          </SheetDescription>
        </SheetHeader>

        {/* Listing Info */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-muted/50 rounded-lg border">
            <p className="font-medium mb-2">{listingTitle}</p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {currentViews} views
              </span>
              <span>{currentQuestions} questions</span>
            </div>
          </div>

          {/* Renewal Details */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Duration</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">30 days</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Price</span>
              <div className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">${price}</span>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50">
            <p className="text-xs text-blue-900 dark:text-blue-100">
              ✨ Your listing will appear as <strong>Recently Updated</strong> in search results
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button className="flex-1" onClick={handleConfirm}>
            Renew for ${price}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
