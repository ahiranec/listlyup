/**
 * Duration Badge Component
 * Displays event duration (Single day, Multi-day)
 */

import { Calendar, CalendarRange } from 'lucide-react';

interface DurationBadgeProps {
  duration?: 'single' | 'multi';
  size?: 'default' | 'compact';
}

export function DurationBadge({ duration, size = 'default' }: DurationBadgeProps) {
  if (!duration) return null;

  // Size-specific classes
  const sizeClasses = size === 'compact' 
    ? 'px-1.5 py-0.5 text-[9px]' 
    : 'px-2 py-1 text-[10px]';
  
  const iconSize = size === 'compact' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  const getIcon = () => {
    switch (duration) {
      case 'single':
        return <Calendar className={iconSize} />;
      case 'multi':
        return <CalendarRange className={iconSize} />;
    }
  };

  const getLabel = () => {
    switch (duration) {
      case 'single':
        return 'Single day';
      case 'multi':
        return 'Multi-day';
    }
  };

  const getColor = () => {
    switch (duration) {
      case 'single':
        return 'bg-orange-50 text-orange-700 ring-orange-200';
      case 'multi':
        return 'bg-indigo-50 text-indigo-700 ring-indigo-200';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium backdrop-blur-md shadow-lg ring-1 ring-inset ${getColor()} ${sizeClasses}`}>
      {getIcon()}
      <span>{getLabel()}</span>
    </span>
  );
}