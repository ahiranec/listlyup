# 🎯 PLAN DE ACCIÓN - CIERRE COMPLETO DE LISTLYUP

**Fecha:** 19 de Diciembre, 2025  
**Objetivo:** Cerrar todos los TODOs y tener app 100% funcional  
**Timeline:** 8-10 semanas (40-50 días laborales)

---

## 🎯 OBJETIVO FINAL

**App ListlyUp completamente funcional con:**
- ✅ 0 TODOs pendientes
- ✅ 0 toasts placeholder
- ✅ 100% de botones funcionales
- ✅ Backend integration completa
- ✅ Production ready

---

## 📋 FASES DE IMPLEMENTACIÓN

### 🔴 FASE 1: CORE FUNCTIONALITY (2 semanas)
**Objetivo:** MVP funcional - Usuario puede usar features básicas

#### Week 1: Authentication & Listing Creation

**Día 1-3: Authentication System**
```typescript
// IMPLEMENTAR:
1. Supabase Auth Setup
   - Configure providers (email, Google, Apple, Facebook)
   - Setup JWT tokens
   - Implement refresh token logic

2. Sign In/Sign Up Real
   - Email/password validation
   - Error handling (user exists, wrong password, etc.)
   - Session persistence

3. Social Login Integration
   - Google OAuth
   - Apple Sign In  
   - Facebook Login
   - Auto-create user profile

4. Password Reset Flow
   - Generate reset token
   - Send email with link
   - Reset password page
   - Token validation
```

**Archivos a modificar:**
- `/App.tsx` - Actualizar handlers
- Crear `/lib/auth/authService.ts`
- Crear `/lib/auth/socialAuth.ts`
- Actualizar `/hooks/useCurrentUser.ts`

**Testing:**
- [ ] Usuario puede registrarse con email
- [ ] Usuario puede hacer login
- [ ] Usuario puede hacer login con Google
- [ ] Usuario puede resetear contraseña
- [ ] Sesión persiste después de refresh

---

**Día 4-5: Publish Flow Backend Integration**
```typescript
// IMPLEMENTAR:
1. Image Upload Service
   - Upload to Supabase Storage o S3
   - Compress images
   - Generate thumbnails
   - Return URLs

2. Create Listing Endpoint
   - Validate listing data
   - Upload images
   - Create listing in database
   - Associate with groups/campaigns/events
   - Trigger AI auto-moderation
   - Send notifications to groups

3. Edit Listing Endpoint
   - Load existing listing
   - Update images (add/remove)
   - Update database
   - Re-validate with groups
   - Notify followers of changes

4. Update PublishFlow Component
   - Call real endpoints
   - Handle loading states
   - Handle errors
   - Success feedback
```

**Archivos a modificar:**
- `/App.tsx` - Update onPublish handlers
- Crear `/lib/api/listingsService.ts`
- Crear `/lib/storage/imageUpload.ts`
- Actualizar `/components/publish/PublishFlow.tsx`

**Testing:**
- [ ] Usuario puede crear listing con imágenes
- [ ] Usuario puede editar listing existente
- [ ] Imágenes se suben correctamente
- [ ] Listing aparece en feed
- [ ] Grupos reciben notificación

---

#### Week 2: My Listings Management & Messages

**Día 6-8: My Listings CRUD Complete**
```typescript
// IMPLEMENTAR:
1. Bulk Actions Backend
   - DELETE /api/listings/bulk/delete
   - PATCH /api/listings/bulk/pause
   - PATCH /api/listings/bulk/archive

2. Individual Actions Backend
   - DELETE /api/listings/:id
   - POST /api/listings/:id/duplicate
   - PATCH /api/listings/:id/toggle-pause

3. Update MyListingsPage
   - Call real endpoints
   - Refresh list after actions
   - Loading states
   - Error handling

4. Mark as Sold Flow
   - Update listing status
   - Record buyer info
   - Trigger rating sheet
   - Update analytics
   - Notify interested users
```

**Archivos a modificar:**
- `/components/MyListingsPage.tsx` - Update all handlers
- Crear `/lib/api/listingsActions.ts`
- Crear `/components/RatingSheet.tsx`

**Testing:**
- [ ] Usuario puede pausar/reanudar listing
- [ ] Usuario puede eliminar listing
- [ ] Usuario puede duplicar listing
- [ ] Usuario puede marcar como vendido
- [ ] Bulk actions funcionan

---

**Día 9-10: Real-time Chat**
```typescript
// IMPLEMENTAR:
1. WebSocket Setup (Supabase Realtime o Socket.io)
   - Connect to WebSocket server
   - Subscribe to chat rooms
   - Handle reconnection

2. Send Message Backend
   - POST /api/chats/:chatId/messages
   - Store in database
   - Broadcast to WebSocket
   - Send push notification
   - Update unread count

3. Update ChatView Component
   - Send real messages
   - Receive real-time updates
   - Handle multimedia (images, files)
   - Read receipts
   - Typing indicators

4. Notifications System
   - Push notifications setup
   - Email notifications
   - In-app notifications
```

**Archivos a modificar:**
- `/components/ChatView.tsx`
- Crear `/lib/realtime/websocket.ts`
- Crear `/lib/notifications/pushService.ts`

**Testing:**
- [ ] Usuario puede enviar mensaje
- [ ] Mensaje aparece en tiempo real
- [ ] Notificación push funciona
- [ ] Unread count actualiza
- [ ] Chat persiste después de refresh

---

### 🟡 FASE 2: GROUPS ECOSYSTEM (2 semanas)
**Objetivo:** Sistema completo de grupos funcional

#### Week 3: Group Management Core

**Día 11-13: Create & Join Groups**
```typescript
// IMPLEMENTAR:
1. Create Group Backend
   - POST /api/groups
   - Validate unique name/slug
   - Upload avatar/cover
   - Create default settings
   - Assign creator as admin
   - Setup permissions

2. Join/Leave Groups Backend
   - POST /api/groups/:id/join (public groups)
   - POST /api/groups/:id/request (private groups)
   - DELETE /api/groups/:id/leave
   - DELETE /api/groups/:id/cancel-request

3. Invitation System
   - POST /api/groups/:id/invite
   - POST /api/groups/invitations/:id/accept
   - POST /api/groups/invitations/:id/decline
   - Generate invite codes
   - Email invitations

4. Update Components
   - CreateGroupSheet
   - GroupDetailPage
   - ExploreGroupsSheet
   - MyGroupsPage
```

**Archivos a modificar:**
- `/components/groups/CreateGroupSheet.tsx`
- `/components/group-detail/GroupDetailPage.tsx`
- Crear `/lib/api/groupsService.ts`

**Testing:**
- [ ] Usuario puede crear grupo
- [ ] Usuario puede unirse a grupo público
- [ ] Usuario puede solicitar unirse a grupo privado
- [ ] Usuario puede abandonar grupo
- [ ] Invitaciones funcionan

---

**Día 14-15: Group Settings & Preferences**
```typescript
// IMPLEMENTAR:
1. Pin/Mute Groups
   - PATCH /api/users/me/groups/:id/pin
   - PATCH /api/users/me/groups/:id/mute
   - Save user preferences
   - Update UI immediately

2. Group Settings (Admin)
   - PATCH /api/groups/:id/settings
   - Update rules
   - Update privacy
   - Update permissions
   - Manage moderators

3. Member Management (Admin)
   - GET /api/groups/:id/members
   - DELETE /api/groups/:id/members/:userId (kick)
   - PATCH /api/groups/:id/members/:userId/role (promote/demote)
   - POST /api/groups/:id/ban/:userId
```

**Archivos a modificar:**
- `/components/groups/MyGroupsPageNew.tsx`
- Crear `/components/groups/GroupSettingsPage.tsx`

**Testing:**
- [ ] Usuario puede pinear grupos (máx 3)
- [ ] Usuario puede mutear grupos
- [ ] Admin puede editar settings
- [ ] Admin puede gestionar miembros

---

#### Week 4: Group Moderation

**Día 16-18: Reports & Moderation**
```typescript
// IMPLEMENTAR:
1. Report System
   - POST /api/reports (user/listing/content)
   - Store report details
   - Notify moderators
   - Auto-action based on AI flags

2. Review Reports (Moderators)
   - GET /api/groups/:id/reports
   - PATCH /api/reports/:id/resolve
   - PATCH /api/reports/:id/dismiss
   - Apply penalties (warning/ban/remove)

3. Content Moderation
   - Review pending listings
   - Approve/reject listings
   - Edit listing before approval
   - Bulk moderation actions

4. Update Action Center - Groups Tab
   - Show join requests
   - Show reports
   - Action handlers
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Groups tab
- Crear `/lib/api/reportsService.ts`
- Crear `/components/moderation/ReportDetailPage.tsx`

**Testing:**
- [ ] Usuario puede reportar contenido
- [ ] Moderador recibe notificación
- [ ] Moderador puede revisar reporte
- [ ] Moderador puede tomar acción
- [ ] Usuario reportado recibe notificación

---

### 🟡 FASE 3: ACTION CENTER COMPLETE (3 semanas)
**Objetivo:** Cerrar TODOS los TODOs del Action Center

#### Week 5: Personal Tab

**Día 19-21: Listing Actions**
```typescript
// IMPLEMENTAR:
1. Continue Draft
   - GET /api/listings/drafts/:id
   - Load draft data into PublishFlow
   - Auto-save drafts periodically

2. Renew Listing
   - PATCH /api/listings/:id/renew
   - Extend expiration date
   - Charge renewal fee (if applicable)
   - Update in feed

3. Resume Paused Listing
   - PATCH /api/listings/:id/resume
   - Change status to active
   - Show in feeds again

4. Delete Rejected Listing
   - DELETE /api/listings/:id
   - Soft delete vs hard delete
   - Archive data

5. Edit Rejected Listing
   - Load listing data with rejection context
   - Show rejection reasons
   - Navigate to PublishFlow in edit mode
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Update handlers
- `/components/publish/PublishFlow.tsx` - Handle draft loading

**Testing:**
- [ ] Usuario puede continuar draft
- [ ] Usuario puede renovar listing expirado
- [ ] Usuario puede reanudar listing pausado
- [ ] Usuario puede eliminar listing rechazado
- [ ] Usuario puede editar y reenviar listing rechazado

---

**Día 22-23: Trade Offers**
```typescript
// IMPLEMENTAR:
1. Accept Trade Offer
   - PATCH /api/trades/:id/accept
   - Update listing status to "Trade Pending"
   - Notify offerer
   - Open chat between users
   - Move to "Active Trades" section

2. Counter Offer
   - POST /api/trades/:id/counter
   - Send counter offer details
   - Notify original offerer
   - Keep original offer active

3. Decline Trade Offer
   - PATCH /api/trades/:id/decline
   - Notify offerer
   - Remove from action center
   - Archive offer

4. Trade Status Tracking
   - Trade pending → In progress → Completed
   - Both parties confirm trade
   - Leave ratings
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx`
- `/components/action-center/TradeOfferCard.tsx`
- Crear `/lib/api/tradesService.ts`

**Testing:**
- [ ] Usuario puede aceptar trade offer
- [ ] Usuario puede hacer counter offer
- [ ] Usuario puede rechazar trade offer
- [ ] Offerer recibe notificaciones
- [ ] Chat se abre automáticamente

---

#### Week 6: Campaigns & Events Tabs

**Día 24-25: Campaign Requests**
```typescript
// IMPLEMENTAR:
1. Approve Campaign Request (Owner)
   - PATCH /api/campaigns/:id/requests/:requestId/approve
   - Add listing to campaign
   - Notify listing owner
   - Remove from action center
   - Update campaign analytics

2. Reject Campaign Request (Owner)
   - PATCH /api/campaigns/:id/requests/:requestId/reject
   - Notify listing owner with reason
   - Remove from action center

3. View Campaign Request Status (User)
   - GET /api/campaigns/requests/:requestId
   - Show approval status
   - Show rejection reasons if applicable
   - Option to edit & resubmit
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Campaigns tab
- `/components/menu/CampaignDetailPage.tsx`
- Crear `/lib/api/campaignsService.ts`

**Testing:**
- [ ] Campaign owner puede aprobar request
- [ ] Campaign owner puede rechazar request
- [ ] Listing owner recibe notificación
- [ ] User puede ver status de su request
- [ ] Request approved → listing aparece en campaign

---

**Día 26-27: Event Hub Requests**
```typescript
// IMPLEMENTAR:
1. Approve Event Request (Owner)
   - PATCH /api/events/:id/requests/:requestId/approve
   - Add listing to event hub
   - Notify listing owner
   - Remove from action center
   - Check capacity limits

2. Reject Event Request (Owner)
   - PATCH /api/events/:id/requests/:requestId/reject
   - Notify listing owner with reason
   - Remove from action center

3. View Event Request Status (User)
   - GET /api/events/requests/:requestId
   - Show approval status
   - Show rejection reasons
   - Option to edit & resubmit
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Events tab
- `/components/menu/EventHubDetailPage.tsx`
- Crear `/lib/api/eventsService.ts`

**Testing:**
- [ ] Event owner puede aprobar request
- [ ] Event owner puede rechazar request
- [ ] Listing owner recibe notificación
- [ ] User puede ver status de su request
- [ ] Request approved → listing aparece en event

---

#### Week 7: Admin Tab

**Día 28-30: Platform Reports & Flagged Listings**
```typescript
// IMPLEMENTAR:
1. Review Platform Reports
   - GET /api/admin/reports
   - Filter by type/priority
   - View full context (reporter, reported, evidence)
   - Navigate to reported content

2. Resolve Platform Report
   - PATCH /api/admin/reports/:id/resolve
   - Apply action (warning/suspension/ban/remove)
   - Notify reporter
   - Notify reported user
   - Archive report

3. Dismiss Platform Report
   - PATCH /api/admin/reports/:id/dismiss
   - No action taken
   - Archive report
   - Optional: notify reporter

4. Review Flagged Listings
   - GET /api/admin/flagged-listings
   - View AI flags (inappropriate/spam/fake/etc.)
   - View user reports
   - Navigate to listing detail

5. Approve/Remove Flagged Listing
   - PATCH /api/admin/flagged-listings/:id/approve
   - PATCH /api/admin/flagged-listings/:id/remove
   - Clear flags
   - Notify seller
   - Apply penalties if needed
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Admin tab
- Crear `/components/admin/ReportDetailPage.tsx`
- Crear `/components/admin/FlaggedListingReview.tsx`
- Crear `/lib/api/adminService.ts`

**Testing:**
- [ ] Admin puede ver todos los reportes
- [ ] Admin puede revisar reporte con contexto completo
- [ ] Admin puede resolver reporte
- [ ] Admin puede ver listings flaggeados
- [ ] Admin puede aprobar/remover listing
- [ ] Usuarios reciben notificaciones

---

**Día 31-33: User Issues**
```typescript
// IMPLEMENTAR:
1. Review User Issues
   - GET /api/admin/user-issues
   - Types: verification, appeals, disputes, account-access
   - View user history
   - View evidence/documentation

2. Verification Requests
   - Review identity documents
   - Approve/reject verification
   - Grant verified badge
   - Notify user

3. Account Appeals
   - Review ban/suspension appeals
   - View original ban reason
   - Decide to restore or maintain
   - Update account status
   - Notify user

4. Account Access Issues
   - Reset password
   - Unlock account
   - Merge duplicate accounts
   - Send access reset link

5. Disputes Resolution
   - Review buyer-seller disputes
   - View evidence from both parties
   - Mediate resolution
   - Enforce decision
   - Close dispute
```

**Archivos a modificar:**
- `/components/ActionCenterPage.tsx` - Admin tab
- Crear `/components/admin/UserIssueDetailPage.tsx`
- Crear `/lib/api/userIssuesService.ts`

**Testing:**
- [ ] Admin puede revisar verification requests
- [ ] Admin puede aprobar/rechazar verification
- [ ] Admin puede revisar appeals
- [ ] Admin puede restaurar cuenta
- [ ] Admin puede resolver disputes
- [ ] Usuarios reciben notificaciones

---

### 🟢 FASE 4: BILLING & MONETIZATION (1 semana)
**Objetivo:** Sistema de pagos funcional

#### Week 8: Payment Integration

**Día 34-36: Stripe/MercadoPago Integration**
```typescript
// IMPLEMENTAR:
1. Setup Payment Processor
   - Configure Stripe/MercadoPago account
   - Setup webhooks
   - Create products/plans
   - Setup pricing tiers

2. Upgrade Plan Flow
   - Create checkout session
   - Handle payment success
   - Update user plan in database
   - Enable new features
   - Send confirmation email
   - Handle prorated billing

3. Payment Methods Management
   - Add payment method
   - Update payment method
   - Remove payment method
   - Set default payment method

4. Invoices & Billing History
   - Generate invoices
   - Download invoice as PDF
   - View payment history
   - Refund management (admin)

5. Subscription Management
   - Cancel subscription
   - Downgrade plan
   - Upgrade plan
   - Pause subscription
   - Reactivate subscription
```

**Archivos a modificar:**
- `/components/BillingPage.tsx`
- Crear `/lib/payments/stripeService.ts`
- Crear `/lib/payments/webhookHandlers.ts`
- Crear `/components/billing/CheckoutPage.tsx`

**Testing:**
- [ ] Usuario puede seleccionar plan
- [ ] Usuario puede completar pago
- [ ] Plan se actualiza inmediatamente
- [ ] Features se desbloquean
- [ ] Usuario recibe confirmación
- [ ] Invoice se genera
- [ ] Usuario puede descargar invoice
- [ ] Usuario puede cancelar subscription

---

**Día 37-38: Plan Gating & Feature Locks**
```typescript
// IMPLEMENTAR:
1. Feature Gating System
   - Check user plan before features
   - Show upgrade modal for locked features
   - Graceful degradation

2. Usage Limits Enforcement
   - Track feature usage (listings/campaigns/etc.)
   - Enforce plan limits
   - Show usage indicators
   - Upgrade prompts when limit reached

3. Plan Benefits Display
   - Compare plans modal
   - Feature matrix
   - Pricing calculator
   - ROI indicators
```

**Archivos a modificar:**
- Crear `/lib/plans/featureGating.ts`
- Actualizar componentes con plan checks
- Crear `/components/billing/PlanComparisonModal.tsx`

**Testing:**
- [ ] Free user no puede crear campaña (Plus+)
- [ ] Free user ve prompt de upgrade
- [ ] Plus user puede crear campaña
- [ ] Límites se respetan
- [ ] Upgrade desbloquea features

---

### 🟢 FASE 5: POLISH & OPTIMIZATION (1 semana)
**Objetivo:** Pulir detalles y optimizar

#### Week 9-10: Final Polish

**Día 39-40: Profile & Settings Complete**
```typescript
// IMPLEMENTAR:
1. Profile Save
   - PATCH /api/users/me/profile
   - Upload avatar
   - Update all fields
   - Validate data

2. Location Services
   - Get current location (Geolocation API)
   - Reverse geocoding
   - Save to profile

3. Change Password
   - Validate current password
   - Hash new password
   - Update in database
   - Invalidate sessions
   - Send confirmation email

4. Delete Account
   - Confirmation flow (double-check)
   - Schedule deletion (30 days)
   - Notify user
   - Export data option
   - Execute deletion
```

**Día 41-42: Analytics & Export**
```typescript
// IMPLEMENTAR:
1. Statistics Dashboard Real Data
   - Connect to analytics backend
   - Real-time updates
   - Export as CSV/PDF

2. Data Export (GDPR)
   - Generate JSON export
   - Include all user data
   - Download as ZIP
   - Schedule automatic exports
```

**Día 43-45: Trail Detail & Navigation**
```typescript
// IMPLEMENTAR:
1. Trail Detail - View Product
   - Navigate to ProductDetailPage
   - Maintain context

2. Trail Detail - Open Chat
   - Navigate to ChatConversationPage
   - Pre-fill context

3. Organization Page (Fase Futura)
   - Basic structure
   - Coming soon state
```

**Día 46-48: Testing & Bug Fixes**
```
- End-to-end testing all flows
- Fix bugs found
- Performance optimization
- Security audit
- Accessibility audit
```

**Día 49-50: Documentation & Deployment**
```
- Update API documentation
- Create deployment guide
- Setup CI/CD
- Production deployment
- Monitoring setup
```

---

## 🔧 IMPLEMENTACIÓN POR COMPONENTE

### COMPONENTES A ACTUALIZAR

**Tier 1 (Críticos):**
1. `/App.tsx` - Todos los handlers principales
2. `/components/publish/PublishFlow.tsx` - Save/edit real
3. `/components/ChatView.tsx` - Send messages real
4. `/components/MyListingsPage.tsx` - Todas las acciones
5. `/components/ActionCenterPage.tsx` - Todos los tabs
6. `/components/BillingPage.tsx` - Pagos reales

**Tier 2 (Importantes):**
7. `/components/groups/CreateGroupSheet.tsx`
8. `/components/group-detail/GroupDetailPage.tsx`
9. `/components/ProductDetailPage.tsx`
10. `/components/ProfilePage.tsx`

**Tier 3 (Secundarios):**
11. `/components/StatisticsPage.tsx`
12. `/components/settings/*`
13. `/components/menu/TrailDetailSheet.tsx`

---

### SERVICIOS A CREAR

**API Services:**
```
/lib/api/
  ├── authService.ts
  ├── listingsService.ts
  ├── listingsActions.ts
  ├── groupsService.ts
  ├── campaignsService.ts
  ├── eventsService.ts
  ├── tradesService.ts
  ├── reportsService.ts
  ├── adminService.ts
  ├── userIssuesService.ts
  └── profileService.ts
```

**Support Services:**
```
/lib/
  ├── storage/imageUpload.ts
  ├── realtime/websocket.ts
  ├── notifications/pushService.ts
  ├── payments/stripeService.ts
  ├── payments/webhookHandlers.ts
  ├── plans/featureGating.ts
  └── auth/socialAuth.ts
```

---

## 📊 MÉTRICAS DE ÉXITO

**Día 25 (Mitad del proyecto):**
- [ ] 50% de TODOs cerrados
- [ ] Authentication funcional
- [ ] Publish Flow funcional
- [ ] My Listings funcional
- [ ] Groups básico funcional

**Día 50 (Final):**
- [ ] 100% de TODOs cerrados
- [ ] 0 toasts placeholder
- [ ] Todas las navegaciones funcionan
- [ ] Backend integration completa
- [ ] Tests E2E passing
- [ ] Production deployment successful

---

## 🚨 BLOCKERS CRÍTICOS

**Antes de comenzar NECESITAS:**
1. ✅ Supabase project configurado (o backend alternativo)
2. ✅ Database schema diseñado
3. ✅ Storage configurado para imágenes
4. ✅ Auth providers configurados
5. ✅ Payment processor account (Stripe/MP)
6. ✅ Email service setup (SendGrid)
7. ✅ Push notifications setup (FCM/APNs)
8. ✅ OpenAI API key (para AI moderation)

---

## 📋 DAILY CHECKLIST

**Cada día de desarrollo:**
- [ ] Pull latest changes
- [ ] Review día's tasks
- [ ] Implement features
- [ ] Write tests
- [ ] Update documentation
- [ ] Code review (si en equipo)
- [ ] Merge to main
- [ ] Update progress tracker

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

**HOY (Día 0):**
1. Review este plan completo
2. Setup Supabase project
3. Design database schema
4. Configure auth providers
5. Create project board (Trello/Linear/GitHub Projects)
6. Assign tasks si hay equipo

**MAÑANA (Día 1):**
1. Comenzar Fase 1, Week 1, Día 1
2. Implementar Supabase Auth
3. Actualizar sign in handler en App.tsx
4. Testing sign in flow

---

**Generado:** 19 de Diciembre, 2025  
**Estimación Total:** 50 días laborales (~10 semanas)  
**Prioridad:** Comenzar con Fase 1 inmediatamente  
**Status:** ✅ READY TO START
