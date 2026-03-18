/**
 * Map Labels Component
 * Location badge and satellite label
 */

import { motion } from 'motion/react';

interface MapLabelsProps {
  locationName?: string;
  mapType?: 'satellite' | 'map' | 'terrain';
}

export function MapLabels({ 
  locationName = 'Valparaíso - Zapallar',
  mapType = 'satellite'
}: MapLabelsProps) {
  return (
    <>
      {/* Info badge - superior */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-200"
      >
        <p className="text-sm font-medium text-foreground">
          {locationName}
        </p>
      </motion.div>

      {/* Map type label - estilo Google Maps */}
      <div className="absolute bottom-4 left-4 z-20 bg-white px-3 py-1.5 rounded-md shadow-md border border-gray-200">
        <p className="text-xs font-medium text-gray-700 capitalize">
          {mapType}
        </p>
      </div>
    </>
  );
}
