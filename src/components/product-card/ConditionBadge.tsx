/**
 * Condition Badge Component
 * Displays product condition (New, Like New, Used)
 * Normalized size and style to match other badges
 */

import { getConditionColor, getConditionDotColor } from './productCardUtils';

interface ConditionBadgeProps {
  condition?: string;
  size?: 'default' | 'compact';
}

export function ConditionBadge({ condition, size = 'default' }: ConditionBadgeProps) {
  // Don't render if condition is N/A or undefined
  if (!condition || condition === "N/A") {
    return null;
  }
  
  // Size-specific classes
  const sizeClasses = size === 'compact' 
    ? 'px-1.5 py-0.5 text-[9px]' 
    : 'px-2 py-1 text-[10px]';
  
  return (
    <span className={`inline-flex items-center gap-1.5 backdrop-blur-md rounded-full font-medium shadow-lg ring-1 ring-inset ${getConditionColor(condition)} ${sizeClasses}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getConditionDotColor(condition)}`} />
      {condition}
    </span>
  );
}