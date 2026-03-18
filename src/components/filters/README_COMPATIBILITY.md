# 🎯 Offer Mode Compatibility System

## Quick Start

Este sistema asegura que solo se muestren Offer Modes válidos según el Listing Type seleccionado.

## 📖 Usage

### Importar Utilidades

```typescript
import { 
  getValidOfferModes,
  filterCompatibleOfferModes,
  hasIncompatibleOfferModes,
  isOfferModeCompatible,
  OFFER_MODE_COMPATIBILITY 
} from './offerModeUtils';
```

### Ejemplo 1: Filtrar opciones visibles

```typescript
// En un componente de filtros
const validOfferModes = getValidOfferModes(filters.type);
const visibleOptions = offerModeOptions.filter((option) =>
  validOfferModes.includes(option.value as OfferMode)
);
```

### Ejemplo 2: Auto-limpiar selections incompatibles

```typescript
// Al cambiar listing type
const handleTypeChange = (newType: string) => {
  const currentOfferModes = filters.offerModes || [];
  const cleanedOfferModes = filterCompatibleOfferModes(newType, currentOfferModes);
  
  if (hasIncompatibleOfferModes(newType, currentOfferModes)) {
    onUpdate({ 
      ...filters, 
      type: newType, 
      offerModes: cleanedOfferModes 
    });
  } else {
    onUpdate({ ...filters, type: newType });
  }
};
```

### Ejemplo 3: Validar compatibilidad individual

```typescript
if (isOfferModeCompatible('service', 'for_rent')) {
  // ✅ Es compatible
}

if (!isOfferModeCompatible('event', 'for_trade')) {
  // ❌ No es compatible
}
```

## 📋 Compatibility Matrix

| Listing Type | Valid Offer Modes |
|-------------|-------------------|
| `product` | `for_sale`, `for_trade`, `for_free` |
| `service` | `for_sale`, `for_rent` |
| `event` | `for_sale`, `for_free` |
| `all` | `for_sale`, `for_trade`, `for_free`, `for_rent` |

## 🔧 API Reference

### Types

```typescript
type ListingType = "all" | "product" | "service" | "event";
type OfferMode = "for_sale" | "for_trade" | "for_free" | "for_rent";
```

### Constants

```typescript
const OFFER_MODE_COMPATIBILITY: Record<ListingType, OfferMode[]>
```

### Functions

#### `getValidOfferModes(listingType: ListingType): OfferMode[]`
Retorna array de offer modes válidos para un listing type.

**Example:**
```typescript
getValidOfferModes('product') 
// → ['for_sale', 'for_trade', 'for_free']
```

#### `isOfferModeCompatible(listingType: ListingType, offerMode: OfferMode): boolean`
Verifica si un offer mode es compatible con un listing type.

**Example:**
```typescript
isOfferModeCompatible('service', 'for_rent') // → true
isOfferModeCompatible('event', 'for_trade')  // → false
```

#### `filterCompatibleOfferModes(listingType: ListingType, selectedOfferModes: string[]): string[]`
Filtra un array de offer modes seleccionados para mantener solo compatibles.

**Example:**
```typescript
filterCompatibleOfferModes('service', ['for_sale', 'for_trade', 'for_rent'])
// → ['for_sale', 'for_rent']
```

#### `hasIncompatibleOfferModes(listingType: ListingType, selectedOfferModes: string[]): boolean`
Detecta si hay algún offer mode incompatible en las selections.

**Example:**
```typescript
hasIncompatibleOfferModes('event', ['for_sale', 'for_trade'])
// → true (for_trade no es válido para event)
```

## 📁 Files

- `offerModeUtils.ts` - Core utilities
- `OfferModeSection.tsx` - Implementa filtrado dinámico
- `TypeSection.tsx` - Implementa auto-cleanup
- `OFFER_MODE_COMPATIBILITY.md` - Documentación detallada

## 🎯 Where It's Used

1. ✅ **OfferModeSection.tsx** - Filtrar opciones visibles
2. ✅ **TypeSection.tsx** - Auto-limpiar al cambiar tipo
3. ✅ **SearchBar.tsx** - Quick filters
4. ✅ **useSearchBarFilters.ts** - Quick filters hook
5. ✨ **MapView** - Hereda automáticamente

## ✨ Benefits

- 🎯 Solo muestra opciones válidas
- 🚫 Previene selecciones inválidas
- 🔄 Auto-limpia selections incompatibles
- 📱 Mejor UX mobile (menos opciones)
- 🧪 Type-safe con TypeScript

## 📚 Learn More

Ver documentación completa en:
- `OFFER_MODE_COMPATIBILITY.md` - Guía técnica detallada
- `/FILTER_COMPATIBILITY_IMPLEMENTATION.md` - Resumen ejecutivo
