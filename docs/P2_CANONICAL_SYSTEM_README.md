# P2 CANONICAL SYSTEM — START HERE 📘

**ListlyUp Global View System Governance**  
**Version:** 2.1 (CORRECTED)  
**Date:** 2026-01-16

---

## 🎯 WHAT IS THIS?

This is a **documentation system** that:
1. Identifies which existing UI patterns to reuse (3 canonical components)
2. Provides governance rules (when to use Dialog vs Sheet vs Modal)
3. Maps migration path from duplicates to canonical
4. Tracks technical debt (deprecated/orphaned components)

**⚠️ IMPORTANT:** This is **DOCUMENTATION ONLY** — no new code was written.

---

## 📁 QUICK NAVIGATION

### 🚀 **START HERE (Developers)**
→ Read **CANONICAL_QUICK_REFERENCE_v2.1_ASIS.md**
- Copy-paste examples for common use cases
- Import paths for verified components
- Quick decision helper

### 📖 **GOVERNANCE (Architects)**
→ Read **CANONICAL_DECISION_TREE_v2.0.md**
- When to use Dialog vs Sheet vs Modal
- Decision flowchart
- Anti-patterns to avoid

### 🗺️ **MIGRATION PLAN (Tech Lead)**
→ Read **REPOINT_PLAN_v2.0.md**
- P1: TradeOfferConfirmDialog migration (2 hours)
- P2: Optional inline confirms (1 hour)
- P3: Orphan cleanup (product decision needed)

### 🏷️ **TECH DEBT TRACKER**
→ Read **CLEANUP_TAGS_v2.0.md**
- 1 deprecated (ActionAlertDialog)
- 4 orphaned (HideListingSheet, RemoveListingSheet, etc.)
- 2 resolved (MakeOfferChat, MarkAsSoldChat)

### 📐 **VISUAL SPECS**
→ Read **CANONICAL_VISUAL_REFERENCE_v2.1_ASIS.md**
- Layout diagrams (ASCII art)
- Color system
- Spacing/typography specs

### 📊 **MASTER INDEX**
→ Read **P2_CANONICAL_SYSTEM_INDEX_v2.1.md**
- Complete inventory
- Status of all families
- Metrics and coverage

### 📝 **SUMMARY**
→ Read **P2_IMPLEMENTATION_SUMMARY_v2.1_CORRECTED.md**
- What was delivered
- What was corrected from v2.0
- Key learnings

---

## 🔵 THE 3 CANONICAL COMPONENTS (FROZEN_ASIS)

These are **verified by reading actual source code** and safe to reference:

### 1. **ConfirmActionDialog** ⭐ MOST IMPORTANT
**Location:** `/components/action-center/ConfirmActionDialog.tsx`  
**Use for:** Rich confirmation dialogs (delete, accept, pause, etc.)  
**Features:** 4 variants, details, consequences, data object API  
**Example:**
```tsx
import { ConfirmActionDialog } from './action-center/ConfirmActionDialog';

const data = {
  variant: 'destructive',
  icon: 'trash',
  title: 'Delete?',
  description: 'Cannot be undone',
  onConfirm: () => { /* delete + toast */ },
};
<ConfirmActionDialog open={open} onOpenChange={setOpen} data={data} />
```

### 2. **ViewStatusDialog**
**Location:** `/components/action-center/ViewStatusDialog.tsx`  
**Use for:** Pending status display (post-action informational)  
**Features:** Blue header, info boxes, optional actions  

### 3. **MakeOfferSheet**
**Location:** `/components/sheets/MakeOfferSheet.tsx`  
**Use for:** Reference for complex form sheets (OFFER family)  
**Features:** Product preview, validation, presets, sticky header/footer  

---

## ⚡ QUICK START

### I need to add a confirmation dialog
1. Import `ConfirmActionDialog`
2. Create data object with variant/title/description
3. Add optional details/consequences if needed
4. Done!

### I need to add a form sheet
1. Look at existing family-specific sheets:
   - OFFER → MakeOfferSheet
   - REPORT → ReportSheet
   - LIFECYCLE → MarkAsSoldSheet
2. Follow similar pattern
3. Use Radix Sheet with sticky header/footer

### I'm not sure which pattern to use
1. Check Decision Tree Section D (flowchart)
2. Ask: "Is it a confirm? A form? Status display?"
3. Follow decision tree → pick canonical

---

## 🚫 COMMON MISTAKES

❌ **Creating specialized confirm dialog**
→ Use ConfirmActionDialog with custom data instead

❌ **Duplicating sheet for different entry point**
→ Reuse same sheet, just different imports

❌ **Using Dialog for complex forms**
→ Use Sheet (mobile-friendly)

---

## 📊 CURRENT STATUS

| Item | Status | Next Action |
|------|--------|-------------|
| **Documentation** | ✅ COMPLETE | Use it! |
| **AS-IS Canonicals** | ✅ 3 identified | Reference them |
| **Duplicate Removal** | ⏳ PENDING | Execute P1 (2 hours) |
| **Orphan Cleanup** | ⏸️ BLOCKED | Product decision |
| **New Code** | ❌ NONE | Docs only |

---

## 🎯 NEXT ACTIONS

### For Developers
- [x] Read Quick Reference
- [ ] Use ConfirmActionDialog in next PR
- [ ] Follow Decision Tree for new patterns

### For Tech Lead
- [ ] Review REPOINT_PLAN_v2.0.md
- [ ] Schedule P1 work (TradeOfferConfirmDialog migration)
- [ ] Schedule P3 meeting (orphan decision)

### For Product Team
- [ ] Review CLEANUP_TAGS_v2.0.md
- [ ] Decide on 4 orphaned components (DELETE or FUTURE)
- [ ] Approve P1 migration

---

## 🆘 NEED HELP?

**Question:** "Which component should I use for X?"  
**Answer:** Read CANONICAL_QUICK_REFERENCE_v2.1_ASIS.md

**Question:** "How do I migrate duplicate to canonical?"  
**Answer:** Read REPOINT_PLAN_v2.0.md (P1 section has example)

**Question:** "What's the visual spec for dialogs?"  
**Answer:** Read CANONICAL_VISUAL_REFERENCE_v2.1_ASIS.md

**Question:** "What does FROZEN_ASIS mean?"  
**Answer:** Read P2_CANONICAL_SYSTEM_INDEX_v2.1.md (classification section)

---

## ✅ VERIFICATION

All claims in this system are:
- [x] Verified against actual source code
- [x] Labeled correctly (FROZEN_ASIS / GUIDE)
- [x] Truthful about status (docs only, no code)
- [x] Clear about what's pending (P1/P2/P3)

---

**Last Updated:** 2026-01-16  
**Status:** 📘 READY TO USE  
**Start with:** CANONICAL_QUICK_REFERENCE_v2.1_ASIS.md
