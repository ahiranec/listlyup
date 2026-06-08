import { User, Star, Clock, MapPin, Package, MessageCircle } from "lucide-react";
import { ResponsiveModal } from "../shared/ResponsiveModal";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import type { ExtendedProduct } from "./types";

interface SellerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller?: ExtendedProduct['seller'];
  location?: string;
}

export function SellerSheet({ open, onOpenChange, seller, location = "Viña del Mar" }: SellerSheetProps) {
  if (!seller) return null;

  return (
    <ResponsiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Seller Information"
      description="View seller profile, ratings, and contact information"
      desktopMaxWidth="max-w-lg"
      mobileHeight="h-[85vh]"
    >
        {/* Drag indicator */}
        <div className="flex-none flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>

        <div className="flex-none px-4 pb-3 border-b">
          <h2 className="flex items-center gap-2 text-left font-semibold">
            <User className="w-5 h-5 text-primary" />
            Seller Information
          </h2>
        </div>

        <ScrollArea className="flex-1 min-h-0">
          <div className="p-[var(--space-lg)] space-y-4">
            {/* Seller Info */}
            <div className="flex items-start gap-3">
              <Avatar className="w-14 h-14 flex-shrink-0">
                <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">
                  {seller.name.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium">{seller.name}</span>
                  {seller.isStore && (
                    <Badge variant="secondary" className="text-xs h-4 px-1.5">🏪 Store</Badge>
                  )}
                  {seller.verified && (
                    <Badge variant="secondary" className="text-xs h-4 px-1.5">✅ Verified</Badge>
                  )}
                </div>
                
                {seller.rating && (
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{seller.rating}</span>
                    <span className="text-muted-foreground text-xs">({seller.reviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            <Separator />
            
            {/* Stats compactos */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Member since</div>
                  <div className="font-medium text-foreground">{seller.memberSince}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Location</div>
                  <div className="font-medium text-foreground">{location}</div>
                </div>
              </div>
              
              {seller.itemsSold && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Package className="w-4 h-4 text-primary flex-shrink-0" />
                  <div>
                    <div className="text-xs text-muted-foreground">Items sold</div>
                    <div className="font-medium text-foreground">{seller.itemsSold}</div>
                  </div>
                </div>
              )}
              
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <div>
                  <div className="text-xs text-muted-foreground">Response time</div>
                  <div className="font-medium text-foreground">{seller.responseTime}</div>
                </div>
              </div>
            </div>

            <Separator />
            
            {/* Actions */}
            <div className="space-y-2">
              <Button variant="default" size="sm" className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Message Seller
              </Button>
              <Button variant="outline" size="sm" className="w-full">
                View Full Listing →
              </Button>
            </div>
          </div>
        </ScrollArea>
    </ResponsiveModal>
  );
}
