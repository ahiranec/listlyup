import { Filter, X } from "lucide-react";
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
  return (
    <div className="sticky top-[56px] z-10 bg-background border-b flex-shrink-0">
      {/* Filter Button Row */}
      <div className="px-4 py-3 flex items-center gap-3">
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilterSheet}
          className="flex-shrink-0 gap-2 h-9"
        >
          <Filter className="w-4 h-4" />
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="h-5 min-w-[20px] px-1.5 ml-1">
              {activeFilterCount}
            </Badge>
          )}
        </Button>

        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearAllFilters}
            className="flex-shrink-0 text-muted-foreground h-9"
          >
            Clear all
          </Button>
        )}
      </div>

      {/* Active Filter Chips */}
      {filterChips.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {filterChips.map((chip) => (
            <Badge
              key={chip.key}
              variant="secondary"
              className="h-7 px-2.5 gap-1.5 cursor-pointer hover:bg-secondary/80"
              onClick={chip.onRemove}
            >
              <span className="text-xs">{chip.label}</span>
              <X className="w-3 h-3" />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
