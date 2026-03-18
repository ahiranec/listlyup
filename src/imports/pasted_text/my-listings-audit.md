====================================================================
LISTLYUP — FIGMA AUDIT PROMPT
SCOPE: MY LISTINGS
MODE: MVP CANONICAL MATCH + SAFE IMPLEMENTATION PLAN
====================================================================

CONTEXTO

Este audit NO parte desde cero.

Debe hacer match entre:

1. UI actual en Figma / código actual
2. Definición canónica MVP (KEEP)
3. Exclusiones explícitas MVP (REMOVE / OUT_OF_MVP)

El objetivo es detectar:

- inconsistencias
- elementos que sobran
- elementos que faltan
- elementos que no respetan reglas canónicas
- riesgos de implementación
- plan de implementación seguro y estable

NO proponer features nuevas.
NO reinterpretar el modelo.
NO expandir scope.

Solo comparar contra el canónico y luego proponer un plan seguro para implementar exactamente lo faltante o incorrecto.

====================================================================
SOURCE OF TRUTH (OBLIGATORIO)

Este audit debe basarse EXACTAMENTE en la siguiente definición:

====================================================================
MY LISTINGS — MVP CANÓNICO (KEEP)
====================================================================

Propósito:
- gestión simple de listings del usuario
- no analytics compleja
- no lógica transaccional

List View (cards) incluye:
- Image
- Title
- Price
- Location
- Status badge:
  - Active
  - Paused
  - Expiring Soon
  - Expired
- Visibility badge:
  - Public
  - Groups
- Listing Type:
  - Product / Service / Event
- solo 1 métrica:
  - Views

3-dots menu incluye:
- Chat
- Review
- Edit
- Share
- Pause / Activate
- Renew
- Mark as Sold (solo product)
- Delete

Listing Detail (Owner Mode):
- misma página que public Listing Detail
- no duplicar pantalla
- no modificar contenido base

Cambios owner mode:
- badge “Your Listing” en vez de Report
- footer horizontal scroll con acciones:
  1. Mark as Sold (solo product)
  2. Review (si reported)
  3. Chat (si messages exist)
  4. Edit
  5. Pause
  6. Stats
  7. Delete

Reglas:
- Chat usa mismo modal / misma UI / misma lógica que Action Center
- Review usa mismo modal que Action Center
- no lógica duplicada
- Mark as Sold mueve a My Trail
- no transaction logic
- no buyer assignment
- Chat UI es único; múltiples entry points son válidos, pero todos reutilizan la misma conversación y la misma lógica

Stats de My Listings incluyen solo:
- Views
- Messages
- Favorites
- Shares

Regla de métricas:
- My Listings Stats corresponde a métricas por listing individual
- Statistics corresponde a métricas agregadas del usuario
- por eso no tienen que ser idénticas
- Messages aplica a listing individual
- Active Listings aplica al nivel agregado del usuario

Filters page incluye:

Status:
- Active
- Paused
- Expiring Soon
- Expired

Alerts:
- Has Messages
- Reported
- Expiring Soon

Listing Type:
- Product
- Service
- Event

Visibility:
- Public
- Groups Only

Si Groups Only:
- selector My Groups multi-select

Search:
- “Search my listings”

====================================================================
MY LISTINGS — OUT_OF_MVP (REMOVE)
====================================================================

- múltiples métricas en cards
- likes count en cards
- messages count en cards
- pantalla owner mode duplicada
- chat UI dentro del contenido owner detail
- review flow duplicado
- transaction logic al marcar vendido
- buyer assignment
- Impressions
- Click Rate
- Draft status en filtros
- Pending status en filtros
- Removed/Banned/Reserved/Archived statuses en filtros
- Experience listing type
- Hidden/private/unlisted visibility filters
- extras section
- advanced filters
- organizations

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
- My Listings es una vista de gestión, no de analytics avanzada
- Listing Detail base NO debe duplicarse para owner mode
- Chat UI es único y puede tener múltiples entry points
- Chat UI reutiliza la misma conversación y la misma lógica
- Review debe reutilizar el mismo modal / flujo que Action Center
- Mark as Sold NO debe crear transacción ni buyer assignment
- Statistics y My Listings Stats operan en niveles distintos:
  - Statistics = agregado de usuario
  - My Listings Stats = agregado por listing
- visibility en My Listings debe ser coherente con:
  - public
  - groups_only
- listing puede estar asociado a múltiples groups
- Home solo muestra listings activos, pero My Listings sí puede mostrar múltiples estados del ciclo de vida
- listing_location es la source of truth del listing
- el MVP debe minimizar duplicación de lógica y de UI
- el sistema debe mantenerse simple, estable y sin features FUTURE visibles

====================================================================
TAREA DE AUDITORÍA

Debes:

1. Analizar TODA la implementación actual de MY LISTINGS
   - list view
   - owner mode / owner detail
   - stats
   - filters
   - search
   - 3-dots menu
   - cualquier componente o modal relacionado

2. Comparar contra:
   - KEEP (lo que debe existir)
   - REMOVE (lo que NO debe existir)
   - reglas globales

3. Detectar absolutamente todo lo que:
   - falta
   - sobra
   - está mal
   - duplica lógica
   - rompe el modelo canónico
   - podría romper estabilidad al implementarse

4. Luego entregar un PLAN DE IMPLEMENTACIÓN SEGURO Y COMPLETO,
sin dejar nada afuera.

====================================================================
OUTPUT REQUERIDO (FORMATO ESTRICTO)
====================================================================

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
- cards muestran likes/messages/views al mismo tiempo → rompe regla “solo 1 métrica: Views”

--------------------------------------------------
5. RIESGOS DE MODELO (CRÍTICO)
--------------------------------------------------

Detectar problemas estructurales como:

- owner mode duplicado vs Listing Detail base
- chat duplicado dentro del contenido
- review flow separado de Action Center
- stats de listing mezcladas con analytics agregadas
- filtros de gestión con estados no-MVP
- visibility mal alineada
- listing type no permitido
- transaction logic oculta en Mark as Sold
- features FUTURE visibles
- organizaciones visibles
- props/handlers/types que sugieren lógica más compleja que la permitida

--------------------------------------------------
6. SAFE IMPLEMENTATION PLAN (OBLIGATORIO)
--------------------------------------------------

Entregar un plan completo, detallado y seguro para implementar TODO lo necesario.

Debe incluir:

A. ORDEN DE IMPLEMENTACIÓN
- qué arreglar primero
- qué arreglar después
- orden pensado para no romper nada

B. FIXES EXACTOS
- archivo por archivo
- componente por componente
- qué remover
- qué renombrar
- qué mantener
- qué mover
- qué props/types/handlers limpiar

C. SAFETY RULES
Explicar cómo implementar sin romper:
- navigation
- owner mode
- shared Listing Detail page
- Action Center integrations
- chat modal
- review modal
- filter state
- list rendering
- stats rendering
- type safety

D. THINGS TO PRESERVE
Dejar explícito qué NO debe tocarse si no es necesario
para evitar romper shared logic o componentes compartidos.

E. VALIDATION CHECKLIST
Checklist final para confirmar que:
- compile OK
- list view OK
- owner mode OK
- no duplicated chat UI
- no duplicated review flow
- mark as sold OK
- stats OK
- filters OK
- search OK
- no non-MVP statuses/filters visible
- no organizations
- no transaction logic
- no regressions

--------------------------------------------------
7. VEREDICTO FINAL
--------------------------------------------------

Estado:

- OK MVP READY
o
- REQUIERE AJUSTES

Resumen en máximo 5 líneas.

====================================================================
REGLAS FINALES
====================================================================

- No inventar features
- No proponer mejoras fuera del MVP
- No rediseñar
- No explicar teoría
- Ser directo, técnico y preciso
- Revisar TODA la implementación actual de My Listings antes de responder
- No dejar absolutamente nada afuera
- El plan de implementación debe ser seguro, completo y estable
- No asumir que algo “se puede borrar” sin antes considerar dependencias y estabilidad

====================================================================
NOTA DE SEGURIDAD Y ESTABILIDAD
====================================================================

Este output debe preparar una futura implementación segura.

Por eso debes identificar también cualquier punto que requiera implementación cuidadosa para no romper:

- navegación
- shared Listing Detail page
- owner mode
- shared chat modal
- Action Center integration
- Mark as Sold behavior
- stats vs metrics separation
- filter state
- type safety
- component reuse

No implementes nada todavía.
Solo audita con precisión y entrega un plan de implementación seguro y completo.

====================================================================
FIN DEL PROMPT
====================================================================