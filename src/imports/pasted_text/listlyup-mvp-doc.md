====================================================================
LISTLYUP — DOCUMENTO MAESTRO CANÓNICO MVP FINAL vs FUTURE READY vs IMPLICANCIAS BD
VERSIÓN: MASTER CANONICAL DOC v2
FUENTE: BLOQUES “MVP FINAL LOCK / CHANGE SET FINAL” PEGADOS EN ESTE CHAT + AJUSTES DE COHERENCIA ACORDADOS EN ESTE CHAT
ESTADO: CONSOLIDADO
====================================================================

ALCANCE DE ESTA CONSOLIDACIÓN

Este documento consolida EXCLUSIVAMENTE lo definido en los bloques pegados en este chat para:

- Home
- Listing Detail
- Publish Flow
- My Listings
- My Groups
- Favorites
- Statistics
- My Profile
- Settings
- Action Center
- SuperAdmin Dashboard

Además, esta versión v2 incorpora explícitamente los ajustes de coherencia acordados en este mismo chat sobre:

- métricas por nivel (usuario vs listing)
- Chat UI único con múltiples entry points
- modelo canónico de location
- visibilidad y relación con grupos
- clasificación category / subcategory / tags
- unificación de Activity History con el mismo event log del sistema
- simplificación de la capa IA en MVP
- relación entre feature flags globales y user settings
- distinción conceptual entre discoverable y accessible
- ajuste conceptual de delivery_methods hacia un modelo más amplio de access_mode
- nota arquitectónica sobre event como listing type hoy y posible entidad contenedora futura

Si otro módulo no aparece aquí, es porque no fue incluido en el material fuente pegado en este chat.

====================================================================
1. ESTRUCTURA MVP FINAL (CANÓNICA)
====================================================================

--------------------------------------------------------------------
1.1 CONCEPTO GENERAL DEL MVP
--------------------------------------------------------------------

ListlyUp MVP es un marketplace tipo vitrina para:

- products
- services
- events

Los usuarios:

- publican listings
- descubren listings
- guardan listings
- se contactan
- interactúan por chat y Q&A
- participan en grupos
- gestionan acciones desde Action Center

La plataforma en MVP:

- NO controla pagos
- NO controla transacciones
- NO controla ofertas estructuradas
- NO controla negociación estructurada
- NO tiene revenue tracking
- NO tiene rating system
- NO tiene organizaciones visibles en UI
- NO tiene analytics avanzados
- NO tiene notificaciones complejas fuera de Action Center

Principio general:

- UI simple
- flows rápidos
- sin duplicación
- sin lógica paralela
- preparada para escalar en BD a futuro

--------------------------------------------------------------------
1.2 PANTALLAS / MÓDULOS MVP ACTIVOS
--------------------------------------------------------------------

1. Home
2. Listing Detail
3. Publish Flow
4. My Listings
5. My Groups
6. Favorites
7. Statistics
8. My Profile
9. Settings
10. Action Center
11. SuperAdmin Dashboard

--------------------------------------------------------------------
1.3 HOME — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:

- descubrimiento de listings
- navegación en list view y map view
- aplicación de filtros unificados

Incluye:

- List View
- Map View
- filtros globales compartidos entre List y Map

Filtros activos:

- listing_type
- offer_mode
- groups
- location
- condition
- sort
- tags / hashtags
- user (renombrado desde seller)
- contact_methods:
  - chat
  - whatsapp
- access_mode:
  - pickup
  - meetup
  - delivery
  - virtual
- price range

Reglas:

- Home solo expone listings activos
- List View y Map View usan el mismo dataset
- List View y Map View usan los mismos filtros
- no organizaciones en lógica visible
- no analytics
- no bloques IA de descubrimiento
- no campañas/eventos visibles en Home
- el filtro de estado no se expone en Home porque Home es discovery público, no gestión

List View incluye:

- listing cards
- favorite button (heart)
- badges de:
  - type
  - condition / pricing / event info

Map View incluye:

- bottom carousel obligatorio
- interacción pin ↔ card
- un solo listing activo a la vez
- pins con estados visuales
- tooltip para private group listing no visible

Reglas adicionales de mapa y permisos:

- discoverability y accessibility son conceptos distintos
- Home/List/Map operan con lógica de discovery
- accessibility depende además de permisos del usuario sobre el listing o grupo

--------------------------------------------------------------------
1.4 LISTING DETAIL — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:

- ayudar a decidir rápido
- facilitar contacto
- mostrar contenido simple y claro

Incluye:

- location
- category breadcrumb
- tags / hashtags
- username del usuario
- contact actions:
  - Chat
  - WhatsApp (si owner lo habilitó)
- access / delivery info solo cuando sea relevante según tipo de listing
- simple text description
- Q&A simple:
  - question
  - answer
  - timestamp opcional
- related content:
  - Similar Listings
  - More from this user

Reglas:

- sin ratings
- sin seller stats
- sin organizaciones
- sin analytics
- sin métricas visibles
- sin recommendation engine complejo
- sin Trust & Safety section
- sin Recently Viewed
- contacto solo por métodos elegidos por el owner

Aclaración sobre access / delivery:

- no se fuerza un modelo exclusivamente físico
- un producto puede ser físico o virtual
- un servicio puede ser virtual, presencial o mixto
- un evento puede ser virtual o location-based
- el modelo canónico recomendado es access_mode, no una lectura restringida de delivery físico

--------------------------------------------------------------------
1.5 PUBLISH FLOW — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:

- crear listing rápido
- asistido por IA pero controlado por el usuario
- publicar en menos de 30 segundos idealmente

Estructura:

- Step 1 — Setup
- Step 2 — Details
- Step 3 — Preview

Step 1 incluye:

- upload photo
- select listing type:
  - product
  - service
  - event

Product:

- offer_mode:
  - sell
  - trade
  - giveaway
  - sell_or_trade
- condition:
  - new
  - like_new
  - good
  - fair

Service:

- offer_mode:
  - for_sale
  - for_rent

Event:

- offer_mode:
  - free
  - paid
- event_duration_type:
  - single_day
  - multi_day

Step 2 incluye:

AI prefill mediante ai_publish_assistant:

- title
- description
- category
- subcategory
- tags

El usuario siempre puede editar todo.

Product:

- price

Service:

- pricing_model:
  - fixed
  - quote
  - hourly
  - daily
  - monthly
- price
- business_hours opcional

Event:

- price si paid
- start_date
- end_date solo si multi_day
- time opcional en texto libre

Location:

- profile location
- current (GPS)
- search manually

Visibility:

- public
- groups_only

Si visibility = groups_only:

- group multi-select

Contact methods:

- in_app_chat
- whatsapp

Access Mode:

- pickup
- meetup
- delivery
- virtual

Preview:

- preview screen
- publish action only

Reglas:

- no draft
- no campaigns
- no event hub
- no organizations
- IA asiste pero no controla
- no advanced settings
- access_mode es el concepto canónico recomendado para unificar:
  - productos físicos
  - productos virtuales/digitales
  - servicios
  - eventos
- el usuario puede usar profile location como default, pero el listing persiste su propia ubicación final
- una vez publicado, listing_location pasa a ser la source of truth del listing

Regla específica de IA en MVP:

- IA en publish flow es una capa asistiva simple
- no requiere persistencia compleja obligatoria
- basta con metadata mínima cuando sea útil operativamente
- el usuario mantiene control total sobre todos los campos prellenados

--------------------------------------------------------------------
(continúa exactamente igual…)