====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
SUPERADMIN DASHBOARD — MVP AUDIT + SAFE IMPLEMENTATION
MODE: SAFE MVP CLEANUP
SCOPE: SUPERADMIN DASHBOARD ONLY
====================================================================

CONTEXTO

Ya se cerraron y limpiaron los módulos anteriores del MVP.

Ahora toca revisar y ajustar:

- SuperAdmin Dashboard

La base canónica obligatoria es esta:

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

Haz una auditoría completa del módulo SuperAdmin Dashboard contra el canon MVP y luego implementa SOLO los ajustes necesarios para dejarlo:

- estable
- compilable
- limpio
- 100% MVP-compliant
- sin features OUT_OF_MVP visibles
- sin duplicación con Action Center
- sin automatizaciones falsas o sobrepromesas

====================================================================
ALCANCE
====================================================================

Auditar e implementar SOLO sobre el módulo SuperAdmin Dashboard y sus componentes directamente relacionados.

No tocar otros módulos salvo que una importación mínima sea estrictamente necesaria para compilar.

====================================================================
PRINCIPIOS OBLIGATORIOS
====================================================================

1. SuperAdmin Dashboard NO reemplaza Action Center
2. Overview informa; Users contextualiza; Moderation resuelve
3. No crear sistema paralelo de chat
4. No crear modales nuevos si ya existe chat o Take Action modal
5. IA solo asiste:
   - puede sugerir
   - puede clasificar
   - puede priorizar
   - NO puede resolver automáticamente
6. No mostrar features FUTURE como si fueran reales
7. No mostrar automatizaciones complejas, auto-ban, auto-delete, auto-resolve
8. No expandir el sidebar fuera de:
   - Overview
   - Users
   - Moderation
   - Configuration
   - Audit Log
9. Plans en MVP:
   - Free como operativo real MVP
10. Feature flags visibles/operativos en MVP:
   - voice_input
   - ai_publish_assistant
   - ai_moderation
   - map_provider

====================================================================
EXCLUSIONES MVP QUE DEBES BUSCAR Y ELIMINAR SI APARECEN
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

Si alguna de estas aparece visible o funcional en UI:
→ marcarla
→ removerla o simplificarla
→ dejarla future-ready solo si no queda expuesta

====================================================================
TAREA 1 — AUDITORÍA COMPLETA
====================================================================

Audita el módulo y responde internamente estas preguntas antes de implementar:

A. MATCH OK
- Qué sí cumple exactamente con el MVP

B. FALTANTES
- Qué debería estar y no está

C. SOBRANTES
- Qué está visible o funcional y es OUT_OF_MVP

D. INCONSISTENCIAS
- duplicación con Action Center
- Overview resolviendo en vez de informar
- Users resolviendo en vez de contextualizar
- Moderation no siendo el centro operativo real
- IA demasiado autónoma
- flags no canónicos
- planes o providers no alineados

E. RIESGOS DE MODELO
- duplicación de sistemas
- overengineering
- automatizaciones peligrosas
- falsa sensación de features operativas

====================================================================
TAREA 2 — IMPLEMENTACIÓN SEGURA
====================================================================

Después de auditar, implementa de manera segura y estable.

Haz SOLO lo necesario para cumplir MVP.

Prioridad de implementación:

PHASE 1 — Sidebar y estructura global
- dejar SOLO 5 secciones canónicas
- eliminar tabs/secciones extra si existen
- verificar orden correcto

PHASE 2 — Overview
- debe informar solamente
- mantener solo KPIs canónicos
- eliminar acciones de moderación directa desde Overview si existen

PHASE 3 — Users
- debe contextualizar
- mantener tabla/listado, búsqueda, filtros, columnas correctas
- User Detail tabs solo:
  - Summary
  - Roles
  - Plan
  - Security
  - Sanctions
- eliminar acciones impropias si Users está resolviendo casos directamente

PHASE 4 — Moderation
- debe ser el centro operativo real
- Moderation Queue con columnas canónicas
- Case Detail reutilizando chat existente + Take Action modal
- eliminar modales paralelos o flows duplicados
- mantener ai_suggestion solo como asistencia, no como resolución autónoma

PHASE 5 — Configuration
- Platform controls canónicos
- Plans section simple y MVP
- solo Free operativo real MVP
- Feature Flags solo 4 oficiales
- Infrastructure Providers solo los canónicos/relevantes MVP
- remover flags masivos, providers irrelevantes o complejos, monetización innecesaria

PHASE 6 — Audit Log
- mantener trazabilidad total de acciones críticas
- simplificar si está sobrediseñado, pero NO eliminarlo

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO ROMPER:
- navegación del dashboard
- tablas/listados existentes MVP
- chat existente
- Take Action modal existente
- integración con flags reales
- estructura base del dashboard si ya está razonablemente alineada

NO CREAR:
- nuevos modales
- nuevos sistemas de mensajería
- nuevas rutas complejas
- nuevas automatizaciones
- nuevos tipos de flags fuera del canon MVP

PRESERVAR FUTURE-READY SOLO SI:
- no queda visible en la UI MVP
- no rompe compile
- no introduce botones mentirosos
- no deja dead clicks

====================================================================
COSAS QUE DEBES VERIFICAR EXPLÍCITAMENTE
====================================================================

1. Overview
- solo KPIs informativos
- no acciones de resolución directa
- no mezcla con Moderation

2. Users
- tabla correcta
- columnas correctas
- User Detail tabs correctos
- Summary con:
  - reports_count
  - warnings_count
  - moderation_actions_count
  - risk_label

3. Moderation
- queue correcta
- columnas correctas:
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
- Case Detail con header correcto
- usa chat existente
- usa Take Action modal existente
- NO auto-resolve
- NO auto-ban
- NO auto-delete

4. Configuration
- Platform section correcta
- Plans section simple y MVP
- solo Free operativo real MVP
- Feature Flags solo:
  - voice_input
  - ai_publish_assistant
  - ai_moderation
  - map_provider
- Providers solo:
  - AI Provider
  - Moderation Engine
  - Maps Provider
  - opcional Email Provider

5. Audit Log
- presente
- útil
- sin sobrecomplejidad innecesaria

====================================================================
OUTPUT REQUERIDO
====================================================================

Quiero que implementes y luego reportes SOLO en este formato:

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
- sin duplicación con Action Center
- sin IA autónoma
- sin botones mentirosos
- sin clicks muertos
- production ready

====================================================================
FIN
====================================================================