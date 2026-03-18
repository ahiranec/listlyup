# 🚀 PUBLISHFLOW v1.2 — IMPLEMENTACIÓN EN PROGRESO

**Fecha:** 25 Febrero 2026  
**Status:** ✅ FASES 0-2 COMPLETADAS | 🚧 FASES 3-6 PENDIENTES

---

## ✅ COMPLETADO

### FASE 0 — UBICACIÓN DEL CÓDIGO ✅

**Archivos ubicados:**
- `/components/publish/PublishFlow.tsx` - Orchestrator principal
- `/components/publish/MediaStepV2.tsx` - Step 1 (Media + Type)
- `/components/publish/BasicInfoStepV2.tsx` - Step 2 (Details)
- `/components/publish/types.ts` - TypeScript types
- `/components/publish/constants.ts` - Initial form data

**Estado actual:** offerType, condition, ticketType están en Step 2 (Basic Info)

---

### FASE 1 — CREAR "INTENT" EN DRAFT STATE ✅

**Archivos modificados:**

#### 1. `/components/publish/types.ts` ✅
```typescript
// NUEVO: Product condition types
export type ProductCondition = 'new' | 'like_new' | 'used' | 'offer_condition';

// NUEVO: Service mode types
export type ServiceMode = 'sale' | 'rent';

// NUEVO: ListingIntent interface
export interface ListingIntent {
  listingType: ListingType;
  offerMode?: OfferType;
  condition?: ProductCondition;
  serviceMode?: ServiceMode;
  ticketType?: 'free' | 'paid';
}

// ACTUALIZADO: PublishFormData
export interface PublishFormData {
  // Step 1: Media + Type + Intent (v1.2)
  images: string[];
  type: ListingType;
  intent?: ListingIntent;  // ← NUEVO
  
  // Campos legacy para backward compatibility
  condition?: ProductCondition;  // ← Tipo actualizado
  offerType?: OfferType;
  serviceMode?: ServiceMode;  // ← NUEVO
  ticketType?: 'free' | 'paid';
  // ... rest
}
```

#### 2. `/components/publish/constants.ts` ✅
```typescript
export const INITIAL_FORM_DATA: PublishFormData = {
  images: [],
  type: 'product',
  intent: undefined,  // ← NUEVO: Set in Step 1 modal
  
  // Legacy fields kept for backward compatibility
  offerType: undefined,  // ← Changed from 'sell' to undefined
  condition: undefined,  // ← Changed from 'new' to undefined
  serviceMode: undefined,  // ← NUEVO
  ticketType: undefined,  // ← Changed from 'free' to undefined
  // ... rest
};
```

**Resultado:** Intent object creado y agregado al draft state.

---

### FASE 2 — STEP 1: AGREGAR MODALS "INTENT-FIRST" ✅

**Archivos creados/modificados:**

#### 1. `/components/publish/IntentModals.tsx` ✅ (NUEVO)

Contiene 3 modals:
- **ProductIntentModal:** Captura offerMode + condition en UN SOLO modal
- **ServiceIntentModal:** Captura serviceMode (sale/rent)
- **EventIntentModal:** Captura ticketType (free/paid)

**Funcionalidades:**
- ✅ Product modal muestra 4 offerModes + 4 conditions en un solo flujo
- ✅ Service/Event modals más simples (2 opciones cada uno)
- ✅ Validación: no se puede continuar sin seleccionar ambos campos (Product)
- ✅ Visual feedback: checkmarks, hover states, responsive

#### 2. `/components/publish/MediaStepV2.tsx` ✅ (MODIFICADO)

**Props agregados:**
```typescript
interface MediaStepV2Props {
  intent?: ListingIntent;  // NEW v1.2
  onIntentChange?: (intent: ListingIntent) => void;  // NEW v1.2
  // ... existing props
}
```

**Lógica agregada:**
- `handleTypeSelect()`: Abre modal cuando usuario selecciona tipo (solo create mode)
- `handleProductIntentComplete()`: Guarda offerMode + condition
- `handleServiceModeSelect()`: Guarda serviceMode
- `handleEventTicketSelect()`: Guarda ticketType
- `isIntentComplete`: Valida que intent esté completo antes de continuar
- `canContinue`: 
  - Edit mode: solo requiere images + type (backward compatible)
  - Create mode: requiere intent completo

**UI agregada:**
- ✅ Warning message si intent incompleto
- ✅ Los 3 modals se renderizan condicionalmente según selectedType
- ✅ Botón "Continue" disabled hasta completar intent

#### 3. `/components/publish/PublishFlow.tsx` ✅ (MODIFICADO)

**Cambios:**
```typescript
<MediaStepV2
  mode={mode}
  images={formData.images}
  selectedType={formData.type}
  intent={formData.intent}  // ← NUEVO
  onImagesChange={(images) => setFormData({ ...formData, images })}
  onTypeChange={(type) => setFormData({ ...formData, type })}
  onIntentChange={(intent) => {  // ← NUEVO
    // Sync intent to legacy fields for backward compatibility
    const updates: any = { intent };
    if (intent.offerMode) updates.offerType = intent.offerMode;
    if (intent.condition) updates.condition = intent.condition;
    if (intent.serviceMode) updates.serviceMode = intent.serviceMode;
    if (intent.ticketType) updates.ticketType = intent.ticketType;
    setFormData({ ...formData, ...updates });
  }}
  // ... rest
/>
```

**Backward Compatibility:**
- Intent se sincroniza con campos legacy (offerType, condition, serviceMode, ticketType)
- Edit mode funciona sin intent (no rompe listings existentes)
- Create mode requiere intent completo

---

## 🚧 PENDIENTE

### FASE 3 — STEP 2: REMOVER CAMPOS QUE SE MOVIERON (PENDIENTE)

**Archivo a modificar:** `/components/publish/BasicInfoStepV2.tsx`

**Cambios requeridos:**
1. ❌ Remover sección "What do you want to do?" (offerType) - líneas 307-356
2. ❌ Remover sección "Condition" (condition) - líneas 387-404
3. ❌ Remover sección "Ticket Type" (ticketType) si existe en Event
4. ✅ MANTENER pricing inputs (price, priceNegotiable, currency)
5. ✅ Mostrar/ocultar price según intent:
   - Product: giveaway → hide, sell/sell_or_trade → show, trade → hide
   - Service: sale/rent → show (ambos usan price)
   - Event: free → hide, paid → show

**Validaciones a actualizar:**
- `isPriceRequired`: Leer de `props.offerType` (viene desde Step 1 via intent)
- `canContinue`: No validar offerType/condition aquí (ya validados en Step 1)

---

### FASE 4 — VISION AUTOFILL (PENDIENTE)

**Archivo a modificar:** `/components/publish/BasicInfoStepV2.tsx`

**Cambios requeridos:**
1. Si `isAIActive` y hay `aiSuggestions`:
   - Aplicar SOLO: title, description, category, subcategory, tags
   - ❌ NO TOCAR price (se mantiene manual)
2. Mostrar loading "Analyzing photo..." mientras vision API procesa
3. Botón "Apply AI suggestion" inline para cada campo
4. **NO prellenar automáticamente** - usuario debe aplicar manualmente

**AI Service (stub):**
- Crear `/lib/services/aiService.ts` con función:
  ```typescript
  async function visionAutofill(params: {
    images: string[];
    intent?: ListingIntent;
  }): Promise<AISuggestions> {
    // TODO: Call provider (OpenAI/Google/AWS) según config
    // Por ahora: mock response
  }
  ```

---

### FASE 5 — MODERACIÓN + DICTADO (STUBS) (PENDIENTE)

**Moderación:**
- Hook stub: `useModerationCheck(content: string)`
- Llamar antes de Publish en PreviewStepV2
- Si detecta issues: mostrar warnings, NO bloquear

**Dictado (STT):**
- Agregar icono 🎤 en title/description inputs
- Si `isFeatureActive('voiceToText')`: mostrar icono
- onClick: llamar stub `startDictation(field: string)`
- Por ahora: solo UI prep, no implementar API

---

### FASE 6 — VALIDACIONES + TEST (PENDIENTE)

**Manual Test Checklist:**
1. [ ] Create Product: Step1 sets offerMode+condition → Step2 autofill → price manual → publish OK
2. [ ] Create Service: sale/rent set → Step2 → publish OK
3. [ ] Create Event: free/paid set → Step2 → publish OK
4. [ ] Edit listing: no rompe, muestra valores si existen
5. [ ] Close modal sin seleccionar → botón Continue disabled
6. [ ] Change type: intent se resetea
7. [ ] AI vision prellena solo textos (NO precio)
8. [ ] Price hidden cuando offerMode=giveaway o ticketType=free
9. [ ] Backward compat: listings sin intent siguen funcionando
10. [ ] 0 clicks muertos, 0 botones mentirosos

---

## 📊 ARCHIVOS TOCADOS (RESUMEN)

| Archivo | Status | Cambios |
|---------|--------|---------|
| `/components/publish/types.ts` | ✅ Completado | +3 types, +1 interface, updated PublishFormData |
| `/components/publish/constants.ts` | ✅ Completado | Updated INITIAL_FORM_DATA defaults |
| `/components/publish/IntentModals.tsx` | ✅ Creado | 3 modals (Product/Service/Event) |
| `/components/publish/MediaStepV2.tsx` | ✅ Completado | +2 props, +5 handlers, +3 modals render |
| `/components/publish/PublishFlow.tsx` | ✅ Completado | Updated MediaStepV2 props |
| `/components/publish/BasicInfoStepV2.tsx` | ⏳ Pendiente | Remover campos movidos a Step 1 |
| `/lib/services/aiService.ts` | ⏳ Pendiente | Crear stub para vision autofill |

---

## 🔧 COMPATIBILIDAD BACKWARD

**Cómo funciona:**

1. **Create mode (nuevo):**
   - Intent se captura en Step 1 → Se guarda en `formData.intent`
   - Se sincroniza con campos legacy (offerType, condition, etc.)
   - Step 2 lee de campos legacy para compatibilidad

2. **Edit mode (existente):**
   - Listings viejos NO tienen `intent`
   - Campos legacy (offerType, condition) aún existen
   - Step 1 no muestra modal si `mode === 'edit'`
   - Step 2 sigue funcionando normal con campos legacy

3. **Sincronización:**
   ```typescript
   // En PublishFlow.tsx onIntentChange:
   if (intent.offerMode) updates.offerType = intent.offerMode;
   if (intent.condition) updates.condition = intent.condition;
   if (intent.serviceMode) updates.serviceMode = intent.serviceMode;
   if (intent.ticketType) updates.ticketType = intent.ticketType;
   ```

4. **Validación Step 1:**
   ```typescript
   // Create mode: requiere intent completo
   if (mode === 'create') return isIntentComplete;
   
   // Edit mode: solo images + type
   if (mode === 'edit') return true;
   ```

---

## 🎯 PRÓXIMOS PASOS

1. **Fase 3:** Modificar BasicInfoStepV2 para remover campos movidos ⏳
2. **Fase 4:** Implementar vision autofill (solo textos) ⏳
3. **Fase 5:** Agregar stubs moderación + dictado ⏳
4. **Fase 6:** Testing completo + validaciones ⏳

**Estimado tiempo restante:** 3-4 horas

---

## 📝 NOTAS TÉCNICAS

### Decisiones de diseño:

1. **Un solo modal para Product:** 
   - Captura offerMode + condition juntos
   - Evita múltiples modals consecutivos
   - Mejor UX (menos clicks)

2. **Intent separado de legacy fields:**
   - `intent` es el nuevo source of truth
   - Campos legacy se sincronizan para backward compat
   - Facilita migración gradual

3. **Edit mode skip modals:**
   - No mostrar modals en edit (UX confusa)
   - Asumir que intent ya existe o usar legacy fields
   - No bloquear edit de listings viejos

4. **Validación en Step 1:**
   - Bloquear avance a Step 2 si intent incompleto
   - Mostrar warning inline (no modal de error)
   - Botón Continue disabled + mensaje claro

5. **ServiceMode en formData:**
   - Agregado como nuevo campo (no existía antes)
   - Por ahora solo afecta UI (qué pricing inputs mostrar)
   - NO agregar rental_term u otros campos complejos (MVP)

---

**Última actualización:** En progreso - Fases 0-2 completadas
**Siguiente:** Fase 3 - Modificar BasicInfoStepV2
