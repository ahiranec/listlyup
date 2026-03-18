import { Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "../ui/utils";
import type { GroupPreset } from "../../types/group";

interface PresetOptionProps {
  preset: GroupPreset;
  isSelected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}

export function PresetOption({ preset, isSelected, onClick, icon }: PresetOptionProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full p-3 rounded-xl border bg-card transition-all text-left",
        "hover:border-primary/40 hover:shadow-sm",
        isSelected ? "border-primary shadow-sm" : "border-border"
      )}
    >
      <div className="flex items-start gap-2.5">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{icon}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="font-medium text-sm leading-tight">{preset.name}</h4>
              <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{preset.subtitle}</p>
            </div>
            {isSelected && (
              <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" strokeWidth={2.5} />
            )}
          </div>

          {/* Badges */}
          <div className="flex gap-1.5 mt-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs h-5 px-2",
                preset.joinPolicy === "Open" && "border-green-500/30 bg-green-500/5 text-green-700 dark:text-green-400",
                preset.joinPolicy === "Approval" && "border-orange-500/30 bg-orange-500/5 text-orange-700 dark:text-orange-400",
                preset.joinPolicy === "Invite" && "border-red-500/30 bg-red-500/5 text-red-700 dark:text-red-400"
              )}
            >
              {preset.joinPolicy}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "text-xs h-5 px-2",
                preset.visibility === "Public" && "border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400",
                preset.visibility === "Private" && "border-purple-500/30 bg-purple-500/5 text-purple-700 dark:text-purple-400"
              )}
            >
              {preset.visibility}
            </Badge>
          </div>
        </div>
      </div>
    </button>
  );
}