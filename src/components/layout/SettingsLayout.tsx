import { ReactNode } from 'react';

export interface SettingsLayoutProps {
  header?: ReactNode; // Mobile header with back button
  sidebar: ReactNode; // Desktop left settings navigation
  children: ReactNode; // Active settings page content
  className?: string;
}

/**
 * SettingsLayout
 * 
 * A master-detail layout tailored for settings and configuration pages.
 * On desktop, shows a persistent left navigation menu alongside the content.
 * On mobile, relies on standard push-navigation (managed by a router),
 * rendering only the content.
 * 
 * Best used for: SettingsHub, Account Preferences, Profile Management Hub.
 */
export function SettingsLayout({ header, sidebar, children, className = '' }: SettingsLayoutProps) {
  return (
    <div className={`flex flex-col h-full w-full bg-gray-50/50 ${className}`}>
      {/* Mobile Header */}
      {header && (
        <div className="lg:hidden flex-none sticky top-0 z-20 bg-white border-b border-gray-100">
          {header}
        </div>
      )}

      <div className="flex-1 flex max-w-6xl w-full mx-auto h-full overflow-hidden">
        {/* Desktop Settings Navigation */}
        <aside className="hidden lg:flex flex-col w-[280px] flex-none border-r border-gray-200/60 bg-white/50 h-full overflow-y-auto p-4 py-8">
          {sidebar}
        </aside>

        {/* Settings Content Area */}
        <main className="flex-1 h-full overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
