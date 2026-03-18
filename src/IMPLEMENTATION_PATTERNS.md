# 🎨 PATRONES DE IMPLEMENTACIÓN: 51 ACCIONES

## 📍 DÓNDE ESTÁN IMPLEMENTADAS LAS ACCIONES ACTUALES

---

## PATRÓN 1: 🟢 ActionButtons Component (MEJOR PRÁCTICA)

### ✅ **Usado en:** ProductDetailPage (ProductActions.tsx)

**Acciones implementadas:**
- edit-listing
- view-stats  
- pause-listing
- delete-listing
- open-chat
- open-whatsapp
- open-phone

### 📝 Código de Ejemplo:

```typescript
// ProductActions.tsx
import { ActionButtons } from "../actions";

// Para OWNER (botones de gestión)
<ActionButtons
  context="product-detail"
  entity={{ ...product, userId: product.ownerId || 'user-123' }}
  actionIds={['edit-listing', 'view-stats', 'pause-listing', 'delete-listing']}
  layout="horizontal"
  isOwner={true}
/>

// Para BUYER (botones de contacto)
<ActionButtons
  context="product-detail"
  entity={product}
  actionIds={['open-chat', 'open-whatsapp', 'open-phone']}
  layout="horizontal"
  isOwner={false}
  customHandlers={{
    'open-chat': handleCustomChat, // Handler personalizado si necesario
  }}
/>
```

### 🎯 **Se puede replicar fácilmente en:**

#### 1️⃣ **MyListingsPage** - Reemplazar dropdowns hardcoded
```typescript
// EN LUGAR DE:
<DropdownMenuItem onClick={() => onEdit(listing)}>
  <Edit2 className="w-4 h-4 mr-2" />
  Edit
</DropdownMenuItem>

// USAR:
import { ActionMenu } from "../actions";

<ActionMenu
  entity={listing}
  actionIds={[
    'edit-listing',
    'view-stats',
    'pause-listing',
    'duplicate-listing',
    'archive-listing',
    'share-listing',
    'delete-listing'
  ]}
  isOwner={true}
  triggerIcon={MoreVertical}
  align="end"
/>
```

#### 2️⃣ **NotificationsPage** - En cada NotificationCard
```typescript
// YA PREPARADO, solo falta conectar los actionIds
<NotificationCard
  type="listing-expiring"
  priority="urgent"
  title="Your listing expires in 2 days"
  subtitle="Coffee Maker - Viña del Mar"
  time="1h ago"
  actionIds={['renew-listing', 'edit-listing', 'delete-listing']} // 👈 Usar esto
  onAction={handleNotificationAction}
/>
```

#### 3️⃣ **ProfilePage / SellerSheet**
```typescript
// Botones de acción en perfil del vendedor
<ActionButtons
  context="profile"
  entity={seller}
  actionIds={['open-chat', 'open-whatsapp', 'open-phone', 'follow-seller', 'block-user']}
  layout="horizontal"
  isOwner={false}
/>
```

#### 4️⃣ **GroupDetailPage** - En lugar de componentes custom
```typescript
// REEMPLAZAR LeaveGroupDialog y MuteNotificationsDialog con:
<ActionButtons
  context="groups"
  entity={group}
  actionIds={['mute-group', 'leave-group']}
  layout="vertical"
  isOwner={false}
/>
```

---

## PATRÓN 2: 🟡 Custom Sheets (PARA ACCIONES COMPLEJAS)

### ✅ **Usado en:** ProductDetailPage

**Acciones implementadas:**
- mark-as-sold → MarkAsSoldSheet
- make-offer → MakeOfferSheet
- leave-review → RatingSheet
- report-listing → ReportSheet

### 📝 Código de Ejemplo:

```typescript
// 1. Importar el sheet custom
// NOTE: For chat context, use MakeOfferSheetChat or MarkAsSoldSheetChat
// For ProductDetailPage, use /components/sheets/MarkAsSoldSheet
import { MarkAsSoldSheet } from "./sheets/MarkAsSoldSheet";

// 2. Estado para controlar apertura
const [isMarkAsSoldSheetOpen, setIsMarkAsSoldSheetOpen] = useState(false);

// 3. Botón que abre el sheet (puede estar en header, dropdown, etc)
<Button onClick={() => setIsMarkAsSoldSheetOpen(true)}>
  Mark as Sold
</Button>

// 4. Renderizar el sheet
<MarkAsSoldSheet
  open={isMarkAsSoldSheetOpen}
  onOpenChange={setIsMarkAsSoldSheetOpen}
  product={product}
  onConfirm={(data) => {
    console.log('Sold data:', data);
    toast.success('Marked as sold!');
  }}
/>
```

### 🎯 **Se puede replicar en:**

#### 1️⃣ **MyListingsPage** - Agregar MarkAsSoldSheet
```typescript
// En el dropdown de cada listing
<DropdownMenuItem onClick={() => {
  setSelectedListing(listing);
  setIsMarkAsSoldSheetOpen(true);
}}>
  <CheckCircle className="w-4 h-4 mr-2" />
  Mark as Sold
</DropdownMenuItem>

<MarkAsSoldSheet
  open={isMarkAsSoldSheetOpen}
  onOpenChange={setIsMarkAsSoldSheetOpen}
  product={selectedListing}
  onConfirm={handleMarkAsSold}
/>
```

#### 2️⃣ **ChatConversationPage** - MakeOfferSheet YA IMPLEMENTADO ✅
```typescript
// Ya funcional en chat
<MakeOfferSheet
  open={isMakeOfferSheetOpen}
  onOpenChange={setIsMakeOfferSheetOpen}
  product={currentProduct}
  onSendOffer={handleSendOffer}
/>
```

#### 3️⃣ **NotificationsPage** - Sheets para acciones complejas
```typescript
// Para "view-trade-offer"
<TradeOfferSheet
  open={isTradeOfferSheetOpen}
  onOpenChange={setIsTradeOfferSheetOpen}
  offer={selectedOffer}
  onAccept={handleAcceptTrade}
  onReject={handleRejectTrade}
  onCounterOffer={handleCounterOffer}
/>
```

---

## PATRÓN 3: 🟢 Bulk Actions Toolbar (ACCIONES MASIVAS)

### ✅ **Usado en:** MyListingsPage

**Acciones implementadas:**
- bulk-pause
- bulk-archive
- bulk-delete

### 📝 Código de Ejemplo:

```typescript
// MyListingsPage.tsx
import { BulkActionsToolbar } from "./my-listings";

// 1. Estado de selección
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
const [isSelectionMode, setIsSelectionMode] = useState(false);

// 2. Handlers
const handleBulkPause = () => {
  toast.success(`Paused ${selectedIds.size} listings`);
  deselectAll();
};

const handleBulkArchive = () => {
  toast.success(`Archived ${selectedIds.size} listings`);
  deselectAll();
};

const handleBulkDelete = () => {
  toast.success(`Deleted ${selectedIds.size} listings`);
  deselectAll();
};

// 3. Renderizar toolbar
<BulkActionsToolbar
  isVisible={isSelectionMode && selectedIds.size > 0}
  selectedCount={selectedIds.size}
  onDeselectAll={deselectAll}
  onBulkPause={handleBulkPause}
  onBulkArchive={handleBulkArchive}
  onBulkDelete={handleBulkDelete}
/>
```

### 🎯 **Se puede EXTENDER con:**

#### 1️⃣ **Agregar más acciones bulk**
```typescript
// Modificar BulkActionsToolbar.tsx para incluir:
<Button onClick={onBulkBoost}>
  <TrendingUp className="w-3 h-3 mr-1" />
  Boost
</Button>

<Button onClick={onBulkReactivate}>
  <Play className="w-3 h-3 mr-1" />
  Reactivate
</Button>
```

#### 2️⃣ **Usar en Organization Dashboard** (cuando se cree)
```typescript
// Same pattern, different context
<BulkActionsToolbar
  isVisible={isSelectionMode && selectedIds.size > 0}
  selectedCount={selectedIds.size}
  onDeselectAll={deselectAll}
  onBulkPause={handleBulkPause}
  onBulkArchive={handleBulkArchive}
  onBulkDelete={handleBulkDelete}
  onBulkBoost={handleBulkBoost}
  onBulkEditPrices={handleBulkEditPrices}
  onBulkAssign={handleBulkAssign}
/>
```

---

## PATRÓN 4: 🟡 Hardcoded Buttons/Dropdowns (LEGACY - A REEMPLAZAR)

### ⚠️ **Usado en:** MyListingsPage (ListingCard.tsx)

**Acciones hardcoded:**
- edit-listing (dropdown)
- pause-listing / reactivate (dropdown "Resume")
- delete-listing (dropdown)
- duplicate-listing (dropdown sin handler)
- share-listing (dropdown)

### 📝 Código Actual (MALO):

```typescript
// ListingCard.tsx - PATRÓN ANTIGUO
<DropdownMenu>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={() => onEdit(listing)}>
      <Edit2 className="w-4 h-4 mr-2" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onShare(listing)}>
      <Share2 className="w-4 h-4 mr-2" />
      Share
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onDuplicate(listing)}>
      <Copy className="w-4 h-4 mr-2" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuItem onClick={() => onTogglePause(listing)}>
      {listing.lifecycle === "paused" ? (
        <>
          <Play className="w-4 h-4 mr-2" />
          Resume
        </>
      ) : (
        <>
          <Pause className="w-4 h-4 mr-2" />
          Pause
        </>
      )}
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={() => onDelete(listing)}>
      <Trash2 className="w-4 h-4 mr-2" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### ✅ **Cómo DEBE SER (usando ActionMenu):**

```typescript
// ListingCard.tsx - PATRÓN CORRECTO
import { ActionMenu } from "../actions";

<ActionMenu
  entity={{
    ...listing,
    userId: listing.userId || 'user-123',
  }}
  actionIds={
    listing.lifecycle === 'paused'
      ? ['edit-listing', 'view-stats', 'reactivate-listing', 'share-listing', 'duplicate-listing', 'archive-listing', 'delete-listing']
      : ['edit-listing', 'view-stats', 'pause-listing', 'share-listing', 'duplicate-listing', 'archive-listing', 'delete-listing']
  }
  isOwner={true}
  triggerIcon={MoreVertical}
  align="end"
/>
```

**Ventajas:**
- ✅ Permisos automáticos
- ✅ Consistencia visual
- ✅ UI patterns automáticos (alert, quick-sheet, full-sheet)
- ✅ Handlers centralizados
- ✅ Menos código duplicado

---

## PATRÓN 5: 🟡 Icon Buttons (NO FUNCIONALES - A COMPLETAR)

### ⚠️ **Usado en:** ProductDetailPage

**Acciones con icon pero sin funcionalidad:**
- save-listing (Heart icon en header)
- share-listing (función existe pero sin botón visible)

### 📝 Código Actual (INCOMPLETO):

```typescript
// ProductDetailPage.tsx
const [isLiked, setIsLiked] = useState(false);

<button
  onClick={() => setIsLiked(!isLiked)}
  className="icon-button"
>
  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
</button>
```

### ✅ **Cómo DEBE SER (conectado al Action system):**

```typescript
// ProductDetailPage.tsx
import { handleSaveListing } from "../actions/handlers";

const [isLiked, setIsLiked] = useState(false);

const handleToggleSave = async () => {
  const newState = !isLiked;
  setIsLiked(newState);
  
  if (newState) {
    await handleSaveListing({ ...product, userId: 'user-123' });
  } else {
    await handleStopWatching({ ...product, userId: 'user-123' });
  }
};

<button
  onClick={handleToggleSave}
  className="icon-button"
>
  <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
</button>
```

### 🎯 **Se puede aplicar en:**

#### 1️⃣ **Home (ProductCard.tsx)**
```typescript
// Agregar heart icon en cada card
<button
  onClick={(e) => {
    e.stopPropagation();
    handleToggleSave(product);
  }}
  className="absolute top-2 right-2 icon-button bg-white/90"
>
  <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500' : ''}`} />
</button>
```

#### 2️⃣ **MapView (pins)**
```typescript
// En MapPinCard, agregar save option
<button onClick={() => handleSaveListing(product)}>
  <Heart className="w-3 h-3" />
</button>
```

---

## 📊 RESUMEN: CUÁNDO USAR CADA PATRÓN

| Patrón | Cuándo Usar | Ejemplo |
|--------|-------------|---------|
| **ActionButtons** | Botones inline visibles | Footer de Product Detail, Contact buttons |
| **ActionMenu** | Dropdown con múltiples opciones | My Listings card menu, Product overflow menu |
| **Custom Sheet** | Formulario complejo o vista detallada | MarkAsSoldSheet, MakeOfferSheet, RatingSheet |
| **BulkActionsToolbar** | Acciones sobre múltiples items | My Listings bulk actions |
| **Icon Button** | Acción rápida visual | Save/like, Share |

---

## 🚀 PLAN DE REPLICACIÓN POR PRIORIDAD

### 🔥 PRIORIDAD 1: MyListingsPage (2-3 horas)

**Reemplazar:**
```typescript
// ❌ ANTES: ListingCard.tsx con dropdowns hardcoded
<DropdownMenu>
  <DropdownMenuItem onClick={onEdit}>Edit</DropdownMenuItem>
  <DropdownMenuItem onClick={onShare}>Share</DropdownMenuItem>
  ...
</DropdownMenu>

// ✅ DESPUÉS: Usar ActionMenu
<ActionMenu
  entity={listing}
  actionIds={['edit-listing', 'view-stats', 'pause-listing', ...]}
  isOwner={true}
/>
```

**Agregar:**
- MarkAsSoldSheet en dropdown
- Funcionalidad real para duplicate-listing
- archive-listing option

**Archivos a modificar:**
- `/components/my-listings/ListingCard.tsx`
- `/components/MyListingsPage.tsx`

---

### 🔥 PRIORIDAD 2: NotificationsPage (1-2 horas)

**Completar:**
```typescript
// ✅ YA PREPARADO, solo conectar actionIds

// Para cada tipo de notificación:
const notificationActionMap = {
  'listing-expiring': ['renew-listing', 'edit-listing', 'delete-listing'],
  'trade-offer': ['accept-trade', 'reject-trade', 'counter-offer', 'view-trade-offer'],
  'question': ['respond-question', 'open-chat'],
  'group-invite': ['accept-group-invite', 'reject-group-invite', 'preview-group'],
  'message': ['open-chat', 'quick-reply'],
};

<NotificationCard
  type={notification.type}
  actionIds={notificationActionMap[notification.type]}
  onAction={handleNotificationAction}
/>
```

**Archivos a modificar:**
- `/components/notifications/NotificationsPage.tsx`
- `/components/notifications/mockNotifications.ts` (agregar actionIds)

---

### 🔥 PRIORIDAD 3: Product Detail Enhancements (1 hora)

**Agregar:**
1. **Save functionality** (Heart icon functional)
2. **Share button visible** (usar ActionButtons o icon)
3. **Archive option** para owners

```typescript
// En ProductActions.tsx
{isOwner ? (
  <ActionButtons
    actionIds={[
      'edit-listing',
      'view-stats',
      'pause-listing',
      'archive-listing', // 👈 AGREGAR
      'delete-listing'
    ]}
  />
) : (
  <>
    <ActionButtons actionIds={getContactActionIds()} />
    <button onClick={handleSave}> {/* 👈 AGREGAR */}
      <Heart className={isLiked ? 'fill-red-500' : ''} />
    </button>
  </>
)}
```

**Archivos a modificar:**
- `/components/product-detail/ProductActions.tsx`
- `/components/ProductDetailPage.tsx`

---

### 🟡 PRIORIDAD 4: GroupsPage Integration (2 horas)

**Reemplazar componentes custom:**
```typescript
// ❌ ANTES: LeaveGroupDialog.tsx, MuteNotificationsDialog.tsx

// ✅ DESPUÉS: Usar Action system
<ActionButtons
  context="groups"
  entity={group}
  actionIds={['mute-group', 'leave-group']}
/>
```

**Archivos a modificar:**
- `/components/group-detail/GroupDetailPage.tsx`
- Deprecar: `/components/groups/LeaveGroupDialog.tsx`
- Deprecar: `/components/groups/MuteNotificationsDialog.tsx`

---

### 🟡 PRIORIDAD 5: Home & Map Enhancements (2 horas)

**Agregar save/like en:**
1. **ProductCard** (Home)
2. **MapPinCard** (Map View)

```typescript
// ProductCard.tsx
<div className="relative">
  <img src={product.image} />
  <button 
    className="absolute top-2 right-2"
    onClick={handleSave}
  >
    <Heart className={isSaved ? 'fill-red-500' : ''} />
  </button>
</div>
```

**Archivos a modificar:**
- `/components/product-card/ProductCard.tsx`
- `/components/map-view/MapPinCard.tsx`

---

### 🟢 PRIORIDAD 6: New Pages (8-15 horas)

**Crear páginas faltantes:**

1. **SavedItemsPage** (3-4h)
   - Lista de listings guardados
   - Price alerts configurables
   - ActionButtons: ['stop-watching', 'create-price-alert', 'open-chat']

2. **Organization Dashboard** (8-10h)
   - Vista de todos los listings del team
   - Bulk actions avanzadas
   - Team analytics
   - ActionButtons: ['approve-member-listing', 'assign-listing', 'transfer-ownership', 'bulk-edit-prices']

3. **My Orders Page** (2-3h)
   - Historial de compras
   - ActionButtons: ['confirm-delivery-received', 'leave-review', 'open-chat']

---

## 💡 BENEFICIOS DE USAR EL SISTEMA DE ACTIONS

### ✅ Ventajas Técnicas
1. **Código centralizado**: Un solo lugar para cada acción
2. **Type safety**: TypeScript completo
3. **Permisos automáticos**: Sistema centralizado de permisos
4. **UI patterns**: Alert/QuickSheet/FullSheet automáticos
5. **Testing**: Más fácil de testear
6. **Mantenimiento**: Cambios en un solo lugar

### ✅ Ventajas de UX
1. **Consistencia visual**: Mismo look en toda la app
2. **Mejor experiencia**: Feedback consistente (toasts)
3. **Responsive**: Patterns optimizados para mobile/desktop
4. **Accesibilidad**: ARIA labels centralizados

### ✅ Ventajas de Desarrollo
1. **Menos código**: No duplicar handlers
2. **Más rápido**: Solo pasar actionIds
3. **Escalable**: Agregar nuevas acciones es fácil
4. **Documentación**: Registry es auto-documentación

---

## 📝 CHECKLIST DE MIGRACIÓN

Cuando migres una página al sistema de Actions:

- [ ] Identificar todas las acciones actuales
- [ ] Verificar que existen en ACTION_REGISTRY
- [ ] Reemplazar handlers duplicados con imports del registry
- [ ] Usar ActionButtons/ActionMenu en lugar de botones custom
- [ ] Eliminar código duplicado (estados, handlers, UI)
- [ ] Probar permisos (isOwner, isNotOwner, etc)
- [ ] Verificar que los toasts funcionan
- [ ] Testear en mobile y desktop
- [ ] Actualizar este documento con ejemplos

---

## 🎯 META FINAL

**Todas las páginas usando el sistema centralizado:**

```typescript
// IDEAL: Cada página solo necesita esto
<ActionButtons
  context="product-detail"
  entity={entity}
  actionIds={['action-1', 'action-2', 'action-3']}
  isOwner={isOwner}
  customHandlers={customHandlers} // Solo si necesario
/>
```

**Sin:**
- ❌ Handlers duplicados
- ❌ Estados duplicados  
- ❌ UI patterns duplicados
- ❌ Permisos duplicados
- ❌ Código hardcoded

**Con:**
- ✅ Registry centralizado
- ✅ Handlers reutilizables
- ✅ Permisos automáticos
- ✅ UI patterns automáticos
- ✅ Type safety completo