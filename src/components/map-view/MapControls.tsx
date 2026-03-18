/**
 * Map Controls Component
 * Zoom in/out buttons (Google Maps style)
 */

import { ZoomIn, ZoomOut } from 'lucide-react';
import { motion } from 'motion/react';

interface MapControlsProps {
  onZoomIn?: () => void;
  onZoomOut?: () => void;
}

export function MapControls({ onZoomIn, onZoomOut }: MapControlsProps) {
  return (
    <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onZoomIn}
        className="icon-button bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Zoom in"
      >
        <ZoomIn className="w-5 h-5 text-gray-700" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onZoomOut}
        className="icon-button bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
        aria-label="Zoom out"
      >
        <ZoomOut className="w-5 h-5 text-gray-700" />
      </motion.button>
    </div>
  );
}
