# 📐 Diseño Responsive - ListlyUp

## 🎯 Principio de Diseño

**Toda la aplicación debe tener el mismo ancho máximo y comportamiento responsive, sin importar la vista o pantalla.**

---

## 📏 Contenedor Principal

### Especificaciones

```tsx
className="h-screen bg-background flex flex-col max-w-[480px] mx-auto relative overflow-x-hidden w-full"
```

### Breakdown de Clases

| Clase | Propósito |
|-------|-----------|
| `h-screen` | Altura completa del viewport |
| `bg-background` | Color de fondo consistente |
| `flex flex-col` | Layout vertical |
| `max-w-[480px]` | **Ancho máximo en desktop** |
| `mx-auto` | **Centrado horizontal** |
| `relative` | Contexto de posicionamiento |
| `overflow-x-hidden` | No scroll horizontal |
| `w-full` | Ancho completo hasta el max-width |

### Comportamiento

```
┌─────────────────────────────────────┐
│  Desktop (> 480px)                  │
│  ┌───────────────────┐              │
│  │                   │              │
│  │    480px max      │  ← Centrado  │
│  │                   │              │
│  └───────────────────┘              │
└─────────────────────────────────────┘

┌───────────────┐
│  Mobile       │
│  (≤ 480px)    │
│               │  ← Full width
│               │
└───────────────┘
```

---

## 🏗️ Implementación por Vista

### ✅ HomePage + MapView + ProductDetail

```tsx
// App.tsx
<div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto relative overflow-x-hidden w-full">
  {/* Contenido principal */}
</div>
```

**Estado:** ✅ Implementado correctamente

---

### ✅ PublishFlow (Wizard)

```tsx
// PublishFlow.tsx
<div className="fixed inset-0 z-50 bg-background">
  <div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto relative overflow-x-hidden w-full">
    {/* Header */}
    <div className="border-b bg-white">
      <StepIndicator />
    </div>
    
    {/* Step Content */}
    <div className="flex-1 overflow-hidden">
      <AnimatePresence>
        {/* Steps aquí */}
      </AnimatePresence>
    </div>
  </div>
</div>
```

**Notas importantes:**
- ✅ Tiene su **propio contenedor responsive** interno
- ✅ NO está envuelto en el contenedor principal de App.tsx
- ✅ Usa `fixed inset-0` para overlay full-screen
- ✅ Contenedor interno respeta `max-w-[480px]`

**Código en App.tsx:**

```tsx
{currentView === "publish" ? (
  // PublishFlow maneja su propio contenedor
  <PublishFlow {...props} />
) : (
  // Otras vistas usan el contenedor principal
  <div className="max-w-[480px] mx-auto">
    {/* ... */}
  </div>
)}
```

---

## 🎨 Casos Especiales

### Modal / Sheet Components

Los modals y sheets (FilterSheet, SettingsSheet, ProductModal) usan `fixed` o `absolute` positioning y se posicionan sobre el contenedor principal.

```tsx
// Ejemplo: Sheet de shadcn/ui
<Sheet>
  <SheetContent 
    side="bottom"
    className="max-w-[480px] mx-auto left-0 right-0"
  >
    {/* Contenido alineado con la app */}
  </SheetContent>
</Sheet>
```

### Overlay Full-Screen

Cuando necesitas un overlay que cubra toda la pantalla pero con contenido centrado:

```tsx
// Capa de overlay
<div className="fixed inset-0 z-50 bg-black/50">
  {/* Contenedor centrado */}
  <div className="h-screen max-w-[480px] mx-auto">
    {/* Contenido */}
  </div>
</div>
```

---

## 📱 Testing Responsive

### Breakpoints a Probar

1. **Mobile Small** (320px)
   - iPhone SE, pequeños Android
   - Debe verse full-width

2. **Mobile Medium** (375px)
   - iPhone 12/13/14
   - Debe verse full-width

3. **Mobile Large** (414px)
   - iPhone Plus, Android grandes
   - Debe verse full-width

4. **Tablet** (768px)
   - iPad Mini
   - Debe verse centrado a 480px max

5. **Desktop** (1024px+)
   - Laptop, desktop
   - Debe verse centrado a 480px max

### Checklist Visual

- [ ] Ancho consistente en todas las vistas
- [ ] Centrado perfecto en desktop
- [ ] Sin scroll horizontal en ninguna vista
- [ ] Elementos no se cortan en mobile
- [ ] Bottom navigation alineado con contenido
- [ ] Modals/sheets alineados con app
- [ ] Transiciones smooth entre vistas

---

## 🔧 Debugging

### Visualizar Contenedor

Agrega temporalmente un borde para ver el contenedor:

```tsx
className="... border-4 border-red-500"
```

### Inspeccionar en DevTools

1. Abre Chrome DevTools
2. Toggle device toolbar (Cmd+Shift+M)
3. Selecciona diferentes dispositivos
4. Verifica que el ancho se mantiene consistente

### Medir Ancho Real

```tsx
useEffect(() => {
  const container = document.querySelector('.max-w-\\[480px\\]');
  console.log('Container width:', container?.offsetWidth);
}, []);
```

---

## ⚠️ Errores Comunes

### ❌ Doble Contenedor

```tsx
// MAL - PublishFlow ya tiene su contenedor
<div className="max-w-[480px]">
  <PublishFlow />  {/* ← Este ya tiene max-w-[480px] internamente */}
</div>
```

```tsx
// BIEN - PublishFlow se renderiza solo
<PublishFlow />
```

### ❌ Fixed Sin Contenedor Interno

```tsx
// MAL - Fixed pero sin contenedor responsive
<div className="fixed inset-0">
  <div className="w-full">  {/* ← Falta max-w-[480px] */}
    Contenido
  </div>
</div>
```

```tsx
// BIEN - Fixed con contenedor responsive
<div className="fixed inset-0">
  <div className="max-w-[480px] mx-auto">
    Contenido
  </div>
</div>
```

### ❌ Overflow Horizontal

```tsx
// MAL - Elementos pueden causar scroll horizontal
<div className="w-screen">  {/* ← No usar w-screen */}
  Contenido
</div>
```

```tsx
// BIEN - Respetar contenedor
<div className="w-full">  {/* ← w-full respeta el padre */}
  Contenido
</div>
```

---

## 📊 Resumen

| Vista | Contenedor | Max Width | Centrado | Estado |
|-------|-----------|-----------|----------|--------|
| HomePage | App.tsx | 480px | ✅ | ✅ |
| MapView | App.tsx | 480px | ✅ | ✅ |
| ProductDetail | App.tsx | 480px | ✅ | ✅ |
| **PublishFlow** | **Propio** | **480px** | **✅** | **✅** |
| FilterSheet | Sheet | 480px | ✅ | ✅ |
| SettingsSheet | Sheet | 480px | ✅ | ✅ |

---

## 🎯 Regla de Oro

> **Toda vista o componente full-screen debe tener un contenedor interno con `max-w-[480px] mx-auto` para mantener la consistencia visual.**

```tsx
// Template para nuevas vistas
<div className="fixed inset-0 z-50 bg-background">
  <div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto relative overflow-x-hidden w-full">
    {/* Tu contenido aquí */}
  </div>
</div>
```
