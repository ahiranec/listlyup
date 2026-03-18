====================================================================
LISTLYUP — CHANGE SET MVP v2 — MY TRAIL (FINAL)
===============================================

CRITICAL CONCEPT:

* My Trail REUSES the SAME UI structure as My Listings
* BUT with DIFFERENT logic and DIFFERENT actions

DO NOT create a new component system
DO NOT duplicate UI
ADAPT existing components

====================================================================

1. STRUCTURE
   ====================================================================

USE SAME AS My Listings:

* Same list layout
* Same listing cards
* Same 3-dots menu component
* Same visual style

ONLY CHANGE:

* data source
* available actions

====================================================================
2. DATA SOURCE
==============

SHOW ONLY:

Listings owned by user where:

* status = SOLD (products only)
* status = ARCHIVED (products, services, events)

NO ACTIVE LISTINGS HERE

====================================================================
3. CARD CONTENT
===============

KEEP:

* Image
* Title
* Type (Product / Service / Event)
* Price (if applicable)
* Status badge:

  * Sold
  * Archived
* Closed date

REMOVE:

* Metrics (views, etc.)
* Any activity indicators

====================================================================
4. 3-DOTS MENU (REUSED COMPONENT — NEW LOGIC)
=============================================

IMPORTANT:

* SAME UI component as My Listings
* DIFFERENT actions

REPLACE ACTIONS WITH:

* View
* Reactivate
* Delete (optional)

REMOVE:

* Edit
* Pause
* Stats
* Mark as Sold
* Share
* Renew

RULE:

* Component is reused
* Options are fully replaced

====================================================================
5. ACTION DEFINITIONS
=====================

VIEW:

* Opens listing in read-only mode

REACTIVATE:

* Moves listing back to My Listings (active state)

DELETE:

* Permanently deletes listing

====================================================================
6. NO TRANSACTION LOGIC
=======================

REMOVE COMPLETELY:

* Buyer info
* "From / To"
* Payment details
* Delivery tracking
* Any marketplace logic

====================================================================
7. UX PRINCIPLE
===============

My Listings = manage active listings
My Trail = view and reuse closed listings

====================================================================
END — MY TRAIL CHANGE SET (FINAL)
=================================
