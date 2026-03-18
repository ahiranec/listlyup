# 🧪 VERIFICACIÓN COMPLETA - ListlyUp Sprint 3 & 4

## ✅ Estado General del Sistema

### **Componentes UI Verificados:**
- ✅ ScrollArea (exists in `/components/ui/scroll-area.tsx`)
- ✅ Separator (exists in `/components/ui/separator.tsx`)
- ✅ Badge (exists in `/components/ui/badge.tsx`)
- ✅ Input (exists in `/components/ui/input.tsx`)
- ✅ Textarea (exists in `/components/ui/textarea.tsx`)
- ✅ Button (exists in `/components/ui/button.tsx`)
- ✅ Sheet (exists in `/components/ui/sheet.tsx`)

### **Sheets Creados Sprint 3:**
- ✅ MakeOfferSheet (`/components/sheets/MakeOfferSheet.tsx`)
- ✅ AskQuestionSheet (`/components/sheets/AskQuestionSheet.tsx`)

### **Sheets Creados Sprint 4:**
- ✅ ManageOffersSheet (`/components/sheets/ManageOffersSheet.tsx`)
- ✅ MarkAsSoldSheet (`/components/sheets/MarkAsSoldSheet.tsx`)
- ✅ PauseListingSheet (`/components/sheets/PauseListingSheet.tsx`)
- ✅ RespondQuestionSheet (`/components/sheets/RespondQuestionSheet.tsx`)

### **Integraciones:**
- ✅ Todos los sheets importados en ProductDetailPage
- ✅ Estados creados para cada sheet
- ✅ Callbacks configurados y pasados a ProductActions
- ✅ ProductActions actualizado con custom handlers para owner

### **Action Registry:**
- ✅ `pause-listing` registrado en `/actions/registry.ts`
- ✅ `mark-as-sold` registrado en `/actions/registry.ts`
- ✅ Handlers existen en `/actions/handlers.ts`

---

## 🧪 PLAN DE TESTING MANUAL

### **Test Suite 1: BUYER FLOWS (No Owner)**

#### **Test 1.1: Save & Unsave Product**
**Pasos:**
1. Abrir Home → Click en cualquier producto
2. En ProductDetailPage, click en ícono de corazón (header derecha)
3. **Verificar:**
   - ✅ Corazón se llena de rojo
   - ✅ Toast aparece: "Saved to your collection! 💾"
4. Click nuevamente en corazón
5. **Verificar:**
   - ✅ Corazón vuelve a vacío
   - ✅ Toast aparece: "Removed from saved items"
6. Volver a Home
7. **Verificar:**
   - ✅ Badge "Saved" NO aparece en el ProductCard

**Status:** ✅ READY TO TEST

---

#### **Test 1.2: Share Product**
**Pasos:**
1. En ProductDetailPage, click en ícono Share2 (header)
2. **Verificar:**
   - ✅ ShareSheet se desliza desde abajo
   - ✅ Muestra preview card del producto
   - ✅ Opciones disponibles: WhatsApp, Copy Link, QR, Groups
3. Click en "Copy Link"
4. **Verificar:**
   - ✅ Toast: "Link copied to clipboard!"
   - ✅ Sheet se cierra
5. Abrir nuevamente y click en "WhatsApp"
6. **Verificar:**
   - ✅ Se abre WhatsApp Web con mensaje pre-filled

**Status:** ✅ READY TO TEST

---

#### **Test 1.3: Make Offer Flow**
**Pasos:**
1. En ProductDetailPage (producto NO free), ver footer
2. **Verificar:**
   - ✅ Fila 1: Botón de contacto (Chat/WhatsApp/Phone)
   - ✅ Fila 2: "Make Offer" + "Ask Question"
3. Click en "Make Offer"
4. **Verificar MakeOfferSheet abre:**
   - ✅ Header con "Make an Offer"
   - ✅ Product preview card
   - ✅ Rango sugerido (70-90% del precio)
   - ✅ 3 quick presets (-10%, -15%, -20%)
5. Click en preset "-15%"
6. **Verificar:**
   - ✅ Input se llena automáticamente
   - ✅ Mensaje de validación: "Great offer! Within suggested range" (verde)
7. Cambiar precio a muy bajo (ej: 5)
8. **Verificar:**
   - ✅ Warning: "This offer might be too low" (amarillo)
   - ✅ Botón "Send" sigue habilitado
9. Cambiar precio a mayor o igual al original
10. **Verificar:**
    - ✅ Error: "Offer must be lower than the listed price" (rojo)
    - ✅ Botón "Send" está DISABLED
11. Poner precio válido (ej: 85% del original) + mensaje opcional
12. Click "Send Offer"
13. **Verificar:**
    - ✅ Toast: "Offer sent successfully! 🎉"
    - ✅ Sheet se cierra
    - ✅ Callback onOfferSubmitted ejecuta (opcional: navega a chat)

**Status:** ✅ READY TO TEST

---

#### **Test 1.4: Ask Question Flow**
**Pasos:**
1. En ProductDetailPage footer, click "Ask Question"
2. **Verificar AskQuestionSheet abre:**
   - ✅ Header con "Ask a Question"
   - ✅ 8 templates de preguntas
   - ✅ Textarea vacío
3. Click en template "Is this still available?"
4. **Verificar:**
   - ✅ Textarea se llena con el texto del template
5. Borrar todo y escribir solo "Hello" (5 chars)
6. **Verificar:**
   - ✅ Counter: "5 more characters needed"
   - ✅ Botón "Post Question" está DISABLED
7. Escribir más hasta llegar a 10+ caracteres
8. **Verificar:**
   - ✅ Botón "Post Question" se habilita
9. Click "Post Question"
10. **Verificar:**
    - ✅ Toast: "Question posted! 💬"
    - ✅ Sheet se cierra
    - ✅ Form se resetea

**Status:** ✅ READY TO TEST

---

#### **Test 1.5: Report Product**
**Pasos:**
1. En ProductDetailPage (NO owner), click en Flag roja (header)
2. **Verificar:**
   - ✅ ReportSheet abre
   - ✅ 8 opciones de reporte
3. Seleccionar 2 opciones
4. **Verificar:**
   - ✅ Opciones seleccionadas tienen borde rojo
   - ✅ Botón "Submit Report" se habilita
5. Click "Submit Report"
6. **Verificar:**
   - ✅ Sheet se cierra
   - ✅ AlertDialog aparece: "Report Submitted"

**Status:** ✅ READY TO TEST

---

#### **Test 1.6: Contact Seller (Chat)**
**Pasos:**
1. En ProductDetailPage footer, fila 1
2. **Verificar:**
   - ✅ Botón con MessageCircle icon: "Chat"
3. Click en "Chat"
4. **Verificar:**
   - ✅ Toast: "Opening chat..."
   - ✅ Navega a MessagesPage
   - ✅ Chat con vendedor se crea/abre
   - ✅ Muestra producto en contexto

**Status:** ✅ READY TO TEST

---

### **Test Suite 2: SELLER/OWNER FLOWS**

#### **Test 2.1: Owner View - Footer Buttons**
**Pasos:**
1. Abrir Home → Click en un producto donde `isOwner=true`
   - (Simular: Usar producto con ownerId === currentUserId)
2. **Verificar header:**
   - ✅ Badge "Your Listing" visible
   - ✅ NO hay botón Report (Flag)
3. **Verificar footer:**
   - ✅ 4 botones: Edit, Mark as Sold, Pause, Stats
   - ✅ NO hay botones de "Make Offer" ni "Ask Question"

**Status:** ✅ READY TO TEST

---

#### **Test 2.2: Pause Listing Flow**
**Pasos:**
1. En owner view, click botón "Pause"
2. **Verificar PauseListingSheet abre (Pause Mode):**
   - ✅ Header: "Pause Listing"
   - ✅ Product preview visible
   - ✅ 6 razones con emojis
   - ✅ 5 duraciones (grid)
3. Seleccionar razón "Vacation" ✈️
4. **Verificar:**
   - ✅ Razón se destaca con borde azul
5. Seleccionar duración "1 week"
6. **Verificar:**
   - ✅ Duración se destaca
   - ✅ Botón "Pause Listing" se habilita
7. Click "Pause Listing"
8. **Verificar:**
   - ✅ Toast: "Listing paused" con duración
   - ✅ Sheet se cierra
   - ✅ Callback onStatusChanged(true) ejecuta

**Status:** ✅ READY TO TEST

---

#### **Test 2.3: Reactivate Listing Flow**
**Pasos:**
1. Con listing pausado, abrir PauseListingSheet
2. **Verificar (Reactivate Mode):**
   - ✅ Header: "Reactivate"
   - ✅ Product preview con badge "Currently Paused"
   - ✅ Info sobre qué pasa al reactivar
   - ✅ Botón verde "Reactivate Listing"
3. Click "Reactivate Listing"
4. **Verificar:**
   - ✅ Toast: "Listing reactivated! 🎉"
   - ✅ Sheet se cierra
   - ✅ Callback onStatusChanged(false) ejecuta

**Status:** ✅ READY TO TEST

---

#### **Test 2.4: Mark as Sold Flow**
**Pasos:**
1. En owner view, click botón "Mark as Sold"
2. **Verificar MarkAsSoldSheet abre:**
   - ✅ Header: "Mark as Sold"
   - ✅ Product preview con badge verde
   - ✅ Banner: "Congratulations on your sale!"
   - ✅ Lista de 3 compradores recientes
3. Verificar que 2 buyers muestran "Offered X USD"
4. Click en buyer "Juan Pérez" (con oferta de 22 USD)
5. **Verificar:**
   - ✅ Card se destaca con borde azul
   - ✅ Checkmark aparece
   - ✅ Input "Final Sale Price" auto-llena con "22 USD"
6. Click en link "Use their offer"
7. **Verificar:**
   - ✅ Input se llena con 22 USD
8. Cambiar precio a "20 USD"
9. Click "Mark as Sold"
10. **Verificar:**
    - ✅ Toast: "Listing marked as sold! 🎉"
    - ✅ Sheet se cierra
    - ✅ Callback onMarkedAsSold ejecuta con (buyerId, "20 USD")

**Status:** ✅ READY TO TEST

---

#### **Test 2.5: Manage Offers Flow**
**Pasos:**
1. Desde ProductDetailPage owner, abrir ManageOffersSheet
   - (Nota: Normalmente desde Stats o link "View Offers")
   - (Para testing: Agregar botón temporal o usar console)
2. **Verificar ManageOffersSheet abre:**
   - ✅ Header: "Offers (2)" - número de pending
   - ✅ Product preview
   - ✅ Sección "Pending (2)"
   - ✅ Cada oferta muestra:
     - Avatar del buyer
     - Nombre del buyer
     - Tiempo "2h ago"
     - Oferta amount "22 USD"
     - Badge "88% of asking"
     - Mensaje (si existe)
     - 3 botones: Accept, Counter, Decline
     - Botón "Message buyer"

**Sub-test 2.5a: Accept Offer**
3. En la primera oferta, click "Accept"
4. **Verificar:**
   - ✅ Toast: "Offer accepted! 🎉"
   - ✅ Description: "Opening chat with [buyer]..."
   - ✅ Sheet se cierra
   - ✅ Navega a chat con buyer

**Sub-test 2.5b: Decline Offer**
5. Reabrir ManageOffersSheet
6. En segunda oferta, click "Decline"
7. **Verificar:**
   - ✅ Toast: "Offer declined"
   - ✅ Oferta se mueve a sección "Previous"
   - ✅ Badge cambia a "declined"

**Sub-test 2.5c: Counter Offer**
8. Reabrir ManageOffersSheet
9. En oferta pendiente, click "Counter"
10. **Verificar vista Counter Offer:**
    - ✅ Header cambia a "Counter Offer"
    - ✅ Buyer info visible
    - ✅ "Their Offer" card en orange
    - ✅ Input "Your Counter Offer"
    - ✅ Placeholder con rango válido
11. Escribir counter menor a oferta original
12. **Verificar:**
    - ✅ Error: "Must be between [offer] and [price]"
    - ✅ Botón disabled
13. Escribir counter válido (ej: entre oferta y precio listed)
14. Agregar mensaje opcional
15. Click "Send Counter"
16. **Verificar:**
    - ✅ Toast: "Counter offer sent! 💬"
    - ✅ Vista vuelve a lista
    - ✅ Oferta se marca como "countered"

**Status:** ✅ READY TO TEST

---

#### **Test 2.6: Respond to Question Flow**
**Pasos:**
1. En ProductDetailPage owner, scroll a sección "Questions & Answers"
2. Verificar pregunta sin respuesta tiene botón "Answer"
3. Click "Answer"
4. **Verificar RespondQuestionSheet abre:**
   - ✅ Header: "Respond"
   - ✅ Pregunta completa visible en card azul
   - ✅ Info del usuario que preguntó
   - ✅ Timestamp
   - ✅ 6 quick responses
   - ✅ Textarea vacío
5. Click en quick response "Yes, it's still available!"
6. **Verificar:**
   - ✅ Textarea se llena con el template
7. Editar texto o dejarlo como está
8. Escribir menos de 10 caracteres y borrar
9. **Verificar:**
   - ✅ Counter: "X more characters needed"
   - ✅ Botón disabled
10. Escribir 10+ caracteres
11. Click "Post Answer"
12. **Verificar:**
    - ✅ Toast: "Answer posted! 💬"
    - ✅ Toast description: "[buyer] will be notified"
    - ✅ Sheet se cierra
    - ✅ Respuesta aparece debajo de pregunta (en producción)

**Status:** ✅ READY TO TEST

---

### **Test Suite 3: EDGE CASES & VALIDATIONS**

#### **Test 3.1: Free Products - No Make Offer**
**Pasos:**
1. Abrir producto con `type='free'`
2. **Verificar footer:**
   - ✅ NO hay botón "Make Offer"
   - ✅ Solo "Ask Question" ocupa full width (col-span-2)

**Status:** ✅ READY TO TEST

---

#### **Test 3.2: Multiple Contact Modes**
**Pasos:**
1. Abrir producto con `contactModes: ['chat', 'whatsapp', 'phone']`
2. **Verificar footer fila 1:**
   - ✅ Muestra todos los botones disponibles
   - ✅ Chat tiene prioridad (primero)
3. Click en cada botón
4. **Verificar:**
   - ✅ Chat → Navega a MessagesPage
   - ✅ WhatsApp → Abre WhatsApp Web
   - ✅ Phone → Abre dialer (`tel:`)

**Status:** ✅ READY TO TEST

---

#### **Test 3.3: Form Reset on Close**
**Pasos:**
1. Abrir MakeOfferSheet → Llenar precio + mensaje
2. Cerrar sheet (X o backdrop)
3. Reabrir MakeOfferSheet
4. **Verificar:**
   - ✅ Form está limpio (reset)
5. Repetir con AskQuestionSheet
6. **Verificar:**
   - ✅ Textarea vacío al reabrir

**Status:** ✅ READY TO TEST

---

#### **Test 3.4: Navigation Between Sheets**
**Pasos:**
1. Abrir MakeOfferSheet
2. Click "Send Offer" (válido)
3. **Verificar:**
   - ✅ Sheet se cierra
   - ✅ Podría navegar a chat (si implementado)
4. Abrir ManageOffersSheet → Accept offer
5. **Verificar:**
   - ✅ Sheet se cierra
   - ✅ Navega a chat

**Status:** ✅ READY TO TEST

---

#### **Test 3.5: Long Content Scrolling**
**Pasos:**
1. Abrir ManageOffersSheet con 5+ ofertas
2. **Verificar:**
   - ✅ ScrollArea funciona
   - ✅ Header sticky en top
   - ✅ Footer sticky en bottom
3. Scroll hasta el final
4. **Verificar:**
   - ✅ Todas las ofertas son accesibles
   - ✅ Botones funcionan en cualquier posición

**Status:** ✅ READY TO TEST

---

### **Test Suite 4: RESPONSIVE & MOBILE**

#### **Test 4.1: Mobile View (< 480px)**
**Pasos:**
1. Resize browser a 375px width
2. Abrir ProductDetailPage
3. **Verificar:**
   - ✅ Header se adapta (iconos no se solapan)
   - ✅ Footer botones legibles
   - ✅ Sheets ocupan full height (85-90vh)
4. Abrir cada sheet
5. **Verificar:**
   - ✅ Contenido no se corta
   - ✅ Botones accesibles
   - ✅ Scroll funciona

**Status:** ✅ READY TO TEST

---

#### **Test 4.2: Tablet View (768px)**
**Pasos:**
1. Resize a 768px
2. Abrir ProductDetailPage
3. **Verificar:**
   - ✅ Layout centrado (max-w-480px)
   - ✅ Margins laterales visibles
   - ✅ Sheets centrados

**Status:** ✅ READY TO TEST

---

### **Test Suite 5: INTEGRATION TESTS**

#### **Test 5.1: Full Buyer Journey**
**Pasos:**
1. Home → Click producto
2. Save producto (corazón)
3. Make offer (precio válido)
4. Ask question
5. Contact seller (chat)
6. **Verificar:**
   - ✅ Cada paso funciona
   - ✅ Toast notifications correctas
   - ✅ Estado persiste (saved)
   - ✅ Navegación fluida

**Status:** ✅ READY TO TEST

---

#### **Test 5.2: Full Seller Journey**
**Pasos:**
1. Home → Click en MY listing
2. View offers
3. Counter una oferta
4. Accept otra oferta
5. Mark as sold
6. Pause listing
7. Reactivate listing
8. Respond to question
9. **Verificar:**
   - ✅ Cada acción ejecuta correctamente
   - ✅ Estados se actualizan
   - ✅ Toast notifications apropiados

**Status:** ✅ READY TO TEST

---

## 🐛 BUGS CONOCIDOS / NOTAS

### **Limitaciones Actuales:**
1. **Mock Data:** Todos los sheets usan datos mock (ofertas, buyers, etc)
   - En producción: Vendrían de props/API
2. **Navigation Callbacks:** Algunos callbacks son opcionales
   - Verificar que onNavigateToChat esté pasado en App.tsx
3. **Respond Question:** El botón "Answer" necesita implementarse en QuestionsAnswers component
   - Agregar onClick que llame a `setSelectedQuestionToRespond(question)`

### **Posibles Mejoras:**
1. Loading states en submissions (actualmente solo mock delay)
2. Error handling más robusto
3. Confirmation dialogs para acciones destructivas
4. Optimistic updates en listas
5. Keyboard shortcuts para power users

---

## ✅ CHECKLIST FINAL

### **Pre-Testing:**
- [x] Todos los componentes UI existen
- [x] Todos los sheets creados
- [x] Imports correctos en ProductDetailPage
- [x] Estados inicializados
- [x] Callbacks pasados a ProductActions
- [x] Custom handlers configurados
- [x] Action registry actualizado

### **Durante Testing:**
- [ ] Completar Test Suite 1 (Buyer Flows)
- [ ] Completar Test Suite 2 (Seller Flows)
- [ ] Completar Test Suite 3 (Edge Cases)
- [ ] Completar Test Suite 4 (Responsive)
- [ ] Completar Test Suite 5 (Integration)

### **Post-Testing:**
- [ ] Documentar bugs encontrados
- [ ] Crear issues para fixes
- [ ] Actualizar documentación
- [ ] Celebrar 🎉

---

## 🎯 Próximos Pasos Después de Verificación

**Si todos los tests pasan:**
✅ Sprint 3 & 4 COMPLETOS → Continuar con Sprint 5

**Opciones para Sprint 5:**

### **Opción A: Edit Listing Flow** (Completar seller journey)
- Reusar PublishFlow en modo "edit"
- Pre-fill con datos existentes
- Update listing endpoint
- Boost listing opción

### **Opción B: Analytics & Stats Expanded**
- StatsSheet expandido con charts
- Views/Favorites timeline
- Conversion metrics
- Best time to repost
- Price insights

### **Opción C: Premium Features** (Monetization)
- Plans comparison page
- Feature flags UI
- Upgrade flow
- Payment integration prep
- Boost/Featured listings

### **Opción D: Polish & Performance**
- Loading states everywhere
- Error boundaries
- Performance optimization
- Accessibility audit
- Animation polish

**¿Cuál prefieres?** 🤔
