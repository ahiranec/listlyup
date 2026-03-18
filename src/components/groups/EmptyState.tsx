import { Button } from '../ui/button';
import { Users, Search } from 'lucide-react';

interface EmptyStateProps {
  searchQuery: string;
  onExploreGroups?: () => void;
}

export function EmptyState({ searchQuery, onExploreGroups }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 py-12">
      <div className="w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
        {searchQuery ? (
          <Search className="w-10 h-10 text-blue-400" />
        ) : (
          <Users className="w-10 h-10 text-blue-400" />
        )}
      </div>
      
      {searchQuery ? (
        <>
          <h3 className="font-semibold text-lg mb-2">No groups found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-4">
            No groups match your search "{searchQuery}". Try a different search or clear your filters.
          </p>
        </>
      ) : (
        <>
          <h3 className="font-semibold text-lg mb-2">No groups yet</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            You haven't joined any groups yet. Explore groups to connect with your community.
          </p>
          {onExploreGroups && (
            <Button onClick={onExploreGroups} size="lg">
              <Users className="w-4 h-4 mr-2" />
              Explore Groups
            </Button>
          )}
        </>
      )}
    </div>
  );
}