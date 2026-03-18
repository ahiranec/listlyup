LISTLYUP — DOCS CLEANUP BATCH 3 (PRIMER CLEANUP REAL)
OBJETIVO: REDUCIR SIGNIFICATIVAMENTE LA RAÍZ MOVIENDO DOCUMENTOS HISTÓRICOS SEGUROS
SIN TOCAR DOCUMENTOS CANÓNICOS NI ACTIVOS

Actúa como:

- Lead Documentation Cleanup Engineer
- Lead Safe Bulk Archive Operator

CONTEXTO

Ya se validó el proceso de archive en Batch 1 y 2.
Ahora necesitamos ejecutar el primer cleanup significativo.

NO queremos micro batches.
Queremos un batch eficiente, seguro y con impacto real.

TAREA

Mover en bloque archivos que cumplan patrones CLARAMENTE HISTÓRICOS:

1. FASES COMPLETADAS
Mover TODOS:

- FASE_7_SUMMARY.md
- FASE_8_SUMMARY.md
- PLAN_COMPLETO_8_FASES.md
- PHASE_5_*.md

Destino:
→ /docs/archive/phases/

2. REFACTORING COMPLETADO
Mover TODOS:

- REFACTORING_PHASE_1_COMPLETE.md → REFACTORING_PHASE_8_COMPLETE.md
- REFACTORING_SUMMARY.md
- REFACTORING_ANALYSIS.md
- REFACTORING_EXECUTION_PLAN.md
- REFACTOR_TABS_SEPARADOS_COMPLETE.md

Destino:
→ /docs/archive/reports/

3. STABILITY CHECKS
Mover TODOS:

- STABILITY_CHECK_PHASE_3.md → STABILITY_CHECK_PHASE_8.md
- STABILITY_CHECK_PHASE_5_ACTUAL.md
- STABILITY_AUDIT.md
- STABILITY_CHECK.md
- STABILITY_CHECKLIST.md
- STABILITY_CHECK_REORGANIZACION.md

Destino:
→ /docs/archive/testing/

4. MIGRATIONS COMPLETADAS
Mover:

- MIGRATION_COMPLETE.md
- P1_MIGRATION_COMPLETE.md
- LISTING_DETAIL_MIGRATION_COMPLETE.md

Destino:
→ /docs/archive/migrations/

5. REPORTS CLARAMENTE FINALIZADOS (SAFE SET)
Mover SOLO estos (NO otros similares):

- IMPLEMENTATION_COMPLETE.md
- IMPLEMENTATION_SUMMARY.md
- IMPLEMENTATION_STATUS.md
- REORGANIZATION_FINAL_SUMMARY.md
- DOCS_REORGANIZATION_COMPLETE.md

Destino:
→ /docs/archive/reports/

RESTRICCIONES CRÍTICAS

NO mover:
- ACTION_*
- CANONICAL_*
- *_BLUEPRINT*
- *_CHEATSHEET*
- *_MAP*
- *_GUIDE*
- *_README*
- *_ROADMAP*
- *_SPEC*
- QUICK_REFERENCE.md
- cualquier documento ambiguo
- cualquier archivo no listado explícitamente

VALIDACIONES

Antes:
- confirmar que cada archivo existe
- confirmar que no es referencia activa

Después:
- listar TODOS los archivos movidos
- indicar cuántos archivos se removieron de raíz
- confirmar que los documentos canónicos siguen en raíz

FORMATO DE RESPUESTA

A. Archivos movidos por categoría  
B. Total de archivos movidos  
C. Reducción de archivos en raíz  
D. Archivos protegidos (no movidos)  
E. Confirmación de cero impacto en código  
F. Riesgos (si existen)