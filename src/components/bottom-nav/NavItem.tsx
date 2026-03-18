/**
 * Nav Item Component
 * Individual navigation button with active state
 */

import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface NavItemProps {
  id: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  onClick: () => void;
  index: number;
  badge?: number; // NEW: Opcional badge count
}

export function NavItem({ 
  id, 
  icon: Icon, 
  label, 
  isActive, 
  onClick,
  index,
  badge 
}: NavItemProps) {
  return (
    <motion.button
      onClick={onClick}
      className="touch-target relative flex flex-col items-center justify-center gap-0.5 px-2 min-w-[56px] transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.05,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
      aria-label={label}
      aria-current={isActive ? 'page' : undefined}
    >
      <div className={`
        relative flex items-center justify-center 
        w-9 h-9 rounded-xl transition-all duration-300
        ${isActive 
          ? 'bg-gradient-to-br from-primary to-blue-600 shadow-md shadow-primary/25' 
          : 'bg-transparent'
        }
      `}>
        <Icon className={`
          w-[18px] h-[18px] transition-all duration-300
          ${isActive ? 'text-white scale-110' : 'text-muted-foreground'}
        `} />
        
        {/* Badge notification */}
        {badge && badge > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center px-1 shadow-md"
          >
            <span className="text-[10px] font-bold text-white leading-none">
              {badge > 99 ? '99+' : badge}
            </span>
          </motion.div>
        )}
        
        {isActive && (
          <motion.div 
            className="absolute inset-0 rounded-xl ring-2 ring-primary/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        )}
      </div>

      <span className={`
        text-[10px] font-medium text-center leading-tight 
        transition-all duration-300
        ${isActive ? 'text-primary' : 'text-muted-foreground'}
      `}>
        {label}
      </span>

      {isActive && (
        <motion.div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-0.5 bg-primary rounded-full"
          layoutId="bottomNavIndicator"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      )}
    </motion.button>
  );
}