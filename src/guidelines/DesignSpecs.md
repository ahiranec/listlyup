# ListlyUp - Design Specifications
## Documento de Especificaciones para Figma Design

---

## 📐 Design Tokens

### Colores

#### Colores Primarios
```
Primary (Azul):        #0f62fe
Primary Foreground:    #ffffff
Secondary (Navy):      #001d6c
Secondary Foreground:  #ffffff
Destructive (Rojo):    #da1e28
Destructive Foreground: #ffffff
```

#### Colores de Texto
```
Foreground (Texto principal):  #21272a
Muted Foreground (Secundario): #697077
```

#### Colores de Fondo
```
Background:           #ffffff
Muted (Gris claro):   #f5f5f5
Card:                 #ffffff
Card Foreground:      #21272a
```

#### Colores de Borde
```
Border:               #dde1e6
Border Secondary:     #c1c7cd
Input Background:     #ffffff
Switch Background:    #cbced4
```

#### Otros
```
Accent:               #f5f5f5
Accent Foreground:    #21272a
Ring (Focus):         #0f62fe
Status Bar:           #d9d9d9
```

### Tipografía

#### Font Weights
```
Medium: 500
Normal: 400
```

#### Font Sizes
```
Base:     16px (1rem)
Small:    14px (0.875rem)
Tiny:     12px (0.75rem)
Medium:   18px (1.125rem)
Large:    20px (1.25rem)
```

#### Line Heights
```
Base: 1.5 (24px @ 16px)
```

### Espaciados

#### Padding/Gap Comunes
```
xs:  4px  (0.25rem)
sm:  8px  (0.5rem)
md:  12px (0.75rem)
lg:  16px (1rem)
xl:  24px (1.5rem)
2xl: 32px (2rem)
```

### Border Radius
```
Base:   8px  (0.5rem)
Small:  4px  (calc(0.5rem - 4px))
Medium: 6px  (calc(0.5rem - 2px))
Large:  8px  (0.5rem)
XL:     12px (calc(0.5rem + 4px))
Full:   9999px (rounded-full)
```

---

## 📱 Layout General

### Canvas / Viewport
```
Max Width:  480px (mobile-first)
Min Height: 100vh
Background: #ffffff
Margin:     auto (centrado)
```

---

## 🧩 Componentes

### 1. Status Bar (Barra de Estado del Sistema)

**Dimensiones:**
```
Width:  100%
Height: 45px
```

**Estilos:**
```
Background: #d9d9d9
```

**Nota:** Simula la barra de estado de dispositivos móviles.

---

### 2. Header

**Dimensiones:**
```
Width:  100%
Height: 56px
Padding: 10px 16px (py-2.5 px-4)
```

**Estilos:**
```
Background: #f5f5f5 (muted)
Border-bottom: 1px solid #dde1e6
```

**Estructura:**
```
┌──────────────────────────────────┐
│ [Logo]              [Bell] [User]│ 
└──────────────────────────────────┘
```

#### Logo
```
Height: 32px
Width:  96px (auto)
Object-fit: contain
Object-position: left
```

#### Iconos de Acción
```
Size: 20px × 20px
Color: #001d6c (secondary)
Padding: 8px (p-2)
Background (hover): rgba(255, 255, 255, 0.5)
Border-radius: 9999px (full)
Transition: all 200ms
Gap entre iconos: 8px
```

**Estados Hover:**
- Iconos: `scale(1.1)`
- Background: `rgba(255, 255, 255, 0.5)`

#### Notification Badge
```
Position: absolute
Top: -4px
Right: -4px
Height: 20px
Min-width: 20px
Padding: 0 6px
Background: #da1e28 (destructive)
Color: #ffffff
Font-size: 11px
Border-radius: 9999px
Animation: fade-in, zoom-in (200ms)
```

---

### 3. SearchBar

**Dimensiones:**
```
Width:  100%
Height: 68px
Padding: 8px 12px (py-2 px-3)
```

**Estilos:**
```
Background: #f5f5f5 (muted)
Border-bottom: 1px solid #dde1e6
```

**Estructura:**
```
┌────────────────────────────────────────┐
│ [Map View] | [🔍 Search...] [Filter] │
└────────────────────────────────────────┘
```

#### Map View Button
```
Font-size: 18px
Color: #0f62fe (primary)
Letter-spacing: -0.5px
Transition: opacity 200ms
Hover: opacity 0.8
```

#### Divider
```
Width: 1px
Height: 40px
Background: #dde1e6
Opacity: 0.5
```

#### Search Input Container
```
Flex: 1
Max-width: 62%
Height: 48px
Padding: 12px 16px (py-3 px-4)
Background: #ffffff
Border-bottom: 1px solid #c1c7cd
Transition: border-color 200ms

Estado Focus:
Border-color: #0f62fe (primary)
```

#### Search Icon
```
Size: 20px × 20px
Color (default): #697077 (muted-foreground)
Color (focus): #0f62fe (primary)
Flex-shrink: 0
Transition: color 200ms
```

#### Input Field
```
Flex: 1
Font-size: 16px
Color: #21272a
Background: transparent
Placeholder color: #697077
Border: none
Outline: none
```

#### Clear Button (X)
```
Display: conditional (solo cuando hay texto)
Padding: 4px
Border-radius: 9999px
Icon size: 16px × 16px
Color: #697077
Hover background: #f5f5f5
Transition: colors 200ms
```

#### Filter Button
```
Padding: 8px (p-2)
Border-radius: 9999px
Icon size: 24px × 24px
Color: #21272a
Hover background: #ffffff
Hover scale: 1.1
Transition: all 200ms
```

---

### 4. ProductCard

**Dimensiones:**
```
Width:  100% (en grid de 2 columnas)
Height: auto (flexible)
Min-height: ~340px aprox.
```

**Estilos:**
```
Background: #ffffff
Border: 1px solid #dde1e6
Border-radius: 0 (sin redondeo)
Overflow: hidden
Transition: shadow 200ms
Hover shadow: 0 10px 15px -3px rgba(0,0,0,0.1)
Cursor: pointer
```

**Estructura:**
```
┌──────────────────┐
│                  │
│     Imagen       │ ← 220px altura
│                  │
├──────────────────┤
│ Título           │
│                  │
│ Price: $XX       │
│ Condition: XXX   │
│ Type: For Sale   │
│ Location: XXX    │
│                  │
│ More Info →      │
└──────────────────┘
```

#### Image Container
```
Height: 220px
Width: 100%
Background: #f5f5f5 (muted)
Overflow: hidden
Position: relative

data-field: "listing-image"
DB: listing_images.image_url (is_primary = true)
```

#### Image
```
Width: 100%
Height: 100%
Object-fit: cover
Transition: transform 300ms
Hover: scale(1.05)
```

#### Content Container
```
Padding: 12px 16px (py-3 px-4)
Display: flex
Flex-direction: column
Gap: 16px
```

#### Título
```
Font-size: 20px
Line-height: 1.1
Line-clamp: 1 (trunca con ...)
Color: #21272a

data-field: "listing-title"
DB: listings.title
```

#### Details Section
```
Font-size: 14px
Color: #21272a
Line-height: 1.5
Min-height: 60px
Gap: 4px entre líneas
```

**Campos obligatorios (siempre mostrados):**

1. **Price/Tipo**
   ```
   data-field: "price-type"
   DB: listings.price_amount + listings.currency + listings.price_type
   Ejemplo: "$25 or Best Offer"
   Fallback: "Price not specified"
   ```

2. **Condition**
   ```
   data-field: "condition"
   DB: listings.condition
   Ejemplo: "Condition: Like New"
   Fallback: "Condition: N/A"
   ```

3. **Type**
   ```
   data-field: "subtype"
   DB: listings.subtype
   Valores: "For Sale" | "For Trade"
   Ejemplo: "Type: For Sale"
   ```

4. **Location**
   ```
   data-field: "location"
   DB: listing_locations.meetup_place_note OR locations.address_line1 + city
   Ejemplo: "Location: Downtown Seattle"
   Fallback: "Location: Not specified"
   ```

#### Action Button
```
Padding: 0 16px 16px (px-4 pb-4)

data-action: "view-listing-detail"
```

#### More Info Link
```
Display: flex
Align-items: center
Gap: 16px (default), 20px (hover)
Color: #0f62fe (primary)
Font-size: 14px
Letter-spacing: 0.5px
Transition: gap 200ms
```

#### Arrow Icon
```
Size: 20px × 20px
Transition: transform 200ms
Hover: translateX(4px)
```

**Estados:**
- Default: gap 16px, no transform
- Hover: gap 20px, shadow-lg, arrow translateX(4px), image scale(1.05)

---

### 5. ProductCardSkeleton

**Dimensiones:**
```
Mismas dimensiones que ProductCard
Height: ~340px (igual a ProductCard)
```

**Estilos:**
```
Background: #ffffff
Border: 1px solid #dde1e6
```

**Estructura:**
```
┌──────────────────┐
│                  │
│  [Gris pulso]    │ ← 220px altura
│                  │
├──────────────────┤
│ [Línea gris]     │ ← Título
│                  │
│ [Línea gris]     │ ← Precio
│ [Línea gris]     │ ← Condición
│ [Línea gris]     │ ← Tipo
│ [Línea gris]     │ ← Ubicación
│                  │
│ [Línea gris]     │ ← Botón
└──────────────────┘
```

#### Image Skeleton
```
Height: 220px
Width: 100%
Background: linear-gradient shimmer
Animation: pulse
```

#### Line Skeletons
```
Height: 16px
Width: variado (60%, 80%, 70%)
Background: #f5f5f5
Border-radius: 4px
Animation: pulse
```

**Animación Pulse:**
```
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.5 }
}
Duration: 2s
Timing: ease-in-out
Iteration: infinite
```

---

### 6. ProductModal

**Dimensiones:**
```
Width: 100% (max-width 480px)
Height: 90vh
Position: fixed bottom sheet
```

**Estilos:**
```
Background: #ffffff
Border-radius: 12px 12px 0 0 (top corners)
Box-shadow: 0 -4px 6px -1px rgba(0,0,0,0.1)
```

**Estructura:**
```
┌─────────────────────────────┐
│ [X]                Product │ ← Header
├─────────────────────────────┤
│                             │
│        Imagen Grande        │
│                             │
├─────────────────────────────┤
│ Título del Producto         │
│                             │
│ $XX or Best Offer           │
│ Condition: Like New         │
│ Type: For Sale              │
│ Location: XXX               │
│                             │
│ Description...              │
│                             │
└─────────────────────────────┘
```

#### Header
```
Padding: 16px 24px
Border-bottom: 1px solid #dde1e6
Display: flex
Justify-content: space-between
```

#### Close Button
```
Size: 40px × 40px
Padding: 8px
Border-radius: 9999px
Hover background: #f5f5f5
Icon size: 20px × 20px
```

#### Image
```
Width: 100%
Height: 300px
Object-fit: cover
```

#### Content
```
Padding: 24px
Overflow: auto
Flex: 1
```

---

### 7. FilterSheet

**Dimensiones:**
```
Width: 100% (max-width 480px)
Height: 80vh
Position: fixed bottom sheet
```

**Estilos:**
```
Background: #ffffff
Border-radius: 12px 12px 0 0
Padding: 0
```

**Estructura:**
```
┌─────────────────────────────┐
│ [Filter Icon] Filters   [X] │ ← Header (border-bottom)
│ Filter products by...       │
├─────────────────────────────┤
│                             │
│ Type                        │
│ ○ All                       │
│ ○ For Sale                  │
│ ○ For Trade                 │
│                             │
│ Condition                   │
│ ○ All                       │
│ ○ New                       │
│ ○ Like New                  │
│ ○ Used                      │
│                             │
│ Visibility                  │
│ ○ All                       │
│ ○ Public                    │
│ ○ Group                     │
│                             │
│ Price Range: $0 - $100      │
│ [━━━━━━○━━━━━━━━━━━]        │
│                             │
├─────────────────────────────┤
│ [Reset]    [Apply Filters]  │ ← Footer (border-top)
└─────────────────────────────┘
```

#### Header
```
Padding: 16px 24px
Border-bottom: 1px solid #dde1e6
```

#### Title Row
```
Display: flex
Justify-content: space-between
Align-items: center
Gap: 8px
```

#### Filter Icon
```
Size: 20px × 20px
Color: #0f62fe (primary)
```

#### Close Button
```
Padding: 8px
Border-radius: 9999px
Hover background: #f5f5f5
```

#### Description
```
Font-size: 14px
Color: #697077
Margin-top: 8px
```

#### Content Area
```
Padding: 24px
Overflow: auto
Flex: 1
Gap between sections: 32px
```

#### Filter Section
```
Display: flex
Flex-direction: column
Gap: 12px
```

#### Label
```
Font-size: 16px
Font-weight: 500
Color: #21272a
```

#### Radio Group
```
Display: flex
Flex-direction: column
Gap: 12px
```

#### Radio Item
```
Display: flex
Align-items: center
Gap: 8px
```

#### Radio Button
```
Size: 20px × 20px
Border: 2px solid #dde1e6
Border-radius: 9999px

Checked:
Border-color: #0f62fe
Background: #0f62fe
Inner dot: 10px × 10px white
```

#### Slider
```
Width: 100%
Height: 20px
Track height: 4px
Track background: #dde1e6
Filled track: #0f62fe
Thumb size: 20px × 20px
Thumb background: #0f62fe
Thumb border: 2px solid white
Thumb shadow: 0 2px 4px rgba(0,0,0,0.1)
```

#### Footer
```
Padding: 16px 24px
Border-top: 1px solid #dde1e6
Background: #ffffff
```

#### Buttons Container
```
Display: flex
Gap: 12px
```

#### Reset Button
```
Flex: 1
Padding: 12px 24px
Border: 1px solid #dde1e6
Border-radius: 8px
Background: transparent
Color: #21272a
Hover background: #f5f5f5
Transition: colors 200ms
```

#### Apply Button
```
Flex: 1
Padding: 12px 24px
Background: #0f62fe (primary)
Color: #ffffff
Border-radius: 8px
Border: none
Hover opacity: 0.9
Transition: opacity 200ms
```

---

### 8. BottomNav

**Dimensiones:**
```
Width: 100% (max-width 480px)
Height: auto (~64px)
Position: fixed bottom 0
Padding: 8px 16px
```

**Estilos:**
```
Background: #ffffff
Border-top: 1px solid #dde1e6
Box-shadow: 0 -2px 10px rgba(0,0,0,0.05)
Margin: auto (centrado)
```

**Estructura:**
```
┌──────────────────────────────────────┐
│ [🏠]  [👥]  [➕]  [🔍]  [☰]         │
│ Home  Groups Publish Products Menu   │
└──────────────────────────────────────┘
```

#### Nav Items Container
```
Display: flex
Justify-content: space-between
Align-items: center
```

#### Nav Item Button
```
Display: flex
Flex-direction: column
Align-items: center
Gap: 8px
Padding: 4px 8px
Transition: all 200ms

Hover: scale(1.05)
Active: opacity 1
Inactive: opacity 0.6
```

#### Icon
```
Size: 24px × 24px
Color: #001d6c (secondary)
Transition: color 200ms
```

#### Label
```
Font-size: 12px
Color: #001d6c (secondary)
Transition: all 200ms
```

#### Active Indicator
```
Position: absolute
Bottom: 0
Width: 32px
Height: 2px
Background: #001d6c (secondary)
Border-radius: 2px 2px 0 0
Animation: slide-in-from-bottom (200ms)
```

**Items:**
1. Home (Home icon)
2. My Groups (Users icon)
3. Publish (Plus icon)
4. My Products (Search icon)
5. Menu (Menu icon)

---

### 9. MapView

**Dimensiones:**
```
Width: 100%
Height: 100vh
Position: relative
```

**Estilos:**
```
Background: #ffffff
```

**Estructura:**
```
┌─────────────────────────────┐
│ [← Back]              Map   │ ← Header
├─────────────────────────────┤
│                             │
│                             │
│      Mapa Interactivo       │
│       (Placeholder)         │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

#### Header
```
Height: 56px
Padding: 16px
Background: #ffffff
Border-bottom: 1px solid #dde1e6
Display: flex
Justify-content: space-between
Align-items: center
```

#### Back Button
```
Display: flex
Align-items: center
Gap: 8px
Color: #0f62fe
Font-size: 16px
Padding: 8px
Hover opacity: 0.8
```

#### Title
```
Font-size: 18px
Font-weight: 500
Color: #21272a
```

---

## 🎨 Grid Layout

### Products Grid

```
Display: grid
Grid-template-columns: repeat(2, 1fr)
Gap: 8px (gap-2)
Padding: 8px
```

**Animación de entrada:**
```
Tipo: stagger animation
Delay base: 50ms por item
Animation: fade-in + slide-in-from-bottom
Duration: 500ms
Fill-mode: backwards
```

---

## 📏 Responsive Breakpoints

### Mobile First Approach

```
Base (default): 320px - 480px
Max-width container: 480px
Centrado: margin auto
```

**Nota:** La aplicación está optimizada para mobile. El diseño es fixed-width con max-width de 480px centrado.

---

## ✨ Animaciones y Transiciones

### Duraciones Estándar
```
Fast:     100ms
Normal:   200ms
Slow:     300ms
Loading:  800ms
```

### Timing Functions
```
Default: ease
Ease-in-out: para pulsos
Linear: para sliders
```

### Animaciones Comunes

#### Fade In
```
@keyframes fade-in {
  from { opacity: 0 }
  to { opacity: 1 }
}
```

#### Slide In From Bottom
```
@keyframes slide-in-from-bottom {
  from { transform: translateY(16px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}
```

#### Zoom In
```
@keyframes zoom-in {
  from { transform: scale(0.95); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}
```

#### Pulse (Skeleton)
```
@keyframes pulse {
  0%, 100% { opacity: 1 }
  50% { opacity: 0.5 }
}
```

---

## 🗄️ Database Mapping

### Tablas Principales

#### `listings`
```sql
- id (uuid, PK)
- title (text)
- description (text)
- price_amount (numeric)
- currency (varchar)
- price_type (varchar) -- "fixed", "negotiable", "best-offer"
- condition (varchar)  -- "New", "Like New", "Used"
- subtype (varchar)    -- "sale", "trade"
- visibility (varchar) -- "public", "group"
- created_at (timestamp)
- updated_at (timestamp)
```

#### `listing_images`
```sql
- id (uuid, PK)
- listing_id (uuid, FK → listings.id)
- image_url (text)
- is_primary (boolean)
- display_order (integer)
```

#### `listing_locations`
```sql
- id (uuid, PK)
- listing_id (uuid, FK → listings.id)
- location_id (uuid, FK → locations.id)
- meetup_place_note (text)
```

#### `locations`
```sql
- id (uuid, PK)
- address_line1 (text)
- city (varchar)
- state (varchar)
- postal_code (varchar)
- country (varchar)
```

### Mapeo de Campos en ProductCard

| Campo Visual | Campo DB | Tabla | Fallback |
|--------------|----------|-------|----------|
| Imagen | `image_url` | `listing_images` (where `is_primary = true`) | Placeholder |
| Título | `title` | `listings` | - |
| Precio | `price_amount + currency + price_type` | `listings` | "Price not specified" |
| Condición | `condition` | `listings` | "N/A" |
| Tipo | `subtype` | `listings` | - |
| Ubicación | `meetup_place_note` OR `address_line1 + city` | `listing_locations` / `locations` | "Not specified" |

---

## 🎯 Estados Interactivos

### Hover States

#### Botones
```
Transform: scale(1.05) - scale(1.1)
Background: change or add opacity
Transition: 200ms
```

#### Cards
```
Shadow: 0 10px 15px -3px rgba(0,0,0,0.1)
Image: scale(1.05)
Arrow: translateX(4px)
Gap: increase by 4px
Transition: all 200ms-300ms
```

#### Icons
```
Transform: scale(1.1)
Transition: 200ms
```

### Focus States
```
Outline: 2px solid rgba(15, 98, 254, 0.5)
Outline-offset: 2px
Border (inputs): #0f62fe
Icon color: #0f62fe
```

### Active States
```
Bottom Nav: opacity 1, indicator visible
Radio/Checkbox: background #0f62fe
Tabs: underline visible
```

### Loading States
```
Skeleton: pulse animation (2s infinite)
Opacity: 0.5 - 1 oscillating
```

### Disabled States
```
Opacity: 0.5
Cursor: not-allowed
Pointer-events: none
```

---

## 📱 Empty States

### No Products Found

**Estructura:**
```
┌─────────────────────────┐
│                         │
│         🔍              │ ← Icon (64px)
│                         │
│   No products found     │ ← Title (18px)
│                         │
│ Try adjusting your      │ ← Subtitle (14px)
│      search             │
│                         │
└─────────────────────────┘
```

**Estilos:**
```
Container:
  Padding: 64px 0
  Text-align: center
  Animation: fade-in + zoom-in (300ms)

Icon Container:
  Width: 64px
  Height: 64px
  Margin-bottom: 16px
  Background: #f5f5f5
  Border-radius: 9999px
  Display: flex
  Align-items: center
  Justify-content: center

Icon/Emoji:
  Font-size: 32px

Title:
  Font-size: 18px
  Color: #697077
  Margin-bottom: 8px

Subtitle:
  Font-size: 14px
  Color: #697077
```

---

## 🔧 Utilidades y Helpers

### Shadows
```
Small:  0 1px 2px 0 rgba(0,0,0,0.05)
Medium: 0 4px 6px -1px rgba(0,0,0,0.1)
Large:  0 10px 15px -3px rgba(0,0,0,0.1)
Top:    0 -2px 10px rgba(0,0,0,0.05)
```

### Z-Index Layers
```
Base:       0
Card:       1
Header:     10
BottomNav:  50
Modal:      100
Toast:      200
```

### Line Clamp
```
Line-clamp-1:
  overflow: hidden
  display: -webkit-box
  -webkit-line-clamp: 1
  -webkit-box-orient: vertical
```

---

## 📋 Checklist para Figma

Cuando repliques este diseño en Figma, asegúrate de:

### Setup Inicial
- [ ] Crear artboard de 480px × 812px (iPhone X)
- [ ] Configurar sistema de grids de 2 columnas con gap de 8px
- [ ] Crear paleta de colores con los valores exactos
- [ ] Crear estilos de texto para cada tamaño/peso

### Componentes
- [ ] Crear componente maestro de ProductCard
- [ ] Crear variantes: default, hover, loading (skeleton)
- [ ] Crear componente de Header con badge animado
- [ ] Crear SearchBar con estados: default, focus
- [ ] Crear BottomNav con estados activo/inactivo
- [ ] Crear FilterSheet como modal
- [ ] Crear ProductModal como overlay

### Auto-Layout
- [ ] Usar Auto-Layout en todos los componentes
- [ ] Configurar padding y gaps exactos
- [ ] Configurar responsive resizing

### Interactividad (Prototype)
- [ ] Configurar hover states con Smart Animate
- [ ] Crear flujo de navegación entre pantallas
- [ ] Animar apertura de modales (slide-up)
- [ ] Animar transiciones de búsqueda

### Iconos
- [ ] Importar iconos de Lucide React o usar similares
- [ ] Mantener tamaño consistente (20px, 24px)
- [ ] Usar color secondary (#001d6c) para nav icons

### Imágenes
- [ ] Usar placeholders de 220px altura
- [ ] Configurar fill mode: cover
- [ ] Aplicar efecto de scale(1.05) en hover

---

## 🎨 Consideraciones de Diseño

### Accesibilidad
- Contraste mínimo 4.5:1 para texto
- Focus states visibles
- Touch targets mínimo 44px × 44px (cumplido en botones)

### Performance
- Limitar animaciones a transform y opacity
- Usar will-change para elementos animados
- Optimizar imágenes (WebP cuando sea posible)

### Consistencia
- Mantener espaciado de 8px como base
- Usar border-radius de 8px para cards y botones
- Transiciones de 200ms como estándar

---

## 📚 Referencias

### Librerías Usadas
- **UI Components:** shadcn/ui
- **Icons:** lucide-react
- **Styling:** Tailwind CSS v4.0
- **Animations:** Tailwind + CSS transitions

### Assets
- Logo: `/imports/figma:asset/7474f4fbee2ca84a170aca1f3ce91e94ef974b66.png`
- Product Image: `/imports/figma:asset/ec8f016d30871cab49c52501657924d86f0824b1.png`

---

## 📝 Notas Finales

Este documento contiene todas las especificaciones necesarias para replicar el diseño de ListlyUp en Figma Design. Todas las medidas, colores, y espaciados han sido extraídos del código fuente actual.

**Versión:** 1.0  
**Fecha:** Noviembre 2025  
**Autor:** Especificaciones extraídas del código React/Tailwind

Para cualquier actualización o cambio, modifica este documento y sincroniza con el código.
