/**
 * View Toggle Button Component
 * Map/List view toggle
 * MAP button always shows label (mode switch)
 */

import { motion } from 'motion/react';
import { Map, List } from 'lucide-react';

interface ViewToggleButtonProps {
  isMapView: boolean;
  onClick?: () => void;
}

export function ViewToggleButton({ isMapView, onClick }: ViewToggleButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="flex items-center gap-1.5 px-3 py-2.5 bg-white border-2 border-primary/20 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 group flex-shrink-0 shadow-sm"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isMapView ? "List View" : "Map View"}
    >
      {isMapView ? (
        <>
          <List className="w-4 h-4 text-primary transition-transform group-hover:scale-110 flex-shrink-0" />
          <span className="text-xs font-medium text-primary transition-opacity duration-200">List</span>
        </>
      ) : (
        <>
          <Map className="w-4 h-4 text-primary transition-transform group-hover:scale-110 flex-shrink-0" />
          <span className="text-xs font-medium text-muted-foreground transition-opacity duration-200">Map</span>
        </>
      )}
    </motion.button>
  );
}