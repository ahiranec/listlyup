/**
 * SuperAdmin Panel (Refactored)
 * Mock admin panel for controlling feature flags
 * Uses localStorage - will be replaced with Supabase dashboard
 */

import { Sheet, SheetContent, SheetTitle, SheetDescription } from '../ui/sheet';
import { Separator } from '../ui/separator';
import { AdminHeader } from './AdminHeader';
import { ReloadButton } from './ReloadButton';
import { FlagCard } from './FlagCard';
import { FutureFeatures } from './FutureFeatures';
import { useSuperAdmin } from './useSuperAdmin';

interface SuperAdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SuperAdminPanel({ open, onOpenChange }: SuperAdminPanelProps) {
  const {
    flags,
    loading,
    loadFlags,
    toggleFeature,
    updateMinPlan,
    updateRollout,
  } = useSuperAdmin(open);
  
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        {/* Accessibility headers */}
        <SheetTitle className="sr-only">Super Admin Panel</SheetTitle>
        <SheetDescription className="sr-only">
          Manage feature flags and premium plan settings
        </SheetDescription>
        
        <div className="space-y-6">
          {/* Header with Info Alert */}
          <AdminHeader />
          
          {/* Reload Button */}
          <ReloadButton loading={loading} onClick={loadFlags} />
          
          <Separator />
          
          {/* Feature Flags List */}
          <div className="space-y-4">
            {flags.map((flag) => (
              <FlagCard
                key={flag.name}
                flag={flag}
                onToggle={toggleFeature}
                onMinPlanChange={updateMinPlan}
                onRolloutChange={updateRollout}
              />
            ))}
          </div>
          
          <Separator />
          
          {/* Future Supabase Features */}
          <FutureFeatures />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default SuperAdminPanel;