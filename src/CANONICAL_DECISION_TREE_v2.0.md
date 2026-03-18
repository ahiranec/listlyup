# CANONICAL DECISION TREE v2.0
**ListlyUp — Global View System Governance**  
**Date:** 2026-01-16  
**Status:** FROZEN (P2 Standard)

---

## PURPOSE
This decision tree defines WHEN to use each canonical pattern for action execution and information display. Follow these rules strictly to maintain consistency and prevent drift.

---

## A) DIALOG FAMILY

### ✅ CONFIRM_RICH (ConfirmActionDialog)
**WHEN TO USE:**
- Action requires user confirmation (destructive or consequential)
- Need to show details (key-value pairs: item name, price, group, etc.)
- Need to show consequences (bulleted list of "what happens next")
- Need visual variant (destructive/success/warning/info)
- Action is one-shot (no multi-step form)

**STRUCTURE:**
- Colored header (variant-specific: red/green/amber/blue-50)
- Icon badge (circular, 12x12, variant-colored)
- Title + description
- Optional details box (gray muted bg, key-value pairs)
- Optional consequences box (colored alert with bullets)
- Actions row (Cancel left, Confirm right, gap-3, no X button)
- Border: rounded-2xl
- Width: max-w-md (448px)
- Primitives: Custom DIV (fixed positioning)

**EXAMPLES:**
- Delete campaign (destructive variant)
- Mark listing as sold (success variant)
- Pause campaign (warning variant)
- Accept trade offer (details + consequences)

**DO NOT USE FOR:**
- Simple 2-button confirms without details → Use CONFIRM_SIMPLE
- Forms with input fields → Use SHEET
- Post-action status display → Use STATUS_POSTACTION

---

### ✅ CONFIRM_SIMPLE (Radix AlertDialog)
**WHEN TO USE:**
- Simple 2-button confirmation
- No details section needed
- No consequences section needed
- Standard yes/no or continue/cancel pattern
- Minimal visual design (plain header acceptable)

**STRUCTURE:**
- Plain header (no colored bg)
- Title + description (text only, optional emoji)
- Optional simple list (bulleted text, not styled box)
- Actions responsive (column mobile, row desktop)
- Border: rounded-lg
- Width: sm:max-w-lg (512px)
- Primitives: Radix AlertDialog
- Has X button (Radix default)

**EXAMPLES:**
- Leave group (2 modes: normal/admin-blocked)
- Delete address (simple destructive)
- Delete chat (simple destructive)

**DO NOT USE FOR:**
- Rich details or consequences → Use CONFIRM_RICH
- Forms → Use SHEET
- Post-action feedback → Use STATUS_POSTACTION or toast

---

### ✅ STATUS_POSTACTION (Informational Dialog)
**WHEN TO USE:**
- Display status AFTER action occurred
- Show pending state (waiting for approval)
- Show rejection reasons + next steps
- Show success celebration (deal confirmed)
- No "confirm before" logic (event already happened)

**TYPES:**

**1. STATUS_PENDING (ViewStatusDialog)**
- Blue header (info variant)
- Clock icon
- Shows: submission time, estimated review, what's next
- Actions: Contact Mods (optional), Got It / Close

**2. STATUS_REJECTED (RejectionReasonsDialog)**
- Red header (error variant)
- XCircle icon
- Shows: rejection reasons (categorized: MUST FIX / SHOULD FIX / SUGGESTIONS)
- Optional moderator note
- Actions: Edit & Resubmit (primary), Ask Mods, Close

**3. STATUS_SUCCESS (DealConfirmedDialog)**
- Green gradient header
- Handshake icon + sparkles
- Shows: agreement details, next steps
- Actions: Single CTA (Continue to Chat)

**DO NOT USE FOR:**
- Confirmation before action → Use CONFIRM_RICH or CONFIRM_SIMPLE
- Forms → Use SHEET

---

### ✅ INTERACTIVE_FORM_DIALOG (Radix Dialog)
**WHEN TO USE:**
- Short form inside dialog (not full-screen)
- Radio groups, selects, or simple inputs
- 1-3 form fields maximum
- Desktop-friendly (not complex mobile flow)

**STRUCTURE:**
- Plain header
- Form content (RadioGroup, Select, Input, Alert boxes)
- Actions responsive (buttons can have flex-1 on mobile)
- Border: rounded-lg
- Width: sm:max-w-md (448px)
- Primitives: Radix Dialog (NOT AlertDialog)
- Has X button

**EXAMPLES:**
- Mute notifications (RadioGroup for duration)
- Location modal (map view, informational)
- Listing stats modal (data view, informational)

**DO NOT USE FOR:**
- Complex multi-step forms → Use SHEET
- Pure confirmation without inputs → Use CONFIRM_RICH or CONFIRM_SIMPLE
- Full mobile form flow → Use SHEET

---

## B) SHEET FAMILY

### ✅ SHEET_FORM_CANONICAL (Action Execution)
**WHEN TO USE:**
- Form requires multiple input fields (3+)
- Mobile-first experience essential
- Multi-step flow (optional)
- Action is create/edit/submit pattern
- Need scrollable content area

**STRUCTURE:**
- SheetHeader with title + description
- Scrollable body with form fields
- Optional sections (Radio groups, text areas, file upload, etc.)
- SheetFooter with actions (responsive, full-width on mobile)
- Primitives: Radix Sheet (bottom sheet mobile, side panel desktop)

**CANONICAL FAMILIES:**

**1. OFFER Family**
- MakeOfferSheet (offer form: amount + message)
- CounterOfferSheet (counter-offer: new amount + reason)
- ManageOffersSheet (owner view: list of offers, accept/decline each)

**2. REPORT Family**
- ReportSheet (product report: checkboxes + details)
- ReportGroupSheet (group report: checkboxes + details)

**3. REPLY_QA Family**
- AskQuestionSheet (ask: category + question text)
- ReplySheet (reply: question context + answer text)

**4. LIFECYCLE Family**
- MarkAsSoldSheet (sold: buyer selector + final price)
- PauseListingSheet (pause: reason + duration selector)

**5. SHARE Family**
- ShareSheet (multi-channel: WhatsApp/Groups/QR/Link)
- ShareToGroupSheet (group selector with search)

**6. STATUS Family (Admin)**
- CampaignApprovalSheet (approve: review + confirm)
- CampaignRejectionSheet (reject: checkboxes + reason)
- EventApprovalSheet (approve: review + confirm)
- EventRejectionSheet (reject: checkboxes + reason)

**DO NOT USE FOR:**
- Simple 2-button confirm → Use CONFIRM_RICH or CONFIRM_SIMPLE
- Read-only information → Consider Dialog or Page
- Settings menu → Use utility sheet pattern

---

### ✅ SHEET_UTILITY (Non-action)
**WHEN TO USE:**
- Filters (search + filter controls)
- Settings menu (navigation list)
- Browse/explore (search + list view)
- Selectors (pick from list)

**EXAMPLES:**
- FilterSheet (browse filters)
- MyListingsFilterSheet (my listings filters)
- GroupFiltersSheet (group filters)
- ExploreGroupsSheet (browse groups)
- InviteContactsSheet (contact picker)
- MenuSheet (main navigation)
- SettingsSheet (settings navigation)

**STRUCTURE:** Varies by use case (no strict canonical)

---

## C) MODAL FAMILY

### ✅ MODAL_DISPATCHER (GlobalActionModal)
**WHEN TO USE:**
- You're building a centralized action system
- Need to route actions to appropriate canonical pieces
- Should NOT be called directly by UI (use dispatch pattern)

**STRUCTURE:**
- Context Provider wrapper
- Routing table to map actionId → canonical component
- No visual component (just dispatcher logic)

**DO NOT USE FOR:**
- Direct UI calls → Components should call GAM.dispatch(), not render GAM

---

### ✅ MODAL_DETAIL (ProductModal)
**WHEN TO USE:**
- Full product detail view
- Not an action execution (just viewing)
- Overlays current page

**STRUCTURE:**
- Full-height dialog
- Image + details + description + actions
- Close button top-right

**DO NOT USE FOR:**
- Action execution → Use CONFIRM_RICH or SHEET
- Forms → Use SHEET

---

## D) DECISION FLOWCHART

```
USER TRIGGERS ACTION
    │
    ├─→ IS IT A CONFIRMATION? (destructive/important decision)
    │   │
    │   ├─→ NEEDS DETAILS/CONSEQUENCES/VARIANTS? → CONFIRM_RICH (ConfirmActionDialog)
    │   └─→ SIMPLE 2-BUTTON? → CONFIRM_SIMPLE (Radix AlertDialog)
    │
    ├─→ IS IT A FORM? (inputs/fields required)
    │   │
    │   ├─→ COMPLEX/MULTI-STEP/MOBILE-FIRST? → SHEET_FORM (family-specific)
    │   └─→ SHORT FORM (1-3 fields, desktop-friendly)? → INTERACTIVE_FORM_DIALOG
    │
    ├─→ IS IT STATUS DISPLAY? (after action occurred)
    │   │
    │   └─→ PENDING/REJECTED/SUCCESS? → STATUS_POSTACTION (ViewStatus/Rejection/Deal)
    │
    └─→ IS IT INFORMATION? (no action)
        │
        ├─→ SMALL/FOCUSED? → INTERACTIVE_FORM_DIALOG (LocationModal, StatsModal)
        └─→ FULL DETAIL? → MODAL_DETAIL (ProductModal)
```

---

## E) ANTI-PATTERNS (NEVER DO THIS)

❌ **Creating new confirm dialog for specific action**
- Wrong: `TradeOfferConfirmDialog` (specialized duplicate)
- Right: Use `ConfirmActionDialog` with trade-specific data

❌ **Using Dialog for complex forms**
- Wrong: Dialog with 5+ input fields
- Right: Use Sheet (mobile-friendly, scrollable)

❌ **Mixing primitives without reason**
- Wrong: Custom dialog for one action, Radix for similar action
- Right: Follow decision tree consistently

❌ **Inline AlertDialog for rich confirms**
- Wrong: Inline AlertDialog with no details section
- Right: Use ConfirmActionDialog for consistency

❌ **Success confirmation inside form sheet**
- Wrong: ReportSheet showing "success" AlertDialog after submit
- Right: Use toast for simple feedback, or navigate to success page

❌ **Duplicate components for different entry points**
- Wrong: `MakeOfferSheet` + `MakeOfferSheetChat` (same function)
- Right: One canonical, multiple entry points

---

## F) MIGRATION PATH

When you find a non-canonical pattern:

1. **Identify family** (Confirm / Status / Form)
2. **Check decision tree** (which canonical fits?)
3. **Map data structure** (create data mapper if needed)
4. **Repoint entry point** (update import + props)
5. **Test both flows** (old entry point + new entry point)
6. **Delete old component** (only after all entry points migrated)

---

## G) GOVERNANCE RULES

1. **No new dialogs/sheets without checking decision tree first**
2. **If you need a variant, extend existing canonical (don't duplicate)**
3. **Document exceptions** (if you MUST deviate, explain why in code comments)
4. **Review with UX Systems Lead** (before creating new patterns)
5. **Update this doc** (if you discover missing use case)

---

**FROZEN:** This structure is now canonical for P2. Any changes require governance review.
