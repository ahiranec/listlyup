/**
 * ActionFullSheet Component
 * Sheet reutilizable para acciones con formularios complejos
 */

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '../ui/sheet';
import type { ActionDefinition, ActionEntity } from '../../actions/types';

interface ActionFullSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ActionDefinition;
  entity: ActionEntity;
  onSubmit: (data: any) => void;
}

export function ActionFullSheet({
  open,
  onOpenChange,
  action,
  entity,
  onSubmit,
}: ActionFullSheetProps) {
  // TODO: Cargar dinámicamente el componente según action.fullSheetComponent
  // Por ahora mostramos un placeholder

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] max-w-[480px] mx-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>{action.label}</SheetTitle>
          <SheetDescription className="sr-only">
            {action.confirmDescription || `Perform action: ${action.label}`}
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Full sheet for: {action.fullSheetComponent}
          </p>
          <p className="text-xs text-muted-foreground">
            Entity: {JSON.stringify(entity, null, 2)}
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}