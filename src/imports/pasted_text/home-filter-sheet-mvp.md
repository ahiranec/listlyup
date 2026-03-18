====================================================================
LISTLYUP — FIGMA IMPLEMENTATION PROMPT
SCOPE: HOME FILTER SHEET
MODE: SAFE MVP IMPLEMENTATION
====================================================================

IMPORTANT

Implement the approved MVP changes for Home Filter Sheet.

CRITICAL REQUIREMENT:
Do everything in the safest and most stable way possible.
Do NOT break existing navigation.
Do NOT break shared components.
Do NOT break state management.
Do NOT leave dangling imports, orphan props, or inconsistent types.
Do NOT do destructive cleanup first.

Work as a SAFE REFACTOR, not as a reckless rewrite.

Implementation order must be:

1. Remove usage safely
2. Clean types/state safely
3. Rename/refactor safely
4. Simplify safely
5. Only at the end, delete orphan files if they are no longer referenced

====================================================================
SOURCE OF TRUTH
====================================================================

The following changes are already approved and must be implemented exactly:

--------------------------------------------------
REMOVE (OUT_OF_MVP)
--------------------------------------------------

Remove completely from Home Filter Sheet:

- CampaignSection
- EventSection
- LifecycleSection
- RatingSection
- Visibility filter
- discountFilter
- discountPreset
- minSellerRating
- any rating-related filter logic
- any campaign/event-specific discovery filter logic
- any lifecycle/status filter exposed in Home

--------------------------------------------------
RENAME / ADJUST
--------------------------------------------------

- SellerSection → UserSection
- “Seller” labels → “User” (or equivalent MVP-safe label)
- DeliverySection → AccessModeSection
- “Delivery Methods” → “Access Mode”

Access Mode options must clearly support:
- pickup
- meetup
- delivery
- virtual

--------------------------------------------------
SIMPLIFY
--------------------------------------------------

PriceSection must become Price Range only:

Keep:
- currency
- minPrice
- maxPrice

Remove:
- discountFilter
- discountPreset
- any discount UI or logic

--------------------------------------------------
CANONICAL HOME RULES
--------------------------------------------------

- Home only exposes active listings
- Home does NOT expose lifecycle/status filter
- Home does NOT expose visibility filter
- Home discovery must stay simple
- Home does NOT expose campaigns
- Home does NOT expose event entity filters
- Events only exist as listing_type
- No organizations in Home UI
- No analytics in Home filters
- “Access Mode” is the canonical concept, not rigid physical delivery-only logic

--------------------------------------------------
TARGET FINAL STRUCTURE
--------------------------------------------------

Final Home Filter Sheet must contain:

1. SortBySection
2. TypeSection
3. OfferModeSection
4. GroupsSection
5. TagsSection
6. CategorySection
7. ConditionSection
8. LocationSection
9. UserSection
10. AccessModeSection
11. ContactSection
12. PriceSection

Important clarification:
- 11 filters
- + 1 sort block
= 12 visible blocks total

====================================================================
IMPLEMENTATION INSTRUCTIONS
====================================================================

Apply the implementation in 3 SAFE phases.

--------------------------------------------------
PHASE 1 — SAFE REMOVE / SAFE DETACH
--------------------------------------------------

Safely remove usage of:

- CampaignSection
- EventSection
- LifecycleSection
- RatingSection
- visibility filter
- discountFilter
- discountPreset
- minSellerRating

Requirements:
- remove references from FilterSheetContent
- remove references from state/openSections
- remove references from filter types
- remove references from handlers
- remove references from UI labels
- keep app compiling at every step

Do NOT delete files first.
First ensure:
- no imports remain
- no JSX usage remains
- no props remain
- no state references remain

--------------------------------------------------
PHASE 2 — SAFE RENAME / SAFE REFINE
--------------------------------------------------

Rename safely:

- SellerSection → UserSection
- DeliverySection → AccessModeSection

Also update:
- imports
- exports
- component names
- labels
- props if needed
- internal copy

Requirements:
- preserve existing working functionality where still MVP-valid
- ensure no broken references
- ensure all imports resolve correctly
- ensure labels align with canonical MVP wording

--------------------------------------------------
PHASE 3 — SAFE SIMPLIFY + FINAL CLEANUP
--------------------------------------------------

Simplify PriceSection:

Keep only:
- currency
- minPrice
- maxPrice

Remove:
- discountFilter
- discountPreset
- discount UI
- discount state
- discount handlers
- discount types

Then perform final cleanup:
- remove orphan files only if confirmed unused
- remove dead imports
- remove dead types
- remove dead openSections keys
- remove dead filter fields
- keep naming consistent

====================================================================
STABILITY REQUIREMENTS
====================================================================

You MUST preserve stability.

That means:

- no breaking shared components
- no breaking navigation
- no breaking list/map filter synchronization
- no breaking filter serialization if used
- no breaking type safety
- no breaking current working MVP filters
- no hidden regressions from deleted state keys
- no references left to removed filter properties

If any component is shared outside Home Filter Sheet:
- do not break other pages
- isolate the change safely
- adapt only Home-specific usage if needed

====================================================================
OUTPUT REQUIRED
====================================================================

After implementation, return ONLY this structured summary:

1. CHANGES APPLIED
- exact files changed
- exact components removed
- exact components renamed
- exact filter fields removed
- exact labels changed

2. SAFETY CHECK
Confirm:
- no broken imports
- no broken types
- no broken references
- no broken navigation
- no shared component regressions detected

3. FINAL HOME FILTER STRUCTURE
List the final 12 visible blocks in order

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
If something is shared or potentially risky, refactor it in the least disruptive way possible.

====================================================================
END
====================================================================