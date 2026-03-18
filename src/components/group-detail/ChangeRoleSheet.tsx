/**
 * ChangeRoleSheet - Change Member Role Quick Sheet
 * Used by admins to promote/demote members
 */

import { useState } from "react";
import { UserCog, X, ArrowUp, ArrowDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { toast } from "sonner@2.0.3";

interface ChangeRoleSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
  memberName: string;
  currentRole: "member" | "moderator";
  onComplete?: () => void;
}

export function ChangeRoleSheet({
  open,
  onOpenChange,
  memberId,
  memberName,
  currentRole,
  onComplete,
}: ChangeRoleSheetProps) {
  const [newRole, setNewRole] = useState<"member" | "moderator">(
    currentRole === "member" ? "moderator" : "member"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPromotion = currentRole === "member" && newRole === "moderator";
  const isDemotion = currentRole === "moderator" && newRole === "member";

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // TODO: Backend - Update member role
    await new Promise((resolve) => setTimeout(resolve, 500));

    const action = isPromotion ? "promoted to" : "demoted to";
    const roleLabel = newRole === "moderator" ? "Moderator" : "Member";

    toast.success(`${memberName} ${action} ${roleLabel}`, {
      description: isPromotion
        ? "They can now moderate listings and members"
        : "They no longer have moderation permissions",
    });

    console.log("Change role:", {
      memberId,
      memberName,
      currentRole,
      newRole,
    });

    // Reset and close
    setIsSubmitting(false);
    onOpenChange(false);
    onComplete?.();
  };

  const handleCancel = () => {
    setNewRole(currentRole === "member" ? "moderator" : "member");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:max-w-lg sm:mx-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserCog className="w-5 h-5 text-blue-600" />
              <SheetTitle>Change Member Role</SheetTitle>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <SheetDescription>
            Assign a new role to {memberName}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Member Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">{memberName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              Current role: {currentRole}
            </p>
          </div>

          {/* Role Selector */}
          <div className="space-y-3">
            <Label>New Role</Label>
            <RadioGroup value={newRole} onValueChange={(v) => setNewRole(v as any)}>
              {/* Member Option */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="member" id="member" className="mt-1" />
                <div className="flex-1">
                  <label
                    htmlFor="member"
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    Member
                    {isDemotion && (
                      <ArrowDown className="w-3 h-3 text-orange-600" />
                    )}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Can post listings and participate in the group
                  </p>
                </div>
              </div>

              {/* Moderator Option */}
              <div className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                <RadioGroupItem
                  value="moderator"
                  id="moderator"
                  className="mt-1"
                />
                <div className="flex-1">
                  <label
                    htmlFor="moderator"
                    className="text-sm font-medium cursor-pointer flex items-center gap-2"
                  >
                    Moderator
                    {isPromotion && (
                      <ArrowUp className="w-3 h-3 text-green-600" />
                    )}
                  </label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Can moderate listings, manage members, and invite users
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Warning for Demotion */}
          {isDemotion && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-sm text-orange-900">
                ⚠️ This user will lose moderation permissions
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white flex gap-3">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting
              ? "Updating..."
              : isPromotion
              ? "Promote to Moderator"
              : "Demote to Member"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
