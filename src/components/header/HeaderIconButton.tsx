/**
 * Header Icon Button Component
 * Reusable icon button with hover/tap animations
 * Target size: ≥44px for accessibility
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface HeaderIconButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
  ariaLabel: string;
  badge?: number;
  variant?: 'default' | 'secondary';
}

export function HeaderIconButton({ 
  icon: Icon, 
  onClick, 
  ariaLabel,
  badge,
  variant = 'default'
}: HeaderIconButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative p-2.5 rounded-lg hover:bg-gray-100 transition-all duration-200 flex-shrink-0"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={ariaLabel}
    >
      <Icon className={`w-5 h-5 ${
        variant === 'secondary' ? 'text-secondary' : 'text-muted-foreground'
      }`} />
      
      {badge !== undefined && badge > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
          className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-gradient-to-br from-red-500 to-red-600 text-white text-[10px] font-bold rounded-full shadow-lg shadow-red-500/40"
        >
          {badge}
          <span className="absolute inset-0 rounded-full bg-red-500 animate-[pulse-ring_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </motion.span>
      )}
    </motion.button>
  );
}