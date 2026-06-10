import { ReactNode } from 'react';

export interface StandardPageLayoutProps {
  header?: ReactNode;
  children: ReactNode;
  maxWidth?: 'md' | 'lg' | 'xl' | '2xl' | 'full';
  className?: string;
  contentClassName?: string;
}

const maxWidthClasses = {
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
};

/**
 * StandardPageLayout
 * 
 * A clean, vertically scrolling page with an optional local header.
 * Centers content within a specified max-width container.
 * 
 * Best used for generic content pages: About, Terms, static information, 
 * or simple list views that don't need a persistent sidebar.
 */
export function StandardPageLayout({ 
  header, 
  children, 
  maxWidth = 'lg',
  className = '',
  contentClassName = ''
}: StandardPageLayoutProps) {
  return (
    <div className={`flex flex-col h-full w-full overflow-y-auto bg-background ${className}`}>
      {header && (
        <div className="flex-none sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
          {header}
        </div>
      )}
      <main className={`flex-1 w-full mx-auto p-4 md:p-8 ${maxWidthClasses[maxWidth]} ${contentClassName}`}>
        {children}
      </main>
    </div>
  );
}
