# 🎨 ListlyUp Design System - Mobile-First

## 📱 Filosofía

Sistema de diseño optimizado para **mobile-first** con enfoque en:
- **Touch targets accesibles** (mínimo 44px)
- **Espaciado consistente**
- **Tipografía legible**
- **Componentes compactos pero usables**

---

## 📐 Spacing System

### Escala de Espaciado
```css
--space-xs:   4px   (0.25rem)   /* Espaciado mínimo */
--space-sm:   8px   (0.5rem)    /* Espaciado pequeño */
--space-md:   12px  (0.75rem)   /* Espaciado medio */
--space-lg:   16px  (1rem)      /* Espaciado estándar */
--space-xl:   24px  (1.5rem)    /* Espaciado grande */
--space-2xl:  32px  (2rem)      /* Espaciado extra grande */
--space-3xl:  48px  (3rem)      /* Espaciado máximo */
```

### Espaciado de Componentes
```css
--card-padding:     16px   /* Padding interno de cards */
--section-padding:  24px   /* Padding de secciones */
--page-padding-x:   16px   /* Padding horizontal de página */
--page-padding-y:   16px   /* Padding vertical de página */
```

### Uso en Tailwind
```tsx
<div className="p-4">         {/* --space-lg */}
<div className="px-4 py-6">   {/* x: --space-lg, y: --space-xl */}
<div className="gap-2">       {/* --space-sm */}
```

---

## 📏 Heights & Dimensions

### Alturas del Sistema
```css
--header-height:        56px    /* Header compacto mobile */
--bottom-nav-height:    60px    /* Bottom nav optimizado */
--status-bar-height:    45px    /* Barra de estado */
--filter-button-height: 40px    /* Botones de filtro */
--card-min-height:      280px   /* Altura mínima cards */
```

### Touch Targets
```css
--touch-target-min:         44px   /* Mínimo recomendado (Apple/Google) */
--touch-target-comfortable: 48px   /* Tamaño confortable */
--icon-button-size:         40px   /* Botones con solo icono */
```

### Uso
```tsx
{/* Header */}
<header className="h-14">  {/* 56px - var(--header-height) */}

{/* Bottom Nav */}
<nav className="h-[60px]"> {/* var(--bottom-nav-height) */}

{/* Touch Target */}
<button className="min-h-[44px] min-w-[44px]">
```

---

## 🔤 Typography System

### Font Sizes
```css
--text-xs:   12px  (0.75rem)    /* Labels pequeños */
--text-sm:   14px  (0.875rem)   /* Texto secundario */
--text-base: 16px  (1rem)       /* Texto principal */
--text-lg:   18px  (1.125rem)   /* Subtítulos */
--text-xl:   20px  (1.25rem)    /* Títulos pequeños */
--text-2xl:  24px  (1.5rem)     /* Títulos grandes */
--text-3xl:  30px  (1.875rem)   /* Títulos hero */
```

### Line Heights
```css
--leading-tight:    1.25    /* Títulos compactos */
--leading-normal:   1.5     /* Texto normal */
--leading-relaxed:  1.75    /* Texto espaciado */
```

### Font Weights
```css
--font-weight-normal: 400   /* Texto normal */
--font-weight-medium: 500   /* Títulos, botones */
```

### Tipografía por Defecto (sin clases Tailwind)
```tsx
<h1>  {/* 24px, medium, 1.5 */}
<h2>  {/* 20px, medium, 1.5 */}
<h3>  {/* 18px, medium, 1.5 */}
<h4>  {/* 16px, medium, 1.5 */}
<p>   {/* 16px, normal, 1.5 */}
```

⚠️ **IMPORTANTE**: No uses clases de Tailwind para font-size, font-weight, o line-height a menos que quieras override el sistema.

---

## 🎨 Color System

### Colores Principales
```css
--primary:               #0f62fe   /* Azul principal */
--primary-foreground:    #ffffff   /* Texto sobre primary */
--secondary:             #001d6c   /* Azul oscuro */
--secondary-foreground:  #ffffff   /* Texto sobre secondary */
--destructive:           #da1e28   /* Rojo de error */
```

### Colores de Texto
```css
--foreground:        #21272a   /* Texto principal */
--muted-foreground:  #697077   /* Texto secundario */
```

### Backgrounds
```css
--background:  #ffffff   /* Fondo principal */
--muted:       #f5f5f5   /* Fondo secundario */
--card:        #ffffff   /* Fondo de cards */
```

### Estados Semánticos
```css
--success:       #198754   /* Verde success */
--success-light: #d1f4e0   /* Verde claro */
--warning:       #ffc107   /* Amarillo warning */
--warning-light: #fff3cd   /* Amarillo claro */
--info:          #0dcaf0   /* Azul info */
--info-light:    #cff4fc   /* Azul claro */
```

### Uso en Tailwind
```tsx
<div className="bg-primary text-primary-foreground">
<div className="bg-muted text-muted-foreground">
<div className="border border-border">
```

---

## 🌓 Gradients

### Gradientes Premium
```css
--gradient-primary:     linear-gradient(135deg, #0f62fe 0%, #0353e9 100%)
--gradient-secondary:   linear-gradient(135deg, #001d6c 0%, #001556 100%)
--gradient-card:        linear-gradient(180deg, #ffffff 0%, #fafbfc 100%)
--gradient-accent:      linear-gradient(135deg, #0f62fe 0%, #00d4ff 100%)
```

### Overlays
```css
--gradient-overlay-dark:  linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)
--gradient-overlay-light: linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)
```

### Uso
```tsx
<div style={{ background: 'var(--gradient-primary)' }}>
```

---

## 🔘 Border Radius

### Escala de Radios
```css
--radius-sm:   6px     (0.375rem)   /* Pequeño */
--radius-md:   8px     (0.5rem)     /* Medio */
--radius-lg:   12px    (0.75rem)    /* Grande (default cards) */
--radius-xl:   16px    (1rem)       /* Extra grande */
--radius-2xl:  24px    (1.5rem)    /* Máximo */
--radius-full: 9999px               /* Circular */
```

### Uso en Tailwind
```tsx
<div className="rounded-lg">    {/* 12px */}
<div className="rounded-xl">    {/* 16px */}
<button className="rounded-full"> {/* Circular */}
```

---

## 💫 Shadows

### Sistema de Sombras
```css
--shadow-sm:      Sombra mínima (hover states)
--shadow-md:      Sombra media (cards)
--shadow-lg:      Sombra grande (cards elevados)
--shadow-xl:      Sombra máxima (modals)
--shadow-colored: Sombra con color primary
```

### Utility Classes
```css
.shadow-premium        /* Sombra grande */
.shadow-premium-hover  /* Sombra extra grande */
```

### Uso
```tsx
<div className="shadow-md">
<div className="shadow-premium hover:shadow-premium-hover">
```

---

## ⚡ Transitions

### Sistema de Transiciones
```css
--transition-fast: 150ms ease   /* Cambios rápidos */
--transition-base: 200ms ease   /* Transición normal */
--transition-slow: 300ms ease   /* Transición lenta */
```

### Utility Classes
```css
.transition-fast
.transition-base
.transition-slow
```

### Uso
```tsx
<button className="transition-fast hover:bg-primary">
```

---

## 📱 Layout Utilities

### Page Containers
```css
.page-container {
  padding-left: var(--page-padding-x);   /* 16px */
  padding-right: var(--page-padding-x);
  padding-top: var(--page-padding-y);
  padding-bottom: var(--page-padding-y);
}
```

### Section Spacing
```css
.section-spacing {
  padding-top: var(--section-padding);    /* 24px */
  padding-bottom: var(--section-padding);
}
```

### Card Container
```css
.card-container {
  padding: var(--card-padding);           /* 16px */
  border-radius: var(--radius-lg);        /* 12px */
  background: var(--card);
}
```

---

## 👆 Touch Target Utilities

### Classes Disponibles
```css
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

.touch-target-comfortable {
  min-height: 48px;
  min-width: 48px;
}

.icon-button {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-lg);
}
```

### Uso
```tsx
<button className="touch-target">Click me</button>
<button className="icon-button"><Icon /></button>
```

---

## 📐 Safe Area (iOS)

### Utilities para Notch/Dynamic Island
```css
.safe-area-top      /* padding-top: env(safe-area-inset-top) */
.safe-area-bottom   /* padding-bottom: env(safe-area-inset-bottom) */
.safe-area-left     /* padding-left: env(safe-area-inset-left) */
.safe-area-right    /* padding-right: env(safe-area-inset-right) */
```

### Uso
```tsx
<header className="safe-area-top">
<nav className="safe-area-bottom">
```

---

## 🎯 Content Layout Helpers

### Header & Bottom Nav
```css
.header-height              /* height: 56px */
.bottom-nav-height          /* height: 60px */
.content-with-header        /* padding-top: 56px */
.content-with-bottom-nav    /* padding-bottom: 60px */
.content-with-both          /* padding: 56px 0 60px */
```

### Uso Completo
```tsx
{/* App Layout */}
<div>
  <header className="header-height fixed top-0 w-full z-fixed">
    Header
  </header>
  
  <main className="content-with-both">
    Content
  </main>
  
  <nav className="bottom-nav-height fixed bottom-0 w-full z-fixed">
    Bottom Nav
  </nav>
</div>
```

---

## 🔢 Z-Index Scale

### Sistema de Capas
```css
--z-base: 1           /* Base layer */
--z-dropdown: 10      /* Dropdowns */
--z-sticky: 20        /* Sticky elements */
--z-fixed: 30         /* Fixed elements (Header, BottomNav) */
--z-modal-backdrop: 40 /* Modal backdrop */
--z-modal: 50         /* Modals */
--z-popover: 60       /* Popovers */
--z-tooltip: 70       /* Tooltips (highest) */
```

### Utility Classes
```css
.z-dropdown
.z-sticky
.z-fixed
.z-modal-backdrop
.z-modal
.z-popover
.z-tooltip
```

### Uso
```tsx
<header className="z-fixed">
<div className="z-modal">
```

---

## 🎬 Animations

### Keyframes Disponibles
```css
@keyframes shimmer      /* Loading effect */
@keyframes float        /* Floating effect */
@keyframes pulse-ring   /* Pulse effect */
```

### Uso
```tsx
<div className="animate-pulse">
<div style={{ animation: 'float 3s ease-in-out infinite' }}>
```

---

## 💡 Best Practices

### ✅ DO
- Usa las variables CSS del design system
- Mantén touch targets mínimo 44px
- Usa utility classes cuando sea posible
- Sigue el espaciado consistente
- Usa z-index del sistema

### ❌ DON'T
- No hardcodees colores (#000, #fff, etc)
- No uses font-size/weight de Tailwind sin razón
- No crees z-index arbitrarios
- No ignores los touch targets
- No uses espaciado inconsistente

---

## 📚 Ejemplos Completos

### Card Component
```tsx
<div className="card-container shadow-md">
  <h3>Title</h3>
  <p className="text-muted-foreground">Description</p>
  <button className="touch-target bg-primary text-primary-foreground rounded-lg">
    Action
  </button>
</div>
```

### Page Layout
```tsx
<div className="page-container content-with-both">
  <div className="section-spacing">
    <h2>Section Title</h2>
    {/* Content */}
  </div>
</div>
```

### Icon Button
```tsx
<button className="icon-button hover:bg-muted transition-fast">
  <Icon className="w-5 h-5" />
</button>
```

---

## 🔄 Responsive Overrides

Para desktop/tablet, puedes usar breakpoints de Tailwind:

```tsx
<div className="p-4 md:p-6 lg:p-8">
  {/* 16px mobile, 24px tablet, 32px desktop */}
</div>

<h1 className="md:text-3xl lg:text-4xl">
  {/* 24px mobile, 30px tablet, 36px desktop */}
</h1>
```

---

## 📦 Imports

Todos los estilos están en `/styles/globals.css` y se aplican automáticamente.

Para usar variables en componentes:
```tsx
style={{ height: 'var(--header-height)' }}
style={{ padding: 'var(--space-lg)' }}
```

---

**Última actualización:** Fase 1 - Mobile-First Optimization
