# 📱 Mobile-First Development Guide

## 🎯 Objetivo

Este guide te ayuda a desarrollar componentes mobile-first usando nuestro Design System optimizado.

---

## 🚀 Quick Start

### 1. Usar Utility Classes

```tsx
// Layout con padding de página
<div className="page-container">
  <h1>Mi Página</h1>
</div>

// Card con estilo consistente
<div className="card-container shadow-md">
  <p>Contenido de la card</p>
</div>

// Botón con touch target adecuado
<button className="touch-target bg-primary text-white rounded-lg">
  Click me
</button>
```

### 2. Usar CSS Variables

```tsx
// En estilos inline
<div style={{ 
  height: 'var(--header-height)',
  padding: 'var(--space-lg)'
}}>
  Header
</div>

// En Tailwind classes personalizadas
<div className="h-[var(--header-height)] p-[var(--space-lg)]">
  Header
</div>
```

### 3. Usar Design Tokens en JavaScript

```tsx
import { DESIGN_TOKENS } from '@/constants/design-tokens';

function MyComponent() {
  const scrollPosition = window.scrollY > DESIGN_TOKENS.HEADER_HEIGHT;
  
  return (
    <div style={{ 
      marginTop: DESIGN_TOKENS.SPACE.LG,
      zIndex: DESIGN_TOKENS.Z_INDEX.FIXED 
    }}>
      Content
    </div>
  );
}
```

### 4. Usar Hooks

```tsx
import { useDesignTokens, useActiveBreakpoints } from '@/hooks/useDesignTokens';

function ResponsiveComponent() {
  const tokens = useDesignTokens();
  const { isMobile, isTablet, isDesktop } = useActiveBreakpoints();
  
  return (
    <div>
      {isMobile && <MobileView />}
      {isTablet && <TabletView />}
      {isDesktop && <DesktopView />}
    </div>
  );
}
```

---

## 📐 Layout Patterns

### Page Layout Completo

```tsx
function MyPage() {
  return (
    <>
      {/* Header fijo */}
      <header className="header-height fixed top-0 w-full z-fixed bg-white border-b">
        <div className="h-full flex items-center px-4">
          Header Content
        </div>
      </header>
      
      {/* Main content con padding para header y bottom nav */}
      <main className="content-with-both page-container">
        <div className="section-spacing">
          <h1>Page Title</h1>
          <p>Content</p>
        </div>
      </main>
      
      {/* Bottom nav fijo */}
      <nav className="bottom-nav-height fixed bottom-0 w-full z-fixed bg-white border-t">
        Bottom Nav Content
      </nav>
    </>
  );
}
```

### Grid de Cards Responsive

```tsx
function ProductGrid() {
  return (
    <div className="page-container">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="card-container shadow-md">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p className="text-muted-foreground">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Modal Mobile-First

```tsx
function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-modal-backdrop bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-x-4 top-20 z-modal bg-white rounded-2xl shadow-xl max-w-md mx-auto">
        <div className="p-6">
          {children}
        </div>
      </div>
    </>
  );
}
```

---

## 🎨 Component Patterns

### Icon Button (Touch-Friendly)

```tsx
function IconButton({ icon: Icon, label, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="icon-button hover:bg-muted transition-fast"
      aria-label={label}
    >
      <Icon className="w-5 h-5" />
    </button>
  );
}
```

### Card con Hover State

```tsx
function ProductCard({ product }) {
  return (
    <div className="card-container shadow-md hover:shadow-premium-hover transition-base cursor-pointer">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full aspect-square object-cover rounded-lg mb-3"
      />
      <h3>{product.name}</h3>
      <p className="text-muted-foreground">{product.description}</p>
      <div className="flex items-center justify-between mt-4">
        <span className="text-primary">{product.price}</span>
        <button className="touch-target bg-primary text-white rounded-lg px-4">
          Ver
        </button>
      </div>
    </div>
  );
}
```

### Input con Estado Focus

```tsx
function SearchInput({ value, onChange }) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <div className={`
      flex items-center gap-2 px-3 py-2 
      bg-white rounded-lg border transition-all
      ${isFocused 
        ? 'border-primary ring-4 ring-primary/10' 
        : 'border-gray-200'
      }
    `}>
      <Search className={`w-5 h-5 ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent outline-none"
        placeholder="Buscar..."
      />
    </div>
  );
}
```

### Bottom Sheet (Mobile)

```tsx
function BottomSheet({ isOpen, onClose, children }) {
  return (
    <div className={`
      fixed inset-0 z-modal
      ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}
    `}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black/50 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className={`
        absolute bottom-0 left-0 right-0
        bg-white rounded-t-2xl shadow-xl
        max-h-[90vh] overflow-y-auto
        transition-transform duration-300
        ${isOpen ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="sticky top-0 bg-white border-b p-4">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <h3>Bottom Sheet Title</h3>
        </div>
        <div className="p-4">
          {children}
        </div>
        <div className="h-[env(safe-area-inset-bottom)]" />
      </div>
    </div>
  );
}
```

---

## 🎯 Touch Target Best Practices

### Mínimo 44x44px

```tsx
// ✅ CORRECTO
<button className="touch-target px-4">
  Click me
</button>

// ❌ INCORRECTO - Muy pequeño
<button className="p-1">
  Click me
</button>
```

### Espaciado entre elementos táctiles

```tsx
// ✅ CORRECTO - Espacio suficiente
<div className="flex gap-2">
  <button className="touch-target">A</button>
  <button className="touch-target">B</button>
</div>

// ❌ INCORRECTO - Muy juntos
<div className="flex gap-0">
  <button className="p-2">A</button>
  <button className="p-2">B</button>
</div>
```

---

## 📏 Spacing Consistency

### Usar la escala de espaciado

```tsx
// ✅ CORRECTO - Usa tokens del sistema
<div className="p-4">        {/* 16px - space-lg */}
<div className="gap-2">      {/* 8px - space-sm */}
<div className="mt-6">       {/* 24px - space-xl */}

// ❌ INCORRECTO - Valores arbitrarios
<div className="p-[13px]">   {/* Inconsistente */}
<div className="gap-[7px]">  {/* No está en la escala */}
```

### Espaciado de secciones

```tsx
function Page() {
  return (
    <div className="page-container">
      {/* Sección 1 */}
      <div className="section-spacing">
        <h2>Section 1</h2>
        <p>Content</p>
      </div>
      
      {/* Sección 2 */}
      <div className="section-spacing">
        <h2>Section 2</h2>
        <p>Content</p>
      </div>
    </div>
  );
}
```

---

## 🌓 Responsive Design

### Mobile-First Approach

```tsx
// ✅ CORRECTO - Mobile first, luego breakpoints
<div className="p-4 md:p-6 lg:p-8">
  {/* 16px mobile, 24px tablet, 32px desktop */}
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {/* 1 col mobile, 2 cols tablet, 3 cols desktop */}
</div>

// ❌ INCORRECTO - Desktop first
<div className="p-8 md:p-6 sm:p-4">
  {/* No es mobile-first */}
</div>
```

### Usar breakpoint hooks

```tsx
import { useActiveBreakpoints } from '@/hooks/useDesignTokens';

function AdaptiveComponent() {
  const { isMobile, isTablet, isDesktop } = useActiveBreakpoints();
  
  if (isMobile) {
    return <MobileLayout />;
  }
  
  if (isTablet) {
    return <TabletLayout />;
  }
  
  return <DesktopLayout />;
}
```

---

## ⚡ Performance Tips

### 1. Usar CSS Variables para valores dinámicos

```tsx
// ✅ MEJOR - CSS variable, un solo render
<div style={{ height: 'var(--header-height)' }}>

// ❌ MENOS EFICIENTE - JavaScript value, múltiples renders
const headerHeight = useCSSVar('header-height');
<div style={{ height: headerHeight }}>
```

### 2. Utility classes sobre inline styles

```tsx
// ✅ MEJOR - Reutiliza clases
<div className="card-container shadow-md">

// ❌ MENOS EFICIENTE - Estilos inline únicos
<div style={{ 
  padding: '16px', 
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
}}>
```

### 3. Transiciones consistentes

```tsx
// ✅ MEJOR - Utility class
<button className="transition-fast hover:bg-primary">

// ❌ MENOS EFICIENTE - Inline transition
<button style={{ transition: 'all 150ms ease' }}>
```

---

## 🔍 Testing Mobile-First

### Chrome DevTools

1. Abre DevTools (F12)
2. Click en "Toggle device toolbar" (Ctrl+Shift+M)
3. Selecciona dispositivo mobile
4. Prueba diferentes tamaños

### Verificar Touch Targets

```tsx
// Agregar outline temporal para debug
<button className="touch-target outline outline-red-500">
  Debe ser mínimo 44x44px
</button>
```

### Viewport Meta Tag

Asegúrate que `index.html` tenga:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

---

## ✅ Checklist Mobile-First

Antes de hacer commit, verifica:

- [ ] Touch targets mínimo 44x44px
- [ ] Usa utility classes del design system
- [ ] Espaciado consistente (escala definida)
- [ ] Mobile-first responsive (sm:, md:, lg:)
- [ ] Probado en viewport mobile (< 640px)
- [ ] Safe area considerada (iOS notch)
- [ ] Z-index del sistema usado
- [ ] Transiciones suaves
- [ ] Loading states para mobile
- [ ] Gestos táctiles funcionales

---

## 📚 Recursos

- [DESIGN_SYSTEM.md](/DESIGN_SYSTEM.md) - Documentación completa
- `/styles/globals.css` - CSS variables y utilities
- `/constants/design-tokens.ts` - Tokens en TypeScript
- `/hooks/useDesignTokens.ts` - React hooks

---

**Happy Mobile-First Coding! 📱✨**
