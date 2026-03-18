/**
 * GroupHeader Component
 * Header fijo con botón back y menú de acciones
 * 
 * CONTRATO FINAL (MVP):
 * - share-group: SIEMPRE visible para todos
 * - report-group: SIEMPRE visible para todos los roles (member, moderator, admin, visitor)
 * - pin-group/mute-group: Disponibles para todos los miembros
 * - group-settings: Solo admin
 */

import { ArrowLeft, MoreVertical, Share2, Flag, Settings, LogOut, Pin, PinOff, Bell, BellOff, Shield } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { actionRegistry } from "../../actions/registry";
import { isMember as checkIsMember, isAdmin as checkIsAdmin } from "../../lib/groupPermissions";
import type { Group } from "../../lib/groupPermissions";

interface GroupHeaderProps {
  groupName: string;
  groupId: string;
  userRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  groupVisibility?: "public" | "private";
  isPinned?: boolean;
  isMuted?: boolean;
  onBack: () => void;
  onShare?: () => void;
  onPin?: () => void;
  onMute?: () => void;
  onSettings?: () => void;
  onLeave?: () => void;
  onReport?: () => void;
  group?: Group; // ✅ Necesario para evaluar permisos
  onOpenModeration?: () => void; // ✅ DUAL FLOW: Platform admin/moderator can open moderation chat
  isPlatformAdmin?: boolean; // ✅ DUAL FLOW: Indicates if user is platform admin/moderator
}

export function GroupHeader({
  groupName,
  groupId,
  userRole = "visitor",
  groupVisibility = "public",
  isPinned = false,
  isMuted = false,
  onBack,
  onShare,
  onPin,
  onMute,
  onSettings,
  onLeave,
  onReport,
  group,
  onOpenModeration,
  isPlatformAdmin,
}: GroupHeaderProps) {
  const isMember = checkIsMember(userRole);
  const isAdminUser = checkIsAdmin(userRole);

  /**
   * Handle actions using registry
   */
  const handleAction = async (actionId: string) => {
    const action = actionRegistry[actionId as keyof typeof actionRegistry];
    if (action?.handler) {
      await action.handler({ id: groupId, type: "group", name: groupName });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b h-14">
      <div className="flex items-center justify-between h-full px-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="icon-button hover:bg-muted transition-fast"
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        {/* Group Name (truncated) */}
        <h1 className="flex-1 text-center mx-4 truncate font-medium">
          {groupName}
        </h1>

        {/* Actions Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-10 w-10">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            {/* Share Group (todos) */}
            {onShare && (
              <DropdownMenuItem onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Group
              </DropdownMenuItem>
            )}

            {/* Pin/Unpin Group (members only) */}
            {isMember && onPin && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onPin}>
                  {isPinned ? (
                    <>
                      <PinOff className="w-4 h-4 mr-2" />
                      Unpin Group
                    </>
                  ) : (
                    <>
                      <Pin className="w-4 h-4 mr-2" />
                      Pin Group
                    </>
                  )}
                </DropdownMenuItem>
              </>
            )}

            {/* Mute/Unmute Group (members only) */}
            {isMember && onMute && (
              <DropdownMenuItem onClick={onMute}>
                {isMuted ? (
                  <>
                    <Bell className="w-4 h-4 mr-2" />
                    Unmute Group
                  </>
                ) : (
                  <>
                    <BellOff className="w-4 h-4 mr-2" />
                    Mute Group
                  </>
                )}
              </DropdownMenuItem>
            )}

            {/* Settings (admin only) */}
            {isAdminUser && onSettings && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onSettings}>
                  <Settings className="w-4 h-4 mr-2" />
                  Group Settings
                </DropdownMenuItem>
              </>
            )}

            {/* Report Group (TODOS - CONTRATO CRÍTICO) */}
            {onReport && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onReport}
                  className="text-red-600 focus:text-red-600"
                >
                  <Flag className="w-4 h-4 mr-2" />
                  Report Group
                </DropdownMenuItem>
              </>
            )}

            {/* Leave Group (members only) */}
            {isMember && onLeave && (
              <DropdownMenuItem
                onClick={onLeave}
                className="text-red-600 focus:text-red-600"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Leave Group
              </DropdownMenuItem>
            )}

            {/* Open Moderation (platform admin/moderator only) */}
            {isPlatformAdmin && onOpenModeration && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={onOpenModeration}
                  className="text-red-600 focus:text-red-600"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Open Moderation
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}