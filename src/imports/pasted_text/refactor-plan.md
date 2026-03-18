Run a STABILITY & CANONICAL REFACTOR pass on the current ListlyUp frontend.

IMPORTANT
- Do NOT add new features.
- Do NOT redesign UI/UX.
- Do NOT expand MVP scope.
- Do NOT create another high-level plan or long report.
- Focus on stability, correctness, and canonical consistency only.

GOAL
Ensure the system is stable, internally consistent, and strictly aligned with the canonical contract before continuing development.

====================================================================
PHASE 1 — CANONICAL CONTRACT VERIFICATION
====================================================================

Verify that all active code uses the EXACT canonical field names and structure.

Canonical must be the source of truth:
- listing_type
- offer_mode
- contact_methods
- contact_whatsapp_phone
- contact_website_url
- contact_social_url
- visibility_mode
- access_mode
- primary_image_url
- created_at
- updated_at
- owner_user_id

Check and FIX any incorrect or drifted fields such as:
- group_ids (should NOT replace canonical relation model)
- listing_status (should be status)
- item_condition (should match canonical naming)
- primary_category / secondary_category (validate against canonical)
- location.address used as source instead of canonical location model

If mismatches exist:
- correct them to canonical naming
- do NOT create alternative “pseudo-canonical” fields

====================================================================
PHASE 2 — ADAPTER MINIMIZATION
====================================================================

Identify all adapter usage:
- canonicalToProduct
- productToCanonical
- any legacy mapping helpers

Then:
- remove adapter usage wherever possible
- keep adapters ONLY where absolutely necessary
- ensure there is NO canonical → legacy → canonical ping-pong
- ensure adapters are NOT used in core flows (filters, visibility, publish, main feed)

If ProductDetailPage or similar still requires Product:
- keep a SINGLE boundary adapter, clearly isolated
- do NOT spread adapter usage across the app

====================================================================
PHASE 3 — DATA FLOW CLEANUP
====================================================================

Ensure clean, single-direction data flow:

- App should consume canonicalListings directly
- Hooks (filters, visibility, search) must use CanonicalListing
- No hidden conversions inside hooks or components

Fix:
- any mixed usage of Product vs CanonicalListing in the same flow
- any duplicated logic due to dual models

====================================================================
PHASE 4 — TYPE & FILE CONSOLIDATION
====================================================================

- Ensure canonical types are defined in ONE clear place (/types/canonical.ts)
- Remove duplicate or conflicting type definitions
- Ensure imports are consistent (no shadow types)
- Remove unused legacy types where safe

====================================================================
PHASE 5 — LIGHT QA FIXES (CODE-LEVEL)
====================================================================

Without adding features:

- fix null/undefined risks (especially optional canonical fields)
- ensure safe access (optional chaining where needed)
- ensure no runtime errors from missing canonical fields
- ensure price, contact, and location rendering are safe

====================================================================
OUTPUT FORMAT
====================================================================

Return ONLY:

1. FILES EDITED
2. EXACT FIXES APPLIED (short bullet points)
3. ADAPTER USAGE AFTER REFACTOR (where and why)
4. ANY FIELD NAME CORRECTIONS MADE TO MATCH CANONICAL

Do NOT return a plan.
Do NOT say “everything is fine” without changes.
Do the actual refactor work.