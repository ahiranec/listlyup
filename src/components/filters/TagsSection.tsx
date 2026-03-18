import { useState } from "react";
import { Hash, X } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { FilterSection } from "./FilterSection";
import type { FilterOptions } from "./types";

interface TagsSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function TagsSection({ filters, isOpen, onToggle, onUpdate }: TagsSectionProps) {
  const [includeTagInput, setIncludeTagInput] = useState("");
  const [excludeTagInput, setExcludeTagInput] = useState("");

  const getSelectedLabel = () => {
    const parts = [];
    if (filters.includeTags.length > 0) parts.push(`+${filters.includeTags.length}`);
    if (filters.excludeTags.length > 0) parts.push(`-${filters.excludeTags.length}`);
    return parts.length > 0 ? parts.join(" ") : "None";
  };

  const addIncludeTag = () => {
    if (includeTagInput.trim() && !filters.includeTags.includes(includeTagInput.trim())) {
      onUpdate({ ...filters, includeTags: [...filters.includeTags, includeTagInput.trim()] });
      setIncludeTagInput("");
    }
  };

  const addExcludeTag = () => {
    if (excludeTagInput.trim() && !filters.excludeTags.includes(excludeTagInput.trim())) {
      onUpdate({ ...filters, excludeTags: [...filters.excludeTags, excludeTagInput.trim()] });
      setExcludeTagInput("");
    }
  };

  const removeIncludeTag = (tag: string) => {
    onUpdate({ ...filters, includeTags: filters.includeTags.filter(t => t !== tag) });
  };

  const removeExcludeTag = (tag: string) => {
    onUpdate({ ...filters, excludeTags: filters.excludeTags.filter(t => t !== tag) });
  };

  return (
    <FilterSection
      title="Tags / Hashtags"
      icon={Hash}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.2}
    >
      <div className="space-y-4">
        {/* Include Tags */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Include Tags:</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag..."
              value={includeTagInput}
              onChange={(e) => setIncludeTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIncludeTag()}
              className="flex-1 text-xs"
            />
            <button
              onClick={addIncludeTag}
              className="px-3 py-2 bg-primary text-white rounded-lg text-xs hover:bg-primary/90"
            >
              Add
            </button>
          </div>
          {filters.includeTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.includeTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1">
                  #{tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeIncludeTag(tag)} />
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Exclude Tags */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Exclude Tags:</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Add tag to exclude..."
              value={excludeTagInput}
              onChange={(e) => setExcludeTagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addExcludeTag()}
              className="flex-1 text-xs"
            />
            <button
              onClick={addExcludeTag}
              className="px-3 py-2 bg-destructive text-white rounded-lg text-xs hover:bg-destructive/90"
            >
              Add
            </button>
          </div>
          {filters.excludeTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {filters.excludeTags.map((tag) => (
                <Badge key={tag} variant="destructive" className="gap-1">
                  #{tag}
                  <X className="w-3 h-3 cursor-pointer" onClick={() => removeExcludeTag(tag)} />
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>
    </FilterSection>
  );
}
