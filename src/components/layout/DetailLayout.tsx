import { ReactNode } from 'react';

export interface DetailLayoutProps {
  header?: ReactNode; // Local back-button header
  mediaSection?: ReactNode; // Carousel or images
  infoSection: ReactNode; // Details, title, price, actions
  className?: string;
}

/**
 * DetailLayout
 * 
 * Optimized for single-item deep dives.
 * On mobile, it stacks media on top of info.
 * On desktop, it can present a 2-column split (media left, info right) or a wide center focus.
 * 
 * Best used for: Product Detail Page, Event Detail Page, User Profile Detail.
 */
export function DetailLayout({ header, mediaSection, infoSection, className = '' }: DetailLayoutProps) {
  return (
    <div className={`flex flex-col h-full w-full overflow-y-auto bg-background ${className}`}>
      {header && (
        <div className="flex-none sticky top-0 z-20 bg-white">
          {header}
        </div>
      )}
      
      <main className="flex-1 w-full max-w-[1024px] mx-auto pb-24 lg:pb-8 flex flex-col lg:flex-row gap-0 lg:gap-8 lg:p-6">
        {/* Media / Images (Left on Desktop, Top on Mobile) */}
        {mediaSection && (
          <div className="w-full lg:w-[55%] flex-none">
            {mediaSection}
          </div>
        )}

        {/* Core Info & Actions (Right on Desktop, Bottom on Mobile) */}
        <div className="w-full lg:flex-1 p-4 lg:p-0">
          {infoSection}
        </div>
      </main>
    </div>
  );
}
