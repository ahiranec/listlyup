import { DollarSign } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FilterSection } from "./FilterSection";
import { currencyOptions } from "./constants";
import type { FilterOptions } from "./types";

interface PriceSectionProps {
  filters: FilterOptions;
  isOpen: boolean;
  onToggle: () => void;
  onUpdate: (filters: FilterOptions) => void;
}

export function PriceSection({ filters, isOpen, onToggle, onUpdate }: PriceSectionProps) {
  const getSelectedLabel = () => {
    const parts = [];
    
    // Currency
    parts.push(filters.currency);
    
    // Price range
    if (filters.minPrice || filters.maxPrice) {
      const symbol = currencyOptions[filters.currency].symbol;
      if (filters.minPrice && filters.maxPrice) {
        parts.push(`${symbol}${filters.minPrice}-${symbol}${filters.maxPrice}`);
      } else if (filters.minPrice) {
        parts.push(`≥${symbol}${filters.minPrice}`);
      } else if (filters.maxPrice) {
        parts.push(`≤${symbol}${filters.maxPrice}`);
      }
    }
    
    return parts.length > 1 ? parts.join(", ") : "All";
  };

  const handleMinPriceChange = (value: string) => {
    // Only allow numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      onUpdate({ ...filters, minPrice: value });
    }
  };

  const handleMaxPriceChange = (value: string) => {
    // Only allow numbers and empty string
    if (value === "" || /^\d+$/.test(value)) {
      onUpdate({ ...filters, maxPrice: value });
    }
  };

  return (
    <FilterSection
      title="Price Range"
      icon={DollarSign}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={getSelectedLabel()}
      delay={0.6}
    >
      <div className="space-y-4">
        {/* Currency Selector */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Currency:</Label>
          <Select 
            value={filters.currency} 
            onValueChange={(value) => onUpdate({ ...filters, currency: value as any })}
          >
            <SelectTrigger className="w-full text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(currencyOptions).map(([code, data]) => (
                <SelectItem key={code} value={code}>
                  {data.symbol} {code} - {data.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range - Min/Max Inputs */}
        <div>
          <Label className="text-xs text-muted-foreground mb-2 block">Price Range:</Label>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="min-price" className="text-xs text-muted-foreground mb-1 block">
                Min {currencyOptions[filters.currency].symbol}
              </Label>
              <Input
                id="min-price"
                type="text"
                inputMode="numeric"
                placeholder="0"
                value={filters.minPrice}
                onChange={(e) => handleMinPriceChange(e.target.value)}
                className="text-xs h-9"
              />
            </div>
            <div>
              <Label htmlFor="max-price" className="text-xs text-muted-foreground mb-1 block">
                Max {currencyOptions[filters.currency].symbol}
              </Label>
              <Input
                id="max-price"
                type="text"
                inputMode="numeric"
                placeholder="No limit"
                value={filters.maxPrice}
                onChange={(e) => handleMaxPriceChange(e.target.value)}
                className="text-xs h-9"
              />
            </div>
          </div>
        </div>
      </div>
    </FilterSection>
  );
}