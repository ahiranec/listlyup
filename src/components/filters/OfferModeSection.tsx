import { DollarSign } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { FilterSection } from "./FilterSection";
import { offerModeOptions } from "./constants";
import type { FilterOptions } from "./types";
import { getValidOfferModes, type OfferMode } from "./offerModeUtils";

interface OfferModeSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function OfferModeSection({ filters, isOpen, onToggle, onUpdate }: OfferModeSectionProps) {
  // Obtener offer modes válidos según el listing type seleccionado
  const validOfferModes = getValidOfferModes(filters.type);
  
  // Filtrar opciones para mostrar solo las compatibles
  const visibleOptions = offerModeOptions.filter((option) =>
    validOfferModes.includes(option.value as OfferMode)
  );

  const getSelectedLabel = () => {
    const selectedCount = filters.offerModes?.length ?? 0;
    
    if (selectedCount === 0) {
      return "All Offers";
    } else if (selectedCount === 1) {
      const selectedMode = filters.offerModes[0];
      const option = offerModeOptions.find(opt => opt.value === selectedMode);
      return option?.label || "All Offers";
    } else if (selectedCount === visibleOptions.length) {
      return "All Offers";
    } else {
      return `${selectedCount} selected`;
    }
  };

  const handleToggleMode = (mode: "for_sale" | "for_trade" | "for_free" | "for_rent") => {
    const currentModes = filters.offerModes ?? [];
    const isSelected = currentModes.includes(mode);
    
    const newModes = isSelected
      ? currentModes.filter(m => m !== mode)
      : [...currentModes, mode];
    
    onUpdate({ ...filters, offerModes: newModes });
  };

  return (
    <FilterSection
      title="Offer Mode"
      icon={DollarSign}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.12}
    >
      <div className="space-y-1">
        {visibleOptions.map((option) => {
          const OptionIcon = option.icon;
          const isChecked = (filters.offerModes ?? []).includes(option.value);
          
          return (
            <div 
              key={option.value} 
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => handleToggleMode(option.value)}
            >
              <Checkbox 
                checked={isChecked}
                onCheckedChange={() => handleToggleMode(option.value)}
                id={`offer-mode-${option.value}`}
                className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
              />
              <label 
                htmlFor={`offer-mode-${option.value}`}
                className="flex-1 flex items-center justify-between cursor-pointer min-w-0"
              >
                <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                  {option.label}
                </span>
                {OptionIcon && <OptionIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />}
              </label>
            </div>
          );
        })}
      </div>
      
      {(filters.offerModes?.length ?? 0) > 0 && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onUpdate({ ...filters, offerModes: [] });
            }}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Clear selection
          </button>
        </div>
      )}
    </FilterSection>
  );
}