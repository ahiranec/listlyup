====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
PHASE 2.5 — HARD CLEANUP (SURGICAL)
SCOPE: MY GROUPS
MODE: SAFE REMOVE DEAD CODE
====================================================================

CONTEXTO

My Groups ya está funcionalmente MVP OK.

Ahora el objetivo es:

👉 ELIMINAR DEUDA TÉCNICA
👉 EVITAR QUE CÓDIGO VIEJO SE REUTILICE
👉 LIMPIAR EXPORTS Y REFERENCIAS
👉 NO ROMPER NADA

Esto es limpieza quirúrgica, NO funcional.

====================================================================
TAREAS EXACTAS
====================================================================

1. REMOVE WIZARD EXPORTS (CRÍTICO)

File: /components/groups/index.ts

- Eliminar exports de:

  - CreateGroupWizard
  - CreateGroupDetailsWizard
  - GroupTypeSelector
  - GroupSuccessScreen

IMPORTANTE:
- Si algo depende de estos exports → detectar y corregir import
- NO dejar exports “muertos”

--------------------------------------------------------------------

2. REMOVE WIZARD IMPORTS EN TODO EL PROYECTO

Buscar globalmente:

- CreateGroupWizard
- CreateGroupDetailsWizard
- GroupTypeSelector
- GroupSuccessScreen

Acción:

- Eliminar imports no usados
- Reemplazar por CreateGroupSheet si aplica
- Si están sin uso → eliminar completamente

--------------------------------------------------------------------

3. DELETE OR ISOLATE FILES

Archivos:

- CreateGroupWizard.tsx
- CreateGroupDetailsWizard.tsx
- GroupTypeSelector.tsx
- GroupSuccessScreen.tsx

Opciones:

A) Ideal:
→ eliminar archivos

B) Si prefieres seguridad:
→ mover a /_legacy/groups/
→ agregar comment:

  // ⚠️ LEGACY — NOT USED IN MVP

--------------------------------------------------------------------

4. NEUTRALIZE InviteContactsSheet

File: InviteContactsSheet.tsx

NO debe permitir:

- invitar por contactos
- invitar por email
- lógica social

Opciones:

A) Ideal:
→ eliminar archivo si NO se usa en ningún lado

B) Si se usa indirectamente:

→ dejarlo como wrapper de ShareSheet

Ejemplo comportamiento:

- abrir ShareSheet
- generar link
- NO UI de contactos
- NO tabs
- NO emails

--------------------------------------------------------------------

5. VERIFY INVITE MEMBERS ACTION

File: GroupQuickActionsMenu.tsx

Acción:

- 'invite-members' → debe usar 'share-group'

NO debe existir lógica propia de invitación.

--------------------------------------------------------------------

6. CLEAN UNUSED TYPES

File: types.ts

- eliminar tipos relacionados a wizard si existen
- eliminar props no usadas
- mantener solo lo necesario para MVP

--------------------------------------------------------------------

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO romper:

- CreateGroupSheet
- MyGroupsPage
- navegación
- routing
- Group Detail
- tabs
- ShareSheet
- ActionMenu
- permisos
- types globales usados en otros módulos

NO eliminar nada que esté siendo usado activamente.

====================================================================
VALIDACIÓN OBLIGATORIA
====================================================================

Antes de responder, verificar:

- compile OK
- no missing imports
- no unused imports
- no referencias a wizard
- Create Group sigue funcionando
- Invite Members sigue funcionando (via Share)
- navegación intacta
- no runtime errors

====================================================================
OUTPUT
====================================================================

1. FILES DELETED / MOVED
2. FILES MODIFIED
3. CLEANUP SUMMARY
4. VALIDATION:
   - compile OK
   - imports OK
   - no dead code references
   - create flow OK
   - invite flow OK
5. ESTADO FINAL

SIN explicación larga.

====================================================================
FIN
====================================================================