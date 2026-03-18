/**
 * FilterSheet Component (REFACTORIZADO - ETAPA 13)
 * 
 * Componente principal del FilterSheet con arquitectura modular.
 * 
 * Estructura:
 * - FilterSheetHeader: Handle bar + título + botón cerrar
 * - FilterSheetContent: Container scrollable con 14 secciones de filtros
 * - FilterFooter: Botones de reset y apply
 * - useFilterSheet: Custom hook para estado y lógica
 * 
 * @example
 * ```tsx
 * <FilterSheet
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onApplyFilters={(filters) => console.log(filters)}
 *   currentFilters={currentFilters}
 * />
 * ```
 */

import { Sheet, SheetContent, SheetDescription, SheetTitle } from "../ui/sheet";
import { FilterFooter } from "../filters";
import { FilterSheetHeader } from "./FilterSheetHeader";
import { FilterSheetContent } from "./FilterSheetContent";
import { useFilterSheet } from "./useFilterSheet";
import type { FilterSheetProps } from "./types";

export function FilterSheet({ 
  isOpen, 
  onClose, 
  onApplyFilters, 
  currentFilters,
  onResetFilters,
  searchQuery = '',
  onSaveSearch,
}: FilterSheetProps) {
  const {
    filters,
    setFilters,
    openSections,
    toggleSection,
    handleReset,
  } = useFilterSheet(currentFilters);

  const handleApply = () => {
    onApplyFilters?.(filters);
    onClose();
  };

  const handleResetClick = () => {
    handleReset();
    onResetFilters?.(); // Call the callback to also clear filteredGroupId in App.tsx
  };
  
  const handleSaveSearch = () => {
    onSaveSearch?.(filters);
  };
  
  // Determine if search can be saved (has query or active filters)
  const canSaveSearch = searchQuery.trim().length > 0 || filters.locationCity.length > 0;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-3xl border-t border-gray-200/50 shadow-2xl">
        
        {/* Accessibility elements - hidden but required */}
        <SheetTitle className="sr-only">Filter Products</SheetTitle>
        <SheetDescription className="sr-only">
          Refine your product search with advanced filters
        </SheetDescription>

        <div className="flex flex-col h-full w-full overflow-hidden">
          {/* Header */}
          <FilterSheetHeader onClose={onClose} />

          {/* Content */}
          <FilterSheetContent
            filters={filters}
            openSections={openSections}
            onToggleSection={toggleSection}
            onUpdateFilters={setFilters}
          />

          {/* Footer */}
          <FilterFooter 
            onReset={handleResetClick} 
            onApply={handleApply} 
            onSaveSearch={handleSaveSearch} 
            canSaveSearch={canSaveSearch} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}