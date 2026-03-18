# 🎨 AUDITORÍA UX - PROFILE MODULAR LISTLYUP

**Auditor:** UX Senior + Business Logic Specialist  
**Fecha:** Diciembre 2024  
**Scope:** Profile Section (NOT Settings)  
**Status:** 🔴 **REQUIRES REDESIGN**

---

## 📊 ESTADO ACTUAL - ANÁLISIS CRÍTICO

### ✅ **LO QUE ESTÁ BIEN:**

1. ✅ **Arquitectura modular** - Secciones separadas, navegación clara
2. ✅ **Visual hierarchy** - Headers, sections, badges bien implementados
3. ✅ **Address CRUD** - Funcionalidad completa para guardar múltiples direcciones
4. ✅ **Plan badge** - Visible en header (Free/Plus/Pro)
5. ✅ **Mobile-first** - Responsive design implementado

---

## 🔴 **PROBLEMAS CRÍTICOS DETECTADOS:**

### **P1: MEZCLA DE RESPONSABILIDADES - PUBLISHING DEFAULTS**

**Problema:**  
El Profile actual tiene una sección completa "Publishing Defaults" con:
- Default Contact Methods
- Default Delivery Options
- Default Visibility (Public/Groups/Private)
- Default Currency

**Por qué es problema:**  
❌ **Estas son reglas de LISTING, no de PROFILE**  
❌ Confunde al usuario sobre qué está configurando  
❌ Implica que el perfil "publica" cuando en realidad son los listings  

**Impacto:**  
- Usuario confundido: "¿Por qué defino visibilidad aquí si luego la cambio al publicar?"
- Lógica de negocio mezclada
- Difícil explicar qué hace cada toggle

**Solución propuesta:**  
🟢 **MOVER** Publishing Defaults → Settings (app preferences)  
🟢 **ELIMINAR** del Profile  
🟢 Profile solo debe tener: Account, Personal Info, Addresses, Organizations

---

### **P2: FALTA ACCOUNT TYPE (PERSONAL/BUSINESS)**

**Problema:**  
No existe concepto de "tipo de cuenta" en ProfileData.

**Lo que falta:**
```typescript
accountType: 'personal' | 'business'
```

**Impacto:**  
- No hay forma de distinguir usuarios personales de negocios
- No se puede habilitar funcionalidad de Organizations
- Lógica de plan bloqueada para Business features

**Solución propuesta:**  
🟢 Agregar `accountType` a ProfileData  
🟢 Agregar sección "Account Type" en Profile Hub  
🟢 Habilitar Organizations solo si accountType === 'business'

---

### **P3: FALTA ORGANIZATIONS**

**Problema:**  
No existe estructura de Organizations en ProfileData.

**Lo que falta:**
```typescript
organizations: {
  id: string;
  name: string;
  type: 'store' | 'agency' | 'other';
  role: 'owner' | 'admin' | 'member';
  isActive: boolean; // Para publicar como org
}[]
```

**Impacto:**  
- Business users no pueden crear/vincular organizaciones
- No hay lógica de "Publicar como Persona vs Organización"
- Missing feature crítica para B2B

**Solución propuesta:**  
🟢 Agregar structure de Organizations  
🟢 Crear página "Organizations" en Profile  
🟢 Plan gating: Solo Plus/Pro pueden crear orgs

---

### **P4: ADDRESSES SIN CONTEXTO CLARO**

**Problema:**  
La página de Addresses actual NO explica:
- ✅ Que estas son direcciones EXACTAS
- ✅ Que la precisión pública se define AL PUBLICAR
- ✅ Por qué guardar direcciones en Profile

**Lo que falta:**
- Microcopy educativo
- Separación clara entre "guardar ubicación" vs "mostrar ubicación"

**Impacto:**  
- Usuario confundido: "¿Esta dirección es pública?"
- No entiende el flujo Address (exact) → Listing (public/approximate)

**Solución propuesta:**  
🟢 Agregar copy informativo:  
   _"Estas son tus direcciones exactas para logística. La precisión pública se define al publicar cada anuncio."_  
🟢 Visual: Icon de candado + tooltip  
🟢 Link a "Más información" → Help article

---

### **P5: COMPLETION CHECKLIST CONFUSO**

**Problema:**  
El checklist actual (5/5) incluye:
- ✅ Contact methods
- ✅ Delivery options
- ✅ Visibility
- ✅ Currency
- ✅ Address

**Por qué es problema:**  
❌ 4 de 5 items son "Publishing Defaults" (que deben moverse a Settings)  
❌ No refleja completitud del PROFILE real  
❌ Confunde "completar perfil" con "configurar preferencias de publicación"

**Solución propuesta:**  
🟢 Nuevo checklist enfocado en PROFILE:
- ✅ Display name & username
- ✅ Email verified
- ✅ Phone verified (optional)
- ✅ At least 1 address saved
- ✅ Account type selected

---

## 📐 NUEVA ESTRUCTURA PROPUESTA

### **PROFILE HUB - REDESIGN**

```
┌─────────────────────────────────────┐
│  ← My Profile              [Plan]   │ Plus ✨
├─────────────────────────────────────┤
│  [Avatar]  Juan Pérez               │
│            @juanperez               │
│                                     │
│  Account Type: Personal    [Change] │
│                                     │
│  Profile Completion: 3/5            │
│  ☑ Name & username                  │
│  ☑ Email verified                   │
│  ☐ Phone verified                   │
│  ☑ Address added                    │
│  ☐ Account type set                 │
├─────────────────────────────────────┤
│ SECTIONS                            │
├─────────────────────────────────────┤
│ 👤 Account & Verification       >   │
│    Email, phone, username           │
├─────────────────────────────────────┤
│ ✏️  Personal Information         >   │
│    Name, bio, avatar, public profile│
├─────────────────────────────────────┤
│ 🏢 Account Type                  >   │
│    Personal / Business              │
├─────────────────────────────────────┤
│ 🏪 Organizations               [🔒] │ ← Only if Business + Plus/Pro
│    Create or join organizations     │
│    [Upgrade to Plus]                │ ← CTA if Free
├─────────────────────────────────────┤
│ 📍 Saved Addresses               >   │
│    Manage your locations            │
├─────────────────────────────────────┤
│ 🌐 Language & Region             >   │
│    App language, region             │
└─────────────────────────────────────┘
```

**KEY CHANGES:**
1. ❌ REMOVED: "Publishing Defaults" (moved to Settings)
2. ✅ ADDED: "Account Type" section
3. ✅ ADDED: "Organizations" section (gated by plan)
4. ✅ UPDATED: Checklist refleja Profile real
5. ✅ SIMPLIFIED: Solo 5 secciones core

---

## 🏢 NUEVA SECCIÓN: ACCOUNT TYPE

### **AccountTypePage.tsx - WIREFRAME**

```
┌─────────────────────────────────────┐
│  ← Account Type                     │
├─────────────────────────────────────┤
│                                     │
│  Select your account type:          │
│                                     │
│  ○ Personal                         │
│    I'm an individual seller         │
│                                     │
│  ○ Business                         │
│    I represent a business           │
│                                     │
│  ℹ️  You can change this later       │
│                                     │
│ [CURRENT: Personal]                 │
│                                     │
├─────────────────────────────────────┤
│ IF Business selected:               │
├─────────────────────────────────────┤
│  Next Steps:                        │
│  • Create a new organization        │
│  • Join an existing organization    │
│                                     │
│  Go to Organizations section →      │
└─────────────────────────────────────┘
```

**LOGIC:**
- Default: `personal`
- User can switch anytime
- If switches to `business` → Unlock Organizations section
- No data loss if switches back

---

## 🏪 NUEVA SECCIÓN: ORGANIZATIONS

### **OrganizationsPage.tsx - WIREFRAME**

#### **CASO 1: Free Plan + Business Account**

```
┌─────────────────────────────────────┐
│  ← Organizations                    │
├─────────────────────────────────────┤
│                                     │
│  🔒 Organizations (Plus/Pro)        │
│                                     │
│  Create and manage organizations    │
│  to publish as a business.          │
│                                     │
│  [Upgrade to Plus]                  │
│                                     │
│  Benefits:                          │
│  ✓ Create unlimited organizations   │
│  ✓ Invite team members              │
│  ✓ Business analytics               │
│  ✓ Priority support                 │
└─────────────────────────────────────┘
```

#### **CASO 2: Plus/Pro Plan + No Organizations**

```
┌─────────────────────────────────────┐
│  ← Organizations                    │
├─────────────────────────────────────┤
│                                     │
│  No organizations yet               │
│                                     │
│  [+ Create Organization]            │
│  [🔗 Join Existing]                 │
│                                     │
│  ℹ️  Organizations let you:          │
│  • Publish as a business            │
│  • Collaborate with team            │
│  • Manage multiple brands           │
└─────────────────────────────────────┘
```

#### **CASO 3: User with Organizations**

```
┌─────────────────────────────────────┐
│  ← Organizations                    │
├─────────────────────────────────────┤
│                                     │
│  Your Organizations (2)             │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🏪 Mi Tienda                    │ │
│ │    Store • Owner                │ │
│ │    Active for publishing ✓      │ │
│ │                          [Edit] │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🎨 Agencia Creativa             │ │
│ │    Agency • Admin               │ │
│ │    Inactive                     │ │
│ │                          [Edit] │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [+ Create New]  [🔗 Join]          │
│                                     │
│  ℹ️  When publishing, you can choose │
│     to list as yourself or as an   │
│     active organization.           │
└─────────────────────────────────────┘
```

#### **CREATE ORGANIZATION FLOW**

```
┌─────────────────────────────────────┐
│  ← Create Organization              │
├─────────────────────────────────────┤
│                                     │
│  Organization Name *                │
│  ┌───────────────────────────────┐ │
│  │ Mi Tienda                     │ │
│  └───────────────────────────────┘ │
│                                     │
│  Type *                             │
│  ○ Store                            │
│     Retail, e-commerce              │
│  ○ Agency                           │
│     Marketing, services             │
│  ○ Other                            │
│     ┌───────────────────────────┐  │
│     │ Custom type               │  │
│     └───────────────────────────┘  │
│                                     │
│  Description (optional)             │
│  ┌───────────────────────────────┐ │
│  │                               │ │
│  └───────────────────────────────┘ │
│                                     │
│  Logo (optional)                    │
│  [Upload Image]                     │
│                                     │
│  [Cancel]              [Create]     │
└─────────────────────────────────────┘
```

**LOGIC:**
- Only enabled if plan === 'plus' || plan === 'pro'
- User becomes owner of created org
- Can set one org as "active for publishing"
- Multiple orgs allowed

---

## 📍 ADDRESSES PAGE - MEJORAS UX

### **AddressesPage.tsx - UPDATED WITH MICROCOPY**

```
┌─────────────────────────────────────┐
│  ← Saved Addresses                  │
├─────────────────────────────────────┤
│                                     │
│  ℹ️  Your exact locations            │
│                                     │
│  These are your real addresses for  │
│  logistics and pickup. The public   │
│  location precision is defined when │
│  you publish each listing.          │
│                                     │
│  [Learn more about privacy →]       │
│                                     │
├─────────────────────────────────────┤
│                                     │
│  Your Addresses (2)                 │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🏠 Casa                    [★]  │ │
│ │    Av Libertad 123              │ │
│ │    Viña del Mar                 │ │
│ │    Default for publishing       │ │
│ │                   [Edit] [Del]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ 🏢 Oficina                      │ │
│ │    Calle Principal 456          │ │
│ │    Valparaíso                   │ │
│ │                   [Edit] [Del]  │ │
│ └─────────────────────────────────┘ │
│                                     │
│  [+ Add New Address]                │
│                                     │
└─────────────────────────────────────┘
```

**KEY ADDITIONS:**
1. ✅ **Info box** arriba explicando:
   - Estas son direcciones EXACTAS
   - Precisión pública se define al publicar
   - Link a "Learn more"

2. ✅ **Visual cues:**
   - Icon de casa/edificio según tipo
   - Estrella para default
   - Labels claros

3. ✅ **No mencionar:**
   - Offset
   - Aproximación
   - Privacidad (eso es en Listing)

---

## 📋 NUEVO PROFILEDATA TYPE

```typescript
export interface ProfileData {
  // ============================================
  // ACCOUNT & VERIFICATION
  // ============================================
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  loginMethod: 'email' | 'google' | 'apple';
  username: string;
  
  // ============================================
  // ACCOUNT TYPE & PLAN
  // ============================================
  accountType: 'personal' | 'business'; // NEW
  plan: 'free' | 'plus' | 'pro';
  
  // ============================================
  // PERSONAL INFORMATION
  // ============================================
  displayName: string;
  bio: string;
  avatarUrl?: string;
  
  // ============================================
  // PUBLIC PROFILE VISIBILITY
  // ============================================
  publicProfile: {
    showDisplayName: boolean;
    showBio: boolean;
    showGeneralLocation: boolean;
  };
  
  // ============================================
  // ORGANIZATIONS (NEW)
  // ============================================
  organizations: Organization[]; // NEW
  activeOrganizationId?: string; // NEW - Para publicar como org
  
  // ============================================
  // ADDRESSES
  // ============================================
  addresses: Address[];
  
  // ============================================
  // LANGUAGE & REGION
  // ============================================
  appLanguage: 'es' | 'en' | 'pt';
  region: string;
}

// NEW TYPE
export interface Organization {
  id: string;
  name: string;
  type: 'store' | 'agency' | 'other';
  customType?: string; // If type === 'other'
  description?: string;
  logoUrl?: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
}

// UPDATED ADDRESS (sin cambios, pero aclarar comentarios)
export interface Address {
  id: string;
  label: string;
  type: 'house' | 'building' | 'warehouse' | 'other';
  formattedAddress: string;
  coordinates: {
    latitude: number;  // EXACT coordinates
    longitude: number; // EXACT coordinates
  };
  isGatedCommunity: boolean;
  hasDoorman: boolean;
  deliveryInstructions?: string;
  contact: {
    name: string;
    phone: string;
  };
  isDefaultForPublishing: boolean;
  createdAt: string;
}
```

---

## 📊 NUEVO COMPLETION CHECKLIST

```typescript
export interface ProfileCompleteness {
  accountInfo: boolean;    // email, username set
  emailVerified: boolean;  // email verified
  phoneVerified: boolean;  // phone verified (optional)
  personalInfo: boolean;   // displayName set
  addressAdded: boolean;   // at least 1 address
  accountTypeSet: boolean; // accountType selected
}

export function getProfileCompleteness(profile: ProfileData): ProfileCompleteness {
  return {
    accountInfo: !!profile.email && !!profile.username,
    emailVerified: profile.emailVerified,
    phoneVerified: profile.phoneVerified, // Optional
    personalInfo: !!profile.displayName,
    addressAdded: profile.addresses.length > 0,
    accountTypeSet: !!profile.accountType,
  };
}

export function calculateProfileScore(completeness: ProfileCompleteness): number {
  const required = [
    completeness.accountInfo,
    completeness.emailVerified,
    completeness.personalInfo,
    completeness.addressAdded,
    completeness.accountTypeSet,
  ];
  return required.filter(v => v === true).length; // 0-5
}
```

**Display:**
```
Profile Completion: 4/5
☑ Account info
☑ Email verified
☐ Phone verified (optional)
☑ Personal info
☑ Address added
☐ Account type not set
```

---

## 🚫 LO QUE SE ELIMINA DE PROFILE

### **MOVER A SETTINGS (NO AQUÍ):**

1. ❌ **Publishing Defaults** → Settings > Publishing Preferences
   - Default Contact Methods
   - Default Delivery Options
   - Default Visibility
   - Default Currency

2. ❌ **CompletionChecklist antiguo** (5/5 publishing-focused)

### **POR QUÉ:**
- Profile = "Quién soy" (identidad, info, direcciones)
- Settings = "Cómo funciona la app" (preferencias, defaults)
- Listings = "Qué publico" (lógica de cada anuncio)

**Separación clara de responsabilidades.**

---

## 🎯 PLAN DE IMPLEMENTACIÓN

### **FASE 1: RESTRUCTURAR TYPES** (1 hora)

**Archivos:**
- `/components/profile/types.ts`

**Tareas:**
1. ✅ Agregar `accountType` a ProfileData
2. ✅ Agregar `organizations[]` a ProfileData
3. ✅ Agregar `activeOrganizationId` a ProfileData
4. ✅ Crear interface `Organization`
5. ✅ Actualizar `DEFAULT_PROFILE` con nuevos campos
6. ✅ Crear `getProfileCompleteness` nuevo (sin publishing)
7. ✅ Actualizar `ProfileCompleteness` interface

---

### **FASE 2: ACTUALIZAR PROFILE HUB** (1 hora)

**Archivos:**
- `/components/profile/ProfileHub.tsx`

**Tareas:**
1. ✅ Actualizar header para mostrar Account Type
2. ✅ Actualizar checklist a nuevo schema (5/5 profile-focused)
3. ✅ Remover sección "Publishing Defaults"
4. ✅ Agregar sección "Account Type"
5. ✅ Agregar sección "Organizations" con plan gating
6. ✅ Actualizar navegación

---

### **FASE 3: CREAR ACCOUNT TYPE PAGE** (45 min)

**Archivos:**
- `/components/profile/AccountTypePage.tsx` (NUEVO)

**Tareas:**
1. ✅ Create component con RadioGroup
2. ✅ Personal / Business selection
3. ✅ Info copy
4. ✅ Update logic
5. ✅ Navigation to Organizations if Business

---

### **FASE 4: CREAR ORGANIZATIONS PAGES** (2 horas)

**Archivos:**
- `/components/profile/OrganizationsPage.tsx` (NUEVO)
- `/components/profile/OrganizationFormFlow.tsx` (NUEVO)
- `/components/profile/shared/OrganizationCard.tsx` (NUEVO)

**Tareas:**
1. ✅ Plan gating logic (Free → CTA, Plus/Pro → enabled)
2. ✅ List organizations (if any)
3. ✅ Create organization flow
4. ✅ Join organization flow (mock)
5. ✅ Active organization toggle
6. ✅ Delete/Edit organization

---

### **FASE 5: ACTUALIZAR ADDRESSES PAGE** (30 min)

**Archivos:**
- `/components/profile/AddressesPage.tsx`

**Tareas:**
1. ✅ Agregar info box con microcopy
2. ✅ Clarificar que son direcciones EXACTAS
3. ✅ Link a "Learn more"
4. ✅ Visual improvements

---

### **FASE 6: REMOVER PUBLISHING DEFAULTS** (30 min)

**Archivos:**
- `/components/profile/PublishingPage.tsx` (DELETE)
- `/components/profile/PublishingContactPage.tsx` (DELETE)
- `/components/profile/PublishingDeliveryPage.tsx` (DELETE)
- `/components/profile/PublishingVisibilityPage.tsx` (DELETE)
- `/components/profile/PublishingCurrencyPage.tsx` (DELETE)
- `/components/profile/ProfileRouter.tsx` (UPDATE)
- `/hooks/useProfileNavigation.ts` (UPDATE)

**Tareas:**
1. ✅ Delete 5 Publishing pages
2. ✅ Remove from Router
3. ✅ Remove from navigation
4. ✅ Update types to remove publishing defaults

**NOTA:** Estas features se moverán a Settings en el futuro, pero por ahora solo se eliminan de Profile.

---

### **FASE 7: ACTUALIZAR PUBLISHFLOW INTEGRATION** (1 hora)

**Archivos:**
- `/components/publish/hooks/usePublishFlow.ts`

**Tareas:**
1. ✅ Remove dependency on `profile.defaultContact`
2. ✅ Remove dependency on `profile.defaultDelivery`
3. ✅ Remove dependency on `profile.defaultVisibility`
4. ✅ KEEP: Default address (valid)
5. ✅ Add logic: Read `activeOrganizationId` to pre-select publishing as org
6. ✅ Fallback to empty defaults

**IMPORTANTE:** PublishFlow ya NO usará defaults de Profile (porque se mueven a Settings).

---

### **FASE 8: TESTING & VALIDATION** (1 hora)

**Checklist:**
- [ ] Profile HUB muestra Account Type
- [ ] Personal/Business toggle funciona
- [ ] Organizations solo visible si Business + Plus/Pro
- [ ] Plan gating funciona (Free → Upgrade CTA)
- [ ] Create organization funciona
- [ ] Active organization se marca correctamente
- [ ] Addresses tiene microcopy educativo
- [ ] Publishing pages eliminadas
- [ ] Navigation no se rompe
- [ ] Checklist actualizado (5/5 profile-focused)
- [ ] No errores TypeScript
- [ ] PublishFlow funciona sin defaults

---

## 📊 TIEMPO TOTAL ESTIMADO

| Fase | Tiempo | Status |
|------|--------|--------|
| FASE 1: Types | 1h | ⏳ |
| FASE 2: Hub | 1h | ⏳ |
| FASE 3: Account Type | 45min | ⏳ |
| FASE 4: Organizations | 2h | ⏳ |
| FASE 5: Addresses | 30min | ⏳ |
| FASE 6: Remove Publishing | 30min | ⏳ |
| FASE 7: PublishFlow | 1h | ⏳ |
| FASE 8: Testing | 1h | ⏳ |
| **TOTAL** | **7.75 horas** | ⏳ |

---

## ✅ SUCCESS CRITERIA

### **UX Goals:**
- ✅ Profile solo contiene información de IDENTIDAD y LOGÍSTICA
- ✅ No mezcla reglas de publicación (eso va en Settings/Listings)
- ✅ Separación clara: Personal vs Business
- ✅ Plan gating claro y visible
- ✅ Microcopy educativo en Addresses
- ✅ Organizations como feature premium

### **Technical Goals:**
- ✅ Types correctos y escalables
- ✅ No errores TypeScript
- ✅ Navigation limpia (sin Publishing pages)
- ✅ PublishFlow desacoplado de Profile defaults
- ✅ Backward compatible con data existente

### **Business Goals:**
- ✅ Upsell path claro (Free → Plus for Organizations)
- ✅ B2B functionality enabled
- ✅ Clear value proposition for Business accounts
- ✅ User understands what Profile configures

---

## 🎯 RECOMENDACIÓN FINAL

**Prioridad:** 🔴 **HIGH - Requires immediate attention**

**Razón:**  
La arquitectura actual mezcla responsabilidades y confunde al usuario. Publishing Defaults no pertenecen a Profile. Organizations es feature crítica missing para B2B.

**Próximo paso:**  
1. ✅ Aprobar este diseño
2. ✅ Ejecutar FASE 1-2 (types + hub)
3. ✅ Validar con stakeholders
4. ✅ Continuar con resto de fases

---

**Preparado por:** UX Senior Auditor  
**Status:** ✅ **READY FOR APPROVAL & IMPLEMENTATION**
