# ==========================================================
# LISTLYUP — SUPERADMIN CANON COMPLIANCE AUDIT
# ==========================================================

You are acting as a:

Product Architect
Platform Governance Auditor
UX Systems Reviewer
SaaS Infrastructure Designer

Your task is to audit the CURRENT SuperAdmin Dashboard implementation
against the **canonical structural foundations** defined below.

IMPORTANT:
Do NOT redesign the dashboard.
Do NOT add features yet.
Do NOT change architecture.

Your task is ONLY to:

1) audit the current implementation
2) map every canonical requirement to the UI
3) detect gaps
4) produce a Canon Compliance Matrix

This is a **governance audit**, not a redesign.

The objective is to determine:

• what already exists
• what exists partially
• what is missing
• where each capability lives in the UI
• what UX interaction currently implements it

Use the following evaluation states:

OK
PARTIAL
MISSING
NOT VERIFIABLE FROM UI


# ==========================================================
# AUDIT OUTPUT FORMAT
# ==========================================================

For each canonical item produce:

CANON ITEM
UI LOCATION
CURRENT IMPLEMENTATION
STATE (OK / PARTIAL / MISSING)
NOTES
RISK LEVEL (LOW / MEDIUM / HIGH / CRITICAL)

Example:

CANON ITEM
Force Logout

UI LOCATION
Users > Security Tab

CURRENT IMPLEMENTATION
Button "Force Logout All Sessions"

STATE
OK

NOTES
Operates at user level.

RISK LEVEL
LOW


# ==========================================================
# SUPERADMIN — FUNDAMENTOS ESTRUCTURALES INNEGOCIABLES
# ==========================================================


## 1️⃣ GOVERNANCE (Human Control)

Audit the existence of:

• change user roles (user / moderator / admin / super_admin)
• prevent system from having zero super_admin
• create staff
• demote staff to user
• suspend user
• ban user
• reactivate user
• force logout sessions
• every change logged in audit_log

If governance fails → platform loses human control.


## 2️⃣ GLOBAL MODERATION (Risk Control)

Audit the existence of:

• global moderation queue
• resolve report
• reject report
• suspend report target
• functional filters
• visible SLA indicator
• report detail with no dead ends

If moderation fails → platform loses abuse control.


## 3️⃣ PLATFORM LAUNCH CONTROL

Audit the existence of:

platform_mode

closed_beta
limited_beta
public

Freeze controls:

• freeze registrations
• freeze publishing
• freeze group creation

UX requirements:

• visible freeze banner
• strong confirmation (type to confirm or equivalent)
• audit log trace


## 4️⃣ PLANS (Business Model)

Audit if the dashboard allows:

• create plan dynamically
• activate / deactivate plan
• assign plan to user
• capabilities connected to feature_flags
• plan limits (hard / soft)
• rollout percentage prepared
• view users by plan


## 5️⃣ FEATURE FLAGS (Control Group)

Audit the existence of a feature flag system allowing:

• global toggle
• override per plan
• override per user
• grouped by category
• dependency warning if technology required
• audit log record

Important:

Feature Flags are **NOT social groups**.

They are **structural overrides for experimentation and rollout control**.

Without feature flags → incremental releases become impossible.


## 6️⃣ TECHNOLOGY REGISTRY (Flexible Infrastructure)

Audit the existence of a system allowing administrators to:

• register new technologies
• enable / disable technology
• change provider or API
• change technology version
• advanced configuration (API key, endpoint, parameters)
• rollout percentage
• shadow mode
• dependency awareness
• audit log entries

If technology registry does not exist → platform becomes hardcoded.


## 7️⃣ AUDIT LOG (Traceability)

Audit whether audit log supports:

• insert-only behavior
• filters
• expand diff (before / after)
• event types:

role_change
plan_change
flag_update
provider_change
freeze_update
ban / suspend

• non editable records


## 8️⃣ CANONICAL DATABASE CONDITIONS

Audit whether the system design implies:

• secure users.role enum
• prevention of zero super_admin
• critical changes executed via backend function
• feature_flag_overrides UNIQUE constraint
• protected system_config table
• soft delete strategy for content
• RLS aligned with roles

If these fail → UI governance becomes meaningless.


## 9️⃣ PROFESSIONAL UX REQUIREMENTS

Audit the dashboard UX for:

• zero dead clicks
• all KPI cards clickable
• confirmations used only when appropriate
• max navigation depth: 2 levels preferred
• slide panels instead of modal stacking
• sticky filters
• empty states
• persistent freeze banner


# ==========================================================
# THE FIVE NON NEGOTIABLE SYSTEM PRINCIPLES
# ==========================================================

Verify if the architecture respects these 5 structural principles:

1️⃣ Feature Flag Override System
(feature_flag_overrides)

2️⃣ Dynamic Technology Registry

3️⃣ Ability to change provider/API without redeploy

4️⃣ Platform mode + freeze control

5️⃣ Mandatory audit log


# ==========================================================
# FINAL DELIVERABLE
# ==========================================================

Produce 3 outputs:

1️⃣ CANON COMPLIANCE MATRIX

Table containing:

Canon Item
UI Location
Implementation
State
Risk


2️⃣ CANON GAP REPORT

List of missing canonical capabilities grouped by:

Governance
Moderation
Platform Control
Plans
Feature Flags
Technology Registry
Audit Log
UX


3️⃣ CANON ALIGNMENT SCORE

Calculate alignment percentage with canonical system.


# ==========================================================
# IMPORTANT RULES
# ==========================================================

Do NOT redesign.

Do NOT propose new modules.

Do NOT change navigation.

Your role is strictly:

SYSTEM GOVERNANCE AUDITOR.

Evaluate only what currently exists in the SuperAdmin dashboard.