import { UserCheck, Clock, CheckCircle2, UserX } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

type MemberStatus = "invited" | "pending" | "joined" | "removed";

interface MemberStatusSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedStatuses: Set<MemberStatus>;
  onStatusChange: (status: MemberStatus) => void;
}

const statusOptions = [
  { value: "invited" as const, label: "Invited", icon: UserCheck },
  { value: "pending" as const, label: "Pending", icon: Clock },
  { value: "joined" as const, label: "Joined", icon: CheckCircle2 },
  { value: "removed" as const, label: "Removed", icon: UserX },
];

export function MemberStatusSection({
  isOpen,
  onToggle,
  selectedStatuses,
  onStatusChange,
}: MemberStatusSectionProps) {
  const selectedLabel = selectedStatuses.size === 0 
    ? "All statuses" 
    : selectedStatuses.size === statusOptions.length
      ? "All statuses"
      : selectedStatuses.size === 1 
        ? statusOptions.find(opt => selectedStatuses.has(opt.value))?.label
        : `${selectedStatuses.size} selected`;

  return (
    <FilterSection
      title="Member Status"
      icon={UserCheck}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-2">
        {statusOptions.map((option) => {
          const Icon = option.icon;
          return (
            <label 
              key={option.value} 
              className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
            >
              <Checkbox
                checked={selectedStatuses.has(option.value)}
                onCheckedChange={() => onStatusChange(option.value)}
              />
              <Icon className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{option.label}</span>
            </label>
          );
        })}
      </div>
    </FilterSection>
  );
}
