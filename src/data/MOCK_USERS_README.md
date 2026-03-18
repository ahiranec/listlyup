# 🧪 Mock Users - Testing Guide

## 📋 Resumen

Sistema completo de 3 perfiles mock para testing exhaustivo de todas las funcionalidades de ListlyUp.

---

## 👥 PERFILES DISPONIBLES

### 1️⃣ ANA GARCÍA - Usuario Free Básico

**Archivo:** `mockUserAna` en `/data/mockUsers.ts`

#### 🔑 Credenciales
- **ID:** `user-ana-google`
- **Email:** `ana.garcia@gmail.com`
- **Username:** `ana_garcia`
- **Login Method:** Google Sign-In

#### 📊 Plan & Cuenta
- **Plan:** Free
- **Account Type:** Individual (Personal)
- **Location:** Santiago, Región Metropolitana

#### 👥 Grupos (2 total - solo member)
- Tech Enthusiasts Chile (member)
- Local Community V Region (member)

#### 📦 Listings (2 total)
- Lámpara de Escritorio ($25, sale, public)
- Libros Universitarios (free, public)

#### 🏢 Organizations
- Ninguna (Free plan no permite)

#### ⭐ Seller Stats
- Rating: 4.2 ⭐
- Reviews: 3
- Total Sales: 5
- Response Time: 2h average
- Verified: ❌

#### ✨ Features Disponibles
- ❌ AI Suggestions (Free sí tiene acceso según feature flags)
- ❌ AI Auto-Analyze
- ❌ Organizations
- ❌ Bulk Upload
- ❌ Featured Listings
- ✅ Location: Approximate only
- ✅ 1 Address saved

---

### 2️⃣ CARLOS MENDOZA - Usuario Plus Tienda

**Archivo:** `mockUserCarlos` en `/data/mockUsers.ts`

#### 🔑 Credenciales
- **ID:** `user-carlos-apple`
- **Email:** `carlos.mendoza@icloud.com`
- **Username:** `techstore_vina`
- **Login Method:** Apple Sign-In

#### 📊 Plan & Cuenta
- **Plan:** Plus
- **Account Type:** Store (Business)
- **Location:** Viña del Mar, V Región

#### 👥 Grupos (3 total)
- **Tech Enthusiasts Chile** (ADMIN) 👑
- **Vintage Marketplace** (MODERATOR) 🛡️
- **Tech Traders Chile** (ADMIN - creado por él) 👑

#### 📦 Listings (5 total)
- iPhone 14 Pro ($850, sale, public)
- MacBook Air M2 ($1200, sale, group: Tech Traders)
- Cámara Vintage Olympus (trade, group: Vintage Marketplace)
- Reparación iPhone ($30, service, public)
- Samsung Galaxy S23 (DRAFT - $650)

#### 🏢 Organizations (1 - owner)
- **TechStore Viña** (Store type, owner role)

#### ⭐ Seller Stats
- Rating: 4.8 ⭐
- Reviews: 47
- Total Sales: 142
- Response Time: 30min average
- Verified: ✅ (Verified Seller Badge)

#### ✨ Features Disponibles
- ✅ AI Suggestions
- ✅ AI Auto-Analyze (Plus feature)
- ✅ Organizations (1 permitida)
- ❌ Bulk Upload
- ❌ Featured Listings
- ✅ Location: Exact (Store account)
- ✅ 2 Addresses saved (Tienda + Bodega)
- ✅ Access to Groups context in Action Center

---

### 3️⃣ MARÍA LÓPEZ - Usuario Pro Individual

**Archivo:** `mockUserMaria` en `/data/mockUsers.ts`

#### 🔑 Credenciales
- **ID:** `user-maria-email`
- **Email:** `maria.lopez@example.com`
- **Username:** `maria_concon`
- **Login Method:** Email Sign-In

#### 📊 Plan & Cuenta
- **Plan:** Pro
- **Account Type:** Individual (Personal)
- **Location:** Concón, V Región

#### 👥 Grupos (4 total)
- **Tech Enthusiasts Chile** (member)
- **Vintage Marketplace** (ADMIN) 👑
- **Local Community V Region** (MODERATOR) 🛡️
- **Photography Enthusiasts** (ADMIN - creado por ella) 👑

#### 📦 Listings (7 total)
- Clases de Yoga ($15, service, public)
- Cartera Diseñador ($120, trade, group: Vintage)
- Canon EOS R5 ($2800, sale, group: Photography)
- Arriendo Departamento ($800, rent, public)
- Workshop Fotografía ($45, event, public)
- Sesiones Fotográficas (PAUSED - $80)
- Tour Gastronómico (PENDING approval - $35, group)

#### 🏢 Organizations
- Ninguna (Individual no puede aunque tenga Pro)

#### ⭐ Seller Stats
- Rating: 4.9 ⭐
- Reviews: 28
- Total Sales: 34
- Response Time: 1h average
- Verified: ✅ (Featured Seller Badge - Pro)

#### ✨ Features Disponibles
- ✅ AI Suggestions
- ✅ AI Auto-Analyze
- ❌ Organizations (Individual account)
- ✅ Bulk Upload (Pro feature)
- ✅ Featured Listings (Pro feature)
- ✅ Location: User choice (Pro flexibility)
- ✅ 2 Addresses saved (Casa + Estudio Yoga)
- ✅ Access to Groups context in Action Center
- ✅ Performance & Activity insights

---

## 🔄 CÓMO CAMBIAR DE USUARIO

Edita `/data/currentUser.ts`:

```typescript
// Cambiar esta línea:
export const mockCurrentUser: CurrentUser = mockUserAna; 

// A cualquiera de estos:
export const mockCurrentUser: CurrentUser = mockUserAna;     // Free
export const mockCurrentUser: CurrentUser = mockUserCarlos;  // Plus
export const mockCurrentUser: CurrentUser = mockUserMaria;   // Pro
```

---

## 📂 ESTRUCTURA DE ARCHIVOS

```
/data/
├── mockUsers.ts          # CurrentUser interface (simplificado)
├── mockProfiles.ts       # ProfileData interface (completo)
├── mockUserGroups.ts     # MyGroup[] con roles
├── mockUserListings.ts   # Listings de cada usuario
├── mockUserStats.ts      # Seller stats y ratings
├── mockData.ts           # Export central
└── MOCK_USERS_README.md  # Esta guía
```

---

## 🧪 ESCENARIOS DE TESTING

### Test 1: Plan Features
1. Login como Ana (Free) → No puede usar Organizations
2. Login como Carlos (Plus) → Puede crear 1 Organization
3. Login como María (Pro) → Tiene bulk upload y featured listings

### Test 2: Account Types
1. Carlos (Store) → Location defaults to "Exact"
2. Ana/María (Individual) → Location defaults to "Approximate"

### Test 3: Group Roles
1. Carlos → Admin en Tech Enthusiasts y Tech Traders
2. Carlos → Moderator en Vintage Marketplace
3. María → Admin en Vintage y Photography
4. María → Moderator en Local Community

### Test 4: Listing States
- Ana: Solo activos
- Carlos: 1 draft (Samsung)
- María: 1 paused (Sesiones Foto), 1 pending (Tour)

### Test 5: Action Center
- Ana: user role (básico)
- Carlos: group-admin role (acceso a Groups context)
- María: group-admin role (acceso a Groups context + Performance)

### Test 6: Organizations
- Carlos: TechStore Viña (owner)
- Ana/María: Sin organizations

---

## 📊 COMPARACIÓN RÁPIDA

| Feature | Ana (Free) | Carlos (Plus) | María (Pro) |
|---------|-----------|---------------|-------------|
| **AI Suggestions** | ✅ | ✅ | ✅ |
| **AI Auto-Analyze** | ❌ | ✅ | ✅ |
| **Organizations** | ❌ | ✅ (1) | ❌ (Personal) |
| **Bulk Upload** | ❌ | ❌ | ✅ |
| **Featured Listings** | ❌ | ❌ | ✅ |
| **Location Default** | Approximate | Exact | Choice |
| **Addresses** | 1 | 2 | 2 |
| **Groups** | 2 | 3 | 4 |
| **Admin/Mod** | 0 | 3 | 3 |
| **Total Listings** | 2 | 5 | 7 |
| **Special States** | - | 1 draft | 1 paused, 1 pending |
| **Seller Rating** | 4.2 ⭐ | 4.8 ⭐ ✓ | 4.9 ⭐ 🌟 |

---

## ⚠️ NOTAS IMPORTANTES

1. **accountType Mapping:**
   - ProfileData usa: `'personal' | 'business'`
   - CurrentUser usa: `'individual' | 'store'`
   - Mapping: personal → individual, business → store

2. **Plan Capitalization:**
   - ProfileData: `'Free' | 'Plus' | 'Pro'` (display)
   - CurrentUser: `'free' | 'plus' | 'pro'` (lógica)

3. **Group Roles:**
   - Groups usan: `'admin' | 'moderator' | 'member'` (NO 'owner')
   - Organizations usan: `'owner' | 'admin' | 'member'`

4. **Login Methods:**
   - Valores válidos: `'email' | 'google' | 'apple'`
   - NO existe 'facebook' en el sistema

---

## 🎯 PRÓXIMOS PASOS

1. ✅ Crear mocks completos
2. ✅ Integrar en products.ts
3. ✅ Actualizar currentUser.ts
4. 🔄 Testear con cada usuario
5. 🔄 Verificar feature flags
6. 🔄 Testear Action Center contexts
7. 🔄 Verificar Profile completeness

---

**Happy Testing! 🚀**
