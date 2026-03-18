import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface FreezeBannerProps {
  freezeStates: {
    registrations: boolean;
    publishing: boolean;
    groupCreation: boolean;
  };
}

export function FreezeBanner({ freezeStates }: FreezeBannerProps) {
  const hasFreezes = freezeStates.registrations || freezeStates.publishing || freezeStates.groupCreation;

  if (!hasFreezes) return null;

  const freezeMessages: string[] = [];
  if (freezeStates.registrations) freezeMessages.push('New registrations disabled');
  if (freezeStates.publishing) freezeMessages.push('Publishing disabled');
  if (freezeStates.groupCreation) freezeMessages.push('Group creation disabled');

  return (
    <div className="sticky top-0 z-50 bg-yellow-500 px-6 py-3 shadow-md">
      <div className="flex items-center justify-center gap-2 max-w-7xl mx-auto">
        <AlertTriangle className="w-5 h-5 text-yellow-900 flex-shrink-0" />
        <p className="font-medium text-yellow-900 text-center">
          <strong>⚠️ Platform Notice:</strong> {freezeMessages.join(' • ')}
        </p>
      </div>
    </div>
  );
}
