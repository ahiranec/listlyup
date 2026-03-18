# ==========================================================
# LISTLYUP — SUPERADMIN IMPLEMENTATION PATCH
# P0 FIXES + 2 GOVERNANCE ACTIONS
# ==========================================================

Actúa como:

• Product Systems Architect
• Admin UX Implementer
• Governance Tools Designer

Tu tarea es IMPLEMENTAR un patch quirúrgico sobre el SuperAdmin Dashboard actual.

NO rediseñar arquitectura.
NO cambiar navegación principal.
NO agregar nuevos módulos root.
NO romper patrones ya existentes.

Mantener módulos actuales:

1. Overview
2. Users
3. Moderation
4. Configuration
5. Audit Log

Objetivo:
1) Resolver los bloqueadores críticos detectados en la auditoría
2) Llevar el dashboard a 53/53 acciones canónicas funcionales
3) Agregar 2 acciones extra recomendadas de gobernanza marketplace

----------------------------------------------------------
SECCIÓN A — IMPLEMENTAR P0 CRÍTICOS
----------------------------------------------------------

## 1. ModerationPanel faltante

Actualmente existe dead end en Moderation.

Implementar:

Moderation → click report row → open ModerationPanel

El panel debe permitir:

- View report details
- Resolve report
- Reject report
- Suspend reported target
- Internal notes
- Close panel

Debe eliminar dead ends.

Estado esperado:
Acciones 13, 14, 15, 16 y 17 pasan a OK.

----------------------------------------------------------

## 2. Reactivate user

En Users → UserPanel → Sanctions

Agregar acción:

- Reactivate user

Debe aparecer solo si user.status != active

Flujo:

Users table → click user → Sanctions → Reactivate

Debe usar confirm dialog.

Estado esperado:
Acción 7 pasa a OK.

----------------------------------------------------------

## 3. SLA Indicator en Moderation

En Moderation table agregar columna SLA.

Mostrar badge visual:

- green = safe
- yellow = warning
- red = critical

Objetivo:
dar visibilidad rápida de urgencia de cada reporte.

Estado esperado:
Acción 18 pasa a OK.

----------------------------------------------------------
SECCIÓN B — AGREGAR 2 ACCIONES EXTRA RECOMENDADAS
----------------------------------------------------------

Estas 2 acciones NO reemplazan el canónico.
Son extensiones mínimas recomendadas para gobernanza real de marketplace.

## 4. Impersonate user

Ubicación:
Users → UserPanel → Summary o Security tab

Acción:
Impersonate User

Objetivo:
permitir que soporte/admin pueda entrar como ese usuario
para reproducir bugs, revisar permisos o validar UX.

Requisitos UI:

- Warning dialog fuerte
- Mensaje claro: “You are entering a support session as this user”
- Badge persistente visible en toda la sesión:
  “Impersonating: [User Name]”
- Acción para exit impersonation

Reglas:
- Solo visible para super_admin
- Debe registrarse en audit_log
- No requiere backend real todavía, pero la UI y flujo deben quedar definidos

----------------------------------------------------------

## 5. Soft-delete / restore content

Ubicación:
Moderation → report detail
o
Users → related content section (si ya existe)

Acciones:
- Soft-delete listing
- Restore listing
- Soft-delete group
- Restore group

Objetivo:
no solo suspender target, sino poder remover contenido de forma reversible.

Requisitos UI:

- Acción visible desde ModerationPanel cuando targetType = listing o group
- Confirmation dialog
- Estado visual del contenido:
  Active / Suspended / Removed
- Restore action visible si el contenido está removed

Reglas:
- Soft-delete, no hard delete
- Registrar en audit_log
- Si no existe aún el módulo de contenido completo, al menos dejar la acción en el flujo de ModerationPanel

----------------------------------------------------------
SECCIÓN C — REGLAS DE IMPLEMENTACIÓN
----------------------------------------------------------

1. Mantener patrones existentes:
- Slide panels
- Confirmation dialogs
- Badges
- Tables
- Tabs

2. No crear módulos nuevos root.

3. No cambiar el sidebar.

4. No rediseñar visualmente el dashboard completo.

5. Solo extender:
- ModerationPanel
- UserPanel
- Moderation table
- Audit logging hooks visibles en UI

----------------------------------------------------------
SECCIÓN D — ENTREGABLE ESPERADO
----------------------------------------------------------

Tu respuesta debe incluir:

1) Lista de archivos creados/modificados
2) Resumen de cada acción implementada
3) Confirmación de que estas acciones quedan funcionales:

- Resolve report
- Reject report
- Suspend reported target
- Reactivate user
- SLA indicator
- Impersonate user
- Soft-delete content
- Restore content

4) Estado final de acciones:
- 53 canónicas
- +2 recomendadas

Formato final requerido:

IMPLEMENTATION PATCH APPLIED — P0 FIXES COMPLETE — 2 GOVERNANCE ACTIONS ADDED