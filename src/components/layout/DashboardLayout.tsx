import { ReactNode } from 'react';

export interface DashboardLayoutProps {
  children: ReactNode; // Typically the feed or grid content
  rightGutter?: ReactNode; // Optional right side content (ads, stats)
  layoutMode?: 'fluid' | 'constrained'; // Fluid for responsive grid, constrained for fixed 820px feed
  className?: string;
}

/**
 * DashboardLayout
 * 
 * Designed specifically for the high-density marketplace feed.
 * - Supports a 'fluid' mode (default) that fills available space for a responsive CSS Grid.
 * - Supports a 'constrained' mode (820px) if a specific centered feed is required.
 * - Leaves an optional right gutter for visual "air" or future utility panels.
 * 
 * Best used for: Home Feed, My Listings Grid, Group Products Grid.
 */
export function DashboardLayout({ children, rightGutter, layoutMode = 'fluid', className = '' }: DashboardLayoutProps) {
  const contentWrapperClass = layoutMode === 'constrained'
    ? 'w-full max-w-[820px] shrink-0 mx-auto lg:mx-0'
    : 'flex-1 min-w-0 w-full';

  return (
    <div className={`flex flex-col lg:flex-row items-start justify-start w-full h-full gap-6 lg:gap-8 ${className}`}>
      {/* Main Content Area */}
      <div className={contentWrapperClass}>
        {children}
      </div>

      {/* Right Gutter / Growth Area */}
      {rightGutter && (
        <div className="hidden xl:block flex-none w-[280px]">
          {rightGutter}
        </div>
      )}
    </div>
  );
}
