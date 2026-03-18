# ✅ TESTING GUIDE - SuperAdmin ↔ Smart Features Sync

## 🎯 OBJETIVO
Verificar que la sincronización entre SuperAdmin Dashboard y Smart Features (User Settings) funciona correctamente en todas las fases.

---

## 📝 PRE-REQUISITOS

1. ✅ App está corriendo
2. ✅ Tienes acceso a:
   - SuperAdmin Dashboard (login con credenciales de `/data/mockCredentials.ts`)
   - Settings → Smart Features (como usuario regular)
3. ✅ Chrome DevTools abierto (para ver console logs)
4. ✅ localStorage vacío (opcional - refresh para empezar desde cero)

**Clear localStorage:**
```javascript
localStorage.clear();
location.reload();
```

---

## 🧪 FASE 1 - SYNC BÁSICO (P0)

### **Test 1.1 - Persistencia de SuperAdmin Features**

**Acción:**
1. Ve a SuperAdmin Dashboard → Configuration → Features
2. Cambia un checkbox (ej: desactiva "Global" para "AI Publishing Assistance")
3. Refresh la página (F5)

**Resultado esperado:**
- ✅ El checkbox sigue desactivado después del refresh
- ✅ Console log: `[FEATURES] Loaded from localStorage: 11`
- ✅ Console log: `[FEATURES] Auto-synced to localStorage and SmartFeatures`

---

### **Test 1.2 - SuperAdmin → SmartFeatures Sync (Global Enable/Disable)**

**Acción:**
1. Ve a SuperAdmin Dashboard → Features
2. **DESACTIVA** checkbox "Global" para "AI Publishing Assistance"
3. Ve a Settings → Smart Features (como usuario regular)

**Resultado esperado:**
- ✅ "AI Publishing Assistance" muestra estado "disabled" (gris)
- ✅ Helper text: "Temporarily disabled by the platform"
- ✅ Toggle está desactivado (no se puede cambiar)
- ✅ Console log: `[FEATURES CONTEXT] SuperAdmin features changed (same-tab sync)`

**Acción 2:**
1. Vuelve a SuperAdmin → Features
2. **ACTIVA** checkbox "Global" para "AI Publishing Assistance"
3. Vuelve a Settings → Smart Features

**Resultado esperado:**
- ✅ "AI Publishing Assistance" vuelve a estado "available" (verde)
- ✅ Toggle está activo (se puede cambiar)
- ✅ Toast notification: "Feature settings updated by admin"

---

### **Test 1.3 - Plan Override Sync (Free → Plus)**

**Setup:**
1. Asegúrate de que tu usuario tiene plan "Free" (ve a Profile, debería decir "Free Plan")

**Acción:**
1. Ve a SuperAdmin → Features
2. Encuentra "Photo Enhancement"
3. **DESMARCA** checkbox "Free" (columna Free)
4. **MARCA** checkbox "Plus" (columna Plus)
5. Ve a Settings → Smart Features

**Resultado esperado:**
- ✅ "Photo Enhancement" muestra 🔒 lock icon
- ✅ Badge: "Plus"
- ✅ Helper text: "Upgrade to Plus to unlock"
- ✅ Toggle está desactivado (locked)
- ✅ Al hacer click en "Photo Enhancement", toast: "This feature cannot be changed"

**Acción 2:**
1. Vuelve a SuperAdmin
2. **MARCA** checkbox "Free" para "Photo Enhancement"
3. Vuelve a Settings → Smart Features

**Resultado esperado:**
- ✅ "Photo Enhancement" vuelve a estado "available"
- ✅ Lock desaparece
- ✅ Toggle funciona normalmente

---

### **Test 1.4 - Múltiples features sincronizando simultáneamente**

**Acción:**
1. Ve a SuperAdmin → Features
2. Realiza estos cambios EN SECUENCIA:
   - Desactiva "Global" para "Voice-to-Text"
   - Desmarca "Free" para "Smart Filters"
   - Activa "Free" para "Personalized Feed"
3. Ve a Settings → Smart Features (sin refresh)

**Resultado esperado:**
- ✅ "Voice-to-Text": disabled (plataforma)
- ✅ "Smart Filters": locked (requiere upgrade)
- ✅ "Personalized Feed": available (antes era locked para Free)
- ✅ Console log muestra 3 syncs separados

---

## 🧪 FASE 2 - UNIFIED CATALOG (P1)

### **Test 2.1 - Features unificadas**

**Acción:**
1. Ve a SuperAdmin → Features
2. Verifica que TODAS estas features estén presentes:
   - AI Publishing Assistance ✅
   - Photo Enhancement ✅
   - Voice-to-Text ✅
   - Smart Filters ✅
   - Personalized Feed ✅
   - AI Content Tagging (Legacy) ✅
   - Auto Moderation ✅
   - Groups ✅
   - Messaging ✅
   - Advanced Analytics ✅
   - New UI Components (Beta) ✅

**Resultado esperado:**
- ✅ Total: 11 features
- ✅ Las primeras 5 son las SmartFeatures (unified)
- ✅ Las siguientes 6 son legacy features
- ✅ Column "Plus" existe en la tabla

---

### **Test 2.2 - Plan "Plus" funciona correctamente**

**Acción:**
1. Ve a SuperAdmin → Features
2. Encuentra "Photo Enhancement"
3. Configura así:
   - Free: ❌
   - Plus: ✅
   - Pro: ✅
   - Ent: ✅
   - Int: ✅
4. Ve a Profile → cambia plan a "Plus"
5. Ve a Settings → Smart Features

**Resultado esperado:**
- ✅ "Photo Enhancement" está "available" (no locked)
- ✅ Badge: "Plus"
- ✅ Toggle funciona
- ✅ Helper text: NO muestra "Upgrade to unlock"

**Cleanup:**
1. Vuelve a Profile → cambia plan a "Free"

---

### **Test 2.3 - Crear nueva feature en SuperAdmin**

**Acción:**
1. Ve a SuperAdmin → Features
2. Click "+ New Feature"
3. En el panel que se abre:
   - Name: "Test Feature"
   - Description: "This is a test feature"
   - Category: "content"
   - Marca checkboxes: Free ✅, Plus ✅, Pro ✅
4. Click "Save Changes"
5. Activa "Global" para "Test Feature"
6. Ve a Settings → Smart Features

**Resultado esperado:**
⚠️ **LIMITACIÓN FASE 2:** La feature NO aparece automáticamente en SmartFeatures porque SMART_FEATURES es estático.

**Workaround (manual):**
- Necesitarías agregar `testFeature` al array SMART_FEATURES en `/components/settings/types.ts`
- Esto es ESPERADO en Fase 2 - la feature dinámica completa es parte de Fase 3 avanzada

**Por ahora:**
- ✅ La feature se guarda en SuperAdmin
- ✅ Persiste al refresh
- ✅ Sincroniza a localStorage
- ⚠️ NO aparece en SmartFeatures (limitation conocida)

---

## 🧪 FASE 3 - ADVANCED FEATURES (P2)

### **Test 3.1 - Delete Feature Propagation**

**Acción:**
1. Ve a SuperAdmin → Features
2. Click en "AI Content Tagging (Legacy)"
3. Scroll abajo → Click "Delete Feature"
4. Confirma "DELETE"
5. Verifica console logs

**Resultado esperado:**
- ✅ Feature desaparece de la lista
- ✅ Console log: `[AUDIT LOG] Feature deleted: { featureId: 'ai_tagging' }`
- ✅ Console log: `[DELETE] Feature removed from both systems: ai_tagging`
- ✅ localStorage se actualiza (verificar en DevTools)

---

### **Test 3.2 - Real-time Same-Tab Sync**

**Acción:**
1. Abre 2 ventanas lado a lado:
   - Ventana A: SuperAdmin → Features
   - Ventana B: Settings → Smart Features
2. En Ventana A: Toggle "Global" para "AI Publishing Assistance" OFF
3. Observa Ventana B (NO hagas refresh)

**Resultado esperado:**
- ✅ Ventana B muestra toast: "Feature settings updated by admin"
- ✅ "AI Publishing Assistance" cambia a estado "disabled" automáticamente
- ✅ Console log en Ventana B: `[FEATURES CONTEXT] SuperAdmin features changed (same-tab sync)`
- ✅ NO se requiere refresh

**Acción 2:**
1. En Ventana A: Toggle "Global" para "AI Publishing Assistance" ON
2. Observa Ventana B

**Resultado esperado:**
- ✅ "AI Publishing Assistance" vuelve a "available" automáticamente
- ✅ Toast notification en Ventana B

---

### **Test 3.3 - Cross-Tab Sync (Multiple Tabs)**

**Acción:**
1. Abre 3 tabs en el mismo navegador:
   - Tab 1: SuperAdmin → Features
   - Tab 2: Settings → Smart Features
   - Tab 3: Settings → Smart Features (duplicado)
2. En Tab 1: Cambia "Free" checkbox para "Voice-to-Text" (OFF)
3. Observa Tabs 2 y 3 (NO hagas refresh)

**Resultado esperado:**
- ✅ Tab 2 y Tab 3 muestran toast: "Feature settings updated by admin"
- ✅ "Voice-to-Text" cambia a locked en ambas tabs
- ✅ Console log: `[FEATURES CONTEXT] Admin config changed (cross-tab sync)`
- ✅ Storage event se dispara correctamente

---

## 🧪 INTEGRATION TESTS

### **Test INT-1 - Full Flow: Admin cambia, Usuario ve impacto**

**Scenario:** Admin decide que TODOS los usuarios Free deben tener AI Publishing Assistance desactivado.

**Acción:**
1. **Admin (SuperAdmin Dashboard):**
   - Ve a Features
   - Encuentra "AI Publishing Assistance"
   - **DESMARCA** checkbox "Free"
   - **MANTIENE** marcado: Plus, Pro, Ent, Int

2. **Usuario Free (Settings):**
   - Ve a Smart Features
   - Intenta activar "AI Publishing Assistance"

**Resultado esperado:**
- ✅ Usuario Free ve 🔒 lock
- ✅ Badge: "Plus"
- ✅ Helper text: "Upgrade to Plus to unlock"
- ✅ Toggle no funciona
- ✅ Toast: "This feature cannot be changed"

3. **Usuario cambia a plan Plus:**
   - Ve a Profile → Change plan to "Plus"
   - Vuelve a Smart Features

**Resultado esperado:**
- ✅ "AI Publishing Assistance" ahora está "available"
- ✅ Lock desaparece
- ✅ Toggle funciona

---

### **Test INT-2 - Rollback Safety**

**Scenario:** Admin activa feature, usuarios la usan, admin la desactiva.

**Acción:**
1. Admin: Activa "Global" para "Experimental UI"
2. Usuario: Va a Smart Features → activa "Experimental UI" (si estuviera disponible)
3. Admin: Desactiva "Global" para "Experimental UI"
4. Usuario: Refresh Smart Features

**Resultado esperado:**
- ✅ "Experimental UI" muestra "disabled"
- ✅ Helper text: "Temporarily disabled by the platform"
- ✅ User preference se preserva en localStorage (pero feature está disabled)
- ✅ Cuando admin la reactive, user preference se respeta

---

## 📊 VALIDATION CHECKLIST

### **Console Logs Esperados:**

Al cambiar algo en SuperAdmin, deberías ver:
```
[FEATURES] Auto-synced to localStorage and SmartFeatures
[SYNC] SuperAdmin → SmartFeatures completed: { superAdminCount: 11, mappedCount: 5, totalCount: 5 }
[AUDIT LOG] Feature global toggle: { featureId: 'aiPublishingAssistance', enabled: false }
```

Al detectar cambios en SmartFeatures:
```
[FEATURES CONTEXT] SuperAdmin features changed (same-tab sync)
[FEATURES CONTEXT] Reloaded admin config: { features: {...} }
```

### **localStorage Keys:**

Deberías tener estas keys:
```javascript
localStorage.getItem('listlyup_superadmin_features'); // Array de 11 features
localStorage.getItem('listlyup_admin_feature_config'); // AdminFeatureConfig
localStorage.getItem('listlyup_user_feature_prefs'); // User preferences
```

---

## 🐛 TROUBLESHOOTING

### **Problema: Features no sincronizan**

**Debug:**
```javascript
// En Console
console.log('SuperAdmin Features:', JSON.parse(localStorage.getItem('listlyup_superadmin_features')));
console.log('SmartFeatures Config:', JSON.parse(localStorage.getItem('listlyup_admin_feature_config')));
```

**Solución:**
1. Verifica que ambos keys existen
2. Verifica que `superadmin-features-changed` event se dispara
3. Clear localStorage y reload

---

### **Problema: Toast no aparece**

**Debug:**
- Verifica que `sonner` está importado: `import { toast } from 'sonner@2.0.3'`
- Verifica que `<Toaster />` está en App.tsx
- Check console por errores

---

### **Problema: Plan override no funciona**

**Debug:**
```javascript
// Verifica plan del usuario
const profile = JSON.parse(localStorage.getItem('listlyup_profile_data'));
console.log('User Plan:', profile.plan);

// Verifica feature config
const config = JSON.parse(localStorage.getItem('listlyup_admin_feature_config'));
console.log('Photo Enhancement Config:', config.features.photoEnhancement);
```

**Solución:**
- Verifica que el plan del usuario es correcto (Free/Plus/Pro)
- Verifica que allowedPlans incluye el plan correcto

---

## ✅ SUCCESS CRITERIA

**Fase 1 (Sync Básico) es exitosa si:**
- ✅ Test 1.1, 1.2, 1.3, 1.4 pasan
- ✅ Console logs correctos
- ✅ localStorage persiste datos
- ✅ Same-tab sync funciona

**Fase 2 (Unified Catalog) es exitosa si:**
- ✅ Test 2.1, 2.2 pasan
- ✅ Plan "Plus" funciona correctamente
- ✅ 11 features visibles en SuperAdmin

**Fase 3 (Advanced) es exitosa si:**
- ✅ Test 3.1, 3.2, 3.3 pasan
- ✅ Delete propagation funciona
- ✅ Real-time sync (same-tab y cross-tab) funciona
- ✅ Toast notifications correctas

---

## 🚀 PRÓXIMOS PASOS

Si TODOS los tests pasan:
1. ✅ **Marcar como PRODUCTION-READY**
2. ✅ Documentar en CHANGELOG
3. ✅ Actualizar SUPERADMIN_SMARTFEATURES_SYNC_AUDIT.md con "COMPLETED"

Si algún test falla:
1. ❌ Documentar el error
2. ❌ Abrir issue P0
3. ❌ NO mergear hasta que esté resuelto

---

## 📝 NOTAS

- **Storage event limitation:** `storage` event solo funciona cross-tab, no same-tab. Por eso usamos `CustomEvent` para same-tab sync.
- **SMART_FEATURES static:** En Fase 2, SMART_FEATURES sigue siendo un array estático. Features dinámicas completas requieren refactor adicional (fuera de scope).
- **forcedOn field:** Implementado en estructura pero NO hay UI para togglarlo todavía (future enhancement).

---

**Testing completado por:** _____________  
**Fecha:** _____________  
**Resultado:** ✅ PASS / ❌ FAIL  
**Notas adicionales:** _____________
