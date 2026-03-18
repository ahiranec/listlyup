====================================================================
LISTLYUP — FIGMA AUDIT PROMPT
SCOPE: PUBLISH FLOW
MODE: MVP CANONICAL MATCH (KEEP vs REMOVE vs CURRENT UI)
====================================================================

CONTEXTO

Este audit NO parte desde cero.

Debe hacer match entre:

1. UI actual en Figma (lo que existe hoy)
2. Definición canónica MVP (KEEP)
3. Exclusiones explícitas MVP (REMOVE / OUT_OF_MVP)

El objetivo es detectar:

- inconsistencias
- elementos que sobran
- elementos que faltan
- elementos que no respetan reglas canónicas

NO proponer features nuevas.
NO reinterpretar el modelo.
NO expandir scope.

Solo comparar contra el canónico.

====================================================================
SOURCE OF TRUTH (OBLIGATORIO)

Este audit debe basarse EXACTAMENTE en la siguiente definición:

====================================================================
PUBLISH FLOW — MVP CANÓNICO (KEEP)
====================================================================

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

====================================================================
PUBLISH FLOW — OUT_OF_MVP (REMOVE)
====================================================================

- private visibility
- capacity en events
- add_to_campaign
- add_to_event_hub
- save_as_draft
- organizations al publicar
- advanced settings

====================================================================
REGLAS GLOBALES RELEVANTES (OBLIGATORIAS)
====================================================================

- Usuario es la entidad principal
- publicación siempre como persona
- organizations NO visibles en UI
- no payments
- no transacciones
- no negociación estructurada
- no revenue tracking
- no rating system
- no analytics avanzados
- no placeholders complejos ni métricas falsas
- Publish Flow debe ser rápido, simple y AI-assisted, pero siempre editable
- el usuario conserva control total sobre campos prellenados por IA
- la capa IA del MVP debe mantenerse simple y no sobre-modelada
- access_mode es el modelo canónico recomendado para pickup / delivery / virtual / presencial
- profile_location es default del usuario
- listing_location es la source of truth final del listing publicado
- visibility_mode debe expresarse como:
  - public
  - groups_only
- un listing puede estar asociado a múltiples grupos
- category y subcategory forman la clasificación estructural
- tags complementan búsqueda y descubrimiento
- tags no deben duplicar la clasificación principal
- UX labels pueden diferir del enum persistido en BD, pero debe existir un mapping único oficial
- el MVP debe minimizar duplicación de lógica y de UI
- el sistema debe mantenerse simple, estable y sin features FUTURE visibles

====================================================================
TAREA DE AUDITORÍA

Debes:

1. Analizar la pantalla / flujo PUBLISH FLOW en Figma
2. Comparar contra:
   - KEEP (lo que debe existir)
   - REMOVE (lo que NO debe existir)
3. Evaluar coherencia con reglas globales
4. Verificar específicamente:
   - estructura de 3 pasos
   - lógica por listing type
   - visibilidad correcta
   - access_mode correcto
   - location flow correcto
   - AI prefill editable
   - ausencia de features FUTURE

====================================================================
OUTPUT REQUERIDO (FORMATO ESTRICTO)

Responder SOLO en este formato:

--------------------------------------------------
1. MATCH OK (ALINEADO CON MVP)
--------------------------------------------------

Lista simple de elementos que cumplen correctamente.

--------------------------------------------------
2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
--------------------------------------------------

- Elemento
- Por qué es requerido (referencia al canónico)

--------------------------------------------------
3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
--------------------------------------------------

- Elemento
- Por qué rompe el MVP (referencia a OUT_OF_MVP)

--------------------------------------------------
4. INCONSISTENCIAS (CRÍTICO)
--------------------------------------------------

- Elemento
- Qué está mal
- Qué regla rompe

Ejemplo:
- visibility selector → incluye private → rompe regla “solo public / groups_only”

--------------------------------------------------
5. RIESGOS DE MODELO (CRÍTICO)
--------------------------------------------------

Detectar problemas estructurales como:

- mezcla de lógica persona vs organización
- mezcla de delivery rígido vs access_mode
- duplicación entre profile location y listing location
- AI no editable / IA controlando flujo
- event mal modelado
- groups_only sin selector correcto
- features FUTURE visibles
- pasos extra o settings avanzados
- draft/save flow
- campaign/event hub leakage

--------------------------------------------------
6. VEREDICTO FINAL
--------------------------------------------------

Estado:

- OK MVP READY
o
- REQUIERE AJUSTES

Resumen en máximo 5 líneas.

====================================================================
REGLAS FINALES

- No inventar features
- No proponer mejoras fuera del MVP
- No rediseñar
- No explicar teoría
- Ser directo, técnico y preciso
- Revisar TODA la implementación actual del Publish Flow antes de entregar el resultado
- Entregar el resultado solo cuando hayas verificado el flujo completo
- El audit debe ser completo, no parcial

====================================================================
NOTA DE SEGURIDAD Y ESTABILIDAD
====================================================================

Este audit prepara una futura implementación.

Por eso debes identificar también cualquier punto que pueda requerir implementación cuidadosa para no romper:

- navegación entre pasos
- type safety
- state management
- conditional rendering por listing type
- integración con profile defaults
- integración con AI prefill
- integración con groups / visibility
- persistencia final del preview/publish

No implementes nada todavía.
Solo audita con precisión para permitir una implementación posterior segura y estable.

====================================================================
FIN DEL PROMPT
====================================================================