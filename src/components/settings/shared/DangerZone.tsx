/**
 * Danger Zone Component
 * Warning section for destructive actions
 */

import { AlertTriangle } from 'lucide-react';
import { ReactNode } from 'react';

interface DangerZoneProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function DangerZone({ title, description, children }: DangerZoneProps) {
  return (
    <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-red-900 mb-1">{title}</h3>
          <p className="text-xs text-red-700">{description}</p>
        </div>
      </div>
      {children}
    </div>
  );
}
