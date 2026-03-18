import { MapPin } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { Switch } from "../../ui/switch";
import { Label } from "../../ui/label";
import { FilterSection } from "../../filters/FilterSection";

interface Country {
  id: string;
  name: string;
  municipalities: Municipality[];
}

interface Municipality {
  id: string;
  name: string;
  countryId: string;
}

interface LocationSectionProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedCountry: string | null;
  selectedMunicipalities: Set<string>;
  includeNearby: boolean;
  countries: Country[];
  onCountryChange: (countryId: string | null) => void;
  onMunicipalityToggle: (municipalityId: string) => void;
  onIncludeNearbyChange: (value: boolean) => void;
}

export function LocationSection({
  isOpen,
  onToggle,
  selectedCountry,
  selectedMunicipalities,
  includeNearby,
  countries,
  onCountryChange,
  onMunicipalityToggle,
  onIncludeNearbyChange,
}: LocationSectionProps) {
  const selectedCountryObj = countries.find(c => c.id === selectedCountry);
  const municipalities = selectedCountryObj?.municipalities || [];
  
  const selectedLabel = !selectedCountry && selectedMunicipalities.size === 0
    ? "All locations"
    : selectedCountryObj
      ? selectedMunicipalities.size > 0
        ? `${selectedCountryObj.name} • ${selectedMunicipalities.size} cities`
        : selectedCountryObj.name
      : "All locations";

  return (
    <FilterSection
      title="Location"
      icon={MapPin}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={`· ${selectedLabel}`}
    >
      <div className="space-y-4">
        {/* Country Selection */}
        <div className="space-y-2">
          <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Country</h4>
          <div className="space-y-1">
            <label className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors">
              <Checkbox
                checked={!selectedCountry}
                onCheckedChange={() => onCountryChange(null)}
              />
              <span className="text-sm">All Countries</span>
            </label>
            {countries.map((country) => (
              <label 
                key={country.id}
                className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
              >
                <Checkbox
                  checked={selectedCountry === country.id}
                  onCheckedChange={() => onCountryChange(country.id)}
                />
                <span className="text-sm">{country.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Municipality Selection */}
        {selectedCountry && municipalities.length > 0 && (
          <div className="space-y-2 pt-2 border-t">
            <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Municipality</h4>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {municipalities.map((municipality) => (
                <label 
                  key={municipality.id}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
                >
                  <Checkbox
                    checked={selectedMunicipalities.has(municipality.id)}
                    onCheckedChange={() => onMunicipalityToggle(municipality.id)}
                  />
                  <span className="text-sm">{municipality.name}</span>
                </label>
              ))}
            </div>

            {/* Include Nearby Toggle */}
            <div className="flex items-center justify-between pt-2">
              <Label htmlFor="include-nearby" className="text-sm cursor-pointer">
                Include nearby municipalities
              </Label>
              <Switch
                id="include-nearby"
                checked={includeNearby}
                onCheckedChange={onIncludeNearbyChange}
              />
            </div>
          </div>
        )}
      </div>
    </FilterSection>
  );
}
