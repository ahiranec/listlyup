/**
 * ActionMenu Component
 * Dropdown menu reutilizable con acciones filtradas por permisos
 */

import { useState } from 'react';
import { MoreVertical, type LucideIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { ActionQuickSheet } from './ActionQuickSheet';
import { ActionFullSheet } from './ActionFullSheet';
import { getAction } from '../../actions/registry';
import { hasPermission, getCurrentPermissionContext } from '../../actions/permissions';
import type { ActionId, ActionEntity, ActionContext } from '../../actions/types';
import { useGlobalActionModal } from '../global-action-modal';

interface ActionMenuProps {
  entity: ActionEntity;
  actionIds: ActionId[];
  context?: ActionContext;
  isOwner?: boolean;
  triggerIcon?: LucideIcon;
  triggerVariant?: 'ghost' | 'outline' | 'default';
  align?: 'start' | 'end' | 'center';
  onActionComplete?: () => void; // Callback cuando se completa una acción
  customHandlers?: Partial<Record<ActionId, (entity: ActionEntity) => void>>; // NEW: Override handlers
}

export function ActionMenu({
  entity,
  actionIds,
  context = 'my-listings',
  isOwner = false,
  triggerIcon: TriggerIcon = MoreVertical,
  triggerVariant = 'ghost',
  align = 'end',
  onActionComplete,
  customHandlers,
}: ActionMenuProps) {
  const [activeAction, setActiveAction] = useState<ActionId | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useGlobalActionModal();

  // Get permission context
  const permissionContext = getCurrentPermissionContext({
    ...entity,
    userId: isOwner ? 'user-123' : 'other-user',
  });

  // Get actions and filter by permissions
  const actions = actionIds
    .map((id) => getAction(id))
    .filter((action) => {
      if (!action) return false;
      if (!action.permission) return true;
      return hasPermission(action.permission, permissionContext);
    });

  const handleActionClick = (actionId: ActionId) => {
    const action = getAction(actionId);
    if (!action) return;

    setIsOpen(false);

    // Check if there's a custom handler for this action
    if (customHandlers && customHandlers[actionId]) {
      customHandlers[actionId]!(entity);
      onActionComplete?.();
      return;
    }

    if (action.uiPattern === 'inline') {
      // Execute directly
      action.handler(entity);
      onActionComplete?.();
    } else if (action.uiPattern === 'alert') {
      // Route to Global Action Modal with correct payload structure
      dispatch({
        actionId: actionId as any,
        context: {
          listingId: entity.id,
          listingTitle: entity.title,
          groupId: entity.groupId,
          groupName: entity.groupName,
        },
        onConfirm: () => {
          // Handler logic executed after confirmation
          action.handler(entity);
          onActionComplete?.();
        },
      });
    } else if (action.uiPattern === 'navigation') {
      // For navigation actions with custom handlers
      action.handler(entity);
      onActionComplete?.();
    } else {
      // Open modal/sheet
      setActiveAction(actionId);
    }
  };

  const handleConfirm = () => {
    const action = activeAction ? getAction(activeAction) : null;
    if (action) {
      action.handler(entity);
      onActionComplete?.();
    }
    setActiveAction(null);
  };

  const handleSubmit = (data: any) => {
    const action = activeAction ? getAction(activeAction) : null;
    if (action) {
      action.handler(entity, data);
      onActionComplete?.();
    }
    setActiveAction(null);
  };

  const activeActionDef = activeAction ? getAction(activeAction) : null;

  // Find separator position (before destructive actions)
  const destructiveIndex = actions.findIndex((a) => a?.variant === 'destructive');

  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={triggerVariant} size="icon" className="h-8 w-8 flex-shrink-0">
            <TriggerIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={align} className="w-48">
          {actions.map((action, index) => {
            if (!action) return null;

            const Icon = action.icon;
            const isDestructive = action.variant === 'destructive';
            const showSeparator = destructiveIndex !== -1 && index === destructiveIndex;

            return (
              <div key={action.id}>
                {showSeparator && <DropdownMenuSeparator />}
                <DropdownMenuItem
                  onClick={() => handleActionClick(action.id)}
                  className={isDestructive ? 'text-red-600 focus:text-red-600' : ''}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {action.label}
                </DropdownMenuItem>
              </div>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

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