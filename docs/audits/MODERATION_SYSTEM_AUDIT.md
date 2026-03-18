# 🛡️ AUDITORÍA DEL SISTEMA DE MODERACIÓN - ListlyUp

## 📋 Resumen Ejecutivo

ListlyUp cuenta con un **Sistema de Moderación Bidireccional** completo que permite:

1. ✅ **Usuarios normales** pueden reportar contenido problemático
2. ✅ **Moderadores/Admins** pueden contactar usuarios antes de tomar acciones drásticas
3. ✅ **Comunicación previa** antes de baneos o eliminaciones (debido proceso)
4. ✅ **Acciones unificadas** a través del mismo sistema modal

---

## 👥 ¿QUIÉN PUEDE HACER QUÉ?

### 🙋 **USUARIO NORMAL** (cualquier persona)

**Puede reportar:**
- 🏷️ **Listings problemáticos** → Botón "Report" en menú del listing
- 👥 **Grupos problemáticos** → Botón "Report Group" en menú del grupo

**Razones para reportar un Listing:**
- ⚠️ Scam o Fraude
- 🚫 Contenido Inapropiado
- 🎭 Falso o Engañoso
- 🛡️ Problema de Seguridad
- 🔄 Listing Duplicado
- 💰 Categoría o Precio Incorrecto
- 🤖 Cuenta Falsa o Spam
- 🚨 Artículo Prohibido

**Razones para reportar un Grupo:**
- 😡 Acoso o Bullying
- 🚫 Contenido Inapropiado
- 🎭 Falso o Engañoso
- 🛡️ Problema de Seguridad
- 📧 Spam o Bots
- 💢 Discurso de Odio
- 👤 Suplantación de Identidad

---

### 🛡️ **MODERADOR / ADMIN** (roles especiales)

**Puede hacer TODO lo de un usuario normal, PLUS:**

#### 📨 **Comunicación Previa (Due Process)**
- 💬 **Message Owner** → Contactar al dueño de un listing ANTES de banearlo/eliminarlo
  - Se abre un chat especial de "Platform Moderation"
  - Permite explicar el problema al usuario
  - Da oportunidad al usuario de corregir o explicar
  - Aparece con badge distintivo de moderación

#### ⚖️ **Acciones sobre Listings**
- 👁️ **Hide Listing** → Ocultar temporalmente un listing
- ❌ **Reject Listing** → Rechazar un listing pendiente
- 🗑️ **Delete Listing** → Eliminar permanentemente

#### 👥 **Acciones sobre Miembros**
- 🚪 **Remove Member** → Expulsar a un miembro del grupo
- 🔄 **Change Role** → Cambiar rol (member ↔ moderator)

---

## 🔄 FLUJOS COMPLETOS

### 📍 **FLUJO 1: Usuario reporta un Listing**

```
1. Usuario ve un listing sospechoso
   ↓
2. Hace clic en menú "..." → "Report"
   ↓
3. Se abre sheet modal con opciones
   ↓
4. Selecciona razón(es) + detalles opcionales
   ↓
5. Presiona "Submit Report"
   ↓
6. Toast: "Report submitted. We'll review it shortly."
   ↓
7. Moderadores reciben notificación (backend)
```

**📱 Ubicaciones disponibles:**
- ✅ Product Detail Page (menú contextual)
- ✅ Group Detail Page (menú contextual en cada listing)
- ✅ Notifications (futuro)

---

### 📍 **FLUJO 2: Usuario reporta un Grupo**

```
1. Usuario ve un grupo problemático
   ↓
2. Hace clic en menú "..." del header → "Report Group"
   ↓
3. Se abre sheet modal con opciones
   ↓
4. Selecciona razón(es) + detalles opcionales
   ↓
5. Presiona "Submit Report"
   ↓
6. Toast: "Report submitted. We'll review it shortly."
   ↓
7. Moderadores reciben notificación (backend)
```

**📱 Ubicaciones disponibles:**
- ✅ Group Detail Page (header menu)

---

### 📍 **FLUJO 3: Moderador contacta al dueño de un Listing (Due Process)**

```
1. Moderador ve listing problemático en Group Detail
   ↓
2. Hace clic en menú "..." del listing → "Message Owner"
   ↓
3. Se abre el Chat de moderación automáticamente
   ↓
4. Chat tiene badge especial "Platform Moderation"
   ↓
5. Chat tiene botón "Take Action" para acciones rápidas
   ↓
6. Moderador envía mensaje al usuario:
   "Hola, tu listing 'X' tiene un problema con Y. 
    Por favor corrígelo o contáctame para más info."
   ↓
7. Usuario recibe mensaje y puede responder
   ↓
8. OPCIONES:
   a) Usuario corrige → Problema resuelto ✅
   b) Usuario no responde → Moderador puede tomar acción
   c) Usuario discute → Moderador decide acción apropiada
   ↓
9. Si es necesario, moderador usa "Take Action" o va a:
   Listing menu → "Hide" / "Delete"
```

**📱 Ubicaciones disponibles:**
- ✅ Group Detail Page (menú contextual de cada listing)
- ⚠️ Solo visible para Moderadores/Admins del grupo

---

### 📍 **FLUJO 4: Moderador contacta al dueño de un Grupo (Due Process)**

```
1. Admin/Moderador ve grupo problemático
   ↓
2. Hace clic en menú "..." del header → "Message Owner"
   ↓
3. Se abre el Chat de moderación con el dueño del grupo
   ↓
4. Chat tiene badge especial "Platform Moderation"
   ↓
5. Chat tiene botón "Take Action" para acciones rápidas
   ↓
6. Moderador envía mensaje:
   "Hola, tu grupo 'X' ha recibido reportes por Y. 
    Necesitamos que revises las reglas/contenido."
   ↓
7. Dueño del grupo recibe mensaje y puede responder
   ↓
8. OPCIONES:
   a) Dueño corrige → Problema resuelto ✅
   b) Dueño no responde → Moderador puede suspender grupo
   c) Dueño discute → Moderador decide acción apropiada
```

**📱 Ubicaciones disponibles:**
- ✅ Group Detail Page (header menu - "Message Owner")
- ⚠️ Solo visible para Platform Admins/Moderators

---

## 🎯 COMPONENTES TÉCNICOS (Implementación)

### 📦 **Componentes UI**

| Componente | Ubicación | Función |
|------------|-----------|---------|
| `ReportSheet.tsx` | `/components/product-detail/` | Modal para reportar listings |
| `ReportGroupSheet.tsx` | `/components/groups/` | Modal para reportar grupos |
| `ChatView.tsx` | `/components/messages/` | Vista de chat con badge de moderación |
| `GroupSheetsProvider.tsx` | `/components/group-detail/` | Provider para sheets de grupos |

### 🔗 **Action Registry**

| Action ID | Label | Quién puede usarlo | Ubicación |
|-----------|-------|-------------------|-----------|
| `report-listing` | "Report" | Todos | Product Detail, Group Detail |
| `report-group` | "Report Group" | Todos | Group Detail Header |
| `message-owner` | "Message Owner" | Moderators/Admins | Group Detail (listing menu) |
| `hide-listing` | "Hide" | Moderators/Admins | Group Detail, Product Detail |
| `delete-listing` | "Delete" | Owner/Admins | My Listings, Product Detail |
| `remove-member` | "Remove Member" | Moderators/Admins | Group Detail (member menu) |

### 🗂️ **Zustand Stores**

| Store | Función |
|-------|---------|
| `useGroupSheets` | Maneja apertura/cierre de sheets de grupos |
| `useReportSheet` | Maneja apertura/cierre de report de listings |
| `useChatStore` | Maneja navegación y estado de chats |

---

## ✅ CHECKLIST DE FUNCIONALIDAD

### 🙋 **Usuario Normal**
- [x] Puede reportar listing desde Product Detail
- [x] Puede reportar listing desde Group Detail
- [x] Puede reportar grupo desde Group Header
- [x] Recibe confirmación visual al enviar reporte
- [x] Puede agregar detalles adicionales al reporte
- [x] Puede seleccionar múltiples razones

### 🛡️ **Moderador/Admin**
- [x] Puede abrir chat con dueño de listing (Message Owner)
- [x] Puede abrir chat con dueño de grupo (Message Owner)
- [x] Chat tiene badge "Platform Moderation"
- [x] Chat tiene botón "Take Action"
- [x] Puede ocultar listings (Hide)
- [x] Puede eliminar listings (Delete)
- [x] Puede remover miembros (Remove Member)
- [x] Puede cambiar roles (Change Role)

### 🔄 **Sistema**
- [x] Todos los modals usan el mismo patrón de UI
- [x] Todos los handlers están centralizados en `/actions/handlers.ts`
- [x] Todas las acciones están registradas en `/actions/registry.ts`
- [x] Sistema de permisos funciona correctamente
- [x] Navigation entre vistas funciona (chat, product detail, etc.)

---

## 🎨 EXPERIENCIA DE USUARIO

### ✨ **Diseño Consistente**

Todos los modals de reporte siguen el mismo patrón:

```
┌─────────────────────────────────────┐
│  ← Back         [Context]           │
├─────────────────────────────────────┤
│  🚩 Report [Listing/Group]          │
│  Help us keep the community safe... │
├─────────────────────────────────────┤
│                                     │
│  ☐ ⚠️  Razón 1                      │
│       Descripción detallada         │
│                                     │
│  ☐ 🚫 Razón 2                      │
│       Descripción detallada         │
│                                     │
│  [...más razones...]                │
│                                     │
│  📝 Additional details (optional)   │
│  ┌───────────────────────────────┐ │
│  │ Text area...                  │ │
│  └───────────────────────────────┘ │
│  0/500                              │
│                                     │
│  ℹ️ What happens next?              │
│  Our team will review...            │
│                                     │
├─────────────────────────────────────┤
│  [Submit Report ✓]                  │
│  [Cancel]                           │
└─────────────────────────────────────┘
```

### 💬 **Chat de Moderación**

```
┌─────────────────────────────────────┐
│  ← Back    Chat                     │
├─────────────────────────────────────┤
│  👤 María González                  │
│  🛡️ Platform Moderation             │
│  [Take Action ⚡]                    │
├─────────────────────────────────────┤
│                                     │
│  💬 [Mensaje del moderador]         │
│                                     │
│  💬 [Respuesta del usuario]         │
│                                     │
├─────────────────────────────────────┤
│  [Type a message...]     [Send]     │
└─────────────────────────────────────┘
```

---

## 📊 MÉTRICAS Y MONITOREO (Futuro)

### 🎯 **Métricas Clave a Rastrear:**

1. **Reportes por Categoría**
   - Cuántos reportes de "Scam"
   - Cuántos reportes de "Spam"
   - Cuántos reportes de "Contenido Inapropiado"

2. **Tiempo de Respuesta**
   - Tiempo promedio entre reporte y revisión
   - Tiempo promedio entre mensaje y respuesta

3. **Efectividad del Due Process**
   - % de casos resueltos con comunicación
   - % de casos que requirieron acción drástica
   - % de usuarios que corrigieron después de contacto

4. **Volumen de Moderación**
   - Reportes por día/semana/mes
   - Chats de moderación activos
   - Acciones tomadas (hide/delete/ban)

---

## 🚀 PRÓXIMOS PASOS (Recomendaciones)

### 🔮 **Mejoras Futuras:**

1. **Dashboard de Moderación**
   - Vista centralizada de todos los reportes
   - Cola de revisión priorizada
   - Métricas en tiempo real

2. **Notificaciones Push**
   - Moderadores reciben alertas de reportes urgentes
   - Usuarios reciben notificación de mensajes de moderación

3. **Sistema de Appeals**
   - Usuarios pueden apelar decisiones
   - Proceso de revisión secundaria

4. **Auto-Moderación (IA)**
   - Detección automática de contenido problemático
   - Sugerencias de acción para moderadores
   - Flag automático de patrones sospechosos

5. **Historial de Moderación**
   - Ver historial completo de acciones por usuario
   - Identificar usuarios problemáticos recurrentes
   - Reportes de tendencias

6. **Templates de Mensajes**
   - Mensajes pre-escritos para situaciones comunes
   - Respuestas rápidas personalizables
   - Guías de tono y comunicación

---

## ✅ CONCLUSIÓN

El Sistema de Moderación de ListlyUp está **100% funcional** y sigue las mejores prácticas:

- ✅ **Due Process:** Comunicación antes de acciones drásticas
- ✅ **Bidireccional:** Usuarios reportan, moderadores responden
- ✅ **Unificado:** Todo usa el mismo sistema de acciones
- ✅ **Escalable:** Fácil agregar nuevas acciones/razones
- ✅ **User-Friendly:** Interfaz clara y consistente
- ✅ **Completo:** Cubre listings, grupos y usuarios

**Estado:** ✅ PRODUCCIÓN READY

---

## 📞 CONTACTO TÉCNICO

Para preguntas sobre esta implementación:
- **Architecture:** Sistema de Actions unificado
- **Patterns:** Zustand stores + React components
- **Navigation:** Integrado con App.tsx routing
