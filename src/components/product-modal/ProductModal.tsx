/**
 * Product Modal (Refactored)
 * Quick preview dialog for products
 */

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { ModalImage } from './ModalImage';
import { ModalHeader } from './ModalHeader';
import { ModalPrice } from './ModalPrice';
import { ModalInfoGrid } from './ModalInfoGrid';
import { ModalDescription } from './ModalDescription';
import { ModalActions } from './ModalActions';
import { getModalDescription } from './modalUtils';
import type { Product } from '../../data/products';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  productImage: string;
  onNavigateToGroup?: (groupId: string, groupName: string) => void;
}

export function ProductModal({
  product,
  isOpen,
  onClose,
  productImage,
  onNavigateToGroup,
}: ProductModalProps) {
  if (!product) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[90%] md:max-w-md p-0 overflow-hidden rounded-3xl">
        {/* SR-only header for accessibility */}
        <DialogHeader className="sr-only">
          <DialogTitle>{product?.title || "Product Details"}</DialogTitle>
          <DialogDescription>{getModalDescription(product)}</DialogDescription>
        </DialogHeader>

        {/* Image with close button and category type badge */}
        <ModalImage 
          product={product} 
          productImage={productImage} 
          onClose={onClose} 
        />

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Title */}
          <ModalHeader product={product} />

          {/* Price, Type & Condition Badges */}
          <ModalPrice product={product} />

          {/* Info Grid (Visibility + Location) */}
          <ModalInfoGrid 
            product={product}
            onGroupClick={(groupId, groupName) => {
              onNavigateToGroup?.(groupId, groupName);
              onClose(); // Close modal after navigation
            }}
          />

          {/* Description */}
          <ModalDescription product={product} />

          {/* Action Buttons */}
          <ModalActions />
        </div>
      </DialogContent>
    </Dialog>
  );
}