/**
 * BaseFilterSection
 * Componente base reutilizable para secciones de filtros
 * Maneja accordion/collapse behavior y estilos consistentes
 */

import { ReactNode, memo } from 'react';
import { ChevronDown } from 'lucide-react';

interface BaseFilterSectionProps {
  title: string;
  emoji?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: string | number;
}

function BaseFilterSectionComponent({
  title,
  emoji,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  badge,
}: BaseFilterSectionProps) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {emoji && <span className="text-base">{emoji}</span>}
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{title}</span>
          {badge !== undefined && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}

// Memoize component to prevent unnecessary re-renders
// Re-renders only when props change
export const BaseFilterSection = memo(BaseFilterSectionComponent);