====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
PHASE: FAVORITES MVP CLEANUP
MODE: SAFE + STABLE + NO BREAKING CHANGES
SCOPE: FAVORITES ONLY
====================================================================

CONTEXTO

Toma como source of truth el MVP canónico de Favorites:

--------------------------------------------------------------------
FAVORITES — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:
- lista simple de listings guardados por el usuario

Incluye:
- sección Saved Items
- search bar opcional
- lista de items guardados

Cada item incluye:
- Image
- Title
- Price
- Location
- Saved date
- Delete action

Badge en card:
- “Saved”

Acciones permitidas:
- Ver listing
- Eliminar de favoritos

Reglas:
- simple
- sin alertas
- sin seguimiento
- sin notificaciones directas
- consistente con badge de marketplace
- la terminología canónica de la app es “Favorites”, no “Likes”

OUT_OF_MVP:
- Alerts button
- mute/unmute notification icons
- tracking / seguimiento de cambios
- activar/desactivar alertas
- suscripción a cambios
- filtros avanzados

====================================================================
OBJETIVO
====================================================================

Implementar los cambios necesarios para que FAVORITES quede 100% alineado con el MVP canónico.

IMPORTANTE:
- hacerlo de manera segura
- hacerlo de manera estable
- no romper nada
- no tocar más de lo necesario
- no dejar nada afuera
- antes de entregarme resultados, verificar que TODO compile y que el flujo siga funcionando

====================================================================
ALCANCE EXACTO
====================================================================

Debes implementar TODO lo siguiente.

--------------------------------------------------------------------
FASE 1 — ELIMINAR ALERTS / TRACKING (CRÍTICO)
--------------------------------------------------------------------

FILE: /components/SavedItemsPage.tsx

REMOVE:
- botón "Alerts"
- filterType state con opción 'with-alerts'
- lógica de filtro por alerts
- handleToggleAlert function
- alertsCount computation
- alerts count en subtitle/header
- Bell / BellOff buttons en cards
- Alert badge "Alert at {price}"
- imports Bell y BellOff

Además:
- SavedItemCard debe quedar solo con:
  - ver listing
  - eliminar favorito

FILE: /utils/savedItems.ts

REMOVE COMPLETAMENTE:
- alertPrice en SavedItem interface
- alertEnabled en SavedItem interface
- setPriceAlert()
- removePriceAlert()
- getItemsWithAlerts()

KEEP:
- getSavedItems()
- saveItem()
- unsaveItem()
- isItemSaved()
- toggleSaveItem()
- getSavedItemsCount()
- clearAllSavedItems()
- exportSavedItems()
- importSavedItems()

--------------------------------------------------------------------
FASE 2 — CORREGIR TERMINOLOGÍA (ALTA PRIORIDAD)
--------------------------------------------------------------------

Quiero consistencia canónica:

- navegación / página: “Favorites”
- badge visual en card: “Saved”
- código interno: save / saved
- NO “likes”
- NO “liked”

FILE: /components/SavedItemsPage.tsx

CHANGE:
- Header title: "Saved Items" → "Favorites"
- placeholder search: que quede alineado con Favorites
- empty state copy: eliminar wording tipo “products you like”
- comentarios que mencionen liked → saved

FILE: /components/product-card/LikeButton.tsx

RENOMBRAR A:
- /components/product-card/SaveButton.tsx

Y actualizar el componente completo para usar:
- SaveButton
- isSaved
- onSaveClick

FILE: /components/product-card/useProductCard.ts

RENAME internals:
- isLiked → isSaved
- handleLikeClick → handleSaveClick
- comentarios: “like/save state” → “save state”

Mantener comportamiento funcional idéntico.

FILE: /components/product-card/ProductCard.tsx

Actualizar uso del hook y props:
- isSaved
- handleSaveClick

FILE: /components/product-card/ProductCardImage.tsx

Actualizar props:
- isLiked → isSaved
- onLikeClick → onSaveClick

Mantener:
- badge “Saved”
- mismo estilo visual
- mismo comportamiento del botón heart

FILE: /components/product-card/index.ts

Actualizar export:
- export { SaveButton } from './SaveButton'
- remover export viejo de LikeButton

--------------------------------------------------------------------
FASE 3 — LIMPIEZA DE COMENTARIOS Y REFERENCIAS
--------------------------------------------------------------------

Buscar y limpiar referencias NO canónicas en estos archivos y relacionados:
- liked
- likes
- like/save
- with-alerts
- alertPrice
- alertEnabled
- setPriceAlert
- removePriceAlert
- getItemsWithAlerts

IMPORTANTE:
- si alguna referencia sigue viva y rompe compile, corregirla
- no dejar imports muertos
- no dejar props muertas
- no dejar funciones muertas
- no dejar comentarios desactualizados

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO romper:
- ProductCard
- navegación a ProductDetail
- Saved badge
- lógica de guardar / eliminar favoritos
- MenuSheet → Favorites
- localStorage persistence
- empty state
- search bar
- callback onProductClick
- Home / Marketplace cards

NO tocar nada que no sea necesario.

NO cambiar diseño visual más allá de:
- remover alerts
- corregir labels/copy
- renombrar internals para consistencia

Si encuentras algo ambiguo:
- prioriza MVP canónico
- pero implementa de forma conservadora y segura

====================================================================
VALIDACIÓN OBLIGATORIA ANTES DE ENTREGAR RESULTADOS
====================================================================

Antes de responder, verifica TODO esto:

COMPILACIÓN
- compile OK
- no TypeScript errors
- no missing imports
- no unused imports críticos
- no props inconsistentes

FAVORITES FLOW
- MenuSheet → Favorites abre correctamente
- Header muestra “Favorites”
- Lista muestra items guardados
- Search funciona
- Click en item abre detail
- Trash elimina favorito
- Empty state funciona

MARKETPLACE / CARD FLOW
- Heart/save button sigue funcionando
- Click save guarda item
- Badge “Saved” aparece correctamente
- Click de nuevo elimina favorito
- No regresiones en ProductCard

NO MVP FEATURES
- NO existe botón Alerts
- NO existe Bell icon
- NO existe BellOff icon
- NO existe Alert badge
- NO existe filtro with-alerts
- NO existe tracking/seguimiento
- NO existe alertPrice
- NO existe alertEnabled

TERMINOLOGÍA
- UI visible usa Favorites / Saved
- NO aparece “Likes” en UI
- NO aparece “Liked” en UI
- Código actualizado a save/saved donde corresponda

====================================================================
OUTPUT OBLIGATORIO
====================================================================

Cuando termines, entrégame SOLO este formato:

1. FILES MODIFIED
2. FILES RENAMED
3. FILES / FUNCTIONS REMOVED
4. CHANGES APPLIED
5. VALIDATION
   - compile OK
   - favorites flow OK
   - marketplace save flow OK
   - no alerts/tracking left
   - terminology OK
6. ESTADO FINAL

IMPORTANTE:
- No me entregues una explicación larga
- No me digas lo que “planeas hacer”
- Entrégame resultados finales ya ejecutados
- Verifica antes de responder
- Si algo no pudiste tocar, dilo explícitamente

====================================================================
CRITERIO FINAL DE ÉXITO
====================================================================

Favorites debe quedar:

✅ simple
✅ estable
✅ seguro
✅ sin alerts
✅ sin tracking
✅ sin likes wording
✅ con “Favorites” como terminología oficial
✅ con badge “Saved” consistente en cards
✅ sin romper nada

====================================================================
FIN
====================================================================