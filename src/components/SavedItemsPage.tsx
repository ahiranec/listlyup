/**
 * Favorites Page
 * View and manage saved products
 * Premium Design 2025 - ListlyUp
 */

import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Heart, Search, Trash2, ArrowLeft, SlidersHorizontal } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { BottomNav } from './bottom-nav';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getSavedItems, unsaveItem, type SavedItem } from '../utils/savedItems';

interface SavedItemsPageProps {
  onBack: () => void;
  onProductClick: (productId: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function SavedItemsPage({
  onBack,
  onProductClick,
  activeTab = 'home',
  onTabChange = () => {},
}: SavedItemsPageProps) {
  const [savedItems, setSavedItems] = useState<SavedItem[]>(getSavedItems());
  const [searchQuery, setSearchQuery] = useState('');

  // Filter items
  const filteredItems = useMemo(() => {
    let items = savedItems;

    // Filter by search
    if (searchQuery) {
      items = items.filter(item =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return items;
  }, [savedItems, searchQuery]);

  const handleUnsave = (itemId: string, itemTitle: string) => {
    unsaveItem(itemId);
    setSavedItems(getSavedItems());
    toast.success(`Removed "${itemTitle}" from favorites`);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Status bar removed - PWA/WebView mobile */}

      {/* Header */}
      <div className="bg-background border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="h-9 w-9"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-semibold">Favorites</h1>
              <p className="text-xs text-muted-foreground">
                {savedItems.length} item{savedItems.length !== 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search favorites..."
              className="w-full h-10 pl-10 pr-4 bg-muted border border-border rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {filteredItems.length === 0 ? (
          <EmptyState 
            hasItems={savedItems.length > 0}
            searchQuery={searchQuery}
            onClearFilters={() => {
              setSearchQuery('');
            }}
          />
        ) : (
          <div className="p-4 space-y-3">
            {filteredItems.map((item, index) => (
              <SavedItemCard
                key={item.id}
                item={item}
                index={index}
                onUnsave={handleUnsave}
                onClick={() => onProductClick(item.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
    </div>
  );
}

// ==================== SAVED ITEM CARD ====================

interface SavedItemCardProps {
  item: SavedItem;
  index: number;
  onUnsave: (id: string, title: string) => void;
  onClick: () => void;
}

function SavedItemCard({ item, index, onUnsave, onClick }: SavedItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all group"
    >
      <div className="flex gap-3 p-3">
        {/* Image */}
        <div 
          className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-muted cursor-pointer"
          onClick={onClick}
        >
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0" onClick={onClick}>
          <h3 className="font-medium truncate mb-1 cursor-pointer hover:text-primary transition-colors">
            {item.title}
          </h3>
          
          {item.price && (
            <p className="font-semibold text-primary mb-1">
              {item.price}
            </p>
          )}

          {item.location && (
            <p className="text-xs text-muted-foreground truncate mb-2">
              📍 {item.location}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-1 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onUnsave(item.id, item.title);
            }}
            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
            title="Remove from saved"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Saved Date */}
      <div className="px-3 pb-2 text-xs text-muted-foreground">
        Saved {formatRelativeTime(item.savedAt)}
      </div>
    </motion.div>
  );
}

// ==================== EMPTY STATE ====================

interface EmptyStateProps {
  hasItems: boolean;
  searchQuery: string;
  onClearFilters: () => void;
}

function EmptyState({ hasItems, searchQuery, onClearFilters }: EmptyStateProps) {
  if (!hasItems) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 px-6"
      >
        <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
          <Heart className="w-12 h-12 text-red-400" />
        </div>
        
        <h3 className="text-xl font-semibold text-foreground mb-2">
          No saved items yet
        </h3>
        
        <p className="text-sm text-muted-foreground text-center mb-6">
          Tap the heart icon on products to save them here
        </p>
      </motion.div>
    );
  }

  // Has items but filtered out
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-16 px-6"
    >
      <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <SlidersHorizontal className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        No matches found
      </h3>
      
      <p className="text-sm text-muted-foreground text-center mb-6">
        {searchQuery 
          ? `No saved items match "${searchQuery}"`
          : 'Try adjusting your filters'
        }
      </p>
      
      <Button onClick={onClearFilters} variant="outline">
        Clear Filters
      </Button>
    </motion.div>
  );
}

// ==================== UTILITIES ====================

function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return date.toLocaleDateString();
  } else if (days > 0) {
    return `${days}d ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else {
    return 'Just now';
  }
}

export default SavedItemsPage;