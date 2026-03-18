# Shared Filter Components

Componentes base reutilizables para construir filtros consistentes.

## Componentes

### BaseFilterSection
Sección colapsable para filtros con accordion behavior.

**Props:**
- `title`: Título de la sección
- `emoji`: (opcional) Emoji a mostrar
- `icon`: (opcional) Icono de lucide-react
- `isOpen`: Estado de apertura
- `onToggle`: Callback al hacer toggle
- `children`: Contenido de la sección
- `badge`: (opcional) Badge con número o texto

**Ejemplo:**
```tsx
<BaseFilterSection
  title="Categoría"
  emoji="📦"
  isOpen={isCategoryOpen}
  onToggle={() => setIsCategoryOpen(!isCategoryOpen)}
  badge={selectedCategories.size}
>
  {/* Contenido del filtro */}
</BaseFilterSection>
```

### FilterCheckboxGroup
Grupo de checkboxes con estilos consistentes.

**Props:**
- `options`: Array de opciones con value, label, icon, emoji, count
- `selectedValues`: Set con valores seleccionados
- `onToggle`: Callback al cambiar un checkbox

**Ejemplo:**
```tsx
<FilterCheckboxGroup
  options={[
    { value: 'electronics', label: 'Electrónicos', emoji: '📱', count: 150 },
    { value: 'furniture', label: 'Muebles', emoji: '🪑', count: 89 }
  ]}
  selectedValues={selectedCategories}
  onToggle={(value) => toggleCategory(value)}
/>
```

### FilterRadioGroup
Grupo de radio buttons con estilos consistentes.

**Props:**
- `options`: Array de opciones con value, label, description
- `selectedValue`: Valor seleccionado actualmente
- `onValueChange`: Callback al cambiar selección

**Ejemplo:**
```tsx
<FilterRadioGroup
  options={[
    { value: 'new', label: 'Nuevo', description: 'Sin usar' },
    { value: 'used', label: 'Usado', description: 'En buenas condiciones' }
  ]}
  selectedValue={condition}
  onValueChange={(value) => setCondition(value)}
/>
```

## Beneficios

1. **Consistencia:** Todos los filtros usan los mismos estilos y comportamientos
2. **Mantenibilidad:** Cambios centralizados afectan todos los filtros
3. **Reutilización:** No repetir código de UI en cada filtro
4. **TypeScript:** Tipado fuerte en todas las props

## Uso

Ver implementaciones reales en:
- `/components/filters/CategorySection.tsx`
- `/components/filters/ConditionSection.tsx`
- `/components/my-listings/filters/StatusSection.tsx`
- `/components/groups/filters/CategorySection.tsx`
