/**
 * Product Card Image Component
 * Image container with badges and save button
 */

import { Bookmark } from 'lucide-react';
import { CategoryTypeBadge } from './CategoryTypeBadge';
import { VisibilityBadge } from './VisibilityBadge';
import { SaveButton } from './SaveButton';
import type { Product } from '../../data/products';

interface ProductCardImageProps {
  image: string;
  title: string;
  type: Product['type'];
  visibility?: string;
  isSaved: boolean;
  onSaveClick: (e: React.MouseEvent) => void;
}

export function ProductCardImage({
  image,
  title,
  type,
  visibility,
  isSaved,
  onSaveClick
}: ProductCardImageProps) {
  return (
    <div className="relative h-[180px] sm:h-[220px] bg-muted overflow-hidden" data-field="listing-image">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Category/Type Badge - Top Left */}
      <CategoryTypeBadge type={type} />
      
      {/* Visibility Badge - Top Right (if not saved) */}
      {!isSaved && <VisibilityBadge visibility={visibility} />}
      
      {/* Saved Badge - Top Right (if saved) - Soft style, less visual weight */}
      {isSaved && (
        <div className="absolute top-[var(--space-sm)] right-[var(--space-sm)]">
          <div className="flex items-center gap-1 px-2 py-1 bg-white/90 backdrop-blur-sm border border-red-200 rounded-md shadow-sm">
            <Bookmark className="w-3 h-3 text-red-500" />
            <span className="text-xs text-red-600 font-medium">Saved</span>
          </div>
        </div>
      )}
      
      {/* Save Button - Bottom Right */}
      <div className="absolute bottom-[var(--space-sm)] right-[var(--space-sm)]">
        <SaveButton isSaved={isSaved} onClick={onSaveClick} />
      </div>
    </div>
  );
}