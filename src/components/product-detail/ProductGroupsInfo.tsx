/**
 * Product Groups Info Component
 * Shows visibility status - either Public or which groups it's shared in
 * Groups that user belongs to are shown in blue (clickable), others in gray
 */

import { Users, Eye } from 'lucide-react';
import type { Product } from '../../data/products';
import { getGroupById } from '../../data/groups';
import { mockCurrentUser } from '../../data/currentUser';

interface ProductGroupsInfoProps {
  product: Product;
  onGroupClick?: (groupId: string, groupName: string) => void;
}

export function ProductGroupsInfo({ product, onGroupClick }: ProductGroupsInfoProps) {
  // If public, show public visibility
  if (product.visibility === 'public') {
    return (
      <div className="flex items-center gap-1.5 text-xs">
        <Eye className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
        <span className="text-foreground">Public</span>
      </div>
    );
  }

  // If group visibility, show groups
  if (product.visibility === 'group' && product.groupIds && product.groupIds.length > 0) {
    const userGroupIds = mockCurrentUser.groupIds || [];

    return (
      <div className="flex items-center gap-1.5 text-xs flex-wrap">
        <Users className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
        <span className="text-foreground">
          Shared in {product.groupIds.length} {product.groupIds.length === 1 ? 'group' : 'groups'}:
        </span>
        
        {/* Show each group as a badge */}
        {product.groupIds.map((groupId, index) => {
          const group = getGroupById(groupId);
          if (!group) return null;
          
          const isMember = userGroupIds.includes(groupId);
          
          return (
            <span key={groupId} className="inline-flex items-center">
              {isMember ? (
                <button
                  onClick={() => onGroupClick?.(groupId, group.name)}
                  className="text-xs text-primary hover:underline font-medium transition-colors"
                >
                  {group.name}
                </button>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {group.name}
                </span>
              )}
              {index < product.groupIds.length - 1 && (
                <span className="text-xs text-muted-foreground">, </span>
              )}
            </span>
          );
        })}
      </div>
    );
  }

  // Private or other visibility types
  return null;
}