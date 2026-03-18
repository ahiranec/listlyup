/**
 * Address Form Flow
 * Simplified wizard for adding/editing addresses
 * TODO: Extract LocationSearch and MapPicker as shared components for full implementation
 */

import { useState } from 'react';
import { ArrowLeft, MapPin, Home, Building2, Warehouse, Package } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useProfile } from '../../contexts/ProfileContext';
import { Address } from './types';
import { validateAddressLabel } from './utils/validation';
import { toast } from 'sonner@2.0.3';

interface AddressFormFlowProps {
  addressId?: string;
  onBack: () => void;
}

export function AddressFormFlow({ addressId, onBack }: AddressFormFlowProps) {
  const { profile, updateProfile } = useProfile();
  
  const existingAddress = addressId 
    ? profile.addresses.find(a => a.id === addressId)
    : null;

  const [formData, setFormData] = useState<Partial<Address>>(
    existingAddress || {
      label: '',
      type: 'house',
      formattedAddress: '',
      coordinates: { latitude: -33.0472, longitude: -71.6127 }, // Viña del Mar default
      isGatedCommunity: false,
      hasDoorman: false,
      deliveryInstructions: '',
      contact: { name: '', phone: '' },
      isDefaultForPublishing: false,
    }
  );

  const [labelError, setLabelError] = useState('');

  const handleSave = () => {
    // Validate
    const labelValidation = validateAddressLabel(formData.label || '');
    if (!labelValidation.valid) {
      setLabelError(labelValidation.error || '');
      return;
    }

    if (!formData.formattedAddress) {
      toast.error('Please enter an address');
      return;
    }

    const newAddress: Address = {
      id: existingAddress?.id || `addr_${Date.now()}`,
      label: formData.label || '',
      type: formData.type || 'house',
      formattedAddress: formData.formattedAddress || '',
      coordinates: formData.coordinates || { latitude: 0, longitude: 0 },
      isGatedCommunity: formData.isGatedCommunity || false,
      hasDoorman: formData.hasDoorman || false,
      deliveryInstructions: formData.deliveryInstructions || '',
      contact: formData.contact || { name: '', phone: '' },
      isDefaultForPublishing: formData.isDefaultForPublishing || false,
      createdAt: existingAddress?.createdAt || new Date().toISOString(),
    };

    // Update profile
    const newAddresses = existingAddress
      ? profile.addresses.map(a => a.id === addressId ? newAddress : a)
      : [...profile.addresses, newAddress];

    // If setting as default, unset others
    if (newAddress.isDefaultForPublishing) {
      newAddresses.forEach(a => {
        if (a.id !== newAddress.id) {
          a.isDefaultForPublishing = false;
        }
      });
    }

    updateProfile({ addresses: newAddresses });
    toast.success(existingAddress ? 'Address updated' : 'Address added');
    onBack();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold">
            {existingAddress ? 'Edit Address' : 'Add Address'}
          </h1>
          <Button size="sm" onClick={handleSave} className="h-9 px-4">
            Save
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Label */}
        <div className="space-y-2">
          <Label htmlFor="label">Label *</Label>
          <Input
            id="label"
            value={formData.label}
            onChange={(e) => {
              setFormData({ ...formData, label: e.target.value });
              setLabelError('');
            }}
            placeholder="e.g., Casa, Oficina, Warehouse"
            className={labelError ? 'border-red-500' : ''}
          />
          {labelError && <p className="text-xs text-red-600">{labelError}</p>}
        </div>

        {/* Address */}
        <div className="space-y-2">
          <Label htmlFor="address">Address *</Label>
          <Input
            id="address"
            value={formData.formattedAddress}
            onChange={(e) => setFormData({ ...formData, formattedAddress: e.target.value })}
            placeholder="Av. Libertad 123, Viña del Mar"
          />
          <p className="text-xs text-muted-foreground">
            Full map integration coming soon
          </p>
        </div>

        {/* Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value: 'house' | 'building' | 'warehouse' | 'other') =>
              setFormData({ ...formData, type: value })
            }
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="house">
                <div className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  House
                </div>
              </SelectItem>
              <SelectItem value="building">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Building / Apartment
                </div>
              </SelectItem>
              <SelectItem value="warehouse">
                <div className="flex items-center gap-2">
                  <Warehouse className="w-4 h-4" />
                  Warehouse / Store
                </div>
              </SelectItem>
              <SelectItem value="other">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  Other
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Building Features */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="gated">Gated community / Condo</Label>
            <Switch
              id="gated"
              checked={formData.isGatedCommunity}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isGatedCommunity: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="doorman">Building has doorman</Label>
            <Switch
              id="doorman"
              checked={formData.hasDoorman}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, hasDoorman: checked })
              }
            />
          </div>
        </div>

        {/* Delivery Instructions */}
        <div className="space-y-2">
          <Label htmlFor="instructions">Delivery Instructions</Label>
          <Textarea
            id="instructions"
            value={formData.deliveryInstructions}
            onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
            placeholder="e.g., Ring bell, Apartment 5B..."
            rows={2}
          />
        </div>

        {/* Contact */}
        <div className="space-y-3">
          <h3 className="font-medium">Contact for this address</h3>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input
              id="contactName"
              value={formData.contact?.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact!, name: e.target.value }
                })
              }
              placeholder="Name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input
              id="contactPhone"
              value={formData.contact?.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  contact: { ...formData.contact!, phone: e.target.value }
                })
              }
              placeholder="+56 9 1234 5678"
            />
          </div>
        </div>

        {/* Set as Default */}
        <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div>
            <Label htmlFor="default">Set as default for publishing</Label>
            <p className="text-xs text-muted-foreground">
              Pre-fill this address in new listings
            </p>
          </div>
          <Switch
            id="default"
            checked={formData.isDefaultForPublishing}
            onCheckedChange={(checked) =>
              setFormData({ ...formData, isDefaultForPublishing: checked })
            }
          />
        </div>
      </main>
    </div>
  );
}