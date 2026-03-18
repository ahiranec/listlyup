Continue Phase 2 implementation now and finish the remaining canonical alignment work.

IMPORTANT
- Do NOT create another audit, report, summary, plan, or estimate-first response.
- Do NOT stop at explanation.
- Do the real implementation work on the remaining files.
- Keep the canonical contract as source of truth.
- Do NOT reopen MVP scope.
- Do NOT redesign the product.

CURRENT STATUS ASSUMED
Already updated:
- Publish Flow
- Product Detail contact methods
- Action handlers for website/social
- canonical types and adapters

NOW FINISH THE REMAINING WORK

PRIORITY 1 — PROFILE DEFAULTS
Update the real Profile publishing contact defaults to align with the canonical model.

Canonical fields to use:
- default_contact_method
- default_whatsapp_phone
- default_website_url
- default_social_url
- default_access_mode
- default_visibility
- default_location_id

Rules:
- remove legacy boolean contact flags as the source of truth
- do not keep phone/email as canonical options
- if a temporary UI simplification is needed, keep it minimal and consistent with canonical fields
- do not invent non-canonical fields

Files likely involved:
- /components/profile/PublishingContactPage.tsx
- /components/profile/types.ts
- any related profile state/context files

PRIORITY 2 — FILTERS
Update the real Filters system to align with canonical naming and values.

Must align:
- contactModes -> contact_methods
- chat -> in_app_chat
- remove phone
- remove email
- add website
- add social_media
- visibility -> visibility_mode
- group/groups -> groups_only
- remove private
- deliveryModes -> access_mode
- remove shipping
- use canonical listing_type / offer_mode logic where applicable

Important:
- do not force a bad UX split if the current UI needs a transitional adapter
- but the underlying filter state and canonical-facing logic must align with the canonical model

Files likely involved:
- /components/filters/ContactSection.tsx
- /components/filters/TypeSection.tsx
- /components/filters/OfferModeSection.tsx
- /components/filters/types.ts
- /hooks/useAppFilters.ts
- any filter utils/selectors

PRIORITY 3 — MOCK DATA ACTUALLY USED BY THE UI
Migrate the actual mock data consumed by the UI so the frontend is not still fundamentally running on legacy product shape.

Goal:
- reduce adapter dependency
- make UI-facing mock data canonical wherever practical

Important rules:
- prefer real migration of mocks over indefinite adapter dependence
- if some legacy export must temporarily remain, make canonical export the primary one actually consumed by the UI
- do not claim full canonical alignment while primary UI data is still legacy

Files likely involved:
- /data/products.ts
- /data/mockUserListings.ts
- /data/trailListings.ts
- any selectors/loaders that feed cards or detail pages

PRIORITY 4 — CLEAN CANONICAL CONSISTENCY CHECK
After implementing the above, do a final pass to ensure:
- no visible phone/email contact option remains in the updated MVP flows
- no visible group/groups/private visibility values remain where canonical values should be used
- no visible shipping option remains where access_mode is now canonical
- no core updated screens still rely on old contactModes naming as their active source of truth

OUTPUT FORMAT
Return only this, in continuous text in chat:

1. FINAL FILES EDITED
2. EXACT REMAINING LEGACY PARTS, IF ANY
3. WHETHER ADAPTERS ARE STILL NEEDED, AND EXACTLY WHERE
4. ANY TRUE BLOCKER ONLY IF SOMETHING COULD NOT BE IMPLEMENTED

Do not return another implementation plan.
Do not give generic reassurance.
Do the remaining real migration work now.