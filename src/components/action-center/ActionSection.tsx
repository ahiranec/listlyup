/**
 * ActionSection Component
 * Collapsible section for grouping action items by type
 * Follows same pattern as NotificationSection for consistency
 * 
 * Features:
 * - Smooth expand/collapse animation
 * - Count badge with soft colors
 * - Optional section-level actions
 * - Premium 2025 design with soft tones
 */

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';

interface ActionSectionProps {
  id: string;
  emoji: string;
  title: string;
  count: number;
  isOpen?: boolean;
  variant?: 'default' | 'urgent' | 'info';
  children: React.ReactNode;
  onAction?: () => void;
}

const variantStyles = {
  default: 'bg-card border-border',
  urgent: 'bg-red-50/20 dark:bg-red-950/10 border-red-300 dark:border-red-900/30',
  info: 'bg-muted/10 border-border',
};

const badgeStyles = {
  default: 'bg-blue-300 text-blue-900 dark:bg-blue-900/40 dark:text-blue-200',
  urgent: 'bg-red-300 text-red-900 dark:bg-red-900/40 dark:text-red-200',
  info: 'bg-muted-foreground/20 text-muted-foreground',
};

export function ActionSection({
  id,
  emoji,
  title,
  count,
  isOpen: defaultIsOpen = false,
  variant = 'default',
  children,
  onAction,
}: ActionSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultIsOpen);

  return (
    <div className="space-y-0">
      {/* Section Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between py-2.5 text-left
          transition-colors
          ${isOpen ? 'mb-2' : ''}
        `}
      >
        <div className="flex items-center gap-2 flex-1">
          <span className="text-sm">{emoji} {title}</span>
          {count > 0 && (
            <Badge className={`h-4 px-1.5 text-[9px] font-medium ${badgeStyles[variant]}`}>
              {count}
            </Badge>
          )}
        </div>
        {isOpen ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground transition-transform" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform" />
        )}
      </button>

      {/* Section Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 pb-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
