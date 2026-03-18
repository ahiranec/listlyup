/**
 * GroupActionButton Component
 * Botón CTA inteligente que se adapta según:
 * - userRole (visitor/pending/member/moderator/admin)
 * - Group settings (visibility, joinPolicy)
 */

import { motion } from "motion/react";
import { UserPlus, Lock, Key, X, Check } from "lucide-react";
import { Button } from "../ui/button";

interface GroupActionButtonProps {
  userRole?: "visitor" | "pending" | "member" | "moderator" | "admin";
  visibility: "Public" | "Private";
  joinPolicy: "Open" | "Approval" | "Invite";
  onJoin?: () => void;
  onRequestJoin?: () => void;
  onCancelRequest?: () => void;
  isLoading?: boolean;
}

export function GroupActionButton({
  userRole = "visitor",
  visibility,
  joinPolicy,
  onJoin,
  onRequestJoin,
  onCancelRequest,
  isLoading = false,
}: GroupActionButtonProps) {
  const isMember = ["member", "moderator", "admin"].includes(userRole);
  const isPending = userRole === "pending";

  // Si ya es miembro, no mostrar botón
  if (isMember) {
    return null;
  }

  // Si está pendiente, mostrar botón de cancelar
  if (isPending) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="fixed bottom-[60px] left-0 right-0 px-4 py-3 bg-background border-t z-30"
      >
        <Button
          variant="outline"
          className="w-full"
          onClick={onCancelRequest}
          disabled={isLoading}
        >
          <X className="w-4 h-4 mr-2" />
          Cancel Request
        </Button>
      </motion.div>
    );
  }

  // Visitor: determinar tipo de botón según visibility + joinPolicy
  let buttonConfig = {
    label: "Join Group",
    icon: UserPlus,
    variant: "default" as const,
    onClick: onJoin,
    description: "Join this community instantly",
  };

  // Join policy determines the action type
  if (joinPolicy === "Approval") {
    buttonConfig = {
      label: "Request to Join",
      icon: Lock,
      variant: "default" as const,
      onClick: onRequestJoin,
      description: "Send a request to join this group",
    };
  } else if (joinPolicy === "Invite") {
    buttonConfig = {
      label: "Request Invitation",
      icon: Key,
      variant: "default" as const,
      onClick: onRequestJoin,
      description: "This is an invite-only group",
    };
  }

  const Icon = buttonConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-[60px] left-0 right-0 px-4 py-3 bg-background border-t z-30"
    >
      <Button
        className="w-full"
        size="lg"
        onClick={buttonConfig.onClick}
        disabled={isLoading}
      >
        <Icon className="w-4 h-4 mr-2" />
        {buttonConfig.label}
      </Button>
    </motion.div>
  );
}