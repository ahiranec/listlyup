import { Bell, MessageCircle, Flag, Clock } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

interface AlertsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  hasMessages: boolean;
  isReported: boolean;
  isExpiringSoon: boolean;
  onHasMessagesChange: (value: boolean) => void;
  onIsReportedChange: (value: boolean) => void;
  onIsExpiringSoonChange: (value: boolean) => void;
}

const alertOptions: CheckboxOption[] = [
  { value: "hasMessages", label: "Has Messages", icon: MessageCircle },
  { value: "isReported", label: "Reported", icon: Flag },
  { value: "isExpiringSoon", label: "Expiring Soon", icon: Clock },
];

export function AlertsSection({
  isOpen,
  onToggle,
  hasMessages,
  isReported,
  isExpiringSoon,
  onHasMessagesChange,
  onIsReportedChange,
  onIsExpiringSoonChange,
}: AlertsSectionProps) {
  const activeCount = [hasMessages, isReported, isExpiringSoon].filter(Boolean).length;
  const selectedLabel = activeCount === 0 
    ? "No alerts selected" 
    : `${activeCount} alert${activeCount > 1 ? 's' : ''}`;

  // Convert boolean flags to Set for FilterCheckboxGroup
  const selectedValues = new Set<string>();
  if (hasMessages) selectedValues.add("hasMessages");
  if (isReported) selectedValues.add("isReported");
  if (isExpiringSoon) selectedValues.add("isExpiringSoon");

  const handleToggle = (value: string) => {
    switch (value) {
      case "hasMessages":
        onHasMessagesChange(!hasMessages);
        break;
      case "isReported":
        onIsReportedChange(!isReported);
        break;
      case "isExpiringSoon":
        onIsExpiringSoonChange(!isExpiringSoon);
        break;
    }
  };

  return (
    <FilterSection
      title="Alerts"
      icon={Bell}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      <FilterCheckboxGroup
        options={alertOptions}
        selectedValues={selectedValues}
        onToggle={handleToggle}
      />
    </FilterSection>
  );
}