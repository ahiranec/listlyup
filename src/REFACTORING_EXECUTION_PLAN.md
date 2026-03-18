# 🎯 Plan de Ejecución Detallado - Refactorización ListlyUp

**Fecha de creación:** Diciembre 13, 2025  
**Basado en:** REFACTORING_ANALYSIS.md

---

## 📋 FASE 1: Consolidar Sheets Duplicados (PRIORIDAD 1)

### ⏱️ Tiempo estimado: 20-30 minutos
### 🎯 Objetivo: Eliminar duplicación de MakeOfferSheet y MarkAsSoldSheet

---

## 🔍 PASO 1.1: Auditar Diferencias (5 min)

### Acción:
Comparar versiones de cada sheet para identificar diferencias.

### Comandos:
```bash
# Ver MakeOfferSheet versión chat
cat /components/MakeOfferSheet.tsx

# Ver MakeOfferSheet versión completa
cat /components/sheets/MakeOfferSheet.tsx

# Ver MarkAsSoldSheet versión simple
cat /components/MarkAsSoldSheet.tsx

# Ver MarkAsSoldSheet versión completa
cat /components/sheets/MarkAsSoldSheet.tsx
```

### Decisión:
- ✅ **MakeOfferSheet**: Mantener versión de `/components/sheets/` (más completa)
- ✅ **MarkAsSoldSheet**: Mantener versión de `/components/sheets/` (más completa)

---

## 📝 PASO 1.2: Identificar Todos los Imports (3 min)

### Acción:
Buscar todos los archivos que importan estos sheets.

### Comandos:
```bash
# Buscar imports de MakeOfferSheet
grep -r "import.*MakeOfferSheet.*from.*components/MakeOfferSheet" components/

# Buscar imports de MarkAsSoldSheet
grep -r "import.*MarkAsSoldSheet.*from.*components/MarkAsSoldSheet" components/
```

### Resultado Esperado:
```
Lista de archivos que importan desde /components/ (versión a eliminar):
- /components/ChatConversationPage.tsx (MakeOfferSheet)
- /components/ProductDetailPage.tsx (posiblemente ambos)
- (otros archivos)
```

---

## 🔧 PASO 1.3: Actualizar Import de MakeOfferSheet (5 min)

### Archivos a modificar:
Cada archivo que importe desde `/components/MakeOfferSheet.tsx`

### Cambio:
```typescript
// ANTES (versión incorrecta)
import { MakeOfferSheet } from './MakeOfferSheet';

// DESPUÉS (versión correcta)
import { MakeOfferSheet } from './sheets/MakeOfferSheet';
```

### Validación:
- ✅ Verificar que el componente renderiza igual
- ✅ Verificar que las props son compatibles
- ✅ Probar abrir el sheet y hacer una oferta

---

## 🔧 PASO 1.4: Actualizar Import de MarkAsSoldSheet (5 min)

### Archivos a modificar:
Cada archivo que importe desde `/components/MarkAsSoldSheet.tsx`

### Cambio:
```typescript
// ANTES (versión incorrecta)
import { MarkAsSoldSheet } from './MarkAsSoldSheet';

// DESPUÉS (versión correcta)
import { MarkAsSoldSheet } from './sheets/MarkAsSoldSheet';
```

### Validación:
- ✅ Verificar que el componente renderiza igual
- ✅ Verificar que las props son compatibles
- ✅ Probar marcar como vendido

---

## 🗑️ PASO 1.5: Eliminar Archivos Duplicados (2 min)

### Archivos a eliminar:
```bash
# Eliminar versiones duplicadas
rm /components/MakeOfferSheet.tsx
rm /components/MarkAsSoldSheet.tsx
```

### ⚠️ IMPORTANTE:
- ✅ Solo eliminar DESPUÉS de actualizar todos los imports
- ✅ Verificar que no hay errores de compilación
- ✅ Hacer commit antes de eliminar

---

## ✅ PASO 1.6: Validación Final (5 min)

### Checklist de Pruebas:
```
□ Abrir ChatConversationPage
□ Click en "Make Offer" → Sheet se abre correctamente
□ Ingresar oferta → Funciona sin errores
□ Cerrar sheet → Sin errores en consola

□ Abrir ProductDetailPage  
□ Click en "Mark as Sold" → Sheet se abre correctamente
□ Marcar como vendido → Funciona sin errores
□ Cerrar sheet → Sin errores en consola

□ No hay errores en consola
□ No hay imports rotos
□ Build pasa sin errores
```

### Comandos de Validación:
```bash
# Buscar posibles imports rotos
grep -r "from.*components/MakeOfferSheet\"" .
grep -r "from.*components/MarkAsSoldSheet\"" .

# No debería retornar resultados
```

---

## 💾 PASO 1.7: Commit (2 min)

### Commits Incrementales:
```bash
git add components/ChatConversationPage.tsx
git commit -m "FASE 1.1: Actualizar import MakeOfferSheet en ChatConversationPage"

git add components/ProductDetailPage.tsx
git commit -m "FASE 1.2: Actualizar imports de sheets en ProductDetailPage"

git rm components/MakeOfferSheet.tsx components/MarkAsSoldSheet.tsx
git commit -m "FASE 1.3: Eliminar sheets duplicados"
```

---

## 📊 FASE 2: Centralizar Mock Data (PRIORIDAD 2)

### ⏱️ Tiempo estimado: 15-20 minutos
### 🎯 Objetivo: Mover todo el mock data a `/data/*`

---

## 🔧 PASO 2.1: Mover mockChatMessages.ts (5 min)

### Acción:
```bash
# Mover archivo
mv /components/mockChatMessages.ts /data/chatMessages.ts
```

### Actualizar imports:
```typescript
// Buscar todos los archivos que importan mockChatMessages
grep -r "from.*mockChatMessages" components/

// En cada archivo:
// ANTES
import { ... } from './mockChatMessages';

// DESPUÉS
import { ... } from '../data/chatMessages';
```

### Archivos esperados:
- `/components/MessagesPage.tsx`
- `/components/ChatConversationPage.tsx`
- (otros)

---

## 🔧 PASO 2.2: Mover mockActionItems.ts (5 min)

### Acción:
```bash
# Mover archivo
mv /components/action-center/mockActionItems.ts /data/actionItems.ts
```

### Actualizar imports:
```typescript
// Buscar
grep -r "from.*mockActionItems" components/

// En cada archivo (probablemente /components/action-center/index.ts):
// ANTES
import { ... } from './mockActionItems';

// DESPUÉS
import { ... } from '../../data/actionItems';
```

---

## 🔧 PASO 2.3: Mover mockNotifications.ts (5 min)

### Acción:
```bash
# Mover archivo
mv /components/notifications/mockNotifications.ts /data/notifications.ts
```

### Actualizar imports:
```typescript
// Buscar
grep -r "from.*mockNotifications" components/

// En NotificationsPage.tsx:
// ANTES
import { ... } from './mockNotifications';

// DESPUÉS
import { ... } from '../../data/notifications';
```

---

## 🗑️ PASO 2.4: Eliminar groups/mockData.ts Duplicado (5 min)

### Análisis:
```bash
# Comparar con /data/groups.ts
cat /data/groups.ts
cat /components/groups/mockData.ts
```

### Decisión:
- Si son idénticos → Eliminar `/components/groups/mockData.ts`
- Si tienen datos diferentes → Consolidar en `/data/groups.ts`

### Actualizar imports:
```typescript
// Buscar
grep -r "from.*groups/mockData" components/

// Cambiar a:
import { ... } from '../../data/groups';
```

---

## ✅ PASO 2.5: Validación (5 min)

### Checklist:
```
□ Abrir MessagesPage → Los chats se muestran correctamente
□ Abrir ActionCenterPage → Las acciones se cargan bien
□ Abrir NotificationsPage → Las notificaciones aparecen
□ No hay errores en consola
□ No hay imports rotos
```

### Commit:
```bash
git add data/
git commit -m "FASE 2: Centralizar mock data en /data/*"
```

---

## 🏗️ FASE 3: Extraer Componentes Base de Filtros (PRIORIDAD 3)

### ⏱️ Tiempo estimado: 30-40 minutos
### 🎯 Objetivo: Crear componentes reutilizables para filtros

---

## 📁 PASO 3.1: Crear Estructura (5 min)

### Acción:
```bash
# Crear directorio
mkdir -p /components/filters/shared
```

---

## 🔧 PASO 3.2: Crear BaseFilterSection (10 min)

### Archivo: `/components/filters/shared/BaseFilterSection.tsx`

### Contenido:
```typescript
/**
 * BaseFilterSection
 * Componente base reutilizable para secciones de filtros
 * Maneja accordion/collapse behavior y estilos consistentes
 */

import { ReactNode } from 'react';
import { ChevronDown } from 'lucide-react';

interface BaseFilterSectionProps {
  title: string;
  emoji?: string;
  icon?: React.ComponentType<{ className?: string }>;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  badge?: string | number;
}

export function BaseFilterSection({
  title,
  emoji,
  icon: Icon,
  isOpen,
  onToggle,
  children,
  badge,
}: BaseFilterSectionProps) {
  return (
    <div className="border-b border-border">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-4 hover:bg-accent/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          {emoji && <span className="text-base">{emoji}</span>}
          {Icon && <Icon className="w-4 h-4 text-muted-foreground" />}
          <span className="text-sm font-medium">{title}</span>
          {badge !== undefined && (
            <span className="text-xs px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      
      {isOpen && (
        <div className="px-4 pb-3 space-y-2">
          {children}
        </div>
      )}
    </div>
  );
}
```

---

## 🔧 PASO 3.3: Crear FilterCheckboxGroup (10 min)

### Archivo: `/components/filters/shared/FilterCheckboxGroup.tsx`

### Contenido:
```typescript
/**
 * FilterCheckboxGroup
 * Componente reutilizable para grupos de checkboxes en filtros
 */

import { Checkbox } from '../../ui/checkbox';

export interface CheckboxOption {
  value: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  emoji?: string;
  count?: number;
}

interface FilterCheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: Set<string>;
  onToggle: (value: string) => void;
}

export function FilterCheckboxGroup({
  options,
  selectedValues,
  onToggle,
}: FilterCheckboxGroupProps) {
  return (
    <div className="space-y-2">
      {options.map((option) => {
        const Icon = option.icon;
        
        return (
          <label
            key={option.value}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Checkbox
              checked={selectedValues.has(option.value)}
              onCheckedChange={() => onToggle(option.value)}
            />
            <div className="flex items-center gap-1.5 flex-1">
              {option.emoji && <span className="text-sm">{option.emoji}</span>}
              {Icon && <Icon className="w-3.5 h-3.5 text-muted-foreground" />}
              <span className="text-sm group-hover:text-foreground transition-colors">
                {option.label}
              </span>
              {option.count !== undefined && (
                <span className="text-xs text-muted-foreground ml-auto">
                  ({option.count})
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
}
```

---

## 🔧 PASO 3.4: Crear FilterRadioGroup (10 min)

### Archivo: `/components/filters/shared/FilterRadioGroup.tsx`

### Contenido:
```typescript
/**
 * FilterRadioGroup
 * Componente reutilizable para grupos de radio buttons en filtros
 */

import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FilterRadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export function FilterRadioGroup({
  options,
  selectedValue,
  onValueChange,
}: FilterRadioGroupProps) {
  return (
    <RadioGroup value={selectedValue} onValueChange={onValueChange}>
      {options.map((option) => (
        <div key={option.value} className="flex items-start gap-2">
          <RadioGroupItem value={option.value} id={option.value} />
          <label
            htmlFor={option.value}
            className="flex-1 cursor-pointer space-y-0.5"
          >
            <div className="text-sm">{option.label}</div>
            {option.description && (
              <div className="text-xs text-muted-foreground">
                {option.description}
              </div>
            )}
          </label>
        </div>
      ))}
    </RadioGroup>
  );
}
```

---

## 📝 PASO 3.5: Crear Index y README (5 min)

### Archivo: `/components/filters/shared/index.ts`
```typescript
export { BaseFilterSection } from './BaseFilterSection';
export { FilterCheckboxGroup } from './FilterCheckboxGroup';
export { FilterRadioGroup } from './FilterRadioGroup';
export type { CheckboxOption } from './FilterCheckboxGroup';
export type { RadioOption } from './FilterRadioGroup';
```

### Archivo: `/components/filters/shared/README.md`
```markdown
# Shared Filter Components

Componentes base reutilizables para construir filtros consistentes.

## Componentes

### BaseFilterSection
Sección colapsable para filtros.

### FilterCheckboxGroup
Grupo de checkboxes con estilos consistentes.

### FilterRadioGroup
Grupo de radio buttons con estilos consistentes.

## Uso

Ver ejemplos en `/components/filters/CategorySection.tsx`
```

---

## ✅ PASO 3.6: Validación (5 min)

### Checklist:
```
□ Archivos creados sin errores
□ Imports funcionan correctamente
□ No hay errores de TypeScript
□ Build pasa sin errores
```

### Commit:
```bash
git add components/filters/shared/
git commit -m "FASE 3: Crear componentes base de filtros reutilizables"
```

---

## 🎯 FASES 4-8: Continuarán después de completar Fases 1-3

**Razón:** Las primeras 3 fases establecen las fundaciones. Las fases 4-8 son refactorizaciones graduales que se pueden hacer una por una sin prisa.

---

## 📊 CHECKLIST GENERAL DE SEGURIDAD

### Antes de cada fase:
```
□ Leer el plan completo de la fase
□ Entender qué se va a cambiar
□ Verificar que no hay cambios sin guardar
□ Crear backup/branch si es necesario
```

### Durante cada fase:
```
□ Hacer un cambio a la vez
□ Probar después de cada cambio
□ Verificar consola sin errores
□ No agregar features nuevos
```

### Después de cada fase:
```
□ Validar funcionalidad completa
□ Buscar imports rotos
□ Verificar build exitoso
□ Hacer commit descriptivo
```

---

## 🚨 QUÉ HACER SI ALGO SALE MAL

### Si encuentras un error:
1. ⏸️ **PAUSAR** inmediatamente
2. 🔍 Leer el error completo
3. 🔙 Revisar el último cambio hecho
4. ↩️ Hacer rollback si es necesario
5. 💬 Reportar el problema antes de continuar

### Si no estás seguro:
1. ⏸️ **PAUSAR**
2. 📖 Releer el plan
3. 💭 Pensar en consecuencias
4. ❓ Preguntar antes de proceder

---

## ✅ CRITERIOS DE ÉXITO

### Una fase está completa cuando:
1. ✅ Todos los cambios están hechos
2. ✅ Todas las pruebas pasan
3. ✅ No hay errores en consola
4. ✅ Build es exitoso
5. ✅ Commit está hecho
6. ✅ Funcionalidad es idéntica a antes

---

## 🎯 PRÓXIMO PASO

**Empezar con FASE 1, PASO 1.1**

¿Listo para comenzar? 🚀
