import { Users, Calendar, Building2, ShoppingBag } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

type GroupType = "general" | "event" | "community" | "marketplace";

interface GroupTypeSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedTypes: Set<GroupType>;
  onTypeChange: (type: GroupType) => void;
}

const typeOptions: CheckboxOption[] = [
  { value: "general", label: "General", icon: Users },
  { value: "event", label: "Event", icon: Calendar },
  { value: "community", label: "Community", icon: Building2 },
  { value: "marketplace", label: "Marketplace", icon: ShoppingBag },
];

export function GroupTypeSection({
  isOpen,
  onToggle,
  selectedTypes,
  onTypeChange,
}: GroupTypeSectionProps) {
  const selectedLabel = selectedTypes.size === 0 
    ? "All types" 
    : selectedTypes.size === typeOptions.length
      ? "All types"
      : selectedTypes.size === 1 
        ? typeOptions.find(opt => selectedTypes.has(opt.value as GroupType))?.label
        : `${selectedTypes.size} selected`;

  return (
    <FilterSection
      title="Group Type"
      icon={Users}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <FilterCheckboxGroup
        options={typeOptions}
        selectedValues={selectedTypes as Set<string>}
        onToggle={(value) => onTypeChange(value as GroupType)}
      />
    </FilterSection>
  );
}