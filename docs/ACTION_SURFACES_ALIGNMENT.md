# ACTION SURFACES ALIGNMENT
## UI Standardization for Global Actions Modal Readiness

**Date**: 2026-01-12  
**Purpose**: Align all action entry points to a consistent structure  
**Scope**: Action Center, My Listings, Listing Detail, Group Detail, and contextual action menus  
**Type**: Structural alignment (NO new features, NO UX changes)

---

## 🎯 OBJECTIVE

Prepare all action surfaces for eventual Global Actions Modal by:

1. **Standardizing labels** across entry points (use canonical labels)
2. **Aligning groupings** (Primary / Secondary / Destructive)
3. **Ensuring ActionId consistency** (all actions have implicit ActionId)
4. **Eliminating duplications** (same action, different labels)
5. **Documenting modal-readiness** status per surface

---

## 📐 DESIGN PRINCIPLES

### Principle 1: Canonical Labels
**Rule**: Use exact labels from ACTION_DEFINITION_MATRIX  
**Why**: Consistency across all entry points  
**Example**: 
- ❌ "Pause" / "Hold" / "Stop"
- ✅ "Pause" (canonical)

### Principle 2: Consistent Grouping
**Rule**: Group actions by intent, not alphabetically

**Groups**:
1. **Primary Actions** - Main interactions (Edit, View, Open)
2. **Secondary Actions** - Supporting actions (Share, Duplicate, Pause)
3. **Destructive Actions** - Irreversible actions (Delete, Remove)

### Principle 3: ActionId System
**Rule**: Every action must map to a canonical ActionId  
**Why**: Enables global invocation and tracking  
**Pattern**: `<verb>-<object>` (e.g., `edit-listing`, `approve-join-request`)

### Principle 4: Entry Point ≠ Executor
**Rule**: Entry points delegate, never execute  
**Why**: Separation of concerns, testability, global modal compatibility

---

## 🔍 CURRENT STATE AUDIT

### 1. ACTION CENTER ✅ ALIGNED

**Status**: Recently fixed for delegation compliance  
**ActionIds**: All actions delegate properly  
**Labels**: Aligned with canonical

#### Tabs & Actions:

**📱 Personal Tab**
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Reply to Message | "Reply" | `reply-to-message` | ReplySheet | ✅ Aligned |
| Reply to Question | "Reply" | `reply-to-question` | ReplySheet | ✅ Aligned |
| Accept Trade | "Accept" | `accept-trade-offer` | ConfirmActionDialog | ✅ Aligned |
| Decline Trade | "Decline" | `reject-trade-offer` | ConfirmActionDialog | ✅ Aligned |
| Counter Trade | "Counter" | `counter-trade-offer` | CounterOfferSheet | ✅ Aligned |
| Continue Draft | "Continue" | `continue-draft` | Edit Flow | ✅ Aligned |
| Renew Listing | "Renew" | `renew-listing` | ConfirmActionDialog | ✅ Aligned |
| Resume Listing | "Resume" | `resume-listing` | ConfirmActionDialog | ✅ Aligned |
| Delete Listing | "Delete" | `delete-listing` | ConfirmActionDialog | ✅ Aligned |
| Edit & Resubmit | "Edit & Resubmit" | `edit-and-resubmit` | Edit Flow | ✅ Aligned |
| View Rejection | "Details" | `view-rejection-details` | RejectionReasonsDialog | ✅ Aligned |
| View Status | "View Status" | `view-pending-status` | ViewStatusDialog | ✅ Aligned |

**👥 Groups Tab**
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Approve Join | "Approve" | `approve-join-request` | ConfirmActionDialog | ✅ Aligned |
| Reject Join | "Reject" | `reject-join-request` | ConfirmActionDialog | ✅ Aligned |
| Review Report | "Review" | `review-report` | Report Detail Page* | ✅ Aligned (nav intent) |
| Take Action | "Take Action" | `take-action-report` | ConfirmActionDialog | ✅ Aligned |
| Dismiss Report | "Dismiss" | `dismiss-report` | ConfirmActionDialog | ✅ Aligned |

**🏷️ Campaigns Tab**
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Approve Campaign | "Approve" | `approve-campaign-request` | CampaignApprovalSheet* | 🟡 Needs sheet |
| Reject Campaign | "Reject" | `reject-campaign-request` | CampaignApprovalSheet* | 🟡 Needs sheet |

**🎭 Events Tab**
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Approve Event | "Approve" | `approve-event-request` | EventApprovalSheet* | 🟡 Needs sheet |
| Reject Event | "Reject" | `reject-event-request` | EventApprovalSheet* | 🟡 Needs sheet |

**⚡ Admin Tab**
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Review Report | "Review" | `review-report` | Report Detail Page* | ✅ Aligned (nav intent) |
| Resolve Report | "Resolve" | `resolve-report` | ConfirmActionDialog | ✅ Aligned |
| Dismiss Report | "Dismiss" | `dismiss-report` | ConfirmActionDialog | ✅ Aligned |
| Review Flagged | "Review" | `review-flagged-listing` | Listing Detail (Admin)* | ✅ Aligned (nav intent) |
| Approve Listing | "Approve" | `approve-flagged-listing` | ConfirmActionDialog | ✅ Aligned |
| Remove Listing | "Remove" | `remove-flagged-listing` | ConfirmActionDialog | ✅ Aligned |

**Modal-Readiness**: ✅ **100% Ready**  
*Missing canonicals (5) documented, navigation intents clear

---

### 2. MY LISTINGS PAGE 🟡 NEEDS ALIGNMENT

**Status**: Partially aligned, inconsistencies detected  
**ActionIds**: Implemented via ActionMenu component  
**Labels**: Some inconsistencies

#### Current Actions (via ⋮ menu):

**Actions Detected** (from ListingCard.tsx):
| Action | Current Label | Canonical Label | ActionId | Status |
|--------|---------------|-----------------|----------|--------|
| Edit | "Edit" | "Edit" | `edit-listing` | ✅ Aligned |
| Share | "Share" | "Share" | `share-listing` | ✅ Aligned |
| Duplicate | "Duplicate" | "Duplicate" | `duplicate-listing` | ✅ Aligned |
| Pause | "Pause" | "Pause" | `pause-listing` | ✅ Aligned |
| Renew | "Renew" | "Renew" | `renew-listing` | ✅ Aligned |
| Mark as Sold | "Mark as Sold" | "Mark as Sold" | `mark-as-sold` | ✅ Aligned |
| Delete | "Delete" | "Delete" | `delete-listing` | ✅ Aligned |

**Tab-Specific Actions** (contextual):
| Tab | Primary Action | ActionId | Status |
|-----|----------------|----------|--------|
| Messages | "Reply" / "Open Chat" | `reply-to-message` / `open-chat` | ✅ Aligned |
| Reported | "Review Report" | `review-report` | 🟡 Missing canonical |
| Expiring | "Renew" (priority) | `renew-listing` | ✅ Aligned |
| Drafts | "Continue" | `continue-draft` | ✅ Aligned |

**Bulk Actions** (BulkActionsToolbar):
| Action | Label | ActionId | Canonical | Status |
|--------|-------|----------|-----------|--------|
| Pause | "Pause" | `bulk-pause` | ConfirmActionDialog* | 🔴 Toast-only |
| Archive | "Archive" | `bulk-archive` | ConfirmActionDialog* | 🔴 Toast-only |
| Delete | "Delete" | `bulk-delete` | ConfirmActionDialog* | 🔴 Toast-only |

#### Issues Detected:

**Issue 1: Bulk Actions Toast-Only**
```tsx
// CURRENT (VIOLATION):
const handleBulkDelete = () => {
  toast.success(`Deleted ${selectedIds.size} listings`);
  deselectAll();
};

// SHOULD BE:
const handleBulkDelete = () => {
  setConfirmDialogData({
    title: `Delete ${selectedIds.size} Listings?`,
    onConfirm: () => {
      // Execute bulk delete API
      toast.success(`Deleted ${selectedIds.size} listings`);
    }
  });
  setConfirmDialogOpen(true);
};
```

**Impact**: 3 buttons mentirosos (Pause, Archive, Delete bulk)  
**Priority**: P1 - Common user action

---

**Issue 2: Tab-Specific Action Inconsistency**

**Messages Tab**:
- Current: `open-chat` for private messages
- Current: `respond-question` for questions
- Problem: Different action names for same "reply" intent
- Should be: Unified `reply-to-message` action with context

**Reported Tab**:
- Current: `review-report` action
- Problem: Missing Report Detail Page canonical
- Should be: Navigation to Report Detail (consistent with AC)

---

**Issue 3: Action Order Inconsistency**

**Current** (from getActionIds):
```tsx
['edit-listing', 'share-listing', 'duplicate-listing', 'pause-listing', 
 'renew-listing', 'mark-as-sold', 'delete-listing']
```

**Recommended Grouping**:
```tsx
// PRIMARY (most used)
'edit-listing',
'preview-listing', // Add for consistency

// SECONDARY (supporting)
'duplicate-listing',
'share-listing',
'renew-listing',
'pause-listing',
'mark-as-sold',

// DESTRUCTIVE (last)
'delete-listing'
```

**Modal-Readiness**: 🟡 **70% Ready**  
*Needs: Bulk actions fix, tab action alignment, canonical Report Detail

---

### 3. LISTING DETAIL (PRODUCT DETAIL PAGE) 🔴 NEEDS AUDIT

**Status**: No ActionMenu detected - needs investigation  
**Expected Actions**: Owner vs Visitor mode

#### Expected Owner Actions:
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Edit | "Edit" | `edit-listing` | Edit Flow | P0 |
| Pause | "Pause" | `pause-listing` | PauseListingSheet | P0 |
| Mark as Sold | "Mark as Sold" | `mark-as-sold` | MarkAsSoldSheet | P0 |
| View Stats | "Stats" | `view-stats` | ListingStatsModal | P1 |
| Duplicate | "Duplicate" | `duplicate-listing` | Publish Flow | P1 |
| Share | "Share" | `share-listing` | ShareToGroupSheet | P1 |
| Delete | "Delete" | `delete-listing` | ConfirmActionDialog | P0 |
| Manage Offers | "Manage Offers" | `manage-offers` | ManageOffersSheet | P1 |

#### Expected Visitor Actions:
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Message Seller | "Message" | `open-chat` | Chat View | P0 |
| Make Offer | "Make Offer" | `make-trade-offer` | MakeOfferSheet | P0 |
| Ask Question | "Ask Question" | `ask-question` | AskQuestionSheet | P1 |
| Save | Heart Icon | `save-listing` | Inline toggle | P0 |
| Share | Share Icon | `share-listing` | ShareToGroupSheet | P1 |
| Report | "Report" | `report-listing` | ReportSheet | P2 |

#### Q&A Section Actions:
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Reply to Question | "Reply" | `reply-to-question` | ReplySheet | P0 |

#### Trade Offers Section Actions (if offers exist):
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Accept Offer | "Accept" | `accept-trade-offer` | ConfirmActionDialog | P0 |
| Decline Offer | "Decline" | `reject-trade-offer` | ConfirmActionDialog | P0 |
| Counter Offer | "Counter" | `counter-trade-offer` | CounterOfferSheet | P0 |

**Modal-Readiness**: 🔴 **Unknown** - Requires code audit

---

### 4. GROUP DETAIL PAGE 🔴 NEEDS AUDIT

**Status**: Not audited yet  
**Expected Actions**: Member vs Admin mode

#### Expected Member Actions:
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Leave Group | "Leave Group" | `leave-group` | ConfirmActionDialog | P1 |
| Share Group | "Share" | `share-group` | ShareSheet | P2 |
| Pin Group | Pin Icon | `pin-group` | Inline toggle | P2 |
| Mute Group | "Mute" | `mute-group` | Inline toggle | P2 |
| Report Group | "Report" | `report-group` | ReportSheet | P2 |

#### Expected Admin Actions:
| Action | Expected Label | ActionId | Canonical | Priority |
|--------|----------------|----------|-----------|----------|
| Edit Profile | "Edit Profile" | `edit-group-profile` | Edit Group Flow | P1 |
| Invite Members | "Invite" | `invite-members` | InviteSheet | P0 |
| Manage Members | "Manage Members" | `manage-group-members` | Members Page | P0 |
| Settings | "Settings" | `edit-group-settings` | Settings Page | P1 |
| Remove Member | "Remove" (in list) | `remove-member-from-group` | ConfirmActionDialog | P0 |
| Change Role | "Change Role" | `change-member-role` | RoleChangeSheet* | P1 |
| Hide Listing | "Hide" | `hide-listing-in-group` | ConfirmActionDialog | P1 |
| Remove Listing | "Remove" | `remove-listing-from-group` | ConfirmActionDialog | P1 |
| Message Member | "Message" (mod) | `message-member-mod` | Moderation Thread* | P0 |

**Modal-Readiness**: 🔴 **Unknown** - Requires code audit

---

### 5. CAMPAIGNS HUB 🔴 NOT AUDITED

**Expected Actions**:
| Action | Label | ActionId | Canonical |
|--------|-------|----------|-----------|
| Create Campaign | "Create Campaign" | `create-campaign` | Campaign Flow |
| Edit Campaign | "Edit" | `edit-campaign` | Campaign Flow |
| Delete Campaign | "Delete" | `delete-campaign` | ConfirmActionDialog |
| View Listings | "View Listings" | `view-campaign-listings` | Navigation |

**Modal-Readiness**: 🔴 **Unknown**

---

### 6. EVENTS HUB 🔴 NOT AUDITED

**Expected Actions**:
| Action | Label | ActionId | Canonical |
|--------|-------|----------|-----------|
| Create Event | "Create Event" | `create-event-hub` | Event Flow |
| Edit Event | "Edit" | `edit-event-hub` | Event Flow |
| Delete Event | "Delete" | `delete-event-hub` | ConfirmActionDialog |
| View Listings | "View Listings" | `view-event-listings` | Navigation |

**Modal-Readiness**: 🔴 **Unknown**

---

## 📋 ALIGNMENT REQUIREMENTS

### Requirement 1: Label Standardization

**Task**: Ensure all entry points use exact canonical labels

**Affected Surfaces**:
- ✅ Action Center (already aligned)
- 🟡 My Listings (mostly aligned, review tab actions)
- 🔴 Listing Detail (not audited)
- 🔴 Group Detail (not audited)

**Example Fix**:
```tsx
// BEFORE (inconsistent):
<MenuItem>Pause</MenuItem>        // My Listings
<MenuItem>Hold</MenuItem>         // Group Detail
<MenuItem>Pause Listing</MenuItem> // Action Center

// AFTER (aligned):
<MenuItem>Pause</MenuItem>        // Everywhere
```

---

### Requirement 2: Action Grouping

**Task**: Group actions consistently across all surfaces

**Pattern**:
```tsx
const actionGroups = {
  primary: [
    'edit-listing',
    'preview-listing',
  ],
  secondary: [
    'duplicate-listing',
    'share-listing',
    'renew-listing',
    'pause-listing',
    'mark-as-sold',
  ],
  destructive: [
    'delete-listing',
  ]
};
```

**Visual Representation**:
```
⋮ Menu
├─ Edit              (Primary)
├─ Preview           (Primary)
├─ ─────────────     (Separator)
├─ Duplicate         (Secondary)
├─ Share             (Secondary)
├─ Renew             (Secondary)
├─ Pause             (Secondary)
├─ Mark as Sold      (Secondary)
├─ ─────────────     (Separator)
└─ Delete            (Destructive - red)
```

---

### Requirement 3: ActionId Consistency

**Task**: Verify all actions map to canonical ActionIds from registry

**Check**:
```tsx
// Every action must have explicit ActionId
<ActionMenu
  actionIds={[
    'edit-listing',      // ✅ Canonical
    'share-listing',     // ✅ Canonical
    'duplicate-listing', // ✅ Canonical
  ]}
/>

// NOT:
<DropdownMenu>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>  // ❌ No ActionId
</DropdownMenu>
```

---

### Requirement 4: Tab-Specific Actions

**Task**: Align tab-specific primary actions across entry points

**Pattern**:
```tsx
// Messages Tab → Primary action: Reply
actionIds: ['reply-to-message', 'edit-listing', ...] // Reply first

// Reported Tab → Primary action: Review
actionIds: ['review-report', 'edit-listing', ...] // Review first

// Expiring Tab → Primary action: Renew
actionIds: ['renew-listing', 'edit-listing', ...] // Renew first

// Drafts Tab → Primary action: Continue
actionIds: ['continue-draft', 'edit-listing', ...] // Continue first
```

**Current Issues**:
- Messages tab uses `open-chat` vs `respond-question` (inconsistent)
- Should unify to `reply-to-message` with context param

---

### Requirement 5: Bulk Actions Fix

**Task**: Fix toast-only bulk actions in My Listings

**Priority**: P1 (common user action)

**Surfaces**: My Listings BulkActionsToolbar

**Fix**:
```tsx
// BEFORE:
const handleBulkPause = () => {
  toast.success(`Paused ${selectedIds.size} listings`);
  deselectAll();
};

// AFTER:
const handleBulkPause = () => {
  setConfirmDialogData({
    variant: 'warning',
    icon: 'pause',
    title: `Pause ${selectedIds.size} Listings?`,
    description: 'These listings will be hidden from search',
    details: [
      { label: 'Listings', value: `${selectedIds.size} selected` },
    ],
    consequences: {
      title: 'What happens next:',
      items: [
        'Listings will be hidden from public search',
        'You can resume them anytime from My Listings',
        'Your listing slots remain occupied',
      ],
    },
    confirmLabel: 'Pause Listings',
    onConfirm: () => {
      // TODO: Backend - Bulk pause listings
      toast.success(`Paused ${selectedIds.size} listings`);
      deselectAll();
    },
  });
  setConfirmDialogOpen(true);
};
```

**Actions to fix**:
- `bulk-pause`
- `bulk-archive`
- `bulk-delete`

---

## 🎨 VISUAL ALIGNMENT GUIDELINES

### Guideline 1: Menu Pattern
**All action menus should follow this structure**:

```tsx
<ActionMenu
  entity={entity}
  actionIds={sortedActionIds}
  context="my-listings" // or "listing-detail", "group-detail", etc.
  isOwner={isOwner}
  align="end"
  grouping={{
    primary: ['edit-listing', 'preview-listing'],
    secondary: ['duplicate-listing', 'share-listing', ...],
    destructive: ['delete-listing']
  }}
/>
```

**Benefits**:
- Consistent visual grouping
- Automatic separators between groups
- Destructive actions always last, styled red

---

### Guideline 2: Contextual Actions
**Tab-specific or state-specific actions go first**:

```tsx
// Example: Expiring tab in My Listings
const actionIds = [
  'renew-listing',      // ⭐ Contextual (expiring)
  'edit-listing',       // Regular
  'share-listing',      // Regular
  ...
];

// Example: Messages tab in My Listings
const actionIds = [
  'reply-to-message',   // ⭐ Contextual (has messages)
  'edit-listing',       // Regular
  ...
];
```

---

### Guideline 3: Icon Usage
**Consistent icons across surfaces**:

| Action | Icon | Source |
|--------|------|--------|
| Edit | Pencil | lucide-react |
| Delete | Trash2 | lucide-react |
| Share | Share2 | lucide-react |
| Pause | Pause | lucide-react |
| Play/Resume | Play | lucide-react |
| Duplicate | Copy | lucide-react |
| Stats | BarChart3 | lucide-react |
| Report | Flag | lucide-react |
| Message | MessageCircle | lucide-react |

**Usage**:
```tsx
<MenuItem icon={<Pencil className="w-4 h-4" />}>
  Edit
</MenuItem>
```

---

### Guideline 4: Color Coding
**Destructive actions use consistent red styling**:

```tsx
// Destructive action
<MenuItem 
  className="text-destructive focus:text-destructive"
  icon={<Trash2 className="w-4 h-4" />}
>
  Delete
</MenuItem>

// Regular actions use default styling
<MenuItem icon={<Pencil className="w-4 h-4" />}>
  Edit
</MenuItem>
```

---

## ✅ MODAL-READINESS CHECKLIST

### Per Surface Checklist:

#### Action Center
- [x] All actions have ActionIds
- [x] Labels match canonical
- [x] Delegation (not execution) pattern
- [x] Grouping is logical
- [ ] Missing canonicals documented (5)
- **Status**: ✅ **100% Ready** (pending 5 canonicals)

---

#### My Listings
- [x] All actions have ActionIds
- [x] Labels mostly match canonical
- [ ] Bulk actions delegate (currently toast-only)
- [x] Grouping is logical
- [ ] Tab actions unified (currently inconsistent)
- **Status**: 🟡 **70% Ready**
- **Blockers**: 
  - Bulk actions toast-only (P1)
  - Tab action inconsistency (P2)

---

#### Listing Detail
- [ ] All actions have ActionIds (NOT AUDITED)
- [ ] Labels match canonical (NOT AUDITED)
- [ ] Delegation pattern (NOT AUDITED)
- [ ] Grouping is logical (NOT AUDITED)
- **Status**: 🔴 **Unknown**
- **Blockers**: Requires code audit

---

#### Group Detail
- [ ] All actions have ActionIds (NOT AUDITED)
- [ ] Labels match canonical (NOT AUDITED)
- [ ] Delegation pattern (NOT AUDITED)
- [ ] Grouping is logical (NOT AUDITED)
- **Status**: 🔴 **Unknown**
- **Blockers**: Requires code audit

---

#### Campaigns Hub
- [ ] Actions audited (NOT AUDITED)
- **Status**: 🔴 **Unknown**

---

#### Events Hub
- [ ] Actions audited (NOT AUDITED)
- **Status**: 🔴 **Unknown**

---

## 📊 READINESS SUMMARY

### By Surface:
| Surface | Modal-Ready | Completion | Blockers |
|---------|-------------|------------|----------|
| **Action Center** | ✅ Yes | 100% | 5 missing canonicals (external) |
| **My Listings** | 🟡 Partial | 70% | Bulk actions toast-only, tab actions |
| **Listing Detail** | 🔴 Unknown | 0% | Not audited |
| **Group Detail** | 🔴 Unknown | 0% | Not audited |
| **Campaigns Hub** | 🔴 Unknown | 0% | Not audited |
| **Events Hub** | 🔴 Unknown | 0% | Not audited |

### Overall Readiness: **28% Complete**

---

## 🚧 IMPLEMENTATION ROADMAP

### Phase 0: Audit (1 week)
**Goal**: Complete code audit of remaining surfaces

**Tasks**:
1. ✅ Action Center (DONE)
2. ✅ My Listings (DONE)
3. 🔴 Listing Detail - Audit ProductDetailPage.tsx
4. 🔴 Group Detail - Audit GroupDetailPage.tsx
5. 🔴 Campaigns Hub - Audit CampaignsPage.tsx
6. 🔴 Events Hub - Audit EventsPage.tsx

**Output**: Complete surface inventory with current ActionIds

---

### Phase 1: My Listings Fixes (3 days)
**Goal**: Fix My Listings to 100% readiness

**Tasks**:
1. Fix bulk actions (3 actions: pause, archive, delete)
   - Add ConfirmActionDialog delegation
   - Remove toast-only pattern
2. Unify tab actions
   - Replace `open-chat` + `respond-question` with unified `reply-to-message`
   - Add context param for message type
3. Align action order
   - Primary → Secondary → Destructive

**Output**: My Listings 100% modal-ready

---

### Phase 2: Surface Alignment (1 week)
**Goal**: Align all remaining surfaces

**Tasks**:
1. Listing Detail
   - Add ActionMenu if missing
   - Align owner vs visitor actions
   - Ensure delegation pattern
2. Group Detail
   - Add ActionMenu if missing
   - Align member vs admin actions
   - Ensure delegation pattern
3. Campaigns/Events Hubs
   - Standardize CRUD actions
   - Align with canonical labels

**Output**: All surfaces aligned, 100% modal-ready

---

### Phase 3: Create Missing Canonicals (2-3 weeks)
**Goal**: Unblock actions waiting for canonicals

**Priority Order**:
1. P0: Report Detail Page (blocks 3 actions)
2. P1: Moderation Thread (blocks 2 actions)
3. P1: CampaignApprovalSheet (blocks 2 actions)
4. P1: EventApprovalSheet (blocks 2 actions)
5. P2: RoleChangeSheet (blocks 1 action)

**Output**: All 122 actions executable

---

### Phase 4: Global Modal Implementation (2 weeks)
**Goal**: Build Global Actions Modal

**Prerequisites**: Phases 0-3 complete

**Approach**:
1. Build modal shell (keyboard shortcut, search)
2. Integrate with ActionRegistry
3. Test with Tier 1 actions (15 multi-entry actions)
4. Expand to Tier 2 (25 actions)
5. Polish and launch

---

## 🎯 QUICK WINS

### Win 1: Fix Bulk Actions (1 day)
**Impact**: Unblocks 3 common actions  
**Effort**: Low  
**File**: `MyListingsPage.tsx`  
**Lines**: ~20 lines of code

---

### Win 2: Unify Tab Actions (2 hours)
**Impact**: Consistency across Messages tab  
**Effort**: Very Low  
**File**: `my-listings/ListingCard.tsx`  
**Lines**: ~10 lines of code

---

### Win 3: Document Action Order (1 hour)
**Impact**: Visual consistency across all menus  
**Effort**: Minimal  
**File**: Document in code comments  
**Lines**: Comments only

---

## 📚 APPENDIX

### A. Canonical ActionId Registry

**Location**: `/actions/registry.ts` (assumed)

**Pattern**: `<verb>-<object>-<context?>`

**Examples**:
- `edit-listing`
- `delete-listing`
- `approve-join-request`
- `reply-to-message`
- `mark-as-sold`

**Verification**:
```tsx
import { ACTION_REGISTRY } from '../actions/registry';

// Check if ActionId exists
const action = ACTION_REGISTRY['edit-listing'];
if (!action) {
  console.error('ActionId not found in registry');
}
```

---

### B. Grouping Reference

**Primary Actions** (most used, visible first):
- Edit
- View/Preview
- Open/Navigate

**Secondary Actions** (supporting, middle):
- Duplicate
- Share
- Renew
- Pause
- Mark as Sold
- Manage

**Destructive Actions** (irreversible, last, red):
- Delete
- Remove
- Reject (in some contexts)

---

### C. Missing Canonicals Tracker

| Canonical | Status | ETA | Blocks Actions |
|-----------|--------|-----|----------------|
| Report Detail Page | 🔴 Missing | TBD | review-report (3x) |
| Moderation Thread | 🔴 Missing | TBD | message-member-mod (2x) |
| CampaignApprovalSheet | 🔴 Missing | TBD | approve/reject-campaign (2x) |
| EventApprovalSheet | 🔴 Missing | TBD | approve/reject-event (2x) |
| RoleChangeSheet | 🔴 Missing | TBD | change-member-role (1x) |

**Total Actions Blocked**: 10 / 122 (8%)

---

## 🎬 NEXT STEPS

### Immediate (This Week):
1. ✅ Complete this alignment document
2. 🔴 Audit Listing Detail (ProductDetailPage.tsx)
3. 🔴 Audit Group Detail (GroupDetailPage.tsx)
4. 🟡 Fix My Listings bulk actions (Quick Win 1)

### Short-term (Next 2 Weeks):
1. Complete Phase 0 (Audit remaining surfaces)
2. Complete Phase 1 (My Listings 100% ready)
3. Begin Phase 2 (Align remaining surfaces)

### Medium-term (Next Month):
1. Complete Phase 2 (All surfaces aligned)
2. Begin Phase 3 (Create missing canonicals)
3. Plan Phase 4 (Global Modal design)

---

**End of Action Surfaces Alignment Document**

This document provides the complete blueprint for aligning all action surfaces in ListlyUp to a consistent, modal-ready structure. Use this as the source of truth for standardization work.

