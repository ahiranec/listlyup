====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
ACTION CENTER — MVP CLEANUP (SURGICAL)
MODE: SAFE IMPLEMENTATION
SCOPE: ONLY ACTION CENTER
====================================================================

CONTEXTO

Debes implementar una limpieza quirúrgica del módulo Action Center para dejarlo alineado con el MVP canónico.

IMPORTANTE:
- NO quiero rediseño grande.
- NO quiero refactor innecesario.
- NO quiero inventar features nuevas.
- NO quiero romper navegación ni handlers existentes que sí sirven al MVP.
- SOLO quiero cleanup seguro de lo que está OUT_OF_MVP + ajuste de naming a la estructura canónica.

El Action Center MVP final debe quedar así:

TABS FINALES:
1. Listings
2. Groups

LISTINGS debe reunir:
- Chat
- Q&A
- Listing Status

GROUPS debe reunir:
- Group Reports

NOTA:
- Moderation en Listings y Group Moderation en Groups pueden quedar como mejora posterior si hoy no existen claramente, PERO no deben bloquear este cleanup.
- Lo prioritario ahora es ELIMINAR TODO lo que está visible y que es OUT_OF_MVP.

====================================================================
OBJETIVO EXACTO
====================================================================

Dejar Action Center sin:
- Campaigns tab
- Events tab
- Admin tab
- Trade Offers
- Join Requests

Y además:
- renombrar tab "Personal" → "Listings"
- mantener solo lo que sí pertenece al MVP
- preservar componentes reutilizados
- preservar modales existentes
- preservar navegación útil
- preservar handlers útiles

====================================================================
REGLAS CRÍTICAS
====================================================================

NO TOCAR SI YA FUNCIONA:
- MessageCard
- QuestionCard
- ListingActionCard
- ReportCard
- ReplySheet
- ConfirmActionDialog
- ViewStatusDialog
- RejectionReasonsDialog
- Global Action Modal (GAM)
- ModerationChatCard
- handleQuestionReply
- handleViewListing
- handleContinueDraft
- handleReviewReport
- handleTakeActionOnReport
- handleDismissReport

NO CREAR:
- nuevos modales
- nuevas tabs
- nuevas features
- nuevas rutas
- nueva arquitectura

NO ELIMINAR ARCHIVOS FUTURE-READY SI NO ES NECESARIO.
Solo deben dejar de exponerse en UI / imports / rendering del Action Center.

====================================================================
TAREAS EXACTAS
====================================================================

--------------------------------------------------------------------
PHASE 1 — REMOVE OUT_OF_MVP TABS
--------------------------------------------------------------------

FILE:
- /components/ActionCenterPage.tsx

ELIMINAR COMPLETAMENTE DE LA UI Y DEL RENDER:

1. Campaigns tab
2. Events tab
3. Admin tab

Esto incluye:
- botón/tab selector
- count badge
- tab content
- render blocks
- handlers específicos
- mock data específicos
- imports exclusivos de esas tabs

REMOVE imports si están usados solo para eso:
- CampaignRequestCard
- PlatformReportCard
- FlaggedListingCard
- UserIssueCard

REMOVE mock data relacionados:
- mockCampaignOwnerRequests
- mockUserCampaignRequests
- mockEventHubOwnerRequests
- mockUserEventHubRequests
- mockPlatformReports
- mockFlaggedListings
- mockUserIssues

REMOVE handlers relacionados:
- handleApproveCampaignRequest
- handleRejectCampaignRequest
- handleViewUserCampaignStatus
- handleApproveEventHubRequest
- handleRejectEventHubRequest
- handleViewUserEventHubStatus
- handleReviewPlatformReport
- handleResolvePlatformReport
- handleDismissPlatformReport
- handleReviewFlaggedListing
- handleApproveFlaggedListing
- handleRemoveFlaggedListing
- handleReviewUserIssue
- handleResolveUserIssue
- handleContactUser

REMOVE count calculations relacionados:
- campaignsCount
- eventsCount
- adminCount

RECALCULAR totalCount solo con lo que quede en MVP.

--------------------------------------------------------------------
PHASE 2 — REMOVE TRADE OFFERS
--------------------------------------------------------------------

FILE:
- /components/ActionCenterPage.tsx

ELIMINAR COMPLETAMENTE:

- TradeOfferCard import
- mockTradeOffers
- QuickCountCard de Trade Offers
- sección Trade Offers dentro de Personal/Listings
- cualquier count de Trade Offers
- cualquier render de cards de Trade Offers

IMPORTANTE:
Trade Offers está explícitamente OUT_OF_MVP.
No debe quedar visible en ninguna parte del Action Center.

NO BORRAR archivos future-ready si no hace falta.
Solo remover su uso en Action Center.

--------------------------------------------------------------------
PHASE 3 — REMOVE JOIN REQUESTS
--------------------------------------------------------------------

FILE:
- /components/ActionCenterPage.tsx

ELIMINAR COMPLETAMENTE:

- JoinRequestCard import
- mockJoinRequests
- sección Join Requests dentro de Groups
- handlers:
  - handleApproveJoinRequest
  - handleRejectJoinRequest
- cualquier count de Join Requests dentro de Groups tab

IMPORTANTE:
Groups tab MVP debe quedarse con:
- Group Reports

NO con Join Requests.

--------------------------------------------------------------------
PHASE 4 — RENAME PERSONAL TO LISTINGS
--------------------------------------------------------------------

FILE:
- /components/ActionCenterPage.tsx

RENOMBRAR:

- tab id/state: personal → listings
- label visible: Personal → Listings

ACTUALIZAR TODO LO NECESARIO:
- type Tab
- setActiveTab(...)
- activeTab checks
- count variable personalCount → listingsCount
- cualquier comparación/render relacionado

IMPORTANTE:
No romper el render existente de:
- Messages / Chat
- Questions / Q&A
- Listing Actions / Listing Status

--------------------------------------------------------------------
PHASE 5 — KEEP ONLY MVP CONTENT
--------------------------------------------------------------------

El resultado visible del Action Center debe quedar así:

TAB 1 — Listings
Contenido permitido:
- Messages/Chat
- Questions/Q&A
- Listing Actions / Listing Status

TAB 2 — Groups
Contenido permitido:
- Group Reports

SI YA EXISTEN encabezados o separadores, puedes dejarlos.
SI NO existen, NO inventes una gran estructura nueva.
Solo deja el contenido limpio y entendible.

NO implementar todavía:
- Campaigns
- Events
- Admin
- Trade Offers
- Join Requests

--------------------------------------------------------------------
PHASE 6 — DO NOT OVER-IMPLEMENT MODERATION
--------------------------------------------------------------------

IMPORTANTE:

Si no existe hoy una subsección clara de:
- Moderation en Listings
- Group Moderation en Groups

NO inventes una implementación nueva ahora.

Puedes dejarlo pendiente.
Lo importante en esta fase es:

✅ sacar lo que sobra
✅ dejar 2 tabs limpias
✅ mantener lo que ya sirve
✅ no romper nada

====================================================================
FIXES EXACTOS ESPERADOS
====================================================================

FILE: /components/ActionCenterPage.tsx

1. TYPE TAB
ANTES:
- type Tab = 'personal' | 'campaigns' | 'events' | 'groups' | 'admin';

DESPUÉS:
- type Tab = 'listings' | 'groups';

2. STATE / ACTIVE TAB
ANTES:
- activeTab === 'personal'
- setActiveTab('personal')

DESPUÉS:
- activeTab === 'listings'
- setActiveTab('listings')

3. TAB BUTTONS
DEJAR SOLO:
- Listings
- Groups

REMOVER:
- Campaigns
- Events
- Admin

4. COUNTS
DEJAR:
- listingsCount
- groupsCount
- totalCount = listingsCount + groupsCount

REMOVER:
- trade offers del count
- join requests del count
- campaignsCount
- eventsCount
- adminCount

5. LISTINGS TAB
DEJAR:
- MessageCard renders
- QuestionCard renders
- ListingActionCard renders

REMOVER:
- Trade Offers section

6. GROUPS TAB
DEJAR:
- ReportCard renders
- handlers de report review / take action / dismiss

REMOVER:
- Join Requests section

7. IMPORTS
REMOVER si quedan sin uso:
- CampaignRequestCard
- PlatformReportCard
- FlaggedListingCard
- UserIssueCard
- TradeOfferCard
- JoinRequestCard

8. MOCK DATA
REMOVER:
- mockTradeOffers
- mockJoinRequests
- mockCampaignOwnerRequests
- mockUserCampaignRequests
- mockEventHubOwnerRequests
- mockUserEventHubRequests
- mockPlatformReports
- mockFlaggedListings
- mockUserIssues

====================================================================
SAFETY RULES
====================================================================

NO ROMPER:
- navegación desde menú al Action Center
- back button
- ReplySheet
- GAM
- render de MessageCard
- render de QuestionCard
- render de ListingActionCard
- render de ReportCard
- handlers útiles del MVP
- remove-on-action reactivity que ya funciona
- compile
- imports
- types

NO BORRAR:
- archivos future-ready de campaigns/admin/events si no es necesario
- componentes que puedan servir después

SÍ BORRAR del Action Center:
- imports muertos
- mock data muerto
- handlers muertos
- render blocks muertos
- tabs muertas

====================================================================
VALIDACIÓN OBLIGATORIA
====================================================================

Antes de responder, verificar todo esto:

1. COMPILE
- TypeScript compila sin errores
- no missing imports
- no unused imports críticos
- no broken references

2. TABS
- solo existen 2 tabs visibles:
  - Listings
  - Groups

3. LISTINGS TAB
- renderiza mensajes/chat
- renderiza questions/Q&A
- renderiza listing actions/status
- NO muestra Trade Offers

4. GROUPS TAB
- renderiza Group Reports
- NO muestra Join Requests

5. OUT_OF_MVP REMOVED
- NO Campaigns tab
- NO Events tab
- NO Admin tab
- NO Trade Offers
- NO Join Requests

6. REUSE OK
- ReplySheet sigue funcionando
- GAM sigue funcionando
- handlers MVP siguen funcionando

7. NAVIGATION
- Action Center abre correctamente
- back button funciona
- tab switching funciona

====================================================================
OUTPUT REQUERIDO
====================================================================

Responde SOLO con este formato:

1. FILES MODIFIED
2. FILES LEFT INTACT
3. REMOVED FROM UI
4. REMOVED FROM CODE
5. VALIDATION
   - compile OK / not OK
   - tabs OK
   - listings OK
   - groups OK
   - no OUT_OF_MVP visible
6. ESTADO FINAL

IMPORTANTE:
- No des explicación larga.
- No digas lo que “harías”.
- Implementa y reporta lo implementado.
- Si algo no pudiste eliminar por seguridad, dilo explícitamente.
- No inventes que quedó 100% si no verificaste.
- Prioriza estabilidad sobre ambición.

====================================================================
FIN
====================================================================