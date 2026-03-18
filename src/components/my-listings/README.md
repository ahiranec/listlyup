# My Listings - Sistema de Filtros

## 📋 Descripción General

Sistema completo de filtros para **My Listings** (gestión personal de listados), diseñado específicamente para que los vendedores administren sus propias publicaciones.

## 🎯 Características

### **5 Secciones de Filtros MVP**

#### 1️⃣ **Status** (4 estados MVP)
Permite filtrar por el ciclo de vida del listing:
- Active
- Paused
- Expiring Soon
- Expired

#### 2️⃣ **Alerts** (3 señales)
Indicadores que requieren atención:
- **Has Messages**: Listados con mensajes/conversaciones
- **Reported**: Listados reportados por usuarios
- **Expiring Soon**: Próximos a expirar

#### 3️⃣ **Listing Type** (3 tipos MVP)
- Product
- Service
- Event

#### 4️⃣ **Visibility & Groups**
Combinación de visibilidad y filtrado por grupos:

**Visibility:**
- Public
- Groups Only

**Groups Scope:**
- All Groups
- My Groups Only
- Specific Groups (selector múltiple)

#### 5️⃣ **Extras** (3 métricas)
Indicadores de rendimiento:
- **Has Discount**: Con descuento activo
- **Low Views**: Pocas visualizaciones
- **High Views**: Muchas visualizaciones

---

## 🏗️ Arquitectura

```
/components/my-listings/
├── MyListingsFilterSheet.tsx       # Componente principal (bottom sheet)
├── filters/
│   ├── StatusSection.tsx          # Sección de estados
│   ├── AlertsSection.tsx          # Sección de alertas
│   ├── ListingTypeSection.tsx     # Sección de tipos
│   ├── VisibilityGroupsSection.tsx # Sección de visibilidad + grupos
│   ├── ExtrasSection.tsx          # Sección de extras
│   └── index.ts                   # Barrel export
├── hooks/
│   └── useMyListingsFilters.ts    # Hook de gestión de filtros (opcional)
├── types.ts                        # Tipos TypeScript
└── README.md                       # Este archivo
```

---

## 🎨 Diseño Visual

El sistema usa **bottom sheet** (modal desde abajo) con:
- ✅ Mismo contenedor que el filtro público de Listings
- ✅ Handle bar superior para arrastrar
- ✅ Altura de `92vh` con bordes redondeados superiores
- ✅ Header con título + botón "Clear all" + botón cerrar (X)
- ✅ Contenido scrollable con secciones colapsables
- ✅ Footer fijo con botones "Reset" y "Apply Filters"
- ✅ Animaciones suaves de entrada/salida

---

## 💻 Uso

### En MyListingsPage

```tsx
import { MyListingsFilterSheet } from "./my-listings";

function MyListingsPage() {
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({...});

  return (
    <>
      {/* Botón para abrir filtros */}
      <button onClick={() => setIsFilterSheetOpen(true)}>
        Filters
      </button>

      {/* Bottom Sheet de Filtros */}
      <MyListingsFilterSheet
        open={isFilterSheetOpen}
        onOpenChange={setIsFilterSheetOpen}
        filters={filters}
        groups={groups}
        activeFilterCount={activeFilterCount}
        onStatusChange={(status) => toggleFilter("status", status)}
        onHasMessagesChange={(val) => setFilters(prev => ({ ...prev, hasMessages: val }))}
        // ... más handlers
        onClearAll={clearAllFilters}
      />
    </>
  );
}
```

---

## 🔧 Extensión

### Agregar un nuevo filtro

1. **Crear el componente de sección:**
```tsx
// /components/my-listings/filters/NewSection.tsx
export function NewSection({ isOpen, onToggle, ... }) {
  return (
    <FilterSection
      title="New Filter"
      icon={YourIcon}
      isOpen={isOpen}
      onToggle={onToggle}
      selectedLabel={selectedLabel}
    >
      {/* Contenido */}
    </FilterSection>
  );
}
```

2. **Actualizar types.ts:**
```tsx
export interface FilterState {
  // ... filtros existentes
  newFilter: boolean; // o el tipo que necesites
}
```

3. **Agregar al MyListingsFilterSheet.tsx:**
```tsx
<NewSection
  isOpen={openSections.newFilter}
  onToggle={() => toggleSection("newFilter")}
  // ... props
/>
```

---

## 🔄 Diferencias con el Filtro Público

| Característica | Filtro Público (Browse) | My Listings Filter |
|----------------|------------------------|-------------------|
| **Status** | Solo "Lifecycle" básico | 11 estados detallados |
| **Alerts** | ❌ No existe | ✅ Has Messages, Reported, Expiring Soon |
| **Visibility** | ❌ No se filtra (se excluye del público) | ✅ Public, Unlisted, Groups Only, Hidden |
| **Groups** | Solo "shared in" | Scope completo + selector múltiple |
| **Extras** | ❌ No existe | ✅ Discount, Low/High Views |
| **Propósito** | Búsqueda de compradores | Gestión de vendedor |

---

## 📊 Estado de Filtros

```tsx
interface FilterState {
  status: Set<ListingLifecycle>;           // Estados múltiples
  type: Set<ListingType>;                  // Tipos múltiples
  visibility: Set<ListingVisibility>;      // Visibilidades múltiples
  selectedGroups: Set<string>;             // IDs de grupos
  groupsScope: "all" | "public" | "my-groups" | "specific";
  selectedEventTypes: Set<string>;         // IDs de tipos de evento
  hasMessages: boolean;                    // Alert flag
  isReported: boolean;                     // Alert flag
  isExpiringSoon: boolean;                 // Alert flag
  discounted: boolean;                     // Extra flag
  lowEngagement: boolean;                  // Extra flag (low views)
  highEngagement: boolean;                 // Extra flag (high views)
}
```

---

## ✅ Checklist de Implementación

- [x] 5 secciones de filtros creadas
- [x] Componentes modulares y reutilizables
- [x] Bottom sheet con mismo estilo que filtro público
- [x] Secciones colapsables con animaciones
- [x] Integración completa con MyListingsPage
- [x] Filtrado reactivo en tiempo real
- [x] Chips de filtros activos
- [x] Botón "Clear all" funcional
- [x] Conteo de filtros activos
- [x] Responsive y Mobile-First
- [x] Documentación completa

---

## 🎯 Próximos Pasos Sugeridos

1. **Backend Integration**: Conectar los filtros a la API real
2. **Persistencia**: Guardar preferencias de filtros en localStorage
3. **Presets**: Filtros predefinidos ("Needs attention", "Active only", etc.)
4. **Badges**: Indicadores visuales de alertas en la lista
5. **Export**: Exportar listados filtrados a CSV/Excel
6. **Bulk Actions**: Aplicar acciones masivas a listados filtrados

---

## 📝 Notas Técnicas

- **Componente base**: Reutiliza `FilterSection` del sistema público
- **UI Components**: Usa shadcn/ui (Sheet, Checkbox, RadioGroup, Label)
- **Animaciones**: Motion (Framer Motion) para transiciones suaves
- **Icons**: lucide-react
- **Layout**: Bottom sheet con `side="bottom"` y `h-[92vh]`
- **Accessibility**: ARIA labels y sr-only text para lectores de pantalla

---

**Última actualización**: Diciembre 2024
**Versión**: 1.0.0