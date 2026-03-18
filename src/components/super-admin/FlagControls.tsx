/**
 * Flag Controls Component
 * Plan and rollout percentage controls
 */

import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import type { UserPlan } from '../../lib/services/feature-flags';
import { PLAN_OPTIONS, ROLLOUT_OPTIONS } from './constants';

interface FlagControlsProps {
  minPlan: UserPlan | null | undefined;
  rolloutPercentage: number | null | undefined;
  onMinPlanChange: (plan: UserPlan) => void;
  onRolloutChange: (percentage: number) => void;
}

export function FlagControls({
  minPlan,
  rolloutPercentage,
  onMinPlanChange,
  onRolloutChange
}: FlagControlsProps) {
  return (
    <div className="space-y-3 ml-8 pt-2 border-t">
      {/* Minimum Plan */}
      <div className="flex items-center justify-between">
        <Label className="text-sm">Minimum Plan</Label>
        <Select
          value={minPlan || 'free'}
          onValueChange={(value) => onMinPlanChange(value as UserPlan)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PLAN_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Rollout Percentage */}
      <div className="flex items-center justify-between">
        <Label className="text-sm">Rollout</Label>
        <Select
          value={(rolloutPercentage || 100).toString()}
          onValueChange={(value) => onRolloutChange(parseInt(value))}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {ROLLOUT_OPTIONS.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
