/**
 * Header Logo Component
 * Animated logo with optimized sizing
 */

import { motion } from 'motion/react';

interface HeaderLogoProps {
  logo: string;
  alt?: string;
}

export function HeaderLogo({ logo, alt = 'ListlyUp' }: HeaderLogoProps) {
  return (
    <motion.div 
      className="h-5 sm:h-6 w-auto flex-shrink-0 mr-2 sm:mr-4"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      <img 
        src={logo} 
        alt={alt} 
        className="h-full w-auto object-cover object-left origin-left" 
      />
    </motion.div>
  );
}