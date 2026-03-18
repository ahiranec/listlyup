/**
 * ProductMetadataCompact - TRANSVERSAL
 * Metadata compactada en UN SOLO BLOQUE escaneable
 * Incluye: Type + Status + Listed + Location + Seller + Visibility + Category + Tags
 */

import { MapPin, User, Star, ShoppingBag, Repeat, Gift, Folder, Tag } from "lucide-react";
import type { CanonicalListing } from "../../types/canonical";
import type { ExtendedProduct } from "./types";
import { ProductGroupsInfo } from "./ProductGroupsInfo";

interface ProductMetadataCompactProps {
  product: CanonicalListing;
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

export function ProductMetadataCompact({
  product,
  extendedProduct,
  isOwner = false,
  listingStatus,
  timeAgo,
  onLocationClick,
  onSellerClick,
  onGroupClick,
}: ProductMetadataCompactProps) {
  // Determinar icono de offer type
  const getOfferTypeIcon = (type: string) => {
    if (type === "free") return Gift;
    if (type === "trade") return Repeat;
    if (type === "sale_or_trade") return ShoppingBag;
    if (type === "service" || type === "event") return ShoppingBag;
    return ShoppingBag;
  };

  const getOfferTypeLabel = (type: string) => {
    if (type === "free") return "For Free";
    if (type === "trade") return "For Trade";
    if (type === "sale_or_trade") return "Sale or Trade";
    if (type === "rent") return "For Rent";
    if (type === "service") return "Service";
    if (type === "event") return "Event";
    return "For Sale";
  };

  // Map canonical listing_type + offer_mode to legacy type
  const legacyType = product.listing_type === 'product' ? product.offer_mode : product.listing_type;
  const OfferIcon = getOfferTypeIcon(legacyType);

  return (
    <section className="px-4 py-2 space-y-1">
      {/* Línea 1: Type + Status + Listed */}
      <div className="flex items-center gap-2 text-xs flex-wrap mx-[0px] my-[8px]">
        <div className="flex items-center gap-1.5">
          <OfferIcon className="w-3.5 h-3.5" />
          <span>{getOfferTypeLabel(legacyType)}</span>
        </div>
        <span className="text-muted-foreground">•</span>
        {/* ❌ MVP: Only show "New Listing" or "Active" status - hide Expired/Expiring */}
        {(listingStatus.status === 'new' || listingStatus.status === 'active') && (
          <>
            <span className="flex items-center gap-1">
              <span
                className={`w-2 h-2 rounded-full ${
                  listingStatus.color === "blue"
                    ? "bg-blue-500"
                    : "bg-green-500"
                }`}
              />
              {listingStatus.label}
            </span>
            <span className="text-muted-foreground">•</span>
          </>
        )}
        <span className="text-muted-foreground">Listed {timeAgo}</span>
        {/* ❌ MVP: Renew Now removed - no expiring status visible */}
      </div>

      {/* Línea 2: Location */}
      <button
        onClick={onLocationClick}
        className="touch-target flex items-center gap-1.5 text-xs w-full text-left m-[0px] px-[0px] py-[4px]"
      >
        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
        <span className="text-primary hover:underline">
          Location not available
        </span>
      </button>

      {/* Línea 3: Seller + Rating */}
      <div className="flex items-center gap-1.5 text-xs m-[0px]">
        <User className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
        <button
          onClick={onSellerClick}
          className="touch-target text-primary hover:underline"
        >
          {extendedProduct.seller?.name || "Unknown"}
        </button>
        {/* ❌ MVP: Seller rating removed - no rating system in MVP */}
      </div>

      {/* ❌ MVP: Product Rating removed - no rating system in MVP */}

      {/* Línea 5: Visibility (Public/Groups) - Solo si es relevante mostrar */}
      {product.visibility === "groups" && (
        <ProductGroupsInfo product={product} onGroupClick={onGroupClick} />
      )}

      {/* Línea 6: Category + Subcategory */}
      {extendedProduct.category && (
        <div className="flex items-center gap-1.5 text-xs">
          <Folder className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
          <button className="touch-target text-primary hover:underline">
            {extendedProduct.category.main}
          </button>
          <span className="text-muted-foreground"> › </span>
          <button className="touch-target text-primary hover:underline">
            {extendedProduct.category.sub}
          </button>
        </div>
      )}

      {/* Línea 7: Tags */}
      {extendedProduct.tags && extendedProduct.tags.length > 0 && (
        <div className="flex items-center gap-1.5 text-xs">
          <Tag className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
          <div className="flex flex-wrap gap-1.5">
            {extendedProduct.tags.map((tag, i) => (
              <button
                key={i}
                className="touch-target text-primary hover:underline"
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}