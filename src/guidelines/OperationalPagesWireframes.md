# Operational Pages Wireframes
**ListlyUp - Visual Structure Reference**  
Premium Design 2025

---

## 📱 Page 1: Notifications

```
┌─────────────────────────────────────┐
│      Status Bar (iOS/Android)       │ 45px
├─────────────────────────────────────┤
│  ←  Notifications            ⋮      │ 52px
├─────────────────────────────────────┤
│  🔴 3    🟡 7    ⚪ 12              │ 44px
│  Urgent  Pending  Info              │
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🔴 URGENT                   3  │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 🔄 Trade Offer             ││ │
│  │ │ @maria_g wants to trade    ││ │
│  │ │ iPad Pro for Camera        ││ │
│  │ │                            ││ │
│  │ │ [View Offer]               ││ │
│  │ └────────────────────────────┘│ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ ⏰ Listing Expiring        ││ │
│  │ │ iPhone 14 expires in 2 days││ │
│  │ │                            ││ │
│  │ │ [Renew]                    ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🟡 PENDING                  7  │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 💬 3 new messages          ││ │
│  │ │ Juan, María, Carlos...     ││ │
│  │ │                            ││ │
│  │ │ [View All]                 ││ │
│  │ └────────────────────────────┘│ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ ❓ 2 unanswered questions  ││ │
│  │ │ "Does it come with box?"   ││ │
│  │ │                            ││ │
│  │ │ [View All]                 ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ⚪ TODAY                    12  │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed - tap to expand)    │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ⚪ THIS WEEK                 8  │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed - tap to expand)    │ │
│  └────────────────────────────────┘ │
│                                      │
│                                      │
└─────────────────────────────────────┘
```

### Notification Card Anatomy

```
┌──────────────────────────────────────┐
│ 🔄 TRADE OFFER              2h ago   │ ← Header: Icon + Type + Time
├──────────────────────────────────────┤
│ @maria_g wants to trade              │ ← Main Info
│ iPad Pro 11" 2021 + $50              │
│ for: Vintage Camera                  │
├──────────────────────────────────────┤
│           [View Offer]               │ ← Primary CTA (1 only)
└──────────────────────────────────────┘
```

---

## 💬 Page 2: Messages

```
┌─────────────────────────────────────┐
│      Status Bar (iOS/Android)       │ 45px
├─────────────────────────────────────┤
│  ←  Messages                 ⋮      │ 52px
├─────────────────────────────────────┤
│  🔍 Search messages...              │ 52px
├─────────────────────────────────────┤
│  ┌───────────────┬─────────────────┐│ 48px
│  │ 💬 Chats  [4] │ ❓ Questions [7]││
│  └───────────────┴─────────────────┘│
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 Juan Pérez      2h 🔴3││ ← Chat Card
│  │       Re: iPhone 14 Pro Max    ││
│  │       Is this still available? ││
│  │       Can we meet today?       ││
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 María González   5h 🔴1││
│  │       Re: Vintage Camera       ││
│  │       Thanks! I'll pick it up  ││
│  │       tomorrow morning         ││
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 Carlos Silva     1d   ││
│  │       Re: MacBook Pro M1       ││
│  │       What's the lowest price  ││
│  │       you can do?              ││
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 Ana Rodríguez    2d   ││
│  │       Re: Tour Gastronómico    ││
│  │       Perfect! See you at 3pm  ││
│  └────────────────────────────────┘ │
│                                      │
├─────────────────────────────────────┤
│  Tap any chat to open conversation  │ 32px
└─────────────────────────────────────┘
```

### Chat Card Anatomy

```
┌──────────────────────────────────────┐
│ [img]  👤 Juan Pérez      2h ago  🔴3│ ← Listing img + User + Time + Badge
│ 12x12  Re: iPhone 14 Pro Max         │ ← Listing context
│        Is this still available?      │ ← Message preview
│        Can we meet today in Valpo?   │
└──────────────────────────────────────┘
```

### Questions Tab

```
┌─────────────────────────────────────┐
│      Status Bar (iOS/Android)       │
├─────────────────────────────────────┤
│  ←  Messages                 ⋮      │
├─────────────────────────────────────┤
│  🔍 Search messages...              │
├─────────────────────────────────────┤
│  ┌───────────────┬─────────────────┐│
│  │   Chats       │ ❓ Questions [7]││ ← Active
│  └───────────────┴─────────────────┘│
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 @tech_buyer      5h   ││ ← Question Card
│  │       MacBook Pro M1           ││
│  │       Does it come with the    ││
│  │       charger and original box?││
│  │                                ││
│  │  +3 waiting    [Reply ➤]      ││ ← Waiting badge + CTA
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 @maria_s         1d   ││
│  │       Vintage Camera           ││
│  │       Can you ship to Santiago?││
│  │                                ││
│  │                [Reply ➤]       ││
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ [img] 👤 @iphone_collector 2d  ││
│  │       iPhone 14 Pro Max        ││
│  │       Is the battery health    ││
│  │       still good?              ││
│  │                                ││
│  │  +1 waiting    [Reply ➤]      ││
│  └────────────────────────────────┘ │
│                                      │
├─────────────────────────────────────┤
│  Answers are public and visible     │
│  to everyone                         │
└─────────────────────────────────────┘
```

---

## 🎯 Page 3: Action Center

```
┌─────────────────────────────────────┐
│      Status Bar (iOS/Android)       │ 45px
├─────────────────────────────────────┤
│  ←  Action Center        ⚙️  🔔37  │ 52px
├─────────────────────────────────────┤
│  Quick Counts (Last 24h)            │ 16px
│  ┌────────────┬────────────┐        │
│  │ 💬  12     │ ⚠️   5     │        │ 72px
│  │ Messages   │ Actions    │        │
│  ├────────────┼────────────┤        │
│  │ ❓  7      │ 🔄  3      │        │
│  │ Questions  │ Trades     │        │
│  └────────────┴────────────┘        │
├─────────────────────────────────────┤
│  🙋 Personal [37]  👨‍💼 Groups [17]   │ 48px
│  ⚡ Admin [24]                       │
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 📨 Messages              12  ▶ │ │ ← Collapsible Section
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 👤 Juan Pérez          2h  ││ │
│  │ │ Re: iPhone 14 Pro Max      ││ │
│  │ │ Is this still available?   ││ │
│  │ └────────────────────────────┘│ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 👤 María González      5h  ││ │
│  │ │ Re: Vintage Camera         ││ │
│  │ │ Can we meet today?         ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ❓ Questions              7  ▶ │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ @tech_buyer            5h  ││ │
│  │ │ MacBook Pro M1             ││ │
│  │ │ Does it come with box?     ││ │
│  │ │            [Reply]         ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🔄 Trade Offers           3  ▶ │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ @maria_g               1d  ││ │
│  │ │ iPad Pro for Camera + $50  ││ │
│  │ │ [Accept]  [Reject]         ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ⚠️ Listing Actions        5  ▶ │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 📝 DRAFT                   ││ │
│  │ │ Bicicleta Montaña Scott    ││ │
│  │ │ Saved 3 days ago           ││ │
│  │ │ [Continue]  [Delete]       ││ │
│  │ └────────────────────────────┘│ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ ⏰ EXPIRES IN 3 DAYS        ││ │
│  │ │ iPhone 14 Pro Max          ││ │
│  │ │ 156 views · 12 favorites   ││ │
│  │ │ [Renew]  [Edit First]      ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 📊 Performance Tips       2  ▶ │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed)                    │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ❤️ Activity               8  ▶ │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed)                    │ │
│  └────────────────────────────────┘ │
│                                      │
└─────────────────────────────────────┘
```

### Groups Tab View

```
┌─────────────────────────────────────┐
│  ←  Action Center        ⚙️  🔔17  │
├─────────────────────────────────────┤
│  🙋 Personal  👨‍💼 Groups [17]  ⚡ Admin│ ← Groups active
├─────────────────────────────────────┤
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 👥 Join Requests          8  ▶ │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 👤 @maria_silva        3d  ││ │
│  │ │ Tech Lovers Chile          ││ │
│  │ │ I'm a software developer   ││ │
│  │ │ interested in tech...      ││ │
│  │ │ [Accept]  [Reject]         ││ │
│  │ └────────────────────────────┘│ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 👤 @juan_dev           5d  ││ │
│  │ │ Vecinos Valparaíso         ││ │
│  │ │ I live in Cerro Alegre...  ││ │
│  │ │ [Accept]  [Reject]         ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 🚨 Reports                3  ▶ │ │
│  ├────────────────────────────────┤ │
│  │                                │ │
│  │ ┌────────────────────────────┐│ │
│  │ │ 🚨 HIGH PRIORITY       2h  ││ │
│  │ │ Spam/Scam on iPhone listing││ │
│  │ │ by @user123                ││ │
│  │ │ Tech Lovers Chile          ││ │
│  │ │ [Review]                   ││ │
│  │ └────────────────────────────┘│ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ ✅ Pending Approvals      2  ▶ │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed)                    │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ 💬 Admin Messages         4  ▶ │ │
│  ├────────────────────────────────┤ │
│  │ (Collapsed)                    │ │
│  └────────────────────────────────┘ │
│                                      │
└─────────────────────────────────────┘
```

---

## 🔄 Component Interaction Map

```
┌──────────────────┐
│  Notifications   │
│     Page         │
└────────┬─────────┘
         │
         │ [View Offer] CTA
         ▼
    ┌──────────────┐
    │ TradeOffer   │──────┐
    │    Sheet     │      │
    └──────────────┘      │
                          │
         ┌────────────────┘
         │
         │ Also appears in
         ▼
┌──────────────────┐
│  Action Center   │
│     Page         │
│ > Trade Offers   │
└────────┬─────────┘
         │
         │ [Accept/Reject]
         ▼
    ┌──────────────┐
    │   Confirm    │
    │   Dialog     │
    └──────────────┘
```

```
┌──────────────────┐
│  Notifications   │
│     Page         │
└────────┬─────────┘
         │
         │ [Reply] CTA
         ▼
    ┌──────────────┐
    │ RespondQuestion│
    │    Sheet      │
    └──────┬────────┘
           │
           │ Also in Messages
           ▼
┌──────────────────┐
│  Messages Page   │
│  > Questions Tab │
└────────┬─────────┘
         │
         │ Also in Action Center
         ▼
┌──────────────────┐
│  Action Center   │
│     Page         │
│ > Questions      │
└──────────────────┘
```

---

## 📊 Card Size & Spacing Reference

```
┌──────────────────────────────────────┐
│  CARD ANATOMY                         │
├──────────────────────────────────────┤
│                                       │
│  Padding: 12px (p-3)                  │
│  ┌──────────────────────────────────┐│
│  │ Header (1 line, h=20px)          ││
│  │ [Icon 16px] Title        Time    ││
│  ├──────────────────────────────────┤│
│  │ Content (2-3 lines, h=40-60px)   ││
│  │ Main information text            ││
│  │ Secondary info (optional)        ││
│  ├──────────────────────────────────┤│
│  │ Footer (1 line, h=32px)          ││
│  │ [Button] or [Btn] [Btn]          ││
│  └──────────────────────────────────┘│
│                                       │
│  Total Height: ~110-140px             │
│  Border Radius: 12px (rounded-xl)     │
│  Shadow: shadow-sm                    │
│                                       │
└──────────────────────────────────────┘
```

### Spacing System

```
Pages:
├─ Header:           52px
├─ Quick Bar:        44px
├─ Search Bar:       52px
├─ Tabs:             48px
└─ Footer:           32px

Sections:
├─ Section Header:   32px
├─ Card:            110-140px
├─ Card Gap:         8px (gap-2)
└─ Section Gap:      12px (gap-3)

Padding:
├─ Page:            16px (px-4)
├─ Section:         12px (p-3)
├─ Card:            12px (p-3)
└─ Button:          8px 12px (px-3 py-2)
```

---

## 🎨 Color Coding System

```
Priority Levels:

🔴 URGENT (Red)
├─ Card: border-red-200 bg-red-50/50
├─ Badge: bg-red-500 text-white
└─ Text: text-red-600

🟡 PENDING (Amber)
├─ Card: border-amber-200 bg-amber-50/50
├─ Badge: bg-amber-500 text-white
└─ Text: text-amber-600

🟢 SUCCESS (Green)
├─ Card: border-green-200 bg-green-50/50
├─ Badge: bg-green-500 text-white
└─ Text: text-green-600

🔵 INFO (Blue)
├─ Card: border-blue-200 bg-blue-50/50
├─ Badge: bg-blue-500 text-white
└─ Text: text-blue-600

⚪ NEUTRAL (Gray)
├─ Card: border-gray-200 bg-white
├─ Badge: bg-gray-500 text-white
└─ Text: text-gray-600
```

---

## 📱 Responsive Behavior

### Mobile (< 480px)
- Single column layout
- Full width cards
- Stacked buttons (if 2 CTAs)
- Bottom sheet modals

### Tablet (480-768px)
- Max width: 480px centered
- Same mobile layout
- Side sheet modals (optional)

### Desktop (> 768px)
- Max width: 480px centered
- Hover states enabled
- Side panel for modals
- Keyboard shortcuts

---

**Last Updated:** 2024-11-24  
**Status:** Wireframes Complete
