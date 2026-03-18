import { Star, Package } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { toast } from "sonner";

interface RatingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle: string;
  productPrice: string;
  productImage: string;
}

export function RatingSheet({ open, onOpenChange, productTitle, productPrice, productImage }: RatingSheetProps) {
  const handleSubmit = () => {
    onOpenChange(false);
    // En una app real, aquí se enviaría la review
    
    // FIX 48: Toast feedback
    toast.success("Review submitted. Thanks for your feedback!");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-600" />
            Rate Your Purchase
          </SheetTitle>
          <SheetDescription>
            Share your experience with this product and seller
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(90vh-80px)] mt-4">
          <div className="space-y-4 pb-6">
            {/* Product Preview */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-[var(--space-lg)] rounded-lg border border-yellow-200">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={productImage} alt={productTitle} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{productTitle}</div>
                  <div className="text-sm text-muted-foreground">{productPrice}</div>
                </div>
              </div>
            </div>

            {/* Item Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">How was the item?</label>
              <div className="flex gap-2 justify-center py-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="group transition-transform hover:scale-110"
                  >
                    <Star 
                      className="w-10 h-10 text-gray-300 group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors" 
                    />
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Seller Rating */}
            <div className="space-y-2">
              <label className="text-sm font-medium">How was the seller?</label>
              <div className="flex gap-2 justify-center py-4">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    className="group transition-transform hover:scale-110"
                  >
                    <Star 
                      className="w-10 h-10 text-gray-300 group-hover:text-yellow-500 group-hover:fill-yellow-500 transition-colors" 
                    />
                  </button>
                ))}
              </div>
            </div>

            <Separator />

            {/* Review Text */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Tell us more (optional)</label>
              <textarea
                className="w-full min-h-32 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Share your experience with this item and seller..."
              />
            </div>

            {/* Photo Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Add photos (optional)</label>
              <Button variant="outline" className="w-full justify-start">
                <Package className="w-4 h-4 mr-2" />
                Upload Photos
              </Button>
            </div>

            {/* Info Notice */}
            <div className="bg-blue-50 p-3 rounded-lg text-xs text-muted-foreground">
              <p className="font-medium mb-1">Your review helps the community</p>
              <p>Honest reviews help other buyers make informed decisions and encourage great sellers.</p>
            </div>

            {/* Submit Button */}
            <Button 
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
              size="lg"
              onClick={handleSubmit}
            >
              Submit Review
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}