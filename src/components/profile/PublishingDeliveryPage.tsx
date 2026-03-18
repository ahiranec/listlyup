/**
 * Publishing - Default Access Methods Page
 * CANONICAL ALIGNED
 */

import { ArrowLeft, MapPin, Users, Truck, Wifi } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { useProfile } from '../../contexts/ProfileContext';
import type { AccessMode } from '../../types/canonical';

interface PublishingDeliveryPageProps {
  onBack: () => void;
}

export function PublishingDeliveryPage({ onBack }: PublishingDeliveryPageProps) {
  const { profile, updateProfile } = useProfile();

  const handleToggle = (mode: AccessMode) => {
    const currentModes = profile.default_access_mode;
    const newModes = currentModes.includes(mode)
      ? currentModes.filter(m => m !== mode)
      : [...currentModes, mode];
    
    updateProfile({
      default_access_mode: newModes,
    });
  };

  const isChecked = (mode: AccessMode) => profile.default_access_mode.includes(mode);

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Default Access Methods</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        <div className="text-sm text-muted-foreground mb-4">
          Choose how buyers can access your items. You can select multiple options.
        </div>

        {/* Pickup */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
          <Checkbox
            id="pickup"
            checked={isChecked('pickup')}
            onCheckedChange={() => handleToggle('pickup')}
          />
          <label htmlFor="pickup" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-red-600" />
              <span className="font-medium">Pickup</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Buyer picks up at your location
            </p>
          </label>
        </div>

        {/* Meetup */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
          <Checkbox
            id="meetup"
            checked={isChecked('meetup')}
            onCheckedChange={() => handleToggle('meetup')}
          />
          <label htmlFor="meetup" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-orange-600" />
              <span className="font-medium">Meetup</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Meet at a neutral public location
            </p>
          </label>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
          <Checkbox
            id="delivery"
            checked={isChecked('delivery')}
            onCheckedChange={() => handleToggle('delivery')}
          />
          <label htmlFor="delivery" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="w-4 h-4 text-blue-600" />
              <span className="font-medium">Delivery</span>
            </div>
            <p className="text-sm text-muted-foreground">
              You deliver within your area or ship via courier
            </p>
          </label>
        </div>

        {/* Virtual */}
        <div className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
          <Checkbox
            id="virtual"
            checked={isChecked('virtual')}
            onCheckedChange={() => handleToggle('virtual')}
          />
          <label htmlFor="virtual" className="flex-1 cursor-pointer">
            <div className="flex items-center gap-2 mb-1">
              <Wifi className="w-4 h-4 text-purple-600" />
              <span className="font-medium">Virtual / Digital</span>
            </div>
            <p className="text-sm text-muted-foreground">
              For services or digital products delivered online
            </p>
          </label>
        </div>

        <div className="pt-4 border-t border-border">
          <h3 className="text-sm font-medium mb-2">Selected: {profile.default_access_mode.length}</h3>
          <p className="text-sm text-muted-foreground">
            These options will be pre-selected when you publish new listings. You can adjust them for each listing individually.
          </p>
        </div>
      </main>
    </div>
  );
}
