# P2 Canonical Closure Board

**Purpose:** Fast-lane governance for canonical view system  
**Goal:** Close P2 with Top 6 canonicals covering 80%+ action execution UX  
**Status:** AUDIT COMPLETE — Ready for repoint execution

---

## PASS 1 — Global Inventory Snapshot

Comprehensive inventory of ALL executors found in the prototype:

| Component | ViewType | Family | Status | Reuse Decision | Notes |
|-----------|----------|--------|--------|----------------|-------|
| **ConfirmActionDialog** | DIALOG | CONFIRM | CONFIRMED | REUSE | ✅ Canonical - Routes 30+ actions via GAM routing table |
| **CampaignApprovalSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Campaign approval with listing context |
| **CampaignRejectionSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Campaign rejection with reason required |
| **EventApprovalSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Event approval with listing context |
| **EventRejectionSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Event rejection with reason required |
| **ReportSheet** | SHEET | REPORT | CONFIRMED | REUSE | ✅ Canonical - Listing reports (product-detail) |
| **ReportGroupSheet** | SHEET | REPORT | CONFIRMED | REUSE | ✅ Canonical - Group reports (separate UI) |
| **MakeOfferSheet** | SHEET | OFFER | CONFIRMED | REUSE | ✅ Canonical - Make offers on listings |
| **ShareSheet** | SHEET | SHARE | CONFIRMED | REUSE | ✅ Canonical - Share listings (product-detail) |
| **ShareGroupSheet** | SHEET | SHARE | CONFIRMED | REUSE | ✅ Canonical - Share groups |
| **ShareToGroupSheet** | SHEET | SHARE | CONFIRMED | KEEP | Different: Share listing TO a group (pick group) |
| **AskQuestionSheet** | SHEET | REPLY_QA | CONFIRMED | REUSE | ✅ Canonical - Ask questions about listings |
| **ReplySheet** | SHEET | REPLY_QA | CONFIRMED | REUSE | ✅ Canonical - Reply to questions (action-center) |
| **PauseListingSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Pause listing with reason picker |
| **MarkAsSoldSheet** | SHEET | LIFECYCLE | CONFIRMED | REUSE | ✅ Canonical - Mark sold + choose buyer |
| **CounterOfferSheet** | SHEET | OFFER | CONFIRMED | REUSE | ✅ Canonical - Counter trade offers |
| **ManageOffersSheet** | SHEET | OFFER | CONFIRMED | KEEP | List view - shows all offers on a listing |
| **ViewStatusDialog** | DIALOG | STATUS | CONFIRMED | KEEP | View-only - shows listing status details |
| **RejectionReasonsDialog** | DIALOG | STATUS | CONFIRMED | KEEP | View-only - shows rejection reasons |
| **DealConfirmedDialog** | DIALOG | STATUS | CONFIRMED | KEEP | Celebration - offer accepted success |
| **TradeOfferConfirmDialog** | DIALOG | CONFIRM | PROPOSED | UNIFY | ⚠️ Merge into ConfirmActionDialog (trade variant) |
| **LeaveGroupDialog** | DIALOG | CONFIRM | PROPOSED | UNIFY | ⚠️ Already in GAM routing as 'leave-group' |
| **MuteNotificationsDialog** | DIALOG | CONFIRM | PROPOSED | TBD | Toggle action (out of scope?) |
| **AuthRequiredSheet** | SHEET | INLINE | CONFIRMED | KEEP | System-level - auth gate (unique) |
| **ProductAccessDeniedSheet** | SHEET | INLINE | CONFIRMED | KEEP | System-level - access control (unique) |
| **MenuSheet** | SHEET | PAGE | CONFIRMED | KEEP | Navigation - bottom sheet menu |
| **FilterSheet** | SHEET | INLINE | CONFIRMED | KEEP | Filtering UI (embedded view) |
| **SettingsSheet** | SHEET | PAGE | CONFIRMED | KEEP | Settings page as sheet |
| **ProductModal** | MODAL | PAGE | CONFIRMED | KEEP | Product detail in modal (desktop) |
| **LocationModal** | MODAL | INLINE | CONFIRMED | KEEP | Map picker for location |
| **ListingStatsModal** | MODAL | STATUS | CONFIRMED | KEEP | View-only - listing analytics |
| **SellerSheet** | SHEET | STATUS | CONFIRMED | KEEP | View-only - seller profile |
| **RatingSheet** | SHEET | REPLY_QA | CONFIRMED | KEEP | Rate seller after transaction |
| **ExploreGroupsSheet** | SHEET | PAGE | CONFIRMED | KEEP | Group discovery (lazy-loaded) |
| **TrailDetailSheet** | SHEET | STATUS | CONFIRMED | KEEP | View-only - trail details |
| **CreateEditCampaignSheet** | SHEET | LIFECYCLE | CONFIRMED | KEEP | Campaign CRUD |
| **CampaignSettingsSheet** | SHEET | LIFECYCLE | CONFIRMED | KEEP | Campaign settings |
| **EventHubSettingsSheet** | SHEET | LIFECYCLE | CONFIRMED | KEEP | Event hub settings |
| **CreateGroupSheet** | SHEET | LIFECYCLE | CONFIRMED | KEEP | Group creation wizard |
| **GroupFiltersSheetNew** | SHEET | INLINE | CONFIRMED | KEEP | Group filtering UI |
| **InviteContactsSheet** | SHEET | LIFECYCLE | CONFIRMED | KEEP | Group invite flow |
| **MakeOfferSheetChat** | SHEET | OFFER | DEPRECATED | REPLACE | ❌ Duplicate of MakeOfferSheet (chat context) |
| **MarkAsSoldSheetChat** | SHEET | LIFECYCLE | DEPRECATED | REPLACE | ❌ Duplicate of MarkAsSoldSheet (chat context) |
| **GlobalActionModal** (campaigns) | MODAL | CONFIRM | DEPRECATED | REPLACE | ❌ Legacy - replaced by GAM routing table |

**Total Executors:** 42  
**Canonical (Reuse):** 15  
**Keep (Unique):** 22  
**Deprecated/Unify:** 5  

---

## PASS 2 — Top 6 Canonical Pieces (P0)

These 6 pieces cover 80%+ of action execution UX:

### 1. ConfirmActionDialog (CONFIRM / DIALOG)

**Purpose:** Universal confirmation dialog for destructive/important actions

**Canonical Sections:**
- **Header:** Icon (variant-based) + Title + Description
- **Body:** Details list (key-value pairs) + Consequences section (bullet list)
- **Footer:** Cancel button + Confirm button (variant styling)

**Variants (as-is):**
- `destructive` (red) - Delete, remove, reject
- `warning` (orange) - Pause, archive
- `success` (green) - Approve, accept, resume
- `info` (blue) - Info actions, neutral confirms

**States (as-is):**
- Default: Buttons enabled
- Loading: Confirm button shows spinner, disabled
- Error: Toast shown, dialog stays open

**Microcopy Rules:**
- Title: Question format ("Delete Listing?")
- Description: Clear consequence ("This action cannot be undone")
- Confirm: Action verb ("Delete", "Approve", "Pause")
- Cancel: Always "Cancel"

**Mobile + Desktop:**
- Mobile: Full-width Dialog (AlertDialog primitive)
- Desktop: Centered Dialog with max-width
- Responsive: Same UI, scales naturally

**Routes (GAM):** 30+ actions (see routing-table.ts)

---

### 2. ReportSheet (REPORT / SHEET)

**Purpose:** Report listings for policy violations

**Canonical Sections:**
- **Header:** Title ("Report Listing") + Close button
- **Body:** Reason picker (radio list) + Optional comment textarea
- **Footer:** Cancel + Submit Report button (destructive/red)

**Variants (as-is):**
- Listing report (ReportSheet) - For products
- Group report (ReportGroupSheet) - For groups (separate component, similar structure)

**States (as-is):**
- Default: Submit disabled until reason selected
- Loading: Submit button spinner
- Success: Toast + sheet closes

**Microcopy Rules:**
- Title: "Report [Entity]"
- Reasons: Clear, non-judgmental policy categories
- Submit: "Submit Report"
- Success toast: "Report submitted. We'll review it soon."

**Mobile + Desktop:**
- Mobile: Bottom sheet (Sheet primitive)
- Desktop: Centered sheet/dialog
- Responsive: Single column layout

**Usage:** ProductDetailPage, GroupDetailPage

---

### 3. MakeOfferSheet (OFFER / SHEET)

**Purpose:** Make monetary or trade offers on listings

**Canonical Sections:**
- **Header:** Product context (image + title) + Close button
- **Body:** Offer type picker (Money/Trade) + Amount input OR Trade item picker + Optional message
- **Footer:** Cancel + Make Offer button (primary/blue)

**Variants (as-is):**
- Money offer: Price input field
- Trade offer: Item selector (user's listings)

**States (as-is):**
- Default: Make Offer disabled until valid offer entered
- Loading: Button spinner
- Success: Toast + sheet closes + chat opens

**Microcopy Rules:**
- Title: "Make an Offer"
- Money: "$" prefix, numeric input
- Trade: "Choose item to trade"
- Success toast: "Offer sent! 💌"

**Mobile + Desktop:**
- Mobile: Bottom sheet
- Desktop: Centered modal-like sheet
- Responsive: Single column, form layout

**Usage:** ChatConversationPage, ProductDetailPage

---

### 4. ShareSheet (SHARE / SHEET)

**Purpose:** Share listings via multiple channels

**Canonical Sections:**
- **Header:** Product context (image + title + price) + Close button
- **Body:** Share channels grid (WhatsApp, Facebook, Link, QR, etc.) + Optional message
- **Footer:** None (actions are inline in body)

**Variants (as-is):**
- Listing share (ShareSheet) - For products
- Group share (ShareGroupSheet) - For groups (similar structure)

**States (as-is):**
- Default: All channels enabled
- Copy link: Success feedback (checkmark icon)
- Success: Toast per channel

**Microcopy Rules:**
- Title: "Share Listing"
- Channels: Icon + Label (e.g., "WhatsApp", "Copy Link")
- Success toast: "Link copied!" or "Shared via [Channel]"

**Mobile + Desktop:**
- Mobile: Bottom sheet
- Desktop: Centered modal
- Responsive: Grid adapts (2 cols mobile, 3-4 cols desktop)

**Usage:** ProductDetailPage (floating button)

---

### 5. ReplySheet (REPLY_QA / SHEET)

**Purpose:** Reply to buyer questions about listings

**Canonical Sections:**
- **Header:** Question context (question text + asker + listing) + Close button
- **Body:** Answer textarea (required) + Character counter
- **Footer:** Cancel + Publish Answer button (primary/blue)

**Variants (as-is):**
- Single variant (reply to question)

**States (as-is):**
- Default: Publish disabled until answer entered
- Loading: Button spinner
- Success: Toast + sheet closes + answer published

**Microcopy Rules:**
- Title: "Reply to Question"
- Placeholder: "Write your answer..."
- Submit: "Publish Answer"
- Success toast: "Answer published successfully! 🎉"

**Mobile + Desktop:**
- Mobile: Bottom sheet
- Desktop: Centered modal
- Responsive: Single column, textarea expands

**Usage:** ActionCenterPage (Questions tab)

---

### 6. MarkAsSoldSheet (LIFECYCLE / SHEET)

**Purpose:** Mark listing as sold and choose buyer

**Canonical Sections:**
- **Header:** Listing context (image + title) + Close button
- **Body:** Buyer picker (list of users who made offers/asked questions) + Optional sale price
- **Footer:** Cancel + Mark as Sold button (success/green)

**Variants (as-is):**
- With offers: Show offerers with their offer amounts
- Without offers: Show interested users (question askers, chatters)

**States (as-is):**
- Default: Mark as Sold enabled (buyer optional)
- Loading: Button spinner
- Success: Toast + sheet closes + listing status updates

**Microcopy Rules:**
- Title: "Mark as Sold"
- Buyer label: "Who bought it?" (optional)
- Submit: "Mark as Sold"
- Success toast: "Listing marked as sold! 🎉"

**Mobile + Desktop:**
- Mobile: Bottom sheet
- Desktop: Centered modal
- Responsive: Single column, buyer list scrollable

**Usage:** ChatConversationPage, MyListingsPage

---

## PASS 3 — Mass Repoint Map

Repoint plan for NON-canonical executors:

### P0 — Blockers (Execute Now)

| Non-Canonical | Canonical Target | Action | Priority | Notes |
|---------------|------------------|--------|----------|-------|
| **GlobalActionModal** (campaigns) | ConfirmActionDialog + Sheets (GAM routing) | DELETE | P0 | ❌ Legacy - fully replaced by GAM routing table |
| **TradeOfferConfirmDialog** | ConfirmActionDialog | UNIFY | P0 | Merge into GAM routing as 'confirm-trade' variant |
| **LeaveGroupDialog** | ConfirmActionDialog | UNIFY | P0 | Already in GAM routing as 'leave-group' - delete duplicate |
| **MakeOfferSheetChat** | MakeOfferSheet | REPLACE | P0 | ❌ Duplicate - use canonical MakeOfferSheet everywhere |
| **MarkAsSoldSheetChat** | MarkAsSoldSheet | REPLACE | P0 | ❌ Duplicate - use canonical MarkAsSoldSheet everywhere |

### P1 — High Priority (Next Phase)

| Non-Canonical | Canonical Target | Action | Priority | Notes |
|---------------|------------------|--------|----------|-------|
| **CounterOfferSheet** | MakeOfferSheet variant | UNIFY | P1 | Consider merging as "Counter" mode in MakeOfferSheet |
| **AskQuestionSheet** | ReplySheet sibling | KEEP | P1 | Similar family, different direction (ask vs reply) |

### P2 — Later (Defer)

| Non-Canonical | Canonical Target | Action | Priority | Notes |
|---------------|------------------|--------|----------|-------|
| **MuteNotificationsDialog** | Toggle action (out of scope) | TBD | P2 | Not a confirm - toggle action, different pattern |
| **ManageOffersSheet** | List view (keep) | KEEP | P2 | Management UI, not action executor |
| **ViewStatusDialog** | Status viewer (keep) | KEEP | P2 | Read-only, not action executor |
| **RejectionReasonsDialog** | Status viewer (keep) | KEEP | P2 | Read-only, not action executor |
| **DealConfirmedDialog** | Celebration (keep) | KEEP | P2 | Success feedback, unique pattern |

### Keep As-Is (Unique/System/Page-level)

| Component | Reason | Priority | Notes |
|-----------|--------|----------|-------|
| **AuthRequiredSheet** | System-level auth gate | KEEP | Unique purpose, no duplication |
| **ProductAccessDeniedSheet** | System-level access control | KEEP | Unique purpose |
| **MenuSheet** | Navigation | KEEP | Page-level, not action executor |
| **FilterSheet** | Filtering UI | KEEP | Embedded view, not action executor |
| **SettingsSheet** | Settings page | KEEP | Page-level |
| **ProductModal** | Product detail modal | KEEP | Page-level (desktop) |
| **LocationModal** | Map picker | KEEP | Inline tool, not action executor |
| **ListingStatsModal** | Analytics viewer | KEEP | Read-only dashboard |
| **SellerSheet** | Profile viewer | KEEP | Read-only |
| **RatingSheet** | Rating flow | KEEP | Unique pattern (star rating + review) |
| **ExploreGroupsSheet** | Group discovery | KEEP | Page-level |
| **TrailDetailSheet** | Trail details | KEEP | Read-only viewer |
| **CreateEditCampaignSheet** | Campaign CRUD | KEEP | Form flow, not confirmation |
| **CampaignSettingsSheet** | Campaign settings | KEEP | Settings form |
| **EventHubSettingsSheet** | Event settings | KEEP | Settings form |
| **CreateGroupSheet** | Group creation | KEEP | Wizard flow |
| **GroupFiltersSheetNew** | Group filtering | KEEP | Filtering UI |
| **InviteContactsSheet** | Group invite | KEEP | Contact picker flow |
| **ShareToGroupSheet** | Share TO group | KEEP | Different: group picker, not share channels |
| **CampaignApprovalSheet** | Approval flow | KEEP | Specialized canonical (GAM routed) |
| **CampaignRejectionSheet** | Rejection flow | KEEP | Specialized canonical (GAM routed) |
| **EventApprovalSheet** | Approval flow | KEEP | Specialized canonical (GAM routed) |
| **EventRejectionSheet** | Rejection flow | KEEP | Specialized canonical (GAM routed) |
| **ReportGroupSheet** | Group reporting | KEEP | Sibling to ReportSheet (different entity) |
| **ShareGroupSheet** | Group sharing | KEEP | Sibling to ShareSheet (different entity) |

---

## Summary Statistics

**Total Executors Audited:** 42

**Top 6 Canonicals (P0 Coverage):**
1. ✅ ConfirmActionDialog - 30+ actions
2. ✅ ReportSheet - Listing/content reporting
3. ✅ MakeOfferSheet - Offers/trades
4. ✅ ShareSheet - Social sharing
5. ✅ ReplySheet - Q&A responses
6. ✅ MarkAsSoldSheet - Lifecycle completion

**Estimated Coverage:** ~85% of action execution UX

**Repoint Actions Required:**
- **Delete/Deprecate:** 5 components (P0)
- **Unify/Merge:** 2 components (P1)
- **Keep Unique:** 29 components
- **Already Canonical:** 6 components

---

## Next Steps

1. ✅ **P0 Deletions (BLOCKED by runtime gate):**
   - Delete `/components/campaigns/GlobalActionModal.tsx` (after runtime verification PASS)
   - Remove barrel exports

2. **P0 Unifications (Next):**
   - Unify TradeOfferConfirmDialog into ConfirmActionDialog (GAM routing)
   - Unify LeaveGroupDialog into ConfirmActionDialog (already in routing, remove duplicate)
   - Replace MakeOfferSheetChat → MakeOfferSheet (everywhere)
   - Replace MarkAsSoldSheetChat → MarkAsSoldSheet (everywhere)

3. **P1 Evaluations (Future):**
   - Evaluate CounterOfferSheet merge with MakeOfferSheet
   - Document AskQuestionSheet + ReplySheet as sibling canonicals

4. **Documentation:**
   - Mark P2 stage as CLOSED after P0 deletions complete
   - Update component index with canonical designations
   - Create reuse guidelines for Top 6 canonicals

---

## Design Governance

**Canonical Designation Rules:**
1. **REUSE** = Must use this component for this family of actions
2. **KEEP** = Unique purpose, do not duplicate
3. **UNIFY** = Merge into canonical, delete afterward
4. **REPLACE** = Delete entirely, use canonical instead
5. **TBD** = Needs design review before decision

**No new executors without:**
- Proof that no canonical fits
- Design review approval
- Documentation of unique purpose

---

**Status:** ✅ AUDIT COMPLETE  
**Blocker:** Runtime verification gate for GlobalActionModal deletion  
**Ready For:** P0 repoint execution after gate passes
