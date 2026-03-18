# CANONICAL VISUAL REFERENCE v2.1 (AS-IS)
**ListlyUp — Observed Layout Patterns**  
**Date:** 2026-01-16  
**Status:** 📘 GUIDE (Documentation of existing patterns)

---

## ⚠️ IMPORTANT
This document describes **EXISTING PATTERNS OBSERVED IN CODEBASE**, not invented specs.
All layouts are verified by reading actual component source code.

---

## 📱 CONFIRM_RICH Pattern (ConfirmActionDialog — AS-IS)

**Source:** `/components/action-center/ConfirmActionDialog.tsx` (verified)

### Mobile + Desktop Layout (Same on Both)
```
┌──────────────────────────────────────┐
│  🔴 Colored Header (variant-based)   │
│  ┌────┐                              │
│  │ 🗑️ │  Delete Campaign?            │
│  └────┘  This action cannot be undone│
├──────────────────────────────────────┤
│  📦 Details Box (optional)           │
│  Campaign: Black Friday Sale         │
│  Active since: Nov 15, 2026          │
│  Listings: 12 listings ✨            │
├──────────────────────────────────────┤
│  ⚠️ Consequences Box (optional)      │
│  This will:                          │
│  • Permanently delete campaign       │
│  • Remove tags from listings         │
│  • Stop all promotions               │
├──────────────────────────────────────┤
│  [   Cancel   ] [ Delete Campaign ]  │
│                                      │
└──────────────────────────────────────┘
```

**Verified Specs (from actual code):**
- Width: max-w-md (448px), centered with max-w-[480px] mx-auto
- Header: p-6, rounded-t-2xl, variant-colored bg
- Icon badge: w-12 h-12, rounded-full
- Content: p-6, space-y-4
- Details: p-4, rounded-lg, bg-muted/50, border-border
- Consequences: p-3, rounded-lg, variant-colored bg/border
- Actions: px-6 pb-6, flex gap-3, buttons flex-1
- Border: rounded-2xl
- No X button
- Backdrop: bg-black/50
- Animation: fade-in + zoom-in-95

**Observed Variants:**
- destructive: red (bg-red-50/100, text-red-600, button bg-red-600)
- success: green (bg-green-50/100, text-green-600, button bg-green-600)
- warning: amber (bg-amber-50/100, text-amber-600, button bg-amber-600)
- info: blue (bg-blue-50/100, text-blue-600, button bg-blue-600)

**Icons Observed:**
- check: CheckCircle
- x: XCircle
- alert: AlertTriangle
- info: Info
- trash: Trash2

**API (verified):**
```tsx
interface ConfirmActionDialogData {
  variant?: 'destructive' | 'success' | 'warning' | 'info';
  icon?: 'check' | 'x' | 'alert' | 'info' | 'trash';
  title: string;
  description: string;
  details?: Array<{label: string; value: string; highlight?: boolean}>;
  consequences?: {title: string; items: string[]};
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
}
```

---

## 📊 STATUS_PENDING Pattern (ViewStatusDialog — AS-IS)

**Source:** `/components/action-center/ViewStatusDialog.tsx` (verified in audit)

### Mobile + Desktop Layout (Same on Both)
```
┌──────────────────────────────────────┐
│  🔵 Blue Header                      │
│  ┌────┐                              │
│  │ ⏰ │  Pending Approval             │
│  └────┘  Waiting for moderators      │
├──────────────────────────────────────┤
│  📦 Details Box                      │
│  Listing: iPhone 15 Pro Max          │
│  Group: Tech Lovers                  │
│  Submitted: 2 hours ago              │
│  Est. Review: 24-48 hours ✨         │
├──────────────────────────────────────┤
│  ℹ️ Info Box (blue)                  │
│  Why is this pending?                │
│  • Group requires mod approval       │
│  • Quality review process            │
│  • You'll be notified                │
├──────────────────────────────────────┤
│  ⚠️ Info Box (amber)                 │
│  What happens next:                  │
│  • Review within 24-48 hours         │
│  • If approved, goes live            │
│  • If rejected, can resubmit         │
├──────────────────────────────────────┤
│  [  👥 Contact Mods  ]               │
│  [  Cancel  ] [  Got It  ]           │
└──────────────────────────────────────┘
```

**Verified Specs:**
- Same base structure as ConfirmActionDialog
- Header: bg-blue-50, Clock icon
- Max-height: 90vh (scrollable for long content)
- Actions: flex-col gap-2 (stacked)
- Optional primary action (Contact Mods)
- Always has dismiss button (Got It / Cancel)

**Observed in RejectionReasonsDialog (similar pattern):**
- Red header (bg-red-50), XCircle icon
- Rejection reasons with badges:
  - MUST FIX (destructive badge)
  - SHOULD FIX (amber bg badge)
  - SUGGESTIONS (secondary badge)
- Each reason in colored box (red/amber/blue)
- Optional moderator note section
- Primary CTA: "Edit & Resubmit" (blue button)

---

## 📋 SHEET_FORM Pattern (MakeOfferSheet — AS-IS)

**Source:** `/components/sheets/MakeOfferSheet.tsx` (verified)

### Mobile Layout (Bottom Sheet)
```
┌──────────────────────────────────────┐
│  ← Make Offer                        │  <- Sticky header
├──────────────────────────────────────┤
│  ↕️ SCROLLABLE (h-[calc(90vh-170px)])│
│                                      │
│  📦 Product Preview Card             │
│  [img] iPhone 15 Pro Max             │
│        Listed at: $180               │
│                                      │
│  💰 Suggested Range (blue box)       │
│  $126 - $162 USD                     │
│  Higher acceptance rates             │
│                                      │
│  Quick Offers (3 preset buttons)     │
│  [ -20% ] [ -15% ] [ -10% ]          │
│    144      153      162             │
│                                      │
│  Your Offer *                        │
│  ┌────────────────────────────────┐ │
│  │ $ 150                          │ │
│  └────────────────────────────────┘ │
│  ✅ Great offer! Within range       │
│                                      │
│  ──────────────────────────────      │
│                                      │
│  Message to Seller (optional)        │
│  ┌────────────────────────────────┐ │
│  │ Hi Sarah, I'm interested...    │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│  245/300                             │
│                                      │
│  ℹ️ How it works (gray box)          │
│  • Seller receives notification     │
│  • Can accept, counter, or decline  │
│                                      │
├──────────────────────────────────────┤
│  [  💬 Send Offer (150 USD)  ]       │  <- Sticky footer
└──────────────────────────────────────┘
```

**Verified Specs:**
- Radix Sheet: side="bottom", h-[90vh], p-0
- Sticky header: h-14, border-b, bg-white
- Header has back button (ChevronLeft icon)
- ScrollArea: h-[calc(90vh-170px)]
- Body: px-4 py-6 space-y-6
- Sticky footer: border-t, p-4, bg-white
- Submit button: w-full h-12

**Verified Features:**
- Product preview card (bg-muted/50, rounded-lg)
- Suggested range box (bg-blue-50, blue text)
- Quick preset buttons (grid-cols-3, hover effects)
- Offer input with $ icon (DollarSign, pl-10)
- Real-time validation messages:
  - Too high: red (AlertCircle)
  - Too low: orange (AlertCircle)
  - Good range: green (CheckCircle2)
- Optional message textarea (maxLength: 300)
- Character counter (text-right)
- Info box (bg-gray-50, bullet list)
- Loading state: "Sending..." (disabled button)

**Desktop Behavior:**
- Same layout (no responsive changes observed)
- Bottom sheet remains bottom (doesn't switch to side)

---

## 🎨 SHARED VISUAL SYSTEM (Observed)

### Color Variants (Confirmed in ConfirmActionDialog)
```
DESTRUCTIVE:
- Header: bg-red-50 dark:bg-red-950/30
- Icon: bg-red-100 dark:bg-red-900, text-red-600 dark:text-red-500
- Button: bg-red-600 hover:bg-red-700
- Alert: bg-red-50 dark:bg-red-950/20, border-red-200 dark:border-red-900

SUCCESS:
- Header: bg-green-50 dark:bg-green-950/30
- Icon: bg-green-100 dark:bg-green-900, text-green-600 dark:text-green-500
- Button: bg-green-600 hover:bg-green-700
- Alert: bg-green-50 dark:bg-green-950/20, border-green-200 dark:border-green-900

WARNING:
- Header: bg-amber-50 dark:bg-amber-950/30
- Icon: bg-amber-100 dark:bg-amber-900, text-amber-600 dark:text-amber-500
- Button: bg-amber-600 hover:bg-amber-700
- Alert: bg-amber-50 dark:bg-amber-950/20, border-amber-200 dark:border-amber-900

INFO:
- Header: bg-blue-50 dark:bg-blue-950/30
- Icon: bg-blue-100 dark:bg-blue-900, text-blue-600 dark:text-blue-500
- Button: bg-blue-600 hover:bg-blue-700
- Alert: bg-blue-50 dark:bg-blue-950/20, border-blue-200 dark:border-blue-900
```

### Spacing (Observed in multiple components)
```
Dialog Pattern:
- Header: p-6
- Content: p-6, space-y-4
- Actions: px-6 pb-6, gap-3

Sheet Pattern (MakeOfferSheet):
- Header: h-14, px-4
- Body: px-4 py-6, space-y-6
- Footer: p-4

Common:
- Icon badge: w-12 h-12 (dialogs), w-5 h-5 (inline icons)
- Section spacing: space-y-4 or space-y-6
- Button gap: gap-2 or gap-3
```

### Border Radius (Observed)
```
Dialog (custom): rounded-2xl (16px)
Sheet (Radix): (default Radix styling)
Boxes/Cards: rounded-lg (8px)
Icon badges: rounded-full
Buttons: (default button radius)
```

### Typography (Observed)
```
Dialog Titles: text-lg font-semibold
Descriptions: text-sm text-muted-foreground
Labels: text-sm font-medium
Field hints: text-xs text-muted-foreground
Detail labels: text-sm text-muted-foreground
Detail values: text-sm font-medium
```

---

## 📐 RESPONSIVE PATTERNS (Observed)

### ConfirmActionDialog
- **All Breakpoints:** Same layout, centered, max-w-md
- **Mobile:** p-4 margin around dialog
- **Desktop:** Same (no changes)

### ViewStatusDialog
- **All Breakpoints:** Same layout, centered, max-w-md
- **Mobile:** Scrollable if content > 90vh
- **Desktop:** Same

### MakeOfferSheet
- **All Breakpoints:** Bottom sheet (h-[90vh])
- **Mobile:** Full-width
- **Desktop:** Appears to remain bottom sheet (no side panel observed)

**NOTE:** Other sheets may have different responsive behavior (sm:max-w-lg for side panel), but MakeOfferSheet specifically uses bottom sheet on all sizes.

---

## ✅ VERIFICATION CHECKLIST

When implementing similar patterns:

**Visual Match:**
- [ ] Variant colors match observed system
- [ ] Border radius matches (2xl for dialogs, lg for boxes)
- [ ] Icon sizes match (w-12 h-12 for badges, w-5 h-5 for inline)
- [ ] Spacing matches (p-6, gap-3, space-y-4)
- [ ] Typography classes match

**Functional Match:**
- [ ] Props match observed API
- [ ] Validation logic similar to observed patterns
- [ ] Loading states similar
- [ ] Error handling similar

**Responsive Match:**
- [ ] Mobile layout matches observed
- [ ] Desktop layout matches observed
- [ ] Breakpoint behavior matches

---

**END OF VISUAL REFERENCE v2.1**  
**Status:** 📘 GUIDE (AS-IS Documentation)  
**Last Updated:** 2026-01-16
