/**
 * Product Card Action Component
 * View Details button
 * ✅ VD-1: Now accepts optional onViewDetails prop
 */

import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardActionProps {
  onViewDetails?: () => void;
}

export function ProductCardAction({ onViewDetails }: ProductCardActionProps) {
  return (
    <div className="mt-auto px-[var(--space-md)] pb-[var(--space-md)] sm:px-[var(--space-lg)] sm:pb-[var(--space-lg)]">
      <motion.button
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-white rounded-lg font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={onViewDetails ? { scale: 1.02 } : undefined}
        whileTap={onViewDetails ? { scale: 0.98 } : undefined}
        onClick={onViewDetails}
        disabled={!onViewDetails}
        data-action="view-listing-detail"
      >
        View Details
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </div>
  );
}
