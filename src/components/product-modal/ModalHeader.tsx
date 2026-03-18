/**
 * Modal Header Component
 * Title and screen reader description
 */

import { DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { getModalDescription } from './modalUtils';
import type { Product } from '../../data/products';

interface ModalHeaderProps {
  product: Product;
}

export function ModalHeader({ product }: ModalHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="text-2xl font-semibold leading-tight">
        {product.title}
      </DialogTitle>
      <DialogDescription className="sr-only">
        {getModalDescription(product)}
      </DialogDescription>
    </DialogHeader>
  );
}
