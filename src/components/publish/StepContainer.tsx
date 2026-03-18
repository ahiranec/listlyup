/**
 * Step Container
 * Reusable wrapper for publish flow steps with animation
 */

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ANIMATION_CONFIG } from './constants';

interface StepContainerProps {
  stepKey: string;
  children: ReactNode;
}

export function StepContainer({ stepKey, children }: StepContainerProps) {
  return (
    <motion.div
      key={stepKey}
      initial={ANIMATION_CONFIG.initial}
      animate={ANIMATION_CONFIG.animate}
      exit={ANIMATION_CONFIG.exit}
      transition={ANIMATION_CONFIG.transition}
      className="h-full"
    >
      {children}
    </motion.div>
  );
}
