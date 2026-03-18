/**
 * Filter Button Component
 * Reusable button for SearchBar filters with active state
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { forwardRef } from 'react';

interface FilterButtonProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  showLabelOnMobile?: boolean;
}

export const FilterButton = forwardRef<HTMLButtonElement, FilterButtonProps>(({ 
  icon: Icon, 
  label, 
  isActive = false,
  onClick,
  children,
  showLabelOnMobile = false
}, ref) => {
  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      className={`relative flex items-center gap-1.5 p-2.5 sm:px-3 sm:py-2.5 bg-white border rounded-xl transition-all duration-200 flex-shrink-0 ${
        isActive 
          ? 'border-primary bg-primary/5 shadow-sm' 
          : 'border-gray-200 hover:border-primary hover:bg-primary/5'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      <Icon className="w-4 h-4 text-primary flex-shrink-0" />
      <span className={`${showLabelOnMobile ? 'inline' : 'hidden sm:inline'} text-xs truncate transition-opacity duration-200`}>
        {label}
      </span>
      {children}
    </motion.button>
  );
});

FilterButton.displayName = 'FilterButton';