You are auditing the current ListlyUp frontend against the NEW canonical backend/frontend contract source of truth.

IMPORTANT:
Do not rely on previous assumptions or older frontend-driven schemas.
From this prompt onward, the source of truth is the canonical model described below.

====================================================================
CANONICAL CONTEXT — LISTLYUP MVP
====================================================================

GENERAL RULES
- MVP scope is already locked.
- Do not redesign the product from scratch.
- Do not reopen scope.
- Do not invent new modules.
- Only detect alignment gaps between the current frontend and the canonical contract.

CORE CANONICAL PRINCIPLES
- User publishes as person in MVP.
- listing_location is the source of truth for each listing.
- profile/default location is only a user default.
- groups are modeled via group_memberships and listing_groups.
- Action Center is backed by event_log + action_items.
- moderation is separate from listing/user core entities.
- metrics do not live inline in users or listings.
- category, subcategory, and tags are separate concepts.
- backend must remain future-ready without polluting MVP UI.

CORE MVP ENTITIES RELEVANT TO FRONTEND
- users
- user_settings
- locations
- listings
- listing_media
- groups
- group_memberships
- listing_groups
- listing_favorites
- listing_questions
- listing_question_answers
- conversations
- conversation_participants
- messages
- reports
- moderation_actions
- action_items
- feature_flags
- user_feature_settings

LISTING CANONICAL CONTRACT
- listing_type: 'product' | 'service' | 'event'
- offer_mode: 'sell' | 'trade' | 'giveaway' | 'sell_or_trade' | 'for_sale' | 'for_rent' | 'free' | 'paid'
- title
- description
- category
- subcategory
- tags[]
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
- listing_location_id
- visibility_mode: 'public' | 'groups_only'
- contact_methods: Array<'in_app_chat' | 'whatsapp' | 'website' | 'social_media'>
- contact_links:
  - whatsapp_phone
  - website_url
  - social_url
- access_mode: Array<'pickup' | 'meetup' | 'delivery' | 'virtual'>
- status: 'active' | 'paused' | 'sold'

IMPORTANT CONTACT MODEL CHANGE
Old frontend logic such as:
- contact_in_app_chat
- contact_whatsapp
- contact_phone_number

must now be considered outdated and replaced by:
- contact_methods
- contact_whatsapp_phone
- contact_website_url
- contact_social_url

USER CANONICAL CONTRACT RELEVANT TO FRONTEND
- id
- email
- username
- name
- account_type
- avatar_url
- bio
- phone
- profile_location_id
- default_contact_method: 'in_app_chat' | 'whatsapp' | 'website' | 'social_media'
- default_whatsapp_phone
- default_website_url
- default_social_url
- default_access_mode
- default_visibility
- default_location_id
- language
- region

GROUP CANONICAL CONTRACT RELEVANT TO FRONTEND
- name
- description
- image_url
- access_type
- location_id
- who_can_post
- who_can_invite
- who_can_moderate
- auto_approve_listings
- is_archived
- is_deleted
- members_count
- listings_count

MESSAGING CANONICAL MODEL
- conversations
- conversation_participants
- messages
Frontend may still behave as 1:1 chat, but the data model must not assume a flat chat structure.

Q&A MODEL
- listing_questions
- listing_question_answers

ACTION CENTER MODEL
- action_items is the actionable inbox
- event_log is the event source
Do not invent separate parallel systems.

====================================================================
YOUR TASK
====================================================================

Audit the CURRENT frontend and identify only the UI/data-binding/type/mock changes required to align it with this canonical model.

PRIORITY SCREENS
- Publish Flow
- Product Detail
- My Listings
- Profile
- Settings
- Action Center
- My Groups

SPECIAL PRIORITY
Check every place where old contact logic is still present and map it to the canonical contact model.

FOR EACH MISMATCH, RETURN:
1. page/component name
2. current issue
3. exact canonical mismatch
4. required fix
5. whether this is MVP NOW or should remain hidden for now
6. whether mocks/types/props/state must change

IMPORTANT RULES
- Do not propose new features
- Do not expand scope
- Do not redesign flows from scratch
- Do not move into Future Near modules
- Keep the answer in continuous text in chat
- Output a practical mismatch/fix list only