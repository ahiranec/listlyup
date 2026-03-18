import { X, Pause, Archive, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../ui/button";

interface BulkActionsToolbarProps {
  isVisible: boolean;
  selectedCount: number;
  onDeselectAll: () => void;
  onBulkPause: () => void;
  onBulkArchive: () => void;
  onBulkDelete: () => void;
}

export function BulkActionsToolbar({
  isVisible,
  selectedCount,
  onDeselectAll,
  onBulkPause,
  onBulkArchive,
  onBulkDelete,
}: BulkActionsToolbarProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-blue-50 border-t border-blue-200 overflow-hidden"
        >
          <div className="px-4 py-2 flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onDeselectAll}
              className="h-8 px-2"
            >
              <X className="w-4 h-4 mr-1" />
              <span className="text-xs">{selectedCount} selected</span>
            </Button>
            <div className="flex-1" />
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkPause}
              className="h-8 px-2"
            >
              <Pause className="w-3 h-3 mr-1" />
              <span className="text-xs">Pause</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkArchive}
              className="h-8 px-2"
            >
              <Archive className="w-3 h-3 mr-1" />
              <span className="text-xs">Archive</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onBulkDelete}
              className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-3 h-3 mr-1" />
              <span className="text-xs">Delete</span>
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
