import { ChevronLeft } from "lucide-react";

interface GroupsHeaderProps {
  onBack: () => void;
  isAuthenticated?: boolean; // NEW: To show different title
}

export function GroupsHeader({ onBack, isAuthenticated = true }: GroupsHeaderProps) {
  return (
    <div className="bg-background border-b sticky top-0 z-20 flex-shrink-0">
      {/* Top bar with back button and title */}
      <div className="flex items-center gap-3 px-4 h-[56px]">
        <button
          onClick={onBack}
          className="flex-shrink-0 w-10 h-10 flex items-center justify-center -ml-2"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="font-semibold text-lg truncate">
          {isAuthenticated ? "MY GROUPS" : "EXPLORE GROUPS"}
        </h1>
      </div>
    </div>
  );
}