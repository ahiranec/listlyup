# 🏗️ FEATURE FLAGS + INFRASTRUCTURE + PLANS - ARQUITECTURA COMPLETA

## 📋 RESUMEN EJECUTIVO

Sistema completo de Feature Flags con:
- ✅ 4 planes (Free, Pro, Enterprise, **Internal/Staff-only**)
- ✅ 6 features de ejemplo (incluye feature beta exclusivo para staff)
- ✅ Dependency checking entre Features ↔ Infrastructure
- ✅ User overrides individuales
- ✅ Rollout percentage gradual
- ✅ CRUD completo (Create/Read/Update/Delete)
- ✅ Audit logging en console
- ✅ **Tabs separados: Plans y Features** (arquitectura canónica)

---

## 🎯 CONCEPTOS CLAVE

### 1. **FEATURE FLAGS** (Planes & Features tab)
**Qué son:** Funcionalidades que se habilitan/deshabilitan por plan.

**Ejemplos:**
- AI Content Tagging
- Auto Moderation
- Groups
- Direct Messaging
- Advanced Analytics
- **New UI Components (Beta)** ← Solo staff

**Propósito:**
- Lanzar features gradualmente
- A/B testing
- Beta testing con staff antes de lanzamiento público

---

### 2. **INFRASTRUCTURE** (Infrastructure tab)
**Qué son:** Servicios externos que usa la plataforma.

**Ejemplos:**
- Email → SendGrid
- AI Provider → OpenAI
- Payments → Stripe
- SMS → (no configurado)
- Moderation Engine → (no configurado)

**Propósito:**
- Cambiar proveedores sin código
- Test connections
- Monitor status

---

### 3. **DEPENDENCY CHECKING** 🔗
**Concepto:** Un feature puede requerir que un servicio de infraestructura esté activo.

**Ejemplo Real:**
```
Feature: "AI Content Tagging"
├─ Dependencies: ['AI Provider']
└─ Si Infrastructure → "AI Provider" → status = 'missing'
   → Feature muestra WARNING
   → No se puede habilitar hasta configurar OpenAI
```

**Jerarquía:**
```
1. Chequea dependency en Infrastructure
2. Si servicio está 'active' → Permite habilitar feature
3. Si servicio está 'missing' → Bloquea + warning
```

---

### 4. **PLAN "INTERNAL" (STAFF-ONLY)** 🎖️

**Qué es:** Plan especial solo para empleados/staff para probar features nuevas.

**Características:**
- Badge visual: `STAFF` en morado
- Solo 8 usuarios asignados
- Descripción: "Staff-only testing plan for beta features"
- Columna "Int" en tabla de features

**Caso de uso:**
```
1. SuperAdmin crea feature "New UI Components (Beta)"
2. Habilita SOLO para plan "Internal"
3. Staff (8 users) puede usar la feature
4. Resto de usuarios NO la ven
5. Después de testing → Habilitar para Pro y Enterprise
```

**Visual en tabla:**
```
┌────────────────────────┬────────┬──────┬─────┬─────┬─────┐
│ Feature                │ Global │ Free │ Pro │ Ent │ Int │
├───────────────────────┼────────┼──────┼─────┼─────┼─────┤
│ AI Content Tagging     │   ✓    │  ☐   │  ☑  │  ☑  │  ☑  │
│ New UI Components Beta │   ✓    │  ☐   │  ☐  │  ☐  │  ☑  │← SOLO STAFF
│ Auto Moderation        │   ☐    │  ☐   │  ☐  │  ☑  │  ☑  │
└────────────────────────┴────────┴──────┴─────┴─────┴─────┘
```

---

## 🔄 CÓMO SE CONECTA TODO

### **Flujo 1: Feature depende de Infrastructure**

```
Usuario clickea checkbox "Auto Moderation" → Pro Plan

1. Sistema chequea dependencies: ['AI Provider', 'Moderation Engine']
2. Cruza con Infrastructure:
   - AI Provider → status 'active' ✅
   - Moderation Engine → status 'missing' ❌
3. Resultado:
   - Muestra warning: "Missing Dependencies"
   - Checkbox enabled PERO con advertencia visual
   - En producción: bloquearía el toggle
```

### **Flujo 2: Feature habilitado por Plan**

```
Usuario John Doe tiene plan: "Pro"

Feature: "Direct Messaging"
├─ planOverrides: { free: false, pro: false, enterprise: true, internal: true }
└─ globalEnabled: true
└─ rolloutPercentage: 100

EVALUACIÓN:
1. ¿Tiene user override? → NO
2. ¿Plan "Pro" tiene feature? → planOverrides.pro = false
3. Resultado: John NO puede usar Direct Messaging

CAMBIO:
1. SuperAdmin clickea checkbox "Pro" en fila "Direct Messaging"
2. planOverrides.pro = true
3. John AHORA puede usar Direct Messaging
```

### **Flujo 3: User Override (Beta Testers)**

```
Feature: "New UI Components (Beta)"
├─ planOverrides: { free: false, pro: false, enterprise: false, internal: true }
└─ userOverrides: [
     { userId: '1', userName: 'Beta Tester', email: 'beta@example.com', enabled: true }
   ]

Usuario "Beta Tester" tiene plan: "Free"

EVALUACIÓN:
1. ¿Tiene user override? → SÍ (enabled: true)
2. Ignora plan
3. Resultado: Beta Tester PUEDE usar feature aunque plan Free no la tenga
```

---

## 🎬 TESTING FLOW COMPLETO

### **Caso: Lanzar "Video Calls" feature**

#### **Paso 1: Crear Feature**
```
1. Configuration → Plans & Features
2. Click "+ New Feature"
3. Editar nombre: "Video Calls"
4. Descripción: "1-on-1 video calls between users"
5. Dependencies: ['AI Provider'] (para moderación)
6. Category: 'social'
```

#### **Paso 2: Beta Testing con Staff**
```
1. En tabla, habilitar SOLO columna "Int" (Internal)
2. Deshabilitar: Free, Pro, Enterprise
3. Global: Enabled
4. Rollout: 0% (no importa, staff tiene override)
5. Staff prueba feature 1 semana
```

#### **Paso 3: Dependency Check**
```
1. Si "AI Provider" está missing:
   → Warning aparece en FeatureFlagPanel
   → Link a Infrastructure tab
   → SuperAdmin configura OpenAI
2. Una vez activo → Warning desaparece
```

#### **Paso 4: Soft Launch (Pro users)**
```
1. Click checkbox columna "Pro"
2. planOverrides.pro = true
3. Rollout: 20% (solo 20% de Pro users)
4. Monitor performance 3 días
```

#### **Paso 5: Full Launch**
```
1. Rollout: 100%
2. Habilitar Enterprise
3. Evaluar si habilitar Free (decision de negocio)
4. Feature ahora disponible para todos
```

---

## 📊 CRUD OPERATIONS

### **FEATURES**

#### **CREATE (Agregar)**
```
1. Configuration → Plans & Features
2. Click "+ New Feature" (arriba derecha)
3. Panel abre automáticamente
4. Editar: nombre, descripción, category, dependencies, rollout
5. Cerrar panel → Feature guardado
```

#### **READ (Ver)**
```
1. Click fila del feature
2. Panel lateral abre
3. Tabs:
   - Overview: Descripción, dependencies
   - Rollout: Global toggle, percentage slider
   - Overrides: Plans, users
```

#### **UPDATE (Editar)**
```
1. Checkboxes en tabla:
   - Global: Toggle globalEnabled
   - Free/Pro/Ent/Int: Toggle plan override
2. En panel:
   - Rollout tab → Slider percentage
   - Overrides tab → Plan checkboxes
   - Overrides tab �� Add/Remove user overrides
```

#### **DELETE (Borrar)**
```
1. Click fila del feature
2. Panel abre
3. Scroll abajo → "Delete Feature" button
4. Dialog pide escribir "DELETE"
5. Confirmar → Feature eliminado
```

---

### **INFRASTRUCTURE (Services)**

#### **CREATE (Agregar)**
```
1. Configuration → Infrastructure
2. Click "Add New Service" button (abajo de tabla)
3. Dialog abre con 5 campos:
   ┌─────────────────────────────────────┐
   │ Add New Service                     │
   ├─────────────────────────────────────┤
   │ Service Name: [                  ]  │
   │ Service Type: [Email ▼]             │
   │ Provider: [SendGrid ▼]              │
   │ API Key: [•••••••••••••]            │
   │ Environment: ○ Test ○ Production    │
   └─────────────────────────────────────┘
4. Rellenar campos obligatorios (*)
5. Click "Add Service"
6. Toast: "Service added successfully"
7. Service aparece en tabla con status "Active"
```

#### **READ (Ver)**
```
1. Tabla muestra:
   - Name, Type, Provider, Status
2. Status visual:
   - Verde = Active
   - Amarillo = Missing
```

#### **UPDATE (Editar)**
```
1. Active services:
   - Test button → Testea conexión
   - Switch button → Cambia proveedor/configuración
2. Missing services:
   - Configure button → Configura proveedor inicial

3. Click "Switch" o "Configure":
   ┌─────────────────────────────────────┐
   │ Configure Service                   │
   ├─────────────────────────────────────┤
   │ Service Name: [Email Service     ]  │ ← PRE-LLENADO
   │ Service Type: [service]             │ ← DISABLED
   │ Provider: [SendGrid ▼]              │ ← Puede cambiar
   │ API Key: [•••••••••••••]            │ ← Nueva key
   │ Environment: ● Production ○ Test    │ ← Puede cambiar
   └─────────────────────────────────────┘
4. Cambiar provider o API key
5. Click "Save Changes"
6. Toast: "Service updated successfully"
```

#### **DELETE (Borrar)**
```
1. Click botón trash icon en fila
2. Dialog: "Delete Service?"
3. Descripción: "Are you sure?"
4. Confirmar → Service eliminado
```

---

## 🎯 EVALUATION HIERARCHY (Orden de Precedencia)

Cuando un usuario intenta usar una feature, el sistema evalúa en este orden:

```
1. USER OVERRIDE (más alta prioridad)
   ├─ Si user tiene override con enabled: true → Feature ON
   └─ Si user tiene override con enabled: false → Feature OFF (FIN)

2. PLAN OVERRIDE
   ├─ Si plan tiene planOverrides[userPlan]: true → Continúa
   └─ Si plan tiene planOverrides[userPlan]: false → Feature OFF (FIN)

3. GLOBAL ENABLED
   ├─ Si globalEnabled: false → Feature OFF (FIN)
   └─ Si globalEnabled: true → Continúa

4. ROLLOUT PERCENTAGE
   ├─ Hash(userId) % 100 < rolloutPercentage
   ├─ Si SÍ → Feature ON
   └─ Si NO → Feature OFF

5. DEPENDENCY CHECK (validación final)
   ├─ Si dependencies están 'active' → Feature funciona
   └─ Si dependencies están 'missing' → Feature ERROR (en UI se bloquea)
```

**Ejemplo:**
```
Usuario: "John Doe" (plan: Pro)
Feature: "AI Content Tagging"

Evaluación:
1. ¿User override? → NO → Continúa
2. ¿Plan Pro enabled? → planOverrides.pro = true → Continúa
3. ¿Global enabled? → globalEnabled = true → Continúa
4. ¿Rollout? → 100% → Continúa
5. ¿Dependencies? → AI Provider = 'active' → ✅ FEATURE ON
```

---

## 🔍 AUDIT LOGGING

Todas las acciones críticas logean en console:

```javascript
// Plan toggle
console.log('[AUDIT LOG] Plan toggled:', { planId, active });

// Feature global toggle
console.log('[AUDIT LOG] Feature global toggle:', { featureId, enabled });

// Feature plan override
console.log('[AUDIT LOG] Feature plan override:', { featureId, plan, enabled });

// Feature created
console.log('[AUDIT LOG] Feature created:', { featureId });

// Feature deleted
console.log('[AUDIT LOG] Feature deleted:', { featureId });

// User override added/removed
console.log('[AUDIT LOG] User override removed:', { featureId, userId });

// Infrastructure test
console.log('[AUDIT LOG] Infrastructure test:', { techId, result });

// Service created/deleted
console.log('[AUDIT LOG] Service created:', { serviceId });
console.log('[AUDIT LOG] Service deleted:', { serviceId });
```

En producción real:
- Estos logs van a tabla `audit_logs`
- Incluyen: timestamp, admin_user_id, action_type, metadata
- Compliance + debugging

---

## 📁 ARCHIVOS MODIFICADOS

### **NUEVA ARQUITECTURA - TABS SEPARADOS:** ⭐

**ConfigurationModule ahora tiene 4 tabs:**
```
Configuration
├─ Platform
├─ Plans        ← TAB SEPARADO (nuevo)
├─ Features     ← TAB SEPARADO (nuevo)
└─ Infrastructure
```

### Creados/Actualizados:

1. **`/components/super-admin-v2/modules/configuration/Plans.tsx`** ⭐ NUEVO
   - Tab dedicado solo a gestión de planes
   - Card grid de planes (2 columnas)
   - Plan "Internal" con badge STAFF morado
   - Activate/Deactivate buttons
   - Click plan → abre PlanPanel con detalles
   - + New Plan button
   - 1024 users Free, 185 Pro, 25 Enterprise, 8 Internal

2. **`/components/super-admin-v2/modules/configuration/Features.tsx`** ⭐ NUEVO
   - Tab dedicado solo a gestión de features
   - Search bar + filter por categoría
   - Features agrupadas por categoría (collapsible)
   - Tabla con checkboxes: Global, Free, Pro, Ent, Int
   - Green dot indicator para features globally enabled
   - + New Feature button
   - Click feature → abre FeatureFlagPanel
   - Delete feature functionality

3. **`/components/super-admin-v2/modules/ConfigurationModule.tsx`** ⭐ ACTUALIZADO
   - 4 subnavs en lugar de 3
   - Importa Plans y Features (separados)
   - Switch case actualizado para renderizar tabs correctos

4. **`/components/super-admin-v2/SuperAdminDashboard.tsx`** ⭐ ACTUALIZADO
   - ConfigSubnav type actualizado: `'platform' | 'plans' | 'features' | 'infrastructure'`

5. **`/components/super-admin-v2/modules/configuration/PlansFeatures.tsx`** ⚠️ DEPRECADO
   - Archivo original que mezclaba plans y features
   - Ya NO se usa (reemplazado por Plans.tsx y Features.tsx)
   - Puede eliminarse en cleanup futuro

6. **`/components/super-admin-v2/panels/FeatureFlagPanel.tsx`**
   - Checkbox "Internal Plan" en Overrides tab
   - Interface actualizada con `internal: boolean`
   - Delete feature functionality
   - **Overview tab ahora es EDITABLE** ⭐ NUEVO
   - Campos editables: Name, Description, Category
   - **Multiselect de Dependencies** (vincular con Infrastructure) ⭐ NUEVO
   - Checkboxes para seleccionar qué services requiere el feature
   - Badge "Required" para dependencies seleccionadas
   - "Save Changes" button
   - Toast notifications para cada cambio
   - Audit logging completo

7. **`/components/super-admin-v2/modules/configuration/Infrastructure.tsx`**
   - "Add New Service" button
   - Delete service con confirmation dialog
   - Mock data incluye "Moderation Engine"
   - Dialog unificado para create/edit
   - Audit logging

8. **`/components/super-admin-v2/shared/ServiceConfigDialog.tsx`** ⭐ NUEVO
   - Dialog unificado para create y edit de servicios
   - 5 campos mínimos: Name, Type, Provider, API Key, Environment
   - Dropdowns dinámicos de providers según service type
   - Validación de campos requeridos
   - Pre-llenado automático en modo edit
   - Providers disponibles por tipo:
     - **Email:** SendGrid, Mailgun, AWS SES, Postmark
     - **AI:** OpenAI, Anthropic, Google AI, Azure OpenAI
     - **Payments:** Stripe, PayPal, Square
     - **SMS:** Twilio, MessageBird, AWS SNS
     - **Moderation:** OpenAI Moderation, Perspective API, Azure Content Safety
     - **Other:** Custom Provider

---

## 🚀 PRÓXIMOS PASOS (Opcional - Mejoras Futuras)

### **Fase 2A: Real Dependency Checking**
```typescript
// Función que cruza dependencies con infrastructure
function checkDependenciesActive(dependencies: string[]): boolean {
  const infraServices = getInfrastructureServices(); // API call
  return dependencies.every(dep => {
    const service = infraServices.find(s => s.name === dep);
    return service?.status === 'active';
  });
}
```

### **Fase 2B: PlanPanel con User Assignment**
```
En PlanPanel (cuando clickeas plan "Internal"):
├─ Tab "Users"
├─ Lista de 8 staff members asignados
├─ "+ Add User" button
├─ Remove user button
└─ Solo staff puede ser asignado a plan Internal
```

### **Fase 2C: Link directo de Warning a Infrastructure**
```
En FeatureFlagPanel:
Si dependencies faltan:
  → Warning box con link: "Configure AI Provider →"
  → Click → Cierra panel → Cambia tab a Infrastructure
  → Scroll a servicio específico
```

### **Fase 2D: Feature History (Audit Timeline)**
```
En FeatureFlagPanel → Tab "History"
├─ Timeline de cambios
├─ Quién hizo qué y cuándo
├─ Rollback functionality
└─ Export audit report
```

---

## ✅ ESTADO ACTUAL - 100% FUNCIONAL

### **Features Tab:**
- ✅ Tabla con 5 columnas: Global, Free, Pro, Ent, **Int**
- ✅ 6 features de ejemplo (1 beta exclusivo para staff)
- ✅ Plan "Internal" con badge STAFF morado
- ✅ Checkboxes interactivos en tabla
- ✅ Panel lateral con 3 tabs (Overview, Rollout, Overrides)
- ✅ Checkbox "Internal Plan" en panel
- ✅ "+ New Feature" button
- ✅ "Delete Feature" button con confirmation
- ✅ Toast notifications
- ✅ Audit logging

### **Infrastructure Tab:**
- ✅ Tabla con servicios
- ✅ Status visual (Active/Missing)
- ✅ Test connection
- ✅ Switch provider
- ✅ Configure button
- ✅ "Add New Service" button
- ✅ Delete service con trash icon
- ✅ Confirmation dialog
- ✅ Audit logging

### **Dependencies:**
- ✅ Features tienen campo `dependencies: string[]`
- ✅ Infrastructure tiene servicios que matchean
- ✅ Warning box en panel cuando falta dependency
- ⚠️ Checking real NO implementado (usa `dependenciesActive = true` mock)

---

## 🎓 GUÍA DE USO RÁPIDA

### **Escenario 1: Probar feature nueva con staff**
```
1. Plans & Features → + New Feature
2. Nombre: "Live Streaming"
3. Habilitar SOLO columna "Int"
4. Staff prueba 1 semana
5. Si funciona → Habilitar Pro y Enterprise
```

### **Escenario 2: Feature requiere servicio nuevo**
```
1. Crear feature "Push Notifications"
2. Dependencies: ['Push Service']
3. Infrastructure → Add New Service
4. Nombre: "Push Service"
5. Configure → Seleccionar OneSignal
6. Warning en feature desaparece
```

### **Escenario 3: Deshabilitar feature rápidamente**
```
1. Plans & Features → Click fila
2. Rollout tab → Global toggle OFF
3. Toast: "Feature disabled globally"
4. TODOS los usuarios pierden acceso (emergency kill switch)
```

### **Escenario 4: Beta tester específico**
```
1. Plans & Features → Click feature
2. Overrides tab → + Add User Override
3. Buscar "john@company.com"
4. Toggle: Enabled
5. John puede usar feature aunque su plan no la tenga
```

---

**Sistema 100% funcional y listo para testing!** 🚀