import { Users } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FilterSection } from "./FilterSection";
import { groupScopeOptions, mockGroups } from "./constants";
import type { FilterOptions } from "./types";

interface GroupsSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function GroupsSection({ filters, isOpen, onToggle, onUpdate }: GroupsSectionProps) {
  const getSelectedLabel = () => {
    const base = groupScopeOptions.find(opt => opt.value === filters.groupsScope)?.label || "All";
    if (filters.groupsScope === "specific" && filters.specificGroups.length > 0) {
      return `${filters.specificGroups.length} selected`;
    }
    return base;
  };

  const toggleSpecificGroup = (group: string) => {
    if (filters.specificGroups.includes(group)) {
      onUpdate({ ...filters, specificGroups: filters.specificGroups.filter(g => g !== group) });
    } else {
      onUpdate({ ...filters, specificGroups: [...filters.specificGroups, group] });
    }
  };

  return (
    <FilterSection
      title="Groups"
      icon={Users}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.15}
    >
      <RadioGroup 
        value={filters.groupsScope} 
        onValueChange={(value) => onUpdate({ ...filters, groupsScope: value as any })}
      >
        {groupScopeOptions.map((option) => (
          <div 
            key={option.value} 
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RadioGroupItem 
              value={option.value} 
              id={`groups-${option.value}`}
              className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
            />
            <label 
              htmlFor={`groups-${option.value}`}
              className="flex-1 cursor-pointer text-xs sm:text-sm font-medium text-foreground truncate"
            >
              {option.label}
            </label>
          </div>
        ))}
      </RadioGroup>

      {/* Specific Groups Multi-select */}
      {filters.groupsScope === "specific" && (
        <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
          <Label className="text-xs text-muted-foreground">Select Groups:</Label>
          {mockGroups.map((group) => (
            <div key={group.value} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50">
              <Checkbox
                id={`group-${group.value}`}
                checked={filters.specificGroups.includes(group.value)}
                onCheckedChange={() => toggleSpecificGroup(group.value)}
              />
              <label
                htmlFor={`group-${group.value}`}
                className="text-xs sm:text-sm cursor-pointer flex-1"
              >
                {group.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </FilterSection>
  );
}
