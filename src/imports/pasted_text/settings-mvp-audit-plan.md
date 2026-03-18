====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
SETTINGS — MVP AUDIT + SAFE IMPLEMENTATION
MODE: AUDIT FIRST, THEN IMPLEMENT ONLY WHAT IS REQUIRED
PRIORITY: STABLE / NO REGRESSIONS / NO DUPLICATION
====================================================================

CONTEXTO CANÓNICO OBLIGATORIO

Usa como única fuente de verdad el Documento Maestro Canónico MVP Final v2 ya definido para ListlyUp.

Para SETTINGS, el MVP canónico dice:

PROPÓSITO
- preferencias personales del usuario
- NO centro de negocio
- NO centro operativo de notificaciones
- NO monetización

SECCIONES FINALES MVP
1. Security & Privacy
2. Notifications
3. AI Smart Tools
4. About & Legal
5. Data Storage

SECURITY & PRIVACY
- Change password
- Active sessions
- Logout from all devices

NOTIFICATIONS
- Sound ON/OFF
- Desktop / Browser Notifications
- visual only
- Coming Soon

REGLAS DE NOTIFICATIONS
- Settings NO apaga el sistema de notificaciones
- solo cambia la forma del aviso
- Sound solo suena con evento nuevo
- NO suena al cargar, abrir Action Center, navegar o por eventos viejos

AI SMART TOOLS
- solo aparece si SuperAdmin habilitó feature flag
- si NO está habilitado → la sección NO aparece
- si está habilitado → el usuario puede activarlo/desactivarlo
- solo mostrar features reales aprobados

REGLA CANÓNICA FLAGS + SETTINGS
- primero existe habilitación global por SuperAdmin
- luego puede existir preferencia personal ON/OFF del usuario
- si el flag global está OFF, la feature no se muestra
- si el flag global está ON, el usuario puede verla y decidir su preferencia personal

ABOUT & LEGAL
- App version
- Terms of Service
- Privacy Policy
- Community Guidelines
- Help Center
- Contact Support

DATA STORAGE
- manejo básico de datos
- cache
- clear local data
- export data (si existe)
- storage summary simple

OUT_OF_MVP EXPLÍCITO EN SETTINGS
- 2FA
- security logs complejos
- global ON/OFF notifications
- email notifications
- push notifications reales
- trade offers
- job alerts
- price change logic compleja
- Saved Searches
- planes / upgrades / monetización
- toggles que dupliquen Action Center
- mostrar features IA en gris si no están habilitadas

PRINCIPIOS ADICIONALES OBLIGATORIOS
- no duplicación con Profile
- no duplicación con Action Center
- no paywalls
- no placeholders engañosos
- no features future expuestas prematuramente
- mantener compatibilidad con feature flags globales y preferencia personal del usuario
- UI simple, directa, MVP-only

====================================================================
OBJETIVO DE ESTE TRABAJO
====================================================================

Quiero que hagas DOS COSAS, en este orden:

1. AUDIT COMPLETO de Settings contra el canónico MVP.
2. IMPLEMENTACIÓN SEGURA de todos los fixes necesarios para dejar Settings 100% MVP compliant.

NO quiero solo opinión.
NO quiero solo resumen.
NO quiero cambios parciales.
NO quiero que dejes cosas pendientes sin listarlas explícitamente.

Quiero:
- auditoría exhaustiva
- plan exacto
- implementación segura
- validación final
- reporte claro para re-auditar

====================================================================
PARTE 1 — AUDITORÍA OBLIGATORIA
====================================================================

Primero, revisa el módulo completo de Settings y entrega un audit con esta estructura EXACTA:

1. MATCH OK (ALINEADO CON MVP)
- listar todo lo que sí cumple

2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
- listar todo lo requerido por el canónico y ausente

3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
- listar todo lo visible o funcional que esté fuera del MVP
- citar archivo y, si puedes, líneas aproximadas
- explicar por qué rompe el canónico

4. INCONSISTENCIAS (CRÍTICO)
- duplicaciones con Profile
- duplicaciones con Action Center
- flags mal aplicados
- features IA visibles cuando no deberían
- lógica de notifications mal interpretada
- cualquier contradicción entre UI y canónico

5. RIESGOS DE MODELO
- flags globales vs user settings
- duplicación de eventos/notificaciones
- settings que parecen apagar el sistema en vez de cambiar solo el canal/formato
- exposure de future features
- monetización / plans leakage
- settings que deberían vivir en otro módulo

6. VEREDICTO FINAL
- % estimado de cumplimiento MVP
- si requiere ajustes o no
- lista exacta de bloques a tocar

IMPORTANTE:
No inventes.
No omitas nada.
Si hay un bloque ambiguo, igual repórtalo.

====================================================================
PARTE 2 — IMPLEMENTACIÓN SEGURA
====================================================================

Después del audit, implementa TODOS los fixes necesarios para dejar Settings 100% MVP compliant.

Hazlo con enfoque quirúrgico:
- primero remover/ocultar OUT_OF_MVP
- luego corregir estructura
- luego ajustar flags
- luego validar

NO romper:
- navegación
- router
- callbacks
- state global
- feature flags
- otras páginas
- Profile
- Action Center
- SuperAdmin Dashboard

====================================================================
LO QUE DEBES BUSCAR Y CORREGIR SÍ O SÍ
====================================================================

A. ESTRUCTURA DE SECCIONES
Verificar que la página final tenga SOLO estas secciones:
1. Security & Privacy
2. Notifications
3. AI Smart Tools
4. About & Legal
5. Data Storage

Si hay otras secciones:
- eliminarlas
- fusionarlas correctamente
- o moverlas fuera si corresponde

B. SECURITY & PRIVACY
Debe contener SOLO:
- Change password
- Active sessions
- Logout from all devices

Remover / ocultar si existen:
- 2FA
- security logs avanzados
- device trust complejo
- recovery codes
- biometrics avanzados si no están aprobados
- cualquier módulo enterprise o hardening no-MVP

C. NOTIFICATIONS
Debe contener SOLO:
- Sound ON/OFF
- Desktop / Browser Notifications
- visual only
- Coming Soon

Regla crítica:
- Settings NO puede apagar el sistema de notificaciones
- solo puede cambiar la forma del aviso
- NO deben existir toggles tipo:
  - all notifications on/off
  - disable Action Center
  - email notifications
  - push notifications reales
  - trade offers
  - price alerts
  - job alerts
  - saved searches alerts

Si existe algo de eso:
- removerlo
- dejar Settings solo con la semántica canónica

D. AI SMART TOOLS
Verificar lógica correcta:
- si feature flag global está OFF → la sección NO aparece
- si feature flag global está ON → la sección aparece
- si aparece → el usuario puede activar/desactivar preferencia personal
- NO mostrar features IA grises, locked, fake, “coming soon” dentro de esta sección, salvo que estén realmente aprobadas
- NO mostrar herramientas IA no habilitadas por SuperAdmin

E. ABOUT & LEGAL
Debe contener SOLO:
- App version
- Terms of Service
- Privacy Policy
- Community Guidelines
- Help Center
- Contact Support

Si hay extras no-MVP:
- removerlos

F. DATA STORAGE
Debe contener SOLO lo básico:
- cache
- clear local data
- export data (si existe)
- storage summary simple

Si hay módulos avanzados:
- removerlos

G. DUPLICACIONES CON PROFILE
Settings NO debe duplicar cosas que ya viven en Profile, especialmente:
- account type
- personal info
- username
- profile picture
- publishing defaults
- language/region si ya están definidos como parte estructural de Profile y NO corresponde duplicarlos aquí

Si aparecen duplicados:
- removerlos de Settings

H. DUPLICACIONES CON ACTION CENTER
Settings NO debe duplicar:
- sistema operativo de notificaciones
- inbox
- filtros de acciones
- toggles que alteren Action Center como fuente de eventos

I. MONETIZACIÓN / PLANES
Eliminar si existe:
- upgrades
- plan cards
- premium locks
- paywalls
- pricing
- subscriptions center si no corresponde al MVP canónico actual

J. SAVED SEARCHES
Eliminar si aparece.
Está explícitamente OUT_OF_MVP.

====================================================================
PLAN DE IMPLEMENTACIÓN — FORMA DE TRABAJAR
====================================================================

Haz el trabajo en este orden:

PHASE 1 — AUDIT + MAPA DE CAMBIOS
- identificar archivos exactos
- identificar bloques a remover
- identificar bloques a preservar
- identificar riesgos de regresión

PHASE 2 — OUT_OF_MVP CLEANUP
- remover secciones no permitidas
- remover toggles incorrectos
- remover plan/paywall/upgrade leakage
- remover duplicaciones con Profile y Action Center

PHASE 3 — MVP STRUCTURE FIX
- dejar solo las 5 secciones canónicas
- asegurar jerarquía y labels correctos
- asegurar copy simple y no engañoso

PHASE 4 — FLAGS / LOGIC FIX
- validar AI Smart Tools con flag global + preferencia personal
- validar Notifications con semántica correcta
- validar que ningún setting apague el sistema de eventos

PHASE 5 — VALIDATION
- compile
- render
- navegación
- estados
- flags
- ausencia de leakage no-MVP

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO TOCAR salvo que sea estrictamente necesario:
- App router principal
- Action Center page
- Profile pages
- SuperAdmin Dashboard pages
- feature flag backend contracts
- global event model
- auth core
- shared legal pages si ya existen y están bien

SI TOCAS algo compartido:
- debe ser solo si es imprescindible
- debe quedar backward compatible
- debes explicarlo en el reporte final

NO crear:
- flujos nuevos
- modales nuevos
- lógica paralela
- placeholders falsos
- features premium simuladas
- secciones vacías sin sentido

====================================================================
OUTPUT OBLIGATORIO
====================================================================

Quiero la respuesta final con esta estructura EXACTA:

1. FILES MODIFIED
- lista exacta

2. FILES DELETED / DEPRECATED
- si aplica

3. AUDIT SUMMARY
- MATCH OK
- FALTANTES
- SOBRANTES
- INCONSISTENCIAS
- RIESGOS

4. CHANGES APPLIED
- qué se removió
- qué se corrigió
- qué se preservó por seguridad

5. VALIDATION
- compile OK / no
- navigation OK / no
- no broken imports
- no broken types
- no regressions
- AI flags OK
- notifications semantics OK
- no profile duplication
- no action center duplication

6. FINAL SETTINGS STRUCTURE
- mostrar cómo quedó la página final

7. ESTADO FINAL
- porcentaje de cumplimiento MVP
- si queda listo para cerrar o no

====================================================================
CHECKLIST FINAL OBLIGATORIO
====================================================================

Antes de responder, verificar TODO esto:

- Settings tiene SOLO 5 secciones canónicas
- no hay 2FA
- no hay security logs complejos
- no hay global notifications ON/OFF
- no hay email notifications
- no hay push notifications reales
- no hay trade offers
- no hay job alerts
- no hay price change alerts
- no hay Saved Searches
- no hay upgrades / monetización / plans leakage
- AI Smart Tools solo aparece si flag global está ON
- si flag global está OFF, AI Smart Tools no aparece
- no se muestran AI features grises o fake cuando están OFF
- Settings no duplica Profile
- Settings no duplica Action Center
- Security & Privacy quedó simple
- Notifications quedó con semántica correcta
- About & Legal quedó limpio
- Data Storage quedó básico
- compile OK
- navegación OK
- cero botones mentirosos
- cero clicks muertos

====================================================================
FIN
====================================================================