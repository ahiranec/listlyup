# Product Detail Page - Guía de Uso

## 📋 Descripción

El `ProductDetailPage` es una página de detalle de producto **COMPACTA** que incluye TODOS los elementos necesarios para un marketplace completo, inspirado en el diseño de OLX/Mercado Libre pero con funcionalidades avanzadas.

## ✨ Características Implementadas

### **Core Features (Siempre visible)**
- ✅ Video en carousel (dots diferenciados con icono de video)
- ✅ Pricing completo:
  - Precio actual (destacado)
  - Precio original tachado (si hay descuento)
  - Badge de descuento con %
  - Badge "Negotiable"
  - Price history insight ("Price dropped $X this week")
  - "Looking for" tags (si es trade/sale_or_trade)
- ✅ **Item Rating vs Seller Rating** (claramente diferenciados con íconos)
- ✅ Status line con offer type + lifecycle
- ✅ Location con privacy pin explicado
- ✅ Time posted + fecha exacta
- ✅ Category breadcrumb (clickeable)
- ✅ Tags clickeables
- ✅ Description (collapsible)
- ✅ **Delivery Options detalladas** (con costos y cobertura)
- ✅ **Contact Methods** (con horarios y response time)
- ✅ **Payment Methods**
- ✅ **Seller Card completo** (rating, verified badges, stats)
- ✅ **Q&A Section** (con upvotes, helpful, sort)
- ✅ More from seller (horizontal scroll)
- ✅ Similar listings (horizontal scroll)
- ✅ **Trust & Safety tips**
- ✅ Sticky footer con acciones según role

### **Owner Features (Solo si `isOwner={true}`)**
- ✅ Badge "Your Listing" en header
- ✅ **Performance Stats** (views, favorites, messages, shares)
- ✅ Edit Price button inline
- ✅ Renew button (si expiring)
- ✅ **Active Conversations preview** (inbox de mensajes)
- ✅ Q&A con warnings de pending replies
- ✅ Owner footer (Edit, Stats, Pause, Delete)

## 🎨 Diseño Compacto

El diseño está optimizado para **máxima información en mínimo espacio**:

- **Spacing reducido**: `gap-3`, `py-3`, `space-y-3`
- **Text sizes**: Mayormente `text-xs` y `text-sm`
- **Info inline**: Badges y datos en línea horizontal
- **Collapsible sections**: Description plegable
- **Horizontal scrolls**: Similar items y more from seller
- **Carousel height**: `h-64` (vs `h-80` original)
- **Sticky elements**: Header y footer fijos

## 📐 Uso Básico

```tsx
import { ProductDetailPage } from "./components/ProductDetailPage";

// Vista normal (usuario viendo listing de otro)
<ProductDetailPage
  product={selectedProduct}
  productImage={imgProductImage}
  onBack={() => setCurrentView("home")}
  isOwner={false}
/>

// Vista owner (dueño viendo su propio listing)
<ProductDetailPage
  product={selectedProduct}
  productImage={imgProductImage}
  onBack={() => setCurrentView("home")}
  isOwner={true} // Muestra stats, edit, conversations
/>
```

## 🔧 Props

```typescript
interface ProductDetailPageProps {
  product: Product;        // Product data básico
  productImage: string;    // URL de imagen principal
  onBack: () => void;      // Callback para volver atrás
  isOwner?: boolean;       // Si es el dueño del listing
}
```

## 📊 Extended Product Data

El componente usa **mock data extendida** para demo. En producción, estos datos vendrían del backend:

```typescript
interface ExtendedProduct extends Product {
  // Pricing
  originalPrice?: string;
  discount?: number;
  negotiable?: boolean;
  priceHistory?: { date: string; price: string }[];
  
  // Ratings
  itemRating?: number;        // Rating del PRODUCTO
  itemReviews?: number;
  
  // Seller
  seller?: {
    id: string;
    name: string;
    username: string;
    rating: number;           // Rating del VENDEDOR
    reviews: number;
    verified: boolean;
    isStore: boolean;
    memberSince: string;
    responseTime: string;
    itemsSold?: number;
  };
  
  // Delivery & Contact
  deliveryOptions?: { ... };
  contactMethods?: { ... };
  paymentMethods?: string[];
  
  // Content
  category?: { main: string; sub: string };
  tags?: string[];
  privacyPin?: { enabled: boolean; radius?: string };
  
  // Q&A
  questions?: Array<{
    id: string;
    question: string;
    askedBy: string;
    askedAt: string;
    helpful: number;
    answer?: {
      text: string;
      answeredAt: string;
      helpful: number;
    };
  }>;
  
  // Owner Stats
  stats?: {
    views: number;
    favorites: number;
    messages: number;
    shares: number;
    viewsChange?: number;
  };
  
  // Owner Conversations
  conversations?: Array<{
    id: string;
    userName: string;
    lastMessage: string;
    time: string;
    unread: boolean;
  }>;
  
  // Media
  mediaItems?: Array<{
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
  }>;
  
  // Trade
  lookingFor?: string[];
}
```

## 🎯 Pricing Variants

El componente maneja **5 casos de pricing**:

### 1. For Sale CON descuento
```
Price: $25 USD 🔥 29% OFF
       ~~$35 USD~~ 💰 Negotiable
       📊 Price dropped $10 USD this week
```

### 2. For Sale SIN descuento
```
Price: $25 USD
(Sin badges adicionales)
```

### 3. Free
```
Price: FREE 💚
```

### 4. Trade
```
Price: For Trade
       🔄 Looking for: #laptop #tablet #smartphone
```

### 5. Sale OR Trade
```
Price: $25 USD or trade
       ~~$35 USD~~ -29% OFF
       💰 Negotiable
       🔄 Looking for: #laptop #tablet
```

## 🔄 Estados de Lifecycle

```typescript
// Active (verde)
🟢 Active

// Expiring (naranja)
⚠️ Expiring in 3d
   [Renew Now →]  // Solo owner

// Expired (rojo)
🔴 Expired
```

## 📱 Responsive

El componente está diseñado para **mobile-first** (max-width: 480px) pero es completamente responsive.

## 🎨 Componentes Shadcn Usados

- `Badge` - Para tags, status, verified badges
- `Button` - Acciones y CTAs
- `Separator` - Divisiones visuales
- `Avatar` / `AvatarFallback` - Seller y users
- `Collapsible` / `CollapsibleContent` / `CollapsibleTrigger` - Description
- `ScrollArea` - Carousels horizontales

## 🔍 Testing

Para probar diferentes estados:

1. **Vista Normal**: `isOwner={false}`
2. **Vista Owner**: `isOwner={true}`
3. **Con Descuento**: Product con `price="25 USD"` (el mock detecta esto y agrega descuento)
4. **Free**: Product con `type="free"`
5. **Trade**: Product con `type="trade"`
6. **Sale or Trade**: Product con `type="sale_or_trade"`

## 📊 Elementos Faltantes del FilterSheet

Estos elementos están en el FilterSheet pero NO se muestran en el detail page (por diseño):

- ❌ `sortBy` - No aplica en detail
- ❌ `specificSeller` - Ya estás viendo ESE seller
- ❌ `hiddenFilter` - Admin only
- ❌ `reportedFilter` - Admin only

Todos los demás 30+ campos del FilterSheet están representados.

## 🚀 Next Steps

Para implementación completa necesitarías:

1. **Backend/Supabase** para:
   - Fetch extended product data
   - Q&A CRUD operations
   - Stats tracking (views, favorites, etc.)
   - Conversations management
   
2. **Routing** real para:
   - Category breadcrumb navigation
   - Tag search
   - Seller profile
   - Similar items
   
3. **Contact functionality**:
   - WhatsApp deep link
   - Phone call
   - In-app messaging
   
4. **Owner actions**:
   - Edit listing (redirect to PublishFlow)
   - Pause/Unpause
   - Delete (con confirmation)
   - Renew (extend expiry)
   - Full stats page

## 💡 Tips

- El componente es **read-only** - no modifica data
- Todo el extended data es **mock** - reemplazar con API calls
- Los click handlers de tags, category, similar items son placeholders
- El share usa native `navigator.share` si disponible
- Los media items incluyen video (usar type: 'video')

## ✅ Checklist de Implementación

- [x] Video en carousel
- [x] Pricing completo con descuentos
- [x] Item vs Seller rating diferenciados
- [x] Privacy pin explicado
- [x] Contact con horarios
- [x] Delivery con costos
- [x] Q&A con upvotes
- [x] Owner stats
- [x] Active conversations
- [x] Trust & Safety
- [x] Sticky footer responsivo
- [x] Diseño compacto
- [x] Owner vs User views

---

**Última actualización**: Nov 10, 2025
**Version**: 1.0 (Compact Hybrid Design)
