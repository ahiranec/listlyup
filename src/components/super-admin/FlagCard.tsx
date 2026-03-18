/**
 * Flag Card Component
 * Individual feature flag card with controls
 */

import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import type { FeatureFlag, UserPlan } from '../../lib/services/feature-flags';
import { FlagControls } from './FlagControls';
import { DisabledReason } from './DisabledReason';
import { getFeatureIcon, getFeatureLabel } from './adminUtils';

interface FlagCardProps {
  flag: FeatureFlag;
  onToggle: (featureName: string, enabled: boolean) => void;
  onMinPlanChange: (featureName: string, plan: UserPlan) => void;
  onRolloutChange: (featureName: string, percentage: number) => void;
}

export function FlagCard({
  flag,
  onToggle,
  onMinPlanChange,
  onRolloutChange
}: FlagCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getFeatureIcon(flag)}
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2">
              <Label className="text-base">
                {getFeatureLabel(flag.name)}
              </Label>
              <Badge variant={flag.enabled ? 'default' : 'secondary'}>
                {flag.scope}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              {flag.description}
            </p>
          </div>
        </div>
        
        {/* Global Toggle */}
        <Switch
          checked={flag.enabled}
          onCheckedChange={(checked) => onToggle(flag.name, checked)}
        />
      </div>
      
      {/* Controls (only when enabled) */}
      {flag.enabled && (
        <FlagControls
          minPlan={flag.minPlan}
          rolloutPercentage={flag.rolloutPercentage}
          onMinPlanChange={(plan) => onMinPlanChange(flag.name, plan)}
          onRolloutChange={(percentage) => onRolloutChange(flag.name, percentage)}
        />
      )}
      
      {/* Disabled Reason */}
      {!flag.enabled && flag.reason && (
        <DisabledReason reason={flag.reason} />
      )}
    </div>
  );
}
