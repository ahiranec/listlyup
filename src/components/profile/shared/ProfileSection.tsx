/**
 * ProfileSection Component
 * Reusable clickeable section card for Profile Hub
 */

import { ChevronRight, AlertCircle, CheckCircle, LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../../ui/badge';

interface ProfileSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  status?: 'complete' | 'incomplete' | 'warning' | 'none';
  badge?: string;
  onClick: () => void;
}

export function ProfileSection({
  icon: Icon,
  title,
  description,
  status = 'none',
  badge,
  onClick,
}: ProfileSectionProps) {
  return (
    <motion.button
      onClick={onClick}
      className="w-full p-4 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all text-left"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-sm">{title}</h3>
            {badge && (
              <Badge variant="secondary" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          {description && (
            <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          )}
        </div>

        {/* Status Icon */}
        <div className="flex-shrink-0 flex items-center gap-2">
          {status === 'complete' && (
            <CheckCircle className="w-4 h-4 text-green-600" />
          )}
          {status === 'incomplete' && (
            <AlertCircle className="w-4 h-4 text-amber-600" />
          )}
          {status === 'warning' && (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </motion.button>
  );
}
