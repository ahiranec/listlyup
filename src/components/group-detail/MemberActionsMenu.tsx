/**
 * MemberActionsMenu - Menú de acciones de moderación para miembros
 * 
 * CONTRATO:
 * - Moderator (si canModerate): message-member, remove-member (solo members)
 * - Admin: message-member, remove-member, change-role (member ↔ moderator)
 * - NO enviar al Action Center
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

interface MemberActionsMenuProps {
  member: {
    id: string;
    name: string;
    username?: string;
    role: "member" | "moderator" | "admin";
  };
  currentUserRole: UserRole;
  groupId: string;
  group?: Group; // ✅ Necesario para evaluar permisos
  onAction?: (actionId: string, memberId: string) => void;
  onNavigateToChat?: (chatId: string) => void; // ✅ DUAL FLOW: Callback for navigation to moderation chat
}

export function MemberActionsMenu({
  member,
  currentUserRole,
  groupId,
  group,
  onAction,
  onNavigateToChat, // ✅ DUAL FLOW: Destructure navigation callback
}: MemberActionsMenuProps) {
  const isAdminUser = checkIsAdmin(currentUserRole);
  
  // Evaluar permisos según Group Settings (si existe group object)
  // Fallback: lógica legacy si no hay group
  const canModerateMembers = group 
    ? canModerate(currentUserRole, group)
    : (currentUserRole === "moderator" || currentUserRole === "admin");

  /**
   * Get available actions based on current user role and target member role
   * 
   * CONTRATO:
   * - Moderator (con permisos) puede remove-member solo si target es "member"
   * - Moderator NO puede tocar otro moderator ni admin
   * - Admin puede todo: remove member/moderator, change-role
   */
  const getAvailableActions = (): ActionId[] => {
    const actions: ActionId[] = [];

    // Si no tiene permisos de moderación, no mostrar acciones
    if (!canModerateMembers) {
      return [];
    }

    // Message member: Disponible para moderator/admin con permisos
    actions.push('message-member');

    // Remove member: Disponible si target es "member" (no moderator ni admin)
    if (member.role === "member") {
      actions.push('remove-member');
    }

    // Change role: SOLO Admin, y solo si target NO es admin
    if (isAdminUser && member.role !== "admin") {
      actions.push('change-role');
    }

    // Remove moderator: SOLO Admin
    if (isAdminUser && member.role === "moderator") {
      actions.push('remove-member'); // Ya estaba agregado, pero es relevante mencionarlo
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
      id: member.id,
      type: 'user',
      name: member.name,
      username: member.username,
      role: member.role,
      groupId,
    });

    // ✅ DUAL FLOW: If handler returns chatId (from message-member), navigate
    if (actionId === 'message-member' && typeof result === 'string' && onNavigateToChat) {
      onNavigateToChat(result);
    }

    // Callback to parent for UI updates
    onAction?.(actionId, member.id);
  };

  /**
   * Get action label based on member role
   */
  const getActionLabel = (actionId: ActionId): string => {
    if (actionId === 'change-role') {
      return member.role === 'moderator' ? 'Demote to Member' : 'Promote to Moderator';
    }
    
    if (actionId === 'remove-member' && member.role === 'moderator') {
      return 'Remove Moderator';
    }
    
    const action = actionRegistry[actionId];
    return action?.label || actionId;
  };

  /**
   * Determine if divider should be shown after an action
   */
  const shouldShowDividerAfter = (actionId: ActionId): boolean => {
    // Divider before destructive actions
    return actionId === 'change-role' || actionId === 'message-member';
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
          const label = getActionLabel(actionId);
          const isDestructive = actionId === 'remove-member';

          return (
            <div key={actionId}>
              <DropdownMenuItem
                onClick={() => handleAction(actionId)}
                className={isDestructive ? "text-red-600 focus:text-red-600" : ""}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                {label}
              </DropdownMenuItem>

              {/* Automatic dividers */}
              {shouldShowDividerAfter(actionId) && index < availableActions.length - 1 && (
                <DropdownMenuSeparator />
              )}
            </div>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}