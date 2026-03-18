/**
 * Product Card Hook
 * Manages save state and interactions with persistence
 */

import { useState, useEffect } from 'react';
import { isItemSaved, toggleSaveItem } from '../../utils/savedItems';
import { toast } from 'sonner@2.0.3';

interface UseProductCardProps {
  id: string;
  title: string;
  price?: string;
  image: string;
  location?: string;
  type?: string;
}

export function useProductCard(props?: UseProductCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  // Check if item is saved on mount
  useEffect(() => {
    if (props?.id) {
      setIsSaved(isItemSaved(props.id));
    }
  }, [props?.id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!props) {
      // Fallback for backwards compatibility
      setIsSaved(!isSaved);
      return;
    }

    // Toggle save with persistence
    const newSavedState = toggleSaveItem({
      id: props.id,
      title: props.title,
      price: props.price,
      image: props.image,
      location: props.location,
      type: props.type,
    });

    setIsSaved(newSavedState);

    // Show toast feedback
    if (newSavedState) {
      toast.success('Saved to your collection! 💾', {
        description: 'View in Favorites',
        duration: 2000,
      });
    } else {
      toast.info('Removed from favorites');
    }
  };

  return {
    isSaved,
    handleSaveClick,
  };
}