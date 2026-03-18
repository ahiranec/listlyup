/**
 * RemoveMemberSheet - Remove Member Quick Sheet
 * Used by moderators/admins to remove members
 */

import { useState } from "react";
import { UserMinus, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner@2.0.3";

interface RemoveMemberSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memberId: string;
  memberName: string;
  memberRole: "member" | "moderator";
  onComplete?: () => void;
}

const REMOVE_REASONS = [
  { value: "guidelines", label: "Violated group guidelines" },
  { value: "spam", label: "Spam or harassment" },
  { value: "scam", label: "Scam or fraudulent activity" },
  { value: "inactive", label: "Inactive member" },
  { value: "other", label: "Other" },
];

export function RemoveMemberSheet({
  open,
  onOpenChange,
  memberId,
  memberName,
  memberRole,
  onComplete,
}: RemoveMemberSheetProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }

    setIsSubmitting(true);

    // TODO: Backend - Remove member from group
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reasonLabel =
      REMOVE_REASONS.find((r) => r.value === reason)?.label || reason;

    toast.success(`${memberName} removed from group`, {
      description: `Reason: ${reasonLabel}`,
    });

    console.log("Remove member:", {
      memberId,
      memberName,
      memberRole,
      reason,
      details,
    });

    // Reset and close
    setReason("");
    setDetails("");
    setIsSubmitting(false);
    onOpenChange(false);
    onComplete?.();
  };

  const handleCancel = () => {
    setReason("");
    setDetails("");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] sm:max-w-lg sm:mx-auto">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UserMinus className="w-5 h-5 text-red-600" />
              <SheetTitle>
                Remove {memberRole === "moderator" ? "Moderator" : "Member"}
              </SheetTitle>
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
            {memberName} will lose access to this group
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Member Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium">{memberName}</p>
            <p className="text-xs text-muted-foreground capitalize">
              {memberRole}
            </p>
          </div>

          {/* Reason Selector */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {REMOVE_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Additional details (optional)</Label>
            <Textarea
              id="details"
              placeholder="Add any additional context..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
            />
          </div>
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
            variant="destructive"
            onClick={handleSubmit}
            disabled={!reason || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Removing..." : "Remove Member"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
