import { ReactNode } from "react";
import { motion } from "motion/react";
import { ChevronDown, LucideIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

interface FilterSectionProps {
  title: string;
  icon: LucideIcon;
  isOpen: boolean;
  onToggle: () => void;
  selectedLabel?: string;
  delay?: number;
  variant?: "primary" | "default";
  children: ReactNode;
}

export function FilterSection({
  title,
  icon: Icon,
  isOpen,
  onToggle,
  selectedLabel,
  delay = 0,
  variant = "default",
  children,
}: FilterSectionProps) {
  const bgClass = variant === "primary" 
    ? "bg-gradient-to-br from-primary/5 to-blue-50/50 border-primary/20"
    : "bg-white border-gray-200/50";

  return (
    <Collapsible open={isOpen} onOpenChange={onToggle}>
      <motion.div 
        className={`${bgClass} rounded-xl sm:rounded-2xl border p-3 sm:p-4 shadow-sm`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
      >
        <CollapsibleTrigger className="w-full">
          <div className={`text-xs sm:text-sm font-semibold text-foreground flex items-center justify-between gap-2 ${isOpen ? 'mb-3' : ''}`}>
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Icon className={`w-4 h-4 flex-shrink-0 ${variant === "primary" ? "text-primary" : "text-muted-foreground"}`} />
              <span>{title}</span>
              {!isOpen && selectedLabel && (
                <span className={`text-xs font-normal ml-2 truncate ${variant === "primary" ? "text-primary" : "text-muted-foreground"}`}>
                  • {selectedLabel}
                </span>
              )}
            </div>
            <ChevronDown 
              className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isOpen ? '' : '-rotate-90'} ${variant === "primary" ? "text-primary" : "text-muted-foreground"}`} 
            />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {children}
        </CollapsibleContent>
      </motion.div>
    </Collapsible>
  );
}
