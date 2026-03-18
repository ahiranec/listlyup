LISTLYUP — AUDITORÍA MAESTRA DE CONTRATOS CANÓNICOS DE DATOS
FASE: PRE-ARQUITECTURA / PRE-SUPABASE / PRE-REFACTOR
OBJETIVO: DEFINIR LA CAPA DE CONTRACTS QUE ALINEE UI + MOCKS + PROPUESTA BD + GAM

ROL
Actúa como:
- Senior System Architect
- Lead Data Contract Auditor
- Lead Domain Model Designer
- Lead UI-to-Data Alignment Architect
- Lead GAM-to-Data Alignment Auditor

REGLAS CRÍTICAS
- NO implementar nada
- NO modificar archivos
- NO refactorizar código
- NO proponer cambios visuales de UI
- NO asumir que la UI actual manda
- NO asumir que la propuesta de base de datos manda
- NO asumir que el GAM manda por sí solo
- NO rediseñar producto ni reabrir el MVP
- NO inventar features nuevas
- NO dar soluciones de carpetas todavía
- NO pasar a repos, hooks ni Supabase real todavía

TU TRABAJO ES SOLO:
OBSERVAR → COMPARAR → NORMALIZAR CONCEPTUALMENTE → PROPONER CONTRACTS CANÓNICOS

CONTEXTO
ListlyUp ya pasó por:
- cleanup de barrels
- aislamiento de legacy
- cleanup masivo de documentación histórica
- auditoría maestra del sistema real

Ya sabemos que hoy el sistema tiene:
- UI funcional, pero con acoplamientos
- mocks como fuente real de datos
- shapes inconsistentes entre entidades
- lógica mezclada entre páginas, hooks y componentes
- propuesta de base de datos pensada, pero NO definitiva
- GAM / sistema de acciones relevante, pero no alineado formalmente aún a una capa de contracts

PROPÓSITO DE ESTA AUDITORÍA
Definir la VERDAD INTERMEDIA del sistema.

Esa verdad intermedia NO es:
- ni la UI actual
- ni los mocks actuales
- ni la propuesta de base de datos
- ni el GAM por separado

Esa verdad intermedia ES:
- el CONTRACT CANÓNICO por entidad

Ese contract debe:
- unificar shapes
- reducir inconsistencias
- servir de puente entre UI y backend futuro
- permitir que el GAM use campos estables
- permitir mapping mock → contract → future DB
- permitir arquitectura limpia después

INPUTS QUE DEBES CONSIDERAR
Debes considerar simultáneamente:

1. UI actual
- props que hoy consumen las páginas y componentes
- datos que hoy se muestran o requieren en flows reales

2. Mocks actuales
- shapes reales en /data/
- inline data detectada
- duplicaciones y variaciones

3. Propuesta de base de datos
- usarla como referencia de persistencia potencial
- NO como restricción fija
- NO como verdad obligatoria

4. GAM / sistema de acciones
- acciones que dependen de ciertas entidades
- campos que requieren estados, ownership, visibilidad, identidad, timestamps, etc.
- necesidades operativas del sistema de acciones

ALCANCE
Debes trabajar SOLO sobre estas entidades núcleo:

1. Listing
2. User
3. Group
4. Conversation
5. Message
6. Notification

Si detectas que Conversation y Message deben tratarse juntos pero con contratos distintos, hazlo.
Si detectas que Listing necesita subtipado interno (product/service/event), indícalo dentro del mismo contract canónico sin rediseñar el producto.

TAREA DETALLADA

PARA CADA ENTIDAD debes entregar exactamente estas secciones:

==================================================
ENTITY: [NOMBRE]
==================================================

1. PURPOSE IN THE SYSTEM
Explica brevemente:
- para qué existe esta entidad
- en qué flows aparece
- por qué es nuclear para ListlyUp

2. CURRENT UI USAGE
Describe:
- dónde se usa hoy en la UI
- qué páginas/componentes la consumen
- qué campos parecen requerirse visual o funcionalmente

3. CURRENT MOCK SHAPES DETECTED
Describe:
- qué shapes diferentes existen hoy para esta entidad
- en qué archivos aparecen
- qué diferencias tienen entre sí
- si hay duplicaciones o fragmentación

4. PROPOSED CANONICAL CONTRACT
Define el contract ideal y canónico de la entidad.

Formato esperado:
- type/interface conceptual
- nombres consistentes
- estructura normalizada
- opcionales vs requeridos
- ids, ownership, status, timestamps, metadata si aplica

IMPORTANTE:
- no lo bases ciegamente en la UI
- no lo bases ciegamente en la propuesta BD
- haz un contract limpio, estable y realista

5. WHY THIS CONTRACT IS THE RIGHT CANONICAL SHAPE
Explica:
- por qué este shape es mejor que el actual
- qué inconsistencias resuelve
- por qué sirve como capa intermedia

6. MAIN INCONSISTENCIES AGAINST CURRENT REALITY
Lista:
- diferencias entre mocks/UI actuales y el contract propuesto
- naming inconsistente
- campos faltantes o sobrantes
- anidaciones raras
- fields ambiguos
- conflictos de shape

7. DB FIT ANALYSIS
Analiza cómo este contract se relacionaría con la propuesta de base de datos.

Debes responder:
- qué partes del contract calzan bien con una tabla relacional futura
- qué partes requerirían adaptación
- qué campos parecen persistibles tal cual
- qué campos parecen más bien view-model / computados / derivados
- qué partes NO deberían forzar todavía la BD

IMPORTANTE:
No diseñes SQL todavía.
Solo evalúa compatibilidad conceptual.

8. GAM ALIGNMENT
Analiza cómo esta entidad se relaciona con el GAM / Action System.

Debes indicar:
- qué acciones o flujos dependen de esta entidad
- qué campos mínimos necesita el GAM para operar bien
- qué estados, ownerships, visibilidad o timestamps son importantes
- qué problemas tendría el GAM si esta entidad queda mal definida

9. MAPPING STRATEGY
Explica cómo debería mapearse:

- current mock shape → canonical contract
- current UI usage → canonical contract
- canonical contract → futura persistencia/BD

No implementes código.
Solo define la estrategia de transformación.

10. READINESS LEVEL
Clasifica la entidad como:
- READY
- MOSTLY READY
- NEEDS ADAPTATION
- HIGHLY FRAGMENTED

Y justifica en 2–4 líneas.

==================================================
SECCIÓN GLOBAL FINAL
==================================================

11. CROSS-ENTITY DESIGN RULES
Define reglas globales que deben aplicar a TODAS las entidades.
Como mínimo cubre:

- naming conventions
- singular/plural criteria
- id strategy
- date/time fields
- createdAt / updatedAt / deletedAt si corresponde
- owner vs actor vs related user
- optional vs required fields
- nested object vs reference id
- booleans vs enums
- status fields
- visibility fields
- source-of-truth principles
- view-model fields vs persistable fields

12. NORMALIZATION PRINCIPLES
Explica las reglas de normalización que propones para el sistema completo.

Por ejemplo:
- cuándo usar sellerId vs seller object
- cuándo usar arrays de ids vs objetos embebidos
- cómo representar imágenes
- cómo representar members de groups
- cómo representar previews de conversación vs mensajes completos
- cómo representar notifications accionables

13. TOP SYSTEMIC MISALIGNMENTS
Lista los principales desacoples sistémicos detectados entre:
- UI actual
- mocks actuales
- propuesta de BD
- GAM

Ordena por impacto.

14. TOP RISKS IF CONTRACTS ARE NOT DEFINED NOW
Explica qué pasará si se salta este paso y se pasa directo a:
- refactor estructural
- repos
- Supabase
- responsive
- integración GAM más profunda

15. PRIORITY ORDER FOR NEXT ARCHITECTURE STEP
Sin implementar nada todavía, indica cuál debería ser el siguiente orden lógico después de esta auditoría.
Solo orden, no soluciones detalladas.

FORMATO OBLIGATORIO DE RESPUESTA
Responde TODO en una sola respuesta, en texto continuo aquí mismo.
NO crear documentos separados.
NO responder con “puedo hacerlo en otro archivo”.
NO resumir demasiado.
Quiero una respuesta minuciosa y estructurada.

ESTÁNDAR DE CALIDAD ESPERADO
La salida debe ser:
- precisa
- minuciosa
- estructurada
- usable como base de arquitectura real
- útil para luego diseñar repos, mappers y contracts reales
- honesta respecto de incertidumbres

IMPORTANTE FINAL
No quiero solo observaciones generales.
Quiero contracts canónicos propuestos por entidad, con análisis comparativo serio contra:
- UI real
- mocks reales
- propuesta BD
- necesidades GAM

Tu misión es dejar lista la base conceptual para la siguiente fase de arquitectura.