LISTLYUP — AUDITORÍA TRANSVERSAL MAESTRA DEL REPO
OBJETIVO: DIAGNÓSTICO + CLASIFICACIÓN + RIESGO
NO IMPLEMENTAR TODAVÍA

Quiero que actúes como:

- Lead Repo Auditor
- Lead Frontend Architecture Auditor
- Lead UX Systems Auditor
- Lead Codebase Cleanup Analyst
- Lead Figma-to-Code Audit Analyst

CONTEXTO

Estoy trabajando sobre ListlyUp.

El MVP canónico YA ESTÁ CERRADO conceptualmente.
NO debes reabrir discusión de MVP.
NO debes proponer features nuevas.
NO debes rehacer el producto.
NO debes rediseñar el scope.

Debes asumir que esta auditoría ocurre DESPUÉS de múltiples limpiezas modulares ya realizadas para alinear el frontend al MVP canónico.

Módulos que ya fueron trabajados y limpiados al menos en intención funcional:
- My Groups
- Favorites
- Statistics
- My Profile
- Settings
- Action Center
- SuperAdmin Dashboard

Ahora entramos en una nueva etapa:

AUDITORÍA TRANSVERSAL + LIMPIEZA PROFUNDA + PREPARACIÓN ESTRUCTURAL PARA ANTIGRAVITY + PREPARACIÓN PARA SUPABASE + PREPARACIÓN PARA DESKTOP/RESPONSIVE

TU TAREA EN ESTA RESPUESTA

NO implementes cambios todavía.
NO propongas código todavía.
NO hagas refactor todavía.

Primero quiero una AUDITORÍA TRANSVERSAL MAESTRA del repo actual, con foco en:

1. estabilidad general
2. navegación
3. rutas
4. pages activas vs páginas sospechosas
5. imports
6. consistencia entre módulos
7. visibilidad accidental de features future-ready
8. duplicaciones de lógica/UI
9. componentes muertos o sospechosos
10. handlers muertos o sospechosos
11. mocks muertos / mocks incrustados / mocks mal distribuidos
12. estados visuales faltantes
13. coupling excesivo entre UI y data
14. exposure accidental de rutas o archivos future-ready
15. archivos .md obsoletos, duplicados o inconsistentes
16. leftovers probables de Figma Make
17. estructura general del proyecto
18. preparación actual para Antigravity
19. preparación actual para Supabase
20. preparación actual para responsive/desktop sin agregar nuevas features

IMPORTANTE

No quiero una respuesta vaga.
Quiero que inspecciones el repo real y entregues un diagnóstico estructurado y accionable.

FORMATO OBLIGATORIO DE RESPUESTA

Responde en TEXTO CONTINUO, TODO EN UNA SOLA RESPUESTA, escrito abajo.
NO crees documentos separados.
NO lo separes en archivos distintos.
NO me entregues “te propongo crear un doc”.
Quiero todo aquí, en texto continuo, para poder copiar y pegar tu respuesta completa a ChatGPT.

ESTRUCTURA OBLIGATORIA

A. RESUMEN EJECUTIVO
- estado general del repo
- nivel de riesgo global
- nivel de deuda técnica global
- preparación actual para siguiente fase

B. MAPA DEL ESTADO ACTUAL
Identifica y resume:
- páginas/rutas aparentemente activas
- módulos principales
- componentes compartidos críticos
- estructura actual del repo
- estrategia actual de mocks si existe
- estado de docs .md

C. HALLAZGOS PRINCIPALES
Divide tus hallazgos como mínimo en:
1. arquitectura
2. navegación/rutas
3. UI/components
4. hooks/helpers
5. mocks/data flow
6. docs/md
7. leftovers/legacy probable
8. responsive/desktop readiness
9. Antigravity readiness
10. Supabase readiness

D. MATRIZ DE CLASIFICACIÓN INICIAL
Clasifica lo que detectes usando estas categorías:
- KEEP ACTIVE
- KEEP FUTURE-READY
- MOVE TO LEGACY
- DELETE SAFE
- REVIEW BEFORE DELETE

Aplica la clasificación a:
- pages
- routes
- components
- hooks
- mocks
- helpers
- docs .md
- assets relevantes
- leftovers de Figma Make
- configs si corresponde

No necesito exhaustividad perfecta por archivo individual si el repo es muy grande, pero sí necesito la mejor clasificación posible por áreas, grupos o ejemplos concretos.

E. RIESGOS DE RUPTURA
Indica:
- qué cosas NO conviene tocar aún
- qué cosas sí parecen fáciles de limpiar
- qué cosas parecen peligrosas de borrar o mover
- dónde puede romperse el MVP si limpiamos mal

F. PRIORIDAD DE TRABAJO RECOMENDADA
Dame un orden claro y realista de trabajo para la siguiente fase.
No implementes, solo ordénalo.

G. LISTA SIMPLE DE ACCIONES SIGUIENTES
Termina con una lista SIMPLE y CLARA, priorizada, con:
- acciones inmediatas
- acciones de segunda prioridad
- acciones que aún NO conviene tocar

IMPORTANTE FINAL

No inventes features nuevas.
No cambies el MVP.
No propongas una reescritura total.
No mezcles cleanup con rediseño de producto.
No hagas teoría vacía.

Quiero una auditoría realista, concreta, estratégica y orientada a limpiar sin romper nada.