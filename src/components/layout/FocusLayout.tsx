import { ReactNode } from 'react';

export interface FocusLayoutProps {
  children: ReactNode;
  className?: string;
}

/**
 * FocusLayout
 * 
 * A distraction-free, centered layout designed for transactional workflows.
 * It removes all global navigation (no topbar, no sidebar) to prevent user drop-off.
 * 
 * Best used for: Sign In, Sign Up, Password Reset, Publish Flow, Create Group, Checkout.
 */
export function FocusLayout({ children, className = '' }: FocusLayoutProps) {
  return (
    <div className={`h-full w-full overflow-y-auto flex flex-col items-center justify-start lg:justify-center bg-background px-4 py-12 md:p-8 ${className}`}>
      <div className="w-full max-w-md mx-auto shrink-0">
        {children}
      </div>
    </div>
  );
}
