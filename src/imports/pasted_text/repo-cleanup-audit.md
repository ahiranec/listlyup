LISTLYUP — AUDITORÍA OPERATIVA DE CLEANUP SEGURO
OBJETIVO: PASAR DE DIAGNÓSTICO GENERAL A LIMPIEZA EJECUTABLE
NO IMPLEMENTAR TODAVÍA

Quiero que actúes como:

- Lead Repo Cleanup Auditor
- Lead Legacy Validation Auditor
- Lead Documentation Cleanup Auditor
- Lead Mock Dependency Auditor

CONTEXTO

Ya hiciste una auditoría transversal maestra del repositorio y detectaste, entre otras cosas:

- obesidad documental en raíz
- coexistencia de componentes legacy con sistemas modulares nuevos
- mocks distribuidos e imports directos desde /data
- posibles rutas/páginas/componentes sospechosos
- necesidad de cleanup seguro antes de tocar arquitectura mayor

Ahora NO quiero otra auditoría general.
Quiero una auditoría OPERATIVA y EJECUTABLE, enfocada únicamente en cleanup seguro de bajo riesgo y validación de sospechosos.

IMPORTANTE

NO implementes cambios.
NO refactorices.
NO propongas React Router.
NO propongas backend todavía.
NO propongas features nuevas.
NO abras discusión de MVP.

Solo quiero identificar con mayor precisión QUÉ se puede limpiar primero sin romper nada.

OBJETIVOS DE ESTA AUDITORÍA

Quiero que inspecciones el repo real y me entregues evidencia y clasificación operativa sobre estos 5 bloques:

1. DOCUMENTOS .MD EN RAÍZ
2. COMPONENTES LEGACY O SOSPECHOSOS
3. ARCHIVOS / FOLDERS VACÍOS O CASI VACÍOS
4. INLINE MOCKS O MOCKS MAL UBICADOS
5. EXPORTS / BARRELS / ENTRYPOINTS SOSPECHOSOS

BLOQUE 1 — DOCUMENTOS .MD EN RAÍZ

Necesito que:
- identifiques los grupos reales de .md en raíz
- detectes duplicados evidentes
- detectes docs probablemente obsoletos
- detectes docs que sí deben quedarse visibles
- detectes docs que conviene mover a /docs/archive/*
- detectes docs que podrían borrarse con riesgo bajo

Pero NO quiero una lista caótica.
Quiero una clasificación operativa en grupos.

Usa estas categorías:
- KEEP ROOT
- MOVE TO /docs/<subfolder>/
- MOVE TO /docs/archive/<subfolder>/
- DELETE SAFE
- REVIEW BEFORE DELETE

BLOQUE 2 — COMPONENTES LEGACY O SOSPECHOSOS

Quiero validación REAL de referencias/imports para estos sospechosos como mínimo:

- ProfilePage.tsx
- SettingsSheet.tsx
- /components/super-admin/*
- BillingPage.tsx
- ChatView.tsx

Para cada uno, necesito que indiques:

- ruta exacta
- si está importado actualmente o no
- desde qué archivo(s) se importa, si aplica
- si participa en una ruta activa o no
- clasificación:
  - KEEP ACTIVE
  - KEEP FUTURE-READY
  - MOVE TO LEGACY
  - DELETE SAFE
  - REVIEW BEFORE DELETE

NO quiero inferencias vagas.
Quiero la mejor validación real posible desde el repo actual.

BLOQUE 3 — ARCHIVOS / FOLDERS VACÍOS O CASI VACÍOS

Audita específicamente folders/entrypoints sospechosos como:
- /components/layout/index.ts
- /components/listings/index.ts
- /components/user/index.ts
- /components/auth/index.ts

Y cualquier otro folder o barrel que esté:
- vacío
- casi vacío
- exportando una sola cosa sin necesidad
- generando ruido estructural

Para cada uno:
- describe contenido real
- indica si cumple función útil
- indica si conviene:
  - KEEP
  - MERGE
  - MOVE TO LEGACY
  - DELETE SAFE
  - REVIEW

BLOQUE 4 — INLINE MOCKS O MOCKS MAL UBICADOS

Quiero detectar:
- archivos mock fuera de /data
- mocks inline dentro de components
- datasets hardcoded dentro de páginas o módulos
- casos donde un mock debería consolidarse en /data o en una futura capa de repos

NO quiero todavía refactor.
Solo inventario claro.

Entrega:
- ruta exacta
- tipo de mock
- dónde se usa
- severidad:
  - LOW
  - MEDIUM
  - HIGH
- recomendación:
  - KEEP FOR NOW
  - CONSOLIDATE LATER
  - CONSOLIDATE NOW
  - REVIEW

BLOQUE 5 — EXPORTS / BARRELS / ENTRYPOINTS SOSPECHOSOS

Quiero auditar:
- barrels innecesarios
- index.ts redundantes
- re-exports que no agregan valor
- entrypoints antiguos
- exports que pueden estar ocultando legacy

Entrega:
- archivo
- qué exporta
- quién lo consume
- si agrega valor o solo ruido
- clasificación:
  - KEEP
  - REVIEW
  - DELETE SAFE
  - MOVE TO LEGACY

FORMATO OBLIGATORIO DE RESPUESTA

Responde TODO en texto continuo aquí mismo.
NO crear documentos separados.
NO responder con “te propongo un plan”.
NO escribir teoría general.
Quiero una salida operativa y verificable.

ESTRUCTURA OBLIGATORIA

A. RESUMEN EJECUTIVO OPERATIVO
- qué cleanup seguro aparece realmente posible
- qué sospechosos siguen ambiguos
- qué riesgos de ruptura detectas en esta auditoría puntual

B. DOCS .MD EN RAÍZ — CLASIFICACIÓN OPERATIVA
Agrupa por categorías reales y di:
- qué dejar
- qué mover
- qué archivar
- qué borrar
- qué revisar

C. LEGACY / SOSPECHOSOS — VALIDACIÓN REAL
Uno por uno:
- archivo
- referencias detectadas
- participación en rutas activas
- clasificación final
- confianza de la clasificación (ALTA / MEDIA / BAJA)

D. FOLDERS / BARRELS / ENTRYPOINTS SOSPECHOSOS
- archivo o carpeta
- contenido real
- valor real
- clasificación final

E. INLINE MOCKS / MOCKS MAL UBICADOS
- ruta
- tipo
- uso actual
- severidad
- acción sugerida

F. PRIMER LOTE DE CLEANUP SEGURO
Termina con una lista priorizada y simple de:

1. DELETE SAFE NOW
2. MOVE TO LEGACY NOW
3. MOVE TO DOCS/ARCHIVE NOW
4. REVIEW BEFORE ANY CHANGE

IMPORTANTE FINAL

No inventes.
No asumas sin evidencias si puedes verificar.
No mezcles esta respuesta con data hooks, services o responsive.
Quiero solo cleanup seguro y validación de sospechosos.