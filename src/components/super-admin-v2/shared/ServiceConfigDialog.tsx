import React, { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';

interface Technology {
  id: string;
  name: string;
  type: 'service';
  provider: string | null;
  status: 'active' | 'missing';
}

interface ServiceConfigDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  service?: Technology;
  onSave: (data: {
    id?: string;
    name: string;
    type: 'service';
    provider: string;
    apiKey: string;
    environment: 'production' | 'test';
  }) => void;
}

// Provider options by service type
const PROVIDERS_BY_TYPE = {
  email: ['SendGrid', 'Mailgun', 'AWS SES', 'Postmark'],
  ai: ['OpenAI', 'Anthropic', 'Google AI', 'Azure OpenAI'],
  payments: ['Stripe', 'PayPal', 'Square'],
  sms: ['Twilio', 'MessageBird', 'AWS SNS'],
  moderation: ['OpenAI Moderation', 'Perspective API', 'Azure Content Safety'],
  other: ['Custom Provider'],
};

const SERVICE_TYPES = [
  { value: 'email', label: 'Email' },
  { value: 'ai', label: 'AI Provider' },
  { value: 'payments', label: 'Payments' },
  { value: 'sms', label: 'SMS' },
  { value: 'moderation', label: 'Moderation' },
  { value: 'other', label: 'Other' },
];

export function ServiceConfigDialog({
  open,
  onClose,
  mode,
  service,
  onSave,
}: ServiceConfigDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    serviceType: 'email',
    provider: '',
    apiKey: '',
    environment: 'test' as 'production' | 'test',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Pre-fill form data when editing
  useEffect(() => {
    if (mode === 'edit' && service) {
      // Detect service type from service name
      const detectedType = detectServiceType(service.name);
      
      setFormData({
        name: service.name,
        serviceType: detectedType,
        provider: service.provider || '',
        apiKey: '',
        environment: 'test',
      });
    } else if (mode === 'create') {
      setFormData({
        name: '',
        serviceType: 'email',
        provider: '',
        apiKey: '',
        environment: 'test',
      });
    }
  }, [mode, service, open]);

  // Detect service type from name
  const detectServiceType = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('email')) return 'email';
    if (nameLower.includes('ai') || nameLower.includes('openai')) return 'ai';
    if (nameLower.includes('payment') || nameLower.includes('stripe')) return 'payments';
    if (nameLower.includes('sms') || nameLower.includes('twilio')) return 'sms';
    if (nameLower.includes('moderation')) return 'moderation';
    return 'other';
  };

  // Reset provider when service type changes
  const handleServiceTypeChange = (newType: string) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: newType,
      provider: '', // Reset provider when type changes
    }));
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Service name is required';
    }

    if (!formData.provider) {
      newErrors.provider = 'Provider is required';
    }

    if (!formData.apiKey.trim()) {
      newErrors.apiKey = 'API Key is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validate()) {
      toast.error('Please fill all required fields');
      return;
    }

    onSave({
      id: service?.id,
      name: formData.name,
      type: 'service',
      provider: formData.provider,
      apiKey: formData.apiKey,
      environment: formData.environment,
    });

    // Reset form
    setFormData({
      name: '',
      serviceType: 'email',
      provider: '',
      apiKey: '',
      environment: 'test',
    });
    setErrors({});
  };

  const handleClose = () => {
    setErrors({});
    onClose();
  };

  const availableProviders = PROVIDERS_BY_TYPE[formData.serviceType as keyof typeof PROVIDERS_BY_TYPE] || [];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Add New Service' : 'Configure Service'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create'
              ? 'Add a new infrastructure service to your platform'
              : 'Update the configuration for this service'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Service Name */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Service Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="e.g., Email Service, AI Provider"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={errors.name ? 'border-red-500' : ''}
            />
            {errors.name && (
              <p className="text-xs text-red-500">{errors.name}</p>
            )}
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="serviceType">
              Service Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.serviceType}
              onValueChange={handleServiceTypeChange}
            >
              <SelectTrigger id="serviceType">
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Provider */}
          <div className="space-y-2">
            <Label htmlFor="provider">
              Provider <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.provider}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, provider: value }))
              }
            >
              <SelectTrigger
                id="provider"
                className={errors.provider ? 'border-red-500' : ''}
              >
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                {availableProviders.map((provider) => (
                  <SelectItem key={provider} value={provider}>
                    {provider}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.provider && (
              <p className="text-xs text-red-500">{errors.provider}</p>
            )}
          </div>

          {/* API Key */}
          <div className="space-y-2">
            <Label htmlFor="apiKey">
              API Key <span className="text-red-500">*</span>
            </Label>
            <Input
              id="apiKey"
              type="password"
              placeholder="sk_live_••••••••••••••••"
              value={formData.apiKey}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, apiKey: e.target.value }))
              }
              className={errors.apiKey ? 'border-red-500' : ''}
            />
            {errors.apiKey && (
              <p className="text-xs text-red-500">{errors.apiKey}</p>
            )}
            <p className="text-xs text-gray-500">
              Your API key is encrypted and stored securely
            </p>
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <Label>
              Environment <span className="text-red-500">*</span>
            </Label>
            <RadioGroup
              value={formData.environment}
              onValueChange={(value: 'production' | 'test') =>
                setFormData((prev) => ({ ...prev, environment: value }))
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="test" id="test" />
                <Label htmlFor="test" className="font-normal cursor-pointer">
                  Test / Sandbox
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="production" id="production" />
                <Label
                  htmlFor="production"
                  className="font-normal cursor-pointer"
                >
                  Production
                </Label>
              </div>
            </RadioGroup>
            <p className="text-xs text-gray-500">
              Use Test for development, Production for live users
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {mode === 'create' ? 'Add Service' : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
