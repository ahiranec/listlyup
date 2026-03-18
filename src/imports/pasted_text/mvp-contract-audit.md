🧠 LISTLYUP — CONTRACT REDUCTION / MVP HARDENING
ROL: Senior Product Architect + Data Architect + Frontend Systems Auditor
OBJETIVO: Reducir y alinear contratos de datos al MVP CANÓNICO, eliminando sobreingeniería y asegurando implementación simple, estable y escalable.

====================================================================
CONTEXTO OBLIGATORIO
====================================================================

Este sistema YA fue auditado.

Tenemos:

1. AUDITORÍA REAL DEL SISTEMA ACTUAL
- 30+ páginas activas
- 40+ estados globales
- mocks fragmentados
- inconsistencias de tipos
- NO single source of truth

2. DOCUMENTO MAESTRO CANÓNICO MVP (FUENTE DE VERDAD)
Define:

- Qué entra en MVP
- Qué es OUT_OF_MVP
- Qué es FUTURE_READY
- Reglas de negocio
- Reglas de UI
- Reglas de datos
- Reglas de Action Center
- Reglas de IA
- Reglas de location
- Reglas de visibility

ESTE DOCUMENTO ES LEY.

NO se puede contradecir.

3. PROBLEMA ACTUAL

Los contracts propuestos están:

- Correctos a nivel arquitectura
- Pero SOBRECOMPLEJOS para MVP
- Incluyen cosas FUTURE como si fueran obligatorias ahora

Esto genera:

- Fricción de implementación
- Riesgo de bloqueo
- Código innecesario
- Violación del principio MVP

====================================================================
OBJETIVO DE ESTA AUDITORÍA
====================================================================

Transformar:

"CONTRACTS ARQUITECTÓNICAMENTE PERFECTOS"

EN:

"CONTRACTS MVP-READY IMPLEMENTABLES"

====================================================================
REGLAS CRÍTICAS (NO ROMPER)
====================================================================

1. NO agregar features nuevas
2. NO inventar campos
3. NO incluir nada marcado como OUT_OF_MVP
4. TODO debe alinearse al Documento Maestro MVP
5. FUTURE debe quedar:
   - preservado conceptualmente
   - pero NO obligatorio en el contract MVP
6. Mantener:
   - simplicidad
   - claridad
   - implementabilidad inmediata

====================================================================
TAREA PRINCIPAL
====================================================================

Para cada entidad clave:

- User
- Listing
- Group
- Message / Conversation
- Q&A
- Moderation / Reports
- Action Center (conceptual)
- Favorites
- Statistics

HACER:

--------------------------------------------------------------------
1. MVP CONTRACT (FINAL)
--------------------------------------------------------------------

Definir SOLO los campos necesarios para:

- que la UI MVP funcione
- que el flujo sea completo
- que no falte nada funcional

Formato:

ENTITY: Listing

MVP_FIELDS:
- id
- title
- description
- price
- listing_type
- offer_mode
- condition
- category
- subcategory
- tags
- owner_user_id
- listing_location
- visibility_mode
- contact_methods
- access_mode
- created_at
- status

NO más.

--------------------------------------------------------------------
2. REMOVE (CRÍTICO)
--------------------------------------------------------------------

Lista explícita de campos que deben eliminarse del contract MVP porque:

- son FUTURE
- son overengineering
- no están en UI MVP

Ejemplo:

REMOVE:
- rating
- revenue
- conversion_metrics
- advanced_analytics
- campaign_data
- event_container_data
- transaction_fields

--------------------------------------------------------------------
3. KEEP FOR FUTURE (NO IMPLEMENTAR)
--------------------------------------------------------------------

Campos que:

- NO entran en MVP
- PERO deben mantenerse conceptualmente

Ejemplo:

KEEP_FOR_FUTURE:
- organization_id
- campaign_id
- event_id
- price_history
- transaction_id

IMPORTANTE:
NO deben ser obligatorios en MVP contract.

--------------------------------------------------------------------
4. JUSTIFICACIÓN (BREVE)
--------------------------------------------------------------------

Explicar en 2-3 líneas:

- Por qué este contract es correcto para MVP
- Qué evita
- Qué habilita

====================================================================
REGLAS ESPECIALES (MUY IMPORTANTES)
====================================================================

A. LISTING (CRÍTICO)

Debe respetar:

- listing_type: product | service | event
- offer_mode según tipo
- access_mode (NO solo delivery)
- visibility: public | groups_only
- listing_location = source of truth

NO incluir:

- ratings
- analytics
- revenue
- transactions
- campaign logic
- event hub logic

--------------------------------------------------------------------

B. USER

Debe incluir:

- identidad
- profile_location
- defaults de publish

NO incluir:

- roles complejos
- organizations activas
- business logic avanzada

--------------------------------------------------------------------

C. GROUP

Debe incluir:

- estructura básica
- members
- roles simples
- settings mínimos

NO incluir:

- invitation system complejo
- approval flows avanzados

--------------------------------------------------------------------

D. ACTION CENTER

NO es tabla necesariamente.

Debe entenderse como:

- agregador de eventos
- usa:
  - messages
  - Q&A
  - moderation

NO crear estructura paralela innecesaria.

--------------------------------------------------------------------

E. STATISTICS

Solo:

- views
- favorites
- shares
- active listings

NO:

- revenue
- conversion
- advanced metrics

--------------------------------------------------------------------

F. IA

Solo:

- metadata mínima opcional:
  - ai_prefill_used
  - ai_flagged

NO:

- estructuras complejas
- logs avanzados
- pipelines

====================================================================
FORMATO DE RESPUESTA (OBLIGATORIO)
====================================================================

Para cada entidad:

ENTITY: [NAME]

MVP_FIELDS:
- ...
- ...

REMOVE:
- ...
- ...

KEEP_FOR_FUTURE:
- ...
- ...

JUSTIFICATION:
- ...

====================================================================
CRITERIO FINAL DE ÉXITO
====================================================================

El resultado debe permitir:

1. Implementar sin fricción
2. Eliminar complejidad innecesaria
3. Mantener coherencia con UI real
4. Mantener escalabilidad futura
5. NO romper el MVP

====================================================================
IMPORTANTE
====================================================================

Si dudas entre incluir o no un campo:

→ NO incluirlo

El MVP privilegia simplicidad sobre completitud.

====================================================================
END PROMPT
====================================================================