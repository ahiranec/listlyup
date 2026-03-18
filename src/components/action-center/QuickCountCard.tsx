/**
 * QuickCountCard Component
 * Compact card for quick counts with soft 2025 color palette
 * Updated to match Notifications' soft tones (-300/-400)
 */

import { LucideIcon } from 'lucide-react';

interface QuickCountCardProps {
  icon: LucideIcon;
  count: number;
  label: string;
  gradient: 'blue' | 'amber' | 'purple' | 'green' | 'red';
}

// Soft 2025 palette with -300/-400 tones
const gradientClasses = {
  blue: 'bg-blue-50/30 dark:bg-blue-950/20 border border-blue-300/20 dark:border-blue-900/20',
  amber: 'bg-amber-50/30 dark:bg-amber-950/20 border border-amber-300/20 dark:border-amber-900/20',
  purple: 'bg-purple-50/30 dark:bg-purple-950/20 border border-purple-300/20 dark:border-purple-900/20',
  green: 'bg-green-50/30 dark:bg-green-950/20 border border-green-300/20 dark:border-green-900/20',
  red: 'bg-red-50/30 dark:bg-red-950/20 border border-red-300/20 dark:border-red-900/20',
};

const iconColors = {
  blue: 'text-blue-400 dark:text-blue-500',
  amber: 'text-amber-400 dark:text-amber-500',
  purple: 'text-purple-400 dark:text-purple-500',
  green: 'text-green-400 dark:text-green-500',
  red: 'text-red-400 dark:text-red-500',
};

export function QuickCountCard({ icon: Icon, count, label, gradient }: QuickCountCardProps) {
  return (
    <div className={`p-2.5 rounded-lg ${gradientClasses[gradient]}`}>
      <div className="flex items-center gap-1.5 mb-1">
        <Icon className={`w-3.5 h-3.5 ${iconColors[gradient]}`} />
        <span className="text-[10px] text-muted-foreground">{label}</span>
      </div>
      <p className="text-xl font-semibold">{count}</p>
      <p className="text-[9px] text-muted-foreground">
        {count === 0 ? 'None' : count === 1 ? 'item' : 'items'}
      </p>
    </div>
  );
}