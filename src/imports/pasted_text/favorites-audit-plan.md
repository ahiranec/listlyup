====================================================================
LISTLYUP — FAVORITES — MVP AUDIT PROMPT
MODE: AUDIT FIRST, THEN SAFE IMPLEMENTATION PLAN
SOURCE OF TRUTH: MASTER CANONICAL DOC v2
====================================================================

TOMA COMO ÚNICA FUENTE DE VERDAD ESTE CRITERIO MVP PARA FAVORITES:

--------------------------------------------------------------------
FAVORITES — MVP CANÓNICO
--------------------------------------------------------------------

Propósito:
- lista simple de listings guardados por el usuario

Incluye:
- sección Saved Items
- search bar opcional
- lista de items guardados

Cada item incluye:
- Image
- Title
- Price
- Location
- Saved date
- Delete action

Badge en card:
- “Saved”

Acciones permitidas:
- Ver listing
- Eliminar de favoritos

Reglas:
- simple
- sin alertas
- sin seguimiento
- sin notificaciones directas
- consistente con badge de marketplace
- la terminología canónica de la app es “Favorites”, no “Likes”

--------------------------------------------------------------------
FAVORITES — OUT_OF_MVP
--------------------------------------------------------------------

- Alerts button
- mute/unmute notification icons
- tracking / seguimiento de cambios
- activar/desactivar alertas
- suscripción a cambios
- filtros avanzados

Además, mantener coherencia general del documento canónico:
- sin duplicación
- sin lógica paralela
- sin exponer features FUTURE
- UI simple
- estable
- segura
- sin romper navegación ni componentes compartidos

====================================================================
OBJETIVO DE ESTA AUDITORÍA
====================================================================

Quiero que audites SOLAMENTE el módulo/página de FAVORITES contra ese criterio canónico.

Necesito que hagas match entre:

1. lo que el MVP canónico exige
2. lo que explícitamente está fuera del MVP
3. lo que hoy existe realmente en el código/UI

Y luego me entregues:

- qué está OK
- qué falta
- qué sobra
- qué es inconsistente
- qué riesgos de modelo o de UX existen
- un plan de implementación SEGURO Y ESTABLE para corregirlo
- sin dejar nada afuera

====================================================================
INSTRUCCIONES DE AUDITORÍA
====================================================================

Haz revisión completa del módulo Favorites y responde con esta estructura exacta:

1. MATCH OK (ALINEADO CON MVP)
- Todo lo que sí cumple exactamente con el MVP canónico

2. FALTANTES (DEBERÍAN ESTAR Y NO ESTÁN)
- Todo lo que el MVP exige y hoy no está

3. SOBRANTES (NO MVP — DEBEN ELIMINARSE)
- Todo lo que hoy existe pero rompe el MVP
- Citar archivo/componente si puedes
- Explicar por qué rompe

4. INCONSISTENCIAS (CRÍTICO)
- Cosas que no conversan con el modelo canónico
- Ejemplo:
  - “Likes” vs “Favorites”
  - badges inconsistentes con marketplace
  - acciones duplicadas
  - lógica de alertas/notificaciones dentro de Favorites
  - filtros avanzados no alineados

5. RIESGOS DE MODELO / UX
- Riesgos de sobrecomplejidad
- riesgos de duplicación con Home / Listing Detail / Action Center
- riesgos de romper consistencia del badge Saved
- riesgos de mezclar Favorites con notificaciones o seguimiento

6. SAFE IMPLEMENTATION PLAN
- plan por fases
- solo cambios necesarios
- explicando qué tocar y qué NO tocar
- priorizando seguridad y estabilidad

7. FIXES EXACTOS
- archivos a modificar
- cambios concretos
- qué remover
- qué renombrar
- qué preservar

8. VALIDATION CHECKLIST
- checklist final para verificar que todo quedó bien
- compile OK
- imports OK
- navegación OK
- badge Saved consistente
- no alerts
- no tracking
- no toggles de notificación
- no likes wording
- no regressions

9. VEREDICTO FINAL
- % estimado de cumplimiento MVP
- si está listo o si requiere ajustes

====================================================================
REGLAS DE SEGURIDAD
====================================================================

NO implementar todavía.
Primero solo audita.

Pero el plan de implementación debe ser:
- seguro
- estable
- no-breaking
- incremental
- sin tocar cosas innecesarias
- sin romper componentes compartidos
- sin romper navegación a Listing Detail
- sin romper el heart/favorite behavior del marketplace si está compartido

====================================================================
COSAS A VERIFICAR CON MUCHA ATENCIÓN
====================================================================

Verifica especialmente si hoy existen cosas como:

- wording “Likes” en vez de “Favorites”
- botón de alertas
- suscripción a cambios
- mute/unmute
- tracking de cambios de precio o estado
- filtros avanzados
- badges distintos al “Saved”
- acciones extra además de:
  - ver listing
  - eliminar de favoritos
- lógica de notificaciones dentro de Favorites
- integración incorrecta con Action Center
- cards distintas a las del marketplace sin razón clara
- métricas o analytics dentro de Favorites
- secciones extra innecesarias

====================================================================
FORMATO DE RESPUESTA
====================================================================

Quiero una respuesta concreta, estructurada y accionable.

No me des teoría.
No me repitas el documento completo.
No me des explicación genérica.

Quiero:
- auditoría completa
- plan seguro
- fixes exactos
- checklist final

Si algo no puedes confirmar, dilo explícitamente.
No inventes.

====================================================================
ENTREGABLE
====================================================================

Tu respuesta final debe dejarme listo para pedir después:
“implementa de manera segura y estable”

Así que el audit debe estar lo bastante completo para pasar directo a implementación.

====================================================================
FIN
====================================================================