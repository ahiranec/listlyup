/**
 * Organization Form Flow
 * Create or edit organization
 */

import { useState } from 'react';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useProfile } from '../../contexts/ProfileContext';
import { Organization } from './types';
import { toast } from 'sonner@2.0.3';

interface OrganizationFormFlowProps {
  organizationId?: string;
  onBack: () => void;
}

export function OrganizationFormFlow({ organizationId, onBack }: OrganizationFormFlowProps) {
  const { profile, updateProfile } = useProfile();
  
  // Find existing org if editing
  const existingOrg = organizationId 
    ? profile.organizations.find(o => o.id === organizationId)
    : undefined;

  const [formData, setFormData] = useState({
    name: existingOrg?.name || '',
    type: existingOrg?.type || 'store' as 'store' | 'agency' | 'other',
    customType: existingOrg?.customType || '',
    description: existingOrg?.description || '',
    logoUrl: existingOrg?.logoUrl || '',
  });

  const [setAsActive, setSetAsActive] = useState(!existingOrg);

  const handleSubmit = () => {
    if (!formData.name.trim()) {
      toast.error('Organization name is required');
      return;
    }

    if (formData.type === 'other' && !formData.customType.trim()) {
      toast.error('Please specify the organization type');
      return;
    }

    const newOrg: Organization = {
      id: organizationId || `org-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      customType: formData.type === 'other' ? formData.customType : undefined,
      description: formData.description || undefined,
      logoUrl: formData.logoUrl || undefined,
      role: existingOrg?.role || 'owner',
      createdAt: existingOrg?.createdAt || new Date().toISOString(),
    };

    let updatedOrgs: Organization[];
    if (organizationId) {
      // Edit existing
      updatedOrgs = profile.organizations.map(o => 
        o.id === organizationId ? newOrg : o
      );
    } else {
      // Create new
      updatedOrgs = [...profile.organizations, newOrg];
    }

    updateProfile({
      organizations: updatedOrgs,
      ...(setAsActive ? { activeOrganizationId: newOrg.id } : {}),
    });

    toast.success(organizationId ? 'Organization updated' : 'Organization created');
    onBack();
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold ml-3">
              {organizationId ? 'Edit Organization' : 'Create Organization'}
            </h1>
          </div>
          <Button 
            size="sm"
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
          >
            {organizationId ? 'Save' : 'Create'}
          </Button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        {/* Organization Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Organization Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Mi Tienda"
            maxLength={50}
          />
          <p className="text-xs text-muted-foreground">
            {formData.name.length}/50
          </p>
        </div>

        {/* Type */}
        <div className="space-y-3">
          <Label>Type *</Label>
          <RadioGroup 
            value={formData.type} 
            onValueChange={(value: any) => setFormData({ ...formData, type: value })}
          >
            <div className={`p-3 border rounded-lg cursor-pointer transition-all ${
              formData.type === 'store' ? 'border-primary bg-primary/5' : 'border-border'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="store" id="store" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="store" className="cursor-pointer font-medium">
                    Store
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Retail, e-commerce
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-3 border rounded-lg cursor-pointer transition-all ${
              formData.type === 'agency' ? 'border-primary bg-primary/5' : 'border-border'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="agency" id="agency" className="mt-0.5" />
                <div className="flex-1">
                  <Label htmlFor="agency" className="cursor-pointer font-medium">
                    Agency
                  </Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Marketing, creative services
                  </p>
                </div>
              </div>
            </div>

            <div className={`p-3 border rounded-lg cursor-pointer transition-all ${
              formData.type === 'other' ? 'border-primary bg-primary/5' : 'border-border'
            }`}>
              <div className="flex items-start gap-3">
                <RadioGroupItem value="other" id="other" className="mt-0.5" />
                <div className="flex-1 space-y-2">
                  <Label htmlFor="other" className="cursor-pointer font-medium">
                    Other
                  </Label>
                  {formData.type === 'other' && (
                    <Input
                      value={formData.customType}
                      onChange={(e) => setFormData({ ...formData, customType: e.target.value })}
                      placeholder="Custom type..."
                      maxLength={30}
                    />
                  )}
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description (optional)</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Tell us about your organization..."
            maxLength={200}
            rows={3}
          />
          <p className="text-xs text-muted-foreground">
            {formData.description.length}/200
          </p>
        </div>

        {/* Logo Upload (Placeholder) */}
        <div className="space-y-2">
          <Label htmlFor="logo">Logo (optional)</Label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium">Upload Image</p>
            <p className="text-xs text-muted-foreground mt-1">
              Recommended: 512x512px
            </p>
          </div>
        </div>

        {/* Set as Active */}
        {!organizationId && (
          <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
            <input
              type="checkbox"
              id="setActive"
              checked={setAsActive}
              onChange={(e) => setSetAsActive(e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex-1">
              <Label htmlFor="setActive" className="cursor-pointer font-medium">
                Set as active for publishing
              </Label>
              <p className="text-xs text-muted-foreground mt-0.5">
                New listings will show this organization
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}