# ListlyUp - Marketplace Mobile App

Una aplicación móvil moderna de marketplace refactorizada con React, TypeScript y Tailwind CSS.

## 🎯 Resumen del Proyecto

Este proyecto es una refactorización completa de un diseño importado desde Figma. Se ha transformado de código con positioning absoluto y componentes duplicados a una aplicación moderna, mantenible y escalable.

## ✨ Características

### Fase 1: Fundamentos ✅
- **Sistema de colores personalizado** basado en la paleta de ListlyUp
- **Componentes base reutilizables**:
  - `Header` - Cabecera con logo, notificaciones y perfil
  - `ProductCard` - Tarjeta de producto con animaciones
  - `BottomNav` - Navegación inferior con 5 tabs

### Fase 2: Refactorización ✅
- **Código limpio y mantenible**:
  - Eliminación de positioning absoluto
  - Uso de Flexbox y CSS Grid
  - Componentes sin duplicación
- **Datos estructurados**:
  - Array de productos mockeados
  - Tipado TypeScript completo
- **Funcionalidad de búsqueda**:
  - Filtrado en tiempo real
  - Estado vacío con animaciones

### Fase 3: Mejoras & Pulido ✅
- **Animaciones sutiles**:
  - Hover effects en tarjetas y botones
  - Transiciones suaves
  - Animaciones de entrada escalonadas
  - Scale effects en navegación
- **Estados interactivos**:
  - Loading skeletons
  - Toast notifications
  - Focus states en inputs
  - Modal de detalles de producto
- **Mejoras de UX**:
  - Clear button en búsqueda
  - Indicador de tab activo
  - Feedback visual en todas las interacciones
  - Filtros avanzados funcionales
  - Empty states con iconos

## 🎨 Sistema de Diseño

### Colores
- **Primary**: `#0f62fe` - Links, botones principales
- **Secondary**: `#001d6c` - Iconos de navegación
- **Destructive**: `#da1e28` - Notificaciones, alertas
- **Foreground**: `#21272a` - Texto principal
- **Muted**: `#697077` - Texto secundario
- **Border**: `#dde1e6`, `#c1c7cd` - Bordes

### Componentes Principales

#### ProductCard
```tsx
<ProductCard
  image={imageUrl}
  title="Product Name"
  price="7 USD"
  condition="New"
  visibility="Public"
  location="Location"
  type="sale"
  onClick={handleClick}
/>
```

#### Header
```tsx
<Header
  logo={logoUrl}
  notificationCount={9}
  onNotificationClick={handleNotifications}
  onProfileClick={handleProfile}
/>
```

#### BottomNav
```tsx
<BottomNav
  activeTab="home"
  onTabChange={handleTabChange}
/>
```

#### SearchBar
```tsx
<SearchBar
  value={searchQuery}
  onChange={setSearchQuery}
  onFilterClick={handleFilter}
  placeholder="Search"
/>
```

#### ProductModal
```tsx
<ProductModal
  product={selectedProduct}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  productImage={imageUrl}
/>
```

#### FilterSheet
```tsx
<FilterSheet
  isOpen={isFilterOpen}
  onClose={() => setIsFilterOpen(false)}
  onApplyFilters={handleApplyFilters}
/>
```

### Fase 4: Servicios Pluggables ✅
- **Arquitectura de Servicios**:
  - AI Service (Google Vision + LLM) con Mock/Real
  - Maps Service (Google Maps) con Mock/Real
  - Service Provider con React Context
  - Settings UI para activar/desactivar servicios
- **Publish Flow (5 pantallas)**:
  - Media: Upload + AI analysis
  - Basic Info: Pre-llenado por AI
  - Location: GPS + Search
  - Pricing: Precio, delivery, contacto
  - Preview: Validaciones automáticas

## 📁 Estructura del Proyecto

```
├── components/
│   ├── Header.tsx              # Cabecera con logo y acciones
│   ├── SearchBar.tsx           # Barra de búsqueda con filtros
│   ├── ProductCard.tsx         # Tarjeta de producto con animaciones
│   ├── BottomNav.tsx           # Navegación inferior
│   ├── ProductModal.tsx        # Modal de detalles de producto
│   ├── FilterSheet.tsx         # Panel de filtros avanzados
│   ├── SettingsSheet.tsx       # Configuración de servicios
│   ├── MapView.tsx             # Vista de mapa con productos
│   ├── ProductDetailPage.tsx   # Página completa de producto
│   ├── publish/                # Flujo de publicación (5 steps)
│   │   ├── PublishFlow.tsx
│   │   ├── MediaStep.tsx
│   │   ├── BasicInfoStep.tsx
│   │   ├── LocationStep.tsx
│   │   ├── PricingStep.tsx
│   │   └── PreviewStep.tsx
│   └── ui/                     # Componentes ShadcN
├── lib/
│   ├── config/
│   │   └── settings.ts         # Configuración global
│   ├── services/
│   │   ├── ai/                 # AI Service (Mock/Real)
│   │   └── maps/               # Maps Service (Mock/Real)
│   └── providers/
│       └── ServiceProvider.tsx # React Context Provider
├── data/
│   └── products.ts             # Datos mockeados de productos
├── guidelines/                 # Documentación técnica
├── imports/
│   ├── HomeMobile.tsx          # Diseño original de Figma
│   └── svg-*.ts                # SVGs importados
├── styles/
│   └── globals.css             # Estilos globales y variables
└── App.tsx                     # Componente principal
```

## 🚀 Próximos Pasos Sugeridos

1. **Backend Integration**
   - Conectar con API real
   - Implementar autenticación
   - Persistencia de datos

2. **Funcionalidades Adicionales**
   - ✅ Filtros avanzados (precio, condición, tipo, visibilidad)
   - ✅ Modal de detalles de producto
   - Vista de mapa real con geolocalización
   - Sistema de favoritos
   - Chat entre usuarios
   - Sistema de ofertas

3. **Mejoras de Performance**
   - Lazy loading de imágenes
   - Infinite scroll
   - Optimización de re-renders

4. **Responsive Design**
   - Adaptación para tablet
   - Versión desktop

## 🛠️ Tecnologías Utilizadas

- **React** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos utility-first
- **Lucide React** - Iconos
- **Sonner** - Toast notifications
- **ShadcN/UI** - Componentes base
- **Motion (Framer Motion)** - Animaciones
- **Google Vision API** - Análisis de imágenes (opcional)
- **Google Maps API** - Geolocalización (opcional)

## 💡 Mejoras Clave vs Diseño Original

| Antes | Después |
|-------|---------|
| Positioning absoluto | Flexbox/Grid |
| Componentes duplicados | Componentes reutilizables |
| Datos hardcodeados | Array estructurado |
| Sin interactividad | Hover, focus, animaciones |
| Sin búsqueda funcional | Filtrado en tiempo real |
| Sin feedback | Toast notifications |
| Código frágil | Mantenible y escalable |

---

**Desarrollado con ❤️ para ListlyUp**
