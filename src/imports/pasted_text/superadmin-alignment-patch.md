# ==========================================================
# LISTLYUP — SUPERADMIN CANON ALIGNMENT PATCH
# ==========================================================

You are acting as:

Platform Governance Architect
SaaS Infrastructure Designer
Admin Systems Engineer

Your task is to ALIGN the current SuperAdmin Dashboard implementation
with the **canonical structural foundations** defined previously.

IMPORTANT RULES

DO NOT redesign the dashboard.
DO NOT change the navigation structure.
DO NOT remove existing modules.
DO NOT refactor working components.

This is a **SURGICAL PATCH**.

You may ONLY:

• add missing capabilities
• extend existing modules
• preserve architecture
• preserve UX patterns already used

Current modules must remain:

Overview
Users
Moderation
Configuration
Audit Log

Do not create new root modules.

Only extend existing sections.


# ==========================================================
# OBJECTIVE
# ==========================================================

Close the gaps detected in the Canon Compliance Audit.

Target alignment after patch:

≈ 90–95% Canon Compliance

The patch must implement ONLY the missing canonical systems.


# ==========================================================
# PATCH AREA 1 — ZERO SUPER ADMIN PROTECTION
# ==========================================================

Problem identified:

System does not visibly enforce prevention of deleting or demoting
the last remaining super_admin.

Required implementation:

When changing a user role FROM super_admin:

System must check:

remaining_super_admin_count > 1

If not:

Block action.

UI behavior:

Confirmation modal must show:

"You cannot remove the last Super Admin.
At least one Super Admin must exist."

Log event in audit_log:

role_change_blocked


# ==========================================================
# PATCH AREA 2 — DYNAMIC PLAN SYSTEM
# ==========================================================

Current state:

Plans appear static.

Canon requires dynamic plan management.

Extend Configuration module with:

Configuration
 → Plans

Capabilities required:

Create Plan
Edit Plan
Activate / Deactivate Plan
Assign Plan to Users
View Users by Plan

Plan properties:

Plan Name
Status (active/inactive)
Hard Limits
Soft Limits
Capabilities

Capabilities must connect to:

feature_flags

Plan UI must include:

Users count
Capabilities list
Enable/disable capabilities


# ==========================================================
# PATCH AREA 3 — FEATURE FLAG SYSTEM
# ==========================================================

Feature Flags are currently only visible in metrics.

Canon requires a full control system.

Extend:

Configuration
 → Feature Flags

Feature Flag properties:

Name
Category
Description
Global Status
Dependencies
Created Date

Required capabilities:

Global Toggle

Override by Plan

Override by User

Grouped by Category

Dependency Warning

Audit Log entry for any change


UI interaction model:

Feature flag list

Click → Slide panel


Panel tabs:

Overview
Rollout
Overrides


Rollout section:

Global toggle
Rollout percentage


Overrides section:

Plan overrides

User overrides


Example override UI:

Enable for Plan:
Free
Pro
Enterprise

Enable for User:
[Search user]


All changes must create:

audit_log event

flag_update


# ==========================================================
# PATCH AREA 4 — TECHNOLOGY REGISTRY
# ==========================================================

This is one of the most important canonical systems.

Extend:

Configuration
 → Infrastructure

Technology Registry allows administrators to manage
external and internal technologies used by the platform.

Technology properties:

Technology Name
Category
Provider
Version
Status
Configuration
Dependencies

Examples:

AI Provider
Search Engine
Payment Gateway
Notification System
Moderation AI


Required capabilities:

Add Technology

Enable / Disable Technology

Change Provider

Change Version

Advanced Configuration

Rollout %

Shadow Mode

Dependency Awareness


Provider switching must allow:

Changing provider without redeploy.


Example:

AI Provider

OpenAI
Anthropic
Azure OpenAI


Switching provider must trigger:

audit_log event

provider_change


# ==========================================================
# PATCH AREA 5 — FEATURE FLAG / TECHNOLOGY DEPENDENCIES
# ==========================================================

Feature flags may depend on technologies.

Example:

AI Listing Generator
requires
AI Provider

If dependency inactive:

Show warning badge.

Example message:

"This feature requires AI Provider to be enabled."


# ==========================================================
# PATCH AREA 6 — AUDIT LOG EXTENSION
# ==========================================================

Extend audit log coverage.

Ensure the following events appear:

role_change
role_change_blocked
plan_change
plan_created
plan_deactivated
flag_update
provider_change
freeze_update
ban
suspend

Audit entries must support:

expand diff

showing before / after values.


# ==========================================================
# UX REQUIREMENTS
# ==========================================================

Preserve existing UX patterns.

Use only patterns already present in the dashboard.

Allowed interaction types:

Tables
Slide Panels
Tabs
Confirmation Dialogs

Avoid:

Nested modals
Deep navigation

Maintain:

max navigation depth ≈ 2


Ensure:

All KPI cards clickable.

Freeze banner visible when any freeze active.

Empty states when no data.


# ==========================================================
# FINAL VALIDATION
# ==========================================================

After implementing the patch verify that the dashboard now supports:

1️⃣ Feature Flag Override System

2️⃣ Dynamic Technology Registry

3️⃣ Provider switching without redeploy

4️⃣ Platform mode + freeze

5️⃣ Mandatory audit log


If these 5 exist the system becomes:

Governable Platform Infrastructure.


# ==========================================================
# OUTPUT REQUIRED
# ==========================================================

Return:

1) Summary of changes applied
2) New UI elements introduced
3) Updated Canon Compliance Score
4) Confirmation that architecture was preserved