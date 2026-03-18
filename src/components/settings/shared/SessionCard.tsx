/**
 * Session Card
 * Display session information with logout action
 */

import { Monitor, Smartphone, Tablet, MoreVertical } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Session } from '../types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui/dropdown-menu';

interface SessionCardProps {
  session: Session;
  onLogout: () => void;
}

export function SessionCard({ session, onLogout }: SessionCardProps) {
  const getDeviceIcon = () => {
    const device = session.device.toLowerCase();
    if (device.includes('iphone') || device.includes('android')) {
      return Smartphone;
    }
    if (device.includes('ipad') || device.includes('tablet')) {
      return Tablet;
    }
    return Monitor;
  };

  const DeviceIcon = getDeviceIcon();

  const formatLastActive = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-start justify-between gap-3">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <DeviceIcon className="w-5 h-5 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium truncate">{session.device}</h3>
            {session.isCurrentDevice && (
              <Badge variant="secondary" className="text-xs">
                Current
              </Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{session.location}</p>
          <p className="text-xs text-muted-foreground">
            {formatLastActive(session.lastActive)}
          </p>
        </div>

        {/* Actions */}
        {!session.isCurrentDevice && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onLogout} className="text-red-600">
                Log out this device
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}
