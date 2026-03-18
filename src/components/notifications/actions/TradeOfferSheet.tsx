/**
 * Trade Offer Action Sheet
 * Modal for accepting/rejecting trade offers with full details
 */

import { ArrowRightLeft, Package, Clock, User } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../../ui/sheet';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface TradeOfferSheetProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  userItem: string;
  yourItem: string;
  expiresIn?: string;
  onAccept: () => void;
  onReject: () => void;
}

export function TradeOfferSheet({
  isOpen,
  onClose,
  userName,
  userItem,
  yourItem,
  expiresIn = '2h',
  onAccept,
  onReject,
}: TradeOfferSheetProps) {
  const handleAccept = () => {
    onAccept();
    onClose();
  };

  const handleReject = () => {
    onReject();
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-lg">Trade Offer</SheetTitle>
          <SheetDescription>
            Review and respond to this trade proposal
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 mb-6">
          {/* Expiration Warning */}
          {expiresIn && (
            <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200/50">
              <Clock className="w-4 h-4 text-red-600" />
              <span className="text-xs text-red-900 dark:text-red-100">
                Expires in <strong>{expiresIn}</strong>
              </span>
            </div>
          )}

          {/* User Info */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
              {userName[0]}
            </div>
            <div>
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">Verified seller · 4.8★</p>
            </div>
          </div>

          {/* Trade Details */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground text-center">Trade proposal</p>
            
            {/* Your Item */}
            <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200/50">
              <Package className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-xs text-blue-900/60 dark:text-blue-100/60">You give</p>
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{yourItem}</p>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <ArrowRightLeft className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Their Item */}
            <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200/50">
              <Package className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-xs text-green-900/60 dark:text-green-100/60">You receive</p>
                <p className="text-sm font-medium text-green-900 dark:text-green-100">{userItem}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="p-3 bg-muted/30 rounded-lg border border-dashed">
            <p className="text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> After accepting, you'll be connected via chat to coordinate delivery details.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 border-red-200 text-red-600 hover:bg-red-50" 
            onClick={handleReject}
          >
            Reject
          </Button>
          <Button 
            className="flex-1 bg-green-600 hover:bg-green-700" 
            onClick={handleAccept}
          >
            Accept Trade
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
