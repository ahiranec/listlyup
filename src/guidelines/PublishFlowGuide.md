# 📝 Guía del Flujo de Publicación

## 🎯 Overview

El flujo de publicación de ListlyUp es un wizard de 5 pasos que guía al usuario para crear un listing completo, con **integración de AI y Maps services** que pre-llenan información automáticamente.

---

## 🏗️ Arquitectura

### Estructura de Archivos

```
/components/publish/
├── index.ts                    # Re-exports
├── types.ts                    # TypeScript types
├── PublishFlow.tsx             # Main orchestrator
├── StepIndicator.tsx           # Progress UI
├── MediaStep.tsx               # Step 1: Photos + AI
├── BasicInfoStep.tsx           # Step 2: Title, description, category
├── LocationStep.tsx            # Step 3: GPS/Search + precision
├── PricingStep.tsx             # Step 4: Price, delivery, contact
└── PreviewStep.tsx             # Step 5: Review + publish
```

### Data Flow

```
User Action
    ↓
PublishFlow (state management)
    ↓
Individual Step Component
    ↓
Services (AI/Maps)
    ↓
Update Form Data
    ↓
Next Step
```

---

## 📱 Los 5 Pasos

### **Step 1: Media (MediaStep.tsx)**

**Objetivo:** Subir fotos y opcionalmente usar AI para analizar

**Features:**
- ✅ Drag & drop upload
- ✅ Hasta 10 fotos
- ✅ Primera foto = cover
- ✅ Botón "Analyze with AI"
- ✅ Auto-analyze si `settings.aiAutoAnalyze === true`

**AI Integration:**
```typescript
const aiService = useAIService();

const result = await aiService.analyzeListing({
  images: ['photo1.jpg', 'photo2.jpg'],
  maxSuggestions: 5,
  language: 'es',
});

if (result.success && result.data) {
  // Pre-fill title, description, category, tags
  setAISuggestions(result.data);
}
```

**UX:**
- Loading spinner durante análisis
- Badge "Demo" si usando Mock service
- Tips para buenas fotos

---

### **Step 2: Basic Info (BasicInfoStep.tsx)**

**Objetivo:** Completar información del producto

**Features:**
- ✅ Title (required, 5-80 chars)
- ✅ Description (required, 20-1000 chars)
- ✅ Category + Subcategory (required)
- ✅ Condition (optional)
- ✅ Tags (optional, hasta 20 chars cada uno)

**AI Suggestions:**
- Banner que aparece si hay sugerencias de AI
- Botón "Use AI Data" para auto-llenar
- Usuario puede editar todo después

**Categories:**
```typescript
const CATEGORIES = [
  { value: 'electronics', label: 'Electronics', 
    subcategories: ['Smartphones', 'Computers', 'Audio', 'Cameras'] },
  { value: 'fashion', label: 'Fashion & Clothing', 
    subcategories: ['Shoes', 'Clothing', 'Accessories', 'Jewelry'] },
  // ... más categorías
];
```

---

### **Step 3: Location (LocationStep.tsx)**

**Objetivo:** Establecer ubicación del producto

**Features:**
- ✅ 2 métodos: GPS / Search
- ✅ GPS: Usa `mapsService.getCurrentLocation()`
- ✅ Search: Usa `mapsService.searchLocation()`
- ✅ Precision: Approximate (~500m) / Exact

**Maps Integration:**
```typescript
const mapsService = useMapsService();

// GPS
const result = await mapsService.getCurrentLocation();

// Search
const result = await mapsService.searchLocation({
  query: 'Valparaíso, Chile',
  limit: 5,
});
```

**Auto-GPS:**
Si `settings.mapsAutoGPS === true`, detecta ubicación automáticamente al entrar al paso.

**UX:**
- Tabs para elegir método
- Resultados de búsqueda en dropdown
- Card con ubicación seleccionada
- Toggle para precisión (aproximada/exacta)

---

### **Step 4: Pricing & Conditions (PricingStep.tsx)**

**Objetivo:** Configurar precio, delivery y contacto

**Features:**
- ✅ Tipo de listing:
  - Sale (con precio)
  - Trade (intercambio)
  - Free (gratis)
  - Service (servicio)
  
- ✅ Precio (si aplica):
  - Input numérico
  - Toggle "Price is negotiable"
  
- ✅ Delivery Methods (multi-select):
  - Pickup
  - Local Delivery
  - Shipping
  
- ✅ Contact Methods (multi-select):
  - In-App Chat
  - WhatsApp
  - Phone Call
  
- ✅ Phone Number (si seleccionó WhatsApp o Phone)

**Validation:**
- Al menos 1 delivery method
- Al menos 1 contact method
- Precio > 0 si tipo = sale/service
- Teléfono válido si seleccionó phone/whatsapp

---

### **Step 5: Preview & Confirm (PreviewStep.tsx)**

**Objetivo:** Revisar todo antes de publicar

**Features:**
- ✅ Vista previa completa del listing
- ✅ Validaciones automáticas:
  - Errores (bloqueantes)
  - Warnings (sugerencias)
  - Info (tips)
  
- ✅ Botones "Edit" en cada sección
- ✅ Click edit → vuelve al paso correspondiente
- ✅ Botón "Publish Listing" (disabled si hay errores)

**Validations:**

```typescript
const validations = [
  // ERRORES (bloqueantes)
  { check: images.length >= 1, message: 'At least 1 photo', severity: 'error' },
  { check: title.length >= 5, message: 'Title is descriptive', severity: 'error' },
  
  // WARNINGS (sugerencias)
  { check: images.length >= 3, message: 'Add more photos (3+ recommended)', severity: 'warning' },
  
  // INFO (tips)
  { check: tags.length > 0, message: 'Tags help buyers find your listing', severity: 'info' },
];
```

---

## 🎨 UI Components

### Progress Indicator

```
┌─────────────────────────────────────┐
│   ①════②════③════④────⑤             │
│  Photos  Details  Location           │
└─────────────────────────────────────┘
```

- Círculos numerados para cada paso
- Línea de progreso conectando círculos
- Checkmark ✓ en pasos completados
- Label solo en paso actual
- Animaciones con Motion

### Step Transitions

Cada step tiene animación de entrada/salida:

```typescript
<motion.div
  initial={{ opacity: 0, x: 20 }}
  animate={{ opacity: 1, x: 0 }}
  exit={{ opacity: 0, x: -20 }}
>
  <StepComponent />
</motion.div>
```

---

## 🔧 Uso

### Abrir el Flujo

```typescript
// En App.tsx
const handleTabChange = (tab: string) => {
  if (tab === 'publish') {
    setCurrentView('publish');
  }
};

// En JSX
{currentView === 'publish' && (
  <PublishFlow 
    onClose={() => setCurrentView('home')}
    onPublish={(data) => {
      // Guardar en backend/Supabase
      console.log('Published:', data);
    }}
  />
)}
```

### Form Data Structure

```typescript
interface PublishFormData {
  // Step 1: Media
  images: string[];
  
  // Step 2: Basic Info
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'for-parts';
  
  // Step 3: Location
  location: {
    latitude: number;
    longitude: number;
    address?: string;
    city?: string;
    region?: string;
  } | null;
  locationPrecision: 'approximate' | 'exact';
  
  // Step 4: Pricing
  type: 'service' | 'sale' | 'trade' | 'free' | 'sale_or_trade';
  price?: string;
  priceNegotiable?: boolean;
  deliveryModes: ('pickup' | 'delivery' | 'shipping')[];
  contactModes: ('chat' | 'phone' | 'whatsapp')[];
  phoneNumber?: string;
  
  // Metadata
  visibility: 'public' | 'groups' | 'private';
  selectedGroups?: string[];
}
```

---

## 🤖 Integración con Servicios

### AI Service

**Cuándo se usa:**
- Al subir fotos en Step 1
- Click manual en "Analyze with AI"
- Auto-analyze si configurado

**Qué hace:**
1. Envía fotos a Vision API
2. LLM genera sugerencias
3. Pre-llena title, description, category, tags

**Mock vs Real:**
- Mock: 5 templates hardcodeados
- Real: Google Vision + OpenAI via Supabase Edge Function

### Maps Service

**Cuándo se usa:**
- Click en "Use Current Location" (GPS)
- Escribir en buscador (Search)
- Auto-GPS si configurado

**Qué hace:**
1. GPS: Obtiene coordenadas del dispositivo
2. Reverse geocoding: Coordenadas → dirección
3. Search: Query → resultados con coordenadas

**Mock vs Real:**
- Mock: 6 ubicaciones en Valparaíso
- Real: Google Maps Geocoding API

---

## 🎯 User Flow Completo

```
Usuario → BottomNav → Click "Publish" 
    ↓
Step 1: Sube 3 fotos
    ↓
AI analiza automáticamente (si enabled)
    ↓
Step 2: Ve sugerencias de AI, acepta con 1 click
    ↓
Edita descripción manualmente
    ↓
Step 3: Click "Use GPS"
    ↓
Maps detecta ubicación automáticamente
    ↓
Elige "Approximate precision"
    ↓
Step 4: Selecciona:
  - Type: Sale
  - Price: $50
  - Delivery: Pickup + Shipping
  - Contact: Chat + WhatsApp
  - Ingresa teléfono
    ↓
Step 5: Revisa todo
    ↓
Ve 1 warning: "Add more photos"
    ↓
Click "Edit" en Media → vuelve a Step 1
    ↓
Agrega 2 fotos más
    ↓
Vuelve a Preview
    ↓
Todo ✓ verde
    ↓
Click "Publish Listing"
    ↓
Toast: "🎉 Listing published successfully!"
    ↓
Vuelve a Home
```

---

## 📊 Estados del Flujo

### Estado Global

```typescript
const [currentStep, setCurrentStep] = useState<PublishStep>('media');
const [completedSteps, setCompletedSteps] = useState<PublishStep[]>([]);
const [formData, setFormData] = useState<PublishFormData>(initialFormData);
const [aiSuggestions, setAISuggestions] = useState<AISuggestions | null>(null);
const [isPublishing, setIsPublishing] = useState(false);
```

### Navegación

```typescript
// Forward
const handleMediaNext = () => {
  markStepCompleted('media');
  setCurrentStep('basic-info');
};

// Backward
const onBack = () => {
  setCurrentStep('media');
};

// Direct (desde Preview Edit)
const goToStep = (step: PublishStep) => {
  setCurrentStep(step);
};
```

---

## ✅ Validaciones

### Step 1 (Media)
- ✅ Al menos 1 foto

### Step 2 (Basic Info)
- ✅ Title: 5-80 caracteres
- ✅ Description: 20-1000 caracteres
- ✅ Category seleccionada
- ✅ Subcategory seleccionada

### Step 3 (Location)
- ✅ Ubicación establecida

### Step 4 (Pricing)
- ✅ Al menos 1 delivery method
- ✅ Al menos 1 contact method
- ✅ Precio > 0 (si tipo = sale/service)
- ✅ Teléfono válido (si phone/whatsapp)

### Step 5 (Preview)
- ✅ Todas las validaciones anteriores
- ⚠️ Warnings opcionales (no bloquean)
- ℹ️ Info tips (no bloquean)

---

## 🎨 Customización

### Agregar Nuevo Paso

1. Crear componente en `/components/publish/NewStep.tsx`
2. Agregar tipo en `types.ts`:
   ```typescript
   export type PublishStep = 'media' | 'basic-info' | 'location' | 'pricing' | 'new-step' | 'preview';
   ```
3. Agregar a `PUBLISH_STEPS` en `types.ts`
4. Agregar case en `PublishFlow.tsx`:
   ```typescript
   {currentStep === 'new-step' && (
     <NewStep {...props} />
   )}
   ```

### Modificar Validaciones

Editar array `validations` en `PreviewStep.tsx`:

```typescript
const validations = [
  { 
    check: myCondition, 
    message: 'Mi mensaje',
    severity: 'error' | 'warning' | 'info'
  },
];
```

---

## 🐛 Debugging

### Ver estado del formulario

```typescript
// En PublishFlow.tsx
useEffect(() => {
  console.log('Form Data:', formData);
}, [formData]);
```

### Ver qué servicio se está usando

```typescript
// En MediaStep.tsx
console.log('AI Service Type:', aiService.getServiceType());

// En LocationStep.tsx
console.log('Maps Service Type:', mapsService.getServiceType());
```

### Simular AI/Maps sin APIs

Los servicios Mock siempre están disponibles. Solo mantén `aiEnabled` y `mapsEnabled` en `false` en Settings.

---

## 📱 Responsive Design

El flujo respeta el mismo ancho máximo que la app principal:

```tsx
// PublishFlow tiene su propio contenedor responsive
<div className="fixed inset-0 z-50 bg-background">
  <div className="h-screen bg-background flex flex-col max-w-[480px] mx-auto relative overflow-x-hidden w-full">
    {/* Contenido del wizard */}
  </div>
</div>
```

**Características:**
- ✅ Mismo ancho que HomePage y resto de la app
- ✅ Se adapta automáticamente según el dispositivo
- ✅ Desktop: max-width 480px, centrado
- ✅ Mobile: full-width hasta 480px
- ✅ Inputs full-width dentro del contenedor
- ✅ Botones grandes (size="lg")
- ✅ Touch-friendly (min 44px tap targets)
- ✅ Scrollable content areas
- ✅ Fixed bottom actions

**Integración en App.tsx:**

```tsx
// El PublishFlow tiene su propio contenedor, 
// NO está envuelto en el contenedor principal de la app
{currentView === "publish" ? (
  <PublishFlow {...props} />
) : (
  <div className="max-w-[480px] mx-auto">
    {/* Resto de la app */}
  </div>
)}
```

---

## 🚀 Próximos Pasos

### Features Sugeridos

1. **Draft saving**: Guardar progreso en localStorage
2. **Image cropping**: Editor de fotos antes de subir
3. **Bulk upload**: Subir múltiples productos a la vez
4. **Templates**: Guardar listings como templates
5. **Schedule**: Programar publicación futura

### Integraciones

1. **Supabase Storage**: Upload real de imágenes
2. **Supabase Database**: Guardar listings
3. **Real-time**: Actualizar listings en tiempo real
4. **Analytics**: Tracking del flujo (step drop-off rates)

---

## 📚 Referencias

- [ServicesArchitecture.md](./ServicesArchitecture.md) - Documentación de servicios
- [ServicesUsageExamples.md](./ServicesUsageExamples.md) - Ejemplos de código
- [StyleImprovements.md](./StyleImprovements.md) - Guías de estilo
