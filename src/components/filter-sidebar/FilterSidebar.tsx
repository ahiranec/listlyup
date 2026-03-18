/**
 * FilterSidebar Component
 * Desktop-only persistent filter panel for Home view
 * 
 * Reuses FilterSheetContent to maintain consistency with mobile filters
 * Only visible on desktop breakpoints (lg and above)
 */

import { FilterSheetContent } from "../filter-sheet/FilterSheetContent";
import { FilterFooter } from "../filters";
import type { FilterOptions } from "../filter-sheet";

interface FilterSidebarProps {
  filters: FilterOptions;
  openSections: Record<string, boolean>;
  onToggleSection: (section: string) => void;
  onUpdateFilters: (updates: Partial<FilterOptions>) => void;
  onReset: () => void;
  onApply: () => void;
  className?: string;
}

export function FilterSidebar({
  filters,
  openSections,
  onToggleSection,
  onUpdateFilters,
  onReset,
  onApply,
  className = "",
}: FilterSidebarProps) {
  return (
    <aside 
      className={`w-[280px] border-r border-border bg-background flex flex-col shrink-0 ${className}`}
    >
      {/* Header */}
      <div className="h-[52px] px-4 flex items-center border-b border-border shrink-0">
        <h2 className="font-semibold">Filters</h2>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-auto">
        <FilterSheetContent
          filters={filters}
          openSections={openSections}
          onToggleSection={onToggleSection}
          onUpdateFilters={onUpdateFilters}
        />
      </div>

      {/* Footer */}
      <div className="border-t border-border shrink-0">
        <FilterFooter
          onReset={onReset}
          onApply={onApply}
        />
      </div>
    </aside>
  );
}
