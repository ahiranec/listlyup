# 📱 PROFILE WIREFRAMES - LISTLYUP

Wireframes detallados del nuevo diseño Profile modular con separación clara de responsabilidades.

---

## 🏠 PROFILE HUB (MAIN)

### **Escenario 1: Usuario Personal, Free Plan, Profile Incompleto**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  My Profile              🆓 Free  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  ╔═══╗  Juan Pérez                 ┃
┃  ║ JP║  @juanperez                 ┃
┃  ╚═══╝                              ┃
┃                                     ┃
┃  Account Type: Personal    [Change] ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ Profile Completion: 3/5       │   ┃
┃ │                               │   ┃
┃ │ ☑ Account info                │   ┃
┃ │ ☑ Email verified              │   ┃
┃ │ ☐ Phone verified (optional)   │   ┃
┃ │ ☑ Personal info               │   ┃
┃ │ ☐ Address not added           │   ┃
┃ │                               │   ┃
┃ │ Complete your profile →       │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ SECTIONS                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 👤 Account & Verification       │ ┃
┃ │    Email, phone, username       │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ✏️  Personal Information         │ ┃
┃ │    Name, bio, avatar, privacy   │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🏢 Account Type                  │ ┃
┃ │    Personal or Business         │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🏪 Organizations            [🔒] │ ┃
┃ │    Business accounts only       │ ┃
┃ │                                 │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 📍 Saved Addresses               │ ┃
┃ │    Manage your locations        │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🌐 Language & Region             │ ┃
┃ │    App language, region         │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### **Escenario 2: Usuario Business, Plus Plan, Con Organizaciones**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  My Profile            ✨ Plus    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  ╔═══╗  María González              ┃
┃  ║ MG║  @mariag                     ┃
┃  ╚═══╝                              ┃
┃                                     ┃
┃  Account Type: Business    [Change] ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ Profile Completion: 5/5 ✓     │   ┃
┃ │                               │   ┃
┃ │ ☑ Account info                │   ┃
┃ │ ☑ Email verified              │   ┃
┃ │ ☑ Phone verified              │   ┃
┃ │ ☑ Personal info               │   ┃
┃ │ ☑ Addresses added             │   ┃
┃ │                               │   ┃
┃ │ 🎉 Profile complete!           │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃ SECTIONS                            ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 👤 Account & Verification       │ ┃
┃ │    Email, phone, username       │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ✏️  Personal Information         │ ┃
┃ │    Name, bio, avatar, privacy   │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🏢 Account Type                  │ ┃
┃ │    Business account             │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🏪 Organizations             (2) │ ┃
┃ │    Mi Tienda, Agencia Creativa  │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 📍 Saved Addresses           (3) │ ┃
┃ │    Casa, Oficina, Warehouse     │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🌐 Language & Region             │ ┃
┃ │    Español, Chile               │ ┃
┃ │                              >  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🏢 ACCOUNT TYPE PAGE

### **State 1: Personal Selected**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Account Type                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Select your account type           ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ● Personal                      │ ┃ ← SELECTED
┃ │                                 │ ┃
┃ │   I'm an individual seller      │ ┃
┃ │                                 │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ○ Business                      │ ┃
┃ │                                 │ ┃
┃ │   I represent a business        │ ┃
┃ │                                 │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃  ℹ️  You can change this anytime     ┃
┃                                     ┃
┃                                     ┃
┃                       [Save]        ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### **State 2: Business Selected**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Account Type                     ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Select your account type           ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ○ Personal                      │ ┃
┃ │                                 │ ┃
┃ │   I'm an individual seller      │ ┃
┃ │                                 │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ ● Business                      │ ┃ ← SELECTED
┃ │                                 │ ┃
┃ │   I represent a business        │ ┃
┃ │                                 │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃  ℹ️  You can change this anytime     ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ✨ Next Steps                  │   ┃
┃ │                               │   ┃
┃ │ With a Business account you   │   ┃
┃ │ can:                          │   ┃
┃ │                               │   ┃
┃ │ • Create organizations        │   ┃
┃ │ • Publish as your business    │   ┃
┃ │ • Collaborate with team       │   ┃
┃ │                               │   ┃
┃ │ [Go to Organizations →]       │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃                       [Save]        ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🏪 ORGANIZATIONS PAGE

### **Scenario A: Business + Free Plan**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Organizations                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃       🔒                            ┃
┃                                     ┃
┃  Organizations                      ┃
┃  (Plus & Pro only)                  ┃
┃                                     ┃
┃  Create and manage organizations    ┃
┃  to publish as a business and       ┃
┃  collaborate with your team.        ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │                               │   ┃
┃ │ ✨ Unlock Organizations        │   ┃
┃ │                               │   ┃
┃ │ [Upgrade to Plus] [Learn More]│   ┃
┃ │                               │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ What you get:                 │   ┃
┃ │                               │   ┃
┃ │ ✓ Create organizations        │   ┃
┃ │ ✓ Invite team members         │   ┃
┃ │ ✓ Business analytics          │   ┃
┃ │ ✓ Priority support            │   ┃
┃ │ ✓ Custom branding             │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### **Scenario B: Business + Plus Plan + No Organizations**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Organizations                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Your Organizations                 ┃
┃                                     ┃
┃  No organizations yet               ┃
┃                                     ┃
┃       [Empty state illustration]    ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ [+ Create Organization]       │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ [🔗 Join Existing]             │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ℹ️  Organizations let you:      │   ┃
┃ │                               │   ┃
┃ │ • Publish as a business       │   ┃
┃ │ • Collaborate with team       │   ┃
┃ │ • Manage multiple brands      │   ┃
┃ │ • Track team performance      │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### **Scenario C: Business + Plus Plan + With Organizations**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Organizations                    ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Your Organizations (2)             ┃
┃                                     ┃
┃ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ┃
┃ ┃ 🏪 Mi Tienda                  ┃   ┃
┃ ┃                               ┃   ┃
┃ ┃ Store • Owner                 ┃   ┃
┃ ┃                               ┃   ┃
┃ ┃ ✓ Active for publishing       ┃   ┃ ← Green badge
┃ ┃                               ┃   ┃
┃ ┃              [Edit] [Settings]┃   ┃
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🎨 Agencia Creativa             │ ┃
┃ │                                 │ ┃
┃ │ Agency • Admin                  │ ┃
┃ │                                 │ ┃
┃ │ Inactive                        │ ┃ ← Grey badge
┃ │                                 │ ┃
┃ │              [Edit] [Settings]  │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ [+ Create New] [🔗 Join]       │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ℹ️  When publishing             │   ┃
┃ │                               │   ┃
┃ │ You can choose to list as:    │   ┃
┃ │ • Yourself (María González)   │   ┃
┃ │ • Mi Tienda (active org)      │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🏢 CREATE ORGANIZATION FLOW

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Create Organization              ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃  Organization Details               ┃
┃                                     ┃
┃  Organization Name *                ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Mi Tienda                     │  ┃
┃  └───────────────────────────────┘  ┃
┃  0/50                               ┃
┃                                     ┃
┃  Type *                             ┃
┃  ┌─────────────────────────────────┐┃
┃  │ ● Store                         │┃ ← Selected
┃  │   Retail, e-commerce            │┃
┃  └─────────────────────────────────┘┃
┃  ┌─────────────────────────────────┐┃
┃  │ ○ Agency                        │┃
┃  │   Marketing, creative services  │┃
┃  └─────────────────────────────────┘┃
┃  ┌─────────────────────────────────┐┃
┃  │ ○ Other                         │┃
┃  │   ┌───────────────────────────┐ │┃
┃  │   │ Custom type...            │ │┃
┃  │   └───────────────────────────┘ │┃
┃  └─────────────────────────────────┘┃
┃                                     ┃
┃  Description (optional)             ┃
┃  ┌───────────────────────────────┐  ┃
┃  │ Tienda de productos           │  ┃
┃  │ artesanales                   │  ┃
┃  │                               │  ┃
┃  └───────────────────────────────┘  ┃
┃  25/200                             ┃
┃                                     ┃
┃  Logo (optional)                    ┃
┃  ┌───────────────────────────────┐  ┃
┃  │                               │  ┃
┃  │   [📷 Upload Image]            │  ┃
┃  │                               │  ┃
┃  └───────────────────────────────┘  ┃
┃  Recommended: 512x512px             ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ☑ Set as active for publishing│   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃  [Cancel]              [Create]     ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📍 SAVED ADDRESSES (UPDATED)

### **With Educational Microcopy**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ ←  Saved Addresses                  ┃
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ℹ️  Your exact locations        │   ┃
┃ │                               │   ┃
┃ │ These are your real addresses │   ┃
┃ │ for logistics and pickup. The │   ┃
┃ │ public location precision is  │   ┃
┃ │ defined when you publish each │   ┃
┃ │ listing.                      │   ┃
┃ │                               │   ┃
┃ │ [Learn more about privacy →]  │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃  Your Addresses (2)                 ┃
┃                                     ┃
┃ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓   ┃
┃ ┃ 🏠 Casa                   ⭐  ┃   ┃ ← Default
┃ ┃                               ┃   ┃
┃ ┃ Av Libertad 123, Apt 4B       ┃   ┃
┃ ┃ Viña del Mar, Valparaíso      ┃   ┃
┃ ┃                               ┃   ┃
┃ ┃ ✓ Default for publishing      ┃   ┃
┃ ┃                               ┃   ┃
┃ ┃              [Edit] [Delete]  ┃   ┃
┃ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛   ┃
┃                                     ┃
┃ ┌─────────────────────────────────┐ ┃
┃ │ 🏢 Oficina                      │ ┃
┃ │                                 │ ┃
┃ │ Calle Principal 456, Piso 2     │ ┃
┃ │ Valparaíso, Valparaíso          │ ┃
┃ │                                 │ ┃
┃ │                                 │ ┃
┃ │              [Edit] [Delete]    │ ┃
┃ └─────────────────────────────────┘ ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ [+ Add New Address]           │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 📝 ORGANIZATION CARD DETAIL

### **Active Organization**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🏪 Mi Tienda                        ┃
┃                                     ┃
┃ Store • Owner                       ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ ✓ Active for publishing       │   ┃ ← Green bg
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ Created: Jan 15, 2024               ┃
┃ Members: 3                          ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ When you publish a listing,   │   ┃
┃ │ it will show as "Mi Tienda"   │   ┃
┃ │ instead of your personal name.│   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ [Edit Details] [View Members]       ┃
┃ [Deactivate]   [Settings]           ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

### **Inactive Organization**

```
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃ 🎨 Agencia Creativa                 ┃
┃                                     ┃
┃ Agency • Admin                      ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ Inactive                      │   ┃ ← Grey bg
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ Created: Feb 20, 2024               ┃
┃ Members: 5                          ┃
┃                                     ┃
┃ ┌───────────────────────────────┐   ┃
┃ │ [Set as Active]               │   ┃ ← CTA
┃ │                               │   ┃
┃ │ This will deactivate          │   ┃
┃ │ "Mi Tienda" for publishing.   │   ┃
┃ └───────────────────────────────┘   ┃
┃                                     ┃
┃ [Edit Details] [View Members]       ┃
┃ [Leave]        [Settings]           ┃
┃                                     ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
```

---

## 🎯 KEY UX PATTERNS

### **1. Plan Gating Pattern**

```
┌─────────────────────────────────┐
│ 🔒 [Feature Name]               │
│    (Plus & Pro only)            │
│                                 │
│ [Unlock with description]       │
│                                 │
│ [Upgrade CTA] [Learn More]      │
│                                 │
│ Benefits list:                  │
│ ✓ Feature 1                     │
│ ✓ Feature 2                     │
│ ✓ Feature 3                     │
└─────────────────────────────────┘
```

---

### **2. Info Box Pattern**

```
┌───────────────────────────────┐
│ ℹ️  [Heading]                  │
│                               │
│ Educational copy explaining   │
│ why this exists and what it   │
│ controls.                     │
│                               │
│ [Learn more link →]           │
└───────────────────────────────┘
```

---

### **3. Active/Inactive Toggle Pattern**

```
┌─────────────────────────────────┐
│ Item Name                       │
│                                 │
│ ✓ Active for [action]           │ ← Green
│                                 │
│ [Deactivate]                    │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ Item Name                       │
│                                 │
│ Inactive                        │ ← Grey
│                                 │
│ [Activate]                      │
└─────────────────────────────────┘
```

---

## 📱 MOBILE CONSIDERATIONS

- All touch targets minimum 44x44px
- Thumbs-friendly bottom actions
- Clear visual hierarchy
- No nested scrolls
- Maximum 2 navigation levels
- Swipe gestures for cards (optional)

---

**Prepared by:** UX Design Team  
**Version:** 1.0  
**Status:** ✅ Ready for development
