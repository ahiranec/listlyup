import { Filter } from "lucide-react";

interface EmptyStateProps {
  searchQuery: string;
}

export function EmptyState({ searchQuery }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6">
      <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
        <Filter className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="font-semibold mb-1">No listings found</h3>
      <p className="text-sm text-muted-foreground text-center">
        {searchQuery ? "Try a different search term" : "You haven't created any listings yet"}
      </p>
    </div>
  );
}
