import { Tag } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

interface GroupTag {
  id: string;
  name: string;
}

interface TagsSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedTags: Set<string>;
  tags: GroupTag[];
  onTagToggle: (tagId: string) => void;
}

export function TagsSection({
  isOpen,
  onToggle,
  selectedTags,
  tags,
  onTagToggle,
}: TagsSectionProps) {
  const selectedLabel = selectedTags.size === 0
    ? "No tags selected"
    : selectedTags.size === 1
      ? tags.find(t => selectedTags.has(t.id))?.name || "1 tag"
      : `${selectedTags.size} tags`;

  return (
    <FilterSection
      title="Tags"
      icon={Tag}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-2">
        {tags.length === 0 ? (
          <p className="text-sm text-muted-foreground py-2">No tags available</p>
        ) : (
          <div className="space-y-1 max-h-[250px] overflow-y-auto">
            {tags.map((tag) => (
              <label 
                key={tag.id}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
              >
                <Checkbox
                  checked={selectedTags.has(tag.id)}
                  onCheckedChange={() => onTagToggle(tag.id)}
                />
                <span className="text-sm">{tag.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </FilterSection>
  );
}
