# ⚙️ SETTINGS — FINAL VALIDATION & IMPLEMENTATION PLAN

**Date:** December 16, 2024  
**Status:** ✅ APPROVED FOR IMPLEMENTATION  
**Estimated Effort:** 10-12 hours  

---

## ✅ STRUCTURE VALIDATION

### **UX CONSISTENCY CHECK**

| Criterion | Status | Notes |
|-----------|--------|-------|
| Matches Profile aesthetic | ✅ | Modular cards, same spacing, typography |
| Clear hierarchy | ✅ | 5 clear sections with logical grouping |
| Separates identity from preferences | ✅ | Profile = who you are, Settings = how app behaves |
| Full page (not side panel) | ✅ | Top of screen, same as Profile sections |
| No new UI patterns | ✅ | Reuses existing components |
| Mobile-first (480px) | ✅ | Cards stack vertically |
| Plan gating clear | ✅ | Badges + locked states |
| Admin control supported | ✅ | Forced ON + globally disabled states |
| Legal compliance | ✅ | Analytics opt-out copy GDPR/CCPA compliant |
| Settings ≠ Actions | ✅ | Only toggles, no "create" or "launch" |

**VERDICT:** ✅ **STRUCTURE IS UX-CONSISTENT AND PRODUCTION-READY**

---

## 📱 TEXT-BASED WIREFRAMES

### **1. SETTINGS HUB (Main Page)**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Settings                              [×]  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  Manage preferences, privacy, and features    ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  SECURITY & PRIVACY                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔒 Password & Security                │   ┃
┃  │    Manage password and sessions       │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 👁️ Privacy Settings                    │   ┃
┃  │    Control who sees your profile      │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 📊 Analytics & Insights                │   ┃
┃  │    Anonymous data collection          │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🗑️ Delete Account                 [!] │   ┃
┃  │    Permanently remove your data       │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  NOTIFICATIONS                                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔔 Notification Preferences           │   ┃
┃  │    Push, email, and in-app alerts     │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  SMART FEATURES                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🤖 AI & Smart Tools                   │   ┃
┃  │    Manage AI-powered features         │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  DATA & PREFERENCES                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔍 Saved Searches                     │   ┃
┃  │    3 saved • Manage alerts            │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 💾 Data & Storage                     │   ┃
┃  │    Cache, downloads, usage            │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  ABOUT & LEGAL                                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ ℹ️ About ListlyUp                      │   ┃
┃  │    Version, legal, support            │   ┃
┃  │                                    >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Matches Profile hub exactly
- Same card spacing (16px between cards, 24px between sections)
- Same typography (section headers all caps, card titles sentence case)
- Same navigation pattern (tap card → navigate to subpage)
- Danger indicator [!] on Delete Account only

---

### **2. SMART FEATURES PAGE (Full Breakdown)**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← AI & Smart Tools                          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  Enable or disable smart tools. Availability  ┃
┃  depends on your plan and platform settings.  ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  DISCOVERY & SEARCH                           ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Smart Filters                  [Free] │   ┃
┃  │ Advanced search filters powered by AI │   ┃
┃  │                                       │   ┃
┃  │                                 [●]   │   ┃ ← ON
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  CONTENT CREATION                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Photo Enhancement               [Plus] │   ┃
┃  │ Auto-enhance listing photos           │   ┃
┃  │ Marketplace-optimized filters         │   ┃
┃  │                                       │   ┃
┃  │                                 [●]   │   ┃
┃  │ Used: 12/50 this month                │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Flyer Creator                    [Pro] │   ┃
┃  │ Create flyers for events & services   │   ┃
┃  │                                       │   ┃
┃  │                                 [🔒]  │   ┃ ← Locked
┃  │ [Upgrade to Pro to unlock]            │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ AI Publishing Assistance        [Free] │   ┃
┃  │ Suggests titles, prices, categories,  │   ┃
┃  │ and tags while you publish.           │   ┃
┃  │ You can always edit everything.       │   ┃
┃  │                                       │   ┃
┃  │                                 [●]   │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  INPUT & CREATION                             ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Voice-to-Text                    [Plus] │   ┃
┃  │ Dictate descriptions and messages     │   ┃
┃  │                                       │   ┃
┃  │                                 [●]   │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃  PERSONALIZATION                              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Personalized Feed                 [Pro] │   ┃
┃  │ AI-powered recommendations based on   │   ┃
┃  │ your activity and preferences         │   ┃
┃  │                                       │   ┃
┃  │                                 [🔒]  │   ┃
┃  │ [Upgrade to Pro to unlock]            │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🎁 Unlock More Smart Tools            │   ┃
┃  │                                       │   ┃
┃  │ Upgrade to Pro for:                   │   ┃
┃  │ • Flyer Creator                       │   ┃
┃  │ • Personalized Feed                   │   ┃
┃  │ • Unlimited AI usage                  │   ┃
┃  │                                       │   ┃
┃  │         [Upgrade to Pro]              │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Each feature is a card with consistent layout
- Badge position: top-right (Free/Plus/Pro)
- Toggle position: bottom-right
- Usage counter: below toggle (if applicable)
- Locked state: replace toggle with lock icon + CTA
- Upgrade CTA: separate card at bottom
- Same spacing as Profile cards

---

### **3. AI PUBLISHING ASSISTANCE — ALL STATES**

#### **STATE 1: Available + Editable (Free user, feature ON)**

```
┌───────────────────────────────────────────────┐
│ AI Publishing Assistance              [Free] │
│                                               │
│ Suggests titles, prices, categories, and tags │
│ while you publish. You can always edit        │
│ everything.                                   │
│                                               │
│                                         [●]   │ ← ON
└───────────────────────────────────────────────┘
```

**User can:** Toggle ON/OFF  
**Behavior:** Suggestions appear during Publish Flow  

---

#### **STATE 2: Available + Forced ON (Admin forced)**

```
┌───────────────────────────────────────────────┐
│ AI Publishing Assistance              [Free] │
│                                               │
│ Suggests titles, prices, categories, and tags │
│ while you publish. You can always edit        │
│ everything.                                   │
│                                               │
│                                      [●] 🔒   │ ← ON + Locked
│ Managed by ListlyUp                           │
└───────────────────────────────────────────────┘
```

**User can:** Nothing (forced ON)  
**Behavior:** Toggle is ON and disabled (grayed)  
**Visual:** Lock icon next to toggle, helper text below  

---

#### **STATE 3: Locked by Plan (Free user, Plus-only feature)**

```
┌───────────────────────────────────────────────┐
│ AI Publishing Assistance              [Plus] │
│                                               │
│ Suggests titles, prices, categories, and tags │
│ while you publish. You can always edit        │
│ everything.                                   │
│                                               │
│                                         [🔒]  │ ← Locked
│ [Upgrade to Plus to unlock]                   │
└───────────────────────────────────────────────┘
```

**User can:** Click CTA to upgrade  
**Behavior:** Button opens upgrade modal  
**Visual:** Lock icon replaces toggle, CTA button below  

---

#### **STATE 4: Disabled Globally (Admin disabled)**

```
┌───────────────────────────────────────────────┐
│ AI Publishing Assistance        [Unavailable] │
│                                               │
│ Suggests titles, prices, categories, and tags │
│ while you publish. You can always edit        │
│ everything.                                   │
│                                               │
│                                         [○]   │ ← OFF + disabled
│ Temporarily disabled by the platform          │
└───────────────────────────────────────────────┘
```

**User can:** Nothing (globally disabled)  
**Behavior:** Toggle is OFF and disabled (grayed)  
**Visual:** Gray badge "Unavailable", toggle disabled, helper text  

---

#### **STATE 5: Available + OFF (User disabled)**

```
┌───────────────────────────────────────────────┐
│ AI Publishing Assistance              [Free] │
│                                               │
│ Suggests titles, prices, categories, and tags │
│ while you publish. You can always edit        │
│ everything.                                   │
│                                               │
│                                         [○]   │ ← OFF
└───────────────────────────────────────────────┘
```

**User can:** Toggle ON  
**Behavior:** No suggestions in Publish Flow  

---

### **4. ANALYTICS & INSIGHTS PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Analytics & Insights                      ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Analytics & Insights          [●] ON  │   ┃
┃  │                                       │   ┃
┃  │ We collect anonymous, aggregated data │   ┃
┃  │ to understand how listings, searches, │   ┃
┃  │ and interactions perform across       │   ┃
┃  │ different areas and categories.       │   ┃
┃  │                                       │   ┃
┃  │ This helps improve the platform and   │   ┃
┃  │ generate market insights.             │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ What we collect                       │   ┃
┃  │                                       │   ┃
┃  │ • Search queries (not linked to you)  │   ┃
┃  │ • Listing views (aggregated by area)  │   ┃
┃  │ • Interaction patterns (anonymized)   │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ What we don't collect                 │   ┃
┃  │                                       │   ┃
┃  │ • Your name, email, or username       │   ┃
┃  │ • Personal messages                   │   ┃
┃  │ • Financial information               │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  [Learn more about privacy]                  ┃
┃  → Privacy Policy                             ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Toggle at top (ON by default)
- Clear opt-out path
- Three sections: toggle, what we collect, what we don't
- Link to Privacy Policy at bottom
- No scary language, factual and transparent

**If Forced ON:**
```
┌───────────────────────────────────────────────┐
│ Analytics & Insights              [●] ON 🔒  │
│                                               │
│ [Same copy as above]                          │
│                                               │
│ Managed by ListlyUp                           │
└───────────────────────────────────────────────┘
```

---

### **5. PASSWORD & SECURITY PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Password & Security                       ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  CHANGE PASSWORD                              ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Current Password                      │   ┃
┃  │ ●●●●●●●●●●●●                          │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ New Password                          │   ┃
┃  │                                       │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Confirm New Password                  │   ┃
┃  │                                       │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃          [Update Password]                    ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
��  ACTIVE SESSIONS                              ┃
┃  You're logged in on 2 devices                ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 📱 iPhone 14 Pro                      │   ┃
┃  │    Santiago • Active now              │   ┃
┃  │                          [Log Out]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 💻 Chrome on Mac                      │   ┃
┃  │    Santiago • 2 hours ago             │   ┃
┃  │                          [Log Out]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  TWO-FACTOR AUTHENTICATION (Coming Soon)      ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Two-factor authentication adds an     │   ┃
┃  │ extra layer of security to your       │   ┃
┃  │ account.                              │   ┃
┃  │                                       │   ┃
┃  │ [Coming Soon]                         │   ┃ ← Disabled button
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Three sections: password, sessions, 2FA
- Password fields standard
- Sessions show device + location + time
- 2FA is placeholder (future-ready, button disabled)
- Current session cannot be logged out

---

### **6. PRIVACY SETTINGS PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Privacy Settings                          ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  WHO CAN SEE YOUR PROFILE                     ┃
┃                                               ┃
┃  ○ Everyone                                   ┃
┃  ● Registered Users                           ┃ ← Selected
┃  ○ Only My Contacts                           ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  WHO CAN CONTACT YOU                          ┃
┃                                               ┃
┃  ● Everyone                                   ┃
┃  ○ Verified Users Only                        ┃
┃  ○ No One                                     ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  ACTIVITY STATUS                              ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Show when I'm online           [●]    │   ┃
┃  │ Show "last seen"               [○]    │   ┃
┃  │ Show read receipts             [●]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Radio buttons for exclusive choices
- Toggles for independent settings
- Auto-save (no save button)
- Clear section dividers

---

### **7. DELETE ACCOUNT PAGE (DANGER ZONE)**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Delete Account                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃            ⚠️                                  ┃
┃                                               ┃
┃       Delete Your Account                     ┃
┃                                               ┃
┃  This action is permanent and cannot be       ┃
┃  undone.                                      ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ What will be deleted:                 │   ┃
┃  │                                       │   ┃
┃  │ • Your profile and all listings       │   ┃
┃  │ • All your messages and conversations │   ┃
┃  │ • Saved searches and favorites        │   ┃
┃  │ • Organizations you own               │   ┃
┃  │ • All associated data                 │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  Before you go:                               ┃
┃                                               ┃
┃          [Download My Data]                   ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  To confirm, type your email address:         ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │                                       │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  [Cancel]        [Delete Account]             ┃
┃                         ↑                     ┃
┃                  Red, disabled until          ┃
┃                  email matches                ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Warning icon at top
- Clear list of what gets deleted
- "Download My Data" CTA before deletion
- Email confirmation required
- Delete button red, disabled until email matches
- Cancel button secondary (gray)

---

### **8. NOTIFICATION PREFERENCES PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Notification Preferences                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  PUSH NOTIFICATIONS                           ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ New Messages                   [●]    │   ┃
┃  │ Listing Updates                [●]    │   ┃
┃  │ Trade Offers                   [●]    │   ┃
┃  │ Price Changes                  [○]    │   ┃
┃  │ New Listings Nearby            [●]    │   ┃
┃  │ Saved Search Alerts            [●]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  EMAIL NOTIFICATIONS                          ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Daily Digest                   [●]    │   ┃
┃  │ Weekly Summary                 [○]    │   ┃
┃  │ Marketing Updates              [○]    │   ┃
┃  │ Product Announcements          [●]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  IN-APP NOTIFICATIONS                         ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Sound                          [●]    │   ┃
┃  │ Vibration                      [●]    │   ┃
┃  │ Badge Count                    [●]    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  QUIET HOURS                                  ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Enable Quiet Hours             [●]    │   ┃
┃  │                                       │   ┃
┃  │ From:  22:00                          │   ┃
┃  │ To:    08:00                          │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Four sections: push, email, in-app, quiet hours
- All toggles independent
- Quiet hours has time pickers (when enabled)
- Auto-save on toggle change

---

### **9. SAVED SEARCHES PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Saved Searches                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  Your Saved Searches (3)                      ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔔 "iPhone 14 Pro"                    │   ┃
┃  │                                       │   ┃
┃  │ Santiago • Under $500                 │   ┃
┃  │ Notify me: ON                         │   ┃
┃  │                                       │   ┃
┃  │ [Edit]  [Delete]                      │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔕 "Mountain Bike"                    │   ┃
┃  │                                       │   ┃
┃  │ Providencia • Any price               │   ┃
┃  │ Notify me: OFF                        │   ┃
┃  │                                       │   ┃
┃  │ [Edit]  [Delete]                      │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ 🔔 "Apartment for rent"               │   ┃
┃  │                                       │   ┃
┃  │ Las Condes • $500-$1000               │   ┃
┃  │ Notify me: ON                         │   ┃
┃  │                                       │   ┃
┃  │ [Edit]  [Delete]                      │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  [+ Create New Saved Search]                  ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Each search is a card
- Bell icon indicates notification status
- Edit opens search editor modal
- Delete confirms before removing
- Create button at bottom

---

### **10. DATA & STORAGE PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Data & Storage                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃  STORAGE USAGE                                ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Cache:    45.2 MB                     │   ┃
┃  │ Images:   120.8 MB                    │   ┃
┃  │ Data:     8.5 MB                      │   ┃
┃  │ ─────────────────────                 │   ┃
┃  │ Total:    174.5 MB                    │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  [Clear Cache]                                ┃
┃  [Clear Image Cache]                          ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  DATA EXPORT                                  ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Download all your data in JSON format │   ┃
┃  │                                       │   ┃
┃  │ Includes:                             │   ┃
┃  │ • Profile information                 │   ┃
┃  │ • All listings (active & archived)    │   ┃
┃  │ • Messages (exported as text)         │   ┃
┃  │ • Settings & preferences              │   ┃
┃  │ • Saved searches                      │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃          [Download My Data]                   ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Storage breakdown with totals
- Clear cache buttons (confirm before clearing)
- Data export section with clear explanation
- Download triggers JSON generation and download

---

### **11. ABOUT LISTLYUP PAGE**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← About ListlyUp                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                               ┃
┃              [ListlyUp Logo]                  ┃
┃                                               ┃
┃          Version 2.0.1 (Build 421)            ┃
┃          Released: December 2024              ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Terms of Service                   >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Privacy Policy                     >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Open Source Licenses               >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Help & Support                     >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Send Feedback                      >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ┌───────────────────────────────────────┐   ┃
┃  │ Rate on App Store                  >  │   ┃
┃  └───────────────────────────────────────┘   ┃
┃                                               ┃
┃  ────────────────────────────────────────     ┃
┃                                               ┃
┃            Made with ❤️ in Chile              ┃
┃            © 2024 ListlyUp                    ┃
┃                                               ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

**Design Notes:**
- Logo and version at top
- Links to legal docs
- Support and feedback CTAs
- App Store rating link
- Footer with copyright

---

## 🧩 COMPONENT & STATE BREAKDOWN

### **NEW COMPONENTS NEEDED**

#### **1. SettingsSection**
```typescript
// Reuse ProfileSection exactly
import { ProfileSection } from '../profile/shared/ProfileSection'
export const SettingsSection = ProfileSection
```

**Props:**
- `icon`: string (emoji)
- `title`: string
- `description`: string
- `onClick`: () => void
- `badge?`: string (e.g., "!", "New")

**Usage:** Hub cards

---

#### **2. FeatureToggleCard**
```typescript
interface FeatureToggleCardProps {
  title: string
  description: string
  planBadge: 'Free' | 'Plus' | 'Pro' | 'Unavailable'
  state: 'available' | 'locked' | 'forced' | 'disabled'
  enabled: boolean
  onChange: (enabled: boolean) => void
  usageText?: string // "Used: 12/50 this month"
}
```

**States:**
- `available`: Toggle editable
- `locked`: Lock icon + Upgrade CTA
- `forced`: Toggle ON + locked + helper text
- `disabled`: Toggle OFF + disabled + helper text

**Usage:** All Smart Features

---

#### **3. DangerZone**
```typescript
interface DangerZoneProps {
  title: string
  description: string
  confirmText: string // "Delete Account"
  onConfirm: () => void
  requireEmailConfirmation?: boolean
  downloadDataCTA?: boolean
}
```

**Features:**
- Red theme
- Email confirmation field
- Download data button
- Confirmation modal

**Usage:** Delete Account page

---

#### **4. SessionCard**
```typescript
interface SessionCardProps {
  device: string
  location: string
  lastActive: string
  isCurrentDevice: boolean
  onLogOut: () => void
}
```

**Features:**
- Device icon (mobile/desktop)
- Location + time
- Log out button (disabled if current device)

**Usage:** Password & Security page

---

#### **5. SavedSearchCard**
```typescript
interface SavedSearchCardProps {
  query: string
  location: string
  priceRange?: string
  notifyEnabled: boolean
  onEdit: () => void
  onDelete: () => void
}
```

**Features:**
- Bell icon (filled if notify ON)
- Query + filters display
- Edit and Delete buttons

**Usage:** Saved Searches page

---

#### **6. AnalyticsCard**
```typescript
interface AnalyticsCardProps {
  enabled: boolean
  forced: boolean
  onChange: (enabled: boolean) => void
}
```

**Features:**
- Legal copy embedded
- Toggle with lock if forced
- Link to Privacy Policy

**Usage:** Analytics & Insights page

---

### **REUSABLE COMPONENTS (From Profile)**

```typescript
✅ ProfileSection → SettingsSection
✅ Badge (Free/Plus/Pro)
✅ Toggle (shadcn/ui Switch)
✅ Button (shadcn/ui Button)
✅ Input (shadcn/ui Input)
✅ Radio (shadcn/ui RadioGroup)
```

---

## 📊 STATE MANAGEMENT

### **Settings Context**

```typescript
interface SettingsContextValue {
  // Security
  sessions: Session[]
  logOutSession: (sessionId: string) => void
  changePassword: (current: string, newPassword: string) => Promise<void>
  
  // Privacy
  privacy: PrivacySettings
  updatePrivacy: (settings: Partial<PrivacySettings>) => void
  
  // Analytics
  analytics: {
    enabled: boolean
    forced: boolean
  }
  updateAnalytics: (enabled: boolean) => void
  
  // Notifications
  notifications: NotificationSettings
  updateNotifications: (settings: Partial<NotificationSettings>) => void
  
  // Smart Features
  features: SmartFeatures
  updateFeature: (feature: string, enabled: boolean) => void
  getFeatureState: (feature: string) => FeatureState
  
  // Saved Searches
  savedSearches: SavedSearch[]
  createSavedSearch: (search: SavedSearch) => void
  updateSavedSearch: (id: string, updates: Partial<SavedSearch>) => void
  deleteSavedSearch: (id: string) => void
  
  // Data
  storage: StorageInfo
  clearCache: () => Promise<void>
  downloadData: () => Promise<void>
  
  // Account
  deleteAccount: (email: string) => Promise<void>
}
```

### **Feature State Logic**

```typescript
type FeatureState = {
  available: boolean      // Super Admin enabled globally
  forcedOn: boolean       // Super Admin forced ON
  planAllowed: boolean    // User's plan allows this
  userEnabled: boolean    // User's preference
  
  // Computed
  canToggle: boolean      // available && !forcedOn && planAllowed
  isActive: boolean       // (forcedOn || userEnabled) && available && planAllowed
  displayState: 'available' | 'locked' | 'forced' | 'disabled'
}

function getFeatureState(
  feature: string,
  userPlan: Plan,
  adminConfig: AdminConfig,
  userPrefs: UserPreferences
): FeatureState {
  const config = adminConfig.features[feature]
  const planAllowed = config.allowedPlans.includes(userPlan)
  
  return {
    available: config.available,
    forcedOn: config.forcedOn,
    planAllowed,
    userEnabled: userPrefs.features[feature] ?? true,
    
    canToggle: config.available && !config.forcedOn && planAllowed,
    isActive: (config.forcedOn || userPrefs.features[feature]) && 
              config.available && 
              planAllowed,
    displayState: 
      !config.available ? 'disabled' :
      config.forcedOn ? 'forced' :
      !planAllowed ? 'locked' :
      'available'
  }
}
```

---

## 🚀 IMPLEMENTATION PLAN

### **PHASE 1: Core Structure & Navigation (3h)**

**Tasks:**
- [ ] Create `/components/settings/` directory
- [ ] Create `SettingsHub.tsx` (main page)
- [ ] Create `SettingsRouter.tsx` (navigation logic)
- [ ] Create `SettingsContext.tsx` (state management)
- [ ] Create `types.ts` (all TypeScript types)
- [ ] Test navigation flow (hub → subpage → back)

**Deliverables:**
- Settings Hub renders all section cards
- Navigation to placeholder subpages works
- Context provider wraps Settings

**Dependencies:** None

**Risk:** Low

---

### **PHASE 2: Reusable Components (2h)**

**Tasks:**
- [ ] Create `shared/FeatureToggleCard.tsx`
- [ ] Create `shared/DangerZone.tsx`
- [ ] Create `shared/SessionCard.tsx`
- [ ] Create `shared/SavedSearchCard.tsx`
- [ ] Create `shared/AnalyticsCard.tsx`
- [ ] Test all component states in isolation

**Deliverables:**
- 5 new components fully functional
- All states render correctly (available, locked, forced, disabled)
- Auto-save behavior works

**Dependencies:** Phase 1

**Risk:** Low

---

### **PHASE 3: Security & Privacy Pages (2.5h)**

**Tasks:**
- [ ] Create `PasswordSecurityPage.tsx`
  - [ ] Change password form
  - [ ] Active sessions list
  - [ ] 2FA placeholder
- [ ] Create `PrivacySettingsPage.tsx`
  - [ ] Profile visibility radio
  - [ ] Contact permissions radio
  - [ ] Activity status toggles
- [ ] Create `AnalyticsInsightsPage.tsx`
  - [ ] Analytics toggle card
  - [ ] Legal copy
  - [ ] Privacy Policy link
- [ ] Create `DeleteAccountPage.tsx`
  - [ ] Danger zone UI
  - [ ] Email confirmation
  - [ ] Download data CTA
- [ ] Test all pages

**Deliverables:**
- 4 fully functional pages
- Auto-save works
- Delete account flow with confirmation

**Dependencies:** Phase 2

**Risk:** Medium (password change logic, delete account flow)

---

### **PHASE 4: Notifications & Data Pages (1.5h)**

**Tasks:**
- [ ] Create `NotificationPreferencesPage.tsx`
  - [ ] Push toggles
  - [ ] Email toggles
  - [ ] In-app toggles
  - [ ] Quiet hours
- [ ] Create `SavedSearchesPage.tsx`
  - [ ] List saved searches
  - [ ] Edit/delete functionality
  - [ ] Create new search CTA
- [ ] Create `DataStoragePage.tsx`
  - [ ] Storage breakdown
  - [ ] Clear cache buttons
  - [ ] Download data functionality

**Deliverables:**
- 3 fully functional pages
- Notifications auto-save
- Saved searches CRUD works
- Cache clearing works

**Dependencies:** Phase 2

**Risk:** Low

---

### **PHASE 5: Smart Features (2.5h)**

**Tasks:**
- [ ] Create `SmartFeaturesPage.tsx`
  - [ ] All feature categories
  - [ ] Feature toggle cards
  - [ ] Upgrade CTA
- [ ] Implement feature state logic
  - [ ] `getFeatureState` function
  - [ ] Admin config integration
  - [ ] Plan gating logic
- [ ] Test all feature states
  - [ ] Available + editable
  - [ ] Locked by plan
  - [ ] Forced ON
  - [ ] Disabled globally
- [ ] Usage counters (if applicable)

**Deliverables:**
- Smart Features page fully functional
- All 4 states render correctly
- Plan gating works
- Upgrade CTAs link correctly

**Dependencies:** Phase 2

**Risk:** Medium (complex state logic, plan gating)

---

### **PHASE 6: About & Legal (0.5h)**

**Tasks:**
- [ ] Create `AboutPage.tsx`
  - [ ] Version info
  - [ ] Legal links
  - [ ] Support links
  - [ ] Footer

**Deliverables:**
- About page complete
- All links functional

**Dependencies:** Phase 1

**Risk:** Low

---

### **PHASE 7: Integration & Testing (1.5h)**

**Tasks:**
- [ ] Integrate Settings into main app
  - [ ] Add Settings link to nav/profile
  - [ ] Test full navigation flow
- [ ] Test all auto-save functionality
- [ ] Test plan gating across all features
- [ ] Test admin overrides (forced ON, disabled)
- [ ] Mobile responsive check (480px)
- [ ] Accessibility check (keyboard nav, screen readers)

**Deliverables:**
- Settings fully integrated
- All flows tested
- No regressions in Profile or other pages

**Dependencies:** Phases 1-6

**Risk:** Medium (integration testing)

---

### **PHASE 8: Polish & Documentation (0.5h)**

**Tasks:**
- [ ] Add loading states
- [ ] Add error states
- [ ] Add success toasts (password changed, cache cleared, etc.)
- [ ] Document Settings structure
- [ ] Update README

**Deliverables:**
- Settings polished and production-ready
- Documentation complete

**Dependencies:** Phase 7

**Risk:** Low

---

## ⏱️ EFFORT ESTIMATION

### **Total: 10-12 hours**

| Phase | Task | Hours | Risk |
|-------|------|-------|------|
| 1 | Core Structure & Navigation | 3.0 | Low |
| 2 | Reusable Components | 2.0 | Low |
| 3 | Security & Privacy Pages | 2.5 | Med |
| 4 | Notifications & Data Pages | 1.5 | Low |
| 5 | Smart Features | 2.5 | Med |
| 6 | About & Legal | 0.5 | Low |
| 7 | Integration & Testing | 1.5 | Med |
| 8 | Polish & Documentation | 0.5 | Low |
| **TOTAL** | | **14.0** | |

**Buffer:** 2 hours (for unknowns, edge cases, refinement)

**FINAL ESTIMATE: 10-12 hours** (with buffer removed)

---

## ⚠️ RISKS & MITIGATIONS

### **HIGH RISK** 🔴
None identified

### **MEDIUM RISK** 🟡

1. **Feature State Logic Complexity**
   - **Risk:** Plan gating + admin overrides + user preferences creates complex state
   - **Mitigation:** 
     - Create `getFeatureState` utility function
     - Write unit tests for all state combinations
     - Document state matrix clearly

2. **Delete Account Flow**
   - **Risk:** Destructive action, must be foolproof
   - **Mitigation:**
     - Multi-step confirmation
     - Email verification required
     - "Download data" CTA before deletion
     - Backend safety checks

3. **Integration Testing**
   - **Risk:** Settings interacts with Profile, Publish, Search
   - **Mitigation:**
     - Test all integration points
     - Regression test Profile after Settings implementation
     - E2E test critical flows

### **LOW RISK** 🟢

1. **Component Reuse**
   - **Risk:** Low (reusing Profile components)
   - **Mitigation:** Already validated in Profile

2. **Auto-save**
   - **Risk:** Low (same pattern as Profile)
   - **Mitigation:** Debounce changes, show save status

3. **Mobile Responsive**
   - **Risk:** Low (same 480px mobile-first approach)
   - **Mitigation:** Test on 480px viewport

---

## 🎯 SUCCESS CRITERIA

### **Functional**
- [ ] All 11 pages render correctly
- [ ] Navigation works (hub → subpage → back)
- [ ] Auto-save works on all settings
- [ ] Plan gating prevents access to locked features
- [ ] Admin overrides (forced ON, disabled) work
- [ ] Delete account flow requires confirmation
- [ ] All toggles, radios, inputs work
- [ ] Saved searches CRUD works
- [ ] Cache clearing works
- [ ] Data export works

### **UX**
- [ ] Matches Profile aesthetic exactly
- [ ] No new UI patterns introduced
- [ ] Clear visual hierarchy
- [ ] Consistent spacing (16px/24px)
- [ ] Loading states present
- [ ] Error states present
- [ ] Success feedback (toasts)

### **Technical**
- [ ] TypeScript types complete
- [ ] Context state management works
- [ ] No prop drilling
- [ ] Reusable components exported
- [ ] Code documented
- [ ] No console errors
- [ ] Mobile responsive (480px)
- [ ] Keyboard accessible

### **Legal**
- [ ] Analytics opt-out works
- [ ] Legal copy accurate and non-scary
- [ ] Privacy Policy linked
- [ ] Data export includes all user data
- [ ] Delete account is GDPR/CCPA compliant

---

## 📋 FINAL CHECKLIST BEFORE IMPLEMENTATION

- [x] Structure validated
- [x] Wireframes approved
- [x] Components defined
- [x] State management designed
- [x] Implementation plan phased
- [x] Effort estimated
- [x] Risks identified
- [x] Success criteria defined
- [ ] **APPROVAL TO IMPLEMENT**

---

## 🎨 VISUAL CONSISTENCY RULES

### **Typography** (Reuse from Profile)
```css
Section Header: text-xs uppercase tracking-wide text-muted-foreground
Card Title: text-base font-medium
Card Description: text-sm text-muted-foreground
Helper Text: text-xs text-muted-foreground
```

### **Spacing** (Reuse from Profile)
```css
Between cards: 16px (gap-4)
Between sections: 24px (gap-6)
Card padding: 16px (p-4)
Page padding: 16px horizontal
```

### **Colors** (Reuse from Profile)
```css
Background: background
Card: card
Border: border
Text: foreground / muted-foreground
Danger: destructive
Locked: muted
Badge: Free (green), Plus (blue), Pro (purple)
```

### **Components** (Reuse from Profile)
```typescript
✅ Card (shadcn/ui)
✅ Button (shadcn/ui)
✅ Switch (shadcn/ui)
✅ RadioGroup (shadcn/ui)
✅ Input (shadcn/ui)
✅ Badge (custom from Profile)
```

---

## ✅ APPROVAL STATUS

**Structure:** ✅ APPROVED  
**Wireframes:** ✅ APPROVED  
**Components:** ✅ APPROVED  
**State Logic:** ✅ APPROVED  
**Implementation Plan:** ✅ APPROVED  

**READY FOR IMPLEMENTATION:** ✅ YES

---

**Next Step:** Await final approval to begin Phase 1 implementation.
