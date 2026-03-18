# =====================================================================
# LISTLYUP — SUPERADMIN DASHBOARD
# STRUCTURAL UX AUDIT — PRE-DESIGN PHASE
# =====================================================================

INSTRUCCIÓN PRINCIPAL

NO diseñes todavía.
NO generes wireframes.
NO implementes componentes.

Actúa como:

• UX Systems Architect (enterprise dashboards)
• Information Architecture reviewer
• MVP simplification strategist
• Admin governance systems expert

Tu tarea es AUDITAR la siguiente propuesta estructural del Superadmin Dashboard de ListlyUp antes de diseñarlo.

---------------------------------------------------------------------

CONTEXTO

ListlyUp es un marketplace social.
Este módulo es el Superadmin Dashboard (solo para super_admin).

Debe permitir:

• Gobernanza de usuarios (roles, staff, sanciones)
• Moderación global
• Control de planes y capacidades
• Control de feature flags
• Control de tecnologías y providers
• Control de platform_mode y freeze switches
• Auditoría total (audit log)

Debe ser:
• Desktop-first
• Máximo 2 niveles de profundidad
• Sin clicks muertos
• Modular y separable-ready
• Profesional pero no sobre-ingenierizado

---------------------------------------------------------------------

ESTRUCTURA PROPUESTA (DRAFT ACTUAL)

SIDEBAR:
1) Overview
2) Users
3) Moderation
4) System
5) Audit Log

SYSTEM contiene subnav:
- Platform
- Plans
- Features
- Technologies

---------------------------------------------------------------------

RESUMEN FUNCIONAL POR MÓDULO (ACTUAL)

OVERVIEW:
- 6 KPI cards clickeables
- Platform mode badge persistente
- Critical alerts list

USERS:
- Tabla con filtros
- Slide panel con:
  - Summary
  - Role management
  - Plan assignment
  - Sanctions
  - Sessions
  - Recent activity
- Create Staff modal

MODERATION:
- Global report queue
- Slide panel con:
  - Report summary
  - Context preview
  - History
  - Resolve / Reject / Suspend

SYSTEM → PLATFORM:
- platform_mode radios
- freeze toggles

SYSTEM → PLANS:
- Plan table
- Capabilities checklist
- Limits (hard/soft)
- Rollout %
- Assignments link

SYSTEM → FEATURES:
- Feature flags por categoría
- Global toggle
- Plan overrides
- User overrides
- Rollout %

SYSTEM → TECHNOLOGIES:
- Technology registry
- Provider switching
- Version
- Config avanzada (API, endpoint, timeout)
- Shadow mode
- Rollout %
- Dependency warnings

AUDIT LOG:
- Tabla con filtros
- Row expandible con diff

---------------------------------------------------------------------

TAREAS DE AUDITORÍA

1) Arquitectura:
¿Está bien dividida?
¿System es demasiado pesado?
¿Technologies debería vivir separado?
¿Hay redundancias entre Plans y Features?

2) Profundidad:
¿Realmente cumple 2 niveles?
¿Hay riesgo de subcapas invisibles?

3) Sobre-ingeniería:
Para cada uno indica:
Mantener / Simplificar / Postergar

• Rollout % en Plans
• Rollout % en Technologies
• Shadow mode
• Versioning
• Dependency warnings
• SLA indicator
• Session control
• Fallback provider

4) Riesgo MVP:
¿Depende de entidades FUTURE?
¿Asume infraestructura no definida?

5) Anti-dead click:
¿Algún KPI no tiene destino claro?
¿Alguna acción parece decorativa?
¿Algún toggle carece de impacto real?

6) Simplificación estructural propuesta:
Propón una versión más limpia para MVP.
No agregues nuevas features.
Solo simplifica.

---------------------------------------------------------------------

FORMATO DE RESPUESTA ESPERADO

A) Diagnóstico estructural
B) Lista de riesgos
C) Lista de simplificaciones
D) Nueva estructura sugerida (texto)
E) Decisiones que el Product Owner debe tomar

NO DISEÑAR.
NO DIBUJAR.
NO GENERAR UI.

Solo auditoría crítica.

FIN.