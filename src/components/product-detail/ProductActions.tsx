import type { Product } from "../../data/products";
import type { ActionId } from "../../actions/types";
import type { ContactMethod } from "../../types/canonical";
import { findOrCreateChatForProduct } from "../../data/chatMessages";
import { toast } from "sonner@2.0.3";
import { Button } from "../ui/button";
import { ActionButtons } from "../actions/ActionButtons";
import { DollarSign, HelpCircle } from "lucide-react";
import { useState } from "react";
import { ListingStatsModal } from "./ListingStatsModal";

type AuthRequiredContext = 'message' | 'save' | 'offer' | 'question';

interface ProductActionsProps {
  isOwner?: boolean;
  product: Product;
  isAuthenticated?: boolean;
  onAuthRequired?: (context: AuthRequiredContext) => void;
  onNavigateToChat?: (chatId: string) => void;
  onMakeOfferClick?: () => void;
  onAskQuestionClick?: () => void;
  // Owner callbacks
  onManageOffersClick?: () => void;
  onMarkAsSoldClick?: () => void;
  onPauseListingClick?: () => void;
  // CANONICAL contact fields
  contact_methods?: ContactMethod[];
  contact_whatsapp_phone?: string;
  contact_website_url?: string;
  contact_social_url?: string;
}

/**
 * Helper: Determinar qué actionIds mostrar basado en contact_methods del producto
 */
function getContactActionIds(contact_methods?: ContactMethod[]): ActionId[] {
  // Si NO está definido (undefined), usar chat por defecto (backward compatibility)
  if (contact_methods === undefined) {
    return ['open-chat'];
  }
  
  // Si está explícitamente vacío [], respetar (sin botones de contacto)
  if (contact_methods.length === 0) {
    return [];
  }
  
  // Mapear contact_methods a actionIds correspondientes
  const actionMap: Record<ContactMethod, ActionId> = {
    'in_app_chat': 'open-chat',
    'whatsapp': 'open-whatsapp',
    'website': 'open-website',
    'social_media': 'open-social',
  };
  
  const actions = contact_methods
    .map(method => actionMap[method])
    .filter(Boolean) as ActionId[];
  
  // Si hay múltiples opciones, priorizar chat interno primero
  if (actions.length > 1 && actions.includes('open-chat')) {
    return ['open-chat', ...actions.filter(a => a !== 'open-chat')];
  }
  
  return actions;
}

/**
 * Helper: Obtener actionIds para el owner según el tipo de listing
 */
function getOwnerActionIds(productType: string): ActionId[] {
  // SIEMPRE visibles: Edit, Pause, Stats, Duplicate, Delete
  const baseActions: ActionId[] = ['edit-listing', 'pause-listing', 'view-stats', 'duplicate-listing', 'delete-listing'];
  
  // CONDICIONAL: Mark as Sold (solo para productos físicos)
  // Types que son productos físicos vendibles: 'sale', 'trade', 'sale_or_trade'
  const physicalProductTypes = ['sale', 'trade', 'sale_or_trade'];
  
  if (physicalProductTypes.includes(productType)) {
    // Insert mark-as-sold before delete-listing
    return [...baseActions.slice(0, -1), 'mark-as-sold', 'delete-listing'];
  }
  
  return baseActions;
}

export function ProductActions({ isOwner = false, product, isAuthenticated = false, onAuthRequired, onNavigateToChat, onMakeOfferClick, onAskQuestionClick, onManageOffersClick, onMarkAsSoldClick, onPauseListingClick }: ProductActionsProps) {
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);

  // AUTH GATE: Message Seller (open-chat) handler
  const handleOpenChat = () => {
    // Intercept if not authenticated
    if (!isAuthenticated) {
      onAuthRequired?.('message');
      return;
    }
    
    if (!onNavigateToChat) {
      toast.error('Chat navigation not available');
      return;
    }
    
    // Buscar o crear chat para este producto
    const sellerId = product.ownerId || 'unknown-seller';
    const sellerName = 'Seller'; // TODO: Get from product extended data
    
    const chatId = findOrCreateChatForProduct(
      product.id,
      product.title,
      sellerId,
      sellerName,
      product.price,
      product.image,
      product.type as 'product' | 'service' | 'event' // ✅ P2 HOTFIX: Pass type to enable/disable Make Offer in chat
    );
    
    toast.success('Opening chat...');
    onNavigateToChat(chatId);
  };
  
  // Crear entidad con handler personalizado para open-chat
  const entityWithChatHandler = {
    ...product,
    userId: product.ownerId || (isOwner ? 'user-123' : 'other-user'),
    _customHandlers: {
      'open-chat': handleOpenChat,
    }
  };
  
  // OWNER: Usar custom handlers para abrir sheets específicos
  const ownerCustomHandlers = {
    'edit-listing': () => {
      // TODO: In a real app, this would:
      // 1. Convert product to PublishFormData format
      // 2. Call navigation.navigateToEditListing(product.id)
      // 3. App.tsx would pass initialData to PublishFlow
      toast.info('Edit Listing: Opening edit mode...');
      console.log('Edit listing:', product);
      // Example integration:
      // navigation.navigateToEditListing(product.id);
    },
    'pause-listing': () => {
      onPauseListingClick?.();
    },
    'mark-as-sold': () => {
      onMarkAsSoldClick?.();
    },
    'view-stats': () => {
      // Open dedicated ListingStatsModal
      setIsStatsModalOpen(true);
    },
  };
  
  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg max-w-[480px] mx-auto">
        <div className="px-4 py-3 overflow-x-auto scrollbar-hide">
          {isOwner ? (
            <div className="min-w-max">
              <ActionButtons
                context="product-detail"
                entity={{ ...product, userId: product.ownerId || 'user-123' }}
                actionIds={getOwnerActionIds(product.type)}
                layout="horizontal"
                isOwner={true}
                customHandlers={ownerCustomHandlers}
              />
            </div>
          ) : (
            <div className="space-y-2">
              {/* Primary Actions - Contact Buttons */}
              <ActionButtons
                context="product-detail"
                entity={entityWithChatHandler}
                actionIds={getContactActionIds(product.contact_methods)}
                layout="horizontal"
                isOwner={false}
                customHandlers={{
                  'open-chat': handleOpenChat,
                }}
              />
              
              {/* Secondary Actions - Make Offer & Ask Question */}
              {/* ✅ MIGRATION: Use ActionButtons instead of manual buttons */}
              <ActionButtons
                context="product-detail"
                entity={product}
                actionIds={[
                  ...(onMakeOfferClick && product.type !== 'free' ? ['make-trade-offer' as const] : []),
                  ...(onAskQuestionClick ? ['ask-question' as const] : [])
                ]}
                layout="horizontal"
                isOwner={false}
                customHandlers={{
                  'make-trade-offer': onMakeOfferClick,
                  'ask-question': onAskQuestionClick,
                }}
              />
            </div>
          )}
        </div>
      </footer>

      {/* Listing Stats Modal - Only for owner */}
      {isOwner && (
        <ListingStatsModal
          open={isStatsModalOpen}
          onOpenChange={setIsStatsModalOpen}
          listing={product}
        />
      )}
    </>
  );
}