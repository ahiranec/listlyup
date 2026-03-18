/**
 * Trail Actions
 * Actions specific to My Trail (closed listings)
 */

import { Eye, RotateCcw, Trash2, type LucideIcon } from 'lucide-react';
import type { ActionDefinition } from './types';

/**
 * Trail Action IDs
 */
export type TrailActionId = 
  | 'view-trail-listing'
  | 'republish-listing'
  | 'delete-trail-listing';

/**
 * Trail Actions Registry
 * Only 3 actions available for closed listings
 */
export const TRAIL_ACTIONS: Record<TrailActionId, ActionDefinition> = {
  'view-trail-listing': {
    id: 'view-trail-listing',
    label: 'View',
    icon: Eye,
    variant: 'ghost',
    uiPattern: 'navigation',
    permission: 'isOwner',
    group: 'trail-management',
    contexts: ['my-trail'],
    handler: (context) => {
      // Navigate to ProductDetailPage in read-only mode
      if (context.onNavigateToDetail && context.entityId) {
        context.onNavigateToDetail(context.entityId);
      }
    },
  },

  'republish-listing': {
    id: 'republish-listing',
    label: 'Re-publish',
    icon: RotateCcw,
    variant: 'default',
    uiPattern: 'navigation',
    permission: 'isOwner',
    group: 'trail-management',
    contexts: ['my-trail'],
    handler: (context) => {
      // Navigate to PublishFlow pre-filled with listing data
      if (context.onRepublish && context.entityId) {
        context.onRepublish(context.entityId);
      }
    },
  },

  'delete-trail-listing': {
    id: 'delete-trail-listing',
    label: 'Delete',
    icon: Trash2,
    variant: 'destructive',
    uiPattern: 'confirm-dialog',
    permission: 'isOwner',
    group: 'trail-management',
    contexts: ['my-trail'],
    confirmDialog: {
      title: 'Delete Permanently?',
      description: 'This listing will be permanently deleted. This action cannot be undone.',
      confirmLabel: 'Delete',
      cancelLabel: 'Cancel',
    },
    handler: (context) => {
      // Permanent delete
      if (context.onDelete && context.entityId) {
        context.onDelete(context.entityId);
      }
    },
  },
};

/**
 * Get action IDs for Trail context
 */
export function getTrailActionIds(): TrailActionId[] {
  return ['view-trail-listing', 'republish-listing', 'delete-trail-listing'];
}
