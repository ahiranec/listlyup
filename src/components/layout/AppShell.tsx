import { ReactNode } from 'react';

export interface AppShellProps {
  children: ReactNode;
  className?: string;
}

/**
 * AppShell
 * 
 * The absolute root layout container. It ensures the application 
 * takes up the full viewport height, prevents unwanted overflow at the root,
 * and applies the base background color.
 * 
 * Best used at the top level (e.g. in App.tsx) wrapping the entire routing logic.
 */
export function AppShell({ children, className = '' }: AppShellProps) {
  return (
    <div className={`h-[100dvh] w-full bg-background flex flex-col relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
