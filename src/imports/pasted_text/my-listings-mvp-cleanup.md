====================================================================
LISTLYUP — MY LISTINGS — SAFE MVP IMPLEMENTATION
MODE: SAFE CLEANUP ONLY
SCOPE: MY LISTINGS
====================================================================

IMPORTANT

Implement the approved MVP fixes for My Listings.

CRITICAL REQUIREMENT:
Do everything in the safest and most stable way possible.
Do NOT break navigation.
Do NOT break ProductDetailPage shared usage.
Do NOT break Action Center integration.
Do NOT break GAM / action modal routing.
Do NOT break filter state management.
Do NOT break list rendering.
Do NOT break owner mode.
Do NOT touch global shared enums/types unless clearly safe and strictly necessary.

This is a SAFE CLEANUP, not a broad refactor.

====================================================================
SOURCE OF TRUTH
====================================================================

MY LISTINGS must match this MVP:

LIST VIEW CARDS
- Image
- Title
- Price
- Location
- Status badge:
  - Active
  - Paused
  - Expiring Soon
  - Expired
- Visibility badge:
  - Public
  - Groups
- Listing Type:
  - Product / Service / Event
- only 1 visible metric:
  - Views

3-DOTS MENU
- Chat
- Review
- Edit
- Share
- Pause / Activate
- Renew
- Mark as Sold (product only)
- Delete

OWNER MODE
- must reuse the same public Listing Detail page
- must not duplicate the screen
- must not duplicate chat UI
- must not duplicate review flow
- footer actions remain:
  1. Mark as Sold
  2. Review
  3. Chat
  4. Edit
  5. Pause
  6. Stats
  7. Delete

STATS MODAL
Keep only:
- Views
- Messages
- Favorites
- Shares

FILTERS
Status:
- Active
- Paused
- Expiring Soon
- Expired

Alerts:
- Has Messages
- Reported
- Expiring Soon

Listing Type:
- Product
- Service
- Event

Visibility:
- Public
- Groups Only

Search:
- Search my listings

OUT_OF_MVP
- multiple metrics on cards
- likes count on cards
- messages count on cards
- duplicated owner mode screen
- chat UI inside owner detail content
- duplicated review flow
- transaction logic
- buyer assignment
- Impressions
- Click Rate
- Draft / Pending / Removed / Banned / Reserved / Archived visible in filters
- Experience listing type
- Hidden/private/unlisted visibility filters
- extras section
- advanced filters
- organizations

====================================================================
IMPLEMENTATION RULES
====================================================================

1. SAFE LOCAL CHANGES FIRST
- prefer local UI cleanup
- prefer local options cleanup
- prefer local modal cleanup
- do not touch shared global types if local config is enough

2. DO NOT INVENT NEW ACTION IDS
- if Review already exists in GAM / Action Center, reuse the real existing action id
- do not invent a new action id unless it already exists in the system

3. DO NOT CREATE A SECOND SOURCE OF TRUTH FOR “EXPIRING SOON”
- use the existing lifecycle/status logic if already available
- only derive Expiring Soon from expiration date if that logic already exists safely
- do not create parallel lifecycle logic

4. README / DOC CLEANUP LAST
- functional fixes first
- docs cleanup only after stability is confirmed

====================================================================
PHASED IMPLEMENTATION
====================================================================

--------------------------------------------------
PHASE 1 — FILTERS + STATS + VISIBILITY CLEANUP
--------------------------------------------------

Apply these fixes safely:

A. StatusSection.tsx
- keep only:
  - Active
  - Paused
  - Expiring Soon
  - Expired
- remove non-MVP visible statuses from filter rendering only

B. my-listings local visibility config
- keep only:
  - Public
  - Groups
- remove Private from local My Listings rendering/options only
- do NOT break global/shared visibility enums if they are used elsewhere

C. ListingStatsModal.tsx
- keep only:
  - Views
  - Messages
  - Favorites
  - Shares
- remove:
  - Impressions
  - Click Rate

--------------------------------------------------
PHASE 2 — CARD / ACTION CONSISTENCY
--------------------------------------------------

A. Mock data consistency
- rename likes → favorites in My Listings mock data if needed
- keep naming aligned with MVP

B. Review action in 3-dots
- add Review only if the listing is reported
- reuse the existing real GAM / Action Center action id
- do NOT create duplicated modal logic

C. Renew action
- verify Renew is only available for Product and Service
- ensure Renew does NOT appear for Event

D. Expiring Soon badge
- add only if the source of truth is safe and already available
- do NOT invent parallel lifecycle logic

--------------------------------------------------
PHASE 3 — DOCUMENTATION CLEANUP
--------------------------------------------------

Update README only after functional validation is done:
- remove Experience
- remove hidden/unlisted/private references
- keep only MVP statuses/types/visibility

====================================================================
STABILITY REQUIREMENTS
====================================================================

You MUST preserve stability.

That means:

- no broken imports
- no broken types
- no broken references
- no broken list rendering
- no broken filters
- no broken search
- no broken ProductDetailPage opening
- no broken owner mode
- no broken Action Center integration
- no broken review action routing
- no broken Mark as Sold flow
- no regressions in bulk actions or empty states

Do NOT touch:
- ProductDetailPage shared structure
- ProductActions shared owner footer
- ActionButtons shared action logic
- GAM internals
- global shared enums/types unless absolutely necessary

====================================================================
VALIDATION BEFORE DELIVERY
====================================================================

Before responding, verify all of this:

- compile OK
- imports OK
- references OK
- list view OK
- owner mode OK
- ProductDetailPage reuse OK
- no duplicated chat UI
- no duplicated review flow
- stats modal OK
- filters OK
- search OK
- only MVP statuses visible in filters
- only Public / Groups visible in My Listings filters
- no Experience
- no organizations
- no transaction logic
- no buyer assignment
- no regressions

====================================================================
OUTPUT FORMAT
====================================================================

Return ONLY after everything is checked and stable.

1. CHANGES APPLIED
- files modified
- exact UI/options removed
- exact modal/card/filter fixes applied
- anything intentionally preserved for safety

2. STABILITY CHECK
Confirm explicitly:
- compile OK
- imports OK
- references OK
- list view OK
- owner mode OK
- ProductDetailPage reuse OK
- Action Center / GAM integration OK
- stats modal OK
- filters OK
- search OK
- no regressions

3. FINAL MY LISTINGS STRUCTURE
- cards
- 3-dots actions
- owner mode actions
- stats modal metrics
- filters

4. REMAINING RISKS
- only if any real risk remains
- otherwise write:
  - NONE

5. MVP COMPLIANCE STATUS
Choose one:
- ✅ 100% MVP COMPLIANT
or
- ❌ STILL REQUIRES FIXES

====================================================================
FINAL RULE
====================================================================

Do not deliver partial work.
Do not skip validation.
Implement safely and conservatively.
Stability is mandatory.

====================================================================
END
====================================================================