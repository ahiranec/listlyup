import { motion } from "motion/react";
import { Bookmark } from "lucide-react";

interface FilterFooterProps {
  onReset: () => void;
  onApply: () => void;
  onSaveSearch?: () => void;
  canSaveSearch?: boolean;
}

export function FilterFooter({ onReset, onApply, onSaveSearch, canSaveSearch = false }: FilterFooterProps) {
  return (
    <div className="w-full border-t border-gray-200/50 px-4 sm:px-6 py-3 sm:py-4 bg-white/80 backdrop-blur-sm flex-shrink-0">
      <div className="flex gap-2 sm:gap-3">
        <motion.button
          onClick={onReset}
          className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium text-xs sm:text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Reset All
        </motion.button>
        
        {/* Save Search Button - Only show if callback provided */}
        {onSaveSearch && (
          <motion.button
            onClick={onSaveSearch}
            disabled={!canSaveSearch}
            className="px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-200 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            whileHover={canSaveSearch ? { scale: 1.02 } : {}}
            whileTap={canSaveSearch ? { scale: 0.98 } : {}}
            title="Save this search"
          >
            <Bookmark className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </motion.button>
        )}
        
        <motion.button
          onClick={onApply}
          className="flex-1 bg-gradient-to-r from-primary to-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 font-medium text-xs sm:text-sm"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Filters
        </motion.button>
      </div>
    </div>
  );
}