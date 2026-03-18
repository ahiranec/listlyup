import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { MessageCircle, Users, Link2, QrCode, Gift } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import SharePreviewCard from './SharePreviewCard';
import GroupSelectorSheet from './GroupSelectorSheet';
import QRCodeSheet from './QRCodeSheet';
import { shareToWhatsApp, generateShareUrl } from '../../utils/shareUtils';

interface ShareSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: {
    id: string;
    title: string;
    price: string;
    location: string;
    image: string;
    rating?: number;
    type: string;
    condition?: string;
    description?: string;
  };
  isOwner: boolean;
  username: string;
  sellerName?: string;
  sellerAvatar?: string;
}

export default function ShareSheet({ 
  open, 
  onOpenChange, 
  product,
  isOwner,
  username
}: ShareSheetProps) {
  const [showGroups, setShowGroups] = useState(false);
  const [showQR, setShowQR] = useState(false);
  
  const productUrl = generateShareUrl(product.id, { source: 'copy' });
  const referralUrl = generateShareUrl(product.id, { 
    referralCode: username,
    source: 'copy'
  });
  
  const handleWhatsApp = () => {
    // Use the new rich WhatsApp sharing function
    shareToWhatsApp(product, isOwner ? username : undefined);
  };
  
  // Safe clipboard copy with fallback
  const copyToClipboard = async (text: string) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (err) {
        // Silently fall through to fallback method
        console.log('Clipboard API blocked, using fallback method');
      }
    }
    
    // Fallback to legacy method (always try this if Clipboard API fails)
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    } catch (err) {
      console.error('All copy methods failed:', err);
      return false;
    }
  };
  
  const handleCopyLink = async () => {
    const success = await copyToClipboard(productUrl);
    if (success) {
      toast.success('Link copied to clipboard');
    } else {
      toast.error('Failed to copy link');
    }
  };
  
  const handleCopyReferral = async () => {
    const success = await copyToClipboard(referralUrl);
    if (success) {
      toast.success('Referral link copied - Earn 5% commission!');
    } else {
      toast.error('Failed to copy referral link');
    }
  };
  
  const shareOptions = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      color: 'bg-green-100 text-green-600',
      onClick: handleWhatsApp
    },
    {
      icon: Users,
      label: 'Share to Groups',
      color: 'bg-blue-100 text-blue-600',
      onClick: () => setShowGroups(true)
    },
    {
      icon: Link2,
      label: 'Copy Link',
      color: 'bg-gray-100 text-gray-600',
      onClick: handleCopyLink
    },
    {
      icon: QrCode,
      label: 'QR Code',
      color: 'bg-purple-100 text-purple-600',
      onClick: () => setShowQR(true)
    },
  ];
  
  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] bg-gray-50/40">
          {/* Accessibility headers */}
          <SheetHeader className="sr-only">
            <SheetTitle>Share Listing</SheetTitle>
            <SheetDescription>
              Share {product.title} via WhatsApp, groups, link, or QR code
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Share Listing</h2>
            
            <SharePreviewCard product={product} />
            
            <div className="space-y-2">
              {shareOptions.map((option) => (
                <button
                  key={option.label}
                  onClick={option.onClick}
                  className="w-full flex items-center gap-3 p-4 bg-white rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${option.color}`}>
                    <option.icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
              
              {isOwner && (
                <button
                  onClick={handleCopyReferral}
                  className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl hover:from-amber-100 hover:to-orange-100 transition-colors border-2 border-amber-200"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-amber-100 text-amber-600">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">Referral Link</p>
                    <p className="text-xs text-gray-500">Earn 5% commission</p>
                  </div>
                </button>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <GroupSelectorSheet 
        open={showGroups}
        onOpenChange={setShowGroups}
        onShare={(groupIds) => {
          console.log('Shared to groups:', groupIds);
        }}
      />
      
      <QRCodeSheet
        open={showQR}
        onOpenChange={setShowQR}
        productUrl={productUrl}
      />
    </>
  );
}