/**
 * MemberActionsSheet Component
 * Bottom sheet con acciones disponibles para un miembro
 */

import { motion } from "motion/react";
import { User, Package, UserPlus, AlertCircle, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface Member {
  id: string;
  name: string;
  username?: string;
  avatarUrl?: string;
  role: "member" | "moderator" | "admin";
  joinedAt?: Date;
}

interface MemberActionsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  currentUserRole?: "member" | "moderator" | "admin";
  userAdminGroups?: Array<{ id: string; name: string }>; // Grupos donde el usuario actual es admin/mod
  onViewProfile?: (memberId: string) => void;
  onViewProducts?: (memberId: string) => void;
  onInviteToGroup?: (memberId: string) => void;
  onReportUser?: (memberId: string) => void;
}

export function MemberActionsSheet({
  open,
  onOpenChange,
  member,
  currentUserRole = "member",
  userAdminGroups = [],
  onViewProfile,
  onViewProducts,
  onInviteToGroup,
  onReportUser,
}: MemberActionsSheetProps) {
  if (!member) return null;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (date?: Date) => {
    if (!date) return "Recently";
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  const roleColors = {
    admin: "bg-red-500/10 text-red-700 dark:text-red-400",
    moderator: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    member: "bg-green-500/10 text-green-700 dark:text-green-400",
  };

  const roleLabels = {
    admin: "Admin",
    moderator: "Moderator",
    member: "Member",
  };

  // Mostrar "Invite to Another Group" solo si el usuario es admin/mod de otros grupos
  const canInviteToOtherGroups = userAdminGroups.length > 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent 
        side="bottom" 
        className="h-auto max-h-[85vh] rounded-t-3xl p-0"
      >
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-start gap-4">
            <Avatar className="w-16 h-16 flex-shrink-0">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-lg">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 min-w-0 pt-1">
              <SheetTitle className="text-left mb-1 flex items-center gap-2">
                <span className="truncate">{member.name}</span>
                <Badge
                  variant="secondary"
                  className={`${roleColors[member.role]} text-xs flex-shrink-0`}
                >
                  {roleLabels[member.role]}
                </Badge>
              </SheetTitle>
              <SheetDescription className="sr-only">
                Actions available for this member
              </SheetDescription>
              <div className="space-y-0.5">
                {member.username && (
                  <p className="text-sm text-muted-foreground">
                    @{member.username}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Joined {formatDate(member.joinedAt)}
                </p>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-4 space-y-2">
          {/* View Profile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                onViewProfile?.(member.id);
                onOpenChange(false);
              }}
            >
              <User className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>View Profile</span>
            </Button>
          </motion.div>

          {/* View Products */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start h-12"
              onClick={() => {
                onViewProducts?.(member.id);
                onOpenChange(false);
              }}
            >
              <Package className="w-5 h-5 mr-3 text-muted-foreground" />
              <span>View Products in Group</span>
            </Button>
          </motion.div>

          {/* Invite to Another Group - Solo si tiene grupos donde es admin */}
          {canInviteToOtherGroups && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                variant="ghost"
                className="w-full justify-start h-12"
                onClick={() => {
                  onInviteToGroup?.(member.id);
                  onOpenChange(false);
                }}
              >
                <UserPlus className="w-5 h-5 mr-3 text-muted-foreground" />
                <div className="flex flex-col items-start">
                  <span>Invite to Another Group</span>
                  <span className="text-xs text-muted-foreground">
                    {userAdminGroups.length} group{userAdminGroups.length > 1 ? "s" : ""} available
                  </span>
                </div>
              </Button>
            </motion.div>
          )}

          {/* Divider */}
          <div className="h-px bg-border my-2" />

          {/* Report User */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <Button
              variant="ghost"
              className="w-full justify-start h-12 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                onReportUser?.(member.id);
                onOpenChange(false);
              }}
            >
              <AlertCircle className="w-5 h-5 mr-3" />
              <span>Report User</span>
            </Button>
          </motion.div>
        </div>

        {/* Padding bottom para safe area */}
        <div className="h-6" />
      </SheetContent>
    </Sheet>
  );
}