import { motion } from "motion/react";
import { Users, Package, Wrench, MapPin, Shield, Clock, Check, Pin, BellOff, AlertTriangle } from "lucide-react";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { MyGroup } from "./types";
import { GroupQuickActionsMenu } from "./GroupQuickActionsMenu";

interface GroupCardProps {
  group: MyGroup;
  index: number;
  onClick: () => void;
  onMute?: () => void;
  onPin?: () => void;
  onLeave?: () => void;
  onCancelRequest?: () => void;
  onAcceptInvite?: () => void;
  onDeclineInvite?: () => void;
  isAuthenticated?: boolean; // NEW: Hide role badges when not authenticated
}

export function GroupCard({
  group,
  index,
  onClick,
  onMute,
  onPin,
  onLeave,
  onCancelRequest,
  onAcceptInvite,
  onDeclineInvite,
  isAuthenticated = true, // NEW
}: GroupCardProps) {
  const roleColors = {
    admin: "bg-red-500/10 text-red-700 dark:text-red-400",
    moderator: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    member: "bg-green-500/10 text-green-700 dark:text-green-400",
  };

  const roleIcons = {
    admin: Shield,
    moderator: Shield,
    member: Users,
  };

  const statusColors = {
    joined: "bg-green-500/10 text-green-700 dark:text-green-400",
    pending: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400",
    invited: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
  };

  const RoleIcon = roleIcons[group.role];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      className="bg-card border-b last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <Avatar className="w-12 h-12 flex-shrink-0">
            <AvatarImage src={group.avatarUrl} alt={group.name} />
            <AvatarFallback className="bg-primary/10 text-primary">
              {getInitials(group.name)}
            </AvatarFallback>
          </Avatar>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Title and Status */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div className="flex-1 min-w-0 flex items-center gap-2">
                {/* Pin Badge */}
                {group.isPinned && (
                  <Pin className="w-4 h-4 text-primary flex-shrink-0" />
                )}
                
                <h3 className="font-medium truncate">
                  {group.name}
                </h3>
              </div>

              {/* Mute Badge + Actions dropdown */}
              <div className="flex items-center gap-1 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                {group.isMuted && (
                  <div className="flex items-center gap-0.5 text-muted-foreground">
                    <BellOff className="w-4 h-4" />
                    {(group.role === 'admin' || group.role === 'moderator') && (
                      <AlertTriangle className="w-3 h-3 text-yellow-600" />
                    )}
                  </div>
                )}
                
                {/* Actions dropdown */}
                <GroupQuickActionsMenu
                  group={group}
                  onMute={onMute}
                  onPin={onPin}
                  onLeave={onLeave}
                  onCancelRequest={onCancelRequest}
                  onAcceptInvite={onAcceptInvite}
                  onDeclineInvite={onDeclineInvite}
                />
              </div>
            </div>

            {/* Description */}
            {group.description && (
              <p className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {group.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-2">
              <div className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5" />
                <span>{group.memberCount.toLocaleString()}</span>
              </div>
              {group.productCount > 0 && (
                <div className="flex items-center gap-1">
                  <Package className="w-3.5 h-3.5" />
                  <span>{group.productCount}</span>
                </div>
              )}
              {group.serviceCount > 0 && (
                <div className="flex items-center gap-1">
                  <Wrench className="w-3.5 h-3.5" />
                  <span>{group.serviceCount}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{group.location}</span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Role Badge */}
              {group.status === "joined" && isAuthenticated && (
                <Badge variant="secondary" className={`${roleColors[group.role]} text-xs h-5`}>
                  <RoleIcon className="w-3 h-3 mr-1" />
                  {group.role.charAt(0).toUpperCase() + group.role.slice(1)}
                </Badge>
              )}

              {/* Status Badge */}
              {group.status !== "joined" && (
                <Badge variant="secondary" className={`${statusColors[group.status]} text-xs h-5`}>
                  {group.status === "pending" && (
                    <>
                      <Clock className="w-3 h-3 mr-1" />
                      Pending
                    </>
                  )}
                  {group.status === "invited" && (
                    <>
                      <Check className="w-3 h-3 mr-1" />
                      Invited
                    </>
                  )}
                </Badge>
              )}

              {/* Group Type Badge */}
              {group.groupType === "private" && (
                <Badge variant="secondary" className="text-xs h-5">
                  🔒 Private
                </Badge>
              )}
              {group.groupType === "secret" && (
                <Badge variant="secondary" className="text-xs h-5">
                  🔐 Secret
                </Badge>
              )}

              {/* Activity Badge */}
              {!group.isActive && group.status === "joined" && (
                <Badge variant="secondary" className="bg-gray-500/10 text-gray-700 dark:text-gray-400 text-xs h-5">
                  Inactive
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}