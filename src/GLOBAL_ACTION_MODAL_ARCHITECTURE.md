# Global Action Modal - Architecture Overview

**Pattern**: Centralized Action Dispatcher  
**Status**: MVP Implemented (Campaigns Only)  
**Version**: 1.0

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    ENTRY POINTS LAYER                           │
│                 (Multiple surfaces invoke modal)                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  ┌────────────┐  │
│  │  Action Center    │  │  Campaigns Hub    │  │  Settings  │  │
│  │  (Campaigns Tab)  │  │  (Future)         │  │  (Future)  │  │
│  └─────────┬─────────┘  └─────────┬─────────┘  └──────┬─────┘  │
│            │                      │                    │        │
│            │ actionId + context   │                    │        │
│            └──────────┬───────────┴────────────────────┘        │
└───────────────────────┼────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│                   DISPATCHER LAYER                              │
│              (Routing logic, NO execution)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                  ┌──────────────────────────┐                   │
│                  │  GlobalActionModal       │                   │
│                  │  ──────────────────────  │                   │
│                  │  • Receives actionId     │                   │
│                  │  • Receives context      │                   │
│                  │  • Routes to canonical   │                   │
│                  │  • NO logic execution    │                   │
│                  └────────────┬─────────────┘                   │
│                               │                                 │
│              ┌────────────────┼────────────────┐                │
│              │                │                │                │
└──────────────┼────────────────┼────────────────┼────────────────┘
               │                │                │
               ▼                ▼                ▼
┌─────────────────────────────────────────────────────────────────┐
│                  CANONICAL EXECUTORS LAYER                      │
│               (Business logic + UI + Backend)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │ CampaignApproval │  │CampaignRejection │  │  ShareSheet  │  │
│  │     Sheet        │  │     Sheet        │  │  (Future)    │  │
│  │ ──────────────── │  │ ──────────────── │  │              │  │
│  │ • Show context   │  │ • Show context   │  │              │  │
│  │ • Optional notes │  │ • Required reason│  │              │  │
│  │ • Validate input │  │ • Validate input │  │              │  │
│  │ • Execute action │  │ • Execute action │  │              │  │
│  │ • Show toast     │  │ • Show toast     │  │              │  │
│  │ • Call complete  │  │ • Call complete  │  │              │  │
│  └────────┬─────────┘  └────────┬─────────┘  └──────┬───────┘  │
│           │                     │                    │          │
└───────────┼─────────────────────┼────────────────────┼──────────┘
            │                     │                    │
            └──────────┬──────────┴────────────────────┘
                       ▼
┌─────────────────────────────────────────────────────────────────┐
│                  ACTION REGISTRY LAYER                          │
│                   (Backend integration)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                  ┌──────────────────────────┐                   │
│                  │  Action Registry         │                   │
│                  │  ──────────────────────  │                   │
│                  │  • Execute backend calls │                   │
│                  │  • Update database       │                   │
│                  │  • Send notifications    │                   │
│                  │  • Handle errors         │                   │
│                  └──────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### Approve Campaign Request

```
1. USER ACTION
   └─ User clicks "Approve" in Action Center
      ↓
2. ENTRY POINT
   └─ ActionCenterPage.handleApproveCampaignRequest()
      • Creates context object:
        {
          entityType: 'campaign',
          entityId: 'cr-1',
          entityName: 'Summer Sale 2026',
          listingName: 'iPhone 13 Pro',
          listingImage: 'https://...',
          requestedBy: '@maria_tech'
        }
      • Sets actionId: 'approve-campaign-request'
      • Opens GlobalActionModal
      ↓
3. DISPATCHER
   └─ GlobalActionModal receives action + context
      • Routes to CampaignApprovalSheet
      • Passes context
      • Waits for completion
      ↓
4. CANONICAL EXECUTOR
   └─ CampaignApprovalSheet
      • Displays listing preview
      • Shows qualification badge
      • Provides notes textarea (optional)
      • User reviews and confirms
      • Validates input
      • Executes action (mock backend call)
      • Shows success toast
      • Calls onComplete()
      ↓
5. DISPATCHER CALLBACK
   └─ GlobalActionModal.handleComplete()
      • Closes modal
      • Calls parent onActionComplete()
      ↓
6. ENTRY POINT CALLBACK
   └─ ActionCenterPage.handleGlobalActionComplete()
      • Removes card from list (reactive)
      • UI updates automatically
```

---

## 🎨 Component Hierarchy

```
ActionCenterPage
├── Header
├── Tabs (Personal, Campaigns, Events, Groups, Admin)
├── Campaign Tab Content
│   ├── Quick Counts
│   ├── Campaign Owner Requests Section
│   │   └── CampaignRequestCard (multiple)
│   │       ├── [View] → Navigate to listing
│   │       ├── [Reject] → GlobalActionModal
│   │       └── [Approve] → GlobalActionModal
│   └── User Campaign Requests Section
│       └── RequestCard (multiple) [read-only]
│
└── Modals (bottom of component)
    ├── ReplySheet
    ├── ConfirmActionDialog
    ├── ViewStatusDialog
    ├── RejectionReasonsDialog
    └── GlobalActionModal ← NEW
        ├── CampaignApprovalSheet (conditional render)
        └── CampaignRejectionSheet (conditional render)
```

---

## 📋 Action Routing Matrix

### MVP (Phase 1) - Implemented ✅

| Entry Point | Action | ActionId | Canonical | Variant |
|-------------|--------|----------|-----------|---------|
| Action Center → Campaigns Tab | Approve Campaign Request | `approve-campaign-request` | CampaignApprovalSheet | - |
| Action Center → Campaigns Tab | Reject Campaign Request | `reject-campaign-request` | CampaignRejectionSheet | reason required |

---

### Phase 2 - Events Hub (Planned 🔜)

| Entry Point | Action | ActionId | Canonical | Variant |
|-------------|--------|----------|-----------|---------|
| Action Center → Events Tab | Approve Event Request | `approve-event-request` | EventApprovalSheet | - |
| Action Center → Events Tab | Reject Event Request | `reject-event-request` | EventRejectionSheet | reason required |

---

### Phase 3 - Settings Actions (Planned 🔜)

| Entry Point | Action | ActionId | Canonical | Variant |
|-------------|--------|----------|-----------|---------|
| CampaignSettingsSheet | Pause Campaign | `pause-campaign` | ConfirmActionDialog | warning |
| CampaignSettingsSheet | Resume Campaign | `resume-campaign` | ConfirmActionDialog | success |
| CampaignSettingsSheet | Delete Campaign | `delete-campaign` | ConfirmActionDialog | destructive |
| CampaignSettingsSheet | Duplicate Campaign | `duplicate-campaign` | ConfirmActionDialog | info |
| CampaignSettingsSheet | Share Campaign | `share-campaign` | ShareSheet | campaign |
| EventHubSettingsSheet | Pause Event | `pause-event` | ConfirmActionDialog | warning |
| EventHubSettingsSheet | Resume Event | `resume-event` | ConfirmActionDialog | success |
| EventHubSettingsSheet | Cancel Event | `cancel-event` | ConfirmActionDialog | destructive |
| EventHubSettingsSheet | Delete Event | `delete-event` | ConfirmActionDialog | destructive |
| EventHubSettingsSheet | Duplicate Event | `duplicate-event` | ConfirmActionDialog | info |
| EventHubSettingsSheet | Share Event | `share-event` | ShareSheet | event |

---

## 🔐 Type Definitions

### GlobalActionId

```typescript
export type GlobalActionId = 
  // MVP - Phase 1 (Implemented ✅)
  | 'approve-campaign-request'
  | 'reject-campaign-request'
  
  // Phase 2 - Events (Planned 🔜)
  // | 'approve-event-request'
  // | 'reject-event-request'
  
  // Phase 3 - Settings (Planned 🔜)
  // | 'pause-campaign'
  // | 'resume-campaign'
  // | 'delete-campaign'
  // | 'duplicate-campaign'
  // | 'share-campaign'
  // | 'pause-event'
  // | 'resume-event'
  // | 'cancel-event'
  // | 'delete-event'
  // | 'duplicate-event'
  // | 'share-event';
```

### GlobalActionContext

```typescript
export interface GlobalActionContext {
  // Entity info
  entityType: 'campaign' | 'event';
  entityId: string;
  entityName: string;
  
  // Listing info (for approval/rejection flows)
  listingId?: string;
  listingName?: string;
  listingImage?: string;
  requestedBy?: string;
  
  // Additional data
  qualifies?: boolean;
  reason?: string;
  additionalData?: Record<string, unknown>;
}
```

---

## 🎯 Design Principles

### 1. Single Responsibility
- **GlobalActionModal**: Routes actions ONLY
- **Canonical Executors**: Execute logic ONLY
- **Entry Points**: Trigger actions ONLY

### 2. Separation of Concerns
- **UI Layer**: Entry points (Action Center, Settings)
- **Routing Layer**: GlobalActionModal (dispatcher)
- **Logic Layer**: Canonical executors (sheets/dialogs)
- **Data Layer**: Action Registry (backend)

### 3. Open/Closed Principle
- Open for extension (add new actionIds)
- Closed for modification (existing routing logic unchanged)

### 4. Dependency Inversion
- Entry points depend on abstraction (GlobalActionModal interface)
- Canonical executors depend on abstraction (Action Registry interface)

---

## 🚀 Scalability

### Adding New Actions (3-step process)

#### Step 1: Add ActionId
```typescript
// In GlobalActionModal.tsx
export type GlobalActionId = 
  | 'approve-campaign-request'
  | 'reject-campaign-request'
  | 'new-action-id'; // ← Add here
```

#### Step 2: Create Canonical Executor
```typescript
// Create /components/campaigns/NewActionSheet.tsx
export function NewActionSheet({ 
  open, 
  onOpenChange, 
  context, 
  onComplete 
}) {
  // Implement UI + logic
}
```

#### Step 3: Add Routing
```typescript
// In GlobalActionModal.tsx
{actionId === 'new-action-id' && (
  <NewActionSheet
    open={open}
    onOpenChange={onOpenChange}
    {...context}
    onComplete={handleComplete}
  />
)}
```

---

## 📊 Performance Considerations

### Lazy Loading (Future Optimization)

```typescript
// Instead of:
import { CampaignApprovalSheet } from './CampaignApprovalSheet';

// Use:
const CampaignApprovalSheet = lazy(() => 
  import('./CampaignApprovalSheet').then(m => ({ 
    default: m.CampaignApprovalSheet 
  }))
);

// Wrap in Suspense:
<Suspense fallback={<LoadingFallback />}>
  {actionId === 'approve-campaign-request' && (
    <CampaignApprovalSheet {...props} />
  )}
</Suspense>
```

### Benefits
- Reduced initial bundle size
- Faster page load
- Load canonical executors on-demand

---

## 🔒 Security Considerations

### Input Validation
- All user input validated in canonical executors
- Required fields enforced (rejection reason)
- XSS prevention (sanitize notes)

### Authorization
- Check user permissions before opening modal
- Verify ownership/role before action execution
- Backend validation as final authority

### Error Handling
- Graceful degradation on network errors
- User-friendly error messages
- Retry mechanisms for transient failures

---

## 📈 Monitoring & Analytics

### Events to Track (Future)

```typescript
// When modal opens
analytics.track('global_action_modal_opened', {
  actionId: 'approve-campaign-request',
  entityType: 'campaign',
  source: 'action_center',
});

// When action completes
analytics.track('action_completed', {
  actionId: 'approve-campaign-request',
  entityType: 'campaign',
  duration_ms: 3450,
  success: true,
});

// When validation fails
analytics.track('validation_error', {
  actionId: 'reject-campaign-request',
  field: 'reason',
  error: 'required_field_empty',
});
```

---

## 🧪 Testing Strategy

### Unit Tests
- Test GlobalActionModal routing logic
- Test each canonical executor independently
- Test context construction in entry points

### Integration Tests
- Test complete flow from entry point to completion
- Test reactive card removal
- Test toast notifications

### E2E Tests
- Test user journey: click → modal → submit → success
- Test validation errors
- Test cancel flows

---

**END OF ARCHITECTURE DOCUMENT**

System architecture validated ✅  
MVP implemented and documented ✅  
Ready for Phase 2 expansion 🚀
