# ⚡ REFERENCIA RÁPIDA: DÓNDE ESTÁN Y DÓNDE REPLICAR

---

## 🎯 PATRÓN 1: ActionButtons (MEJOR PRÁCTICA)

### 📍 IMPLEMENTADO EN:
- **ProductDetailPage** → ProductActions.tsx

### ✅ ACCIONES QUE FUNCIONAN:
```
✅ edit-listing
✅ view-stats
✅ pause-listing
✅ delete-listing
✅ open-chat
✅ open-whatsapp
✅ open-phone
```

### 🔄 REPLICAR EN:

#### MyListingsPage
```typescript
// REEMPLAZAR dropdowns hardcoded con:
<ActionMenu
  entity={listing}
  actionIds={['edit-listing', 'view-stats', 'pause-listing', 'duplicate-listing', 'archive-listing', 'share-listing', 'delete-listing']}
  isOwner={true}
/>
```

#### NotificationsPage
```typescript
<NotificationCard
  actionIds={['renew-listing', 'edit-listing', 'delete-listing']}
  onAction={handleAction}
/>
```

#### ProfilePage / SellerSheet
```typescript
<ActionButtons
  context="profile"
  entity={seller}
  actionIds={['open-chat', 'open-whatsapp', 'follow-seller', 'block-user']}
/>
```

#### GroupDetailPage
```typescript
<ActionButtons
  context="groups"
  entity={group}
  actionIds={['mute-group', 'leave-group']}
/>
```

---

## 🎯 PATRÓN 2: Custom Sheets

### 📍 IMPLEMENTADO EN:
- **ProductDetailPage**

### ✅ ACCIONES QUE FUNCIONAN:
```
✅ mark-as-sold → MarkAsSoldSheet
✅ make-offer → MakeOfferSheet
✅ leave-review → RatingSheet
✅ report-listing → ReportSheet
```

### 🔄 REPLICAR EN:

#### MyListingsPage
```typescript
// Agregar en dropdown:
<DropdownMenuItem onClick={() => setIsMarkAsSoldSheetOpen(true)}>
  Mark as Sold
</DropdownMenuItem>

<MarkAsSoldSheet
  open={isMarkAsSoldSheetOpen}
  onOpenChange={setIsMarkAsSoldSheetOpen}
  product={selectedListing}
/>
```

#### NotificationsPage
```typescript
// Para trade offers:
<TradeOfferSheet
  open={isTradeOfferSheetOpen}
  offer={selectedOffer}
  onAccept={handleAccept}
  onReject={handleReject}
/>
```

---

## 🎯 PATRÓN 3: Bulk Actions

### 📍 IMPLEMENTADO EN:
- **MyListingsPage** → BulkActionsToolbar

### ✅ ACCIONES QUE FUNCIONAN:
```
✅ bulk-pause
✅ bulk-archive
✅ bulk-delete
```

### 🔄 REPLICAR EN:

#### Organization Dashboard (cuando se cree)
```typescript
<BulkActionsToolbar
  isVisible={selectedIds.size > 0}
  selectedCount={selectedIds.size}
  onBulkPause={handleBulkPause}
  onBulkArchive={handleBulkArchive}
  onBulkDelete={handleBulkDelete}
  onBulkBoost={handleBulkBoost}        // NUEVO
  onBulkReactivate={handleBulkReactivate} // NUEVO
  onBulkEditPrices={handleBulkEditPrices} // NUEVO
/>
```

---

## 🎯 PATRÓN 4: Icon Buttons

### 📍 IMPLEMENTADO EN:
- **ProductDetailPage** (parcial)

### ⚠️ ACCIONES PARCIALES:
```
🟡 save-listing → Heart icon sin funcionalidad real
🟡 share-listing → Función existe pero sin botón visible
```

### 🔄 REPLICAR EN:

#### ProductDetailPage (completar)
```typescript
const handleToggleSave = async () => {
  setIsLiked(!isLiked);
  await handleSaveListing(product);
};

<button onClick={handleToggleSave}>
  <Heart className={isLiked ? 'fill-red-500' : ''} />
</button>
```

#### Home (ProductCard)
```typescript
<button 
  className="absolute top-2 right-2"
  onClick={(e) => {
    e.stopPropagation();
    handleSave(product);
  }}
>
  <Heart className={isSaved ? 'fill-red-500' : ''} />
</button>
```

#### MapView (MapPinCard)
```typescript
<button onClick={() => handleSaveListing(product)}>
  <Heart className="w-3 h-3" />
</button>
```

---

## 📊 TABLA MAESTRA: ACCIONES POR PÁGINA

| Acción | Product Detail | My Listings | Notifications | Groups | Profile | Messages |
|--------|---------------|-------------|---------------|--------|---------|----------|
| **edit-listing** | ✅ ActionButtons | ⚠️ Dropdown | ❌ | - | - | - |
| **view-stats** | ✅ ActionButtons | ⚠️ Navigate | ❌ | - | - | - |
| **pause-listing** | ✅ ActionButtons | ⚠️ Dropdown | ❌ | - | - | - |
| **delete-listing** | ✅ ActionButtons | ⚠️ Dropdown | ❌ | - | - | - |
| **archive-listing** | ❌ | ⚠️ Dropdown | ❌ | - | - | - |
| **mark-as-sold** | ✅ Sheet | ❌ | ❌ | - | - | - |
| **duplicate-listing** | ❌ | ⚠️ Sin handler | ❌ | - | - | - |
| **reactivate-listing** | ❌ | ⚠️ "Resume" | ❌ | - | - | - |
| **renew-listing** | ❌ | ❌ | ✅ Botón | - | - | - |
| **boost-listing** | ❌ | ❌ | ❌ | - | - | - |
| **open-chat** | ✅ ActionButtons | ❌ | ✅ Botón | - | ❌ | - |
| **open-whatsapp** | ✅ ActionButtons | - | - | - | ❌ | - |
| **open-phone** | ✅ ActionButtons | - | - | - | ❌ | - |
| **make-offer** | ✅ Sheet | - | - | - | - | ✅ Sheet |
| **accept-trade** | ❌ | - | ✅ Botón | - | - | ❌ |
| **reject-trade** | ❌ | - | ⚠️ Implícito | - | - | ❌ |
| **leave-review** | ✅ Sheet | ❌ | ❌ | - | - | - |
| **report-listing** | ✅ Sheet | ❌ | ❌ | - | - | - |
| **save-listing** | ⚠️ Sin funcionalidad | - | - | - | - | - |
| **share-listing** | ⚠️ Sin botón | ⚠️ Dropdown | ❌ | - | - | - |
| **accept-group-invite** | - | - | ✅ Botón | ❌ | - | - |
| **preview-group** | - | - | ✅ Botón | - | - | - |
| **leave-group** | - | - | ❌ | ✅ Custom Dialog | - | - |
| **mute-group** | - | - | ❌ | ✅ Custom Dialog | - | - |
| **bulk-pause** | - | ✅ Toolbar | - | - | - | - |
| **bulk-archive** | - | ✅ Toolbar | - | - | - | - |
| **bulk-delete** | - | ✅ Toolbar | - | - | - | - |

**Leyenda:**
- ✅ = Implementado correctamente
- ⚠️ = Implementado pero hardcoded o parcial
- ❌ = Definido pero no implementado
- `-` = No aplica en ese contexto

---

## 🚀 PLAN DE ACCIÓN RÁPIDO

### 1️⃣ PRIORIDAD ALTA (Esta semana)

**MyListingsPage** → 2-3 horas
```
❌ Reemplazar dropdowns con ActionMenu
❌ Agregar MarkAsSoldSheet
❌ Completar duplicate-listing
❌ Agregar archive-listing
```

**NotificationsPage** → 1-2 horas
```
❌ Conectar actionIds a todas las notifications
❌ Agregar reject buttons explícitos
❌ Agregar TradeOfferSheet
```

**ProductDetailPage** → 1 hora
```
❌ Save-listing funcional (Heart)
❌ Share button visible
❌ Archive option para owners
```

### 2️⃣ PRIORIDAD MEDIA (Próxima semana)

**ProfilePage / SellerSheet** → 2 horas
```
❌ ActionButtons para follow/block/contact
❌ Integrar con Actions system
```

**GroupsPage** → 2 horas
```
❌ Reemplazar LeaveGroupDialog con Actions
❌ Reemplazar MuteNotificationsDialog con Actions
```

**Home & Map** → 2 horas
```
❌ Save heart en ProductCard
❌ Save heart en MapPinCard
❌ Share options
```

### 3️⃣ PRIORIDAD BAJA (Cuando sea necesario)

**Nuevas páginas** → 8-15 horas
```
❌ SavedItemsPage
❌ Organization Dashboard
❌ My Orders Page
```

---

## 💡 CÓDIGO COPY-PASTE PARA CADA CASO

### 🔹 Reemplazar Dropdown Hardcoded
```typescript
// ❌ ANTES
<DropdownMenu>
  <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
  <DropdownMenuItem onClick={onDelete}>Delete</DropdownMenuItem>
</DropdownMenu>

// ✅ DESPUÉS
import { ActionMenu } from "../actions";

<ActionMenu
  entity={entity}
  actionIds={['edit-listing', 'delete-listing']}
  isOwner={true}
/>
```

### 🔹 Agregar ActionButtons en Footer
```typescript
import { ActionButtons } from "../actions";

<footer className="fixed bottom-0 left-0 right-0 z-30">
  <ActionButtons
    context="product-detail"
    entity={entity}
    actionIds={['edit-listing', 'view-stats']}
    layout="horizontal"
    isOwner={true}
  />
</footer>
```

### 🔹 Agregar Custom Sheet
```typescript
// 1. Import
import { MarkAsSoldSheet } from "../MarkAsSoldSheet";

// 2. Estado
const [isOpen, setIsOpen] = useState(false);

// 3. Trigger
<Button onClick={() => setIsOpen(true)}>Mark as Sold</Button>

// 4. Sheet
<MarkAsSoldSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  product={product}
  onConfirm={handleConfirm}
/>
```

### 🔹 Agregar Save Icon
```typescript
// Estado
const [isSaved, setIsSaved] = useState(false);

// Handler
const handleToggleSave = async () => {
  setIsSaved(!isSaved);
  if (!isSaved) {
    await handleSaveListing(entity);
  } else {
    await handleStopWatching(entity);
  }
};

// UI
<button onClick={handleToggleSave}>
  <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
</button>
```

### 🔹 Agregar Bulk Actions
```typescript
// Estados
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

// Handlers
const handleBulkDelete = () => {
  toast.success(`Deleted ${selectedIds.size} items`);
  setSelectedIds(new Set());
};

// UI
<BulkActionsToolbar
  isVisible={selectedIds.size > 0}
  selectedCount={selectedIds.size}
  onDeselectAll={() => setSelectedIds(new Set())}
  onBulkDelete={handleBulkDelete}
/>
```

---

## 🎓 REGLAS DE ORO

1. **Siempre usar ActionButtons/ActionMenu** para acciones definidas en registry
2. **Custom Sheets** solo para formularios complejos o vistas detalladas
3. **No hardcodear** handlers si ya existen en `/actions/handlers.ts`
4. **Usar actionIds** en lugar de hardcodear botones
5. **Permisos automáticos** - el sistema los maneja por ti
6. **Bulk actions** - usar BulkActionsToolbar pattern
7. **Icon buttons** - para acciones rápidas visuales (save, share)

---

## 📞 NECESITAS AYUDA?

**Para agregar una nueva acción:**
1. Agregar en `/actions/registry.ts`
2. Agregar handler en `/actions/handlers.ts`
3. Agregar permiso en `/actions/permissions.ts` (si necesario)
4. Usar con `<ActionButtons actionIds={['tu-nueva-accion']} />`

**Para replicar una acción existente:**
1. Buscar en este documento el patrón
2. Copy-paste el código de ejemplo
3. Ajustar entity y actionIds
4. ¡Listo!

**Para debuggear:**
```typescript
// Ver qué acciones están disponibles
console.log(Object.keys(ACTION_REGISTRY));

// Ver una acción específica
console.log(getAction('edit-listing'));

// Ver permisos de un contexto
console.log(getCurrentPermissionContext(entity));
```
