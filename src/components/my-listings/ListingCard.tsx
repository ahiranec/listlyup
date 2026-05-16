import { motion } from "motion/react";
import { Eye, MapPin } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { ActionMenu } from "../actions";
import { useGlobalActionModal } from "../global-action-modal";
import type { MyListing } from "./types";
import { lifecycleConfig, visibilityConfig, typeLabels } from "./types";
import { listingsRepo } from "../../data/repos/listingsRepo";
import { toast } from "sonner";

interface ListingCardProps {
  listing: MyListing;
  index: number;
  isSelected: boolean;
  onToggleSelection: (id: string) => void;
  onNavigateToDetail?: (listingId: string) => void;
  onActionComplete?: () => void; // Callback para cuando se complete una acción
  onEdit?: (listingId: string) => void; // NEW: Edit handler
  activeTab?: 'all' | 'paused' | 'messages' | 'reported' | 'expiring'; // NEW: Active tab context
}

export function ListingCard({
  listing,
  index,
  isSelected,
  onToggleSelection,
  onNavigateToDetail,
  onActionComplete,
  onEdit,
  activeTab = 'all',
}: ListingCardProps) {
  const { dispatch } = useGlobalActionModal();
  const lifecycle = lifecycleConfig[listing.lifecycle];
  const visibility = visibilityConfig[listing.visibility];

  const lifecycleColors = {
    active: "bg-green-500/10 text-green-700 dark:text-green-400",
    paused: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    expired: "bg-red-500/10 text-red-700 dark:text-red-400",
    draft: "bg-gray-500/10 text-gray-700 dark:text-gray-400",
    expiring_soon: "bg-amber-500/10 text-amber-700 dark:text-amber-600",
  };

  // ✅ Lifecycle Integration: Get finalized stage with safe fallback
  const getLifecycleStage = () => {
    // 1. Prefer backend stage if available
    const backendStage = (listing as any).lifecycle_stage;
    if (backendStage === 'expired' || backendStage === 'expiring_soon') return backendStage;

    // 2. Safe Fallback Rules
    const now = new Date();
    const expiresAt = (listing as any).expires_at ? new Date((listing as any).expires_at) : null;
    const expiringSoonAt = (listing as any).expiring_soon_at ? new Date((listing as any).expiring_soon_at) : null;

    if (listing.lifecycle === 'expired') return 'expired';
    if (expiresAt && now >= expiresAt) return 'expired';
    if (expiringSoonAt && now >= expiringSoonAt) return 'expiring_soon';
    
    // Default to existing lifecycle (paused, draft, active)
    return listing.lifecycle;
  };

  const currentStage = getLifecycleStage();
  const stageLifecycle = lifecycleConfig[currentStage === 'expiring_soon' ? 'active' : currentStage as any] || lifecycleConfig.active;

  // Determinar actionIds según el activeTab y lifecycle del listing
  const getActionIds = () => {
    // Si listing está pausado → mostrar "Resume" como PRIMARY action
    if (listing.lifecycle === 'paused') {
      const baseActions = ['reactivate-listing', 'edit-listing'];
      const markAsSoldAction = listing.type === 'product' ? ['mark-as-sold'] : [];
      return [...baseActions, ...markAsSoldAction, 'delete-listing'];
    }
    
    // Tab-specific actions (priority)
    if (activeTab === 'messages') {
      // Messages tab: Different actions based on messageType
      const baseActions = ['edit-listing', 'share-listing', 'pause-listing'];
      const messageAction = listing.messageType === 'chat' ? ['open-chat'] : ['respond-question'];
      const markAsSoldAction = listing.type === 'product' ? ['mark-as-sold'] : [];
      return [...messageAction, ...baseActions, ...markAsSoldAction, 'delete-listing'];
    } else if (activeTab === 'reported') {
      // Reported tab: Review report action first
      const baseActions = ['review-report', 'edit-listing', 'share-listing', 'pause-listing'];
      const markAsSoldAction = listing.type === 'product' ? ['mark-as-sold'] : [];
      return [...baseActions, ...markAsSoldAction, 'delete-listing'];
    } else if (activeTab === 'expiring') {
      // Expiring tab: Renew as primary action
      // Renew only available for Product and Service (not Event)
      const renewAction = listing.type !== 'event' ? ['renew-listing'] : [];
      const baseActions = ['edit-listing', 'share-listing', 'pause-listing'];
      const markAsSoldAction = listing.type === 'product' ? ['mark-as-sold'] : [];
      return [...renewAction, ...baseActions, ...markAsSoldAction, 'delete-listing'];
    }
    
    // Default (All tab): Base actions always visible
    const baseActions = ['edit-listing', 'share-listing', 'pause-listing'];
    
    // CONDITIONAL: Review (when listing is reported) - MVP requirement
    const reviewAction = listing.isReported ? ['review-report'] : [];
    
    // CONDITIONAL: Renew (only for Product and Service, NOT Event)
    const renewAction = (listing.type === 'product' || listing.type === 'service') ? ['renew-listing'] : [];
    
    // CONDITIONAL: Mark as Sold (only for Product)
    const markAsSoldAction = listing.type === 'product' ? ['mark-as-sold'] : [];

    // ✅ Lifecycle: Refresh action for expiring/active listings
    const refreshAction = (currentStage === 'active' || currentStage === 'expiring_soon') ? ['refresh-listing'] : [];
    
    // Build final actions array
    return [...baseActions, ...reviewAction, ...renewAction, ...markAsSoldAction, ...refreshAction, 'delete-listing'];
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on interactive elements
    const target = e.target as HTMLElement;
    if (
      target.closest('button') || 
      target.closest('[role="menuitem"]') ||
      target.closest('input[type="checkbox"]')
    ) {
      return;
    }
    
    if (onNavigateToDetail) {
      onNavigateToDetail(listing.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`bg-card border-b last:border-b-0 hover:bg-muted/50 transition-colors ${
        isSelected ? "bg-blue-50" : ""
      }`}
    >
      <div className="p-3">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <Checkbox
            checked={isSelected}
            onCheckedChange={() => onToggleSelection(listing.id)}
            className="flex-shrink-0 mt-0.5"
          />

          {/* Thumbnail - Clickable */}
          <div 
            className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-muted cursor-pointer"
            onClick={handleCardClick}
          >
            <ImageWithFallback
              src={listing.thumbnail || ""}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content - Clickable */}
          <div 
            className="flex-1 min-w-0 cursor-pointer"
            onClick={handleCardClick}
          >
            {/* Title and Actions */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-medium truncate flex-1">
                {listing.title}
              </h3>

              {/* Actions Menu - Using centralized Action system */}
              <ActionMenu
                entity={{
                  ...listing,
                  id: listing.id,
                  type: 'listing', // Must be one of 'listing' | 'user' | 'group' | 'notification' | 'trade'
                  userId: listing.userId || 'user-123',
                }}
                actionIds={getActionIds() as any[]}
                context="my-listings"
                isOwner={true}
                align="end"
                onActionComplete={onActionComplete}
                customHandlers={{
                  'edit-listing': (entity) => {
                    if (onEdit) {
                      onEdit(entity.id);
                    }
                  },
                  'share-listing': (entity) => {
                    // ✅ P2 Hotfix: Wire to GAM ShareSheet (same as ProductDetail)
                    dispatch({
                      actionId: 'share-listing',
                      context: {
                        productId: entity.id,
                        listingTitle: entity.title || 'Unknown Listing',
                        listingImage: entity.image || entity.thumbnail || '',
                        productPrice: entity.price || '',
                        productLocation: entity.location || '',
                        productType: entity.type || 'product',
                        sellerName: 'You',
                      },
                      onConfirm: () => {
                        // ShareSheet handles internal share logic
                      },
                    });
                  },
                  'open-chat': (entity) => {
                    // Reply to message: Navigate to chat with the buyer
                    // TODO: Get actual chatId from listing data
                    const chatId = `chat-${entity.id}-buyer`; // Temporary: construct chatId
                    console.log('[Reply] Opening chat for listing:', entity.id, 'chatId:', chatId);
                    // TODO: Call onNavigateToChat when available
                    toast.info(`Opening chat to reply to message...`);
                  },
                  'refresh-listing': async (entity) => {
                    try {
                      await listingsRepo.refreshListing(entity.id);
                      toast.success("Listing refreshed successfully!");
                      if (onActionComplete) onActionComplete();
                    } catch (err) {
                      toast.error("Failed to refresh listing");
                    }
                  }
                }}
              />
            </div>

            {/* Price & Location */}
            <div className="flex items-center gap-2 mb-1.5 text-sm">
              <span className="font-semibold text-primary">
                {listing.price}
              </span>
              <span className="text-muted-foreground">·</span>
              <div className="flex items-center gap-1 text-muted-foreground truncate">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{listing.location || "No location"}</span>
              </div>
            </div>

            {/* Stats - MVP: ONLY Views visible */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1.5">
              <div className="flex items-center gap-1">
                <Eye className="w-3.5 h-3.5" />
                <span>{listing.stats.views}</span>
              </div>
              <span className="text-muted-foreground">·</span>
              <span>{typeLabels[listing.type]}</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Lifecycle Badge */}
              <Badge variant="secondary" className={`${lifecycleColors[currentStage as keyof typeof lifecycleColors] || lifecycleColors.active} text-xs h-5`}>
                <div className={`w-2 h-2 rounded-full ${currentStage === 'expiring_soon' ? 'bg-amber-500' : lifecycle.color} mr-1`} />
                {currentStage === 'expiring_soon' ? 'Expiring Soon' : lifecycle.label}
              </Badge>

              {/* Visibility Badge */}
              <Badge variant="secondary" className="text-xs h-5">
                {visibility.icon} {visibility.label}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
