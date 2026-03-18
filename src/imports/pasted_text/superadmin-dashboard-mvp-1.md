====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
SUPERADMIN DASHBOARD — MVP SAFE CLEANUP
MODE: SAFE MVP ALIGNMENT
SCOPE: SUPERADMIN DASHBOARD ONLY
====================================================================

CONTEXTO

Ya se cerraron los demás módulos del MVP.
Ahora toca revisar y ajustar el módulo:

- SuperAdmin Dashboard

La referencia canónica obligatoria es esta:

SUPERADMIN DASHBOARD — MVP CANÓNICO

Propósito:
- control global del sistema
- supervisión
- moderación global
- configuración
- trazabilidad

Sidebar final:
1. Overview
2. Users
3. Moderation
4. Configuration
5. Audit Log

Overview incluye:
- Total Users
- Active Staff
- Pending Reports
- Active Feature Flags
- Critical Alerts
- Open Cases
- High Priority Cases

Users incluye:
- tabla/listado
- búsqueda
- filtros
- columnas:
  - user
  - role
  - status
  - plan
  - sessions
  - last active

User Detail tabs:
- Summary
- Roles
- Plan
- Security
- Sanctions

Summary agrega:
- reports_count
- warnings_count
- moderation_actions_count
- risk_label:
  - low
  - medium
  - high

Moderation es centro operativo real:

Moderation Queue incluye:
- reporter
- target
- reason
- priority
- created
- SLA
- preview
- status
- source
- ai_suggestion

Case Detail reutiliza:
- chat existente
- Take Action modal
- contexto existente

Header extra en Case Detail:
- case_type
- source
- report_reason
- priority
- SLA
- ai_suggestion
- target summary
- risk label

Take Action disponible según target:
- Ban User
- Delete Content
- Issue Warning
- Close Case
- Remove Group Content (si aplica)

Configuration incluye:

Platform:
- Public
- Limited Beta
- Closed Beta
- Freeze New Registrations
- Freeze Publishing
- Freeze Group Creation

Plans:
- Free como operativo real MVP

Feature Flags oficiales:
1. voice_input
2. ai_publish_assistant
3. ai_moderation
4. map_provider

Infrastructure Providers:
- AI Provider
- Moderation Engine
- Maps Provider
- opcional Email Provider

Audit Log:
- trazabilidad total de acciones críticas

Reglas:
- no reemplaza Action Center
- no crea sistema paralelo
- no modales nuevos
- IA es asistiva, no autónoma

Regla adicional de IA en MVP:
- la IA en MVP no requiere una arquitectura compleja de persistencia
- basta con feature flags y metadata mínima cuando haga sentido operativo
- en moderation, ai_moderation puede sugerir, clasificar y priorizar, pero no resolver de forma autónoma

====================================================================
OBJETIVO
====================================================================

Haz auditoría completa del SuperAdmin Dashboard contra el canon MVP y luego implementa SOLO los ajustes necesarios para dejarlo:

- estable
- compilable
- limpio
- 100% MVP compliant
- sin features OUT_OF_MVP visibles
- sin duplicación con Action Center
- sin IA autónoma
- sin clicks muertos
- production ready

====================================================================
EXCLUSIONES MVP QUE DEBES DETECTAR Y ELIMINAR SI APARECEN
====================================================================

OUT_OF_MVP en SuperAdmin Dashboard:

- secciones adicionales al sidebar definido
- moderar directamente desde Overview
- Users como centro principal de moderación
- pantalla paralela nueva para resolución
- sistema nuevo de mensajes
- modal nuevo de resolución
- planes múltiples operativos
- feature flags masivos
- infraestructura no crítica
- automations complejas
- auto-ban por IA
- auto-delete masivo por IA
- auto-resolve final por IA

Si algo de esto aparece visible o funcional:
→ removerlo o simplificarlo
→ dejarlo future-ready solo si NO queda expuesto en UI MVP

====================================================================
TAREA 1 — AUDITORÍA
====================================================================

Primero audita y determina:

A. MATCH OK
- qué ya cumple exactamente con el MVP

B. FALTANTES
- qué debería existir y no está

C. SOBRANTES
- qué está visible y es OUT_OF_MVP

D. INCONSISTENCIAS
- Overview resolviendo en vez de informar
- Users resolviendo en vez de contextualizar
- Moderation no siendo el centro operativo real
- IA demasiado autónoma
- flags no canónicos
- planes o providers no alineados
- duplicación con Action Center

E. RIESGOS
- sobrecomplejidad
- falsa sensación de automatización
- sistemas paralelos
- future features visibles

====================================================================
TAREA 2 — IMPLEMENTACIÓN SEGURA
====================================================================

Luego implementa SOLO lo necesario.

PHASE 1 — Sidebar y estructura global
- dejar SOLO:
  - Overview
  - Users
  - Moderation
  - Configuration
  - Audit Log
- verificar orden exacto
- remover cualquier sección extra

PHASE 2 — Overview
- debe informar solamente
- mantener solo KPIs canónicos
- NO acciones de moderación directa
- NO resolución de casos
- NO shortcuts engañosos a acciones destructivas

PHASE 3 — Users
- debe contextualizar, no resolver
- mantener tabla/listado, búsqueda, filtros, columnas canónicas
- User Detail tabs solo:
  - Summary
  - Roles
  - Plan
  - Security
  - Sanctions
- Summary debe incluir:
  - reports_count
  - warnings_count
  - moderation_actions_count
  - risk_label

PHASE 4 — Moderation
- debe ser el centro operativo real
- Moderation Queue con campos canónicos:
  - reporter
  - target
  - reason
  - priority
  - created
  - SLA
  - preview
  - status
  - source
  - ai_suggestion
- Case Detail reutiliza:
  - chat existente
  - Take Action modal existente
- NO crear modales nuevos
- IA solo asistiva:
  - sugerir
  - clasificar
  - priorizar
  - NO resolver automáticamente

PHASE 5 — Configuration
Subsecciones:
- Platform
- Plans
- Features
- Infrastructure

Platform:
- Public
- Limited Beta
- Closed Beta
- Freeze New Registrations
- Freeze Publishing
- Freeze Group Creation

Plans:
- Free como operativo real MVP
- si existen Pro / Enterprise / Internal, dejarlos future-ready o secundarios, NO como operativos principales del MVP

Features:
- dejar SOLO los 4 feature flags canónicos:
  - voice_input
  - ai_publish_assistant
  - ai_moderation
  - map_provider
- eliminar flags extra visibles
- no mostrar sistema masivo de flags no canónicos

Infrastructure:
- dejar SOLO providers MVP:
  - AI Provider
  - Moderation Engine
  - Maps Provider
  - opcional Email Provider
- remover o esconder providers no críticos del MVP

PHASE 6 — Audit Log
- mantener Audit Log
- asegurar trazabilidad de acciones críticas
- simplificar si está sobrecargado, pero NO eliminar

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO ROMPER:
- navegación del dashboard
- paneles existentes
- chat existente
- Take Action modal existente
- integración real con flags
- estructura base que ya esté alineada

NO CREAR:
- sistemas paralelos
- nuevos modales
- nuevas rutas innecesarias
- automatizaciones falsas
- botones sin backend o sin efecto real

PRESERVAR FUTURE-READY SOLO SI:
- no queda visible en la UI MVP
- no rompe compile
- no deja dead clicks
- no genera confusión

====================================================================
VALIDACIÓN OBLIGATORIA
====================================================================

Antes de responder, verificar:

- compile OK
- sidebar exacto con 5 secciones
- overview solo informativo
- users contextualiza correctamente
- moderation opera correctamente
- configuration muestra solo MVP visible
- audit log presente
- no OUT_OF_MVP visible
- no AI autónoma
- no duplicación con Action Center
- no clicks muertos

====================================================================
OUTPUT REQUERIDO
====================================================================

Responder SOLO en este formato:

1. FILES MODIFIED
2. FILES LEFT INTACT
3. MATCH OK
4. REMOVED FROM UI
5. REMOVED FROM CODE
6. FIXES APPLIED
7. VALIDATION
   - compile OK / not OK
   - sidebar OK
   - overview OK
   - users OK
   - moderation OK
   - configuration OK
   - audit log OK
   - no OUT_OF_MVP visible
8. ESTADO FINAL

====================================================================
CRITERIO FINAL DE ÉXITO
====================================================================

El módulo debe quedar:

- 100% MVP compliant
- sin features OUT_OF_MVP visibles
- sin IA autónoma
- sin duplicación con Action Center
- sin botones mentirosos
- sin clicks muertos
- production ready

====================================================================
FIN
====================================================================