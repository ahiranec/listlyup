# PHASE 5 — GLOBAL ACTION MODAL (GAM) IMPLEMENTATION GUIDE

**Status**: ✅ Infrastructure Ready  
**Date**: 2026-01-13  
**Scope**: Confirmation Actions via ConfirmActionDialog

---

## ✅ COMPLETED STEPS

### 1. Infrastructure Created

#### A) GlobalActionModal Component
**File**: `/components/global-action-modal/GlobalActionModal.tsx`

- ✅ Provider pattern implemented
- ✅ Context API for global access
- ✅ `useGlobalActionModal()` hook exported
- ✅ Dispatcher logic (NO business logic)
- ✅ Integrates with ConfirmActionDialog

**Usage**:
```typescript
const { dispatch, close } = useGlobalActionModal();

// Dispatch an action
dispatch({
  actionId: 'delete-listing',
  context: {
    listingTitle: 'My Product',
    status: 'active',
  },
  onConfirm: () => {
    toast.success('Listing deleted!');
    // Backend call here
  },
});
```

#### B) Routing Table
**File**: `/components/global-action-modal/routing-table.ts`

**Coverage**:
- ✅ Listing Management (7 actions)
- ✅ Group Management (3 actions)
- ✅ Join Requests (2 actions)
- ✅ Trade Offers (2 actions)
- ✅ Reports - Group Mod (2 actions)
- ✅ Reports - Platform Admin (2 actions)
- ✅ Flagged Content (2 actions)
- ✅ User Issues (1 action)

**Total**: 21 confirmation actions configured

#### C) Provider Integration
**File**: `/App.tsx`

```typescript
import { GlobalActionModalProvider } from "./components/global-action-modal";

return (
  <ServiceProvider>
    <ProfileProvider>
      <FeaturesProvider>
        <GlobalActionModalProvider>  {/* ✅ Added */}
          {/* App content */}
        </GlobalActionModalProvider>
      </FeaturesProvider>
    </ProfileProvider>
  </ServiceProvider>
);
```

---

## 📋 MIGRATION GUIDE — Entry Points

### Pattern: BEFORE → AFTER

#### BEFORE (Direct ConfirmActionDialog):
```typescript
const handleDelete = (listing: MyListing) => {
  setConfirmDialogData({
    variant: 'destructive',
    icon: 'trash',
    title: 'Delete Listing?',
    description: 'This action cannot be undone',
    details: [
      { label: 'Listing', value: listing.title },
    ],
    consequences: {
      title: 'What happens next:',
      items: [
        'The listing will be permanently removed',
        'All photos and data will be deleted',
      ],
    },
    confirmLabel: 'Delete',
    onConfirm: () => {
      toast.success(`Deleted: ${listing.title}`);
      // Backend call
    },
  });
  setConfirmDialogOpen(true);
};
```

#### AFTER (via GlobalActionModal):
```typescript
import { useGlobalActionModal } from './components/global-action-modal';

function MyListingsPage() {
  const { dispatch } = useGlobalActionModal();

  const handleDelete = (listing: MyListing) => {
    dispatch({
      actionId: 'delete-listing',
      context: {
        listingTitle: listing.title,
        status: listing.lifecycle,
      },
      onConfirm: () => {
        toast.success(`Deleted: ${listing.title}`);
        // Backend call
      },
    });
  };

  // No need for local ConfirmActionDialog state!
  // No need for setConfirmDialogData!
  // No need for setConfirmDialogOpen!
}
```

---

## 🎯 MIGRATION CHECKLIST — By Surface

### Surface 1: ActionCenterPage

**File**: `/components/ActionCenterPage.tsx`

| Action | Line(s) | Current | Migrate To |
|--------|---------|---------|------------|
| Resume Listing | 390-413 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Renew Listing | 365-388 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Delete Listing | 420-445 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Approve Join Request | 501-528 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Reject Join Request | 532-559 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Accept Trade | 1214-1240 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Decline Trade | 1251-1277 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Take Action (Report) | 574-601 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Dismiss Report | 606-633 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Resolve Platform Report | 644-670 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Dismiss Platform Report | 673-700 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Approve Flagged Listing | 709-736 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Remove Flagged Listing | 739-766 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Resolve User Issue | 775-823 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |

**Impact**: 14 handlers to migrate

### Surface 2: MyListingsPage

**File**: `/components/MyListingsPage.tsx`

| Action | Line(s) | Current | Migrate To |
|--------|---------|---------|------------|
| Bulk Delete | 484-507 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Bulk Pause | 510-533 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Bulk Archive | 536-559 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Pause/Resume | 601-632 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Delete | 635-657 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |
| Duplicate | 660-683 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |

**Impact**: 6 handlers to migrate

### Surface 3: GroupDetailPage

**File**: `/components/group-detail/GroupDetailPage.tsx`

| Action | Line(s) | Current | Migrate To |
|--------|---------|---------|------------|
| Leave Group | 463-490 | ✅ Direct ConfirmActionDialog | 🔄 GAM dispatch |

**Impact**: 1 handler to migrate

### Surface 4: Campaign Settings

**File**: `/components/campaigns/CampaignSettingsSheet.tsx`

| Action | Line(s) | Current | Migrate To |
|--------|---------|---------|------------|
| Pause Campaign | 59-86 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope (Phase 5 is listings/groups only) |
| Resume Campaign | 89-116 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Delete Campaign | 119-146 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Duplicate Campaign | 149-176 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |

**Note**: Campaign/Event settings are out of Phase 5 scope per original specifications.

### Surface 5: Event Settings

**File**: `/components/events/EventHubSettingsSheet.tsx`

| Action | Line(s) | Current | Migrate To |
|--------|---------|---------|------------|
| Pause Event | 62-89 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Resume Event | 92-119 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Cancel Event | 122-149 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Delete Event | 152-179 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |
| Duplicate Event | 182-209 | ✅ Direct ConfirmActionDialog | ⚠️ Out of scope |

---

## 📊 MIGRATION SUMMARY

### In Scope (Phase 5)
- **ActionCenterPage**: 14 handlers
- **MyListingsPage**: 6 handlers
- **GroupDetailPage**: 1 handler
- **Total**: 21 handlers

### Out of Scope (Future Phases)
- Campaign Settings: 4 handlers
- Event Settings: 5 handlers

---

## 🔧 IMPLEMENTATION EXAMPLE

### Step 1: Import Hook

```typescript
import { useGlobalActionModal } from './components/global-action-modal';
```

### Step 2: Use Hook

```typescript
function ActionCenterPage() {
  const { dispatch } = useGlobalActionModal();
  
  // Remove these:
  // const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  // const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);
  
  // ... component code
}
```

### Step 3: Replace Handler

```typescript
// BEFORE
case 'Resume':
  setConfirmDialogData({
    variant: 'success',
    icon: 'check',
    title: 'Resume Listing?',
    // ... config
    onConfirm: () => {
      toast.success(`✅ "${listingTitle}" is now active`);
      // TODO: Backend
    },
  });
  setConfirmDialogOpen(true);
  break;

// AFTER
case 'Resume':
  dispatch({
    actionId: 'resume-listing',
    context: {
      listingTitle: listingTitle,
    },
    onConfirm: () => {
      toast.success(`✅ "${listingTitle}" is now active`);
      // TODO: Backend
    },
  });
  break;
```

### Step 4: Remove Local State

```typescript
// BEFORE (at component level):
const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);

return (
  <>
    {/* component JSX */}
    <ConfirmActionDialog
      open={confirmDialogOpen}
      onOpenChange={setConfirmDialogOpen}
      data={confirmDialogData}
    />
  </>
);

// AFTER:
// No local state needed!
// No ConfirmActionDialog JSX needed!
// GAM Provider handles it globally
```

---

## ✅ BENEFITS

### Before GAM:
- Each component needs local state for ConfirmActionDialog
- Duplicate ConfirmActionDialog JSX in multiple files
- Inconsistent config across surfaces
- Hard to update all confirmations globally

### After GAM:
- ✅ **Zero local state** for confirmations
- ✅ **Zero duplicate JSX** - one instance in GAM Provider
- ✅ **Single source of truth** - Routing Table
- ✅ **Consistent UX** - all confirmations use same patterns
- ✅ **Easy to update** - change one place, affects all
- ✅ **Type-safe** - ActionId + Context typed
- ✅ **Testable** - dispatch logic isolated

---

## 🚀 NEXT STEPS

### Immediate (Phase 5 Completion):

1. **Migrate ActionCenterPage** (14 handlers)
   - Resume, Renew, Delete listings
   - Approve/Reject join requests
   - Accept/Decline trades
   - Report actions
   - Admin actions

2. **Migrate MyListingsPage** (6 handlers)
   - Bulk actions (delete, pause, archive)
   - Single actions (pause, delete, duplicate)

3. **Migrate GroupDetailPage** (1 handler)
   - Leave group

### Future Phases:

**Phase 6**: Campaign & Event confirmations
- Pause/Resume/Delete/Duplicate campaigns
- Pause/Resume/Delete/Duplicate events

**Phase 7**: Advanced actions (multi-step)
- Actions requiring additional input
- Conditional routing based on context

---

## 📝 TESTING CHECKLIST

After migration, verify:

- [ ] All confirmation dialogs still open correctly
- [ ] Dialog content matches expected variant/title/description
- [ ] onConfirm callback executes successfully
- [ ] Toast appears after confirmation
- [ ] Dialog closes after confirmation
- [ ] Cancel button works
- [ ] No console errors
- [ ] No duplicate dialogs
- [ ] Consistent behavior across surfaces

---

## 🎯 SUCCESS CRITERIA

✅ **Phase 5 Complete When**:
- All 21 in-scope handlers migrated to GAM
- No direct ConfirmActionDialog usage in entry points (except via GAM)
- All confirmations routed through Routing Table
- Zero local state for confirmations in entry points
- System fully backward compatible (no UI changes)
- All tests passing

---

**Current Status**: Infrastructure ready, migration pending  
**Next Action**: Migrate ActionCenterPage handlers (Example PR ready)  
**Estimated Impact**: ~300 lines removed across 3 files
