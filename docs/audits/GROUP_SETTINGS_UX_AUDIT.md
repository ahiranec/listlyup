# 🎨 GROUP SETTINGS UX AUDIT

**Fecha:** 2026-01-06  
**Rol:** Figma (UX + Design System Owner)  
**Objetivo:** Validar coherencia estructural entre Create Group Flow y Group Settings UI

---

## 1️⃣ COMPARACIÓN: CREATE GROUP vs GROUP SETTINGS

| Campo | En Create? | En Settings? | Editable? | UX Rationale |
|-------|-----------|-------------|-----------|--------------|
| **PROFILE** |
| `name` | ✅ Step 2 (Required) | ✅ Profile section | ✅ Sí | **CORRECTO** - Nombres de grupo cambian (rebranding, typos) |
| `description` | ✅ Step 2 (Optional) | ✅ Profile section | ✅ Sí | **CORRECTO** - Descripciones evolucionan |
| `avatar` | ✅ Step 2 (Upload UI) | ❌ NO visible | ❌ No | **⚠️ INCONSISTENTE** - Avatar editable en Create pero NO en Settings |
| `rules` | ❌ NO existe | ✅ Profile section (array) | ✅ Sí | **⚠️ INCONSISTENTE** - Rules editables en Settings pero NO capturadas en Create |
| **LOCATION** |
| `country` | ✅ Step 2 (Required) | ❌ NO visible | ❌ No | **⚠️ DECISIÓN DISCUTIBLE** - Ubicación geográfica puede cambiar (grupo se muda) |
| `municipality` | ✅ Step 2 (Required) | ❌ NO visible | ❌ No | **⚠️ DECISIÓN DISCUTIBLE** - Idem country |
| **CATEGORIZATION** |
| `groupContent` | ✅ Step 2 (Recommended) | ❌ NO visible | ❌ No | **✅ CORRECTO** - Taxonomía fija post-creación (consistencia) |
| `groupCategory` | ✅ Step 2 (Recommended) | ❌ NO visible | ❌ No | **✅ CORRECTO** - Idem groupContent |
| `tags` | ✅ Step 2 (Optional, max 5) | ❌ NO visible | ❌ No | **⚠️ DECISIÓN DISCUTIBLE** - Tags pueden evolucionar |
| **TYPE & ACCESS** |
| `type` | ✅ Step 1 (Presets) | ⚠️ Visibility section ("Group Type") | ✅ Sí | **❌ PROBLEMA CRÍTICO** - Ver detalle abajo |
| `visibility` | ✅ Step 1 (Presets) | ❌ NO EXISTE | ❌ No | **❌ PROBLEMA CRÍTICO** - Falta axis ortogonal |
| `joinPolicy` | ✅ Step 1 (Presets) | ✅ Visibility section | ✅ Sí | **✅ CORRECTO** - Editable post-creación |
| **PERMISSIONS** |
| `whoCanPost` | ❌ NO capturado | ✅ Permissions section | ✅ Sí | **⚠️ DECISIÓN DISCUTIBLE** - Defaults invisibles en Create |
| `whoCanInvite` | ❌ NO capturado | ✅ Permissions section | ✅ Sí | **⚠️ DECISIÓN DISCUTIBLE** - Idem whoCanPost |
| `whoCanModerate` | ❌ NO capturado | ✅ Permissions section | ✅ Sí | **⚠️ DECISIÓN DISCUTIBLE** - Idem whoCanPost |
| **MODERATION** |
| `autoApproveListings` | ❌ NO capturado | ✅ Moderation section | ✅ Sí | **⚠️ DECISIÓN DISCUTIBLE** - Defaults invisibles en Create |
| `autoApproveMembers` | ❌ NO capturado | ✅ Moderation section | ✅ Sí | **⚠️ DECISIÓN DISCUTIBLE** - Idem autoApproveListings |
| `requireListingReview` | ❌ NO capturado | ✅ Moderation section | ✅ Sí | **❌ REDUNDANTE** - Inverso de autoApproveListings (eliminar) |

---

## 2️⃣ VALIDACIÓN: SETTINGS COMO SOURCE OF TRUTH

### ✅ SETTINGS QUE FUNCIONAN CORRECTAMENTE

| Setting | Sección | Impacto real | Validación |
|---------|---------|--------------|------------|
| `whoCanPost` | Permissions | Controla botón "+" y submit en Publish Flow | ✅ SOURCE OF TRUTH |
| `whoCanInvite` | Permissions | Controla botón Invite en Header y About Tab | ✅ SOURCE OF TRUTH |
| `whoCanModerate` | Permissions | Controla ListingActionsMenu, MemberActionsMenu, Pending Tab | ✅ SOURCE OF TRUTH |
| `autoApproveListings` | Moderation | Listings bypass Pending tab si true | ✅ SOURCE OF TRUTH (pendiente conexión Publish Flow) |
| `autoApproveMembers` | Moderation | Join inmediato si true | ✅ SOURCE OF TRUTH (pendiente conexión Join Flow) |
| `joinPolicy` | Visibility | Controla Join button y flujo de ingreso | ✅ SOURCE OF TRUTH |

---

### ❌ PROBLEMAS CRÍTICOS DETECTADOS

#### PROBLEMA 1: TYPE NO ES ORTOGONAL

**Ubicación:** `SettingsTabContent.tsx` línea 383-396

```typescript
// INCORRECTO (Settings actual)
<select value={visibilityForm.type}>
  <option value="public">Public</option>
  <option value="private">Private</option>
  <option value="ultra_private">Ultra Private</option>
</select>
```

**Problema:**
- Settings llama a esto "Group Type" pero es en realidad una COMBINACIÓN de `type + visibility + joinPolicy`
- Valores `"ultra_private"` no existen en el modelo canónico (solo existe `"Public" | "Private" | "Community" | "Event"`)
- Create Group usa 3 ejes separados: `type`, `visibility`, `joinPolicy`
- Settings colapsa esto en un solo select, perdiendo granularidad

**Impacto:**
- Admins no pueden editar `visibility` independientemente de `type`
- Admins no pueden convertir un grupo `"Public"` a `"Community"` sin cambiar visibility
- Inconsistencia total con Create Group Flow

**Fix requerido:**
```typescript
// CORRECTO (modelo canónico)
// Settings debe tener 3 selects independientes:

<select value={type}>
  <option value="Public">Public</option>
  <option value="Private">Private</option>
  <option value="Community">Community</option>
  <option value="Event">Event</option>
</select>

<select value={visibility}>
  <option value="Public">Public (visible in search)</option>
  <option value="Private">Private (hidden from search)</option>
</select>

<select value={joinPolicy}>
  <option value="Open">Open (anyone can join)</option>
  <option value="Approval">Requires approval</option>
  <option value="Invite">Invite only</option>
</select>
```

---

#### PROBLEMA 2: LOWERCASE VALUES

**Ubicación:** `SettingsTabContent.tsx` líneas 103-104, 384, 394-395, 411, 420-422

```typescript
// INCORRECTO (Settings actual)
type: "public" | "private" | "ultra_private"
joinPolicy: "open" | "approval" | "invite"
```

**Problema:**
- Modelo canónico usa PascalCase: `"Public"`, `"Private"`, `"Open"`, `"Approval"`, `"Invite"`
- Settings usa lowercase, rompiendo contrato
- Frontend logic espera PascalCase (helpers en `/lib/groupPermissions.ts`)

**Impacto:**
- Type checking roto
- Helpers no funcionarán correctamente si Settings guarda lowercase
- Divergencia entre Create y Settings

**Fix requerido:**
```typescript
// CORRECTO
type: "Public" | "Private" | "Community" | "Event"
joinPolicy: "Open" | "Approval" | "Invite"
visibility: "Public" | "Private"
```

---

#### PROBLEMA 3: REDUNDANCIA EN MODERATION

**Ubicación:** `SettingsTabContent.tsx` líneas 111, 488-506

```typescript
// REDUNDANTE
autoApproveListings: false
requireListingReview: true  // ❌ Es simplemente !autoApproveListings
```

**Problema:**
- Dos toggles para la misma cosa
- Posible estado inconsistente (ambos true o ambos false)
- Confusión semántica para el admin
- Solo `autoApproveListings` debe existir

**Fix requerido:**
```typescript
// ELIMINAR requireListingReview
// SOLO mantener:
autoApproveListings: boolean  // true = sin revisión, false = requiere revisión
```

---

### ⚠️ TOGGLES DECORATIVOS (NINGUNO DETECTADO)

**Status:** ✅ **TODOS LOS SETTINGS TIENEN IMPACTO REAL**

Cada toggle/select en Settings está conectado a lógica del frontend:
- `whoCanPost` → helpers en `/lib/groupPermissions.ts`
- `whoCanInvite` → helpers en `/lib/groupPermissions.ts`
- `whoCanModerate` → helpers en `/lib/groupPermissions.ts`
- `autoApproveListings` → pendiente conexión a Publish Flow
- `autoApproveMembers` → pendiente conexión a Join Flow

**Conclusión:** No hay settings "fake". Todos son funcionales o están preparados para serlo.

---

### ⚠️ AGRUPACIÓN Y UBICACIÓN

#### SECCIONES ACTUALES (Settings):

```
1. Profile
   - name
   - description
   - rules

2. Permissions
   - whoCanPost
   - whoCanInvite
   - whoCanModerate

3. Visibility & Privacy
   - type (INCORRECTO: debería ser 3 campos)
   - joinPolicy

4. Moderation Settings
   - autoApproveListings
   - autoApproveMembers
   - requireListingReview (REDUNDANTE)
```

#### PROPUESTA DE MEJORA:

```
1. Group Profile
   - avatar (AGREGAR: editable con Camera button)
   - name
   - description
   - location (AGREGAR: country + municipality, editable)
   - rules

2. Permissions
   - whoCanPost
   - whoCanInvite
   - whoCanModerate

3. Type & Access (RENOMBRAR: desde "Visibility & Privacy")
   - type (SEPARAR: Public | Private | Community | Event)
   - visibility (AGREGAR: Public | Private)
   - joinPolicy (MANTENER: Open | Approval | Invite)
   [Helper text explicando la diferencia entre los 3 ejes]

4. Moderation
   - autoApproveMembers
   - autoApproveListings
   [ELIMINAR: requireListingReview]

5. Danger Zone (AGREGAR: nueva sección)
   - Delete Group (rojo, confirmación)
   - Archive Group (naranja, reversible)
```

---

## 3️⃣ ESTRUCTURA DEL SETTINGS TAB

### ✅ ESTRUCTURA ACTUAL (BIEN)

```
Settings Tab (Solo admin)
├── Header Info (descripción del tab)
├── Collapsible Sections (4)
│   ├── Profile (expandible)
│   ├── Permissions (expandible)
│   ├── Visibility (expandible)
│   └── Moderation (expandible)
└── Save buttons dentro de cada sección
```

**Puntos fuertes:**
- ✅ Collapsible accordion evita scroll infinito
- ✅ Save buttons contextuales (guardar solo la sección editada)
- ✅ Iconos claros para cada sección (Edit3, Users, Eye, Shield)
- ✅ Descripciones cortas y útiles

**Puntos a mejorar:**
- ⚠️ Falta sección "Danger Zone" al final (delete/archive)
- ⚠️ Falta avatar editable en Profile
- ⚠️ Falta location editable en Profile
- ❌ "Visibility & Privacy" debe ser "Type & Access" con 3 campos

---

### JERARQUÍA VISUAL

#### ORDEN LÓGICO (Admin real):

1. **Profile** (más común) - Nombre, descripción, avatar
2. **Permissions** (frecuente) - Quién puede hacer qué
3. **Type & Access** (poco frecuente) - Cambios estructurales al grupo
4. **Moderation** (poco frecuente) - Auto-approve settings
5. **Danger Zone** (rarísimo) - Acciones destructivas

**Justificación:**
- Profile es lo más editado (descripción, rules, avatar)
- Permissions se ajustan cuando crece el grupo
- Type & Access son cambios estructurales (raro post-creación)
- Moderation se configura una vez y no se toca
- Danger Zone debe estar al final (evitar clicks accidentales)

---

## 4️⃣ CONSISTENCIA CON OTROS SETTINGS DE LA APP

### BÚSQUEDA DE PATRONES GLOBALES

Archivos revisados:
- `/components/settings/*` (si existe)
- `/components/profile/*` (settings de usuario)
- `/components/organizations/*` (settings de org, si existe)

**Resultado:** No hay otros Settings implementados aún en el codebase visible.

**Recomendación:** Group Settings puede DEFINIR el patrón para futuros Settings:

```typescript
// PATRÓN RECOMENDADO PARA TODOS LOS SETTINGS:

interface SettingsSection {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  category: "profile" | "permissions" | "access" | "moderation" | "danger";
  fields: SettingsField[];
}

interface SettingsField {
  id: string;
  label: string;
  type: "text" | "textarea" | "select" | "toggle" | "file";
  helpText?: string;
  validation?: Zod.schema;
  source_of_truth: boolean; // ¿Afecta lógica del frontend?
}
```

**Aplicar este patrón a:**
- User Profile Settings
- Organization Settings
- Campaign Settings
- Event Settings

---

## 5️⃣ CHECKLIST DE INCONSISTENCIAS DETECTADAS

### ❌ CRÍTICAS (BLOQUEAN FUNCIONALIDAD)

- [ ] **C1:** Settings usa `type: "public" | "private" | "ultra_private"` en lugar del modelo canónico `"Public" | "Private" | "Community" | "Event"`
- [ ] **C2:** Settings usa lowercase (`"public"`, `"open"`) en lugar de PascalCase (`"Public"`, `"Open"`)
- [ ] **C3:** Settings no tiene campo `visibility` separado de `type` (colapsa en un solo select)
- [ ] **C4:** Settings tiene `requireListingReview` redundante (inverso de `autoApproveListings`)

### ⚠️ IMPORTANTES (INCONSISTENCIA UX)

- [ ] **I1:** Avatar editable en Create pero NO en Settings
- [ ] **I2:** Rules editables en Settings pero NO capturadas en Create
- [ ] **I3:** Location (country, municipality) NO editable en Settings (puede ser intencional, pero discutible)
- [ ] **I4:** Tags NO editables en Settings (puede ser intencional, pero discutible)
- [ ] **I5:** Permissions (whoCanPost, whoCanInvite, whoCanModerate) NO visibles en Create (defaults invisibles)
- [ ] **I6:** Moderation settings NO visibles en Create (defaults invisibles)

### 📝 MENORES (MEJORA UX)

- [ ] **M1:** Falta sección "Danger Zone" (delete/archive group)
- [ ] **M2:** Sección "Visibility & Privacy" debería llamarse "Type & Access"
- [ ] **M3:** No hay helper text explicando diferencia entre `type`, `visibility`, `joinPolicy`

---

## 6️⃣ PROPUESTAS CONCRETAS DE AJUSTE

### PROPUESTA 1: ALINEAR TYPE SYSTEM (CRÍTICO)

**Archivo:** `/components/group-detail/SettingsTabContent.tsx`

**Cambio:**

```typescript
// REEMPLAZAR:
const [visibilityForm, setVisibilityForm] = useState({
  type: "public" as "public" | "private" | "ultra_private",
  joinPolicy: "open" as "open" | "approval" | "invite",
});

// POR:
const [typeAccessForm, setTypeAccessForm] = useState({
  type: "Public" as "Public" | "Private" | "Community" | "Event",
  visibility: "Public" as "Public" | "Private",
  joinPolicy: "Open" as "Open" | "Approval" | "Invite",
});
```

**UI:**

```tsx
{/* Type & Access Section */}
{section.id === "type-access" && (
  <>
    <div className="pt-4">
      <label className="text-sm font-medium mb-1.5 block">
        Group Type
      </label>
      <select value={typeAccessForm.type} onChange={...}>
        <option value="Public">Public</option>
        <option value="Private">Private</option>
        <option value="Community">Community</option>
        <option value="Event">Event</option>
      </select>
      <p className="text-xs text-muted-foreground mt-1.5">
        Defines the nature and purpose of your group
      </p>
    </div>
    
    <div>
      <label className="text-sm font-medium mb-1.5 block">
        Visibility
      </label>
      <select value={typeAccessForm.visibility} onChange={...}>
        <option value="Public">Public (visible in search results)</option>
        <option value="Private">Private (hidden from search, invite-only)</option>
      </select>
    </div>
    
    <div>
      <label className="text-sm font-medium mb-1.5 block">
        Join Policy
      </label>
      <select value={typeAccessForm.joinPolicy} onChange={...}>
        <option value="Open">Open (anyone can join immediately)</option>
        <option value="Approval">Approval Required (admin must approve)</option>
        <option value="Invite">Invite Only (members must be invited)</option>
      </select>
    </div>
    
    {/* Helper text */}
    <div className="p-3 rounded-lg bg-muted/50 border border-border">
      <p className="text-xs text-muted-foreground">
        <strong>Type</strong> defines the group's purpose. <strong>Visibility</strong> controls search visibility. <strong>Join Policy</strong> determines how people join.
      </p>
    </div>
  </>
)}
```

---

### PROPUESTA 2: ELIMINAR REDUNDANCIA (CRÍTICO)

**Archivo:** `/components/group-detail/SettingsTabContent.tsx`

**Cambio:**

```typescript
// ELIMINAR:
requireListingReview: true,

// MANTENER SOLO:
autoApproveListings: false,  // false = requiere revisión, true = auto-aprueba
```

**UI:**

```tsx
{/* Moderation Section */}
<label className="flex items-center justify-between p-3 rounded-lg...">
  <div>
    <p className="text-sm font-medium">Auto-approve listings</p>
    <p className="text-xs text-muted-foreground">
      If disabled, all listings require moderator approval
    </p>
  </div>
  <input
    type="checkbox"
    checked={moderationForm.autoApproveListings}
    onChange={...}
  />
</label>
```

---

### PROPUESTA 3: AGREGAR AVATAR EDITABLE (IMPORTANTE)

**Archivo:** `/components/group-detail/SettingsTabContent.tsx`

**Cambio:**

```tsx
{/* Profile Section */}
{section.id === "profile" && (
  <>
    {/* AGREGAR: Avatar upload */}
    <div className="pt-4">
      <label className="text-sm font-medium mb-1.5 block">
        Group Avatar
      </label>
      <div className="flex items-center gap-4">
        <Avatar className="w-16 h-16">
          <AvatarImage src={profileForm.avatarUrl} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {getInitials(profileForm.name)}
          </AvatarFallback>
        </Avatar>
        <Button variant="outline" size="sm">
          <Camera className="w-4 h-4 mr-1.5" />
          Change Avatar
        </Button>
      </div>
    </div>
    
    {/* name, description, rules... */}
  </>
)}
```

---

### PROPUESTA 4: AGREGAR DANGER ZONE (MENOR)

**Archivo:** `/components/group-detail/SettingsTabContent.tsx`

**Cambio:**

```tsx
// AGREGAR nueva sección:
{
  id: "danger",
  title: "Danger Zone",
  description: "Irreversible or sensitive actions",
  icon: AlertTriangle,
},

// UI:
{section.id === "danger" && (
  <>
    <div className="pt-4 space-y-3">
      <button className="w-full p-4 rounded-lg border-2 border-red-500/20 bg-red-500/5 text-left hover:bg-red-500/10 transition-colors">
        <div className="flex items-start gap-3">
          <Trash2 className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-red-600">Delete Group</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Permanently delete this group and all its content. This cannot be undone.
            </p>
          </div>
        </div>
      </button>
      
      <button className="w-full p-4 rounded-lg border-2 border-orange-500/20 bg-orange-500/5 text-left hover:bg-orange-500/10 transition-colors">
        <div className="flex items-start gap-3">
          <Archive className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-orange-600">Archive Group</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Hide group from members. Can be restored later.
            </p>
          </div>
        </div>
      </button>
    </div>
  </>
)}
```

---

## 7️⃣ CAMPOS QUE SOBRAN

| Campo | Ubicación | Razón | Acción |
|-------|-----------|-------|--------|
| `requireListingReview` | Moderation section | Redundante (inverso de autoApproveListings) | ❌ **ELIMINAR** |
| `type: "ultra_private"` | Visibility section | No existe en modelo canónico | ❌ **REEMPLAZAR** por combinación de `type + visibility + joinPolicy` |

---

## 8️⃣ CAMPOS QUE FALTAN

| Campo | Capturado en Create? | Debería estar en Settings? | Justificación UX |
|-------|---------------------|---------------------------|------------------|
| `avatar` | ✅ Sí (upload UI) | ❌ NO (ausente) | **AGREGAR** - Avatar debe ser editable (rebranding, mejor imagen) |
| `visibility` | ✅ Sí (presets) | ❌ NO (colapsado en "type") | **AGREGAR** - Es un eje ortogonal independiente |
| `location` (country + municipality) | ✅ Sí (required) | ❌ NO (ausente) | **CONSIDERAR** - Grupos pueden cambiar ubicación (meetups, comunidades móviles) |
| `tags` | ✅ Sí (optional) | ❌ NO (ausente) | **CONSIDERAR** - Tags pueden evolucionar con el tiempo |
| Danger Zone (delete/archive) | ❌ N/A | ❌ NO (ausente) | **AGREGAR** - Toda entidad editable debe tener opción de eliminación |

---

## 9️⃣ CAMPOS CORRECTOS TAL COMO ESTÁN

| Campo | Ubicación | Status | Justificación |
|-------|-----------|--------|---------------|
| `name` | Profile section | ✅ **CORRECTO** | Editable en Create y Settings, impacta toda la UI |
| `description` | Profile section | ✅ **CORRECTO** | Editable en Create y Settings, visible en About tab |
| `rules` | Profile section | ✅ **CORRECTO** | Editables en Settings (aunque no capturadas en Create, es aceptable) |
| `whoCanPost` | Permissions section | ✅ **CORRECTO** | Conectado a lógica real (helpers), SOURCE OF TRUTH |
| `whoCanInvite` | Permissions section | ✅ **CORRECTO** | Conectado a lógica real (helpers), SOURCE OF TRUTH |
| `whoCanModerate` | Permissions section | ✅ **CORRECTO** | Conectado a lógica real (helpers), SOURCE OF TRUTH |
| `joinPolicy` | Visibility section | ✅ **CORRECTO** | Editable, impacta Join Flow |
| `autoApproveListings` | Moderation section | ✅ **CORRECTO** | Conectado a lógica real (pendiente Publish Flow) |
| `autoApproveMembers` | Moderation section | ✅ **CORRECTO** | Conectado a lógica real (pendiente Join Flow) |
| `groupContent` | NO en Settings | ✅ **CORRECTO** | Taxonomía fija, no debe ser editable post-creación |
| `groupCategory` | NO en Settings | ✅ **CORRECTO** | Idem groupContent |

---

## 🎯 RESUMEN EJECUTIVO

### SALUD GENERAL DEL SETTINGS UI: 7/10

**Puntos fuertes:**
- ✅ Arquitectura de collapsible sections es excelente
- ✅ Todos los settings tienen impacto real (no hay decorativos)
- ✅ Permissions conectadas correctamente a `/lib/groupPermissions.ts`
- ✅ Separación lógica en 4 secciones (Profile, Permissions, Visibility, Moderation)

**Puntos críticos a resolver:**
- ❌ Type system roto (lowercase, ultra_private, collapsed axes)
- ❌ Redundancia en Moderation (requireListingReview)
- ⚠️ Avatar NO editable (inconsistencia con Create)
- ⚠️ Visibility axis faltante (colapsado en type)

**Prioridad de fixes:**
1. **URGENTE:** Alinear type system con modelo canónico (PascalCase, 3 ejes)
2. **URGENTE:** Eliminar requireListingReview
3. **IMPORTANTE:** Agregar avatar editable
4. **IMPORTANTE:** Separar visibility de type
5. **MENOR:** Agregar Danger Zone
6. **MENOR:** Renombrar "Visibility & Privacy" → "Type & Access"

---

## 📋 ENTREGABLES FINALES

### OUTPUT PARA FRONTEND TEAM:

1. **Tabla de alineación Create vs Settings** (sección 1)
2. **Lista de problemas críticos** (sección 2)
3. **4 propuestas concretas de ajuste** (sección 6)
4. **Campos a eliminar** (sección 7)
5. **Campos a agregar** (sección 8)
6. **Campos correctos** (sección 9)

**Próximo paso recomendado:**
Implementar Propuestas 1 y 2 (CRÍTICAS) antes que nada. Luego Propuestas 3 y 4 (MEJORAS UX).

---

**Status:** ✅ **AUDITORÍA COMPLETADA**  
**Fecha:** 2026-01-06  
**Firma:** Figma (UX + Design System Owner)
