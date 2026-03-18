import { MoreVertical, Pin, PinOff, Bell, BellOff, X, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { actionRegistry } from "../../actions/registry";
import type { ActionId } from "../../actions/types";
import { toast } from "sonner@2.0.3";
import { useState } from "react";
import ShareGroupSheet from "../share/ShareGroupSheet";
import { ReportGroupSheet } from "./ReportGroupSheet";

interface GroupQuickActionsMenuProps {
  group: {
    id: string;
    name: string;
    role: 'admin' | 'moderator' | 'member';
    status: 'joined' | 'pending' | 'invited';
    isPinned?: boolean;
    isMuted?: boolean;
    reportCount?: number; // NEW: For conditional view-reports action
  };
  onInviteMembers?: () => void;
  onMute?: () => void;
  onPin?: () => void;
  onLeave?: () => void;
  onCancelRequest?: () => void;
  onAcceptInvite?: () => void;
  onDeclineInvite?: () => void;
}

/**
 * GroupQuickActionsMenu - Menú de 3 puntitos para grupos
 * 
 * Sistema centralizado de acciones con:
 * - CONTRATO FINAL: report-group disponible para TODOS los roles
 * - Diferenciación por rol (Member, Moderator, Admin)
 * - Integración total con Action Center
 * - Acciones condicionales (view-reports solo si reportCount > 0)
 */
export function GroupQuickActionsMenu({
  group,
  onInviteMembers,
  onMute,
  onPin,
  onLeave,
  onCancelRequest,
  onAcceptInvite,
  onDeclineInvite,
}: GroupQuickActionsMenuProps) {
  const isCriticalRole = group.role === 'admin' || group.role === 'moderator';
  
  // Estados para los modals
  const [shareSheetOpen, setShareSheetOpen] = useState(false);
  const [reportSheetOpen, setReportSheetOpen] = useState(false);

  /**
   * Get actions based on role and group status
   * CONTRATO FINAL:
   * - Member: 5 acciones (share, pin, mute, report, leave)
   * - Moderator: 6 acciones (share, pin, mute, view-reports*, report, leave)
   * - Admin: 6 acciones (share, pin, mute, view-reports*, report, leave)
   */
  const getActionsForRole = (): ActionId[] => {
    if (group.status !== 'joined') {
      return []; // No actions for non-joined groups (handled separately below)
    }

    const role = group.role;

    // MEMBER (5 actions)
    if (role === 'member') {
      return [
        'share-group',
        'pin-group',
        'mute-group',
        'report-group',  // ✅ AVAILABLE for members
        'leave-group',
      ];
    }

    // MODERATOR (6 actions)
    if (role === 'moderator') {
      const actions: ActionId[] = [
        'share-group',
        'pin-group',
        'mute-group',
      ];
      
      // Conditional: only show view-reports if reportCount > 0
      if (group.reportCount && group.reportCount > 0) {
        actions.push('view-group-reports');
      }
      
      actions.push('report-group');  // ✅ AVAILABLE for moderators (escalate to platform)
      actions.push('leave-group');
      return actions;
    }

    // ADMIN (6 actions)
    if (role === 'admin') {
      const actions: ActionId[] = [
        'share-group',
        'pin-group',
        'mute-group',
      ];
      
      // Conditional: only show view-reports if reportCount > 0
      if (group.reportCount && group.reportCount > 0) {
        actions.push('view-group-reports');
      }
      
      actions.push('report-group');  // ✅ AVAILABLE for admins (escalate to platform)
      actions.push('leave-group');
      return actions;
    }

    return [];
  };

  /**
   * Determine if a divider should be shown after an action
   * Based on UX hierarchy:
   * - After invite-members (social section)
   * - After mute-group (personal section)
   * - Before leave-group (destructive section)
   */
  const shouldShowDividerAfter = (actionId: ActionId, index: number, actions: ActionId[]): boolean => {
    const nextAction = actions[index + 1];
    
    // Divider after social actions (invite-members)
    if (actionId === 'invite-members') return true;
    
    // Divider after personal actions (mute-group)
    if (actionId === 'mute-group') return true;
    
    // Divider before destructive (leave-group)
    if (nextAction === 'leave-group') return true;
    
    return false;
  };

  /**
   * Handle action execution
   * Routes to centralized handlers or local callbacks
   */
  const handleAction = async (actionId: ActionId) => {
    const action = actionRegistry[actionId];
    
    if (!action) {
      console.warn(`Action ${actionId} not found in registry`);
      return;
    }

    // Route to existing callbacks (legacy support during migration)
    switch (actionId) {
      case 'share-group':
        // ✅ Open ShareGroupSheet modal
        setShareSheetOpen(true);
        break;
      case 'report-group':
        // ✅ Open ReportGroupSheet modal
        setReportSheetOpen(true);
        break;
      case 'invite-members':
        onInviteMembers?.();
        break;
      case 'mute-group':
        onMute?.();
        break;
      case 'pin-group':
        onPin?.();
        break;
      case 'leave-group':
        onLeave?.();
        break;
      default:
        // Use centralized handler from registry
        await action.handler(group);
    }
  };

  /**
   * Get label for dynamic actions (pin/mute)
   */
  const getActionLabel = (actionId: ActionId): string => {
    if (actionId === 'pin-group') {
      return group.isPinned ? 'Unpin' : 'Pin';
    }
    if (actionId === 'mute-group') {
      return group.isMuted ? 'Unmute' : 'Mute';
    }
    
    const action = actionRegistry[actionId];
    return action?.label || actionId;
  };

  /**
   * Get icon for dynamic actions
   */
  const getActionIcon = (actionId: ActionId) => {
    const action = actionRegistry[actionId];
    if (!action) return null;
    
    // Override icon for toggle actions
    if (actionId === 'pin-group') {
      return group.isPinned ? PinOff : Pin;
    }
    if (actionId === 'mute-group') {
      return group.isMuted ? Bell : BellOff;
    }
    
    return action.icon;
  };

  // ==================== SPECIAL CASES (non-joined groups) ====================

  // Para pending request
  if (group.status === 'pending' && onCancelRequest) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem onClick={onCancelRequest}>
            <X className="mr-2 h-4 w-4" />
            Cancel Request
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Para invited
  if (group.status === 'invited' && (onAcceptInvite || onDeclineInvite)) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="w-8 h-8 p-0 flex-shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <MoreVertical className="w-4 h-4" />
            <span className="sr-only">More options</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          {onAcceptInvite && (
            <DropdownMenuItem onClick={onAcceptInvite}>
              <Check className="mr-2 h-4 w-4" />
              Accept Invite
            </DropdownMenuItem>
          )}
          {onDeclineInvite && (
            <DropdownMenuItem onClick={onDeclineInvite} className="text-red-600 focus:text-red-600">
              <X className="mr-2 h-4 w-4" />
              Decline Invite
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // ==================== MAIN MENU (joined groups) ====================

  const actions = getActionsForRole();

  if (actions.length === 0) {
    return null; // No menu for non-joined groups
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="w-8 h-8 p-0 flex-shrink-0"
          onClick={(e) => e.stopPropagation()}
        >
          <MoreVertical className="w-4 h-4" />
          <span className="sr-only">More options</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {actions.map((actionId, index) => {
          const action = actionRegistry[actionId];
          if (!action) return null;

          const Icon = getActionIcon(actionId);
          const label = getActionLabel(actionId);
          const isDestructive = actionId === 'leave-group';
          const showBadge = actionId === 'view-group-reports' && group.reportCount;

          return (
            <div key={actionId}>
              <DropdownMenuItem
                onClick={() => handleAction(actionId)}
                className={isDestructive ? "text-red-600 focus:text-red-600" : ""}
              >
                {Icon && <Icon className="mr-2 h-4 w-4" />}
                <span className="flex-1">{label}</span>
                
                {/* Badge for view-reports */}
                {showBadge && (
                  <Badge variant="destructive" className="ml-2 h-5 min-w-5 px-1.5">
                    {group.reportCount}
                  </Badge>
                )}
                
                {/* Warning for critical roles muting */}
                {actionId === 'mute-group' && !group.isMuted && isCriticalRole && (
                  <span className="ml-auto text-yellow-600 text-xs">⚠️</span>
                )}
              </DropdownMenuItem>

              {/* Automatic dividers based on hierarchy */}
              {shouldShowDividerAfter(actionId, index, actions) && (
                <DropdownMenuSeparator />
              )}
            </div>
          );
        })}
      </DropdownMenuContent>

      <ShareGroupSheet
        open={shareSheetOpen}
        onOpenChange={setShareSheetOpen}
        group={group}
      />
      <ReportGroupSheet
        open={reportSheetOpen}
        onOpenChange={setReportSheetOpen}
        group={group}
      />
    </DropdownMenu>
  );
}