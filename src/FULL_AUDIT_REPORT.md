# 🔍 AUDITORÍA COMPLETA - LISTLYUP APP

**Fecha:** 19 de Diciembre, 2025  
**Alcance:** Toda la aplicación  
**Objetivo:** Identificar todos los botones/acciones sin funcionalidad real

---

## 📊 RESUMEN EJECUTIVO

| Categoría | Total Items | Alta Prioridad | Media Prioridad | Baja Prioridad |
|-----------|-------------|----------------|-----------------|----------------|
| **Authentication** | 4 | 4 | 0 | 0 |
| **Publish Flow** | 3 | 3 | 0 | 0 |
| **My Listings** | 8 | 6 | 2 | 0 |
| **Product Detail** | 5 | 2 | 3 | 0 |
| **Groups** | 15 | 8 | 5 | 2 |
| **Action Center** | 47 | 35 | 10 | 2 |
| **Messages/Chat** | 3 | 2 | 1 | 0 |
| **Profile** | 4 | 1 | 3 | 0 |
| **Billing** | 5 | 2 | 3 | 0 |
| **Settings** | 3 | 1 | 2 | 0 |
| **Navigation** | 3 | 0 | 3 | 0 |
| **Trail Detail** | 2 | 0 | 2 | 0 |
| **TOTAL** | **102** | **64** | **34** | **4** |

**Tiempo estimado total:** ~180-220 horas de desarrollo

---

## 🔴 PRIORIDAD ALTA (64 items - BLOCKERS)

### 1. AUTHENTICATION & USER MANAGEMENT (4 items)

#### 1.1 Sign In - Real Authentication
**Ubicación:** `/App.tsx:271`  
**Estado Actual:** Solo setea `isAuthenticated = true`  
**Acción Esperada:** Autenticación real con backend  
**Complejidad:** Alta  
**Tiempo estimado:** 8-12h  
**Código:**
```typescript
onSignIn={(email, password) => {
  // TODO: Implement actual authentication
  state.setIsAuthenticated(true);
  navigation.navigateToHome();
  toast.success("Signed in successfully!");
}}
```
**Plan:**
- Integrar con Supabase Auth o custom backend
- Validar credenciales
- Manejar errores (usuario no existe, contraseña incorrecta, etc.)
- Persistir sesión con tokens
- Implementar refresh tokens

---

#### 1.2 Sign Up - Real Registration
**Ubicación:** `/App.tsx:308`  
**Estado Actual:** Solo setea `isAuthenticated = true`  
**Acción Esperada:** Registro real con backend  
**Complejidad:** Alta  
**Tiempo estimado:** 8-12h  
**Código:**
```typescript
onSignUp={(data) => {
  // TODO: Implement actual registration
  state.setIsAuthenticated(true);
  navigation.navigateToHome();
  toast.success("Account created successfully!");
}}
```
**Plan:**
- Validar datos (email único, username único, etc.)
- Crear usuario en backend
- Enviar email de verificación
- Auto-login después de registro
- Manejar errores de validación

---

#### 1.3 Forgot Password
**Ubicación:** `/App.tsx:296`  
**Estado Actual:** Solo muestra toast  
**Acción Esperada:** Enviar email de reset  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  
**Código:**
```typescript
onForgotPassword={() => {
  toast.info("Password reset link sent to your email");
}}
```
**Plan:**
- Validar email existe
- Generar token de reset
- Enviar email con link
- Implementar página de reset password
- Verificar token antes de cambiar contraseña

---

#### 1.4 Social Login (Google/Apple/Facebook)
**Ubicación:** `/App.tsx:277-293`  
**Estado Actual:** Solo setea mock users  
**Acción Esperada:** OAuth real  
**Complejidad:** Alta  
**Tiempo estimado:** 12-16h  
**Plan:**
- Configurar OAuth providers
- Implementar callback handlers
- Crear/vincular cuentas en backend
- Manejar permisos y scopes
- Sync profile data

---

### 2. PUBLISH FLOW & LISTINGS (3 items)

#### 2.1 Publish Listing - Save to Backend
**Ubicación:** `/App.tsx:245`  
**Estado Actual:** No guarda nada  
**Acción Esperada:** Crear listing en backend  
**Complejidad:** Alta  
**Tiempo estimado:** 10-14h  
**Código:**
```typescript
onPublish={(data) => {
  // TODO: Save to backend
}}
```
**Plan:**
- Validar datos completos
- Subir imágenes a storage
- Crear listing en database
- Asociar con campaigns/events si aplica
- Trigger notifications a grupos
- Implementar auto-moderation (AI)

---

#### 2.2 Edit Listing - Update Backend
**Ubicación:** `/App.tsx:258`  
**Estado Actual:** Solo console.log  
**Acción Esperada:** Actualizar listing en backend  
**Complejidad:** Alta  
**Tiempo estimado:** 8-10h  
**Código:**
```typescript
onPublish={(data) => {
  // TODO: Update listing in backend
  console.log('Listing updated:', data);
}}
```
**Plan:**
- Cargar datos existentes del listing
- Validar cambios
- Actualizar imágenes si cambiaron
- Actualizar database
- Re-validar con grupos/campaigns/events
- Notificar a followers

---

#### 2.3 Create Event Listing from Event Hub
**Ubicación:** `/App.tsx:624`  
**Estado Actual:** Solo toast + navigate  
**Acción Esperada:** Abrir PublishFlow pre-configurado  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  
**Código:**
```typescript
onCreateEventListing={() => {
  toast.info('Redirecting to Publish Flow (Event listing)...');
  // TODO: Open Publish Flow with type=event pre-selected
  navigation.navigateToPublishFlow();
}}
```
**Plan:**
- Pasar parámetros a PublishFlow
- Pre-seleccionar type="event"
- Pre-llenar event hub si viene del contexto
- Validar eligibility automáticamente

---

### 3. MY LISTINGS PAGE (6 items de alta prioridad)

#### 3.1 Bulk Delete
**Ubicación:** `/components/MyListingsPage.tsx:453`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Eliminar múltiples listings  
**Complejidad:** Media  
**Tiempo estimado:** 6-8h  
**Código:**
```typescript
const handleBulkDelete = () => {
  toast.success(`Deleted ${selectedIds.size} listings`);
  deselectAll();
};
```
**Plan:**
- Confirmation dialog
- Soft delete vs hard delete
- Eliminar de database
- Eliminar imágenes de storage
- Notificar a grupos/campaigns/events
- Update analytics

---

#### 3.2 Bulk Pause
**Ubicación:** `/components/MyListingsPage.tsx:458`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Pausar múltiples listings  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  
**Código:**
```typescript
const handleBulkPause = () => {
  toast.success(`Paused ${selectedIds.size} listings`);
  deselectAll();
};
```
**Plan:**
- Update status en database
- Ocultar de feeds públicos
- Mantener en My Listings
- Notificar a interesados (mensajes pendientes)

---

#### 3.3 Bulk Archive
**Ubicación:** `/components/MyListingsPage.tsx:463`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Archivar múltiples listings  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

#### 3.4 Delete Individual Listing
**Ubicación:** `/components/MyListingsPage.tsx:508`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Eliminar listing individual  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

#### 3.5 Duplicate Listing
**Ubicación:** `/components/MyListingsPage.tsx:512`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Crear copia del listing  
**Complejidad:** Media  
**Tiempo estimado:** 6-8h  
**Plan:**
- Copiar todos los datos
- Duplicar imágenes o referenciar
- Abrir PublishFlow con datos pre-llenados
- Marcar como draft

---

#### 3.6 Toggle Pause/Resume
**Ubicación:** `/components/MyListingsPage.tsx:504`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Pausar/reanudar listing  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

### 4. PRODUCT DETAIL PAGE (2 items de alta prioridad)

#### 4.1 Mark as Sold
**Ubicación:** `/components/ProductDetailPage.tsx:632`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Marcar producto vendido  
**Complejidad:** Alta  
**Tiempo estimado:** 8-10h  
**Código:**
```typescript
onMarkedAsSold={(buyerId, finalPrice) => {
  toast.success('Success! You can now leave a review.');
  // Could open rating sheet here
}}
```
**Plan:**
- Update listing status
- Registrar buyer y precio final
- Trigger rating flow
- Update analytics
- Notificar a otros interesados
- Archivar conversaciones

---

#### 4.2 Edit Listing from Product Detail
**Ubicación:** `/components/product-detail/ProductActions.tsx:100`  
**Estado Actual:** Solo toast + console.log  
**Acción Esperada:** Abrir PublishFlow en modo edit  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  
**Código:**
```typescript
'edit-listing': () => {
  // TODO: In a real app, this would:
  // 1. Convert product to PublishFormData format
  // 2. Call navigation.navigateToEditListing(product.id)
  // 3. App.tsx would pass initialData to PublishFlow
  toast.info('Edit Listing: Opening edit mode...');
  console.log('Edit listing:', product);
}
```

---

### 5. GROUPS MANAGEMENT (8 items de alta prioridad)

#### 5.1 Leave Group
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:515`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Abandonar grupo  
**Complejidad:** Media  
**Tiempo estimado:** 6-8h  
**Código:**
```typescript
const handleLeaveConfirm = () => {
  if (!selectedGroup) return;
  toast.success(`Left group: ${selectedGroup.name}`);
  setIsLeaveDialogOpen(false);
};
```
**Plan:**
- Confirmation dialog (ya existe)
- Remove user de group members
- Update user's groups list
- Notificar a admins si es moderador
- Manejar contenido del usuario (mantener/ocultar)

---

#### 5.2 Cancel Join Request
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:542`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Cancelar solicitud pendiente  
**Complejidad:** Simple  
**Tiempo estimado:** 2-3h  

---

#### 5.3 Accept Group Invitation
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:546`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Aceptar invitación  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

#### 5.4 Decline Group Invitation
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:550`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Rechazar invitación  
**Complejidad:** Simple  
**Tiempo estimado:** 2-3h  

---

#### 5.5 Join Public Group (from GroupDetailPage)
**Ubicación:** `/components/group-detail/GroupDetailPage.tsx:429`  
**Estado Actual:** Simula con setTimeout  
**Acción Esperada:** Unirse inmediatamente  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

#### 5.6 Request to Join Private Group
**Ubicación:** `/components/group-detail/GroupDetailPage.tsx:438`  
**Estado Actual:** Simula con setTimeout  
**Acción Esperada:** Enviar solicitud real  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  

---

#### 5.7 Cancel Join Request (from GroupDetailPage)
**Ubicación:** `/components/group-detail/GroupDetailPage.tsx:447`  
**Estado Actual:** Simula con setTimeout  
**Acción Esperada:** Cancelar solicitud real  
**Complejidad:** Simple  
**Tiempo estimado:** 2-3h  

---

#### 5.8 Create Group
**Ubicación:** `/components/groups/CreateGroupSheet.tsx:33`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Crear grupo real  
**Complejidad:** Alta  
**Tiempo estimado:** 10-12h  
**Código:**
```typescript
toast.success(`Group "${name}" created successfully!`);
onOpenChange(false);
```
**Plan:**
- Validar nombre único
- Crear grupo en database
- Asignar usuario como admin
- Generar slug
- Upload avatar/cover si aplica
- Crear configuración por defecto
- Setup permissions

---

### 6. ACTION CENTER (35 items de alta prioridad)

Aquí está el BULK de TODOs. Action Center tiene 47 items sin implementar.

#### 6.1 PERSONAL TAB (10 items)

##### 6.1.1 Continue Draft
**Ubicación:** `/components/ActionCenterPage.tsx:345`  
**Plan:** Ya tiene handler `onContinueDraft`, solo falta cargar draft data

##### 6.1.2 Renew Listing
**Ubicación:** `/components/ActionCenterPage.tsx:351`  
**Plan:** Extend expiration date en backend

##### 6.1.3 Resume Paused Listing
**Ubicación:** `/components/ActionCenterPage.tsx:356`  
**Plan:** Update status de paused a active

##### 6.1.4 Delete Rejected Listing
**Ubicación:** `/components/ActionCenterPage.tsx:380`  
**Plan:** Soft/hard delete con confirmación

##### 6.1.5 Edit Rejected Listing
**Ubicación:** `/components/ActionCenterPage.tsx:388`  
**Plan:** Navigate to PublishFlow con data + error context

##### 6.1.6 View Pending Status
**Ubicación:** `/components/ActionCenterPage.tsx:396`  
**Plan:** Ya funciona (abre ViewStatusDialog), solo falta data real

##### 6.1.7 View Rejection Reasons
**Ubicación:** `/components/ActionCenterPage.tsx:407`  
**Plan:** Ya funciona (abre RejectionReasonsDialog), solo falta data real

##### 6.1.8 Trade Offer - Accept
**Ubicación:** `/components/ActionCenterPage.tsx:1144`  
**Plan:** 
- Mark trade as accepted
- Create notification for offerer
- Open chat between users
- Update listing status to "Trade Pending"

##### 6.1.9 Trade Offer - Counter
**Ubicación:** `/components/ActionCenterPage.tsx:1151`  
**Plan:**
- Send counter offer to offerer
- Create notification

##### 6.1.10 Trade Offer - Decline
**Ubicación:** `/components/ActionCenterPage.tsx:1156`  
**Plan:**
- Mark trade as declined
- Create notification
- Remove from action center

---

#### 6.2 CAMPAIGNS TAB (6 items)

##### 6.2.1 Approve Campaign Request (Owner)
**Ubicación:** `/components/ActionCenterPage.tsx:752`  
**TODOs:**
- Add listing to campaign
- Notify listing owner
- Remove from action center

##### 6.2.2 Reject Campaign Request (Owner)
**Ubicación:** `/components/ActionCenterPage.tsx:782`  
**TODOs:**
- Reject campaign request
- Notify listing owner
- Remove from action center

---

#### 6.3 EVENTS TAB (6 items)

##### 6.3.1 Approve Event Request (Owner)
**Ubicación:** `/components/ActionCenterPage.tsx:821`  
**TODOs:**
- Add listing to event hub
- Notify listing owner
- Remove from action center

##### 6.3.2 Reject Event Request (Owner)
**Ubicación:** `/components/ActionCenterPage.tsx:851`  
**TODOs:**
- Reject event request
- Notify listing owner
- Remove from action center

---

#### 6.4 GROUPS TAB (7 items)

##### 6.4.1 Approve Join Request
**Ubicación:** `/components/ActionCenterPage.tsx:443`  
**TODOs:**
- Add user to group
- Send notification to user
- Remove from action center

##### 6.4.2 Reject Join Request
**Ubicación:** `/components/ActionCenterPage.tsx:470`  
**TODOs:**
- Reject join request
- Send notification to user
- Remove from action center

##### 6.4.3 Review Group Report
**Ubicación:** `/components/ActionCenterPage.tsx:481`  
**Plan:** Navigate to report details page

##### 6.4.4 Take Action on Report
**Ubicación:** `/components/ActionCenterPage.tsx:508`  
**TODOs:**
- Handle report action (warning/ban/remove content)
- Notify reporter
- Remove from action center

##### 6.4.5 Dismiss Report
**Ubicación:** `/components/ActionCenterPage.tsx:537`  
**TODOs:**
- Mark report as dismissed
- Remove from action center

---

#### 6.5 ADMIN TAB (6 items)

##### 6.5.1 Review Platform Report
**Ubicación:** `/components/ActionCenterPage.tsx:547`  
**Plan:** Navigate to detailed report review page

##### 6.5.2 Resolve Platform Report
**Ubicación:** `/components/ActionCenterPage.tsx:571`  
**TODOs:**
- Mark report as resolved
- Notify reporter
- Archive report

##### 6.5.3 Dismiss Platform Report
**Ubicación:** `/components/ActionCenterPage.tsx:599`  
**TODOs:**
- Dismiss report
- Archive report

##### 6.5.4 Review Flagged Listing
**Ubicación:** `/components/ActionCenterPage.tsx:609`  
**Plan:** Navigate to listing detail with flag context

##### 6.5.5 Approve Flagged Listing
**Ubicación:** `/components/ActionCenterPage.tsx:633`  
**TODOs:**
- Clear flag
- Publish listing
- Notify seller
- Remove from action center

##### 6.5.6 Remove Flagged Listing
**Ubicación:** `/components/ActionCenterPage.tsx:663`  
**TODOs:**
- Remove listing
- Notify seller with reason
- Apply penalties if needed
- Remove from action center

---

### 7. MESSAGES & CHAT (2 items de alta prioridad)

#### 7.1 Send Message
**Ubicación:** `/components/ChatView.tsx:137`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Enviar mensaje real  
**Complejidad:** Alta  
**Tiempo estimado:** 8-10h  
**Código:**
```typescript
const handleSendMessage = () => {
  // ... create message object
  setMessageInput('');
  // TODO: Send to backend
  toast.success('Message sent!');
};
```
**Plan:**
- Enviar a backend con WebSocket o HTTP
- Guardar en database
- Trigger push notification
- Update unread count
- Implement read receipts
- Handle multimedia messages

---

#### 7.2 Publish Answer to Question
**Ubicación:** `/components/ActionCenterPage.tsx:1639`  
**TODOs:**
- Post answer to API
- Notify asker and waiting users
- Update question status
- Remove from Action Center pending list

**También en:**
- `/components/notifications/NotificationsPage.tsx:518`
- `/components/MessagesPage.tsx:428`

---

### 8. BILLING (2 items de alta prioridad)

#### 8.1 Upgrade Plan
**Ubicación:** `/components/BillingPage.tsx:115`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Proceso de upgrade real  
**Complejidad:** Alta  
**Tiempo estimado:** 16-20h  
**Código:**
```typescript
const handleUpgrade = (planId: string) => {
  if (planId === currentPlan.toLowerCase()) {
    toast.info('This is your current plan');
    return;
  }
  toast.success(`Upgrading to ${planId} plan...`);
  // Handle upgrade logic
};
```
**Plan:**
- Integrate payment processor (Stripe/MercadoPago)
- Create checkout session
- Handle payment confirmation
- Update user plan en database
- Enable new features
- Send confirmation email
- Handle prorated billing

---

#### 8.2 Change Payment Method
**Ubicación:** `/components/BillingPage.tsx:329`  
**Estado Actual:** Solo toast  
**Acción Esperada:** Actualizar método de pago  
**Complejidad:** Alta  
**Tiempo estimado:** 8-10h  

---

### 9. SETTINGS (1 item de alta prioridad)

#### 9.1 Change Password
**Ubicación:** `/components/settings/contexts/SecurityContext.tsx:78`  
**Estado Actual:** Simula con setTimeout  
**Acción Esperada:** Cambiar contraseña real  
**Complejidad:** Media  
**Tiempo estimado:** 4-6h  
**Código:**
```typescript
const changePassword = async (currentPassword: string, newPassword: string) => {
  // TODO: Implement actual password change
  await new Promise(resolve => setTimeout(resolve, 500));
  toast.success('Password changed successfully');
};
```
**Plan:**
- Validar contraseña actual
- Hash nueva contraseña
- Update en database
- Invalidate sessions
- Send confirmation email

---

## 🟡 PRIORIDAD MEDIA (34 items - NICE TO HAVE)

### 1. MY LISTINGS PAGE (2 items)

#### 1.1 Create Listing (desde empty state)
**Ubicación:** `/components/MyListingsPage.tsx:521`  
**Estado Actual:** Solo toast  
**Plan:** Ya existe PublishFlow, solo falta conectar

---

#### 1.2 Analytics Dashboard
**Ubicación:** `/components/MyListingsPage.tsx:534`  
**Estado Actual:** Solo toast  
**Plan:** Navigate to StatisticsPage con filtro de listing

---

### 2. PRODUCT DETAIL PAGE (3 items)

#### 2.1 Save to Collection
**Ubicación:** `/components/ProductDetailPage.tsx:134`  
**Estado Actual:** Solo actualiza estado local  
**Plan:** Sync con backend

---

#### 2.2 Share Product
**Ubicación:** `/components/ProductDetailPage.tsx:309`  
**Estado Actual:** Solo copy to clipboard  
**Plan:** Ya funciona bien, solo falta analytics tracking

---

### 3. GROUPS (5 items)

#### 3.1 Mute Group
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:487`  
**Plan:** Update notification preferences en backend

---

#### 3.2 Pin/Unpin Group
**Ubicación:** `/components/groups/MyGroupsPageNew.tsx:497, 504`  
**Plan:** Save pin preferences en backend

---

#### 3.3 Report Group/User/Content
**Ubicación:** 
- `/components/group-detail/GroupDetailPage.tsx:459`
- `/components/group-detail/GroupDetailPage.tsx:594`
**Plan:** Create report en backend + notification to moderators

---

#### 3.4 Pending Requests (GroupDetailPage - Member Tab)
**Ubicación:** `/components/group-detail/MemberTabContent.tsx:192`  
**Plan:** Navigate to Action Center > Groups tab

---

#### 3.5 Manage Members
**Ubicación:** `/components/group-detail/MemberTabContent.tsx:210`  
**Plan:** Open admin panel para member management

---

### 4. PROFILE (3 items)

#### 4.1 Use Current Location
**Ubicación:** `/components/ProfilePage.tsx:221`  
**Estado Actual:** Simula con setTimeout  
**Plan:** Usar Geolocation API real

---

#### 4.2 Save Profile
**Ubicación:** `/components/ProfilePage.tsx:170`  
**Estado Actual:** Solo toast  
**Plan:** Update user profile en backend

---

#### 4.3 Upload Avatar
**Plan:** Actualmente no existe upload real, solo URL

---

### 5. BILLING (3 items)

#### 5.1 Add Payment Method
**Ubicación:** `/components/BillingPage.tsx:343`  
**Plan:** Similar a Change Payment Method

---

#### 5.2 Download Invoice
**Ubicación:** `/components/BillingPage.tsx:404`  
**Plan:** Generate PDF y trigger download

---

### 6. SETTINGS (2 items)

#### 6.1 Delete Account
**Ubicación:** `/components/settings/contexts/SecurityContext.tsx:108`  
**Plan:** 
- Send deletion request
- Schedule data deletion (30 days grace)
- Send confirmation email

---

#### 6.2 Export Data
**Ubicación:** `/components/settings/contexts/DataContext.tsx:92`  
**Plan:** Generate JSON/CSV export de todos los datos del usuario

---

### 7. NAVIGATION (3 items)

#### 7.1 Trail Detail - View Product
**Ubicación:** `/App.tsx:883`  
**Estado Actual:** Solo toast  
**Plan:** Navigate to ProductDetailPage

---

#### 7.2 Trail Detail - Open Chat
**Ubicación:** `/App.tsx:887`  
**Estado Actual:** Solo toast  
**Plan:** Navigate to ChatConversationPage

---

#### 7.3 My Organization
**Ubicación:** `/App.tsx:783`  
**Estado Actual:** Solo toast  
**Plan:** Implementar página de Organization (Fase futura)

---

### 8. GROUP DETAIL - MEMBER TAB (6 items)

**Todos en:** `/components/group-detail/MemberTabContent.tsx`

- View Reports (línea 230)
- Moderate Listings (línea 245)
- Moderate Content (línea 257)
- Edit Group Profile (línea 276)
- View Products of Member (línea 587)
- Invite to Other Group (línea 605) - ✅ Ya funciona

---

### 9. GROUP DETAIL - MANAGEMENT (4 items)

**Ubicación:** `/components/group-detail/GroupDetailPage.tsx`

#### 9.1 Invite Members
**Ubicación:** Línea 462  
**Plan:** Ya existe InviteContactsSheet, solo falta backend

#### 9.2 Manage Group (Action Center)
**Ubicación:** Línea 469  
**Plan:** Navigate to Action Center > Groups

#### 9.3 Group Settings
**Ubicación:** Línea 474  
**Plan:** Open group settings page

#### 9.4 View Member Profile
**Ubicación:** Línea 584  
**Plan:** Navigate to user ProfilePage

---

## 🟢 PRIORIDAD BAJA (4 items - POLISH)

### 1. STATISTICS PAGE

#### 1.1 Export Data as CSV
**Ubicación:** `/components/StatisticsPage.tsx:94`  
**Plan:** Generate CSV + download

---

### 2. SMART FEATURES

#### 2.1 Feature Upgrade CTA
**Ubicación:** `/components/settings/SmartFeaturesPage.tsx:29`  
**Plan:** Navigate to BillingPage

---

### 3. ACTION CENTER

#### 3.1 Notification Click
**Ubicación:** `/components/ActionCenterPage.tsx:325`  
**Plan:** Navigate to NotificationsPage (ya implementado en otros lugares)

#### 3.2 Settings Click
**Ubicación:** `/components/ActionCenterPage.tsx:329`  
**Plan:** Navigate to SettingsPage (ya implementado en otros lugares)

---

## 📋 PLAN DE CIERRE - FASES

### FASE 1: FUNDAMENTOS (40-50h)
**Objetivo:** Funcionalidad básica end-to-end

**Prioridad 1:**
1. ✅ Authentication (Sign In/Sign Up/Social Login) - 28h
2. ✅ Publish Flow Save/Edit - 20h
3. ✅ Messages Send - 10h
4. ✅ Basic Billing (Upgrade Plan) - 20h

**Total Fase 1:** ~78h

---

### FASE 2: MY LISTINGS & PRODUCT MANAGEMENT (30-40h)
**Objetivo:** Gestión completa de listings

**Prioridad 1:**
1. ✅ Bulk Actions (Delete/Pause/Archive) - 14h
2. ✅ Individual Actions (Delete/Duplicate/Toggle) - 14h
3. ✅ Mark as Sold - 10h
4. ✅ Edit from Product Detail - 6h

**Total Fase 2:** ~44h

---

### FASE 3: GROUPS ECOSYSTEM (35-45h)
**Objetivo:** Gestión completa de grupos

**Prioridad 1:**
1. ✅ Create Group - 12h
2. ✅ Join/Leave/Request - 16h
3. ✅ Invitations Accept/Decline - 6h
4. ✅ Basic Moderation - 12h

**Prioridad 2:**
5. Pin/Mute - 4h
6. Reports - 8h
7. Member Management UI - 12h

**Total Fase 3:** ~70h

---

### FASE 4: ACTION CENTER - COMPLETE (50-60h)
**Objetivo:** Cerrar TODOS los TODOs del Action Center

**Personal Tab:**
1. Draft/Renew/Resume - 8h
2. Delete/Edit - 6h
3. Trade Offers - 12h

**Campaigns Tab:**
4. Approve/Reject - 8h

**Events Tab:**
5. Approve/Reject - 8h

**Groups Tab:**
6. Join Requests - 6h
7. Reports - 10h

**Admin Tab:**
8. Platform Reports - 10h
9. Flagged Listings - 10h
10. User Issues - 12h

**Total Fase 4:** ~90h

---

### FASE 5: POLISH & UX (20-30h)
**Objetivo:** Features secundarias y mejoras

1. Profile Save/Location - 8h
2. Analytics Dashboard - 12h
3. Trail Detail Navigation - 4h
4. Export Data - 6h
5. Payment Methods - 10h

**Total Fase 5:** ~40h

---

## 🎯 RESUMEN DE TIEMPO TOTAL

| Fase | Horas Estimadas | Prioridad |
|------|----------------|-----------|
| Fase 1: Fundamentos | 78h | 🔴 Crítica |
| Fase 2: My Listings | 44h | 🔴 Crítica |
| Fase 3: Groups | 70h | 🟡 Alta |
| Fase 4: Action Center | 90h | 🟡 Alta |
| Fase 5: Polish | 40h | 🟢 Media |
| **TOTAL** | **322h** | **~8-10 semanas** |

---

## 🚀 RECOMENDACIÓN DE IMPLEMENTACIÓN

### OPCIÓN A: ENFOQUE VERTICAL (Recomendado)
**Estrategia:** Completar flujos end-to-end uno por uno

**Sprint 1 (2 semanas):**
- Authentication completo
- Publish Flow completo
- **Resultado:** Usuario puede registrarse y publicar listings

**Sprint 2 (2 semanas):**
- My Listings completo
- Product Detail completo
- **Resultado:** Usuario puede gestionar sus listings

**Sprint 3 (2 semanas):**
- Groups básico (create/join/leave)
- **Resultado:** Usuario puede participar en grupos

**Sprint 4 (3 semanas):**
- Action Center - Personal Tab
- Messages completo
- **Resultado:** Usuario puede gestionar su actividad

**Sprint 5 (2 semanas):**
- Action Center - Campaigns/Events
- **Resultado:** Campaigns/Events funcionales

**Sprint 6 (2 semanas):**
- Action Center - Groups/Admin
- Billing completo
- **Resultado:** Moderation y monetización funcional

---

### OPCIÓN B: ENFOQUE HORIZONTAL
**Estrategia:** Backend primero, luego frontend

**No recomendado** - Más tiempo total, menos feedback

---

## 📊 MÉTRICAS DE PROGRESO

**Estado Actual:**
- ✅ Implementado: ~30% (navegación, UI, mocks)
- ⚠️ Parcial: ~40% (funcionalidad simulada)
- ❌ Pendiente: ~30% (backend integration)

**Deuda Técnica:**
- 102 TODOs identificados
- 64 bloqueadores críticos
- 34 mejoras importantes
- 4 nice-to-have

---

## 🔧 DEPENDENCIAS TÉCNICAS

### BACKEND REQUIRED:
1. **Database:** Supabase o PostgreSQL
2. **Storage:** S3 o Supabase Storage para imágenes
3. **Auth:** Supabase Auth o JWT custom
4. **Real-time:** WebSocket para chat/notifications
5. **Email:** SendGrid o similar
6. **Payment:** Stripe/MercadoPago
7. **AI:** OpenAI API para auto-moderation

### FRONTEND UPDATES:
1. Estado global para auth (ya existe useCurrentUser)
2. API client layer
3. Error handling global
4. Loading states
5. Offline support (opcional)

---

## ✅ ACCEPTANCE CRITERIA GLOBAL

**Para considerar la app "completa":**

- [ ] Usuario puede registrarse y autenticarse
- [ ] Usuario puede publicar/editar/eliminar listings
- [ ] Usuario puede enviar mensajes
- [ ] Usuario puede crear/unirse a grupos
- [ ] Usuario puede gestionar solicitudes en Action Center
- [ ] Moderadores pueden moderar contenido
- [ ] Admin puede gestionar reportes y usuarios
- [ ] Sistema de billing funcional
- [ ] Todas las navegaciones funcionan
- [ ] No hay toasts placeholder
- [ ] Zero console.errors en producción

---

**Generado:** 19 de Diciembre, 2025  
**Próximo paso:** Priorizar Fase 1 y comenzar implementación
