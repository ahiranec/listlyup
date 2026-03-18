/**
 * Settings Section Component
 * Reusable section header for grouping settings
 */

import { ReactNode } from 'react';

interface SettingsSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div>
      <div className="mb-3">
        <h2 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
