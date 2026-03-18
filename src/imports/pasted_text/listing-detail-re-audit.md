====================================================================
LISTLYUP — FIGMA RE-AUDIT PROMPT
SCOPE: LISTING DETAIL
MODE: POST-IMPLEMENTATION MVP VALIDATION
====================================================================

CONTEXTO

A previous MVP refactor was already implemented for Listing Detail.

This is NOT a first audit.

This is a STRICT RE-AUDIT to verify whether the implementation is now truly aligned with the MVP canonical definition.

Your job is to validate the CURRENT POST-IMPLEMENTATION UI and detect any remaining non-MVP elements, leaks, inconsistencies, or incomplete cleanup.

DO NOT redesign.
DO NOT suggest new features.
DO NOT expand scope.
DO NOT assume the implementation is correct just because changes were already applied.

Be strict and literal.

====================================================================
SOURCE OF TRUTH (OBLIGATORIO)

Validate the current Listing Detail page EXACTLY against the following:

====================================================================
LISTING DETAIL — MVP CANÓNICO (KEEP)
====================================================================

Propósito:
- ayudar a decidir rápido
- facilitar contacto
- mostrar contenido simple y claro

Incluye:
- location
- category breadcrumb
- tags / hashtags
- username del usuario
- contact actions:
  - Chat
  - WhatsApp (si owner lo habilitó)
- access / delivery info solo cuando sea relevante según tipo de listing
- simple text description
- Q&A simple:
  - question
  - answer
  - timestamp opcional
- related content:
  - Similar Listings
  - More from this user

Reglas:
- sin ratings
- sin seller stats
- sin organizaciones
- sin analytics
- sin métricas visibles
- sin recommendation engine complejo
- sin Trust & Safety section
- sin Recently Viewed
- contacto solo por métodos elegidos por el owner

Aclaración sobre access / delivery:
- no se fuerza un modelo exclusivamente físico
- un producto puede ser físico o virtual
- un servicio puede ser virtual, presencial o mixto
- un evento puede ser virtual o location-based
- el modelo canónico recomendado es access_mode, no una lectura restringida de delivery físico

====================================================================
LISTING DETAIL — OUT_OF_MVP (REMOVE)
====================================================================

- Expired status visible en header
- ratings
- seller stats
- organizations visibles
- Call button
- sección de contacto duplicada
- delivery para services y events como sección rígida y separada del modelo general
- Q&A likes / upvotes / ranking
- Recently Viewed
- Trust & Safety section
- analytics o métricas visibles
- AI recommendation blocks

====================================================================
REGLAS GLOBALES RELEVANTES (OBLIGATORIAS)
====================================================================

- Usuario es la entidad principal
- publicación siempre como persona
- organizations NO visibles en UI
- no payments
- no transacciones
- no negociación estructurada
- no rating system
- no revenue tracking
- no analytics avanzados
- no placeholders complejos ni métricas falsas
- Listing Detail prioriza claridad y contacto rápido
- Chat UI es único y puede tener múltiples entry points
- Chat UI reutiliza la misma conversación y la misma lógica
- En owner mode NO debe haber chat/messages UI dentro del contenido
- Owner mode reutiliza la misma página base, sin duplicar pantalla
- category y subcategory forman clasificación estructural
- tags complementan búsqueda y descubrimiento
- tags no duplican clasificación principal
- access_mode es el modelo canónico recomendado para pickup / delivery / virtual / presencial
- el MVP debe minimizar duplicación de lógica y de UI
- el sistema debe mantenerse simple, estable y sin features FUTURE visibles

====================================================================
CRITICAL VALIDATION TARGETS
====================================================================

You MUST specifically verify whether any of these still remain visible or active:

- Expired status
- Ratings
- Seller rating
- Product rating
- Rating button
- Rating sheet
- Seller stats
- Response time
- Price history
- Discount insight
- Negotiable UI if it behaves as pricing intelligence
- Analytics / metrics visible
- Helpful / upvotes in Q&A
- Recently Viewed
- Trust & Safety
- AI recommendation blocks
- Owner Messages inside content
- Duplicated contact sections
- Call button
- Any organizations visible
- Any FUTURE leakage

Also verify whether:
- Similar Listings remains
- More from this user remains
- Chat and WhatsApp still work correctly
- The page still feels simple and MVP-compliant

====================================================================
TAREA DE RE-AUDITORÍA

Analyze the CURRENT Listing Detail page after implementation and return whether the page is now truly MVP-compliant or still has remaining issues.

====================================================================
OUTPUT REQUERIDO (FORMATO ESTRICTO)

Respond ONLY in this format:

--------------------------------------------------
1. FULLY OK (ALIGNED WITH MVP)
--------------------------------------------------

List all elements that are now correctly aligned.

--------------------------------------------------
2. STILL PRESENT (NON-MVP ITEMS NOT FULLY REMOVED)
--------------------------------------------------

For each remaining violation:
- Element
- Where it still appears
- Why it still breaks MVP

--------------------------------------------------
3. PARTIAL CLEANUP (REMOVED VISUALLY BUT NOT FULLY RESOLVED)
--------------------------------------------------

Use this only if something was hidden superficially but still remains exposed indirectly or still creates confusion.

Examples:
- empty placeholders
- dead buttons
- arrays passed empty to fake removal
- props still rendering side effects
- owner-only content still visible indirectly

--------------------------------------------------
4. NEW RISKS INTRODUCED BY THE REFACTOR
--------------------------------------------------

Only if any real risk was introduced:
- broken structure
- awkward UI gaps
- duplicated CTA logic
- unstable owner mode
- regressions

--------------------------------------------------
5. FINAL VEREDICT
--------------------------------------------------

Choose ONLY one:

- ✅ MVP COMPLIANT
or
- ❌ STILL REQUIRES FIXES

Then write a summary in maximum 5 lines.

====================================================================
FINAL RULES
====================================================================

- Be strict
- Be literal
- Do not redesign
- Do not suggest future ideas
- Do not assume partial cleanup is enough
- If something non-MVP is still visible, exposed, implied, duplicated, or active, flag it

====================================================================
END
====================================================================