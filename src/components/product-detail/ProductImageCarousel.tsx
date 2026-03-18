import { useState } from "react";
import { Video } from "lucide-react";
import { ConditionBadge } from "../product-card/ConditionBadge";
import type { MediaItem, ExtendedProduct } from "./types";

interface ProductImageCarouselProps {
  mediaItems?: MediaItem[];
  productImage: string;
  condition?: string;
  title: string;
  isOwner?: boolean;
  stats?: ExtendedProduct['stats'];
}

export function ProductImageCarousel({
  mediaItems,
  productImage,
  condition,
  title,
  isOwner = false,
  stats
}: ProductImageCarouselProps) {
  const [selectedMedia, setSelectedMedia] = useState(0);

  return (
    <section className="relative bg-gray-100">
      <div className="relative h-56 sm:h-64 bg-gray-100">
        {mediaItems?.[selectedMedia]?.type === 'video' ? (
          <video
            controls
            className="w-full h-full object-cover"
            poster={mediaItems[selectedMedia].thumbnail}
          >
            <source src={mediaItems[selectedMedia].url} type="video/mp4" />
          </video>
        ) : (
          <img
            src={mediaItems?.[selectedMedia]?.url || productImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Badge de condición - SOLO para PRODUCT */}
        {condition && (
          <div className="absolute top-[var(--space-md)] left-[var(--space-md)]">
            <ConditionBadge condition={condition} />
          </div>
        )}

        {/* Indicador de media */}
        {mediaItems && mediaItems.length > 1 && (
          <div className="absolute bottom-[var(--space-md)] left-1/2 -translate-x-1/2 flex gap-1.5">
            {mediaItems.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedMedia(index)}
                className={`transition-all ${
                  selectedMedia === index 
                    ? 'w-6 h-2 bg-white rounded-full' 
                    : 'w-2 h-2 bg-white/50 hover:bg-white/75 rounded-full'
                } ${item.type === 'video' ? 'relative' : ''}`}
              >
                {item.type === 'video' && selectedMedia !== index && (
                  <Video className="w-2 h-2 absolute inset-0 text-white" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}