# GAM Migration — Runtime Verification Gate

**Fill PASS/FAIL + notes. No code changes.**

---

## Section 1: Smoke Test (Approval/Rejection Sheets)

Test the 4 new approval/rejection flows added to the canonical GAM routing table.

| Flow | Where | Action | Expected UI | Close Works? | Confirm Works? | PASS/FAIL | Notes |
|------|-------|--------|-------------|--------------|----------------|-----------|-------|
| **A1: Approve Campaign** | ActionCenterPage > Campaign Requests | Approve | CampaignApprovalSheet opens (blue header) | [ ] | [ ] | [ ] | |
| **A2: Reject Campaign** | ActionCenterPage > Campaign Requests | Reject | CampaignRejectionSheet opens (red header, reason required) | [ ] | [ ] | [ ] | |
| **A3: Approve Event** | ActionCenterPage > Event Requests | Approve | EventApprovalSheet opens (blue header) | [ ] | [ ] | [ ] | |
| **A4: Reject Event** | ActionCenterPage > Event Requests | Reject | EventRejectionSheet opens (red header, reason required) | [ ] | [ ] | [ ] | |

**Close Works?** = Test X button, Cancel button, and backdrop click  
**Confirm Works?** = Test confirm button → toast shown + card removed from list

---

## Section 2: Regression Test (Confirm dialogs via canonical GAM)

Test existing confirm dialogs still work correctly through the canonical GAM.

| Flow | Where | Action | Expected UI | Close Works? | Confirm Works? | PASS/FAIL | Notes |
|------|-------|--------|-------------|--------------|----------------|-----------|-------|
| **R1: delete-listing** | Any listing (MyListings/ActionCenter) | Delete | ConfirmActionDialog (destructive/red, Trash icon) | [ ] | [ ] | [ ] | |
| **R2: pause-listing** | Any active listing | Pause | ConfirmActionDialog (warning/orange, Alert icon) | [ ] | [ ] | [ ] | |
| **R3: accept-trade** | ActionCenterPage > Trade Offers | Accept | ConfirmActionDialog (success/green, Check icon) | [ ] | [ ] | [ ] | |

**Close Works?** = Test X button, Cancel button, and backdrop click  
**Confirm Works?** = Test confirm button → toast shown + state updated correctly

---

## Section 3: Paste Results

Use this template to report results back to the development team:

```
=== GAM MIGRATION RUNTIME VERIFICATION RESULTS ===

Date: [YYYY-MM-DD HH:MM]
Tester: [Your Name]

Any FAIL? (yes/no): 

If FAIL, list details:
- Row ID (e.g., A1, R2):
- What happened instead:
- Visible error/toast text:
- Expected behavior:

Screenshot links (optional):
- 

Additional observations:
- 

Overall Status: [ ] ALL PASS  [ ] CONTAINS FAILURES
```

---

## Instructions for Manual Testing

### Prerequisites
1. Navigate to the ActionCenterPage in the app
2. Ensure you have mock data for:
   - Campaign Requests (pending campaigns)
   - Event Requests (pending events)
   - Trade Offers (pending trades)
   - Active Listings (for pause/delete actions)

### Testing Flow (for each row)
1. **Navigate** to the location specified in "Where" column
2. **Click** the action button (Approve/Reject/Delete/Pause/Accept)
3. **Verify** the expected UI opens with correct styling
4. **Test Close Behavior:**
   - Click X button → dialog closes, no action taken
   - Click Cancel button (if present) → dialog closes, no action taken
   - Click backdrop (outside dialog) → dialog closes, no action taken
   - Mark checkbox if ALL close methods work
5. **Test Confirm Behavior:**
   - Click confirm/primary action button
   - Verify toast notification appears
   - Verify state updates correctly (card removed, status changed, etc.)
   - Mark checkbox if confirm works correctly
6. **Mark PASS/FAIL:**
   - PASS = Both close and confirm work as expected
   - FAIL = Any behavior is broken or incorrect
7. **Add Notes:** Document any issues, unexpected behavior, or observations

### Expected Results Summary
- **Total Tests:** 7 (4 smoke + 3 regression)
- **Success Criteria:** ALL tests must PASS
- **Blocker Threshold:** ANY FAIL blocks deletion of legacy `/components/campaigns/GlobalActionModal.tsx`

---

## Post-Verification Actions

### If ALL PASS ✅
1. Report results to development team
2. Proceed to delete legacy file: `/components/campaigns/GlobalActionModal.tsx`
3. Update documentation to mark GAM migration as COMPLETE
4. Close P2 stage

### If ANY FAIL ❌
1. Document failure details in Section 3
2. Attach screenshots showing the failure
3. Report to development team for hotfix
4. DO NOT delete legacy file
5. Re-run verification after fix is deployed

---

## Notes
- This is a **manual runtime verification** — must be executed by a human in the browser
- No automated tests exist for this verification (UI/UX validation required)
- This document is the canonical reference for P2 stage closure
- Legacy GAM file deletion is **BLOCKED** until this verification passes
