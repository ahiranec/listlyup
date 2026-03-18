import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

interface LeaveGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groupName: string;
  isOnlyAdmin: boolean;
  onConfirm: () => void;
  onManageGroup?: () => void;
}

export function LeaveGroupDialog({
  open,
  onOpenChange,
  groupName,
  isOnlyAdmin,
  onConfirm,
  onManageGroup,
}: LeaveGroupDialogProps) {
  if (isOnlyAdmin) {
    return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>⚠️ Can't leave this group</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <span className="block space-y-3">
                <span className="block">You're the only admin of "{groupName}".</span>
                <span className="block">Before leaving, you need to:</span>
                <span className="block pl-5 space-y-1">
                  <span className="block">• Promote another member to admin, or</span>
                  <span className="block">• Delete the group</span>
                </span>
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {onManageGroup && (
              <Button onClick={onManageGroup}>
                Manage Group
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Leave "{groupName}"?</AlertDialogTitle>
          <AlertDialogDescription>
            You'll lose access to all posts and conversations in this group.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
          >
            Leave Group
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}