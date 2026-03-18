# P2 — GAM Collision Stage Closure (GATED)

## Status
- Implementation: DONE (canonical GAM routes sheets + ActionCenterPage migrated)
- Runtime verification: PENDING (human must execute pack)

## Single Source of Truth
- Reference: /verification/GAM_RUNTIME_VERIFICATION_PACK.md

## Deletion Gate Checklist (MUST PASS)
Cleanup is allowed ONLY when ALL of these are true:
- A1 PASS
- A2 PASS
- A3 PASS
- A4 PASS
- R1 PASS
- R2 PASS
- R3 PASS

## READY-TO-RUN CLEANUP PROMPT (BLOCKED UNTIL GATE PASSES)
Include EXACTLY this block, unchanged:

MODE: IMPLEMENT
SCOPE: P2 Cleanup — Remove legacy campaigns GlobalActionModal after runtime gate PASS
1) Delete: /components/campaigns/GlobalActionModal.tsx
2) Remove exports in /components/campaigns/index.ts:
   - export { GlobalActionModal } from './GlobalActionModal'
   - export type { GlobalActionId, GlobalActionContext } from './GlobalActionModal'
3) Final static audit: search "campaigns/GlobalActionModal" and legacy types -> 0 runtime occurrences
4) Update CLEANUP_TAGS_v2.0.md: mark RESOLVED with date + runtime gate PASS reference

STOP.