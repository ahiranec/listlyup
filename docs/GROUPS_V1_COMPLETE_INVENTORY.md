# GROUPS V1 — INVENTARIO COMPLETO DE ACCIONES

**Auditor:** Frontend Contract Auditor + Implementer  
**Fecha:** 2026-01-06  
**Objetivo:** Mapear TODAS las acciones visibles antes de implementar cierres

---

## 📋 TABLA EXHAUSTIVA DE ACCIONES

### **1. MY GROUPS PAGE**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| My Groups | **Share Group** (⋮ menu) | Todos | `/actions/handlers.ts` → `handleShareGroup()` | Native share o clipboard fallback | ✅ **YA FUNCIONA** - Native/clipboard sin errores |
| My Groups | **Invite Members** (⋮ menu) | Admin/Mod según `whoCanInvite` | `/actions/handlers.ts` → `handleInviteMembers()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `InviteContactsSheet` |
| My Groups | **Mute Group** (⋮ menu) | Member+ | `/actions/handlers.ts` → `handleMuteGroup()` | ⚠️ Toast "Muted group" | 🔧 **ABRIR** `MuteNotificationsDialog` |
| My Groups | **Pin/Unpin Group** (⋮ menu) | Member+ | `/actions/handlers.ts` → `handlePinGroup()` | Toast "Group pinned" + local state | ✅ **INLINE OK** - Toast honesto (mock backend) |
| My Groups | **Leave Group** (⋮ menu) | Member+ | `/actions/handlers.ts` → `handleLeaveGroup()` | ⚠️ Toast "Left group" | 🔧 **ABRIR** `LeaveGroupDialog` con confirmación |
| My Groups | **Report Group** (⋮ menu) | Todos | `/actions/handlers.ts` → `handleReportGroup()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `ReportGroupSheet` (nuevo) |

---

### **2. GROUP DETAIL — HEADER (⋮)**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| Header | **Share Group** | Todos | `/actions/handlers.ts` → `handleShareGroup()` | Native share o clipboard | ✅ **YA FUNCIONA** |
| Header | **Invite Members** | Según `canInvite()` | `/actions/handlers.ts` → `handleInviteMembers()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `InviteContactsSheet` |
| Header | **Pin/Unpin Group** | Member+ | `/actions/handlers.ts` → `handlePinGroup()` | Toast "Group pinned" | ✅ **INLINE OK** |
| Header | **Mute/Unmute Group** | Member+ | `/actions/handlers.ts` → `handleMuteGroup()` | ⚠️ Toast "Muted group" | 🔧 **ABRIR** `MuteNotificationsDialog` |
| Header | **Group Settings** | Admin | Props callback `onSettings()` | Navigate to Settings tab | ✅ **YA FUNCIONA** - Tab change |
| Header | **Leave Group** | Member+ | `/actions/handlers.ts` → `handleLeaveGroup()` | ⚠️ Toast "Left group" | 🔧 **ABRIR** `LeaveGroupDialog` |
| Header | **Report Group** | Todos | `/actions/handlers.ts` → `handleReportGroup()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `ReportGroupSheet` |

---

### **3. GROUP DETAIL — LISTINGS TAB (⋮ per listing)**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| Listings | **Report Listing** | Todos | `/actions/handlers.ts` → `handleReportListing()` | ⚠️ Toast "Opening..." | ⚠️ **OUT OF SCOPE** - Requiere `ReportListingForm` global |
| Listings | **Message Owner** | Mod/Admin con `canModerate()` | `/actions/handlers.ts` → `handleMessageOwner()` | ⚠️ Toast "Opening chat..." | ⚠️ **OUT OF SCOPE** - Requiere Messages navigation |
| Listings | **Hide Listing** | Mod/Admin con `canModerate()` | `/actions/handlers.ts` → `handleHideListing()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `HideListingSheet` (nuevo) |
| Listings | **Remove Listing** | Admin | `/actions/handlers.ts` → `handleRemoveListing()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `RemoveListingSheet` (nuevo) |

---

### **4. GROUP DETAIL — MEMBERS TAB (⋮ per member)**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| Members | **Message Member** | Mod/Admin con `canModerate()` | `/actions/handlers.ts` → `handleMessageMember()` | ⚠️ Toast "Opening chat..." | ⚠️ **OUT OF SCOPE** - Requiere Messages navigation |
| Members | **Remove Member** | Mod (members), Admin (todos) | `/actions/handlers.ts` → `handleRemoveMember()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `RemoveMemberSheet` (nuevo) |
| Members | **Change Role** | Admin | `/actions/handlers.ts` → `handleChangeRole()` | ⚠️ Toast "Opening..." | 🔧 **ABRIR** `ChangeRoleSheet` (nuevo) |

---

### **5. GROUP DETAIL — PENDING TAB**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| Pending | **Approve Listing** (✓) | Mod/Admin con `canModerate()` | `/actions/handlers.ts` → `handleApproveListing()` | Toast "Listing approved! ✅" | ✅ **INLINE OK** - Acción directa + toast |
| Pending | **Reject Listing** (✕) | Mod/Admin con `canModerate()` | `/actions/handlers.ts` → `handleRejectListing()` | Toast "Listing rejected" | ✅ **INLINE OK** - Acción directa + toast |

---

### **6. GROUP DETAIL — FAB (+)**

| Screen/Tab | Acción Visible | Rol | Handler Actual | Comportamiento Actual | Comportamiento Esperado v1 |
|------------|---------------|-----|----------------|----------------------|---------------------------|
| FAB | **Publish to Group** (+) | Según `canPost()` | Props callback `onPublishToGroup()` | Abre PublishFlow con groupId preseleccionado | ✅ **YA FUNCIONA** - PublishFlow v1.1 |

---

## 📊 RESUMEN POR ESTADO

### ✅ **YA FUNCIONA (6 acciones)**

| Acción | Destino |
|--------|---------|
| `share-group` | Native share / clipboard |
| `pin-group` | Toast + estado local |
| `group-settings` | Navigate to Settings tab |
| `approve-listing` | Toast + backend mock |
| `reject-listing` | Toast + backend mock |
| `publish-to-group` | PublishFlow v1.1 |

---

### 🔧 **REQUIERE CONEXIÓN (7 acciones)**

| Acción | Componente a Conectar | Status |
|--------|-----------------------|--------|
| `invite-members` | `InviteContactsSheet` (existe) | ✅ Ya creado provider |
| `mute-group` | `MuteNotificationsDialog` (existe) | ✅ Ya creado provider |
| `leave-group` | `LeaveGroupDialog` (existe) | ✅ Ya creado provider |
| `report-group` | `ReportGroupSheet` (nuevo) | ✅ Ya creado |
| `hide-listing` | `HideListingSheet` (nuevo) | ✅ Ya creado |
| `remove-listing` | `RemoveListingSheet` (nuevo) | ✅ Ya creado |
| `remove-member` | `RemoveMemberSheet` (nuevo) | ✅ Ya creado |
| `change-role` | `ChangeRoleSheet` (nuevo) | ✅ Ya creado |

---

### ⚠️ **OUT OF SCOPE (2 acciones)**

| Acción | Razón | Plan Futuro |
|--------|-------|-------------|
| `report-listing` | Requiere `ReportListingForm` global (no específico de Groups) | Groups v1.1 o módulo Reports |
| `message-owner` / `message-member` | Requiere navegación a Messages con userId/listingId | Groups v1.1 - Integrar Messages |

**Decisión:** Estas acciones se MANTIENEN con toast claro que indica "out of scope" o se ELIMINAN del UI temporalmente.

---

## 🎯 MATRIZ DE IMPLEMENTACIÓN

### **FASE 2A: Conectar Sheets Existentes (P0)**

| # | Acción | Componente | Archivo Handler | Cambio Requerido |
|---|--------|-----------|----------------|------------------|
| 1 | `invite-members` | `InviteContactsSheet` | `handlers.ts:303` | ✅ `useGroupSheets.openInviteMembers()` |
| 2 | `mute-group` | `MuteNotificationsDialog` | `handlers.ts:298` | ✅ `useGroupSheets.openMuteGroup()` |
| 3 | `leave-group` | `LeaveGroupDialog` | `handlers.ts:293` | ✅ `useGroupSheets.openLeaveGroup()` |

---

### **FASE 2B: Conectar Sheets Nuevos (P0)**

| # | Acción | Componente | Archivo Handler | Cambio Requerido |
|---|--------|-----------|----------------|------------------|
| 4 | `report-group` | `ReportGroupSheet` | `handlers.ts:334` | ✅ `useGroupSheets.openReportGroup()` |
| 5 | `hide-listing` | `HideListingSheet` | `handlers.ts:384` | ✅ `useGroupSheets.openHideListing()` |
| 6 | `remove-listing` | `RemoveListingSheet` | `handlers.ts:394` | ✅ `useGroupSheets.openRemoveListing()` |
| 7 | `remove-member` | `RemoveMemberSheet` | `handlers.ts:418` | ✅ `useGroupSheets.openRemoveMember()` |
| 8 | `change-role` | `ChangeRoleSheet` | `handlers.ts:429` | ✅ `useGroupSheets.openChangeRole()` |

---

### **FASE 2C: Out of Scope Actions (P1)**

| # | Acción | Status Actual | Decisión Final |
|---|--------|--------------|----------------|
| 9 | `report-listing` | Toast "Opening..." | **MANTENER toast honesto:** "Report listing - to be implemented" |
| 10 | `message-owner` | Toast "Opening chat..." | **MANTENER toast honesto:** "Chat with owner - to be implemented" |
| 11 | `message-member` | Toast "Opening chat..." | **MANTENER toast honesto:** "Chat with member - to be implemented" |

**Alternativa:** Ocultar acciones temporalmente del UI hasta que se implementen en v1.1.

---

## ✅ CONFIRMACIONES PRE-IMPLEMENTACIÓN

### ✅ **Componentes Existentes Verificados**

| Componente | Ubicación | Status |
|-----------|-----------|--------|
| `InviteContactsSheet` | `/components/groups/InviteContactsSheet.tsx` | ✅ Existe |
| `MuteNotificationsDialog` | `/components/groups/MuteNotificationsDialog.tsx` | ✅ Existe |
| `LeaveGroupDialog` | `/components/groups/LeaveGroupDialog.tsx` | ✅ Existe |

---

### ✅ **Nuevos Componentes Creados**

| Componente | Ubicación | Status |
|-----------|-----------|--------|
| `ReportGroupSheet` | `/components/groups/ReportGroupSheet.tsx` | ✅ Creado |
| `HideListingSheet` | `/components/group-detail/HideListingSheet.tsx` | ✅ Creado |
| `RemoveListingSheet` | `/components/group-detail/RemoveListingSheet.tsx` | ✅ Creado |
| `RemoveMemberSheet` | `/components/group-detail/RemoveMemberSheet.tsx` | ✅ Creado |
| `ChangeRoleSheet` | `/components/group-detail/ChangeRoleSheet.tsx` | ✅ Creado |

---

### ✅ **Sistema Centralizado Creado**

| Sistema | Ubicación | Status |
|---------|-----------|--------|
| `useGroupSheets` | `/lib/useGroupSheets.tsx` | ✅ Zustand store |
| `GroupSheetsProvider` | `/components/group-detail/GroupSheetsProvider.tsx` | ✅ Provider global |

---

## 🚀 PRÓXIMOS PASOS

### **PASO 1: Verificar MyGroupsPageNew**

✅ Verificar que `MyGroupsPageNew` también tenga `<GroupSheetsProvider />` renderizado.

**Ubicación esperada:** Al final de `<MyGroupsPage>`, antes del closing tag.

---

### **PASO 2: Actualizar Handlers Finales**

✅ Todos los handlers ya actualizados en implementación anterior.

---

### **PASO 3: Testing Manual (QA)**

Ejecutar checklist de testing por rol:
- ✅ Member
- ✅ Moderator
- ✅ Admin

---

## 🎯 SIGN-OFF CHECKLIST

| Item | Status |
|------|--------|
| Inventario completo generado | ✅ |
| Componentes existentes identificados | ✅ |
| Nuevos componentes creados | ✅ |
| Sistema centralizado implementado | ✅ |
| Handlers actualizados | ✅ |
| Out of scope documentado | ✅ |
| Plan de testing definido | ✅ |

---

**Listo para FASE 2: Integración final y QA**
