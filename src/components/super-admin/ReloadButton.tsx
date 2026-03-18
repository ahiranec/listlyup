/**
 * Reload Button Component
 * Button to refresh feature flags
 */

import { RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface ReloadButtonProps {
  loading: boolean;
  onClick: () => void;
}

export function ReloadButton({ loading, onClick }: ReloadButtonProps) {
  return (
    <div className="flex justify-end">
      <Button
        variant="outline"
        size="sm"
        onClick={onClick}
        disabled={loading}
        className="gap-2"
      >
        <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        Reload
      </Button>
    </div>
  );
}
