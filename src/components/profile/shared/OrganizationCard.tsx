/**
 * Organization Card Component
 * Display organization info with actions
 */

import { Building, Store, Palette, MoreVertical, CheckCircle } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Organization } from '../types';

interface OrganizationCardProps {
  organization: Organization;
  isActive: boolean;
  onEdit: () => void;
}

export function OrganizationCard({ organization, isActive, onEdit }: OrganizationCardProps) {
  const getIcon = () => {
    switch (organization.type) {
      case 'store':
        return <Store className="w-5 h-5" />;
      case 'agency':
        return <Palette className="w-5 h-5" />;
      default:
        return <Building className="w-5 h-5" />;
    }
  };

  const getTypeLabel = () => {
    if (organization.type === 'other' && organization.customType) {
      return organization.customType;
    }
    return organization.type.charAt(0).toUpperCase() + organization.type.slice(1);
  };

  const getRoleLabel = () => {
    return organization.role.charAt(0).toUpperCase() + organization.role.slice(1);
  };

  return (
    <div className={`border rounded-xl p-4 transition-all ${
      isActive 
        ? 'border-primary bg-primary/5' 
        : 'border-border hover:border-primary/50'
    }`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="shrink-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
          {organization.logoUrl ? (
            <img 
              src={organization.logoUrl} 
              alt={organization.name}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            getIcon()
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-medium truncate">{organization.name}</h3>
            {isActive && (
              <Badge variant="default" className="shrink-0 text-xs">
                <CheckCircle className="w-3 h-3 mr-1" />
                Active
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <span>{getTypeLabel()}</span>
            <span>•</span>
            <span>{getRoleLabel()}</span>
          </div>

          {organization.description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
              {organization.description}
            </p>
          )}

          {isActive && (
            <p className="text-xs text-primary">
              New listings will show as "{organization.name}"
            </p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 pt-3 border-t">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          onClick={onEdit}
        >
          Edit Details
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1"
        >
          {isActive ? 'Deactivate' : 'Set as Active'}
        </Button>
      </div>
    </div>
  );
}
