/**
 * GroupHero Component
 * Avatar + Name + Description + Stats + Role Badge
 * Se adapta según permisos del usuario y tipo de vista
 */

import { motion } from "motion/react";
import { Users, Package, Wrench, MapPin, Shield, Lock, Crown, CheckCircle, Tag } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface GroupHeroProps {
  group: {
    id: string;
    name: string;
    description?: string;
    avatarUrl?: string;
    memberCount: number;
    productCount?: number;
    serviceCount?: number;
    location?: string;
    category?: string;
  };
  userRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  visibility: "Public" | "Private";
  joinPolicy: "Open" | "Approval" | "Invite";
  isMemberView?: boolean; // true = vista compacta integrada con tabs
}

export function GroupHero({
  group,
  userRole = "visitor",
  visibility,
  joinPolicy,
  isMemberView = false,
}: GroupHeroProps) {
  const isMember = ["member", "moderator", "admin"].includes(userRole);
  const isPending = userRole === "pending";

  // Calcular qué mostrar según permisos
  const showFullDescription = isMember || visibility === "Public";
  const showStats = isMember || visibility === "Public";
  const showLocation = isMember || !(visibility === "Private" && joinPolicy === "Invite");

  // Role colors
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

  // Container classes: compacto para members, elevado para visitors
  const containerClasses = isMemberView
    ? "bg-card border-b p-4"
    : "bg-card rounded-xl shadow-md p-4 mx-4 mt-4 mb-4";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={containerClasses}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <Avatar className="w-16 h-16 flex-shrink-0">
          <AvatarImage src={group.avatarUrl} alt={group.name} />
          <AvatarFallback className="bg-primary/10 text-primary text-lg">
            {getInitials(group.name)}
          </AvatarFallback>
        </Avatar>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name + Role Badge */}
          <div className="flex items-start gap-2 mb-1">
            <h2 className="flex-1 truncate">{group.name}</h2>
            {isMember && (
              <Badge
                variant="outline"
                className={`${roleColors[userRole as "admin" | "moderator" | "member"]} text-xs flex-shrink-0 border-current/30`}
              >
                {userRole === "admin" && <Crown className="w-3 h-3 mr-1" />}
                {userRole === "moderator" && <Shield className="w-3 h-3 mr-1" />}
                {userRole === "member" && <CheckCircle className="w-3 h-3 mr-1" />}
                {userRole === "admin" ? "Admin" : userRole === "moderator" ? "Moderator" : "Member"}
              </Badge>
            )}
          </div>

          {/* Pending Badge */}
          {isPending && (
            <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-700 text-xs mb-2">
              <Lock className="w-3 h-3 mr-1" />
              Request Pending
            </Badge>
          )}

          {/* Description */}
          {showFullDescription && group.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {group.description}
            </p>
          )}

          {/* Stats */}
          {showStats && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
              {/* Members */}
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 flex-shrink-0" />
                <span>
                  {group.memberCount.toLocaleString()}{" "}
                  {group.memberCount === 1 ? "member" : "members"}
                </span>
              </div>

              {/* Listings (productos + servicios) */}
              {(group.productCount > 0 || group.serviceCount > 0) && (
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {(group.productCount + group.serviceCount).toLocaleString()} listings
                  </span>
                </div>
              )}

              {/* Location */}
              {showLocation && group.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{group.location}</span>
                </div>
              )}

              {/* Category */}
              {group.category && (
                <div className="flex items-center gap-1.5">
                  <Tag className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{group.category}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}