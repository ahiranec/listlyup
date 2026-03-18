====================================================================
LISTLYUP — AUDIT PROMPT
MODULE: STATISTICS
MODE: MVP CANONICAL AUDIT + SAFE IMPLEMENTATION PLAN
====================================================================

TOMA COMO SOURCE OF TRUTH ÚNICA el siguiente criterio canónico MVP para STATISTICS:

- Propósito:
  - feedback básico del usuario
  - no dashboard avanzado

- Secciones MVP:
  1. Quick Stats (Last 7d)
  2. Activity History
  3. Performance Tips
  4. Advanced Analytics (coming soon)

- Quick Stats incluye SOLO:
  - Active Listings
  - Views
  - Favorites
  - Shares

- Regla crítica de nivel métrico:
  - Statistics trabaja a nivel agregado del usuario
  - NO debe confundirse con métricas por listing individual de My Listings Stats

- Activity History:
  - eventos recientes simples
  - cronológico
  - sin gráficos
  - sin filtros complejos

- Regla canónica de eventos:
  - Activity History NO es un sistema separado de notificaciones
  - debe derivar del mismo event log o capa de actividad que alimenta Action Center
  - NO se deben crear dos sistemas paralelos de eventos

- Performance Tips:
  - tips simples
  - estáticos o por reglas básicas

- Advanced Analytics:
  - solo bloque “coming soon”
  - sin métricas falsas
  - sin paywall

OUT_OF_MVP EXPLÍCITO PARA STATISTICS:
- rating
- ventas
- revenue
- conversion
- advanced engagement
- sección Performance
- sección Sales & Revenue
- sección Engagement
- sección Reputation
- gráficos
- dashboards avanzados
- paywall en analytics

REGLAS GLOBALES RELACIONADAS:
- NO hay rating system en MVP
- NO hay revenue tracking en MVP
- NO hay analytics avanzados en MVP
- NO mostrar placeholders complejos ni métricas falsas
- Statistics y My Listings Stats operan en niveles distintos:
  - Statistics = agregado de usuario
  - My Listings Stats = agregado por listing
- Activity History y Action Center deben derivar de la misma fuente de eventos del sistema

====================================================================
OBJETIVO DE ESTA AUDITORÍA
====================================================================

Quiero que audites el módulo/página STATISTICS del código actual y lo compares CONTRA el canónico MVP.

Tu trabajo NO es improvisar producto nuevo.
Tu trabajo es:

1. detectar qué está OK
2. detectar qué falta
3. detectar qué sobra
4. detectar inconsistencias críticas
5. detectar riesgos de modelo o de UX
6. proponer un plan de implementación SEGURO y ESTABLE
7. NO dejar absolutamente nada afuera

====================================================================
INSTRUCCIONES DE AUDITORÍA
====================================================================

Revisa TODO lo relacionado con Statistics, incluyendo si aplica:

- page principal de Statistics
- subcomponentes/cards/sections
- mock data
- types
- hooks
- event/history data source
- labels/copy
- charts/graphs
- premium/paywall blocks
- ratings/reputation/sales/revenue/conversion widgets
- cualquier cosa conectada con stats o analytics

Haz match exacto entre:

A) lo que el canónico MVP exige
B) lo que el código actual muestra
C) lo que está explícitamente fuera del MVP

====================================================================
FORMATO DE RESPUESTA OBLIGATORIO
====================================================================

Responder EXACTAMENTE en esta estructura:

1. MATCH OK (ALINEADO CON MVP)
- listar todo lo que sí cumple

2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
- listar solo faltantes reales

3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
- listar todo lo OUT_OF_MVP visible o implementado
- citar archivo/componente cuando sea posible

4. INCONSISTENCIAS (CRÍTICO)
- diferencias entre la implementación y el canónico
- especialmente:
  - métricas incorrectas
  - mezcla de métricas agregadas vs por listing
  - Activity History separado del event log
  - gráficos o dashboards que no corresponden
  - paywalls/placeholders falsos
  - ratings / sales / revenue / conversion / reputation

5. RIESGOS DE MODELO (CRÍTICO)
- riesgos de arquitectura
- riesgos de UX
- riesgos de duplicación con Action Center
- riesgos por usar datos falsos o estructuras FUTURE en UI MVP

6. SAFE IMPLEMENTATION PLAN
- plan por fases
- orden recomendado
- qué tocar
- qué NO tocar
- cómo implementar sin romper nada

7. FIXES EXACTOS
- archivo por archivo
- cambio por cambio
- quirúrgico
- sin rediseñar todo

8. VALIDATION CHECKLIST
- checklist final de validación funcional y técnica

9. VEREDICTO FINAL
- % estimado de compliance MVP
- si está listo o no
- qué bloquea el cierre

====================================================================
REGLAS DE CALIDAD
====================================================================

- NO inventes componentes si no existen
- NO digas “está bien” sin verificarlo
- NO omitas elementos pequeños
- NO mezcles My Listings Stats con Statistics
- SI hay charts, gráficas, reputación, revenue, rating, conversion, engagement avanzado o paywall:
  → márcalos explícitamente como OUT_OF_MVP
- SI Activity History no está claramente conectada al mismo event log/capa de eventos que Action Center:
  → márcalo como inconsistencia crítica
- SI hay secciones llamadas:
  - Performance
  - Sales & Revenue
  - Engagement
  - Reputation
  → marcarlas como OUT_OF_MVP
- SI Quick Stats tiene métricas extra:
  → marcarlas
- SI faltan cualquiera de estas 4 métricas en Quick Stats:
  - Active Listings
  - Views
  - Favorites
  - Shares
  → marcar faltante
- SI Advanced Analytics muestra números inventados o módulos simulados engañosos:
  → marcarlo como violación

====================================================================
REGLAS DE SEGURIDAD PARA EL PLAN
====================================================================

Tu plan debe priorizar:

- estabilidad
- no romper navegación
- no romper hooks
- no romper imports
- no romper tipos compartidos
- no romper Action Center
- no crear sistemas paralelos de eventos
- no tocar otros módulos salvo que sea estrictamente necesario

Distingue claramente:

- SAFE TO MODIFY
- DO NOT TOUCH
- FILES TO REVIEW WITH EXTRA CARE

====================================================================
IMPORTANTE
====================================================================

No hagas todavía la implementación.
Primero entrega SOLO la auditoría completa + plan seguro.

Quiero máxima exhaustividad.
No dejes nada afuera.

====================================================================
FIN
====================================================================