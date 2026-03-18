import { Users } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface MembersSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedMembers: Set<string>;
  members: Member[];
  onMemberToggle: (memberId: string) => void;
}

export function MembersSection({
  isOpen,
  onToggle,
  selectedMembers,
  members,
  onMemberToggle,
}: MembersSectionProps) {
  const selectedLabel = selectedMembers.size === 0
    ? "All members"
    : selectedMembers.size === 1
      ? members.find(m => selectedMembers.has(m.id))?.name || "1 member"
      : `${selectedMembers.size} members`;

  return (
    <FilterSection
      title="Members"
      icon={Users}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-2">
        {members.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">No members available</p>
        ) : (
          <div className="space-y-1 max-h-[250px] overflow-y-auto">
            {members.map((member) => (
              <label 
                key={member.id}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
              >
                <Checkbox
                  checked={selectedMembers.has(member.id)}
                  onCheckedChange={() => onMemberToggle(member.id)}
                />
                <span className="text-sm">{member.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </FilterSection>
  );
}
