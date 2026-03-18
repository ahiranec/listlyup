import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ServiceConfigDialog } from '../../shared/ServiceConfigDialog';
import { toast } from 'sonner';

interface Technology {
  id: string;
  name: string;
  type: 'service';
  provider: string | null;
  status: 'active' | 'disabled' | 'missing';
  isMvpCanonical: boolean;
  description?: string;
}

// MVP CANONICAL INFRASTRUCTURE PROVIDERS
const mvpTechnologies: Technology[] = [
  {
    id: 'ai',
    name: 'AI Provider',
    type: 'service',
    provider: 'OpenAI',
    status: 'active',
    isMvpCanonical: true,
    description: 'AI for publishing assistance and moderation suggestions',
  },
  {
    id: 'moderation',
    name: 'Moderation Engine',
    type: 'service',
    provider: 'Custom',
    status: 'active',
    isMvpCanonical: true,
    description: 'Content moderation and safety engine',
  },
  {
    id: 'maps',
    name: 'Maps Provider',
    type: 'service',
    provider: 'Google Maps',
    status: 'active',
    isMvpCanonical: true,
    description: 'Geographic maps and location services',
  },
  {
    id: 'email',
    name: 'Email Provider',
    type: 'service',
    provider: 'SendGrid',
    status: 'active',
    isMvpCanonical: true,
    description: 'Email notifications and communications (optional)',
  },
];

// Future infrastructure (not shown in MVP by default)
const futureTechnologies: Technology[] = [
  {
    id: 'payments',
    name: 'Payments',
    type: 'service',
    provider: 'Stripe',
    status: 'disabled',
    isMvpCanonical: false,
    description: 'Payment processing for future monetization',
  },
  {
    id: 'sms',
    name: 'SMS',
    type: 'service',
    provider: null,
    status: 'missing',
    isMvpCanonical: false,
    description: 'SMS notifications (future feature)',
  },
];

export function Infrastructure() {
  const [testingConnection, setTestingConnection] = useState<string | null>(null);
  const [showFutureProviders, setShowFutureProviders] = useState(false);
  
  const [technologies, setTechnologies] = useState<Technology[]>(mvpTechnologies);
  const allTechnologies = showFutureProviders ? [...mvpTechnologies, ...futureTechnologies] : mvpTechnologies;
  
  // Service Config Dialog state
  const [dialogState, setDialogState] = useState<{
    open: boolean;
    mode: 'create' | 'edit';
    service?: Technology;
  }>({ open: false, mode: 'create' });

  const handleTest = async (techId: string) => {
    setTestingConnection(techId);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setTestingConnection(null);
    toast.success('Connection successful');
    console.log('[AUDIT LOG] Infrastructure test:', { techId, result: 'success' });
  };

  const handleToggleStatus = (techId: string) => {
    const tech = allTechnologies.find(t => t.id === techId);
    if (tech && !tech.isMvpCanonical) {
      toast.info(`${tech.name} is a future provider - not operational in MVP`);
      return;
    }
    
    setTechnologies((prev) =>
      prev.map((tech) => {
        if (tech.id === techId) {
          const newStatus = tech.status === 'active' ? 'disabled' : 'active';
          toast.success(`${tech.name} ${newStatus === 'active' ? 'enabled' : 'disabled'}`);
          console.log('[AUDIT LOG] Technology toggled:', {
            techId,
            name: tech.name,
            newStatus,
            timestamp: new Date().toISOString(),
          });
          return { ...tech, status: newStatus };
        }
        return tech;
      })
    );
  };

  const handleConfigure = (tech: Technology) => {
    setDialogState({ open: true, mode: 'edit', service: tech });
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Infrastructure (MVP)</h2>
            <p className="text-sm text-gray-500 mt-1">
              MVP canonical infrastructure providers
            </p>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowFutureProviders(!showFutureProviders)}
          >
            {showFutureProviders ? 'Hide' : 'Show'} Future Providers
          </Button>
        </div>

        {/* MVP Compliance Banner */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  ✅ MVP Canonical Providers Only
                </p>
                <p className="text-xs text-green-700 mt-1">
                  AI Provider, Moderation Engine, Maps Provider, and Email Provider are the canonical MVP infrastructure.
                  Other providers (Payments, SMS) are future features.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Infrastructure Table */}
        <Card>
          <CardHeader>
            <CardTitle>Infrastructure Providers</CardTitle>
            <CardDescription>
              Manage external service integrations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Service</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTechnologies.map((tech) => (
                  <TableRow key={tech.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        {tech.name}
                        {tech.isMvpCanonical && (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                            MVP
                          </Badge>
                        )}
                        {!tech.isMvpCanonical && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200 text-xs">
                            FUTURE
                          </Badge>
                        )}
                      </div>
                      {tech.description && (
                        <p className="text-xs text-gray-500 mt-1">{tech.description}</p>
                      )}
                    </TableCell>
                    <TableCell>
                      {tech.provider ? (
                        <span className="text-sm text-gray-700">{tech.provider}</span>
                      ) : (
                        <span className="text-sm text-gray-400 italic">Not configured</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          tech.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : tech.status === 'disabled'
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {tech.status === 'active'
                          ? 'Active'
                          : tech.status === 'disabled'
                          ? 'Disabled'
                          : 'Missing'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-gray-600 capitalize">{tech.type}</span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {tech.provider && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleTest(tech.id)}
                            disabled={testingConnection === tech.id || !tech.isMvpCanonical}
                          >
                            {testingConnection === tech.id ? 'Testing...' : 'Test'}
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleConfigure(tech)}
                        >
                          Configure
                        </Button>
                        {tech.status !== 'missing' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleToggleStatus(tech.id)}
                            disabled={!tech.isMvpCanonical}
                          >
                            {tech.status === 'active' ? 'Disable' : 'Enable'}
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Warning for missing critical providers */}
            {allTechnologies.some((t) => t.status === 'missing' && t.isMvpCanonical) && (
              <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-sm text-yellow-800">
                  Some critical MVP providers are not configured. This may affect platform functionality.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Provider Statistics */}
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {mvpTechnologies.length}
                </div>
                <div className="text-xs text-gray-500 mt-1">MVP Providers</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {allTechnologies.filter((t) => t.status === 'active' && t.isMvpCanonical).length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Active MVP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-yellow-600">
                  {allTechnologies.filter((t) => t.status === 'missing' && t.isMvpCanonical).length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Missing MVP</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-600">
                  {futureTechnologies.length}
                </div>
                <div className="text-xs text-gray-500 mt-1">Future Providers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Info Box */}
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-4">
            <p className="text-xs text-blue-800">
              <strong>ⓘ MVP Infrastructure:</strong> AI Provider, Moderation Engine, Maps Provider, and Email Provider are critical for MVP functionality. Future providers like Payments and SMS are configured but not operational.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Service Config Dialog */}
      <ServiceConfigDialog
        open={dialogState.open}
        mode={dialogState.mode}
        service={dialogState.service}
        onClose={() => setDialogState({ open: false, mode: 'create' })}
        onSave={(config) => {
          console.log('[AUDIT LOG] Service configuration saved:', config);
          toast.success('Configuration saved successfully');
          setDialogState({ open: false, mode: 'create' });
        }}
      />
    </>
  );
}
