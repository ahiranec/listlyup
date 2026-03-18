/**
 * Visibility Badge Component
 * Shows if listing is Public or Group-only
 */

import { Globe, Users, Lock } from 'lucide-react';

interface VisibilityBadgeProps {
  visibility?: string;
}

export function VisibilityBadge({ visibility }: VisibilityBadgeProps) {
  // Normalize visibility to lowercase for comparison
  const normalizedVisibility = visibility?.toLowerCase();
  
  return (
    <div className="absolute top-[var(--space-sm)] right-[var(--space-sm)]">
      <span className="inline-flex items-center p-1.5 backdrop-blur-sm rounded-full bg-black/10" data-field="visibility">
        {normalizedVisibility === 'group' ? (
          <Users className="w-3.5 h-3.5 text-white/90" />
        ) : normalizedVisibility === 'private' ? (
          <Lock className="w-3.5 h-3.5 text-white/90" />
        ) : (
          <Globe className="w-3.5 h-3.5 text-white/90" />
        )}
      </span>
    </div>
  );
}