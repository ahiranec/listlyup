====================================================================
LISTLYUP — FIGMA AUDIT PROMPT
SCOPE: LISTING DETAIL
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
LISTING DETAIL — MVP CANÓNICO (KEEP)
====================================================================

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

====================================================================
LISTING DETAIL — OUT_OF_MVP (REMOVE)
====================================================================

- Expired status visible en header
- ratings
- seller stats
- organizations visibles
- Call button
- sección de contacto duplicada
- delivery para services y events como sección rígida y separada del modelo general
- Q&A likes / upvotes / ranking
- Recently Viewed
- Trust & Safety section
- analytics o métricas visibles
- AI recommendation blocks

====================================================================
REGLAS GLOBALES RELEVANTES (OBLIGATORIAS)
====================================================================

- Usuario es la entidad principal
- publicación siempre como persona
- organizations NO visibles en UI
- no payments
- no transacciones
- no negociación estructurada
- no rating system
- no revenue tracking
- no analytics avanzados
- no placeholders complejos ni métricas falsas
- Listing Detail prioriza claridad y contacto rápido
- Chat UI es único y puede tener múltiples entry points
- Chat UI reutiliza la misma conversación y la misma lógica
- Home / Map / Filters / Listing Detail usan listing_location
- profile_location NO reemplaza listing_location
- category y subcategory forman clasificación estructural
- tags complementan búsqueda y descubrimiento
- tags no duplican clasificación principal
- access_mode es el modelo canónico recomendado para pickup / delivery / virtual / presencial
- UX labels pueden diferir del enum persistido en BD, pero debe existir un mapping único oficial
- el MVP debe minimizar duplicación de lógica y de UI
- el sistema debe mantenerse simple, estable y sin features FUTURE visibles

====================================================================
TAREA DE AUDITORÍA

Debes:

1. Analizar la pantalla LISTING DETAIL en Figma
2. Comparar contra:
   - KEEP (lo que debe existir)
   - REMOVE (lo que NO debe existir)
3. Evaluar coherencia con reglas globales

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
- sección X → expone ratings → rompe regla “sin ratings / no rating system”

--------------------------------------------------
5. RIESGOS DE MODELO (CRÍTICO)
--------------------------------------------------

Detectar problemas estructurales como:

- duplicación de lógica
- mezcla de contacto vs access_mode
- uso incorrecto de location
- uso incorrecto de tags vs category
- exposición de features FUTURE
- duplicación de Chat UI
- secciones que mezclan discovery, trust, analytics o seller system no MVP

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

====================================================================
FIN DEL PROMPT
====================================================================