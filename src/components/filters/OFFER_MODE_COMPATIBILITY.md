# Offer Mode Compatibility System

## 📋 Overview

Este sistema asegura que solo se muestren Offer Modes compatibles con el Listing Type seleccionado, evitando combinaciones inválidas y mejorando la UX.

## 🎯 Reglas de Compatibilidad

### Matriz de Compatibilidad

| Listing Type | Offer Modes Válidos |
|-------------|---------------------|
| **Product** | For Sale 💵, For Trade 🔄, For Free 🎁 |
| **Service** | For Sale 💵, For Rent 🔑 |
| **Event** | For Sale 💵, For Free 🎁 |
| **All Types** | For Sale 💵, For Trade 🔄, For Free 🎁, For Rent 🔑 |

### Lógica

- **Products**: Pueden venderse, intercambiarse o regalarse
- **Services**: Pueden venderse (sesión/hora) o rentarse (por tiempo)
- **Events**: Pueden tener tickets pagados o ser gratuitos
- **All Types**: Cuando no hay filtro de tipo, todas las opciones están disponibles

## 🏗️ Arquitectura

### Archivo Principal: `offerModeUtils.ts`

```typescript
export const OFFER_MODE_COMPATIBILITY: Record<ListingType, OfferMode[]> = {
  product: ["for_sale", "for_trade", "for_free"],
  service: ["for_sale", "for_rent"],
  event: ["for_sale", "for_free"],
  all: ["for_sale", "for_trade", "for_free", "for_rent"],
};
```

### Funciones Utilitarias

1. **`getValidOfferModes(listingType)`**
   - Retorna los offer modes válidos para un listing type

2. **`isOfferModeCompatible(listingType, offerMode)`**
   - Verifica si un offer mode es compatible

3. **`filterCompatibleOfferModes(listingType, selectedOfferModes)`**
   - Filtra offer modes seleccionados para mantener solo compatibles

4. **`hasIncompatibleOfferModes(listingType, selectedOfferModes)`**
   - Detecta si hay offer modes incompatibles seleccionados

## 📍 Implementación

### 1. Quick Filters (Home)
**Archivo**: `/components/search-bar/SearchBar.tsx`

- Filtra dinámicamente las opciones del popover Offer Mode
- Usa `getValidOfferModes()` para obtener opciones válidas
- Auto-limpia selections incompatibles al cambiar listing type

```typescript
const validOfferModes = getValidOfferModes(filters.type);
const filteredOfferModeOptions = OFFER_MODE_OPTIONS.filter((opt) => 
  opt.value === 'all' || validOfferModes.includes(opt.value as OfferMode)
);
```

### 2. Dedicated Filters Sheet
**Archivo**: `/components/filters/OfferModeSection.tsx`

- Muestra solo opciones compatibles basado en `filters.type`
- Actualiza dinámicamente al cambiar el listing type
- Mantiene consistencia con quick filters

```typescript
const validOfferModes = getValidOfferModes(filters.type);
const visibleOptions = offerModeOptions.filter((option) =>
  validOfferModes.includes(option.value as OfferMode)
);
```

### 3. Type Section (Auto-cleanup)
**Archivo**: `/components/filters/TypeSection.tsx`

- Limpia automáticamente offer modes incompatibles al cambiar tipo
- Usa `filterCompatibleOfferModes()` para mantener solo válidos
- Solo actualiza si detecta incompatibilidades

```typescript
const handleValueChange = (value: string) => {
  const newType = value as FilterOptions["type"];
  const cleanedOfferModes = filterCompatibleOfferModes(newType, currentOfferModes);
  
  if (hasIncompatibleOfferModes(newType, currentOfferModes)) {
    onUpdate({ ...filters, type: newType, offerModes: cleanedOfferModes });
  } else {
    onUpdate({ ...filters, type: newType });
  }
};
```

### 4. Search Bar Filters Hook
**Archivo**: `/components/search-bar/useSearchBarFilters.ts`

- Aplica la misma lógica de auto-cleanup en quick filters
- Mantiene sincronización con FilterSheet

### 5. MapView
**Hereda automáticamente** de FilterSheetContent
- No requiere cambios, usa el mismo `FilterOptions`

## 🎨 Comportamiento UX

### Flujo de Usuario

1. **Inicio**: "All Types" seleccionado
   - ✅ Se muestran todas las Offer Modes

2. **Usuario selecciona "Service"**
   - ✅ Solo se muestran: For Sale, For Rent
   - ✅ Se ocultan automáticamente: For Trade, For Free
   - ⚙️ Si el usuario tenía "Trade" seleccionado, se limpia automáticamente

3. **Usuario selecciona "Product"**
   - ✅ Se muestran: For Sale, For Trade, For Free
   - ✅ Se oculta: For Rent
   - ⚙️ Si el usuario tenía "Rent" seleccionado, se limpia automáticamente

4. **Usuario vuelve a "All Types"**
   - ✅ Todas las Offer Modes vuelven a estar disponibles

### Ventajas

- ✨ **Menos confusión**: Solo opciones válidas
- 📱 **Mobile-friendly**: Menos scroll, menos opciones
- 🚫 **Previene errores**: Imposible seleccionar combinaciones inválidas
- 🎯 **Intuitivo**: El usuario entiende rápidamente las posibilidades
- 🔄 **Auto-cleanup**: Mantiene consistencia automáticamente

## 🧪 Testing

### Casos de Prueba

1. **Cambio de tipo con offer mode seleccionado**
   - Seleccionar "Product" + "For Trade"
   - Cambiar a "Service"
   - ✅ "For Trade" debe limpiarse automáticamente

2. **Filtrado dinámico de opciones**
   - Seleccionar "Event"
   - Abrir Offer Mode filter
   - ✅ Solo "For Sale" y "For Free" deben aparecer

3. **Sincronización entre Quick Filters y FilterSheet**
   - Cambiar tipo en Quick Filters
   - Abrir FilterSheet
   - ✅ Offer Modes debe mostrar opciones consistentes

4. **All Types muestra todo**
   - Seleccionar "All Types"
   - ✅ Las 4 offer modes deben estar disponibles

## 📦 Archivos Modificados

### Nuevos
- `/components/filters/offerModeUtils.ts` - Utilidades de compatibilidad

### Modificados
1. `/components/filters/OfferModeSection.tsx` - Filtrado dinámico
2. `/components/filters/TypeSection.tsx` - Auto-cleanup
3. `/components/filters/index.ts` - Exports
4. `/components/search-bar/SearchBar.tsx` - Filtrado en quick filters
5. `/components/search-bar/useSearchBarFilters.ts` - Auto-cleanup en quick filters

### Sin cambios necesarios
- `/components/map-view/MapView.tsx` - Hereda de FilterSheet ✨
- `/components/MyListingsPage.tsx` - Usa offerType (no offerModes) ✨
- `/components/publish/` - Usa tipos propios del Publish Flow ✨

## 🔮 Futuro

Este sistema es **extensible** y **mantenible**:

1. **Agregar nuevo Listing Type**: Actualizar `OFFER_MODE_COMPATIBILITY`
2. **Agregar nuevo Offer Mode**: Agregar a las matrices correspondientes
3. **Reglas especiales**: Extender funciones utilitarias

## 📚 Referencias

- Backend contract: `listing_type` enum (product | service | event)
- Backend contract: `offer_mode` enum (for_sale | for_trade | for_free | for_rent)
- UI Design: Mobile-First, ocultación dinámica (no disable)
