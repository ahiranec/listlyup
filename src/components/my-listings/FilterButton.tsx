import { SlidersHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { FilterChip } from "./types";

interface FilterButtonProps {
  activeFilterCount: number;
  filterChips: FilterChip[];
  onOpenFilterSheet: () => void;
  onClearAllFilters: () => void;
}

export function FilterButton({
  activeFilterCount,
  filterChips,
  onOpenFilterSheet,
  onClearAllFilters,
}: FilterButtonProps) {
  if (activeFilterCount === 0 && filterChips.length === 0) {
    return (
      <div className="px-4 pb-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilterSheet}
          className="h-7 text-xs"
        >
          <SlidersHorizontal className="w-3 h-3 mr-1" />
          Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 pb-3 flex items-center gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={onOpenFilterSheet}
        className="h-7 text-xs"
      >
        <SlidersHorizontal className="w-3 h-3 mr-1" />
        Filters
        {activeFilterCount > 0 && (
          <Badge variant="secondary" className="ml-1.5 h-4 min-w-[16px] px-1 text-[10px]">
            {activeFilterCount}
          </Badge>
        )}
      </Button>

      {/* Filter Chips */}
      {filterChips.map((chip) => (
        <Badge
          key={chip.key}
          variant="secondary"
          className="h-7 px-2 gap-1 text-xs"
        >
          {chip.label}
          <button
            onClick={chip.onRemove}
            className="hover:bg-muted rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </Badge>
      ))}

      {filterChips.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAllFilters}
          className="h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}
