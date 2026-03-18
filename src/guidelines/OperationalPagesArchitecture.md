# Operational Pages Architecture
**ListlyUp - 3 Core Pages Redesign**  
Premium Design 2025 | Mobile-First

---

## 🎯 Overview

This document defines the separation of concerns and interaction patterns for the 3 core operational pages:

1. **Notifications** → Chronological alerts inbox + quick CTAs
2. **Messages** → All conversations (Private Chats + Public Questions)
3. **Action Center** → Task dashboard (Personal / Groups / Admin)

**Goal:** Eliminate duplication, create clear UX hierarchy, maintain visual consistency.

---

## 📐 Design Principles

### Visual Language (Consistent Across App)
- ✅ Rounded cards (`rounded-xl`)
- ✅ Soft shadows (`shadow-sm`)
- ✅ Structured sections with collapsibles
- ✅ Flexible spacing (`space-y-2`, `space-y-3`)
- ✅ Modal sheets for child views
- ✅ Consistent iconography (Lucide React)
- ✅ Badge system for counts and status
- ✅ Mobile-First (max-width: 480px)

### Interaction Patterns
- **One primary CTA per card** (max two for Accept/Reject)
- **Standard child components:**
  - Full-screen page
  - Modal sheet (Sheet)
  - Drawer (Sheet with side="right")
  - Alert Dialog (for destructive actions)

---

## 📱 Page 1: Notifications

### Purpose
**Inbox of chronological alerts** with quick actions. Read-only alerts that inform the user.

### Structure
```
Header (52px)
├─ Back Button
├─ Title: "Notifications"
└─ More Menu (mark all read, settings)

Quick Counts Bar (44px)
├─ 🔴 Urgent (N)
├─ 🟡 Pending (N)
└─ ⚪ Info (N)

Content (Scrollable)
├─ Section: URGENT (auto-expanded)
│   └─ TradeOfferAlertCard
│   └─ ListingExpiringAlertCard
│   └─ GroupInviteAlertCard
│
├─ Section: PENDING (auto-expanded)
│   └─ QuestionAlertCard
│   └─ MessageAlertCard
│   └─ ReportStatusAlertCard
│
├─ Section: TODAY (collapsed)
│   └─ CompactAlertCard
│   └─ CompactAlertCard
│
└─ Section: THIS WEEK (collapsed)
    └─ CompactAlertCard
```

### Allowed Card Types
- **TradeOfferAlertCard** → "View Offer" CTA → Opens `TradeOfferSheet`
- **QuestionAlertCard** → "Reply" CTA → Opens `RespondQuestionSheet`
- **MessageAlertCard** → "View Chat" CTA → Opens `ChatSheet`
- **ListingLifecycleAlertCard** → "Renew" / "View" CTA → Opens `RenewListingSheet` or navigates to listing
- **GroupInviteAlertCard** → "Accept" / "Reject" CTA → Opens `GroupInviteSheet`
- **ReportStatusAlertCard** → "View Details" CTA → Opens `ReportDetailSheet`

### Filter Sheet
- Priority: All / Urgent / Pending / Info
- Type: All / Messages / Questions / Trades / Listings / Groups / Reports
- Status: All / Unread / Read
- Time Range: Last 24h / Last Week / Last Month / All Time

### Key Rules
- ❌ No conversations (moved to Messages)
- ❌ No actionable tasks (moved to Action Center)
- ✅ Only alerts + 1 quick CTA per card
- ✅ Grouped notifications when 2+ of same type

---

## 💬 Page 2: Messages

### Purpose
**Unified conversations page:** Private chats + Public questions on listings.

### Structure
```
Header (52px)
├─ Back Button
├─ Title: "Messages"
└─ More Menu

Search Bar (52px)
└─ "Search messages or questions..."

Tabs (48px)
├─ Tab: Chats (Badge: unread count)
└─ Tab: Questions (Badge: unanswered count)

Content (Scrollable)
├─ [If Chats Tab]
│   ├─ ChatCard
│   │   ├─ Listing image (12x12)
│   │   ├─ User avatar + name
│   │   ├─ Last message preview
│   │   ├─ Time
│   │   └─ Unread badge
│   │
│   └─ ChatCard
│       └─ ...
│
└─ [If Questions Tab]
    ├─ QuestionCard
    │   ├─ Listing image (12x12)
    │   ├─ Asker avatar + username
    │   ├─ Question text (2 lines max)
    │   ├─ Time
    │   ├─ "X waiting for answer" badge
    │   └─ CTA: "Reply" → Opens RespondQuestionSheet
    │
    └─ QuestionCard
        └─ ...

Footer Hint
└─ Context-sensitive help text
```

### Chat Card Structure
```tsx
<ChatCard>
  <ListingThumbnail (12x12) />
  <Content>
    <Header>
      <UserAvatar (5x5) />
      <UserName />
      <Time />
      <UnreadBadge? />
    </Header>
    <ListingTitle (truncated) />
    <LastMessage (truncated) />
  </Content>
</ChatCard>
```

### Question Card Structure
```tsx
<QuestionCard>
  <ListingThumbnail (12x12) />
  <Content>
    <Header>
      <AskerAvatar (5x5) />
      <AskerUsername />
      <Time />
    </Header>
    <ListingTitle (truncated) />
    <QuestionText (2 lines max) />
    <Footer>
      <WaitingBadge? />
      <ReplyButton />
    </Footer>
  </Content>
</QuestionCard>
```

### Key Rules
- ✅ Chats = Private conversations about listings
- ✅ Questions = Public Q&A on listings
- ✅ Search filters both tabs
- ✅ Unread chats highlighted (blue border)
- ✅ Unanswered questions highlighted (amber border)
- ❌ No alerts (moved to Notifications)
- ❌ No tasks (moved to Action Center)

---

## 🎯 Page 3: Action Center

### Purpose
**Task dashboard** for actionable items grouped by context (Personal / Groups / Admin).

### Structure
```
Header (52px)
├─ Back Button
├─ Title: "Action Center"
└─ Settings + Bell (with badge)

Quick Counts (Grid 2x2)
├─ 💬 Messages (12)
├─ ⚠️ Actions (5)
├─ ❓ Questions (7)
└─ 🔄 Trades (3)

Divider

Context Tabs (Horizontal Chips)
├─ 🙋 Personal (37)
├─ 👨‍💼 Groups (17) [if group admin/mod]
└─ ⚡ Admin (24) [if platform admin/mod]

Divider

Content (Scrollable - based on selected tab)
├─ [If PERSONAL]
│   ├─ Section: 📨 Messages (collapsible)
│   │   └─ MessageCard
│   │   └─ MessageCard
│   │
│   ├─ Section: ❓ Questions (collapsible)
│   │   └─ QuestionCard
│   │
│   ├─ Section: 🔄 Trade Offers (collapsible)
│   │   └─ TradeOfferCard
│   │
│   ├─ Section: ⚠️ Listing Actions (collapsible)
│   │   └─ ListingActionCard (draft/expiring/paused/pending/rejected)
│   │
│   ├─ Section: 📊 Performance Tips (collapsible)
│   │   └─ PerformanceCard (low views, high views no messages)
│   │
│   └─ Section: ❤️ Activity (collapsible)
│       └─ ActivityCard (favorites, shares, profile views)
│
├─ [If GROUPS]
│   ├─ Section: 👥 Join Requests (collapsible)
│   │   └─ JoinRequestCard (Accept/Reject CTAs)
│   │
│   ├─ Section: 🚨 Reports (collapsible)
│   │   └─ ReportCard (Approve/Remove/Dismiss CTAs)
│   │
│   ├─ Section: ✅ Pending Approvals (collapsible)
│   │   └─ PendingApprovalCard
│   │
│   └─ Section: 💬 Admin Messages (collapsible)
│       └─ AdminMessageCard
│
└─ [If ADMIN]
    ├─ Section: 🚨 Platform Reports (collapsible)
    │   └─ PlatformReportCard
    │
    ├─ Section: 🔍 Auto-Flagged Listings (collapsible)
    │   └─ FlaggedListingCard
    │
    └─ Section: 👤 User Issues (collapsible)
        └─ UserIssueCard
```

### Personal Tasks
1. **📨 Messages** → Unread conversations (link to Messages page)
2. **❓ Questions** → Unanswered questions on your listings
3. **🔄 Trade Offers** → Pending trade offers to review
4. **⚠️ Listing Actions** → Drafts, expiring, paused, pending approval, rejected
5. **📊 Performance Tips** → Smart suggestions (low views, price too high, etc)
6. **❤️ Activity** → Favorites, shares, profile views (passive info)

### Groups Tasks (Group Admin/Moderator)
1. **👥 Join Requests** → Approve/reject membership requests
2. **🚨 Reports** → Review reported listings/comments within groups
3. **✅ Pending Approvals** → Listings waiting for group approval
4. **💬 Admin Messages** → Messages from other admins

### Admin Tasks (Platform Admin/Moderator)
1. **🚨 Platform Reports** → User reports across entire platform
2. **🔍 Auto-Flagged Listings** → AI-detected policy violations
3. **👤 User Issues** → Account issues, appeals, support requests

### Card Action Patterns

#### 2-CTA Cards (Accept/Reject)
```tsx
<JoinRequestCard>
  <UserInfo />
  <GroupName />
  <Message />
  <Actions>
    <Button variant="default">Accept</Button>
    <Button variant="outline">Reject</Button>
  </Actions>
</JoinRequestCard>
```

#### 1-CTA Cards (Primary Action)
```tsx
<QuestionCard>
  <Question />
  <AskedBy />
  <ListingName />
  <Action>
    <Button variant="default">Reply</Button>
  </Action>
</QuestionCard>
```

#### Multi-Action Cards (Dropdown)
```tsx
<ListingActionCard>
  <Status />
  <Title />
  <Subtitle />
  <Actions>
    <Button variant="default">Primary Action</Button>
    <DropdownMenu>
      <DropdownMenuItem>Secondary Action 1</DropdownMenuItem>
      <DropdownMenuItem>Secondary Action 2</DropdownMenuItem>
    </DropdownMenu>
  </Actions>
</ListingActionCard>
```

### Key Rules
- ✅ Actionable tasks only (requires user decision/action)
- ✅ Grouped by context (Personal / Groups / Admin)
- ✅ Collapsible sections to reduce scrolling
- ✅ Quick counts always visible at top
- ❌ No simple alerts (moved to Notifications)
- ❌ No passive conversations (moved to Messages)

---

## 🔄 Interaction Flow Examples

### Example 1: User receives a trade offer
1. **Notification received** → Shows in Notifications page as "TradeOfferAlertCard"
2. User taps "View Offer" → Opens `TradeOfferSheet` (modal)
3. User reviews offer details
4. **Task created** → Shows in Action Center > Personal > Trade Offers
5. User goes to Action Center → Taps "Accept" or "Reject"
6. Action completed → Removed from both Notifications and Action Center

### Example 2: User receives a question on listing
1. **Notification received** → Shows in Notifications page as "QuestionAlertCard"
2. User taps "Reply" → Opens `RespondQuestionSheet`
3. User types answer and sends
4. **Also visible in Messages** → Shows in Messages > Questions tab
5. Answer posted publicly → Removed from Notifications and Action Center

### Example 3: Listing is expiring soon
1. **System generates alert** → Shows in Notifications page as "ListingExpiringAlertCard"
2. User taps "Renew" → Opens `RenewListingSheet`
3. User confirms renewal → Listing renewed
4. **Also visible in Action Center** → Shows in Action Center > Personal > Listing Actions
5. User can also choose "Edit First" → Navigates to Edit Listing page

---

## 📦 Component Reuse Strategy

### Shared Card Components
All cards follow the same base structure:

```tsx
// Base Card Structure
<Card className="p-3 rounded-xl border">
  <Header>
    <Icon />
    <Title />
    <Time />
    <Badge? />
  </Header>
  
  <Content>
    <MainInfo />
    <SubInfo? />
  </Content>
  
  <Footer>
    <PrimaryCTA />
    <SecondaryCTA? />
  </Footer>
</Card>
```

### Component Hierarchy

```
/components
├── /notifications
│   ├── NotificationsPage.tsx
│   ├── NotificationCard.tsx (wrapper)
│   ├── NotificationSection.tsx (collapsible)
│   ├── TradeOfferAlertCard.tsx
│   ├── QuestionAlertCard.tsx
│   ├── MessageAlertCard.tsx
│   ├── ListingLifecycleAlertCard.tsx
│   ├── GroupInviteAlertCard.tsx
│   └── ReportStatusAlertCard.tsx
│
├── MessagesPage.tsx
│   ├── ChatCard (inline)
│   └── QuestionCard (inline)
│
├── /action-center
│   ├── ActionCenterPage.tsx
│   ├── QuickCountCard.tsx
│   ├── ContextChip.tsx
│   ├── MessageCard.tsx
│   ├── QuestionCard.tsx
│   ├── TradeOfferCard.tsx
│   ├── ListingActionCard.tsx
│   ├── PerformanceCard.tsx
│   ├── ActivityCard.tsx
│   ├── JoinRequestCard.tsx
│   ├── ReportCard.tsx
│   ├── PendingApprovalCard.tsx
│   └── AdminMessageCard.tsx
│
└── /action-sheets (child views)
    ├── TradeOfferSheet.tsx
    ├── RespondQuestionSheet.tsx
    ├── ChatSheet.tsx
    ├── RenewListingSheet.tsx
    ├── GroupInviteSheet.tsx
    ├── ReportDetailSheet.tsx
    └── EditListingSheet.tsx
```

### Style Tokens (Consistent)
```css
/* Card Styles */
.card-base {
  @apply rounded-xl border bg-white p-3 shadow-sm;
}

.card-unread {
  @apply border-blue-200 bg-blue-50/50;
}

.card-urgent {
  @apply border-red-200 bg-red-50/50;
}

.card-pending {
  @apply border-amber-200 bg-amber-50/50;
}

/* Badge Styles */
.badge-urgent {
  @apply bg-red-500 text-white;
}

.badge-pending {
  @apply bg-amber-500 text-white;
}

.badge-info {
  @apply bg-blue-500 text-white;
}
```

---

## 🎨 Visual Consistency Checklist

### Typography
- ✅ Page titles: `text-base font-semibold`
- ✅ Section titles: `text-sm font-medium`
- ✅ Card titles: `text-sm font-medium`
- ✅ Body text: `text-sm`
- ✅ Captions: `text-xs text-muted-foreground`
- ✅ Badges: `text-[9px] font-medium`

### Spacing
- ✅ Page padding: `px-4 py-3`
- ✅ Card padding: `p-3`
- ✅ Section spacing: `space-y-3`
- ✅ Card spacing: `space-y-2`
- ✅ Header height: `h-[52px]`
- ✅ Quick counts height: `h-[44px]`

### Colors
- ✅ Urgent: `red-500` / `red-50` / `red-200`
- ✅ Pending: `amber-500` / `amber-50` / `amber-200`
- ✅ Info: `blue-500` / `blue-50` / `blue-200`
- ✅ Success: `green-500` / `green-50` / `green-200`
- ✅ Neutral: `gray-500` / `gray-50` / `gray-200`

### Icons
- ✅ Icon size: `w-4 h-4` or `w-5 h-5`
- ✅ Avatar size: `w-5 h-5` (small) or `w-8 h-8` (medium)
- ✅ Listing thumbnail: `w-12 h-12`
- ✅ All icons from Lucide React

---

## 🚀 Implementation Checklist

### Phase 1: Messages Page ✅
- [x] Create MessagesPage.tsx
- [x] Implement Chats tab
- [x] Implement Questions tab
- [x] Add search functionality
- [x] Add empty states
- [x] Mobile-responsive layout

### Phase 2: Notifications Page Refinement
- [ ] Remove conversation logic (moved to Messages)
- [ ] Keep only alert cards
- [ ] Add filter sheet
- [ ] Refine grouping logic
- [ ] Add "Mark all read" functionality

### Phase 3: Action Center Refinement
- [ ] Review existing structure (already good)
- [ ] Ensure no duplication with Messages
- [ ] Ensure no duplication with Notifications
- [ ] Add context-based filtering
- [ ] Polish collapsible animations

### Phase 4: Child Views (Sheets/Modals)
- [ ] TradeOfferSheet
- [ ] RespondQuestionSheet
- [ ] ChatSheet
- [ ] RenewListingSheet
- [ ] GroupInviteSheet
- [ ] ReportDetailSheet

### Phase 5: Integration with 51 Actions System
- [ ] Map all action IDs to correct cards
- [ ] Ensure proper permission checks
- [ ] Connect to action handlers
- [ ] Test all workflows end-to-end

---

## 📝 Summary

### Clear Separation of Concerns

| Page | Purpose | Content | CTAs |
|------|---------|---------|------|
| **Notifications** | Alert inbox | Chronological alerts | 1 quick action |
| **Messages** | Conversations | Chats + Questions | Open conversation |
| **Action Center** | Task dashboard | Actionable items | Accept/Reject/Review |

### No Duplication Matrix

| Entity | Notifications | Messages | Action Center |
|--------|--------------|----------|---------------|
| Trade Offer Alert | ✅ Alert card | ❌ | ✅ Task card |
| Private Message | ✅ Alert card | ✅ Chat list | ❌ |
| Public Question | ✅ Alert card | ✅ Question list | ✅ Task card |
| Listing Expiring | ✅ Alert card | ❌ | ✅ Task card |
| Group Invite | ✅ Alert card | ❌ | ✅ Task card |
| Join Request | ❌ | ❌ | ✅ Task card |
| Report | ✅ Alert card | ❌ | ✅ Task card |

### Visual Consistency
- ✅ Same card structure across all pages
- ✅ Same badge system
- ✅ Same typography scale
- ✅ Same spacing system
- ✅ Same color palette
- ✅ Same iconography
- ✅ Same interaction patterns

---

**Last Updated:** 2024-11-24  
**Status:** Architecture Complete | Implementation In Progress
