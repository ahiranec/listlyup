# GAM COLLISION AUDIT REPORT
**GlobalActionModal Name Collision Investigation**  
**Date:** 2026-01-16  
**Auditor:** System Verification (static analysis)  
**Status:** COMPLETE

---

## 📋 EXECUTIVE SUMMARY

**Issue:** Two components named `GlobalActionModal` exist in different locations  
**Classification:** **CLASS-3** — Legacy campaigns modal still in use (deprecation candidate)  
**Risk:** MEDIUM — Name collision + functional overlap  
**Recommendation:** DEPRECATE campaigns version + RENAME or MERGE

---

## 📁 INVENTORY

### A) `/components/global-action-modal/GlobalActionModal.tsx` (CANONICAL)

**Export Type:** Named exports  
**Exports:**
- `GlobalActionModalProvider` (component)
- `useGlobalActionModal` (hook)

**Props Signature:**
```typescript
interface GlobalActionModalProviderProps {
  children: ReactNode;
}

// Hook returns:
interface GlobalActionModalContextValue {
  dispatch: (payload: GlobalActionPayload) => void;
  close: () => void;
}

interface GlobalActionPayload {
  actionId: ActionId;
  context: ActionContext;
  onConfirm: () => void;
}
```

**Top-Level Render:**
- `GlobalActionModalContext.Provider` (React Context provider)
- `ConfirmActionDialog` (conditional render when `isOpen && confirmDialogData`)

**Routing Mechanism:**
- ✅ Uses `ROUTING_TABLE` from `./routing-table.ts`
- ✅ Routes actions to `ConfirmActionDialog` via data mapping
- ✅ No switch/case in component (config-driven)

**Scope (AS-IS):**
- Listing actions: delete, resume, renew, duplicate, pause, archive, reactivate
- Group actions: leave, delete, archive
- Join request actions: approve, reject
- Trade actions: accept, decline
- Report actions: take-action, dismiss, resolve
- Admin actions: approve-flagged-listing, remove-flagged-listing, resolve-user-issue

**Total ActionIds:** 22 actions

**Pattern:**
- Context provider pattern (renders at app root)
- Dispatcher-only (NO direct UI)
- Routes to canonical executor (ConfirmActionDialog)
- Phase 5 V1 implementation

**Documentation:**
- File header: "Phase 5 V1"
- Comment: "ROLE: Central dispatcher/router for confirmation actions"
- Comment: "PATTERN: Entry Point → GAM → Canonical Executor (ConfirmActionDialog)"

---

### B) `/components/campaigns/GlobalActionModal.tsx` (LEGACY)

**Export Type:** Named export + types  
**Exports:**
- `GlobalActionModal` (component, default usage)
- `GlobalActionId` (type)
- `GlobalActionContext` (interface/type)

**Props Signature:**
```typescript
interface GlobalActionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  actionId: GlobalActionId | null;
  context: GlobalActionContext | null;
  onActionComplete?: () => void;
}

export type GlobalActionId = 
  | 'approve-campaign-request'
  | 'reject-campaign-request'
  | 'approve-event-request'
  | 'reject-event-request';

export interface GlobalActionContext {
  entityType: 'campaign' | 'event';
  entityId: string;
  entityName: string;
  listingId?: string;
  listingName?: string;
  listingImage?: string;
  requestedBy?: string;
  qualifies?: boolean;
  reason?: string;
  additionalData?: Record<string, unknown>;
}
```

**Top-Level Render:**
- Fragment `<>...</>` containing conditional Sheet renders
- NO Dialog/Modal wrapper
- Renders specific Sheets based on actionId

**Routing Mechanism:**
- ✅ Uses conditional rendering (if/else pattern)
- ✅ Routes to specific approval/rejection sheets
- ✅ NO routing table (inline switch via JSX conditionals)

**Scope (AS-IS):**
- `approve-campaign-request` → `CampaignApprovalSheet`
- `reject-campaign-request` → `CampaignRejectionSheet`
- `approve-event-request` → `EventApprovalSheet`
- `reject-event-request` → `EventRejectionSheet`

**Total ActionIds:** 4 actions (campaign + event approval/rejection only)

**Pattern:**
- Controlled component pattern (open/onOpenChange props)
- Dispatcher-only (NO direct UI)
- Routes to specialized approval/rejection sheets
- Phase 1 + Phase 2 implementation

**Documentation:**
- File header: "Phase 1 + Phase 2"
- Comment: "ARCHITECTURE: Dispatcher Only (NO Logic Execution)"
- Comment: "PURPOSE: Receives actionId + context, Resolves which canonical executor to open"
- Comment: "CURRENT SCOPE (Phase 1 + Phase 2)"
- Comment: "FUTURE (Phase 3+): pause/resume/delete/share → ConfirmActionDialog"

---

## 🔍 CONSUMER ANALYSIS

### Canonical GAM (`/components/global-action-modal/GlobalActionModal.tsx`)

#### Provider Usage: 1 instance
**File:** `/App.tsx` (line 238)  
**Usage:** Renders `<GlobalActionModalProvider>` at app root  
**Context:** Wraps entire app (below ServiceProvider, ProfileProvider, FeaturesProvider)  
**Type:** SINGLETON — One global instance for entire app

#### Hook Usage: 6 files
1. **`/components/ActionCenterPage.tsx`** (line 66)
   - Import: `import { useGlobalActionModal } from './global-action-modal'`
   - Usage: Phase 5.1 GAM for confirmations (join requests, reports, admin actions)
   - Note: Also imports campaigns GAM separately (line 65)

2. **`/components/MyListingsPage.tsx`** (line 21)
   - Import: `import { useGlobalActionModal } from './global-action-modal'`
   - Usage: Phase 5.1 GAM for listing management confirmations
   - Handlers: delete, resume, renew, duplicate, pause, archive (6 handlers)

3. **`/components/group-detail/GroupDetailPage.tsx`** (line 40)
   - Import: `import { useGlobalActionModal } from '../global-action-modal'`
   - Usage: Phase 5.1 GAM for group management confirmations
   - Handler: leave-group (1 handler)

4. **`/components/actions/ActionButtons.tsx`** (line 14)
   - Import: `import { useGlobalActionModal } from '../global-action-modal'`
   - Usage: Generic action buttons (reusable component)
   - Context: Can dispatch any confirmation action

5. **`/components/actions/ActionMenu.tsx`** (line 21)
   - Import: `import { useGlobalActionModal } from '../global-action-modal'`
   - Usage: Generic action menu (reusable component)
   - Context: Can dispatch any confirmation action

6. **Documentation files** (5 files)
   - `/PHASE_5_IMPLEMENTATION_GUIDE.md`
   - `/PHASE_5_MIGRATION_EXAMPLE.md`
   - `/PHASE_5_1_COMPLETION_REPORT.md`
   - `/PHASE_5_1_FINAL_REPORT.md`
   - `/CANONICAL_QUICK_REFERENCE_v2.1_ASIS.md`

**Total Active Consumers:** 5 component files + 1 provider instance

---

### Campaigns GAM (`/components/campaigns/GlobalActionModal.tsx`)

#### Component Usage: 1 instance
**File:** `/components/ActionCenterPage.tsx` (lines 65, 1621-1627)  
**Import:** `import { GlobalActionModal, GlobalActionId, GlobalActionContext } from './campaigns/GlobalActionModal'`  
**Usage:**
```tsx
{/* Global Action Modal (Phase 1 + Phase 2: Campaign + Event approve/reject dispatcher) */}
<GlobalActionModal
  open={globalActionModalOpen}
  onOpenChange={setGlobalActionModalOpen}
  actionId={globalActionId}
  context={globalActionContext}
  onActionComplete={handleGlobalActionComplete}
/>
```

**State Management:**
```typescript
const [globalActionModalOpen, setGlobalActionModalOpen] = useState(false);
const [globalActionId, setGlobalActionId] = useState<GlobalActionId | null>(null);
const [globalActionContext, setGlobalActionContext] = useState<GlobalActionContext | null>(null);
```

**Entry Points (4 handlers):**
1. `handleApproveCampaignRequest()` → `'approve-campaign-request'`
2. `handleRejectCampaignRequest()` → `'reject-campaign-request'`
3. `handleApproveEventRequest()` → `'approve-event-request'`
4. `handleRejectEventRequest()` → `'reject-event-request'`

**Total Active Consumers:** 1 component file (ActionCenterPage only)

**Documentation:** 2 files
- `/GLOBAL_ACTION_MODAL_MVP_IMPLEMENTATION.md`
- `/GLOBAL_ACTION_MODAL_QUICK_REFERENCE.md`

---

## 🏗️ RUNTIME OWNERSHIP CHECK

### Canonical GAM
**Pattern:** Context Provider (singleton at app root)  
**Instance Count:** 1 global instance  
**Location:** `/App.tsx` wrapping entire app  
**Access:** Via `useGlobalActionModal()` hook from any child component  
**Lifecycle:** Mounted once, lives for entire app session  

### Campaigns GAM
**Pattern:** Controlled Component (local state)  
**Instance Count:** 1 per usage (currently 1 in ActionCenterPage)  
**Location:** Rendered locally in ActionCenterPage  
**Access:** Via local state (`globalActionModalOpen`, `globalActionId`, `globalActionContext`)  
**Lifecycle:** Conditional render when `open && actionId && context`  

### Runtime Behavior
- **BOTH ARE ACTIVE** — Not mutually exclusive
- Canonical GAM: Handles confirmations (delete, pause, resume, etc.) via hook dispatch
- Campaigns GAM: Handles approvals/rejections (campaign/event requests) via local state
- **NO COLLISION AT RUNTIME** — Different invocation patterns, different scopes

---

## 🔄 FUNCTIONAL OVERLAP ASSESSMENT

### Routing Mechanism
| Aspect | Canonical GAM | Campaigns GAM |
|--------|---------------|---------------|
| **Routing Pattern** | Config-driven (ROUTING_TABLE) | Conditional JSX (if statements) |
| **Registry** | External file (`routing-table.ts`) | Inline in component |
| **Extensibility** | High (add to table) | Low (edit component) |
| **Maintainability** | High (separation) | Medium (inline logic) |

### Action Scope
| Aspect | Canonical GAM | Campaigns GAM |
|--------|---------------|---------------|
| **Family** | Confirmations only | Approvals/Rejections only |
| **Action Type** | Destructive, warning, info, success | Approval forms, rejection forms |
| **Executor** | ConfirmActionDialog | Specialized Sheets (Approval/Rejection) |
| **Total Actions** | 22 actions | 4 actions |
| **Overlap** | NONE | NONE |

### Shared Dependencies
| Dependency | Canonical GAM | Campaigns GAM |
|------------|---------------|---------------|
| **ConfirmActionDialog** | ✅ Used | ❌ Not used (planned for future) |
| **Approval/Rejection Sheets** | ❌ Not used | ✅ Used |
| **Routing Table** | ✅ Yes (`routing-table.ts`) | ❌ No |
| **Action Registry** | ❌ No | ❌ No |
| **ActionButtons/ActionMenu** | ✅ Consumed by | ❌ Not consumed |

### Design Pattern
| Aspect | Canonical GAM | Campaigns GAM |
|--------|---------------|---------------|
| **Pattern** | Context + Hook | Controlled Component |
| **Invocation** | `dispatch({ actionId, context, onConfirm })` | `<GlobalActionModal open={...} actionId={...} />` |
| **State Management** | Internal (provider) | External (parent component) |
| **Instance Model** | Singleton | Multiple instances possible |

---

## 📊 CLASSIFICATION

**Category:** **CLASS-3** — Legacy campaigns modal still used (deprecation candidate)

### Evidence:
1. ✅ **Name Collision Confirmed**
   - Both files export `GlobalActionModal` (type vs component name)
   - Both files export types/interfaces with similar names
   - Confusing for developers (which GAM to use?)

2. ✅ **Functional Specialization**
   - Canonical GAM: Confirmations (22 actions)
   - Campaigns GAM: Approvals/Rejections (4 actions)
   - NO direct overlap in action types

3. ✅ **Legacy Status Confirmed**
   - Campaigns GAM labeled "Phase 1 + Phase 2"
   - Canonical GAM labeled "Phase 5 V1"
   - Campaigns GAM comments say "FUTURE (Phase 3+): pause/resume/delete → ConfirmActionDialog"
   - This indicates campaigns GAM was intended to be temporary

4. ✅ **Active But Isolated**
   - Campaigns GAM only used in 1 file (ActionCenterPage)
   - Canonical GAM used in 5 files + 1 provider
   - Campaigns GAM has narrow scope (campaign/event approvals only)

5. ✅ **Migration Path Exists**
   - Campaigns GAM comments mention future migration to ConfirmActionDialog
   - Canonical GAM architecture supports all confirmation types
   - Approval/Rejection sheets can be integrated into canonical GAM

### Why Not CLASS-1?
- NOT just a name collision — campaigns GAM is actively used (1 consumer)

### Why Not CLASS-2?
- NOT duplicate functional — different executors (ConfirmActionDialog vs Approval/Rejection Sheets)
- Canonical GAM doesn't route to approval/rejection sheets (yet)

### Why Not CLASS-4?
- NOT both required long-term — campaigns GAM was marked as temporary (Phase 1+2)
- The architecture suggests campaigns GAM should be absorbed into canonical GAM

---

## 🎯 RECOMMENDATION

### Strategy: **DEPRECATE + MIGRATE + RENAME**

### Phase 1: Extend Canonical GAM (Non-Breaking)
**Objective:** Add approval/rejection support to canonical GAM without breaking campaigns GAM

**Actions:**
1. ✅ Add new action families to `/components/global-action-modal/routing-table.ts`:
   ```typescript
   // Campaign/Event Approvals (NEW)
   | 'approve-campaign-request'
   | 'reject-campaign-request'
   | 'approve-event-request'
   | 'reject-event-request'
   ```

2. ✅ Update canonical GAM to route to approval/rejection sheets:
   ```typescript
   // In GlobalActionModal.tsx
   const route = ROUTING_TABLE[actionId];
   
   if (route.executor === 'CampaignApprovalSheet') {
     // Render CampaignApprovalSheet
   } else if (route.executor === 'ConfirmActionDialog') {
     // Render ConfirmActionDialog (existing)
   }
   ```

3. ✅ Add executor type to routing table:
   ```typescript
   interface ActionRoute {
     executor: 'ConfirmActionDialog' | 'CampaignApprovalSheet' | 'CampaignRejectionSheet' | ...;
     getConfig: (context: ActionContext) => ActionConfig | null;
   }
   ```

**Result:** Canonical GAM can now handle ALL actions (confirmations + approvals/rejections)

---

### Phase 2: Migrate ActionCenterPage (Breaking Change)
**Objective:** Remove campaigns GAM usage from ActionCenterPage

**Actions:**
1. ✅ Update ActionCenterPage to use canonical GAM hook:
   ```typescript
   // Remove:
   import { GlobalActionModal, GlobalActionId, GlobalActionContext } from './campaigns/GlobalActionModal';
   const [globalActionModalOpen, setGlobalActionModalOpen] = useState(false);
   const [globalActionId, setGlobalActionId] = useState<GlobalActionId | null>(null);
   
   // Already exists:
   import { useGlobalActionModal } from './global-action-modal';
   const { dispatch } = useGlobalActionModal();
   
   // Update handlers:
   const handleApproveCampaignRequest = (...) => {
     dispatch({
       actionId: 'approve-campaign-request',
       context: { ... },
       onConfirm: () => {
         // Business logic + toast
       },
     });
   };
   ```

2. ✅ Remove campaigns GAM render:
   ```typescript
   // Remove:
   <GlobalActionModal
     open={globalActionModalOpen}
     onOpenChange={setGlobalActionModalOpen}
     actionId={globalActionId}
     context={globalActionContext}
     onActionComplete={handleGlobalActionComplete}
   />
   ```

3. ✅ Remove local state (3 lines)
4. ✅ Update 4 handlers to use dispatch

**Result:** ActionCenterPage only uses canonical GAM (0 campaigns GAM callers)

---

### Phase 3: Deprecate Campaigns GAM
**Objective:** Mark campaigns GAM as deprecated (0 callers)

**Actions:**
1. ✅ Add deprecation notice to `/components/campaigns/GlobalActionModal.tsx`:
   ```typescript
   /**
    * GlobalActionModal (Phase 1 + Phase 2)
    * 
    * ⚠️ DEPRECATED — 0 CALLERS (as of 2026-01-XX)
    * 
    * This component has been deprecated and replaced by canonical GlobalActionModal
    * with extended routing table support for approval/rejection flows.
    * 
    * Migration: Campaigns GAM → Canonical GAM (COMPLETED)
    * 
    * Old usage:
    *   <GlobalActionModal actionId="approve-campaign-request" ... />
    * 
    * New usage:
    *   const { dispatch } = useGlobalActionModal();
    *   dispatch({ actionId: 'approve-campaign-request', ... });
    * 
    * Safe to delete after: 2026-XX-XX
    */
   ```

2. ✅ Remove barrel export from `/components/campaigns/index.ts` (if exists)

**Result:** Campaigns GAM deprecated with 0 callers

---

### Phase 4: Optional Rename (Clarity Improvement)
**Objective:** Eliminate name collision confusion (optional but recommended)

**Option A: Rename File Only** (Low Risk)
- Rename `/components/campaigns/GlobalActionModal.tsx` → `/components/campaigns/LegacyCampaignActionModal.tsx`
- Update deprecation notice to reflect new name
- NO code changes needed (0 callers)
- Preserves history for reference

**Option B: Delete After Verification** (Cleanest)
- Wait 1-2 weeks for verification
- Build/CI passes
- Smoke test passes (approve/reject campaign/event requests)
- Delete `/components/campaigns/GlobalActionModal.tsx`
- Update documentation to remove references

**Recommendation:** Option B (delete after verification)

---

## 📋 IMPLEMENTATION PLAN

### Estimated Effort
| Phase | Tasks | Files | Time | Risk |
|-------|-------|-------|------|------|
| **Phase 1** | Extend canonical GAM | 2 files | 2 hours | LOW |
| **Phase 2** | Migrate ActionCenterPage | 1 file | 1 hour | MEDIUM |
| **Phase 3** | Deprecate campaigns GAM | 1 file | 15 min | NONE |
| **Phase 4** | Delete after verification | 1 file | 5 min | NONE |
| **Total** | — | 5 files | 3.3 hours | LOW-MEDIUM |

### Phase 1 Details: Extend Canonical GAM

**File 1:** `/components/global-action-modal/routing-table.ts`

**Changes:**
1. Add 4 new ActionIds to type union
2. Add 4 new routes to ROUTING_TABLE
3. Change ActionRoute interface to support multiple executors:
   ```typescript
   interface ActionRoute {
     executor: 'ConfirmActionDialog' | 'Sheet';
     sheetComponent?: 'CampaignApprovalSheet' | 'CampaignRejectionSheet' | ...;
     getConfig: (context: ActionContext) => ActionConfig | SheetConfig | null;
   }
   ```

**File 2:** `/components/global-action-modal/GlobalActionModal.tsx`

**Changes:**
1. Import approval/rejection sheets:
   ```typescript
   import { CampaignApprovalSheet } from '../campaigns/CampaignApprovalSheet';
   import { CampaignRejectionSheet } from '../campaigns/CampaignRejectionSheet';
   import { EventApprovalSheet } from '../events/EventApprovalSheet';
   import { EventRejectionSheet } from '../events/EventRejectionSheet';
   ```

2. Update state to handle sheet vs dialog:
   ```typescript
   const [isOpen, setIsOpen] = useState(false);
   const [confirmDialogData, setConfirmDialogData] = useState<ConfirmActionDialogData | null>(null);
   const [sheetConfig, setSheetConfig] = useState<SheetConfig | null>(null); // NEW
   ```

3. Update dispatch to route to sheets:
   ```typescript
   const dispatch = (payload: GlobalActionPayload) => {
     const route = ROUTING_TABLE[actionId];
     
     if (route.executor === 'ConfirmActionDialog') {
       // Existing logic
       const dialogData = route.getConfig(actionContext);
       setConfirmDialogData(dialogData);
       setIsOpen(true);
     } else if (route.executor === 'Sheet') {
       // New logic
       const sheetData = route.getConfig(actionContext);
       setSheetConfig({ ...sheetData, sheetComponent: route.sheetComponent });
       setIsOpen(true);
     }
   };
   ```

4. Update render to support sheets:
   ```tsx
   return (
     <GlobalActionModalContext.Provider value={value}>
       {children}
       
       {/* Confirmation Dialog */}
       {confirmDialogData && (
         <ConfirmActionDialog
           open={isOpen}
           onOpenChange={setIsOpen}
           data={confirmDialogData}
         />
       )}
       
       {/* Approval/Rejection Sheets */}
       {sheetConfig && sheetConfig.sheetComponent === 'CampaignApprovalSheet' && (
         <CampaignApprovalSheet
           open={isOpen}
           onOpenChange={setIsOpen}
           {...sheetConfig.props}
           onComplete={() => {
             sheetConfig.onConfirm();
             setIsOpen(false);
           }}
         />
       )}
       
       {/* ... other sheet types ... */}
     </GlobalActionModalContext.Provider>
   );
   ```

**Risk:** LOW (additive change, no breaking changes)

---

### Phase 2 Details: Migrate ActionCenterPage

**File:** `/components/ActionCenterPage.tsx`

**Lines to Remove:**
- Line 65: `import { GlobalActionModal, GlobalActionId, GlobalActionContext } from './campaigns/GlobalActionModal';`
- Line 322: `const [globalActionModalOpen, setGlobalActionModalOpen] = useState(false);`
- Line 323: `const [globalActionId, setGlobalActionId] = useState<GlobalActionId | null>(null);`
- Line 324: `const [globalActionContext, setGlobalActionContext] = useState<GlobalActionContext | null>(null);`
- Lines 1621-1627: `<GlobalActionModal ... />`

**Handlers to Update:** 4 handlers
1. `handleApproveCampaignRequest()` (line ~675)
2. `handleRejectCampaignRequest()` (line ~695)
3. `handleApproveEventRequest()` (line ~737)
4. `handleRejectEventRequest()` (line ~757)

**New Pattern:**
```typescript
const { dispatch } = useGlobalActionModal(); // Already imported

const handleApproveCampaignRequest = (requestId: string, listing: string, requestedBy: string, campaign: string, listingImage: string) => {
  dispatch({
    actionId: 'approve-campaign-request',
    context: {
      entityType: 'campaign',
      entityId: requestId,
      entityName: campaign,
      listingName: listing,
      listingImage: listingImage,
      requestedBy: requestedBy,
    },
    onConfirm: () => {
      // Business logic (same as handleGlobalActionComplete)
      handleGlobalActionComplete();
    },
  });
};
```

**Risk:** MEDIUM (behavioral change, requires testing)

---

### Phase 3 Details: Deprecate Campaigns GAM

**File:** `/components/campaigns/GlobalActionModal.tsx`

**Changes:** Add deprecation header (similar to TradeOfferConfirmDialog pattern)

**Risk:** NONE (0 callers)

---

### Phase 4 Details: Delete After Verification

**File:** `/components/campaigns/GlobalActionModal.tsx`

**Action:** Delete entire file

**Deletion Gate:**
1. ✅ Build/CI passes
2. ✅ Smoke test passes:
   - Approve campaign request → CampaignApprovalSheet opens
   - Reject campaign request → CampaignRejectionSheet opens
   - Approve event request → EventApprovalSheet opens
   - Reject event request → EventRejectionSheet opens
3. ✅ No import errors (search confirms 0 imports)

**Risk:** NONE (verified 0 callers)

---

## 🚨 RISKS & MITIGATION

### Risk 1: Breaking Approval/Rejection Flows
**Severity:** HIGH  
**Probability:** MEDIUM  
**Mitigation:**
- Phase 1 is non-breaking (additive only)
- Phase 2 requires thorough smoke testing
- Keep campaigns GAM as backup until verified
- Test all 4 flows before deleting

### Risk 2: Type Conflicts
**Severity:** LOW  
**Probability:** LOW  
**Mitigation:**
- Canonical GAM uses different type names (`ActionId` vs `GlobalActionId`)
- Rename if needed: `GlobalActionId` → `CampaignActionId` in campaigns GAM

### Risk 3: State Management Differences
**Severity:** MEDIUM  
**Probability:** LOW  
**Mitigation:**
- Campaigns GAM uses local state (controlled)
- Canonical GAM uses context (global)
- Both patterns work, just different invocation
- Test that `onActionComplete` callback still fires correctly

---

## 📊 SUCCESS CRITERIA

### Phase 1 Complete When:
- [ ] ROUTING_TABLE has 4 new campaign/event actions
- [ ] Canonical GAM renders approval/rejection sheets
- [ ] No breaking changes to existing confirmations
- [ ] Build passes

### Phase 2 Complete When:
- [ ] ActionCenterPage uses canonical GAM hook only
- [ ] 0 imports of campaigns GAM
- [ ] All 4 approval/rejection handlers migrated
- [ ] Smoke test passes (4 flows work identically)

### Phase 3 Complete When:
- [ ] Campaigns GAM marked DEPRECATED
- [ ] Deprecation notice added
- [ ] 0 callers confirmed

### Phase 4 Complete When:
- [ ] Campaigns GAM deleted
- [ ] Build/CI passes
- [ ] Documentation updated
- [ ] No stale references

---

## 🏆 EXPECTED OUTCOME

### Before
- **2 GlobalActionModal implementations** (name collision)
- **2 different invocation patterns** (hook vs component)
- **Split responsibility** (confirmations vs approvals)
- **6 total consumers** (5 canonical + 1 campaigns)

### After
- **1 GlobalActionModal implementation** (canonical only)
- **1 invocation pattern** (hook only)
- **Unified responsibility** (all actions routed through canonical)
- **5 consumers** (same as before, campaigns absorbed)

### Benefits
1. ✅ **Name clarity** — No more collision confusion
2. ✅ **Architectural consistency** — One dispatcher pattern
3. ✅ **Easier maintenance** — One place to add actions
4. ✅ **Better discoverability** — Developers use one GAM
5. ✅ **Phase alignment** — Completes original roadmap (campaigns GAM was temporary)

---

## 📝 NEXT ACTIONS

### Immediate
1. **Review this report** — Confirm classification and strategy
2. **Prioritize phases** — Decide if all phases are needed
3. **Schedule implementation** — Assign owner and timeline

### Before Implementation
1. **Create backup branch** — In case rollback needed
2. **Document current behavior** — Screenshots of approval/rejection flows
3. **Prepare test plan** — Smoke test checklist for 4 flows

### After Implementation
1. **Update documentation** — Remove campaigns GAM references
2. **Update guides** — Point to canonical GAM only
3. **Announce deprecation** — If campaigns GAM remains temporarily

---

**Report Date:** 2026-01-16  
**Classification:** CLASS-3 (Legacy modal still in use)  
**Recommendation:** DEPRECATE + MIGRATE + DELETE  
**Estimated Effort:** 3.3 hours  
**Risk Level:** LOW-MEDIUM (requires testing)  
**Priority:** P2 (non-blocking, but should be resolved)
