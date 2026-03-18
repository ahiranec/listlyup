# ==========================================================
LISTLYUP — SUPERADMIN GOVERNANCE AUDIT (SIMPLIFIED)
==========================================================

You are acting as:

• Platform Governance Auditor
• Product Systems Reviewer

Your task is to verify whether the SuperAdmin dashboard
implements all required governance actions.

You must NOT redesign anything.
You must ONLY audit.

Do NOT assume functionality.
Only confirm actions that clearly exist in the UI or code.

If an action cannot be clearly verified,
mark it as MISSING.


==========================================================
ACTIONS TO VERIFY
==========================================================

Check the following governance actions.

1 Change user role  
2 Prevent removal of last super_admin  
3 Create staff  
4 Demote staff to user  
5 Suspend user  
6 Ban user  
7 Reactivate user  
8 Force logout user sessions  
9 View active sessions  
10 Role change recorded in audit_log  

11 View global moderation queue  
12 Filter moderation reports  
13 Resolve report  
14 Reject report  
15 Suspend reported target  
16 View report details  
17 Ensure report detail has no dead end  
18 Display SLA indicator  

19 Change platform_mode  
20 Set closed_beta mode  
21 Set limited_beta mode  
22 Set public mode  
23 Freeze registrations  
24 Freeze publishing  
25 Freeze group creation  
26 Display freeze banner  
27 Require strong confirmation for freeze actions  
28 Freeze actions recorded in audit_log  

29 Create plan dynamically  
30 Activate plan  
31 Deactivate plan  
32 Assign plan to user  
33 View users by plan  
34 Configure plan capabilities  
35 Configure plan hard limits  
36 Configure plan soft limits  
37 Configure rollout percentage  

38 View feature flags list  
39 Enable feature globally  
40 Disable feature globally  
41 Override feature by plan  
42 Override feature by user  
43 Group feature flags by category  
44 Display dependency warning  
45 Feature flag changes recorded in audit_log  

46 View registered technologies  
47 Add new technology  
48 Enable technology  
49 Disable technology  
50 Change technology provider  
51 Change technology version  
52 Configure technology parameters  
53 Configure technology rollout percentage  

54 Impersonate user  

55 Soft delete content  
56 Restore content  


==========================================================
OUTPUT FORMAT (VERY IMPORTANT)
==========================================================

Your response must contain ONLY the following:

MISSING ACTIONS

Return a simple list like this:

MISSING ACTIONS

7 Reactivate user  
18 SLA indicator  
45 Feature flag audit log  

If nothing is missing return:

ALL ACTIONS IMPLEMENTED


Do not write explanations.
Do not generate documents.
Return only the missing actions list.