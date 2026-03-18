/**
 * Feature Toggle Card
 * Reusable card for Smart Features with all 4 states
 * States: available, locked, forced, disabled
 */

import { Lock } from 'lucide-react';
import { Switch } from '../../ui/switch';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { FeatureState } from '../types';

interface FeatureToggleCardProps {
  title: string;
  description: string;
  icon: string;
  state: FeatureState | null;
  onToggle: (enabled: boolean) => void;
  onUpgrade?: () => void;
}

export function FeatureToggleCard({
  title,
  description,
  state,
  onToggle,
  onUpgrade,
}: FeatureToggleCardProps) {
  // Loading state
  if (!state) {
    return (
      <div className="p-4 bg-white border border-gray-200 rounded-xl opacity-50">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-100 rounded w-48 animate-pulse" />
          </div>
          <div className="w-11 h-6 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const { displayState, badge, helperText, canToggle, isActive } = state;

  return (
    <div
      className={`p-4 bg-white border rounded-xl transition-all ${
        displayState === 'locked' ? 'border-gray-200 bg-gray-50/50' : 'border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium">{title}</h3>
            
            {/* Badge */}
            {badge && (
              <Badge
                variant={badge === 'Free' ? 'secondary' : 'default'}
                className="text-xs"
              >
                {badge === 'Free' && '🆓'}
                {badge === 'Plus' && '✨'}
                {badge === 'Pro' && '🚀'}
                {badge === 'Unavailable' && '⚠️'}
                {' '}{badge}
              </Badge>
            )}
          </div>

          <p className="text-xs text-muted-foreground mb-2">{description}</p>

          {/* Helper Text */}
          {helperText && (
            <p className="text-xs text-muted-foreground italic">
              {displayState === 'forced' && '🔒 '}
              {displayState === 'locked' && '🔒 '}
              {displayState === 'disabled' && '⚠️ '}
              {helperText}
            </p>
          )}

          {/* Upgrade CTA */}
          {displayState === 'locked' && onUpgrade && (
            <Button
              size="sm"
              className="mt-2 h-7 text-xs"
              onClick={onUpgrade}
            >
              Upgrade to {badge}
            </Button>
          )}
        </div>

        {/* Toggle or Lock Icon */}
        <div className="flex-shrink-0">
          {displayState === 'locked' ? (
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
          ) : (
            <Switch
              checked={isActive}
              onCheckedChange={onToggle}
              disabled={!canToggle}
            />
          )}
        </div>
      </div>
    </div>
  );
}
