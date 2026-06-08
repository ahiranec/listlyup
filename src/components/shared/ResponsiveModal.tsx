/**
 * ResponsiveModal
 *
 * A unified wrapper that renders as a bottom Sheet on mobile
 * and a centered Dialog on desktop. Content, props, and logic
 * remain identical — only the outer shell changes.
 *
 * Usage:
 *   <ResponsiveModal open={open} onOpenChange={setOpen} title="My Title" description="Subtitle">
 *     <div>...your content...</div>
 *   </ResponsiveModal>
 */

import { ReactNode } from 'react';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../ui/sheet';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { useMediaQuery } from '../../hooks/useMediaQuery';

export interface ResponsiveModalProps {
  /** Controls open/close state */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Accessible title (rendered sr-only) */
  title: string;
  /** Accessible description (sr-only) */
  description?: string;
  /** Content to render inside the modal */
  children: ReactNode;
  /**
   * Desktop Dialog max-width class.
   * Defaults to 'max-w-md'. Use 'max-w-lg', 'max-w-xl', etc. for wider content.
   */
  desktopMaxWidth?: string;
  /**
   * Mobile Sheet height class.
   * Defaults to 'h-auto'. Use 'h-[85vh]', 'h-[90vh]', etc. for taller sheets.
   */
  mobileHeight?: string;
  /**
   * Additional className for the Sheet/Dialog content container.
   */
  className?: string;
  /**
   * If true, suppress the default Dialog close (X) button.
   * Useful when the content already has its own close/back button.
   */
  hideCloseButton?: boolean;
}

export function ResponsiveModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  desktopMaxWidth = 'max-w-md',
  mobileHeight = 'h-auto',
  className = '',
  hideCloseButton = false,
}: ResponsiveModalProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // ─── Desktop: Centered Dialog ───────────────────────────────
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className={[
            // Override the primitive's default sm:max-w-lg with our own width
            '!max-w-[calc(100%-2rem)]', desktopMaxWidth,
            // Proper dialog styling
            'p-0 overflow-hidden rounded-2xl border border-gray-200/60',
            'shadow-2xl bg-background',
            // Cap height so tall content scrolls inside, not the viewport
            'max-h-[85vh] flex flex-col',
            // Optionally hide the default X close button
            hideCloseButton ? '[&>button:last-child]:hidden' : '',
            className,
          ].filter(Boolean).join(' ')}
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          {description && (
            <DialogDescription className="sr-only">
              {description}
            </DialogDescription>
          )}
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  // ─── Mobile: Bottom Sheet ───────────────────────────────────
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={`${mobileHeight} rounded-t-3xl border-t border-gray-200/50 shadow-2xl max-w-lg mx-auto p-0 overflow-hidden ${className}`}
      >
        <SheetTitle className="sr-only">{title}</SheetTitle>
        {description && (
          <SheetDescription className="sr-only">
            {description}
          </SheetDescription>
        )}
        {children}
      </SheetContent>
    </Sheet>
  );
}
