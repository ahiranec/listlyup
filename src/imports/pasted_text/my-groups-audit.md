====================================================================
LISTLYUP — FIGMA AUDIT PROMPT
SCOPE: MY GROUPS
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
MY GROUPS — MVP CANÓNICO (KEEP)
====================================================================

Propósito:
- grupos como contenedor de listings
- gobernanza básica
- acceso simple por link
- moderación básica

MAIN LIST incluye:
- group cards
- search bar
- filters
- botón Create Group
- botón Explore Groups

3 DOTS GROUP CARD:
- Share Group
- Invite Members (share link)
- Pin Group
- Mute Group
- Report Group
- Leave Group

CREATE GROUP:
Pantalla única con campos:
- Group Name
- Description
- Location

GROUP TYPE:
- Public
- Private (link access)
- Private (approval) visible pero disabled post MVP

GROUP DETAIL TABS:
- About
- Listings
- Members
- Pending
- Settings

ABOUT:
- Description
- Rules
- Tags
- Invite Members
- Share Group
- Leave Group
- Report Group

LISTINGS:
- list of listings
- card igual a marketplace
- 3 dots:
  - Report
  - Message Owner
  - Hide
  - Remove (si admin/mod)

MEMBERS:
Roles:
- Admin
- Moderator
- Member

Acciones:
- Message user
- Remove member
- Promote to Moderator
- Remove Moderator

PENDING:
- lista de pendientes
- Approve
- Reject

SETTINGS:
- Group Profile:
  - nombre
  - descripción
  - imagen
  - location
- Permissions:
  - Who can post
  - Who can invite
  - Who can moderate
- Group Type & Access
- Moderation:
  - Auto-approve listings ON/OFF
- Danger Zone:
  - Delete group
  - Archive group

REGLAS ADICIONALES DE RELACIÓN LISTINGS ↔ GROUPS:
- un listing puede estar asociado a múltiples grupos
- visibility define dónde puede descubrirse el listing
- listing_groups define en qué grupos vive el listing
- si un listing es public y además está asociado a grupos, puede verse públicamente y también aparecer al filtrar por esos grupos
- si un listing es groups_only, no aparece en discovery público general y solo se muestra dentro de los grupos asociados

====================================================================
MY GROUPS — OUT_OF_MVP (REMOVE)
====================================================================

- Invitations section
- Settings en 3-dots de group card
- wizard multi-step create group
- group types complejos / combinaciones múltiples
- Activity tab
- Demote redundante
- Approved tab en Pending
- Rejected tab en Pending
- Auto-approve members
- invitation system interno
- invitación por email/contactos
- Private (approval) operativo
- lógica social compleja

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
- Groups en MVP son contenedores de listings con gobernanza básica
- Invite Members en Groups = Share Link
- Private (approval) existe como idea visual, pero NO es operativo MVP
- Action Center es el inbox único de acciones
- chat UI es único y puede tener múltiples entry points
- no modales nuevos innecesarios
- no crear flujos paralelos a Action Center
- listing puede pertenecer a múltiples grupos
- visibility y listing_groups deben conversar con el modelo canónico
- listing_location sigue siendo source of truth del listing
- el MVP debe minimizar duplicación de lógica y de UI
- el sistema debe mantenerse simple, estable y sin features FUTURE visibles

====================================================================
TAREA DE AUDITORÍA

Debes:

1. Analizar TODA la implementación actual de MY GROUPS
   - main list
   - group cards
   - create group
   - group detail
   - about
   - listings
   - members
   - pending
   - settings
   - cualquier componente, modal o flow relacionado

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

Ejemplos esperables:
- Invitations section visible → rompe OUT_OF_MVP
- Private approval funcionando realmente → rompe regla canónica
- Activity tab presente → rompe OUT_OF_MVP
- Create Group multi-step → rompe simplificación extrema del MVP
- Auto-approve members visible → rompe OUT_OF_MVP
- Demote redundante visible → rompe simplificación de acciones
- Approved/Rejected tabs visibles dentro de Pending → rompe OUT_OF_MVP

--------------------------------------------------
5. RIESGOS DE MODELO (CRÍTICO)
--------------------------------------------------

Detectar problemas estructurales como:

- Invite Members no funcionando como share link
- private approval operando realmente
- group access / group type mal alineado con MVP
- Settings duplicados fuera de Settings tab
- listings dentro de grupos usando cards distintas al marketplace
- actions de members redundantes o contradictorias
- flows de invitación paralelos
- approvals complejos no-MVP
- lógica social compleja visible
- organizaciones visibles
- features FUTURE visibles
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
- group detail routing
- group cards
- create group flow
- members actions
- pending approvals
- listings inside groups
- marketplace card reuse
- share link behavior
- filter/search behavior
- type safety

D. THINGS TO PRESERVE
Dejar explícito qué NO debe tocarse si no es necesario
para evitar romper shared logic o componentes compartidos.

E. VALIDATION CHECKLIST
Checklist final para confirmar que:
- compile OK
- main list OK
- group cards OK
- create group OK
- single screen create flow OK
- group type behavior OK
- about OK
- listings tab OK
- members tab OK
- pending tab OK
- settings tab OK
- share link OK
- no invitations section
- no activity tab
- no approved/rejected tabs
- no auto-approve members
- no non-MVP complexity
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
- Revisar TODA la implementación actual de My Groups antes de responder
- No dejar absolutamente nada afuera
- El plan de implementación debe ser seguro, completo y estable
- No asumir que algo “se puede borrar” sin antes considerar dependencias y estabilidad

====================================================================
NOTA DE SEGURIDAD Y ESTABILIDAD
====================================================================

Este output debe preparar una futura implementación segura.

Por eso debes identificar también cualquier punto que requiera implementación cuidadosa para no romper:

- navegación
- routing de Group Detail
- group cards
- create group flow
- share link behavior
- settings tab
- permissions tab
- moderation settings
- listing cards reutilizadas
- members actions
- pending actions
- type safety
- component reuse

No implementes nada todavía.
Solo audita con precisión y entrega un plan de implementación seguro y completo.

====================================================================
FIN DEL PROMPT
====================================================================