====================================================================
LISTLYUP — FIGMA IMPLEMENTATION PROMPT
SCOPE: LISTING DETAIL
MODE: SAFE MVP IMPLEMENTATION
====================================================================

IMPORTANT

Implement the approved MVP changes for Listing Detail.

CRITICAL REQUIREMENT:
Do everything in the safest and most stable way possible.
Do NOT break existing navigation.
Do NOT break shared components.
Do NOT break state management.
Do NOT break data flow.
Do NOT break owner mode.
Do NOT break Action Center integration.
Do NOT leave dangling imports, orphan props, dead handlers, or inconsistent types.
Do NOT do destructive cleanup first.

Work as a SAFE REFACTOR, not as a rewrite.

Implementation priority must be:

1. Remove / hide non-MVP UI safely
2. Clean local references safely
3. Preserve shared logic if still used elsewhere
4. Only after stability is confirmed, remove orphan code if clearly unused

====================================================================
SOURCE OF TRUTH
====================================================================

The following changes are already approved and must be implemented exactly:

--------------------------------------------------
KEEP (MVP)
--------------------------------------------------

Listing Detail must keep:

- location
- category breadcrumb
- tags / hashtags
- username
- contact actions:
  - Chat
  - WhatsApp (if enabled by owner)
- access / delivery info only when relevant by listing type
- simple text description
- Q&A simple:
  - question
  - answer
  - timestamp optional
- related content:
  - Similar Listings
  - More from this user

--------------------------------------------------
REMOVE (OUT_OF_MVP)
--------------------------------------------------

Remove / hide from Listing Detail UI:

- Expired status visible in header / metadata
- ratings
- seller stats
- organizations visible in UI
- Call button
- duplicated contact section
- delivery for services/events as a rigid separate model
- Q&A likes / upvotes / ranking
- Recently Viewed
- Trust & Safety section
- analytics / visible metrics
- AI recommendation blocks
- RatingSheet
- response time metric
- any visible price intelligence / price history / discount insight UI
- any seller reputation UI

--------------------------------------------------
CANONICAL RULES
--------------------------------------------------

- Listing Detail must stay simple and decision-oriented
- No rating system in MVP
- No seller reputation system in MVP
- No analytics visible in Listing Detail
- No discovery complexity beyond:
  - Similar Listings
  - More from this user
- Chat UI is unique and may have multiple entry points
- Multiple valid entry points are allowed if they reuse the same conversation and same logic
- Do not force a physical-only delivery model
- Use the access_mode concept safely where relevant
- No organizations in visible UI
- No FUTURE features leaking into MVP

====================================================================
IMPLEMENTATION STRATEGY
====================================================================

You must implement this as a SAFE UI-FIRST REFACTOR.

That means:

- First remove or hide non-MVP UI exposure
- Then clean local props / handlers / wiring
- Keep shared data structures if they may still be used elsewhere
- Do NOT aggressively rewrite the shared model first
- Do NOT perform risky “data model surgery” unless clearly isolated and safe

If a property or structure exists in shared code but is not needed in Listing Detail:
- stop rendering it in Listing Detail first
- only remove it globally if confirmed unused and safe

====================================================================
PHASED IMPLEMENTATION
====================================================================

--------------------------------------------------
PHASE 1 — SAFE UI CLEANUP
--------------------------------------------------

Safely remove or hide from Listing Detail UI:

- expired status in visible metadata/header
- ratings UI
- seller stats UI
- RatingSheet trigger / usage
- Q&A helpful / ranking / social signals
- Recently Viewed block
- Trust & Safety section
- visible analytics / metrics
- response time display
- price history / discount insight / price intelligence UI
- any seller reputation widgets
- any duplicated contact section
- any Call button

Requirements:
- keep page rendering stable
- keep navigation stable
- keep related sections that remain MVP-valid
- do not break Similar Listings
- do not break More from this user
- do not break Chat / WhatsApp logic

--------------------------------------------------
PHASE 2 — SAFE LOCAL REFACTOR
--------------------------------------------------

After UI cleanup, safely clean local Listing Detail references:

- remove unused props passed only for removed UI
- remove local handlers tied only to removed UI
- remove local imports tied only to removed UI
- remove local state tied only to removed UI
- remove local component wiring tied only to removed UI

Requirements:
- do not break shared components
- do not break owner mode
- do not break footer / ProductActions if still MVP-valid
- do not break Action Center chat entry point logic

--------------------------------------------------
PHASE 3 — SAFE SHARED CLEANUP (ONLY IF SAFE)
--------------------------------------------------

Only if clearly safe and unused:

- remove orphan files
- remove dead exports
- remove dead types
- remove dead helper functions
- remove dead UI-only fields that are no longer referenced anywhere

IMPORTANT:
Do NOT remove shared model/data fields aggressively if they may still be used by:
- Home
- My Listings
- owner mode
- future internal wiring
- shared cards
- other pages

If uncertain:
- leave the shared model intact
- only keep Listing Detail MVP-clean

====================================================================
CRITICAL SAFETY RULES
====================================================================

You MUST preserve stability.

That means:

- no broken imports
- no broken references
- no broken JSX
- no broken owner mode
- no broken Chat / WhatsApp actions
- no broken related listings section
- no broken shared components
- no broken route behavior
- no broken Action Center integration
- no regressions in list/detail navigation

If a component is shared:
- change only what is necessary for Listing Detail
- prefer local isolation over risky global rewrites

If a field is FUTURE-ready but currently visible:
- remove its UI exposure first
- do not over-delete the underlying data model unless clearly isolated

====================================================================
SPECIFIC IMPLEMENTATION NOTES
====================================================================

1. CHAT / CONTACT
- Multiple entry points are allowed
- This is NOT a problem if they reuse the same Chat UI and same logic
- Only remove duplicated contact UI if it creates redundant visual sections or different logic
- Do NOT break legitimate CTA access

2. DELIVERY / ACCESS MODE
- For products, access/delivery info may remain when relevant
- Do NOT keep a rigid “delivery section” model for services/events if it violates the canonical MVP
- Keep the UI simple and type-relevant

3. Q&A
- Keep only:
  - question
  - answer
  - optional timestamp
- Remove:
  - helpful
  - likes
  - upvotes
  - ranking signals

4. DISCOVERY / RELATED CONTENT
- Keep:
  - Similar Listings
  - More from this user
- Remove:
  - Recently Viewed
  - recommendation complexity
  - AI recommendation blocks

5. RATING / TRUST / ANALYTICS
- Remove all visible rating, seller reputation, trust section, and analytics exposure
- MVP must not imply a reputation or analytics system here

====================================================================
OUTPUT REQUIRED
====================================================================

After implementation, return ONLY this structured summary:

1. CHANGES APPLIED
- exact files changed
- exact UI sections removed/hidden
- exact local props/handlers/imports cleaned
- any shared code intentionally preserved for safety

2. SAFETY CHECK
Confirm:
- no broken imports
- no broken types
- no broken references
- no broken navigation
- no broken owner mode
- no broken chat / WhatsApp actions
- no shared component regressions detected

3. FINAL LISTING DETAIL MVP STRUCTURE
List the final visible sections in order

4. REMAINING RISKS
Only if any real risk remains

Do not write long explanations.
Do not redesign.
Do not add non-MVP ideas.

====================================================================
FINAL RULE
====================================================================

Implement safely and conservatively.
Stability is mandatory.
Prioritize safe UI cleanup first.
Do NOT break anything.

====================================================================
END
====================================================================