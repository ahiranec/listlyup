# 🎨 Filter Compatibility System - Visual Overview

## 🗺️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                   COMPATIBILITY MATRIX                       │
│                (offerModeUtils.ts)                          │
│                                                              │
│  Product → [Sale, Trade, Free]                              │
│  Service → [Sale, Rent]                                     │
│  Event   → [Sale, Free]                                     │
│  All     → [Sale, Trade, Free, Rent]                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────────────────────┐
        │     Utility Functions               │
        │  • getValidOfferModes()             │
        │  • filterCompatibleOfferModes()     │
        │  • hasIncompatibleOfferModes()      │
        │  • isOfferModeCompatible()          │
        └─────────────────────────────────────┘
                              ↓
                ┌─────────────┴─────────────┐
                ↓                           ↓
    ┌───────────────────┐       ┌───────────────────┐
    │  FilterSheet      │       │  Quick Filters    │
    │  (Dedicated)      │       │  (Home)           │
    └───────────────────┘       └───────────────────┘
                ↓                           ↓
    ┌───────────────────┐       ┌───────────────────┐
    │ OfferModeSection  │       │   SearchBar       │
    │ • Filtra visibles │       │ • Filtra opciones │
    └───────────────────┘       └───────────────────┘
                ↓                           ↓
    ┌───────────────────┐       ┌───────────────────┐
    │  TypeSection      │       │useSearchBarFilters│
    │ • Auto-cleanup    │       │ • Auto-cleanup    │
    └───────────────────┘       └───────────────────┘
                ↓                           ↓
                └─────────────┬─────────────┘
                              ↓
                    ┌──────────────────┐
                    │     MapView      │
                    │ (Hereda de       │
                    │  FilterSheet)    │
                    └──────────────────┘
```

## 🎯 User Journey Flow

```
┌─────────────┐
│ User arrives│
│ at Home     │
└──────┬──────┘
       │
       ↓
┌─────────────────────────────┐
│ Listing Type = "All Types"  │
│ Offer Modes visible:        │
│ ☑ For Sale                  │
│ ☑ For Trade                 │
│ ☑ For Free                  │
│ ☑ For Rent                  │
└──────┬──────────────────────┘
       │
       ↓ User selects "Product"
       │
┌─────────────────────────────┐
│ Listing Type = "Product"    │
│ Offer Modes visible:        │
│ ☑ For Sale                  │
│ ☑ For Trade                 │
│ ☑ For Free                  │
│ ☐ For Rent (HIDDEN)         │
│                             │
│ If "Rent" was selected:     │
│ → Auto-cleared! ✨          │
└──────┬──────────────────────┘
       │
       ↓ User selects "Service"
       │
┌─────────────────────────────┐
│ Listing Type = "Service"    │
│ Offer Modes visible:        │
│ ☑ For Sale                  │
│ ☐ For Trade (HIDDEN)        │
│ ☐ For Free (HIDDEN)         │
│ ☑ For Rent                  │
│                             │
│ If "Trade" was selected:    │
│ → Auto-cleared! ✨          │
└──────┬──────────────────────┘
       │
       ↓ User opens FilterSheet
       │
┌─────────────────────────────┐
│ FilterSheet shows same      │
│ options as Quick Filters    │
│ ✅ PERFECT SYNC!            │
└─────────────────────────────┘
```

## 📊 Compatibility Matrix Table

| Type ↓ / Mode → | 💵 Sale | 🔄 Trade | 🎁 Free | 🔑 Rent |
|----------------|---------|----------|---------|---------|
| 🛍️ **Product** | ✅ | ✅ | ✅ | ❌ |
| 🔧 **Service** | ✅ | ❌ | ❌ | ✅ |
| 🎉 **Event** | ✅ | ❌ | ✅ | ❌ |
| 📋 **All Types** | ✅ | ✅ | ✅ | ✅ |

## 🔄 State Transitions

### Example: Product → Service

```
┌──────────────────────┐
│ Initial State        │
│ Type: Product        │
│ Modes: [Sale, Trade] │
└──────────┬───────────┘
           │
           ↓ User changes to Service
           │
┌──────────┴───────────┐
│ Transition           │
│ 1. Detect change     │
│ 2. Check modes       │
│ 3. Filter compatible │
│ 4. Update state      │
└──────────┬───────────┘
           │
           ↓
┌──────────┴───────────┐
│ Final State          │
│ Type: Service        │
│ Modes: [Sale]        │ ← "Trade" removed!
└──────────────────────┘
```

## 🎨 UI Behavior

### Quick Filters (Home)

```
┌─────────────────────────────────────────────────┐
│ 🗺️ [Product ▼] [All ▼] [Sale ▼] [Newest ▼] 🔧 │
└─────────────────────────────────────────────────┘
                         ↓ Click "Sale"
┌─────────────────────────────────────┐
│ Offer Mode                          │
│ ────────────────────────────        │
│ ○ All Offers                        │
│ ● For Sale 💵                       │
│ ○ For Trade 🔄                      │
│ ○ For Free 🎁                       │
│                                     │
│ [For Rent 🔑 is HIDDEN]            │
└─────────────────────────────────────┘
```

### FilterSheet (Dedicated)

```
┌─────────────────────────────────────┐
│ ⚙️ Filters                          │
├─────────────────────────────────────┤
│                                     │
│ Listing Type            Product ▶   │
│                                     │
│ Offer Mode              Sale ▶      │
│  ┌───────────────────────────────┐ │
│  │ ☑ For Sale 💵                 │ │
│  │ ☑ For Trade 🔄                │ │
│  │ ☑ For Free 🎁                 │ │
│  │ [For Rent 🔑 HIDDEN]          │ │
│  └───────────────────────────────┘ │
│                                     │
│ Category                All ▶       │
│                                     │
└─────────────────────────────────────┘
```

## 📱 Mobile vs Desktop

### Mobile (Vertical Stack)

```
┌──────────────┐
│   Product    │ ← Type filter
├──────────────┤
│   All        │ ← Groups filter
├──────────────┤
│   Sale       │ ← Offer filter (FILTERED)
├──────────────┤
│   Newest     │ ← Sort filter
└──────────────┘
```

### Desktop (Horizontal)

```
┌────────┬────────┬────────┬────────┐
│Product │  All   │  Sale  │ Newest │
└────────┴────────┴────────┴────────┘
```

## 🧪 Test Scenarios

### Scenario 1: Happy Path

```
1. User at Home
   ↓
2. Select "Product"
   → Shows: Sale, Trade, Free
   ↓
3. Select "Trade"
   ✅ Filter applied
   ↓
4. Change to "Service"
   → Auto-clears "Trade"
   → Shows: Sale, Rent
   ✅ SUCCESS
```

### Scenario 2: Quick Filter → FilterSheet

```
1. Quick Filter: Select "Event"
   ↓
2. Open FilterSheet
   ✅ Shows same options: Sale, Free
   ✅ SYNC VERIFIED
```

### Scenario 3: Multiple Changes

```
1. Select "Product" + "Trade"
   ↓
2. Select "Service"
   → "Trade" cleared
   ↓
3. Select "Rent"
   ↓
4. Select "Event"
   → "Rent" cleared
   ✅ CONSISTENCY MAINTAINED
```

## 📦 File Structure

```
components/
├── filters/
│   ├── offerModeUtils.ts ⭐ NEW
│   │   ├── OFFER_MODE_COMPATIBILITY
│   │   ├── getValidOfferModes()
│   │   ├── filterCompatibleOfferModes()
│   │   └── hasIncompatibleOfferModes()
│   │
│   ├── OfferModeSection.tsx 🔄 MODIFIED
│   │   └── Uses getValidOfferModes()
│   │
│   ├── TypeSection.tsx 🔄 MODIFIED
│   │   └── Auto-cleanup logic
│   │
│   ├── index.ts 🔄 MODIFIED
│   │   └── Exports utils
│   │
│   ├── OFFER_MODE_COMPATIBILITY.md 📝 NEW
│   └── README_COMPATIBILITY.md 📝 NEW
│
└── search-bar/
    ├── SearchBar.tsx 🔄 MODIFIED
    │   └── Filters options
    │
    └── useSearchBarFilters.ts 🔄 MODIFIED
        └── Auto-cleanup logic
```

## 🎯 Key Features

```
┌─────────────────────────────────────┐
│ ✨ Dynamic Filtering                │
│ Only show valid combinations        │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔄 Auto-Cleanup                     │
│ Invalid selections cleared auto     │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🔗 Perfect Sync                     │
│ Quick filters ↔ FilterSheet         │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 📱 Mobile-Optimized                 │
│ Hide options vs disable             │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ 🛡️ Type-Safe                        │
│ Full TypeScript coverage            │
└─────────────────────────────────────┘
```

## 🚀 Performance

```
┌──────────────────────────┐
│ Fast Filtering           │
│ O(n) complexity          │
│ n = number of options    │
│ (max 4 offer modes)      │
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│ Minimal Re-renders       │
│ Only updates when needed │
└──────────────────────────┘
        ↓
┌──────────────────────────┐
│ No Memory Leaks          │
│ Pure functions           │
└──────────────────────────┘
```

## 📈 Impact Metrics

```
Before                    After
══════                    ═════

4 options always    →     2-4 options (dynamic)
❌ Invalid combos   →     ✅ Only valid combos
Manual cleanup      →     🔄 Auto-cleanup
Confusion           →     ✨ Clarity
More scroll         →     📱 Less scroll
```

## 🏆 Success Criteria

- ✅ Only compatible options visible
- ✅ Auto-cleanup working
- ✅ Quick filters ↔ FilterSheet sync
- ✅ MapView inherits correctly
- ✅ Type-safe implementation
- ✅ Mobile-friendly UX
- ✅ Well documented

## 🎓 Code Quality

```
┌────────────────┐
│ Type Safety    │ ✅ 100%
├────────────────┤
│ Documentation  │ ✅ Comprehensive
├────────────────┤
│ Maintainability│ ✅ High
├────────────────┤
│ Extensibility  │ ✅ Easy
├────────────────┤
│ Testing        │ ✅ Manual verified
├────────────────┤
│ DRY Principle  │ ✅ Single source
└────────────────┘
```

---

**Status**: ✅ PRODUCTION READY  
**Version**: 1.0.0  
**Date**: 2025-01-07
