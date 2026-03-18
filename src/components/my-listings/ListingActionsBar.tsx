/**
 * Listing Actions Bar Component
 * Horizontal action buttons for My Listings: Create, Select, Analytics
 * Matches SearchBar aesthetic from home page
 */

import { Plus, CheckSquare, TrendingUp } from "lucide-react";
import { Button } from "../ui/button";

interface ListingActionsBarProps {
  onCreateListing: () => void;
  onSelectMode: () => void;
  onAnalytics: () => void;
  isSelectionMode?: boolean;
}

export function ListingActionsBar({
  onCreateListing,
  onSelectMode,
  onAnalytics,
  isSelectionMode = false,
}: ListingActionsBarProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 px-4 py-3">
        {/* Create Listing Button */}
        <Button
          onClick={onCreateListing}
          variant="outline"
          className="flex-1 h-10 gap-2"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline text-xs">Create Listing</span>
          <span className="sm:hidden text-xs">Create</span>
        </Button>

        {/* Select Mode Button */}
        <Button
          onClick={onSelectMode}
          variant="outline"
          className={`flex-1 h-10 gap-2 ${
            isSelectionMode ? 'border-primary bg-primary/5' : ''
          }`}
        >
          <CheckSquare className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline text-xs">Select Items</span>
          <span className="sm:hidden text-xs">Select</span>
        </Button>

        {/* Analytics Button */}
        <Button
          onClick={onAnalytics}
          variant="outline"
          className="flex-1 h-10 gap-2"
        >
          <TrendingUp className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline text-xs">Analytics</span>
          <span className="sm:hidden text-xs">Stats</span>
        </Button>
      </div>
    </div>
  );
}
