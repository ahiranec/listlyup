# P2 CANONICAL SYSTEM INDEX v2.1 (TRUTHFUL)
**ListlyUp — Global View System Governance**  
**Date:** 2026-01-16  
**Phase:** P2 — Governance Documentation + AS-IS Labeling  
**Status:** GUIDE (Documentation only, no new code)

---

## ⚠️ CLASSIFICATION SYSTEM

All artifacts in this P2 system are labeled with one of these tags:

### 🔵 FROZEN_ASIS
**Exact 1:1 mirror of existing component in codebase**
- No new props added
- No new UI states
- No new validation logic
- Verified by reading actual source code
- Safe to reference as "canonical AS-IS"

### 📘 GUIDE
**Governance documentation**
- Decision trees
- Migration plans
- Cleanup tracking
- Not executable code, just guidance

### 🟡 PROPOSED
**Contains capabilities NOT verified in audit**
- New features designed but not implemented
- Spec for future work
- NOT safe to assume exists in prototype
- Requires implementation work

---

## 📦 DELIVERABLES STATUS

### 📘 GUIDE Documents (5 files) — VALID

1. **CANONICAL_DECISION_TREE_v2.0.md** ✅ GUIDE
   - Governance rules for UI patterns
   - When to use Dialog vs Sheet vs Modal
   - Decision flowchart
   - Anti-patterns
   - **Status:** Valid guidance based on observed patterns

2. **REPOINT_PLAN_v2.0.md** ✅ GUIDE
   - Migration roadmap from duplicates to canonical
   - P0/P1/P2/P3 priorities
   - Entry point mapping
   - **Status:** Valid plan based on audit findings

3. **CLEANUP_TAGS_v2.0.md** ✅ GUIDE
   - Issue tracker for deprecated/orphaned components
   - Deprecation tracking
   - **Status:** Valid tracking based on audit

4. **CANONICAL_VISUAL_REFERENCE_v2.0.md** ✅ GUIDE
   - Layout specifications for observed patterns
   - Mobile + Desktop layouts
   - Visual tokens
   - **Status:** Valid reference based on AS-IS components

5. **CANONICAL_QUICK_REFERENCE.md** ✅ GUIDE
   - Developer cheat sheet
   - Quick decision helper
   - Import paths
   - **Status:** Valid quick reference

---

### 🔵 FROZEN_ASIS Components (3 verified)

#### 1. **ConfirmActionDialog** — FROZEN_ASIS ✅
**Location:** `/components/action-center/ConfirmActionDialog.tsx`  
**Verified:** Yes (read actual source code)  
**Props verified AS-IS:**
- variant: 'destructive' | 'success' | 'warning' | 'info'
- icon: 'check' | 'x' | 'alert' | 'info' | 'trash'
- title, description
- details?: Array<{label, value, highlight?}>
- consequences?: {title, items: string[]}
- confirmLabel, cancelLabel
- onConfirm: () => void
- Supports both data object API and individual props API

**Visual verified AS-IS:**
- Colored header (variant-specific: red-50/green-50/amber-50/blue-50)
- Icon badge (w-12 h-12, circular)
- Details box (bg-muted/50, border-border)
- Consequences box (variant-colored alert)
- Actions row (Cancel left, Confirm right, gap-3)
- Border: rounded-2xl
- No X button
- Custom implementation (not Radix)

**Use as canonical for:** Rich confirmation dialogs with details/consequences

---

#### 2. **ViewStatusDialog** — FROZEN_ASIS ✅
**Location:** `/components/action-center/ViewStatusDialog.tsx`  
**Verified:** Yes (read in audit)  
**Props verified AS-IS:**
- listing: {title, groupName, submittedTime, estimatedReview?}
- onContactMods?: () => void
- onCancel?: () => void

**Visual verified AS-IS:**
- Blue header (bg-blue-50)
- Clock icon
- Details box (listing info)
- Info boxes (why pending, what's next)
- Actions: Contact Mods (optional), Cancel, Got It
- Border: rounded-2xl
- Custom implementation

**Use as canonical for:** Pending status display (post-action informational)

---

#### 3. **MakeOfferSheet** — FROZEN_ASIS ✅
**Location:** `/components/sheets/MakeOfferSheet.tsx`  
**Verified:** Yes (read actual source code)  
**Props verified AS-IS:**
- productTitle, productPrice, productImage
- sellerId, sellerName
- onOfferSubmitted?: (offerId: string) => void

**Features verified AS-IS:**
- Product preview card
- Suggested range calculation (70-90% of price)
- Quick preset buttons (-20%, -15%, -10%)
- Offer amount input with icon
- Validation messages (too high, too low, good range)
- Optional message textarea (300 char limit)
- Info box ("How it works")
- Sticky header + sticky footer
- ScrollArea for body
- Radix Sheet (side="bottom", h-[90vh])

**Use as canonical for:** OFFER family form pattern (complex mobile-first sheet)

---

### ❌ DELETED — Not AS-IS

The following files were created in initial implementation but contained features beyond AS-IS:

1. **ConfirmRichCanonical.tsx** — DELETED
   - Reason: Was a copy with example data, not adding value beyond existing ConfirmActionDialog
   
2. **StatusInfoCanonical.tsx** — DELETED
   - Reason: Invented new variant system (pending/rejected/approved) not verified in actual components
   
3. **SheetFormCanonical.tsx** — DELETED
   - Reason: Created generic form system with field types not observed in any single sheet

**Correct approach:** Reference the actual AS-IS components directly:
- For confirm dialogs → Use `/components/action-center/ConfirmActionDialog.tsx`
- For status dialogs → Use `/components/action-center/ViewStatusDialog.tsx` or `RejectionReasonsDialog.tsx`
- For form sheets → Use family-specific sheets (MakeOfferSheet, ReportSheet, etc.)

---

## 🎯 CANONICAL COVERAGE BY FAMILY (TRUTHFUL)

| Family | AS-IS Canonical Component | Status | Notes |
|--------|--------------------------|--------|-------|
| **CONFIRM** | ConfirmActionDialog | 🔵 FROZEN_ASIS | 4 variants, details, consequences. USE THIS. |
| **CONFIRM (simple)** | LeaveGroupDialog (Radix) | 🔵 OBSERVED | Simple 2-button, no details. Pattern exists. |
| **STATUS (pending)** | ViewStatusDialog | 🔵 FROZEN_ASIS | Pending state display. USE THIS. |
| **STATUS (rejected)** | RejectionReasonsDialog | 🔵 OBSERVED | Rejection reasons. Pattern exists. |
| **STATUS (success)** | DealConfirmedDialog | 🔵 OBSERVED | Success celebration. Pattern exists. |
| **OFFER** | MakeOfferSheet | 🔵 FROZEN_ASIS | Complex offer form. USE THIS. |
| **OFFER** | CounterOfferSheet | 🔵 OBSERVED | Counter-offer. Pattern exists. |
| **OFFER** | ManageOffersSheet | 🔵 OBSERVED | Manage offers. Pattern exists. |
| **REPORT** | ReportSheet | 🔵 OBSERVED | Report with checkboxes. Pattern exists. |
| **REPORT** | ReportGroupSheet | 🔵 OBSERVED | Report group. Pattern exists. |
| **REPLY_QA** | AskQuestionSheet | 🔵 OBSERVED | Ask question. Pattern exists. |
| **REPLY_QA** | ReplySheet | 🔵 OBSERVED | Reply. Pattern exists. |
| **LIFECYCLE** | MarkAsSoldSheet | 🔵 OBSERVED | Mark sold. Pattern exists. |
| **LIFECYCLE** | PauseListingSheet | 🔵 OBSERVED | Pause. Pattern exists. |
| **SHARE** | ShareSheet | 🔵 OBSERVED | Multi-channel share. Pattern exists. |
| **SHARE** | ShareToGroupSheet | 🔵 OBSERVED | Group selector. Pattern exists. |
| **OTHER** | Various | 🔵 OBSERVED | Filters, Settings, etc. |

**Coverage Status:**
- FROZEN_ASIS (verified source code): 3 components
- OBSERVED (seen in audit): ~15 families
- Total active components: 60
- **Canonical pattern coverage: ESTIMATED 70-80%** (not precisely measured)

---

## 📊 BEFORE vs AFTER (TRUTHFUL)

### Before P2 (Audit State)
- ❌ 3 confirmed duplicates (MakeOfferChat, MarkAsSoldChat, TradeOfferConfirm)
- ❌ 4 orphaned sheets (0 callers)
- ❌ 2 inline non-canonical confirms
- ❌ No decision tree
- ❌ No migration plan
- ❌ Primitive split (Custom vs Radix) without clear rules

### After P2 (Current State — Documentation Only)
- ✅ Decision tree documented (GUIDE)
- ✅ Migration plan created (GUIDE)
- ✅ 3 AS-IS canonicals identified and labeled (FROZEN_ASIS)
- ✅ Cleanup tracking system (GUIDE)
- ✅ Visual reference for existing patterns (GUIDE)
- ⚠️ NO NEW CODE WRITTEN (only documentation)
- ⚠️ Duplicates still exist (P1 work not yet executed)
- ⚠️ Orphaned sheets still exist (P3 decision pending)

---

## 🚀 NEXT STEPS (Actual Implementation Work Required)

### P1 — Close TradeOfferConfirmDialog Duplicate
**Status:** 📋 PLANNED (not yet implemented)
- Create data mapper function
- Update TradeOfferCard to use ConfirmActionDialog
- Delete TradeOfferConfirmDialog.tsx
- **Estimated:** 2 hours
- **Risk:** LOW

### P2 — Optional Inline Migration
**Status:** 📋 OPTIONAL
- Migrate MessagesPage delete chat to ConfirmActionDialog
- Migrate AddressesPage delete address to ConfirmActionDialog
- **Estimated:** 1 hour
- **Risk:** LOW

### P3 — Orphan Cleanup
**Status:** ⏸️ BLOCKED (needs product decision)
- Product meeting for HideListingSheet, RemoveListingSheet, RemoveMemberSheet, ChangeRoleSheet
- Decision: DELETE or FUTURE
- **Estimated:** 30 min meeting + 10 min execution

---

## 📏 SUCCESS METRICS (TRUTHFUL)

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| **Decision Tree Complete** | Yes | Yes | ✅ ACHIEVED (GUIDE) |
| **Migration Plan Complete** | Yes | Yes | ✅ ACHIEVED (GUIDE) |
| **AS-IS Canonicals Identified** | 3+ | 3 | ✅ ACHIEVED |
| **Duplicate Components** | 0 | 3 | ❌ NOT STARTED |
| **Orphaned Components** | 0 | 4 | ⏸️ BLOCKED |
| **Canonical Coverage** | 80% | ~70-80% (est) | 🟡 ESTIMATED |

**Overall P2 Status:** 🟢 **DOCUMENTATION COMPLETE** (implementation work in P1/P2/P3)

---

## 🎓 KEY CORRECTIONS FROM v2.0

### What Was Wrong ❌
1. Created new "canonical" components that added features beyond AS-IS
2. Claimed "FROZEN v2.0" for code that didn't exist
3. Stated "80% coverage" as fact (was estimate)
4. Implied implementation was complete (only docs were done)

### What Is Now Correct ✅
1. **FROZEN_ASIS** label only for verified existing code
2. **GUIDE** label for all documentation
3. **PROPOSED** label for anything not verified (none remain)
4. Clear separation: "Documentation complete, implementation pending"
5. Metrics labeled as ESTIMATED where not precisely measured

---

## 📞 HOW TO USE THIS SYSTEM

### For New Confirms
1. Read `/components/action-center/ConfirmActionDialog.tsx` (AS-IS canonical)
2. Follow the data object API pattern
3. Use appropriate variant (destructive/success/warning/info)
4. Add details and consequences as needed

### For New Status Displays
1. Read `/components/action-center/ViewStatusDialog.tsx` (pending status)
2. Read `/components/action-center/RejectionReasonsDialog.tsx` (rejection status)
3. Follow similar pattern for your use case

### For New Form Sheets
1. Read `/components/sheets/MakeOfferSheet.tsx` (complex form)
2. Follow pattern: sticky header + ScrollArea body + sticky footer
3. Use Radix Sheet (side="bottom" for mobile)
4. Add validation as needed

### For Decision Making
1. Check `CANONICAL_DECISION_TREE_v2.0.md` (GUIDE)
2. Follow flowchart in Section D
3. When in doubt, ask in PR review

---

## 🏆 CREDITS

**Auditor:** UX Systems Lead + Frontend Auditor  
**Implementation Date:** 2026-01-16  
**Phase:** P2 — Governance Documentation (GUIDE layer only)  
**Status:** DOCUMENTATION COMPLETE, IMPLEMENTATION PENDING

---

**END OF P2 DOCUMENTATION INDEX v2.1**  
**Next Phase:** Execute P1 migration (TradeOfferConfirmDialog)
