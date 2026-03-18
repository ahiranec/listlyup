# =====================================================================
# LISTLYUP — SUPERADMIN DASHBOARD
# FINAL IMPLEMENTATION + DESKTOP WIREFRAME GENERATION
# STRUCTURE LOCKED — UX OPERATIONAL HARDENING INCLUDED
# =====================================================================

ROL

Actúa como:

• Senior SaaS Platform Architect
• Governance Dashboard Designer
• Production Stability Engineer
• Desktop UX Systems Specialist

⚠️ ESTE PROMPT NO ES EXPLORATORIO
⚠️ NO REDISEÑAR ARQUITECTURA
⚠️ NO CAMBIAR PROFUNDIDAD
⚠️ NO AGREGAR FEATURES
⚠️ NO ELIMINAR NADA VALIDADO
⚠️ NO SEPARAR PLANS Y FEATURES
⚠️ NO MODIFICAR SIDEBAR
⚠️ NO EXPANDIR ALCANCE

La arquitectura está CONGELADA.
Tu tarea es:

1) Implementar hardening técnico aprobado.
2) Asegurar estabilidad operacional.
3) Generar wireframes DESKTOP LOW FIDELITY completos.
4) Aplicar UX operacional obligatorio sin alterar estructura.

---------------------------------------------------------------------
I. ARQUITECTURA CONGELADA (NO MODIFICAR)
---------------------------------------------------------------------

SIDEBAR (5 módulos exactos)

1) Overview
2) Users
3) Moderation
4) Configuration
5) Audit Log

Configuration (3 subnavs exactos)

• Platform
• Plans & Features (fusionado)
• Infrastructure (Hybrid)

Profundidad máxima: 3 niveles.
Tabs máximo por panel:
- Users: 5
- Plans panel: 3
- Moderation panel: 2

CERO dead clicks.
CERO loops circulares.

---------------------------------------------------------------------
II. FUNDAMENTOS OBLIGATORIOS (DEBEN PERMANECER)
---------------------------------------------------------------------

1️⃣ Gobernanza completa (roles, staff, ban, logout)
2️⃣ Moderación global con contexto inline
3️⃣ Platform mode + freeze + banner persistente
4️⃣ Planes dinámicos + limits hard/soft
5️⃣ Feature flags como grupo de control
6️⃣ Infrastructure Hybrid con provider switching
7️⃣ Audit log expandible con diff
8️⃣ Backend enforcement (no UI-only validation)
9️⃣ UX profesional sin profundidad innecesaria

---------------------------------------------------------------------
III. AJUSTES DE ESTABILIDAD (OBLIGATORIOS)
---------------------------------------------------------------------

1️⃣ Infrastructure switching debe ser ASÍNCRONO

- Test connection obligatorio antes de confirmar.
- Confirm → dispara deployment asíncrono.
- Retorna deploymentId.
- Mostrar estados:
    • Deploying…
    • Deployment successful
    • Deployment failed
- NO bloquear UI global.
- Registrar metadata completa en audit log:
    technology
    from_provider
    to_provider
    deploymentId
    deploymentUrl
    timestamp

2️⃣ Feature flag dependencies = WARNING (NO BLOQUEANTE)

- Mostrar advertencia visual.
- Link unidireccional a Infrastructure.
- Backend valida runtime.
- NO impedir toggle en UI.

3️⃣ Audit log debe ser insert-only

- Expand diff inline (before/after)
- Filtros funcionales
- Actor link → Users panel
- Target link → contexto correspondiente

---------------------------------------------------------------------
IV. CONFIRMATION SYSTEM (NO CAMBIAR)
---------------------------------------------------------------------

🔴 CRITICAL → Type-to-confirm
🟡 HIGH → Checkboxes obligatorias
🟢 MEDIUM → Modal simple
⚪ LOW → Sin confirmación

Aplicar exactamente como definido previamente.

---------------------------------------------------------------------
V. DESKTOP WIREFRAME GENERATION (OBLIGATORIO)
---------------------------------------------------------------------

Generar wireframes LOW FIDELITY completos para Desktop.

Layout base:

• Sidebar fijo izquierda (width consistente).
• Header superior opcional solo si necesario.
• Main content area responsive.
• Max content width definido.
• Grid consistente.
• Espaciado uniforme.

Debe incluir:

1️⃣ OVERVIEW

- KPI cards (claramente clickeables).
- Cada KPI con destino funcional.
- Indicador visual hover.
- Sin métricas decorativas.

2️⃣ USERS

- Tabla con search + filtros sticky.
- Slide panel (derecha) con 5 tabs.
- Indicadores visuales:
    🟢 Active
    🟡 Suspended
    🔴 Banned
- “Last critical change” visible.
- Session indicator.
- Force logout botón visible pero no dominante.

3️⃣ MODERATION

- Queue table clara.
- Filtros visibles.
- Slide panel con 2 tabs.
- Preview de contenido inline.
- Acciones primarias visibles.
- Toast al resolver.
- Si filtro=open → row desaparece con feedback claro.

4️⃣ CONFIGURATION → PLATFORM

- Platform mode badge prominente.
- Freeze toggles visibles.
- Banner global persistente cuando freeze activo.
- Confirmaciones fuertes aplicadas.

5️⃣ CONFIGURATION → PLANS & FEATURES

- Vista dual:
    Plan list izquierda.
    Feature grid derecha.
- Categorías colapsables.
- Tooltips para hard vs soft limits.
- Plan panel con 3 tabs.
- Cambios sincronizados bidireccionalmente.
- Visualización clara de overrides.

6️⃣ CONFIGURATION → INFRASTRUCTURE

- Tabla simple.
- Botones [Switch] [Test].
- Modal con checkboxes.
- Estado deployment visible.
- Warning de impacto (~2min).
- API keys masked.
- No UI técnica estilo DevOps.

7️⃣ AUDIT LOG

- Tabla con filtros estructurados.
- Expand diff inline.
- Sintaxis clara.
- No editable.

---------------------------------------------------------------------
VI. UX OPERACIONAL OBLIGATORIO (SIN CAMBIAR ESTRUCTURA)
---------------------------------------------------------------------

Implementar:

• Hover states claros en elementos clickeables.
• Highlight de fila al navegar desde link cruzado.
• Empty states claros con mensaje accionable.
• Loading skeletons.
• Error states con retry.
• Severity coding consistente:
    Verde = OK
    Amarillo = Warning
    Rojo = Critical
• Banner freeze sticky en TODAS las vistas.
• Deployment status indicator visible.
• Tooltips para límites hard vs soft.
• Dependencias visualmente marcadas.
• No scroll infinito sin paginación.
• Tablas con paginación server-side.
• No acciones ambiguas.
• No botones decorativos.
• No métricas no clickeables.
• No sobrecargar paneles.
• No más de 3 acciones primarias por contexto.

---------------------------------------------------------------------
VII. ACCESIBILIDAD MÍNIMA
---------------------------------------------------------------------

• Focus states visibles.
• Keyboard navigable.
• Botones con aria-label.
• Contraste suficiente.
• No depender solo de color para severidad.

---------------------------------------------------------------------
VIII. PROHIBIDO
---------------------------------------------------------------------

❌ No mover módulos.
❌ No agregar nuevos módulos.
❌ No cambiar profundidad.
❌ No separar Plans y Features.
❌ No eliminar Infrastructure.
❌ No agregar hot reload.
❌ No agregar rollout %.
❌ No agregar fallback automático.
❌ No expandir alcance.

---------------------------------------------------------------------
IX. VALIDACIÓN FINAL OBLIGATORIA
---------------------------------------------------------------------

Tu respuesta debe confirmar explícitamente:

1) Architecture unchanged.
2) Depth unchanged.
3) No new modules added.
4) Stability adjustments implemented.
5) Desktop wireframes generated.
6) UX operational hardening applied.
7) No regression introduced.
8) System stable for production hardening.

Final line obligatoria:

IMPLEMENTATION LOCKED — DESKTOP WIREFRAMES COMPLETE — STABLE BUILD READY

No proponer mejoras.
No abrir discusiones.
No expandir scope.

---------------------------------------------------------------------
X. DOCTRINA IRRENUNCIABLE — NON-NEGOTIABLE PRINCIPLES
---------------------------------------------------------------------

Las siguientes 5 capacidades son FUNDAMENTALES.
Si alguna no existe funcionalmente, la implementación se considera inválida.

1️⃣ GRUPO DE CONTROL REAL (Feature Flags Architecture)

• Debe existir feature_flag_overrides a nivel:
    - Global
    - Plan
    - Usuario individual
• Debe existir tabla intermedia consistente (single source of truth).
• Debe soportar:
    - Overrides por usuario
    - Overrides por plan
    - Categorización escalable
• No puede depender solo de UI.
• Backend debe evaluar flags en runtime.

2️⃣ TECHNOLOGY REGISTRY DINÁMICO (Hybrid)

• Debe existir registry central de tecnologías.
• Provider switching desde UI.
• API keys actualizables.
• Test connection obligatorio.
• Trigger de deployment asíncrono.
• Audit metadata obligatorio.
• No DevOps UI compleja.
• No hot reload no controlado.

3️⃣ PLATFORM MODE + FREEZE CONTROL

• platform_mode enum obligatorio.
• Freeze granular:
    - registrations
    - publishing
    - group creation
• Banner persistente global cuando freeze activo.
• Confirmaciones fuertes.
• Audit log obligatorio.
• Backend enforcement.

4️⃣ AUDIT LOG COMO FUENTE DE VERDAD

• Insert-only.
• Expand diff before/after.
• Filtros estructurados.
• Registro obligatorio para:
    - roles
    - plans
    - flags
    - freezes
    - bans
    - provider switches
    - deployments
• Ninguna acción crítica sin registro.

5️⃣ ESTABILIDAD OPERACIONAL

• Ningún cambio crítico solo validado en frontend.
• No permitir estados inconsistentes.
• No permitir 0 super_admin.
• No bloquear UI global innecesariamente.
• Manejar:
    - loading
    - empty
    - error
    - success
• Paginación server-side en tablas grandes.
• No polling agresivo.
• No race conditions en cambios críticos.

---------------------------------------------------------------------
DOCTRINE ENFORCEMENT

Si cualquier punto anterior es omitido,
modificado,
debilitado,
o reemplazado por aproximaciones superficiales,

la implementación debe considerarse NO CONFORME.

---------------------------------------------------------------------

FIN.