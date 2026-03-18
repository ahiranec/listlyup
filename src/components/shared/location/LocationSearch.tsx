/**
 * LocationSearch Component
 * Shared search input with autocomplete for locations
 * Extracted from LocationStep for reusability
 */

import { useState } from 'react';
import { Search, Loader2, MapPin } from 'lucide-react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import type { GeocodingResult } from '../../../lib/services/types';

interface LocationSearchProps {
  onSearch: (query: string) => Promise<GeocodingResult[]>;
  onSelectResult: (result: GeocodingResult) => void;
  placeholder?: string;
}

export function LocationSearch({ onSearch, onSelectResult, placeholder }: LocationSearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchResults = await onSearch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (result: GeocodingResult) => {
    onSelectResult(result);
    setQuery(result.formattedAddress);
    setResults([]);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder={placeholder || 'Search address...'}
          className="pl-9"
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Results */}
      {results.length > 0 && (
        <div className="border rounded-lg bg-white divide-y max-h-64 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={index}
              onClick={() => handleSelect(result)}
              className="w-full text-left p-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">
                    {result.formattedAddress}
                  </p>
                  {result.location.city && (
                    <p className="text-xs text-muted-foreground">
                      {result.location.city}, {result.location.region}
                    </p>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
