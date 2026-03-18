# 📋 PLAN DE IMPLEMENTACIÓN: PROFILE MODULAR

**Fecha:** 15 Diciembre 2025  
**Tipo:** Plan técnico de implementación  
**Status:** APROBACIÓN PENDIENTE - NO EJECUTAR TODAVÍA

---

## ✅ VALIDACIÓN DE ARQUITECTURA PROPUESTA

### Comparación con feedback previo:

| Criterio Feedback | Propuesta | ✅/❌ |
|-------------------|-----------|-------|
| Eliminar overlap Location/Addresses | ✅ Solo "Saved Addresses" existe | ✅ |
| Flatear Publication Information | ✅ Publishing con sub-secciones directas | ✅ |
| Máximo 2 niveles navegación | ✅ Profile → Sección (Publishing tiene índice interno) | ✅ |
| Clarificar Organization scope | ✅ Eliminado de Profile | ✅ |
| Checklist completitud visible | ✅ En Profile HUB y Publishing | ✅ |
| Reutilizar componentes | ✅ Especificado explícitamente | ✅ |
| Verification flows claros | ✅ Email/Phone con CTA verify | ✅ |

**Arquitectura APROBADA** ✅

---

## 🏗️ ARQUITECTURA TÉCNICA

### Estructura de archivos propuesta:

```
/components/
├─ profile/
│  ├─ ProfileHub.tsx                    // HUB principal (nuevo)
│  ├─ AccountVerificationPage.tsx      // Sección Account (nuevo)
│  ├─ PersonalInfoPage.tsx             // Sección Personal (nuevo)
│  ├─ PublishingPage.tsx               // Publishing índice (nuevo)
│  ├─ PublishingContactPage.tsx        // Contact defaults (nuevo)
│  ├─ PublishingDeliveryPage.tsx       // Delivery defaults (nuevo)
│  ├─ PublishingVisibilityPage.tsx     // Visibility defaults (nuevo)
│  ├─ PublishingCurrencyPage.tsx       // Currency defaults (nuevo)
│  ├─ AddressesPage.tsx                // Lista addresses (nuevo)
│  ├─ AddressFormFlow.tsx              // CRUD address (nuevo)
│  ├─ LanguageRegionPage.tsx           // Language & region (nuevo)
│  ├─ shared/
│  │  ├─ ProfileSection.tsx            // Card clickeable reutilizable
│  │  ├─ CompletionChecklist.tsx       // Checklist component
│  │  ├─ VerificationBadge.tsx         // Badge verified/not verified
│  │  └─ PublicProfilePreview.tsx      // Preview perfil público
│  ├─ types.ts                         // Types Profile
│  └─ index.ts                         // Barrel export
│
├─ ProfilePage.tsx                      // DEPRECAR (mantener backup)
└─ ...
```

### Types/Interfaces necesarios:

```typescript
// /components/profile/types.ts

export interface Address {
  id: string;
  label: string; // "Casa", "Oficina", etc.
  type: 'house' | 'building' | 'warehouse' | 'other';
  formattedAddress: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isGatedCommunity: boolean;
  hasDoorman: boolean;
  deliveryInstructions?: string;
  contact: {
    name: string;
    phone: string;
  };
  isDefaultForPublishing: boolean;
}

export interface ProfileData {
  // Account
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  loginMethod: 'email' | 'google' | 'apple';
  username: string;
  
  // Personal
  displayName: string;
  bio: string;
  avatarUrl?: string;
  
  // Public profile visibility
  publicProfile: {
    showDisplayName: boolean;
    showBio: boolean;
    showGeneralLocation: boolean;
  };
  
  // Publishing defaults
  defaultContact: {
    inAppChat: boolean;
    whatsapp: boolean;
    phoneCall: boolean;
    email: boolean;
  };
  
  defaultDelivery: {
    pickup: boolean;
    localDelivery: boolean;
    shipping: boolean;
    virtual: boolean;
  };
  
  defaultVisibility: 'public' | 'groups' | 'private';
  defaultCurrency: string; // 'CLP', 'USD', etc.
  
  // Addresses
  addresses: Address[];
  
  // Language & Region
  appLanguage: 'es' | 'en' | 'pt';
  region: string;
  
  // Plan
  plan: 'Free' | 'Plus' | 'Pro';
}

export interface PublishingCompleteness {
  contact: boolean;
  delivery: boolean;
  visibility: boolean;
  currency: boolean;
  address: boolean;
}

export function getPublishingCompleteness(profile: ProfileData): PublishingCompleteness {
  return {
    contact: Object.values(profile.defaultContact).some(v => v === true),
    delivery: Object.values(profile.defaultDelivery).some(v => v === true),
    visibility: !!profile.defaultVisibility,
    currency: !!profile.defaultCurrency,
    address: profile.addresses.some(a => a.isDefaultForPublishing),
  };
}

export function calculateCompletenessScore(completeness: PublishingCompleteness): number {
  const values = Object.values(completeness);
  const completed = values.filter(v => v === true).length;
  return completed; // 0-5
}
```

---

## 🔧 COMPONENTES EXISTENTES A REUTILIZAR

### 1. **De ProfilePage.tsx actual:**

✅ **Reutilizables directamente:**
```typescript
// Avatar editable (línea 268-277)
<div className="relative group shrink-0">
  <Avatar className="w-12 h-12 border-2 border-border">
    <AvatarImage src={avatarUrl} />
    <AvatarFallback>{initials}</AvatarFallback>
  </Avatar>
  <button className="absolute inset-0...">
    <Camera className="w-3.5 h-3.5" />
  </button>
</div>

// Usar en: ProfileHub.tsx
```

✅ **Validation logic:**
```typescript
// validateUsername (línea 135-139)
// validateForm (línea 141-160)

// Extraer a: /components/profile/utils/validation.ts
```

✅ **Header pattern:**
```typescript
// Header con Back + Title + Save (línea 238-260)

// Reutilizar en: Todas las páginas de Profile
```

🟡 **Adaptar:**
```typescript
// Collapsibles (línea 86-89)
// NO usar collapsibles, sino navegación a páginas

// defaultContactMethods structure (línea 59-63)
// SIMPLIFICAR: solo booleans, no "preferred" ni "hours"
```

---

### 2. **De LocationStep.tsx:**

✅ **Reutilizar para AddressFormFlow:**
```typescript
// Search + GPS + Mapa (línea 87-200)
const handleSearch = async (query: string) => {...}
const handleGetGPS = async () => {...}
const handleSelectResult = (result: GeocodingResult) => {...}

// Usar en: AddressFormFlow.tsx (PASO 1 y 2)
```

✅ **RadioGroup pattern:**
```typescript
// Location source selection (línea 165-200)
<RadioGroup value={source} onValueChange={setSource}>
  <div className="space-y-2">
    <div className="p-4 border rounded-xl">
      <RadioGroupItem value="profile" />
      <Label>Use Profile Location</Label>
    </div>
  </div>
</RadioGroup>

// Usar en: PublishingVisibilityPage.tsx
```

---

### 3. **De MenuSheet.tsx:**

✅ **Sections pattern:**
```typescript
// Secciones clickeables (línea 173-200)
<motion.button
  onClick={() => handleItemClick(onProfileClick)}
  className="w-full h-12 bg-white border rounded-xl flex items-center gap-2"
>
  <User className="w-5 h-5" />
  <span>My Profile</span>
  <ChevronRight className="w-4 h-4 ml-auto" />
</motion.button>

// Usar en: ProfileHub.tsx (lista de secciones)
```

---

### 4. **De UI components:**

✅ **Usar directamente:**
- Input
- Label
- Textarea
- Switch
- Select
- Badge
- Avatar
- RadioGroup
- Button
- Alert

✅ **Todos existen y funcionan** ✅

---

## 🆕 COMPONENTES NUEVOS NECESARIOS

### 1. **ProfileSection.tsx** (compartido)

```typescript
// Componente reutilizable para secciones clickeables

interface ProfileSectionProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  status?: 'complete' | 'incomplete' | 'warning';
  badge?: string;
  onClick: () => void;
}

// Similar a MenuSheet pero adaptado para Profile
```

**Esfuerzo:** 🟢 Bajo (adaptar de MenuSheet)

---

### 2. **CompletionChecklist.tsx** (compartido)

```typescript
// Muestra checklist de completitud

interface CompletionChecklistProps {
  completeness: PublishingCompleteness;
  variant: 'summary' | 'detailed';
}

// Summary: "3/5 complete"
// Detailed: Lista con checks
```

**Esfuerzo:** 🟢 Bajo (nuevo simple)

---

### 3. **VerificationBadge.tsx** (compartido)

```typescript
// Badge de verificación

interface VerificationBadgeProps {
  verified: boolean;
  type: 'email' | 'phone' | 'identity';
}

// ✅ Verified
// ⚠️ Not verified
```

**Esfuerzo:** 🟢 Bajo (nuevo simple)

---

### 4. **PublicProfilePreview.tsx** (compartido)

```typescript
// Preview de cómo se ve perfil público

interface PublicProfilePreviewProps {
  profile: ProfileData;
}

// Card con avatar, name, bio
// Según toggles de visibility
```

**Esfuerzo:** 🟡 Medio (nuevo con lógica)

---

### 5. **AddressCard.tsx** (compartido)

```typescript
// Card para mostrar address en lista

interface AddressCardProps {
  address: Address;
  isDefault: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onSetDefault: () => void;
}
```

**Esfuerzo:** 🟢 Bajo (nuevo simple)

---

### 6. **VerificationDialog.tsx** (compartido)

```typescript
// Dialog para verificar email/phone

interface VerificationDialogProps {
  type: 'email' | 'phone';
  contact: string;
  onVerify: (code: string) => Promise<boolean>;
}

// Input code → Verify → Success/Error
```

**Esfuerzo:** 🟡 Medio (nuevo con state)

---

## 📅 PLAN DE IMPLEMENTACIÓN POR FASES

---

### **FASE 0: PREPARACIÓN** (1 componente compartido)

**Objetivo:** Crear componentes base reutilizables

**Tareas:**
1. Crear `/components/profile/` directory
2. Crear `types.ts` con interfaces completas
3. Crear `ProfileSection.tsx` (componente base)

**Componentes:**
- ✅ ProfileSection.tsx

**Esfuerzo:** 🟢 **Bajo** (1-2 horas)

**Riesgos:** Ninguno

**Entregable:**
- Component reutilizable testeado
- Types completos documentados

---

### **FASE 1: PROFILE HUB** (1 página principal)

**Objetivo:** Crear página central Profile con navegación a secciones

**Tareas:**
1. Crear `ProfileHub.tsx`
2. Header con Back button
3. Avatar + Name + Username + Badge
4. Completeness status (⚠️ o ✅)
5. Lista de secciones usando ProfileSection
6. Navegación a páginas (placeholders)

**Componentes:**
- ✅ ProfileHub.tsx
- ✅ CompletionChecklist.tsx

**Reutiliza:**
- Avatar editable (ProfilePage actual)
- ProfileSection (Fase 0)
- Badge, Button (UI)

**Esfuerzo:** 🟡 **Medio** (3-4 horas)

**Riesgos:**
- ⚠️ Navegación debe integrarse con App.tsx
- ⚠️ State management (¿dónde vive ProfileData?)

**Decisión necesaria:**
```
¿Cómo navegamos entre secciones?

Opción A: State-based (como actual)
  currentView: 'hub' | 'account' | 'personal' | ...
  
Opción B: Router (futuro)
  /profile
  /profile/account
  /profile/personal
  
RECOMENDACIÓN: Opción A (consistente con app)
```

**Entregable:**
- Profile HUB funcional
- Navegación a secciones (aunque vacías)
- Checklist visible

---

### **FASE 2: ACCOUNT & VERIFICATION** (1 página)

**Objetivo:** Página Account con verificación email/phone

**Tareas:**
1. Crear `AccountVerificationPage.tsx`
2. Email field + VerificationBadge
3. Phone field + VerificationBadge
4. Login method (readonly)
5. Username editable
6. Crear `VerificationDialog.tsx`
7. Flow de verificación (mock)

**Componentes:**
- ✅ AccountVerificationPage.tsx
- ✅ VerificationBadge.tsx
- ✅ VerificationDialog.tsx

**Reutiliza:**
- Input, Label (UI)
- Validation logic (ProfilePage)

**Esfuerzo:** 🟡 **Medio** (4-5 horas)

**Riesgos:**
- ⚠️ Verificación es mock (no backend real)
- ⚠️ Username único check (simular delay)

**Decisión necesaria:**
```
¿Flow de verificación?

Email:
1. User taps "Verify email"
2. Dialog: "Code sent to user@example.com"
3. Input 6-digit code
4. Verify button
5. Success → emailVerified = true

Phone:
1. User taps "Verify phone"
2. Dialog: "SMS sent to +56 9 1234 5678"
   "Or verify via WhatsApp"
3. Input code
4. Verify
5. Success → phoneVerified = true

MOCK: setTimeout 2s → success
```

**Entregable:**
- Account page funcional
- Verification badges
- Dialog de verificación (mock)

---

### **FASE 3: PERSONAL INFORMATION** (1 página)

**Objetivo:** Página Personal con preview público

**Tareas:**
1. Crear `PersonalInfoPage.tsx`
2. Display name field
3. Bio textarea (150 chars max)
4. Avatar upload (reutilizar)
5. Sección "Public Profile Visibility"
6. Toggles (name, bio, location)
7. Crear `PublicProfilePreview.tsx`
8. Preview actualiza en tiempo real

**Componentes:**
- ✅ PersonalInfoPage.tsx
- ✅ PublicProfilePreview.tsx

**Reutiliza:**
- Avatar editable (ProfilePage)
- Input, Textarea, Switch (UI)
- Validation (max length)

**Esfuerzo:** 🟡 **Medio** (3-4 horas)

**Riesgos:**
- ⚠️ Avatar upload es simulado (no storage real)
- ⚠️ Preview debe reflejar toggles dinámicamente

**Entregable:**
- Personal page funcional
- Preview público reactivo
- Toggles de visibilidad

---

### **FASE 4: PUBLISHING INDEX** (1 página índice)

**Objetivo:** Página Publishing con checklist y sub-secciones

**Tareas:**
1. Crear `PublishingPage.tsx`
2. Header "Publishing Defaults"
3. Checklist detallado:
   - ✅/⚠️ Default Contact
   - ✅/⚠️ Default Delivery
   - ✅/⚠️ Default Visibility
   - ✅/⚠️ Default Currency
   - ✅/⚠️ Default Address
4. Lista de sub-secciones clickeables
5. Navegación a páginas específicas

**Componentes:**
- ✅ PublishingPage.tsx

**Reutiliza:**
- ProfileSection (Fase 0)
- CompletionChecklist (Fase 1)

**Esfuerzo:** 🟢 **Bajo** (2-3 horas)

**Riesgos:** Ninguno (solo navegación)

**Entregable:**
- Publishing index funcional
- Checklist detallado
- Navegación a sub-páginas

---

### **FASE 5A: PUBLISHING - DEFAULT CONTACT** (1 página)

**Objetivo:** Configurar contact methods por defecto

**Tareas:**
1. Crear `PublishingContactPage.tsx`
2. Toggle: In-app chat (always true?)
3. Toggle: WhatsApp (disabled si phone no verificado)
4. Toggle: Phone call (disabled si phone no verificado)
5. Toggle: Email
6. Validaciones y warnings visibles
7. Save y actualizar checklist

**Componentes:**
- ✅ PublishingContactPage.tsx

**Reutiliza:**
- Switch, Alert (UI)
- VerificationBadge (Fase 2)

**Esfuerzo:** 🟢 **Bajo** (2 horas)

**Riesgos:**
- ⚠️ Dependencia de phone verification (Fase 2)

**Entregable:**
- Contact defaults funcional
- Validación de requirements

---

### **FASE 5B: PUBLISHING - DEFAULT DELIVERY** (1 página)

**Objetivo:** Configurar delivery methods por defecto

**Tareas:**
1. Crear `PublishingDeliveryPage.tsx`
2. Toggle: Pickup
3. Toggle: Local delivery
4. Toggle: Shipping
5. Toggle: Virtual (services)
6. Info text por opción
7. Save y actualizar checklist

**Componentes:**
- ✅ PublishingDeliveryPage.tsx

**Reutiliza:**
- Switch (UI)

**Esfuerzo:** 🟢 **Bajo** (1-2 horas)

**Riesgos:** Ninguno

**Entregable:**
- Delivery defaults funcional

---

### **FASE 5C: PUBLISHING - DEFAULT VISIBILITY** (1 página)

**Objetivo:** Configurar visibility por defecto

**Tareas:**
1. Crear `PublishingVisibilityPage.tsx`
2. RadioGroup:
   - Public
   - Groups
   - Private
3. Info text por opción
4. Save y actualizar checklist

**Componentes:**
- ✅ PublishingVisibilityPage.tsx

**Reutiliza:**
- RadioGroup (UI)
- Pattern de LocationStep

**Esfuerzo:** 🟢 **Bajo** (1-2 horas)

**Riesgos:** Ninguno

**Entregable:**
- Visibility defaults funcional

---

### **FASE 5D: PUBLISHING - DEFAULT CURRENCY** (1 página)

**Objetivo:** Configurar currency por defecto

**Tareas:**
1. Crear `PublishingCurrencyPage.tsx`
2. Select dropdown con currencies:
   - CLP, USD, EUR, BRL, ARS, MXN, etc.
3. Grouped por región (LatAm, NA, EU, Asia)
4. Info text: "Used by default for new listings"
5. Save y actualizar checklist

**Componentes:**
- ✅ PublishingCurrencyPage.tsx

**Reutiliza:**
- Select (UI)
- Currencies list (BasicInfoStep)

**Esfuerzo:** 🟢 **Bajo** (1-2 horas)

**Riesgos:** Ninguno

**Entregable:**
- Currency defaults funcional

---

### **FASE 6: SAVED ADDRESSES - LIST** (1 página)

**Objetivo:** Lista de addresses con CRUD

**Tareas:**
1. Crear `AddressesPage.tsx`
2. Lista de addresses
3. Crear `AddressCard.tsx`
4. Card muestra:
   - Label + Icon
   - Formatted address
   - ⭐ Default badge
   - Edit / Delete buttons
5. Empty state: "No addresses yet"
6. CTA: Add new address
7. Navegación a AddressFormFlow

**Componentes:**
- ✅ AddressesPage.tsx
- ✅ AddressCard.tsx

**Reutiliza:**
- Badge, Button (UI)
- Card patterns

**Esfuerzo:** 🟡 **Medio** (3-4 horas)

**Riesgos:**
- ⚠️ Delete confirmation dialog
- ⚠️ Set default → update otros addresses

**Decisión necesaria:**
```
¿Confirmación para delete?

<AlertDialog>
  <AlertDialogTitle>Delete address?</AlertDialogTitle>
  <AlertDialogDescription>
    This action cannot be undone.
  </AlertDialogDescription>
  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
  <AlertDialogCancel>Cancel</AlertDialogCancel>
</AlertDialog>

Usar AlertDialog component
```

**Entregable:**
- Addresses list funcional
- CRUD actions (Edit/Delete)
- Default marking

---

### **FASE 7: SAVED ADDRESSES - ADD/EDIT FLOW** (1 flow completo)

**Objetivo:** Flow completo para agregar/editar address

**Tareas:**
1. Crear `AddressFormFlow.tsx` (wizard de 3 pasos)
2. **PASO 1: Search Address**
   - Reutilizar LocationStep search logic
   - Input + Autocomplete
   - Resultados clickeables
3. **PASO 2: Map Confirmation**
   - Reutilizar LocationStep map
   - Pin arrastrable
   - Confirm location button
4. **PASO 3: Address Details**
   - Label input
   - Type select (House/Building/Warehouse/Other)
   - Toggles: Gated community, Doorman
   - Delivery instructions textarea
   - Contact name + phone
   - Toggle: Set as default
5. Save → volver a lista

**Componentes:**
- ✅ AddressFormFlow.tsx

**Reutiliza:**
- LocationStep (search + GPS + mapa) ⭐ CLAVE
- Input, Select, Switch, Textarea (UI)
- FlowHeader pattern (PublishFlow)

**Esfuerzo:** 🔴 **Alto** (6-8 horas)

**Riesgos:**
- 🔴 Integración compleja con LocationStep
- ⚠️ 3 steps con state compartido
- ⚠️ Mapa puede no funcionar (mock)

**Decisión crítica:**
```
¿Reutilizar LocationStep completo o crear componente nuevo?

Opción A: Reutilizar LocationStep.tsx
  - Extraer componentes internos (SearchInput, MapPicker)
  - Reutilizar en AddressFormFlow
  - VENTAJA: No duplicar código
  - RIESGO: LocationStep acoplado a PublishFlow

Opción B: Crear AddressMapPicker.tsx nuevo
  - Copiar lógica de LocationStep
  - Adaptar para Address
  - VENTAJA: Independiente
  - RIESGO: Duplicación de código

RECOMENDACIÓN: Opción A
  - Crear /components/shared/map/
    - LocationSearch.tsx
    - MapPicker.tsx
    - LocationTypeSelector.tsx
  - Reutilizar en LocationStep Y AddressFormFlow
```

**Entregable:**
- Flow completo Add/Edit address
- 3 pasos funcionando
- Save persistente (state)

---

### **FASE 8: LANGUAGE & REGION** (1 página)

**Objetivo:** Configurar idioma y región

**Tareas:**
1. Crear `LanguageRegionPage.tsx`
2. Select: App Language
   - Español
   - English
   - Português
3. Select: Region
   - Chile, Argentina, Brasil, México, USA
4. Info: "Changes apply immediately"
5. Save

**Componentes:**
- ✅ LanguageRegionPage.tsx

**Reutiliza:**
- Select (UI)
- Pattern de SettingsSheet

**Esfuerzo:** 🟢 **Bajo** (1-2 horas)

**Riesgos:** Ninguno

**Entregable:**
- Language & Region funcional

---

### **FASE 9: INTEGRACIÓN CON APP.tsx** (refactor)

**Objetivo:** Integrar Profile modular con navegación existente

**Tareas:**
1. Añadir views a App.tsx:
   ```typescript
   type ProfileView = 
     | 'hub'
     | 'account'
     | 'personal'
     | 'publishing'
     | 'publishing-contact'
     | 'publishing-delivery'
     | 'publishing-visibility'
     | 'publishing-currency'
     | 'addresses'
     | 'address-form'
     | 'language';
   ```
2. State: `currentProfileView`
3. Navigation helpers
4. Lazy load Profile pages
5. Breadcrumb navigation (Back button)
6. Persistencia de ProfileData (localStorage)

**Componentes:**
- ⚙️ Modificar App.tsx
- ⚙️ Crear useProfileNavigation hook

**Reutiliza:**
- useAppNavigation pattern existente

**Esfuerzo:** 🟡 **Medio** (4-5 horas)

**Riesgos:**
- ⚠️ Navegación puede romper flujo actual
- ⚠️ State management complejo

**Decisión crítica:**
```
¿Dónde vive ProfileData?

Opción A: Local state en ProfileHub
  - Simple
  - Se pierde al salir
  - PROBLEMA: Cada página debe recibir props

Opción B: Context API
  - <ProfileProvider> en App.tsx
  - Todas las páginas acceden via useProfile()
  - Persiste en localStorage
  - VENTAJA: Clean, escalable

Opción C: Zustand/Redux (overkill)

RECOMENDACIÓN: Opción B (Context + localStorage)
```

**Entregable:**
- Navegación completa funcional
- ProfileData persistente
- Back navigation correcta

---

### **FASE 10: INTEGRACIÓN CON PUBLISH FLOW** (refactor)

**Objetivo:** PublishFlow usa defaults de Profile

**Tareas:**
1. Modificar PublishFlow para leer ProfileData
2. LocationStep → usar default address
3. PricingStep → usar default currency
4. PricingStep → usar default contact methods
5. PricingStep → usar default delivery methods
6. PricingStep → usar default visibility
7. Mostrar "Using profile defaults" badges
8. Permitir override

**Componentes:**
- ⚙️ Modificar PublishFlow.tsx
- ⚙️ Modificar LocationStep.tsx
- ⚙️ Modificar PricingStep.tsx

**Reutiliza:**
- ProfileData via Context

**Esfuerzo:** 🔴 **Alto** (6-8 horas)

**Riesgos:**
- 🔴 PublishFlow ya complejo, añadir defaults puede romper
- ⚠️ Backward compatibility (usuarios sin defaults)

**Decisión crítica:**
```
¿Qué pasa si usuario no tiene defaults?

Fallback:
- No address → GPS como ahora
- No currency → CLP default
- No contact → In-app chat only
- No delivery → Pickup only
- No visibility → Public

NUNCA bloquear PublishFlow
Defaults son OPCIONALES
```

**Entregable:**
- PublishFlow usa defaults
- Fallbacks funcionando
- Override posible

---

### **FASE 11: POLISH & TESTING** (QA)

**Objetivo:** Pulir detalles, testing, corrección bugs

**Tareas:**
1. Testing de todos los flujos
2. Verificar navegación completa
3. Verificar persistencia
4. Probar con datos vacíos
5. Probar con datos completos
6. Animations suaves
7. Loading states
8. Error handling
9. Accessibility (a11y)
10. Mobile responsive (ya debería estar)

**Esfuerzo:** 🟡 **Medio** (4-5 horas)

**Riesgos:**
- ⚠️ Bugs en edge cases

**Entregable:**
- Profile 100% funcional
- Sin bugs críticos
- UX pulida

---

### **FASE 12: DEPRECAR PROFILEPAGE ANTIGUO** (cleanup)

**Objetivo:** Remover ProfilePage.tsx antiguo

**Tareas:**
1. Asegurar Profile modular 100% funcional
2. Mover ProfilePage.tsx → ProfilePage.backup.tsx
3. Update imports en App.tsx
4. Remove deprecated code
5. Update documentation

**Esfuerzo:** 🟢 **Bajo** (1 hora)

**Riesgos:** Ninguno (backup existe)

**Entregable:**
- Profile antiguo deprecado
- Código limpio

---

## 📊 RESUMEN DE FASES

| Fase | Componentes | Esfuerzo | Prioridad | Bloqueantes |
|------|-------------|----------|-----------|-------------|
| **0. Preparación** | 1 | 🟢 Bajo | Alta | Ninguno |
| **1. Profile HUB** | 2 | 🟡 Medio | Alta | Fase 0 |
| **2. Account** | 3 | 🟡 Medio | Alta | Fase 1 |
| **3. Personal** | 2 | 🟡 Medio | Media | Fase 1 |
| **4. Publishing Index** | 1 | 🟢 Bajo | Alta | Fase 1 |
| **5A. Contact** | 1 | 🟢 Bajo | Media | Fase 4 |
| **5B. Delivery** | 1 | 🟢 Bajo | Media | Fase 4 |
| **5C. Visibility** | 1 | 🟢 Bajo | Media | Fase 4 |
| **5D. Currency** | 1 | 🟢 Bajo | Media | Fase 4 |
| **6. Addresses List** | 2 | 🟡 Medio | Alta | Fase 1 |
| **7. Address Form** | 1 | 🔴 Alto | Alta | Fase 6 |
| **8. Language** | 1 | 🟢 Bajo | Baja | Fase 1 |
| **9. App Integration** | 2 | 🟡 Medio | Crítica | Todas |
| **10. PublishFlow** | 0 | 🔴 Alto | Crítica | Fase 9 |
| **11. Polish** | 0 | 🟡 Medio | Media | Todas |
| **12. Cleanup** | 0 | 🟢 Bajo | Baja | Fase 11 |

**Total componentes nuevos:** 19  
**Total modificaciones:** 4 (App, PublishFlow, LocationStep, PricingStep)  
**Esfuerzo total estimado:** 🔴 **55-75 horas**

---

## ⚠️ RIESGOS IDENTIFICADOS

### 🔴 **RIESGOS ALTOS:**

**1. Integración Address Form con LocationStep**
```
Problema: LocationStep acoplado a PublishFlow
Solución: Extraer componentes compartidos map/
Mitigación: Fase 7 debe hacerse con cuidado
```

**2. State management complejo**
```
Problema: ProfileData debe compartirse entre 10+ páginas
Solución: Context API + localStorage
Mitigación: Diseñar bien en Fase 0
```

**3. PublishFlow integration**
```
Problema: PublishFlow ya complejo, añadir defaults puede romper
Solución: Defaults OPCIONALES, nunca bloquear
Mitigación: Testing exhaustivo Fase 10
```

### 🟡 **RIESGOS MEDIOS:**

**4. Navegación profunda**
```
Problema: Muchas vistas puede confundir
Solución: Breadcrumb claro, Back siempre visible
Mitigación: UX testing Fase 11
```

**5. Persistencia de datos**
```
Problema: localStorage puede perderse
Solución: Save automático + manual
Mitigación: Avisar antes de salir sin guardar
```

### 🟢 **RIESGOS BAJOS:**

**6. Verificación mock**
```
Problema: Email/Phone verification es simulada
Solución: Mock funcional, preparado para backend real
Mitigación: API interface definida
```

---

## 🎯 DECISIONES TÉCNICAS CRÍTICAS

### **1. State Management**

**DECISIÓN: Context API + localStorage**

```typescript
// /contexts/ProfileContext.tsx

interface ProfileContextValue {
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => void;
  saveProfile: () => Promise<void>;
  isLoading: boolean;
  hasChanges: boolean;
}

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    // Load from localStorage
    const saved = localStorage.getItem('profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });
  
  const [hasChanges, setHasChanges] = useState(false);
  
  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };
  
  const saveProfile = async () => {
    localStorage.setItem('profile', JSON.stringify(profile));
    setHasChanges(false);
    // TODO: Save to backend
  };
  
  return (
    <ProfileContext.Provider value={{ profile, updateProfile, saveProfile, hasChanges }}>
      {children}
    </ProfileContext.Provider>
  );
}

// En cualquier página:
const { profile, updateProfile } = useProfile();
```

**Razones:**
- ✅ Clean separation
- ✅ Fácil acceso desde cualquier página
- ✅ Persistencia automática
- ✅ Escalable

---

### **2. Navegación**

**DECISIÓN: State-based navigation (como actual)**

```typescript
// En App.tsx

type ProfileView = 
  | 'hub'
  | 'account'
  | 'personal'
  | 'publishing'
  | 'publishing-contact'
  | 'publishing-delivery'
  | 'publishing-visibility'
  | 'publishing-currency'
  | 'addresses'
  | 'address-form'
  | 'language';

const [currentProfileView, setCurrentProfileView] = useState<ProfileView>('hub');

// Navigation helpers
const profileNavigation = {
  navigateToHub: () => setCurrentProfileView('hub'),
  navigateToAccount: () => setCurrentProfileView('account'),
  navigateToPersonal: () => setCurrentProfileView('personal'),
  // etc...
  goBack: () => {
    // Logic para volver un nivel
    if (currentProfileView.startsWith('publishing-')) {
      setCurrentProfileView('publishing');
    } else {
      setCurrentProfileView('hub');
    }
  }
};

// Render conditional
{currentView === 'profile' && (
  <>
    {currentProfileView === 'hub' && <ProfileHub onNavigate={profileNavigation} />}
    {currentProfileView === 'account' && <AccountVerificationPage onBack={profileNavigation.goBack} />}
    {/* etc */}
  </>
)}
```

**Razones:**
- ✅ Consistente con app actual
- ✅ Simple
- ✅ No requiere router
- ✅ Mobile-first

---

### **3. Reutilización de LocationStep**

**DECISIÓN: Extraer componentes compartidos**

```typescript
// Crear /components/shared/location/

// LocationSearch.tsx
export function LocationSearch({ onSelect }: LocationSearchProps) {
  // Search input + autocomplete + GPS
}

// MapPicker.tsx
export function MapPicker({ location, onLocationChange }: MapPickerProps) {
  // Mapa con pin arrastrable
}

// Usar en:
// - LocationStep.tsx (PublishFlow)
// - AddressFormFlow.tsx (Profile)
```

**Razones:**
- ✅ No duplicar código
- ✅ Mantiene funcionalidad
- ✅ Facilita mantenimiento
- ✅ Escalable

---

### **4. Validation**

**DECISIÓN: Centralizar en utils**

```typescript
// /components/profile/utils/validation.ts

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^\+?[1-9]\d{1,14}$/.test(phone);
}

export function validateUsername(username: string): boolean {
  return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

export function validateBio(bio: string): { valid: boolean; error?: string } {
  if (bio.length > 150) {
    return { valid: false, error: 'Bio must be 150 characters or less' };
  }
  return { valid: true };
}
```

**Razones:**
- ✅ Reutilizable
- ✅ Testeable
- ✅ Consistente

---

## 📦 QUÉ IMPLEMENTAR AHORA vs DEJAR PREPARADO

### ✅ **IMPLEMENTAR AHORA (MVP):**

**Core functionality:**
1. Profile HUB (Fase 1)
2. Account & Verification (Fase 2) - mock
3. Personal Information (Fase 3)
4. Publishing Index (Fase 4)
5. Publishing Contact (Fase 5A)
6. Publishing Delivery (Fase 5B)
7. Publishing Visibility (Fase 5C)
8. Publishing Currency (Fase 5D)
9. Addresses List (Fase 6)
10. Address Form (Fase 7)
11. Language & Region (Fase 8)
12. App Integration (Fase 9)
13. PublishFlow Integration (Fase 10)

**Total:** Fases 0-10 (críticas para Publish Flow)

---

### 🔮 **DEJAR PREPARADO (Futuro):**

**1. Verification backend real**
```typescript
// Interface definida, mock ahora

interface VerificationService {
  sendEmailCode(email: string): Promise<boolean>;
  verifyEmailCode(email: string, code: string): Promise<boolean>;
  sendPhoneCode(phone: string, method: 'sms' | 'whatsapp'): Promise<boolean>;
  verifyPhoneCode(phone: string, code: string): Promise<boolean>;
}

// Implementación mock:
export const mockVerificationService: VerificationService = {
  sendEmailCode: async () => { await delay(1000); return true; },
  verifyEmailCode: async () => { await delay(2000); return true; },
  // etc
};

// Cuando backend esté listo:
// export const realVerificationService: VerificationService = { ... };
```

**2. Avatar upload real**
```typescript
// Interface definida

interface AvatarService {
  uploadAvatar(file: File): Promise<string>; // Returns URL
  deleteAvatar(url: string): Promise<boolean>;
}

// Mock: URL.createObjectURL
// Real: Upload to S3/Cloudinary
```

**3. Identity verification (KYC)**
```
// NO implementar ahora
// Estructura preparada en AccountVerificationPage
// Botón disabled con tooltip "Coming soon"
```

**4. Social links**
```
// NO implementar ahora
// Puede agregarse en PersonalInfoPage futuro
// O en Organization profile
```

**5. Organization/Store profile**
```
// NO implementar en Profile
// Standalone feature futuro
// MenuSheet tiene sección preparada
```

---

## 🏁 CRITERIOS DE ÉXITO

### ✅ **Definition of Done:**

**Funcional:**
- [ ] Usuario puede navegar todas las secciones
- [ ] Usuario puede editar todos los campos
- [ ] Cambios se persisten (localStorage)
- [ ] Completeness checklist funciona
- [ ] PublishFlow usa defaults correctamente
- [ ] Fallbacks funcionan sin defaults

**UX:**
- [ ] Navegación clara (Back siempre visible)
- [ ] Sin navegación rota
- [ ] Loading states donde aplica
- [ ] Error handling visible
- [ ] Confirmaciones para acciones destructivas

**Técnico:**
- [ ] No errores en consola
- [ ] TypeScript sin errores
- [ ] Componentes reutilizables documentados
- [ ] Code clean (no duplicación crítica)
- [ ] Mobile responsive

**Performance:**
- [ ] Lazy loading funciona
- [ ] No re-renders innecesarios
- [ ] Animaciones smooth 60fps

---

## 📈 ESTIMACIÓN DE ESFUERZO TOTAL

| Categoría | Horas | Días (6h/día) |
|-----------|-------|---------------|
| **Preparación** | 2 | 0.3 |
| **Core Pages** | 25-30 | 4-5 |
| **Address Form** | 8-10 | 1.5-2 |
| **Integration** | 10-12 | 2 |
| **PublishFlow** | 8-10 | 1.5-2 |
| **Testing & Polish** | 5-8 | 1 |
| **Cleanup** | 1-2 | 0.2 |
| **TOTAL** | **59-74** | **10-12** |

**Timeline estimado:** 2-3 semanas (part-time) o 1.5-2 semanas (full-time)

---

## 🚦 RECOMENDACIÓN DE IMPLEMENTACIÓN

### **OPCIÓN A: SECUENCIAL COMPLETO** ⭐ RECOMENDADO

```
Semana 1:
- Fases 0-4 (Preparación + HUB + Account + Personal + Publishing Index)
- Milestone: Profile navegable con 4 secciones

Semana 2:
- Fases 5A-5D (Publishing defaults)
- Fases 6-7 (Addresses)
- Milestone: Publishing setup completo

Semana 3:
- Fase 8 (Language)
- Fase 9 (App Integration)
- Fase 10 (PublishFlow Integration)
- Fase 11-12 (Polish + Cleanup)
- Milestone: ✅ LANZAMIENTO

Timeline: 3 semanas
Riesgo: Bajo
```

---

### **OPCIÓN B: INCREMENTAL FAST**

```
Sprint 1 (1 semana):
- Fases 0-2 (HUB + Account)
- Deploy parcial

Sprint 2 (1 semana):
- Fases 3-5D (Personal + Publishing completo)
- Deploy parcial

Sprint 3 (1 semana):
- Fases 6-10 (Addresses + Integration)
- Deploy completo

Sprint 4 (opcional):
- Fase 11-12 (Polish)

Timeline: 3-4 semanas
Riesgo: Medio (deploys parciales)
```

---

### **OPCIÓN C: MVP MÍNIMO** (NO recomendado)

```
Solo implementar:
- Profile HUB
- Publishing defaults (sin Addresses)
- Integration mínima

PROBLEMA: Sin Addresses, no hay location defaults
PublishFlow no mejora significativamente
```

---

## ✅ APROBACIÓN REQUERIDA

**Antes de implementar, aprobar:**

1. ✅ Arquitectura de archivos
2. ✅ Types/Interfaces
3. ✅ State management (Context API)
4. ✅ Navegación (state-based)
5. ✅ Reutilización LocationStep (extraer shared)
6. ✅ Plan de fases
7. ✅ Timeline (Opción A recommended)

**Decisiones pendientes:**
- ¿Implementar ahora o después de otro feature?
- ¿Full time o part time?
- ¿Deploys incrementales o al final?

---

## 📝 PRÓXIMOS PASOS

1. **Revisar este plan**
2. **Aprobar decisiones técnicas**
3. **Confirmar timeline**
4. **Comenzar Fase 0** (Preparación)

---

**Plan completado:** 15 Diciembre 2025  
**Status:** ⏸️ **ESPERANDO APROBACIÓN**  
**Autor:** AI Assistant  
**Revisión:** Pendiente

