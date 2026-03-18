/**
 * HideListingSheet - Hide Listing Quick Sheet
 * Used by moderators to hide listings (reversible)
 */

import { useState } from "react";
import { EyeOff, X } from "lucide-react";
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

interface HideListingSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId: string;
  listingTitle: string;
  onComplete?: () => void;
}

const HIDE_REASONS = [
  { value: "guidelines", label: "Violates group guidelines" },
  { value: "inappropriate", label: "Inappropriate content" },
  { value: "spam", label: "Spam or misleading" },
  { value: "duplicate", label: "Duplicate listing" },
  { value: "other", label: "Other" },
];

export function HideListingSheet({
  open,
  onOpenChange,
  listingId,
  listingTitle,
  onComplete,
}: HideListingSheetProps) {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!reason) {
      toast.error("Please select a reason");
      return;
    }

    setIsSubmitting(true);

    // TODO: Backend - Hide listing
    await new Promise((resolve) => setTimeout(resolve, 500));

    const reasonLabel =
      HIDE_REASONS.find((r) => r.value === reason)?.label || reason;

    toast.success("Listing hidden (reversible)", {
      description: `Reason: ${reasonLabel}`,
    });

    console.log("Hide listing:", { listingId, listingTitle, reason, details });

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
              <EyeOff className="w-5 h-5 text-orange-600" />
              <SheetTitle>Hide Listing</SheetTitle>
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
            This listing will be hidden from the group (can be unhidden later)
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {/* Listing Info */}
          <div className="p-3 bg-muted/50 rounded-lg">
            <p className="text-sm font-medium truncate">{listingTitle}</p>
          </div>

          {/* Reason Selector */}
          <div className="space-y-2">
            <Label htmlFor="reason">Reason *</Label>
            <Select value={reason} onValueChange={setReason}>
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                {HIDE_REASONS.map((r) => (
                  <SelectItem key={r.value} value={r.value}>
                    {r.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <Label htmlFor="details">Message to owner (optional)</Label>
            <Textarea
              id="details"
              placeholder="Add a message that will be sent to the listing owner..."
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
            onClick={handleSubmit}
            disabled={!reason || isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? "Hiding..." : "Hide Listing"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
