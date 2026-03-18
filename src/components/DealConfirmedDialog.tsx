/**
 * Deal Confirmed Dialog
 * Premium celebration popup when offer is accepted
 * 
 * Features:
 * - Handshake icon celebration
 * - Agreement details
 * - Professional & formal tone
 * - Smooth animation
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Handshake, Sparkles } from 'lucide-react';

interface DealConfirmedDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: string;
  itemTitle: string;
  buyerName: string;
  isOwner?: boolean; // true = seller, false = buyer
}

export function DealConfirmedDialog({
  open,
  onOpenChange,
  amount,
  itemTitle,
  buyerName,
  isOwner = false,
}: DealConfirmedDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] rounded-2xl p-0 overflow-hidden border-2 border-green-200 dark:border-green-800">
        {/* Header with gradient */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 px-6 pt-8 pb-6 text-center relative overflow-hidden">
          {/* Decorative sparkles */}
          <div className="absolute top-4 left-4 text-green-300/40 dark:text-green-700/40">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="absolute top-6 right-6 text-green-300/40 dark:text-green-700/40">
            <Sparkles className="w-3 h-3" />
          </div>
          <div className="absolute bottom-4 right-4 text-green-300/40 dark:text-green-700/40">
            <Sparkles className="w-3 h-3" />
          </div>

          {/* Main icon */}
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 shadow-lg shadow-green-500/30 animate-in zoom-in duration-300">
            <Handshake className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>

          <DialogHeader>
            <DialogTitle className="text-2xl text-center mb-2">
              Deal Confirmed!
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              {isOwner 
                ? `Congratulations! You've accepted the offer.`
                : `Great news! Your offer has been accepted.`
              }
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Details */}
        <div className="px-6 py-5 space-y-4">
          {/* Agreement Summary */}
          <div className="bg-muted/50 rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">Item</span>
              <span className="text-xs font-medium text-right max-w-[180px]">{itemTitle}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Agreed Price</span>
              <span className="font-semibold text-green-600 dark:text-green-400">{amount}</span>
            </div>

            <div className="flex justify-between items-start">
              <span className="text-xs text-muted-foreground">
                {isOwner ? 'Buyer' : 'Seller'}
              </span>
              <span className="text-xs font-medium">{buyerName}</span>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-xl p-3">
            <p className="text-xs font-medium text-blue-900 dark:text-blue-100 mb-1">
              📋 Next Steps
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300">
              {isOwner 
                ? 'Coordinate with the buyer for payment and pickup/delivery details.'
                : 'Coordinate with the seller for payment and pickup/delivery details.'
              }
            </p>
          </div>

          {/* Action Button */}
          <Button
            onClick={() => onOpenChange(false)}
            className="w-full h-11 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
          >
            Continue to Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}