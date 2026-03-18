====================================================================
LISTLYUP — PUBLISH FLOW — FINAL FIX IMPLEMENTATION (MVP CLEANUP SAFE)
====================================================================

CONTEXTO:
Estás trabajando sobre el Publish Flow existente.
YA fue auditado contra el MVP canónico.

Objetivo:
Eliminar SOLO elementos OUT_OF_MVP detectados,
SIN romper nada del flujo existente.

IMPORTANTE:
Esto NO es un refactor.
Esto es un CLEANUP SEGURO.

====================================================================
REGLAS CRÍTICAS (NO NEGOCIABLES)
====================================================================

❌ NO romper navegación entre pasos
❌ NO modificar lógica core del flow
❌ NO tocar AI prefill
❌ NO tocar location flow
❌ NO tocar integración con profile defaults
❌ NO romper CREATE mode
❌ NO romper EDIT mode
❌ NO eliminar lógica si no estás 100% seguro que no se usa
❌ NO hacer refactors estructurales

✅ SOLO eliminar UI + wiring de features OUT_OF_MVP
✅ Implementar de forma incremental y segura
✅ Validar estabilidad antes de continuar
✅ Si algo genera duda → NO eliminar, solo desacoplar UI

====================================================================
FIXES A IMPLEMENTAR (SOLO ESTOS)
====================================================================

--------------------------------------------------------------------
FIX 1 — REMOVE "PRIVATE" VISIBILITY OPTION
--------------------------------------------------------------------

Archivo: /components/publish/PricingStep.tsx

ANTES:
- Existe opción: { id: 'private', ... }

DESPUÉS:
- Solo:
  - public
  - groups

IMPORTANTE:
- Mantener value interno como 'groups' (NO renombrar a groups_only si rompe algo)
- Cambiar label a "Groups Only"

Archivo: /components/publish/types.ts

ANTES:
visibility: 'public' | 'groups' | 'private';

DESPUÉS:
visibility: 'public' | 'groups';

--------------------------------------------------------------------
FIX 2 — REMOVE "SAVE AS DRAFT" BUTTON (CREATE MODE ONLY)
--------------------------------------------------------------------

Archivo: /components/publish/PreviewStepV2.tsx

ACCIÓN:
- Eliminar botón "Save as Draft" SOLO en CREATE mode

IMPORTANTE:
- NO eliminar lógica interna si existe
- NO eliminar prop onSaveDraft si no estás seguro
- EDIT mode debe seguir funcionando EXACTAMENTE igual

RESULTADO:
CREATE mode → solo:
- Back
- Publish

--------------------------------------------------------------------
FIX 3 — REMOVE CAPACITY FIELD (EVENTS)
--------------------------------------------------------------------

Archivo: /components/publish/BasicInfoStepV2.tsx

ACCIÓN:
- Eliminar campo "Capacity"

Archivo: /components/publish/types.ts

ACCIÓN:
- Eliminar:
capacity?: string;

--------------------------------------------------------------------
FIX 4 — REMOVE EVENT HUBS SECTION
--------------------------------------------------------------------

Archivo: /components/publish/PricingStep.tsx

ELIMINAR:
- Sección completa "Event Hubs"
- Mock data asociado
- UI rendering
- handlers relacionados SOLO si no rompen nada

IMPORTANTE:
- NO romper otros states del componente
- Si un state es compartido → dejarlo

Archivo: /components/publish/types.ts

ELIMINAR SOLO SI NO SE USA:
- interface Event (publish context)
- selectedEvents

--------------------------------------------------------------------
FIX 5 — REMOVE CAMPAIGNS SECTION
--------------------------------------------------------------------

Archivo: /components/publish/PricingStep.tsx

ELIMINAR:
- Sección completa "Campaigns"
- Mock data
- UI rendering

IMPORTANTE:
- Igual criterio que Event Hubs

Archivo: /components/publish/types.ts

ELIMINAR SOLO SI NO SE USA:
- interface Campaign
- selectedCampaigns

--------------------------------------------------------------------
FIX 6 — onSaveDraft (SAFE MODE)
--------------------------------------------------------------------

DECISIÓN:
- NO eliminar lógica interna
- SOLO eliminar visibilidad del botón en CREATE

====================================================================
ORDEN DE IMPLEMENTACIÓN (CRÍTICO)
====================================================================

1. FIX 1 (visibility)
2. FIX 2 (draft button UI)
3. FIX 3 (capacity)
4. FIX 4 (event hubs UI)
5. FIX 5 (campaigns UI)
6. Cleanup types SOLO si no rompe compile

VALIDAR después de cada fix.

====================================================================
VALIDACIÓN OBLIGATORIA (ANTES DE ENTREGAR)
====================================================================

NO ENTREGUES RESULTADOS SIN ESTO:

1. COMPILACIÓN
- No errores TypeScript
- No imports rotos
- No variables no usadas críticas

2. CREATE MODE
- Flujo completo funciona
- No hay botón draft
- Publish funciona

3. EDIT MODE
- Save changes funciona
- No se rompió nada

4. FLUJO COMPLETO
- media → basic → location → pricing → preview → publish OK

5. IA
- Prefill funciona
- Editable

6. LOCATION
- Profile default OK
- Manual OK

7. VISIBILITY
- Solo public / groups
- Groups multi-select OK

8. ACCESS MODE
- pickup / meetup / delivery / virtual OK

9. CONTACT
- chat / whatsapp OK

====================================================================
FORMATO DE ENTREGA (OBLIGATORIO)
====================================================================

RESPONDE SOLO CUANDO TODO ESTÉ VALIDADO Y ESTABLE:

1. CHANGES APPLIED
- Archivos modificados
- Qué se eliminó exactamente

2. STABILITY CHECK
Confirmar explícitamente:
- compile OK
- navegación OK
- CREATE OK
- EDIT OK
- publish OK
- sin errores

3. FINAL STRUCTURE
- pasos finales
- fields finales por tipo (product / service / event)

4. RISKS
- solo si queda alguno real

====================================================================
RESTRICCIÓN FINAL
====================================================================

NO ENTREGAR HASTA QUE:
✔ Todo compile
✔ Todo funcione
✔ Nada se haya roto

====================================================================
END PROMPT
====================================================================