/**
 * ListingActionsMenu - Menú de acciones de moderación para listings
 * 
 * CONTRATO:
 * - Member: report-listing
 * - Moderator (si canModerate): report-listing, message-owner, hide-listing
 * - Admin: report-listing, message-owner, hide-listing, remove-listing
 * - pause/delete: SOLO owner (no incluido aquí)
 * - NO enviar al Action Center (excepto report-listing que escala a plataforma)
 * 
 * ARQUITECTURA:
 * - Usa canModerate() helper para evaluar permisos según Group Settings
 */

import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { actionRegistry } from "../../actions/registry";
import type { ActionId } from "../../actions/types";
import { canModerate, isAdmin as checkIsAdmin } from "../../lib/groupPermissions";
import type { Group, UserRole } from "../../lib/groupPermissions";

interface ListingActionsMenuProps {
  listing: {
    id: string;
    title: string;
    ownerId?: string;
    ownerName?: string;
  };
  currentUserRole: UserRole;
  groupId: string;
  group?: Group; // ✅ Necesario para evaluar permisos
  onAction?: (actionId: string, listingId: string) => void;
  onNavigateToChat?: (chatId: string) => void; // ✅ DUAL FLOW: Callback for navigation to moderation chat
}

export function ListingActionsMenu({
  listing,
  currentUserRole,
  groupId,
  group,
  onAction,
  onNavigateToChat, // ✅ DUAL FLOW: Destructure navigation callback
}: ListingActionsMenuProps) {
  const isAdminUser = checkIsAdmin(currentUserRole);
  
  // Evaluar permisos según Group Settings (si existe group object)
  // Fallback: lógica legacy si no hay group
  const canModerateListings = group 
    ? canModerate(currentUserRole, group)
    : (currentUserRole === "moderator" || currentUserRole === "admin");

  /**
   * Get available actions based on current user role
   * 
   * CONTRATO:
   * - Member: SOLO report-listing
   * - Moderator (con permisos): report, message, hide
   * - Admin: report, message, hide, remove
   */
  const getAvailableActions = (): ActionId[] => {
    const actions: ActionId[] = [];

    // report-listing: Disponible para TODOS (member, moderator, admin)
    actions.push('report-listing');

    // Moderator/Admin actions (si tienen permisos de moderación)
    if (canModerateListings) {
      actions.push('message-owner');
      actions.push('hide-listing');
    }

    // Admin-only actions (remove siempre es admin, independiente de whoCanModerate)
    if (isAdminUser) {
      actions.push('remove-listing');
    }

    return actions;
  };

  const availableActions = getAvailableActions();

  // Si no hay acciones disponibles, no mostrar menú
  if (availableActions.length === 0) {
    return null;
  }

  /**
   * Handle action execution
   */
  const handleAction = async (actionId: ActionId) => {
    const action = actionRegistry[actionId];
    
    if (!action) {
      console.warn(`Action ${actionId} not found in registry`);
      return;
    }

    // Execute handler from registry
    const result = await action.handler({
      id: listing.id,
      type: 'listing',
      title: listing.title,
      ownerId: listing.ownerId,
      ownerName: listing.ownerName,
      groupId,
      metadata: {
        ownerId: listing.ownerId,
      },
    });

    // ✅ DUAL FLOW: If handler returns chatId (from message-owner), navigate
    if (actionId === 'message-owner' && typeof result === 'string' && onNavigateToChat) {
      onNavigateToChat(result);
    }

    // Callback to parent for UI updates
    onAction?.(actionId, listing.id);
  };

  /**
   * Determine if divider should be shown after an action
   */
  const shouldShowDividerAfter = (actionId: ActionId, index: number): boolean => {
    // Divider after report-listing (if not last)
    if (actionId === 'report-listing' && index < availableActions.length - 1) {
      return true;
    }
    
    // Divider before destructive actions (hide/remove)
    const nextAction = availableActions[index + 1];
    if (nextAction === 'hide-listing' || nextAction === 'remove-listing') {
      return true;
    }
    
    return false;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-48">
        {availableActions.map((actionId, index) => {
          const action = actionRegistry[actionId];
          if (!action) return null;

          const Icon = action.icon;
          const isDestructive = actionId === 'remove-listing';
          const isReport = actionId === 'report-listing';

          return (
            <div key={actionId}>
              <DropdownMenuItem
                onClick={() => handleAction(actionId)}
                className={
                  isDestructive || isReport
                    ? "text-red-600 focus:text-red-600"
                    : ""
                }
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {action.label}
              </DropdownMenuItem>

              {/* Automatic dividers */}
              {shouldShowDividerAfter(actionId, index) && (
                <DropdownMenuSeparator />
              )}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}