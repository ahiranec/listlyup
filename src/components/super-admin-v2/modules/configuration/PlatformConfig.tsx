import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ConfirmationDialog } from '../../shared/ConfirmationDialog';
import { toast } from 'sonner';

type PlatformMode = 'closed_beta' | 'limited_beta' | 'public';

interface PlatformConfigProps {
  freezeStates?: {
    registrations: boolean;
    publishing: boolean;
    groupCreation: boolean;
  };
  onFreezeStatesChange?: (states: {
    registrations: boolean;
    publishing: boolean;
    groupCreation: boolean;
  }) => void;
}

export function PlatformConfig({ freezeStates: externalFreezeStates, onFreezeStatesChange }: PlatformConfigProps) {
  const [platformMode, setPlatformMode] = useState<PlatformMode>('public');
  
  // Use external freeze states if provided, otherwise use internal state
  const [internalFreezeStates, setInternalFreezeStates] = useState({
    registrations: false,
    publishing: false,
    groupCreation: false,
  });
  
  const freezeStates = externalFreezeStates ?? internalFreezeStates;
  const setFreezeStates = onFreezeStatesChange ?? setInternalFreezeStates;
  
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    type: 'mode' | 'freeze' | null;
    freezeType?: keyof typeof freezeStates;
  }>({ open: false, type: null });

  const handleModeChange = (newMode: PlatformMode) => {
    setPlatformMode(newMode);
    setConfirmDialog({ open: true, type: 'mode' });
  };

  const handleFreezeToggle = (freezeType: keyof typeof freezeStates) => {
    const newValue = !freezeStates[freezeType];
    if (newValue) {
      // Enabling freeze - show confirmation
      setConfirmDialog({ open: true, type: 'freeze', freezeType });
    } else {
      // Disabling freeze - direct toggle
      setFreezeStates({ ...freezeStates, [freezeType]: false });
      toast.success(`${freezeType} freeze disabled`);
      console.log('[AUDIT LOG] Platform freeze disabled:', {
        freezeType,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const handleConfirmFreeze = () => {
    if (confirmDialog.freezeType) {
      setFreezeStates({
        ...freezeStates,
        [confirmDialog.freezeType]: true,
      });
      toast.success(`${confirmDialog.freezeType} freeze enabled`);
      console.log('[AUDIT LOG] Platform freeze enabled:', {
        freezeType: confirmDialog.freezeType,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const modeLabels: Record<PlatformMode, string> = {
    closed_beta: 'Closed Beta',
    limited_beta: 'Limited Beta',
    public: 'Public',
  };

  const modeColors: Record<PlatformMode, string> = {
    closed_beta: 'bg-red-100 text-red-800',
    limited_beta: 'bg-yellow-100 text-yellow-800',
    public: 'bg-green-100 text-green-800',
  };

  return (
    <div className="space-y-6">
      {/* Platform Mode */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Mode</CardTitle>
          <CardDescription>
            Control who can access the platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Current Mode</p>
              <Badge className={`mt-2 ${modeColors[platformMode]}`} variant="secondary">
                {modeLabels[platformMode]}
              </Badge>
            </div>
            <Select value={platformMode} onValueChange={(v) => handleModeChange(v as PlatformMode)}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="closed_beta">Closed Beta</SelectItem>
                <SelectItem value="limited_beta">Limited Beta</SelectItem>
                <SelectItem value="public">Public</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              <strong>Closed Beta:</strong> Invite-only access
              <br />
              <strong>Limited Beta:</strong> Registration available with approval
              <br />
              <strong>Public:</strong> Open registration
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Freeze Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Freeze Controls</CardTitle>
          <CardDescription>
            Temporarily disable platform features
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Freeze Registrations */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Freeze New Registrations</p>
              <p className="text-sm text-gray-500">
                Prevent new users from signing up
              </p>
            </div>
            <Switch
              checked={freezeStates.registrations}
              onCheckedChange={() => handleFreezeToggle('registrations')}
            />
          </div>

          {/* Freeze Publishing */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Freeze Publishing</p>
              <p className="text-sm text-gray-500">
                Prevent users from creating new listings
              </p>
            </div>
            <Switch
              checked={freezeStates.publishing}
              onCheckedChange={() => handleFreezeToggle('publishing')}
            />
          </div>

          {/* Freeze Group Creation */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div>
              <p className="font-medium text-gray-900">Freeze Group Creation</p>
              <p className="text-sm text-gray-500">
                Prevent users from creating new groups
              </p>
            </div>
            <Switch
              checked={freezeStates.groupCreation}
              onCheckedChange={() => handleFreezeToggle('groupCreation')}
            />
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialogs */}
      {confirmDialog.type === 'mode' && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          onConfirm={() => toast.success('Platform mode updated')}
          title="Change Platform Mode?"
          description={`You are about to change platform mode to ${modeLabels[platformMode]}. This will affect user access immediately.`}
          severity="critical"
          confirmText="PUBLIC"
        />
      )}

      {confirmDialog.type === 'freeze' && confirmDialog.freezeType && (
        <ConfirmationDialog
          open={confirmDialog.open}
          onClose={() => setConfirmDialog({ open: false, type: null })}
          onConfirm={handleConfirmFreeze}
          title={`Freeze ${confirmDialog.freezeType}?`}
          description="This will immediately prevent this action across the entire platform. Users will see a message that this feature is temporarily unavailable."
          severity="critical"
          confirmText="FREEZE"
        />
      )}
    </div>
  );
}