import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

interface CreatePlanDialogProps {
  open: boolean;
  onClose: () => void;
  onPlanCreated?: () => void;
}

export function CreatePlanDialog({
  open,
  onClose,
  onPlanCreated,
}: CreatePlanDialogProps) {
  const [planName, setPlanName] = useState('');
  const [active, setActive] = useState(true);
  const [hardLimits, setHardLimits] = useState({
    listings: '50',
    groups: '3',
  });
  const [softLimits, setSoftLimits] = useState({
    storage: '1',
  });

  const handleCreate = () => {
    if (!planName.trim()) {
      toast.error('Plan name is required');
      return;
    }

    // In real app: API call to create plan + audit log entry
    toast.success(`Plan "${planName}" created successfully`);
    
    onPlanCreated?.();
    onClose();
    
    // Reset form
    setPlanName('');
    setActive(true);
    setHardLimits({ listings: '50', groups: '3' });
    setSoftLimits({ storage: '1' });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New Plan</DialogTitle>
          <DialogDescription>
            Define plan properties and limits
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Plan Name */}
          <div>
            <Label htmlFor="plan-name">Plan Name</Label>
            <Input
              id="plan-name"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="e.g., Premium, Business"
              className="mt-2"
            />
          </div>

          {/* Active Status */}
          <div className="flex items-center justify-between">
            <div>
              <Label>Active on Creation</Label>
              <p className="text-xs text-gray-500">
                Plan will be available for assignment immediately
              </p>
            </div>
            <Switch checked={active} onCheckedChange={setActive} />
          </div>

          {/* Hard Limits */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Hard Limits</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="listings-limit">Listings</Label>
                <Input
                  id="listings-limit"
                  type="number"
                  value={hardLimits.listings}
                  onChange={(e) =>
                    setHardLimits((prev) => ({ ...prev, listings: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="groups-limit">Groups</Label>
                <Input
                  id="groups-limit"
                  type="number"
                  value={hardLimits.groups}
                  onChange={(e) =>
                    setHardLimits((prev) => ({ ...prev, groups: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          {/* Soft Limits */}
          <div className="pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Soft Limits</h4>
            <div>
              <Label htmlFor="storage-limit">Storage (GB)</Label>
              <Input
                id="storage-limit"
                type="number"
                value={softLimits.storage}
                onChange={(e) =>
                  setSoftLimits((prev) => ({ ...prev, storage: e.target.value }))
                }
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                User gets warning but can exceed
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create Plan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
