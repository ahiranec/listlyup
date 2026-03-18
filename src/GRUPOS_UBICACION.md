# 📍 Ubicación de Componentes de Grupos en ListlyUp

## ✅ Estado Actual

Todos los componentes y páginas relacionadas con grupos **están implementados y conectados correctamente**.

---

## 📂 Estructura de Archivos

### **1. Páginas Principales**

#### **My Groups (Lista de grupos del usuario)**
- **Ubicación**: `/components/groups/MyGroupsPageNew.tsx`
- **Acceso**: Bottom Nav → "Groups" tab
- **Ruta en App.tsx**: `state.currentView === "groups"`
- **Características**:
  - Lista de grupos donde el usuario es miembro
  - Filtros avanzados (status, type, visibility, etc.)
  - Búsqueda de grupos
  - Vista de grupos invitados/pendientes

#### **Group Detail (Detalle de un grupo específico)**
- **Ubicación**: `/components/group-detail/GroupDetailPage.tsx`
- **Acceso**: Click en cualquier grupo desde MyGroupsPage
- **Ruta en App.tsx**: `state.currentView === "group-detail"`
- **Características**:
  - Hero section con info del grupo
  - Tabs: About, Listings, Members, Activity
  - Botones de acción según userRole (Join, Request, Leave)
  - Menú de acciones para admins/moderadores

#### **Group Management (Gestión para admins/moderators)** ✨ NUEVO
- **Ubicación**: `/components/groups/GroupManagementPage.tsx`
- **Acceso**: GroupDetailPage → Menu (⋮) → "Manage Group"
- **Ruta en App.tsx**: `state.currentView === "group-management"`
- **Características**:
  - Tab 1: Join Requests (solicitudes de unirse)
  - Tab 2: Reports (reportes de contenido/usuarios)
  - Badge count en header mostrando pendientes
  - Solo visible para admins/moderators

---

## 🧩 Componentes de Grupos

### **Componentes de Tarjetas (Cards)**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `GroupCard` | `/components/groups/GroupCard.tsx` | Tarjeta de grupo en MyGroupsPage |
| `JoinRequestCard` | `/components/groups/JoinRequestCard.tsx` | Solicitud de join en GroupManagementPage |
| `ReportCard` | `/components/groups/ReportCard.tsx` | Reporte en GroupManagementPage |

### **Componentes de Navegación**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `GroupHeader` | `/components/group-detail/GroupHeader.tsx` | Header con menú de acciones |
| `GroupTabs` | `/components/group-detail/GroupTabs.tsx` | Tabs: About/Listings/Members/Activity |
| `GroupsHeader` | `/components/groups/GroupsHeader.tsx` | Header de MyGroupsPage |

### **Componentes de Contenido**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `GroupHero` | `/components/group-detail/GroupHero.tsx` | Hero section con imagen/info |
| `GroupInfoSection` | `/components/group-detail/GroupInfoSection.tsx` | Sección de información del grupo |
| `GroupContentSection` | `/components/group-detail/GroupContentSection.tsx` | Sección de productos/servicios |
| `GroupMembersSection` | `/components/group-detail/GroupMembersSection.tsx` | Sección de miembros |
| `MemberTabContent` | `/components/group-detail/MemberTabContent.tsx` | Contenido de tabs |

### **Componentes de Interacción**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `GroupActionButton` | `/components/group-detail/GroupActionButton.tsx` | Botón Join/Request/Leave |
| `GroupQuickActionsMenu` | `/components/groups/GroupQuickActionsMenu.tsx` | Menú rápido de acciones |
| `InviteContactsSheet` | `/components/groups/InviteContactsSheet.tsx` | Invitar contactos al grupo |
| `InviteToGroupSheet` | `/components/group-detail/InviteToGroupSheet.tsx` | Invitar miembro a otro grupo |
| `MemberActionsSheet` | `/components/group-detail/MemberActionsSheet.tsx` | Acciones sobre un miembro |

### **Componentes de Filtros**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `GroupFiltersSheetNew` | `/components/groups/GroupFiltersSheetNew.tsx` | Filtros avanzados para grupos |
| `ExploreGroupsSheet` | `/components/groups/ExploreGroupsSheet.tsx` | Explorar grupos públicos |
| `SearchAndFilterBar` | `/components/groups/SearchAndFilterBar.tsx` | Barra de búsqueda y filtros |

### **Componentes de Diálogos**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `MuteNotificationsDialog` | `/components/groups/MuteNotificationsDialog.tsx` | Silenciar notificaciones |
| `LeaveGroupDialog` | `/components/groups/LeaveGroupDialog.tsx` | Confirmación para salir |

### **Componentes de Creación**

| Componente | Ubicación | Uso |
|------------|-----------|-----|
| `CreateGroupWizard` | `/components/groups/CreateGroupWizard.tsx` | Wizard de creación de grupo |
| `CreateGroupSheet` | `/components/groups/CreateGroupSheet.tsx` | Sheet para crear grupo |
| `GroupSuccessScreen` | `/components/groups/GroupSuccessScreen.tsx` | Pantalla de éxito |

---

## 🛤️ Flujo de Navegación

```
Home
 └─> Bottom Nav → Groups
      └─> MyGroupsPageNew
           ├─> Click en grupo → GroupDetailPage
           │    ├─> Menu → Manage Group (admin/mod) → GroupManagementPage
           │    │    ├─> Tab: Join Requests (JoinRequestCard)
           │    │    └─> Tab: Reports (ReportCard)
           │    ├─> Menu → Invite Members → InviteContactsSheet
           │    ├─> Menu → Group Settings
           │    └─> Menu → Leave Group → LeaveGroupDialog
           └─> Filters → GroupFiltersSheetNew
```

---

## 🔄 Navegación en App.tsx

### **ViewTypes Relacionados con Grupos**
```typescript
export type ViewType = 
  | "groups"              // MyGroupsPageNew
  | "group-detail"        // GroupDetailPage  
  | "group-management"    // GroupManagementPage ✨ NUEVO
  | ...
```

### **Navegación entre Vistas**

#### De Groups a Group Detail:
```typescript
<MyGroupsPage
  onGroupClick={(groupId, userRole) => {
    state.setSelectedGroupId(groupId);
    state.setSelectedGroupRole(userRole);
    state.setCurrentView("group-detail");
  }}
/>
```

#### De Group Detail a Group Management:
```typescript
<GroupDetailPage
  onNavigateToManagement={() => {
    state.setCurrentView("group-management");
  }}
/>
```

#### De Group Management a Group Detail:
```typescript
<GroupManagementPage
  onBack={() => {
    state.setCurrentView("group-detail");
  }}
/>
```

---

## 📊 Datos Mockeados

### **Grupos de Ejemplo** (en `MyGroupsPageNew.tsx`)
- Vecinos Valparaíso (admin)
- Tech Lovers Chile (member)
- Deportes Viña del Mar (moderator)
- Compra/Venta Reñaca (member)
- Artesanos Locales Premium (invited)

### **Join Requests** (en `GroupManagementPage.tsx`)
- @maria_silva (3d ago)
- @carlos_dev (5d ago)
- @ana_tech (1w ago)

### **Reports** (en `GroupManagementPage.tsx`)
- MacBook Pro listing - Spam/Scam (High priority)
- @spam_account profile - Inappropriate Content (Medium priority)

---

## 🎨 Tipos y Enums

### **Ubicación**: `/components/groups/newTypes.ts`

```typescript
export type GroupStatus = "active" | "suspended" | "archived" | "deleted";
export type GroupType = "general" | "event" | "community" | "marketplace";
export type GroupVisibility = "public" | "discoverable" | "invite_only" | "hidden";
export type JoinPolicy = "open" | "request" | "approval_required" | "closed";
export type MemberRole = "admin" | "moderator" | "member";
export type MemberStatus = "joined" | "invited" | "pending" | "banned";
```

---

## ✅ Checklist de Implementación

- [x] MyGroupsPageNew creado y conectado
- [x] GroupDetailPage creado y conectado
- [x] GroupManagementPage creado ✨ NUEVO
- [x] JoinRequestCard creado
- [x] ReportCard creado
- [x] Navegación entre vistas configurada
- [x] ViewTypes actualizados en `/types/index.ts`
- [x] GroupHeader con botón "Manage Group"
- [x] Badge count en "Manage Group" (pendingRequestsCount)
- [x] Exports en `/components/groups/index.ts`

---

## 🚀 Próximos Pasos (Opcional)

1. **Conectar con Backend**
   - Reemplazar mock data con llamadas API
   - Implementar autenticación real
   
2. **Funcionalidades Adicionales**
   - Aprobar/Rechazar join requests
   - Revisar/Resolver reports
   - Notificaciones push para admins
   
3. **Optimizaciones**
   - Lazy loading de componentes pesados
   - Paginación de grupos y miembros
   - Cache de datos frecuentes

---

## 📝 Notas Importantes

1. **Action Center vs Group Management**
   - Action Center: acciones urgentes de TODOS los grupos donde eres admin
   - Group Management: acciones urgentes de UN grupo específico

2. **Roles de Usuario**
   - `visitor`: no es miembro
   - `pending`: solicitó unirse
   - `member`: miembro regular
   - `moderator`: puede gestionar contenido
   - `admin`: control total del grupo

3. **Mock Data Location**
   - Grupos: `/components/groups/MyGroupsPageNew.tsx`
   - Join Requests: `/components/groups/GroupManagementPage.tsx`
   - Reports: `/components/groups/GroupManagementPage.tsx`
