import { UserCircle } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FilterSection } from "./FilterSection";
import { FilterRadioGroup, type RadioOption } from "./shared";
import type { FilterOptions } from "./types";

interface UserSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

const userTypeOptions: RadioOption[] = [
  { value: "all", label: "All Users" },
  { value: "individual", label: "Individuals" },
  { value: "store", label: "Organizations" },
];

export function UserSection({ filters, isOpen, onToggle, onUpdate }: UserSectionProps) {
  const getSelectedLabel = () => {
    const parts = [];
    if (filters.sellerType !== "all") {
      parts.push(filters.sellerType === "individual" ? "Individuals" : "Organizations");
    }
    if (filters.specificSeller) {
      parts.push(filters.specificSeller);
    }
    return parts.length > 0 ? parts.join(", ") : "All Users";
  };

  return (
    <FilterSection
      title="User"
      icon={UserCircle}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.4}
    >
      <div className="space-y-4">
        {/* User Type */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">User Type:</Label>
          <FilterRadioGroup
            options={userTypeOptions}
            selectedValue={filters.sellerType}
            onValueChange={(value) => onUpdate({ ...filters, sellerType: value as any })}
            namePrefix="user"
          />
        </div>

        {/* Specific User */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Specific User (optional):</Label>
          <Input
            placeholder="Enter username..."
            value={filters.specificSeller}
            onChange={(e) => onUpdate({ ...filters, specificSeller: e.target.value })}
            className="text-xs"
          />
        </div>
      </div>
    </FilterSection>
  );
}
