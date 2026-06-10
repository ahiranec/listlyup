/**
 * ProductDetailPage - MVP Listing Detail
 * 
 * Clean, simple listing detail page focused on:
 * ✅ Photo carousel with video support
 * ✅ Pricing (discount + negotiable badge when applicable)
 * ✅ Location + Category + Tags
 * ✅ Username (seller name only)
 * ✅ Contact methods (Chat + WhatsApp when enabled)
 * ✅ Delivery/access options
 * ✅ Simple text description
 * ✅ Q&A (question, answer, timestamp)
 * ✅ Related content (Similar Listings + More from this user)
 * ✅ Sticky footer with contact CTAs
 * 
 * MVP Exclusions:
 * ❌ No rating system
 * ❌ No seller stats/analytics
 * ❌ No owner messages in content
 * ❌ No Recently Viewed
 * ❌ No Trust & Safety section
 */

import { ArrowLeft, Heart, Star, Flag, Shield, ShoppingBag, Repeat, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import type { CanonicalListing } from "../types/canonical";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "./ui/accordion";
import {
  ProductImageCarousel,
  ProductHeaderCompact,
  ProductMetadataCompact,
  ProductDescription,
  ProductGroupsInfo,
  ProductActions,
  RelatedProducts,
  DeliveryOptions,
  ContactMethods,
  QuestionsAnswers,
  LocationModal,
  SellerSheet,
  ReportSheet
} from "./product-detail";

import { shareContent } from "../utils/helpers";
import { toast } from "sonner";
import { isItemSaved, toggleSaveItem } from "../utils/savedItems";
import { trackProductView, getRecentlyViewedExcluding, clearRecentlyViewed } from "../utils/recentlyViewed";
import { convertaccess_modeToOptions } from "../utils/deliveryHelpers";
import ShareSheet from "./share/ShareSheet";
import { MakeOfferSheet } from "./sheets/MakeOfferSheet";
import { AskQuestionSheet } from "./sheets/AskQuestionSheet";
import { ManageOffersSheet } from "./sheets/ManageOffersSheet";
import { MarkAsSoldSheet } from "./sheets/MarkAsSoldSheet";
import { PauseListingSheet } from "./sheets/PauseListingSheet";
import { ReplySheet } from "./ReplySheet";
import type { AuthRequiredContext } from "./AuthRequiredSheet";
import { initializeProductShareTags } from "../utils/shareUtils";
import { getSellerInfo } from "../utils/sellerHelpers";
import { ActionButtons } from "./actions/ActionButtons";
import { useGlobalActionModal } from "./global-action-modal";

interface ProductDetailPageProps {
  product: CanonicalListing;
  productImage: string;
  onBack: () => void;
  isOwner?: boolean;
  isAuthenticated?: boolean;
  onAuthRequired?: (context: AuthRequiredContext) => void;
  onNavigateToHome?: (filters?: { groupId?: string }) => void;
  onNavigateToChat?: (chatId: string) => void;
  allProducts?: CanonicalListing[];
  onNavigateToProduct?: (productId: string) => void;
}

export function ProductDetailPage({
  product,
  productImage,
  onBack,
  isOwner = false,
  isAuthenticated = false,
  onAuthRequired,
  onNavigateToHome,
  onNavigateToChat,
  allProducts,
  onNavigateToProduct
}: ProductDetailPageProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isSellerModalOpen, setIsSellerModalOpen] = useState(false);
  const [isReportSheetOpen, setIsReportSheetOpen] = useState(false);
  const [isShareSheetOpen, setIsShareSheetOpen] = useState(false);
  const [isMakeOfferSheetOpen, setIsMakeOfferSheetOpen] = useState(false);
  const [isAskQuestionSheetOpen, setIsAskQuestionSheetOpen] = useState(false);

  const [isManageOffersSheetOpen, setIsManageOffersSheetOpen] = useState(false);
  const [isMarkAsSoldSheetOpen, setIsMarkAsSoldSheetOpen] = useState(false);
  const [isPauseListingSheetOpen, setIsPauseListingSheetOpen] = useState(false);
  const [selectedQuestionToRespond, setSelectedQuestionToRespond] = useState<any>(null);
  const [isEditingReply, setIsEditingReply] = useState(false);

  const [isSaved, setIsSaved] = useState(false);

  const { dispatch } = useGlobalActionModal();
  console.log("DETAIL location_name:", product.location_name, product);

  // Canonical field helpers
  const priceDisplay = product.price_amount && product.price_currency
    ? `${product.price_amount} ${product.price_currency}`
    : undefined;
  const imageUrl = productImage || product.primary_image_url || '';
  const legacyType = product.listing_type === 'product' ? product.offer_mode : product.listing_type;

  useEffect(() => {
    // Check if product is saved on mount
    setIsSaved(isItemSaved(product.id));

    // ✅ TRACK PRODUCT VIEW (Recently Viewed) - Auto-track for buyers only
    if (!isOwner && product) {
      trackProductView({
        id: product.id,
        title: product.title,
        price: priceDisplay || '',
        image: imageUrl,
        location: product.location_name || 'Sin ubicación',
        type: legacyType,
        condition: product.condition
      } as any);
    }

    // Initialize Open Graph tags for rich sharing
    initializeProductShareTags({
      id: product.id,
      title: product.title,
      price: priceDisplay,
      location: product.location_name || 'Sin ubicación',
      image: imageUrl,
      description: product.description || '',
      type: legacyType,
    });

    // Scroll to top when product changes
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [product.id, isOwner, productImage, product.title, product.price_amount, product.price_currency, product.description, product.listing_type, product.offer_mode, product.primary_image_url]);

  // AUTH GATE: Save/Favorite action
  const handleSaveToggle = () => {
    // Intercept if not authenticated
    if (!isAuthenticated) {
      onAuthRequired?.('favorites');
      return;
    }

    const newSavedState = toggleSaveItem({
      id: product.id,
      title: product.title,
      price: priceDisplay,
      image: imageUrl,
      location: product.location_name || 'Sin ubicación',
      type: legacyType,
    });


    setIsSaved(newSavedState);

    if (newSavedState) {
      toast.success('Saved to your collection! 💾');
    } else {
      toast.info('Removed from favorites');
    }
  };

  // AUTH GATE: Make Offer action
  const handleMakeOfferClick = () => {
    // Intercept if not authenticated
    if (!isAuthenticated) {
      onAuthRequired?.('offer');
      return;
    }

    // ✅ P2: Migrated to GAM
    dispatch({
      actionId: 'make-offer',
      context: {
        productId: product.id,
        listingTitle: product.title,
        listingImage: imageUrl,
        productPrice: priceDisplay,
        sellerId: product.owner_user_id,
        sellerName: sellerInfo.name,
      },
      onConfirm: () => {
        // Existing completion behavior preserved
        // MakeOfferSheet handles internal logic and onOfferSubmitted callback
      },
    });
  };

  // AUTH GATE: Ask Question action
  const handleAskQuestionClick = () => {
    // Intercept if not authenticated
    if (!isAuthenticated) {
      onAuthRequired?.('question');
      return;
    }
    setIsAskQuestionSheetOpen(true);
  };

  // Mock: Usuario puede calificar solo si compró el producto
  // ❌ MVP: Rating feature removed - no rating system in MVP
  // const canRate = !isOwner && product.id === "4"; // Solo para demo: Coffee Maker comprado

  // 🆕 GET SELLER INFO DYNAMICALLY using centralized helper (Audit Fix)
  const sellerInfo = getSellerInfo(product.owner_user_id, product.owner_user);

  // Calcular tiempo desde publicación
  const getTimeAgo = (dateString?: string) => {
    if (!dateString) return "Recently";

    const now = new Date();
    const past = new Date(dateString);
    const diffMs = now.getTime() - past.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    if (diffMinutes > 0) return `${diffMinutes}m ago`;
    return "Just now";
  };

  // Calcular estado del listing
  const getListingStatus = (dateString?: string) => {
    if (!dateString) return { status: 'active', label: 'Active', color: 'green', daysLeft: 30 };

    const now = new Date();
    const created = new Date(dateString);
    const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));

    const daysUntilExpiry = 30 - diffDays;

    if (diffDays < 1) {
      return { status: 'new', label: 'New Listing', color: 'blue', daysLeft: daysUntilExpiry };
    } else if (daysUntilExpiry <= 3 && daysUntilExpiry > 0) {
      return { status: 'expiring', label: `Expiring in ${daysUntilExpiry}d`, color: 'orange', daysLeft: daysUntilExpiry };
    } else if (daysUntilExpiry <= 0) {
      return { status: 'expired', label: 'Expired', color: 'red', daysLeft: 0 };
    } else {
      return { status: 'active', label: 'Active', color: 'green', daysLeft: daysUntilExpiry };
    }
  };

  const listingStatus = getListingStatus(product.created_at);
  const timeAgo = getTimeAgo(product.created_at);

  const handleShare = async () => {
    try {
      const result = await shareContent({
        title: product.title,
        text: `Check out this ${product.title}!`,
        url: window.location.href,
      });

      if (result.success) {
        if (result.method === "clipboard" || result.method === "manual") {
          toast.success('Link copied to clipboard!');
        } else if (result.method === "native") {
          toast.success('Shared successfully!');
        }
      } else {
        toast.error('Failed to share');
      }
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to share');
    }
  };

  // Determinar icono de offer type
  const getOfferTypeIcon = (type: string) => {
    if (type === 'free' || type === 'giveaway') return Star;
    if (type === 'trade') return Repeat;
    if (type === 'sale_or_trade' || type === 'sell_or_trade') return ShoppingBag;
    return ShoppingBag;
  };

  const OfferIcon = getOfferTypeIcon(legacyType);

  // ========== FILTRADO DE PRODUCTOS SIMILARES Y DEL SELLER ==========

  /**
   * Similar Listings - Usa la misma lógica que el searchbar
   * Filtrado por: categoría, subcategoría, tags, tipo, ubicación
   */
  const getSimilarProducts = () => {
    if (!allProducts || allProducts.length === 0) return [];

    return allProducts
      .filter(p => {
        // Excluir el producto actual
        if (p.id === product.id) return false;

        // Mismo tipo de listing (product/service/event)
        const sameListingType = product.listing_type === p.listing_type;

        if (!sameListingType) return false;

        // Score de similitud
        let score = 0;

        // +3 puntos: misma categoría
        if (product.category && p.category && product.category === p.category) {
          score += 3;
        }

        // +2 puntos: misma subcategoría
        if (product.subcategory && p.subcategory && product.subcategory === p.subcategory) {
          score += 2;
        }

        // +1 punto por cada tag compartido
        if (product.tags && p.tags) {
          const sharedTags = product.tags.filter(tag => p.tags?.includes(tag));
          score += sharedTags.length;
        }

        // +1 punto: misma ubicación (TODO: resolve from listing_location_id)
        // if (product.listing_location_id && p.listing_location_id && product.listing_location_id === p.listing_location_id) {
        //   score += 1;
        // }

        // +1 punto: mismo tipo de oferta (sell/trade/free/etc)
        if (product.offer_mode === p.offer_mode) {
          score += 1;
        }

        // Requiere al menos 2 puntos para ser considerado similar
        return score >= 2;
      })
      .sort((a, b) => {
        // Ordenar por relevancia (calcular score nuevamente)
        let scoreA = 0;
        let scoreB = 0;

        if (product.category && a.category === product.category) scoreA += 3;
        if (product.category && b.category === product.category) scoreB += 3;

        if (product.subcategory && a.subcategory === product.subcategory) scoreA += 2;
        if (product.subcategory && b.subcategory === product.subcategory) scoreB += 2;

        if (product.tags && a.tags) {
          scoreA += product.tags.filter(tag => a.tags?.includes(tag)).length;
        }
        if (product.tags && b.tags) {
          scoreB += product.tags.filter(tag => b.tags?.includes(tag)).length;
        }

        return scoreB - scoreA;
      })
      .slice(0, 6) // Máximo 6 productos similares
      .map(p => {
        const pPrice = p.price_amount && p.price_currency ? `${p.price_amount} ${p.price_currency}` : undefined;
        const pType = p.listing_type === 'product' ? p.offer_mode : p.listing_type;
        return {
          id: p.id,
          title: p.title,
          price: pPrice,
          image: p.primary_image_url || '',
          condition: p.condition,
          location: p.location_name || 'Sin ubicación',
          type: pType as any,
        };
      });
  };

  /**
   * More from Seller - Otras publicaciones del mismo vendedor
   * Solo aparece si hay 2+ publicaciones del seller (incluyendo la actual)
   */
  const getSellerProducts = () => {
    if (!allProducts || allProducts.length === 0 || !product.owner_user_id) return [];

    const sellerProducts = allProducts.filter(p =>
      p.owner_user_id === product.owner_user_id && p.id !== product.id
    );

    return sellerProducts
      .sort((a, b) => {
        // Ordenar por fecha de creación (más recientes primero)
        const dateA = new Date(a.created_at || 0).getTime();
        const dateB = new Date(b.created_at || 0).getTime();
        return dateB - dateA;
      })
      .slice(0, 6) // Máximo 6 productos
      .map(p => {
        const pPrice = p.price_amount && p.price_currency ? `${p.price_amount} ${p.price_currency}` : undefined;
        const pType = p.listing_type === 'product' ? p.offer_mode : p.listing_type;
        return {
          id: p.id,
          title: p.title,
          price: pPrice,
          image: p.primary_image_url || '',
          condition: p.condition,
          location: p.location_name || 'Sin ubicación',
          type: pType as any,
        };
      });
  };

  const similarProducts = getSimilarProducts();
  const sellerProducts = getSellerProducts();

  /**
   * Recently Viewed - Historial personal del buyer
   * Excluye el producto actual y limita a 6 items
   */
  const recentlyViewedProducts = !isOwner && allProducts ?
    getRecentlyViewedExcluding(product.id, 6)
      .map(item => {
        // Enriquecer con data completa de allProducts si está disponible
        const fullProduct = allProducts.find(p => p.id === item.id);
        if (fullProduct) {
          const fpPrice = fullProduct.price_amount && fullProduct.price_currency ? `${fullProduct.price_amount} ${fullProduct.price_currency}` : undefined;
          const fpType = fullProduct.listing_type === 'product' ? fullProduct.offer_mode : fullProduct.listing_type;
          return {
            id: fullProduct.id,
            title: fullProduct.title,
            price: fpPrice,
            image: fullProduct.primary_image_url || '',
            condition: fullProduct.condition,
            location: fullProduct.location_name || 'Sin ubicación',
            type: fpType as any,
          };
        }
        // Fallback: usar data del historial
        return {
          id: item.id,
          title: item.title,
          price: item.price,
          image: item.image,
          condition: item.condition,
          location: item.location,
          type: item.type,
        };
      })
    : [];

  // 🔍 DEBUG: Log recently viewed data (remove in production)
  if (typeof window !== 'undefined' && !isOwner) {
    console.log('📊 Recently Viewed Debug:', {
      isOwner,
      allProductsAvailable: !!allProducts,
      allProductsCount: allProducts?.length || 0,
      recentlyViewedCount: recentlyViewedProducts.length,
      recentlyViewedProducts: recentlyViewedProducts.map(p => ({ id: p.id, title: p.title })),
      rawHistoryCount: getRecentlyViewedExcluding(product.id, 20).length,
    });
  }

  // Handler para limpiar historial
  const handleClearHistory = () => {
    clearRecentlyViewed();
    toast.success('Viewing history cleared');
    // Force re-render by triggering a state update
    window.location.reload();
  };

  return (
    <div className="flex-1 min-h-0 overflow-y-auto bg-white max-w-[480px] lg:max-w-[640px] mx-auto w-full">

      {/* ========== HEADER - Sticky Top ========== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 h-14">
        <div className="flex items-center justify-between h-full px-4">
          <button
            onClick={onBack}
            className="icon-button hover:bg-muted transition-fast"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            {/* ❌ MVP: Rating button removed - no rating system in MVP */}
            <button
              onClick={() => {
                // ✅ P2: Migrated to GAM
                dispatch({
                  actionId: 'share-listing',
                  context: {
                    productId: product.id,
                    listingTitle: product.title,
                    listingImage: productImage,
                    productPrice: priceDisplay,
                    productLocation: product.location_name || 'Sin ubicación',
                    productType: legacyType,
                    sellerName: sellerInfo.name,
                  },
                  onConfirm: () => {
                    // ShareSheet handles internal logic
                  },
                });
              }}
              className="icon-button hover:bg-muted transition-fast"
              aria-label="Share"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={handleSaveToggle}
              className="icon-button hover:bg-muted transition-fast"
              aria-label={isSaved ? 'Unsave' : 'Save'}
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            {!isOwner && (
              <button
                onClick={() => {
                  // ✅ P2: Migrated to GAM
                  dispatch({
                    actionId: 'report-listing',
                    context: {
                      productId: product.id,
                      listingTitle: product.title,
                      listingImage: productImage,
                    },
                    onConfirm: () => {
                      // ReportSheet handles internal logic
                    },
                  });
                }}
                className="icon-button hover:bg-muted transition-fast text-red-600"
                aria-label="Report listing"
              >
                <Flag className="w-5 h-5" />
              </button>
            )}
            {isOwner && (
              <Badge variant="secondary" className="text-xs ml-1">
                <Star className="w-3 h-3 mr-1" />
                Your Listing
              </Badge>
            )}
          </div>
        </div>
      </header>

      {/* ========== MAIN CONTENT ========== */}
      <main className="pb-[calc(60px+var(--space-lg))]">

        {/* SECTION 1: Photo Carousel */}
        <ProductImageCarousel
          mediaItems={product.media && product.media.length > 0 
            ? product.media.map(m => ({ url: m.url, type: m.media_type }))
            : (imageUrl ? [{ type: 'image', url: imageUrl }] : [])
          }
          productImage={productImage}
          condition={product.condition}
          title={product.title}
          isOwner={isOwner}
          stats={undefined}
        />

        {/* SECTION 2: Hero - Title + Price + Meta principal */}
        <ProductHeaderCompact
          product={product}
          isOwner={isOwner}
        />

        <Separator className="opacity-30" />

        {/* SECTION 3: Metadata compactada */}
        <ProductMetadataCompact
          product={product}
          sellerName={sellerInfo.name}
          isOwner={isOwner}
          listingStatus={listingStatus}
          timeAgo={timeAgo}
          onLocationClick={() => setIsLocationModalOpen(true)}
          onSellerClick={() => setIsSellerModalOpen(true)}
          onGroupClick={(groupId, groupName) => {
            toast.info(`Navigating to ${groupName} products...`);
            onNavigateToHome?.({ groupId });
            onBack(); // Close detail page
          }}
        />

        <Separator className="opacity-30" />

        {/* SECTION 5-9: Interactive Sections */}
        <section className="space-y-0">

          {/* 5. Delivery Methods */}
          <DeliveryOptions deliveryOptions={convertaccess_modeToOptions(product.access_mode)} />

          <Separator className="my-0 mx-4 opacity-30" />

          {/* 6. Contact Methods */}
          <ContactMethods
            contact_methods={product.contact_methods}
            contact_whatsapp_phone={product.contact_whatsapp_phone}
            contact_website_url={product.contact_website_url}
            contact_social_url={product.contact_social_url}
            responseTime={undefined}
          />

          <Separator className="my-0 mx-4 opacity-30" />

          {/* 7. Description */}
          <ProductDescription product={product as any} />

          <Separator className="my-0 mx-4 opacity-30" />

          {/* 8. Questions & Answers */}
          <QuestionsAnswers
            questions={[]}
            isOwner={isOwner}
            onAnswerClick={(question) => {
              setSelectedQuestionToRespond(question);
              setIsEditingReply(false); // ✅ FIX: New reply mode
            }}
            onEditReply={(question) => {
              setSelectedQuestionToRespond(question);
              setIsEditingReply(true); // ✅ FIX: Edit mode
            }}
            onAskQuestionClick={handleAskQuestionClick} // ✅ FIX: Connect Ask Question button
          />

          {/* ❌ MVP: Owner Messages removed - should only appear in My Listings or separate modal */}

          <Separator className="my-0 mx-4 opacity-30" />

          {/* 9. More Items - MVP: Solo Similar Listings y More from this user */}
          {/* ❌ MVP: Recently Viewed removed - passing empty array */}
          <RelatedProducts
            sellerName={sellerInfo.name}
            isOwner={isOwner}
            recentlyViewedProducts={[]}
            similarProducts={similarProducts}
            sellerProducts={sellerProducts}
            onProductClick={(productId) => {
              // Navigate to the selected product
              const selectedProduct = allProducts?.find(p => p.id === productId);
              if (selectedProduct) {
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                // Trigger re-render with new product
                window.location.hash = `#product-${productId}`;
                // In a real app, this would use router navigation
                // For now, we'll show a toast
                toast.info(`Opening ${selectedProduct.title}...`);
                // TODO: Implement proper navigation via onNavigateToProduct callback
                onNavigateToProduct?.(productId);
              }
            }}
            onClearHistory={handleClearHistory}
          />

          {/* ❌ MVP: Trust & Safety section removed - OUT_OF_MVP */}
        </section>

      </main>

      {/* ========== FOOTER - Sticky Bottom ========== */}
      <ProductActions
        isOwner={isOwner}
        product={product as any}
        isAuthenticated={isAuthenticated} // NEW: Pass auth status
        onAuthRequired={onAuthRequired as any} // NEW: Pass auth gate handler
        onNavigateToChat={onNavigateToChat}
        onMakeOfferClick={handleMakeOfferClick}
        onAskQuestionClick={handleAskQuestionClick}
        onManageOffersClick={() => setIsManageOffersSheetOpen(true)}
        onMarkAsSoldClick={() => setIsMarkAsSoldSheetOpen(true)}
        onPauseListingClick={() => setIsPauseListingSheetOpen(true)}
      />

      {/* Location Modal */}
      <LocationModal
        open={isLocationModalOpen}
        onOpenChange={setIsLocationModalOpen}
        location={product.location_name || 'Sin ubicación'}
        latitude={product.latitude}
        longitude={product.longitude}
        privacyPin={undefined}
      />

      {/* Seller Sheet - Desliza desde abajo */}
      <SellerSheet
        open={isSellerModalOpen}
        onOpenChange={setIsSellerModalOpen}
        seller={sellerInfo as any}
        location={product.location_name || 'Sin ubicación'}
      />

      {/* Report Sheet */}
      <ReportSheet
        open={isReportSheetOpen}
        onOpenChange={setIsReportSheetOpen}
      />

      {/* ❌ MVP: RatingSheet removed - no rating system in MVP */}

      {/* Share Sheet */}
      <ShareSheet
        open={isShareSheetOpen}
        onOpenChange={setIsShareSheetOpen}
        product={{
          id: product.id,
          title: product.title,
          price: priceDisplay,
          location: product.location_name || 'Sin ubicación',
          image: productImage,
          rating: undefined,
          type: legacyType,
          condition: product.condition,
          description: product.description,
        }}
        isOwner={isOwner}
        username={"user"} // TODO: Get current user username
        sellerName={sellerInfo.name}
        sellerAvatar={sellerInfo.avatar}
      />

      {/* Make Offer Sheet */}
      <MakeOfferSheet
        open={isMakeOfferSheetOpen}
        onOpenChange={setIsMakeOfferSheetOpen}
        productTitle={product.title}
        productPrice={priceDisplay || '$0'}
        productImage={productImage}
        sellerId={product.owner_user_id}
        sellerName={sellerInfo.name}
        onOfferSubmitted={(offerId) => {
          // Navigate to chat with the new offer
          onNavigateToChat?.(offerId);
        }}
      />

      {/* Ask Question Sheet */}
      <AskQuestionSheet
        open={isAskQuestionSheetOpen}
        onOpenChange={setIsAskQuestionSheetOpen}
        productTitle={product.title}
        productImage={productImage}
        sellerName={sellerInfo.name}
      />

      {/* ========== SELLER/OWNER SHEETS ========== */}

      {/* Manage Offers Sheet (Owner only) */}
      {isOwner && (
        <ManageOffersSheet
          open={isManageOffersSheetOpen}
          onOpenChange={setIsManageOffersSheetOpen}
          productTitle={product.title}
          productPrice={priceDisplay || '$0'}
          productImage={productImage}
          onNavigateToChat={onNavigateToChat}
        />
      )}

      {/* Mark as Sold Sheet (Owner only) */}
      {isOwner && (
        <MarkAsSoldSheet
          open={isMarkAsSoldSheetOpen}
          onOpenChange={setIsMarkAsSoldSheetOpen}
          productTitle={product.title}
          productPrice={priceDisplay || '$0'}
          productImage={productImage}
          onMarkedAsSold={(buyerId, finalPrice) => {
            toast.success('Success! You can now leave a review.');
            // Could open rating sheet here
          }}
        />
      )}

      {/* Pause Listing Sheet (Owner only) */}
      {isOwner && (
        <PauseListingSheet
          open={isPauseListingSheetOpen}
          onOpenChange={setIsPauseListingSheetOpen}
          productTitle={product.title}
          productImage={productImage}
          isPaused={false} // TODO: Get from product state
          onStatusChanged={(paused) => {
            // Update product status
            console.log('Listing paused:', paused);
          }}
        />
      )}

      {/* Respond Question Sheet (Owner only) */}
      {isOwner && selectedQuestionToRespond && (
        <ReplySheet
          open={!!selectedQuestionToRespond}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedQuestionToRespond(null);
              setIsEditingReply(false); // ✅ FIX: Reset edit mode
            }
          }}
          question={selectedQuestionToRespond.question}
          askedBy={selectedQuestionToRespond.askedBy}
          askedAt={selectedQuestionToRespond.askedAt}
          listingTitle={product.title}
          listingImage={productImage}
          waitingCount={selectedQuestionToRespond.helpful || 0}
          initialAnswer={isEditingReply ? selectedQuestionToRespond.answer?.text : undefined} // ✅ FIX: Pass existing answer in edit mode
          onSubmit={async (answer) => {
            console.log(isEditingReply ? 'Answer edited:' : 'Answer posted:', selectedQuestionToRespond.id, answer);
            setSelectedQuestionToRespond(null);
            setIsEditingReply(false); // ✅ FIX: Reset edit mode
          }}
        />
      )}
    </div>
  );
}

export default ProductDetailPage;
