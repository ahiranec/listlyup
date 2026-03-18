# 📋 Sheets Naming Convention - ListlyUp

**Fecha:** Diciembre 13, 2025  
**Actualizado en:** FASE 1 de Refactorización

---

## 🎯 Convención de Nomenclatura

Para evitar confusión entre sheets con propósitos diferentes, seguimos esta convención:

### **Regla:**
```
[ComponentName]Sheet[Context].tsx
```

- **ComponentName**: Acción/funcionalidad (e.g., MakeOffer, MarkAsSold)
- **Sheet**: Siempre presente
- **Context**: (Opcional) Contexto específico si hay múltiples versiones

---

## 📁 Estructura Actual

### **Sheets de Chat** (Versión Simple)
```
/components/
  MakeOfferSheetChat.tsx       ← Para chat (simple, rápido)
  MarkAsSoldSheetChat.tsx      ← Para chat (simple, rápido)
```

**Características:**
- ✅ UI simple y compacta
- ✅ Props específicas de ChatListing
- ✅ Bottom sheet pequeño (max-w-[480px])
- ✅ Optimizado para flujo de chat

**Props esperadas:**
```typescript
// MakeOfferSheetChat
{
  listing: ChatListing;
  onSubmitOffer: (amount: string, message: string) => void;
}

// MarkAsSoldSheetChat
{
  listing: ChatListing;
  buyerName: string;
  onConfirmSold: (soldTo: string, finalPrice: string) => void;
}
```

---

### **Sheets de Product Detail** (Versión Completa)
```
/components/sheets/
  MakeOfferSheet.tsx           ← Para ProductDetail (completo)
  MarkAsSoldSheet.tsx          ← Para ProductDetail (completo)
  AskQuestionSheet.tsx         ← General
  PauseListingSheet.tsx        ← General
  ManageOffersSheet.tsx        ← General
```

**Características:**
- ✅ UI rica y detallada
- ✅ Validación completa
- ✅ Sugerencias de precio
- ✅ Full-screen sheet (h-[90vh])
- ✅ Optimizado para ProductDetailPage

**Props esperadas:**
```typescript
// MakeOfferSheet
{
  productTitle: string;
  productPrice: string;
  productImage: string;
  sellerId: string;
  sellerName: string;
  onOfferSubmitted?: (offerId: string) => void;
}

// MarkAsSoldSheet
{
  productTitle: string;
  productPrice: string;
  productImage: string;
  onMarkedAsSold?: (buyerId: string, finalPrice: string) => void;
}
```

---

## 🎯 Cuándo Usar Cada Uno

### ✅ **Usa versión Chat (*Chat.tsx)**
```typescript
// En ChatConversationPage
import { MakeOfferSheet } from './MakeOfferSheetChat';
import { MarkAsSoldSheet } from './MarkAsSoldSheetChat';

<MakeOfferSheet
  listing={listing}
  onSubmitOffer={handleSubmitOffer}
/>
```

**Casos de uso:**
- Flujo de chat 1-on-1
- Cuando tienes un objeto `ChatListing` completo
- UI rápida y simple
- Bottom sheet compacto

---

### ✅ **Usa versión Product Detail (sheets/*.tsx)**
```typescript
// En ProductDetailPage o MyListingsPage
import { MakeOfferSheet } from './sheets/MakeOfferSheet';
import { MarkAsSoldSheet } from './sheets/MarkAsSoldSheet';

<MakeOfferSheet
  productTitle={product.title}
  productPrice={product.price}
  productImage={product.image}
  sellerId={product.sellerId}
  sellerName={product.sellerName}
/>
```

**Casos de uso:**
- Product Detail Page
- My Listings Page
- Cualquier contexto que no sea chat
- Necesitas validación completa
- Full-screen experience

---

## 📦 Diferencias Clave

| Característica | Chat Version | Product Detail Version |
|----------------|--------------|------------------------|
| **Tamaño** | Bottom sheet pequeño | Full-screen (90vh) |
| **Props** | `ChatListing` object | Props individuales |
| **Validación** | Básica | Completa con rangos |
| **Sugerencias** | 1 sugerencia (10% off) | 3 presets + rango |
| **Feedback** | Toast simple | Toast + mensajes inline |
| **Uso** | Solo chat | ProductDetail, MyListings |

---

## 🚀 Ejemplos de Implementación

### Ejemplo 1: Chat (Simple)
```typescript
import { MakeOfferSheet } from './MakeOfferSheetChat';

// Tienes el listing completo del chat
const listing: ChatListing = {
  id: 'listing-1',
  title: 'Coffee Maker',
  price: '25 USD',
  image: 'image.jpg'
};

<MakeOfferSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  listing={listing}
  onSubmitOffer={(amount, message) => {
    console.log(`Offer: $${amount}, Message: ${message}`);
  }}
/>
```

---

### Ejemplo 2: Product Detail (Completo)
```typescript
import { MakeOfferSheet } from './sheets/MakeOfferSheet';

// Tienes props individuales
<MakeOfferSheet
  open={isOpen}
  onOpenChange={setIsOpen}
  productTitle="Coffee Maker"
  productPrice="25 USD"
  productImage="image.jpg"
  sellerId="seller-123"
  sellerName="John Doe"
  onOfferSubmitted={(offerId) => {
    console.log(`Offer created: ${offerId}`);
    navigateTo('chat');
  }}
/>
```

---

## 📝 Reglas de Código

### ✅ **HACER:**
```typescript
// Importar con claridad
import { MakeOfferSheet } from './MakeOfferSheetChat'; // Chat context
import { MakeOfferSheet } from './sheets/MakeOfferSheet'; // Product context
```

### ❌ **NO HACER:**
```typescript
// NO mezclar versiones
import { MakeOfferSheet } from './MakeOfferSheet'; // ❌ Ya no existe
import { MarkAsSoldSheet } from './MarkAsSoldSheet'; // ❌ Ya no existe
```

---

## 🔄 Historia de Cambios

### FASE 1 (Diciembre 13, 2025)
- ✅ Renombrado: `MakeOfferSheet.tsx` → `MakeOfferSheetChat.tsx`
- ✅ Renombrado: `MarkAsSoldSheet.tsx` → `MarkAsSoldSheetChat.tsx`
- ✅ Actualizado: Imports en `ChatConversationPage.tsx`
- ✅ Eliminado: Archivos originales sin sufijo
- ✅ Documentado: Convención de naming

**Razón:** Clarificar que hay 2 versiones legítimas para diferentes contextos

---

## 🎯 Próximos Pasos

Si necesitas crear una **nueva versión** de un sheet:

### Ejemplo: ReportSheet para diferentes contextos
```
/components/sheets/
  ReportSheet.tsx              ← General (Product Detail)
  
/components/
  ReportSheetChat.tsx          ← Si necesitas una versión específica para chat
  ReportSheetGroup.tsx         ← Si necesitas una versión para grupos
```

**Principio:** Sufijo indica el contexto específico

---

## 📚 Referencias

- **ProductDetailPage**: Ver `sheets/MakeOfferSheet.tsx` completo
- **ChatConversationPage**: Ver `MakeOfferSheetChat.tsx` simple
- **Diferencias**: Comparar interfaces y UI entre versiones

---

**Última actualización:** Diciembre 13, 2025  
**Mantenido por:** Equipo de Refactorización
