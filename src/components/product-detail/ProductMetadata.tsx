import { MapPin, User, Star } from "lucide-react";
import { Button } from "../ui/button";
import { ShoppingBag, Repeat, Gift } from "lucide-react";
import type { Product } from "../../data/products";
import type { ExtendedProduct } from "./types";
import { ProductGroupsInfo } from "./ProductGroupsInfo";

interface ProductMetadataProps {
  product: Product;
  extendedProduct: ExtendedProduct;
  isOwner?: boolean;
  listingStatus: {
    status: string;
    label: string;
    color: string;
    daysLeft: number;
  };
  timeAgo: string;
  onLocationClick: () => void;
  onSellerClick: () => void;
  onGroupClick?: (groupId: string, groupName: string) => void;
}

export function ProductMetadata({
  product,
  extendedProduct,
  isOwner = false,
  listingStatus,
  timeAgo,
  onLocationClick,
  onSellerClick,
  onGroupClick
}: ProductMetadataProps) {
  // Determinar icono de offer type
  const getOfferTypeIcon = (type: string) => {
    if (type === 'free') return Gift;
    if (type === 'trade') return Repeat;
    if (type === 'sale_or_trade') return ShoppingBag;
    if (type === 'service' || type === 'experience' || type === 'event') return ShoppingBag;
    return ShoppingBag;
  };

  const OfferIcon = getOfferTypeIcon(product.type);

  return (
    <>
      {/* SECTION 3: Meta Info - Status + Location + Rating + Seller */}
      <section className="px-4 py-3 space-y-2">
        {/* Status Line: Type + Active + Listed */}
        <div className="flex items-center gap-2 text-xs flex-wrap">
          <div className="flex items-center gap-1.5">
            <OfferIcon className="w-3.5 h-3.5" />
            <span>{
              product.type === 'free' ? 'For Free' : 
              product.type === 'trade' ? 'For Trade' : 
              product.type === 'sale_or_trade' ? 'Sale or Trade' : 
              product.type === 'rent' ? 'For Rent' : 
              product.type === 'service' ? 'Service' : 
              product.type === 'experience' ? 'Experience' : 
              product.type === 'event' ? 'Event' : 
              'For Sale'
            }</span>
          </div>
          <span className="text-muted-foreground">•</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${
              listingStatus.color === 'green' ? 'bg-green-500' :
              listingStatus.color === 'blue' ? 'bg-blue-500' :
              listingStatus.color === 'orange' ? 'bg-orange-500' : 'bg-red-500'
            }`} />
            {listingStatus.label}
          </span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">Listed {timeAgo}</span>
          {listingStatus.status === 'expiring' && isOwner && (
            <>
              <span className="text-muted-foreground">•</span>
              <button className="text-xs text-orange-600 hover:underline">
                Renew Now →
              </button>
            </>
          )}
        </div>

        {/* Location */}
        <button 
          onClick={onLocationClick}
          className="touch-target flex items-center gap-1.5 text-xs"
        >
          <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
          <span className="text-primary hover:underline">{product.location || "Viña del Mar"}, V Región</span>
        </button>

        {/* Product Rating */}
        {extendedProduct.itemReviews && extendedProduct.itemReviews > 0 && (
          <div className="flex items-center gap-1.5 text-xs">
            <span>📦 Product:</span>
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{extendedProduct.itemRating}</span>
            <span className="text-muted-foreground">({extendedProduct.itemReviews} reviews)</span>
          </div>
        )}

        {/* Seller */}
        <div className="flex items-center gap-1.5 text-xs">
          <User className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
          <button 
            onClick={onSellerClick}
            className="touch-target text-primary hover:underline"
          >
            {extendedProduct.seller?.name || "Unknown"}
          </button>
          {extendedProduct.seller?.rating && (
            <>
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{extendedProduct.seller.rating}</span>
              {extendedProduct.seller.reviews && (
                <span className="text-muted-foreground">({extendedProduct.seller.reviews} reviews)</span>
              )}
            </>
          )}
        </div>

        {/* Groups Info - Only for group visibility */}
        <ProductGroupsInfo product={product} onGroupClick={onGroupClick} />
      </section>

      {/* SECTION 4: Taxonomy - Category + Tags */}
      <section className="px-4 py-3 space-y-2">
        {/* Category */}
        {extendedProduct.category && (
          <div className="text-xs">
            <button className="touch-target text-primary hover:underline">
              {extendedProduct.category.main}
            </button>
            <span className="text-muted-foreground"> › </span>
            <button className="touch-target text-primary hover:underline">
              {extendedProduct.category.sub}
            </button>
          </div>
        )}

        {/* Tags */}
        {extendedProduct.tags && extendedProduct.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {extendedProduct.tags.map((tag, i) => (
              <button key={i} className="touch-target text-xs text-primary hover:underline">
                #{tag}
              </button>
            ))}
          </div>
        )}
      </section>
    </>
  );
}