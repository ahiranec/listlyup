import { ShoppingBag, Wrench, Sparkles, PartyPopper } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";
import type { ListingType } from "../../../types";

interface ListingTypeSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedTypes: Set<ListingType>;
  onTypeChange: (type: ListingType) => void;
}

const typeOptions: CheckboxOption[] = [
  { value: "product", label: "Product", icon: ShoppingBag },
  { value: "service", label: "Service", icon: Wrench },
  { value: "experience", label: "Experience", icon: Sparkles },
  { value: "event", label: "Event", icon: PartyPopper },
];

export function ListingTypeSection({
  isOpen,
  onToggle,
  selectedTypes,
  onTypeChange,
}: ListingTypeSectionProps) {
  const selectedLabel = selectedTypes.size === 0 
    ? "All Types" 
    : selectedTypes.size === 1 
      ? typeOptions.find(opt => selectedTypes.has(opt.value as ListingType))?.label
      : `${selectedTypes.size} selected`;

  return (
    <FilterSection
      title="Listing Type"
      icon={ShoppingBag}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      <FilterCheckboxGroup
        options={typeOptions}
        selectedValues={selectedTypes as Set<string>}
        onToggle={(value) => onTypeChange(value as ListingType)}
      />
    </FilterSection>
  );
}