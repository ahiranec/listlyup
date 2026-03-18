====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
ACTION CENTER — FINAL CLEAN REBUILD
MODE: SAFE REGENERATION
SCOPE: /components/ActionCenterPage.tsx ONLY
====================================================================

CONTEXTO

El intento anterior dejó el archivo /components/ActionCenterPage.tsx parcialmente limpio en UI, pero con código residual corrupto, referencias muertas y riesgo de runtime errors.

Por lo tanto:

✅ NO quiero más parches encima del archivo actual
✅ NO quiero seguir editando bloques corruptos
✅ QUIERO RECONSTRUIR el archivo ActionCenterPage.tsx de forma limpia, estable y MVP-only
✅ QUIERO preservar los componentes reutilizables correctos
✅ QUIERO eliminar por completo todo rastro visible y lógico de features OUT_OF_MVP

Este prompt reemplaza el enfoque de edición quirúrgica parcial por una regeneración limpia del archivo completo.

====================================================================
OBJETIVO EXACTO
====================================================================

Reescribir COMPLETAMENTE:

- /components/ActionCenterPage.tsx

para que quede:

1. estable
2. compilable
3. sin código residual
4. con solo 2 tabs MVP:
   - Listings
   - Groups

Y con contenido solo MVP:

LISTINGS:
- Chat
- Q&A
- Listing Status

GROUPS:
- Group Reports

IMPORTANTE:
- Moderation en Listings y Group Moderation en Groups pueden quedar deferidos.
- NO inventes implementaciones nuevas para esas subsecciones si no existen claras hoy.
- La prioridad es dejar el archivo limpio y 100% estable.

====================================================================
REGLAS CRÍTICAS
====================================================================

NO HACER:
- no parchear sobre bloques corruptos
- no dejar código comentado enorme
- no mantener renders muertos
- no dejar imports “por si acaso”
- no crear nuevas tabs
- no crear nuevas rutas
- no crear nuevos modales
- no reintroducir Campaigns, Events, Admin, Trade Offers o Join Requests

SÍ HACER:
- regenerar el archivo limpio desde cero
- reutilizar únicamente los componentes MVP que ya existen y funcionan
- mantener handlers útiles
- mantener navegación útil
- mantener ReplySheet y modales existentes correctamente integrados

====================================================================
ESTRUCTURA MVP FINAL OBLIGATORIA
====================================================================

ACTION CENTER
├─ Header
│  ├─ Back button
│  ├─ Title
│  └─ Bell / count summary si ya existe y no duplica nada raro
│
├─ Tabs
│  ├─ Listings
│  └─ Groups
│
├─ Listings Tab
│  ├─ Chat
│  │  └─ MessageCard list
│  ├─ Q&A
│  │  └─ QuestionCard list
│  └─ Listing Status
│     └─ ListingActionCard list
│
└─ Groups Tab
   └─ Group Reports
      └─ ReportCard list

NO DEBE EXISTIR EN ABSOLUTO:
- Campaigns tab
- Events tab
- Admin tab
- Trade Offers section
- Join Requests section

====================================================================
USAR SOLO ESTOS COMPONENTES SI YA EXISTEN
====================================================================

KEEP / REUSE:
- MessageCard
- QuestionCard
- ListingActionCard
- ReportCard
- ReplySheet
- ConfirmActionDialog
- ViewStatusDialog
- RejectionReasonsDialog
- Global Action Modal (GAM)
- ModerationChatCard (solo si ya se usa sin generar ruido; si no es necesario, no lo renderices)

KEEP handlers útiles:
- handleQuestionReply
- handleViewListing
- handleContinueDraft
- handleReviewReport
- handleTakeActionOnReport
- handleDismissReport

KEEP mock data útiles:
- mockMessages
- mockQuestions
- mockListingActions
- mockGroupReports

====================================================================
ELIMINAR COMPLETAMENTE DEL NUEVO ARCHIVO
====================================================================

NO importar, no declarar, no renderizar, no contar:

OUT_OF_MVP imports:
- TradeOfferCard
- JoinRequestCard
- CampaignRequestCard
- PlatformReportCard
- FlaggedListingCard
- UserIssueCard
- RequestCard
- createModerationChat
- getModerationChats

OUT_OF_MVP mock data:
- mockTradeOffers
- mockJoinRequests
- mockCampaignOwnerRequests
- mockUserCampaignRequests
- mockEventHubOwnerRequests
- mockUserEventHubRequests
- mockPlatformReports
- mockFlaggedListings
- mockUserIssues

OUT_OF_MVP handlers:
- handleApproveJoinRequest
- handleRejectJoinRequest
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

OUT_OF_MVP UI:
- Campaigns tab
- Events tab
- Admin tab
- Trade Offers quick count
- Trade Offers cards
- Join Requests cards
- Join Requests approve/reject block
- platform moderation blocks inside Action Center

====================================================================
TIPOS Y STATE ESPERADOS
====================================================================

El archivo nuevo debe usar una definición simple como:

type Tab = 'listings' | 'groups';

State mínimo recomendado:
- activeTab
- state de ReplySheet
- state de dialogs que sí sigan usándose
- state de data lists MVP si hace falta

NO dejar state muerto.

Examples:

- const [activeTab, setActiveTab] = useState<Tab>('listings');

Y counts solo MVP:

- listingsCount = messages + questions + listing actions
- groupsCount = group reports
- totalCount = listingsCount + groupsCount

NO incluir:
- campaignsCount
- eventsCount
- adminCount
- tradeOffersCount
- joinRequestsCount

====================================================================
SUBSECTION HEADERS
====================================================================

Dentro de Listings tab, agregar headers simples y claros:

- Chat
- Q&A
- Listing Status

Dentro de Groups tab:

- Group Reports

IMPORTANTE:
- headers simples, sobrios
- sin inventar diseño complejo
- solo para claridad visual MVP
- no crear subsección “Moderation” si no hay contenido real hoy

====================================================================
HEADER / TOP BAR
====================================================================

Mantener:
- back button funcional
- título “Action Center”
- contador general si ya aporta valor y es limpio

No inventar:
- filtros avanzados
- badges premium
- botones extra

====================================================================
ARCHIVO A RECONSTRUIR
====================================================================

FILE:
- /components/ActionCenterPage.tsx

ESTRATEGIA:
- sobrescribir el archivo completo con una versión limpia MVP
- no intentar rescatar bloques corruptos
- no dejar restos del archivo anterior

====================================================================
SAFETY RULES
====================================================================

NO ROMPER:
- apertura desde menú
- back navigation
- onBack prop
- ReplySheet behavior
- MessageCard render
- QuestionCard render
- ListingActionCard render
- ReportCard render
- handlers MVP existentes
- GAM integration existente
- dialogs reutilizados

NO TOCAR SI NO ES NECESARIO:
- otros archivos
- App.tsx
- rutas globales
- componentes future-ready
- módulos externos al Action Center

SOLO modificar ActionCenterPage.tsx
A MENOS que exista un error mínimo de import/export estrictamente necesario para compilar.

====================================================================
VALIDACIÓN OBLIGATORIA
====================================================================

Antes de responder, verificar todo:

1. COMPILE
- TypeScript OK
- no missing imports
- no undefined variables
- no duplicate JSX blocks
- no duplicate ReplySheet
- no broken handlers
- no dead references

2. UI
- solo 2 tabs visibles:
  - Listings
  - Groups

3. LISTINGS TAB
- Chat section visible
- MessageCard list visible
- Q&A section visible
- QuestionCard list visible
- Listing Status section visible
- ListingActionCard list visible
- NO Trade Offers

4. GROUPS TAB
- Group Reports section visible
- ReportCard list visible
- NO Join Requests

5. OUT_OF_MVP
- NO Campaigns tab
- NO Events tab
- NO Admin tab
- NO Trade Offers
- NO Join Requests
- NO platform moderation blocks in Action Center

6. STABILITY
- Action Center opens correctly
- back button works
- tab switching works
- ReplySheet works
- dialogs still work where applicable
- no runtime errors expected

====================================================================
OUTPUT REQUERIDO
====================================================================

Responder SOLO con este formato:

1. FILES MODIFIED
2. FILES LEFT INTACT
3. REBUILT STRUCTURE
4. REMOVED FROM UI
5. REMOVED FROM CODE
6. VALIDATION
   - compile OK / not OK
   - tabs OK
   - listings OK
   - groups OK
   - no OUT_OF_MVP visible
7. ESTADO FINAL

SIN explicación larga.
SIN “recomiendo”.
SIN “faltaría”.
Implementa y reporta.

Si hubo algo que dejaste deferido, dilo SOLO en ESTADO FINAL en una línea breve.
Ejemplo:
- Moderation subsections deferred by design (non-blocking)

====================================================================
FIN
====================================================================