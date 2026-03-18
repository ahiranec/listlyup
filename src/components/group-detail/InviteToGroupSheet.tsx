/**
 * InviteToGroupSheet Component
 * Sheet para invitar a un miembro a otros grupos donde eres admin/moderator
 */

import { useState } from "react";
import { motion } from "motion/react";
import { Users, Check, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { toast } from "sonner@2.0.3";

interface Group {
  id: string;
  name: string;
  coverImage?: string;
  memberCount?: number;
  isAlreadyMember?: boolean; // Si el miembro ya pertenece a este grupo
}

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface InviteToGroupSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  member: Member | null;
  availableGroups: Group[]; // Grupos donde el usuario actual es admin/moderator
  onSendInvite?: (memberId: string, groupIds: string[]) => void;
}

export function InviteToGroupSheet({
  open,
  onOpenChange,
  member,
  availableGroups,
  onSendInvite,
}: InviteToGroupSheetProps) {
  const [selectedGroups, setSelectedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    setSelectedGroups((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  const handleSendInvite = () => {
    if (selectedGroups.size === 0 || !member) return;

    const groupIds = Array.from(selectedGroups);
    onSendInvite?.(member.id, groupIds);

    // Feedback
    const groupNames = availableGroups
      .filter((g) => selectedGroups.has(g.id))
      .map((g) => g.name)
      .join(", ");

    toast.success(
      `Invitation sent to ${member.name} for ${selectedGroups.size} group${
        selectedGroups.size > 1 ? "s" : ""
      }`
    );

    // Reset y cerrar
    setSelectedGroups(new Set());
    onOpenChange(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (!member) return null;

  // Filtrar grupos donde el miembro no está ya
  const invitableGroups = availableGroups.filter((g) => !g.isAlreadyMember);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-auto max-h-[85vh] rounded-t-3xl p-0">
        <SheetHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between mb-2">
            <SheetTitle className="text-left">Invite to a Group</SheetTitle>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
          <SheetDescription className="sr-only">
            Select groups to invite this member to
          </SheetDescription>
          
          {/* Member info */}
          <div className="flex items-center gap-3 pt-2">
            <Avatar className="w-10 h-10 flex-shrink-0">
              <AvatarImage src={member.avatarUrl} alt={member.name} />
              <AvatarFallback className="bg-primary/10 text-primary text-sm">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{member.name}</p>
              <p className="text-sm text-muted-foreground">
                Select groups to invite to
              </p>
            </div>
          </div>
        </SheetHeader>

        <div className="px-6 py-4">
          {invitableGroups.length === 0 ? (
            <div className="py-12 text-center">
              <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground" />
              <p className="font-medium mb-1">No Groups Available</p>
              <p className="text-sm text-muted-foreground">
                {member.name} is already a member of all your groups
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Your groups (where you're Admin/Moderator):
              </p>

              <div className="space-y-2 max-h-[40vh] overflow-y-auto">
                {invitableGroups.map((group, index) => {
                  const isSelected = selectedGroups.has(group.id);
                  
                  return (
                    <motion.button
                      key={group.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => toggleGroup(group.id)}
                      className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:bg-muted/50"
                      }`}
                    >
                      {/* Group Image/Icon */}
                      <div className="w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                        {group.coverImage ? (
                          <img
                            src={group.coverImage}
                            alt={group.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Users className="w-6 h-6 text-muted-foreground" />
                        )}
                      </div>

                      {/* Group Info */}
                      <div className="flex-1 min-w-0 text-left">
                        <p className="font-medium truncate">{group.name}</p>
                        {group.memberCount !== undefined && (
                          <p className="text-sm text-muted-foreground">
                            {group.memberCount} member{group.memberCount !== 1 ? "s" : ""}
                          </p>
                        )}
                      </div>

                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? "bg-primary border-primary"
                            : "border-border bg-background"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4 text-white" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer con botones */}
        {invitableGroups.length > 0 && (
          <div className="px-6 pb-6 pt-2 border-t bg-background">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSelectedGroups(new Set());
                  onOpenChange(false);
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                disabled={selectedGroups.size === 0}
                onClick={handleSendInvite}
              >
                Send Invite{selectedGroups.size > 0 ? ` (${selectedGroups.size})` : ""}
              </Button>
            </div>
          </div>
        )}

        {/* Safe area padding */}
        <div className="h-2" />
      </SheetContent>
    </Sheet>
  );
}