LISTLYUP — IMPLEMENTACIÓN CONTROLADA DE CLEANUP SEGURO (CÓDIGO)
OBJETIVO: EJECUTAR SOLO EL PRIMER LOTE DE CLEANUP DE CÓDIGO DE BAJO RIESGO
NO TOCAR DOCS MASIVAMENTE TODAVÍA
NO TOCAR ARQUITECTURA
NO TOCAR MOCKS TODAVÍA

Quiero que actúes como:

- Lead Frontend Cleanup Engineer
- Lead Safe Refactor Engineer
- Lead Legacy Isolation Engineer

CONTEXTO

Ya hiciste una auditoría operativa de cleanup seguro y validaste lo siguiente:

1. Barrels sin consumers:
- /components/listings/index.ts
- /components/user/index.ts
- /components/auth/index.ts

2. Barrel con 1 solo consumer:
- /components/layout/index.ts
  - hoy solo re-exporta MenuSheet
  - App.tsx lo consume
  - conviene reemplazar ese import por import directo

3. Componentes legacy confirmados:
- /components/ProfilePage.tsx
- /components/ChatView.tsx

4. Componentes que NO deben tocarse:
- /components/SettingsSheet.tsx → KEEP ACTIVE
- /components/BillingPage.tsx → KEEP ACTIVE
- /components/super-admin/* → KEEP ACTIVE por ahora

OBJETIVO DE ESTA IMPLEMENTACIÓN

Quiero que implementes SOLO este lote de cleanup de código de bajo riesgo:

A. Reemplazar el barrel import de MenuSheet por import directo
B. Eliminar estos barrels sin consumers:
- /components/listings/index.ts
- /components/user/index.ts
- /components/auth/index.ts
- /components/layout/index.ts (solo después de actualizar App.tsx)

C. Crear carpeta /components/_legacy/ si no existe

D. Mover estos archivos a /components/_legacy/:
- /components/ProfilePage.tsx
- /components/ChatView.tsx

E. Agregar un comentario corto de deprecación al inicio de ambos archivos movidos:
- indicar que fueron reemplazados
- indicar que no deben usarse en código nuevo

RESTRICCIONES CRÍTICAS

- NO tocar SettingsSheet.tsx
- NO tocar BillingPage.tsx
- NO tocar /components/super-admin/*
- NO tocar mocks
- NO tocar docs
- NO refactorizar App.tsx más allá del import directo de MenuSheet
- NO cambiar comportamiento funcional
- NO cambiar rutas
- NO cambiar UI
- NO hacer cleanup adicional no pedido

VALIDACIONES OBLIGATORIAS

Antes de borrar o mover:
1. re-verifica que los barrels sin consumers realmente no tengan consumers activos
2. re-verifica que ProfilePage.tsx y ChatView.tsx no estén importados en rutas activas

Después de implementar:
1. verifica que TypeScript compile
2. verifica que App.tsx siga importando correctamente MenuSheet
3. verifica que no queden imports rotos
4. verifica que no haya cambios de comportamiento visibles

FORMATO OBLIGATORIO DE RESPUESTA

Responde TODO en texto continuo aquí mismo.
NO crear documentos separados.

ESTRUCTURA OBLIGATORIA

A. CAMBIOS IMPLEMENTADOS
- lista exacta de archivos modificados, movidos y eliminados

B. VALIDACIÓN PREVIA
- qué verificaste antes de borrar o mover

C. RESULTADO FINAL
- qué quedó eliminado
- qué quedó movido a _legacy
- qué quedó intacto por restricción

D. CHECK DE SEGURIDAD
- compile OK / no OK
- imports OK / no OK
- comportamiento funcional afectado o no

E. SIGUIENTE PASO RECOMENDADO
- 1 sola recomendación breve para el próximo lote