import { useCallback } from "react";
import { ShoppingBag } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { FilterRadioGroup, type RadioOption } from "./shared";
import { typeOptions } from "./constants";
import type { FilterOptions } from "./types";
import { filterCompatibleOfferModes, hasIncompatibleOfferModes } from "./offerModeUtils";

interface TypeSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

// Convert to RadioOption format with icons
const radioOptions: RadioOption[] = typeOptions.map(opt => ({
  value: opt.value,
  label: opt.label,
  icon: opt.icon,
}));

export function TypeSection({ filters, isOpen, onToggle, onUpdate }: TypeSectionProps) {
  const getSelectedLabel = () => {
    return typeOptions.find(opt => opt.value === filters.type)?.label || "All Types";
  };

  const handleValueChange = useCallback(
    (value: string) => {
      const newType = value as FilterOptions["type"];
      
      // Limpiar offer modes incompatibles al cambiar de tipo
      const currentOfferModes = filters.offerModes || [];
      const cleanedOfferModes = filterCompatibleOfferModes(newType, currentOfferModes);
      
      // Solo actualizar offerModes si hay incompatibles
      if (hasIncompatibleOfferModes(newType, currentOfferModes)) {
        onUpdate({ ...filters, type: newType, offerModes: cleanedOfferModes });
      } else {
        onUpdate({ ...filters, type: newType });
      }
    },
    [filters, onUpdate]
  );

  return (
    <FilterSection
      title="Listing Type"
      icon={ShoppingBag}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.1}
    >
      <FilterRadioGroup
        options={radioOptions}
        selectedValue={filters.type}
        onValueChange={handleValueChange}
        namePrefix="type"
      />
    </FilterSection>
  );
}