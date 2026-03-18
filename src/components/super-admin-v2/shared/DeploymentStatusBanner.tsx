import React from 'react';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

interface DeploymentStatusBannerProps {
  technology: string;
  status: 'deploying' | 'success' | 'failed';
}

export function DeploymentStatusBanner({
  technology,
  status,
}: DeploymentStatusBannerProps) {
  const configs = {
    deploying: {
      icon: Loader2,
      iconClass: 'animate-spin text-blue-600',
      bgClass: 'bg-blue-50 border-blue-200',
      textClass: 'text-blue-800',
      message: `Deploying infrastructure change (${technology})...`,
    },
    success: {
      icon: CheckCircle2,
      iconClass: 'text-green-600',
      bgClass: 'bg-green-50 border-green-200',
      textClass: 'text-green-800',
      message: `Deployment successful: ${technology} provider switched`,
    },
    failed: {
      icon: XCircle,
      iconClass: 'text-red-600',
      bgClass: 'bg-red-50 border-red-200',
      textClass: 'text-red-800',
      message: `Deployment failed for ${technology}`,
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <Alert className={`rounded-none border-l-0 border-r-0 border-t-0 ${config.bgClass}`}>
      <Icon className={`h-4 w-4 ${config.iconClass}`} />
      <AlertDescription className="flex items-center justify-between">
        <span className={`text-sm ${config.textClass}`}>
          <strong>{config.message}</strong>
        </span>
        <Button
          variant="outline"
          size="sm"
          className="ml-4"
        >
          View Details
        </Button>
      </AlertDescription>
    </Alert>
  );
}
