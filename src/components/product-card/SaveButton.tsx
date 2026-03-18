/**
 * Save Button Component
 * Animated heart button for saving products to favorites
 */

import { Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface SaveButtonProps {
  isSaved: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export function SaveButton({ isSaved, onClick }: SaveButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="p-2 bg-white/90 backdrop-blur-md rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={isSaved ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        <Heart 
          className={`w-4 h-4 transition-colors ${
            isSaved ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </motion.div>
    </motion.button>
  );
}
