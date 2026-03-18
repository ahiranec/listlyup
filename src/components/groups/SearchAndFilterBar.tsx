import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { SlidersHorizontal } from "lucide-react";

interface SearchAndFilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeFilterCount: number;
  onOpenFilterSheet: () => void;
}

export function SearchAndFilterBar({
  searchQuery,
  onSearchChange,
  activeFilterCount,
  onOpenFilterSheet,
}: SearchAndFilterBarProps) {
  return (
    <div className="px-4 py-3 bg-background border-b sticky z-10 flex-shrink-0" style={{ top: '145px' }}>
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <Input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9 h-10"
          />
        </div>

        {/* Filter Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenFilterSheet}
          className="h-10 px-3 gap-2 flex-shrink-0 relative"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="hidden sm:inline">Filters</span>
          {activeFilterCount > 0 && (
            <Badge
              variant="default"
              className="absolute -top-2 -right-2 h-5 min-w-5 flex items-center justify-center p-0 px-1.5 text-xs"
            >
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </div>
    </div>
  );
}