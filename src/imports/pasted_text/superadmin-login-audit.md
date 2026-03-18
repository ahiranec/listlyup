# =====================================================================
# LISTLYUP — SUPERADMIN MOCK LOGIN
# CREDENTIAL FLOW AUDIT (EMAIL/PASSWORD MAY NOT BE APPLIED)
# =====================================================================

ROLE

Act as:
• Frontend Auth Debugger
• Login Flow Inspector
• State Propagation Auditor

⚠️ THIS IS A DEBUG / AUDIT REQUEST
⚠️ DO NOT REDESIGN UI
⚠️ DO NOT REFACTOR ARCHITECTURE
⚠️ DO NOT ADD FEATURES
⚠️ ONLY IDENTIFY WHY THE MOCK LOGIN IS NOT REFLECTING IN UI

Goal:
Audit whether the mock credentials are actually being used during login:

email: ahirane@gmail.com
password: ah901990

Observed issue:
Even after “logging in” as superadmin, the menu/profile still shows:

Guest
Free

So I need to know whether:
1) the credentials are not being checked at all,
2) the login submit is not writing the session,
3) the session is being written but never read,
4) the visible profile is reading a different source.

---------------------------------------------------------------------
I. CREDENTIAL CHECK AUDIT
---------------------------------------------------------------------

Please verify explicitly:

1️⃣ Is verifyMockCredentials(email, password) actually being called on submit?

2️⃣ Are these exact values being checked?
- ahirane@gmail.com
- ah901990

3️⃣ What happens when they match?
- Does it write localStorage?
- What exact key is written?
- What exact payload is written?

4️⃣ What happens when they do NOT match?
- Is error state shown?
- Is login blocked?

---------------------------------------------------------------------
II. SUBMIT FLOW TRACE
---------------------------------------------------------------------

Trace the real login flow step by step:

- email input value
- password input value
- submit handler
- verifyMockCredentials()
- localStorage write
- redirect
- app mount
- auth state hydration
- visible profile render

I need the exact step where the expected superadmin identity is lost
or not being applied.

---------------------------------------------------------------------
III. LOCALSTORAGE INSPECTION
---------------------------------------------------------------------

Confirm exactly which keys are used after mock login.

Check whether any of these exist:

- superadmin_session
- listlyup_auth
- currentUser
- auth_user
- social_auth_user
- any other auth/session key

For each key found, explain:
- who writes it
- who reads it
- whether it affects visible profile rendering

---------------------------------------------------------------------
IV. ROOT CAUSE DIAGNOSIS
---------------------------------------------------------------------

Answer clearly which one is true:

A) The mock credentials are NOT being checked at all
B) The credentials are checked, but session is NOT written
C) The session is written, but currentUser/profile UI does NOT consume it
D) The session is consumed for route access only, not for menu/profile
E) A different auth source overwrites the mock state after login

State the exact root cause.

---------------------------------------------------------------------
V. MINIMAL FIX REQUIRED
---------------------------------------------------------------------

Propose the MINIMAL fix only.

Do NOT redesign auth.
Do NOT add backend.
Do NOT create a new full auth system.

Just explain the minimal change needed so that:

- entering ahirane@gmail.com / ah901990
- writes the correct session
- hydrates the visible current user
- renders Antonio Hirane instead of Guest

---------------------------------------------------------------------
VI. RESPONSE FORMAT
---------------------------------------------------------------------

Respond in this structure:

SECTION 1 — Are the credentials actually being checked?
SECTION 2 — What is written to localStorage?
SECTION 3 — Where the login state is lost
SECTION 4 — Exact root cause
SECTION 5 — Minimal fix

Final line required:

MOCK LOGIN FLOW VERIFIED — ROOT CAUSE IDENTIFIED