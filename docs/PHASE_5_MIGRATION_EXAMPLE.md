# PHASE 5 — MIGRATION EXAMPLE (BEFORE/AFTER)

**File**: ActionCenterPage.tsx  
**Action**: Resume Listing  
**Pattern**: Direct ConfirmActionDialog → GlobalActionModal dispatch

---

## 🔴 BEFORE (Direct ConfirmActionDialog)

### Step 1: Component has local state

```typescript
export function ActionCenterPage({ onBack, onChatClick, onContinueDraft, onViewListing }: ActionCenterPageProps) {
  // ❌ LOCAL STATE for ConfirmActionDialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);
  
  // ... other state
```

### Step 2: Handler builds full config inline

```typescript
const handleListingAction = (action: string, listingTitle: string, status: string, listingId?: string) => {
  switch (action) {
    case 'Resume':
      // ❌ INLINE CONFIG - Repetitive and error-prone
      setConfirmDialogData({
        variant: 'success',
        icon: 'check',
        title: 'Resume Listing?',
        description: 'Your listing will become active and visible to buyers',
        details: [
          { label: 'Listing', value: listingTitle },
        ],
        consequences: {
          title: 'What happens next:',
          items: [
            'The listing will be visible in search results',
            'Buyers can contact you about this item',
            'You can pause it again anytime',
          ],
        },
        confirmLabel: 'Resume Listing',
        onConfirm: () => {
          toast.success(`✅ "${listingTitle}" is now active`);
          // TODO: Backend - Change listing status from paused to active
          setConfirmDialogOpen(false);
        },
      });
      setConfirmDialogOpen(true);
      break;
      
    // ❌ More cases with similar repetitive patterns...
  }
};
```

### Step 3: Component renders dialog

```typescript
return (
  <>
    <div className="h-screen">
      {/* Main content */}
    </div>

    {/* ❌ EVERY COMPONENT needs this JSX */}
    <ConfirmActionDialog
      open={confirmDialogOpen}
      onOpenChange={setConfirmDialogOpen}
      data={confirmDialogData}
    />
  </>
);
```

### Problems:
- ❌ 100+ lines of repetitive config code
- ❌ Local state in every component
- ❌ Duplicate ConfirmActionDialog JSX everywhere
- ❌ Hard to maintain consistency
- ❌ Easy to make typos in config
- ❌ No single source of truth

---

## ✅ AFTER (GlobalActionModal dispatch)

### Step 1: Component has NO local state

```typescript
import { useGlobalActionModal } from './components/global-action-modal';

export function ActionCenterPage({ onBack, onChatClick, onContinueDraft, onViewListing }: ActionCenterPageProps) {
  // ✅ NO LOCAL STATE for confirmations!
  const { dispatch } = useGlobalActionModal();
  
  // ... other state (unrelated to confirmations)
```

### Step 2: Handler dispatches with minimal context

```typescript
const handleListingAction = (action: string, listingTitle: string, status: string, listingId?: string) => {
  switch (action) {
    case 'Resume':
      // ✅ CLEAN DISPATCH - Config in Routing Table
      dispatch({
        actionId: 'resume-listing',
        context: {
          listingTitle: listingTitle,
        },
        onConfirm: () => {
          toast.success(`✅ "${listingTitle}" is now active`);
          // TODO: Backend - Change listing status from paused to active
        },
      });
      break;
      
    // ✅ All cases follow same clean pattern
  }
};
```

### Step 3: Component renders NOTHING

```typescript
return (
  <div className="h-screen">
    {/* Main content */}
  </div>
  
  // ✅ NO ConfirmActionDialog JSX!
  // GAM Provider handles it globally
);
```

### Benefits:
- ✅ ~80% less code in handlers
- ✅ Zero local state for confirmations
- ✅ No duplicate JSX
- ✅ All config centralized in Routing Table
- ✅ Type-safe ActionId
- ✅ Consistent UX across all surfaces
- ✅ Easy to update globally

---

## 📊 CODE REDUCTION COMPARISON

### ActionCenterPage.tsx

**BEFORE**:
```typescript
// State (2 lines)
const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);

// Handler (23 lines per action × 14 actions = 322 lines)
case 'Resume':
  setConfirmDialogData({
    variant: 'success',
    icon: 'check',
    title: 'Resume Listing?',
    description: 'Your listing will become active and visible to buyers',
    details: [
      { label: 'Listing', value: listingTitle },
    ],
    consequences: {
      title: 'What happens next:',
      items: [
        'The listing will be visible in search results',
        'Buyers can contact you about this item',
        'You can pause it again anytime',
      ],
    },
    confirmLabel: 'Resume Listing',
    onConfirm: () => {
      toast.success(`✅ "${listingTitle}" is now active`);
      setConfirmDialogOpen(false);
    },
  });
  setConfirmDialogOpen(true);
  break;

// JSX (6 lines)
<ConfirmActionDialog
  open={confirmDialogOpen}
  onOpenChange={setConfirmDialogOpen}
  data={confirmDialogData}
/>

// TOTAL: ~330 lines for confirmations
```

**AFTER**:
```typescript
// Hook (1 line)
const { dispatch } = useGlobalActionModal();

// Handler (6 lines per action × 14 actions = 84 lines)
case 'Resume':
  dispatch({
    actionId: 'resume-listing',
    context: { listingTitle },
    onConfirm: () => {
      toast.success(`✅ "${listingTitle}" is now active`);
    },
  });
  break;

// JSX (0 lines)
// Nothing!

// TOTAL: ~85 lines for confirmations
```

**REDUCTION**: 330 → 85 lines = **245 lines removed (74% reduction)** ✅

---

## 🎯 MIGRATION STEPS (PRACTICAL)

### 1. Add Import

```typescript
// Add this at top of file
import { useGlobalActionModal } from './components/global-action-modal';
```

### 2. Add Hook

```typescript
export function ActionCenterPage({ onBack, onChatClick }: ActionCenterPageProps) {
  // Add this hook
  const { dispatch } = useGlobalActionModal();
  
  // ... rest of component
```

### 3. Replace Each Handler

Find each occurrence of:
```typescript
setConfirmDialogData({ ... });
setConfirmDialogOpen(true);
```

Replace with:
```typescript
dispatch({
  actionId: '<action-id-from-routing-table>',
  context: { /* minimal context */ },
  onConfirm: () => { /* business logic */ },
});
```

### 4. Remove Local State

Delete these lines:
```typescript
const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);
```

### 5. Remove JSX

Delete this:
```typescript
<ConfirmActionDialog
  open={confirmDialogOpen}
  onOpenChange={setConfirmDialogOpen}
  data={confirmDialogData}
/>
```

### 6. Test

- [ ] Open action
- [ ] Verify dialog content
- [ ] Confirm action
- [ ] Verify toast
- [ ] Verify dialog closes
- [ ] Cancel action
- [ ] Verify dialog closes

---

## 🔍 ROUTING TABLE REFERENCE

When migrating, reference `/components/global-action-modal/routing-table.ts` for available ActionIds:

```typescript
// Listing Management
'delete-listing'
'resume-listing'
'renew-listing'
'duplicate-listing'
'pause-listing'
'archive-listing'
'reactivate-listing'

// Group Management
'leave-group'
'delete-group'
'archive-group'

// Join Requests
'approve-join-request'
'reject-join-request'

// Trade Offers
'accept-trade'
'decline-trade'

// Reports
'take-action-report'
'dismiss-report'
'resolve-platform-report'
'dismiss-platform-report'

// Admin
'approve-flagged-listing'
'remove-flagged-listing'
'resolve-user-issue'
```

---

## ✅ VALIDATION CHECKLIST

After migrating each file:

- [ ] File compiles without errors
- [ ] No unused imports (ConfirmActionDialog removed if not needed)
- [ ] No unused state (confirmDialogOpen, confirmDialogData removed)
- [ ] All actions dispatch correctly
- [ ] Dialog content matches expected
- [ ] onConfirm executes correctly
- [ ] Toasts appear
- [ ] No duplicate dialogs
- [ ] Cancel works
- [ ] No regressions in other actions

---

**Status**: Ready to migrate  
**Priority**: High (enables Phase 6+)  
**Estimated Time**: 2-3 hours for all 21 handlers  
**Files to Update**: 3 (ActionCenterPage, MyListingsPage, GroupDetailPage)
