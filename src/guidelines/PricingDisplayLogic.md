# Pricing Display Logic - ProductDetailPage

## 🎯 Lógica Condicional

Los badges y mensajes de precio solo se muestran cuando **realmente aplican**.

### ✅ Reglas Implementadas

#### 1. **Badge "Negotiable"**
- ✅ Se muestra SOLO si `negotiable === true`
- ❌ NO se muestra si `negotiable === false` o `undefined`

```typescript
{extendedProduct.negotiable && (
  <Badge variant="outline" className="text-xs h-5">
    💰 Negotiable
  </Badge>
)}
```

#### 2. **Precio Original (tachado)**
- ✅ Se muestra SOLO si existe `originalPrice`
- ❌ NO se muestra si `originalPrice === undefined`

```typescript
{extendedProduct.originalPrice && (
  <span className="text-sm text-muted-foreground line-through">
    {extendedProduct.originalPrice}
  </span>
)}
```

#### 3. **Badge de Descuento**
- ✅ Se muestra SOLO si `discount > 0`
- ❌ NO se muestra si `discount === undefined`

```typescript
{extendedProduct.discount && (
  <Badge variant="destructive" className="text-xs h-5">
    🔥 {extendedProduct.discount}% OFF
  </Badge>
)}
```

#### 4. **Price Insight ("Price dropped $X")**
- ✅ Se muestra SOLO si:
  - `originalPrice` existe AND
  - `discount` existe AND
  - `priceHistory.length > 1`
- ❌ NO se muestra si no hay cambio real de precio

```typescript
{extendedProduct.originalPrice && 
 extendedProduct.discount && 
 extendedProduct.priceHistory && 
 extendedProduct.priceHistory.length > 1 && (
  <div className="flex items-center gap-1 text-xs text-green-600 mt-1.5">
    <TrendingDown className="w-3 h-3" />
    <span>Price dropped ${...} USD this week</span>
  </div>
)}
```

#### 5. **Segunda Línea Completa**
- ✅ Se muestra SOLO si hay:
  - `originalPrice` OR
  - `negotiable` OR
  - `isOwner === true` (para mostrar "Edit Price")
- ❌ NO se renderiza si ninguna condición aplica

```typescript
{(extendedProduct.originalPrice || extendedProduct.negotiable || isOwner) && (
  <div className="flex items-center gap-2 flex-wrap mt-1.5">
    {/* contenido */}
  </div>
)}
```

## 📊 Ejemplos Visuales

### Ejemplo 1: CON Descuento (Coffee Maker - $25 USD)

```
Título:   Coffee Maker

Precio:   25 USD 🔥 29% OFF
          ~~35 USD~~ 💰 Negotiable [Edit Price →]
          📉 Price dropped $10 USD this week
```

**Mock Data:**
```typescript
{
  price: "25 USD",
  originalPrice: "35 USD",
  discount: 29,
  negotiable: true,
  priceHistory: [
    { date: "Nov 1", price: "35 USD" },
    { date: "Nov 8", price: "25 USD" }
  ]
}
```

### Ejemplo 2: SIN Descuento (Skateboard - $30 USD)

```
Título:   Skateboard

Precio:   30 USD
```

**Mock Data:**
```typescript
{
  price: "30 USD",
  originalPrice: undefined,
  discount: undefined,
  negotiable: undefined,
  priceHistory: undefined
}
```

### Ejemplo 3: Free

```
Título:   Old Books

Precio:   FREE
```

### Ejemplo 4: Trade

```
Título:   Mountain Bike

Precio:   For Trade
          🔄 Looking for: #laptop #tablet #smartphone
```

### Ejemplo 5: Sale OR Trade (sin descuento)

```
Título:   Wireless Headphones

Precio:   45 USD or trade
          🔄 Looking for: #laptop #tablet
```

### Ejemplo 6: Sale OR Trade (con descuento)

```
Título:   Gaming Console

Precio:   25 USD 🔥 29% OFF or trade
          ~~35 USD~~ 💰 Negotiable
          📉 Price dropped $10 USD this week
          🔄 Looking for: #laptop #tablet
```

## 🔧 Implementación en Mock

En `ProductDetailPage.tsx`, el mock data usa esta lógica:

```typescript
// Solo el producto con precio "25 USD" tiene descuento y negotiable
const hasDiscount = product.price === "25 USD";

const extendedProduct: ExtendedProduct = {
  ...product,
  originalPrice: hasDiscount ? "35 USD" : undefined,
  discount: hasDiscount ? 29 : undefined,
  negotiable: hasDiscount ? true : undefined,
  priceHistory: hasDiscount ? [
    { date: "Nov 1", price: "35 USD" },
    { date: "Nov 8", price: "25 USD" }
  ] : undefined,
  // ... resto de campos
};
```

## 🎨 Estructura HTML Resultante

### Con Descuento:
```html
<div>
  <h1>Coffee Maker</h1>
  
  <div>
    <!-- Línea 1: Precio + Badge descuento -->
    <div>
      <span>25 USD</span>
      <Badge>🔥 29% OFF</Badge>
    </div>
    
    <!-- Línea 2: Original + Negotiable + Edit -->
    <div class="mt-1.5">
      <span class="line-through">35 USD</span>
      <Badge>💰 Negotiable</Badge>
      <Button>Edit Price →</Button>
    </div>
    
    <!-- Línea 3: Price insight -->
    <div class="mt-1.5">
      <TrendingDown />
      <span>Price dropped $10 USD this week</span>
    </div>
  </div>
</div>
```

### Sin Descuento:
```html
<div>
  <h1>Skateboard</h1>
  
  <div>
    <!-- Línea 1: Precio solamente -->
    <div>
      <span>30 USD</span>
    </div>
    
    <!-- Línea 2: NO se renderiza -->
    <!-- Línea 3: NO se renderiza -->
  </div>
</div>
```

## 🧪 Testing

Para probar diferentes estados:

1. **Coffee Maker** (id: "4", price: "25 USD") → CON descuento
2. **Gaming Mouse** (id: "6", price: "15 USD") → SIN descuento
3. **Skateboard** (id: "7", price: "30 USD") → SIN descuento

## ✅ Checklist de Validación

- [x] Badge "Negotiable" solo si negotiable === true
- [x] Precio original tachado solo si existe originalPrice
- [x] Badge descuento solo si existe discount
- [x] Price insight solo si hay priceHistory y descuento
- [x] Segunda línea completa solo si hay algo que mostrar
- [x] Looking for solo si es trade/sale_or_trade y hay tags
- [x] Spacing dinámico con mt-1.5 en cada elemento condicional

---

**Última actualización**: Nov 10, 2025
**Basado en**: Feedback de imagen de referencia
