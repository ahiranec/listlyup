# Testing Guide - My Trail v2.1

## Quick Start Testing

### Prerequisites
1. Navigate to the app
2. Sign in (or use mock auth)
3. Open hamburger menu (☰)
4. Click "My Trail"

---

## Feature 1: Re-publish Integration

### Test Case 1.1: Re-publish SOLD Product
**Steps:**
1. In My Trail, find a SOLD listing (green badge)
2. Click three-dot menu (⋮) on the listing
3. Click "Re-publish"
4. Observe PublishFlow opens

**Expected Results:**
- ✅ Toast appears: "Re-publishing: [Listing Title]"
- ✅ PublishFlow opens in Step 1 (Media)
- ✅ Listing type is pre-selected (e.g., "Product")
- ✅ Navigate to Step 2: Title is pre-filled
- ✅ Navigate to Step 3: Location is pre-filled
- ✅ Navigate to Step 4: Price is pre-filled
- ✅ Navigate to Step 5: Preview shows all data

**Notes:**
- Description will be blank (requires re-entry)
- Category/Subcategory will be blank (requires selection)
- Only thumbnail photo will be present (add more photos)

---

### Test Case 1.2: Re-publish ARCHIVED Service
**Steps:**
1. In My Trail, filter to show "ARCHIVED" only
2. Find a service listing (e.g., "Clases de Yoga Online")
3. Click three-dot menu → "Re-publish"

**Expected Results:**
- ✅ Service type pre-selected
- ✅ Pricing model preserved (if available)
- ✅ All other data pre-filled same as Test 1.1

---

### Test Case 1.3: Cancel Re-publish Flow
**Steps:**
1. Start re-publish flow (any listing)
2. PublishFlow opens
3. Click "X" (close button) in top-left

**Expected Results:**
- ✅ PublishFlow closes
- ✅ Returns to My Trail
- ✅ No listing created
- ✅ No errors in console

---

## Feature 2: Bulk Actions

### Test Case 2.1: Enter Selection Mode
**Steps:**
1. In My Trail, click checkbox on any listing
2. Observe UI changes

**Expected Results:**
- ✅ Selection mode activates
- ✅ Checkboxes appear on ALL listings
- ✅ Three-dot menus disappear
- ✅ "Select All" row appears at top
- ✅ Bulk Actions Toolbar slides up from bottom
- ✅ Toolbar shows "1 listing selected"
- ✅ Selected listing shows blue ring (ring-2 ring-primary)

---

### Test Case 2.2: Select Multiple Listings
**Steps:**
1. In selection mode (from Test 2.1)
2. Click checkboxes on 3 more listings

**Expected Results:**
- ✅ Each click toggles selection
- ✅ Toolbar updates count: "4 listings selected"
- ✅ All selected listings show blue ring
- ✅ Can deselect by clicking again

---

### Test Case 2.3: Select All
**Steps:**
1. In My Trail (7 listings total)
2. Click checkbox on any listing (enter selection mode)
3. Click "Select All" row at top

**Expected Results:**
- ✅ All 7 listings selected instantly
- ✅ Toolbar shows "7 listings selected"
- ✅ All listings show blue ring
- ✅ "Select All" row changes to "Deselect All"

---

### Test Case 2.4: Deselect All
**Steps:**
1. Continue from Test 2.3 (all selected)
2. Click "Select All" row again

**Expected Results:**
- ✅ All selections cleared
- ✅ Toolbar shows "0 listings selected"
- ✅ Blue rings removed from all listings
- ✅ Selection mode still active (checkboxes visible)

---

### Test Case 2.5: Bulk Delete (Multiple)
**Steps:**
1. In My Trail, select 3 listings
2. Click "Delete" button in toolbar

**Expected Results:**
- ✅ Toast appears: "3 listings deleted permanently"
- ✅ Toast description: "Selected listings have been removed"
- ✅ Selection cleared (no selected items)
- ✅ Selection mode exits (checkboxes disappear)
- ✅ Toolbar slides down (disappears)
- ✅ Console logs: `Bulk delete listings: ['trail-1', 'trail-2', 'trail-3']`

**Note:** In production, listings would actually be deleted from DB

---

### Test Case 2.6: Bulk Delete (Single)
**Steps:**
1. Select only 1 listing
2. Click "Delete" button

**Expected Results:**
- ✅ Toast: "1 listing deleted permanently"
- ✅ Selection cleared
- ✅ Selection mode exits

---

### Test Case 2.7: Clear Selection (X Button)
**Steps:**
1. Select 4 listings
2. Click "X" button in toolbar (top-left)

**Expected Results:**
- ✅ All selections cleared immediately
- ✅ Selection mode exits
- ✅ Toolbar slides down
- ✅ Three-dot menus reappear
- ✅ No toast notification

---

### Test Case 2.8: Exit Selection Mode (Manual Deselect)
**Steps:**
1. Select 2 listings
2. Click checkboxes to deselect both manually

**Expected Results:**
- ✅ After deselecting last item, selection mode auto-exits
- ✅ Toolbar slides down
- ✅ Checkboxes disappear
- ✅ Three-dot menus reappear

---

## Edge Cases & Integration Tests

### Test Case 3.1: Select All with Filters
**Steps:**
1. Apply filter: Show only "SOLD" (should show ~4 items)
2. Enter selection mode
3. Click "Select All"

**Expected Results:**
- ✅ Only filtered listings selected (4 items)
- ✅ Toolbar shows "4 listings selected"
- ✅ Archived listings NOT selected

---

### Test Case 3.2: Select All with Search
**Steps:**
1. Search for "iPhone" (should show 1-2 items)
2. Enter selection mode
3. Click "Select All"

**Expected Results:**
- ✅ Only search results selected
- ✅ Toolbar shows correct count
- ✅ Hidden listings NOT selected

---

### Test Case 3.3: Re-publish While Selection Mode Active
**Steps:**
1. Enter selection mode (select 2 listings)
2. Manually exit selection mode
3. Click three-dot menu on any listing
4. Click "Re-publish"

**Expected Results:**
- ✅ Re-publish works normally
- ✅ No UI glitches
- ✅ PublishFlow opens correctly

---

### Test Case 3.4: Navigate Away During Selection
**Steps:**
1. In My Trail, select 3 listings
2. Click "Back" button (top-left)

**Expected Results:**
- ✅ Returns to Home
- ✅ No errors
- ✅ When returning to My Trail: selection cleared, normal view

---

### Test Case 3.5: Multiple Re-publish Attempts
**Steps:**
1. Re-publish listing A → Cancel
2. Re-publish listing B → Cancel
3. Re-publish listing C → Complete flow

**Expected Results:**
- ✅ No state leakage between attempts
- ✅ Each re-publish loads correct data
- ✅ No duplicate data from previous attempts

---

## Visual Regression Tests

### Test Case 4.1: Toolbar Animation
**Steps:**
1. Select first listing
2. Observe toolbar slide-up animation

**Expected:**
- ✅ Smooth spring animation (not janky)
- ✅ Slides from y:100 to y:0
- ✅ Opacity fades from 0 to 1
- ✅ Duration: ~500ms
- ✅ No layout shift

---

### Test Case 4.2: Selection Ring Visual
**Steps:**
1. Select 1 listing in light mode
2. Switch to dark mode
3. Verify ring visibility

**Expected:**
- ✅ Ring clearly visible in both themes
- ✅ Blue color (primary)
- ✅ 2px width
- ✅ Rounded corners match card

---

### Test Case 4.3: Checkbox States
**Steps:**
1. Inspect unchecked checkbox
2. Select listing
3. Inspect checked checkbox

**Expected:**
- ✅ Unchecked: border visible, no fill
- ✅ Checked: primary color fill, white checkmark
- ✅ Hover state: slight opacity change
- ✅ Click area: 44x44px minimum (accessibility)

---

## Performance Tests

### Test Case 5.1: Large Selection (All 7 Listings)
**Steps:**
1. Click "Select All"
2. Observe performance

**Expected:**
- ✅ Instant selection (< 100ms)
- ✅ No lag
- ✅ All rings render immediately
- ✅ Toolbar updates instantly

---

### Test Case 5.2: Rapid Toggle
**Steps:**
1. Rapidly click checkbox on/off 10 times
2. Observe UI responsiveness

**Expected:**
- ✅ Each click registers
- ✅ No missed clicks
- ✅ No UI freezing
- ✅ Toolbar count updates correctly

---

## Accessibility Tests

### Test Case 6.1: Keyboard Navigation
**Steps:**
1. Tab through My Trail page
2. Focus on checkbox
3. Press Space to toggle

**Expected:**
- ✅ Can tab to checkboxes
- ✅ Focus indicator visible
- ✅ Space/Enter toggles selection
- ✅ Screen reader announces state change

---

### Test Case 6.2: Screen Reader
**Steps:**
1. Enable screen reader (VoiceOver/NVDA)
2. Navigate to checkbox
3. Activate it

**Expected:**
- ✅ Announces: "Checkbox, unchecked"
- ✅ After click: "Checkbox, checked"
- ✅ Toolbar announces: "X listings selected"
- ✅ Delete button: "Delete selected listings"

---

## Console Checks

### Expected Console Output (Re-publish)
```javascript
// When clicking "Re-publish"
Re-publish listing: { id: 'trail-1', title: 'iPhone 13 Pro', ... }
Publish data: { images: [...], type: 'product', title: '...', ... }
```

### Expected Console Output (Bulk Delete)
```javascript
// When clicking "Delete Selected"
Bulk delete listings: ['trail-1', 'trail-2', 'trail-5']
```

### No Errors Expected
- ❌ No TypeScript errors
- ❌ No React warnings
- ❌ No network errors (in mock mode)
- ❌ No memory leaks

---

## Browser Compatibility

Test in:
- [ ] Chrome (latest)
- [ ] Safari (latest)
- [ ] Firefox (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## Device Testing

Test on:
- [ ] iPhone 13/14/15 (375px width)
- [ ] iPhone Pro Max (428px width)
- [ ] Desktop (1920px width)
- [ ] iPad (768px width)

---

## Regression Tests

### Verify No Breaking Changes
- [ ] My Trail basic functionality still works
- [ ] My Listings bulk actions still work
- [ ] PublishFlow still works for new listings
- [ ] Edit listing flow still works
- [ ] Navigation still works

---

## Production Readiness Checklist

### Functionality
- [ ] Re-publish converts data correctly
- [ ] Bulk select/deselect works smoothly
- [ ] Bulk delete removes listings
- [ ] Toast notifications appear
- [ ] Animations are smooth

### UI/UX
- [ ] Mobile-first responsive
- [ ] Dark mode compatible
- [ ] Accessible (WCAG 2.1 AA)
- [ ] No UI glitches
- [ ] Clear visual feedback

### Code Quality
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Clean code structure
- [ ] Comments present
- [ ] Follows conventions

### Integration
- [ ] PublishFlow integration works
- [ ] Navigation flows work
- [ ] State management correct
- [ ] No memory leaks

---

## Bug Report Template

If you find a bug, report using this format:

```markdown
**Bug Title**: [Brief description]

**Steps to Reproduce**:
1. Navigate to...
2. Click on...
3. Observe...

**Expected Result**:
[What should happen]

**Actual Result**:
[What actually happened]

**Screenshots/Video**:
[Attach if applicable]

**Environment**:
- Browser: [Chrome 120]
- Device: [iPhone 14]
- OS: [iOS 17.2]

**Console Errors**:
[Paste any errors]

**Severity**: [Critical / High / Medium / Low]
```

---

## Success Criteria

✅ **All test cases pass**  
✅ **No console errors**  
✅ **Smooth performance**  
✅ **Accessible**  
✅ **Mobile-responsive**  
✅ **Dark mode works**  
✅ **Production-ready**  

---

## Questions?

Contact: Development Team  
Documentation: `/components/my-trail/FEATURES_V2.1.md`  
Implementation: `/MY_TRAIL_V2.1_IMPLEMENTATION_COMPLETE.md`

**Happy Testing! 🎉**
