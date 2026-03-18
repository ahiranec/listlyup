# 🔍 ANÁLISIS CRÍTICO: PROPUESTA PROFILE MODULAR

**Fecha:** 15 Diciembre 2025  
**Tipo:** Análisis arquitectura Profile  
**Status:** SOLO ANÁLISIS (no implementar)

---

## 📋 CONTEXTO DE ANÁLISIS

### Asunciones confirmadas:
- ✅ Profile es HUB de secciones
- ✅ Cada sección abre flujo/pantalla específica
- ✅ NO rediseñar visualmente
- ✅ Usar componentes existentes
- ✅ Publish Flow depende de esta info
- ✅ Seguridad/Privacidad/IA/Billing NO viven aquí

---

## 📊 COMPARACIÓN: PROPUESTA vs ACTUAL

### ACTUAL (ProfilePage.tsx):
```
Una página scrolleable con:
- Avatar editable inline
- Name, username, bio (inline)
- Account type (collapsible)
- Contact methods (collapsible)
- Delivery options (collapsible)
- Visibility (collapsible)
- Location (inline)
- Phone (inline)

Total: ~600 líneas, TODO en una vista
```

### PROPUESTA:
```
HUB + Pantallas dedicadas:
1. Account Information →
2. Personal Information →
3. Publication Information →
   3.1 Default Location →
   3.2 Default Contact Methods →
   3.3 Default Delivery Methods →
   3.4 Default Visibility →
   3.5 Default Currency →
4. Addresses → (lista + CRUD)
5. Language & Region →
6. Organization / Store →

Total: 1 HUB + 11 pantallas
```

---

## 🎯 RESPUESTAS A TUS 7 PREGUNTAS

---

### 1️⃣ **¿La navegación por secciones es clara?**

### ✅ **SÍ - Navegación clara 9/10**

#### Estructura propuesta:

```
PROFILE HUB
├─ Account Information →
├─ Personal Information →
├─ Publication Information →
│  ├─ Default Location →
│  ├─ Default Contact Methods →
│  ├─ Default Delivery Methods →
│  ├─ Default Visibility →
│  └─ Default Currency →
├─ Addresses →
├─ Language & Region →
└─ Organization / Store →
```

#### Patrón de navegación:

**Nivel 1: Profile HUB**
```
┌─────────────────────────────┐
│ [Avatar] Name @username     │
│ Badge: Free/Plus/Pro        │
│ Status: ✅ / ⚠️ incompleto  │
└─────────────────────────────┘

Secciones (clickeables):
┌─────────────────────────────┐
│ Account Information      >  │ → Pantalla dedicada
├─────────────────────────────┤
│ Personal Information     >  │ → Pantalla dedicada
├─────────────────────────────┤
│ Publication Information  >  │ → HUB secundario
└─────────────────────────────┘
```

**Nivel 2: Publication Information (HUB secundario)**
```
┌─────────────────────────────┐
│ Default Location         >  │ → Pantalla dedicada
├─────────────────────────────┤
│ Default Contact Methods  >  │ → Pantalla dedicada
├─────────────────────────────┤
│ Default Delivery Methods >  │ → Pantalla dedicada
└─────────────────────────────┘
```

#### ✅ Ventajas:

1. **Jerarquía clara:**
```
HUB → Sección → Sub-sección (si aplica)
Máximo 3 niveles de profundidad
```

2. **Breadcrumb implícito:**
```
Profile > Publication Information > Default Location
Back navega un nivel arriba
```

3. **Familiar pattern:**
```
iOS Settings usa este patrón
Android Settings usa este patrón
WhatsApp Settings usa este patrón

Usuario ya conoce la navegación ✅
```

#### ⚠️ Riesgo menor:

**Publication Information es HUB doble:**
```
Profile HUB
  └─ Publication Information (HUB)
      └─ Default Location (Pantalla)

3 niveles de navegación

Puede sentirse "enterrado" para usuarios
```

**Alternativa más flat:**
```
Profile HUB
  ├─ Default Location (directo)
  ├─ Default Contact (directo)
  ├─ Default Delivery (directo)
  └─ Default Visibility (directo)

2 niveles solamente
Más accesible
```

#### Consistencia con app:

**App actual usa navegación similar:**
```
// App.tsx línea 289:
<ProfilePage onBack={() => navigation.navigateToHome()} />

// MenuSheet línea 34:
onProfileClick={navigation.navigateToProfile}

// Pattern: View → Sub-view con onBack
Ya implementado ✅
```

#### Conclusión pregunta #1:

**Navegación clara:** 9/10 ✅  
**Recomendación:** Considerar hacer Publication Information más flat (eliminar HUB intermedio)

---

### 2️⃣ **¿Los flujos por sección están bien definidos?**

### 🟡 **PARCIALMENTE - Algunos flujos claros, otros vagos**

Voy a analizar cada sección:

---

#### ✅ **1. ACCOUNT INFORMATION** - Flujo claro 8/10

**Propuesta dice:**
```
Contenido:
- Email (verificado / no)
- Teléfono (verificado / no)
- Método de login (Google / Email / Apple)
- Username

Acciones:
- Cambiar email
- Cambiar teléfono
- Cambiar contraseña (si aplica)
```

**Análisis:**

✅ **Campos claros:**
- Email con badge verificación
- Phone con badge verificación
- Login method (read-only display)
- Username editable

✅ **Acciones definidas:**
```
"Cambiar email" →
  1. Dialog: "Enter new email"
  2. Send verification code
  3. Enter code
  4. Confirm

"Cambiar teléfono" →
  1. Dialog: "Enter new phone"
  2. Send SMS code
  3. Enter code
  4. Confirm

"Cambiar contraseña" →
  1. Sheet: Current password
  2. New password
  3. Confirm password
  4. Save
```

❌ **Falta especificar:**

1. **Username change:**
```
¿Username es editable aquí o en Personal Info?
Propuesta lo pone en Account pero actual lo tiene con name/bio

CONFLICTO DE UBICACIÓN
```

2. **Email verification flow:**
```
Si email no verificado:
- ¿Muestra CTA "Verify email"?
- ¿Resend code?
- ¿Qué pasa si intenta publicar sin email verificado?
```

3. **Phone verification:**
```
¿Phone es requerido para publicar?
¿O solo para WhatsApp contact?

Propuesta no aclara
```

**Score:** 8/10 - Claro pero falta detail

---

#### ✅ **2. PERSONAL INFORMATION** - Flujo claro 9/10

**Propuesta dice:**
```
Contenido:
- Display name
- Bio / descripción
- Foto de perfil

Incluye:
- Preview del perfil público
- Control simple de qué info es pública
```

**Análisis:**

✅ **Campos claros:**
```
Display name: [____] (max 50 chars?)
Bio: [______] (max 150 chars)
Avatar: [Upload] [Remove]
```

✅ **Preview público:**
```
"Preview how others see you"
[Card preview del perfil público]
```

✅ **Control privacidad:**
```
Public profile info:
☑ Show display name
☑ Show bio
☑ Show location (city level)
☐ Show exact location
☐ Show phone number
```

❌ **Falta especificar:**

1. **Avatar upload flow:**
```
¿Crop imagen?
¿Tamaño máximo?
¿Formatos permitidos?
¿Fallback a iniciales?
```

2. **Preview público vs privado:**
```
¿Qué campos se muestran en perfil público?
- Avatar ✅
- Name ✅
- Bio ✅
- Username ✅
- Verification badge ✅
- Plan badge ❓
- Location (city) ❓
- Rating ❓
- Join date ❓
```

**Score:** 9/10 - Muy claro

---

#### 🟡 **3. PUBLICATION INFORMATION** - Flujos vagos 6/10

##### **3.1 DEFAULT LOCATION** - Vago 5/10

**Propuesta dice:**
```
- Ciudad / región base
- Precisión por defecto:
  - Persona → approximate
  - Store / Org → exact
- Botón "Editar en mapa"
- Flujo:
  1) Buscar dirección
  2) Mapa con pin
  3) Mover pin
  4) Confirmar
```

**Análisis:**

✅ **Idea clara:** Location con mapa editable

❌ **Problemas de spec:**

1. **¿Qué es "default location"?**
```
Opción A: Ubicación del USUARIO (donde vive)
  → Privada
  → NO se publica
  → Se usa para calcular distancias

Opción B: Ubicación DEFAULT para LISTINGS
  → Pública (con precision)
  → Se usa en Publish Flow
  → Usuario puede override

Propuesta NO aclara cuál es
```

2. **Confusión con ADDRESSES:**
```
Sección 4 es "Addresses" (lista de direcciones)
Sección 3.1 es "Default Location"

¿Cuál es la diferencia?
¿Default Location ∈ Addresses?
¿Son dos sistemas separados?

OVERLAP no definido
```

3. **Precision automática vs manual:**
```
Propuesta dice:
"Persona → approximate
 Store → exact"

PERO:
¿Cómo sabe el sistema si soy Persona vs Store?
¿Es de Account Type (sección 6)?
¿Es automático?

DEPENDENCIA no especificada
```

4. **Flujo de edición vago:**
```
"Editar en mapa" →
  1) Buscar dirección
  2) Mapa con pin
  3) Mover pin
  4) Confirmar

¿Usa MapView existente?
¿Nuevo componente?
¿Integración con LocationStep del PublishFlow?

REUTILIZACIÓN no mencionada
```

**Evidencia código actual:**

```typescript
// LocationStep.tsx línea 40-42:
const hasProfileLocation = currentUser?.location?.city && currentUser?.location?.region;
const initialSource: LocationSource = hasProfileLocation ? 'profile' : 'gps';

// PublishFlow YA usa location de Profile
// Pero solo ciudad/región (texto)
// NO coordenadas exactas

¿Default Location propuesto agrega coordinates?
```

**Score:** 5/10 - Concepto confuso

---

##### **3.2 DEFAULT CONTACT METHODS** - Claro 8/10

**Propuesta dice:**
```
- In-app chat
- WhatsApp
- Phone call
- Email (opcional)

Validaciones visibles:
- WhatsApp requiere teléfono verificado
- Phone requiere teléfono verificado
```

**Análisis:**

✅ **Campos claros:**
```
☑ In-app chat (always enabled?)
☐ WhatsApp
  └─ ⚠️ Requires verified phone
☐ Phone call
  └─ ⚠️ Requires verified phone
☐ Email
```

✅ **Validaciones definidas:**
```
if (!phoneVerified && whatsappEnabled) {
  → Show error: "Verify phone first"
  → CTA: "Go to Account Information"
}
```

✅ **Usa estructura actual:**
```typescript
// ProfileData actual (línea 59-63):
defaultContactMethods: {
  internalChat: boolean;
  whatsapp: { enabled: boolean; preferred: boolean; hours?: string };
  phone: { enabled: boolean; hours?: string };
}

Propuesta es compatible ✅
```

❌ **Falta especificar:**

1. **Preferred method:**
```
¿Usuario puede marcar uno como "preferred"?
¿Se muestra primero en listings?

Actual tiene "preferred" en code
Propuesta no lo menciona
```

2. **Hours availability:**
```
¿Usuario puede poner horario?
"Available: Mon-Fri 9am-6pm"

Actual tiene "hours" opcional
Propuesta no lo menciona
```

**Score:** 8/10 - Claro pero incompleto

---

##### **3.3 DEFAULT DELIVERY METHODS** - Claro 8/10

**Propuesta dice:**
```
- Pickup
- Local delivery
- Shipping
- Virtual (servicios)
```

**Análisis:**

✅ **Opciones claras:**
```
☐ Pickup
☐ Local delivery
☐ Shipping
☐ Virtual
```

✅ **Usa estructura actual:**
```typescript
// ProfileData actual (línea 66-72):
defaultDeliveryOptions: {
  pickup: boolean;
  meetup: { enabled: boolean; radius?: string; cost?: string };
  delivery: { enabled: boolean; cost?: string; area?: string };
  shipping: { enabled: boolean; cost?: string };
  virtual: boolean;
}

Propuesta compatible pero simplificada
```

❌ **Falta especificar:**

1. **Delivery details:**
```
Actual tiene cost, radius, area

Propuesta solo lista opciones
¿Dónde se configuran estos detalles?

¿En esta pantalla o en Publish Flow?
```

2. **"Local delivery" vs "Meetup":**
```
Propuesta: "Local delivery"
Actual code: "meetup" + "delivery"

¿Son lo mismo?
¿Local delivery incluye meetup?

NAMING confuso
```

**Score:** 8/10 - Claro pero faltan detalles

---

##### **3.4 DEFAULT VISIBILITY** - Claro 9/10

**Propuesta dice:**
```
- Public
- Groups
- Private
```

**Análisis:**

✅ **Opciones claras:**
```
○ Public (anyone can see)
○ Groups (only my groups)
○ Private (only me)
```

✅ **Compatible con actual:**
```typescript
// ProfileData actual (línea 74-77):
listingPrivacy: {
  defaultVisibility: 'public' | 'groups' | 'private';
  showPhoneInListings: boolean;
}

Propuesta compatible ✅
```

❌ **Falta especificar:**

1. **Groups selection:**
```
Si elige "Groups":
¿Cuáles grupos por default?
¿All my groups?
¿Specific groups?

Propuesta no aclara
```

2. **Phone visibility:**
```
Actual tiene "showPhoneInListings"
Propuesta no lo menciona

¿Se movió a otra sección?
¿Se eliminó?
```

**Score:** 9/10 - Claro

---

##### **3.5 DEFAULT CURRENCY** - Claro 10/10

**Propuesta dice:**
```
- Selector de moneda (ej: CLP, USD)
- Usada por defecto en nuevas publicaciones
- Editable luego en Publish Flow
```

**Análisis:**

✅ **Spec perfecta:**
```
Default currency: [CLP ▼]

Options: CLP, USD, EUR, BRL, ARS, etc.

Info text:
"This currency will be pre-selected when creating listings. You can change it for each listing."
```

✅ **Nuevo feature (no en actual):**
```
ProfileData actual NO tiene currency

Propuesta agrega:
defaultCurrency: 'CLP' | 'USD' | 'EUR' | ...

BUENA ADICIÓN ✅
```

✅ **Integración Publish Flow clara:**
```
PublishFlow Step 2:
Currency: [USD ▼] ← Pre-filled desde Profile
          ↑ editable
```

**Score:** 10/10 - Perfecto

---

##### **Checklist de completitud:**

**Propuesta menciona:**
```
Checklist visible:
✅ Ubicación definida
✅ Contacto definido
✅ Delivery definido
✅ Visibilidad definida
✅ Currency definida
```

✅ **Excelente idea:** Muestra qué falta para publicar

❓ **¿Dónde se muestra?**
```
¿En Profile HUB?
¿En Publication Information HUB?
¿En ambos?

Ubicación no especificada
```

**Score Publication Information global:** 6/10 - Concepto bueno, detalles vagos

---

#### ✅ **4. ADDRESSES** - Flujo bien definido 9/10

**Propuesta dice:**
```
Pantalla principal:
- Lista de direcciones guardadas

Cada dirección:
- Label (Casa, Oficina, etc)
- Dirección formateada
- Indicador de pin exacto

Flujo "Agregar / Editar":
1) Buscar dirección
2) Mapa con pin editable
3) Confirmar ubicación
4) Completar detalles:
   - Tipo (Casa / Edificio / Almacén)
   - Condominio / barrio privado (toggle)
   - Conserjería (toggle)
   - Instrucciones de entrega
   - Contacto asociado
5) Guardar

Acciones:
- Editar
- Eliminar
- Marcar como predeterminada
```

**Análisis:**

✅ **Flujo COMPLETO y detallado:**

**Lista de addresses:**
```
┌──────────────────────────────┐
│ 🏠 Casa                      │
│ Av. Libertad 123, Viña...   │
│ 📍 Exact location            │
│ [✓ Default]                  │
└──────────────────────────────┘
┌──────────────────────────────┐
│ 🏢 Oficina                   │
│ Calle 1 Norte 456, Viña...   │
│ 📍 Exact location            │
└──────────────────────────────┘

[+ Add new address]
```

**Agregar/Editar flow:**
```
Step 1: Search
[Search: "Av Libertad 123..."]

Step 2: Map
[Mapa con pin arrastrable]

Step 3: Details
Label: [Casa ▼] // Home, Office, Warehouse, Other
Type: [House ▼] // House, Building, Warehouse, Store

☐ Gated community / Condo
☐ Building has doorman

Delivery notes:
[Ring bell, Apartment 5B...]

Contact for this address:
[+56 9 1234 5678]

[Save Address]
```

✅ **Campos bien pensados:**
- Label personalizable
- Type de lugar
- Toggles para building features
- Delivery instructions (útil!)
- Contact específico por address

✅ **Acciones claras:**
```
- Edit (opens same flow with data)
- Delete (confirm dialog)
- Set as default (single selection)
```

❓ **Relación con Default Location:**

**CONFUSIÓN:**
```
Publication Information > Default Location
vs
Addresses > Lista de direcciones

¿Son lo mismo?
¿Default Location es una Address?
¿O son dos sistemas independientes?

Propuesta NO aclara overlap
```

**Propuesta dice:**
```
"Direcciones son privadas y NO equivalen 
a ubicación pública del listing"

PERO Default Location SÍ se usa en listings

CONTRADICCIÓN
```

**Posible clarificación:**
```
Addresses:
  → Privadas
  → Para delivery, meetups
  → NO se publican
  → Exactas

Default Location:
  → Pública (con precision)
  → Para listings
  → Se publica
  → Approximate o Exact
  
Sistemas separados con propósitos distintos
```

**Score:** 9/10 - Flujo excelente, pero overlap con Default Location confuso

---

#### ✅ **5. LANGUAGE & REGION** - Flujo claro 10/10

**Propuesta dice:**
```
Contenido:
- Idioma de la app
- Región (si aplica)

Impacta:
- UI
- Copy
- Formatos
```

**Análisis:**

✅ **Spec perfecta:**
```
App Language: [Español ▼]
  Options: Español, English, Português

Region: [Chile ▼]
  Options: Chile, Argentina, Brasil, México, USA

Format preferences:
- Date: DD/MM/YYYY (automatic)
- Time: 24h (automatic)
- First day: Monday (automatic)
```

✅ **Impacto claro:**
```
Changes apply:
- Interface language
- Date/time formats
- Currency format
- Distance units (km vs miles)
```

✅ **Pattern existente:**
```
SettingsSheet ya tiene language/region controls
Fácil de extraer y mover a Profile

Reutilización de código ✅
```

**Score:** 10/10 - Perfecto

---

#### 🟡 **6. ORGANIZATION / STORE** - Flujo vago 5/10

**Propuesta dice:**
```
Contenido:
- Publicar como:
  - Persona
  - Organización
- Acceso a gestión de organización
```

**Análisis:**

❓ **Concepto vago:**

1. **¿Qué es "publicar como"?**
```
Opción A: Toggle simple
  ○ I'm an individual
  ○ I represent a business/organization

Opción B: Account linking
  Personal account → Create/Link organization
  Switch between accounts
```

2. **¿Qué es "acceso a gestión"?**
```
¿Nueva pantalla "Organization Dashboard"?
¿Qué se gestiona ahí?
  - Business name
  - Business address
  - Business hours
  - Team members?
  - Analytics?

Spec completamente vaga
```

3. **Relación con Account Type:**
```
ProfilePage actual tiene:
accountType: 'individual' | 'store'

¿Es lo mismo que propuesta Organization/Store?
¿O es feature adicional?
```

4. **¿Feature Pro/Business?**
```
¿Organization es feature pagada?
¿Free users pueden crear organization?

Propuesta no aclara
```

❌ **Falta completamente:**

```
Flujos necesarios:
1. Create organization
   - Name
   - Business type
   - Legal info
   - Address
   - Hours
   
2. Manage organization
   - Edit info
   - Team members
   - Permissions
   
3. Switch account context
   - Post as Personal
   - Post as Organization
   
4. Delete organization

TODO sin especificar
```

**Score:** 5/10 - Concepto interesante pero 100% vago

---

#### **Conclusión pregunta #2:**

| Sección | Score | Estado |
|---------|-------|--------|
| Account Information | 8/10 | ✅ Claro (faltan detalles) |
| Personal Information | 9/10 | ✅ Muy claro |
| **Publication Information** | **6/10** | 🟡 **Vago** |
| - Default Location | 5/10 | 🟡 Confuso |
| - Default Contact | 8/10 | ✅ Claro |
| - Default Delivery | 8/10 | ✅ Claro |
| - Default Visibility | 9/10 | ✅ Claro |
| - Default Currency | 10/10 | ✅ Perfecto |
| Addresses | 9/10 | ✅ Excelente (overlap confuso) |
| Language & Region | 10/10 | ✅ Perfecto |
| Organization / Store | 5/10 | 🟡 Muy vago |
| **PROMEDIO** | **7.6/10** | 🟡 **Parcialmente definido** |

**Secciones que NECESITAN más spec:**
1. 🔴 Default Location (confusión con Addresses)
2. 🔴 Organization / Store (100% vago)
3. 🟡 Account Information (verification flows)

---

### 3️⃣ **¿La sección "Publication Information" se entiende como requisito para publicar?**

### ✅ **SÍ - Con mejoras sugeridas 8/10**

#### Naming análisis:

**"Publication Information"** es claro pero mejorable:

✅ **Ventajas del nombre:**
```
"Publication Information"
→ Usuario entiende: "Info para publicar"
→ Relaciona con acción: "Publish"
→ Diferencia de "Personal Information"
```

🟡 **Alternativas más claras:**
```
Opción A: "Publishing Defaults" ⭐ RECOMENDADO
  → Más específico
  → Usuario entiende que son defaults
  → Más corto

Opción B: "Listing Defaults"
  → Relaciona con "Listings"
  → Consistente con "My Listings"

Opción C: "Publication Settings"
  → Menos claro (settings ya existe aparte)
```

#### Comunicación de requisito:

**Propuesta menciona:**
```
Profile HUB muestra:
⚠️ Información requerida para publicar incompleta

Checklist visible:
✅ Ubicación definida
✅ Contacto definido
⚠️ Delivery pendiente
⚠️ Visibility pendiente
⚠️ Currency pendiente
```

✅ **Excelente:** Usuario ve qué falta

❓ **Dónde se muestra:**
```
¿En Profile HUB (top)?
¿En Publication Information section?
¿En ambos?

Ubicación exacta no especificada
```

#### Flujo de onboarding:

**Propuesta NO menciona pero debería:**

```
Escenario: Usuario nuevo intenta publicar

Option A: Bloqueo preventivo
  [Create Listing]
  → Check: ¿Profile completo?
  → NO → Dialog:
      "⚠️ Complete your profile first
       You need to set:
       - Default location
       - Contact methods
       - Delivery options
       
       [Go to Profile] [Cancel]"

Option B: Flujo guiado
  [Create Listing]
  → Check: ¿Profile completo?
  → NO → Redirect to Profile
      → Highlight "Publication Information"
      → Toast: "Set up publishing defaults first"

Option C: Inline en Publish Flow
  [Create Listing]
  → PublishFlow inicia
  → Step Location: Si no hay default
      → "No default location set"
      → [Set now] → Opens Profile > Default Location
      → Vuelve a PublishFlow con location set
```

**Recomendación:** Option A (Dialog) es más claro

#### Validación de completitud:

```typescript
// Pseudo-code

function canPublish(profile: Profile): boolean {
  const required = {
    location: !!profile.defaultLocation,
    contact: profile.defaultContactMethods.length > 0,
    delivery: profile.defaultDeliveryMethods.length > 0,
    visibility: !!profile.defaultVisibility,
    currency: !!profile.defaultCurrency,
  };
  
  return Object.values(required).every(v => v);
}

// En Profile HUB:
const completion = {
  total: 5,
  completed: Object.values(required).filter(v => v).length,
};

// Muestra: "3/5 complete" o "Ready to publish ✅"
```

#### Conclusión pregunta #3:

**Se entiende como requisito:** ✅ SÍ (8/10)

**Mejoras sugeridas:**
1. Rename a "Publishing Defaults"
2. Especificar ubicación de checklist
3. Definir flujo si usuario intenta publicar sin completar
4. Mostrar progress bar "3/5 complete"

---

### 4️⃣ **¿Algo sobra o falta?**

---

#### ❌ **SOBRA:**

##### **1. Overlap Default Location vs Addresses** 🔴

```
Default Location (3.1):
- Ciudad / región base
- Precisión
- Mapa editable

Addresses (4):
- Lista de direcciones
- Label
- Mapa editable
- Delivery instructions

¿Por qué dos sistemas de locations?
```

**Problema:**
```
Usuario ve:
1. Publication Information > Default Location
   → "Set your default location"
   
2. Addresses
   → "Add your addresses"

Confusión: "¿No es lo mismo?"
```

**Solución sugerida:**

**Opción A: Unificar** ⭐ RECOMENDADO
```
Eliminar "Default Location" como sección separada

Usar Addresses:
- Lista de addresses
- Una marcada como "Default for listings"
- Esa se usa en Publish Flow

SIMPLIFICACIÓN
```

**Opción B: Clarificar propósitos**
```
Default Location:
  → Pública (con precision)
  → Solo ciudad/región
  → NO address exacta
  → Para mostrar en listings
  → Simple text field

Addresses:
  → Privadas
  → Direcciones exactas
  → Para delivery/meetups
  → NO se publican nunca
  → Con mapa

Propósitos completamente distintos
Renombrar para claridad
```

**Impacto:** 🔴 Alto - Confusión crítica para usuarios

---

##### **2. Organization / Store en Profile** 🟡

```
Propuesta pone:
Organization / Store → En Profile

PERO:
- Organización es entity completa
- Tiene dashboard propio
- Gestión de team, analytics, etc.
- Scope mucho mayor que "Profile"
```

**Problema:**
```
Profile = info personal del usuario
Organization = entity de negocio

Mixing concepts
```

**Solución sugerida:**

```
Mover Organization fuera de Profile

Estructura:
MenuSheet
  ├─ Profile (personal) ✅
  ├─ Organization (business) → NUEVO tab
  ├─ Settings ✅
  └─ Billing ✅

Organization tiene su propio flujo/dashboard
NO está dentro de Profile
```

**Alternativa:**
```
Si organización es simple toggle:
Account Information > Account Type
  ○ Individual
  ○ Business

+ Business name field (si Business)

NO requiere sección completa
```

**Impacto:** 🟡 Medio - Mezcla de conceptos

---

#### ✅ **FALTA:**

##### **1. Verification status** 🟢

```
Propuesta menciona:
Email (verificado / no)
Teléfono (verificado / no)

PERO falta:
Identity verification
- Documento de identidad
- Selfie verification
- Address verification (Pro?)

Para seguridad y trust
```

**Dónde agregar:**
```
Account Information
  ├─ Email ✅ verified
  ├─ Phone ✅ verified
  └─ Identity ⚠️ not verified → [Verify now]
      → Flow: Upload ID + Selfie
```

**Impacto:** 🟢 Bajo (feature futuro)

---

##### **2. Notification preferences** 🟢

```
Propuesta explícitamente EXCLUYE:
"NO deben aparecer: Privacidad"

PERO notification preferences ≠ privacidad
Son defaults de publicación
```

**Dónde agregar:**
```
Publication Information
  └─ Notification Defaults → NUEVO
      ☑ Notify on new messages
      ☑ Notify on new offers
      ☑ Notify on listing views (Pro)
      ☐ Notify on price drops (saved items)
```

**Alternativa:**
```
Dejar en Settings (como está ahora)
NO mover a Profile

Settings = App behavior
Profile = User identity + Publishing defaults

Separación clara
```

**Impacto:** 🟢 Bajo - Settings OK

---

##### **3. Saved searches / Alerts** 🟡

```
SettingsSheet actual tiene:
"Saved Searches" section

¿Se mueve a Profile?
¿Se queda en Settings?
```

**Análisis:**
```
Saved searches son:
- Filtros guardados
- Alerts de nuevos items
- App functionality

NO son datos de perfil

DEJAR EN SETTINGS ✅
```

**Impacto:** 🟢 Bajo - Ya bien ubicado

---

##### **4. Social links** 🟡

```
Para stores/organizations:
- Instagram
- Facebook
- Website
- LinkedIn

Útil para credibilidad
```

**Dónde agregar:**
```
Organization / Store
  └─ Social Links
      Instagram: [@username]
      Website: [https://...]
      Facebook: [Page URL]
```

**O en:**
```
Personal Information
  └─ Links (opcional)
      Website: [...]
      Social: [...]
```

**Impacto:** 🟡 Medio - Nice to have

---

##### **5. Payment methods (futuro)** 🟢

```
Para transactions:
- Credit cards
- PayPal
- Bank account

Propuesta excluye "Tarjetas"
Correcto, va en Billing

PERO:
¿"Preferred payment method for receiving"?
```

**Análisis:**
```
Receiving payment es Billing feature
NO Profile

MANTENER EXCLUSIÓN ✅
```

**Impacto:** 🟢 Bajo - Correcto como está

---

#### **Resumen de qué sobra/falta:**

**SOBRA:**
1. 🔴 Default Location (overlap con Addresses)
2. 🟡 Organization en Profile (scope demasiado grande)

**FALTA:**
1. 🟢 Identity verification (Account Info)
2. 🟢 Social links (Organization/Personal)
3. 🟢 Notification defaults (¿Profile o Settings?)

**Conclusión pregunta #4:**
- Eliminar Default Location como sección separada
- Mover Organization fuera de Profile
- Agregar Identity verification
- Resto está bien scoped

---

### 5️⃣ **¿Hay fricción innecesaria?**

### 🟡 **SÍ - Fricciones identificadas 6/10**

---

#### 🔴 **FRICCIÓN #1: Navegación profunda (3 niveles)**

**Problema:**
```
Profile HUB
  → Publication Information (HUB)
      → Default Location (Pantalla)
          → Edit map (Modal/Sheet)

4 niveles de profundidad
Muchos taps back para salir
```

**Escenario usuario:**
```
Usuario quiere editar location:
1. Tap "Profile"
2. Scroll → Tap "Publication Information"
3. Scroll → Tap "Default Location"
4. Tap "Edit on map"
5. [Edit map]
6. Tap "Confirm"
7. Back → Publication Information
8. Back → Profile HUB
9. Back → Home

9 taps total para editar location ❌
```

**Comparación con actual:**
```
ProfilePage actual:
1. Tap "Profile"
2. Scroll to Location section
3. Tap "Use current location"
4. Done

4 taps total ✅

Propuesta es +5 taps (125% más fricción)
```

**Solución:**

**Opción A: Flatear Publication Information** ⭐
```
Profile HUB
  ├─ Default Location (directo)
  ├─ Default Contact (directo)
  ├─ Default Delivery (directo)
  └─ Default Visibility (directo)

De 3 niveles → 2 niveles
```

**Opción B: Quick actions en HUB**
```
Profile HUB

Publication Information >
  ⚙️ Quick setup (si incompleto)
  └─ Opens wizard: Location → Contact → Delivery → Done
  
  Or:
  Location: Viña del Mar [Edit]
  Contact: WhatsApp [Edit]
  ...
  
  Edit inline sin navegar a sub-pantalla
```

**Impacto:** 🔴 Alto - Navegación profunda frustra

---

#### 🟡 **FRICCIÓN #2: Overlap Location/Addresses**

**Problema:**
```
Usuario ve dos secciones de location:
1. Publication Information > Default Location
2. Addresses

¿Cuál uso para qué?
Decisión cognitiva innecesaria
```

**Solución:** (ver pregunta #4)
```
Unificar en Addresses
Una address marcada como "Default for listings"
```

**Impacto:** 🟡 Medio - Confusión evitable

---

#### 🟡 **FRICCIÓN #3: Checklist sin ubicación clara**

**Problema:**
```
Propuesta menciona:
"Checklist visible de completitud"

PERO:
¿Dónde se muestra?
¿Profile HUB?
¿Publication Information?
¿Ambos?

Usuario puede no verlo
```

**Solución:**
```
Profile HUB (top, siempre visible):
┌─────────────────────────────┐
│ [Avatar] Name @user         │
│ ✨ Plus                     │
│                             │
│ ⚠️ Publishing setup: 3/5    │
│ [Complete setup]            │
└─────────────────────────────┘

CTA claro y visible
```

**Impacto:** 🟡 Medio - Usuario puede perderse

---

#### 🟢 **FRICCIÓN #4: Verification flows no detallados**

**Problema:**
```
Account Information:
Email (verificado / no)

Usuario tapa → ¿Qué pasa?
¿Inline edit?
¿Nueva pantalla?
¿Dialog?
¿Sheet?

Flujo no especificado
```

**Solución:**
```
Email row con badge:
Email: user@example.com
✅ Verified

Si no verificado:
Email: user@example.com
⚠️ Not verified [Verify]

Tap [Verify]:
→ Dialog: "Check your email"
→ Muestra código sent
→ Input code
→ Verificado ✅

Flujo claro
```

**Impacto:** 🟢 Bajo - Pero debe especificarse

---

#### 🟢 **FRICCIÓN #5: Organization scope vago**

**Problema:**
```
"Acceso a gestión de organización"

¿Qué es "gestión"?
¿Nueva pantalla?
¿Qué puedo hacer ahí?

Unclear → Usuario confundido
```

**Solución:**
```
Especificar scope completo:
- Create organization
- Manage team
- Organization profile
- Organization listings
- Analytics (Pro)

O simplificarlo:
Solo toggle Individual/Business
Sin "gestión" compleja
```

**Impacto:** 🟢 Bajo - Si se clarifica

---

#### **Resumen fricciones:**

| Fricción | Severidad | Solución |
|----------|-----------|----------|
| Navegación 3 niveles | 🔴 Alta | Flatear HUB |
| Location overlap | 🟡 Media | Unificar |
| Checklist hidden | 🟡 Media | Ubicación clara |
| Verification flows | 🟢 Baja | Especificar |
| Organization vago | 🟢 Baja | Definir scope |

**Score fricción:** 6/10 (mejorable)

---

### 6️⃣ **¿Mantiene coherencia visual con la app actual?**

### ✅ **SÍ - Coherencia perfecta 10/10**

#### Componentes propuestos vs existentes:

**Propuesta usa:**

1. **Cards/Rows clickeables:**
```
Profile HUB:
┌─────────────────────────────┐
│ Account Information      >  │
├─────────────────────────────┤
│ Personal Information     >  │
└─────────────────────────────┘

Mismo pattern que:
- MenuSheet (línea 54-80)
- FilterSheet sections
- SettingsSheet sections

CONSISTENTE ✅
```

2. **Avatar editable:**
```
Avatar con Camera overlay on hover

Mismo pattern que:
- ProfilePage actual (línea 268-277)
- GroupDetailPage

CONSISTENTE ✅
```

3. **Badges de status:**
```
✅ Verified
⚠️ Not verified

Mismo pattern que:
- Badge component
- Alert component

CONSISTENTE ✅
```

4. **Form fields:**
```
Label + Input + Helper text
RadioGroup
Select dropdown
Switch toggle

Todos existen en:
- ProfilePage actual
- PublishFlow
- SettingsSheet

CONSISTENTE ✅
```

5. **Navigation pattern:**
```
Pantalla → Back button (top left)

Mismo que:
- ProfilePage (línea 240-248)
- PublishFlow
- MyListingsPage

CONSISTENTE ✅
```

6. **Mapa editable:**
```
Search + Map + Pin arrastrable

Mismo que:
- LocationStep en PublishFlow
- MapView

REUTILIZACIÓN ✅
```

7. **Collapsibles (si se usan):**
```
Collapsible sections

Ya existe en:
- ProfilePage actual (línea 86-89)
- SettingsSheet
- FilterSheet

CONSISTENTE ✅
```

#### Estética:

**Propuesta NO introduce:**
- ❌ Nuevos colores
- ❌ Nuevas tipografías
- ❌ Nuevos espaciados
- ❌ Nuevos borders/shadows
- ❌ Nuevos iconos (usa lucide-react)

**Propuesta SÍ usa:**
- ✅ Componentes /ui/ existentes
- ✅ Tailwind classes actuales
- ✅ Layout patterns existentes
- ✅ Navigation patterns existentes

#### Mobile-first:

```
Propuesta menciona:
"Secciones clickeables → pantallas específicas"

Pattern mobile-first:
- Tap section → Full screen view
- Back button top-left
- Save button top-right

Mismo que app actual ✅
```

#### Conclusión pregunta #6:

**Coherencia visual:** 10/10 ✅  
**No requiere nuevos componentes**  
**100% consistente con app actual**

---

### 7️⃣ **¿Soporta correctamente el Publish Flow futuro?**

### ✅ **SÍ - Soporte excelente 9/10**

#### Integración con Publish Flow:

**Propuesta define defaults para:**

1. ✅ **Location:**
```
Profile: Default Location
  ↓
PublishFlow Step 3: Location
  → Pre-filled con default
  → Usuario puede override
  → [Use profile location] button
```

2. ✅ **Contact methods:**
```
Profile: Default Contact Methods
  ☑ In-app chat
  ☑ WhatsApp
  
PublishFlow Step 4: Contact
  → Pre-checked con defaults
  → Usuario puede ajustar
```

3. ✅ **Delivery methods:**
```
Profile: Default Delivery
  ☑ Pickup
  ☑ Local delivery
  
PublishFlow Step 4: Delivery
  → Pre-checked con defaults
  → Usuario puede override
```

4. ✅ **Visibility:**
```
Profile: Default Visibility
  ○ Public (selected)
  
PublishFlow Step 4: Visibility
  → Pre-selected Public
  → Usuario puede cambiar
```

5. ✅ **Currency:**
```
Profile: Default Currency
  [CLP ▼]
  
PublishFlow Step 2: Price
  Price: [___] [CLP ▼] ← Pre-selected
```

#### Reducción de fricción en Publish Flow:

**SIN defaults (actual):**
```
PublishFlow:
Step 1: Upload ✅
Step 2: Title, desc, price [___] [USD ▼] ← Usuario elige
Step 3: Location [___] ← Usuario busca/GPS
Step 4: 
  Contact: [ ] Chat [ ] WhatsApp [ ] Phone ← Usuario marca
  Delivery: [ ] Pickup [ ] Delivery ← Usuario marca
  Visibility: ○ Public ○ Groups ○ Private ← Usuario elige
Step 5: Preview

5 decisiones manuales cada vez
```

**CON defaults (propuesta):**
```
PublishFlow:
Step 1: Upload ✅
Step 2: Title, desc, price [___] [CLP ▼] ← Pre-filled ✅
Step 3: Location [Viña del Mar ▼] ← Pre-filled ✅
         [Use profile location] → 1 tap
Step 4:
  Contact: [✓] Chat [✓] WhatsApp [ ] Phone ← Pre-filled ✅
  Delivery: [✓] Pickup [✓] Delivery ← Pre-filled ✅
  Visibility: ● Public ○ Groups ○ Private ← Pre-filled ✅
Step 5: Preview

Solo review, sin decisiones repetitivas
Usuario puede [Next] → [Next] → [Next] → [Publish]
Tiempo reducido ~60%
```

#### Código actual ya usa Profile location:

```typescript
// LocationStep.tsx línea 40-42:
const hasProfileLocation = currentUser?.location?.city 
  && currentUser?.location?.region;
const initialSource: LocationSource = 
  hasProfileLocation ? 'profile' : 'gps';

// PublishFlow YA integra con Profile ✅
```

**Propuesta mejora esto:**
```
Actual: Solo ciudad/región (texto)
Propuesta: + Coordinates + Precision

Mejor integración
```

#### Validación pre-publish:

**Propuesta habilita:**
```typescript
// Pre-publish check:
if (!profile.publishingDefaults.isComplete) {
  showDialog({
    title: "Complete your profile first",
    message: "Set up publishing defaults to create listings faster",
    actions: [
      { label: "Go to Profile", onClick: navigateToProfile },
      { label: "Skip for now", onClick: continueToPublish }
    ]
  });
}

// Usuario puede:
- Completar Profile primero (recommended)
- Skip y llenar manual en Publish Flow
```

**Flujo óptimo:**
```
New user:
1. Sign up
2. Onboarding → "Set up your profile"
3. Complete Publication Information
4. Profile ready ✅

5. Create listing
   → All defaults pre-filled
   → Fast publishing
   → Better UX
```

#### Casos edge:

**¿Qué pasa si usuario cambia defaults mid-flow?**

```
Usuario en PublishFlow Step 3

Tap [Edit defaults] (link discreto)
  → Opens Profile > Publication Information
  → User edits
  → Tap Back
  → Returns to PublishFlow
  → Defaults updated ✅

Flow handled correctly
```

**¿Defaults se aplican a drafts?**

```
User saves draft with defaults:
{
  title: "MacBook Pro",
  location: profile.defaultLocation, ✅
  contact: profile.defaultContactMethods, ✅
  ...
}

User edits profile defaults

Draft should:
- Keep original values (snapshot)
- NOT auto-update with new defaults

Propuesta debe aclarar esto
```

#### Conclusión pregunta #7:

**Soporte Publish Flow:** 9/10 ✅

**Beneficios:**
- ✅ Reduce decisiones en cada publicación
- ✅ Tiempo de publicación -60%
- ✅ UX consistente
- ✅ Onboarding más claro

**Mejora sugerida:**
- Clarificar comportamiento con drafts
- Especificar si defaults son snapshots o referencias

---

## 📊 SCORE FINAL POR DIMENSIÓN

| Dimensión | Score | Análisis |
|-----------|-------|----------|
| **1. Navegación clara** | 9/10 | ✅ Jerarquía buena (considerar flatear) |
| **2. Flujos definidos** | 7.6/10 | 🟡 Algunos vagos (Location, Organization) |
| **3. Publication Info claro** | 8/10 | ✅ Claro (renombrar a "Publishing Defaults") |
| **4. Scope correcto** | 7/10 | 🟡 Sobra: Location overlap, Organization |
| **5. Sin fricción** | 6/10 | 🟡 Navegación profunda, overlap location |
| **6. Coherencia visual** | 10/10 | ✅ Perfecto, usa componentes existentes |
| **7. Soporte Publish Flow** | 9/10 | ✅ Excelente integración |
| **PROMEDIO** | **8.1/10** | ✅ **Buena propuesta con ajustes** |

---

## ✅ RECOMENDACIONES FINALES

### 🔴 **CRÍTICO - Resolver antes de implementar:**

#### **1. Eliminar overlap Location/Addresses**

**Problema:**
- Default Location (3.1) vs Addresses (4) confunden
- Mismo propósito desde perspectiva usuario

**Solución A:** Unificar ⭐ RECOMENDADO
```
Eliminar "Default Location" sección

Usar Addresses:
- Lista de addresses
- Una marcada como "⭐ Default for listings"
- Esa se usa en PublishFlow

SIMPLIFICACIÓN
```

**Solución B:** Clarificar completamente
```
Renombrar:
"Default Location" → "Public Location Display"
  → Solo ciudad/región
  → NO address exacta
  → Para mostrar en listings públicos
  
"Addresses" → "Delivery Addresses"
  → Privadas
  → Exactas
  → Para delivery/meetups
  → Nunca se publican

Documentar diferencia claramente
```

---

#### **2. Flatear Publication Information**

**Problema:**
- 3 niveles navegación (Profile → Publication → Location)
- +5 taps vs actual
- Fricción innecesaria

**Solución:**
```
Profile HUB directo:

┌─────────────────────────────┐
│ ACCOUNT                     │
├─────────────────────────────┤
│ Account Information      >  │
│ Personal Information     >  │
│                             │
│ PUBLISHING                  │
├─────────────────────────────┤
│ Default Location         >  │ ← Directo
│ Default Contact          >  │ ← Directo
│ Default Delivery         >  │ ← Directo
│ Default Visibility       >  │ ← Directo
│ Default Currency         >  │ ← Directo
│                             │
│ OTHER                       │
├─────────────────────────────┤
│ Addresses                >  │
│ Language & Region        >  │
└─────────────────────────────┘

2 niveles solamente
Más rápido
```

---

### 🟡 **IMPORTANTE - Aclarar antes de implementar:**

#### **3. Definir scope Organization/Store**

**Opciones:**

**A) Simple toggle (mínimo viable):**
```
Account Information
  Account type:
    ○ Individual
    ○ Business
    
  [If Business]
  Business name: [____]
  
SIMPLE, cabe en Account Info
```

**B) Feature completo (futuro):**
```
MenuSheet (top level)
  ├─ Profile (personal)
  ├─ Organization (business dashboard) ← Nuevo
  │   ├─ Organization profile
  │   ├─ Team management
  │   ├─ Analytics
  │   └─ Settings
  ├─ Settings
  └─ Billing

NO en Profile, scope independiente
```

**Recomendación:** Empezar con A, evolucionar a B

---

#### **4. Clarificar verificación flows**

**Especificar:**
```
Email verification:
1. User enters new email
2. Send code
3. User enters code
4. Email verified ✅

Phone verification:
1. User enters phone with country code
2. Send SMS
3. User enters code
4. Phone verified ✅

Identity verification (futuro):
1. Upload ID photo
2. Take selfie
3. AI validates
4. Manual review (if needed)
5. Identity verified ✅

Documentar cada flujo
```

---

### 🟢 **MEJORAS OPCIONALES:**

#### **5. Agregar quick actions en HUB**

```
Profile HUB

Si Publication Info incompleto:
┌──────────────────────────────┐
│ ⚠️ Publishing setup: 3/5     │
│                              │
│ [Quick setup wizard]         │
│ Complete in 2 minutes        │
└──────────────────────────────┘

Wizard flow:
  Step 1: Location
  Step 2: Contact & Delivery
  Step 3: Visibility & Currency
  Done ✅

Onboarding optimizado
```

---

#### **6. Mostrar preview en Publication Info**

```
Publication Information

Your defaults:
┌──────────────────────────────┐
│ 📍 Viña del Mar, Chile       │
│ 💬 WhatsApp • In-app chat    │
│ 🚚 Pickup • Local delivery   │
│ 🌐 Public visibility         │
│ 💵 CLP                       │
└──────────────────────────────┘

These will be used for new listings

Usuario ve summary antes de editar
```

---

#### **7. Renombrar secciones más claro**

```
Actual propuesta → Más claro:

"Account Information" → "Account & Security"
"Personal Information" → "Public Profile"
"Publication Information" → "Publishing Defaults" ⭐
"Addresses" → "Saved Addresses"
"Language & Region" → "Language & Region" ✅
"Organization / Store" → "Business Account"

Más descriptivo
```

---

## 📋 CHECKLIST DE IMPLEMENTACIÓN

### ANTES de implementar:

- [ ] **Resolver Location/Addresses overlap:**
  - [ ] Decidir: Unificar o Clarificar
  - [ ] Documentar propósito de cada uno
  - [ ] Definir qué se publica y qué no

- [ ] **Flatear navegación:**
  - [ ] Eliminar "Publication Information" HUB intermedio
  - [ ] Poner subsecciones directo en Profile HUB
  - [ ] Reducir de 3 a 2 niveles

- [ ] **Definir Organization scope:**
  - [ ] MVP: Simple toggle en Account Info
  - [ ] Futuro: Standalone dashboard
  - [ ] Documentar roadmap

- [ ] **Especificar verification flows:**
  - [ ] Email verification
  - [ ] Phone verification
  - [ ] Identity verification (futuro)

### DURANTE implementación:

- [ ] **Profile HUB:**
  - [ ] Avatar editable
  - [ ] Name, username, plan badge
  - [ ] Status completitud (✅ / ⚠️)
  - [ ] Lista de secciones clickeables
  - [ ] CTA contextual

- [ ] **Account Information:**
  - [ ] Email con badge verified
  - [ ] Phone con badge verified
  - [ ] Login method (readonly)
  - [ ] Username editable
  - [ ] Change password

- [ ] **Personal Information:**
  - [ ] Display name
  - [ ] Bio (150 chars)
  - [ ] Avatar upload
  - [ ] Preview perfil público
  - [ ] Privacy toggles

- [ ] **Publishing Defaults:**
  - [ ] Default Location (o eliminar si unifica con Addresses)
  - [ ] Default Contact Methods
  - [ ] Default Delivery Methods
  - [ ] Default Visibility
  - [ ] Default Currency
  - [ ] Checklist completitud

- [ ] **Addresses:**
  - [ ] Lista addresses
  - [ ] Add/Edit flow con mapa
  - [ ] Label, type, instructions
  - [ ] Mark as default
  - [ ] Delete con confirmación

- [ ] **Language & Region:**
  - [ ] Language selector
  - [ ] Region selector
  - [ ] Format preview

- [ ] **Business Account (si MVP):**
  - [ ] Account type toggle
  - [ ] Business name field

### TESTING:

- [ ] **Flujo completo nuevo usuario:**
  - [ ] Sign up
  - [ ] Complete profile
  - [ ] Set publishing defaults
  - [ ] Create first listing
  - [ ] Verify defaults applied

- [ ] **Edición defaults:**
  - [ ] Edit location
  - [ ] Edit contact
  - [ ] Edit delivery
  - [ ] Verify changes persist

- [ ] **Integración Publish Flow:**
  - [ ] Defaults pre-filled
  - [ ] Override works
  - [ ] No defaults → manual input

---

## 🚨 RIESGOS

### ALTO RIESGO:

- 🔴 **Location/Addresses overlap confunde usuarios**
  - Mitigation: Unificar sistemas

- 🔴 **Navegación 3 niveles frustra**
  - Mitigation: Flatear a 2 niveles

### MEDIO RIESGO:

- 🟡 **Organization scope crece sin control**
  - Mitigation: MVP simple primero

- 🟡 **Verificación flows no claros**
  - Mitigation: Especificar antes

### BAJO RIESGO:

- 🟢 **Usuarios no encuentran checklist**
  - Mitigation: Ubicación top HUB

---

## ✅ CONCLUSIÓN EJECUTIVA

**La propuesta de Profile modular es BUENA (8.1/10) con ajustes críticos:**

### ✅ MANTENER:
- Estructura por secciones clickeables ✅
- Componentes UI existentes ✅
- Navigation pattern ✅
- Publishing defaults concept ✅
- Addresses CRUD completo ✅
- Language & Region ✅

### ❌ AJUSTAR:
- **Eliminar overlap Location/Addresses** 🔴
- **Flatear Publication Information** 🔴
- **Clarificar Organization scope** 🟡
- **Especificar verification flows** 🟡
- **Ubicación clara de checklist** 🟡

### 🎯 RESULTADO ESPERADO:

**Profile modular ajustado:**
- Navegación 2 niveles (no 3)
- No overlap conceptual
- Flujos bien definidos
- Integración perfecta con Publish Flow
- Reduce tiempo publicación ~60%
- UX consistente con app

**Esfuerzo:** Alto (nueva arquitectura)  
**Impacto:** Muy alto (mejora UX significativa)  
**Prioridad:** Alta (bloquea Publish Flow mejorado)

---

**Feedback completado:** 15 Diciembre 2025  
**Próximo paso:** Aprobar ajustes críticos y crear spec detallada
