# ✅ CHECKLIST DE VERIFICACIÓN - Sistema de Moderación

Use este documento para verificar que todo el sistema funciona correctamente.

---

## 🧪 TESTING MANUAL - FLUJOS COMPLETOS

### 📋 TEST 1: Reportar Listing desde Product Detail

**Rol necesario:** Cualquier usuario

- [ ] Abrir Product Detail de cualquier listing
- [ ] Hacer clic en menú [⋮] del header
- [ ] Verificar que aparece opción "Report"
- [ ] Hacer clic en "Report"
- [ ] Verificar que se abre sheet modal
- [ ] Verificar header: "🚩 Report Listing"
- [ ] Verificar que hay 8 opciones de razones
- [ ] Seleccionar al menos 1 razón
- [ ] Verificar que checkbox cambia de color
- [ ] Escribir texto en "Additional details"
- [ ] Verificar contador "X/500"
- [ ] Verificar que botón "Submit Report" se activa (azul)
- [ ] Hacer clic en "Submit Report"
- [ ] Verificar toast: "Report submitted. We'll review it shortly."
- [ ] Verificar que modal se cierra
- [ ] ✅ TEST COMPLETO

---

### 📋 TEST 2: Reportar Listing desde Group Detail

**Rol necesario:** Cualquier usuario

- [ ] Abrir Group Detail
- [ ] Scroll a sección de "Products"
- [ ] En cualquier listing, hacer clic en menú [⋮]
- [ ] Verificar que aparece opción "Report"
- [ ] Hacer clic en "Report"
- [ ] Verificar que se abre sheet modal
- [ ] Seguir mismos pasos que TEST 1
- [ ] ✅ TEST COMPLETO

---

### 📋 TEST 3: Reportar Grupo

**Rol necesario:** Cualquier usuario

- [ ] Abrir Group Detail de cualquier grupo
- [ ] Hacer clic en menú [⋮] del header (arriba derecha)
- [ ] Verificar que aparece opción "Report Group"
- [ ] Hacer clic en "Report Group"
- [ ] Verificar que se abre sheet modal
- [ ] Verificar header: "🚩 Report Group"
- [ ] Verificar que hay 7 opciones de razones (diferentes a listings)
- [ ] Verificar razones incluyen: "Harassment", "Hate Speech", etc.
- [ ] Seleccionar al menos 1 razón
- [ ] Escribir texto en "Additional details"
- [ ] Hacer clic en "Submit Report"
- [ ] Verificar toast: "Report submitted. We'll review it shortly."
- [ ] Verificar que modal se cierra
- [ ] ✅ TEST COMPLETO

---

### 📋 TEST 4: Message Owner desde Group Detail (Moderador)

**Rol necesario:** Moderador o Admin del grupo

**Setup:**
- [ ] Abrir `/components/group-detail/GroupDetailPage.tsx`
- [ ] Cambiar `initialUserRole` a `"moderator"` (línea ~384)
- [ ] O cambiar state en componente: `setUserRole("moderator")`

**Test:**
- [ ] Abrir Group Detail con rol "moderator"
- [ ] Scroll a sección de "Products"
- [ ] En cualquier listing, hacer clic en menú [⋮]
- [ ] Verificar que aparece opción **extra**: "Message Owner"
- [ ] (Esta opción NO debe aparecer para usuarios normales)
- [ ] Hacer clic en "Message Owner"
- [ ] Verificar que se navega al Chat
- [ ] Verificar que chat tiene badge: "🛡️ Platform Moderation"
- [ ] Verificar que chat tiene botón: "⚡ Take Action"
- [ ] Escribir un mensaje de prueba
- [ ] Hacer clic en "Send"
- [ ] Verificar que mensaje aparece
- [ ] ✅ TEST COMPLETO

---

### 📋 TEST 5: Message Owner desde Group Header (Platform Admin)

**Rol necesario:** Platform Admin

**Setup:**
- [ ] En `GroupHeader.tsx`, verificar que se pasa prop `onOpenModeration`
- [ ] En `GroupDetailPage.tsx`, verificar handler `handleOpenModeration`

**Test:**
- [ ] Abrir Group Detail como Platform Admin
- [ ] Hacer clic en menú [⋮] del header
- [ ] Verificar que aparece "Message Owner"
- [ ] Hacer clic en "Message Owner"
- [ ] Verificar navegación a chat de moderación con dueño del grupo
- [ ] Verificar badge "Platform Moderation"
- [ ] ✅ TEST COMPLETO

---

## 🔍 VERIFICACIÓN DE CÓDIGO

### ✅ Componentes React

- [ ] `ReportSheet.tsx` existe en `/components/product-detail/`
- [ ] `ReportGroupSheet.tsx` existe en `/components/groups/`
- [ ] `GroupSheetsProvider.tsx` existe en `/components/group-detail/`
- [ ] `ChatView.tsx` tiene badge de "Platform Moderation"
- [ ] `GroupHeader.tsx` tiene opción "Message Owner"

### ✅ Zustand Stores

- [ ] `useGroupSheets.tsx` existe en `/lib/`
- [ ] Store tiene `openReportGroup()` y `closeReportGroup()`
- [ ] Store tiene estado `reportGroup` con `{ open, groupId, groupName }`

### ✅ Action Registry

```bash
# Buscar estas acciones en /actions/registry.ts
```

- [ ] `'report-listing'` está registrada (línea ~594)
- [ ] `'report-group'` está registrada (línea ~740)
- [ ] `'message-owner'` está registrada (línea ~918)
- [ ] Todas tienen `handler` asignado
- [ ] Todas tienen `icon` correcto
- [ ] Todas tienen `permission` correcto

### ✅ Action Handlers

```bash
# Verificar en /actions/handlers.ts
```

- [ ] `handleReportGroup()` existe
- [ ] `handleMessageOwner()` existe
- [ ] `handleReportGroup` llama a `useGroupSheets.getState().openReportGroup()`
- [ ] `handleMessageOwner` llama a `createModerationChat()` y navega

### ✅ Integración en Pages

**GroupDetailPage.tsx:**
- [ ] Importa `actionRegistry`
- [ ] `handleReport()` llama a `actionRegistry['report-group'].handler()`
- [ ] Pasa `onNavigateToChat` prop al componente

**GroupSheetsProvider.tsx:**
- [ ] Renderiza `ReportGroupSheet`
- [ ] Pasa prop `group={{ id, name }}`
- [ ] Usa store `useGroupSheets` correctamente

**ChatView.tsx:**
- [ ] Tiene lógica para badge "Platform Moderation"
- [ ] Badge solo aparece si `chat.type === 'moderation'`
- [ ] Tiene botón "Take Action"

---

## 🎨 VERIFICACIÓN VISUAL

### Modal de Reporte (Listing)
- [ ] Header tiene "Product Page" en gris
- [ ] Título tiene ícono 🚩 rojo
- [ ] Título dice "Report Listing"
- [ ] Subtítulo: "Help us keep the community safe..."
- [ ] 8 opciones con íconos
- [ ] Checkboxes funcionan
- [ ] Borde se pone rojo al seleccionar
- [ ] Fondo se pone rojo claro al seleccionar
- [ ] Textarea tiene placeholder
- [ ] Contador "0/500" funciona
- [ ] Info box azul al final: "What happens next?"
- [ ] Botón "Submit Report" rojo
- [ ] Botón deshabilitado (gris) si no hay selección
- [ ] Botón "Cancel" como texto link

### Modal de Reporte (Grupo)
- [ ] Header tiene "Group Page" en gris
- [ ] Título dice "Report Group"
- [ ] Subtítulo menciona nombre del grupo
- [ ] 7 opciones diferentes a listings
- [ ] Resto igual a modal de listing

### Chat de Moderación
- [ ] Badge 🛡️ "Platform Moderation" visible
- [ ] Badge tiene color distintivo
- [ ] Botón "Take Action" tiene ícono ⚡
- [ ] Todo el chat tiene estilo normal
- [ ] Mensajes se ven igual que chat normal

---

## 📱 RESPONSIVE TESTING

### Mobile (320px - 768px)
- [ ] Modals ocupan 90vh de altura
- [ ] Botones son touch-friendly (48px altura)
- [ ] Texto es legible (no muy pequeño)
- [ ] Checkboxes son grandes (easy to tap)
- [ ] Scroll funciona smooth
- [ ] Header sticky se mantiene arriba

### Tablet (768px - 1024px)
- [ ] Layout se adapta bien
- [ ] No hay espacios raros
- [ ] Modals se ven proporcionados

### Desktop (1024px+)
- [ ] Modals están centrados
- [ ] No ocupan todo el ancho
- [ ] Se ven profesionales

---

## 🔐 PERMISOS Y ROLES

### Usuario Normal (visitor/member)
- [ ] ✅ Puede ver "Report" en listings
- [ ] ✅ Puede ver "Report Group" en grupos
- [ ] ❌ NO puede ver "Message Owner"
- [ ] ❌ NO puede ver "Hide Listing"
- [ ] ❌ NO puede ver "Delete Listing"

### Moderador de Grupo
- [ ] ✅ Todo lo de usuario normal
- [ ] ✅ Puede ver "Message Owner" en listings de SU grupo
- [ ] ✅ Puede ver "Hide Listing" en SU grupo
- [ ] ✅ Puede ver "Remove Member" en SU grupo
- [ ] ❌ NO puede moderar otros grupos

### Platform Admin
- [ ] ✅ Todo lo de moderador
- [ ] ✅ Puede ver "Message Owner" en TODOS los grupos
- [ ] ✅ Puede moderar CUALQUIER contenido
- [ ] ✅ Puede ver "Message Owner" en header de grupos

---

## 🐛 CASOS EDGE

### Test: Modal sin seleccionar nada
- [ ] Botón "Submit Report" está deshabilitado
- [ ] Botón es gris/opaco
- [ ] Cursor es "not-allowed"
- [ ] Click no hace nada

### Test: Cancelar modal
- [ ] Click en "Cancel" cierra modal
- [ ] Click en botón "← Back" cierra modal
- [ ] Click fuera del modal NO lo cierra (sheet)
- [ ] Form se resetea al cerrar

### Test: Texto máximo en textarea
- [ ] No permite escribir más de 500 caracteres
- [ ] Contador muestra "500/500"
- [ ] No hay error visual

### Test: Reportar mismo item dos veces
- [ ] Segundo reporte también se envía
- [ ] Toast aparece de nuevo
- [ ] Backend debe detectar duplicados

### Test: Navegación durante modal abierto
- [ ] Si usuario cambia de página, modal se cierra
- [ ] Si usuario hace back, modal se cierra
- [ ] No hay memory leaks

---

## 🔗 INTEGRACIÓN E2E

### Flow completo: Usuario → Moderador
1. [ ] Usuario reporta listing
2. [ ] Backend guarda reporte en DB
3. [ ] Moderador recibe notificación (email/push)
4. [ ] Moderador abre dashboard de reportes
5. [ ] Moderador ve el reporte
6. [ ] Moderador decide acción (contact vs. remove)
7. [ ] Sistema ejecuta acción
8. [ ] Usuario reportador recibe feedback
9. [ ] Usuario reportado recibe notificación

**Nota:** Pasos 2-9 requieren backend implementado

---

## 📊 LOGS Y DEBUGGING

### Console Logs
- [ ] No hay errores en consola al abrir modals
- [ ] No hay warnings de React
- [ ] No hay memory leaks
- [ ] Actions logean correctamente:
  ```
  Report group: { id: "1", name: "...", type: "group" }
  ```

### Network Tab
- [ ] POST request se envía al reportar (cuando backend esté)
- [ ] Status 200 OK
- [ ] Response tiene confirmation

### React DevTools
- [ ] States se actualizan correctamente
- [ ] Zustand store refleja cambios
- [ ] No hay re-renders innecesarios

---

## 🚀 PRE-PRODUCCIÓN CHECKLIST

### Backend
- [ ] Endpoint `/api/reports/listing` funciona
- [ ] Endpoint `/api/reports/group` funciona
- [ ] Endpoint `/api/moderation/chat` funciona
- [ ] Base de datos tiene tablas necesarias
- [ ] Validaciones server-side funcionan

### Email Notifications
- [ ] Template de "Nuevo Reporte" para moderadores
- [ ] Template de "Reporte Recibido" para usuarios
- [ ] Template de "Mensaje de Moderador" para usuarios
- [ ] Template de "Acción Tomada" para usuarios

### Dashboard de Moderación
- [ ] Vista de reportes pendientes
- [ ] Filtros por tipo/fecha/status
- [ ] Búsqueda por usuario/listing
- [ ] Botones de acción rápida

### Métricas y Monitoring
- [ ] Log de todos los reportes
- [ ] Métricas en tiempo real
- [ ] Alertas para spam de reportes
- [ ] Dashboard de analytics

### Documentación
- [ ] Guía para moderadores
- [ ] Guía para usuarios
- [ ] FAQ sobre reportes
- [ ] Términos de servicio actualizados

### Legal
- [ ] Política de moderación documentada
- [ ] Proceso de appeals definido
- [ ] Tiempos de respuesta establecidos
- [ ] Compliance con regulaciones locales

---

## ✅ FIRMA DE APROBACIÓN

**Funcionalidad Frontend:** [ ] ✅ Aprobado  
**Testeado por:** _________________  
**Fecha:** _________________  

**Integración Backend:** [ ] ✅ Aprobado  
**Testeado por:** _________________  
**Fecha:** _________________  

**UX/UI Design:** [ ] ✅ Aprobado  
**Revisado por:** _________________  
**Fecha:** _________________  

**Legal/Compliance:** [ ] ✅ Aprobado  
**Revisado por:** _________________  
**Fecha:** _________________  

---

## 🎯 RESULTADO FINAL

**Sistema de Moderación:** [ ] ✅ LISTO PARA PRODUCCIÓN

**Fecha de Go-Live planeada:** _________________

**Próxima revisión:** _________________

---

**Nota:** Esta checklist debe completarse ANTES de lanzar a producción. Cada [ ] debe convertirse en [x] después de verificación exitosa.
