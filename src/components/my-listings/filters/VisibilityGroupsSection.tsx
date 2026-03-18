import { Eye, Globe, Users } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, FilterRadioGroup, type CheckboxOption, type RadioOption } from "../../filters/shared";
import type { ListingVisibility, Group } from "../../../types";

interface VisibilityGroupsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedVisibilities: Set<ListingVisibility>;
  onVisibilityChange: (visibility: ListingVisibility) => void;
  groupsScope: "all" | "public" | "my-groups" | "specific";
  selectedGroups: Set<string>;
  groups: Group[];
  onGroupsScopeChange: (scope: "all" | "public" | "my-groups" | "specific") => void;
  onGroupToggle: (groupId: string) => void;
}

// MVP-ALIGNED: Only show Public and Groups Only
const visibilityOptions: CheckboxOption[] = [
  { value: "public", label: "Public", icon: Globe },
  { value: "groups", label: "Groups Only", icon: Users },
];

const groupsScopeOptions: RadioOption[] = [
  { value: "all", label: "All Groups" },
  { value: "public", label: "Public Only" },
  { value: "my-groups", label: "My Groups Only" },
  { value: "specific", label: "Specific Groups" },
];

export function VisibilityGroupsSection({
  isOpen,
  onToggle,
  selectedVisibilities,
  onVisibilityChange,
  groupsScope,
  selectedGroups,
  groups,
  onGroupsScopeChange,
  onGroupToggle,
}: VisibilityGroupsSectionProps) {
  const visCount = selectedVisibilities.size;
  const groupsCount = groupsScope === "specific" ? selectedGroups.size : 0;
  
  let selectedLabel = "";
  if (visCount === 0 && groupsScope === "all") {
    selectedLabel = "All Visibility";
  } else {
    const parts: string[] = [];
    if (visCount > 0) {
      parts.push(visCount === 1 
        ? visibilityOptions.find(opt => selectedVisibilities.has(opt.value as ListingVisibility))?.label || ""
        : `${visCount} visibility`
      );
    }
    if (groupsScope !== "all") {
      parts.push(groupsScope === "specific" && groupsCount > 0 
        ? `${groupsCount} group${groupsCount > 1 ? 's' : ''}`
        : groupsScope
      );
    }
    selectedLabel = parts.filter(Boolean).join(" • ");
  }

  return (
    <FilterSection
      title="Visibility & Groups"
      icon={Eye}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      <div className="space-y-5">
        {/* Visibility Options */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Visibility</h4>
          <FilterCheckboxGroup
            options={visibilityOptions}
            selectedValues={selectedVisibilities as Set<string>}
            onToggle={(value) => onVisibilityChange(value as ListingVisibility)}
          />
        </div>

        {/* Groups Filter */}
        <div className="space-y-3 pt-3 border-t">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Groups</h4>
          <FilterRadioGroup
            options={groupsScopeOptions}
            selectedValue={groupsScope}
            onValueChange={(val) => onGroupsScopeChange(val as any)}
            namePrefix="groups"
          />

          {/* Specific Groups Selection */}
          {groupsScope === "specific" && groups.length > 0 && (
            <div className="space-y-2 pl-6 pt-2">
              {groups.map((group) => (
                <label 
                  key={group.id} 
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
                >
                  <Checkbox
                    checked={selectedGroups.has(group.id)}
                    onCheckedChange={() => onGroupToggle(group.id)}
                  />
                  <span className="text-sm">{group.name}</span>
                  <span className="text-xs text-muted-foreground ml-auto">{group.memberCount}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </FilterSection>
  );
}