import React, { useState } from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from 'sonner';

interface Technology {
  id: string;
  name: string;
  provider: string | null;
}

interface SwitchProviderDialogProps {
  technology: Technology;
  onClose: () => void;
}

const providerOptions: Record<string, string[]> = {
  email: ['SendGrid', 'Resend', 'Mailgun'],
  ai: ['OpenAI', 'Anthropic'],
  payments: ['Stripe', 'PayPal'],
  sms: ['Twilio', 'MessageBird'],
};

export function SwitchProviderDialog({
  technology,
  onClose,
}: SwitchProviderDialogProps) {
  const [selectedProvider, setSelectedProvider] = useState(
    technology.provider || providerOptions[technology.id]?.[0] || ''
  );
  const [apiKey, setApiKey] = useState('');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [checks, setChecks] = useState({
    verified: false,
    deployment: false,
  });
  const [isDeploying, setIsDeploying] = useState(false);

  const providers = providerOptions[technology.id] || [];
  const canTest = selectedProvider && apiKey.length > 0;
  const canConfirm = testStatus === 'success' && checks.verified && checks.deployment;

  const handleTest = async () => {
    setTestStatus('testing');
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setTestStatus('success');
  };

  const handleConfirm = async () => {
    setIsDeploying(true);
    
    // Simulate deployment
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    toast.success(`${technology.name} provider switched to ${selectedProvider}`);
    setIsDeploying(false);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Switch {technology.name} Provider</DialogTitle>
          <DialogDescription>
            Current provider: {technology.provider || 'None'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Provider Selection */}
          <div>
            <Label>New Provider</Label>
            <RadioGroup
              value={selectedProvider}
              onValueChange={setSelectedProvider}
              className="mt-2 space-y-2"
            >
              {providers.map((provider) => (
                <div key={provider} className="flex items-center space-x-2">
                  <RadioGroupItem value={provider} id={provider} />
                  <Label htmlFor={provider} className="font-normal cursor-pointer">
                    {provider}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* API Key */}
          <div>
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter API key..."
              className="mt-2"
            />
          </div>

          {/* Test Connection */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleTest}
              disabled={!canTest || testStatus === 'testing'}
              className="flex-1"
            >
              {testStatus === 'testing' && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              {testStatus === 'success' && (
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
              )}
              Test Connection
            </Button>
            {testStatus === 'success' && (
              <span className="text-sm text-green-600 font-medium">✓ Success</span>
            )}
          </div>

          {/* Deployment Warning */}
          <Alert>
            <AlertDescription className="text-sm">
              <strong>⚠️ DEPLOYMENT IMPACT</strong>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Triggers automatic deployment</li>
                <li>• Estimated time: ~2 minutes</li>
                <li>• Brief service interruption expected</li>
                <li>• All tech config changes are audited</li>
              </ul>
            </AlertDescription>
          </Alert>

          {/* Confirmations */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <Checkbox
                id="check-verified"
                checked={checks.verified}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, verified: checked === true }))
                }
                disabled={testStatus !== 'success'}
              />
              <label
                htmlFor="check-verified"
                className="text-sm text-gray-700 cursor-pointer leading-tight"
              >
                I have verified the new credentials
              </label>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="check-deployment"
                checked={checks.deployment}
                onCheckedChange={(checked) =>
                  setChecks((prev) => ({ ...prev, deployment: checked === true }))
                }
                disabled={testStatus !== 'success'}
              />
              <label
                htmlFor="check-deployment"
                className="text-sm text-gray-700 cursor-pointer leading-tight"
              >
                I understand this triggers a deployment
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isDeploying}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!canConfirm || isDeploying}>
            {isDeploying && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isDeploying ? 'Deploying...' : 'Confirm & Deploy'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
