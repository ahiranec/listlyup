/**
 * Trail Action Menu
 * Wrapper for ActionMenu with Trail-specific actions
 */

import { Eye, RotateCcw, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { useGlobalActionModal } from '../global-action-modal';
import type { TrailListing } from './types';

interface TrailActionMenuProps {
  listing: TrailListing;
  onNavigateToDetail?: (listingId: string) => void;
  onRepublish?: (listingId: string) => void;
  onDelete?: (listingId: string) => void;
  onActionComplete?: () => void;
}

export function TrailActionMenu({
  listing,
  onNavigateToDetail,
  onRepublish,
  onDelete,
  onActionComplete,
}: TrailActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useGlobalActionModal();

  const handleView = () => {
    setIsOpen(false);
    if (onNavigateToDetail) {
      onNavigateToDetail(listing.id);
    }
  };

  const handleRepublish = () => {
    setIsOpen(false);
    if (onRepublish) {
      onRepublish(listing.id);
    }
    onActionComplete?.();
  };

  const handleDelete = () => {
    setIsOpen(false);
    
    // Show confirmation dialog via GAM
    dispatch({
      actionId: 'delete-listing' as any,
      context: {
        listingId: listing.id,
        listingTitle: listing.title,
      },
      onConfirm: () => {
        if (onDelete) {
          onDelete(listing.id);
        }
        onActionComplete?.();
      },
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {/* View */}
        <DropdownMenuItem onClick={handleView}>
          <Eye className="w-4 h-4 mr-2" />
          View
        </DropdownMenuItem>

        {/* Re-publish */}
        <DropdownMenuItem onClick={handleRepublish}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Re-publish
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Delete */}
        <DropdownMenuItem 
          onClick={handleDelete}
          className="text-red-600 focus:text-red-600"
        >
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
