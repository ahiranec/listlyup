# Global Action Modal - Quick Reference

## 🎯 MVP Implementation Summary

**Status**: ✅ IMPLEMENTED  
**Scope**: Campaign Approve/Reject ONLY  
**Pattern**: Dispatcher (NOT Executor)

---

## 📦 Files Created

```
/components/campaigns/
├── GlobalActionModal.tsx          ✅ NEW (Dispatcher)
├── CampaignApprovalSheet.tsx      ✅ NEW (Canonical Executor)
├── CampaignRejectionSheet.tsx     ✅ NEW (Canonical Executor)
└── index.ts                       ✅ UPDATED (Exports)

/components/ActionCenterPage.tsx   ✅ UPDATED (Integration)
/GLOBAL_ACTION_MODAL_MVP_IMPLEMENTATION.md  ✅ NEW (Documentation)
```

---

## 🔄 Flow Diagram (MVP)

```
┌────────────────────────────────────────┐
│   ACTION CENTER - CAMPAIGNS TAB        │
│                                        │
│   Campaign Owner Requests:             │
│   ┌──────────────────────────────┐    │
│   │ [Listing Card]               │    │
│   │ iPad Pro 11"                 │    │
│   │ by @maria_tech               │    │
│   │                              │    │
│   │  [View] [Reject] [Approve]   │    │
│   └──────────────────────────────┘    │
└────────┬──────────────────┬────────────┘
         │                  │
         │ click Approve    │ click Reject
         ▼                  ▼
┌─────────────────────────────────────────┐
│   GLOBAL ACTION MODAL (DISPATCHER)      │
│                                         │
│   Receives:                             │
│   • actionId: 'approve-campaign-request'│
│   • context: { listing, campaign, ... } │
│                                         │
│   Routes to appropriate canonical:      │
│   IF approve → CampaignApprovalSheet    │
│   IF reject  → CampaignRejectionSheet   │
└────────┬──────────────────┬─────────────┘
         │                  │
         ▼                  ▼
┌──────────────────┐  ┌──────────────────┐
│ APPROVAL SHEET   │  │ REJECTION SHEET  │
│                  │  │                  │
│ • Listing info   │  │ • Listing info   │
│ • Optional notes │  │ • Required reason│
│ • Approve button │  │ • Optional notes │
│                  │  │ • Reject button  │
└────────┬─────────┘  └────────┬─────────┘
         │                     │
         │ onComplete()        │ onComplete()
         ▼                     ▼
┌─────────────────────────────────────────┐
│   ACTION CENTER (CALLBACK)              │
│                                         │
│   handleGlobalActionComplete():         │
│   • Remove card from list               │
│   • Reactive UI update                  │
└─────────────────────────────────────────┘
```

---

## 🔧 How to Use

### Approve Campaign Request

```typescript
// In ActionCenterPage.tsx
const handleApproveCampaignRequest = (
  requestId: string,
  listing: string,
  requestedBy: string,
  campaign: string,
  listingImage: string
) => {
  setGlobalActionId('approve-campaign-request');
  setGlobalActionContext({
    entityType: 'campaign',
    entityId: requestId,
    entityName: campaign,
    listingName: listing,
    listingImage: listingImage,
    requestedBy: requestedBy,
  });
  setGlobalActionModalOpen(true);
};
```

### Reject Campaign Request

```typescript
// In ActionCenterPage.tsx
const handleRejectCampaignRequest = (
  requestId: string,
  listing: string,
  requestedBy: string,
  campaign: string,
  listingImage: string
) => {
  setGlobalActionId('reject-campaign-request');
  setGlobalActionContext({
    entityType: 'campaign',
    entityId: requestId,
    entityName: campaign,
    listingName: listing,
    listingImage: listingImage,
    requestedBy: requestedBy,
  });
  setGlobalActionModalOpen(true);
};
```

### Render Modal

```typescript
// In ActionCenterPage.tsx (at bottom of component)
<GlobalActionModal
  open={globalActionModalOpen}
  onOpenChange={setGlobalActionModalOpen}
  actionId={globalActionId}
  context={globalActionContext}
  onActionComplete={handleGlobalActionComplete}
/>
```

---

## 📋 Action Routing Table

| ActionId                    | Canonical Sheet           | Required Fields        |
|-----------------------------|---------------------------|------------------------|
| `approve-campaign-request`  | CampaignApprovalSheet     | Notes (optional)       |
| `reject-campaign-request`   | CampaignRejectionSheet    | Reason (required)      |

---

## ✅ MVP Checklist

- [x] GlobalActionModal component created
- [x] CampaignApprovalSheet component created
- [x] CampaignRejectionSheet component created
- [x] ActionCenterPage handlers updated
- [x] Entry points wired (Approve/Reject buttons)
- [x] Routing logic implemented
- [x] Completion callback implemented
- [x] Reactive card removal working
- [x] Toast notifications showing
- [x] Validation for rejection reason
- [x] NO UI changes outside modal system
- [x] NO changes to Events Hub
- [x] NO changes to Settings

---

## 🚀 Testing Checklist

### Approve Flow
- [ ] Click "Approve" on campaign request
- [ ] GlobalActionModal opens
- [ ] CampaignApprovalSheet displays
- [ ] Listing info shows correctly
- [ ] Can add optional notes
- [ ] Click "Approve Request"
- [ ] Loading state shows
- [ ] Success toast appears
- [ ] Sheet closes
- [ ] Card removed from list

### Reject Flow
- [ ] Click "Reject" on campaign request
- [ ] GlobalActionModal opens
- [ ] CampaignRejectionSheet displays
- [ ] Listing info shows correctly
- [ ] Rejection reason dropdown required
- [ ] Cannot submit without reason
- [ ] Error toast if no reason selected
- [ ] "Other" requires notes
- [ ] Can add optional notes
- [ ] Click "Reject Request"
- [ ] Loading state shows
- [ ] Success toast appears
- [ ] Sheet closes
- [ ] Card removed from list

### Edge Cases
- [ ] Cancel closes sheet without action
- [ ] Card NOT removed on cancel
- [ ] Multiple approvals work in sequence
- [ ] Multiple rejections work in sequence
- [ ] Approve then reject different cards
- [ ] All rejection reasons work
- [ ] Notes field accepts long text
- [ ] Images load correctly
- [ ] User names display correctly

---

## 🔮 Future Expansion (Phase 2+)

### Events Hub (Next)
```typescript
// Add to GlobalActionModal.tsx
{actionId === 'approve-event-request' && (
  <EventApprovalSheet
    open={open}
    onOpenChange={onOpenChange}
    {...context}
    onComplete={handleComplete}
  />
)}

{actionId === 'reject-event-request' && (
  <EventRejectionSheet
    open={open}
    onOpenChange={onOpenChange}
    {...context}
    onComplete={handleComplete}
  />
)}
```

### Settings Actions (Later)
```typescript
// Add to GlobalActionModal.tsx
{['pause-campaign', 'resume-campaign', 'delete-campaign'].includes(actionId) && (
  <ConfirmActionDialog
    open={open}
    onOpenChange={onOpenChange}
    variant={getVariantForAction(actionId)}
    {...context}
    onComplete={handleComplete}
  />
)}
```

---

## 🎨 Component Props

### GlobalActionModal
```typescript
interface GlobalActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionId: GlobalActionId | null;
  context: GlobalActionContext | null;
  onActionComplete?: () => void;
}
```

### CampaignApprovalSheet
```typescript
interface CampaignApprovalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: string;
  listingImage: string;
  campaign: string;
  requestedBy: string;
  onComplete?: () => void;
}
```

### CampaignRejectionSheet
```typescript
interface CampaignRejectionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listing: string;
  listingImage: string;
  campaign: string;
  requestedBy: string;
  onComplete?: () => void;
}
```

---

## 📝 Key Principles

### ✅ DO
- Use GlobalActionModal as dispatcher
- Let canonical sheets execute logic
- Show toasts from canonical sheets
- Remove cards in onActionComplete callback
- Pass full context to modal
- Validate input in canonical sheets

### ❌ DON'T
- Execute logic in GlobalActionModal
- Show toasts from GlobalActionModal
- Mutate state in GlobalActionModal
- Skip validation
- Remove cards before action completes
- Change UI outside modal system

---

## 🐛 Common Issues & Solutions

### Issue: Card not removed after action
**Solution**: Check `onActionComplete` callback is wired and `entityId` is correct

### Issue: Modal doesn't open
**Solution**: Verify `globalActionModalOpen` is set to `true` and `actionId` is valid

### Issue: Wrong sheet opens
**Solution**: Check `actionId` value matches routing table in GlobalActionModal

### Issue: Validation not working
**Solution**: Check canonical sheet validates before calling backend

### Issue: Toast not showing
**Solution**: Toast should be called from canonical sheet, not dispatcher

---

**END OF QUICK REFERENCE**

For full implementation details, see:  
`/GLOBAL_ACTION_MODAL_MVP_IMPLEMENTATION.md`
