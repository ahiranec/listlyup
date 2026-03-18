import { Eye, Globe, UserPlus, EyeOff } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

type GroupVisibility = "public" | "discoverable" | "invite_only" | "hidden";

interface VisibilitySectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedVisibilities: Set<GroupVisibility>;
  onVisibilityChange: (visibility: GroupVisibility) => void;
}

const visibilityOptions: CheckboxOption[] = [
  { value: "public", label: "Public", icon: Globe },
  { value: "discoverable", label: "Discoverable", icon: Eye },
  { value: "invite_only", label: "Invite Only", icon: UserPlus },
  { value: "hidden", label: "Hidden", icon: EyeOff },
];

export function VisibilitySection({
  isOpen,
  onToggle,
  selectedVisibilities,
  onVisibilityChange,
}: VisibilitySectionProps) {
  const selectedLabel = selectedVisibilities.size === 0 
    ? "All visibility" 
    : selectedVisibilities.size === visibilityOptions.length
      ? "All visibility"
      : selectedVisibilities.size === 1 
        ? visibilityOptions.find(opt => selectedVisibilities.has(opt.value as GroupVisibility))?.label
        : `${selectedVisibilities.size} selected`;

  return (
    <FilterSection
      title="Visibility"
      icon={Eye}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <FilterCheckboxGroup
        options={visibilityOptions}
        selectedValues={selectedVisibilities as Set<string>}
        onToggle={(value) => onVisibilityChange(value as GroupVisibility)}
      />
    </FilterSection>
  );
}