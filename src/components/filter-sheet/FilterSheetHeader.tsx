/**
 * FilterSheetHeader Component
 * Header del FilterSheet con handle bar, título, icono y botón de cerrar
 */

import { X, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import type { FilterSheetHeaderProps } from "./types";

export function FilterSheetHeader({ onClose }: FilterSheetHeaderProps) {
  return (
    <>
      {/* Handle bar iOS-style */}
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
      </div>

      {/* Header con gradiente */}
      <div className="w-full px-4 sm:px-6 py-4 bg-gradient-to-b from-gray-50 to-white border-b border-gray-200/50 flex-shrink-0">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-2 bg-primary/10 rounded-xl flex-shrink-0">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground" aria-hidden="true">
              Filters
            </h2>
          </div>
          <motion.button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 flex-shrink-0"
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Close filters"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </motion.button>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground" aria-hidden="true">
          Refine your search results
        </p>
      </div>
    </>
  );
}
