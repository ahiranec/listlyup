/**
 * Saved Search Card
 * Display saved search with toggle alert and delete actions
 */

import { MapPin, Bell, BellOff, Trash2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { SavedSearch } from '../types';

interface SavedSearchCardProps {
  search: SavedSearch;
  onDelete: () => void;
  onToggleAlert: () => void;
  masterAlertsEnabled: boolean;
}

export function SavedSearchCard({ search, onDelete, onToggleAlert, masterAlertsEnabled }: SavedSearchCardProps) {
  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric' 
    });
  };

  const isAlertActive = search.notifyEnabled && masterAlertsEnabled;
  const isDisabled = !masterAlertsEnabled;

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-xl">
      <div className="flex items-start justify-between gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-medium truncate">{search.query}</h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <MapPin className="w-3 h-3" />
            <span>{search.location}</span>
          </div>

          {search.priceRange && (
            <p className="text-xs text-muted-foreground">
              Price: {search.priceRange}
            </p>
          )}

          <p className="text-xs text-muted-foreground mt-1">
            Created {formatDate(search.createdAt)}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Alert Toggle Button */}
          <Button
            variant={isAlertActive ? "default" : "secondary"}
            size="sm"
            onClick={onToggleAlert}
            disabled={isDisabled}
            className={`h-8 px-3 text-xs ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={isDisabled ? 'Enable Saved Search Alerts in Notification Preferences first' : search.notifyEnabled ? 'Disable alerts for this search' : 'Enable alerts for this search'}
          >
            {search.notifyEnabled ? (
              <>
                <Bell className="w-3 h-3 mr-1" />
                Alerts
              </>
            ) : (
              <>
                <BellOff className="w-3 h-3 mr-1" />
                Alerts
              </>
            )}
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Delete this saved search"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}