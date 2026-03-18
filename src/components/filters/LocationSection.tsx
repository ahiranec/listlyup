import { MapPin } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";
import { FilterSection } from "./FilterSection";
import { FilterRadioGroup, type RadioOption } from "./shared";
import type { FilterOptions } from "./types";

interface LocationSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

const locationModeOptions: RadioOption[] = [
  { value: "current", label: "Use Current Location" },
  { value: "map", label: "Select on Map" },
  { value: "city", label: "Enter City" },
];

export function LocationSection({ filters, isOpen, onToggle, onUpdate }: LocationSectionProps) {
  const getSelectedLabel = () => {
    const parts = [];
    if (filters.locationMode === "current") parts.push("Current");
    else if (filters.locationMode === "map") parts.push("Map");
    else if (filters.locationCity) parts.push(filters.locationCity);
    parts.push(`${filters.radius}km`);
    if (filters.includeShipping) parts.push("+Ship");
    return parts.join(", ");
  };

  return (
    <FilterSection
      title="Location"
      icon={MapPin}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.35}
    >
      <div className="space-y-4">
        {/* Location Mode */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Location Mode:</Label>
          <FilterRadioGroup
            options={locationModeOptions}
            selectedValue={filters.locationMode}
            onValueChange={(value) => onUpdate({ ...filters, locationMode: value as any })}
            namePrefix="location"
          />
        </div>

        {/* City Input - only show when city mode is selected */}
        {filters.locationMode === "city" && (
          <div>
            <Label className="text-xs text-muted-foreground mb-2 block">City Name:</Label>
            <Input
              placeholder="e.g., Valparaíso"
              value={filters.locationCity}
              onChange={(e) => onUpdate({ ...filters, locationCity: e.target.value })}
              className="text-xs"
            />
          </div>
        )}

        {/* Radius Slider */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">
            Radius: {filters.radius} km
          </Label>
          <Slider
            value={[filters.radius]}
            onValueChange={(value) => onUpdate({ ...filters, radius: value[0] })}
            min={1}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-muted-foreground">1 km</span>
            <span className="text-xs text-muted-foreground">100 km</span>
          </div>
        </div>

        {/* Include Shipping */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <Label htmlFor="include-shipping" className="text-xs cursor-pointer">
            Include items with shipping
          </Label>
          <Switch
            id="include-shipping"
            checked={filters.includeShipping}
            onCheckedChange={(checked) => onUpdate({ ...filters, includeShipping: checked })}
          />
        </div>

        {/* Privacy Pin */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <Label htmlFor="privacy-pin" className="text-xs cursor-pointer">
            Use privacy pin (approximate location)
          </Label>
          <Switch
            id="privacy-pin"
            checked={filters.privacyPin}
            onCheckedChange={(checked) => onUpdate({ ...filters, privacyPin: checked })}
          />
        </div>
      </div>
    </FilterSection>
  );
}