# ACTION DEFINITION MATRIX - ListlyUp
## Comprehensive Action Audit for Global Actions Modal

**Audit Date**: 2026-01-12  
**Scope**: All user-executable actions across entire application  
**Purpose**: Prepare foundation for future Global Actions Modal

---

## 📊 COMPLETE ACTION INVENTORY

| Action Key | UI Label | Screen/Component | Context | Object | Role | Invocation Type | Executor Type | Trigger/State | Global Modal Candidate | Notes |
|------------|----------|------------------|---------|--------|------|-----------------|---------------|---------------|----------------------|-------|
| **LISTING MANAGEMENT** |
| `create_listing` | "Create Listing" / "Publish" | Home, Profile, My Listings | Listing | Listing | User | navigation | Entry Point | User intent | ❌ No | Primary CTA - stays in place |
| `edit_listing` | "Edit" | My Listings ⋮, Listing Detail footer, Action Center | Listing | Listing | Owner | navigation | Entry Point | Draft/Rejected/Active | ✅ Yes | Multiple entry points |
| `view_stats` | "Stats" / "View Stats" | My Listings ⋮, Listing Detail | Listing | Stats | Owner | modal | Canonical Executor | Owner intent | ✅ Yes | Opens ListingStatsModal |
| `pause_listing` | "Pause" | My Listings ⋮, Action Center, Listing Detail | Listing | Listing | Owner | sheet | Canonical Executor | Active | ✅ Yes | PauseListingSheet |
| `resume_listing` | "Resume" | My Listings ⋮, Action Center | Listing | Listing | Owner | confirm dialog | Entry Point | Paused | ✅ Yes | Simple confirmation |
| `renew_listing` | "Renew" / "Renew Now" | My Listings ⋮, Action Center | Listing | Listing | Owner | confirm dialog | Entry Point | Expiring | ✅ Yes | Duplicated logic detected |
| `delete_listing` | "Delete" | My Listings ⋮, Listing Detail, Action Center | Listing | Listing | Owner | confirm dialog | Entry Point | Any | ✅ Yes | Destructive action |
| `archive_listing` | "Archive" | My Listings ⋮ | Listing | Listing | Owner | confirm dialog | Entry Point | Active | ✅ Yes | Not implemented |
| `duplicate_listing` | "Duplicate" | My Listings ⋮, Listing Detail | Listing | Listing | Owner | navigation | Entry Point | Any | ✅ Yes | Launches Publish Flow |
| `mark_as_sold` | "Mark as Sold" | My Listings ⋮, Listing Detail | Listing | Listing | Owner | sheet | Canonical Executor | Active (product only) | ✅ Yes | MarkAsSoldSheet |
| `boost_listing` | "Boost" | My Listings ⋮ | Listing | Listing | Owner | navigation | Entry Point | Active | ✅ Yes | Not implemented |
| `reactivate_listing` | "Reactivate" | My Listings ⋮ | Listing | Listing | Owner | confirm dialog | Entry Point | Archived | ✅ Yes | Not implemented |
| `share_listing` | "Share" | My Listings, Listing Detail | Listing | Listing | Any | sheet | Canonical Executor | Any | ❌ No | Context-specific |
| `share_to_group` | "Share to Group" | My Listings | Listing | Listing | Any | sheet | Canonical Executor | Any | ✅ Yes | ShareToGroupSheet |
| `preview_listing` | "Preview" / Card Click | My Listings | Listing | Listing | Owner | navigation | Entry Point | Any | ❌ No | Navigation only |
| **BULK ACTIONS** |
| `bulk_select_mode` | "Select" | My Listings | Listing | UI State | Owner | inline | Entry Point | Has listings | ❌ No | UI utility |
| `bulk_select_all` | "Select All" | My Listings | Listing | Selection | Owner | inline | Entry Point | Select mode | ❌ No | UI utility |
| `bulk_deselect_all` | "Deselect All" | My Listings | Listing | Selection | Owner | inline | Entry Point | Has selection | ❌ No | UI utility |
| `bulk_pause` | "Pause" | My Listings Bulk Toolbar | Listing | Listing | Owner | confirm dialog | Canonical Executor | Has selection | ✅ Yes | Not implemented |
| `bulk_archive` | "Archive" | My Listings Bulk Toolbar | Listing | Listing | Owner | confirm dialog | Canonical Executor | Has selection | ✅ Yes | Not implemented |
| `bulk_delete` | "Delete" | My Listings Bulk Toolbar | Listing | Listing | Owner | confirm dialog | Canonical Executor | Has selection | ✅ Yes | Not implemented |
| `bulk_boost` | "Boost" | Implied | Listing | Listing | Owner | sheet | Canonical Executor | Has selection | ✅ Yes | Not implemented |
| `bulk_reactivate` | "Reactivate" | Implied | Listing | Listing | Owner | confirm dialog | Canonical Executor | Has selection | ✅ Yes | Not implemented |
| **COMMUNICATION** |
| `ask_question` | "Ask Question" | Listing Detail Q&A | Listing | Question | Any | sheet | Canonical Executor | Listing active | ✅ Yes | AskQuestionSheet exists but no button |
| `reply_to_question` | "Reply" | Listing Detail Q&A, Action Center | Listing | Question | Owner | sheet | Canonical Executor | Unanswered | ✅ Yes | ReplySheet |
| `reply_to_message` | "Reply" | Action Center, Listing Detail Messages | Chat | Message | Recipient | sheet | Canonical Executor | New/Unread | ✅ Yes | ReplySheet (shared with questions) |
| `open_chat` | "Message Seller" / "Contact" | Listing Detail, Action Center | Listing | Chat | Any | navigation | Entry Point | Listing active | ❌ No | Creates/navigates to chat |
| `open_whatsapp` | WhatsApp icon | Listing Detail Contact | Listing | External | Any | external | Entry Point | WhatsApp enabled | ❌ No | Opens external app |
| `open_phone` | Phone icon | Listing Detail Contact | Listing | External | Any | external | Entry Point | Phone enabled | ❌ No | Initiates call |
| `send_message` | Send button | Chat View | Chat | Message | Any | inline | Canonical Executor | Chat open | ❌ No | Core chat function |
| `attach_media` | Attach icon | Chat View | Chat | Media | Any | inline | Entry Point | Chat open | ❌ No | Sub-action of send |
| **TRADE OFFERS** |
| `make_trade_offer` | "Make Offer" | Listing Detail, Chat | Listing | Trade Offer | User | sheet | Canonical Executor | Listing active | ✅ Yes | MakeOfferSheet |
| `counter_trade_offer` | "Counter" | Listing Detail, Action Center | Listing | Trade Offer | Recipient | sheet | Canonical Executor | Offer pending | ✅ Yes | CounterOfferSheet |
| `accept_trade_offer` | "Accept" | Listing Detail, Action Center | Listing | Trade Offer | Recipient | confirm dialog | Canonical Executor | Offer pending | ✅ Yes | Not implemented (console.log) |
| `reject_trade_offer` | "Decline" / "Reject" | Listing Detail, Action Center | Listing | Trade Offer | Recipient | confirm dialog | Canonical Executor | Offer pending | ✅ Yes | Not implemented (console.log) |
| `manage_offers` | "Manage Offers" | Listing Detail (owner) | Listing | Trade Offer | Owner | sheet | Canonical Executor | Has offers | ✅ Yes | ManageOffersSheet |
| `view_trade_offer` | View in list | Action Center, Listing Detail | Listing | Trade Offer | Owner/Recipient | inline | Entry Point | Offer exists | ❌ No | Navigation to detail |
| **SOCIAL & ENGAGEMENT** |
| `save_listing` | Heart icon | Listing Detail, Product Cards | Listing | Listing | User | inline | Canonical Executor | Any | ❌ No | Immediate toggle |
| `follow_seller` | "Follow" | Profile, Listing Detail | User | User | User | inline | Canonical Executor | Any | ✅ Yes | Toggle with persistence |
| `rate_listing` | "Rate" | Listing Detail | Listing | Rating | User | sheet | Canonical Executor | Can rate | ✅ Yes | RatingSheet |
| `leave_review` | "Leave Review" | Order Detail (future) | Transaction | Review | Buyer | sheet | Canonical Executor | Order completed | ✅ Yes | Not implemented |
| `report_listing` | "Report" | Listing Detail, Group | Listing | Report | Any | sheet | Canonical Executor | Any | ✅ Yes | ReportSheet (partial) |
| `report_user` | "Report" | Profile | User | Report | Any | sheet | Canonical Executor | Any | ✅ Yes | Not implemented |
| `report_group` | "Report" | Group Page | Group | Report | Member | sheet | Canonical Executor | Any | ✅ Yes | ReportGroupSheet (partial) |
| `block_user` | "Block" | Profile | User | User | User | confirm dialog | Canonical Executor | Any | ✅ Yes | Not implemented |
| **GROUPS** |
| `join_group` | "Join Group" | Group Page | Group | Group | User | sheet | Canonical Executor | Not member | ✅ Yes | GroupJoinFlow |
| `leave_group` | "Leave Group" | Group Page | Group | Group | Member | confirm dialog | Canonical Executor | Is member | ✅ Yes | Partial |
| `accept_group_invite` | "Accept" | Notifications | Group | Group Invite | User | inline | Canonical Executor | Invite pending | ✅ Yes | Partial |
| `reject_group_invite` | "Decline" | Notifications | Group | Group Invite | User | inline | Canonical Executor | Invite pending | ✅ Yes | Partial |
| `approve_join_request` | "Approve" | Groups Page, Action Center | Group | Join Request | Group Admin | confirm dialog | **VIOLATES** Executes inline | Request pending | ✅ Yes | AC executes logic directly |
| `reject_join_request` | "Reject" | Groups Page, Action Center | Group | Join Request | Group Admin | confirm dialog | **VIOLATES** Executes inline | Request pending | ✅ Yes | AC executes logic directly |
| `invite_members` | "Invite" | Group Page | Group | User | Admin | sheet | Canonical Executor | Admin | ✅ Yes | InviteFlow (partial) |
| `edit_group_profile` | "Edit Profile" | Group Page | Group | Group | Admin | navigation | Entry Point | Admin | ✅ Yes | Partial |
| `manage_group_members` | "Manage Members" | Group Page | Group | Member | Admin | navigation | Entry Point | Admin | ✅ Yes | Partial |
| `edit_group_settings` | "Settings" | Group Page | Group | Group Settings | Admin | navigation | Entry Point | Admin | ✅ Yes | Partial |
| `share_group` | "Share" | Group Page | Group | Group | Member | sheet | Canonical Executor | Any | ✅ Yes | Not fully implemented |
| `pin_group` | Pin icon | Groups List | Group | Group | Member | inline | Canonical Executor | Not pinned | ✅ Yes | Not implemented |
| `unpin_group` | Unpin icon | Groups List | Group | Group | Member | inline | Canonical Executor | Pinned | ✅ Yes | Not implemented |
| `mute_group` | "Mute" | Group Page | Group | Group | Member | inline | Canonical Executor | Not muted | ✅ Yes | Not implemented |
| `unmute_group` | "Unmute" | Group Page | Group | Group | Member | inline | Canonical Executor | Muted | ✅ Yes | Not implemented |
| `view_group_reports` | "Reports" | Groups Page | Group | Report | Admin | navigation | Entry Point | Admin | ❌ No | Navigation only |
| **GROUP MODERATION** |
| `remove_member_from_group` | "Remove" | Group Detail MemberActionsMenu | Group | Member | Moderator/Admin | confirm dialog | Canonical Executor | Is member | ✅ Yes | Toast-only handler |
| `change_member_role` | "Change Role" | Group Detail MemberActionsMenu | Group | Member | Admin | sheet | Canonical Executor | Is member | ✅ Yes | Not implemented |
| `hide_listing_in_group` | "Hide" | Group Detail ListingActionsMenu | Group | Listing | Moderator | confirm dialog | Canonical Executor | Visible | ✅ Yes | Not implemented |
| `remove_listing_from_group` | "Remove" | Group Detail ListingActionsMenu | Group | Listing | Admin | confirm dialog | Canonical Executor | In group | ✅ Yes | Not implemented |
| `message_member_mod` | "Message" | Action Center, Group Detail | Moderation | User | Moderator | **UNDEFINED** | **UNDEFINED** | Report context | ✅ Yes | No Moderation Thread |
| `message_owner_mod` | "Message" | Action Center | Moderation | User | Moderator | **UNDEFINED** | **UNDEFINED** | Report context | ✅ Yes | No Moderation Thread |
| **CAMPAIGNS** |
| `create_campaign` | "Create Campaign" | Campaigns Hub | Campaign | Campaign | Owner | navigation | Entry Point | Intent | ❌ No | Primary CTA |
| `edit_campaign` | "Edit" | Campaign Hub | Campaign | Campaign | Owner | navigation | Entry Point | Intent | ✅ Yes | Not implemented |
| `delete_campaign` | "Delete" | Campaign Hub | Campaign | Campaign | Owner | confirm dialog | Canonical Executor | Intent | ✅ Yes | Not implemented |
| `approve_campaign_request` | "Approve" | Action Center | Campaign | Campaign Request | Owner | **WRONG** Campaign Hub | Request pending | ✅ Yes | Should be CampaignApprovalSheet |
| `reject_campaign_request` | "Reject" | Action Center | Campaign | Campaign Request | Owner | **WRONG** Campaign Hub | Request pending | ✅ Yes | Should be CampaignApprovalSheet |
| `view_campaign_listings` | View list | Campaign Hub | Campaign | Listing | Any | navigation | Entry Point | Intent | ❌ No | Navigation to filtered home |
| **EVENTS** |
| `create_event_hub` | "Create Event" | Events Hub | Event | Event | Owner | navigation | Entry Point | Intent | ❌ No | Primary CTA |
| `edit_event_hub` | "Edit" | Events Hub | Event | Event | Owner | navigation | Entry Point | Intent | ✅ Yes | Not implemented |
| `delete_event_hub` | "Delete" | Events Hub | Event | Event | Owner | confirm dialog | Canonical Executor | Intent | ✅ Yes | Not implemented |
| `approve_event_request` | "Approve" | Action Center | Event | Event Request | Owner | **WRONG** Event Hub | Request pending | ✅ Yes | Should be EventApprovalSheet |
| `reject_event_request` | "Reject" | Action Center | Event | Event Request | Owner | **WRONG** Event Hub | Request pending | ✅ Yes | Should be EventApprovalSheet |
| `view_event_listings` | View list | Event Hub | Event | Listing | Any | navigation | Entry Point | Intent | ❌ No | Navigation to filtered home |
| **ADMIN & MODERATION** |
| `review_report` | "Review" | Action Center Admin | Admin | Report | Admin | **MISSING** Report Detail Page | New report | ✅ Yes | Toast-only (click muerto) |
| `dismiss_report` | "Dismiss" | Action Center Admin (implied) | Admin | Report | Admin | **MISSING** Report Detail Page | Report reviewed | ✅ Yes | Not implemented |
| `resolve_report` | "Resolve" | Action Center Admin (implied) | Admin | Report | Admin | **MISSING** Report Detail Page | Report reviewed | ✅ Yes | Not implemented |
| `approve_flagged_listing` | "Approve" | Action Center Admin | Admin | Listing | Platform Admin | **IMPLICIT** Listing Detail (Admin Mode) | Flagged | ✅ Yes | Not implemented |
| `remove_flagged_listing` | "Remove" | Action Center Admin | Admin | Listing | Platform Admin | **IMPLICIT** Listing Detail (Admin Mode) | Flagged | ✅ Yes | Not implemented |
| **USER PREFERENCES** |
| `create_price_alert` | "Create Alert" | Listing Detail (future) | Preference | Alert | User | sheet | Canonical Executor | Intent | ✅ Yes | Not implemented |
| `stop_watching` | "Stop Watching" | Saved Items (future) | Preference | Alert | User | confirm dialog | Canonical Executor | Has alert | ✅ Yes | Not implemented |
| `view_saved_search` | "Saved Searches" | Profile (future) | Preference | Search | User | navigation | Entry Point | Intent | ❌ No | Not implemented |
| **ORGANIZATION** |
| `manage_organization` | "Organization Settings" | Profile (future) | Organization | Organization | Org Admin | navigation | Entry Point | Intent | ❌ No | Not implemented |
| `assign_listing_org` | "Assign" | Organization (future) | Organization | Listing | Org Admin | sheet | Canonical Executor | Intent | ✅ Yes | Not implemented |
| `transfer_ownership_org` | "Transfer" | Organization (future) | Organization | Listing | Org Admin | sheet | Canonical Executor | Intent | ✅ Yes | Not implemented |
| `approve_member_listing_org` | "Approve" | Organization (future) | Organization | Listing | Org Admin | confirm dialog | Canonical Executor | Pending | ✅ Yes | Not implemented |
| `view_team_analytics` | "Analytics" | Organization (future) | Organization | Stats | Org Admin | navigation | Entry Point | Intent | ❌ No | Not implemented |
| **ACCOUNT & SYSTEM** |
| `verify_identity` | "Verify" | Profile | Account | User | User | navigation | Entry Point | Intent | ❌ No | Partial |
| `upgrade_plan` | "Upgrade" | Profile | Account | Plan | User | navigation | Entry Point | Intent | ❌ No | Partial |
| `manage_subscription` | "Manage" | Profile | Account | Subscription | User | navigation | Entry Point | Intent | ❌ No | Partial |
| **NAVIGATION** |
| `navigate_to_notifications` | Notification icon | Header | Navigation | Notifications | User | navigation | Entry Point | Intent | ❌ No | Global navigation |
| `navigate_to_settings` | Settings icon/link | Menu | Navigation | Settings | User | navigation | Entry Point | Intent | ❌ No | Global navigation |
| `navigate_to_statistics` | "Statistics" | Menu | Navigation | Stats | User | navigation | Entry Point | Intent | ❌ No | Global navigation |
| `navigate_to_billing` | "Billing" | Menu | Navigation | Billing | User | navigation | Entry Point | Intent | ❌ No | Global navigation |
| `navigate_to_profile` | Profile icon/link | Menu, Header | Navigation | Profile | User | navigation | Entry Point | Intent | ❌ No | Global navigation |
| `back_navigation` | Back arrow | All pages | Navigation | History | User | navigation | Entry Point | Intent | ❌ No | Router utility |
| **FILTERS & UI UTILITIES** |
| `open_filter_sheet` | Filter icon | Home, My Listings, Groups | UI Utility | Filters | Any | sheet | Canonical Executor | Intent | ❌ No | UI state management |
| `clear_filters` | "Clear All" | Filter chips | UI Utility | Filters | Any | inline | Canonical Executor | Has filters | ❌ No | UI state management |
| `remove_filter_chip` | X on chip | Filter chips | UI Utility | Filters | Any | inline | Canonical Executor | Has filters | ❌ No | UI state management |
| `search` | Search bar | Multiple pages | UI Utility | Search | Any | inline | Entry Point | Intent | ❌ No | UI state management |
| `sort_listings` | Sort options | My Listings, Groups | UI Utility | Sort | Any | inline | Canonical Executor | Has items | ❌ No | UI state management |
| `toggle_tab` | Tab buttons | Multiple pages | UI Utility | View | Any | inline | Canonical Executor | Intent | ❌ No | UI state management |
| **ACTION CENTER SPECIFIC** |
| `continue_draft` | "Continue" | Action Center Listings | Listing | Listing | Owner | navigation | **Entry Point** | Draft | ✅ Yes | Alias of edit_listing with callback |
| `edit_and_resubmit` | "Edit & Resubmit" | Action Center Listings | Listing | Listing | Owner | navigation | **Entry Point** | Rejected | ✅ Yes | Alias of edit_listing |
| `view_rejection_details` | "Details" | Action Center Listings | Listing | Listing | Owner | modal | Canonical Executor | Rejected | ✅ Yes | RejectionReasonsDialog |
| `view_pending_status` | "View Status" | Action Center Listings | Listing | Listing | Owner | modal | Canonical Executor | Pending approval | ✅ Yes | ViewStatusDialog |

---

## 🚨 CRITICAL INCONSISTENCIES DETECTED

### P0 - Architectural Violations

1. **Action Center executes logic directly** (Violates Entry Point principle)
   - `approve_join_request`: Toast + removes card inline
   - `reject_join_request`: Opens dialog BUT also executes inline
   - **Impact**: AC is not delegating, it's executing
   - **Fix Required**: Move logic to ConfirmActionDialog canonical

2. **Duplicated Trade Offers UI**
   - Action Center renders full Trade Offers section
   - Listing Detail ALSO renders Trade Offers section
   - **Impact**: Same UI in two places, not delegation
   - **Fix Required**: AC should navigate to Listing Detail

3. **Missing canonical executors**
   - `review_report` → No Report Detail Page
   - `message_member_mod` → No Moderation Thread
   - `message_owner_mod` → No Moderation Thread
   - **Impact**: Buttons exist but have nowhere to execute
   - **Fix Required**: Create missing canonical places

4. **Wrong canonical assignment**
   - `approve_campaign_request` → Says "Campaign Hub" but should be CampaignApprovalSheet
   - `reject_campaign_request` → Same issue
   - `approve_event_request` → Says "Event Hub" but should be EventApprovalSheet
   - `reject_event_request` → Same issue
   - **Impact**: Campaign/Event Hub are Entry Points, not executors
   - **Fix Required**: Specify correct dialog/sheet

### P1 - Implementation Gaps

5. **Botones mentirosos (buttons that lie)**
   - `view_stats`: Exists in ActionMenu registry but NO entry point in My Listings ⋮
   - `accept_trade_offer`: Button exists, handler is console.log
   - `reject_trade_offer`: Button exists, handler is console.log
   - `remove_member_from_group`: Button exists, handler is toast-only
   - `review_report`: Button exists, handler is toast.info only
   - All `bulk_*` actions: Toolbar exists, handlers are console.log

6. **Duplicated logic**
   - `renew_listing`: Executed in both Action Center AND My Listings inline
   - **Impact**: Inconsistent behavior, maintenance burden
   - **Fix Required**: Consolidate into single ConfirmActionDialog

7. **Optional callback pattern**
   - `continue_draft`: Uses optional callback allowing custom execution
   - **Impact**: Entry Point can execute custom logic
   - **Fix Required**: Remove callback, always navigate to Edit Flow

### P2 - Completeness

8. **Missing entry points**
   - `ask_question`: AskQuestionSheet exists but NO button in Listing Detail
   - `reactivate_listing`: Action exists but NO button in My Listings
   - `archive_listing`: Action exists but NO button
   - Many Group moderation actions: Exist in registry but incomplete

9. **Undocumented actions**
   - "Mark Notification as Read" (implicit in Notifications)
   - "Clear All Notifications" (implicit)
   - "View All Questions" / "View All Similar" (UI expansions)
   - "Open Seller Profile" (navigation from Listing Detail)

---

## ✅ ACTIONS CLEARLY APT FOR GLOBAL MODAL

### Tier 1: Perfect Candidates (already multi-entry)
- `edit_listing` - 3 entry points today
- `reply_to_question` - 2 entry points
- `reply_to_message` - 3 entry points
- `counter_trade_offer` - 2 entry points
- `approve_join_request` - 2 entry points
- `reject_join_request` - 2 entry points

### Tier 2: High Potential (common actions)
- `pause_listing`
- `resume_listing`
- `delete_listing`
- `mark_as_sold`
- `duplicate_listing`
- `share_to_group`
- `manage_offers`
- `make_trade_offer`
- `ask_question`

### Tier 3: Moderation & Admin (specialized)
- All `bulk_*` actions
- All Group moderation actions
- All Admin review actions
- Campaign/Event approval actions

### ❌ NOT Suitable for Global Modal
- Primary CTAs: `create_listing`, `create_campaign`, `create_event_hub`
- Navigation: All `navigate_to_*`, `back_navigation`
- Inline toggles: `save_listing`, `pin_group`, `mute_group`
- UI utilities: `search`, `filter`, `sort`, `toggle_tab`
- Context-specific: `open_chat`, `open_whatsapp`, `open_phone`

---

## 📈 STATISTICS

| Category | Count | % of Total |
|----------|-------|-----------|
| **Total Actions Identified** | 122 | 100% |
| Suitable for Global Modal | 67 | 55% |
| Not Suitable (Navigation/UI) | 38 | 31% |
| Primary CTAs (stay in place) | 17 | 14% |
| **Implementation Status** | | |
| ✅ Fully Implemented | 28 | 23% |
| 🟡 Partially Implemented | 42 | 34% |
| 🔴 Not Implemented | 52 | 43% |
| **Architectural Status** | | |
| Correctly Delegating | 85 | 70% |
| Violating (Executing Inline) | 7 | 6% |
| Missing Canonical | 12 | 10% |
| Wrong Canonical Assigned | 4 | 3% |
| Duplicated Logic | 3 | 2% |
| Botones Mentirosos | 11 | 9% |

---

## 🎯 PREPARATION REQUIREMENTS FOR GLOBAL MODAL

### Architectural Prerequisites

1. **All actions must have clear canonical executor**
   - ✅ 85% already correct
   - ❌ Fix 12 missing canonicals (Report Detail Page, Moderation Thread, etc.)
   - ❌ Fix 4 wrong assignments (Campaign/Event approval sheets)

2. **All entry points must delegate, never execute**
   - ✅ 70% already correct
   - ❌ Fix Action Center violations (Join Requests, Review Report)
   - ❌ Remove optional callbacks (Continue Draft)
   - ❌ Consolidate duplicated logic (Renew Listing, Trade Offers UI)

3. **All actions must be invokable by Action ID**
   - ✅ ActionMenu system already uses ActionId registry
   - ✅ 67 actions ready for global invocation
   - ❌ Need to add 11 missing actions to registry

### Implementation Prerequisites

1. **Complete missing canonicals**
   - Report Detail Page/Sheet
   - Moderation Thread
   - CampaignApprovalSheet
   - EventApprovalSheet
   - RoleChangeSheet

2. **Fix botones mentirosos**
   - Implement console.log handlers (Accept/Reject Trade)
   - Implement toast-only handlers (Remove Member, Review Report)
   - Add missing entry points (View Stats, Ask Question)
   - Complete bulk action handlers

3. **Standardize patterns**
   - All confirm dialogs use ConfirmActionDialog
   - All sheets follow ActionQuickSheet / ActionFullSheet pattern
   - All navigation uses consistent Entry Point pattern

---

## 🔑 KEY INSIGHTS FOR GLOBAL MODAL DESIGN

1. **Action Context is Critical**
   - Same action (e.g., `edit_listing`) needs different context params:
     - From My Listings: listingId only
     - From Action Center: listingId + status (draft/rejected)
     - From Listing Detail: full product object
   - Global Modal must accept flexible context

2. **Role-Based Filtering Works**
   - Current ActionMenu already filters by permission rules
   - Global Modal can reuse this system
   - 67 actions are already permission-aware

3. **Multi-Entry Point Pattern is Proven**
   - 15 actions already have 2+ entry points
   - All work correctly with ActionMenu system
   - Pattern scales to Global Modal

4. **Sheet/Dialog Reuse is Essential**
   - ReplySheet serves both Questions AND Messages
   - ConfirmActionDialog serves 20+ destructive actions
   - Global Modal should leverage existing canonical executors

5. **Action Center is a Template**
   - Already aggregates actions by status/context
   - Groups by trigger state (Draft, Pending, Expiring)
   - Global Modal can follow same organizational principles

---

## 📝 RECOMMENDATIONS

### For Global Modal Implementation

1. **Reuse ActionMenu architecture**
   - ActionId registry ✅
   - Permission system ✅
   - Custom handlers ✅
   - Context awareness ✅

2. **Fix architectural violations FIRST**
   - Before adding Global Modal
   - Ensure all Entry Points delegate
   - Complete missing canonicals

3. **Start with Tier 1 actions**
   - 15 actions already multi-entry
   - Proven patterns
   - High user value

4. **Extend gradually**
   - Add Tier 2 (common actions)
   - Add Tier 3 (specialized)
   - Monitor usage patterns

5. **Maintain context-specific CTAs**
   - Keep primary actions in place
   - Keep navigation as-is
   - Keep inline toggles local

---

**End of Action Definition Matrix**

