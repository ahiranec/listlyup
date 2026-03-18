# Services Usage Examples

## 🎯 Quick Start Guide

This document shows practical examples of using AI and Maps services in your components.

---

## 🤖 AI Service Examples

### Example 1: Basic Image Analysis

```typescript
import { useAIService } from '../lib/providers/ServiceProvider';
import { useState } from 'react';

function MediaUploadStep() {
  const aiService = useAIService();
  const [suggestions, setSuggestions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = async (imageUrls: string[]) => {
    setIsAnalyzing(true);
    
    try {
      const result = await aiService.analyzeListing({
        images: imageUrls,
        maxSuggestions: 5,
        language: 'es',
      });
      
      if (result.success && result.data) {
        setSuggestions(result.data);
        
        // Show indicator if using mock data
        if (result.fallbackUsed) {
          console.log('🎭 Using demo suggestions (enable AI in Settings for real analysis)');
        }
      } else {
        console.error('Analysis failed:', result.error);
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div>
      {isAnalyzing && <LoadingSpinner text="Analyzing images..." />}
      
      {suggestions && (
        <SuggestionsCard 
          title={suggestions.title}
          category={suggestions.category}
          hashtags={suggestions.hashtags}
        />
      )}
    </div>
  );
}
```

### Example 2: AI Suggestions Modal

```typescript
import { useAIService, useSettings } from '../lib/providers/ServiceProvider';
import { Dialog, DialogContent } from './ui/dialog';
import { Badge } from './ui/badge';
import { Sparkles } from 'lucide-react';

interface AISuggestionsModalProps {
  imageUrls: string[];
  onAccept: (suggestions: AISuggestions) => void;
  onSkip: () => void;
}

function AISuggestionsModal({ imageUrls, onAccept, onSkip }: AISuggestionsModalProps) {
  const aiService = useAIService();
  const settings = useSettings();
  const [suggestions, setSuggestions] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function analyze() {
      const result = await aiService.analyzeListing({
        images: imageUrls,
        language: 'es',
      });
      
      if (result.success) {
        setSuggestions(result.data);
      }
      setIsLoading(false);
    }
    
    analyze();
  }, [imageUrls]);

  if (isLoading) {
    return <Dialog open><LoadingState /></Dialog>;
  }

  return (
    <Dialog open>
      <DialogContent>
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold">AI Suggestions</h2>
            {!settings.aiEnabled && (
              <Badge variant="secondary">Demo</Badge>
            )}
          </div>

          {/* Suggestions */}
          {suggestions && (
            <div className="space-y-3">
              <div>
                <label className="text-sm text-muted-foreground">Title</label>
                <p className="font-medium">{suggestions.title}</p>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Category</label>
                <p>{suggestions.category} › {suggestions.subcategory}</p>
              </div>

              <div>
                <label className="text-sm text-muted-foreground">Hashtags</label>
                <div className="flex flex-wrap gap-2">
                  {suggestions.hashtags.map(tag => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>

              {suggestions.attributes && (
                <div>
                  <label className="text-sm text-muted-foreground">Detected Attributes</label>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    {Object.entries(suggestions.attributes).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="text-muted-foreground">{key}:</span> {value}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Confidence indicator */}
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${suggestions.confidence * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(suggestions.confidence * 100)}% confident
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={onSkip}
              className="flex-1 px-4 py-2 border rounded-lg"
            >
              Fill Manually
            </button>
            <button
              onClick={() => onAccept(suggestions)}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg"
            >
              Use Suggestions
            </button>
          </div>

          {/* Upgrade hint for mock users */}
          {!settings.aiEnabled && (
            <p className="text-xs text-muted-foreground text-center">
              Enable AI in Settings for real image analysis
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

## 🗺️ Maps Service Examples

### Example 3: GPS Location

```typescript
import { useMapsService } from '../lib/providers/ServiceProvider';
import { MapPin, Loader2 } from 'lucide-react';

function GPSLocationButton() {
  const mapsService = useMapsService();
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetLocation = async () => {
    setIsLoading(true);
    setError(null);
    
    const result = await mapsService.getCurrentLocation();
    
    if (result.success && result.data) {
      setLocation(result.data);
      
      if (result.fallbackUsed) {
        // Using mock location
        toast.info('Using demo location (enable Maps in Settings for GPS)');
      }
    } else {
      setError(result.error);
      toast.error('Could not get location');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleGetLocation}
        disabled={isLoading}
        className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MapPin className="w-4 h-4" />
        )}
        Use Current Location
      </button>

      {location && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="font-medium">{location.address}</p>
          <p className="text-sm text-muted-foreground">
            {location.city}, {location.region}
          </p>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}
```

### Example 4: Location Search

```typescript
import { useMapsService } from '../lib/providers/ServiceProvider';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { debounce } from 'lodash';

function LocationSearch() {
  const mapsService = useMapsService();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchLocation = debounce(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    const result = await mapsService.searchLocation({
      query: searchQuery,
      limit: 5,
      language: 'es',
    });
    
    if (result.success && result.data) {
      setResults(result.data);
    }
    
    setIsSearching(false);
  }, 500);

  const handleInputChange = (value: string) => {
    setQuery(value);
    searchLocation(value);
  };

  const handleSelectResult = (result: GeocodingResult) => {
    console.log('Selected location:', result.location);
    // Handle selection
    setQuery(result.formattedAddress);
    setResults([]);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Search for a location..."
          className="pl-10"
        />
        {isSearching && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin" />
        )}
      </div>

      {/* Results dropdown */}
      {results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-10">
          {results.map((result, index) => (
            <button
              key={result.placeId || index}
              onClick={() => handleSelectResult(result)}
              className="w-full text-left px-4 py-2 hover:bg-muted transition-colors"
            >
              <p className="font-medium">{result.formattedAddress}</p>
              <p className="text-sm text-muted-foreground">
                {result.location.city}, {result.location.region}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Example 5: Location Step with Multiple Methods

```typescript
import { useMapsService, useSettings } from '../lib/providers/ServiceProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MapPin, Search, Map } from 'lucide-react';

function LocationStep() {
  const mapsService = useMapsService();
  const settings = useSettings();
  const [method, setMethod] = useState<'gps' | 'search' | 'pin'>('gps');
  const [location, setLocation] = useState(null);
  const [precision, setPrecision] = useState<'approximate' | 'exact'>('approximate');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Set Location</h2>
        <p className="text-sm text-muted-foreground">
          Choose how to set your product location
        </p>
      </div>

      {/* Method Tabs */}
      <Tabs value={method} onValueChange={(v) => setMethod(v as any)}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="gps">
            <MapPin className="w-4 h-4 mr-2" />
            GPS
          </TabsTrigger>
          <TabsTrigger value="search">
            <Search className="w-4 h-4 mr-2" />
            Search
          </TabsTrigger>
          <TabsTrigger value="pin">
            <Map className="w-4 h-4 mr-2" />
            Pin
          </TabsTrigger>
        </TabsList>

        <TabsContent value="gps">
          <GPSLocationButton onLocationSet={setLocation} />
        </TabsContent>

        <TabsContent value="search">
          <LocationSearch onLocationSet={setLocation} />
        </TabsContent>

        <TabsContent value="pin">
          <InteractiveMap onLocationSet={setLocation} />
        </TabsContent>
      </Tabs>

      {/* Precision Toggle - Always visible */}
      {location && (
        <div className="space-y-3">
          <label className="text-sm font-medium">Location Precision</label>
          
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setPrecision('approximate')}
              className={`p-3 border-2 rounded-lg transition-all ${
                precision === 'approximate'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <p className="font-medium">Approximate</p>
              <p className="text-xs text-muted-foreground mt-1">
                Shows general area (~500m radius)
              </p>
            </button>

            <button
              onClick={() => setPrecision('exact')}
              className={`p-3 border-2 rounded-lg transition-all ${
                precision === 'exact'
                  ? 'border-primary bg-primary/5'
                  : 'border-border'
              }`}
            >
              <p className="font-medium">Exact</p>
              <p className="text-xs text-muted-foreground mt-1">
                Shows precise location
              </p>
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            {precision === 'approximate' 
              ? '📍 Buyers will see your general neighborhood'
              : '📌 Buyers will see your exact address'
            }
          </p>
        </div>
      )}

      {/* Service indicator */}
      {!settings.mapsEnabled && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            Using demo locations. Enable Maps in Settings for real GPS and search.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
```

---

## 🎛️ Checking Service Status

### Example 6: Conditional UI Based on Service

```typescript
import { useAIService, useMapsService, useSettings } from '../lib/providers/ServiceProvider';
import { Badge } from './ui/badge';

function ServiceStatusIndicator() {
  const aiService = useAIService();
  const mapsService = useMapsService();
  const settings = useSettings();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span>AI Analysis</span>
        <Badge variant={settings.aiEnabled ? 'default' : 'secondary'}>
          {aiService.getServiceType() === 'real' ? 'Live' : 'Demo'}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <span>Location Services</span>
        <Badge variant={settings.mapsEnabled ? 'default' : 'secondary'}>
          {mapsService.getServiceType() === 'real' ? 'Live' : 'Demo'}
        </Badge>
      </div>
    </div>
  );
}
```

### Example 7: Upgrade Prompt

```typescript
import { useSettings } from '../lib/providers/ServiceProvider';
import { checkAPIAvailability } from '../lib/config/settings';
import { Alert, AlertDescription } from './ui/alert';
import { Sparkles } from 'lucide-react';

function AIUpgradePrompt() {
  const settings = useSettings();
  const apiAvailability = checkAPIAvailability();

  // Don't show if already enabled or if APIs not configured
  if (settings.aiEnabled || !apiAvailability.ai) {
    return null;
  }

  return (
    <Alert className="border-primary/50 bg-primary/5">
      <Sparkles className="h-4 w-4 text-primary" />
      <AlertDescription>
        <p className="font-medium mb-1">Unlock Real AI Analysis</p>
        <p className="text-sm mb-2">
          Get accurate product suggestions from your photos using advanced AI.
        </p>
        <button 
          onClick={() => {
            // Open settings sheet
            window.dispatchEvent(new CustomEvent('open-settings'));
          }}
          className="text-sm text-primary hover:underline"
        >
          Enable in Settings →
        </button>
      </AlertDescription>
    </Alert>
  );
}
```

---

## 🧪 Testing Examples

### Example 8: Component Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ServiceProvider } from '../lib/providers/ServiceProvider';
import { MediaUploadStep } from './MediaUploadStep';

// Mock the settings
jest.mock('../lib/config/settings', () => ({
  getSettings: () => ({
    aiEnabled: false,  // Test with mock service
    mapsEnabled: false,
  }),
  updateSetting: jest.fn(),
}));

describe('MediaUploadStep', () => {
  test('analyzes images with mock service', async () => {
    render(
      <ServiceProvider>
        <MediaUploadStep />
      </ServiceProvider>
    );

    // Upload images
    const uploadButton = screen.getByText('Upload Photos');
    uploadButton.click();

    // Wait for mock analysis (1-2 seconds)
    await waitFor(() => {
      expect(screen.getByText(/iPhone/i)).toBeInTheDocument();
    });

    // Check for demo indicator
    expect(screen.getByText(/demo/i)).toBeInTheDocument();
  });
});
```

---

## 💡 Best Practices

### 1. Always Handle Errors

```typescript
const result = await aiService.analyzeListing(options);

if (!result.success) {
  // Show error to user
  toast.error(result.error || 'Analysis failed');
  
  // Provide fallback
  showManualInputForm();
}
```

### 2. Show Loading States

```typescript
const [isLoading, setIsLoading] = useState(false);

const analyze = async () => {
  setIsLoading(true);
  try {
    await aiService.analyzeListing(...);
  } finally {
    setIsLoading(false);  // Always reset
  }
};
```

### 3. Indicate Service Type to Users

```typescript
{result.fallbackUsed && (
  <Badge variant="secondary">Demo Mode</Badge>
)}
```

### 4. Debounce Search Queries

```typescript
import { debounce } from 'lodash';

const searchLocation = debounce(async (query) => {
  await mapsService.searchLocation({ query });
}, 500);  // Wait 500ms after typing stops
```

### 5. Provide Manual Fallback

```typescript
<button onClick={analyzeWithAI}>
  ✨ Analyze with AI
</button>

<button onClick={showManualForm}>
  ✏️ Fill Manually
</button>
```

---

## 📚 Additional Resources

- [ServicesArchitecture.md](./ServicesArchitecture.md) - Full architecture details
- [.env.example](../.env.example) - Environment variables
- [SettingsSheet.tsx](../components/SettingsSheet.tsx) - Settings UI
