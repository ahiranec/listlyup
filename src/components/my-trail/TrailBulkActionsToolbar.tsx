/**
 * Trail Bulk Actions Toolbar
 * Appears when multiple trail listings are selected
 * Provides batch operations: Delete Selected
 */

import { Trash2, X } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'motion/react';

interface TrailBulkActionsToolbarProps {
  selectedCount: number;
  onDeleteSelected: () => void;
  onClearSelection: () => void;
}

export function TrailBulkActionsToolbar({
  selectedCount,
  onDeleteSelected,
  onClearSelection,
}: TrailBulkActionsToolbarProps) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed bottom-20 left-0 right-0 z-40 max-w-[480px] mx-auto px-4"
    >
      <div className="bg-primary text-primary-foreground rounded-2xl shadow-2xl p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Selection Count */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClearSelection}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-5 h-5" />
            </button>
            <span className="font-medium">
              {selectedCount} {selectedCount === 1 ? 'listing' : 'listings'} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="destructive"
              size="sm"
              onClick={onDeleteSelected}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
