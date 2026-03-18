/**
 * Modal Actions Component
 * Contact and share action buttons
 */

import { MessageCircle, Share2 } from 'lucide-react';
import { motion } from 'motion/react';

export function ModalActions() {
  return (
    <div className="flex gap-3 pt-2">
      {/* Contact Button */}
      <motion.button 
        className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-primary/30 transition-all"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <MessageCircle className="w-4 h-4" />
        Contact Seller
      </motion.button>
      
      {/* Share Button */}
      <motion.button 
        className="p-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 className="w-5 h-5 text-foreground" />
      </motion.button>
    </div>
  );
}
