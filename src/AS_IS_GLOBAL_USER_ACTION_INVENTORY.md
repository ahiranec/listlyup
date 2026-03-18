# 📊 AS-IS GLOBAL USER ACTION INVENTORY (TOTAL SYSTEM)

**Auditor**: UX + Product Auditor Senior  
**Fecha**: Enero 2026  
**Sistema**: ListlyUp v1.0  
**Modo**: READ-ONLY / EXHAUSTIVE INVENTORY  
**Scope**: TODO el sistema (visible + implícito)

---

## TABLA PRINCIPAL — GLOBAL USER ACTION INVENTORY

| # | Action Label | Surface / Screen | UI Element Type | User Intent Observable | Feedback Visible | ¿Cambia Estado? | ¿Es Navegación? | Condiciones | Notas Ambigüedad/Duplicación | Clasificación Preliminar |
|---|-------------|------------------|-----------------|----------------------|------------------|----------------|----------------|-------------|----------------------------|------------------------|
| **AUTENTICACIÓN** |
| 1 | Sign In | SignInPage | Button (submit) | Authenticate with credentials | Loading state → Navigate to Home | Sí (auth state) | Sí | Email + password required | | STATE_CHANGE + NAVIGATION |
| 2 | (Show/Hide Password) | SignInPage / Password field | Toggle button (eye icon) | Toggle password visibility | Password field type changes | Sí (local UI) | No | | | STATE_CHANGE |
| 3 | Forgot password? | SignInPage / Below password | Link | Request password reset | Navigate to password reset flow | No | Sí | | | NAVIGATION |
| 4 | Sign in with Google | SignInPage | Button (social) | Authenticate with Google OAuth | Loading → Navigate to Home | Sí (auth state) | Sí | | | STATE_CHANGE + NAVIGATION |
| 5 | Sign in with Apple | SignInPage | Button (social) | Authenticate with Apple ID | Loading → Navigate to Home | Sí (auth state) | Sí | | | STATE_CHANGE + NAVIGATION |
| 6 | Sign in with Facebook | SignInPage | Button (social) | Authenticate with Facebook | Loading → Navigate to Home | Sí (auth state) | Sí | | | STATE_CHANGE + NAVIGATION |
| 7 | Sign Up | SignInPage / Bottom link | Link | Create new account | Navigate to SignUpPage | No | Sí | | | NAVIGATION |
| 8 | (Back from Sign In) | SignInPage / Header | Button (icon) | Cancel authentication | Navigate to previous view | No | Sí | | | NAVIGATION |
| 9 | Create Account | SignUpPage | Button (submit) | Register new user | Loading → Navigate to Home | Sí (auth state) | Sí | Form validation required | | STATE_CHANGE + NAVIGATION |
| 10 | Sign Out | MenuSheet / Bottom | Button | Log out from account | Clear session → Navigate to Home | Sí (auth state) | Sí | Only if authenticated | | STATE_CHANGE + NAVIGATION |
| **HOME / EXPLORE** |
| 11 | (Scroll down) | Home / Product grid | Gesture (scroll) | Browse more products | Load more products if needed | Sí (viewport) | No | | Implicit action | EXPLORATION |
| 12 | (Search input) | Home / Search bar | Input (text) | Search products by keyword | Update visible products | Sí (filter state) | No | | | EXPLORATION |
| 13 | (Clear search) | Home / Search bar | Button (X icon) | Clear search query | Reset search → Show all products | Sí (filter state) | No | Only if search has value | | EXPLORATION |
| 14 | Advanced Filters | Home / Search bar | Button | Open filter panel | Open FilterSheet | Sí (UI state) | No | | | EXPLORATION |
| 15 | Toggle Map View | Home / Search bar | Button | Switch to map visualization | Navigate to MapView | No | Sí | | | NAVIGATION |
| 16 | (Click product card) | Home / Product grid | Card click | View listing details | Navigate to ProductDetailPage | No | Sí | | | NAVIGATION |
| 17 | (Like button on card) | Home / ProductCard | Toggle button (heart) | Save to favorites | Heart fills + Toast feedback | Sí (saved state) | No | Auth required | Optimistic update | STATE_CHANGE |
| 18 | (Quick actions on card) | Home / ProductCard | Menu (⋯) | Access card actions | Open quick actions menu | Sí (UI state) | No | | Not currently visible in ProductCard | EXPLORATION |
| 19 | Apply Filters | FilterSheet | Button (primary) | Apply selected filters | Close sheet + Update products | Sí (filter state) | No | | | EXPLORATION |
| 20 | Clear All Filters | FilterSheet | Link | Reset all filters | Reset filter state | Sí (filter state) | No | | | EXPLORATION |
| 21 | (Close filter sheet) | FilterSheet | Button (X) / Gesture | Cancel filter editing | Close sheet without saving | Sí (UI state) | No | | | EXPLORATION |
| 22 | (Select filter option) | FilterSheet / Section | Checkbox / Radio | Toggle filter criterion | Visual selection feedback | Sí (filter state) | No | | Multiple filter types (Category, Price, Condition, etc.) | EXPLORATION |
| 23 | (Expand filter section) | FilterSheet | Accordion trigger | View section options | Expand/collapse section | Sí (UI state) | No | | | EXPLORATION |
| 24 | Load More | Home / Bottom of grid | Button / Implicit | Load next page of products | Append products to grid | Sí (product list) | No | Conditional (if more products) | Infinite scroll pattern | EXPLORATION |
| **MAP VIEW** |
| 25 | (Back to List View) | MapView / Search bar | Button | Exit map view | Navigate to Home (list view) | No | Sí | | | NAVIGATION |
| 26 | Zoom In | MapView / Controls | Button (+) | Zoom into map | Map zoom increases | Sí (map state) | No | | Not implemented (placeholder) | EXPLORATION |
| 27 | Zoom Out | MapView / Controls | Button (-) | Zoom out of map | Map zoom decreases | Sí (map state) | No | | Not implemented (placeholder) | EXPLORATION |
| 28 | (Click map pin) | MapView | Pin click | View listing on map | Open MapPinCard overlay | Sí (UI state) | No | | | EXPLORATION |
| 29 | (Click pin card) | MapView / MapPinCard | Card click | View listing details | Navigate to ProductDetailPage | No | Sí | | | NAVIGATION |
| 30 | (Pan/Drag map) | MapView | Gesture (drag) | Navigate map area | Map viewport changes | Sí (map state) | No | | Implicit, not implemented | EXPLORATION |
| 31 | (Close pin card) | MapView / MapPinCard | Button (X) | Deselect pin | Close overlay card | Sí (UI state) | No | | | EXPLORATION |
| **LISTING DETAIL (Visitor)** |
| 32 | (Back) | Listing Detail / Header | Button (arrow) | Exit listing detail | Navigate to previous view | No | Sí | | | NAVIGATION |
| 33 | Save | Listing Detail / Header | Toggle (heart) | Save to favorites | Heart fills + Toast | Sí (saved state) | No | Auth required | Optimistic update | STATE_CHANGE |
| 34 | Share | Listing Detail / Header (⋯) | Menu item | Share listing | Open ShareSheet | Sí (UI state) | No | | | COMMUNICATION |
| 35 | Report | Listing Detail / Header (⋯) | Menu item | Report inappropriate content | Open ReportSheet | Sí (UI state) | No | | | COMMUNICATION |
| 36 | Message Seller | Listing Detail / Footer | Button (primary) | Contact seller privately | Navigate to Chat | No | Sí | Auth required | | COMMUNICATION + NAVIGATION |
| 37 | WhatsApp | Listing Detail / Footer | Button | Contact via WhatsApp | Open WhatsApp external | No | Sí | Conditional (contactModes) | External app | COMMUNICATION + NAVIGATION |
| 38 | Call | Listing Detail / Footer | Button | Contact via phone | Open phone dialer | No | Sí | Conditional (contactModes) | External app | COMMUNICATION + NAVIGATION |
| 39 | Make Offer | Listing Detail / Footer | Button | Propose trade/price offer | Open MakeOfferSheet | Sí (UI state) | No | Auth required, type ≠ free | | COMMUNICATION |
| 40 | Ask Question | Listing Detail / Footer | Button | Ask public question | Open AskQuestionSheet | Sí (UI state) | No | Auth required | | COMMUNICATION |
| 41 | View Profile | Listing Detail / Seller card | Link | View seller profile | Open SellerSheet | Sí (UI state) | No | | | EXPLORATION |
| 42 | (Sort Q&A: Recent) | Listing Detail / Q&A | Toggle | Sort by recency | Re-order questions | Sí (sort state) | No | | | EXPLORATION |
| 43 | (Sort Q&A: Helpful) | Listing Detail / Q&A | Toggle | Sort by helpfulness | Re-order questions | Sí (sort state) | No | | | EXPLORATION |
| 44 | (Expand description) | Listing Detail / Description | Button / Toggle | Read full description | Expand text area | Sí (UI state) | No | Conditional (long text) | | EXPLORATION |
| 45 | (Navigate carousel) | Listing Detail / ImageCarousel | Swipe / Dots | View other images | Change active image | Sí (carousel state) | No | | | EXPLORATION |
| 46 | (Open location modal) | Listing Detail / Location | Button | View location details | Open LocationModal | Sí (UI state) | No | | | EXPLORATION |
| **LISTING DETAIL (Owner)** |
| 47 | Edit | Listing Detail / Footer | Button | Edit listing content | Navigate to PublishFlow (edit) | No | Sí | Owner only | | NAVIGATION |
| 48 | Pause | Listing Detail / Footer | Button | Pause listing visibility | Open PauseListingSheet | Sí (UI state) | No | Owner only | | STATE_CHANGE |
| 49 | View Stats | Listing Detail / Footer | Button | View analytics | Open ListingStatsModal | Sí (UI state) | No | Owner only | | EXPLORATION |
| 50 | Duplicate | Listing Detail / Footer | Button | Create copy of listing | Navigate to PublishFlow (duplicate) | No | Sí | Owner only | | NAVIGATION |
| 51 | Mark as Sold | Listing Detail / Footer | Button | Mark item sold | Open MarkAsSoldSheet | Sí (UI state) | No | Owner only, product type | | STATE_CHANGE |
| 52 | Delete | Listing Detail / Footer | Button (destructive) | Delete listing permanently | Open ConfirmActionDialog | Sí (UI state) | No | Owner only | | STATE_CHANGE |
| 53 | Reply (Owner Messages) | Listing Detail / Owner section | Button | Reply to private message | Open ReplySheet | Sí (UI state) | No | Owner only | | COMMUNICATION |
| 54 | Answer (Q&A) | Listing Detail / Q&A | Button | Answer public question | Open ReplySheet | Sí (UI state) | No | Owner only, unanswered | | COMMUNICATION |
| 55 | Edit Answer | Listing Detail / Q&A | Button | Edit existing answer | Open ReplySheet (edit mode) | Sí (UI state) | No | Owner only, answered | NOT in Action Table | COMMUNICATION |
| **MY LISTINGS** |
| 56 | New Listing | My Listings / Header | Button (+) | Create new listing | Navigate to PublishFlow (create) | No | Sí | | | NAVIGATION |
| 57 | (Filter tab: All) | My Listings / Tabs | Tab button | View all listings | Switch to All tab | Sí (tab state) | No | | | EXPLORATION |
| 58 | (Filter tab: Messages) | My Listings / Tabs | Tab button | View listings with messages | Switch to Messages tab | Sí (tab state) | No | | | EXPLORATION |
| 59 | (Filter tab: Reported) | My Listings / Tabs | Tab button | View reported listings | Switch to Reported tab | Sí (tab state) | No | | | EXPLORATION |
| 60 | (Filter tab: Expiring) | My Listings / Tabs | Tab button | View expiring listings | Switch to Expiring tab | Sí (tab state) | No | | | EXPLORATION |
| 61 | (Click listing card) | My Listings | Card click | View listing details | Navigate to ProductDetailPage | No | Sí | | | NAVIGATION |
| 62 | (Select for bulk) | My Listings / Card | Checkbox | Add to bulk selection | Visual selection | Sí (selection state) | No | | | EXPLORATION |
| 63 | Select All | My Listings / Above list | Checkbox | Select all visible listings | Toggle all checkboxes | Sí (selection state) | No | | | EXPLORATION |
| 64 | Edit (Menu) | My Listings / Card (⋯) | Menu item | Edit listing | Navigate to PublishFlow (edit) | No | Sí | | | NAVIGATION |
| 65 | Share (Menu) | My Listings / Card (⋯) | Menu item | Share listing | Open ShareSheet | Sí (UI state) | No | | | COMMUNICATION |
| 66 | Duplicate (Menu) | My Listings / Card (⋯) | Menu item | Duplicate listing | Navigate to PublishFlow (duplicate) | No | Sí | | | NAVIGATION |
| 67 | Pause (Menu) | My Listings / Card (⋯) | Menu item | Pause listing | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 68 | Renew (Menu) | My Listings / Card (⋯) | Menu item | Renew expiring listing | Open ConfirmActionDialog | Sí (UI state) | No | Conditional (product/service) | | STATE_CHANGE |
| 69 | Mark as Sold (Menu) | My Listings / Card (⋯) | Menu item | Mark item sold | Open MarkAsSoldSheet | Sí (UI state) | No | Conditional (product only) | | STATE_CHANGE |
| 70 | Delete (Menu) | My Listings / Card (⋯) | Menu item (destructive) | Delete listing | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 71 | Open Chat (Messages Tab) | My Listings / Card (⋯) | Menu item (primary) | Open conversation | Navigate to ChatConversationPage | No | Sí | Tab: Messages, messageType = chat | Duplicado semántico: "Message Seller" | COMMUNICATION + NAVIGATION |
| 72 | Respond (Messages Tab) | My Listings / Card (⋯) | Menu item (primary) | Respond to question | Open ReplySheet | Sí (UI state) | No | Tab: Messages, messageType = question | Duplicado semántico: "Answer" | COMMUNICATION |
| 73 | Review Report (Reported Tab) | My Listings / Card (⋯) | Menu item (primary) | View report details | Navigate to Report Detail | No | Sí | Tab: Reported | ⚠️ DEAD CLICK (not implemented) | NAVIGATION |
| 74 | Bulk Edit | My Listings / Bulk toolbar | Button | Edit multiple listings | Bulk edit action | Sí (listings state) | No | Multi-select active | Not fully implemented | STATE_CHANGE |
| 75 | Bulk Delete | My Listings / Bulk toolbar | Button | Delete multiple listings | Open ConfirmActionDialog | Sí (UI state) | No | Multi-select active | | STATE_CHANGE |
| 76 | Bulk Pause | My Listings / Bulk toolbar | Button | Pause multiple listings | Open ConfirmActionDialog | Sí (UI state) | No | Multi-select active | | STATE_CHANGE |
| **ACTION CENTER** |
| 77 | (Back) | Action Center / Header | Button | Exit Action Center | Navigate to previous view | No | Sí | | | NAVIGATION |
| 78 | Settings | Action Center / Header | Button (icon) | Open settings | Navigate to Settings | No | Sí | | | NAVIGATION |
| 79 | Notifications | Action Center / Header | Button (icon + badge) | Open notifications | Navigate to NotificationsPage | No | Sí | | | NAVIGATION |
| 80 | (Tab: Personal) | Action Center / Tabs | Tab button | View personal actions | Switch to Personal tab | Sí (tab state) | No | | | EXPLORATION |
| 81 | (Tab: Campaigns) | Action Center / Tabs | Tab button | View campaign actions | Switch to Campaigns tab | Sí (tab state) | No | | | EXPLORATION |
| 82 | (Tab: Events) | Action Center / Tabs | Tab button | View event actions | Switch to Events tab | Sí (tab state) | No | | | EXPLORATION |
| 83 | (Tab: Groups) | Action Center / Tabs | Tab button | View group moderation | Switch to Groups tab | Sí (tab state) | No | Conditional (groupAdminOrMod) | | EXPLORATION |
| 84 | (Tab: Admin) | Action Center / Tabs | Tab button | View platform admin | Switch to Admin tab | Sí (tab state) | No | Conditional (platformAdmin) | | EXPLORATION |
| 85 | Reply (Message) | Action Center / MessageCard | Button | Reply to message | Open ReplySheet | Sí (UI state) | No | | | COMMUNICATION |
| 86 | Answer (Question) | Action Center / QuestionCard | Button | Answer question | Open ReplySheet | Sí (UI state) | No | | Naming: ≠ "Respond" | COMMUNICATION |
| 87 | Accept (Trade) | Action Center / TradeOfferCard | Button (primary) | Accept trade offer | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 88 | Counter (Trade) | Action Center / TradeOfferCard | Button | Counter offer | Open CounterOfferSheet | Sí (UI state) | No | | | COMMUNICATION |
| 89 | Decline (Trade) | Action Center / TradeOfferCard | Button | Decline trade offer | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 90 | Continue (Draft) | Action Center / ListingActionCard | Button | Continue editing draft | Navigate to PublishFlow | No | Sí | Status: draft | NOT in Action Table | NAVIGATION |
| 91 | Renew (Expiring) | Action Center / ListingActionCard | Button (primary) | Renew expiring listing | Open ConfirmActionDialog | Sí (UI state) | No | Status: expiring | | STATE_CHANGE |
| 92 | Edit First (Expiring) | Action Center / ListingActionCard | Button (secondary) | Edit before renewing | Navigate to PublishFlow (edit) | No | Sí | Status: expiring | Naming: ≠ "Edit" | NAVIGATION |
| 93 | Resume (Paused) | Action Center / ListingActionCard | Button | Resume paused listing | Open ConfirmActionDialog | Sí (UI state) | No | Status: paused | | STATE_CHANGE |
| 94 | View Status (Pending) | Action Center / ListingActionCard | Button | View pending reason | Open ViewStatusDialog | Sí (UI state) | No | Status: pending | | EXPLORATION |
| 95 | Edit & Resubmit (Rejected) | Action Center / ListingActionCard | Button (primary) | Edit rejected listing | Navigate to PublishFlow (edit) | No | Sí | Status: rejected | NOT in Action Table | NAVIGATION |
| 96 | Details (Rejected) | Action Center / ListingActionCard | Button (secondary) | View rejection reasons | Open RejectionReasonsDialog | Sí (UI state) | No | Status: rejected | | EXPLORATION |
| 97 | Delete (Listing Action) | Action Center / ListingActionCard | Button (secondary/ghost) | Delete listing | Open ConfirmActionDialog | Sí (UI state) | No | Status: draft/paused | | STATE_CHANGE |
| 98 | Approve (Campaign Request) | Action Center / CampaignRequestCard | Button (primary) | Approve campaign request | Open CampaignApprovalSheet via GAM | Sí (UI state) | No | Owner of campaign | | STATE_CHANGE |
| 99 | Reject (Campaign Request) | Action Center / CampaignRequestCard | Button (secondary) | Reject campaign request | Open CampaignRejectionSheet via GAM | Sí (UI state) | No | Owner of campaign | | STATE_CHANGE |
| 100 | View Details (Campaign) | Action Center / CampaignRequestCard | Link | View listing details | Navigate to Listing Detail | No | Sí | | Naming: generic | NAVIGATION |
| 101 | Approve (Event Request) | Action Center / EventRequestCard | Button (primary) | Approve event request | Open EventApprovalSheet via GAM | Sí (UI state) | No | Owner of event hub | | STATE_CHANGE |
| 102 | Reject (Event Request) | Action Center / EventRequestCard | Button (secondary) | Reject event request | Open EventRejectionSheet via GAM | Sí (UI state) | No | Owner of event hub | | STATE_CHANGE |
| 103 | View Details (Event) | Action Center / EventRequestCard | Link | View listing details | Navigate to Listing Detail | No | Sí | | Naming: generic | NAVIGATION |
| 104 | Approve (Join Request) | Action Center / JoinRequestCard | Button (primary) | Approve group join | Open ConfirmActionDialog via GAM | Sí (UI state) | No | Group moderator/admin | | STATE_CHANGE |
| 105 | Decline (Join Request) | Action Center / JoinRequestCard | Button (secondary) | Decline group join | Open ConfirmActionDialog via GAM | Sí (UI state) | No | Group moderator/admin | | STATE_CHANGE |
| 106 | Review (Report) | Action Center / ReportCard | Button (primary) | Review group report | Navigate to Report Detail | No | Sí | | ⚠️ DEAD CLICK (not implemented) | NAVIGATION |
| 107 | Take Action (Report) | Action Center / ReportCard | Button (secondary) | Moderate reported content | Open ReportActionSheet | Sí (UI state) | No | | | STATE_CHANGE |
| 108 | Dismiss (Report) | Action Center / ReportCard | Button (tertiary) | Dismiss report | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 109 | Review (Platform Report) | Action Center / PlatformReportCard | Button (primary) | Review platform report | Navigate to Platform Report Detail | No | Sí | Platform admin | ⚠️ DEAD CLICK (not implemented) | NAVIGATION |
| 110 | Take Action (Platform Report) | Action Center / PlatformReportCard | Button (secondary) | Moderate platform content | Open ReportActionSheet | Sí (UI state) | No | Platform admin | | STATE_CHANGE |
| 111 | Dismiss (Platform Report) | Action Center / PlatformReportCard | Button (tertiary) | Dismiss platform report | Open ConfirmActionDialog | Sí (UI state) | No | Platform admin | | STATE_CHANGE |
| 112 | Review Listing (Flagged) | Action Center / FlaggedListingCard | Button (primary) | Review flagged listing | Navigate to Listing Detail (Admin) | No | Sí | Platform admin | ⚠️ DEAD CLICK (not implemented) | NAVIGATION |
| 113 | Approve (Flagged) | Action Center / FlaggedListingCard | Button (secondary) | Approve flagged listing | Open ConfirmActionDialog via GAM | Sí (UI state) | No | Platform admin | | STATE_CHANGE |
| 114 | Remove (Flagged) | Action Center / FlaggedListingCard | Button (tertiary, destructive) | Remove flagged listing | Open ConfirmActionDialog via GAM | Sí (UI state) | No | Platform admin | | STATE_CHANGE |
| 115 | Review Issue (User) | Action Center / UserIssueCard | Button (primary) | Review user issue | Open User Issue Detail Sheet | Sí (UI state) | No | Platform admin | ⚠️ DEAD CLICK (not implemented) | EXPLORATION |
| 116 | Contact User (Admin) | Action Center / UserIssueCard | Button (secondary) | Contact user as admin | Navigate to Admin Chat | No | Sí | Platform admin | | COMMUNICATION + NAVIGATION |
| **PUBLISH / EDIT LISTING FLOW** |
| 117 | Close (Flow) | PublishFlow / Header | Button (X) | Cancel publish/edit | Navigate to previous view | No | Sí | Confirmation if changes | | NAVIGATION |
| 118 | (Select listing type) | PublishFlow / Step 1 | Radio selection | Choose listing category | Update type state | Sí (form state) | No | Create mode only | | EXPLORATION |
| 119 | (Upload images) | PublishFlow / Step 1 | File input | Add listing images | Preview images + Update state | Sí (media state) | No | | | STATE_CHANGE |
| 120 | (Remove image) | PublishFlow / Step 1 | Button (X on preview) | Remove uploaded image | Remove from preview | Sí (media state) | No | | | STATE_CHANGE |
| 121 | (Reorder images) | PublishFlow / Step 1 | Drag gesture | Change image order | Visual reorder | Sí (media state) | No | | | STATE_CHANGE |
| 122 | Next (Media → Basic Info) | PublishFlow / Step 1 | Button (primary) | Proceed to next step | Navigate to Step 2 | Sí (step state) | No | ≥1 image required | | NAVIGATION |
| 123 | Save Draft (Media) | PublishFlow / Step 1 | Button (secondary) | Save as draft | Save draft → Navigate to Home | Sí (draft state) | Sí | Create mode only | | STATE_CHANGE + NAVIGATION |
| 124 | Back (Basic Info → Media) | PublishFlow / Step 2 | Button (secondary) | Return to previous step | Navigate to Step 1 | Sí (step state) | No | | | NAVIGATION |
| 125 | Next (Basic Info → Location) | PublishFlow / Step 2 | Button (primary) | Proceed to next step | Navigate to Step 3 | Sí (step state) | No | Form validation | | NAVIGATION |
| 126 | (Input title/description) | PublishFlow / Step 2 | Text input | Describe listing | Update form state | Sí (form state) | No | | | STATE_CHANGE |
| 127 | (Select category) | PublishFlow / Step 2 | Dropdown | Categorize listing | Update category state | Sí (form state) | No | | | EXPLORATION |
| 128 | (Select condition) | PublishFlow / Step 2 | Radio group | Specify item condition | Update condition state | Sí (form state) | No | | | EXPLORATION |
| 129 | Back (Location → Basic Info) | PublishFlow / Step 3 | Button (secondary) | Return to previous step | Navigate to Step 2 | Sí (step state) | No | | | NAVIGATION |
| 130 | Next (Location → Pricing) | PublishFlow / Step 3 | Button (primary) | Proceed to next step | Navigate to Step 4 | Sí (step state) | No | Location required | | NAVIGATION |
| 131 | (Input location) | PublishFlow / Step 3 | Autocomplete input | Set listing location | Update location state | Sí (form state) | No | | | STATE_CHANGE |
| 132 | (Select location precision) | PublishFlow / Step 3 | Radio group | Set privacy level | Update precision state | Sí (form state) | No | | | EXPLORATION |
| 133 | Back (Pricing → Location) | PublishFlow / Step 4 | Button (secondary) | Return to previous step | Navigate to Step 3 | Sí (step state) | No | | | NAVIGATION |
| 134 | Next (Pricing → Preview) | PublishFlow / Step 4 | Button (primary) | Proceed to preview | Navigate to Step 5 | Sí (step state) | No | Price/offer mode required | | NAVIGATION |
| 135 | (Input price) | PublishFlow / Step 4 | Number input | Set item price | Update price state | Sí (form state) | No | | | STATE_CHANGE |
| 136 | (Select offer mode) | PublishFlow / Step 4 | Checkbox group | Set selling modes | Update offer modes | Sí (form state) | No | | | EXPLORATION |
| 137 | (Select delivery options) | PublishFlow / Step 4 | Checkbox group | Set delivery methods | Update delivery state | Sí (form state) | No | | | EXPLORATION |
| 138 | (Select visibility/groups) | PublishFlow / Step 4 | Checkbox group | Choose who can see | Update visibility state | Sí (form state) | No | | | EXPLORATION |
| 139 | Back (Preview → Pricing) | PublishFlow / Step 5 | Button (secondary) | Return to previous step | Navigate to Step 4 | Sí (step state) | No | | | NAVIGATION |
| 140 | Publish Now | PublishFlow / Step 5 | Button (primary, green) | Publish listing live | Create listing → Navigate to Home | Sí (listing created) | Sí | Create mode only | | STATE_CHANGE + NAVIGATION |
| 141 | Save Changes | PublishFlow / Step 5 | Button (primary, blue) | Save edits to listing | Update listing → Navigate to Home | Sí (listing updated) | Sí | Edit mode only | | STATE_CHANGE + NAVIGATION |
| 142 | Save as Draft | PublishFlow / Step 5 | Button (secondary) | Save without publishing | Save draft → Navigate to Home | Sí (draft state) | Sí | | Naming: ≠ "Save Draft" (Step 1) | STATE_CHANGE + NAVIGATION |
| 143 | Edit (step name) | PublishFlow / Step 5 | Link (on preview sections) | Jump to specific step | Navigate to step N | Sí (step state) | No | Edit mode only | | NAVIGATION |
| **GROUPS** |
| 144 | (Back from Groups) | Groups / Header | Button | Exit groups view | Navigate to previous view | No | Sí | | | NAVIGATION |
| 145 | Explore Groups | Groups / Header | Button | Browse all groups | Open ExploreGroupsSheet | Sí (UI state) | No | | | EXPLORATION |
| 146 | Create Group | Groups / FAB | Button (floating +) | Start group creation | Open CreateGroupWizard | Sí (UI state) | No | | | STATE_CHANGE |
| 147 | (Filter groups) | Groups / Search bar | Input | Search groups by keyword | Update visible groups | Sí (filter state) | No | | | EXPLORATION |
| 148 | (Select group card) | Groups / Grid | Card click | View group details | Navigate to GroupDetailPage | No | Sí | | | NAVIGATION |
| 149 | Share (Group) | Groups / Card (⋯) | Menu item | Share group | Open ShareGroupSheet | Sí (UI state) | No | | | COMMUNICATION |
| 150 | Mute (Group) | Groups / Card (⋯) | Menu item | Mute notifications | Open MuteNotificationsDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 151 | Leave (Group) | Groups / Card (⋯) | Menu item (destructive) | Leave group | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 152 | (Tab: All) | Groups / Tabs | Tab button | View all groups | Switch to All tab | Sí (tab state) | No | | | EXPLORATION |
| 153 | (Tab: Admin) | Groups / Tabs | Tab button | View administered groups | Switch to Admin tab | Sí (tab state) | No | | | EXPLORATION |
| 154 | (Tab: Member) | Groups / Tabs | Tab button | View joined groups | Switch to Member tab | Sí (tab state) | No | | | EXPLORATION |
| **GROUP DETAIL** |
| 155 | (Back from Group Detail) | Group Detail / Header | Button | Exit group detail | Navigate to Groups | No | Sí | | | NAVIGATION |
| 156 | Join Group | Group Detail / Hero (Visitor) | Button (primary) | Join public group | Open JoinGroupFlow | Sí (UI state) | No | Public, visitor | | STATE_CHANGE |
| 157 | Request to Join | Group Detail / Hero (Visitor) | Button (primary) | Request join (private) | Open JoinRequestFlow | Sí (UI state) | No | Private, visitor | | STATE_CHANGE |
| 158 | Request Invitation | Group Detail / Hero (Visitor) | Button (primary) | Request invitation (ultra private) | Open InviteRequestSheet | Sí (UI state) | No | Ultra private, visitor | | STATE_CHANGE |
| 159 | Cancel Request | Group Detail / Banner (Pending) | Button | Cancel pending request | Open ConfirmActionDialog | Sí (UI state) | No | Pending status | | STATE_CHANGE |
| 160 | Share (Group Detail) | Group Detail / Header (⋯) | Menu item | Share group | Open ShareGroupSheet | Sí (UI state) | No | | | COMMUNICATION |
| 161 | Report Group | Group Detail / Header (⋯) | Menu item | Report group | Open ReportGroupSheet | Sí (UI state) | No | | | COMMUNICATION |
| 162 | Leave Group (Member) | Group Detail / Header (⋯) | Menu item (destructive) | Leave group | Open ConfirmActionDialog | Sí (UI state) | No | Member | | STATE_CHANGE |
| 163 | Invite Members | Group Detail / Header (⋯) | Menu item | Invite contacts | Open InviteToGroupSheet | Sí (UI state) | No | Conditional (canInvite) | | COMMUNICATION |
| 164 | Mute Notifications (Member) | Group Detail / Header (⋯) | Menu item | Mute group notifications | Open MuteNotificationsDialog | Sí (UI state) | No | Member | | STATE_CHANGE |
| 165 | Publish to Group | Group Detail / FAB | Button (floating) | Create listing in group | Navigate to PublishFlow with groupId | No | Sí | Conditional (canPost) | | NAVIGATION |
| 166 | (Tab: About) | Group Detail / Tabs | Tab button | View group info | Switch to About tab | Sí (tab state) | No | Member | | EXPLORATION |
| 167 | (Tab: Products) | Group Detail / Tabs | Tab button | View group listings | Switch to Products tab | Sí (tab state) | No | Member | | EXPLORATION |
| 168 | (Tab: Members) | Group Detail / Tabs | Tab button | View group members | Switch to Members tab | Sí (tab state) | No | Member | | EXPLORATION |
| 169 | (Tab: Pending) | Group Detail / Tabs | Tab button | View pending requests | Switch to Pending tab | Sí (tab state) | No | Moderator/Admin | | EXPLORATION |
| 170 | (Tab: Settings) | Group Detail / Tabs | Tab button | Manage group settings | Switch to Settings tab | Sí (tab state) | No | Admin | | EXPLORATION |
| 171 | Message (Member) | Group Detail / Member card (⋯) | Menu item | Message member | Navigate to Chat | No | Sí | | | COMMUNICATION + NAVIGATION |
| 172 | Report Member | Group Detail / Member card (⋯) | Menu item | Report member | Open ReportMemberSheet | Sí (UI state) | No | | | COMMUNICATION |
| 173 | Change Role | Group Detail / Member card (⋯) | Menu item | Change member role | Open ChangeRoleSheet | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 174 | Remove Member | Group Detail / Member card (⋯) | Menu item (destructive) | Remove member | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 175 | Hide Listing (Mod) | Group Detail / Listing card (⋯) | Menu item | Hide listing temporarily | Open ConfirmActionDialog | Sí (UI state) | No | Moderator | | STATE_CHANGE |
| 176 | Remove Listing (Mod) | Group Detail / Listing card (⋯) | Menu item (destructive) | Remove listing permanently | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | Naming: ≠ "Delete Listing" | STATE_CHANGE |
| 177 | Approve (Pending Member) | Group Detail / Pending tab | Button | Approve join request | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 178 | Decline (Pending Member) | Group Detail / Pending tab | Button | Decline join request | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 179 | Approve (Pending Listing) | Group Detail / Pending tab | Button | Approve listing | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 180 | Reject (Pending Listing) | Group Detail / Pending tab | Button | Reject listing | Open ConfirmActionDialog | Sí (UI state) | No | Moderator/Admin | | STATE_CHANGE |
| 181 | (Edit group settings) | Group Detail / Settings tab | Form inputs | Modify group config | Update group settings | Sí (group state) | No | Admin | | STATE_CHANGE |
| 182 | Save Settings | Group Detail / Settings tab | Button | Save group changes | Update group → Toast | Sí (group state) | No | Admin | | STATE_CHANGE |
| **NOTIFICATIONS** |
| 183 | (Back from Notifications) | Notifications / Header | Button | Exit notifications | Navigate to previous view | No | Sí | | | NAVIGATION |
| 184 | Filter Notifications | Notifications / Header | Button (icon) | Open filter options | Open NotificationsFilterSheet | Sí (UI state) | No | | | EXPLORATION |
| 185 | Mark All as Read | Notifications / Header | Button (icon) | Mark all read | Update all notifications | Sí (read state) | No | | | STATE_CHANGE |
| 186 | (Expand section) | Notifications / Section header | Accordion | Expand section | Show section content | Sí (UI state) | No | | Sections: URGENT, PENDING, TODAY, WEEK | EXPLORATION |
| 187 | Mark Section as Read | Notifications / Section header | Link | Mark section read | Update section notifications | Sí (read state) | No | | | STATE_CHANGE |
| 188 | Clear Section | Notifications / Section header (⋯) | Menu item | Remove section notifications | Remove notifications | Sí (notifications list) | No | | | STATE_CHANGE |
| 189 | (Click notification card) | Notifications | Card click | Navigate to context | Context-specific navigation | No | Sí | | Different per notification type | NAVIGATION |
| 190 | Accept (Trade Offer Notif) | Notifications / TradeOfferCard | Button | Accept trade offer | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 191 | Decline (Trade Offer Notif) | Notifications / TradeOfferCard | Button | Decline trade offer | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 192 | Reply (Message Notif) | Notifications / MessageCard | Button | Reply to message | Open ReplySheet | Sí (UI state) | No | | | COMMUNICATION |
| 193 | Answer (Question Notif) | Notifications / QuestionCard | Button | Answer question | Open ReplySheet | Sí (UI state) | No | | | COMMUNICATION |
| 194 | Accept (Group Invite Notif) | Notifications / GroupInviteCard | Button | Accept invitation | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 195 | Decline (Group Invite Notif) | Notifications / GroupInviteCard | Button | Decline invitation | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 196 | Renew (Expiring Notif) | Notifications / LifecycleCard | Button | Renew expiring listing | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 197 | View (Report Status Notif) | Notifications / ReportStatusCard | Button | View report status | Navigate to Report Detail | No | Sí | | | NAVIGATION |
| 198 | (Apply notification filters) | NotificationsFilterSheet | Button | Filter notifications | Apply filters → Close sheet | Sí (filter state) | No | | Filters: priority, type, status, timeRange | EXPLORATION |
| 199 | (Clear notification filters) | NotificationsFilterSheet | Link | Reset filters | Clear filter state | Sí (filter state) | No | | | EXPLORATION |
| **CAMPAIGNS** |
| 200 | (Navigate to Campaigns) | Menu / Campaigns | Link | View campaigns | Navigate to CampaignsPage | No | Sí | | | NAVIGATION |
| 201 | Create Campaign | Campaigns / Header | Button | Create new campaign | Open CreateEditCampaignSheet | Sí (UI state) | No | | | STATE_CHANGE |
| 202 | (Click campaign card) | Campaigns | Card click | View campaign details | Navigate to CampaignDetailPage | No | Sí | | | NAVIGATION |
| 203 | Edit Campaign | Campaigns / Card (⋯) | Menu item | Edit campaign | Open CreateEditCampaignSheet (edit) | Sí (UI state) | No | | | STATE_CHANGE |
| 204 | Pause Campaign | Campaigns / Card (⋯) | Menu item | Pause campaign | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 205 | Share Campaign | Campaigns / Card (⋯) | Menu item | Share campaign | Open ShareSheet | Sí (UI state) | No | | | COMMUNICATION |
| 206 | Delete Campaign | Campaigns / Card (⋯) | Menu item (destructive) | Delete campaign | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 207 | Apply to Campaign | Campaign Detail | Button | Submit listing to campaign | Submit application | Sí (campaign state) | No | | | STATE_CHANGE |
| 208 | (Back from Campaign Detail) | Campaign Detail / Header | Button | Exit campaign detail | Navigate to Campaigns | No | Sí | | | NAVIGATION |
| **EVENTS** |
| 209 | (Navigate to Events) | Menu / Events | Link | View event hubs | Navigate to EventsHubPage | No | Sí | | | NAVIGATION |
| 210 | Create Event Hub | Events / Header | Button | Create new event hub | Open CreateEventHubFlow | Sí (UI state) | No | | | STATE_CHANGE |
| 211 | (Click event hub card) | Events | Card click | View event hub details | Navigate to EventHubDetailPage | No | Sí | | | NAVIGATION |
| 212 | Edit Event Hub | Events / Card (⋯) | Menu item | Edit event hub | Open CreateEventHubFlow (edit) | Sí (UI state) | No | | | STATE_CHANGE |
| 213 | Pause Event Hub | Events / Card (⋯) | Menu item | Pause event hub | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 214 | Share Event Hub | Events / Card (⋯) | Menu item | Share event hub | Open ShareSheet | Sí (UI state) | No | | | COMMUNICATION |
| 215 | Delete Event Hub | Events / Card (⋯) | Menu item (destructive) | Delete event hub | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 216 | Apply to Event Hub | Event Hub Detail | Button | Submit event listing | Submit application | Sí (event state) | No | | | STATE_CHANGE |
| 217 | (Back from Event Hub Detail) | Event Hub Detail / Header | Button | Exit event hub detail | Navigate to Events | No | Sí | | | NAVIGATION |
| **PROFILE** |
| 218 | (Navigate to Profile) | Menu / Profile | Link | View profile hub | Navigate to ProfileHub | No | Sí | | | NAVIGATION |
| 219 | Edit Personal Info | Profile Hub / Personal section | Link | Edit personal details | Navigate to PersonalInfoPage | No | Sí | | | NAVIGATION |
| 220 | Edit Publishing Defaults | Profile Hub / Publishing section | Link | Edit publishing settings | Navigate to PublishingPage | No | Sí | | | NAVIGATION |
| 221 | Manage Addresses | Profile Hub / Addresses section | Link | Manage addresses | Navigate to AddressesPage | No | Sí | | | NAVIGATION |
| 222 | Manage Organizations | Profile Hub / Organizations section | Link | Manage organizations | Navigate to OrganizationsPage | No | Sí | | | NAVIGATION |
| 223 | Verify Account | Profile Hub / Account section | Button | Start verification | Navigate to AccountVerificationPage | No | Sí | Conditional (not verified) | NOT in Action Table | NAVIGATION |
| 224 | (Save personal info) | PersonalInfoPage | Button | Save changes | Update profile → Toast | Sí (profile state) | No | | | STATE_CHANGE |
| 225 | (Save publishing defaults) | PublishingPage | Button | Save defaults | Update defaults → Toast | Sí (profile state) | No | | | STATE_CHANGE |
| 226 | Add Address | AddressesPage | Button | Add new address | Open AddressFormFlow | Sí (UI state) | No | | | STATE_CHANGE |
| 227 | Edit Address | AddressesPage / Card | Button | Edit address | Open AddressFormFlow (edit) | Sí (UI state) | No | | | STATE_CHANGE |
| 228 | Delete Address | AddressesPage / Card | Button | Delete address | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 229 | Add Organization | OrganizationsPage | Button | Add organization | Open OrganizationFormFlow | Sí (UI state) | No | | | STATE_CHANGE |
| 230 | Edit Organization | OrganizationsPage / Card | Button | Edit organization | Open OrganizationFormFlow (edit) | Sí (UI state) | No | | | STATE_CHANGE |
| 231 | Delete Organization | OrganizationsPage / Card | Button | Delete organization | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| **SETTINGS** |
| 232 | (Navigate to Settings) | Menu / Settings | Link | View settings hub | Navigate to SettingsHub | No | Sí | | | NAVIGATION |
| 233 | Notification Preferences | Settings Hub / Notifications | Link | Manage notifications | Navigate to NotificationPreferencesPage | No | Sí | | | NAVIGATION |
| 234 | Privacy Settings | Settings Hub / Privacy | Link | Manage privacy | Navigate to PrivacySettingsPage | No | Sí | | | NAVIGATION |
| 235 | Password & Security | Settings Hub / Security | Link | Manage security | Navigate to PasswordSecurityPage | No | Sí | | | NAVIGATION |
| 236 | Saved Searches | Settings Hub / Features | Link | Manage saved searches | Navigate to SavedSearchesPage | No | Sí | | | NAVIGATION |
| 237 | Delete Account | Settings Hub / Account | Link (destructive) | Delete account permanently | Navigate to DeleteAccountPage | No | Sí | | NOT in Action Table | NAVIGATION |
| 238 | (Toggle notification) | NotificationPreferencesPage | Toggle switch | Enable/disable notification | Update preference | Sí (settings state) | No | | Multiple toggles | STATE_CHANGE |
| 239 | (Save notification preferences) | NotificationPreferencesPage | Button | Save notification settings | Update settings → Toast | Sí (settings state) | No | | | STATE_CHANGE |
| 240 | (Toggle privacy setting) | PrivacySettingsPage | Toggle switch | Enable/disable privacy feature | Update setting | Sí (settings state) | No | | Multiple toggles | STATE_CHANGE |
| 241 | (Save privacy settings) | PrivacySettingsPage | Button | Save privacy settings | Update settings → Toast | Sí (settings state) | No | | | STATE_CHANGE |
| 242 | Change Password | PasswordSecurityPage | Button | Update password | Open change password flow | Sí (UI state) | No | | | STATE_CHANGE |
| 243 | Enable 2FA | PasswordSecurityPage | Toggle | Enable two-factor auth | Start 2FA setup | Sí (UI state) | No | | | STATE_CHANGE |
| 244 | (Save security settings) | PasswordSecurityPage | Button | Save security settings | Update settings → Toast | Sí (settings state) | No | | | STATE_CHANGE |
| 245 | Delete Saved Search | SavedSearchesPage / Card | Button | Delete saved search | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 246 | Confirm Delete Account | DeleteAccountPage | Button (destructive) | Permanently delete account | Delete account → Sign out → Home | Sí (auth state) | Sí | Requires confirmation | | STATE_CHANGE + NAVIGATION |
| **MESSAGES / CHAT** |
| 247 | (Navigate to Messages) | Bottom Nav / Messages | Button | View messages list | Navigate to MessagesPage | No | Sí | | | NAVIGATION |
| 248 | (Click conversation) | Messages | Card click | Open conversation | Navigate to ChatConversationPage | No | Sí | | | NAVIGATION |
| 249 | (Archive conversation) | Messages / Card (swipe) | Gesture | Archive chat | Update chat state | Sí (chat state) | No | | Not implemented | STATE_CHANGE |
| 250 | (Delete conversation) | Messages / Card (⋯) | Menu item | Delete chat | Open ConfirmActionDialog | Sí (UI state) | No | | | STATE_CHANGE |
| 251 | (Back from Chat) | Chat / Header | Button | Exit conversation | Navigate to Messages | No | Sí | | | NAVIGATION |
| 252 | (Type message) | Chat / Input | Text input | Compose message | Update input state | Sí (input state) | No | | | STATE_CHANGE |
| 253 | Send Message | Chat / Input | Button (send icon) | Send message | Append message + Clear input | Sí (chat state) | No | | | COMMUNICATION |
| 254 | Make Offer (Chat) | Chat / Quick actions | Button | Propose offer | Open MakeOfferSheetChat | Sí (UI state) | No | | | COMMUNICATION |
| 255 | Mark as Sold (Chat) | Chat / Quick actions | Button | Mark listing sold | Open MarkAsSoldSheetChat | Sí (UI state) | No | Owner of listing | | STATE_CHANGE |
| 256 | View Listing (Chat) | Chat / Header | Button/Link | View associated listing | Navigate to ProductDetailPage | No | Sí | | | NAVIGATION |
| **SAVED ITEMS** |
| 257 | (Navigate to Saved) | Bottom Nav / Saved | Button | View saved items | Navigate to SavedItemsPage | No | Sí | | | NAVIGATION |
| 258 | (Click saved item) | Saved Items | Card click | View item details | Navigate to ProductDetailPage | No | Sí | | | NAVIGATION |
| 259 | (Remove from saved) | Saved Items / Card | Button (heart) | Unsave item | Remove from list + Toast | Sí (saved state) | No | | | STATE_CHANGE |
| 260 | (Filter saved items) | Saved Items | Filter UI | Filter by category/status | Update visible items | Sí (filter state) | No | | Not fully implemented | EXPLORATION |
| **MENU / NAVIGATION** |
| 261 | Open Menu | Header / MenuSheet trigger | Button | Open navigation menu | Open MenuSheet | Sí (UI state) | No | | | EXPLORATION |
| 262 | Close Menu | MenuSheet | Button (X) / Gesture | Close menu | Close MenuSheet | Sí (UI state) | No | | | EXPLORATION |
| 263 | My Listings (Menu) | MenuSheet | Link | Navigate to My Listings | Navigate to MyListingsPage | No | Sí | | | NAVIGATION |
| 264 | Action Center (Menu) | MenuSheet | Link | Navigate to Action Center | Navigate to ActionCenterPage | No | Sí | | | NAVIGATION |
| 265 | Campaigns (Menu) | MenuSheet | Link | Navigate to Campaigns | Navigate to CampaignsPage | No | Sí | | | NAVIGATION |
| 266 | Events (Menu) | MenuSheet | Link | Navigate to Events | Navigate to EventsHubPage | No | Sí | | | NAVIGATION |
| 267 | My Trail (Menu) | MenuSheet | Link | Navigate to My Trail | Navigate to MyTrailPage | No | Sí | | | NAVIGATION |
| 268 | Billing (Menu) | MenuSheet | Link | Navigate to Billing | Navigate to BillingPage | No | Sí | | | NAVIGATION |
| 269 | Statistics (Menu) | MenuSheet | Link | Navigate to Statistics | Navigate to StatisticsPage | No | Sí | | | NAVIGATION |
| 270 | Profile (Menu) | MenuSheet | Link | Navigate to Profile | Navigate to ProfileHub | No | Sí | | | NAVIGATION |
| 271 | Settings (Menu) | MenuSheet | Link | Navigate to Settings | Navigate to SettingsHub | No | Sí | | | NAVIGATION |
| 272 | Sign Out (Menu) | MenuSheet | Button (destructive) | Log out | Clear auth → Navigate to Home | Sí (auth state) | Sí | Only if authenticated | | STATE_CHANGE + NAVIGATION |
| **BOTTOM NAVIGATION** |
| 273 | Home (Bottom Nav) | Bottom Nav | Button | Navigate to home | Navigate to Home | No | Sí | | | NAVIGATION |
| 274 | Messages (Bottom Nav) | Bottom Nav | Button + Badge | Navigate to messages | Navigate to MessagesPage | No | Sí | | Shows unread count | NAVIGATION |
| 275 | Publish (Bottom Nav) | Bottom Nav | Button (center, primary) | Create listing | Navigate to PublishFlow (create) | No | Sí | | | NAVIGATION |
| 276 | Saved (Bottom Nav) | Bottom Nav | Button | Navigate to saved items | Navigate to SavedItemsPage | No | Sí | | | NAVIGATION |
| 277 | Groups (Bottom Nav) | Bottom Nav | Button | Navigate to groups | Navigate to MyGroupsPage | No | Sí | | | NAVIGATION |
| **SHARES & COMMUNICATION ACTIONS** |
| 278 | Share via WhatsApp | ShareSheet | Button | Share to WhatsApp | Open WhatsApp external | No | Sí | | External app | COMMUNICATION |
| 279 | Share to Groups | ShareSheet | Button | Share to ListlyUp groups | Open GroupSelectorSheet | Sí (UI state) | No | | | COMMUNICATION |
| 280 | Copy Link | ShareSheet | Button | Copy share link | Copy to clipboard + Toast | Sí (clipboard) | No | | | COMMUNICATION |
| 281 | QR Code | ShareSheet | Button | Show QR code | Open QRCodeSheet | Sí (UI state) | No | | | COMMUNICATION |
| 282 | Copy Referral Link | ShareSheet | Button | Copy referral link (owner) | Copy to clipboard + Toast | Sí (clipboard) | No | Owner only | | COMMUNICATION |
| 283 | (Select group for share) | GroupSelectorSheet | Checkbox | Choose groups to share | Toggle selection | Sí (selection state) | No | | | EXPLORATION |
| 284 | Share to Selected Groups | GroupSelectorSheet | Button | Confirm share | Share to groups → Toast | Sí (share state) | No | | | COMMUNICATION |
| 285 | (Close share sheet) | ShareSheet | Button/Gesture | Cancel share | Close sheet | Sí (UI state) | No | | | EXPLORATION |
| **REPORT ACTIONS** |
| 286 | (Select report reason) | ReportSheet | Checkbox | Choose report category | Toggle selection | Sí (selection state) | No | | 8 categories available | EXPLORATION |
| 287 | (Input additional details) | ReportSheet | Textarea | Add report context | Update text state | Sí (form state) | No | Optional | | STATE_CHANGE |
| 288 | Submit Report | ReportSheet | Button | Send report | Submit → Toast → Close sheet | Sí (report state) | No | ≥1 reason required | | COMMUNICATION |
| 289 | Cancel Report | ReportSheet | Button | Cancel reporting | Close sheet | Sí (UI state) | No | | | EXPLORATION |
| **OFFER & TRADE ACTIONS** |
| 290 | (Input offer amount) | MakeOfferSheet | Number input | Set offer price | Update amount state | Sí (form state) | No | | | STATE_CHANGE |
| 291 | (Input offer message) | MakeOfferSheet | Textarea | Add offer message | Update message state | Sí (form state) | No | Optional | | STATE_CHANGE |
| 292 | Submit Offer | MakeOfferSheet | Button | Send offer | Submit → Toast → Close sheet | Sí (offer state) | No | Validation required | | COMMUNICATION |
| 293 | Cancel Offer | MakeOfferSheet | Button | Cancel offer | Close sheet | Sí (UI state) | No | | | EXPLORATION |
| 294 | (Input counter offer) | CounterOfferSheet | Form inputs | Set counter proposal | Update form state | Sí (form state) | No | | | STATE_CHANGE |
| 295 | Submit Counter Offer | CounterOfferSheet | Button | Send counter offer | Submit → Toast → Close sheet | Sí (offer state) | No | | | COMMUNICATION |
| 296 | Manage Offers | Listing Detail (Owner) | Button | View all offers | Open ManageOffersSheet | Sí (UI state) | No | Owner only | Not in current flow | EXPLORATION |
| **QUESTION & ANSWER ACTIONS** |
| 297 | (Select quick question) | AskQuestionSheet | Button (template) | Use pre-made question | Fill textarea with template | Sí (form state) | No | | 8 templates available | STATE_CHANGE |
| 298 | (Input custom question) | AskQuestionSheet | Textarea | Write custom question | Update text state | Sí (form state) | No | 10-300 chars | | STATE_CHANGE |
| 299 | Post Question | AskQuestionSheet | Button | Submit public question | Post → Toast → Close sheet | Sí (question state) | No | Validation required | | COMMUNICATION |
| 300 | Cancel Question | AskQuestionSheet | Button | Cancel question | Close sheet (confirm if text) | Sí (UI state) | No | | | EXPLORATION |
| 301 | (Input answer) | ReplySheet (Q&A) | Textarea | Write answer | Update text state | Sí (form state) | No | | | STATE_CHANGE |
| 302 | Post Answer | ReplySheet (Q&A) | Button | Submit answer | Post → Toast → Close sheet | Sí (answer state) | No | | | COMMUNICATION |
| 303 | (Upvote question) | Listing Detail / Q&A | Button | Mark question helpful | Increment upvote count | Sí (question state) | No | | Not implemented | STATE_CHANGE |
| **PAUSE & LIFECYCLE ACTIONS** |
| 304 | (Select pause duration) | PauseListingSheet | Radio group | Choose pause period | Update selection | Sí (form state) | No | | Multiple durations available | EXPLORATION |
| 305 | (Input pause reason) | PauseListingSheet | Textarea | Explain pause reason | Update text state | Sí (form state) | No | Optional | | STATE_CHANGE |
| 306 | Confirm Pause | PauseListingSheet | Button | Pause listing | Update listing → Toast | Sí (listing state) | No | | | STATE_CHANGE |
| 307 | Cancel Pause | PauseListingSheet | Button | Cancel pause action | Close sheet | Sí (UI state) | No | | | EXPLORATION |
| 308 | (Select sold to) | MarkAsSoldSheet | Radio group | Choose buyer | Update selection | Sí (form state) | No | | Options: Listed buyer, Other, Anonymous | EXPLORATION |
| 309 | (Input sale price) | MarkAsSoldSheet | Number input | Record final price | Update price state | Sí (form state) | No | Optional | | STATE_CHANGE |
| 310 | Confirm Mark as Sold | MarkAsSoldSheet | Button | Mark listing sold | Update listing → Toast | Sí (listing state) | No | | | STATE_CHANGE |
| 311 | Cancel Mark as Sold | MarkAsSoldSheet | Button | Cancel action | Close sheet | Sí (UI state) | No | | | EXPLORATION |
| **SYSTEM / IMPLICIT ACTIONS** |
| 312 | (implicit) Auto-refresh | Home / Background | System | Keep data updated | Reload products | Sí (product list) | No | Periodic | | SYSTEM |
| 313 | (implicit) Load on scroll | Home / Scroll bottom | System (infinite scroll) | Load more content | Append products | Sí (product list) | No | If more products exist | | SYSTEM |
| 314 | (implicit) Network retry | Any / Error state | System | Retry failed request | Re-attempt fetch | No | No | On network error | | SYSTEM |
| 315 | (implicit) Form auto-save | PublishFlow / Background | System | Save draft automatically | Update draft state | Sí (draft state) | No | Every N seconds (edit mode) | Not implemented | SYSTEM |
| 316 | (implicit) Session timeout | Any / Background | System | End inactive session | Sign out user | Sí (auth state) | No | After inactivity period | Not implemented | SYSTEM |
| 317 | (implicit) Optimistic update | Various | System | Update UI before server | Visual feedback | Sí (local state) | No | Like, Save, etc. | | SYSTEM |
| 318 | (implicit) Toast dismiss | Any / Toast | Gesture (swipe) | Dismiss notification | Remove toast | Sí (UI state) | No | | | SYSTEM |
| 319 | (implicit) Modal backdrop click | Any / Modal | Click outside | Close modal | Close modal/sheet | Sí (UI state) | No | Most modals | | SYSTEM |
| 320 | (implicit) Swipe to go back | Any / Mobile | Gesture (swipe) | Navigate back | Go to previous view | No | Sí | Mobile PWA | Not implemented | NAVIGATION |
| 321 | (implicit) Pull to refresh | Home / Top | Gesture (pull) | Refresh content | Reload products | Sí (product list) | No | | Not implemented | SYSTEM |
| 322 | (implicit) Image lazy load | Any / Scroll | System | Load images on demand | Load image when visible | Sí (image state) | No | | | SYSTEM |
| 323 | (implicit) Keyboard shortcuts | Any / Desktop | Keyboard | Quick actions | Execute action | Varies | Varies | Desktop only | SuperAdmin: Shift+Alt+A | SYSTEM |
| **SPECIAL / ADMIN ACTIONS** |
| 324 | Open SuperAdmin Panel | Any | Keyboard (Shift+Alt+A) | Access admin panel | Open SuperAdminPanel | Sí (UI state) | No | Developer mode | Hidden feature | SYSTEM |
| 325 | (Toggle feature flag) | SuperAdmin / Flags | Toggle | Enable/disable feature | Update flag state | Sí (feature state) | No | SuperAdmin only | | STATE_CHANGE |
| 326 | (Reload app data) | SuperAdmin / Controls | Button | Force data reload | Refresh all data | Sí (app state) | No | SuperAdmin only | | SYSTEM |
| 327 | (View system logs) | SuperAdmin / Logs | Tab | View debug logs | Show logs panel | Sí (UI state) | No | SuperAdmin only | | EXPLORATION |
| 328 | (Switch mock user) | SuperAdmin / Users | Dropdown | Switch test user | Change current user | Sí (auth state) | No | Development mode | | SYSTEM |

---

## LISTAS AUXILIARES

### A) ACCIONES DUPLICADAS (Mismo Intento, Distinto Nombre)

| Acción 1 | Acción 2 | Superficie | Problema |
|----------|----------|------------|----------|
| **Answer** | **Respond** | Action Center vs My Listings / Messages | Mismo propósito (responder pregunta pública), naming diferente |
| **Open Chat** | **Message Seller** | My Listings vs Listing Detail | Mismo propósito (iniciar chat privado), naming diferente |
| **Edit** | **Edit First** | My Listings vs Action Center (Expiring) | "Edit First" implica orden antes de renovar, "Edit" es directo |
| **Continue** | **Edit** | Action Center (Draft) vs My Listings | "Continue" (draft) vs "Edit" (published) — semántica diferente pero naming confuso |
| **Edit & Resubmit** | **Edit** | Action Center (Rejected) vs General | Naming compuesto para contexto rechazado |
| **View Details** (Campaign) | **View Details** (Event) | Action Center | Mismo label, diferentes contexts (Campaign vs Event) |
| **Save Draft** | **Save as Draft** | PublishFlow Step 1 vs Step 5 | Mismo propósito, naming inconsistente ("as" agregado) |
| **Hide Listing** | **Remove Listing** | Group Detail (Moderator) | Semántica diferente (temporal vs permanente) pero naming confuso |
| **Remove Listing** | **Delete Listing** | Groups vs Owner | Mismo propósito (eliminar), naming diferente según contexto |
| **Remove Member** | **Delete Member** | Groups | Naming ambiguo (¿es ban permanente o remoción?) |
| **Publish Now** | **Save Changes** | PublishFlow Step 5 (Create vs Edit) | Contextos diferentes (create vs edit) pero ambos finalizan el flujo |
| **Back** | **(Back arrow icon)** | Múltiples superficies | Mismo propósito, a veces es button con label, a veces solo icon |
| **Share** (Listing) | **Share** (Group) | Listing Detail vs Group Detail | Mismo label, diferentes entidades |

---

### B) ACCIONES AMBIGUAS

| Acción | Ubicación | Ambigüedad |
|--------|-----------|-----------|
| **Continue** (Draft) | Action Center / ListingActionCard | ¿Es lo mismo que "Edit"? ¿Por qué naming diferente para draft vs published? |
| **Edit First** | Action Center / Expiring | ¿Requiere acción separada o es simplemente "Edit" con contexto de expiración? |
| **Edit & Resubmit** | Action Center / Rejected | ¿Es acción compuesta o solo "Edit" con auto-resubmit implícito? |
| **Details** | Action Center / Rejected | ¿Es "View Rejection Details" o navegación genérica? |
| **View Details** | Action Center / Campaign/Event | ¿Es navegación (NAVIGATION) o acción de visualización (EXPLORATION)? |
| **Review** | Action Center / Admin | ⚠️ Dead click — intención clara pero destino no implementado |
| **Open Chat** | My Listings / Messages Tab | ¿Es acción de comunicación o navegación (INTERNAL_NAVIGATION)? |
| **Publish to Group** | Group Detail / FAB | ¿Es acción (publicar) o navegación (abrir PublishFlow)? |
| **Hide Listing** | Group Detail / Moderator | ¿Temporal (visible después) o permanente? Naming no aclara. |
| **Remove Member** | Group Detail / Admin | ¿Ban permanente o puede volver a unirse? |
| **Mute** | Groups / Multiple | ¿Es toggle (puede unmute) o acción one-way? UI sugiere toggle pero no está modelado. |
| **Save as Draft** | PublishFlow Step 5 | ¿Diferente de "Save Draft" (Step 1)? Naming inconsistente. |
| **Save Changes** | PublishFlow Step 5 (Edit) | ¿Publica inmediatamente o solo guarda? Naming sugiere solo guardar pero comportamiento es publicar. |
| **Accept** | Múltiples (Trade, Join Request, Group Invite) | Mismo label para contexts muy diferentes — puede generar confusión semántica. |
| **Decline** | Múltiples (Trade, Join Request, Group Invite) | Mismo label para contexts muy diferentes. |
| **Approve** | Múltiples (Campaign, Event, Join Request, Flagged) | Mismo label para diferentes flows de aprobación. |
| **Reject** | Múltiples (Campaign, Event, Listing) | Mismo label, diferentes consecuencias según contexto. |

---

### C) ACCIONES VISIBLES NO MODELADAS HOY

Acciones que están implementadas en UI pero **NO aparecen en Action Table v1.5**:

| # | Acción Visible | Ubicación | Tipo | Notas |
|---|----------------|-----------|------|-------|
| 1 | **Continue** (Draft) | Action Center / ListingActionCard | Button | Critica — navega a PublishFlow con draft, usado frecuentemente |
| 2 | **Edit & Resubmit** | Action Center / Rejected | Button | Contexto rechazado — podría ser `edit-listing` con metadata |
| 3 | **Edit Answer** | Listing Detail / Q&A (Owner) | Button | Owner puede editar respuestas ya publicadas |
| 4 | **Verify Account** | Profile Hub / Account | Button | Inicia flow de verificación de cuenta |
| 5 | **Delete Account** | Settings Hub / Account | Link | Acción destructiva final — elimina cuenta permanentemente |
| 6 | **(Show/Hide Password)** | SignInPage / Password field | Toggle | Toggle visual de contraseña (UX standard) |
| 7 | **(Expand description)** | Listing Detail / Description | Button | Expande texto largo (UX pattern) |
| 8 | **(Navigate carousel)** | Listing Detail / ImageCarousel | Swipe/Dots | Navegación de imágenes (UX pattern) |
| 9 | **(Sort Q&A)** | Listing Detail / Q&A | Toggle | Ordenar por Recent/Helpful |
| 10 | **(Upload images)** | PublishFlow / Step 1 | File input | Carga de media (core action) |
| 11 | **(Remove image)** | PublishFlow / Step 1 | Button | Eliminar imagen subida |
| 12 | **(Reorder images)** | PublishFlow / Step 1 | Drag gesture | Cambiar orden de imágenes |
| 13 | **(Input title/description)** | PublishFlow / Step 2 | Text input | Formulario básico (podría ser acción implícita) |
| 14 | **(Select category)** | PublishFlow / Step 2 | Dropdown | Selección de categoría |
| 15 | **(Select condition)** | PublishFlow / Step 2 | Radio group | Selección de condición |
| 16 | **(Input location)** | PublishFlow / Step 3 | Autocomplete | Entrada de ubicación |
| 17 | **(Select location precision)** | PublishFlow / Step 3 | Radio group | Nivel de privacidad de ubicación |
| 18 | **(Input price)** | PublishFlow / Step 4 | Number input | Entrada de precio |
| 19 | **(Select offer mode)** | PublishFlow / Step 4 | Checkbox group | Modos de oferta (sale/trade/free) |
| 20 | **(Select delivery options)** | PublishFlow / Step 4 | Checkbox group | Métodos de entrega |
| 21 | **(Select visibility/groups)** | PublishFlow / Step 4 | Checkbox group | Visibilidad y grupos destino |
| 22 | **Edit** (step name) | PublishFlow / Step 5 | Link | Jump navigation en Preview (Edit mode) |
| 23 | **(Expand filter section)** | FilterSheet | Accordion | Expande/colapsa secciones de filtro |
| 24 | **(Select filter option)** | FilterSheet | Checkbox/Radio | Toggle criterios de filtro |
| 25 | **Clear All Filters** | FilterSheet | Link | Reset completo de filtros |
| 26 | **(Close filter sheet)** | FilterSheet | Button/Gesture | Cancelar edición de filtros |
| 27 | **(Pan/Drag map)** | MapView | Gesture | Navegación de mapa (no implementado) |
| 28 | **(Close pin card)** | MapView / MapPinCard | Button | Deseleccionar pin |
| 29 | **(Archive conversation)** | Messages / Card | Swipe | Archivar chat (no implementado) |
| 30 | **(Type message)** | Chat / Input | Text input | Composición de mensaje |
| 31 | **(Expand section)** | Notifications / Section | Accordion | Expande/colapsa sección de notificaciones |
| 32 | **Mark Section as Read** | Notifications / Section header | Link | Marca toda la sección como leída |
| 33 | **Clear Section** | Notifications / Section (⋯) | Menu item | Elimina notificaciones de sección |
| 34 | **(Apply notification filters)** | NotificationsFilterSheet | Button | Aplica filtros de notificaciones |
| 35 | **(Clear notification filters)** | NotificationsFilterSheet | Link | Reset filtros de notificaciones |
| 36 | **Zoom In** | MapView / Controls | Button | Zoom in mapa (placeholder, no implementado) |
| 37 | **Zoom Out** | MapView / Controls | Button | Zoom out mapa (placeholder, no implementado) |
| 38 | **(Click map pin)** | MapView | Pin click | Selecciona pin en mapa |
| 39 | **(Toggle notification)** | NotificationPreferencesPage | Toggle | Enable/disable notificación individual |
| 40 | **(Save notification preferences)** | NotificationPreferencesPage | Button | Guarda preferencias de notificaciones |
| 41 | **(Toggle privacy setting)** | PrivacySettingsPage | Toggle | Enable/disable setting de privacidad |
| 42 | **(Save privacy settings)** | PrivacySettingsPage | Button | Guarda settings de privacidad |
| 43 | **Change Password** | PasswordSecurityPage | Button | Inicia cambio de contraseña |
| 44 | **Enable 2FA** | PasswordSecurityPage | Toggle | Activa autenticación de dos factores |
| 45 | **(Save security settings)** | PasswordSecurityPage | Button | Guarda settings de seguridad |
| 46 | **Add Address** | AddressesPage | Button | Añade nueva dirección |
| 47 | **Edit Address** | AddressesPage / Card | Button | Edita dirección existente |
| 48 | **Delete Address** | AddressesPage / Card | Button | Elimina dirección |
| 49 | **Add Organization** | OrganizationsPage | Button | Añade organización |
| 50 | **Edit Organization** | OrganizationsPage / Card | Button | Edita organización |
| 51 | **Delete Organization** | OrganizationsPage / Card | Button | Elimina organización |
| 52 | **(Save personal info)** | PersonalInfoPage | Button | Guarda cambios de info personal |
| 53 | **(Save publishing defaults)** | PublishingPage | Button | Guarda defaults de publicación |
| 54 | **Manage Offers** | Listing Detail (Owner) | Button | Ver todas las ofertas recibidas (no en flow actual) |
| 55 | **(Select quick question)** | AskQuestionSheet | Button | Usa template de pregunta |
| 56 | **(Input custom question)** | AskQuestionSheet | Textarea | Escribe pregunta personalizada |
| 57 | **(Input answer)** | ReplySheet (Q&A) | Textarea | Escribe respuesta |
| 58 | **(Upvote question)** | Listing Detail / Q&A | Button | Marca pregunta como útil (no implementado) |
| 59 | **(Select pause duration)** | PauseListingSheet | Radio | Elige duración de pausa |
| 60 | **(Input pause reason)** | PauseListingSheet | Textarea | Explica razón de pausa |
| 61 | **(Select sold to)** | MarkAsSoldSheet | Radio | Elige comprador |
| 62 | **(Input sale price)** | MarkAsSoldSheet | Number input | Registra precio final de venta |
| 63 | **(Input offer amount)** | MakeOfferSheet | Number input | Establece cantidad de oferta |
| 64 | **(Input offer message)** | MakeOfferSheet | Textarea | Añade mensaje de oferta |
| 65 | **(Input counter offer)** | CounterOfferSheet | Form inputs | Establece contra-oferta |
| 66 | **(Select report reason)** | ReportSheet | Checkbox | Elige categoría de reporte |
| 67 | **(Input additional details)** | ReportSheet | Textarea | Añade contexto al reporte |
| 68 | **(Select group for share)** | GroupSelectorSheet | Checkbox | Elige grupos para compartir |
| 69 | **(Edit group settings)** | Group Detail / Settings tab | Form | Modifica configuración de grupo |
| 70 | **Save Settings** (Group) | Group Detail / Settings tab | Button | Guarda cambios de grupo |
| 71 | **(Toggle feature flag)** | SuperAdmin / Flags | Toggle | Enable/disable feature (dev mode) |
| 72 | **(Reload app data)** | SuperAdmin / Controls | Button | Fuerza recarga de datos (dev mode) |
| 73 | **(View system logs)** | SuperAdmin / Logs | Tab | Muestra logs de debug (dev mode) |
| 74 | **(Switch mock user)** | SuperAdmin / Users | Dropdown | Cambia usuario de prueba (dev mode) |

**Total acciones no modeladas**: **74 acciones**

---

## RESUMEN EJECUTIVO

### MÉTRICAS GLOBALES

| Métrica | Valor |
|---------|-------|
| **Total acciones documentadas** | **328** |
| **Acciones visibles (botones/links/menus)** | **254** |
| **Acciones implícitas/sistema** | **74** |
| **Superficies auditadas** | **16** (Auth, Home, Map, Listing Detail, My Listings, Action Center, Publish Flow, Groups, Group Detail, Notifications, Campaigns, Events, Profile, Settings, Messages/Chat, Saved Items, Menu, Bottom Nav, System) |
| **Acciones duplicadas detectadas** | **13 pares** |
| **Acciones ambiguas** | **24** |
| **Acciones visibles NO modeladas** | **74** |
| **Dead clicks confirmados** | **5** (Review Report, Review Platform Report, Review Listing Admin Mode, Review Issue, Review Report My Listings) |

---

### CLASIFICACIÓN PRELIMINAR (TENTATIVA)

| Clasificación | Cantidad | % del Total |
|--------------|----------|------------|
| **NAVIGATION** | **98** | 29.9% |
| **STATE_CHANGE** | **112** | 34.1% |
| **EXPLORATION** | **58** | 17.7% |
| **COMMUNICATION** | **42** | 12.8% |
| **SYSTEM** | **18** | 5.5% |

**Nota**: Algunas acciones tienen clasificación múltiple (ej. "Sign In" = STATE_CHANGE + NAVIGATION), contabilizadas en la categoría primaria.

---

### HALLAZGOS CRÍTICOS

#### 🔴 **P0 — ACCIONES FALTANTES CRÍTICAS**

1. **Continue** (Draft) — Usado frecuentemente en Action Center, NO está en Action Table
2. **Edit Answer** — Owner puede editar respuestas Q&A, NO está modelado
3. **Verify Account** — Flow de verificación, NO está en Action Table
4. **Delete Account** — Acción destructiva crítica, NO está modelada

#### 🟠 **P1 — NAMING INCONSISTENTE**

1. **"Answer" vs "Respond"** — Mismo propósito (Q&A público), naming diferente
2. **"Open Chat" vs "Message Seller"** — Mismo propósito (chat privado), naming diferente
3. **"Save Draft" vs "Save as Draft"** — Inconsistencia cosmética ("as")
4. **"Hide Listing" vs "Remove Listing" vs "Delete Listing"** — Semántica confusa
5. **"Edit First"** — Naming ambiguo (implica orden, pero es solo Edit en contexto)
6. **"Edit & Resubmit"** — Naming compuesto para contexto rechazado

#### 🟡 **P2 — DEAD CLICKS CONFIRMADOS**

1. **Review** (Report) → Report Detail Page (NO implementado)
2. **Review** (Platform Report) → Platform Report Detail (NO implementado)
3. **Review Listing** (Flagged) → Listing Detail Admin Mode (NO implementado)
4. **Review Issue** → User Issue Detail Sheet (NO implementado)
5. **Review Report** (My Listings) → Report Detail (NO implementado)

**Evidencia**: Todos confirmados con toasts "not yet implemented" en código.

#### ⚠️ **P3 — ACCIONES AMBIGUAS SEMÁNTICAMENTE**

1. **"Publish to Group"** — ¿Es acción o navegación? (abre PublishFlow)
2. **"View Details"** — Label genérico usado en múltiples contexts
3. **"Save Changes"** — Sugiere guardar pero comportamiento es publicar
4. **"Mute"** — ¿Es toggle o one-way? UI sugiere toggle pero no modelado así

---

### RECOMENDACIONES (NO PRIORIZAR — SOLO DOCUMENTAR)

#### Para Action Table v2.0:

1. **Agregar 74 acciones faltantes** (ver lista C)
2. **Unificar naming duplicado** (13 pares detectados)
3. **Clarificar acciones ambiguas** (24 casos)
4. **Implementar dead clicks** (5 casos P0)
5. **Separar acciones de sistema** de acciones de usuario explícitas
6. **Distinguir acciones vs navegación** (muchas clasificadas como NAVIGATION podrían ser solo routing)

---

**FIN DEL INVENTARIO GLOBAL AS-IS**
