/**
 * Filter Popover Component
 * Reusable popover wrapper for filter options
 */

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { FilterOption } from './filterOptions';

interface FilterPopoverProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  value: string;
  options: FilterOption[];
  onValueChange: (value: string) => void;
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode; // Trigger button
}

export function FilterPopover({
  open,
  onOpenChange,
  title,
  value,
  options,
  onValueChange,
  align = 'start',
  children
}: FilterPopoverProps) {
  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-56 p-3" align={align}>
        <div className="space-y-2">
          <h4 className="font-medium text-sm mb-3">{title}</h4>
          <RadioGroup value={value} onValueChange={onValueChange}>
            {options.map((option) => {
              const OptionIcon = option.icon;
              return (
                <div 
                  key={option.value} 
                  className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50"
                >
                  <RadioGroupItem 
                    value={option.value} 
                    id={`filter-${title.toLowerCase().replace(/\s+/g, '-')}-${option.value}`} 
                  />
                  <label 
                    htmlFor={`filter-${title.toLowerCase().replace(/\s+/g, '-')}-${option.value}`} 
                    className="flex-1 cursor-pointer text-sm flex items-center justify-between"
                  >
                    <span>{option.label}</span>
                    {OptionIcon && <OptionIcon className="w-4 h-4 text-muted-foreground" />}
                  </label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
}
