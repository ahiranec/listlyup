# 🔗 QUICK REFERENCE - VINCULAR FEATURE CON SERVICE

## 🎯 RESPUESTA RÁPIDA

**Pregunta:** ¿Cómo vinculo un feature con un service de Infrastructure?

**Respuesta en 3 pasos:**

```
1. Features tab → Click feature → Tab "Overview"
2. Sección "Dependencies" → Checkboxes de servicios
3. Seleccionar servicio(s) → Save Changes
```

---

## 📸 VISUAL GUIDE

### **ANTES (Panel anterior - INCOMPLETO):**
```
❌ Overview tab solo mostraba:
   - Description (read-only)
   - Properties (read-only)
   - Dependencies (read-only, si existen)
   
❌ NO había forma de editar
❌ NO había selector de dependencies
❌ NO había botón "Save Changes"
```

### **AHORA (Panel nuevo - COMPLETO):**
```
✅ Overview tab muestra:
   ┌─────────────────────────────────────────┐
   │ Feature Name                            │
   │ [___________________________________]   │ ← Editable
   │                                         │
   │ Description                             │
   │ ┌─────────────────────────────────────┐ │
   │ │                                     │ │ ← Editable
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Category                                │
   │ [content ▼]                             │ ← Dropdown
   │                                         │
   │ Dependencies ← AQUÍ VINCULAS            │
   │ ┌─────────────────────────────────────┐ │
   │ │ ☐ AI Provider                       │ │
   │ │ ☐ Email Service                     │ │
   │ │ ☐ Payment Service                   │ │
   │ │ ☑ Push Notification Service         │ │ ← Click checkbox
   │ └─────────────────────────────────────┘ │
   │                                         │
   │ Selected: [Push Notification Service ×]│
   └─────────────────────────────────────────┘

✅ Footer: [Delete Feature] [Save Changes]
```

---

## 🔄 FLUJO COMPLETO

### **Caso: Feature requiere "AI Provider"**

```
┌──────────────────────────────────────────────────┐
│ PASO 1: Features tab                             │
├──────────────────────────────────────────────────┤
│ 1. Click "+ New Feature" o click feature row     │
│ 2. Panel abre → Tab "Overview"                   │
│ 3. Scroll a sección "Dependencies"               │
│ 4. Click checkbox "AI Provider"                  │
│ 5. Click "Save Changes"                          │
└──────────────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────────────┐
│ PASO 2: Sistema verifica Infrastructure          │
├──────────────────────────────────────────────────┤
│ ¿Existe servicio "AI Provider" en Infrastructure?│
│                                                  │
│ SÍ → ✅ No warning                               │
│ NO → ⚠️ Warning aparece                          │
└──────────────────────────────────────────────────┘
           ↓ (si NO existe)
┌──────────────────────────────────────────────────┐
│ PASO 3: Configurar servicio en Infrastructure    │
├──────────────────────────────────────────────────┤
│ 1. Configuration → Infrastructure tab            │
│ 2. Click "Add New Service"                       │
│ 3. Service Name: "AI Provider"                   │
│ 4. Service Type: "AI"                            │
│ 5. Provider: "OpenAI"                            │
│ 6. API Key: "sk_xxxxxxxxxx"                      │
│ 7. Click "Add Service"                           │
└──────────────────────────────────────────────────┘
           ↓
┌──────────────────────────────────────────────────┐
│ RESULTADO: Feature + Service vinculados          │
├──────────────────────────────────────────────────┤
│ ✅ Feature "AI Tagging" tiene dependency         │
│ ✅ Service "AI Provider" está configurado        │
│ ✅ No warning aparece                            │
│ ✅ Feature puede usarse                          │
└──────────────────────────────────────────────────┘
```

---

## 💡 EJEMPLOS PRÁCTICOS

### **Feature: "AI Content Tagging"**
```yaml
Dependencies:
  - AI Provider ← Necesita OpenAI/Anthropic configurado

Infrastructure debe tener:
  Service Name: "AI Provider"
  Type: AI
  Provider: OpenAI
  Status: Active
```

### **Feature: "Email Notifications"**
```yaml
Dependencies:
  - Email Service ← Necesita SendGrid/Mailgun

Infrastructure debe tener:
  Service Name: "Email Service"
  Type: Email
  Provider: SendGrid
  Status: Active
```

### **Feature: "Payment Processing"**
```yaml
Dependencies:
  - Payment Service ← Necesita Stripe

Infrastructure debe tener:
  Service Name: "Payment Service"
  Type: Payments
  Provider: Stripe
  Status: Active
```

### **Feature: "Auto Moderation" (múltiples dependencies)**
```yaml
Dependencies:
  - AI Provider          ← OpenAI para análisis
  - Moderation Engine    ← Perspective API

Infrastructure debe tener AMBOS:
  1. Service Name: "AI Provider"
     Type: AI
     Provider: OpenAI
     Status: Active
  
  2. Service Name: "Moderation Engine"
     Type: Moderation
     Provider: Perspective API
     Status: Active
```

---

## ⚠️ TROUBLESHOOTING

### **Problema: Warning no desaparece**

**Causa:** Nombre del servicio NO matchea exactamente

**Ejemplo:**
```
❌ INCORRECTO:
   Feature dependency: "AI Provider"
   Infrastructure service: "AI Service"
   → NO MATCHEA

✅ CORRECTO:
   Feature dependency: "AI Provider"
   Infrastructure service: "AI Provider"
   → MATCHEA
```

**Solución:**
1. Verifica spelling exacto (case-sensitive)
2. Opción A: Cambiar dependency en feature
3. Opción B: Cambiar nombre de service en infrastructure

---

### **Problema: No veo mi servicio en la lista**

**Causa:** El servicio no está en `AVAILABLE_SERVICES`

**Lista actual:**
```javascript
- AI Provider
- Email Service
- Payment Service
- SMS Service
- Moderation Engine
- Analytics Service
- Storage Service
- Push Notification Service
```

**Solución temporal:**
1. Usar "Analytics Service" o "Storage Service" (genéricos)
2. Cambiar nombre después en Infrastructure

**Solución permanente:**
1. Editar `/components/super-admin-v2/panels/FeatureFlagPanel.tsx`
2. Agregar tu servicio a `AVAILABLE_SERVICES`:
   ```typescript
   const AVAILABLE_SERVICES = [
     // ... existing
     'Video Streaming Service',  // ← Agregar
     'Search Service',           // ← Agregar
   ];
   ```

---

## 🎯 CHECKLIST RÁPIDO

Crear feature con dependency:

```
☐ 1. Features tab → + New Feature
☐ 2. Tab Overview → Editar nombre
☐ 3. Tab Overview → Escribir descripción
☐ 4. Tab Overview → Seleccionar categoría
☐ 5. Tab Overview → Checkboxes de dependencies
      ☐ Click servicio(s) requerido(s)
      ☐ Verificar badges aparecen abajo
☐ 6. Tab Rollout → Global Status ON
☐ 7. Tab Rollout → Rollout percentage (ej: 100%)
☐ 8. Tab Overrides → Seleccionar planes
☐ 9. Footer → Click "Save Changes"
☐ 10. Verificar NO hay warning amarillo
      ☐ Si hay warning → Ir a Infrastructure tab
      ☐ Add New Service con nombre exacto
```

---

## 📚 REFERENCIA RÁPIDA DE CAMPOS

### **Overview Tab:**
| Campo | Tipo | Ejemplo |
|-------|------|---------|
| Feature Name | Input | "Push Notifications" |
| Description | Textarea | "Enable real-time push..." |
| Category | Dropdown | content / social / commerce |
| Dependencies | Checkboxes | [☑ AI Provider] |

### **Rollout Tab:**
| Campo | Tipo | Ejemplo |
|-------|------|---------|
| Global Status | Switch | ON / OFF |
| Rollout % | Slider | 0% - 100% |

### **Overrides Tab:**
| Campo | Tipo | Ejemplo |
|-------|------|---------|
| Free Plan | Checkbox | ☐ / ☑ |
| Pro Plan | Checkbox | ☐ / ☑ |
| Enterprise Plan | Checkbox | ☐ / ☑ |
| Internal Plan | Checkbox | ☐ / ☑ |
| User Overrides | List | beta@example.com |

---

## 🚀 TIPS PRO

### **Tip 1: Staff Testing**
```
1. Crear feature
2. Dependencies → Seleccionar servicios
3. Overrides → SOLO "Internal Plan" enabled
4. Staff prueba 1 semana
5. Si funciona → Habilitar Pro y Enterprise
```

### **Tip 2: Gradual Rollout**
```
1. Crear feature con dependencies
2. Global Status → ON
3. Plans → Pro y Enterprise enabled
4. Rollout → 10% (solo 10% de usuarios)
5. Monitor 3 días
6. Rollout → 50% → 100% (gradual)
```

### **Tip 3: Beta Testers**
```
1. Crear feature
2. Plans → TODOS disabled
3. User Overrides → Agregar beta@example.com
4. Solo beta testers ven feature
5. Después de testing → Habilitar planes
```

### **Tip 4: Multiple Dependencies**
```
Feature que requiere 3 servicios:
☑ AI Provider
☑ Email Service
☑ Analytics Service

→ TODOS deben estar Active en Infrastructure
→ Si falta 1 → Warning aparece
```

---

## ✅ ESTADO ACTUAL

**Panel FeatureFlagPanel.tsx:**
- ✅ 100% editable
- ✅ Dependencies multi-select
- ✅ Save Changes button
- ✅ Unsaved Changes badge
- ✅ Warning si dependencies faltan
- ✅ Audit logging completo

**Listo para producción!** 🚀
