import { FolderOpen } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

interface Category {
  id: string;
  name: string;
  subcategories?: Subcategory[];
}

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
}

interface CategorySectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedCategory: string | null;
  selectedSubcategories: Set<string>;
  categories: Category[];
  onCategoryChange: (categoryId: string | null) => void;
  onSubcategoryToggle: (subcategoryId: string) => void;
}

export function CategorySection({
  isOpen,
  onToggle,
  selectedCategory,
  selectedSubcategories,
  categories,
  onCategoryChange,
  onSubcategoryToggle,
}: CategorySectionProps) {
  const selectedCategoryObj = categories.find(c => c.id === selectedCategory);
  const subcategories = selectedCategoryObj?.subcategories || [];
  
  const selectedLabel = !selectedCategory && selectedSubcategories.size === 0
    ? "All categories"
    : selectedCategoryObj
      ? selectedSubcategories.size > 0
        ? `${selectedCategoryObj.name} • ${selectedSubcategories.size} subs`
        : selectedCategoryObj.name
      : "All categories";

  return (
    <FilterSection
      title="Category"
      icon={FolderOpen}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-4">
        {/* Category Selection */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Category</h4>
          <div className="space-y-1">
            <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
              <Checkbox
                checked={!selectedCategory}
                onCheckedChange={() => onCategoryChange(null)}
              />
              <span className="text-sm">All Categories</span>
            </label>
            {categories.map((category) => (
              <label 
                key={category.id}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
              >
                <Checkbox
                  checked={selectedCategory === category.id}
                  onCheckedChange={() => onCategoryChange(category.id)}
                />
                <span className="text-sm">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subcategory Selection */}
        {selectedCategory && subcategories.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Subcategory</h4>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {subcategories.map((subcategory) => (
                <label 
                  key={subcategory.id}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
                >
                  <Checkbox
                    checked={selectedSubcategories.has(subcategory.id)}
                    onCheckedChange={() => onSubcategoryToggle(subcategory.id)}
                  />
                  <span className="text-sm">{subcategory.name}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </FilterSection>
  );
}
