LISTLYUP — IMPLEMENTACIÓN CONTROLADA DE DOCS CLEANUP CONSERVADOR
OBJETIVO: REDUCIR OBESIDAD DOCUMENTAL EN RAÍZ
SIN TOCAR CÓDIGO
SIN MOVER DOCUMENTOS AMBIGUOS
SIN USAR PATRONES PELIGROSOS

Quiero que actúes como:

- Lead Documentation Cleanup Engineer
- Lead Safe Archive Curator
- Lead Repo Documentation Organizer

CONTEXTO

Ya se completó exitosamente el cleanup seguro de código:
- barrels innecesarios eliminados
- legacy aislado en /components/_legacy/
- sin ruptura funcional

Ahora quiero ejecutar SOLO un lote documental, conservador y seguro.

OBJETIVO

Reducir la cantidad de archivos .md en raíz moviendo documentación claramente histórica o completada hacia /docs/archive/, sin tocar documentos ambiguos o posiblemente activos.

TAREAS

1. Crear, si no existe, esta estructura:

- /docs/archive/phases/
- /docs/archive/migrations/
- /docs/archive/testing/
- /docs/archive/reports/
- /docs/archive/cleanup/
- /docs/archive/analysis/

2. Mover SOLO documentos claramente históricos/completados a esas carpetas, usando criterio conservador.

3. NO mover documentos ambiguos o que puedan seguir siendo referencia activa, incluyendo como mínimo:
- ACTION_DEFINITION_MATRIX.md
- ACTION_SURFACES_ALIGNMENT.md
- ACTION_SURFACES_BLUEPRINT.md
- ACTION_SYSTEM_CHEATSHEET.md
- ACTION_SYSTEM_MAP.md
- GOVERNANCE_MISSING_ACTIONS_PROPOSAL.md
- cualquier otro documento que parezca canónico, guía activa, blueprint o referencia vigente

4. Eliminar duplicados en raíz SOLO si están realmente duplicados en /docs/:
- Attributions.md
- QUICK_REFERENCE.md solo si confirmas equivalencia real

5. Crear un archivo breve:
- /docs/archive/README.md

Contenido esperado:
- archive contiene documentación histórica
- no es fuente de verdad activa
- se preserva por trazabilidad

RESTRICCIONES

- NO tocar ningún archivo .tsx, .ts, .css o código
- NO tocar imports
- NO tocar rutas
- NO tocar mocks
- NO mover documentos ambiguos
- NO usar globs demasiado amplios que puedan capturar archivos activos
- NO borrar nada dudoso

VALIDACIONES OBLIGATORIAS

Antes de mover:
- confirmar que cada documento sea claramente histórico o completado
- dejar fuera cualquier documento ambiguo

Después de mover:
- listar exactamente qué se movió
- listar exactamente qué se eliminó
- listar exactamente qué quedó intacto por precaución

FORMATO DE RESPUESTA

Responder todo en texto continuo aquí mismo.

ESTRUCTURA OBLIGATORIA

A. CAMBIOS IMPLEMENTADOS
- carpetas creadas
- archivos movidos por destino
- archivos eliminados

B. VALIDACIÓN PREVIA
- criterio usado para decidir qué mover
- documentos dejados fuera por ambigüedad

C. RESULTADO FINAL
- cantidad de archivos removidos de raíz
- estructura final de /docs/archive
- duplicados eliminados
- documentos preservados en raíz

D. CHECK DE SEGURIDAD
- confirmar que no se tocó código
- confirmar que no hay riesgo funcional

E. SIGUIENTE PASO RECOMENDADO
- 1 sola recomendación breve para el próximo batch