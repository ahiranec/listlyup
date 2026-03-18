# ACTION SURFACES BLUEPRINT
## Visual Quick Reference - Modal-Ready Checklist

**Purpose**: 1-page visual guide to action surface standardization  
**Audience**: Developers implementing alignment  
**Status**: Living document

---

## 🎯 THE GOLDEN PATTERN

```
┌────────────────────────────────────────┐
│  ENTRY POINT (Button / Menu / Card)   │
│  - Shows actionIds list                │
│  - Uses canonical labels               │
│  - Groups: Primary/Secondary/Destruct  │
│  - NO execution logic                  │
└─────────────┬──────────────────────────┘
              │
              │ delegates
              ▼
┌────────────────────────────────────────┐
│  CANONICAL EXECUTOR (Dialog / Sheet)   │
│  - Receives actionId + entity          │
│  - Shows consequences                  │
│  - Executes on confirm                 │
│  - Provides feedback (toast)           │
└────────────────────────────────────────┘
```

---

## 📋 SURFACE STATUS DASHBOARD

```
┌─────────────────┬──────────┬────────────┬─────────────┐
│ Surface         │ Status   │ Completion │ Blockers    │
├─────────────────┼──────────┼────────────┼─────────────┤
│ Action Center   │ ✅ Ready │ 100%       │ 5 canonicals│
│ My Listings     │ 🟡 Partial│ 70%       │ Bulk actions│
│ Listing Detail  │ 🔴 Unknown│ 0%        │ Not audited │
│ Group Detail    │ 🔴 Unknown│ 0%        │ Not audited │
│ Campaigns Hub   │ 🔴 Unknown│ 0%        │ Not audited │
│ Events Hub      │ 🔴 Unknown│ 0%        │ Not audited │
├─────────────────┼──────────┼────────────┼─────────────┤
│ OVERALL         │ 🟡 28%   │ 28%        │ See roadmap │
└─────────────────┴──────────┴────────────┴─────────────┘
```

---

## ✅ PER-SURFACE CHECKLIST

### For Each Action Surface, Verify:

```
□ All actions have ActionIds from registry
□ Labels match ACTION_DEFINITION_MATRIX exactly
□ Actions grouped: Primary → Secondary → Destructive
□ Separators between groups
□ Destructive actions styled red
□ Icons consistent with canonical
□ Entry point delegates (NOT executes)
□ Tab-specific actions prioritized first
□ No toast-only buttons
□ No console.log buttons
```

---

## 🎨 ACTION MENU TEMPLATE

### Standard Implementation:

```tsx
<ActionMenu
  entity={{
    id: listing.id,
    title: listing.title,
    // ... other entity data
  }}
  
  actionIds={[
    // PRIMARY (most important)
    'edit-listing',
    'preview-listing',
    
    // SECONDARY (supporting actions)
    'duplicate-listing',
    'share-listing',
    'renew-listing',
    'pause-listing',
    'mark-as-sold',
    
    // DESTRUCTIVE (last, styled red)
    'delete-listing',
  ]}
  
  context="my-listings"  // or "listing-detail", "group-detail"
  isOwner={true}
  align="end"
  
  grouping={{
    primary: ['edit-listing', 'preview-listing'],
    secondary: ['duplicate-listing', 'share-listing', 'renew-listing', 
                'pause-listing', 'mark-as-sold'],
    destructive: ['delete-listing']
  }}
  
  customHandlers={{
    'edit-listing': (entity) => {
      navigateToEditFlow(entity.id);
    },
  }}
  
  onActionComplete={() => {
    // Refresh data if needed
  }}
/>
```

---

## 🚦 TAB-SPECIFIC ACTIONS

### Pattern: Contextual Action First

```tsx
// ✅ CORRECT: Context-aware action prioritization
const getActionIds = (tab: string, listing: Listing) => {
  const baseActions = [
    'edit-listing',
    'share-listing',
    'duplicate-listing',
    'pause-listing',
    'delete-listing',
  ];

  // Priority action based on tab
  if (tab === 'messages') {
    return ['reply-to-message', ...baseActions];
  }
  
  if (tab === 'reported') {
    return ['review-report', ...baseActions];
  }
  
  if (tab === 'expiring') {
    return ['renew-listing', ...baseActions];
  }
  
  if (tab === 'drafts') {
    return ['continue-draft', ...baseActions.filter(a => a !== 'delete-listing')];
  }

  return baseActions;
};
```

---

## 🔴 ANTI-PATTERNS TO FIX

### ❌ Pattern 1: Toast-Only Action

```tsx
// WRONG:
const handleBulkDelete = () => {
  toast.success('Deleted 3 listings');  // Lies!
  deselectAll();
};

// CORRECT:
const handleBulkDelete = () => {
  setConfirmDialogData({
    title: 'Delete 3 Listings?',
    onConfirm: () => {
      deleteListingsAPI(selectedIds);
      toast.success('Deleted 3 listings');
      deselectAll();
    }
  });
  setConfirmDialogOpen(true);
};
```

---

### ❌ Pattern 2: Inline Execution

```tsx
// WRONG:
<MenuItem onClick={() => {
  deleteListingAPI(id);  // Executes directly
  toast.success('Deleted');
}}>
  Delete
</MenuItem>

// CORRECT:
<MenuItem onClick={() => {
  setActionId('delete-listing');
  setSelectedEntity(entity);
  setConfirmDialogOpen(true);
}}>
  Delete
</MenuItem>
```

---

### ❌ Pattern 3: Inconsistent Labels

```tsx
// WRONG: Different labels for same action
My Listings:      "Pause"
Listing Detail:   "Hold"
Action Center:    "Pause Listing"
Group Detail:     "Stop Showing"

// CORRECT: Canonical label everywhere
Everywhere:       "Pause"
```

---

### ❌ Pattern 4: Missing ActionId

```tsx
// WRONG: Custom menu without ActionIds
<DropdownMenu>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleDelete}>Delete</MenuItem>
</DropdownMenu>

// CORRECT: Using ActionMenu with ActionIds
<ActionMenu
  actionIds={['edit-listing', 'delete-listing']}
  entity={entity}
  context="my-listings"
/>
```

---

## 🎯 QUICK FIXES

### Fix 1: Bulk Actions (My Listings)
**File**: `MyListingsPage.tsx`  
**Lines**: ~462-475  
**Time**: 1 hour

```tsx
// Replace toast-only handlers with delegation:
const handleBulkPause = () => {
  setConfirmDialogData({
    variant: 'warning',
    title: `Pause ${selectedIds.size} Listings?`,
    onConfirm: () => {
      // TODO: Backend call
      toast.success(`Paused ${selectedIds.size} listings`);
      deselectAll();
    }
  });
  setConfirmDialogOpen(true);
};

// Repeat for handleBulkArchive, handleBulkDelete
```

---

### Fix 2: Tab Action Unification (My Listings)
**File**: `my-listings/ListingCard.tsx`  
**Lines**: ~43-69  
**Time**: 30 minutes

```tsx
// Current: Different actions for messages
if (activeTab === 'messages') {
  if (listing.messageType === 'chat') {
    return ['open-chat', ...];  // ❌ Inconsistent
  } else {
    return ['respond-question', ...];  // ❌ Inconsistent
  }
}

// Fixed: Unified action
if (activeTab === 'messages') {
  return ['reply-to-message', ...];  // ✅ Consistent
  // ReplySheet handles context internally
}
```

---

### Fix 3: Action Order Standardization
**File**: All `ActionMenu` usages  
**Time**: 15 minutes per file

```tsx
// Apply consistent order:
1. Contextual action (if any)
2. Primary actions (Edit, Preview)
3. Separator
4. Secondary actions (Duplicate, Share, etc.)
5. Separator
6. Destructive actions (Delete)
```

---

## 📊 CANONICAL LABELS REFERENCE

| ActionId | Canonical Label | Icon | Context |
|----------|-----------------|------|---------|
| `edit-listing` | "Edit" | Pencil | All |
| `delete-listing` | "Delete" | Trash2 | All |
| `pause-listing` | "Pause" | Pause | Active |
| `resume-listing` | "Resume" | Play | Paused |
| `renew-listing` | "Renew" | Calendar | Expiring |
| `duplicate-listing` | "Duplicate" | Copy | All |
| `share-listing` | "Share" | Share2 | All |
| `mark-as-sold` | "Mark as Sold" | CheckCircle | Product |
| `view-stats` | "Stats" | BarChart3 | Owner |
| `reply-to-message` | "Reply" | MessageCircle | Messages |
| `reply-to-question` | "Reply" | MessageCircle | Questions |
| `approve-join-request` | "Approve" | Check | Admin |
| `reject-join-request` | "Reject" | X | Admin |
| `review-report` | "Review" | Flag | Mod/Admin |
| `make-trade-offer` | "Make Offer" | DollarSign | Visitor |
| `accept-trade-offer` | "Accept" | Check | Recipient |
| `reject-trade-offer` | "Decline" | X | Recipient |
| `counter-trade-offer` | "Counter" | ArrowLeftRight | Recipient |

**Usage**:
```tsx
import { Pencil, Trash2, Pause } from 'lucide-react';

<MenuItem icon={<Pencil className="w-4 h-4" />}>
  Edit  {/* Canonical label */}
</MenuItem>
```

---

## 🏗️ IMPLEMENTATION WORKFLOW

### Step 1: Audit Surface
```bash
# Open file
code components/[SurfaceName].tsx

# Check:
□ Find all action triggers (buttons, menus, cards)
□ List current labels
□ Identify ActionIds (or lack thereof)
□ Note execution pattern (inline vs delegated)
□ Document blockers
```

---

### Step 2: Align Labels
```tsx
// Find & replace non-canonical labels
// Example:
"Hold" → "Pause"
"Remove" → "Delete" (for listings)
"Pause Listing" → "Pause"
```

---

### Step 3: Implement ActionMenu
```tsx
// Replace custom menus with ActionMenu
// BEFORE:
<DropdownMenu>
  <MenuItem onClick={handleEdit}>Edit</MenuItem>
  <MenuItem onClick={handleDelete}>Delete</MenuItem>
</DropdownMenu>

// AFTER:
<ActionMenu
  actionIds={['edit-listing', 'delete-listing']}
  entity={entity}
  context="[surface-name]"
/>
```

---

### Step 4: Fix Delegation
```tsx
// Replace inline execution with delegation
// BEFORE:
onClick={() => {
  deleteAPI(id);
  toast.success('Deleted');
}}

// AFTER:
onClick={() => {
  openConfirmDialog('delete-listing', entity);
}}
```

---

### Step 5: Test & Document
```bash
# Test:
□ Click each action
□ Verify dialog opens (not inline execution)
□ Verify labels are canonical
□ Verify icons are consistent
□ Verify grouping/order is correct

# Document:
□ Update this blueprint if needed
□ Mark surface as ✅ Ready in dashboard
□ Commit with message: "align: [surface] actions to canonical pattern"
```

---

## 🚀 PRIORITY QUEUE

### Week 1: Quick Wins
```
1. ✅ Fix My Listings bulk actions (1 hour)
2. ✅ Unify My Listings tab actions (30 min)
3. 🔴 Audit Listing Detail (2 hours)
```

### Week 2: Core Surfaces
```
4. 🔴 Align Listing Detail (1 day)
5. 🔴 Audit Group Detail (2 hours)
6. 🔴 Align Group Detail (1 day)
```

### Week 3: Secondary Surfaces
```
7. 🔴 Audit Campaigns Hub (1 hour)
8. 🔴 Align Campaigns Hub (4 hours)
9. 🔴 Audit Events Hub (1 hour)
10. 🔴 Align Events Hub (4 hours)
```

### Week 4: Polish & Verify
```
11. 🔴 Cross-surface label verification
12. 🔴 Icon consistency check
13. 🔴 Grouping consistency check
14. 🔴 Final delegation audit
```

---

## 📐 VISUAL GROUPING EXAMPLE

```
┌────────────────────────────────┐
│  ⋮  Listing Actions            │
├────────────────────────────────┤
│  ✏️  Edit            (Primary)  │
│  👁️  Preview         (Primary)  │
├────────────────────────────────┤ ← Separator
│  📋  Duplicate      (Secondary) │
│  🔗  Share          (Secondary) │
│  🔄  Renew          (Secondary) │
│  ⏸️  Pause          (Secondary) │
│  ✅  Mark as Sold   (Secondary) │
├────────────────────────────────┤ ← Separator
│  🗑️  Delete         (Destruct)  │ ← Red text
└────────────────────────────────┘
```

**Code**:
```tsx
<ActionMenu
  actionIds={[
    'edit-listing',
    'preview-listing',
    'duplicate-listing',
    'share-listing',
    'renew-listing',
    'pause-listing',
    'mark-as-sold',
    'delete-listing',
  ]}
  grouping={{
    primary: ['edit-listing', 'preview-listing'],
    secondary: ['duplicate-listing', 'share-listing', 'renew-listing', 
                'pause-listing', 'mark-as-sold'],
    destructive: ['delete-listing']
  }}
/>
```

---

## ✅ DEFINITION OF DONE

### Surface is "Modal-Ready" when:

```
✅ All actions use ActionMenu (no custom dropdowns)
✅ All ActionIds present in ACTION_REGISTRY
✅ All labels match ACTION_DEFINITION_MATRIX
✅ All actions grouped: Primary/Secondary/Destructive
✅ All destructive actions styled red
✅ All icons consistent with canonical
✅ All handlers delegate (no inline execution)
✅ All toast-only buttons fixed
✅ All console.log buttons fixed
✅ Tab-specific actions prioritized correctly
✅ Tested: each action opens dialog/navigates
✅ Documented: added to ACTION_SURFACES_ALIGNMENT.md
```

---

## 🎓 TRAINING EXAMPLES

### Example 1: Convert Custom Menu to ActionMenu

**BEFORE**:
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <MoreVertical />
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => handleEdit(listing)}>
      <Pencil /> Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => handleDelete(listing)}>
      <Trash2 /> Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**AFTER**:
```tsx
<ActionMenu
  entity={listing}
  actionIds={['edit-listing', 'delete-listing']}
  context="my-listings"
  isOwner={true}
  align="end"
/>
```

**Benefits**:
- ✅ ActionIds tracked
- ✅ Labels canonical
- ✅ Delegation automatic
- ✅ Grouping automatic
- ✅ Icons consistent

---

### Example 2: Fix Toast-Only Button

**BEFORE**:
```tsx
<Button onClick={() => {
  toast.success('Listing paused');
  // No API call!
}}>
  Pause
</Button>
```

**AFTER**:
```tsx
<Button onClick={() => {
  setConfirmDialogData({
    title: 'Pause Listing?',
    onConfirm: () => {
      pauseListingAPI(listing.id);
      toast.success('Listing paused');
    }
  });
  setConfirmDialogOpen(true);
}}>
  Pause
</Button>
```

---

### Example 3: Align Tab-Specific Actions

**BEFORE**:
```tsx
// Messages tab has 2 different actions
if (messageType === 'chat') {
  actionIds = ['open-chat', ...];
} else {
  actionIds = ['respond-question', ...];
}
```

**AFTER**:
```tsx
// Unified action, ReplySheet handles context
if (activeTab === 'messages') {
  actionIds = ['reply-to-message', ...];
}

// In ReplySheet:
const handleSubmit = (text) => {
  if (context.type === 'chat') {
    sendChatMessage(text);
  } else {
    answerQuestion(text);
  }
};
```

---

**End of Blueprint**

Use this as your daily reference when implementing action surface alignment. Check off each surface as you complete it.

