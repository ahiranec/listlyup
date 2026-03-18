import { ArrowUpDown } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { FilterRadioGroup, type RadioOption } from "./shared";
import { sortByOptions } from "./constants";
import type { FilterOptions } from "./types";

interface SortBySectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

// Convert to RadioOption format with icons
const radioOptions: RadioOption[] = sortByOptions.map(opt => ({
  value: opt.value,
  label: opt.label,
  icon: opt.icon,
}));

export function SortBySection({ filters, isOpen, onToggle, onUpdate }: SortBySectionProps) {
  const getSelectedLabel = () => {
    return sortByOptions.find(opt => opt.value === filters.sortBy)?.label || "Newest First";
  };

  return (
    <FilterSection
      title="Sort By"
      icon={ArrowUpDown}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.05}
      variant="primary"
    >
      <FilterRadioGroup
        options={radioOptions}
        selectedValue={filters.sortBy}
        onValueChange={(value) => onUpdate({ ...filters, sortBy: value as any })}
        namePrefix="sort"
      />
    </FilterSection>
  );
}