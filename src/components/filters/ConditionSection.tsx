import { useCallback } from "react";
import { Sparkles } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { FilterRadioGroup, type RadioOption } from "./shared";
import { conditionOptions } from "./constants";
import type { FilterOptions } from "./types";

interface ConditionSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

// Convert to RadioOption format
const radioOptions: RadioOption[] = conditionOptions.map(opt => ({
  value: opt.value,
  label: opt.label,
}));

export function ConditionSection({ filters, isOpen, onToggle, onUpdate }: ConditionSectionProps) {
  const getSelectedLabel = () => {
    return conditionOptions.find(opt => opt.value === filters.condition)?.label || "All Conditions";
  };

  const handleValueChange = useCallback(
    (value: string) => onUpdate({ ...filters, condition: value as any }),
    [filters, onUpdate]
  );

  return (
    <FilterSection
      title="Condition"
      icon={Sparkles}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.3}
    >
      <FilterRadioGroup
        options={radioOptions}
        selectedValue={filters.condition}
        onValueChange={handleValueChange}
        namePrefix="condition"
      />
    </FilterSection>
  );
}