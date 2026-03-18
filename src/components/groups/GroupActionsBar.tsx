/**
 * Group Actions Bar Component
 * Horizontal action buttons for My Groups: Create, Explore
 * Matches SearchBar aesthetic from home page
 */

import { Plus, Search } from "lucide-react";
import { Button } from "../ui/button";

interface GroupActionsBarProps {
  onCreateGroup: () => void;
  onExploreGroups: () => void;
  isAuthenticated?: boolean; // NEW: To intercept actions when not authenticated
  onAuthRequired?: (context: 'groups' | 'publish') => void; // NEW: Callback to trigger auth modal
}

export function GroupActionsBar({
  onCreateGroup,
  onExploreGroups,
  isAuthenticated = true, // Default to true if not provided
  onAuthRequired,
}: GroupActionsBarProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 px-4 py-3">
        {/* Create Group Button */}
        <Button
          onClick={isAuthenticated ? onCreateGroup : () => onAuthRequired?.('groups')}
          variant="outline"
          className="flex-1 h-10 gap-2"
        >
          <Plus className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline text-xs">Create Group</span>
          <span className="sm:hidden text-xs">Create</span>
        </Button>

        {/* Explore Groups Button */}
        <Button
          onClick={onExploreGroups}
          variant="outline"
          className="flex-1 h-10 gap-2"
        >
          <Search className="w-4 h-4 text-primary" />
          <span className="hidden sm:inline text-xs">Explore Groups</span>
          <span className="sm:hidden text-xs">Explore</span>
        </Button>
      </div>
    </div>
  );
}