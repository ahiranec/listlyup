====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
PHASE 2 — CREATE GROUP SIMPLIFICATION
SCOPE: MY GROUPS
MODE: SAFE REPLACEMENT
====================================================================

CONTEXTO

Ya se completó correctamente la FASE 1 de cleanup seguro en My Groups.

Ahora toca la FASE 2:

👉 REEMPLAZAR COMPLETAMENTE el flujo actual de creación de grupos
👉 ELIMINAR el wizard multi-step
👉 DEJAR un Create Group SIMPLE, MVP, de una sola pantalla
👉 HACERLO de manera segura y estable, sin romper navegación ni tipos

IMPORTANTE:
- NO dejes nada a medias
- NO dejes archivos viejos activos si ya no se usan
- NO rompas imports
- NO rompas el flujo actual de apertura desde "Create Group"
- Antes de entregar resultados, verifica que compile, que navegue bien y que el sheet funcione estable

====================================================================
OBJETIVO MVP CANÓNICO
====================================================================

Create Group debe ser:

UNA SOLA PANTALLA con estos campos:

- Group Name
- Description
- Location

Group Type:

- Public
- Private (link access)
- Private (approval) → visible pero disabled con "Coming Soon"

NO debe existir:

- wizard multi-step
- success screen
- invite flow post-create
- invitación por contactos
- invitación por email
- complejidad social innecesaria

====================================================================
TAREAS EXACTAS
====================================================================

1. REEMPLAZAR CREATE GROUP ACTUAL

Detecta cuál es hoy el entry point real del botón "Create Group" y reemplázalo para que abra un único sheet simple.

Debe quedar un componente tipo:

CreateGroupSheet.tsx

o actualizar el actual si ya existe uno con ese nombre, pero el resultado final debe ser SINGLE SCREEN ONLY.

--------------------------------------------------------------------

2. EL NUEVO CREATE GROUP DEBE TENER SOLO:

Campos:

- Group Name (required)
- Description (optional)
- Location (required)

Group Type:

- Public
- Private (link access)
- Private (approval) → disabled, visible, con texto "Coming Soon"

Botones:

- Cancel
- Create Group

--------------------------------------------------------------------

3. COMPORTAMIENTO

Create Group debe:

- validar required fields
- crear el grupo
- cerrar el sheet
- volver al flujo normal
- NO abrir success screen
- NO abrir invitation flow
- NO pedir invitar personas después
- NO abrir pasos extra

--------------------------------------------------------------------

4. ELIMINAR FLUJO WIZARD ANTIGUO

Eliminar o dejar completamente fuera de uso los archivos/componentes del wizard, incluyendo cualquier referencia activa.

Buscar y resolver correctamente referencias de:

- CreateGroupWizard.tsx
- CreateGroupDetailsWizard.tsx
- GroupTypeSelector.tsx
- GroupSuccessScreen.tsx
- InviteContactsSheet.tsx
- cualquier otro subcomponente exclusivo del wizard

Si alguno no existe ya, ignorarlo.
Si existe pero queda sin uso, eliminarlo o desconectarlo totalmente.

--------------------------------------------------------------------

5. INVITE MEMBERS NO DEBE FORMAR PARTE DEL CREATE FLOW

NO debe existir:

- invite after create
- suggested contacts
- share code screen post-create
- email invite post-create

--------------------------------------------------------------------

6. PRIVATE (APPROVAL)

Debe verse como opción, pero:

- disabled
- no seleccionable
- con label o hint "Coming Soon"

NO debe guardarse como opción válida en MVP.

--------------------------------------------------------------------

7. SEGURIDAD / ESTABILIDAD

NO romper:

- botón "Create Group"
- apertura/cierre del sheet
- tipados
- navegación general de My Groups
- render de group list
- filtros
- búsqueda
- group cards
- Group Detail
- ShareSheet
- ActionMenu
- permisos

NO tocar otras áreas fuera de Create Group salvo que sea estrictamente necesario para que compile y quede estable.

====================================================================
REGLAS TÉCNICAS
====================================================================

- Haz cambios incrementales y seguros
- Si reemplazas archivos, asegúrate de actualizar imports
- Si eliminas componentes, asegúrate de que no queden referencias rotas
- No inventes lógica nueva de negocio
- No agregues features futuras
- Mantén el resultado MVP mínimo
- Si necesitas conservar compatibilidad temporal interna, hazlo, pero la UI final debe quedar limpia y correcta

====================================================================
VALIDACIÓN OBLIGATORIA ANTES DE ENTREGAR RESULTADOS
====================================================================

Verifica explícitamente:

1. Compile OK
2. No broken imports
3. No broken references
4. Create Group button abre el sheet correcto
5. El nuevo flujo es de una sola pantalla
6. Public funciona
7. Private (link access) funciona
8. Private (approval) aparece disabled
9. Cancel funciona
10. Create Group funciona
11. No aparece success screen
12. No aparece invite flow post-create
13. No hay regresiones visibles en My Groups

====================================================================
OUTPUT REQUERIDO
====================================================================

Responder SOLO con esta estructura:

1. FILES MODIFIED
2. FILES DELETED o DEPRECATED
3. CAMBIOS APLICADOS
4. VALIDACIÓN FINAL
   - compile OK / no
   - imports OK / no
   - create flow OK / no
   - single screen OK / no
   - no regressions visible / no
5. ESTADO FINAL

NO entregar explicación larga.
NO entregar teoría.
NO entregar plan.
ENTREGAR RESULTADOS REALES DE IMPLEMENTACIÓN.

====================================================================
FIN
====================================================================