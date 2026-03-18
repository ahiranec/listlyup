# 🔄 CANONICAL ALIGNMENT IMPLEMENTATION REPORT

**Date:** 2026-03-18  
**Status:** Phase 1 Complete - Foundation Laid  
**Next Phase:** Component Migration (Manual Review Required)

---

## 📋 EXECUTIVE SUMMARY

**Objective:** Align ListlyUp frontend with canonical backend/frontend contract.

**Approach:** Incremental, non-breaking migration using adapter pattern.

**Phase 1 Status:** ✅ **COMPLETE**
- Canonical types defined
- Mappers created
- Adapters implemented
- Type system prepared
- Zero breaking changes

**Phase 2 Status:** 🟡 **READY FOR MANUAL REVIEW**
- Component updates required
- Mock data migration needed
- UI label updates required

---

## 1. FILES CHANGED

### **Created Files (3)**

#### `/types/canonical.ts` ✅
**Purpose:** Single source of truth for canonical backend/frontend contract

**Contents:**
- `CanonicalListing` interface (full contract)
- `CanonicalUser` interface
- `CanonicalGroup` interface
- `CanonicalConversation` interface
- `CanonicalMessage` interface
- `ListingQuestion` / `ListingQuestionAnswer` interfaces
- `CanonicalLocation` interface
- All canonical enums:
  - `ListingType`, `OfferMode`, `VisibilityMode`
  - `ContactMethod`, `AccessMode`, `ListingStatus`
  - `EventDurationType`, `PricingModel`, `ProductCondition`
- Mapper functions (12 total):
  - Legacy ↔ Canonical conversions
  - Backward compatibility helpers

**Impact:** Foundation for entire alignment. Non-breaking (new file).

---

#### `/utils/canonicalAdapters.ts` ✅
**Purpose:** Bridge legacy Product interface with canonical contracts during transition

**Contents:**
- `productToCanonical()` - Convert legacy Product → CanonicalListing
- `canonicalToProduct()` - Convert CanonicalListing → legacy Product
- `applyCanonicalFields()` - Partial update helper
- `validateCanonicalCompliance()` - Validation checker
- Batch conversion helpers

**Impact:** Enables gradual component migration. Zero breaking changes.

---

#### `/CANONICAL_ALIGNMENT_REPORT.md` ✅
**Purpose:** This document. Implementation tracking and manual review checklist.

---

### **Modified Files (1)**

#### `/types/index.ts` ✅
**Changes:**
- Added re-export: `export * from './canonical'`
- Updated comments to indicate canonical types location
- Preserved all legacy types for backward compatibility

**Impact:** Canonical types now available throughout codebase. Non-breaking.

---

## 2. WHAT WAS UPDATED

### **Type System**

#### **Canonical Enums Created:**
```typescript
// BEFORE: Multiple inconsistent type definitions scattered
// AFTER: Single source of truth

ListingType = 'product' | 'service' | 'event'
OfferMode = 'sell' | 'trade' | 'giveaway' | 'sell_or_trade' | 'for_sale' | 'for_rent' | 'free' | 'paid'
VisibilityMode = 'public' | 'groups_only'
ContactMethod = 'in_app_chat' | 'whatsapp' | 'website' | 'social_media'
AccessMode = 'pickup' | 'meetup' | 'delivery' | 'virtual'
ListingStatus = 'active' | 'paused' | 'sold'
```

#### **Key Canonical Rules Implemented:**

1. **Contact Model:**
   - ❌ OLD: `contactModes: ['chat', 'phone', 'whatsapp']` + `phoneNumber`
   - ✅ NEW: `contact_methods: ['in_app_chat', 'whatsapp', 'website', 'social_media']`
   - ✅ NEW: `contact_whatsapp_phone`, `contact_website_url`, `contact_social_url`

2. **Type Split:**
   - ❌ OLD: `type: 'sale' | 'service' | 'event' | ...` (conflated)
   - ✅ NEW: `listing_type` + `offer_mode` (separated)

3. **Visibility:**
   - ❌ OLD: `visibility: 'public' | 'group' | 'private'`
   - ✅ NEW: `visibility_mode: 'public' | 'groups_only'`

4. **Access Model:**
   - ❌ OLD: `deliveryModes: ['pickup', 'shipping', ...]`
   - ✅ NEW: `access_mode: ['pickup', 'meetup', 'delivery', 'virtual']`

5. **Field Naming:**
   - ❌ OLD: `ownerId`, `image`, `createdAt`, `groupIds`
   - ✅ NEW: `owner_user_id`, `primary_image_url`, `created_at`, (groups in join table)

6. **Status:**
   - ❌ OLD: 6 statuses including `draft`, `pending`, `rejected`, `archived`
   - ✅ NEW: 3 MVP statuses: `active`, `paused`, `sold`

---

### **Mapper Functions**

**12 mapper functions implemented for bidirectional conversion:**

| Function | Purpose |
|----------|---------|
| `mapLegacyTypeToCanonical()` | Split combined `type` → `listing_type` + `offer_mode` |
| `mapCanonicalToLegacyType()` | Combine canonical → legacy `type` |
| `mapLegacyContactModes()` | Convert `['chat', 'whatsapp']` → `['in_app_chat', 'whatsapp']` |
| `mapCanonicalContactToLegacy()` | Reverse contact conversion |
| `mapLegacyVisibility()` | `'group'` → `'groups_only'` |
| `mapCanonicalVisibilityToLegacy()` | Reverse visibility conversion |
| `mapLegacyDeliveryToAccess()` | `deliveryModes` → `access_mode` |
| `mapCanonicalAccessToLegacy()` | Reverse access conversion |
| `productToCanonical()` | Full Product → CanonicalListing |
| `canonicalToProduct()` | Full CanonicalListing → Product |
| `applyCanonicalFields()` | Partial updates |
| `validateCanonicalCompliance()` | Validation checker |

---

## 3. WHAT WAS KEPT AS-IS

### **Legacy Types (Preserved)**

**Why:** Gradual migration strategy. Zero breaking changes during Phase 1.

**Preserved:**
- `Product` interface in `/data/products.ts` ✅
- `Product` interface in `/types/index.ts` ✅
- `PublishFormData` in `/components/publish/types.ts` ✅
- All component prop types ✅
- All mock data structures ✅

**Status:** Marked with comments indicating canonical equivalents.

---

### **Components (Untouched)**

**Phase 1 did NOT update components.** This is intentional.

**Components requiring Phase 2 updates:**

1. **Publish Flow** 🔴 **CRITICAL**
   - `/components/publish/PublishFlow.tsx`
   - `/components/publish/BasicInfoStepV2.tsx`
   - `/components/publish/PricingStep.tsx`
   - `/components/publish/types.ts`
   
2. **Product Detail** 🔴 **CRITICAL**
   - `/components/ProductDetailPage.tsx`
   - `/components/product-detail/ContactMethods.tsx`
   - `/components/product-detail/ProductMetadataCompact.tsx`
   
3. **My Listings** 🟡 **HIGH**
   - `/components/MyListingsPage.tsx`
   - `/components/my-listings/` (all files)
   
4. **Profile** 🟡 **HIGH**
   - `/components/profile/PublishingContactPage.tsx`
   - `/components/profile/PublishingVisibilityPage.tsx`
   - `/components/profile/types.ts`
   
5. **Filters** 🟡 **HIGH**
   - `/components/filters/ContactSection.tsx`
   - `/components/filters/TypeSection.tsx`
   - `/components/filters/OfferModeSection.tsx`
   - `/hooks/useAppFilters.ts`
   
6. **Settings** 🟢 **MEDIUM**
   - `/components/settings/` (contact defaults)
   
7. **Action Center** 🟢 **LOW**
   - Uses Product interface, will work with adapters
   
8. **My Groups** 🟢 **LOW**
   - Minimal listing interaction

---

### **Mock Data (Untouched)**

**Phase 1 did NOT update mock data.**

**Files requiring Phase 2 migration:**
- `/data/products.ts` (54 Product instances)
- `/data/mockUserListings.ts`
- `/data/trailListings.ts`
- `/data/currentUser.ts` (user defaults)
- `/data/mockUsers.ts`

**Migration Path:**
```typescript
// BEFORE
export const mockProducts: Product[] = [...]

// AFTER (Phase 2)
export const mockProducts: CanonicalListing[] = [...]

// OR (Transitional)
import { productToCanonical } from '../utils/canonicalAdapters';
export const canonicalProducts = mockProducts.map(productToCanonical);
```

---

## 4. TEMPORARY ADAPTERS USED

### **Adapter Pattern Strategy**

**Why adapters?**
- Enables gradual migration
- Zero breaking changes
- Components can adopt canonical incrementally
- Easy rollback if issues arise

---

### **Adapter 1: Type Conversion**

**Location:** `/utils/canonicalAdapters.ts`

**Usage:**
```typescript
import { productToCanonical, canonicalToProduct } from '../utils/canonicalAdapters';

// When passing legacy Product to canonical-aware component:
const canonicalListing = productToCanonical(legacyProduct);
<CanonicalComponent listing={canonicalListing} />

// When canonical data needs to display in legacy component:
const legacyProduct = canonicalToProduct(canonicalListing);
<LegacyComponent product={legacyProduct} />
```

---

### **Adapter 2: Field Mappers**

**Location:** `/types/canonical.ts`

**Usage:**
```typescript
import { 
  mapLegacyTypeToCanonical,
  mapLegacyContactModes,
  mapLegacyVisibility 
} from '../types/canonical';

// Split type field
const { listing_type, offer_mode } = mapLegacyTypeToCanonical(product.type);

// Map contact modes
const contact_methods = mapLegacyContactModes(product.contactModes);

// Map visibility
const visibility_mode = mapLegacyVisibility(product.visibility);
```

---

### **Adapter 3: Validation Helper**

**Location:** `/utils/canonicalAdapters.ts`

**Usage:**
```typescript
import { validateCanonicalCompliance } from '../utils/canonicalAdapters';

const errors = validateCanonicalCompliance(product);
if (errors.length > 0) {
  console.warn('Canonical compliance issues:', errors);
  // e.g., "contactModes includes 'phone' (should use whatsapp only)"
}
```

---

## 5. REMAINING MANUAL REVIEW ITEMS

### **Phase 2: Component Migration** 🔴 **REQUIRED**

#### **Priority 1: Publish Flow** (Est: 4 hours)

**Files:**
- `/components/publish/types.ts`
- `/components/publish/BasicInfoStepV2.tsx`
- `/components/publish/PricingStep.tsx`

**Changes Required:**

1. **Update `PublishFormData` interface:**
```typescript
// CURRENT
contactModes: ('chat' | 'phone' | 'whatsapp')[];
phoneNumber?: string;

// CANONICAL
contact_methods: ContactMethod[];
contact_whatsapp_phone?: string;
contact_website_url?: string;
contact_social_url?: string;
```

2. **Remove phone toggle, add website/social inputs:**
```tsx
// REMOVE
<Checkbox label="Phone" value="phone" />

// ADD
<Checkbox label="Website" value="website" />
<Checkbox label="Social Media" value="social_media" />
{contact_methods.includes('website') && (
  <Input placeholder="Website URL" />
)}
{contact_methods.includes('social_media') && (
  <Input placeholder="Social Media URL" />
)}
```

3. **Update visibility selector:**
```tsx
// CURRENT
<Select value="public" | "groups">

// CANONICAL
<Select value="public" | "groups_only">
```

4. **Split type selection into listing_type + offer_mode:**
```tsx
// Step 1: Select listing_type (product/service/event)
// Step 2: Select offer_mode based on listing_type
```

---

#### **Priority 2: Product Detail** (Est: 3 hours)

**Files:**
- `/components/ProductDetailPage.tsx`
- `/components/product-detail/ContactMethods.tsx`

**Changes Required:**

1. **Update Contact Methods display:**
```tsx
// CURRENT
{contactModes?.includes('chat') && <ChatButton />}
{contactModes?.includes('whatsapp') && <WhatsAppButton />}
{contactModes?.includes('phone') && <PhoneButton />} // REMOVE

// CANONICAL
{contact_methods?.includes('in_app_chat') && <ChatButton />}
{contact_methods?.includes('whatsapp') && <WhatsAppButton phone={contact_whatsapp_phone} />}
{contact_methods?.includes('website') && <WebsiteButton url={contact_website_url} />}
{contact_methods?.includes('social_media') && <SocialButton url={contact_social_url} />}
```

2. **Update Access Mode display:**
```tsx
// CURRENT
{deliveryModes?.includes('shipping') && ...}

// CANONICAL
{access_mode?.includes('delivery') && ...}
```

---

#### **Priority 3: Profile Defaults** (Est: 2 hours)

**Files:**
- `/components/profile/PublishingContactPage.tsx`
- `/components/profile/types.ts`

**Changes Required:**

1. **Replace boolean flags with single selection:**
```typescript
// CURRENT
defaultContact: {
  inAppChat: boolean;
  whatsapp: boolean;
  phone: boolean;    // REMOVE
  email: boolean;    // REMOVE
}

// CANONICAL
default_contact_method: ContactMethod; // Single selection
default_whatsapp_phone?: string;
default_website_url?: string;
default_social_url?: string;
```

2. **Update UI to radio group:**
```tsx
// CURRENT: 4 switches
<Switch label="In-app Chat" />
<Switch label="WhatsApp" />
<Switch label="Phone" />     // REMOVE
<Switch label="Email" />      // REMOVE

// CANONICAL: 1 radio group + conditional inputs
<RadioGroup value={default_contact_method}>
  <Radio value="in_app_chat">In-app Chat</Radio>
  <Radio value="whatsapp">WhatsApp</Radio>
  <Radio value="website">Website</Radio>
  <Radio value="social_media">Social Media</Radio>
</RadioGroup>

{default_contact_method === 'whatsapp' && (
  <Input placeholder="WhatsApp Phone" value={default_whatsapp_phone} />
)}
{default_contact_method === 'website' && (
  <Input placeholder="Website URL" value={default_website_url} />
)}
{default_contact_method === 'social_media' && (
  <Input placeholder="Social Media URL" value={default_social_url} />
)}
```

---

#### **Priority 4: Filters** (Est: 3 hours)

**Files:**
- `/components/filters/ContactSection.tsx`
- `/components/filters/TypeSection.tsx`
- `/components/filters/types.ts`

**Changes Required:**

1. **Contact filter options:**
```typescript
// CURRENT
contactModes: ['chat', 'phone', 'whatsapp']

// CANONICAL
contact_methods: ['in_app_chat', 'whatsapp', 'website', 'social_media']
```

2. **Type filter split:**
```typescript
// CURRENT
type: 'product' | 'service' | 'event' | 'sale' | 'trade' | ... (conflated)

// CANONICAL
listing_type: 'product' | 'service' | 'event'
offer_mode: 'sell' | 'trade' | 'giveaway' | ...
```

3. **Visibility filter:**
```typescript
// CURRENT
visibility: ['public', 'group', 'private']

// CANONICAL
visibility_mode: ['public', 'groups_only']
```

---

#### **Priority 5: Mock Data Migration** (Est: 2 hours)

**Files:**
- `/data/products.ts`
- `/data/mockUserListings.ts`

**Strategy Options:**

**Option A: Full Migration**
```typescript
// Change Product[] → CanonicalListing[]
export const mockProducts: CanonicalListing[] = [
  {
    listing_type: 'product',
    offer_mode: 'sell',
    contact_methods: ['in_app_chat', 'whatsapp'],
    contact_whatsapp_phone: '+56987654321',
    visibility_mode: 'public',
    access_mode: ['pickup', 'delivery'],
    // ... all canonical fields
  }
];
```

**Option B: Adapter Pattern** (Recommended for safety)
```typescript
// Keep current Product[] structure
export const mockProductsLegacy: Product[] = [...];

// Export canonical version using adapter
import { productsToCanonical } from '../utils/canonicalAdapters';
export const mockProducts = productsToCanonical(mockProductsLegacy);
```

---

### **Phase 3: Cleanup** 🟢 **OPTIONAL**

**After Phase 2 complete and tested:**

1. Remove adapter functions (if 100% migrated)
2. Remove legacy type aliases
3. Remove mapper functions
4. Consolidate to pure canonical types

**Estimated:** 2 hours

---

## 📊 MIGRATION CHECKLIST

### **Phase 1: Foundation** ✅ **COMPLETE**
- [x] Create `/types/canonical.ts`
- [x] Create `/utils/canonicalAdapters.ts`
- [x] Update `/types/index.ts` with re-exports
- [x] Document mapper functions
- [x] Create this report

### **Phase 2: Component Migration** 🟡 **IN PROGRESS**
- [ ] Update Publish Flow types and UI
- [ ] Update Product Detail contact display
- [ ] Update Profile default contact UI
- [ ] Update Filters (contact, type, visibility)
- [ ] Migrate mock data (or use adapters)
- [ ] Test all flows end-to-end

### **Phase 3: Cleanup** ⏳ **PENDING**
- [ ] Remove adapters (if fully migrated)
- [ ] Remove legacy type aliases
- [ ] Update documentation
- [ ] Final validation

---

## 🎯 SUCCESS CRITERIA

### **Phase 1** ✅
- [x] Canonical types exist
- [x] Adapters work bidirectionally
- [x] Zero breaking changes
- [x] Types available throughout codebase

### **Phase 2** 🔄
- [ ] Publish Flow uses canonical contact model
- [ ] Product Detail displays canonical fields correctly
- [ ] Profile defaults use canonical structure
- [ ] Filters use canonical enums
- [ ] All `validateCanonicalCompliance()` checks pass
- [ ] Mock data conforms to canonical
- [ ] Zero runtime errors
- [ ] All flows functional

### **Phase 3** ⏳
- [ ] Zero adapter usage
- [ ] Zero legacy type references
- [ ] Clean canonical-only codebase

---

## ⚠️ CRITICAL NOTES

### **DO NOT:**
1. ❌ **DO NOT** delete legacy types until Phase 2 complete
2. ❌ **DO NOT** update mocks without component updates
3. ❌ **DO NOT** change canonical contracts without backend alignment
4. ❌ **DO NOT** skip adapter validation checks

### **DO:**
1. ✅ **DO** use adapters during transition
2. ✅ **DO** validate canonical compliance regularly
3. ✅ **DO** test each component after migration
4. ✅ **DO** update one priority area at a time
5. ✅ **DO** keep legacy code until 100% migrated

---

## 📈 RISK ASSESSMENT

### **Low Risk** 🟢
- Phase 1 changes (complete, zero breaking)
- Adapter pattern (tested, reversible)
- Gradual migration (one component at a time)

### **Medium Risk** 🟡
- Contact model UI changes (user-facing)
- Type filter split (UI redesign needed)
- Profile defaults UX (behavioral change)

### **High Risk** 🔴
- Full mock data migration (impacts all components)
- Removing adapters prematurely (breaking change)

**Mitigation:** Follow phases strictly. Do not skip testing.

---

## 🔧 NEXT STEPS

### **Immediate (Today)**
1. Review this report
2. Approve Phase 2 priority order
3. Begin Publish Flow migration

### **This Week**
1. Complete Priority 1-3 (Publish, Detail, Profile)
2. Test end-to-end flows
3. Validate canonical compliance

### **Next Week**
1. Complete Priority 4-5 (Filters, Mocks)
2. Full QA pass
3. Plan Phase 3 cleanup

---

## ✅ SIGN-OFF

**Phase 1 Status:** ✅ **PRODUCTION READY**
- Foundation laid
- Zero breaking changes
- Adapters functional
- Ready for Phase 2

**Phase 2 Status:** 🟡 **AWAITING MANUAL REVIEW**
- Component updates required
- See Priority 1-5 above
- Estimated: 14 hours total

**Recommended Approach:** Incremental, test-driven migration following priority order.

---

**END OF REPORT** 📋✨
