/**
 * Disabled Reason Component
 * Shows why a flag is disabled
 */

import { Label } from '../ui/label';

interface DisabledReasonProps {
  reason: string;
}

export function DisabledReason({ reason }: DisabledReasonProps) {
  return (
    <div className="ml-8 pt-2 border-t">
      <Label className="text-sm text-muted-foreground">Reason</Label>
      <p className="text-sm mt-1">{reason}</p>
    </div>
  );
}
