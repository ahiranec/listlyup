Migrate ProductDetailPage to canonical-native runtime now.

IMPORTANT
- Do NOT create reports, documentation, comments-only changes, or migration plans.
- Do NOT say it is too large and stop.
- Do the real refactor work on ProductDetailPage and the directly-related active child components it depends on.
- No new features.
- No redesign.
- No scope expansion.
- The canonical contract is the source of truth.

GOAL
Remove ProductDetailPage as the main legacy blocker and eliminate the need for App.tsx to convert the selected listing into Product for the active detail flow.

TARGET
The active Product Detail runtime path must use CanonicalListing directly.

CANONICAL FIELDS TO USE
- listing_type
- offer_mode
- title
- description
- category
- subcategory
- tags
- primary_image_url
- price_amount
- price_currency
- condition
- pricing_model
- business_hours
- event_duration_type
- start_date
- end_date
- event_time_text
- visibility_mode
- contact_methods
- contact_whatsapp_phone
- contact_website_url
- contact_social_url
- access_mode
- status
- created_at
- updated_at
- owner_user_id
- listing_location_id

REQUIREMENTS

1. REFACTOR PRODUCTDETAILPAGE IN THE ACTIVE PATH
- Change ProductDetailPage to receive CanonicalListing directly.
- Remove Product-only assumptions from the active detail flow.
- Replace legacy field access with canonical field access.
- Do not introduce pseudo-canonical aliases as a permanent solution.

2. MIGRATE DIRECTLY-RELATED CHILD COMPONENTS
Update only the child components actually required for the active Product Detail flow, such as:
- ProductActions
- ProductHeaderCompact
- ProductMetadataCompact
- ContactMethods
- any detail section directly receiving the listing object

Important:
- If a child only needs primitive props, pass canonical-derived primitives directly.
- Avoid spreading full legacy Product shape deeper if not needed.

3. RUNTIME SAFETY
Add real null/undefined safety for optional canonical fields:
- primary_image_url
- price_amount
- price_currency
- condition
- subcategory
- contact_whatsapp_phone
- contact_website_url
- contact_social_url
- business_hours
- start_date
- end_date
- event_time_text

Ensure:
- no broken CTA buttons
- no broken links
- no unsafe string/array access
- safe fallback rendering where fields are absent

4. APP.TSX CLEANUP FOR DETAIL FLOW
- Remove the canonicalToProduct() conversion used for ProductDetailPage.
- App.tsx must pass CanonicalListing directly into the detail flow.

5. KEEP SCOPE TIGHT
- Do NOT migrate MapView or GroupDetailPage in this step.
- Do NOT touch unrelated pages.
- Focus only on ProductDetailPage runtime closure.

OUTPUT FORMAT
Return ONLY:
1. FILES EDITED
2. EXACT REAL CODE CHANGES MADE
3. APP.TSX ADAPTER USAGE REMAINING AFTER THIS PRODUCT DETAIL REFACTOR
4. TRUE BLOCKER ONLY IF SOMETHING COULD NOT BE MIGRATED

Do actual runtime refactor work now.
Not documentation.
Not comments.
Not summaries.