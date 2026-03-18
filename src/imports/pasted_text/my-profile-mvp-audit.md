====================================================================
LISTLYUP — MY PROFILE — MVP AUDIT + SAFE IMPLEMENTATION PROMPT
MODE: AUDIT FIRST, THEN IMPLEMENT ONLY WHAT IS CONFIRMED
SCOPE: MY PROFILE
PRIORITY: MVP CANONICAL COMPLIANCE
====================================================================

TOMA COMO FUENTE DE VERDAD EXCLUSIVA ESTE CANÓNICO MVP:

- MY PROFILE — MVP CANÓNICO
- EXCLUSIONES MVP — MY PROFILE — OUT_OF_MVP
- PRINCIPIOS CANÓNICOS DEL SISTEMA
- AJUSTES DE COHERENCIA ACORDADOS

NO INVENTES ALCANCE.
NO AGREGUES FEATURES.
NO REDISEÑES POR GUSTO.
NO METAS FUTURE EN UI MVP.

====================================================================
OBJETIVO
====================================================================

Quiero que audites y luego implementes de forma SEGURA, ESTABLE y QUIRÚRGICA el módulo **My Profile** para dejarlo 100% alineado con el MVP canónico.

IMPORTANTE:
- Primero audita TODO el módulo My Profile.
- Luego implementa SOLO lo necesario para dejarlo MVP-compliant.
- Antes de entregarme resultados finales, verifica que TODO compile, que no se haya roto nada y que no haya referencias muertas.
- Debes entregar al final un REPORTE COMPLETO para poder re-auditar.

====================================================================
FUENTE CANÓNICA — MY PROFILE
====================================================================

MY PROFILE — MVP CANÓNICO:

Propósito:
- identidad del usuario
- defaults de publicación
- configuración personal básica para publicar

Secciones:
1. Account
2. Publishing
3. Preferences

Account incluye:
- Account Type
- Personal
- Business
- Account & Verification
- Email
- Phone
- Username
- Personal Information
- Name
- Profile picture
- Bio

Reglas Account Type:
- Personal y Business existen
- no cambian comportamiento
- no desbloquean features
- bajo Business: “Advanced features (coming soon)”

Publishing incluye:
- Publishing Defaults
- default contact method
- delivery options / access defaults
- visibility
- location
- Saved Addresses
- lista simple
- botón Add Address

Setup Progress:
- se muestra una sola vez dentro de Publishing

Preferences incluye:
- Language
- Region

Reglas clave:
- usuario publica siempre como persona
- organization_id = NULL en uso MVP
- UI simple y directa
- sin roles
- sin organizations en UI

Modelo canónico de location:
- profile_location = ubicación por defecto del usuario para publicar
- listing_location = ubicación final persistida en cada listing
- Home / Map / Filters / Listing Detail usan listing_location
- Profile usa profile_location
- cambios futuros en profile_location no modifican listings ya publicados

OUT_OF_MVP — MY PROFILE:
- Organizations en UI
- Roles
- Store mode
- Agency mode
- publicación como tienda
- memberships
- lógica avanzada de negocio
- banner superior amarillo
- duplicación de progress
- textos explicativos largos

====================================================================
LO QUE NECESITO DE LA AUDITORÍA
====================================================================

Quiero un reporte EXACTO con esta estructura:

1. MATCH OK (ALINEADO CON MVP)
- lista de todo lo que sí cumple

2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
- todo lo que falta según canónico MVP

3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
- todo lo visible o implementado que viola el MVP
- incluye archivos, componentes, props, fields, secciones, banners, toggles, cards, tabs, badges, textos, flows o lógica

4. INCONSISTENCIAS (CRÍTICO)
- si hay mezcla entre profile y settings
- si hay duplicación de progress
- si hay mezcla entre profile_location y listing_location
- si hay lógica de org/store/agency/roles
- si Business está desbloqueando features reales
- si hay textos o estructuras que sugieren capacidades no MVP

5. RIESGOS DE MODELO / ARQUITECTURA
- especialmente:
  - duplicación con Settings
  - profile_location vs listing_location mal entendidos
  - defaults de publicación mal modelados
  - organizations visibles indirectamente
  - account type con comportamiento indebido
  - progress duplicado o fuera de Publishing

6. SAFE IMPLEMENTATION PLAN
- por fases
- quirúrgico
- estable
- sin romper navegación
- sin romper publish flow
- sin romper defaults
- sin romper guardado
- sin romper ningún módulo compartido

7. FIXES EXACTOS
- archivo por archivo
- qué borrar
- qué mantener
- qué mover
- qué renombrar
- qué dejar comentado NO
- si algo queda por compatibilidad, explícalo

8. VALIDATION CHECKLIST
- checklist final de compilación, navegación, rendering, UX MVP, no-regresiones

9. VEREDICTO FINAL
- % estimado de compliance
- blockers críticos
- si está listo o no para implementación

====================================================================
REGLAS DE IMPLEMENTACIÓN
====================================================================

Después de auditar:

- IMPLEMENTA los fixes necesarios.
- Hazlo de manera segura y estable.
- NO rompas nada.
- NO toques módulos no necesarios.
- NO cambies arquitectura compartida salvo que sea imprescindible.
- NO borres types globales si podrían usarse en otros módulos; solo limpia exposición en UI MVP.
- SI detectas algo dudoso, prioriza SAFE CLEANUP FIRST.
- Si una feature OUT_OF_MVP está visible, debe salir de UI.
- Si una estructura puede mantenerse internamente sin exponerse en UI, puedes preservarla solo si ayuda a no romper nada.

====================================================================
FOCOS ESPECIALES A AUDITAR SÍ O SÍ
====================================================================

Revisa con mucho detalle si existen estos problemas:

A. ACCOUNT TYPE
- Personal / Business deben existir
- Business NO debe desbloquear funcionalidades reales
- solo puede decir “Advanced features (coming soon)”
- NO store mode
- NO agency mode
- NO publication as organization
- NO business logic real

B. ACCOUNT
Debe incluir:
- Email
- Phone
- Username
- Name
- Profile picture
- Bio
- algún bloque equivalente a Account & Verification

Revisa si:
- hay campos extra no MVP
- hay badges, trust score, seller level, ratings, stats o reputación
- hay organizaciones o memberships visibles

C. PUBLISHING
Debe incluir:
- default contact method
- delivery/access defaults
- visibility
- location
- Saved Addresses
- Add Address
- Setup Progress solo UNA vez dentro de Publishing

Revisa si:
- progress aparece duplicado
- location está mal explicada
- publishing defaults están mezclados con settings
- visibility expone opciones no MVP
- access defaults no están alineados con access_mode
- saved addresses es demasiado complejo para MVP

D. PREFERENCES
Debe incluir:
- Language
- Region

Revisa si:
- hay demasiadas preferencias
- hay secciones que pertenecen a Settings y no a Profile
- hay toggles duplicados con Settings

E. LOCATION MODEL
Esto es CRÍTICO:
- Profile debe manejar profile_location como default del usuario
- NO debe dar a entender que al cambiar profile location cambian listings ya publicados
- si existe texto explicativo, debe respetar esa regla
- NO mezclar con listing_location

F. OUT_OF_MVP EXPLÍCITO
Detecta y elimina si existe cualquier rastro visible de:
- Organizations
- Roles
- Store mode
- Agency mode
- Memberships
- Business logic avanzada
- banner superior amarillo
- duplicación de progress
- textos explicativos largos
- features FUTURE expuestas de forma engañosa

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO romper:
- navegación hacia My Profile
- navegación hacia Publish Flow
- defaults usados por Publish Flow
- profile data binding
- saved addresses
- upload de foto de perfil
- back button
- settings separados
- types compartidos
- profile persistence
- callbacks existentes
- integraciones con Home / Listing Detail / Filters que dependan de profile_location como default

NO tocar si no es necesario:
- Publish Flow core
- Settings page
- Home filters
- Listing Detail
- Action Center
- Group modules
- global action systems

Si hay código legacy:
- prefiero que lo ocultes de UI MVP antes que romper compatibilidad
- pero si está muerto y seguro, elimínalo

====================================================================
OUTPUT DE IMPLEMENTACIÓN FINAL
====================================================================

Después de implementar, entrégame EXACTAMENTE este formato:

1. FILES MODIFIED
2. FILES DELETED / DEPRECATED
3. CHANGES APPLIED
4. SAFETY CHECK
   - compile OK
   - imports OK
   - no broken types
   - no broken navigation
   - no broken bindings
   - publish defaults OK
   - profile location OK
5. FINAL MY PROFILE STRUCTURE
6. REMAINING RISKS
7. MVP COMPLIANCE STATUS
8. ESTADO FINAL

Quiero que al final sea fácil auditar si:
- quedó solo Account / Publishing / Preferences
- Setup Progress aparece solo una vez
- Business no desbloquea nada real
- no hay orgs/roles/store/agency
- profile_location quedó bien entendido
- no se rompió el uso de defaults para publicar

====================================================================
CRITERIO DE CIERRE
====================================================================

My Profile queda listo solo si:
- está 100% alineado con el MVP canónico
- no expone features OUT_OF_MVP
- no duplica lógica con Settings
- no rompe Publish Flow
- no rompe location defaults
- no rompe navegación
- no deja basura visible
- no deja botones mentirosos
- no deja clicks muertos

====================================================================
IMPORTANTE FINAL
====================================================================

Antes de responder:
- revisa todo el módulo
- implementa
- verifica estabilidad
- verifica que todos los cambios fueron aplicados
- y recién ahí entrega el reporte final completo

NO me entregues un resumen parcial.
NO me digas que “faltó revisar”.
NO me dejes cambios a medias.
NO dejes nada afuera.

====================================================================
FIN
====================================================================