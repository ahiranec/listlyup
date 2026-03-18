/**
 * FilterCheckboxGroup
 * Componente reutilizable para grupos de checkboxes en filtros
 */

import { memo } from 'react';
import { Checkbox } from '../../ui/checkbox';

export interface CheckboxOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  emoji?: string;
  count?: number;
}

interface FilterCheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: Set<string>;
  onToggle: (value: string) => void;
}

function FilterCheckboxGroupComponent({
  options,
  selectedValues,
  onToggle,
}: FilterCheckboxGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const Icon = option.icon;
        
        return (
          <label
            key={option.value}
            className="flex items-center gap-2.5 cursor-pointer hover:bg-muted/30 p-1.5 rounded-lg transition-colors"
          >
            <Checkbox
              checked={selectedValues.has(option.value)}
              onCheckedChange={() => onToggle(option.value)}
            />
            {option.emoji && <span className="text-sm">{option.emoji}</span>}
            {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
            <span className="text-sm">{option.label}</span>
            {option.count !== undefined && (
              <span className="text-xs text-muted-foreground ml-auto">
                ({option.count})
              </span>
            )}
          </label>
        );
      })}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
// Re-renders only when options, selectedValues, or onToggle change
export const FilterCheckboxGroup = memo(FilterCheckboxGroupComponent);