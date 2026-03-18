====================================================================
LISTLYUP — PUBLISH FLOW — FINAL IMPLEMENTATION PROMPT
MODE: SAFE MVP CLEANUP + FLOW ALIGNMENT
SCOPE: PUBLISH FLOW ONLY
====================================================================

CONTEXTO

Ya se auditó el Publish Flow contra el MVP canónico.
El flujo actual está estable, pero todavía NO está 100% alineado con el MVP.

Tu tarea es implementar SOLO los cambios pendientes, de forma segura, estable e incremental.

ESTO NO ES UN REDISEÑO.
ESTO NO ES UN REFACTOR GRANDE.
ESTO ES UN CLEANUP + REALINEACIÓN CANÓNICA DEL FLUJO.

====================================================================
REGLA PRINCIPAL
====================================================================

Implementa los cambios de manera SEGURA y ESTABLE.

NO debes:

❌ romper navegación entre pasos
❌ romper CREATE mode
❌ romper EDIT mode
❌ romper AI prefill
❌ romper location flow
❌ romper groups flow
❌ romper preview
❌ romper publish
❌ romper type safety
❌ romper state management
❌ hacer refactors innecesarios
❌ tocar cosas fuera de Publish Flow
❌ eliminar lógica compartida si no estás 100% seguro

SÍ debes:

✅ aplicar los cambios pendientes exactos
✅ hacerlo en orden seguro
✅ verificar estabilidad después de cada fase
✅ entregar resultados SOLO al final, cuando todo compile y funcione
✅ priorizar estabilidad sobre limpieza agresiva

====================================================================
OBJETIVO
====================================================================

Dejar el Publish Flow 100% alineado con el MVP canónico en estos puntos pendientes:

1. Remover Event Hubs UI
2. Remover Campaigns UI
3. Limpiar selectedCampaigns / selectedEvents y wiring relacionado
4. Mover event_duration_type (single_day / multi_day) a la primera pantalla del evento
5. Asegurar que la lógica de fechas del evento quede correctamente alineada:
   - single_day → solo start_date
   - multi_day → start_date + end_date

====================================================================
SOURCE OF TRUTH — CAMBIOS OBLIGATORIOS
====================================================================

PUBLISH FLOW MVP CANÓNICO

Step 1 — Setup
Debe incluir:

- upload photo
- listing type:
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

Step 2 — Details
Incluye:
- AI prefill:
  - title
  - description
  - category
  - subcategory
  - tags
- editable por el usuario
- price/pricing_model según tipo
- business_hours opcional para service
- event dates según event_duration_type

Step 3 — Location
- profile location
- GPS
- manual search

Step 4 — Pricing & Contact
- access_mode
- contact methods
- visibility:
  - public
  - groups_only
- group multi-select si aplica

Step 5 — Preview
- preview
- publish
- sin draft visible

OUT_OF_MVP:
- add_to_event_hub
- add_to_campaign
- save_as_draft visible
- private visibility
- capacity en events
- organizations
- advanced settings

====================================================================
FIXES A IMPLEMENTAR (OBLIGATORIOS)
====================================================================

--------------------------------------------------------------------
FIX 1 — REMOVE EVENT HUBS UI
--------------------------------------------------------------------

Archivos esperables:
- /components/publish/PricingStep.tsx
- /components/publish/types.ts
- /components/publish/constants.ts
- cualquier archivo local del Publish Flow donde aparezca esta lógica

ACCIÓN:

Eliminar de la UI y del wiring local del Publish Flow:

- sección "Add to Event Hub"
- mock data ACTIVE_EVENT_HUBS
- handlers relacionados
- open/close state relacionado
- selección local relacionada
- renderizado relacionado
- props relacionadas SOLO si se confirma que son exclusivas del Publish Flow

IMPORTANTE:
- primero eliminar renderizado
- luego eliminar wiring local
- recién al final limpiar tipos/defaults si no se usan
- NO tocar nada fuera del Publish Flow

--------------------------------------------------------------------
FIX 2 — REMOVE CAMPAIGNS UI
--------------------------------------------------------------------

Archivos esperables:
- /components/publish/PricingStep.tsx
- /components/publish/types.ts
- /components/publish/constants.ts
- cualquier archivo local del Publish Flow donde aparezca esta lógica

ACCIÓN:

Eliminar de la UI y del wiring local del Publish Flow:

- sección "Add to Campaigns"
- mock data ACTIVE_CAMPAIGNS
- handlers relacionados
- open/close state relacionado
- selección local relacionada
- renderizado relacionado
- props relacionadas SOLO si se confirma que son exclusivas del Publish Flow

MISMO CRITERIO DE SEGURIDAD:
- primero renderizado
- luego wiring
- luego cleanup local seguro

--------------------------------------------------------------------
FIX 3 — CLEAN selectedCampaigns / selectedEvents
--------------------------------------------------------------------

ACCIÓN:

Limpiar de forma segura SOLO en el contexto del Publish Flow:

- selectedCampaigns
- selectedEvents
- defaults asociados
- props asociadas
- wiring asociado
- serialización asociada
- cualquier paso del flujo que todavía lo pase hacia preview/publish

IMPORTANTE:
- no hacer limpieza global riesgosa
- si algo está compartido y genera duda, desacoplar Publish Flow primero
- solo eliminar definitivamente si se confirma que no rompe compile ni otras referencias locales

OBJETIVO:
Que el Publish Flow ya no dependa en nada de campaigns/events hubs.

--------------------------------------------------------------------
FIX 4 — MOVER event_duration_type A STEP 1
--------------------------------------------------------------------

ESTE FIX ES OBLIGATORIO Y CRÍTICO.

Regla canónica:
Cuando listing_type = event, la primera pantalla debe incluir:

- offer_mode:
  - free
  - paid
- event_duration_type:
  - single_day
  - multi_day

ACCIÓN:

Mover la selección de duración del evento a la primera pantalla/configuración del evento.

Debe quedar claramente visible y seleccionable en el primer paso del evento.

NO dejarlo solo implícito como checkbox tardío en otra página.

REQUISITOS:
- si event = selected type
- el usuario define en Step 1:
  - free / paid
  - single_day / multi_day

IMPORTANTE:
- no rediseñar todo el paso
- solo integrar esta decisión en la primera pantalla de forma limpia y segura
- preservar navegación y state existentes

--------------------------------------------------------------------
FIX 5 — ALINEAR LÓGICA DE FECHAS DEL EVENTO
--------------------------------------------------------------------

Después de mover event_duration_type al Step 1, dejar la lógica siguiente:

- si event_duration_type = single_day
  → mostrar solo start_date
  → NO mostrar end_date

- si event_duration_type = multi_day
  → mostrar start_date
  → mostrar end_date

IMPORTANTE:
- mantener time opcional
- no romper validaciones
- no romper preview
- no romper EDIT mode
- no romper datos ya existentes si estás en edición

====================================================================
INCONSISTENCIAS DE NAMING — CRITERIO
====================================================================

Hay inconsistencias detectadas como:

- service: sale / rent vs for_sale / for_rent
- product: free vs giveaway
- event: hasMultipleDates vs event_duration_type

REGLA PARA ESTA IMPLEMENTACIÓN:

NO hagas una migración agresiva de enums internos si eso puede romper algo.

Haz esto:

- prioriza alinear la UI y el flujo
- prioriza que el comportamiento canónico quede correcto
- solo renombra valores internos si es claramente seguro y no rompe nada
- si hay duda, mantén mapping interno estable y alinea labels/flow

IMPORTANTE:
El punto CRÍTICO aquí NO es renombrar enums.
El punto CRÍTICO aquí es:
- mover la decisión single_day / multi_day al primer paso
- y asegurar que la lógica visual/funcional quede correcta

====================================================================
ORDEN DE IMPLEMENTACIÓN (OBLIGATORIO)
====================================================================

Implementa en este orden:

FASE 1
- Remove Event Hubs UI
- Remove Campaigns UI

FASE 2
- Clean selectedCampaigns / selectedEvents local wiring
- clean defaults asociados
- clean props locales seguras

FASE 3
- Move event_duration_type to Step 1
- align event date rendering logic

FASE 4
- cleanup final seguro
- imports
- props huérfanas
- local dead code
- sin tocar lógica compartida riesgosa

VALIDA estabilidad después de cada fase.

====================================================================
VALIDACIÓN OBLIGATORIA ANTES DE ENTREGAR
====================================================================

NO ENTREGUES RESULTADOS HASTA VERIFICAR TODO ESTO:

--------------------------------------------------
A. COMPILACIÓN
--------------------------------------------------

- no TypeScript errors
- no broken imports
- no broken references
- no invalid props
- no orphan state that breaks compile

--------------------------------------------------
B. CREATE MODE
--------------------------------------------------

Verificar flujo completo:

- media/setup
- basic info/details
- location
- pricing/contact
- preview
- publish

Debe funcionar completo.

--------------------------------------------------
C. EDIT MODE
--------------------------------------------------

Verificar que:

- siga funcionando
- no se rompa el flujo de edición
- save changes siga funcionando
- navigation siga funcionando
- datos existentes de eventos no rompan la UI

--------------------------------------------------
D. EVENT FLOW
--------------------------------------------------

Verificar específicamente:

- al elegir event:
  - Step 1 muestra free/paid
  - Step 1 muestra single_day/multi_day
- si single_day:
  - solo start_date
- si multi_day:
  - start_date + end_date
- preview refleja correctamente el evento

--------------------------------------------------
E. AI PREFILL
--------------------------------------------------

- AI prefill sigue funcionando
- usuario sigue pudiendo editar todo
- no se rompe el flujo AI

--------------------------------------------------
F. LOCATION
--------------------------------------------------

- profile default OK
- GPS OK
- manual search OK

--------------------------------------------------
G. VISIBILITY / GROUPS
--------------------------------------------------

- visibility solo:
  - public
  - groups
- groups multi-select sigue funcionando
- no private
- no campañas
- no event hubs

--------------------------------------------------
H. PUBLISH
--------------------------------------------------

- preview final OK
- publish final OK
- no payloads inconsistentes por remover campaigns/events
- no warnings críticos

====================================================================
FORMATO DE ENTREGA FINAL (OBLIGATORIO)
====================================================================

RESPONDE SOLO CUANDO TODO ESTÉ IMPLEMENTADO, REVISADO Y ESTABLE.

Entrega EXACTAMENTE en este formato:

1. CHANGES APPLIED
- archivos modificados
- qué se removió exactamente
- qué se movió exactamente
- qué wiring local se limpió
- qué se preservó por seguridad

2. STABILITY CHECK
Confirmar explícitamente:
- compile OK
- imports OK
- references OK
- CREATE mode OK
- EDIT mode OK
- event flow OK
- AI prefill OK
- location flow OK
- groups flow OK
- preview OK
- publish OK

3. FINAL PUBLISH FLOW STRUCTURE
- pasos finales visibles
- qué ve product en Step 1
- qué ve service en Step 1
- qué ve event en Step 1
- qué campos de evento quedan en Details

4. REMAINING RISKS
- solo si existe alguno real
- si no hay riesgos, decir:
  - NONE

5. MVP COMPLIANCE STATUS
Elegir solo una:
- ✅ 100% MVP COMPLIANT
o
- ❌ STILL REQUIRES FIXES

====================================================================
RESTRICCIÓN FINAL
====================================================================

NO ENTREGAR RESULTADOS PARCIALES.
NO ENTREGAR RESUMEN ANTES DE VALIDAR TODO.
NO CORTAR POR ESPACIO.
PRIMERO IMPLEMENTAR.
LUEGO CHEQUEAR.
LUEGO ENTREGAR.

TODO debe quedar estable y seguro.

====================================================================
END PROMPT
====================================================================