Run a FINAL CROSS-FLOW QA & STABILITY PASS for the canonical MVP now.

IMPORTANT
- Do NOT create a report-only response.
- Do NOT redesign UI.
- Do NOT add features.
- Do NOT expand scope.
- Focus only on stability, correctness, and canonical consistency.
- Fix real issues in code.

SCOPE (ONLY THESE FLOWS)
- Home / Feed (listing rendering)
- ProductDetailPage
- MapView
- GroupDetailPage
- Publish Flow (basic submit path only)

GOAL
Ensure the entire active MVP runtime is:
- 100% canonical in data flow
- stable (no crashes)
- safe (no undefined access)
- consistent (no hidden legacy drift)

--------------------------------------------------
PRIORITY 1 — REMOVE ANY REMAINING HIDDEN LEGACY USAGE
--------------------------------------------------

Search across the codebase for:
- Product type usage in active flows
- product.*
- canonicalToProduct()
- productToCanonical()
- legacy field names (type, price, image, ownerId, etc.)

Fix ONLY if they affect active flows listed above.

Do NOT touch:
- deprecated files
- unused components
- out-of-scope modules

--------------------------------------------------
PRIORITY 2 — RUNTIME SAFETY (CRITICAL)
--------------------------------------------------

Verify ALL active flows handle optional canonical fields safely:

Fields to audit:
- primary_image_url
- price_amount / price_currency
- contact_methods
- contact_whatsapp_phone
- contact_website_url
- contact_social_url
- access_mode
- visibility_mode
- condition
- subcategory
- start_date / end_date / event_time_text
- location-related data

Ensure:
- no undefined crashes
- no unsafe string formatting
- no unsafe array access
- no broken buttons/links
- no silent failures

--------------------------------------------------
PRIORITY 3 — UI CONSISTENCY WITH CANONICAL MODEL
--------------------------------------------------

Verify visible UI uses canonical logic:

- listing_type + offer_mode mapping correct
- price display always derived from amount + currency
- contact buttons match contact_methods[]
- no "phone", "email", "shipping", "private" anywhere
- labels consistent: "In-App Chat", "Groups Only", "Delivery"

--------------------------------------------------
PRIORITY 4 — CROSS-FLOW CONSISTENCY
--------------------------------------------------

Ensure consistency between flows:

- Publish → Product Detail → Map → Group all interpret fields the same
- No conflicting mappings of:
  - type
  - price
  - contact methods
  - visibility
- Same listing should render consistently across all views

--------------------------------------------------
PRIORITY 5 — APP.TSX FINAL CHECK
--------------------------------------------------

Verify:

- canonicalListings is the single source of truth
- no central legacy conversion layer exists
- canonicalToProduct() is NOT used in active flows
- only allowed if strictly outside current scope

--------------------------------------------------
OUTPUT FORMAT (STRICT)
--------------------------------------------------

Return ONLY:

1. FILES EDITED
2. EXACT REAL FIXES APPLIED (ONLY REAL CHANGES)
3. WHETHER ANY LEGACY OR NON-CANONICAL USAGE STILL EXISTS IN ACTIVE FLOWS
4. TRUE BLOCKER (ONLY IF SOMETHING CANNOT BE FIXED)

Do the real QA + fixes now.
No summaries.
No explanations.
No plans.