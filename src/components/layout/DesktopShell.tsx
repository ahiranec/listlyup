import { ReactNode } from 'react';

export interface DesktopShellProps {
  header: ReactNode;
  sidebar?: ReactNode;
  bottomNav?: ReactNode; // For mobile
  children: ReactNode;
  className?: string;
}

/**
 * DesktopShell
 * 
 * The main structural wrapper for the application's core authenticated/browsing experience.
 * It provides a slot for the global Header, a slot for the Desktop Sidebar (left),
 * a slot for Mobile BottomNav, and the main scrollable content area.
 * 
 * Best used for the primary "feed" or "marketplace" views.
 */
export function DesktopShell({ header, sidebar, bottomNav, children, className = '' }: DesktopShellProps) {
  return (
    <div className={`flex flex-col h-full w-full ${className}`}>
      {/* Global Topbar / Header */}
      <div className="flex-none z-fixed sticky top-0 bg-background">
        {header}
      </div>

      <div className="flex-1 flex overflow-hidden min-h-0 relative">
        {/* Desktop Left Navigation / Filters */}
        {sidebar && (
          <aside className="hidden lg:flex flex-col flex-none w-[280px] h-full overflow-y-auto border-r border-gray-200/50 bg-background z-10">
            {sidebar}
          </aside>
        )}

        {/* Main Scrollable Content - Neutral container */}
        <main id="main-scroll-container" className="flex-1 overflow-y-auto scrollbar-hide bg-background relative w-full h-full">
          <div className="w-full min-h-full pb-24 lg:pb-8 flex flex-col">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      {bottomNav && (
        <div className="lg:hidden flex-none z-fixed relative">
          {bottomNav}
        </div>
      )}
    </div>
  );
}
