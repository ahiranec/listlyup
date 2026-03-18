====================================================================
LISTLYUP — IMPLEMENTATION PROMPT
MODULE: STATISTICS
MODE: SAFE MVP CLEANUP + FINAL VALIDATION
====================================================================

CONTEXTO

Ya se hizo la auditoría de Statistics contra el canónico MVP.

El objetivo ahora es IMPLEMENTAR los ajustes de forma segura, estable y sin romper nada.

NO quiero una nueva auditoría.
NO quiero rediseño.
NO quiero expansión.
Quiero cleanup quirúrgico + alineación exacta al MVP canónico.

====================================================================
SOURCE OF TRUTH MVP (OBLIGATORIO)
====================================================================

STATISTICS MVP CANÓNICO:

Propósito:
- feedback básico del usuario
- no dashboard avanzado

Secciones finales:
1. Quick Stats (Last 7d)
2. Activity History
3. Performance Tips
4. Advanced Analytics (coming soon)

Quick Stats incluye SOLO:
- Active Listings
- Views
- Favorites
- Shares

Regla crítica:
- Statistics trabaja a nivel agregado del usuario
- NO debe confundirse con métricas por listing individual de My Listings Stats

Activity History:
- eventos recientes simples
- cronológico
- sin gráficos
- sin filtros complejos

Regla canónica de eventos:
- Activity History NO es un sistema separado de notificaciones
- debe derivar del mismo event log o capa de actividad que alimenta Action Center
- NO crear dos sistemas paralelos de eventos

Performance Tips:
- tips simples
- estáticos o por reglas básicas

Advanced Analytics:
- solo bloque “coming soon”
- sin métricas falsas
- sin paywall

OUT_OF_MVP EXPLÍCITO:
- rating
- ventas
- revenue
- conversion
- advanced engagement
- sección Performance
- sección Sales & Revenue
- sección Engagement
- sección Reputation
- gráficos
- dashboards avanzados
- paywall en analytics

====================================================================
IMPLEMENTAR EXACTAMENTE ESTO
====================================================================

PHASE 1 — REMOVE ALL OUT_OF_MVP UI
File: /components/StatisticsPage.tsx

1. REMOVE COMPLETELY:
- Performance section completa
- Sales & Revenue section completa
- Engagement section completa
- Reputation section completa
- Unlock More Analytics / Upgrade CTA completa
- Export button del header
- Period selector 7d / 30d / 90d
- Top Listings block
- reviews / ratings / stars / revenue / sales / followers / response rate UI
- all lock/paywall UI
- all chart UI
- all recharts usage

2. REMOVE RELATED DATA / LOGIC:
- viewsData
- topListings
- recentReviews
- salesStats
- engagementStats
- handleExportData
- handlePeriodChange
- getPlanBadge
- selectedPeriod
- expandedPerformance
- expandedSales
- expandedEngagement
- expandedReputation
- expandedUpgrade
- canAccessCharts
- canAccessAdvanced
- maxTopListings
- maxPeriod

3. CLEAN IMPORTS:
- remove recharts imports
- remove icons only used by removed sections
- keep only icons still needed by final MVP page

--------------------------------------------------------------------

PHASE 2 — FIX QUICK STATS TO MVP
File: /components/StatisticsPage.tsx

Quick Stats must show EXACTLY these 4 cards:
- Active Listings
- Views
- Favorites
- Shares

REPLACE:
- Avg Rating card
WITH:
- Shares card

UPDATE mock/local data:
- remove avgRating
- add shares

IMPORTANT:
- Statistics must stay at USER AGGREGATE level
- do NOT show top listings or per-listing analytics inside Statistics

--------------------------------------------------------------------

PHASE 3 — KEEP ONLY MVP SECTIONS
Final Statistics page must contain ONLY:

1. Header
2. Quick Stats
3. Performance Tips
4. Activity History
5. Advanced Analytics (coming soon)

NO extra sections.
NO hidden paywall logic.
NO collapsed future analytics sections.
NO fake premium gates.

--------------------------------------------------------------------

PHASE 4 — ADD ADVANCED ANALYTICS PLACEHOLDER
File: /components/StatisticsPage.tsx

Add a simple block:
- title: Advanced Analytics
- badge/text: Coming Soon
- one neutral explanatory line
- no fake metrics
- no upgrade CTA
- no lock paywall
- no button

This block must be simple, honest, and MVP-safe.

--------------------------------------------------------------------

PHASE 5 — ACTIVITY HISTORY SAFETY ALIGNMENT
CRITICAL:

Before finalizing, verify whether Activity History already uses the same event source/capa de eventos as Action Center.

A) IF a shared event source already exists:
- connect Activity History to that shared source
- keep the UI simple
- preserve chronological order
- no graphs
- no extra filters

B) IF a shared event source does NOT clearly exist:
- DO NOT invent a heavy new architecture
- keep the current simple UI
- add a clear internal TODO/comment indicating:
  "MVP TODO: connect Activity History to shared Action Center event log"
- keep implementation stable
- do not break anything

IMPORTANT:
- prefer stability over overengineering
- do not create a parallel event system

====================================================================
SAFEGUARDS — DO NOT BREAK
====================================================================

DO NOT BREAK:
- navigation from MenuSheet
- back button
- layout
- PerformanceCard component
- ActivityCard component
- Action Center
- shared event system (if any)
- imports/types used elsewhere
- mobile layout
- collapse behavior for Performance Tips / Activity History

DO NOT TOUCH unless strictly necessary:
- /components/statistics/PerformanceCard.tsx
- /components/statistics/ActivityCard.tsx
- Action Center code
- global shared types outside Statistics

SAFE TO MODIFY:
- /components/StatisticsPage.tsx
- local mock data inside Statistics
- local imports inside Statistics

====================================================================
IMPLEMENTATION STYLE
====================================================================

Work in the safest order:

1. Remove OUT_OF_MVP sections and dead logic
2. Clean imports/state/data
3. Fix Quick Stats
4. Add Advanced Analytics placeholder
5. Validate Activity History event source safely
6. Run final consistency check

Do not stop halfway.
Do not leave dead code references.
Do not leave unused imports.
Do not leave fake metrics.
Do not leave hidden premium gating.

====================================================================
VALIDATION REQUIRED BEFORE YOU ANSWER
====================================================================

Before delivering results, verify ALL of this:

COMPILATION
- compile OK
- no missing imports
- no broken references
- no unused dead references that break build
- no TypeScript errors

FINAL PAGE STRUCTURE
- Header OK
- Quick Stats OK
- Performance Tips OK
- Activity History OK
- Advanced Analytics (coming soon) OK

QUICK STATS
- Active Listings present
- Views present
- Favorites present
- Shares present
- Rating NOT present

OUT_OF_MVP REMOVED
- no Performance section
- no Sales & Revenue section
- no Engagement section
- no Reputation section
- no charts
- no recharts imports
- no reviews
- no ratings
- no revenue
- no paywall
- no upgrade CTA
- no export button
- no lock UI

ACTIVITY HISTORY
- still works
- still chronological/simple
- no graphs
- no complex filters
- shared source verified OR TODO comment added safely

NO REGRESSIONS
- MenuSheet → Statistics works
- Back button works
- Performance Tips expand/collapse works
- Activity History expand/collapse works
- mobile layout intact

====================================================================
OUTPUT FORMAT — OBLIGATORIO
====================================================================

Respond ONLY in this structure:

1. FILES MODIFIED
2. CHANGES APPLIED
3. VALIDATION
4. ESTADO FINAL

Be concise but complete.

In CHANGES APPLIED, explicitly confirm:
- Performance removed
- Sales & Revenue removed
- Engagement removed
- Reputation removed
- Upgrade CTA removed
- Export removed
- Quick Stats fixed to Shares
- Advanced Analytics added
- Activity History source status

In VALIDATION, explicitly confirm:
- compile OK
- no broken imports
- no dead references
- final sections OK
- out_of_mvp removed
- navigation OK

====================================================================
IMPORTANT
====================================================================

Do the implementation completely.
Do it safely.
Do not leave anything halfway.
Do not leave anything outside the final report.

====================================================================
FIN
====================================================================