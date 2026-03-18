/**
 * ActionButtons Component
 * Renderiza botones inline según el contexto y permisos
 */

import { useState } from 'react';
import { Button } from '../ui/button';
import { ActionQuickSheet } from './ActionQuickSheet';
import { ActionFullSheet } from './ActionFullSheet';
import { ACTION_REGISTRY, getAction } from '../../actions/registry';
import { hasPermission, getCurrentPermissionContext } from '../../actions/permissions';
import type { ActionId, ActionEntity, ActionContext } from '../../actions/types';
import { WhatsAppIcon } from '../icons/WhatsAppIcon';
import { useGlobalActionModal } from '../global-action-modal';

interface ActionButtonsProps {
  context: ActionContext;
  entity: ActionEntity;
  actionIds?: ActionId[];
  layout?: 'horizontal' | 'vertical';
  isOwner?: boolean;
  className?: string;
  customHandlers?: Partial<Record<ActionId, () => void>>; // NEW: Custom handlers para acciones específicas
}

export function ActionButtons({
  context,
  entity,
  actionIds,
  layout = 'horizontal',
  isOwner = false,
  className = '',
  customHandlers = {}, // NEW
}: ActionButtonsProps) {
  const [activeAction, setActiveAction] = useState<ActionId | null>(null);
  const { dispatch } = useGlobalActionModal();

  // Get permission context
  const permissionContext = getCurrentPermissionContext({
    ...entity,
    userId: isOwner ? 'user-123' : 'other-user',
  });

  // Determine which actions to show
  const actionsToShow = actionIds
    ? actionIds.map((id) => getAction(id)).filter(Boolean)
    : Object.values(ACTION_REGISTRY).filter((action) =>
        action.contexts.includes(context)
      );

  // Filter by permissions
  const allowedActions = actionsToShow.filter((action) => {
    if (!action) return false;
    if (!action.permission) return true;
    return hasPermission(action.permission, permissionContext);
  });

  const handleActionClick = (actionId: ActionId) => {
    // NEW: Check if there's a custom handler
    if (customHandlers[actionId]) {
      customHandlers[actionId]!();
      return;
    }
    
    const action = getAction(actionId);
    if (!action) return;

    if (action.uiPattern === 'inline') {
      // Execute directly
      action.handler(entity);
    } else if (action.uiPattern === 'alert') {
      // Route to Global Action Modal with correct payload structure
      dispatch({
        actionId: actionId as any,
        context: {
          listingId: entity.id,
          listingTitle: entity.title,
        },
        onConfirm: () => {
          // Handler logic executed after confirmation
          action.handler(entity);
        },
      });
    } else {
      // Open modal/sheet
      setActiveAction(actionId);
    }
  };

  const handleConfirm = () => {
    const action = activeAction ? getAction(activeAction) : null;
    if (action) {
      action.handler(entity);
    }
    setActiveAction(null);
  };

  const handleSubmit = (data: any) => {
    const action = activeAction ? getAction(activeAction) : null;
    if (action) {
      action.handler(entity, data);
    }
    setActiveAction(null);
  };

  const activeActionDef = activeAction ? getAction(activeAction) : null;

  return (
    <>
      <div
        className={`flex ${
          layout === 'horizontal' ? 'flex-row gap-2' : 'flex-col gap-2'
        } ${className}`}
      >
        {allowedActions.map((action) => {
          if (!action) return null;

          const Icon = action.icon;
          const isWhatsApp = action.id === 'open-whatsapp';

          return (
            <Button
              key={action.id}
              variant={action.variant || 'default'}
              size="sm"
              onClick={() => handleActionClick(action.id)}
              className={`${layout === 'horizontal' ? 'flex-1' : ''} ${
                isWhatsApp ? 'bg-green-600 hover:bg-green-700 text-white border-0' : ''
              }`}
            >
              {isWhatsApp ? (
                <WhatsAppIcon className="w-4 h-4 mr-2" />
              ) : (
                <Icon className="w-4 h-4 mr-2" />
              )}
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Modals */}
      {activeActionDef && activeActionDef.uiPattern === 'quick-sheet' && (
        <ActionQuickSheet
          open={!!activeAction}
          onOpenChange={() => setActiveAction(null)}
          action={activeActionDef}
          entity={entity}
          onSubmit={handleSubmit}
        />
      )}

      {activeActionDef && activeActionDef.uiPattern === 'full-sheet' && (
        <ActionFullSheet
          open={!!activeAction}
          onOpenChange={() => setActiveAction(null)}
          action={activeActionDef}
          entity={entity}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
}