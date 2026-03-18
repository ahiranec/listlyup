====================================================================
LISTLYUP — MY LISTINGS — FINAL MINI RE-AUDIT
SCOPE: LISTING CARD METRICS + REVIEW ACTION ID
MODE: STRICT FINAL CHECK
====================================================================

OBJETIVO

Verificar SOLO estos 2 puntos antes de cerrar My Listings:

1. Que ListingCard muestre SOLO 1 métrica visible:
   - Views

2. Que la acción Review use un actionId REAL ya existente en el sistema
   y NO uno inventado.

NO revisar nada más.
NO rediseñar.
NO sugerir features nuevas.
SOLO confirmar estos 2 puntos.

====================================================================
SOURCE OF TRUTH
====================================================================

MY LISTINGS — LIST VIEW (CARDS)

Debe incluir:
- Image
- Title
- Price
- Location
- Status badge:
  - Active
  - Paused
  - Expiring Soon
  - Expired
- Visibility badge:
  - Public
  - Groups
- Listing Type:
  - Product / Service / Event
- solo 1 métrica:
  - Views

3-dots menu incluye:
- Chat
- Review
- Edit
- Share
- Pause / Activate
- Renew
- Mark as Sold (solo product)
- Delete

Reglas:
- no múltiples métricas en cards
- no likes count en cards
- no messages count en cards
- Review debe reutilizar el modal / flujo existente de Action Center / GAM
- NO inventar un actionId nuevo si ya existe uno real en el sistema

====================================================================
TAREA
====================================================================

Verifica exactamente:

A. LISTING CARD METRICS
- ¿La card muestra SOLO Views?
- ¿Hay alguna otra métrica visible?
  - messages
  - likes
  - favorites
  - shares
  - cualquier otra

B. REVIEW ACTION ID
- ¿El actionId usado para Review existe realmente en el sistema?
- ¿Cuál es exactamente?
- ¿Está registrado en el GAM / action registry / action menu?
- Si el actionId actual NO existe realmente, marcarlo como problema

====================================================================
FORMATO DE RESPUESTA (OBLIGATORIO)
====================================================================

1. LISTING CARD METRICS
- OK / NOT OK
- Qué métrica(s) se ven realmente

2. REVIEW ACTION ID
- OK / NOT OK
- actionId exacto usado
- confirmar si existe realmente o no

3. FINAL STATUS
Elegir solo una:
- ✅ MY LISTINGS CAN BE CLOSED
o
- ❌ STILL REQUIRES FINAL FIX

====================================================================
END
====================================================================