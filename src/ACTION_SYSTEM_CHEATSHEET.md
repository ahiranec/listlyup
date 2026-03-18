# ACTION SYSTEM CHEATSHEET
## 5-Minute Developer Onboarding

---

## 🎯 THE CORE RULE

```
┌─────────────────┐      ┌──────────────────────┐      ┌─────────┐
│  ENTRY POINT    │─────▶│  CANONICAL EXECUTOR  │─────▶│ RESULT  │
│ (Discovers)     │      │  (Executes)          │      │         │
└─────────────────┘      └──────────────────────┘      └─────────┘

Entry Point:  "I want to delete this"
Canonical:    "Are you sure? [Delete]"
Result:       "Deleted ✓"
```

**❌ VIOLATION**: Entry Point executes directly  
**✅ CORRECT**: Entry Point delegates to Canonical

---

## 📍 ENTRY POINTS (Where actions start)

| Entry Point | Action Count | Main Purpose |
|-------------|--------------|--------------|
| **Action Center** | 23 | Aggregate pending actions |
| **My Listings** | 13 | Manage your listings |
| **Listing Detail** | 16 | Owner: manage, Visitor: interact |
| **Group Detail** | 10 | Group admin + moderation |
| **Campaigns Hub** | 3 | Campaign CRUD |
| **Events Hub** | 3 | Event CRUD |
| **Chat** | 2 | Trade offers in context |

**Total**: 70+ unique actions across 7 main entry points

---

## 🎯 CANONICAL EXECUTORS (Where actions execute)

### The Big 3 (Handle 50+ actions)

#### 1. **ConfirmActionDialog** (20+ actions)
**Pattern**: Destructive/confirmation actions

```tsx
// Entry point delegates:
onClick={() => {
  setConfirmDialogData({
    variant: 'destructive',
    title: 'Delete Listing?',
    onConfirm: () => {
      // THIS executes, not the entry point
      deleteListingAPI();
      toast.success('Deleted');
    }
  });
  setConfirmDialogOpen(true);
}}
```

**Used by**: Delete, Pause, Resume, Approve, Reject, etc.

---

#### 2. **Publish Flow v1.1** (7 entry actions)
**Pattern**: Multi-step creation/editing

```tsx
// Entry point delegates:
onCreateListing={() => {
  navigateToPublishFlow({ mode: 'create' });
}}

onEditListing={(id) => {
  navigateToPublishFlow({ 
    mode: 'edit', 
    initialData: listingData 
  });
}}
```

**Used by**: Create, Edit, Continue Draft, Duplicate, Edit & Resubmit

---

#### 3. **ReplySheet** (Shared canonical)
**Pattern**: Single sheet, multiple contexts

```tsx
// Questions use it:
onReplyToQuestion={(questionId) => {
  setReplySheetOpen(true);
  setReplyContext({ type: 'question', id: questionId });
}}

// Messages use it too:
onReplyToMessage={(messageId) => {
  setReplySheetOpen(true);
  setReplyContext({ type: 'message', id: messageId });
}}
```

**Used by**: Reply to Question, Reply to Message

---

### Specialized Sheets (8 sheets)

| Sheet | Purpose | Entry Points |
|-------|---------|--------------|
| **MakeOfferSheet** | Create trade offer | Listing Detail, Chat |
| **CounterOfferSheet** | Counter existing offer | AC, Listing Detail |
| **ManageOffersSheet** | Review all offers | Listing Detail (owner) |
| **MarkAsSoldSheet** | Close listing as sold | My Listings, Listing Detail |
| **PauseListingSheet** | Pause listing with reason | My Listings, Listing Detail |
| **ListingStatsModal** | View listing analytics | My Listings, Listing Detail |
| **ShareToGroupSheet** | Share to groups | My Listings, Listing Detail |
| **GroupJoinFlow** | Join group process | Group Detail |

---

### Status/Review Dialogs (2 dialogs)

| Dialog | Purpose | Entry Point |
|--------|---------|-------------|
| **RejectionReasonsDialog** | Show why listing rejected | Action Center |
| **ViewStatusDialog** | Show approval status | Action Center |

---

### 🔴 Missing Canonicals (Block 10 actions)

| Missing | Needed By | Workaround Today |
|---------|-----------|------------------|
| **Report Detail Page** | Review Report (x3) | toast.info() |
| **Moderation Thread** | Message Member (x2) | No workaround |
| **CampaignApprovalSheet** | Approve/Reject Campaign (x2) | No workaround |
| **EventApprovalSheet** | Approve/Reject Event (x2) | No workaround |
| **RoleChangeSheet** | Change Member Role | toast.info() |

**Priority**: P0 - Report Detail, P1 - Others

---

## 🔀 COMMON PATTERNS

### Pattern A: Direct Delegation
**When**: Single canonical, clear purpose

```tsx
// Entry Point (My Listings)
<Button onClick={() => setMarkAsSoldSheetOpen(true)}>
  Mark as Sold
</Button>

// Canonical (MarkAsSoldSheet)
<MarkAsSoldSheet 
  open={isOpen}
  onConfirm={(buyer, price) => {
    markAsSoldAPI(listing.id, buyer, price);
    toast.success('Marked as sold');
  }}
/>
```

---

### Pattern B: Navigation Delegation
**When**: Action needs dedicated page

```tsx
// Entry Point (Action Center)
onClick={() => {
  navigateToReportDetail(reportId);
}}

// Canonical (Report Detail Page)
// Full page handles review, approve, dismiss, etc.
```

---

### Pattern C: Shared Canonical
**When**: Multiple contexts, same execution

```tsx
// Entry Point A: Question reply
onReply={(qId) => openReplySheet('question', qId)}

// Entry Point B: Message reply
onReply={(mId) => openReplySheet('message', mId)}

// Single Canonical: ReplySheet
<ReplySheet 
  type={context.type}  // 'question' | 'message'
  onSubmit={(text) => {
    if (type === 'question') answerQuestion(text);
    if (type === 'message') sendMessage(text);
  }}
/>
```

---

### Pattern D: Flow Reuse
**When**: Complex multi-step process

```tsx
// Create uses Publish Flow
navigateToPublishFlow({ mode: 'create' })

// Edit uses SAME flow
navigateToPublishFlow({ 
  mode: 'edit', 
  initialData: existingListing 
})

// Duplicate uses SAME flow
navigateToPublishFlow({ 
  mode: 'create', 
  initialData: clonedListing 
})
```

**Benefit**: One flow, multiple entry actions

---

## 🚫 ANTI-PATTERNS (Don't Do This)

### ❌ Anti-Pattern 1: Inline Execution
```tsx
// WRONG - Entry point executes
onClick={() => {
  deleteListingAPI(id);
  toast.success('Deleted');
}}
```

**Why wrong**: No confirmation, no canonical, breaks UX contract

---

### ❌ Anti-Pattern 2: Toast-Only Button
```tsx
// WRONG - Button does nothing
onClick={() => {
  toast.info('Feature coming soon...');
}}
```

**Why wrong**: "Botón mentiroso" - lying to user

---

### ❌ Anti-Pattern 3: Console.log Handler
```tsx
// WRONG - Button pretends to work
onClick={() => {
  console.log('Deleting listing...');
}}
```

**Why wrong**: Worse than toast-only, completely broken

---

### ❌ Anti-Pattern 4: Duplicated Canonicals
```tsx
// WRONG - Same dialog in multiple files
// File A:
<DeleteListingDialog />

// File B:
<DeleteListingDialog2 />  // Copy-pasted
```

**Why wrong**: Maintenance nightmare, inconsistent UX

---

## ✅ CORRECT PATTERNS

### ✅ Pattern 1: Delegate to Dialog
```tsx
onClick={() => {
  setConfirmDialogData({ /* ... */ });
  setConfirmDialogOpen(true);
}}
```

---

### ✅ Pattern 2: Delegate to Sheet
```tsx
onClick={() => {
  setSelectedListing(listing);
  setMarkAsSoldSheetOpen(true);
}}
```

---

### ✅ Pattern 3: Delegate to Navigation
```tsx
onClick={() => {
  navigateToListingDetail(listingId);
}}
```

---

### ✅ Pattern 4: Delegate to Flow
```tsx
onClick={() => {
  navigateToPublishFlow({ 
    mode: 'edit', 
    initialData 
  });
}}
```

---

## 🔍 HOW TO ADD A NEW ACTION

### Step 1: Identify Entry Point
**Where** does the user discover this action?
- Action Center tab?
- My Listings menu?
- Listing Detail button?
- Other?

### Step 2: Choose Canonical Executor

**Ask**:
- Is it destructive? → **ConfirmActionDialog**
- Is it creating/editing listing? → **Publish Flow**
- Is it replying to something? → **ReplySheet** (or similar)
- Is it complex/multi-step? → **New Flow** (rare)
- Is it simple/single-step? → **New Sheet**

**Reuse existing canonicals when possible!**

### Step 3: Implement Delegation

```tsx
// In Entry Point component:
const handleNewAction = () => {
  // Option A: Open existing canonical
  setCanonicalSheetOpen(true);
  
  // Option B: Navigate to canonical page
  navigateToCanonicalPage(id);
  
  // ❌ NOT Option C: Execute inline
  // executeBusinessLogic(); // WRONG!
};
```

### Step 4: Implement Canonical

```tsx
// In Canonical Executor (dialog/sheet/page):
const handleExecute = () => {
  // ✅ THIS is where execution happens
  executeBusinessLogic();
  toast.success('Action completed');
  onClose();
};
```

### Step 5: Document

Add to ACTION_DEFINITION_MATRIX.md:
- Action key
- Entry point(s)
- Canonical executor
- Implementation status

---

## 📊 QUICK STATS

### Actions by Status
- ✅ Implemented: 28 (23%)
- 🟡 Partial: 42 (34%)
- 🔴 Missing: 52 (43%)

### Canonicals by Status
- ✅ Implemented: 13 (72%)
- 🔴 Missing: 5 (28%)

### Multi-Entry Actions
- 15 actions have 2+ entry points
- Perfect candidates for Global Modal

---

## 🎓 KEY LEARNINGS

### 1. ConfirmActionDialog is Your Friend
**Use it for**: Any destructive/confirmation action  
**Benefit**: Consistent UX, no need for custom dialogs

### 2. Reuse Flows When Possible
**Example**: Publish Flow serves Create, Edit, Duplicate  
**Benefit**: Single source of truth, easier maintenance

### 3. Shared Canonicals Scale
**Example**: ReplySheet serves Questions + Messages  
**Benefit**: Code reuse, consistent UX across contexts

### 4. Entry Points Never Execute
**Rule**: Entry points discover, canonicals execute  
**Benefit**: Clear separation, easier testing, better UX

### 5. Missing Canonicals = Broken UX
**Impact**: 5 missing canonicals block 10 actions  
**Solution**: Prioritize creating missing canonicals

---

## 🚀 GLOBAL MODAL CANDIDATES

### Tier 1: Ready Now (15 actions)
Already multi-entry, proven canonicals:
- edit_listing
- delete_listing
- pause_listing
- reply_to_question
- counter_trade_offer
- mark_as_sold
- view_stats
- ... (8 more)

### Tier 2: Ready After Fixes (25 actions)
Need missing canonicals first:
- review_report (needs Report Detail)
- approve_campaign_request (needs CampaignApprovalSheet)
- ... (23 more)

### Not Suitable (55 actions)
Navigation, CTAs, UI utilities - stay local

---

## 🔗 RELATED DOCS

- **ACTION_DEFINITION_MATRIX.md** - Complete action inventory (122 actions)
- **ACTION_SYSTEM_MAP.md** - Visual architecture diagram
- **ACTION_CENTER_FIX_REPORT.md** - Recent fixes applied
- **ACTION_AUDIT_SUMMARY.md** - Executive summary

---

**You're now ready to work with the ListlyUp action system!**

Remember the golden rule:  
**Entry Points DISCOVER → Canonical Executors EXECUTE**

