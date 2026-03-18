import { Shield, UserCog, User } from "lucide-react";
import { FilterSection } from "../../filters/FilterSection";
import { FilterCheckboxGroup, type CheckboxOption } from "../../filters/shared";

type MemberRole = "admin" | "moderator" | "member";

interface MemberRoleSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedRoles: Set<MemberRole>;
  onRoleChange: (role: MemberRole) => void;
}

const roleOptions: CheckboxOption[] = [
  { value: "admin", label: "Admin", icon: Shield },
  { value: "moderator", label: "Moderator", icon: UserCog },
  { value: "member", label: "Member", icon: User },
];

export function MemberRoleSection({
  isOpen,
  onToggle,
  selectedRoles,
  onRoleChange,
}: MemberRoleSectionProps) {
  const selectedLabel = selectedRoles.size === 0 
    ? "All roles" 
    : selectedRoles.size === roleOptions.length
      ? "All roles"
      : selectedRoles.size === 1 
        ? roleOptions.find(opt => selectedRoles.has(opt.value as MemberRole))?.label
        : `${selectedRoles.size} selected`;

  return (
    <FilterSection
      title="Member Role"
      icon={Shield}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <FilterCheckboxGroup
        options={roleOptions}
        selectedValues={selectedRoles as Set<string>}
        onToggle={(value) => onRoleChange(value as MemberRole)}
      />
    </FilterSection>
  );
}