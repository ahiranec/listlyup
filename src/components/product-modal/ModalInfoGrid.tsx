/**
 * Modal Info Grid Component
 * Displays visibility, groups, and location
 */

import { Eye, MapPin, Users } from 'lucide-react';
import type { Product } from '../../data/products';
import { getGroupById } from '../../data/groups';
import { mockCurrentUser } from '../../data/currentUser';

interface ModalInfoGridProps {
  product: Product;
  onGroupClick?: (groupId: string, groupName: string) => void;
}

export function ModalInfoGrid({ product, onGroupClick }: ModalInfoGridProps) {
  const groupNames = product.visibility === 'group' && product.groupIds 
    ? product.groupIds.map(id => ({ id, name: getGroupById(id)?.name || '' })).filter(g => g.name)
    : [];

  const userGroupIds = mockCurrentUser.groupIds || [];

  return (
    <div className="space-y-3">
      {/* First Row: Visibility and Location */}
      <div className="grid grid-cols-2 gap-3">
        {/* Visibility */}
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <Eye className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground capitalize">
            {product.visibility}
          </span>
        </div>

        {/* Location */}
        {product.location && (
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-medium text-foreground truncate">
              {product.location}
            </span>
          </div>
        )}
      </div>

      {/* Second Row: Groups (only if visibility is "group") - Compact Style */}
      {groupNames.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
          <Users className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          <div className="flex-1 min-w-0 flex items-center gap-1 flex-wrap">
            <span className="text-xs text-foreground whitespace-nowrap">
              Shared in {groupNames.length} {groupNames.length === 1 ? 'group' : 'groups'}:{' '}
            </span>
            {groupNames.map((group, index) => {
              const isMember = userGroupIds.includes(group.id);
              return (
                <span key={group.id} className="inline-flex items-center">
                  {isMember ? (
                    <button
                      onClick={() => onGroupClick?.(group.id, group.name)}
                      className="text-xs font-medium text-primary hover:underline transition-colors"
                    >
                      {group.name}
                    </button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      {group.name}
                    </span>
                  )}
                  {index < groupNames.length - 1 && (
                    <span className="text-xs text-muted-foreground">, </span>
                  )}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}