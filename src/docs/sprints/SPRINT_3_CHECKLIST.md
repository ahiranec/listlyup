# ✅ SPRINT 3: Contact & Communication - Verification Checklist

## 📋 Componentes Creados

### ✅ Nuevos Sheets
- [x] `/components/sheets/MakeOfferSheet.tsx`
  - Input de precio con validación
  - Rango sugerido (70-90%)
  - Quick presets (-10%, -15%, -20%)
  - Mensaje opcional
  - Validación visual
  
- [x] `/components/sheets/AskQuestionSheet.tsx`
  - 8 templates de preguntas
  - Textarea con límite 300 chars
  - Validación mínima 10 chars
  - Tips integrados

### ✅ Componentes Actualizados
- [x] `/components/ProductDetailPage.tsx`
  - Agregado estado para MakeOfferSheet
  - Agregado estado para AskQuestionSheet
  - ShareSheet corregido con props correctas
  - Callbacks pasados a ProductActions
  
- [x] `/components/product-detail/ProductActions.tsx`
  - Nuevas props: onMakeOfferClick, onAskQuestionClick
  - Footer reorganizado con dos niveles
  - Make Offer solo si no es free
  - Ask Question siempre visible

## 🧪 Tests de Funcionalidad

### Test 1: ProductDetailPage - Buyer View
1. Abrir cualquier producto (no siendo el dueño)
2. **Header debe mostrar:**
   - ✅ Botón Back
   - ✅ Botón Share (Share2 icon)
   - ✅ Botón Save (corazón vacío o lleno)
   - ✅ Botón Report (bandera roja)

3. **Footer debe mostrar:**
   - ✅ Fila 1: Botón de contacto (Chat/WhatsApp/Phone)
   - ✅ Fila 2: Make Offer + Ask Question

### Test 2: Save Functionality
1. Click en corazón del header
2. **Debe:**
   - ✅ Cambiar a rojo/lleno
   - ✅ Mostrar toast "Saved to your collection! 💾"
   - ✅ Badge "Saved" aparecer en ProductCard en Home
3. Click nuevamente
4. **Debe:**
   - ✅ Volver a vacío
   - ✅ Mostrar toast "Removed from saved items"

### Test 3: Share Sheet
1. Click en botón Share del header
2. **Debe:**
   - ✅ Abrir ShareSheet desde abajo
   - ✅ Mostrar product preview card
   - ✅ Opciones: WhatsApp, Copy Link, QR, Groups
3. Test Copy Link
4. **Debe:**
   - ✅ Copiar al clipboard
   - ✅ Mostrar toast de confirmación

### Test 4: Make Offer Sheet
1. Click en botón "Make Offer" del footer
2. **Debe:**
   - ✅ Abrir MakeOfferSheet
   - ✅ Mostrar product preview
   - ✅ Mostrar rango sugerido (70-90%)
   - ✅ Mostrar 3 quick presets
3. Click en preset -15%
4. **Debe:**
   - ✅ Llenar input automáticamente
   - ✅ Mostrar validación "Great offer! Within suggested range"
5. Escribir precio muy bajo (ej: 5)
6. **Debe:**
   - ✅ Mostrar warning "This offer might be too low"
7. Escribir precio igual o mayor al original
8. **Debe:**
   - ✅ Mostrar error "Offer must be lower than the listed price"
   - ✅ Deshabilitar botón Send
9. Escribir precio válido y click Send
10. **Debe:**
    - ✅ Mostrar toast "Offer sent successfully! 🎉"
    - ✅ Cerrar sheet
    - ✅ Resetear form

### Test 5: Ask Question Sheet
1. Click en botón "Ask Question" del footer
2. **Debe:**
   - ✅ Abrir AskQuestionSheet
   - ✅ Mostrar 8 templates
3. Click en template "Is this still available?"
4. **Debe:**
   - ✅ Llenar textarea automáticamente
5. Borrar todo y escribir solo 5 caracteres
6. **Debe:**
   - ✅ Mostrar "5 more characters needed"
   - ✅ Deshabilitar botón Post
7. Escribir 10+ caracteres y click Post
8. **Debe:**
   - ✅ Mostrar toast "Question posted! 💬"
   - ✅ Cerrar sheet
   - ✅ Resetear form

### Test 6: Report Sheet
1. Click en botón Report (bandera roja)
2. **Debe:**
   - ✅ Abrir ReportSheet
   - ✅ Mostrar 8 opciones
3. Seleccionar 2 opciones
4. **Debe:**
   - ✅ Highlight en rojo las seleccionadas
   - ✅ Habilitar botón Submit
5. Click Submit
6. **Debe:**
   - ✅ Cerrar sheet
   - ✅ Mostrar AlertDialog "Report Submitted"

### Test 7: ProductDetailPage - Owner View
1. Abrir un producto siendo el dueño (isOwner=true)
2. **Header debe mostrar:**
   - ✅ Badge "Your Listing"
   - ✅ NO mostrar botón Report
3. **Footer debe mostrar:**
   - ✅ SOLO botones de owner: Edit, Stats, Pause, Delete
   - ✅ NO mostrar Make Offer ni Ask Question

### Test 8: Contact Buttons Dynamic
1. Verificar producto con contactModes: ['chat', 'whatsapp']
2. **Debe mostrar:**
   - ✅ Ambos botones de contacto
3. Click en chat
4. **Debe:**
   - ✅ Navegar a MessagesPage
   - ✅ Crear/abrir chat con vendedor

### Test 9: Saved Items Integration
1. Guardar 3 productos
2. Abrir MenuSheet
3. **Debe:**
   - ✅ Mostrar contador "(3)" en Saved Items
4. Click en Saved Items
5. **Debe:**
   - ✅ Navegar a SavedItemsPage
   - ✅ Mostrar los 3 productos guardados
6. Click en uno de los productos
7. **Debe:**
   - ✅ Abrir ProductDetailPage
   - ✅ Corazón debe estar lleno (saved state)

### Test 10: Free Products
1. Abrir un producto con type='free'
2. **Footer debe mostrar:**
   - ✅ NO mostrar botón "Make Offer"
   - ✅ Solo mostrar "Ask Question"

## 🔧 Archivos Modificados

```
/components/sheets/MakeOfferSheet.tsx          [NUEVO]
/components/sheets/AskQuestionSheet.tsx        [NUEVO]
/components/ProductDetailPage.tsx              [MODIFICADO]
/components/product-detail/ProductActions.tsx  [MODIFICADO]
```

## 📊 Progreso de Acciones

**Sprint 1-3 Completado:**
- save-listing ✅
- stop-watching ✅
- share-listing ✅
- report-listing ✅
- make-offer ✅
- ask-question ✅
- open-chat ✅
- open-whatsapp ✅
- open-phone ✅

**Total: 17/51 acciones (33.3%)**

## 🚨 Posibles Issues a Verificar

1. **ShareSheet Props**: Verificar que todas las props se pasen correctamente
2. **Toast Notifications**: Verificar que todas muestren mensajes apropiados
3. **Form Reset**: Verificar que los sheets reseteen sus estados al cerrar
4. **Navigation**: Verificar que onNavigateToChat funcione desde Make Offer
5. **Responsive**: Verificar que todo se vea bien en mobile
6. **Z-index**: Verificar que los sheets no se superpongan incorrectamente

## ✅ Estado General

- ✅ No hay errores de sintaxis
- ✅ Todos los imports están correctos
- ✅ Los componentes UI existen (Input, Textarea, Button, Sheet)
- ✅ Los handlers están implementados
- ✅ La integración con SavedItems funciona
- ✅ La navegación está conectada

## 🎯 Próximo Sprint Recomendado

**Sprint 4: Seller Actions & Listing Management**
- Edit listing flow
- Mark as sold/paused
- View detailed stats
- Manage conversations
- Respond to offers

O

**Sprint 4: Reviews & Ratings Complete**
- Leave review flow completo
- View all reviews
- Reply to reviews
- Rating breakdown
- Helpful voting
