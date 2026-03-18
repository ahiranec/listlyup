# Services Architecture Guide

## 📋 Overview

ListlyUp uses a **pluggable services architecture** that allows features to work with mock data initially and easily switch to real APIs when ready. This enables rapid development without API costs while maintaining production-ready code.

## 🏗️ Architecture Pattern

The system uses the **Provider/Adapter** pattern:

```
┌─────────────────────────────────────────┐
│  React Components (UI Layer)           │
│  - Uses hooks: useAIService()          │
│  - No knowledge of Mock vs Real        │
└──────────────┬──────────────────────────┘
               │
┌──────────────▼──────────────────────────┐
│  ServiceProvider (Context)              │
│  - Reads user settings                  │
│  - Creates appropriate services         │
└──────────────┬──────────────────────────┘
               │
       ┌───────┴────────┐
       │                │
┌──────▼─────┐   ┌─────▼──────┐
│ MockService│   │ RealService│
│ (Free)     │   │ (Paid APIs)│
└────────────┘   └────────────┘
```

## 📁 File Structure

```
/lib
├── config/
│   └── settings.ts              # User preferences (localStorage)
│
├── services/
│   ├── types.ts                 # Shared interfaces
│   │
│   ├── ai/
│   │   ├── AIService.ts         # Interface contract
│   │   ├── MockAIService.ts     # Hardcoded suggestions
│   │   ├── RealAIService.ts     # Google Vision + LLM
│   │   └── index.ts             # Factory function
│   │
│   └── maps/
│       ├── MapsService.ts       # Interface contract
│       ├── MockMapsService.ts   # Valparaíso region data
│       ├── RealMapsService.ts   # Google Maps API
│       └── index.ts             # Factory function
│
└── providers/
    └── ServiceProvider.tsx      # React Context provider

/components
└── SettingsSheet.tsx            # UI to enable/disable features
```

## 🎯 How It Works

### 1. User Settings (localStorage)

```typescript
// Default: All features OFF
{
  aiEnabled: false,        // Mock AI service
  aiAutoAnalyze: true,     // When enabled, auto-analyze uploads
  mapsEnabled: false,      // Mock Maps service
  mapsAutoGPS: false,      // Manual location selection
}
```

### 2. Service Factory

```typescript
// /lib/services/ai/index.ts
export function createAIService(enabled: boolean): IAIService {
  if (enabled) {
    const realService = new RealAIService();
    if (realService.isAvailable()) {
      return realService;  // ✅ Use real API
    }
  }
  return new MockAIService();  // 🎭 Use mock data
}
```

### 3. Component Usage

```typescript
import { useAIService } from '../lib/providers/ServiceProvider';

function MyComponent() {
  const aiService = useAIService();
  
  // Component doesn't know if it's Mock or Real!
  const result = await aiService.analyzeListing({
    images: ['https://...'],
    language: 'es',
  });
  
  if (result.success) {
    console.log(result.data);  // Works with both
  }
}
```

## 🔧 Implementation Details

### AI Service

**Mock Service:**
- Returns 5 pre-defined product templates
- Simulates 1-2 second latency
- Always succeeds
- Free, always available

**Real Service:**
- Calls Supabase Edge Function
- Edge Function calls Google Vision API
- Then calls OpenAI/Claude for suggestions
- Returns structured data matching mock format

### Maps Service

**Mock Service:**
- 6 hardcoded locations in Valparaíso region
- Implements search with fuzzy matching
- Calculates closest location for reverse geocoding
- Free, always available

**Real Service:**
- Google Maps Geocoding API
- Google Places Autocomplete
- Real GPS via navigator.geolocation
- Requires API key

## 🚀 Development Workflow

### Phase 1: Initial Development (TODAY)

```bash
# No API keys needed
# All features use mocks
npm run dev
```

**What works:**
- ✅ AI suggestions (5 templates)
- ✅ Location search (Valparaíso data)
- ✅ GPS location (simulated)
- ✅ Complete UI flow
- ✅ Zero API costs

### Phase 2: Configure APIs (LATER)

```bash
# Add to .env.local
VITE_GOOGLE_VISION_API_KEY=xxx
VITE_GOOGLE_MAPS_API_KEY=xxx
VITE_OPENAI_API_KEY=xxx
VITE_SUPABASE_URL=xxx
VITE_SUPABASE_ANON_KEY=xxx
```

**Create Supabase Edge Function:**

```bash
npx supabase functions new analyze-listing
# Edit /supabase/functions/analyze-listing/index.ts
# See RealAIService.ts for implementation example
npx supabase functions deploy analyze-listing
npx supabase secrets set GOOGLE_VISION_API_KEY=xxx OPENAI_API_KEY=xxx
```

### Phase 3: Enable Features (USER CHOICE)

Users open **Settings** and toggle:
- ☑️ AI Suggestions → Starts using real APIs
- ☑️ Google Maps → Starts using real geocoding

**Features can be toggled ON/OFF anytime!**

## 🎨 User Experience

### Settings UI

```
┌─────────────────────────────────┐
│ Settings                        │
├─────────────────────────────────┤
│ AI Features                     │
│ ┌─ AI Suggestions ───────── ☑ ─┐
│ │ Auto-detect from photos      │
│ └──────────────────────────────┘
│                                 │
│ Maps & Location                 │
│ ┌─ Google Maps ─────────── ☑ ─┐
│ │ Real-time geocoding          │
│ └──────────────────────────────┘
│                                 │
│ API Status                      │
│ • AI Services: Available ✓      │
│ • Google Maps: Available ✓      │
└─────────────────────────────────┘
```

### Behavior

| Setting | API Keys | Result |
|---------|----------|--------|
| OFF | None | Mock service (free) |
| OFF | Configured | Mock service (free) |
| ON | None | Mock service + warning |
| ON | Configured | Real service (paid) |

## 🔒 Security Best Practices

### ❌ DON'T: Call APIs from Frontend

```typescript
// BAD - Exposes API key in browser!
fetch('https://vision.googleapis.com/v1/...', {
  headers: { 'Authorization': `Bearer ${VITE_API_KEY}` }
});
```

### ✅ DO: Use Supabase Edge Functions

```typescript
// GOOD - API keys stay in backend
const response = await fetch(
  `${SUPABASE_URL}/functions/v1/analyze-listing`,
  {
    headers: { 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
  }
);
```

**Why Edge Functions?**
- 🔒 API keys never exposed to client
- 🚦 Built-in rate limiting
- 📊 Usage tracking
- 🔄 Easy to update without redeploying frontend

## 💰 Cost Estimates

### Google Vision API
- **Free tier**: 1,000 units/month
- **Paid**: $1.50 per 1,000 images
- **Our usage**: ~4 features per image = 4 units

### Google Maps API
- **Free tier**: 28,000 requests/month
- **Paid**: $0.005 per request
- **Our usage**: ~2 requests per location

### OpenAI API
- **GPT-4o**: $0.01-0.03 per analysis
- **Alternative**: Use GPT-3.5-turbo for $0.002

### Example Monthly Cost

**100 listings/month:**
- Vision: 100 × $0.006 = $0.60
- Maps: 200 × $0.005 = $1.00
- OpenAI: 100 × $0.015 = $1.50
- **Total: ~$3.10/month**

**1000 listings/month:**
- Vision: 1000 × $0.006 = $6.00
- Maps: 2000 × $0.005 = $10.00
- OpenAI: 1000 × $0.015 = $15.00
- **Total: ~$31/month**

## 🧪 Testing

### Testing with Mock Services

```typescript
// No setup needed - mocks always work
const aiService = new MockAIService();
const result = await aiService.analyzeListing({
  images: ['test.jpg'],
});
expect(result.success).toBe(true);
expect(result.fallbackUsed).toBe(true);
```

### Testing with Real Services

```typescript
// Requires API keys in .env.test
const aiService = new RealAIService();
if (aiService.isAvailable()) {
  const result = await aiService.analyzeListing({
    images: ['https://example.com/test.jpg'],
  });
  expect(result.success).toBe(true);
  expect(result.fallbackUsed).toBe(false);
}
```

## 📊 Monitoring

### Service Type Indicator

All services log their type on creation:

```
✅ Using Real AI Service (Vision + LLM)
✅ Using Real Maps Service (Google Maps API)
```

or

```
🎭 Using Mock AI Service (hardcoded suggestions)
🎭 Using Mock Maps Service (Valparaíso region locations)
```

### Fallback Detection

Every service result includes `fallbackUsed` flag:

```typescript
{
  success: true,
  data: {...},
  fallbackUsed: true  // ⚠️ Mock was used
}
```

## 🔄 Migration Path

### From Mock to Real (Zero Downtime)

1. Deploy app with mocks (working perfectly)
2. Configure API keys in Supabase
3. Deploy Edge Functions
4. Users enable features in Settings when ready
5. Features work with both Mock and Real simultaneously

### Rolling Back

If issues occur:
1. User toggles feature OFF in Settings
2. App immediately switches back to Mock
3. Zero data loss, instant fallback

## 🎓 Best Practices

### 1. Always Implement Interface

```typescript
// ✅ Both Mock and Real implement same interface
class MockAIService implements IAIService { }
class RealAIService implements IAIService { }
```

### 2. Factory Pattern

```typescript
// ✅ Factory hides implementation details
export function createAIService(enabled: boolean): IAIService {
  return enabled ? new RealAIService() : new MockAIService();
}
```

### 3. Graceful Degradation

```typescript
// ✅ Always handle failures
const result = await aiService.analyzeListing(options);
if (!result.success) {
  console.error(result.error);
  // Show manual input form as fallback
}
```

### 4. User Choice

```typescript
// ✅ User controls when to use paid features
<Switch 
  checked={settings.aiEnabled}
  onCheckedChange={(checked) => updateSetting('aiEnabled', checked)}
/>
```

## 🚦 Status Dashboard

The Settings screen shows real-time status:

```
API Status
├─ AI Services: Available ✓ / Not configured
├─ Google Maps: Available ✓ / Not configured
└─ Current Mode: Real Services / Mock Data
```

## 📝 Adding New Services

To add a new service (e.g., Payment):

1. Create interface in `/lib/services/payment/PaymentService.ts`
2. Implement Mock in `MockPaymentService.ts`
3. Implement Real in `RealPaymentService.ts`
4. Create factory in `index.ts`
5. Add to ServiceProvider
6. Add setting to `settings.ts`
7. Add toggle to SettingsSheet

## 🎯 Summary

**Key Benefits:**
- ✅ Develop without API costs
- ✅ User controls when to enable features
- ✅ Zero breaking changes when upgrading
- ✅ Instant fallback if issues occur
- ✅ Easy to test both modes
- ✅ Production-ready from day 1

**Key Principle:**
> "The app works perfectly with mocks. Real APIs are an optional enhancement that users can enable when ready."
