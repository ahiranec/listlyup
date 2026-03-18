import { Truck } from "lucide-react";
import { FilterSection } from "./FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "./shared";
import type { FilterOptions } from "./types";

// Access mode options with icons (CANONICAL)
const accessModeOptions = [
  { value: "pickup", label: "Pickup", emoji: "🏪" },
  { value: "meetup", label: "Meetup", emoji: "🤝" },
  { value: "delivery", label: "Delivery", emoji: "🚚" },
  { value: "virtual", label: "Virtual", emoji: "💻" },
];

interface AccessModeSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function AccessModeSection({ filters, isOpen, onToggle, onUpdate }: AccessModeSectionProps) {
  const getSelectedLabel = () => {
    return filters.access_mode.length > 0 ? `${filters.access_mode.length} modes` : "All";
  };

  const toggleAccessMode = (mode: string) => {
    if (filters.access_mode.includes(mode as any)) {
      onUpdate({ ...filters, access_mode: filters.access_mode.filter(m => m !== mode) });
    } else {
      onUpdate({ ...filters, access_mode: [...filters.access_mode, mode as any] });
    }
  };

  // Convert to CheckboxOption
  const checkboxOptions: CheckboxOption[] = accessModeOptions.map(mode => ({
    value: mode.value,
    label: mode.label,
    emoji: mode.emoji,
  }));

  return (
    <FilterSection
      title="Access Mode"
      icon={Truck}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.45}
    >
      <FilterCheckboxGroup
        options={checkboxOptions}
        selectedValues={new Set(filters.access_mode)}
        onToggle={toggleAccessMode}
      />
    </FilterSection>
  );
}
