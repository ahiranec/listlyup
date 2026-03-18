import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Button } from '../ui/button';
import { Download } from 'lucide-react';

interface QRCodeSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productUrl: string;
}

export default function QRCodeSheet({ open, onOpenChange, productUrl }: QRCodeSheetProps) {
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(productUrl)}`;
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'listlyup-qr-code.png';
    link.click();
  };
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] bg-gray-50/40">
        {/* Accessibility headers */}
        <SheetHeader className="sr-only">
          <SheetTitle>QR Code</SheetTitle>
          <SheetDescription>
            Scan this QR code with your phone to view the listing
          </SheetDescription>
        </SheetHeader>
        
        <div className="flex flex-col items-center py-8">
          <h2 className="text-lg font-semibold mb-6">QR Code</h2>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <img 
              src={qrCodeUrl} 
              alt="QR Code" 
              className="w-64 h-64"
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-6 text-center px-4 max-w-sm">
            Scan this code with your phone camera to view the listing
          </p>
          
          <div className="flex gap-3 mt-6">
            <Button 
              onClick={handleDownload}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download QR Code
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}