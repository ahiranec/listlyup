import { Percent, TrendingDown, TrendingUp } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

interface ExtrasSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  hasDiscount: boolean;
  lowViews: boolean;
  highViews: boolean;
  onHasDiscountChange: (value: boolean) => void;
  onLowViewsChange: (value: boolean) => void;
  onHighViewsChange: (value: boolean) => void;
}

const extraOptions: CheckboxOption[] = [
  { value: "hasDiscount", label: "Has Discount", icon: Percent },
  { value: "lowViews", label: "Low Views", icon: TrendingDown },
  { value: "highViews", label: "High Views", icon: TrendingUp },
];

export function ExtrasSection({
  isOpen,
  onToggle,
  hasDiscount,
  lowViews,
  highViews,
  onHasDiscountChange,
  onLowViewsChange,
  onHighViewsChange,
}: ExtrasSectionProps) {
  const activeCount = [hasDiscount, lowViews, highViews].filter(Boolean).length;
  const selectedLabel = activeCount === 0 
    ? "No extras selected" 
    : `${activeCount} extra${activeCount > 1 ? 's' : ''}`;

  // Convert boolean flags to Set for FilterCheckboxGroup
  const selectedValues = new Set<string>();
  if (hasDiscount) selectedValues.add("hasDiscount");
  if (lowViews) selectedValues.add("lowViews");
  if (highViews) selectedValues.add("highViews");

  const handleToggle = (value: string) => {
    switch (value) {
      case "hasDiscount":
        onHasDiscountChange(!hasDiscount);
        break;
      case "lowViews":
        onLowViewsChange(!lowViews);
        break;
      case "highViews":
        onHighViewsChange(!highViews);
        break;
    }
  };

  return (
    <FilterSection
      title="Extras"
      icon={Percent}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      <FilterCheckboxGroup
        options={extraOptions}
        selectedValues={selectedValues}
        onToggle={handleToggle}
      />
    </FilterSection>
  );
}