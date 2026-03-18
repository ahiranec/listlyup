/**
 * Header Search Component
 * Search input with focus states and clear button
 */

import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderSearchProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export function HeaderSearch({ 
  value = '', 
  onChange, 
  placeholder = 'Search products...' 
}: HeaderSearchProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleClear = () => {
    onChange?.('');
  };

  return (
    <div className={`
      flex-1 max-w-xl
      flex items-center gap-1.5 sm:gap-2 
      bg-white px-2.5 sm:px-3 py-1.5 
      rounded-lg sm:rounded-xl border 
      transition-all duration-300
      ${isFocused 
        ? 'border-primary shadow-lg shadow-primary/10 ring-2 sm:ring-4 ring-primary/5' 
        : 'border-gray-200 shadow-inner'
      }
    `}>
      <motion.div
        animate={isFocused ? { scale: 1.1 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Search className={`
          w-4 h-4 flex-shrink-0 transition-colors duration-300
          ${isFocused ? 'text-primary' : 'text-muted-foreground'}
        `} />
      </motion.div>
      
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent text-xs sm:text-sm text-foreground outline-none placeholder:text-muted-foreground"
      />
      
      {value && (
        <motion.button 
          onClick={handleClear}
          className="p-1 hover:bg-gray-100 rounded-full transition-all duration-200 flex-shrink-0"
          aria-label="Clear search"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ rotate: 90 }}
        >
          <X className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-muted-foreground" />
        </motion.button>
      )}
    </div>
  );
}