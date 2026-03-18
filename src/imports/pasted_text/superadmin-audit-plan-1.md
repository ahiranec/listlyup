# ==========================================================
# LISTLYUP — SUPERADMIN CANONICAL ACTION AUDIT
# ==========================================================

You are acting as a:

Platform Governance Auditor
Product Systems Architect
Admin UX QA Reviewer

Your task is to audit the CURRENT SuperAdmin Dashboard implementation
against the **canonical governance system**.

This is a **strict audit of actions**.

Do NOT redesign the dashboard.
Do NOT invent functionality.
Do NOT assume implementation.

You must verify every action **directly from the UI or code**.

If an action cannot be verified:

STATE = MISSING


# ==========================================================
# RESPONSE STRUCTURE
# ==========================================================

Your response MUST contain two sections.

SECTION 1 — ACTION AUDIT MATRIX

For EACH action below return:

Action  
UI Location  
User Interaction Path  
State (OK / PARTIAL / MISSING)  
Dead End Risk (YES / NO)  
Notes


Example:

Action
Suspend User

UI Location
Users → User Panel → Sanctions Tab

User Interaction Path
Users table → select user → Sanctions → Suspend

State
OK

Dead End Risk
NO

Notes
Requires confirmation dialog.


SECTION 2 — IMPLEMENTATION PLAN

For each action marked PARTIAL or MISSING provide:

Action  
Recommended UI Location  
Required UI Element  
Implementation Priority (P0 / P1 / P2)  
Implementation Notes



# ==========================================================
# CANONICAL ACTION LIST (53 ACTIONS)
# ==========================================================


# ==========================================================
# 1️⃣ GOVERNANCE (USERS)
# ==========================================================

1 Change user role

2 Prevent removal of last super_admin

3 Create staff

4 Demote staff to user

5 Suspend user

6 Ban user

7 Reactivate user

8 Force logout user sessions

9 View active sessions

10 Ensure role change recorded in audit_log



# ==========================================================
# 2️⃣ GLOBAL MODERATION
# ==========================================================

11 View global moderation queue

12 Filter moderation reports

13 Resolve report

14 Reject report

15 Suspend reported target

16 View report details

17 Ensure report detail has no dead end

18 Display SLA indicator



# ==========================================================
# 3️⃣ PLATFORM CONTROL
# ==========================================================

19 Change platform_mode

20 Set closed_beta mode

21 Set limited_beta mode

22 Set public mode

23 Freeze registrations

24 Freeze publishing

25 Freeze group creation

26 Display freeze banner when active

27 Require strong confirmation for freeze actions

28 Record freeze actions in audit_log



# ==========================================================
# 4️⃣ PLANS (BUSINESS MODEL)
# ==========================================================

29 Create plan dynamically

30 Activate plan

31 Deactivate plan

32 Assign plan to user

33 View users by plan

34 Configure plan capabilities

35 Configure plan hard limits

36 Configure plan soft limits

37 Configure rollout percentage



# ==========================================================
# 5️⃣ FEATURE FLAGS (CONTROL GROUP)
# ==========================================================

38 View feature flags list

39 Enable feature globally

40 Disable feature globally

41 Override feature by plan

42 Override feature by user

43 Group feature flags by category

44 Display dependency warning

45 Record feature flag changes in audit_log



# ==========================================================
# 6️⃣ TECHNOLOGY REGISTRY (INFRASTRUCTURE)
# ==========================================================

46 View registered technologies

47 Add new technology

48 Enable technology

49 Disable technology

50 Change technology provider

51 Change technology version

52 Configure technology parameters

53 Configure technology rollout percentage



# ==========================================================
# UX GOVERNANCE VALIDATION
# ==========================================================

Additionally verify:

• All KPI cards are clickable  
• No dead-end screens exist  
• Navigation depth ≤ 2 levels  
• Slide panels used instead of stacked modals  
• Filters are sticky  
• Empty states exist  
• Freeze banner persists globally


# ==========================================================
# FINAL OUTPUT
# ==========================================================

Return:

1️⃣ ACTION AUDIT MATRIX  
(all 53 actions)

2️⃣ IMPLEMENTATION PLAN  
(for every PARTIAL or MISSING action)

3️⃣ SUMMARY

Total OK actions  
Total PARTIAL actions  
Total MISSING actions