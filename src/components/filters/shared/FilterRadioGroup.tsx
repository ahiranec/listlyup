/**
 * FilterRadioGroup
 * Componente reutilizable para grupos de radio buttons en filtros
 */

import { memo } from 'react';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

export interface RadioOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  description?: string;
}

interface FilterRadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  namePrefix?: string;
}

function FilterRadioGroupComponent({
  options,
  selectedValue,
  onValueChange,
  namePrefix = 'radio',
}: FilterRadioGroupProps) {
  return (
    <RadioGroup value={selectedValue} onValueChange={onValueChange}>
      {options.map((option) => {
        const OptionIcon = option.icon;
        
        return (
          <div 
            key={option.value} 
            className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <RadioGroupItem 
              value={option.value} 
              id={`${namePrefix}-${option.value}`}
              className="border-2 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex-shrink-0"
            />
            <label 
              htmlFor={`${namePrefix}-${option.value}`}
              className="flex-1 flex items-center justify-between cursor-pointer min-w-0"
            >
              <span className="text-xs sm:text-sm font-medium text-foreground truncate">
                {option.label}
              </span>
              {OptionIcon && <OptionIcon className="w-4 h-4 text-muted-foreground flex-shrink-0 ml-2" />}
            </label>
            {option.description && (
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            )}
          </div>
        );
      })}
    </RadioGroup>
  );
}

// Memoize component to prevent unnecessary re-renders
// Re-renders only when options, selectedValue, onValueChange, or namePrefix change
export const FilterRadioGroup = memo(FilterRadioGroupComponent);