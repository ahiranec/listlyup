import { Checkbox } from "../ui/checkbox";

interface SelectAllRowProps {
  totalCount: number;
  isAllSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

export function SelectAllRow({
  totalCount,
  isAllSelected,
  onSelectAll,
  onDeselectAll,
}: SelectAllRowProps) {
  if (totalCount <= 1) return null;

  return (
    <div className="px-4 py-2 bg-muted/30 flex items-center gap-3">
      <Checkbox
        checked={isAllSelected}
        onCheckedChange={(checked) => {
          if (checked) {
            onSelectAll();
          } else {
            onDeselectAll();
          }
        }}
      />
      <span className="text-xs text-muted-foreground">
        Select all ({totalCount})
      </span>
    </div>
  );
}
