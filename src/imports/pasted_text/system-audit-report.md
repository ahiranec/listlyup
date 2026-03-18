LISTLYUP — MASTER SYSTEM AUDIT (PHASE 1 — FULL REPO UNDERSTANDING)

ROLE:
You are acting as a Senior Software Architect + Code Auditor.

CRITICAL RULE:
DO NOT REFACTOR
DO NOT IMPLEMENT
DO NOT SUGGEST UI CHANGES
DO NOT CLEANUP

ONLY OBSERVE, MAP, AND REPORT THE REAL CURRENT SYSTEM

--------------------------------------------------
OBJECTIVE
--------------------------------------------------

Build a COMPLETE and ACCURATE understanding of the current repo state.

We need to know EXACTLY how the system works today before touching architecture.

--------------------------------------------------
SCOPE (FULL REPO)
--------------------------------------------------

Analyze ALL of the following:

1. Routes / Navigation
2. Pages (entry points)
3. Components (shared + page-level)
4. Hooks
5. Data sources (mocks, inline data, props, state)
6. Helpers / utils
7. Current data flow
8. Imports graph (high level)
9. Legacy / unused signals
10. Docs presence (only as signal, not content)

--------------------------------------------------
WHAT TO DETECT
--------------------------------------------------

1. ACTIVE SYSTEM

- What routes are actually active
- What pages are rendered
- What components are truly in use
- What flows are real (navigation + UI)

2. DATA FLOW (CRITICAL)

- Where data comes from:
  - inline
  - mocks
  - props
  - local state

- How data travels:
  - page → component
  - component → component
  - hooks usage

3. DATA SHAPE PROBLEMS

- Same entity with different shapes
- Inconsistent naming
- UI shape tied to mock shape

4. COUPLING

Detect where things are wrongly coupled:

- UI importing mocks directly
- Pages handling business logic
- Components doing data transformation
- Cross-imports between unrelated modules

5. MOCK STRATEGY

- Where mocks live
- If mocks are duplicated
- If mocks are embedded in pages
- If there is any centralization

6. STRUCTURAL SMELLS

- Very large components
- Pages with too much logic
- Repeated patterns
- Dead or suspicious files (only signal, not deletion)

7. FUTURE / LEGACY SIGNALS

- Files that look future-ready but still connected
- Files that look legacy but still referenced

--------------------------------------------------
OUTPUT FORMAT (STRICT)
--------------------------------------------------

A. ACTIVE ROUTES MAP  
(list all routes and what page they render)

B. ACTIVE PAGES  
(list pages and their role)

C. DATA FLOW MAP (TEXTUAL)  
(explain how data flows through the system step by step)

D. DATA SOURCES  
(where data actually comes from today)

E. MAIN INCONSISTENCIES  
(bullet list of structural/data inconsistencies)

F. COUPLING ISSUES  
(where architecture boundaries are broken)

G. MOCK STRATEGY STATE  
(how mocks are currently used)

H. TOP 7 STRUCTURAL PROBLEMS  
(rank by impact)

I. RISK LEVEL  
(low / medium / high + short justification)

--------------------------------------------------
IMPORTANT
--------------------------------------------------

- Do NOT propose solutions
- Do NOT refactor mentally
- Do NOT assume future architecture
- Describe ONLY what EXISTS

We are building the ground truth.