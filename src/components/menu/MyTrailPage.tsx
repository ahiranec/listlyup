/**
 * My Trail Page - Closed Listings History
 * Mobile-first design optimized for iPhone
 * Premium Design 2025
 * 
 * Shows user's closed listings (sold or archived)
 * Reuses UI structure from My Listings
 */

import { useState, useMemo } from 'react';
import { Package } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { AnimatePresence } from 'motion/react';
import { SearchAndFilterBar, EmptyState, SelectAllRow } from '../my-listings';
import { TrailHeader, TrailBulkActionsToolbar } from '../my-trail';
import { TrailCard } from '../my-trail/TrailCard';
import { getTrailListings } from '../../data/trailListings';
import { trailListingToPublishFormData, getRepublishMessage } from '../../utils/trailHelpers';
import type { TrailListing } from '../my-trail/types';

interface MyTrailPageProps {
  onBack: () => void;
  onNavigateToDetail?: (listingId: string) => void;
  onRepublish?: (listingId: string) => void;
}

export function MyTrailPage({ onBack, onNavigateToDetail, onRepublish }: MyTrailPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'sold' | 'archived'>('all');
  
  // Bulk selection state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);

  // Get trail listings data
  const trailListings = getTrailListings();

  // Filter listings
  const filteredListings = useMemo(() => {
    let filtered = trailListings;

    // Filter by lifecycle
    if (filterType !== 'all') {
      filtered = filtered.filter(listing => listing.lifecycle === filterType);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [trailListings, filterType, searchQuery]);

  // Handle re-publish
  const handleRepublish = (listingId: string) => {
    const listing = trailListings.find(l => l.id === listingId);
    if (!listing) return;

    // Convert TrailListing to PublishFormData
    const publishData = trailListingToPublishFormData(listing);
    const message = getRepublishMessage(listing);
    
    // Show toast
    toast.success(message.title, {
      description: message.description,
    });
    
    // Call parent handler with re-publish data
    if (onRepublish) {
      onRepublish(listingId);
    }
    
    console.log('Re-publish listing:', listing);
    console.log('Publish data:', publishData);
  };

  // Handle delete
  const handleDelete = (listingId: string) => {
    const listing = trailListings.find(l => l.id === listingId);
    if (!listing) return;

    // Simulate delete
    toast.success('Listing deleted permanently', {
      description: `${listing.title} has been removed`,
    });

    console.log('Delete listing:', listingId);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (selectedIds.size === 0) return;

    toast.success(`${selectedIds.size} listings deleted permanently`, {
      description: 'Selected listings have been removed',
    });

    // Clear selection and exit selection mode
    setSelectedIds(new Set());
    setIsSelectionMode(false);
    
    console.log('Bulk delete listings:', Array.from(selectedIds));
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedIds.size === filteredListings.length) {
      // Deselect all
      setSelectedIds(new Set());
    } else {
      // Select all filtered listings
      setSelectedIds(new Set(filteredListings.map(l => l.id)));
    }
  };

  // Handle individual selection
  const handleToggleSelection = (listingId: string) => {
    const newSelection = new Set(selectedIds);
    if (newSelection.has(listingId)) {
      newSelection.delete(listingId);
    } else {
      newSelection.add(listingId);
    }
    setSelectedIds(newSelection);
    
    // Enter selection mode if selecting, exit if all deselected
    if (newSelection.size > 0) {
      setIsSelectionMode(true);
    } else {
      setIsSelectionMode(false);
    }
  };

  // Handle action complete (refresh data)
  const handleActionComplete = () => {
    // Placeholder: Refresh data
    console.log('Action completed - refresh data');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Header */}
      <TrailHeader
        onBack={onBack}
        totalCount={trailListings.length}
        filteredCount={filteredListings.length}
      />

      {/* Search and Filter */}
      <div className="sticky top-14 z-40 bg-background border-b border-border">
        <SearchAndFilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onFilterClick={() => {
            // Cycle through filters: all -> sold -> archived -> all
            if (filterType === 'all') setFilterType('sold');
            else if (filterType === 'sold') setFilterType('archived');
            else setFilterType('all');
          }}
          filterCount={filterType === 'all' ? 0 : 1}
        />

        {/* Filter Indicator */}
        {filterType !== 'all' && (
          <div className="px-4 py-2 bg-muted/50">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                Showing: <span className="font-medium capitalize">{filterType}</span>
              </span>
              <button
                onClick={() => setFilterType('all')}
                className="text-xs text-primary hover:underline"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Select All Row */}
        {isSelectionMode && filteredListings.length > 0 && (
          <SelectAllRow
            selectedCount={selectedIds.size}
            totalCount={filteredListings.length}
            onSelectAll={handleSelectAll}
          />
        )}
      </div>

      {/* Content */}
      <main className="flex-1 overflow-auto pb-6">
        {filteredListings.length === 0 ? (
          <div className="p-4">
            <EmptyState
              icon={Package}
              title={searchQuery ? "No listings found" : "No closed listings"}
              description={
                searchQuery
                  ? "Try adjusting your search"
                  : "Products marked as 'Sold' or 'Archived' appear here"
              }
            />
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {filteredListings.map((listing, index) => (
              <TrailCard
                key={listing.id}
                listing={listing}
                index={index}
                isSelected={selectedIds.has(listing.id)}
                isSelectionMode={isSelectionMode}
                onToggleSelection={handleToggleSelection}
                onNavigateToDetail={onNavigateToDetail}
                onRepublish={handleRepublish}
                onDelete={handleDelete}
                onActionComplete={handleActionComplete}
              />
            ))}
          </div>
        )}
      </main>

      {/* Stats Footer (optional) */}
      {filteredListings.length > 0 && !isSelectionMode && (
        <div className="sticky bottom-0 bg-muted/50 border-t border-border px-4 py-2">
          <p className="text-xs text-center text-muted-foreground">
            {filteredListings.length} closed {filteredListings.length === 1 ? 'listing' : 'listings'}
          </p>
        </div>
      )}

      {/* Bulk Actions Toolbar */}
      <AnimatePresence>
        {isSelectionMode && selectedIds.size > 0 && (
          <TrailBulkActionsToolbar
            selectedCount={selectedIds.size}
            onDeleteSelected={handleBulkDelete}
            onClearSelection={() => {
              setSelectedIds(new Set());
              setIsSelectionMode(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default MyTrailPage;