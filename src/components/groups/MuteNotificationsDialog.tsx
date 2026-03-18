import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Alert, AlertDescription } from "../ui/alert";
import { AlertCircle } from "lucide-react";

interface MuteNotificationsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  userRole: 'admin' | 'moderator' | 'member';
  onConfirm: (duration: MuteDuration) => void;
}

export type MuteDuration = '1h' | '8h' | '1d' | '1w' | 'forever';

const MUTE_DURATIONS: { value: MuteDuration; label: string }[] = [
  { value: '1h', label: 'For 1 hour' },
  { value: '8h', label: 'For 8 hours' },
  { value: '1d', label: 'For 1 day' },
  { value: '1w', label: 'For 1 week' },
  { value: 'forever', label: 'Until I unmute' },
];

export function MuteNotificationsDialog({
  open,
  onOpenChange,
  groupName,
  userRole,
  onConfirm,
}: MuteNotificationsDialogProps) {
  const [selectedDuration, setSelectedDuration] = useState<MuteDuration>('forever');
  const isCriticalRole = userRole === 'admin' || userRole === 'moderator';

  const handleConfirm = () => {
    onConfirm(selectedDuration);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Mute notifications</DialogTitle>
          <DialogDescription>
            Mute notifications from "{groupName}"
          </DialogDescription>
        </DialogHeader>

        {isCriticalRole && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              You'll still receive critical notifications (reports, join requests, mentions)
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4 py-4">
          <RadioGroup value={selectedDuration} onValueChange={(value) => setSelectedDuration(value as MuteDuration)}>
            {MUTE_DURATIONS.map((duration) => (
              <div key={duration.value} className="flex items-center space-x-2">
                <RadioGroupItem value={duration.value} id={duration.value} />
                <Label htmlFor={duration.value} className="cursor-pointer">
                  {duration.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <DialogFooter className="flex-row gap-2 sm:gap-0">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 sm:flex-none">
            Mute
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
