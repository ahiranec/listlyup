/**
 * Trail Card
 * Wrapper for ListingCard optimized for Trail listings
 */

import { motion } from "motion/react";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { TrailActionMenu } from "./TrailActionMenu";
import type { TrailListing } from "./types";
import { lifecycleConfig, typeLabels } from "../my-listings/types";

interface TrailCardProps {
  listing: TrailListing;
  index: number;
  isSelected?: boolean;
  isSelectionMode?: boolean;
  onToggleSelection?: (listingId: string) => void;
  onNavigateToDetail?: (listingId: string) => void;
  onRepublish?: (listingId: string) => void;
  onDelete?: (listingId: string) => void;
  onActionComplete?: () => void;
}

export function TrailCard({
  listing,
  index,
  isSelected = false,
  isSelectionMode = false,
  onToggleSelection,
  onNavigateToDetail,
  onRepublish,
  onDelete,
  onActionComplete,
}: TrailCardProps) {
  const lifecycle = lifecycleConfig[listing.lifecycle];

  const lifecycleColors = {
    sold: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
    archived: "bg-slate-500/10 text-slate-700 dark:text-slate-400",
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  const handleCardClick = () => {
    if (isSelectionMode && onToggleSelection) {
      onToggleSelection(listing.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      onClick={handleCardClick}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow ${
        isSelectionMode ? 'cursor-pointer' : ''
      } ${isSelected ? 'ring-2 ring-primary' : ''}`}
    >
      <div className="flex gap-3">
        {/* Selection Checkbox */}
        {isSelectionMode && (
          <div className="flex-shrink-0 flex items-center">
            <Checkbox
              checked={isSelected}
              onCheckedChange={() => onToggleSelection?.(listing.id)}
              className="h-5 w-5"
            />
          </div>
        )}

        {/* Image */}
        <div className="flex-shrink-0">
          <ImageWithFallback
            src={listing.thumbnail || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400'}
            alt={listing.title}
            className="w-20 h-20 rounded-lg object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title */}
          <h3 className="font-medium text-gray-900 dark:text-white truncate mb-1">
            {listing.title}
          </h3>

          {/* Type and Price */}
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {typeLabels[listing.type]}
            </span>
            {listing.price && (
              <>
                <span className="text-gray-400">•</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">
                  {listing.price}
                </span>
              </>
            )}
          </div>

          {/* Badges: Status + Closed Date */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Lifecycle Badge */}
            <Badge
              variant="secondary"
              className={lifecycleColors[listing.lifecycle]}
            >
              {lifecycle.label}
            </Badge>

            {/* Closed Date Badge */}
            <Badge variant="outline" className="text-xs">
              <Calendar className="w-3 h-3 mr-1" />
              Closed {formatDate(listing.closedDate)}
            </Badge>
          </div>
        </div>

        {/* Action Menu - Hide in selection mode */}
        {!isSelectionMode && (
          <div className="flex-shrink-0">
            <TrailActionMenu
              listing={listing}
              onNavigateToDetail={onNavigateToDetail}
              onRepublish={onRepublish}
              onDelete={onDelete}
              onActionComplete={onActionComplete}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}