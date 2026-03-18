/**
 * GroupMembersSection Component
 * Preview de miembros del grupo (primeros 5)
 * Muestra mensaje bloqueado si no tiene permisos
 */

import { motion } from "motion/react";
import { Users, Lock, ArrowRight, Shield } from "lucide-react";
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

interface GroupMembersSectionProps {
  members?: Member[];
  canView: boolean; // true si es member o grupo public
  limit?: number; // Cuántos miembros mostrar (default: 5)
  onViewAll?: () => void;
  onMemberClick?: (memberId: string) => void;
}

export function GroupMembersSection({
  members = [],
  canView,
  limit = 5,
  onViewAll,
  onMemberClick,
}: GroupMembersSectionProps) {
  // Si no puede ver, mostrar mensaje bloqueado
  if (!canView) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 mb-4 bg-muted/50 border border-border rounded-xl p-6 text-center"
      >
        <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-medium mb-1">Members Available to Group Members Only</h3>
        <p className="text-sm text-muted-foreground">
          Join this group to see who's in the community
        </p>
      </motion.div>
    );
  }

  // Si no hay miembros
  if (members.length === 0) {
    return null;
  }

  const displayMembers = members.slice(0, limit);
  const hasMore = members.length > limit;

  const roleColors = {
    admin: "bg-red-500/10 text-red-700 dark:text-red-400",
    moderator: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    member: "bg-green-500/10 text-green-700 dark:text-green-400",
  };

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
      transition={{ delay: 0.2 }}
      className="mx-4 mb-4"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium">
            Members {members.length > 0 && `(${members.length})`}
          </h3>
        </div>
        {hasMore && onViewAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onViewAll}
            className="h-8 text-xs"
          >
            View All
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>

      {/* Members List */}
      <div className="space-y-0 bg-card rounded-xl border overflow-hidden">
        {displayMembers.map((member, index) => (
          <motion.button
            key={member.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => onMemberClick?.(member.id)}
            className="w-full flex items-center gap-3 p-3 border-b last:border-b-0 hover:bg-muted/50 transition-fast text-left"
          >
            {/* Avatar */}
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-medium truncate">{member.name}</h4>
                {member.role !== "member" && (
                  <Badge
                    variant="secondary"
                    className={`${roleColors[member.role]} text-xs flex-shrink-0`}
                  >
                    {member.role === "admin" && (
                      <>
                        <Shield className="w-3 h-3 mr-0.5" />
                        Admin
                      </>
                    )}
                    {member.role === "moderator" && (
                      <>
                        <Shield className="w-3 h-3 mr-0.5" />
                        Mod
                      </>
                    )}
                  </Badge>
                )}
              </div>
              {member.username && (
                <p className="text-xs text-muted-foreground truncate">
                  @{member.username}
                </p>
              )}
            </div>

            {/* Arrow */}
            <ArrowRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
