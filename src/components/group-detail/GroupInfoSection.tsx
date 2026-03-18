/**
 * GroupInfoSection Component
 * Muestra información del grupo (category, location, rules, tags)
 * Se adapta según permisos del usuario
 */

import { motion } from "motion/react";
import { Tag, MapPin, FileText, Lock, Globe, Shield, UserCheck, UserPlus, Key } from "lucide-react";
import { Badge } from "../ui/badge";

interface GroupInfoSectionProps {
  group: {
    category?: string;
    location?: string;
    rules?: string[];
    tags?: string[];
    type: "Public" | "Private" | "Community" | "Event";
    visibility: "Public" | "Private";
    joinPolicy: "Open" | "Approval" | "Invite";
  };
  canViewFullInfo: boolean; // true si es member o grupo public
}

export function GroupInfoSection({ group, canViewFullInfo }: GroupInfoSectionProps) {
  // Si no puede ver info completa, mostrar mensaje bloqueado
  if (!canViewFullInfo) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mx-4 mb-4 bg-muted/50 border border-border rounded-xl p-6 text-center"
      >
        <Lock className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-medium mb-1">Content Available to Members Only</h3>
        <p className="text-sm text-muted-foreground">
          {group.visibility === "Private" && group.joinPolicy === "Invite"
            ? "You need an invitation to view this group's details"
            : "Join this group to see full information and content"}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mx-4 mb-4"
    >
      <div className="bg-card rounded-xl border p-4 space-y-4">
        {/* Rules */}
        {group.rules && group.rules.length > 0 && (
          <div className="flex items-start gap-3">
            <FileText className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-2">Group Rules</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                {group.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary flex-shrink-0">•</span>
                    <span className="flex-1">{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tags */}
        {group.tags && group.tags.length > 0 && (
          <div className="flex items-start gap-3">
            <Tag className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {group.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Group Characteristics - Visibility, Join Policy, Category */}
        <div
          className={
            group.rules && group.rules.length > 0 || group.tags && group.tags.length > 0
              ? "pt-3 border-t"
              : ""
          }
        >
          <div className="flex flex-wrap gap-2">
            {/* Visibility Badge */}
            {group.visibility && (
              <Badge
                variant="secondary"
                className={`text-xs gap-1 ${
                  group.visibility === "Public"
                    ? "bg-green-500/10 text-green-700 dark:text-green-400"
                    : "bg-purple-500/10 text-purple-700 dark:text-purple-400"
                }`}
              >
                {group.visibility === "Public" ? (
                  <>
                    <Globe className="w-3 h-3" />
                    Public
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3" />
                    Private
                  </>
                )}
              </Badge>
            )}

            {/* Join Policy Badge */}
            {group.joinPolicy && (
              <Badge
                variant="secondary"
                className={`text-xs gap-1 ${
                  group.joinPolicy === "Open"
                    ? "bg-blue-500/10 text-blue-700 dark:text-blue-400"
                    : group.joinPolicy === "Approval"
                    ? "bg-amber-500/10 text-amber-700 dark:text-amber-400"
                    : "bg-red-500/10 text-red-700 dark:text-red-400"
                }`}
              >
                {group.joinPolicy === "Open" && (
                  <>
                    <UserCheck className="w-3 h-3" />
                    Open Join
                  </>
                )}
                {group.joinPolicy === "Approval" && (
                  <>
                    <UserPlus className="w-3 h-3" />
                    Approval Required
                  </>
                )}
                {group.joinPolicy === "Invite" && (
                  <>
                    <Key className="w-3 h-3" />
                    Invite Only
                  </>
                )}
              </Badge>
            )}

            {/* Category Badge (si existe) */}
            {group.category && (
              <Badge
                variant="secondary"
                className="text-xs bg-muted text-muted-foreground"
              >
                {group.category}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}