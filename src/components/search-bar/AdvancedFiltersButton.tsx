/**
 * Advanced Filters Button Component
 * Opens the full FilterSheet modal
 */

import { motion } from 'motion/react';
import { SlidersHorizontal } from 'lucide-react';

interface AdvancedFiltersButtonProps {
  onClick?: () => void;
  hasActiveFilters?: boolean;
  className?: string;
}

export function AdvancedFiltersButton({ 
  onClick, 
  hasActiveFilters = false,
  className = "",
}: AdvancedFiltersButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative p-2.5 bg-white border border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex-shrink-0 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Advanced Filters"
    >
      <SlidersHorizontal className="w-4 h-4 text-foreground transition-transform group-hover:scale-110" />
      
      {/* Active filters indicator */}
      {hasActiveFilters && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full border-2 border-white"
        />
      )}
    </motion.button>
  );
}