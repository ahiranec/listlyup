# My Groups Page

Sistema completo de gestión de grupos para ListlyUp con filtros avanzados, exploración de grupos, y creación de grupos.

## 📁 Estructura

```
components/groups/
├── MyGroupsPage.tsx          # Página principal con lógica de filtrado
├── GroupsHeader.tsx          # Header con búsqueda y botón crear
├── GroupCard.tsx             # Card de grupo con avatar, stats, y acciones
├── FilterButton.tsx          # Botón de filtros con chips activos
├── GroupFiltersSheet.tsx     # Sheet con 5 secciones de filtros
├── ExploreGroupsSheet.tsx    # Sheet para explorar grupos nuevos
├── CreateGroupSheet.tsx      # Sheet para crear un grupo
├── EmptyState.tsx            # Estado vacío con mensaje
├── types.ts                  # Tipos TypeScript
├── index.ts                  # Exports centralizados
└── README.md                 # Esta documentación
```

## ✨ Características

### 🎯 Sistema de Filtros (5 Secciones)

1. **⚡ Status** (3 opciones)
   - 🟢 Joined - Grupos en los que eres miembro
   - 🟡 Pending - Solicitudes pendientes de aprobación
   - 🔵 Invited - Invitaciones recibidas

2. **🎭 Role** (3 opciones)
   - 🔴 Admin - Administrador del grupo
   - 🔵 Moderator - Moderador del grupo
   - 🟢 Member - Miembro regular

3. **🎨 Group Type** (3 opciones)
   - 🌍 Public - Cualquiera puede unirse
   - 🔒 Private - Requiere aprobación
   - 🔐 Secret - Solo por invitación

4. **📦 Content** (4 opciones)
   - 📦 Has Products - Grupos con productos publicados
   - 🛠️ Has Services - Grupos con servicios publicados
   - ✅ Active - Con actividad en los últimos 30 días
   - ⚫ Inactive - Sin actividad reciente

5. **📍 Location** (Expandible con 6+ ubicaciones)
   - 🏖️ Valparaíso
   - 🌊 Viña del Mar
   - 🏄 Reñaca
   - 🌅 Concón
   - 🏝️ Zapallar
   - ⚓ Quintero

### 🃏 GroupCard - Información Completa

Cada card muestra:
- **Avatar** con iniciales del grupo como fallback
- **Nombre** del grupo (clickeable)
- **Descripción** (opcional, 1 línea)
- **Stats**:
  - 👥 Número de miembros
  - 📦 Productos publicados
  - 🛠️ Servicios publicados
  - 📍 Localidad
- **Badges**:
  - Role badge (Admin/Moderator/Member)
  - Status badge (Pending/Invited)
  - Group type badge (Private/Secret)
  - Activity badge (Inactive)
- **Menú de acciones** (⋮):
  - Para miembros: "Leave Group" (y "Manage" si es admin/mod)
  - Para pending: "Cancel Request"
  - Para invited: "Accept Invite" / "Decline Invite"

### 🔍 Explorar Grupos Nuevos

Sheet modal (`ExploreGroupsSheet`) que incluye:
- **Búsqueda** en tiempo real
- **Lista de grupos** disponibles con:
  - Avatar, nombre, descripción
  - Stats (miembros, productos, servicios)
  - Localidad
  - Badge de Private si aplica
  - **Botón "Join"** (o "Request to Join" para privados)
  - **Estado "Pending"** después de solicitar

### ➕ Crear Grupo

Sheet modal (`CreateGroupSheet`) con formulario completo:
- **Avatar** opcional con preview
- **Nombre** (requerido, max 50 chars)
- **Descripción** (opcional, max 200 chars)
- **Localidad** (requerido)
- **Tipo de grupo** (radio buttons con descripciones):
  - 🌍 Public - Visible y abierto a todos
  - 🔒 Private - Visible pero requiere aprobación
  - 🔐 Secret - Solo por invitación
- Botones: Cancel / Create Group

## 🎨 Patrón de Diseño

Sigue **exactamente** el mismo patrón que `MyListingsPage`:

### ✅ Consistencia
- Header sticky con back button y acción principal
- Search bar integrado
- Botón "Explore" destacado
- FilterButton con contador de filtros activos
- Chips de filtros activos (removibles con X)
- Lista scrolleable con animaciones
- Empty state informativo
- Sheet modals desde la derecha (filtros) y abajo (explore/create)

### 📱 Mobile-First
- Header compacto (56px)
- Búsqueda optimizada
- Cards responsivos
- Touch-friendly (botones mínimo 44x44px)
- Sheets con bordes redondeados superiores
- Animaciones suaves con Motion

### ♿ Accesibilidad
- Labels semánticos
- ARIA labels donde corresponde
- Contraste adecuado
- Focus states visibles
- Keyboard navigation

## 🚀 Uso

```tsx
import { MyGroupsPage } from "./components/groups";

function App() {
  return (
    <MyGroupsPage
      onBack={() => {
        // Navegar de vuelta
        setCurrentView("home");
      }}
      groups={myGroups}        // Opcional - usa mock data por defecto
      locations={locations}    // Opcional - usa mock data por defecto
    />
  );
}
```

## 📊 Datos Mock

La página incluye 8 grupos de ejemplo que cubren todos los estados y tipos:
- Grupos públicos, privados y secretos
- Roles: admin, moderator, member
- Estados: joined, pending, invited
- Con y sin productos/servicios
- Activos e inactivos
- En diferentes localidades

## 🔗 Navegación

Integrado en `App.tsx`:
- Tab "groups" del BottomNav navega a esta página
- Botón back regresa al home y resetea el tab activo
- Mantiene estado de filtros mientras está abierto

## 🎯 Próximos Pasos

✅ **COMPLETADO:**
- Página principal My Groups con filtros
- Sistema de exploración de grupos
- **Wizard completo de creación de grupos (4 pasos)**
- **Sistema de invitaciones con 3 métodos** (Ver: `INVITE_SYSTEM.md`)

Ideas para expandir la funcionalidad:
- Página de detalle de grupo individual
- Chat de grupo
- Gestión de miembros (para admins)
- Backend para invitaciones (API + DB)
- Notificaciones de actividad del grupo
- Integración con backend real

## 📚 Documentación Adicional

- **`INVITE_SYSTEM.md`** - Sistema completo de invitaciones
- **`PHASE_1_SHARE_PRODUCTS.md`** - Sistema de compartir productos en grupos