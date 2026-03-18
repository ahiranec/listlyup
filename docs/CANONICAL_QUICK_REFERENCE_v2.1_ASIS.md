# CANONICAL QUICK REFERENCE v2.1 (AS-IS)
**ListlyUp — Developer Cheat Sheet**  
**Status:** 📘 GUIDE | **Updated:** 2026-01-16

---

## 🤔 WHICH PATTERN DO I USE?

### I need to confirm a destructive action (delete, remove)
→ **ConfirmActionDialog** (destructive variant) — 🔵 FROZEN_ASIS
```tsx
import { ConfirmActionDialog, ConfirmActionDialogData } from './action-center/ConfirmActionDialog';

const data: ConfirmActionDialogData = {
  variant: 'destructive',
  icon: 'trash',
  title: 'Delete Campaign?',
  description: 'This action cannot be undone',
  details: [
    { label: 'Campaign', value: 'Black Friday Sale' },
    { label: 'Listings affected', value: '12 listings', highlight: true },
  ],
  consequences: {
    title: 'This will:',
    items: [
      'Permanently delete the campaign',
      'Remove all campaign tags from listings',
      'Stop all active promotions',
    ],
  },
  confirmLabel: 'Delete Campaign',
  onConfirm: () => {
    // Execute delete + toast
    deleteCampaign(id);
    toast.success('Campaign deleted');
  },
};

<ConfirmActionDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  data={data}
/>
```

---

### I need a simple 2-button confirm (no details)
→ **Radix AlertDialog** (LeaveGroupDialog pattern) — 🔵 OBSERVED
```tsx
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from './ui/alert-dialog';

<AlertDialog open={open} onOpenChange={setOpen}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Leave Group?</AlertDialogTitle>
      <AlertDialogDescription>
        You'll lose access to all posts and members.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleLeave}>
        Leave Group
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

---

### I need to show status AFTER an action (pending)
→ **ViewStatusDialog** — 🔵 FROZEN_ASIS
```tsx
import { ViewStatusDialog } from './action-center/ViewStatusDialog';

<ViewStatusDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  listing={{
    title: 'iPhone 15 Pro Max',
    groupName: 'Tech Lovers',
    submittedTime: '2 hours ago',
    estimatedReview: 'Within 24-48 hours',
  }}
  onContactMods={() => {/* navigate to chat */}}
  onCancel={() => {/* cancel submission */}}
/>
```

---

### I need to show rejection reasons
→ **RejectionReasonsDialog** — 🔵 OBSERVED
```tsx
import { RejectionReasonsDialog } from './action-center/RejectionReasonsDialog';

<RejectionReasonsDialog
  open={isOpen}
  onOpenChange={setIsOpen}
  listing={{
    title: 'iPhone 15 Pro Max',
    groupName: 'Tech Lovers',
    rejectedTime: '1 hour ago',
    reasons: [
      { type: 'error', message: 'Price is too high for this group' },
      { type: 'warning', message: 'Description is too short' },
      { type: 'suggestion', message: 'Add warranty information' },
    ],
    moderatorNote: 'Great item, but please adjust the price.',
  }}
  onEditResubmit={() => {/* navigate to edit */}}
  onContactMods={() => {/* navigate to chat */}}
/>
```

---

### I need an offer form
→ **MakeOfferSheet** — 🔵 FROZEN_ASIS
```tsx
import { MakeOfferSheet } from './sheets/MakeOfferSheet';

<MakeOfferSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  productTitle="iPhone 15 Pro Max 256GB"
  productPrice="180 USD"
  productImage={imageUrl}
  sellerId="seller-123"
  sellerName="Sarah"
  onOfferSubmitted={(offerId) => {
    // Navigate to chat or action center
  }}
/>
```

---

### I need a report form
→ **ReportSheet** (product) — 🔵 OBSERVED
```tsx
import { ReportSheet } from './product-detail/ReportSheet';

<ReportSheet
  open={isOpen}
  onOpenChange={setIsOpen}
/>
// (Handles report submission internally with toast)
```

---

### I need a mark-as-sold form
→ **MarkAsSoldSheet** — 🔵 OBSERVED
```tsx
import { MarkAsSoldSheet } from './sheets/MarkAsSoldSheet';

<MarkAsSoldSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  productTitle="iPhone 15 Pro Max"
  productImage={imageUrl}
  productPrice="180 USD"
  onStatusChanged={() => {
    // Refresh listing state
  }}
/>
```

---

## 📦 IMPORT PATHS (VERIFIED)

```tsx
// CONFIRM_RICH (custom dialog) — FROZEN_ASIS
import { ConfirmActionDialog, ConfirmActionDialogData } 
  from './components/action-center/ConfirmActionDialog';

// CONFIRM_SIMPLE (Radix) — OBSERVED
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, 
         AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, 
         AlertDialogAction } from './components/ui/alert-dialog';

// STATUS_INFO (custom dialogs) — FROZEN_ASIS / OBSERVED
import { ViewStatusDialog } from './components/action-center/ViewStatusDialog';
import { RejectionReasonsDialog } from './components/action-center/RejectionReasonsDialog';
import { DealConfirmedDialog } from './components/DealConfirmedDialog';

// SHEET_FORM families — FROZEN_ASIS / OBSERVED
import { MakeOfferSheet } from './components/sheets/MakeOfferSheet'; // OFFER
import { ReportSheet } from './components/product-detail/ReportSheet'; // REPORT
import { MarkAsSoldSheet } from './components/sheets/MarkAsSoldSheet'; // LIFECYCLE
import { PauseListingSheet } from './components/sheets/PauseListingSheet'; // LIFECYCLE
import { AskQuestionSheet } from './components/sheets/AskQuestionSheet'; // REPLY_QA
import { ReplySheet } from './components/ReplySheet'; // REPLY_QA
import { ShareSheet } from './components/share/ShareSheet'; // SHARE

// GlobalActionModal (dispatcher) — OBSERVED
import { useGlobalActionModal } from './components/global-action-modal/GlobalActionModal';
```

---

## ⚡ COMMON PATTERNS (VERIFIED)

### Using GlobalActionModal (recommended for campaigns/events)
```tsx
const gam = useGlobalActionModal();

const handleDelete = () => {
  gam.dispatch({
    actionId: 'campaign.delete',
    context: { 
      campaignId: campaign.id, 
      campaignName: campaign.name 
    },
    onConfirm: () => {
      // Execute delete logic
      deleteCampaign(campaign.id);
      toast.success('Campaign deleted');
    },
  });
};
```

### Direct ConfirmActionDialog (when not using GAM)
```tsx
const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmData, setConfirmData] = useState<ConfirmActionDialogData | null>(null);

const handleDelete = () => {
  setConfirmData({
    variant: 'destructive',
    icon: 'trash',
    title: 'Delete?',
    description: 'This cannot be undone',
    onConfirm: () => {
      deleteThing();
      toast.success('Deleted');
    },
  });
  setConfirmOpen(true);
};

// In JSX:
{confirmData && (
  <ConfirmActionDialog
    open={confirmOpen}
    onOpenChange={setConfirmOpen}
    data={confirmData}
  />
)}
```

---

## 🚫 ANTI-PATTERNS (DON'T DO THIS)

❌ **Creating specialized confirm dialog**
```tsx
// WRONG:
function DeleteCampaignDialog() { ... }

// RIGHT:
const deleteData: ConfirmActionDialogData = { 
  variant: 'destructive',
  title: 'Delete Campaign?',
  // ...
};
<ConfirmActionDialog data={deleteData} />
```

❌ **Duplicating existing sheet for different entry point**
```tsx
// WRONG:
// Creating MakeOfferSheetChat.tsx (duplicate of MakeOfferSheet)

// RIGHT:
// Use the same MakeOfferSheet from both entry points
import { MakeOfferSheet } from './sheets/MakeOfferSheet';
```

❌ **Using Dialog for complex multi-field forms**
```tsx
// WRONG:
<Dialog>
  <Input /> <Input /> <Input />
  <Input /> <Input /> {/* Too many! */}
</Dialog>

// RIGHT:
<Sheet> {/* Mobile-friendly bottom sheet */}
  <SheetContent>
    {/* Form fields */}
  </SheetContent>
</Sheet>
```

---

## 🎨 VARIANT QUICK REF (VERIFIED)

| Variant | Color | When to Use | Verified In |
|---------|-------|-------------|-------------|
| `destructive` | Red | Delete, Remove, Irreversible | ConfirmActionDialog |
| `success` | Green | Accept offers, Confirmations | ConfirmActionDialog |
| `warning` | Amber | Pause, Caution, Reversible | ConfirmActionDialog |
| `info` | Blue | Informational, Neutral | ConfirmActionDialog |

---

## 🔧 TROUBLESHOOTING

**Dialog not showing?**
→ Check `open` prop is `true` and component is mounted

**ConfirmActionDialog buttons not showing?**
→ Check that `onConfirm` callback is provided in data object

**Sheet not sliding from bottom on mobile?**
→ Ensure Radix Sheet has `side="bottom"` prop (check MakeOfferSheet for reference)

**Validation not working in MakeOfferSheet?**
→ Real-time validation is built-in, just enter offer amount

**Dark mode colors wrong?**
→ All AS-IS components include `dark:` variants, ensure dark mode is enabled

---

## 📚 FULL DOCUMENTATION

For complete specifications, see:
- **Decision Tree:** `/CANONICAL_DECISION_TREE_v2.0.md` (📘 GUIDE)
- **Visual Reference:** `/CANONICAL_VISUAL_REFERENCE_v2.1_ASIS.md` (📘 GUIDE)
- **Migration Plan:** `/REPOINT_PLAN_v2.0.md` (📘 GUIDE)
- **Index:** `/P2_CANONICAL_SYSTEM_INDEX_v2.1.md` (📘 GUIDE)

---

## 🆘 STILL CONFUSED?

1. **Look at the actual component source code** (AS-IS = read the file)
2. Check the decision flowchart (Decision Tree Section D)
3. Look at similar existing usage in codebase (search for imports)
4. Ask in #frontend channel: "Which AS-IS component for [use case]?"

---

## 🔵 FROZEN_ASIS COMPONENTS (Verified)

These 3 components are verified by reading actual source code:

1. **ConfirmActionDialog** — `/components/action-center/ConfirmActionDialog.tsx`
   - Read source: ✅ Verified
   - 4 variants, details, consequences
   - Data object API + backward compat props

2. **ViewStatusDialog** — `/components/action-center/ViewStatusDialog.tsx`
   - Read source: ✅ Verified (in audit)
   - Pending status display
   - Info boxes, optional actions

3. **MakeOfferSheet** — `/components/sheets/MakeOfferSheet.tsx`
   - Read source: ✅ Verified
   - Complex form with validation
   - Product preview, suggested range, presets

**All other patterns are OBSERVED but not frozen** (exist, not verified line-by-line)

---

**Last Updated:** 2026-01-16  
**Status:** 📘 GUIDE (AS-IS Documentation)
