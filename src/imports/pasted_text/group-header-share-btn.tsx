====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
FINAL FIX — MY GROUPS (CLOSURE)
MODE: SURGICAL / NO BREAKING CHANGES
====================================================================

OBJETIVO

Cerrar My Groups al 100% MVP.

Último gap detectado:

❗ "Invite Members" aún existe en GroupHeader
Debe ser reemplazado por "Share Group"

NO se permite lógica nueva.
Debe reutilizar sistema existente (share-group).

====================================================================
TAREA ÚNICA (CRÍTICA)
====================================================================

REEMPLAZAR "INVITE MEMBERS" POR "SHARE GROUP"

File: /components/group-detail/GroupHeader.tsx

--------------------------------------------------------------------

1. UBICAR BOTÓN

Buscar:

- "Invite Members"
- handler asociado (onInviteMembers o similar)

--------------------------------------------------------------------

2. REEMPLAZO

CAMBIAR:

Label:
❌ "Invite Members"
→
✅ "Share Group"

Acción:

❌ NO usar lógica de invitación
❌ NO abrir sheets custom
❌ NO crear estado nuevo

✅ Usar action existente:

'actionId': 'share-group'

Ejemplo:

dispatch({
  actionId: 'share-group',
  context: {
    groupId: group.id,
    groupName: group.name
  }
})

--------------------------------------------------------------------

3. UI

Mantener:

- mismo botón
- mismo estilo
- misma posición

Solo cambiar:

- label
- action

--------------------------------------------------------------------

4. ELIMINAR RESIDUOS

Eliminar si existe:

- onInviteMembers
- imports relacionados
- estados no usados

NO dejar código muerto

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO romper:

- navegación Group → Detail
- tabs
- ActionMenu
- ShareSheet
- permisos
- layout del header

NO duplicar:

- lógica de share
- modales
- handlers

REUTILIZAR 100% sistema existente

====================================================================
VALIDACIÓN OBLIGATORIA
====================================================================

Antes de responder:

- compile OK
- no imports muertos
- botón visible como "Share Group"
- abre ShareSheet correctamente
- genera link del grupo
- funciona en:
  - About tab
  - Header
  - consistencia con 3-dots menu
- no existe "Invite Members" en ningún lugar visible
- no runtime errors

====================================================================
OUTPUT
====================================================================

1. FILE MODIFIED
2. CHANGE APPLIED
3. VALIDATION:
   - compile OK
   - UI OK
   - share flow OK
4. ESTADO FINAL

SIN explicación larga

====================================================================
FIN
====================================================================