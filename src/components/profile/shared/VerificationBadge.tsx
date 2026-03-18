/**
 * VerificationBadge Component
 * Shows verification status for email/phone/identity
 */

import { CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { Badge } from '../../ui/badge';

interface VerificationBadgeProps {
  verified: boolean;
  type: 'email' | 'phone' | 'identity';
}

export function VerificationBadge({ verified, type }: VerificationBadgeProps) {
  if (verified) {
    return (
      <Badge variant="default" className="text-xs bg-green-600 hover:bg-green-700">
        <CheckCircle className="w-3 h-3 mr-1" />
        Verified
      </Badge>
    );
  }

  return (
    <Badge variant="secondary" className="text-xs border-amber-300 bg-amber-50 text-amber-800">
      <AlertCircle className="w-3 h-3 mr-1" />
      Not verified
    </Badge>
  );
}
