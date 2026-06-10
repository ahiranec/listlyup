# =====================================================================
# LISTLYUP — SUPERADMIN V2
# MINIMAL SUPERADMIN ACCESS IMPLEMENTATION
# FRONTEND MOCK LOGIN (NO BACKEND)
# =====================================================================

ROLE

Act as:
• Frontend Implementation Engineer
• Access Layer Integrator
• UI Stability Preserver

⚠️ THIS IS NOT A REDESIGN
⚠️ DO NOT MODIFY DASHBOARD ARCHITECTURE
⚠️ DO NOT ADD SANDBOX
⚠️ DO NOT ADD BACKEND
⚠️ DO NOT EXPAND SCOPE
⚠️ DO NOT CHANGE SIDEBAR OR MODULES

Goal:
Allow entry into the SuperAdmin Dashboard using a simple frontend-only mock login.

Nothing more.

---------------------------------------------------------------------
I. OBJECTIVE
---------------------------------------------------------------------

Enable a minimal frontend-only login simulation using:

Email: ahirane@gmail.com  
Password: ah901990  

Role assigned: super_admin

This must allow access to:

/superadmin

No other roles required.
No database required.
No authentication provider required.

---------------------------------------------------------------------
II. IMPLEMENTATION REQUIREMENTS
---------------------------------------------------------------------

1️⃣ Create a minimal mock auth state

Create:

/dev/mockAuth.ts

Structure:

export const mockSuperAdmin = {
  id: "sa_001",
  name: "Antonio Hirane",
  email: "ahirane@gmail.com",
  role: "super_admin"
};

export function verifyMockCredentials(email: string, password: string) {
  return email === "ahirane@gmail.com" && password === "ah901990";
}

---------------------------------------------------------------------

2️⃣ Create a minimal Login Page (frontend only)

Route:
/admin-login

UI:

• Email input
• Password input
• Login button

Behavior:

On submit:
- If credentials match mockSuperAdmin → store session in localStorage
- Else → show error toast

Store session as:

localStorage.setItem("superadmin_session", JSON.stringify(mockSuperAdmin));

No encryption required (dev-only).
No auth provider required.

---------------------------------------------------------------------

3️⃣ Protect SuperAdmin Route

Route:
/superadmin

Before rendering <SuperAdminDashboard />

Check:

const session = localStorage.getItem("superadmin_session");

If no session:
→ Redirect to /admin-login

If session exists:
→ Parse and confirm role === "super_admin"
→ Render dashboard

If role mismatch:
→ Render Access Denied screen

---------------------------------------------------------------------

4️⃣ Add Logout Button

Inside SuperAdminDashboard header area:

Add:

[Logout]

On click:
- localStorage.removeItem("superadmin_session")
- Redirect to /admin-login

---------------------------------------------------------------------

III. RESTRICTIONS
---------------------------------------------------------------------

• Do NOT modify dashboard layout.
• Do NOT change modules.
• Do NOT touch mock datasets.
• Do NOT add backend calls.
• Do NOT add user management.
• Do NOT implement full auth system.
• Do NOT introduce context providers.

This is a temporary development-only access layer.

---------------------------------------------------------------------

IV. VALIDATION CRITERIA
---------------------------------------------------------------------

The following must work:

1) Visiting /superadmin without login → redirect to /admin-login
2) Login with:
   ahirane@gmail.com / ah901990 → access granted
3) Wrong password → error message
4) Refresh page → still logged in
5) Logout → session cleared
6) Direct access blocked if no session

No additional functionality required.

---------------------------------------------------------------------

Final line required:

SUPERADMIN MOCK ACCESS IMPLEMENTED — FRONTEND LOGIN ACTIVE