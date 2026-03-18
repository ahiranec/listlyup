/**
 * useFilterSheet Hook
 * Gestiona el estado y la lógica del FilterSheet
 */

import { useState, useEffect } from "react";
import { defaultFilters, type FilterOptions } from "../filters";
import type { OpenSections } from "./types";

export function useFilterSheet(currentFilters?: FilterOptions) {
  const [filters, setFilters] = useState<FilterOptions>(currentFilters || defaultFilters);

  // Sync with external filter changes
  useEffect(() => {
    if (currentFilters) {
      setFilters(currentFilters);
    }
  }, [currentFilters]);

  // Estado para controlar secciones colapsables
  const [openSections, setOpenSections] = useState<OpenSections>({
    sortBy: false,
    type: false,
    offerMode: false,
    groups: false,
    tags: false,
    category: false,
    condition: false,
    location: false,
    seller: false,
    delivery: false,
    contact: false,
    price: false,
    advanced: false,
  });

  // Auto-expand Groups section when groupsScope is "specific"
  useEffect(() => {
    if (currentFilters?.groupsScope === "specific") {
      setOpenSections(prev => ({ ...prev, groups: true }));
    }
  }, [currentFilters?.groupsScope]);

  const toggleSection = (section: keyof OpenSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
  };

  return {
    filters,
    setFilters,
    openSections,
    toggleSection,
    handleReset,
  };
}