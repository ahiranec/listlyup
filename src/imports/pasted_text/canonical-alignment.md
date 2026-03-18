Implement the frontend alignment against the canonical ListlyUp contract using these rules as fixed source of truth.

IMPORTANT
- Do NOT redesign the product.
- Do NOT reopen MVP scope.
- Do NOT propose new modules.
- Do NOT replace the canonical contract.
- Your job is to adjust the current frontend so it aligns with the canonical model.
- Where the previous audit included transitional ideas that conflict with the canonical model, follow the canonical model.

====================================================================
CANONICAL LOCK — DO NOT CHANGE
====================================================================

1. Listing contract must use:
- listing_type
- offer_mode
- visibility_mode
- owner_user_id
- primary_image_url
- listing_location_id
- access_mode
- status
- created_at
- updated_at

2. Contact model must use:
- contact_methods: Array<'in_app_chat' | 'whatsapp' | 'website' | 'social_media'>
- contact_whatsapp_phone
- contact_website_url
- contact_social_url

3. User defaults relevant to frontend:
- default_contact_method
- default_whatsapp_phone
- default_website_url
- default_social_url
- default_access_mode
- default_visibility
- default_location_id

4. Visibility must use:
- visibility_mode: 'public' | 'groups_only'
- DO NOT use 'group'
- DO NOT use 'groups'
- DO NOT use 'private'

5. Access model must use:
- access_mode: Array<'pickup' | 'meetup' | 'delivery' | 'virtual'>
- DO NOT use shipping
- DO NOT use deliveryModes as canonical naming

6. Listing classification must be split into:
- listing_type: 'product' | 'service' | 'event'
- offer_mode: 'sell' | 'trade' | 'giveaway' | 'sell_or_trade' | 'for_sale' | 'for_rent' | 'free' | 'paid'

7. Status must use only:
- active
- paused
- sold
Do NOT reintroduce draft, pending, rejected, archived into the canonical MVP layer.

8. Event naming must use:
- start_date
- end_date
- event_time_text
- event_duration_type

9. Media naming must use:
- primary_image_url
Do not keep image as canonical field naming.

10. Timestamps must use:
- created_at
- updated_at

====================================================================
IMPORTANT FILTERS FROM THE PREVIOUS AUDIT
====================================================================

ACCEPT THESE CHANGES
- Replace legacy contactModes/contact_in_app_chat/contact_whatsapp/phoneNumber logic with canonical contact model
- Split combined type field into listing_type + offer_mode
- Rename visibility to visibility_mode and use groups_only
- Rename/access delivery model to access_mode and remove shipping
- Rename ownerId to owner_user_id
- Rename image to primary_image_url
- Rename createdAt to created_at and add updated_at
- Align status to active/paused/sold
- Align event fields to canonical naming

DO NOT IMPLEMENT THESE AS CANONICAL CHANGES
- Do NOT add group_ids into the canonical listing contract
- Do NOT replace listing_location_id with an inline location object as the canonical model
- Do NOT assume country is required if the canonical contract does not require it
- Do NOT assume price_currency is required if the canonical contract does not require it
- Do NOT force a full UX redesign of contact defaults unless necessary
- Do NOT treat temporary frontend adapters as canonical schema

ALLOWED TEMPORARY FRONTEND TRANSITION
- If needed, you may create local mappers/adapters to bridge current mocks/state to canonical types during refactor.
- But the target types, props, and canonical-facing contracts must follow the canonical model above.

====================================================================
SCREENS / AREAS TO UPDATE
====================================================================

Priority order:
1. Publish Flow
2. Product Detail
3. My Listings
4. Profile
5. Settings
6. Filters
7. Action Center
8. My Groups

====================================================================
TASK
====================================================================

Implement the alignment in the current frontend.

You must:
1. update affected types/interfaces
2. update mocks/mock data structures
3. update props/state names
4. update UI labels where needed
5. update conditional rendering logic
6. keep current MVP flows working
7. avoid unnecessary redesign

For contact defaults in Profile/Settings:
- keep the canonical fields
- if UI simplification is needed, choose the least disruptive option
- do NOT invent a new product rule that overrides the canonical contract

====================================================================
OUTPUT FORMAT
====================================================================

Return in chat as continuous text, not separate docs.

At the end, include exactly these sections:

1. FILES CHANGED
2. WHAT WAS UPDATED
3. WHAT WAS KEPT AS-IS
4. TEMPORARY ADAPTERS USED
5. REMAINING MANUAL REVIEW ITEMS

Do not output a new audit.
Do the implementation-oriented adjustment only.