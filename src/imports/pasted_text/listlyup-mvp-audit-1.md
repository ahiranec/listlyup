====================================================================
LISTLYUP — ACTION CENTER — MVP AUDIT PROMPT
BASED ON: MASTER CANONICAL DOC v2
MODE: FULL AUDIT + SAFE IMPLEMENTATION PLAN
OUTPUT: SHORT, STRUCTURED, IMPLEMENTATION-READY
====================================================================

TOMA COMO FUENTE DE VERDAD EXCLUSIVAMENTE ESTE MARCO CANÓNICO MVP:

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
1.12 ACTION CENTER — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:

- inbox único de acciones
- reemplaza Notifications y Messages como pantallas separadas

Tabs finales:

1. Listings
2. Groups

Listings reúne:

1. Chat
2. Q&A
3. Moderation
4. Listing Status

Listings → Chat:

- reutiliza UI de Messages

Listings → Q&A:

- reutiliza UI de Questions

Listings → Moderation:

- reutiliza:
  - Report Listing modal
  - Take Action modal
  - chat existente

Listings → Listing Status:

- Edit
- Pause
- Reactivate
- Expiring / Expired

Groups reúne:

1. Group Reports
2. Group Moderation

Groups → Group Reports:

- reportes de grupos
- reportes de listings dentro del grupo

Groups → Group Moderation:

- chat existente
- Take Action modal
- acciones:
  - remove listing
  - warn user
  - remove member

Urgent Actions header:

- Chat
- Q&A
- Moderation
- Listing Status

Reglas:

- origen define dónde vive la acción
- listing-origin → Listings
- group-origin → Groups
- no duplicación
- no modales nuevos
- Notifications vive dentro de Action Center
- SuperAdmin no forma parte de Action Center

Regla canónica de eventos:

- Action Center y Activity History deben derivar de la misma fuente de eventos del sistema
- Action Center muestra eventos accionables / operativos
- Activity History muestra una vista resumida o derivada de esos mismos eventos y señales relacionadas

====================================================================
2. EXCLUSIONES MVP (MUY IMPORTANTE)
====================================================================

--------------------------------------------------------------------
2.10 ACTION CENTER — OUT_OF_MVP
--------------------------------------------------------------------

- Feature: pantalla Notifications separada
  Estado: OUT_OF_MVP
  Razón: Action Center la reemplaza

- Feature: pantalla Messages separada
  Estado: OUT_OF_MVP
  Razón: Action Center la reemplaza

- Feature: Campaigns tab
  Estado: OUT_OF_MVP
  Razón: eliminado del Action Center

- Feature: Events tab
  Estado: OUT_OF_MVP
  Razón: eliminado del Action Center

- Feature: Admin tab dentro de Action Center
  Estado: OUT_OF_MVP
  Razón: vive en SuperAdmin Dashboard

- Feature: Trade Offers
  Estado: OUT_OF_MVP
  Razón: explícitamente eliminado

- Feature: Join Requests
  Estado: OUT_OF_MVP
  Razón: explícitamente eliminado

- Feature: modales nuevos
  Estado: OUT_OF_MVP
  Razón: reutilización estricta

- Feature: flows nuevos
  Estado: OUT_OF_MVP
  Razón: reorganización, no expansión

====================================================================
5. PRINCIPIOS CANÓNICOS DEL SISTEMA
====================================================================

5. Action Center es el inbox único de acciones.
6. Notifications y Messages como pantallas separadas no existen en MVP.
7. Notifications viven dentro de Action Center.
12. No se crean modales nuevos en Action Center ni SuperAdmin.
13. Se reutilizan report modals, chat UI, Q&A UI y Take Action modal.
14. SuperAdmin Dashboard no reemplaza Action Center.
15. Action Center = operación contextual.
39. El MVP debe minimizar duplicación de lógica y de UI.
41. Chat UI es único y puede tener múltiples entry points, pero todos reutilizan la misma conversación y la misma lógica.
43. Activity History y Action Center deben derivar de la misma fuente de eventos del sistema.

====================================================================
OBJETIVO
====================================================================

Quiero una AUDITORÍA COMPLETA del módulo Action Center contra el MVP canónico.

Necesito que:

1. revises qué sí está alineado
2. detectes todo lo que sobra
3. detectes todo lo que falta
4. detectes inconsistencias críticas
5. detectes riesgos de duplicación con:
   - Messages
   - Notifications
   - My Listings
   - My Groups
   - Statistics / Activity History
6. entregues un plan de implementación seguro, quirúrgico y sin romper nada

====================================================================
FORMATO OBLIGATORIO DE RESPUESTA
====================================================================

Responder EXACTAMENTE con esta estructura:

1. MATCH OK (ALINEADO CON MVP)
- lista concreta de elementos que sí cumplen

2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
- solo faltantes reales

3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
- listar cada elemento
- indicar archivo/componente si se puede
- explicar por qué rompe el MVP

4. INCONSISTENCIAS (CRÍTICO)
- contradicciones con el canónico
- mezclas de responsabilidades
- duplicaciones
- tabs o acciones mal ubicadas

5. RIESGOS DE MODELO (CRÍTICO)
- duplicación de chat
- duplicación de notificaciones
- sistemas paralelos de eventos
- modales redundantes
- tabs paralelos
- estados que no deberían existir en MVP

6. SAFE IMPLEMENTATION PLAN
- por fases
- quirúrgico
- sin romper navegación
- sin romper shared chat UI
- sin romper report modal
- sin romper take action modal
- sin crear modales nuevos
- sin eliminar tipos backend/future si solo están internos y no visibles

7. FIXES EXACTOS
- archivo por archivo
- qué eliminar
- qué mantener
- qué mover
- qué route/tab dejar
- qué tabs quitar
- qué entry points reutilizar

8. VALIDATION CHECKLIST
- compile OK
- navegación OK
- chat OK
- Q&A OK
- moderation OK
- listing status OK
- groups OK
- no Notifications page separada
- no Messages page separada
- no tabs OUT_OF_MVP
- no modales nuevos
- no lógica paralela

9. VEREDICTO FINAL
- % estimado de cumplimiento MVP
- bloqueadores críticos
- prioridad de fixes
- si queda listo para implementar o no

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO implementar todavía si no estás 100% seguro.
Primero audita.

NO inventes features.
NO asumas que algo está bien si no lo verificaste.
NO mezcles FUTURE READY con MVP visible.
NO propongas rediseños grandes si basta cleanup.
NO rompas componentes compartidos.
NO cambies backend/modelos FUTURE si no están visibles en UI.

====================================================================
EXTRA IMPORTANTE
====================================================================

Si detectas algo que está interno en código pero NO se expone en UI, NO lo marques como violación fuerte.
Márcalo solo como “riesgo” o “deuda técnica”, no como bloqueo visual.

Prioriza SIEMPRE:

- lo visible en UI
- lo accesible por navegación
- lo que contradice el canónico
- lo que duplica otros módulos

====================================================================
FIN
====================================================================