/**
 * Admin Header Component
 * Header with title and info alert
 */

import { Shield, Info } from 'lucide-react';
import { SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import { Alert, AlertDescription } from '../ui/alert';

export function AdminHeader() {
  return (
    <div className="space-y-6">
      <SheetHeader>
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <SheetTitle>SuperAdmin Panel</SheetTitle>
        </div>
        <SheetDescription>Configure advanced feature flags and system settings</SheetDescription>
      </SheetHeader>
      
      {/* Info Alert */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          <p className="font-medium mb-1">Development Mode</p>
          <p className="text-sm">
            This is a mock admin panel using localStorage. When Supabase is connected,
            this will become a real admin dashboard with database persistence and audit logs.
          </p>
        </AlertDescription>
      </Alert>
    </div>
  );
}
