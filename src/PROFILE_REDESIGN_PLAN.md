# 🚀 PLAN DE IMPLEMENTACIÓN - PROFILE REDESIGN

**Objetivo:** Rediseñar Profile para separar responsabilidades: Identidad + Logística vs Publishing Preferences  
**Tiempo estimado:** 7.75 horas  
**Prioridad:** 🔴 HIGH

---

## 📊 RESUMEN EJECUTIVO

### **Cambios Principales:**

| Acción | Descripción | Impacto |
|--------|-------------|---------|
| ❌ **ELIMINAR** | Publishing Defaults (5 páginas) | Simplifica Profile |
| ✅ **AGREGAR** | Account Type (Personal/Business) | Habilita B2B |
| ✅ **AGREGAR** | Organizations (con plan gating) | Feature premium |
| ✅ **MEJORAR** | Addresses (microcopy educativo) | Claridad UX |
| ✅ **ACTUALIZAR** | Checklist (5/5 profile-focused) | Refleja realidad |

### **Beneficios:**

- ✅ **UX:** Separación clara de responsabilidades
- ✅ **Business:** Upsell path (Free → Plus for orgs)
- ✅ **Technical:** Código más mantenible
- ✅ **Users:** Menos confusión

---

## 📋 FASE 1: RESTRUCTURAR TYPES (1 hora)

### **Objetivo:** Actualizar ProfileData con nuevos campos

### **Archivos a modificar:**
- `/components/profile/types.ts`

### **Tareas:**

```typescript
// 1. Agregar Account Type
accountType: 'personal' | 'business';

// 2. Agregar Organizations
organizations: Organization[];
activeOrganizationId?: string;

// 3. Crear interface Organization
export interface Organization {
  id: string;
  name: string;
  type: 'store' | 'agency' | 'other';
  customType?: string;
  description?: string;
  logoUrl?: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
}

// 4. Actualizar DEFAULT_PROFILE
accountType: 'personal',
organizations: [],
activeOrganizationId: undefined,

// 5. ELIMINAR campos Publishing Defaults
// ❌ defaultContact
// ❌ defaultDelivery
// ❌ defaultVisibility
// ❌ defaultCurrency

// 6. Crear nuevo ProfileCompleteness
export interface ProfileCompleteness {
  accountInfo: boolean;
  emailVerified: boolean;
  phoneVerified: boolean; // optional
  personalInfo: boolean;
  addressAdded: boolean;
}

// 7. Actualizar getProfileCompleteness()
export function getProfileCompleteness(profile: ProfileData): ProfileCompleteness {
  return {
    accountInfo: !!profile.email && !!profile.username,
    emailVerified: profile.emailVerified,
    phoneVerified: profile.phoneVerified,
    personalInfo: !!profile.displayName,
    addressAdded: profile.addresses.length > 0,
  };
}

// 8. Actualizar calculateProfileScore()
export function calculateProfileScore(completeness: ProfileCompleteness): number {
  const required = [
    completeness.accountInfo,
    completeness.emailVerified,
    completeness.personalInfo,
    completeness.addressAdded,
  ];
  return required.filter(v => v === true).length; // 0-4
}
```

### **Checklist FASE 1:**
- [ ] Agregar `accountType` field
- [ ] Agregar `organizations` array
- [ ] Agregar `activeOrganizationId` field
- [ ] Crear `Organization` interface
- [ ] Eliminar `defaultContact`
- [ ] Eliminar `defaultDelivery`
- [ ] Eliminar `defaultVisibility`
- [ ] Eliminar `defaultCurrency`
- [ ] Actualizar `DEFAULT_PROFILE`
- [ ] Actualizar `ProfileCompleteness`
- [ ] Actualizar `getProfileCompleteness()`
- [ ] Actualizar `calculateProfileScore()`
- [ ] Verificar TypeScript compila sin errores

---

## 📋 FASE 2: ACTUALIZAR PROFILE HUB (1 hora)

### **Objetivo:** Reflejar nueva estructura en el HUB principal

### **Archivos a modificar:**
- `/components/profile/ProfileHub.tsx`

### **Tareas:**

1. **Actualizar Header:**
   ```tsx
   {/* Account Type Display */}
   <div className="flex items-center justify-between mt-2">
     <p className="text-sm text-muted-foreground">
       Account Type: <span className="font-medium">{profile.accountType === 'personal' ? 'Personal' : 'Business'}</span>
     </p>
     <Button variant="ghost" size="sm" onClick={onNavigate.navigateToAccountType}>
       Change
     </Button>
   </div>
   ```

2. **Actualizar Checklist:**
   ```tsx
   <CompletionChecklist completeness={completeness} variant="summary" />
   {score < 4 && (
     <button className="text-xs text-primary hover:underline mt-1">
       Complete your profile
     </button>
   )}
   ```

3. **Remover sección Publishing:**
   ```tsx
   // ❌ DELETE
   <ProfileSection
     icon={FileText}
     title="Publishing Defaults"
     ...
   />
   ```

4. **Agregar sección Account Type:**
   ```tsx
   <ProfileSection
     icon={Building}
     title="Account Type"
     description="Personal or Business"
     onClick={onNavigate.navigateToAccountType}
   />
   ```

5. **Agregar sección Organizations:**
   ```tsx
   <ProfileSection
     icon={Store}
     title="Organizations"
     description={
       profile.accountType === 'personal' 
         ? "Business accounts only"
         : profile.organizations.length > 0
           ? `${profile.organizations.length} organization${profile.organizations.length > 1 ? 's' : ''}`
           : "Create or join organizations"
     }
     onClick={onNavigate.navigateToOrganizations}
     badge={
       profile.accountType === 'personal' || profile.plan === 'free'
         ? <Lock className="w-4 h-4 text-muted-foreground" />
         : profile.organizations.length > 0
           ? <Badge variant="secondary">{profile.organizations.length}</Badge>
           : null
     }
     disabled={profile.accountType === 'personal'}
   />
   ```

### **Checklist FASE 2:**
- [ ] Agregar Account Type display en header
- [ ] Actualizar checklist a nueva lógica
- [ ] Eliminar sección "Publishing Defaults"
- [ ] Agregar sección "Account Type"
- [ ] Agregar sección "Organizations" con gating
- [ ] Actualizar navegación
- [ ] Verificar UI se ve correcta

---

## 📋 FASE 3: CREAR ACCOUNT TYPE PAGE (45 min)

### **Archivo a crear:**
- `/components/profile/AccountTypePage.tsx` (NUEVO)

### **Implementación:**

```tsx
/**
 * Account Type Page
 * Select Personal or Business account type
 */

import { ArrowLeft, User, Building } from 'lucide-react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Alert, AlertDescription } from '../ui/alert';
import { useProfile } from '../../contexts/ProfileContext';
import { ProfileNavigation } from './types';

interface AccountTypePageProps {
  onBack: () => void;
  onNavigate: ProfileNavigation;
}

export function AccountTypePage({ onBack, onNavigate }: AccountTypePageProps) {
  const { profile, updateProfile } = useProfile();

  const handleTypeChange = (type: 'personal' | 'business') => {
    updateProfile({ accountType: type });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col max-w-[480px] mx-auto">
      {/* Status Bar */}
      <div className="bg-[#d9d9d9] h-[45px]" aria-label="Status Bar" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="flex items-center h-14 px-4">
          <Button variant="ghost" size="sm" onClick={onBack} className="h-9 w-9 p-0">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="font-semibold ml-3">Account Type</h1>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-auto px-4 py-6 space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-1">Select your account type</h2>
          <p className="text-sm text-muted-foreground">
            You can change this anytime
          </p>
        </div>

        <RadioGroup value={profile.accountType} onValueChange={handleTypeChange}>
          {/* Personal */}
          <div className={`p-4 border rounded-xl transition-all ${
            profile.accountType === 'personal' 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200'
          }`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="personal" id="personal" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4" />
                  <Label htmlFor="personal" className="font-medium cursor-pointer">
                    Personal
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  I'm an individual seller
                </p>
              </div>
            </div>
          </div>

          {/* Business */}
          <div className={`p-4 border rounded-xl transition-all ${
            profile.accountType === 'business' 
              ? 'border-primary bg-primary/5' 
              : 'border-gray-200'
          }`}>
            <div className="flex items-start gap-3">
              <RadioGroupItem value="business" id="business" className="mt-1" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Building className="w-4 h-4" />
                  <Label htmlFor="business" className="font-medium cursor-pointer">
                    Business
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  I represent a business
                </p>
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Next Steps for Business */}
        {profile.accountType === 'business' && (
          <Alert>
            <AlertDescription>
              <p className="font-medium mb-2">✨ Next Steps</p>
              <p className="text-sm mb-3">
                With a Business account you can:
              </p>
              <ul className="text-sm space-y-1 mb-3">
                <li>• Create organizations</li>
                <li>• Publish as your business</li>
                <li>• Collaborate with team</li>
              </ul>
              <Button 
                variant="outline" 
                size="sm"
                onClick={onNavigate.navigateToOrganizations}
              >
                Go to Organizations →
              </Button>
            </AlertDescription>
          </Alert>
        )}
      </main>
    </div>
  );
}
```

### **Checklist FASE 3:**
- [ ] Crear `AccountTypePage.tsx`
- [ ] Implementar RadioGroup Personal/Business
- [ ] Agregar Next Steps alert para Business
- [ ] Integrar en ProfileRouter
- [ ] Agregar a useProfileNavigation
- [ ] Testar navegación

---

## 📋 FASE 4: CREAR ORGANIZATIONS PAGES (2 horas)

### **Archivos a crear:**
- `/components/profile/OrganizationsPage.tsx` (NUEVO)
- `/components/profile/OrganizationFormFlow.tsx` (NUEVO)
- `/components/profile/shared/OrganizationCard.tsx` (NUEVO)

### **Implementación resumida:**

**OrganizationsPage.tsx:**
- Plan gating (Free → Upgrade CTA)
- List organizations si existen
- Empty state si no hay
- Create / Join buttons
- Info box explicativo

**OrganizationFormFlow.tsx:**
- Name field (required)
- Type selector (Store/Agency/Other)
- Custom type input (si Other)
- Description (optional)
- Logo upload (optional)
- "Set as active" checkbox

**OrganizationCard.tsx:**
- Icon por type
- Name + Role
- Active/Inactive badge
- Created date + Members count
- Edit / Settings buttons
- Activate/Deactivate toggle

### **Checklist FASE 4:**
- [ ] Crear `OrganizationsPage.tsx` con plan gating
- [ ] Implementar empty state
- [ ] Implementar list view
- [ ] Crear `OrganizationFormFlow.tsx`
- [ ] Implementar create flow
- [ ] Crear `OrganizationCard.tsx`
- [ ] Implementar active/inactive logic
- [ ] Integrar en ProfileRouter
- [ ] Agregar a useProfileNavigation
- [ ] Testar flujo completo

---

## 📋 FASE 5: ACTUALIZAR ADDRESSES PAGE (30 min)

### **Objetivo:** Agregar microcopy educativo

### **Archivo a modificar:**
- `/components/profile/AddressesPage.tsx`

### **Cambios:**

```tsx
{/* Info Box - ADD AT TOP */}
<Alert className="mb-6">
  <MapPin className="h-4 w-4" />
  <AlertDescription>
    <p className="font-medium mb-1">ℹ️ Your exact locations</p>
    <p className="text-sm mb-2">
      These are your real addresses for logistics and pickup. 
      The public location precision is defined when you publish each listing.
    </p>
    <Button variant="link" size="sm" className="p-0 h-auto">
      Learn more about privacy →
    </Button>
  </AlertDescription>
</Alert>
```

### **Checklist FASE 5:**
- [ ] Agregar info box arriba
- [ ] Copy educativo sobre addresses exactas
- [ ] Link a "Learn more"
- [ ] Verificar no menciona offset/aproximación
- [ ] Testar visual

---

## 📋 FASE 6: REMOVER PUBLISHING DEFAULTS (30 min)

### **Objetivo:** Eliminar páginas de Publishing del Profile

### **Archivos a ELIMINAR:**
- `/components/profile/PublishingPage.tsx` ❌
- `/components/profile/PublishingContactPage.tsx` ❌
- `/components/profile/PublishingDeliveryPage.tsx` ❌
- `/components/profile/PublishingVisibilityPage.tsx` ❌
- `/components/profile/PublishingCurrencyPage.tsx` ❌

### **Archivos a MODIFICAR:**
- `/components/profile/ProfileRouter.tsx`
- `/hooks/useProfileNavigation.ts`
- `/components/profile/types.ts`

### **Cambios en ProfileRouter.tsx:**

```tsx
// ❌ DELETE these route cases:
// {currentProfileView === 'publishing' && ...}
// {currentProfileView === 'publishing-contact' && ...}
// {currentProfileView === 'publishing-delivery' && ...}
// {currentProfileView === 'publishing-visibility' && ...}
// {currentProfileView === 'publishing-currency' && ...}
```

### **Cambios en useProfileNavigation.ts:**

```tsx
// ❌ DELETE these view types:
// | 'publishing'
// | 'publishing-contact'
// | 'publishing-delivery'
// | 'publishing-visibility'
// | 'publishing-currency'

// ❌ DELETE these navigation functions:
// navigateToPublishing
// navigateToPublishingContact
// navigateToPublishingDelivery
// navigateToPublishingVisibility
// navigateToPublishingCurrency
```

### **Checklist FASE 6:**
- [ ] Delete 5 Publishing pages
- [ ] Remove from ProfileRouter
- [ ] Remove from useProfileNavigation
- [ ] Remove ProfileNavigation types
- [ ] Verificar no errores TypeScript
- [ ] Verificar navegación funciona

---

## 📋 FASE 7: ACTUALIZAR PUBLISHFLOW (1 hora)

### **Objetivo:** Desacoplar PublishFlow de Profile defaults

### **Archivo a modificar:**
- `/components/publish/hooks/usePublishFlow.ts`

### **Cambios:**

```typescript
const getInitialFormData = (): PublishFormData => {
  const defaults = { ...INITIAL_FORM_DATA };

  if (!profile) {
    return defaults;
  }

  // ✅ KEEP: Default address (valid use case)
  const defaultAddress = profile.addresses.find(a => a.isDefaultForPublishing);
  if (defaultAddress) {
    defaults.location = {
      latitude: defaultAddress.coordinates.latitude,
      longitude: defaultAddress.coordinates.longitude,
      address: defaultAddress.formattedAddress,
      city: defaultAddress.formattedAddress.split(',')[1]?.trim() || profile.region,
      region: profile.region,
    };
  }

  // ❌ REMOVE: defaultContact mapping
  // ❌ REMOVE: defaultDelivery mapping
  // ❌ REMOVE: defaultVisibility mapping
  // ❌ REMOVE: defaultCurrency mapping

  // ✅ NEW: Active organization pre-select
  if (profile.activeOrganizationId) {
    // TODO: Add publishAsOrganization field to PublishFormData
    // defaults.publishAsOrganizationId = profile.activeOrganizationId;
  }

  return defaults;
};
```

### **Checklist FASE 7:**
- [ ] Remove defaultContact dependency
- [ ] Remove defaultDelivery dependency
- [ ] Remove defaultVisibility dependency
- [ ] Remove defaultCurrency dependency
- [ ] Keep default address logic
- [ ] Add activeOrganization logic (future)
- [ ] Verificar PublishFlow funciona
- [ ] Testar flujo completo

---

## 📋 FASE 8: TESTING & VALIDATION (1 hora)

### **Objetivo:** Verificar todo funciona correctamente

### **Checklist Completo:**

#### **Profile HUB:**
- [ ] Account Type muestra correctamente
- [ ] Checklist actualizado (4/5)
- [ ] Sección Publishing eliminada
- [ ] Sección Account Type agregada
- [ ] Sección Organizations agregada
- [ ] Plan badge visible

#### **Account Type:**
- [ ] Personal/Business toggle funciona
- [ ] Next Steps muestra para Business
- [ ] Navegación a Organizations funciona

#### **Organizations:**
- [ ] Plan gating funciona (Free → CTA)
- [ ] Plus/Pro → Create enabled
- [ ] Empty state muestra correctamente
- [ ] List view con organizations funciona
- [ ] Create flow funciona
- [ ] Active/Inactive toggle funciona
- [ ] Edit organization funciona

#### **Addresses:**
- [ ] Info box muestra arriba
- [ ] Microcopy educativo claro
- [ ] CRUD funciona normal
- [ ] Default marking funciona

#### **Navigation:**
- [ ] Hub → Account Type → Hub
- [ ] Hub → Organizations → Hub
- [ ] Hub → Addresses → Hub
- [ ] No broken links
- [ ] No Publishing routes

#### **PublishFlow:**
- [ ] Abre sin errores
- [ ] Default address pre-llena
- [ ] Contact/Delivery/Visibility NO pre-llenan
- [ ] Funciona correctamente

#### **Technical:**
- [ ] No errores TypeScript
- [ ] No warnings en consola
- [ ] localStorage funciona
- [ ] Auto-save funciona

---

## 📊 TRACKING PROGRESS

| Fase | Estimado | Real | Status | Blocker |
|------|----------|------|--------|---------|
| FASE 1: Types | 1h | - | ⏳ | - |
| FASE 2: Hub | 1h | - | ⏳ | - |
| FASE 3: Account Type | 45min | - | ⏳ | - |
| FASE 4: Organizations | 2h | - | ⏳ | - |
| FASE 5: Addresses | 30min | - | ⏳ | - |
| FASE 6: Remove Publishing | 30min | - | ⏳ | - |
| FASE 7: PublishFlow | 1h | - | ⏳ | - |
| FASE 8: Testing | 1h | - | ⏳ | - |
| **TOTAL** | **7.75h** | **-** | ⏳ | - |

---

## 🎯 DECISIONES CLAVE

### **¿Por qué eliminar Publishing Defaults?**
❌ **No pertenecen a Profile** (identidad)  
✅ **Pertenecen a Settings** (preferencias app)  
✅ Simplifica UX

### **¿Por qué Organizations solo en Plus/Pro?**
✅ **Premium feature** para B2B  
✅ **Upsell path** claro  
✅ Incentivo upgrade

### **¿Por qué accountType separado de Organizations?**
✅ **Business account** ≠ "tener organización"  
✅ Puedes ser Business sin org (solo)  
✅ Flexibilidad

---

## ✅ SUCCESS CRITERIA

- ✅ Profile solo contiene: Account, Personal, Account Type, Organizations, Addresses, Language
- ✅ Publishing Defaults eliminado completamente
- ✅ Plan gating funciona correctamente
- ✅ Microcopy educativo en Addresses
- ✅ Organizations completo con CRUD
- ✅ PublishFlow desacoplado
- ✅ No errores técnicos
- ✅ UX clara y sin confusión

---

**Preparado por:** Development Team  
**Aprobado por:** ⏳ Pending  
**Status:** ✅ Ready to start
