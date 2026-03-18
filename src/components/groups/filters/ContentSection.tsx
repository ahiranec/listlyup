import { Package, Wrench, Calendar, Sparkles } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { FilterSection } from "../../filters/FilterSection";

interface ContentSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  hasProducts: boolean;
  hasServices: boolean;
  hasEvents: boolean;
  hasExperiences: boolean;
  onHasProductsChange: (value: boolean) => void;
  onHasServicesChange: (value: boolean) => void;
  onHasEventsChange: (value: boolean) => void;
  onHasExperiencesChange: (value: boolean) => void;
}

export function ContentSection({
  isOpen,
  onToggle,
  hasProducts,
  hasServices,
  hasEvents,
  hasExperiences,
  onHasProductsChange,
  onHasServicesChange,
  onHasEventsChange,
  onHasExperiencesChange,
}: ContentSectionProps) {
  const activeCount = [hasProducts, hasServices, hasEvents, hasExperiences].filter(Boolean).length;
  const selectedLabel = activeCount === 0
    ? "All content"
    : `${activeCount} type${activeCount > 1 ? 's' : ''}`;

  return (
    <FilterSection
      title="Content"
      icon={Package}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-2">
        <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
          <Checkbox
            checked={hasProducts}
            onCheckedChange={(checked) => onHasProductsChange(!!checked)}
          />
          <Package className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Has Products</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
          <Checkbox
            checked={hasServices}
            onCheckedChange={(checked) => onHasServicesChange(!!checked)}
          />
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Has Services</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
          <Checkbox
            checked={hasEvents}
            onCheckedChange={(checked) => onHasEventsChange(!!checked)}
          />
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Has Events</span>
        </label>

        <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
          <Checkbox
            checked={hasExperiences}
            onCheckedChange={(checked) => onHasExperiencesChange(!!checked)}
          />
          <Sparkles className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm">Has Experiences</span>
        </label>
      </div>
    </FilterSection>
  );
}
