import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { MessageCircle, Link2, QrCode } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import QRCodeSheet from './QRCodeSheet';

interface ShareGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  group: {
    id: string;
    name: string;
    description?: string;
    avatarUrl?: string;
    memberCount?: number;
    type?: string;
  };
}

export default function ShareGroupSheet({ 
  open, 
  onOpenChange, 
  group
}: ShareGroupSheetProps) {
  const [showQR, setShowQR] = useState(false);
  
  // Generate group URL
  const groupUrl = window.location.href;
  
  const handleWhatsApp = () => {
    // Build WhatsApp message for group
    const message = `Join ${group.name} on ListlyUp!`;
    const fullMessage = `${message}\n\n🔗 ${groupUrl}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
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
    const success = await copyToClipboard(groupUrl);
    if (success) {
      toast.success('Link copied to clipboard!');
    } else {
      toast.error('Failed to copy link');
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
            <SheetTitle>Share Group</SheetTitle>
            <SheetDescription>
              Share {group.name} via WhatsApp, link, or QR code
            </SheetDescription>
          </SheetHeader>
          
          <div className="py-4">
            <h2 className="text-lg font-semibold mb-4">Share Group</h2>
            
            {/* Group Preview Card - Matching SharePreviewCard style */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4 mb-4 border border-blue-100">
              <div className="flex gap-3">
                {group.avatarUrl ? (
                  <img 
                    src={group.avatarUrl} 
                    alt={group.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      {group.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium truncate">{group.name}</h3>
                  {group.memberCount !== undefined && (
                    <p className="text-lg font-bold text-blue-600 mt-1">
                      {group.memberCount} {group.memberCount === 1 ? 'member' : 'members'}
                    </p>
                  )}
                  {group.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{group.description}</p>
                  )}
                </div>
              </div>
            </div>
            
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
            </div>
          </div>
        </SheetContent>
      </Sheet>
      
      <QRCodeSheet
        open={showQR}
        onOpenChange={setShowQR}
        productUrl={groupUrl}
      />
    </>
  );
}