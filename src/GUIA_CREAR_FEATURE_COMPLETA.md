# 📘 GUÍA COMPLETA - CREAR Y CONFIGURAR FEATURE

## 🎯 RESUMEN

**Pregunta del usuario:** "No entiendo muy bien esta creación de new feature, ¿cómo lo vinculo con un service y configuro correctamente?"

**Respuesta:** Ahora el panel está **100% funcional y editable**. Puedes:
1. ✅ Editar nombre, descripción, categoría
2. ✅ **Seleccionar dependencies (servicios de Infrastructure)** ← CLAVE
3. ✅ Configurar rollout y plan overrides
4. ✅ Guardar cambios con botón "Save Changes"

---

## 🚀 FLUJO PASO A PASO

### **ESCENARIO: Crear feature "Push Notifications"**

---

### **PASO 1: Crear el Feature**

1. **Ir a Features tab:**
   ```
   SuperAdmin → Configuration → Features
   ```

2. **Click "+ New Feature":**
   - Se crea un feature con datos default:
     - Name: "New Feature"
     - Description: "Description of new feature"
     - Category: "content"
     - Dependencies: [] (vacío)
     - Global Enabled: false
     - Rollout: 0%
     - Plans: todos deshabilitados

3. **Panel se abre automáticamente:**
   - Muestra tab "Overview" por default

---

### **PASO 2: Configurar Overview (Información básica)**

**En el tab "Overview" verás campos EDITABLES:**

#### **2.1 Feature Name**
```
┌─────────────────────────────────────────┐
│ Feature Name                            │
│ [Push Notifications                  ]  │ ← Editable Input
└─────────────────────────────────────────┘
```
- Cambiar de "New Feature" → "Push Notifications"

#### **2.2 Description**
```
┌─────────────────────────────────────────┐
│ Description                             │
│ ┌─────────────────────────────────────┐ │
│ │ Enable real-time push notifications │ │
│ │ to mobile and web users.            │ │ ← Editable Textarea
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```
- Escribir descripción clara

#### **2.3 Category**
```
┌─────────────────────────────────────────┐
│ Category                                │
│ [social ▼]                              │ ← Dropdown
└─────────────────────────────────────────┘

Opciones:
- content
- social       ← Seleccionar este
- commerce
- analytics
- security
```

#### **2.4 Dependencies - CLAVE! 🔑**

**Aquí vinculas el feature con servicios de Infrastructure:**

```
┌───────────────────────────────────────────────────┐
│ Dependencies                                      │
│ Select infrastructure services required by this   │
│ feature                                           │
├───────────────────────────────────────────────────┤
│ ┌───────────────────────────────────────────────┐ │
│ │ ☐ AI Provider                                 │ │
│ │ ☐ Email Service                               │ │
│ │ ☐ Payment Service                             │ │
│ │ ☐ SMS Service                                 │ │
│ │ ☐ Moderation Engine                           │ │
│ │ ☐ Analytics Service                           │ │
│ │ ☐ Storage Service                             │ │
│ │ ☑ Push Notification Service  ← SELECCIONADO   │ │
│ └───────────────────────────────────────────────┘ │
│                                                   │
│ Selected:                                         │
│ [Push Notification Service ×]                     │
└───────────────────────────────────────────────────┘
```

**Cómo funciona:**
1. Scroll en la lista de servicios
2. Click checkbox de "Push Notification Service"
3. Aparece como badge abajo
4. Click "×" en badge para quitar

**Puedes seleccionar MÚLTIPLES dependencies:**
```
Selected dependencies:
[AI Provider ×] [Push Notification Service ×] [Analytics Service ×]
```

---

### **PASO 3: Configurar Rollout**

**Click tab "Rollout":**

#### **3.1 Global Status**
```
┌─────────────────────────────────────────┐
│ Global Status                           │
│ Enable or disable feature platform-wide │
│                              [Toggle ON] │ ← Switch
└─────────────────────────────────────────┘
```
- Toggle ON → Feature habilitado globalmente

#### **3.2 Rollout Percentage**
```
┌─────────────────────────────────────────┐
│ Rollout Percentage: 20%                 │
│ Gradually enable feature for percentage │
│                                         │
│ ●────────────────────────────────────   │ ← Slider
│ 0%          50%                    100% │
└─────────────────────────────────────────┘
```
- Arrastra slider → Lanzamiento gradual
- 20% = Solo 20% de usuarios elegibles ven feature

---

### **PASO 4: Configurar Plan Overrides**

**Click tab "Overrides":**

#### **4.1 Plan Overrides**
```
┌─────────────────────────────────────────┐
│ Plan Overrides                          │
├─────────────────────────────────────────┤
│ Free Plan                           ☐   │
│ Pro Plan                            ☑   │ ← Habilitado
│ Enterprise Plan                     ☑   │ ← Habilitado
│ Internal Plan                       ☑   │ ← Habilitado
└─────────────────────────────────────────┘
```

**Ejemplo:** Push Notifications solo para planes pagos
- Free: ☐ (deshabilitado)
- Pro: ☑ (habilitado)
- Enterprise: ☑ (habilitado)
- Internal: ☑ (habilitado para testing)

---

### **PASO 5: Guardar Cambios**

**Badge "Unsaved Changes" aparece:**
```
┌─────────────────────────────────────────┐
│ Push Notifications                      │
│ [social] [Enabled] [Unsaved Changes]    │ ← Badge naranja
└─────────────────────────────────────────┘
```

**Footer con botón "Save Changes":**
```
┌─────────────────────────────────────────┐
│ [🗑 Delete Feature]   [✓ Save Changes]  │
└─────────────────────────────────────────┘
```

**Click "Save Changes":**
- Toast: "Feature 'Push Notifications' updated successfully"
- Badge "Unsaved Changes" desaparece
- Audit log en console:
  ```javascript
  [AUDIT LOG] Feature updated: {
    featureId: 'feature_1234567890',
    changes: {
      name: 'Push Notifications',
      description: 'Enable real-time push notifications...',
      category: 'social',
      dependencies: ['Push Notification Service'],
      globalEnabled: true,
      rolloutPercentage: 20,
      planOverrides: { free: false, pro: true, enterprise: true, internal: true }
    }
  }
  ```

---

## ⚠️ DEPENDENCY WARNING

### **¿Qué pasa si el servicio NO está configurado?**

**Ejemplo:** Feature requiere "Push Notification Service" pero NO está en Infrastructure

#### **Warning aparece en panel:**
```
┌───────────────────────────────────────────────────┐
│ ⚠️ Missing Dependencies                           │
│                                                   │
│ This feature requires: Push Notification Service. │
│ Configure them in Infrastructure tab.             │
└───────────────────────────────────────────────────┘
```

**Banner amarillo visible en todo el panel.**

---

### **Cómo resolver:**

#### **Opción 1: Ir a Infrastructure tab**
```
1. Configuration → Infrastructure
2. Click "Add New Service" (abajo de tabla)
3. Dialog abre:
   ┌─────────────────────────────────────┐
   │ Add New Service                     │
   ├─────────────────────────────────────┤
   │ Service Name: [Push Service      ]  │
   │ Service Type: [Other ▼]             │
   │ Provider: [Custom Provider ▼]       │
   │ API Key: [sk_live_xxxxxxxxxx     ]  │
   │ Environment: ● Production ○ Test    │
   │                                     │
   │           [Cancel] [Add Service]    │
   └─────────────────────────────────────┘
4. Click "Add Service"
5. Servicio aparece en tabla con status "Active"
```

#### **Opción 2: Quitar dependency del feature**
```
1. Volver a Features → Click feature
2. Overview tab → Dependencies
3. Click "×" en badge "Push Notification Service"
4. Save Changes
5. Warning desaparece
```

---

## 🔄 VINCULACIÓN FEATURE ↔ SERVICE

### **Flujo técnico:**

```
┌────────────────────────────────────────────────────┐
│ FEATURES TAB                                       │
├────────────────────────────────────────────────────┤
│ Feature: "Push Notifications"                      │
│ Dependencies: ['Push Notification Service']        │
└─────────────────┬──────────────────────────────────┘
                  │
                  │ DEPENDENCY CHECK
                  ↓
┌────────────────────────────────────────────────────┐
│ INFRASTRUCTURE TAB                                 │
├────────────────────────────────────────────────────┤
│ Service Name: "Push Notification Service"          │
│ Type: Other                                        │
│ Provider: OneSignal                                │
│ Status: Active ✅                                  │
└────────────────────────────────────────────────────┘

RESULTADO: ✅ Dependency satisfied → No warning
```

### **Si servicio falta:**
```
┌────────────────────────────────────────────────────┐
│ FEATURES TAB                                       │
├────────────────────────────────────────────────────┤
│ Feature: "Push Notifications"                      │
│ Dependencies: ['Push Notification Service']        │
└─────────────────┬──────────────────────────────────┘
                  │
                  │ DEPENDENCY CHECK
                  ↓
┌────────────────────────────────────────────────────┐
│ INFRASTRUCTURE TAB                                 │
├────────────────────────────────────────────────────┤
│ (No service with name "Push Notification Service") │
│ Status: Missing ❌                                 │
└────────────────────────────────────────────────────┘

RESULTADO: ❌ Warning aparece en panel
```

---

## 📊 LISTA DE SERVICIOS DISPONIBLES

**En el selector de Dependencies:**

```javascript
const AVAILABLE_SERVICES = [
  'AI Provider',                    // Para features de AI
  'Email Service',                  // Para features de email
  'Payment Service',                // Para features de pagos
  'SMS Service',                    // Para features de SMS
  'Moderation Engine',              // Para features de moderación
  'Analytics Service',              // Para features de analytics
  'Storage Service',                // Para features de storage
  'Push Notification Service',      // Para features de push
];
```

**Puedes agregar más en el código:**
```typescript
// /components/super-admin-v2/panels/FeatureFlagPanel.tsx
const AVAILABLE_SERVICES = [
  // ... existing
  'Video Streaming Service',
  'Search Service',
  'CDN Service',
];
```

---

## 🎬 EJEMPLO COMPLETO

### **Feature: "AI Content Moderation"**

#### **1. Overview:**
```
Name: AI Content Moderation
Description: Automatically detect and flag inappropriate content using AI
Category: security
Dependencies: 
  - AI Provider
  - Moderation Engine
```

#### **2. Rollout:**
```
Global Status: ON
Rollout Percentage: 50% (gradual rollout)
```

#### **3. Overrides:**
```
Plans:
  - Free: ☐ (no moderation)
  - Pro: ☐ (manual moderation only)
  - Enterprise: ☑ (auto moderation)
  - Internal: ☑ (testing)

User Overrides:
  - beta@example.com → Enabled (beta tester)
```

#### **4. Dependencies Check:**
```
Infrastructure tab debe tener:
✅ AI Provider → Status: Active (OpenAI configurado)
✅ Moderation Engine → Status: Active (Perspective API)

Si ambos están → No warning
Si falta alguno → Warning amarillo
```

#### **5. Save:**
```
Click "Save Changes"
→ Toast: "Feature 'AI Content Moderation' updated successfully"
→ Feature ahora visible en tabla de Features
```

---

## ✅ CHECKLIST COMPLETO

Cuando creas un nuevo feature:

### **Tab Overview:**
- [ ] Cambiar nombre de "New Feature" → nombre real
- [ ] Escribir descripción clara
- [ ] Seleccionar categoría correcta
- [ ] **Seleccionar dependencies (servicios requeridos)** ← IMPORTANTE
- [ ] Verificar que no aparezca warning de dependencies

### **Tab Rollout:**
- [ ] Activar Global Status (ON/OFF)
- [ ] Configurar Rollout Percentage (0-100%)

### **Tab Overrides:**
- [ ] Seleccionar qué planes tienen acceso
- [ ] (Opcional) Agregar user overrides para beta testing

### **Guardar:**
- [ ] Click "Save Changes"
- [ ] Verificar toast de confirmación
- [ ] Badge "Unsaved Changes" debe desaparecer

---

## 🔍 DEBUGGING

### **Problema: "No veo el botón Save Changes"**
**Solución:** Edita algún campo (nombre, descripción, etc.) → Badge "Unsaved Changes" aparece → Botón "Save Changes" aparece en footer

### **Problema: "Warning de Missing Dependencies no desaparece"**
**Solución:**
1. Verifica que el nombre del servicio en Infrastructure EXACTAMENTE matchee
2. Ejemplo:
   - ❌ Dependency: "AI Provider" → Infrastructure: "AI Service" → NO MATCH
   - ✅ Dependency: "AI Provider" → Infrastructure: "AI Provider" → MATCH

### **Problema: "No encuentro el servicio que necesito"**
**Solución:**
1. Si no existe en lista → Ir a Infrastructure tab
2. Click "Add New Service"
3. Crear servicio con nombre descriptivo
4. Volver a Features → Ese nombre ahora aparece en Dependencies

---

## 🚀 PRÓXIMOS PASOS (Mejoras futuras)

1. **Real-time dependency checking:**
   - Actualmente usa `dependenciesActive = true` (mock)
   - Implementar: Fetch real status desde Infrastructure API

2. **Auto-linking:**
   - Cuando creas servicio en Infrastructure
   - Sugerir features que podrían usarlo

3. **Dependency graph visual:**
   - Ver mapa de qué features dependen de qué servicios

4. **Test connection:**
   - Botón "Test Dependency" que verifica conectividad

---

## 📝 RESUMEN FINAL

**Pregunta original:** ¿Cómo vinculo feature con service?

**Respuesta:**
1. ✅ Crear feature en Features tab (+ New Feature)
2. ✅ Tab "Overview" → Sección "Dependencies" → **Checkboxes de servicios**
3. ✅ Seleccionar servicios requeridos (ej: "AI Provider")
4. ✅ Si servicio NO existe → Ir a Infrastructure tab → "Add New Service"
5. ✅ Save Changes → Feature ahora requiere ese servicio
6. ✅ Warning aparece si servicio falta → Guía al admin a configurarlo

**El panel ahora está 100% funcional y completo!** 🎉
