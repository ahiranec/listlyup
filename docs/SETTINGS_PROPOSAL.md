# ⚙️ SETTINGS PAGE - PROPOSAL

**Objetivo:** Crear Settings con estética modular idéntica a Profile  
**Filosofía:** Settings = Preferencias del sistema, Feature Flags, Seguridad  
**Separación clara:** Profile = identidad, Settings = comportamiento de la app

---

## 📊 SETTINGS vs PROFILE - SEPARACIÓN DE RESPONSABILIDADES

### **PROFILE (YA IMPLEMENTADO):**
- ✅ Identidad del usuario (nombre, bio, avatar)
- ✅ Account Type (Personal/Business)
- ✅ Organizations
- ✅ Publishing Defaults (valores por defecto)
- ✅ Saved Addresses (logística)
- ✅ Language & Region (localización)

### **SETTINGS (PROPUESTO):**
- ⚙️ Security & Privacy (password, 2FA, delete account)
- 🔔 Notifications (push, email, in-app)
- 🤖 Feature Flags / Advanced Features (AI tools con plan gating)
- 🔍 Saved Searches & Filters
- 📊 Data & Storage
- 🔗 Integrations & API
- ℹ️ About & Legal

---

## 🎨 ESTRUCTURA PROPUESTA

```
Settings
├── SECURITY & PRIVACY
│   ├── Password & Security
│   ├── Two-Factor Authentication (2FA)
│   ├── Privacy Settings
│   └── Delete Account
│
├── NOTIFICATIONS
│   ├── Push Notifications
│   ├── Email Notifications
│   └── In-App Notifications
│
├── ADVANCED FEATURES (Feature Flags)
│   ├── 🤖 AI & SMART TOOLS
│   │   ├── AI Title Suggestion [Plus]
│   │   ├── AI Price Suggestion [Plus]
│   │   ├── AI Category Detection [Pro]
│   │   ├── AI Tag Suggestions [Free]
│   │   ├── Text Moderation [Pro]
│   │   └── Photo Moderation [Pro]
│   │
│   ├── 🎤 VOICE & INPUT
│   │   └── Voice-to-Text [Plus]
│   │
│   ├── 📍 LOCATION & MAPS
│   │   └── Enhanced Location (Google Maps API) [Free]
│   │
│   └── ✨ PERSONALIZATION
│       └── Personalized Feed [Pro]
│
├── SAVED & PREFERENCES
│   ├── Saved Searches
│   └── Filter Preferences
│
├── DATA & STORAGE
│   ├── Cache Management
│   ├── Download My Data
│   └── Storage Usage
│
├── INTEGRATIONS
│   ├── API Access
│   ├── Webhooks
│   └── Connected Apps
│
└── ABOUT & LEGAL
    ├── App Version
    ├── Terms of Service
    ├── Privacy Policy
    └── Help & Support
```

---

## 📱 WIREFRAME DETALLADO

### **Settings Hub (Pantalla Principal):**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Settings                    [×]  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Manage your account, privacy,      ┃
┃  and feature preferences            ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ SECURITY & PRIVACY                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔒 Password & Security          │ ┃
┃ │    Change password, 2FA         │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 👁️ Privacy Settings              │ ┃
┃ │    Control your data            │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🗑️ Delete Account          [!]  │ ┃
┃ │    Permanently remove data      │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ NOTIFICATIONS                       ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔔 Notification Preferences     │ ┃
┃ │    Push, email, in-app          │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ADVANCED FEATURES                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🤖 AI & Smart Tools             │ ┃
┃ │    Feature flags & AI settings  │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ✨ Other Features                │ ┃
┃ │    Voice, maps, personalization │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ DATA & PREFERENCES                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔍 Saved Searches               │ ┃
┃ │    3 saved                      │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 💾 Data & Storage               │ ┃
┃ │    Manage app data              │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ABOUT                               ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ℹ️ About ListlyUp                │ ┃
┃ │    Version, legal, support      │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🔐 SECURITY & PRIVACY - SUBPÁGINAS

### **1. Password & Security Page:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Password & Security              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  CHANGE PASSWORD                    ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Current Password              │  ┃
┃  │ ........................      │  ┃
┃  └───────────────────────────────┘  ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ New Password                  │  ┃
┃  │ ........................      │  ┃
┃  └───────────────────────────────┘  ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Confirm New Password          │  ┃
┃  │ ........................      │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  [Update Password]                  ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃  TWO-FACTOR AUTHENTICATION          ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ 📱 SMS Authentication         │  ┃
┃  │    Send code to your phone    │  ┃
┃  │                           [○] │  ┃
┃  └───────────────────────────────┘  ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ 📧 Email Authentication       │  ┃
┃  │    Send code to your email    │  ┃
┃  │                           [●] │  ┃ ← Enabled
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃  SESSIONS                           ┃
┃  Active on 2 devices                ┃
┃                                     ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ 📱 iPhone 14 Pro              │  ┃
┃  │    Santiago • Active now      │  ┃
┃  │                    [Log Out]  │  ┃
┃  └───────────────────────────────┘  ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ 💻 Chrome on Mac              │  ┃
┃  │    Santiago • 2 hours ago     │  ┃
┃  │                    [Log Out]  │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### **2. Privacy Settings Page:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Privacy Settings                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  WHO CAN SEE YOUR PROFILE           ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ ○ Everyone                    │  ┃
┃  │ ● Registered Users            │  ┃ ← Selected
┃  │ ○ Only My Contacts            │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  WHO CAN CONTACT YOU                ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Allow messages from:          │  ┃
┃  │ ● Everyone                    │  ┃
┃  │ ○ Verified Users Only         │  ┃
┃  │ ○ No One                      │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  ACTIVITY STATUS                    ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Show when I'm online     [●]  │  ┃
┃  │ Show "last seen"         [○]  │  ┃
┃  │ Show read receipts       [●]  │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  DATA SHARING                       ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Share analytics          [●]  │  ┃
┃  │ Personalized ads         [○]  │  ┃
┃  │ Third-party cookies      [○]  │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

### **3. Delete Account Page:**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Delete Account                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  ⚠️                                  ┃
┃                                     ┃
┃  Delete Your Account                ┃
┃                                     ┃
┃  This action is permanent and       ┃
┃  cannot be undone.                  ┃
┃                                     ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ What will be deleted:         │  ┃
┃  │                               │  ┃
┃  │ • Your profile and listings   │  ┃
┃  │ • All your messages           │  ┃
┃  │ • Saved searches & favorites  │  ┃
┃  │ • Organizations you own       │  ┃
┃  │ • All your data               │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  Before you go:                     ┃
┃                                     ┃
┃  [Download My Data]                 ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃  To confirm, type your email:       ┃
┃  ┌───────────────────────────────┐  ┃
┃  │                               │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  [Cancel]  [Delete Account]         ┃
┃                      ↑ Red, disabled ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🔔 NOTIFICATIONS - SUBPÁGINA

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Notification Preferences         ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  PUSH NOTIFICATIONS                 ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ New Messages            [●]   │  ┃
┃  │ Listing Updates         [●]   │  ┃
┃  │ Trade Offers            [●]   │  ┃
┃  │ Price Changes           [○]   │  ┃
┃  │ New Listings Nearby     [●]   │  ┃
┃  │ Saved Search Alerts     [●]   │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  EMAIL NOTIFICATIONS                ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Daily Digest            [●]   │  ┃
┃  │ Weekly Summary          [○]   │  ┃
┃  │ Marketing Updates       [○]   │  ┃
┃  │ Product Announcements   [●]   │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  IN-APP NOTIFICATIONS               ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Sound                   [●]   │  ┃
┃  │ Vibration               [●]   │  ┃
┃  │ Badge Count             [●]   │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  QUIET HOURS                        ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Enable Quiet Hours      [●]   │  ┃
┃  │                               │  ┃
┃  │ From:  22:00                  │  ┃
┃  │ To:    08:00                  │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🤖 ADVANCED FEATURES - SUBPÁGINA

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Advanced Features                ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Enable or disable advanced         ┃
┃  features and AI tools              ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🤖 AI & SMART TOOLS                 ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ AI Title Suggestion      [Plus] │ ┃
┃ │ Auto-generate listing titles    │ ┃
┃ │                           [●]   │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ AI Price Suggestion      [Plus] │ ┃
┃ │ Suggest optimal pricing         │ ┃
┃ │                           [●]   │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ AI Category Detection    [Pro]  │ ┃
┃ │ Auto-detect from photos         │ ┃
┃ │                           [🔒]  │ ┃ ← Locked
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ AI Tag Suggestions       [Free] │ ┃
┃ │ Smart hashtag recommendations   │ ┃
┃ │                           [●]   │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Text Moderation          [Pro]  │ ┃
┃ │ Filter inappropriate content    │ ┃
┃ │                           [🔒]  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Photo Moderation         [Pro]  │ ┃
┃ │ Scan images for violations      │ ┃
┃ │                           [🔒]  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 🎤 VOICE & INPUT                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Voice-to-Text            [Plus] │ ┃
┃ │ Dictate descriptions            │ ┃
┃ │                           [●]   │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ 📍 LOCATION & MAPS                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Enhanced Location        [Free] │ ┃
┃ │ Google Maps API integration     │ ┃
┃ │                           [●]   │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ ✨ PERSONALIZATION                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Personalized Feed        [Pro]  │ ┃
┃ │ AI-powered recommendations      │ ┃
┃ │                           [🔒]  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🔍 SAVED SEARCHES - SUBPÁGINA

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Saved Searches                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Your Saved Searches (3)            ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔔 "iPhone 14 Pro"              │ ┃
┃ │    Santiago • Under $500        │ ┃
┃ │    Notify me: ON                │ ┃
┃ │                                 │ ┃
┃ │    [Edit]  [Delete]             │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔕 "Mountain Bike"              │ ┃
┃ │    Providencia • Any price      │ ┃
┃ │    Notify me: OFF               │ ┃
┃ │                                 │ ┃
┃ │    [Edit]  [Delete]             │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🔔 "Apartment for rent"         │ ┃
┃ │    Las Condes • $500-$1000      │ ┃
┃ │    Notify me: ON                │ ┃
┃ │                                 │ ┃
┃ │    [Edit]  [Delete]             │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 💾 DATA & STORAGE - SUBPÁGINA

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← Data & Storage                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  STORAGE USAGE                      ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Cache: 45.2 MB                │  ┃
┃  │ Images: 120.8 MB              │  ┃
┃  │ Data: 8.5 MB                  │  ┃
┃  │ Total: 174.5 MB               │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  [Clear Cache]                      ┃
┃  [Clear Image Cache]                ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃  DATA EXPORT                        ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Download all your data in     │  ┃
┃  │ JSON format. Includes:        │  ┃
┃  │                               │  ┃
┃  │ • Profile information         │  ┃
┃  │ • All listings                │  ┃
┃  │ • Messages (archived)         │  ┃
┃  │ • Settings & preferences      │  ┃
┃  └───────────────────────────────┘  ┃
┃                                     ┃
┃  [Download My Data]                 ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## ℹ️ ABOUT & LEGAL - SUBPÁGINA

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃  ← About ListlyUp                   ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  [ListlyUp Logo]                    ┃
┃                                     ┃
┃  Version 2.0.1 (Build 421)          ┃
┃  Released: December 2024            ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Terms of Service             >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Privacy Policy               >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Licenses                     >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Help & Support               >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Send Feedback                >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ Rate on App Store            >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃  ────────────────────────────────   ┃
┃                                     ┃
┃  Made with ❤️ in Chile              ┃
┃  © 2024 ListlyUp                    ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📊 TYPES PROPUESTOS

```typescript
export interface SettingsData {
  // Security & Privacy
  password: {
    lastChanged?: string;
  };
  
  twoFactor: {
    smsEnabled: boolean;
    emailEnabled: boolean;
  };
  
  privacy: {
    profileVisibility: 'everyone' | 'registered' | 'contacts';
    allowMessages: 'everyone' | 'verified' | 'none';
    showOnline: boolean;
    showLastSeen: boolean;
    showReadReceipts: boolean;
    shareAnalytics: boolean;
    personalizedAds: boolean;
    thirdPartyCookies: boolean;
  };
  
  sessions: Session[];
  
  // Notifications
  notifications: {
    push: {
      newMessages: boolean;
      listingUpdates: boolean;
      tradeOffers: boolean;
      priceChanges: boolean;
      nearbyListings: boolean;
      savedSearchAlerts: boolean;
    };
    email: {
      dailyDigest: boolean;
      weeklySummary: boolean;
      marketing: boolean;
      productAnnouncements: boolean;
    };
    inApp: {
      sound: boolean;
      vibration: boolean;
      badgeCount: boolean;
    };
    quietHours: {
      enabled: boolean;
      from: string; // "22:00"
      to: string; // "08:00"
    };
  };
  
  // Feature Flags
  featureFlags: {
    aiTitleSuggestion: boolean;
    aiPriceSuggestion: boolean;
    aiCategoryDetection: boolean; // Pro only
    aiTagSuggestions: boolean;
    textModeration: boolean; // Pro only
    photoModeration: boolean; // Pro only
    voiceToText: boolean; // Plus only
    enhancedLocation: boolean;
    personalizedFeed: boolean; // Pro only
  };
  
  // Saved Searches
  savedSearches: SavedSearch[];
  
  // Data & Storage
  storage: {
    cacheSize: number; // bytes
    imageSize: number;
    dataSize: number;
  };
}

export interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrentDevice: boolean;
}

export interface SavedSearch {
  id: string;
  query: string;
  location: string;
  priceRange?: string;
  notifyEnabled: boolean;
  createdAt: string;
}
```

---

## 🎯 COMPONENTES REUTILIZABLES

### **De Profile (ya existentes):**
- ✅ `ProfileSection` → Reutilizar para cards clickeables
- ✅ Header structure
- ✅ Status bar
- ✅ Layout structure

### **Nuevos para Settings:**
- 🆕 `ToggleSwitch` - Toggle con label y description
- 🆕 `FeatureFlagCard` - Card con badge de plan + toggle
- 🆕 `SessionCard` - Active session display
- 🆕 `SavedSearchCard` - Saved search con notificaciones
- 🆕 `DangerZone` - Red-themed section para Delete Account

---

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
/components/settings/
├── SettingsHub.tsx              (Main hub)
├── SettingsRouter.tsx           (Navigation)
│
├── SecurityPasswordPage.tsx     
├── PrivacySettingsPage.tsx      
├── DeleteAccountPage.tsx        
│
├── NotificationsPage.tsx        
│
├── AdvancedFeaturesPage.tsx     (Feature flags)
│
├── SavedSearchesPage.tsx        
├── DataStoragePage.tsx          
│
├── AboutPage.tsx                
│
├── types.ts                     
├── shared/
│   ├── ToggleSwitch.tsx
│   ├── FeatureFlagCard.tsx
│   ├── SessionCard.tsx
│   ├── SavedSearchCard.tsx
│   └── DangerZone.tsx
│
└── utils/
    └── featureFlagGating.ts     (Plan gating logic)
```

---

## ⚡ PLAN GATING LOGIC

```typescript
// Feature flag availability by plan
export const FEATURE_AVAILABILITY = {
  aiTitleSuggestion: ['Plus', 'Pro'],
  aiPriceSuggestion: ['Plus', 'Pro'],
  aiCategoryDetection: ['Pro'],
  aiTagSuggestions: ['Free', 'Plus', 'Pro'],
  textModeration: ['Pro'],
  photoModeration: ['Pro'],
  voiceToText: ['Plus', 'Pro'],
  enhancedLocation: ['Free', 'Plus', 'Pro'],
  personalizedFeed: ['Pro'],
} as const;

export function isFeatureAvailable(
  feature: keyof typeof FEATURE_AVAILABILITY,
  plan: 'Free' | 'Plus' | 'Pro'
): boolean {
  return FEATURE_AVAILABILITY[feature].includes(plan);
}
```

---

## 🎨 DIFERENCIAS CLAVE: SETTINGS vs PROFILE

| Aspecto | PROFILE | SETTINGS |
|---------|---------|----------|
| **Propósito** | Identidad del usuario | Preferencias del sistema |
| **Contenido** | Nombre, bio, addresses | Security, privacy, features |
| **Save button** | ✅ Sí (top-right) | ❌ No (auto-save) |
| **Sub-navegación** | 2-3 niveles | 1-2 niveles |
| **Toggles** | ❌ Pocos | ✅ Muchos |
| **Plan gating** | Organizations | Feature Flags |
| **Danger zone** | ❌ No | ✅ Sí (Delete Account) |

---

## 🚀 IMPLEMENTACIÓN SUGERIDA

### **FASE 1: Core Structure** (2h)
- ✅ SettingsHub con secciones
- ✅ SettingsRouter
- ✅ Types definitions
- ✅ Context setup
- ✅ Componentes reutilizables

### **FASE 2: Security & Privacy** (2h)
- ✅ Password & Security page
- ✅ Privacy Settings page
- ✅ Delete Account page
- ✅ Session management

### **FASE 3: Notifications** (1h)
- ✅ Notifications page
- ✅ Toggle components
- ✅ Quiet hours

### **FASE 4: Feature Flags** (2h)
- ✅ Advanced Features page
- ✅ Plan gating logic
- ✅ FeatureFlagCard component
- ✅ Upgrade CTAs

### **FASE 5: Data & About** (1.5h)
- ✅ Saved Searches page
- ✅ Data & Storage page
- ✅ About page
- ✅ Legal links

**TOTAL: ~8.5 horas**

---

## ✅ VENTAJAS DE ESTA ESTRUCTURA

1. ✅ **Consistencia con Profile** - Misma estética modular
2. ✅ **Separación clara** - Profile = identidad, Settings = preferencias
3. ✅ **Plan gating integrado** - Feature flags con upgrade paths
4. ✅ **Auto-save** - No save button, cambios instantáneos
5. ✅ **Escalable** - Fácil agregar nuevas features
6. ✅ **Mobile-first** - Diseño 480px optimizado
7. ✅ **Tipo-safe** - TypeScript completo

---

## 🎯 DECISIONES CLAVE A CONFIRMAR

### **1. Auto-save vs Save Button:**
**Propuesta:** Auto-save para Settings (no save button)  
**Razón:** Settings son preferencias instantáneas, no draft mode

### **2. Feature Flags vs Advanced Features:**
**Propuesta:** Llamarlos "Advanced Features" en UI  
**Razón:** Más user-friendly que "Feature Flags"

### **3. Saved Searches aquí o en Profile:**
**Propuesta:** Settings  
**Razón:** Son preferencias de búsqueda, no identidad

### **4. Language & Region:**
**Propuesta:** MANTENER en Profile  
**Razón:** Ya está ahí, funciona bien, evitar confusión

---

## ❓ PREGUNTAS PARA TI

1. **¿Te gusta esta estructura de Settings?**
2. **¿Hay algo más que quieras agregar?**
3. **¿Prefieres auto-save o save button en Settings?**
4. **¿Feature Flags debe tener más opciones?**
5. **¿Integraciones/API es necesario ahora o futuro?**
6. **¿Quieres implementar ahora o proponer cambios primero?**

---

**Esperando tu feedback antes de implementar.** 🚀
