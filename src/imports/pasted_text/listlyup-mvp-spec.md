====================================================================
LISTLYUP — MVP CANONICAL SPEC
SOURCE OF TRUTH FOR AUDIT
====================================================================


PRODUCT CONCEPT

ListlyUp is a marketplace-style platform where users can:

- publish products
- publish services
- publish events

Other users can:

- discover listings
- ask public questions
- contact the listing owner

The platform DOES NOT control transactions.

Transactions can happen:

- via internal chat
- via WhatsApp
- via external website
- outside the platform



MVP PRINCIPLES

The MVP prioritizes:

- fast publishing
- discovery of listings
- user-to-user contact
- simple flows



OUT OF MVP

The following are explicitly OUT of MVP:

- payments inside the platform
- negotiation systems
- offers
- auctions
- wallet
- transaction commissions
- advanced reputation system
- campaign systems
- event management module
- AI recommendation feeds
- personalized feed
- fully automated AI moderation



CORE DOMAIN OBJECT

Main object:

LISTING



LISTING TYPES

- product
- service
- event



OFFER MODES

PRODUCT

- for_sale
- for_trade
- for_free

SERVICE

- for_sale
- for_rent

EVENT

- for_sale
- for_free



FRONTEND ROUTES (MVP)

The MVP includes the following pages:

- Home
- Publish Flow
- Listing Detail
- My Listings
- My Groups
- My Trail
- Favorites
- Profile
- Settings
- Action Center
- Superadmin Dashboard



HOME PAGE

The Home page has two views:

- List View
- Map View


Header includes:

- logo
- search bar
- notification icon


MVP decision:

Notification icon opens:

ACTION CENTER

There is no separate notifications page.



QUICK FILTER BAR

Filters include:

- view toggle (list / map)
- listing type (product / service / event)
- group filter (all / public / my groups / specific group)
- offer mode (dynamic)
- sorting
- advanced filters



LIST VIEW

Listings are displayed as Listing Cards.



LISTING CARD STRUCTURE

Section 1 — Image

Overlay badges:

- listing type badge
- public/group badge
- favorite heart


Favorite heart action:

toggle favorite



Section 2 — Content

Common fields:

- title
- price
- currency
- location


Product:

- condition badge


Service:

- pricing model badge


Event:

- event dates
- single/multi day badge



MAP VIEW

Map shows listing pins.

Blue pins:

accessible listings

Grey pins:

group listings user cannot access


Clicking a pin shows:

Mini Listing Card carousel.



LISTING DETAIL PAGE

Includes:

- listing images
- listing information
- start chat button
- favorite button
- report button
- Q&A section


Q&A system:

- public
- visible to everyone
- only listing owner can answer.



COMMUNICATION SYSTEM

Three communication types exist.


1. SALES CHAT

Private conversation between:

interested user
and listing owner

Initiated from Listing Detail.



2. MODERATION CHAT

Started by:

- reports
- administrators



3. Q&A

Public questions and answers on listings.



MY LISTINGS

User can see:

- active listings
- paused listings
- closed listings


Available actions:

- edit
- pause
- reactivate
- close
- delete


Closing a listing moves it to:

MY TRAIL.



MY TRAIL

History of closed listings.

Types:

- sold
- archived


Does NOT include:

- buyer
- payments
- commission
- confirmation flows.



MY GROUPS

Users can:

- see groups
- create groups
- join groups
- publish inside groups
- basic moderation.



FAVORITES

Simple list of favorited listings.

Listings are added via heart icon.



PROFILE

Includes:

- basic user information
- location
- contact.



SETTINGS

Includes:

- basic privacy settings
- basic notification settings.



ACTION CENTER

Centralized hub for:

- sales chats
- moderation chats
- reports
- notifications

There are no separate pages for:

- notifications
- messages



SUPERADMIN DASHBOARD

Visible only to superadmin.

Allows:

- view users
- view listings
- see AI usage


Feature flags available:

- voice_input
- image_ai
- ai_moderation
- map_provider



DATABASE TABLES USED IN MVP

users

listings

groups

group_members

conversations

messages

listing_questions

listing_answers

listing_favorites

reports

feature_flags

ai_usage_logs



DATABASE TABLES PRESENT BUT NOT USED IN MVP

organizations

transaction_details

price_history

plan_overrides

advanced_lifecycle

campaign_linking

event_module

wallet

reputation

analytics_extended



====================================================================
END OF MVP SPEC
====================================================================