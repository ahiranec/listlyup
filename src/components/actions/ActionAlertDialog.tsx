/**
 * ActionAlertDialog Component
 * AlertDialog reutilizable para confirmaciones simples
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog';
import type { ActionDefinition, ActionEntity } from '../../actions/types';

interface ActionAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ActionDefinition;
  entity: ActionEntity;
  onConfirm: () => void;
}

export function ActionAlertDialog({
  open,
  onOpenChange,
  action,
  entity,
  onConfirm,
}: ActionAlertDialogProps) {
  const isDestructive = action.variant === 'destructive';

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {action.confirmTitle || `${action.label}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {action.confirmDescription || `Are you sure you want to ${action.label.toLowerCase()}?`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={
              isDestructive
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-600'
                : ''
            }
          >
            {action.confirmLabel || action.label}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
