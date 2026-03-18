/**
 * Trail Header
 * Simple header for My Trail page (no tabs needed)
 */

import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

interface TrailHeaderProps {
  onBack: () => void;
  totalCount: number;
  filteredCount?: number;
}

export function TrailHeader({
  onBack,
  totalCount,
  filteredCount,
}: TrailHeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="flex items-center gap-3 px-4 py-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="flex-shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="font-semibold">My Trail</h1>
          <p className="text-xs text-muted-foreground">
            {filteredCount !== undefined && filteredCount !== totalCount
              ? `${filteredCount} of ${totalCount} listings`
              : `${totalCount} closed ${totalCount === 1 ? 'listing' : 'listings'}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
