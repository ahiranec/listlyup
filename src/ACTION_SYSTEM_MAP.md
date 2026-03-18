# ACTION SYSTEM MAP - ListlyUp
## Visual Architecture: Actions, Entry Points & Canonical Executors

**Purpose**: Architectural documentation showing all executable actions, their origins, and canonical places  
**Audience**: Developers, Product Architects  
**Status**: Current state as of 2026-01-12

---

## 📐 LEGEND

### Entry Points (Blue)
Places where users discover and initiate actions

### Canonical Executors (Green)
Places where actions are actually executed

### Missing Canonicals (Red Dashed)
Documented but not yet implemented

### Action Types
- 🔵 **Core Flow** - Multi-step flows (Publish, Edit)
- 🟢 **Atomic** - Single dialogs/sheets
- 🟡 **Inline** - Immediate toggles
- 🟣 **Navigation** - Routing to other screens

---

## 🗺️ SYSTEM ARCHITECTURE MAP

```mermaid
graph TB
    %% ENTRY POINTS (Blue boxes)
    AC[Action Center<br/>📱 Personal | 👥 Groups | 🏷️ Campaigns | 🎭 Events | ⚡ Admin]
    ML[My Listings<br/>All | Drafts | Messages | Reported | Expiring]
    LD[Listing Detail<br/>Owner view | Visitor view]
    GD[Group Detail<br/>Member view | Admin view]
    CH[Chat View]
    PR[Profile Page]
    CM[Campaigns Hub]
    EV[Events Hub]
    AD[Admin Dashboard]
    
    %% CANONICAL EXECUTORS - Flows (Purple boxes)
    PF[Publish Flow v1.1<br/>🔵 CORE FLOW<br/>✅ Implemented]
    EF[Edit Listing Flow<br/>🔵 CORE FLOW<br/>✅ Reuses Publish Flow]
    
    %% CANONICAL EXECUTORS - Dialogs (Green boxes)
    CAD[ConfirmActionDialog<br/>🟢 ATOMIC<br/>✅ Implemented<br/>Uses: 20+ actions]
    RS[ReplySheet<br/>🟢 ATOMIC<br/>✅ Implemented<br/>Shared: Questions + Messages]
    MO[ManageOffersSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    COS[CounterOfferSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    MOS[MakeOfferSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    AQS[AskQuestionSheet<br/>🟢 ATOMIC<br/>🟡 Partial - No entry point]
    MAS[MarkAsSoldSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    PLS[PauseListingSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    STG[ShareToGroupSheet<br/>🟢 ATOMIC<br/>✅ Implemented]
    GJF[GroupJoinFlow<br/>🟢 ATOMIC<br/>🟡 Partial]
    LSM[ListingStatsModal<br/>🟢 ATOMIC<br/>✅ Implemented]
    RRD[RejectionReasonsDialog<br/>🟢 ATOMIC<br/>✅ Implemented]
    VSD[ViewStatusDialog<br/>🟢 ATOMIC<br/>✅ Implemented]
    
    %% MISSING CANONICALS (Red dashed boxes)
    RDP[Report Detail Page<br/>🔴 MISSING<br/>Needed by: 3 actions]
    MT[Moderation Thread<br/>🔴 MISSING<br/>Needed by: 2 actions]
    CAS[CampaignApprovalSheet<br/>🔴 MISSING<br/>Needed by: 2 actions]
    EAS[EventApprovalSheet<br/>🔴 MISSING<br/>Needed by: 2 actions]
    RCS[RoleChangeSheet<br/>🔴 MISSING<br/>Needed by: 1 action]
    
    %% NAVIGATION TARGETS (Yellow boxes)
    LDV[Listing Detail View<br/>🟣 NAVIGATION<br/>✅ Exists]
    CHV[Chat View<br/>🟣 NAVIGATION<br/>✅ Exists]
    
    %% ============================================
    %% ACTION CENTER DELEGATIONS
    %% ============================================
    
    %% Personal Tab
    AC -->|Reply to Message| RS
    AC -->|Reply to Question| RS
    AC -->|Accept Trade Offer| CAD
    AC -->|Decline Trade Offer| CAD
    AC -->|Counter Trade Offer| COS
    AC -->|Continue Draft| EF
    AC -->|Renew Listing| CAD
    AC -->|Resume Listing| CAD
    AC -->|Delete Listing| CAD
    AC -->|Edit & Resubmit| EF
    AC -->|View Rejection Details| RRD
    AC -->|View Pending Status| VSD
    
    %% Groups Tab
    AC -->|Approve Join Request| CAD
    AC -->|Reject Join Request| CAD
    AC -->|Review Report| RDP
    AC -->|Take Action on Report| CAD
    AC -->|Dismiss Report| CAD
    
    %% Campaigns Tab
    AC -->|Approve Campaign Request| CAS
    AC -->|Reject Campaign Request| CAS
    
    %% Events Tab
    AC -->|Approve Event Request| EAS
    AC -->|Reject Event Request| EAS
    
    %% Admin Tab
    AC -->|Review Platform Report| RDP
    AC -->|Resolve Platform Report| CAD
    AC -->|Dismiss Platform Report| CAD
    AC -->|Review Flagged Listing| LDV
    AC -->|Approve Flagged Listing| CAD
    AC -->|Remove Flagged Listing| CAD
    
    %% ============================================
    %% MY LISTINGS DELEGATIONS
    %% ============================================
    
    ML -->|Create Listing| PF
    ML -->|Edit Listing| EF
    ML -->|Preview Listing| LDV
    ML -->|Pause Listing| PLS
    ML -->|Resume Listing| CAD
    ML -->|Delete Listing| CAD
    ML -->|Duplicate Listing| PF
    ML -->|Mark as Sold| MAS
    ML -->|Share Listing| STG
    ML -->|View Stats| LSM
    ML -->|Renew Listing| CAD
    ML -->|Bulk Pause| CAD
    ML -->|Bulk Archive| CAD
    ML -->|Bulk Delete| CAD
    
    %% ============================================
    %% LISTING DETAIL DELEGATIONS
    %% ============================================
    
    %% Owner actions
    LD -->|Edit Listing| EF
    LD -->|Pause Listing| PLS
    LD -->|Mark as Sold| MAS
    LD -->|View Stats| LSM
    LD -->|Duplicate Listing| PF
    LD -->|Delete Listing| CAD
    LD -->|Manage Offers| MO
    
    %% Visitor actions
    LD -->|Message Seller| CHV
    LD -->|Make Offer| MOS
    LD -->|Ask Question| AQS
    LD -->|Save Listing| LD
    LD -->|Share Listing| STG
    LD -->|Report Listing| RDP
    
    %% Q&A
    LD -->|Reply to Question| RS
    
    %% Trade Offers
    LD -->|Accept Trade Offer| CAD
    LD -->|Decline Trade Offer| CAD
    LD -->|Counter Trade Offer| COS
    
    %% ============================================
    %% GROUP DETAIL DELEGATIONS
    %% ============================================
    
    GD -->|Join Group| GJF
    GD -->|Leave Group| CAD
    GD -->|Invite Members| GJF
    GD -->|Remove Member| CAD
    GD -->|Change Member Role| RCS
    GD -->|Hide Listing| CAD
    GD -->|Remove Listing| CAD
    GD -->|Report Group| RDP
    GD -->|Message Member| MT
    
    %% ============================================
    %% CHAT DELEGATIONS
    %% ============================================
    
    CH -->|Make Offer| MOS
    CH -->|Send Message| CH
    
    %% ============================================
    %% CAMPAIGNS HUB DELEGATIONS
    %% ============================================
    
    CM -->|Create Campaign| CM
    CM -->|Edit Campaign| CM
    CM -->|Delete Campaign| CAD
    CM -->|View Campaign Listings| LDV
    
    %% ============================================
    %% EVENTS HUB DELEGATIONS
    %% ============================================
    
    EV -->|Create Event| EV
    EV -->|Edit Event| EV
    EV -->|Delete Event| CAD
    EV -->|View Event Listings| LDV
    
    %% STYLING
    classDef entryPoint fill:#E3F2FD,stroke:#1976D2,stroke-width:2px
    classDef canonicalFlow fill:#E8F5E9,stroke:#388E3C,stroke-width:3px
    classDef canonicalAtomic fill:#F1F8E9,stroke:#689F38,stroke-width:2px
    classDef missing fill:#FFEBEE,stroke:#D32F2F,stroke-width:2px,stroke-dasharray: 5 5
    classDef navigation fill:#FFF9C4,stroke:#F57C00,stroke-width:2px
    
    class AC,ML,LD,GD,CH,PR,CM,EV,AD entryPoint
    class PF,EF canonicalFlow
    class CAD,RS,MO,COS,MOS,AQS,MAS,PLS,STG,GJF,LSM,RRD,VSD canonicalAtomic
    class RDP,MT,CAS,EAS,RCS missing
    class LDV,CHV navigation
```

---

## 📊 ACTION DISTRIBUTION BY CANONICAL EXECUTOR

### ConfirmActionDialog (20+ actions)
**Most reused canonical executor**

| Entry Point | Actions Delegated |
|-------------|-------------------|
| Action Center | 11 (approve/reject joins, renew, delete, reports, admin) |
| My Listings | 6 (resume, delete, renew, bulk pause/archive/delete) |
| Listing Detail | 5 (delete, accept/decline trade, pause) |
| Groups | 4 (leave, remove member, hide/remove listing) |
| Campaigns | 1 (delete campaign) |
| Events | 1 (delete event) |

**Implementation**: ✅ Fully functional  
**Pattern**: Destructive/confirmation actions

---

### ReplySheet (2 contexts)
**Shared canonical for communication**

| Entry Point | Actions Delegated |
|-------------|-------------------|
| Action Center | Reply to Message, Reply to Question |
| Listing Detail | Reply to Question |

**Implementation**: ✅ Fully functional  
**Pattern**: Single sheet serves Questions AND Messages

---

### Publish Flow v1.1 (3 entry actions)
**Core flow for listing creation/editing**

| Entry Point | Actions Delegated |
|-------------|-------------------|
| My Listings | Create Listing, Duplicate Listing |
| Listing Detail | Duplicate Listing |
| Action Center | Continue Draft (via Edit Flow) |

**Implementation**: ✅ Fully functional  
**Pattern**: Complete multi-step flow with AI assistance

---

### Edit Listing Flow (4 entry points)
**Reuses Publish Flow**

| Entry Point | Actions Delegated |
|-------------|-------------------|
| Action Center | Continue Draft, Edit & Resubmit |
| My Listings | Edit Listing |
| Listing Detail | Edit Listing |

**Implementation**: ✅ Fully functional  
**Pattern**: Reuses Publish Flow with initialData

---

### Trade Offer Sheets (3 sheets)

| Sheet | Entry Points | Status |
|-------|--------------|--------|
| MakeOfferSheet | Listing Detail, Chat | ✅ Implemented |
| CounterOfferSheet | Action Center, Listing Detail | ✅ Implemented |
| ManageOffersSheet | Listing Detail (owner) | ✅ Implemented |

---

### Listing Management Sheets (4 sheets)

| Sheet | Entry Points | Status |
|-------|--------------|--------|
| MarkAsSoldSheet | My Listings, Listing Detail | ✅ Implemented |
| PauseListingSheet | My Listings, Listing Detail | ✅ Implemented |
| ListingStatsModal | My Listings, Listing Detail | ✅ Implemented |
| ShareToGroupSheet | My Listings, Listing Detail | ✅ Implemented |

---

### Status/Review Dialogs (2 dialogs)

| Dialog | Entry Points | Status |
|--------|--------------|--------|
| RejectionReasonsDialog | Action Center | ✅ Implemented |
| ViewStatusDialog | Action Center | ✅ Implemented |

---

### Group Actions (2 sheets)

| Sheet | Entry Points | Status |
|--------|--------------|--------|
| GroupJoinFlow | Group Detail | 🟡 Partial |
| AskQuestionSheet | Listing Detail (NO BUTTON) | 🟡 Sheet exists, no entry |

---

### 🔴 MISSING CANONICALS (5 places)

| Canonical | Needed By | Entry Points Affected | Priority |
|-----------|-----------|----------------------|----------|
| **Report Detail Page** | 3 actions | AC Groups, AC Admin, Listing Detail | P0 |
| **Moderation Thread** | 2 actions | AC Groups, Group Detail | P1 |
| **CampaignApprovalSheet** | 2 actions | AC Campaigns | P1 |
| **EventApprovalSheet** | 2 actions | AC Events | P1 |
| **RoleChangeSheet** | 1 action | Group Detail | P2 |

**Impact**: 10 actions currently show toast/console.log instead of executing

---

## 🎯 ACTION TYPES BREAKDOWN

### 🔵 Core Flows (2 flows, 7 entry points)
- **Publish Flow**: Create, Duplicate → 4 entry points
- **Edit Flow**: Edit, Continue Draft, Edit & Resubmit → 3 entry points

**Characteristic**: Multi-step, complex state, AI-assisted

---

### 🟢 Atomic Executors (13 sheets/dialogs, 50+ actions)
- **ConfirmActionDialog**: 20+ destructive/confirmation actions
- **ReplySheet**: 2 communication contexts
- **Trade Sheets**: 3 sheets, 6 actions
- **Listing Sheets**: 4 sheets, 8 actions
- **Status Dialogs**: 2 dialogs, 2 actions
- **Group Sheets**: 2 sheets, 2 actions

**Characteristic**: Single purpose, clear scope, reusable

---

### 🟡 Inline Actions (5 actions)
- Save Listing (toggle heart)
- Follow Seller (toggle)
- Pin Group (toggle)
- Mute Group (toggle)
- Send Message (inline in chat)

**Characteristic**: Immediate, no confirmation needed

---

### 🟣 Navigation Actions (15 actions)
- Preview Listing → Listing Detail
- Open Chat → Chat View
- View Reports → Admin Dashboard
- Navigate to Profile/Settings/etc.

**Characteristic**: Routing, no execution in origin

---

## 📈 IMPLEMENTATION STATUS

### By Action Count (122 total)

| Status | Count | % | Examples |
|--------|-------|---|----------|
| ✅ Fully Implemented | 28 | 23% | Edit, Delete, Pause, Make Offer |
| 🟡 Partially Implemented | 42 | 34% | Ask Question (no button), Bulk Actions (toast-only) |
| 🔴 Not Implemented | 52 | 43% | Archive, Boost, Admin actions, Org features |

### By Canonical Executor (18 places)

| Status | Count | % | Examples |
|--------|-------|---|----------|
| ✅ Implemented | 13 | 72% | ConfirmActionDialog, ReplySheet, Publish Flow |
| 🔴 Missing | 5 | 28% | Report Detail, Moderation Thread, Approval Sheets |

---

## 🎭 ENTRY POINT ANALYSIS

### Action Center (Highest Delegation)
**23 actions delegated**

| Tab | Actions | Canonicals Used |
|-----|---------|-----------------|
| Personal | 11 | CAD (6), RS (2), COS (1), EF (2) |
| Groups | 5 | CAD (4), RDP (1 missing) |
| Campaigns | 2 | CAS (2 missing) |
| Events | 2 | EAS (2 missing) |
| Admin | 6 | CAD (3), RDP (1 missing), LDV (1) |

**Pattern**: Pure entry point, delegates 100% (fixed)

---

### My Listings (Second Highest)
**13 actions delegated**

| Category | Actions | Canonicals Used |
|----------|---------|-----------------|
| Create/Edit | 3 | PF (2), EF (1) |
| Lifecycle | 4 | PLS (1), CAD (3) |
| Ownership | 3 | MAS (1), LSM (1), STG (1) |
| Bulk | 3 | CAD (3 - toast-only) |

**Pattern**: Mix of flows, sheets, dialogs

---

### Listing Detail (Dual Mode)
**16 actions total**

**Owner Mode (9 actions)**:
- Edit, Pause, Mark as Sold, View Stats, Duplicate, Delete, Manage Offers, Reply to Question

**Visitor Mode (7 actions)**:
- Message Seller, Make Offer, Ask Question, Save, Share, Report
- Accept/Decline/Counter Trade (if received offer)

**Pattern**: Context-aware, most complete action set

---

### Group Detail (Admin-Heavy)
**10 actions total**

**Member Actions**: Join, Leave, Report
**Admin Actions**: Invite, Remove Member, Change Role, Hide/Remove Listing
**Moderation**: Message Member (missing MT)

**Pattern**: Role-gated, moderation-focused

---

### Campaigns/Events Hub (Simple)
**3 actions each**

- Create, Edit, Delete
- View Listings (navigation)

**Pattern**: CRUD + filtered navigation

---

## 🔑 GLOBAL MODAL CANDIDATES

### ✅ Tier 1: Already Multi-Entry (15 actions)
**Perfect for global invocation**

| Action | Entry Points | Canonical |
|--------|--------------|-----------|
| edit_listing | 3 (AC, ML, LD) | Edit Flow |
| delete_listing | 3 (AC, ML, LD) | CAD |
| pause_listing | 3 (AC, ML, LD) | PauseListingSheet |
| reply_to_question | 2 (AC, LD) | ReplySheet |
| reply_to_message | 2 (AC, LD) | ReplySheet |
| counter_trade_offer | 2 (AC, LD) | CounterOfferSheet |
| duplicate_listing | 2 (ML, LD) | Publish Flow |
| mark_as_sold | 2 (ML, LD) | MarkAsSoldSheet |
| view_stats | 2 (ML, LD) | ListingStatsModal |
| share_listing | 2 (ML, LD) | ShareToGroupSheet |
| renew_listing | 2 (AC, ML) | CAD |
| resume_listing | 2 (AC, ML) | CAD |
| make_trade_offer | 2 (LD, CH) | MakeOfferSheet |
| approve_join_request | 2 (AC, GD) | CAD |
| reject_join_request | 2 (AC, GD) | CAD |

---

### ✅ Tier 2: High Reuse Potential (25 actions)
**Single entry today, common actions**

All bulk actions, all trade offer actions, all group management, all admin review actions

---

### ❌ Not Suitable for Global Modal (55 actions)
**Should stay context-specific**

- Primary CTAs: Create Listing, Join Group (17 actions)
- Navigation: All navigate_to_* (21 actions)
- UI Utilities: Search, Filter, Sort (12 actions)
- Inline Toggles: Save, Pin, Mute (5 actions)

---

## 🏗️ ARCHITECTURAL PATTERNS

### Pattern 1: One Canonical, Multiple Entries
**Example: ConfirmActionDialog**

```
Entry Point A ──┐
Entry Point B ──┼──→ ConfirmActionDialog ──→ Executes
Entry Point C ──┘
```

**Used by**: 20+ destructive actions  
**Benefit**: Consistent UX, single source of truth

---

### Pattern 2: Shared Canonical, Different Contexts
**Example: ReplySheet**

```
Reply to Question (AC) ──┐
Reply to Question (LD) ──┼──→ ReplySheet ──→ Executes
Reply to Message (AC)  ──┘
```

**Used by**: Questions + Messages  
**Benefit**: Code reuse, consistent reply UX

---

### Pattern 3: Flow Reuse
**Example: Publish Flow**

```
Create Listing ──┐
Duplicate Listing ├──→ Publish Flow (mode: create)
Continue Draft  ──┘

Edit Listing ────────→ Publish Flow (mode: edit, initialData)
```

**Used by**: All listing creation/editing  
**Benefit**: Single source of truth for complex flow

---

### Pattern 4: Navigation Delegation
**Example: Review Report**

```
Action Center ──→ Navigate to Report Detail Page ──→ Page handles review
```

**Used by**: Review actions, preview actions  
**Benefit**: Deep linking, dedicated UX

---

## 🚨 CRITICAL FINDINGS

### Finding 1: ConfirmActionDialog is Overloaded
**Impact**: 20+ actions use same dialog  
**Risk**: Low - dialog is flexible and works well  
**Recommendation**: Monitor for future specialization needs

---

### Finding 2: 5 Missing Canonicals Block 10 Actions
**Impact**: 10 actions show toast/console.log instead of executing  
**Priority**: P0 - Report Detail, P1 - Moderation Thread + Approval Sheets  
**Effort**: 2-3 weeks to implement all 5

---

### Finding 3: ReplySheet Pattern Works Well
**Impact**: Successfully serves 2 contexts (Questions + Messages)  
**Learning**: Shared canonicals scale when context is similar  
**Recommendation**: Apply pattern to other communication actions

---

### Finding 4: Publish Flow Reuse is Clean
**Impact**: Create, Edit, Duplicate all use same flow  
**Learning**: Complex flows should be mode-aware, not duplicated  
**Recommendation**: Apply pattern to other core flows

---

### Finding 5: 15 Actions Already Multi-Entry
**Impact**: Proven pattern for global modal  
**Learning**: Multi-entry works when canonical is clear  
**Recommendation**: These 15 are perfect MVP for global modal

---

## 📋 QUICK REFERENCE

### For Developers: "Where does X execute?"

| Action | Canonical Executor |
|--------|--------------------|
| Edit Listing | Edit Flow (reuses Publish Flow) |
| Delete Listing | ConfirmActionDialog |
| Pause Listing | PauseListingSheet |
| Reply to Question | ReplySheet |
| Make Offer | MakeOfferSheet |
| Accept Offer | ConfirmActionDialog |
| Counter Offer | CounterOfferSheet |
| Manage Offers | ManageOffersSheet |
| Mark as Sold | MarkAsSoldSheet |
| View Stats | ListingStatsModal |
| Approve Join Request | ConfirmActionDialog |
| Review Report | Report Detail Page (MISSING) |
| Message Member (mod) | Moderation Thread (MISSING) |

---

### For Product: "What's missing?"

| Missing Canonical | Blocks Actions | Priority |
|-------------------|----------------|----------|
| Report Detail Page | 3 (review report x2, review flagged) | P0 |
| Moderation Thread | 2 (message member, message owner) | P1 |
| CampaignApprovalSheet | 2 (approve/reject campaign) | P1 |
| EventApprovalSheet | 2 (approve/reject event) | P1 |
| RoleChangeSheet | 1 (change member role) | P2 |

**Total**: 5 missing places blocking 10 actions

---

### For Architects: "What's the delegation pattern?"

**Rule**: Entry Point discovers intent → Canonical Executor executes

**Entry Point**:
- Shows context (card, list item, button)
- Captures user intent (click)
- Delegates to canonical (opens dialog/navigates)
- ❌ Does NOT execute business logic

**Canonical Executor**:
- Receives delegation
- Shows full context and consequences
- Gets user confirmation (if needed)
- ✅ Executes business logic
- Provides feedback (toast, navigation)

**Violation Examples (FIXED)**:
- ❌ Action Center executing inline (FIXED: now delegates)
- ❌ My Listings ⋮ showing toast-only (SOME FIXED, bulk actions pending)
- ❌ Buttons with console.log (FIXED in AC, pending elsewhere)

---

## 🎯 READINESS FOR GLOBAL MODAL

### ✅ Ready Now (15 actions)
All Tier 1 multi-entry actions with proven canonicals

### 🟡 Ready After Fixes (25 actions)
Tier 2 actions - need missing canonicals implemented

### ❌ Not Suitable (55 actions)
Navigation, CTAs, UI utilities - should stay local

### 🚀 Recommended Rollout

**Phase 1**: Implement 5 missing canonicals (2-3 weeks)  
**Phase 2**: Build Global Modal with Tier 1 (15 actions) (2 weeks)  
**Phase 3**: Add Tier 2 (25 actions) (3 weeks)  
**Phase 4**: Monitor and optimize (ongoing)

---

**End of Action System Map**

This map represents the complete action architecture of ListlyUp as of 2026-01-12.  
Use this as source of truth for understanding action delegation, planning global modal, and identifying missing canonicals.

