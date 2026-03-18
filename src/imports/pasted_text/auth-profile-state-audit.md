# =====================================================================
# LISTLYUP — AUTH / PROFILE STATE AUDIT
# SUPERADMIN LOGIN WORKS BUT UI STILL SHOWS GUEST
# =====================================================================

ROLE

Act as:
• Frontend State Debugger
• Auth Flow Auditor
• Session Persistence Reviewer
• UI Binding Inspector

⚠️ THIS IS AN AUDIT / DEBUG REQUEST
⚠️ DO NOT REDESIGN UI
⚠️ DO NOT CHANGE DASHBOARD ARCHITECTURE
⚠️ DO NOT ADD NEW FEATURES
⚠️ DO NOT EXPAND SCOPE

Goal:
Audit why login with:

email: ahirane@gmail.com
password: ah901990

successfully allows access as super_admin,
but the UI profile/menu still renders as "Guest"
instead of the logged-in super_admin identity.

By contrast, when logging in with Facebook,
the UI correctly shows "María López" with Pro badge.

This means there is likely a mismatch between:
- auth/session state
- current user/profile source
- header/menu rendering source
- superadmin mock session source

---------------------------------------------------------------------
I. PROBLEM TO AUDIT
---------------------------------------------------------------------

Observed behavior:

1) Login with mock superadmin credentials:
   ahirane@gmail.com / ah901990

2) Access to protected admin route is granted

3) But the UI account/menu panel still displays:
   Guest
   Free

4) Facebook login shows:
   María López
   Pro

Therefore, role/access and visible profile rendering are likely using different data sources.

---------------------------------------------------------------------
II. AUDIT QUESTIONS (ANSWER PRECISELY)
---------------------------------------------------------------------

1️⃣ SOURCE OF TRUTH FOR VISIBLE PROFILE

Identify exactly what object / hook / store is being used to render:

- avatar
- display name
- verification badge
- plan badge
- guest state

For example:
- currentUser.ts
- AuthContext
- useUser()
- localStorage session
- mockCurrentUser
- Supabase auth user
- fallback guest object

Explain which one is currently driving the Menu / Profile card UI.

---------------------------------------------------------------------

2️⃣ SOURCE OF TRUTH FOR SUPERADMIN ACCESS

Identify exactly what object / condition is being used to allow access to:

/superadmin

For example:
- localStorage "superadmin_session"
- role guard
- mock auth state
- hardcoded condition

Explain whether this source is DIFFERENT from the source used by the menu/profile UI.

---------------------------------------------------------------------

3️⃣ STATE MISMATCH DIAGNOSIS

Audit whether the bug is caused by one of these patterns:

A) Route guard reads mock superadmin session
   but menu UI reads app-wide currentUser guest fallback

B) Menu/profile card is still bound to old app auth state
   and not to mock superadmin session

C) Superadmin login only unlocks route
   but does not hydrate global current user state

D) Facebook login updates shared user state correctly,
   while mock admin login only updates localStorage

State clearly which of these is true.

---------------------------------------------------------------------

4️⃣ DATA FLOW TRACE

Trace the real flow from login to UI render:

- Login page submit
- verifyMockCredentials()
- session write
- redirect
- app mount
- menu render
- profile card render

Show exactly where the superadmin identity is lost
or never propagated.

---------------------------------------------------------------------

5️⃣ FIX STRATEGY (MINIMAL, NO REDESIGN)

Propose the MINIMAL fix required so that:

- superadmin mock login
- menu/profile card
- dashboard identity display
- logout
- refresh persistence

all use the SAME source of truth.

Important:
Do NOT redesign auth architecture.
Do NOT add backend.
Do NOT create a full auth system.

Only fix the mismatch.

---------------------------------------------------------------------

III. CONSTRAINTS
---------------------------------------------------------------------

The fix must:

• Preserve current dashboard structure
• Preserve current menu UI
• Preserve Facebook flow if already working
• Preserve mock superadmin access
• Not break guest fallback for unauthenticated users
• Not introduce backend dependency

Preferred approach:
Use a single frontend-readable current session source
for both:
- access control
- visible profile rendering

---------------------------------------------------------------------
IV. REQUESTED OUTPUT
---------------------------------------------------------------------

Respond in this structure:

SECTION 1 — Where the visible profile is coming from
SECTION 2 — Where superadmin access is coming from
SECTION 3 — Exact mismatch diagnosis
SECTION 4 — Minimal fix to unify state
SECTION 5 — Files/components that must be updated

Be concrete.
Name real files / hooks / stores if they exist.

Final line required:

AUTH STATE MISMATCH IDENTIFIED — MINIMAL FIX READY