/**
 * RemoveListingSheet - Remove Listing Quick Sheet
 * Used by admins to remove listings (permanent)
 */

import { useState } from "react";
import { Trash2, X } from "lucide-react";
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

interface RemoveListingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  listingTitle: string;
  onComplete?: () => void;
}

const REMOVE_REASONS = [
  { value: "guidelines", label: "Violates group guidelines" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "spam", label: "Spam or scam" },
  { value: "illegal", label: "Illegal content" },
  { value: "other", label: "Other" },
];

export function RemoveListingSheet({
  open,
  onOpenChange,
  listingId,
  listingTitle,
  onComplete,
}: RemoveListingSheetProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }

    setIsSubmitting(true);

    // TODO: Backend - Remove listing from group
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reasonLabel =
      REMOVE_REASONS.find((r) => r.value === reason)?.label || reason;

    toast.success("Listing removed from group", {
      description: `Reason: ${reasonLabel}`,
    });

    console.log("Remove listing:", {
      listingId,
      listingTitle,
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
              <Trash2 className="w-5 h-5 text-red-600" />
              <SheetTitle>Remove Listing from Group</SheetTitle>
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
          <SheetDescription className="text-red-600">
            ⚠️ This action is permanent and will notify the owner
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Listing Info */}
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
            <p className="text-sm font-medium truncate text-red-900">
              {listingTitle}
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
            <Label htmlFor="details">Message to owner (required)</Label>
            <Textarea
              id="details"
              placeholder="Explain why this listing was removed..."
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={3}
              required
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
            disabled={!reason || !details || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Removing..." : "Remove Listing"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
