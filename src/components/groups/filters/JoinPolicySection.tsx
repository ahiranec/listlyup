import { DoorOpen, UserCheck, ShieldCheck, Lock } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

type JoinPolicy = "open" | "request" | "approval_required" | "closed";

interface JoinPolicySectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedPolicies: Set<JoinPolicy>;
  onPolicyChange: (policy: JoinPolicy) => void;
}

const policyOptions: CheckboxOption[] = [
  { value: "open", label: "Open", icon: DoorOpen },
  { value: "request", label: "Request", icon: UserCheck },
  { value: "approval_required", label: "Approval Required", icon: ShieldCheck },
  { value: "closed", label: "Closed", icon: Lock },
];

export function JoinPolicySection({
  isOpen,
  onToggle,
  selectedPolicies,
  onPolicyChange,
}: JoinPolicySectionProps) {
  const selectedLabel = selectedPolicies.size === 0 
    ? "All policies" 
    : selectedPolicies.size === policyOptions.length
      ? "All policies"
      : selectedPolicies.size === 1 
        ? policyOptions.find(opt => selectedPolicies.has(opt.value as JoinPolicy))?.label
        : `${selectedPolicies.size} selected`;

  return (
    <FilterSection
      title="Join Policy"
      icon={DoorOpen}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <FilterCheckboxGroup
        options={policyOptions}
        selectedValues={selectedPolicies as Set<string>}
        onToggle={(value) => onPolicyChange(value as JoinPolicy)}
      />
    </FilterSection>
  );
}