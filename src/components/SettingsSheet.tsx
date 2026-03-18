/**
 * Settings Sheet
 * Full-page Settings implementation using SettingsRouter
 * Uses Sheet for consistency with existing patterns
 */

import { Sheet, SheetContent, SheetTitle, SheetDescription } from './ui/sheet';
import { SettingsRouter } from './settings';

interface SettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SettingsSheet({ open, onOpenChange }: SettingsSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="right" 
        className="w-full p-0 sm:max-w-md border-0"
      >
        {/* Accessibility headers - visually hidden */}
        <SheetTitle className="sr-only">Settings</SheetTitle>
        <SheetDescription className="sr-only">
          Manage your account settings, preferences, and privacy options
        </SheetDescription>
        
        <SettingsRouter onClose={() => onOpenChange(false)} />
      </SheetContent>
    </Sheet>
  );
}