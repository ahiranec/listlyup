# =====================================================================
# LISTLYUP — SUPERADMIN DASHBOARD
# FOUNDATIONAL PRINCIPLES VALIDATION (CRITICAL ROUND)
# =====================================================================

INSTRUCCIÓN PRINCIPAL

Actúa como:

• Systems Governance Architect
• SaaS Platform Control Designer
• Enterprise Admin Architecture Reviewer

NO diseñar.
NO generar UI.

Tu tarea es validar si la arquitectura V2.1 respeta los FUNDAMENTOS ESTRUCTURALES INNEGOCIABLES definidos abajo.

Si no los respeta, debes indicarlo claramente.

---------------------------------------------------------------------

ARQUITECTURA ACTUAL (V2.1 RESUMEN)

SIDEBAR:
1) Overview
2) Users
3) Moderation
4) Configuration
   ├─ Platform
   └─ Plans & Features (fusionados)
5) Audit Log

Infrastructure fue eliminado completamente del MVP.
No hay provider switching desde UI.
No hay rollout %.
No hay shadow mode.

---------------------------------------------------------------------

FUNDAMENTOS INNEGOCIABLES

1️⃣ GOBERNANZA
- Cambio de roles
- No permitir 0 super_admin
- Crear staff
- Suspender / banear / reactivar
- Forzar logout
- Todo auditado

2️⃣ MODERACIÓN GLOBAL
- Cola global
- Resolver / rechazar
- Suspender target
- Filtros funcionales
- Sin dead ends

3️⃣ CONTROL DE LANZAMIENTO
- platform_mode
- freeze toggles
- banner visible
- confirmación fuerte
- audit log

4️⃣ PLANES (Modelo SaaS)
- Crear plan dinámico
- Activar/desactivar
- Asignar plan
- Capabilities conectadas a feature_flags
- Límites hard/soft
- Ver usuarios por plan

5️⃣ FEATURE FLAGS (Grupo de Control)
- Global toggle
- Override por plan
- Override por usuario
- Agrupadas por categoría
- Audit log

⚠️ Grupo de control = feature_flag_overrides estructural.

6️⃣ TECHNOLOGY REGISTRY FLEXIBLE
- Agregar nueva tecnología
- Activar/desactivar
- Cambiar provider/API
- Cambiar versión
- Config avanzada
- Audit log

⚠️ Cambio de provider/API sin redeploy es principio declarado.

7️⃣ AUDIT LOG
- Insert-only
- Filtros
- Expand diff
- Registrar cambios críticos

8️⃣ BASE DE DATOS CANÓNICA
- users.role enum seguro
- No permitir 0 super_admin
- Cambios críticos vía backend
- feature_flag_overrides UNIQUE
- system_config protegido
- RLS coherente

9️⃣ UX PROFESIONAL
- Cero clicks muertos
- KPI clickeables
- Confirmaciones donde corresponde
- Máximo 2 niveles
- Slide panels
- Sticky filters

---------------------------------------------------------------------

TAREAS

A) ¿La arquitectura V2.1 respeta TODOS estos fundamentos?
B) Si no, ¿cuáles viola?
C) ¿Eliminar Infrastructure rompe el principio 6?
D) ¿Es posible mantener “provider switching sin redeploy” SIN módulo Infrastructure?
E) ¿Hay contradicción entre simplificación MVP y principios estratégicos?
F) Proponer:
   - Opción 1: Arquitectura mínima que respete todos los fundamentos.
   - Opción 2: Principios que deberían re-clasificarse como FUTURE y no MVP.

No expandir alcance.
No proponer features nuevas.
Solo evaluar coherencia entre principios y arquitectura.

FIN.