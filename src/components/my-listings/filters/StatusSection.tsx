import { useCallback } from "react";
import { CheckCircle2, Pause, AlertTriangle, XCircle } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";
import type { ListingLifecycle } from "../../../types";

interface StatusSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedStatuses: Set<ListingLifecycle>;
  onStatusChange: (status: ListingLifecycle) => void;
}

// MVP-ALIGNED: Only show Active, Paused, Expiring Soon, Expired
const statusOptions: CheckboxOption[] = [
  { value: "active", label: "Active", icon: CheckCircle2 },
  { value: "paused", label: "Paused", icon: Pause },
  { value: "expiring_soon", label: "Expiring Soon", icon: AlertTriangle },
  { value: "expired", label: "Expired", icon: XCircle },
];

export function StatusSection({ 
  isOpen, 
  onToggle, 
  selectedStatuses, 
  onStatusChange 
}: StatusSectionProps) {
  const selectedLabel = selectedStatuses.size === 0 
    ? "All Status" 
    : selectedStatuses.size === 1 
      ? statusOptions.find(opt => selectedStatuses.has(opt.value as ListingLifecycle))?.label
      : `${selectedStatuses.size} selected`;

  const handleToggle = useCallback(
    (value: string) => onStatusChange(value as ListingLifecycle),
    [onStatusChange]
  );

  return (
    <FilterSection
      title="Status"
      icon={CheckCircle2}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      <FilterCheckboxGroup
        options={statusOptions}
        selectedValues={selectedStatuses as Set<string>}
        onToggle={handleToggle}
      />
    </FilterSection>
  );
}