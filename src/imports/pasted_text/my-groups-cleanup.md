====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
PHASE 1 — SAFE CLEANUP (NO BREAK)
SCOPE: MY GROUPS
MODE: REMOVE NON-MVP UI ONLY
====================================================================

CONTEXTO

Estás trabajando sobre My Groups.

Objetivo de esta fase:

👉 ELIMINAR SOLO ELEMENTOS NO-MVP
👉 NO CAMBIAR ARQUITECTURA
👉 NO CREAR COMPONENTES NUEVOS
👉 NO TOCAR LÓGICA CRÍTICA
👉 NO ROMPER NADA

Esta fase es 100% SAFE CLEANUP.

====================================================================
TAREAS EXACTAS (APLICAR TODAS)
====================================================================

1. REMOVE INVITATIONS BUTTON

File: GroupActionsBar.tsx

- Eliminar botón "Invitations"
- Eliminar props:
  - onInvitations
  - invitationsCount

NO tocar:
- Create Group button
- Explore Groups button

--------------------------------------------------------------------

2. REMOVE ACTIVITY TAB

File: GroupTabs.tsx

- Eliminar tab:
  id: "activity"

- Eliminar import de icon Activity

- Actualizar tipo:
  GroupTab = "about" | "listings" | "members" | "pending" | "settings"

--------------------------------------------------------------------

3. REMOVE SETTINGS FROM 3-DOTS MENU

File: GroupQuickActionsMenu.tsx

- Eliminar acción:
  'group-settings'

Settings debe existir SOLO dentro del tab Settings.

--------------------------------------------------------------------

4. CLEAN PENDING TAB (ONLY PENDING)

File: PendingTabContent.tsx

- Eliminar:
  - Approved tab
  - Rejected tab

- Dejar SOLO:
  - Pending listings

- Actualizar type:
  ModerationStatus = "pending"

- Eliminar mock data con estados approved/rejected

--------------------------------------------------------------------

5. REMOVE AUTO-APPROVE MEMBERS (UI ONLY)

File: SettingsTabContent.tsx

- Eliminar toggle:
  "Auto-approve members"

IMPORTANTE:
- NO romper lógica interna
- NO eliminar campos de backend
- SOLO remover de UI

--------------------------------------------------------------------

6. DISABLE "APPROVAL" JOIN POLICY

File: SettingsTabContent.tsx

- Opción "Approval":
  - visible
  - disabled
  - label: "Coming Soon"

NO debe ser seleccionable.

--------------------------------------------------------------------

====================================================================
REGLAS DE SEGURIDAD (CRÍTICAS)
====================================================================

NO romper:

- navegación (Group → Detail)
- tabs
- routing
- ProductCard reuse
- ActionMenu
- ShareSheet
- ActionRegistry
- permisos de grupo
- member actions
- pending approvals (approve/reject individuales)
- integración con Action Center

NO eliminar:

- handlers existentes
- lógica de backend
- estructuras de datos

SOLO limpiar UI.

====================================================================
OUTPUT REQUERIDO
====================================================================

Responder SOLO con:

1. FILES MODIFIED
2. CAMBIOS APLICADOS (resumen corto)
3. CONFIRMACIÓN:
   - UI no rota
   - navegación OK
   - compile OK

SIN explicaciones largas.

====================================================================
FIN
====================================================================