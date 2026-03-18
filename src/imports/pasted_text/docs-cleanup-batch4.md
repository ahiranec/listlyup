LISTLYUP — DOCS CLEANUP BATCH 4 (LIMPIEZA MASIVA CONTROLADA FINAL)
OBJETIVO: COMPLETAR EL ARCHIVE DE DOCUMENTOS HISTÓRICOS
REDUCIR SIGNIFICATIVAMENTE LA RAÍZ
CERRAR FASE DE CLEANUP DOCUMENTAL

Actúa como:

- Lead Documentation Cleanup Architect
- Lead Bulk Archive Executor

CONTEXTO

Ya se validó completamente el proceso en Batch 1–3:
- mover docs NO rompe nada
- estructura /docs/archive está lista
- documentos canónicos están identificados y protegidos

Ahora ejecutamos el cleanup REAL final de docs.

TAREA

Mover TODOS los siguientes archivos confirmados históricos:

--------------------------------------------------
1. FASES
--------------------------------------------------

Mover TODOS:

- FASE_5_SUMMARY.md (si no es duplicado en /docs/phases/)
- PLAN_COMPLETO_8_FASES.md
- PHASE_5_COMPLETION_REPORT.md
- PHASE_5_1_FINAL_REPORT.md
- PHASE_5_IMPLEMENTATION_GUIDE.md
- PHASE_5_MIGRATION_EXAMPLE.md

Destino:
→ /docs/archive/phases/

--------------------------------------------------
2. REFACTORING (COMPLETO)
--------------------------------------------------

Mover TODOS:

- REFACTORING_PHASE_1_COMPLETE.md → REFACTORING_PHASE_8_COMPLETE.md
- REFACTORING_SUMMARY.md
- REFACTORING_ANALYSIS.md
- REFACTORING_EXECUTION_PLAN.md
- REFACTOR_TABS_SEPARADOS_COMPLETE.md

Destino:
→ /docs/archive/reports/

--------------------------------------------------
3. STABILITY
--------------------------------------------------

Mover TODOS:

- STABILITY_CHECK_PHASE_3.md → STABILITY_CHECK_PHASE_8.md
- STABILITY_CHECK_PHASE_5_ACTUAL.md
- STABILITY_AUDIT.md
- STABILITY_CHECK.md
- STABILITY_CHECKLIST.md
- STABILITY_CHECK_REORGANIZACION.md

Destino:
→ /docs/archive/testing/

--------------------------------------------------
4. MIGRATIONS
--------------------------------------------------

Mover TODOS:

- MIGRATION_COMPLETE.md
- P1_MIGRATION_COMPLETE.md
- LISTING_DETAIL_MIGRATION_COMPLETE.md

Destino:
→ /docs/archive/migrations/

--------------------------------------------------
5. REPORTS SAFE SET
--------------------------------------------------

Mover TODOS:

- IMPLEMENTATION_COMPLETE.md
- IMPLEMENTATION_SUMMARY.md
- IMPLEMENTATION_STATUS.md
- REORGANIZATION_FINAL_SUMMARY.md
- DOCS_REORGANIZATION_COMPLETE.md

Destino:
→ /docs/archive/reports/

--------------------------------------------------
RESTRICCIONES CRÍTICAS
--------------------------------------------------

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

NO analizar archivo por archivo
NO detenerse por tamaño o longitud
NO aplicar criterio conservador adicional

--------------------------------------------------
VALIDACIONES
--------------------------------------------------

Después de ejecutar:

1. listar TODOS los archivos movidos
2. indicar número total movido
3. indicar reducción en raíz
4. confirmar que docs canónicos siguen en raíz
5. confirmar que no se tocó código

--------------------------------------------------
FORMATO DE RESPUESTA
--------------------------------------------------

A. Archivos movidos por categoría  
B. Total movido  
C. Reducción de raíz  
D. Archivos protegidos  
E. Confirmación de integridad  
F. Riesgos (si existen)