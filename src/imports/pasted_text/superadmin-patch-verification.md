# ==========================================================
# LISTLYUP — SUPERADMIN PATCH VERIFICATION
# ==========================================================

You are acting as:

Product QA Auditor
Platform Governance Reviewer
UX Systems Verifier

Your task is NOT to implement anything.

Your task is to VERIFY that the previously reported
SuperAdmin Dashboard patch actually exists in the UI.

Do NOT assume implementation.
Do NOT restate the previous report.

You must inspect the actual UI code and behavior.


# ==========================================================
# VERIFICATION RULE
# ==========================================================

For each capability listed below you must provide:

1) UI LOCATION
2) EXACT UI ELEMENT (button, dialog, slider, tab, etc.)
3) USER ACTION PATH (step-by-step click path)
4) STATE (CONFIRMED / PARTIAL / NOT FOUND)
5) SHORT NOTE

If you cannot find the UI element:

STATE = NOT FOUND

Do not guess.


# ==========================================================
# SECTION 1 — ZERO SUPER ADMIN PROTECTION
# ==========================================================

Verify the existence of:

Blocking logic preventing removal of the last super_admin.

Verification requirements:

• Attempt to change role from super_admin to another role
• System must check remaining_super_admin_count

Verify UI elements:

• Warning dialog appears
• Message: "Cannot remove the last Super Admin"
• Action is blocked

Confirm:

Where the validation is implemented.

Expected location:

Users → User Panel → Roles Tab


# ==========================================================
# SECTION 2 — DYNAMIC PLAN SYSTEM
# ==========================================================

Verify existence of:

Create Plan functionality.

Required UI elements:

CreatePlanDialog

Verification:

1) Where is the button to create a new plan?
2) What dialog opens?
3) Which fields exist?

Expected fields:

Plan Name
Plan Status
Hard Limits
Soft Limits
Capabilities

Verify actions:

• Activate plan
• Deactivate plan
• Assign plan to user
• View users count per plan


# ==========================================================
# SECTION 3 — FEATURE FLAG SYSTEM
# ==========================================================

Verify that a Feature Flag management UI exists.

Expected location:

Configuration → Feature Flags

Verify UI structure:

Feature Flags table

Click flag → Slide Panel

Panel must contain tabs:

Overview
Rollout
Overrides


# ==========================================================
# SECTION 4 — USER OVERRIDE FEATURE FLAGS
# ==========================================================

Verify existence of user-level overrides.

Expected UI behavior:

In FeatureFlagPanel → Overrides tab

There must be:

• list of user overrides
• search user input
• add override button
• remove override button

Confirm whether:

User-level override actually exists in UI.


# ==========================================================
# SECTION 5 — FEATURE FLAG ROLLOUT CONTROL
# ==========================================================

Verify existence of:

Rollout percentage control.

Expected UI element:

Slider 0–100%

Confirm:

Location of slider
Interaction behavior


# ==========================================================
# SECTION 6 — DEPENDENCY WARNINGS
# ==========================================================

Verify whether feature flags display dependency warnings.

Example:

Feature requires a technology provider.

Expected UI element:

Yellow warning banner.

Confirm:

Where dependency list appears.


# ==========================================================
# SECTION 7 — CONFIRMATION DIALOG WARNING TYPE
# ==========================================================

Verify the existence of:

Severity = "warning"

ConfirmationDialog type.

Confirm:

UI behavior:

Warning dialog should show:

Message
Single button: OK

No confirmation text required.


# ==========================================================
# SECTION 8 — PLAN ACTIVATION
# ==========================================================

Verify whether plans can be activated/deactivated.

Expected UI element:

Activate / Deactivate button per plan.


# ==========================================================
# SECTION 9 — SCORE VALIDATION
# ==========================================================

Based on the verification above, recompute:

Canon Alignment Score.

Do NOT reuse the previous score.

Compute new score using only:

CONFIRMED items.


# ==========================================================
# FINAL OUTPUT REQUIRED
# ==========================================================

Return:

1) VERIFICATION MATRIX

Capability
UI Location
User Path
State
Notes


2) VERIFIED CANON ALIGNMENT SCORE


3) LIST OF CLAIMED FEATURES THAT COULD NOT BE VERIFIED