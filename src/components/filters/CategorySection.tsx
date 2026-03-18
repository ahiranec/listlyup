import { FolderTree } from "lucide-react";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterSection } from "./FilterSection";
import { categories } from "./constants";
import type { FilterOptions } from "./types";

interface CategorySectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function CategorySection({ filters, isOpen, onToggle, onUpdate }: CategorySectionProps) {
  const getSelectedLabel = () => {
    if (filters.category === "all") return "All Categories";
    const cat = categories.find(c => c.value === filters.category);
    if (filters.subcategory !== "all") {
      return `${cat?.label} → ${filters.subcategory}`;
    }
    return cat?.label || "All Categories";
  };

  const getSubcategories = () => {
    const cat = categories.find(c => c.value === filters.category);
    return cat?.subcategories || [];
  };

  return (
    <FilterSection
      title="Category"
      icon={FolderTree}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.25}
    >
      <div className="space-y-3">
        {/* Main Category */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Main Category:</Label>
          <Select 
            value={filters.category} 
            onValueChange={(value) => onUpdate({ ...filters, category: value, subcategory: "all" })}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Subcategory - only show if category is selected */}
        {filters.category !== "all" && getSubcategories().length > 0 && (
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">Subcategory:</Label>
            <Select 
              value={filters.subcategory} 
              onValueChange={(value) => onUpdate({ ...filters, subcategory: value })}
            >
              <SelectTrigger className="w-full text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subcategories</SelectItem>
                {getSubcategories().map((sub) => (
                  <SelectItem key={sub} value={sub}>
                    {sub}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </FilterSection>
  );
}
