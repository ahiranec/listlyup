/**
 * Modal Image Component
 * Product image with gradient overlay and close button
 */

import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { CategoryTypeBadge } from '../product-card/CategoryTypeBadge';
import type { Product } from '../../data/products';

interface ModalImageProps {
  product: Product;
  productImage: string;
  onClose: () => void;
}

export function ModalImage({ product, productImage, onClose }: ModalImageProps) {
  return (
    <div className="relative h-72 bg-muted">
      <img
        src={productImage}
        alt={product.title}
        className="w-full h-full object-cover"
      />
      
      {/* Overlay gradiente */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      
      {/* Close button */}
      <motion.button
        onClick={onClose}
        className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-md rounded-full hover:bg-white transition-all shadow-lg"
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.9 }}
      >
        <X className="w-5 h-5" />
      </motion.button>

      {/* Category Type Badge */}
      <div className="absolute top-4 left-4">
        <CategoryTypeBadge type={product.type} />
      </div>
    </div>
  );
}