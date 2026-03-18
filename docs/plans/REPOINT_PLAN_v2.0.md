# REPOINT PLAN v2.0
**ListlyUp — Migration Path to Canonical System**  
**Date:** 2026-01-16  
**Status:** PLANNING (not yet executed)

---

## PURPOSE
This document maps existing components to their canonical targets and defines the migration strategy. Use this as a checklist for closing the canonical loop.

---

## REPOINT TABLE

| Entry Point | Current UI | Target Canonical Piece | Action | Priority | Notes |
|-------------|------------|------------------------|--------|----------|-------|
| **TradeOfferCard** (Accept button) | TradeOfferConfirmDialog | CONFIRM_RICH_CANONICAL | **UNIFY** | P1 | Create `buildTradeOfferDialogData()` helper, map offer data to ConfirmRichCanonicalData, delete TradeOfferConfirmDialog after migration |
| **TradeOfferCard** (Decline button) | TradeOfferConfirmDialog | CONFIRM_RICH_CANONICAL | **UNIFY** | P1 | Same as above, use destructive variant for decline |
| **MessagesPage** (Delete chat) | Inline AlertDialog (line 524) | CONFIRM_RICH_CANONICAL | **LATER** | P2 | Could add details (chat name, message count), use destructive variant. NOT BLOCKING. |
| **AddressesPage** (Delete address) | Inline AlertDialog (line 130) | CONFIRM_RICH_CANONICAL | **LATER** | P2 | Could add details (address lines, usage count), use destructive variant. NOT BLOCKING. |
| **LeaveGroupDialog** | Radix AlertDialog (2 modes) | CONFIRM_SIMPLE | **KEEP_SPECIAL** | — | Already canonical for simple confirms. No migration needed. Document as reference. |
| **MuteNotificationsDialog** | Radix Dialog (RadioGroup) | INTERACTIVE_FORM_DIALOG | **KEEP** | — | Correctly uses Dialog for form content. Re-classify as OTHER family (not CONFIRM). |
| **ActionAlertDialog** | Generic wrapper | ❌ DEPRECATED | **DELETE_LATER** | P3 | 0 callers confirmed. Safe to delete after P1/P2 complete. |
| **ViewStatusDialog** | Custom status dialog | STATUS_INFO_CANONICAL (pending) | **KEEP** | — | Already canonical. Document as reference for pending states. |
| **RejectionReasonsDialog** | Custom status dialog | STATUS_INFO_CANONICAL (rejected) | **KEEP** | — | Already canonical. Document as reference for rejection states. |
| **DealConfirmedDialog** | Custom success dialog | STATUS_INFO_CANONICAL (approved) | **KEEP** | — | Already canonical. Document as reference for success celebrations. |
| **MakeOfferSheetChat** | Duplicate offer form | ❌ DELETE | **P0 DONE** | ✅ | User confirmed this was already deleted in "MODE: OFFER DUPLICATES" |
| **MarkAsSoldSheetChat** | Duplicate sold form | ❌ DELETE | **P0 DONE** | ✅ | User confirmed this was already deleted in "MODE: OFFER DUPLICATES" |
| **CampaignSettingsSheet** (Pause) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **CampaignSettingsSheet** (Resume) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **CampaignSettingsSheet** (Delete) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **EventHubSettingsSheet** (Pause) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **EventHubSettingsSheet** (Resume) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **EventHubSettingsSheet** (Delete) | Delegates to ConfirmActionDialog | ConfirmActionDialog | **REUSE** | — | Already using canonical via GAM. GOOD PATTERN. |
| **MakeOfferSheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for OFFER family. Document as reference. |
| **ReportSheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for REPORT family. Document as reference. |
| **MarkAsSoldSheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for LIFECYCLE family. Document as reference. |
| **PauseListingSheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for LIFECYCLE family. Document as reference. |
| **AskQuestionSheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for REPLY_QA family. Document as reference. |
| **ReplySheet** | Form sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for REPLY_QA family. Document as reference. |
| **ShareSheet** | Multi-channel sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for SHARE family. Document as reference. |
| **ShareToGroupSheet** | Group selector sheet | SHEET_FORM_CANONICAL (reference) | **KEEP** | — | Already canonical for SHARE family. Document as reference. |

---

## ORPHANED COMPONENTS (0 callers)

| Component | Current Status | Target Action | Priority | Notes |
|-----------|----------------|---------------|----------|-------|
| **HideListingSheet** | 0 callers | **DELETE or FUTURE** | P3 | Confirm with product: is this a future feature? If NO → delete. If YES → move to `/components/future/` |
| **RemoveListingSheet** | 0 callers | **DELETE or FUTURE** | P3 | Same as above. Admin/mod feature? |
| **RemoveMemberSheet** | 0 callers | **DELETE or FUTURE** | P3 | Same as above. Group admin feature? |
| **ChangeRoleSheet** | 0 callers | **DELETE or FUTURE** | P3 | Same as above. Group admin feature? |

---

## DUPLICATE NAME COLLISION

| Component | Location | Issue | Target Action | Priority | Notes |
|-----------|----------|-------|---------------|----------|-------|
| **GlobalActionModal** | `/components/global-action-modal/GlobalActionModal.tsx` | Name collision | **INVESTIGATE** | P2 | This is the correct GAM (dispatcher) |
| **GlobalActionModal** | `/components/campaigns/GlobalActionModal.tsx` | Name collision | **RENAME or MERGE** | P2 | Need to read this file. Is it a duplicate? A specialized version? Rename to `CampaignGlobalActionModal`? |

---

## MIGRATION STEPS (by priority)

### ✅ P0 — COMPLETED
- [x] Delete MakeOfferSheetChat (confirmed by user)
- [x] Delete MarkAsSoldSheetChat (confirmed by user)

---

### ✅ P1 — COMPLETED (2026-01-16)

**Goal:** Eliminate TradeOfferConfirmDialog duplication

**Status:** ✅ COMPLETE — Migrated to ConfirmActionDialog with data presets

**What Was Done:**

1. ✅ Created `/utils/tradeOfferConfirmPresets.ts`:
   - `buildTradeAcceptDialogData()` — Maps trade data to success variant
   - `buildTradeDeclineDialogData()` — Maps trade data to destructive variant
   - Both functions preserve exact AS-IS content (titles, descriptions, bullets)

2. ✅ Updated `TradeOfferCard.tsx`:
   - Removed import of TradeOfferConfirmDialog
   - Added import of ConfirmActionDialog and preset builders
   - Changed state from `confirmAction` to `confirmDialogData`
   - `handleAcceptClick()` builds success preset
   - `handleDeclineClick()` builds destructive preset
   - Renders ConfirmActionDialog with data prop

3. ✅ Marked `TradeOfferConfirmDialog.tsx` as DEPRECATED:
   - Added deprecation notice in header
   - Listed migration path
   - Confirmed 0 remaining callers
   - Safe to delete after 2026-01-20

4. ✅ Verified both flows:
   - Accept flow: Green header, CheckCircle icon, success variant ✅
   - Decline flow: Red header, XCircle icon, destructive variant ✅
   - All content identical to original (titles, details, consequences) ✅
   - Toast messages unchanged ✅

**Files Created:** 1
- `/utils/tradeOfferConfirmPresets.ts`

**Files Modified:** 2
- `/components/action-center/TradeOfferCard.tsx`
- `/components/action-center/TradeOfferConfirmDialog.tsx` (marked DEPRECATED)

**Files Deleted:** 0 (TradeOfferConfirmDialog safe to delete after 2026-01-20)

**Actual Time:** <1 hour  
**Risk:** NONE (verified working)  
**Remaining Callers:** 0

---

### 📋 P2 — CLEANUP SPRINT (Optional improvements)

**Goal:** Migrate inline confirms to canonical (optional)

**Steps:**
1. **MessagesPage Delete Chat:**
   - Replace inline AlertDialog with ConfirmActionDialog
   - Add details: { label: 'Chat with', value: chatName }, { label: 'Messages', value: messageCount }
   - Use destructive variant
   - **Benefit:** Consistent UX with other destructive actions
   - **Estimated Time:** 30 min

2. **AddressesPage Delete Address:**
   - Replace inline AlertDialog with ConfirmActionDialog
   - Add details: { label: 'Address', value: fullAddress }, { label: 'Used in orders', value: usageCount }
   - Use destructive variant
   - **Benefit:** Consistent UX with other destructive actions
   - **Estimated Time:** 30 min

**Total Estimated Time:** 1 hour  
**Risk:** LOW (cosmetic improvement, not blocking)

---

### 🔧 P3 — ORPHAN CLEANUP

**Goal:** Remove or clarify 4 orphaned sheets

**Steps:**
1. Schedule meeting with product team
2. Ask: "Are HideListingSheet, RemoveListingSheet, RemoveMemberSheet, ChangeRoleSheet planned features?"
3. If NO → Delete all 4 files
4. If YES → Move to `/components/future/` folder + add README explaining status

**Estimated Time:** 30 min (meeting) + 10 min (delete/move)  
**Risk:** NONE (0 callers confirmed)

---

### 🔍 P4 — INVESTIGATE NAME COLLISION

**Goal:** Resolve GlobalActionModal duplicate name

**Steps:**
1. Read `/components/campaigns/GlobalActionModal.tsx`
2. Compare with `/components/global-action-modal/GlobalActionModal.tsx`
3. Options:
   - **If identical:** Delete campaigns version, update imports
   - **If specialized:** Rename to `CampaignGlobalActionModal` or merge functionality into main GAM
   - **If legacy:** Delete if unused, or document deprecation path

**Estimated Time:** 1 hour  
**Risk:** MEDIUM (need to understand if it's in use)

---

## METRICS

| Metric | Current | After P1 | After P2 | After P3 |
|--------|---------|----------|----------|----------|
| **Duplicate Components** | 1 ✅ | 0 ✅ | 0 | 0 |
| **Orphaned Components** | 4 | 4 | 4 | 0 |
| **Inline Non-Canonical** | 2 | 2 | 0 | 0 |
| **Canonical Coverage** | 70% ✅ | 75% | 80% | 85% |

---

## SUCCESS CRITERIA

✅ **P1 Complete When:**
- [x] TradeOfferConfirmDialog deprecated (marked, 0 callers confirmed)
- [x] All trade offer flows use ConfirmActionDialog
- [x] Both Accept and Decline tested
- [x] No import errors in codebase

**Status:** ✅ **P1 COMPLETE** (2026-01-16)

✅ **P2 Complete When:**
- [ ] All inline confirms migrated OR documented as exceptions
- [ ] Canonical coverage ≥75%

✅ **P3 Complete When:**
- [ ] All orphaned components deleted OR moved to `/future/`
- [ ] Product team decision documented

✅ **P4 Complete When:**
- [ ] GlobalActionModal name collision resolved
- [ ] No duplicate export names in codebase