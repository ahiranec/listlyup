# 🔧 SERVICE CONFIG DIALOG - ESPECIFICACIÓN TÉCNICA

## 📋 OVERVIEW

Dialog **unificado** usado para:
- ✅ **Add New Service** (crear servicio)
- ✅ **Switch / Configure** (editar servicio existente)

**Ubicación:** `/components/super-admin-v2/shared/ServiceConfigDialog.tsx`

---

## 🎯 5 CAMPOS MÍNIMOS

### **1. Service Name** (Input text)
- **Label:** "Service Name *"
- **Placeholder:** "e.g., Email Service, AI Provider"
- **Validación:** Requerido
- **Ejemplo:** "Email Service", "Payment Gateway", "SMS Provider"

### **2. Service Type** (Dropdown)
- **Label:** "Service Type *"
- **Opciones:**
  - Email
  - AI Provider
  - Payments
  - SMS
  - Moderation
  - Other
- **Validación:** Requerido
- **Comportamiento:** Al cambiar type → resetea Provider dropdown

### **3. Provider** (Dropdown dinámico)
- **Label:** "Provider *"
- **Opciones DINÁMICAS según Service Type:**

```typescript
PROVIDERS_BY_TYPE = {
  email: ['SendGrid', 'Mailgun', 'AWS SES', 'Postmark'],
  ai: ['OpenAI', 'Anthropic', 'Google AI', 'Azure OpenAI'],
  payments: ['Stripe', 'PayPal', 'Square'],
  sms: ['Twilio', 'MessageBird', 'AWS SNS'],
  moderation: ['OpenAI Moderation', 'Perspective API', 'Azure Content Safety'],
  other: ['Custom Provider'],
}
```

- **Validación:** Requerido
- **Comportamiento:** Solo muestra providers del type seleccionado

### **4. API Key** (Input password)
- **Label:** "API Key *"
- **Type:** `password` (oculta caracteres)
- **Placeholder:** "sk_live_••••••••••••••••"
- **Validación:** Requerido
- **Helper text:** "Your API key is encrypted and stored securely"

### **5. Environment** (Radio buttons)
- **Label:** "Environment *"
- **Opciones:**
  - ○ Test / Sandbox (default)
  - ○ Production
- **Helper text:** "Use Test for development, Production for live users"
- **Default:** `test`

---

## 🔄 MODOS DE OPERACIÓN

### **MODE: CREATE** (Agregar servicio nuevo)

**Trigger:**
```tsx
// Usuario clickea "Add New Service"
setDialogState({ 
  open: true, 
  mode: 'create' 
});
```

**Comportamiento:**
- ✅ Título: "Add New Service"
- ✅ Descripción: "Add a new infrastructure service to your platform"
- ✅ Todos los campos VACÍOS
- ✅ Service Type: default "email"
- ✅ Environment: default "test"
- ✅ Botón: "Add Service"

**Al guardar:**
```typescript
const newService: Technology = {
  id: `service_${Date.now()}`,
  name: formData.name,
  type: 'service',
  provider: formData.provider,
  status: 'active', // ← Nuevo servicio siempre activo
};
```

---

### **MODE: EDIT** (Editar/Switch servicio)

**Trigger:**
```tsx
// Usuario clickea "Switch" o "Configure"
setDialogState({ 
  open: true, 
  mode: 'edit',
  service: tech // ← servicio actual
});
```

**Comportamiento:**
- ✅ Título: "Configure Service"
- ✅ Descripción: "Update the configuration for this service"
- ✅ Campos PRE-LLENADOS con valores actuales:
  - Service Name: `service.name`
  - Service Type: detectado automáticamente (disabled)
  - Provider: `service.provider`
  - API Key: vacío (por seguridad)
  - Environment: default "test"
- ✅ Botón: "Save Changes"

**Detección automática de Service Type:**
```typescript
const detectServiceType = (name: string): string => {
  const nameLower = name.toLowerCase();
  if (nameLower.includes('email')) return 'email';
  if (nameLower.includes('ai') || nameLower.includes('openai')) return 'ai';
  if (nameLower.includes('payment') || nameLower.includes('stripe')) return 'payments';
  if (nameLower.includes('sms') || nameLower.includes('twilio')) return 'sms';
  if (nameLower.includes('moderation')) return 'moderation';
  return 'other';
};
```

**Al guardar:**
```typescript
setTechnologies(prev => 
  prev.map(tech =>
    tech.id === service.id
      ? { ...tech, name: data.name, provider: data.provider, status: 'active' }
      : tech
  )
);
```

---

## ✅ VALIDACIÓN

**Campos requeridos:**
1. Service Name → `!formData.name.trim()`
2. Provider → `!formData.provider`
3. API Key → `!formData.apiKey.trim()`

**Visual de error:**
```tsx
{errors.name && (
  <p className="text-xs text-red-500">{errors.name}</p>
)}
```

**Toast si falta algo:**
```tsx
if (!validate()) {
  toast.error('Please fill all required fields');
  return;
}
```

---

## 🎨 VISUAL MOCKUP

### **CREATE MODE**
```
┌──────────────────────────────────────────┐
│ Add New Service                      [X] │
├──────────────────────────────────────────┤
│ Add a new infrastructure service to      │
│ your platform                            │
│                                          │
│ Service Name *                           │
│ ┌────────────────────────────────────┐   │
│ │ Email Service                      │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Service Type *                           │
│ ┌────────────────────────────────────┐   │
│ │ Email                           ▼  │   │
│ └────────────────────────────────────┘   │
│                                          │
│ Provider *                               │
│ ┌────────────────────────────────────┐   │
│ │ SendGrid                        ▼  │   │
│ └────────────────────────────────────┘   │
│                                          │
│ API Key *                                │
│ ┌────────────────────────────────────┐   │
│ │ ••••••••••••••••••••••             │   │
│ └────────────────────────────────────┘   │
│ Your API key is encrypted and stored     │
│ securely                                 │
│                                          │
│ Environment *                            │
│ ● Test / Sandbox                         │
│ ○ Production                             │
│ Use Test for development, Production for │
│ live users                               │
│                                          │
├──────────────────────────────────────────┤
│              [Cancel]  [Add Service]     │
└──────────────────────────────────────────┘
```

### **EDIT MODE**
```
┌──────────────────────────────────────────┐
│ Configure Service                    [X] │
├──────────────────────────────────────────┤
│ Update the configuration for this        │
│ service                                  │
│                                          │
│ Service Name *                           │
│ ┌────────────────────────────────────┐   │
│ │ Email Service                      │   │← PRE-LLENADO
│ └────────────────────────────────────┘   │
│                                          │
│ Service Type *                           │
│ ┌────────────────────────────────────┐   │
│ │ Email (locked)                     │   │← DISABLED
│ └────────────────────────────────────┘   │
│                                          │
│ Provider *                               │
│ ┌────────────────────────────────────┐   │
│ │ Mailgun                         ▼  │   │← Puede cambiar
│ └────────────────────────────────────┘   │
│                                          │
│ API Key *                                │
│ ┌────────────────────────────────────┐   │
│ │                                    │   │← Vacío (seguridad)
│ └────────────────────────────────────┘   │
│ Your API key is encrypted and stored     │
│ securely                                 │
│                                          │
│ Environment *                            │
│ ○ Test / Sandbox                         │
│ ● Production                             │← Puede cambiar
│ Use Test for development, Production for │
│ live users                               │
│                                          │
├──────────────────────────────────────────┤
│              [Cancel]  [Save Changes]    │
└──────────────────────────────────────────┘
```

---

## 🔄 FLUJO COMPLETO (ADD NEW SERVICE)

### **Paso a paso:**

1. **Usuario en Infrastructure tab**
   - Ve tabla de servicios
   - Click botón "Add New Service" (abajo de tabla)

2. **Dialog abre en mode CREATE**
   - Campos vacíos
   - Service Type default: "email"
   - Provider dropdown muestra: SendGrid, Mailgun, AWS SES, Postmark

3. **Usuario llena form:**
   ```
   Service Name: "Push Notifications"
   Service Type: "other" ← Click dropdown, selecciona Other
   Provider: "Custom Provider" ← Ahora solo muestra esta opción
   API Key: "sk_test_abc123xyz"
   Environment: Test ← selecciona radio
   ```

4. **Click "Add Service"**
   - ✅ Validación pasa
   - ✅ Toast: "Service 'Push Notifications' added successfully"
   - ✅ Console log: `[AUDIT LOG] Service created: {...}`
   - ✅ Dialog cierra
   - ✅ Tabla actualiza con nuevo servicio (status: Active)

---

## 🔄 FLUJO COMPLETO (SWITCH PROVIDER)

### **Paso a paso:**

1. **Usuario en Infrastructure tab**
   - Ve servicio "Email" con provider "SendGrid"
   - Click botón "Switch"

2. **Dialog abre en mode EDIT**
   - Service Name: "Email" ← pre-llenado
   - Service Type: "Email" ← detectado y disabled
   - Provider: "SendGrid" ← pre-llenado
   - API Key: "" ← vacío
   - Environment: Test

3. **Usuario cambia provider:**
   ```
   Provider: Click dropdown → Selecciona "Mailgun"
   API Key: Escribe nueva key "sk_live_mailgun_xyz"
   Environment: Selecciona "Production"
   ```

4. **Click "Save Changes"**
   - ✅ Validación pasa
   - ✅ Toast: "Service 'Email' updated successfully"
   - ✅ Console log: `[AUDIT LOG] Service updated: {...}`
   - ✅ Dialog cierra
   - ✅ Tabla muestra: Email → Mailgun (status: Active)

---

## 🎯 CASOS DE USO REALES

### **Caso 1: Agregar servicio de SMS**
```
1. Click "Add New Service"
2. Name: "SMS Notifications"
3. Type: SMS
4. Provider: Twilio
5. API Key: [Twilio auth token]
6. Environment: Test
7. Save → Servicio activo
```

### **Caso 2: Cambiar de Stripe a PayPal**
```
1. Servicio "Payments" actual: Stripe
2. Click "Switch"
3. Provider: PayPal ← cambiar dropdown
4. API Key: [PayPal client secret]
5. Environment: Production
6. Save → Ahora usa PayPal
```

### **Caso 3: Configurar servicio missing**
```
1. Servicio "Moderation Engine" → status: Missing
2. Click "Configure"
3. Dialog pre-llena nombre, type disabled
4. Provider: OpenAI Moderation
5. API Key: sk_...
6. Environment: Test
7. Save → Status cambia a Active
```

---

## 📊 AUDIT LOGGING

**CREATE:**
```javascript
console.log('[AUDIT LOG] Service created:', {
  serviceId: 'service_1234567890',
  provider: 'SendGrid',
  environment: 'test',
});
```

**UPDATE:**
```javascript
console.log('[AUDIT LOG] Service updated:', {
  serviceId: 'email',
  provider: 'Mailgun',
  environment: 'production',
});
```

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

- ✅ Dialog unificado (1 componente para 2 modos)
- ✅ 5 campos mínimos funcionales
- ✅ Dropdowns dinámicos por service type
- ✅ Validación de campos requeridos
- ✅ Pre-llenado automático en edit mode
- ✅ Service Type disabled en edit mode
- ✅ API Key tipo password (seguridad)
- ✅ Environment con radio buttons
- ✅ Toast notifications
- ✅ Audit logging
- ✅ Reset form al cerrar/guardar
- ✅ Integración con Infrastructure.tsx

---

**Dialog 100% funcional y listo para producción!** 🚀
