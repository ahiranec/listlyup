import { ReactNode } from 'react';

export interface AccountShellProps {
  /** Left navigation (account sections). Rendered as a persistent sidebar on desktop. */
  sidebar: ReactNode;
  /** Active section content, rendered in the right pane. */
  children: ReactNode;
  className?: string;
}

/**
 * AccountShell
 *
 * Desktop master-detail layout for the account/menu area: a persistent left
 * sidebar (sections) and a scrollable right content pane (active section).
 *
 * NOTE: This is intended to be rendered only at the desktop breakpoint (>=1024).
 * On mobile the account sections keep their standalone full-page behavior, so
 * this shell is not used there.
 */
export function AccountShell({ sidebar, children, className = '' }: AccountShellProps) {
  return (
    <div className={`flex h-full w-full overflow-hidden bg-background ${className}`}>
      {/* Left: persistent section navigation */}
      <aside className="flex flex-col flex-none w-[280px] h-full overflow-y-auto border-r border-gray-200/60 bg-background">
        {sidebar}
      </aside>

      {/* Right: active section content */}
      <main className="flex-1 h-full overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
