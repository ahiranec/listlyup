# Group Filters - Bottom Sheet System

## 📋 Overview

Complete refactoring of Group Filters to match **exactly** the visual style, layout, and behavior of the Listings FilterSheet. The system now uses a **bottom sheet** (side="bottom") instead of a side drawer, with 11 filter sections based on the updated database model.

---

## 🎯 Design Principles

✅ **EXACT match** with Listings FilterSheet:
- Same bottom sheet container (92vh height, rounded-t-3xl)
- Same collapsible card components
- Same spacing, padding, typography, icons
- Same footer layout (Reset All + Apply Filters)
- Same handle bar at top
- Same visual hierarchy (title bold, subtitle gray with "·" prefix)

---

## 📊 Filter Sections (11 Total)

### 1️⃣ **Status**
- **Subtitle**: "· All status"
- **Type**: Checkbox multi-select
- **Values**: 
  - `active` - Group is active
  - `suspended` - Temporarily suspended
  - `archived` - Archived for history
  - `deleted` - Soft deleted
- **Default**: All selected

### 2️⃣ **Group Type** (NEW ENUM)
- **Subtitle**: "· All types"
- **Type**: Checkbox multi-select
- **Values**:
  - `general` - General purpose group
  - `event` - Event-specific group
  - `community` - Community group
  - `marketplace` - Marketplace/commerce group
- **Default**: All selected

### 3️⃣ **Visibility**
- **Subtitle**: "· All visibility"
- **Type**: Checkbox multi-select
- **Values**:
  - `public` - Visible to everyone
  - `discoverable` - Searchable but not public
  - `invite_only` - Only via invitation
  - `hidden` - Completely hidden
- **Default**: All selected

### 4️⃣ **Join Policy**
- **Subtitle**: "· All policies"
- **Type**: Checkbox multi-select
- **Values**:
  - `open` - Anyone can join
  - `request` - Must request to join
  - `approval_required` - Admin approval needed
  - `closed` - No new members
- **Default**: All selected

### 5️⃣ **Location**
- **Subtitle**: "· All locations"
- **Type**: Hierarchical collapsible
- **Structure**:
  1. Country selection (radio-style)
  2. Municipality multi-select (when country selected)
  3. "Include nearby municipalities" toggle
- **Default**: No specific selection
- **Note**: Does NOT show location_privacy (that's a group setting, not a filter)

### 6️⃣ **Category**
- **Subtitle**: "· All categories"
- **Type**: Hierarchical collapsible
- **Structure**:
  1. Category selection
  2. Subcategory multi-select (when category selected)
- **Default**: No category selected
- **Note**: Uses GROUP categories (not listing categories)

### 7️⃣ **Tags**
- **Subtitle**: "· No tags selected"
- **Type**: Multi-select list
- **Default**: No tags selected
- **Max height**: 250px with scroll

### 8️⃣ **Members**
- **Subtitle**: "· All members"
- **Type**: Multi-select list
- **Source**: Users who belong to any of my groups
- **Default**: None selected
- **Max height**: 250px with scroll

### 9️⃣ **Member Role**
- **Subtitle**: "· All roles"
- **Type**: Checkbox multi-select
- **Values**:
  - `admin` - Group administrators
  - `moderator` - Group moderators
  - `member` - Regular members
- **Default**: All selected

### 🔟 **Member Status**
- **Subtitle**: "· All statuses"
- **Type**: Checkbox multi-select
- **Values**:
  - `invited` - Invited but not joined
  - `pending` - Join request pending
  - `joined` - Active member
  - `removed` - Removed from group
- **Default**: All selected

### 1️⃣1️⃣ **Content** (Derived)
- **Subtitle**: "· All content"
- **Type**: Checkbox multi-select
- **Options**:
  - Has Products
  - Has Services
  - Has Events
  - Has Experiences
- **Default**: None selected
- **Note**: These are derived from group listings, not direct DB fields

---

## 🏗️ Architecture

```
/components/groups/
├── filters/
│   ├── StatusSection.tsx          # Status filter
│   ├── GroupTypeSection.tsx       # Group type filter
│   ├── VisibilitySection.tsx      # Visibility filter
│   ├── JoinPolicySection.tsx      # Join policy filter
│   ├── LocationSection.tsx        # Location (Country → Municipality)
│   ├── CategorySection.tsx        # Category + Subcategory
│   ├── TagsSection.tsx            # Tags multi-select
│   ├── MembersSection.tsx         # Members multi-select
│   ├── MemberRoleSection.tsx      # Member role filter
│   ├── MemberStatusSection.tsx    # Member status filter
│   ├── ContentSection.tsx         # Content type filter
│   ├── index.ts                   # Barrel export
│   └── README.md                  # This file
├── GroupFiltersSheetNew.tsx       # Main bottom sheet component
├── GroupFiltersSheet.tsx          # Legacy (side drawer)
├── newTypes.ts                    # New type definitions
└── types.ts                       # Legacy types
```

---

## 📝 Type Definitions

### GroupFilterState
```typescript
export interface GroupFilterState {
  // Status
  status: Set<GroupStatus>;
  
  // Group Type
  groupType: Set<GroupType>;
  
  // Visibility
  visibility: Set<GroupVisibility>;
  
  // Join Policy
  joinPolicy: Set<JoinPolicy>;
  
  // Location
  selectedCountry: string | null;
  selectedMunicipalities: Set<string>;
  includeNearby: boolean;
  
  // Category
  selectedCategory: string | null;
  selectedSubcategories: Set<string>;
  
  // Tags
  selectedTags: Set<string>;
  
  // Members
  selectedMembers: Set<string>;
  
  // Member Role
  memberRole: Set<MemberRole>;
  
  // Member Status
  memberStatus: Set<MemberStatus>;
  
  // Content
  hasProducts: boolean;
  hasServices: boolean;
  hasEvents: boolean;
  hasExperiences: boolean;
}
```

### Enums
```typescript
type GroupStatus = "active" | "suspended" | "archived" | "deleted";
type GroupType = "general" | "event" | "community" | "marketplace";
type GroupVisibility = "public" | "discoverable" | "invite_only" | "hidden";
type JoinPolicy = "open" | "request" | "approval_required" | "closed";
type MemberRole = "admin" | "moderator" | "member";
type MemberStatus = "invited" | "pending" | "joined" | "removed";
```

---

## 💻 Usage Example

```tsx
import { GroupFiltersSheetNew } from "./components/groups";
import type { GroupFilterState } from "./components/groups";

function MyGroupsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<GroupFilterState>({
    status: new Set(["active", "suspended", "archived", "deleted"]),
    groupType: new Set(["general", "event", "community", "marketplace"]),
    visibility: new Set(["public", "discoverable", "invite_only", "hidden"]),
    joinPolicy: new Set(["open", "request", "approval_required", "closed"]),
    selectedCountry: null,
    selectedMunicipalities: new Set(),
    includeNearby: false,
    selectedCategory: null,
    selectedSubcategories: new Set(),
    selectedTags: new Set(),
    selectedMembers: new Set(),
    memberRole: new Set(["admin", "moderator", "member"]),
    memberStatus: new Set(["invited", "pending", "joined", "removed"]),
    hasProducts: false,
    hasServices: false,
    hasEvents: false,
    hasExperiences: false,
  });

  return (
    <>
      <button onClick={() => setIsFilterOpen(true)}>
        Filters
      </button>

      <GroupFiltersSheetNew
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={filters}
        activeFilterCount={calculateActiveFilters(filters)}
        countries={mockCountries}
        categories={mockCategories}
        tags={mockTags}
        members={mockMembers}
        onStatusChange={(status) => toggleInSet(filters.status, status)}
        // ... more handlers
        onClearAll={() => setFilters(defaultFilters)}
      />
    </>
  );
}
```

---

## 🎨 Visual Specifications

### Bottom Sheet
- **Side**: `bottom`
- **Height**: `h-[92vh]`
- **Border Radius**: `rounded-t-3xl` (top corners only)
- **Border**: `border-t border-gray-200/50`
- **Shadow**: `shadow-2xl`

### Handle Bar
- **Width**: `w-12`
- **Height**: `h-1`
- **Color**: `bg-gray-300`
- **Border Radius**: `rounded-full`
- **Position**: Centered, 12px from top

### Header
- **Padding**: `px-4 sm:px-6 pb-3`
- **Border**: `border-b border-gray-200/50`
- **Title**: `text-lg font-semibold`
- **Buttons**: Ghost variant for "Clear all", rounded-full for close (X)

### Content Area
- **Padding**: `px-4 sm:px-6`
- **Spacing**: `space-y-3 py-4` (between sections)
- **Scroll**: `overflow-y-auto` with `flex-1`

### Footer
- **Padding**: `p-4 sm:p-6`
- **Border**: `border-t border-gray-200/50`
- **Background**: `bg-white`
- **Layout**: Flex with gap-3, two equal-width buttons

### Filter Sections (Cards)
- **Component**: `FilterSection` from `/components/filters/FilterSection.tsx`
- **Title**: Bold with icon
- **Subtitle**: Gray with "·" prefix (e.g., "· All status")
- **Padding**: `p-1.5` for options
- **Hover**: `hover:bg-muted/30`
- **Transition**: `transition-colors`

---

## 🔄 Migration from Legacy

### Old (Side Drawer)
```tsx
<GroupFiltersSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  filters={legacyFilters}
  onFiltersChange={setLegacyFilters}
  onClearAll={clearLegacyFilters}
  locations={mockLocations}
  activeFilterCount={count}
/>
```

### New (Bottom Sheet)
```tsx
<GroupFiltersSheetNew
  open={isOpen}
  onOpenChange={setIsOpen}
  filters={newFilters}
  activeFilterCount={count}
  countries={mockCountries}
  categories={mockCategories}
  tags={mockTags}
  members={mockMembers}
  onStatusChange={handleStatusChange}
  // ... 14 more specific handlers
  onClearAll={clearAllFilters}
/>
```

---

## ✅ Checklist

- [x] 11 filter sections created
- [x] Bottom sheet container (matches Listings)
- [x] Handle bar at top
- [x] Collapsible cards with FilterSection
- [x] All subtitles start with "·"
- [x] Same spacing/padding as Listings
- [x] Same footer layout (Reset All + Apply)
- [x] New enums (GroupStatus, GroupType, Visibility, JoinPolicy)
- [x] Location hierarchy (Country → Municipality)
- [x] Category hierarchy (Category → Subcategory)
- [x] Content derived filters
- [x] Type definitions (newTypes.ts)
- [x] Documentation (this README)

---

## 🚀 Next Steps

1. **Integration**: Update MyGroupsPage to use GroupFiltersSheetNew
2. **Mock Data**: Create mock countries, categories, tags, members
3. **Backend**: Connect to real API endpoints
4. **Testing**: Verify all filters work correctly
5. **Migration**: Deprecate old GroupFiltersSheet
6. **Cleanup**: Remove legacy components once migration complete

---

**Last Updated**: December 2024  
**Version**: 2.0.0 (Bottom Sheet Refactor)  
**Status**: ✅ Complete
