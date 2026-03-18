# 📋 Auditoría de Defaults del Sistema - ListlyUp

**Fecha**: 2025-01-07  
**Objetivo**: Auditar y mejorar los defaults del sistema para nuevos usuarios

---

## 🎯 Defaults Requeridos por el Usuario

### Defaults Fijos
1. **Default Contact Method**: InAppChat ✅
2. **Default Delivery Options**: Meetup ⚠️
3. **Default Visibility**: Public ✅
   
### Defaults Dinámicos (basados en región/país)
4. **Default Currency**: Depende de la región ⚠️
5. **Default Address**: Depende del país ⚠️
6. **Language and Region**: Depende del país ⚠️

---

## 📊 Estado Actual de Defaults

### ✅ Archivo: `/components/profile/types.ts` (líneas 116-150)

```typescript
export const DEFAULT_PROFILE: ProfileData = {
  // Contact Methods
  defaultContact: {
    inAppChat: true,      // ✅ CORRECTO
    whatsapp: false,
    phoneCall: false,
    email: false,
  },
  
  // Delivery Options
  defaultDelivery: {
    pickup: false,        // ❌ PROBLEMA: Ninguno en true
    delivery: false,      // Necesita: meetup: true
    shipping: false,
    virtual: false,
  },
  
  // Visibility
  defaultVisibility: 'public',  // ✅ CORRECTO
  
  // Currency
  defaultCurrency: 'CLP',       // ⚠️ HARDCODED - Necesita ser dinámico
  
  // Region
  appLanguage: 'es',            // ⚠️ HARDCODED - Necesita ser dinámico
  region: 'Chile',              // ⚠️ HARDCODED - Necesita ser dinámico
  
  // Addresses
  addresses: [],                // ⚠️ Vacío - OK, pero necesita default coords
}
```

---

## 🔍 Problemas Identificados

### ❌ Problema 1: Delivery Options Incorrectos
**Archivo**: `/components/profile/types.ts:137-142`

**Estado Actual**:
```typescript
defaultDelivery: {
  pickup: false,
  delivery: false,  // Llamado "delivery" pero debería ser "meetup"
  shipping: false,
  virtual: false,
}
```

**Problemas**:
1. No existe campo `meetup`
2. Todos están en `false` por defecto
3. El campo `delivery` no es lo mismo que `meetup`

**Esperado según usuario**:
- `meetup: true` (por defecto)

---

### ❌ Problema 2: Estructura de Delivery Options

La estructura actual en `ProfileData` es:
```typescript
defaultDelivery: {
  pickup: boolean;
  delivery: boolean;
  shipping: boolean;
  virtual: boolean;
}
```

**Falta**: Campo `meetup`

---

### ⚠️ Problema 3: Currency Hardcoded

**Actual**: Siempre `'CLP'` (Chile)  
**Necesita**: Detección automática basada en región del usuario

---

### ⚠️ Problema 4: Language & Region Hardcoded

**Actual**: 
- `appLanguage: 'es'`
- `region: 'Chile'`

**Necesita**: Detección automática basada en IP/país del usuario

---

### ⚠️ Problema 5: Default Address Coordinates

**Actual**: Cada address tiene coords, pero no hay default al crear cuenta

**Necesita**: Coordenadas por defecto según país detectado

---

## 📋 Otros Defaults Encontrados

### `/components/filters/constants.ts:129-164`
```typescript
export const defaultFilters: FilterOptions = {
  sortBy: "newest",
  type: "all",
  offerModes: [],
  groupsScope: "all",
  specificGroups: [],
  includeTags: [],
  excludeTags: [],
  category: "all",
  subcategory: "all",
  condition: "all",
  locationMode: "current",
  locationCity: "",
  radius: 10,
  includeShipping: false,
  privacyPin: false,
  sellerType: "all",
  minSellerRating: "none",
  specificSeller: "",
  deliveryModes: [],
  contactModes: [],
  campaignScope: "all",
  specificCampaigns: [],
  eventScope: "all",
  specificEvents: [],
  discountFilter: "all",
  discountPreset: "none",
  currency: "CLP",  // ⚠️ También hardcoded aquí
  minPrice: "",
  maxPrice: "",
  lifecycle: "all",
  visibility: "all",
  minItemRating: "none",
  hiddenFilter: "exclude",
  reportedFilter: "exclude",
};
```

---

### `/components/profile/AddressFormFlow.tsx:37`
```typescript
coordinates: { 
  latitude: -33.0472, 
  longitude: -71.6127 
}, // Viña del Mar default
```

⚠️ Hardcoded para Chile

---

## 🎯 Propuesta de Solución

### 1. Crear Sistema de Detección de Región

**Archivo nuevo**: `/lib/regionDetection.ts`

```typescript
export interface RegionDefaults {
  country: string;
  countryCode: string;
  currency: string;
  language: 'es' | 'en' | 'pt';
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
}

// Mapa de países a defaults
const REGION_DEFAULTS: Record<string, RegionDefaults> = {
  CL: {
    country: 'Chile',
    countryCode: 'CL',
    currency: 'CLP',
    language: 'es',
    region: 'Chile',
    coordinates: { latitude: -33.4489, longitude: -70.6693 }, // Santiago
    timezone: 'America/Santiago',
  },
  US: {
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    language: 'en',
    region: 'United States',
    coordinates: { latitude: 37.7749, longitude: -122.4194 }, // SF
    timezone: 'America/Los_Angeles',
  },
  BR: {
    country: 'Brazil',
    countryCode: 'BR',
    currency: 'BRL',
    language: 'pt',
    region: 'Brazil',
    coordinates: { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
    timezone: 'America/Sao_Paulo',
  },
  AR: {
    country: 'Argentina',
    countryCode: 'AR',
    currency: 'ARS',
    language: 'es',
    region: 'Argentina',
    coordinates: { latitude: -34.6037, longitude: -58.3816 }, // Buenos Aires
    timezone: 'America/Argentina/Buenos_Aires',
  },
  // ... más países
};

export async function detectUserRegion(): Promise<RegionDefaults> {
  // Opción 1: Usar API de geolocalización
  // Opción 2: Usar navegador (navigator.language, timezone)
  // Opción 3: Usar IP del usuario
  
  // Por ahora, fallback a Chile
  return REGION_DEFAULTS['CL'];
}

export function getRegionDefaults(countryCode: string): RegionDefaults {
  return REGION_DEFAULTS[countryCode] || REGION_DEFAULTS['CL'];
}
```

---

### 2. Actualizar ProfileData Type

**Archivo**: `/components/profile/types.ts`

**Agregar campo `meetup` a `defaultDelivery`**:

```typescript
defaultDelivery: {
  pickup: boolean;
  meetup: boolean;    // ✨ NUEVO
  delivery: boolean;
  shipping: boolean;
  virtual: boolean;
}
```

---

### 3. Actualizar DEFAULT_PROFILE

**Archivo**: `/components/profile/types.ts:116-150`

```typescript
export const DEFAULT_PROFILE: ProfileData = {
  // ... resto igual
  
  defaultContact: {
    inAppChat: true,      // ✅ Correcto
    whatsapp: false,
    phoneCall: false,
    email: false,
  },
  
  defaultDelivery: {
    pickup: false,
    meetup: true,         // ✨ NUEVO - Default según usuario
    delivery: false,
    shipping: false,
    virtual: false,
  },
  
  defaultVisibility: 'public',  // ✅ Correcto
  
  // ⚠️ Estos se deben establecer dinámicamente
  defaultCurrency: 'CLP',  // Se sobrescribe en createDefaultProfile()
  appLanguage: 'es',       // Se sobrescribe en createDefaultProfile()
  region: 'Chile',         // Se sobrescribe en createDefaultProfile()
  
  addresses: [],
  
  // ... resto igual
}
```

---

### 4. Crear Función de Inicialización

**Archivo nuevo**: `/lib/profileDefaults.ts`

```typescript
import { DEFAULT_PROFILE, type ProfileData } from '../components/profile/types';
import { detectUserRegion, type RegionDefaults } from './regionDetection';

export async function createDefaultProfile(
  email: string,
  loginMethod: 'email' | 'google' | 'apple'
): Promise<ProfileData> {
  // Detectar región del usuario
  const regionDefaults = await detectUserRegion();
  
  // Crear profile con defaults dinámicos
  return {
    ...DEFAULT_PROFILE,
    email,
    loginMethod,
    
    // Defaults fijos
    defaultContact: {
      inAppChat: true,   // ✅ InAppChat por defecto
      whatsapp: false,
      phoneCall: false,
      email: false,
    },
    
    defaultDelivery: {
      pickup: false,
      meetup: true,      // ✅ Meetup por defecto
      delivery: false,
      shipping: false,
      virtual: false,
    },
    
    defaultVisibility: 'public',  // ✅ Public por defecto
    
    // Defaults dinámicos basados en región
    defaultCurrency: regionDefaults.currency,
    appLanguage: regionDefaults.language,
    region: regionDefaults.region,
    
    // Crear address por defecto con coordenadas de la región
    addresses: [],  // Se puede agregar una dirección default opcional
  };
}

export function getRegionalDefaults(): RegionDefaults {
  // Versión sincrónica para uso en componentes
  // Usa localStorage o contexto para región ya detectada
  const cached = localStorage.getItem('userRegion');
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fallback
  return {
    country: 'Chile',
    countryCode: 'CL',
    currency: 'CLP',
    language: 'es',
    region: 'Chile',
    coordinates: { latitude: -33.4489, longitude: -70.6693 },
    timezone: 'America/Santiago',
  };
}
```

---

### 5. Actualizar Mock Profiles

**Archivo**: `/data/mockProfiles.ts`

Actualizar todos los mock profiles para incluir `meetup`:

```typescript
defaultDelivery: {
  pickup: true,
  meetup: true,   // ✨ Agregar
  delivery: false,
  shipping: false,
  virtual: false,
},
```

---

### 6. Migración de Datos Existentes

**Archivo**: `/lib/migrations/addMeetupField.ts`

```typescript
export function migrateLegacyProfiles(profile: any): ProfileData {
  // Si el profile no tiene campo meetup, agregarlo
  if (profile.defaultDelivery && !('meetup' in profile.defaultDelivery)) {
    return {
      ...profile,
      defaultDelivery: {
        ...profile.defaultDelivery,
        meetup: false,  // Default conservative para profiles existentes
      },
    };
  }
  
  return profile;
}
```

---

## 📊 Resumen de Cambios Necesarios

### Archivos a Crear (2)
1. ✨ `/lib/regionDetection.ts` - Sistema de detección de región
2. ✨ `/lib/profileDefaults.ts` - Función de creación de profile con defaults

### Archivos a Modificar (4)
1. 🔄 `/components/profile/types.ts`
   - Agregar `meetup` a `defaultDelivery`
   - Actualizar `DEFAULT_PROFILE` con `meetup: true`

2. 🔄 `/data/mockProfiles.ts`
   - Agregar `meetup` a todos los mock profiles

3. 🔄 `/components/profile/PublishingDeliveryPage.tsx`
   - Agregar opción "Meetup" en UI

4. 🔄 Componentes que usan `defaultDelivery`
   - Actualizar para manejar campo `meetup`

---

## 🎯 Defaults Finales Propuestos

### Para Nuevo Usuario (Chile)
```typescript
{
  defaultContact: {
    inAppChat: true,      // ✅ Default fijo
    whatsapp: false,
    phoneCall: false,
    email: false,
  },
  
  defaultDelivery: {
    pickup: false,
    meetup: true,         // ✅ Default fijo
    delivery: false,
    shipping: false,
    virtual: false,
  },
  
  defaultVisibility: 'public',     // ✅ Default fijo
  defaultCurrency: 'CLP',          // ✨ Dinámico (Chile)
  appLanguage: 'es',               // ✨ Dinámico (Chile)
  region: 'Chile',                 // ✨ Dinámico
}
```

### Para Nuevo Usuario (USA)
```typescript
{
  // ... mismo contact y delivery
  
  defaultCurrency: 'USD',          // ✨ Dinámico (USA)
  appLanguage: 'en',               // ✨ Dinámico (USA)
  region: 'United States',         // ✨ Dinámico
}
```

---

## 🚀 Plan de Implementación

### Fase 1: Agregar Campo Meetup
1. Actualizar `ProfileData` type
2. Actualizar `DEFAULT_PROFILE`
3. Actualizar mock profiles
4. Actualizar UI de PublishingDeliveryPage

### Fase 2: Sistema de Detección de Región
1. Crear `regionDetection.ts`
2. Implementar detección básica (navigator + timezone)
3. Agregar fallback a Chile

### Fase 3: Integración
1. Crear `profileDefaults.ts`
2. Usar en sign-up flow
3. Cachear región detectada

### Fase 4: Testing
1. Verificar defaults para nuevos usuarios
2. Verificar migración de usuarios existentes
3. Verificar detección de región

---

## ⚠️ Consideraciones

1. **Privacy**: La detección de región debe ser transparente y respetar privacy
2. **Fallback**: Siempre tener fallback a Chile si falla la detección
3. **Override**: Usuario debe poder cambiar manualmente currency/language
4. **Performance**: Cachear región detectada en localStorage
5. **Migration**: Profiles existentes necesitan migración para campo `meetup`

---

## 📝 Notas Adicionales

### Detección de Región - Opciones

**Opción 1: Navigator API (Recomendada)**
```typescript
const language = navigator.language; // "es-CL"
const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone; // "America/Santiago"
```

**Opción 2: IP Geolocation API**
```typescript
const response = await fetch('https://ipapi.co/json/');
const data = await response.json();
```

**Opción 3: Google Sign-In Data**
- Si login con Google, puede venir con país en el token

---

**Status**: ⚠️ REQUIERE DECISIÓN  
**Prioridad**: 🔴 ALTA  
**Impacto**: Mejora significativa de UX para nuevos usuarios
