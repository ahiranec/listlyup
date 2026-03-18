/**
 * AddressCard Component
 * Card displaying a saved address with actions
 */

import { MapPin, Edit, Trash2, Star } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Address } from '../types';

interface AddressCardProps {
  address: Address;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}

export function AddressCard({ address, onEdit, onDelete, onSetDefault }: AddressCardProps) {
  const getTypeIcon = () => {
    switch (address.type) {
      case 'house':
        return '🏠';
      case 'building':
        return '🏢';
      case 'warehouse':
        return '🏭';
      default:
        return '📍';
    }
  };

  return (
    <div className={`border rounded-lg p-4 ${
      address.isDefaultForPublishing 
        ? 'border-primary bg-primary/5' 
        : 'border-gray-200 bg-white'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">{getTypeIcon()}</span>
          <h3 className="font-medium">{address.label}</h3>
          {address.isDefaultForPublishing && (
            <Badge variant="default" className="text-xs">
              <Star className="w-3 h-3 mr-1" />
              Default
            </Badge>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onEdit}
            className="h-8 w-8 p-0"
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-2">{address.formattedAddress}</p>

      {address.deliveryInstructions && (
        <p className="text-xs text-muted-foreground italic mb-2">
          "{address.deliveryInstructions}"
        </p>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <MapPin className="w-3 h-3" />
        {address.isGatedCommunity && <span>• Gated</span>}
        {address.hasDoorman && <span>• Doorman</span>}
      </div>

      {!address.isDefaultForPublishing && (
        <Button
          variant="outline"
          size="sm"
          onClick={onSetDefault}
          className="w-full mt-3 h-8"
        >
          Set as default for publishing
        </Button>
      )}
    </div>
  );
}
