/**
 * FilterSheet Types
 * Tipos específicos para el componente FilterSheet
 */

import type { FilterOptions } from "../filters";

export interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyFilters?: (filters: FilterOptions) => void;
  currentFilters?: FilterOptions;
  onResetFilters?: () => void; // New: callback when filters are reset
  searchQuery?: string; // New: current search query from header
  onSaveSearch?: (filters: FilterOptions) => void; // New: callback to save search
}

export interface FilterSheetHeaderProps {
  onClose: () => void;
}

export interface FilterSheetContentProps {
  filters: FilterOptions;
  openSections: OpenSections;
  onToggleSection: (section: keyof OpenSections) => void;
  onUpdateFilters: (filters: FilterOptions) => void;
}

export interface OpenSections {
  sortBy: boolean;
  type: boolean;
  offerMode: boolean;
  groups: boolean;
  tags: boolean;
  category: boolean;
  condition: boolean;
  location: boolean;
  seller: boolean;
  delivery: boolean;
  contact: boolean;
  price: boolean;
  advanced: boolean;
}