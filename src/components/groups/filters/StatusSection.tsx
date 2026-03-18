import { CheckCircle2, Pause, Archive, Trash2 } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

type GroupStatus = "active" | "suspended" | "archived" | "deleted";

interface StatusSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedStatuses: Set<GroupStatus>;
  onStatusChange: (status: GroupStatus) => void;
}

const statusOptions = [
  { value: "active" as const, label: "Active", icon: CheckCircle2 },
  { value: "suspended" as const, label: "Suspended", icon: Pause },
  { value: "archived" as const, label: "Archived", icon: Archive },
  { value: "deleted" as const, label: "Deleted", icon: Trash2 },
];

export function StatusSection({ 
  isOpen, 
  onToggle, 
  selectedStatuses, 
  onStatusChange 
}: StatusSectionProps) {
  const selectedLabel = selectedStatuses.size === 0 
    ? "All status" 
    : selectedStatuses.size === statusOptions.length
      ? "All status"
      : selectedStatuses.size === 1 
        ? statusOptions.find(opt => selectedStatuses.has(opt.value))?.label
        : `${selectedStatuses.size} selected`;

  return (
    <FilterSection
      title="Status"
      icon={CheckCircle2}
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
