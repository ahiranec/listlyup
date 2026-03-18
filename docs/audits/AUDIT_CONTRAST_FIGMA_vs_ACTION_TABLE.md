# 🔍 AUDITORÍA DE CONTRASTE: FIGMA (AS-IS) vs ACTION REGISTRY v1.6 (TO-BE)

**Auditor**: UX + Product Architect Senior  
**Fecha**: Enero 2026  
**Objetivo**: Contrastar estado actual (Figma) con arquitectura esperada (ACTION_REGISTRY)  
**Metodología**: Análisis exhaustivo de 328 acciones AS-IS vs 98 ActionIds TO-BE

---

## RESUMEN EJECUTIVO

### MÉTRICAS GLOBALES

| Métrica | Valor | % |
|---------|-------|---|
| **Acciones en Figma (AS-IS)** | 328 | 100% |
| **ActionIds en Registry (TO-BE)** | 98 | 100% |
| **MATCH_OK** | 62 | 18.9% |
| **MATCH_AMBIGUOUS** | 18 | 5.5% |
| **NOT_IN_TABLE** | 223 | 68.0% |
| **DEAD_CLICK** | 5 | 1.5% |
| **NOT_IMPLEMENTED** | 20 | 6.1% |

### COBERTURA

| Dimensión | Valor |
|-----------|-------|
| **ActionIds implementados en Figma** | 62/98 (63.3%) |
| **ActionIds NO implementados** | 36/98 (36.7%) |
| **Acciones Figma sin ActionId** | 223/328 (68.0%) |
| **Duplicaciones semánticas** | 13 pares detectados |
| **Acciones rotas (dead clicks)** | 5 confirmadas |

---

## A. TABLA DE CONTRASTE (TODAS LAS ACCIONES)

### LEYENDA DE ESTADOS

- **MATCH_OK**: Acción en Figma corresponde 1:1 con ActionId del registry
- **MATCH_AMBIGUOUS**: Acción en Figma podría mapear a ActionId pero naming/semántica difiere
- **NOT_IN_TABLE**: Acción visible en Figma NO tiene ActionId correspondiente en registry
- **DEAD_CLICK**: Acción visible pero destino no implementado
- **NOT_IMPLEMENTED**: ActionId existe en registry pero NO está visible en Figma

### SEVERIDAD

- **P0**: Crítico — Bloquea funcionalidad core o genera confusión crítica
- **P1**: Alto — Degrada UX significativamente o genera inconsistencia
- **P2**: Medio — Mejora deseable, no urgente

---

## MATCH_OK (62 acciones)

| # | ActionId | UI Location | Notas | Severidad |
|---|----------|-------------|-------|-----------|
| 1 | `edit-listing` | My Listings / Card (⋯), Listing Detail / Footer | ✅ Implementado correctamente, usa ActionButtons | — |
| 2 | `view-stats` | Listing Detail / Footer (Owner) | ✅ Abre ListingStatsModal | — |
| 3 | `pause-listing` | My Listings / Card (⋯), Listing Detail / Footer | ✅ Abre PauseListingSheet (canonical) | — |
| 4 | `delete-listing` | My Listings / Card (⋯), Action Center, Listing Detail | ✅ Abre ConfirmActionDialog (canonical) | — |
| 5 | `mark-as-sold` | My Listings / Card (⋯), Listing Detail / Footer | ✅ Abre MarkAsSoldSheet (canonical) | — |
| 6 | `duplicate-listing` | My Listings / Card (⋯), Listing Detail / Footer | ✅ Navega a PublishFlow (duplicate mode) | — |
| 7 | `reactivate-listing` | Action Center / ListingActionCard (paused → Resume) | ✅ Label UI: "Resume", ActionId: reactivate-listing | — |
| 8 | `renew-listing` | My Listings / Card (⋯), Action Center (expiring) | ✅ Abre ConfirmActionDialog | — |
| 9 | `accept-trade` | Action Center / TradeOfferCard | ✅ Abre ConfirmActionDialog via GAM | — |
| 10 | `reject-trade` | Action Center / TradeOfferCard (Decline label) | ⚠️ UI label: "Decline", ActionId: reject-trade | P2 |
| 11 | `counter-offer` | Action Center / TradeOfferCard | ✅ Abre CounterOfferSheet | — |
| 12 | `respond-question` | Action Center / QuestionCard (Answer label) | ⚠️ UI label: "Answer", ActionId: respond-question | P2 |
| 13 | `open-chat` | Listing Detail / Footer (Message Seller), Action Center | ✅ Navega a ChatConversationPage | — |
| 14 | `open-whatsapp` | Listing Detail / Footer | ✅ Abre WhatsApp external, conditional | — |
| 15 | `open-phone` | Listing Detail / Footer (Call label) | ✅ Abre phone dialer, conditional | — |
| 16 | `make-offer` | Listing Detail / Footer (Make Offer label) | ⚠️ UI label: "Make Offer", ActionId: make-offer (no make-trade-offer) | P2 |
| 17 | `save-listing` | Listing Detail / Header (heart icon) | ✅ Toggle save state, optimistic update | — |
| 18 | `share-listing` | My Listings / Card (⋯), Listing Detail / Header | ✅ Abre ShareSheet | — |
| 19 | `follow-seller` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 20 | `block-user` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 21 | `report-listing` | Listing Detail / Header (⋯ → Report) | ✅ Abre ReportSheet | — |
| 22 | `accept-group-invite` | Notifications / GroupInviteCard | ✅ Abre ConfirmActionDialog | — |
| 23 | `reject-group-invite` | Notifications / GroupInviteCard (Decline label) | ⚠️ UI label: "Decline", ActionId: reject-group-invite | P2 |
| 24 | `leave-group` | Groups / Card (⋯), Group Detail / Header (⋯) | ✅ Abre ConfirmActionDialog (LeaveGroupDialog) | — |
| 25 | `mute-group` | Groups / Card (⋯), Group Detail / Header (⋯) | ✅ Abre MuteNotificationsDialog | — |
| 26 | `invite-members` | Group Detail / Header (⋯) | ✅ Abre InviteToGroupSheet | — |
| 27 | `share-group` | Groups / Card (⋯), Group Detail / Header (⋯) | ✅ Abre ShareGroupSheet | — |
| 28 | `report-group` | Group Detail / Header (⋯) | ✅ Abre ReportGroupSheet | — |
| 29 | `approve-listing` | Group Detail / Pending tab | ✅ Abre ConfirmActionDialog | — |
| 30 | `reject-listing` | Group Detail / Pending tab | ✅ Abre ConfirmActionDialog | — |
| 31 | `hide-listing` | Group Detail / Listing card (⋯, Moderator) | ✅ Abre ConfirmActionDialog (HideListingSheet) | — |
| 32 | `remove-listing` | Group Detail / Listing card (⋯, Admin, destructive) | ✅ Abre ConfirmActionDialog (RemoveListingSheet) | — |
| 33 | `remove-member` | Group Detail / Member card (⋯, Moderator/Admin) | ✅ Abre ConfirmActionDialog (RemoveMemberSheet) | — |
| 34 | `change-role` | Group Detail / Member card (⋯, Admin) | ✅ Abre ChangeRoleSheet | — |
| 35 | `message-member` | Group Detail / Member card (⋯) | ⚠️ UI label: "Message", ActionId: message-member | — |
| 36 | `bulk-pause` | My Listings / Bulk toolbar | ✅ Bulk action implementado | — |
| 37 | `bulk-delete` | My Listings / Bulk toolbar | ✅ Bulk action implementado | — |
| 38 | `archive-listing` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 39 | `boost-listing` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 40 | `report-sold-elsewhere` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 41 | `export-analytics` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 42 | `print-qr` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 43 | `view-trade-offer` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 44 | `reserve-item` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 45 | `confirm-delivery-received` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 46 | `quick-reply` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 47 | `request-more-photos` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 48 | `leave-review` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 49 | `report-user` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 50 | `review-report` | Action Center / ReportCard, My Listings / Reported | ⚠️ DEAD CLICK — destino no implementado | P0 |
| 51 | `preview-group` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 52 | `pin-group` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 53 | `unpin-group` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 54 | `view-group-reports` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 55 | `moderate-group-listings` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 56 | `manage-group-members` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 57 | `edit-group-profile` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P1 |
| 58 | `group-settings` | Group Detail / Settings tab | ✅ Abre settings tab | — |
| 59 | `message-owner` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 60 | `create-price-alert` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 61 | `stop-watching` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |
| 62 | `view-saved-search` | (Not visible in current Figma) | ❌ NOT_IMPLEMENTED | P2 |

---

## MATCH_AMBIGUOUS (18 acciones)

Acciones donde hay mismatch de naming/semántica entre Figma y ActionId.

| # | UI Label (Figma) | ActionId (Registry) | UI Location | Problema | Severidad | Recomendación |
|---|------------------|---------------------|-------------|----------|-----------|---------------|
| 1 | **"Reply"** (Messages) | `open-chat` | Action Center / MessageCard | Label sugiere responder, ActionId es abrir chat | P2 | Cambiar UI label a "Open Chat" o crear action `reply-to-message` |
| 2 | **"Answer"** (Questions) | `respond-question` | Action Center / QuestionCard | Label: "Answer", ActionId: "respond-question" | P2 | Unificar: usar "Answer" en ambos lados |
| 3 | **"Decline"** (Trade) | `reject-trade` | Action Center / TradeOfferCard | Naming inconsistente: Decline vs Reject | P2 | Unificar a "Decline" o "Reject" |
| 4 | **"Decline"** (Group Invite) | `reject-group-invite` | Notifications / GroupInviteCard | Naming inconsistente: Decline vs Reject | P2 | Unificar a "Decline" o "Reject" |
| 5 | **"Resume"** (Paused) | `reactivate-listing` | Action Center / ListingActionCard | Label: "Resume", ActionId: "reactivate" | P2 | Aceptable (semántica similar), documentar |
| 6 | **"Message Seller"** | `open-chat` | Listing Detail / Footer | Naming diferente, misma funcionalidad | P2 | Unificar naming: "Message Seller" vs "Open Chat" |
| 7 | **"Call"** | `open-phone` | Listing Detail / Footer | Label: "Call", ActionId: "open-phone" | P2 | Unificar a "Call" |
| 8 | **"Make Offer"** | `make-offer` | Listing Detail / Footer | ⚠️ Registry también tiene `make-trade-offer` | P1 | Clarificar diferencia entre `make-offer` y `make-trade-offer` |
| 9 | **"Message"** (Member) | `message-member` | Group Detail / Member card | Label genérico | P2 | OK, contextualmente claro |
| 10 | **"Respond"** (My Listings) | `respond-question` | My Listings / Messages Tab | Duplicado semántico: "Respond" vs "Answer" | P1 | Unificar a "Answer" |
| 11 | **"Open Chat"** | `open-chat` | My Listings / Messages Tab | Duplicado con "Message Seller" | P1 | Unificar naming |
| 12 | **"Contact User"** (Admin) | (Not in registry) | Action Center / UserIssueCard | No hay ActionId para admin chat | P1 | Agregar `contact-user-admin` ActionId |
| 13 | **"Publish to Group"** | (Not in registry) | Group Detail / FAB | ¿Es acción o navegación? | P2 | Aclarar: es navegación a PublishFlow |
| 14 | **"Save Draft"** | (Not in registry) | PublishFlow / Step 1 | Draft actions no modeladas | P0 | Agregar `save-draft` ActionId |
| 15 | **"Save as Draft"** | (Not in registry) | PublishFlow / Step 5 | Naming inconsistente con "Save Draft" | P0 | Unificar naming |
| 16 | **"Publish Now"** | (Not in registry) | PublishFlow / Step 5 (Create) | Finalizar publish no modelado | P0 | Agregar `publish-listing` ActionId |
| 17 | **"Save Changes"** | (Not in registry) | PublishFlow / Step 5 (Edit) | Finalizar edit no modelado | P0 | Agregar `save-listing-changes` ActionId |
| 18 | **"Continue"** (Draft) | (Not in registry) | Action Center / ListingActionCard | Continuar draft no modelado | P0 | Agregar `continue-draft` ActionId |

---

## NOT_IN_TABLE (223 acciones)

Acciones visibles en Figma que NO tienen ActionId correspondiente en ACTION_REGISTRY.

### CATEGORÍA: AUTENTICACIÓN (9 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 1 | **Sign In** | SignInPage | P0 | Agregar `sign-in` ActionId (AUTH domain) |
| 2 | **(Show/Hide Password)** | SignInPage / Password field | P2 | Pattern UX estándar, no requiere ActionId |
| 3 | **Forgot password?** | SignInPage | P1 | Agregar `forgot-password` ActionId |
| 4 | **Sign in with Google** | SignInPage | P0 | Agregar `sign-in-google` ActionId |
| 5 | **Sign in with Apple** | SignInPage | P0 | Agregar `sign-in-apple` ActionId |
| 6 | **Sign in with Facebook** | SignInPage | P0 | Agregar `sign-in-facebook` ActionId |
| 7 | **Sign Up** | SignInPage / Bottom link | P0 | Agregar `sign-up` ActionId |
| 8 | **Create Account** | SignUpPage | P0 | Agregar `create-account` ActionId |
| 9 | **Sign Out** | MenuSheet / Bottom | P0 | Agregar `sign-out` ActionId |

### CATEGORÍA: HOME / EXPLORE (14 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 10 | **(Scroll down)** | Home / Product grid | P2 | Sistema implícito, no requiere ActionId |
| 11 | **(Search input)** | Home / Search bar | P1 | Agregar `search-listings` ActionId |
| 12 | **(Clear search)** | Home / Search bar | P2 | Sistema, no crítico |
| 13 | **Advanced Filters** | Home / Search bar | P1 | Agregar `open-filters` ActionId |
| 14 | **Toggle Map View** | Home / Search bar | P1 | Agregar `toggle-map-view` ActionId |
| 15 | **(Click product card)** | Home / Product grid | P2 | Navegación implícita, OK |
| 16 | **(Like button on card)** | Home / ProductCard | — | Ya mapeado a `save-listing` |
| 17 | **Apply Filters** | FilterSheet | P1 | Agregar `apply-filters` ActionId |
| 18 | **Clear All Filters** | FilterSheet | P2 | Agregar `clear-filters` ActionId |
| 19 | **(Close filter sheet)** | FilterSheet | P2 | Sistema, no crítico |
| 20 | **(Select filter option)** | FilterSheet / Section | P2 | Implícito, no requiere ActionId |
| 21 | **(Expand filter section)** | FilterSheet | P2 | UI pattern, no ActionId |
| 22 | **Load More** | Home / Bottom of grid | P2 | Sistema (infinite scroll), no crítico |

### CATEGORÍA: MAP VIEW (9 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 23 | **(Back to List View)** | MapView / Search bar | P2 | Navegación implícita |
| 24 | **Zoom In** | MapView / Controls | P2 | Agregar `zoom-in-map` ActionId (placeholder) |
| 25 | **Zoom Out** | MapView / Controls | P2 | Agregar `zoom-out-map` ActionId (placeholder) |
| 26 | **(Click map pin)** | MapView | P2 | Sistema, no crítico |
| 27 | **(Click pin card)** | MapView / MapPinCard | P2 | Navegación implícita |
| 28 | **(Pan/Drag map)** | MapView | P2 | Sistema implícito |
| 29 | **(Close pin card)** | MapView / MapPinCard | P2 | UI pattern |

### CATEGORÍA: LISTING DETAIL — VISITOR (14 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 30 | **(Back)** | Listing Detail / Header | P2 | Navegación implícita |
| 31 | **Save** | Listing Detail / Header | — | Ya mapeado a `save-listing` |
| 32 | **Share** | Listing Detail / Header (⋯) | — | Ya mapeado a `share-listing` |
| 33 | **Report** | Listing Detail / Header (⋯) | — | Ya mapeado a `report-listing` |
| 34 | **Message Seller** | Listing Detail / Footer | — | Ya mapeado a `open-chat` (ambiguo) |
| 35 | **WhatsApp** | Listing Detail / Footer | — | Ya mapeado a `open-whatsapp` |
| 36 | **Call** | Listing Detail / Footer | — | Ya mapeado a `open-phone` |
| 37 | **Make Offer** | Listing Detail / Footer | — | Ya mapeado a `make-offer` |
| 38 | **Ask Question** | Listing Detail / Footer | P0 | Agregar `ask-question` ActionId |
| 39 | **View Profile** | Listing Detail / Seller card | P1 | Agregar `view-seller-profile` ActionId |
| 40 | **(Sort Q&A: Recent)** | Listing Detail / Q&A | P2 | UI pattern, no ActionId |
| 41 | **(Sort Q&A: Helpful)** | Listing Detail / Q&A | P2 | UI pattern, no ActionId |
| 42 | **(Expand description)** | Listing Detail / Description | P2 | UI pattern |
| 43 | **(Navigate carousel)** | Listing Detail / ImageCarousel | P2 | UI pattern |

### CATEGORÍA: LISTING DETAIL — OWNER (9 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 44 | **Edit** | Listing Detail / Footer | — | Ya mapeado a `edit-listing` |
| 45 | **Pause** | Listing Detail / Footer | — | Ya mapeado a `pause-listing` |
| 46 | **View Stats** | Listing Detail / Footer | — | Ya mapeado a `view-stats` |
| 47 | **Duplicate** | Listing Detail / Footer | — | Ya mapeado a `duplicate-listing` |
| 48 | **Mark as Sold** | Listing Detail / Footer | — | Ya mapeado a `mark-as-sold` |
| 49 | **Delete** | Listing Detail / Footer | — | Ya mapeado a `delete-listing` |
| 50 | **Reply** (Owner Messages) | Listing Detail / Owner section | P1 | Agregar `reply-to-message` ActionId |
| 51 | **Answer** (Q&A) | Listing Detail / Q&A | — | Ya mapeado a `respond-question` |
| 52 | **Edit Answer** | Listing Detail / Q&A | P0 | Agregar `edit-answer` ActionId |

### CATEGORÍA: PUBLISH / EDIT FLOW (26 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 53 | **Close** (Flow) | PublishFlow / Header | P2 | Navegación implícita |
| 54 | **(Select listing type)** | PublishFlow / Step 1 | P2 | Forma parte del flujo |
| 55 | **(Upload images)** | PublishFlow / Step 1 | P1 | Agregar `upload-images` ActionId |
| 56 | **(Remove image)** | PublishFlow / Step 1 | P1 | Agregar `remove-image` ActionId |
| 57 | **(Reorder images)** | PublishFlow / Step 1 | P2 | UI pattern |
| 58 | **Next** (Media → Basic Info) | PublishFlow / Step 1 | P2 | Navegación implícita |
| 59 | **Save Draft** | PublishFlow / Step 1 | P0 | Agregar `save-draft` ActionId |
| 60 | **Back** (Basic Info → Media) | PublishFlow / Step 2 | P2 | Navegación implícita |
| 61 | **Next** (Basic Info → Location) | PublishFlow / Step 2 | P2 | Navegación implícita |
| 62 | **(Input title/description)** | PublishFlow / Step 2 | P2 | Implícito |
| 63 | **(Select category)** | PublishFlow / Step 2 | P2 | Implícito |
| 64 | **(Select condition)** | PublishFlow / Step 2 | P2 | Implícito |
| 65 | **Back** (Location → Basic Info) | PublishFlow / Step 3 | P2 | Navegación implícita |
| 66 | **Next** (Location → Pricing) | PublishFlow / Step 3 | P2 | Navegación implícita |
| 67 | **(Input location)** | PublishFlow / Step 3 | P2 | Implícito |
| 68 | **(Select location precision)** | PublishFlow / Step 3 | P2 | Implícito |
| 69 | **Back** (Pricing → Location) | PublishFlow / Step 4 | P2 | Navegación implícita |
| 70 | **Next** (Pricing → Preview) | PublishFlow / Step 4 | P2 | Navegación implícita |
| 71 | **(Input price)** | PublishFlow / Step 4 | P2 | Implícito |
| 72 | **(Select offer mode)** | PublishFlow / Step 4 | P2 | Implícito |
| 73 | **(Select delivery options)** | PublishFlow / Step 4 | P2 | Implícito |
| 74 | **(Select visibility/groups)** | PublishFlow / Step 4 | P2 | Implícito |
| 75 | **Back** (Preview → Pricing) | PublishFlow / Step 5 | P2 | Navegación implícita |
| 76 | **Publish Now** | PublishFlow / Step 5 | P0 | Agregar `publish-listing` ActionId |
| 77 | **Save Changes** | PublishFlow / Step 5 | P0 | Agregar `save-listing-changes` ActionId |
| 78 | **Save as Draft** | PublishFlow / Step 5 | P0 | Agregar `save-draft` ActionId (duplicado naming) |
| 79 | **Edit** (step name) | PublishFlow / Step 5 | P2 | Navegación implícita |

### CATEGORÍA: ACTION CENTER (36 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 80 | **(Back)** | Action Center / Header | P2 | Navegación implícita |
| 81 | **Settings** | Action Center / Header | P1 | Agregar `open-settings` ActionId |
| 82 | **Notifications** | Action Center / Header | P1 | Agregar `open-notifications` ActionId |
| 83 | **(Tab: Personal)** | Action Center / Tabs | P2 | UI pattern |
| 84 | **(Tab: Campaigns)** | Action Center / Tabs | P2 | UI pattern |
| 85 | **(Tab: Events)** | Action Center / Tabs | P2 | UI pattern |
| 86 | **(Tab: Groups)** | Action Center / Tabs | P2 | UI pattern |
| 87 | **(Tab: Admin)** | Action Center / Tabs | P2 | UI pattern |
| 88 | **Reply** (Message) | Action Center / MessageCard | P1 | Ambiguo: mapeado a `open-chat` |
| 89 | **Answer** (Question) | Action Center / QuestionCard | — | Mapeado a `respond-question` |
| 90 | **Accept** (Trade) | Action Center / TradeOfferCard | — | Mapeado a `accept-trade` |
| 91 | **Counter** (Trade) | Action Center / TradeOfferCard | — | Mapeado a `counter-offer` |
| 92 | **Decline** (Trade) | Action Center / TradeOfferCard | — | Mapeado a `reject-trade` |
| 93 | **Continue** (Draft) | Action Center / ListingActionCard | P0 | Agregar `continue-draft` ActionId |
| 94 | **Renew** (Expiring) | Action Center / ListingActionCard | — | Mapeado a `renew-listing` |
| 95 | **Edit First** (Expiring) | Action Center / ListingActionCard | P1 | Ambiguo: mapeado a `edit-listing` |
| 96 | **Resume** (Paused) | Action Center / ListingActionCard | — | Mapeado a `reactivate-listing` |
| 97 | **View Status** (Pending) | Action Center / ListingActionCard | P1 | Agregar `view-pending-status` ActionId |
| 98 | **Edit & Resubmit** (Rejected) | Action Center / ListingActionCard | P1 | Agregar `edit-and-resubmit` ActionId o usar `edit-listing` |
| 99 | **Details** (Rejected) | Action Center / ListingActionCard | P1 | Agregar `view-rejection-details` ActionId |
| 100 | **Delete** (Listing Action) | Action Center / ListingActionCard | — | Mapeado a `delete-listing` |
| 101 | **Approve** (Campaign Request) | Action Center / CampaignRequestCard | P0 | Agregar `approve-campaign-request` ActionId |
| 102 | **Reject** (Campaign Request) | Action Center / CampaignRequestCard | P0 | Agregar `reject-campaign-request` ActionId |
| 103 | **View Details** (Campaign) | Action Center / CampaignRequestCard | P2 | Navegación implícita |
| 104 | **Approve** (Event Request) | Action Center / EventRequestCard | P0 | Agregar `approve-event-request` ActionId |
| 105 | **Reject** (Event Request) | Action Center / EventRequestCard | P0 | Agregar `reject-event-request` ActionId |
| 106 | **View Details** (Event) | Action Center / EventRequestCard | P2 | Navegación implícita |
| 107 | **Approve** (Join Request) | Action Center / JoinRequestCard | P0 | Agregar `approve-join-request` ActionId |
| 108 | **Decline** (Join Request) | Action Center / JoinRequestCard | P0 | Agregar `decline-join-request` ActionId |
| 109 | **Review** (Report) | Action Center / ReportCard | P0 | ⚠️ DEAD CLICK — mapeado a `review-report` pero no implementado |
| 110 | **Take Action** (Report) | Action Center / ReportCard | P0 | Agregar `take-action-report` ActionId |
| 111 | **Dismiss** (Report) | Action Center / ReportCard | P0 | Agregar `dismiss-report` ActionId |
| 112 | **Review** (Platform Report) | Action Center / PlatformReportCard | P0 | ⚠️ DEAD CLICK — no implementado |
| 113 | **Take Action** (Platform Report) | Action Center / PlatformReportCard | P0 | Agregar `take-action-platform-report` ActionId |
| 114 | **Dismiss** (Platform Report) | Action Center / PlatformReportCard | P0 | Agregar `dismiss-platform-report` ActionId |
| 115 | **Review Listing** (Flagged) | Action Center / FlaggedListingCard | P0 | ⚠️ DEAD CLICK — no implementado |
| 116 | **Approve** (Flagged) | Action Center / FlaggedListingCard | P0 | Agregar `approve-flagged-listing` ActionId |
| 117 | **Remove** (Flagged) | Action Center / FlaggedListingCard | P0 | Agregar `remove-flagged-listing` ActionId |
| 118 | **Review Issue** (User) | Action Center / UserIssueCard | P0 | ⚠️ DEAD CLICK — no implementado |
| 119 | **Contact User** (Admin) | Action Center / UserIssueCard | P0 | Agregar `contact-user-admin` ActionId |

### CATEGORÍA: GROUPS (16 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 120 | **(Back from Groups)** | Groups / Header | P2 | Navegación implícita |
| 121 | **Explore Groups** | Groups / Header | P1 | Agregar `explore-groups` ActionId |
| 122 | **Create Group** | Groups / FAB | P0 | Agregar `create-group` ActionId |
| 123 | **(Filter groups)** | Groups / Search bar | P2 | Implícito |
| 124 | **(Select group card)** | Groups / Grid | P2 | Navegación implícita |
| 125 | **Share** (Group) | Groups / Card (⋯) | — | Mapeado a `share-group` |
| 126 | **Mute** (Group) | Groups / Card (⋯) | — | Mapeado a `mute-group` |
| 127 | **Leave** (Group) | Groups / Card (⋯) | — | Mapeado a `leave-group` |
| 128 | **(Tab: All)** | Groups / Tabs | P2 | UI pattern |
| 129 | **(Tab: Admin)** | Groups / Tabs | P2 | UI pattern |
| 130 | **(Tab: Member)** | Groups / Tabs | P2 | UI pattern |
| 131 | **Join Group** | Group Detail / Hero (Visitor) | P0 | Agregar `join-group` ActionId |
| 132 | **Request to Join** | Group Detail / Hero (Visitor) | P0 | Agregar `request-to-join-group` ActionId |
| 133 | **Request Invitation** | Group Detail / Hero (Visitor) | P0 | Agregar `request-group-invitation` ActionId |
| 134 | **Cancel Request** | Group Detail / Banner (Pending) | P0 | Agregar `cancel-join-request` ActionId |
| 135 | **Publish to Group** | Group Detail / FAB | P2 | Navegación implícita (abre PublishFlow) |

### CATEGORÍA: NOTIFICATIONS (17 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 136 | **(Back from Notifications)** | Notifications / Header | P2 | Navegación implícita |
| 137 | **Filter Notifications** | Notifications / Header | P1 | Agregar `filter-notifications` ActionId |
| 138 | **Mark All as Read** | Notifications / Header | P1 | Agregar `mark-all-notifications-read` ActionId |
| 139 | **(Expand section)** | Notifications / Section header | P2 | UI pattern |
| 140 | **Mark Section as Read** | Notifications / Section header | P1 | Agregar `mark-section-read` ActionId |
| 141 | **Clear Section** | Notifications / Section header (⋯) | P1 | Agregar `clear-section` ActionId |
| 142 | **(Click notification card)** | Notifications | P2 | Navegación contextual |
| 143 | **Accept** (Trade Offer Notif) | Notifications / TradeOfferCard | — | Mapeado a `accept-trade` |
| 144 | **Decline** (Trade Offer Notif) | Notifications / TradeOfferCard | — | Mapeado a `reject-trade` |
| 145 | **Reply** (Message Notif) | Notifications / MessageCard | P1 | Ambiguo: mapeado a `open-chat` |
| 146 | **Answer** (Question Notif) | Notifications / QuestionCard | — | Mapeado a `respond-question` |
| 147 | **Accept** (Group Invite Notif) | Notifications / GroupInviteCard | — | Mapeado a `accept-group-invite` |
| 148 | **Decline** (Group Invite Notif) | Notifications / GroupInviteCard | — | Mapeado a `reject-group-invite` |
| 149 | **Renew** (Expiring Notif) | Notifications / LifecycleCard | — | Mapeado a `renew-listing` |
| 150 | **View** (Report Status Notif) | Notifications / ReportStatusCard | P1 | Agregar `view-report-status` ActionId |
| 151 | **(Apply notification filters)** | NotificationsFilterSheet | P1 | Agregar `apply-notification-filters` ActionId |
| 152 | **(Clear notification filters)** | NotificationsFilterSheet | P2 | UI pattern |

### CATEGORÍA: CAMPAIGNS (8 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 153 | **(Navigate to Campaigns)** | Menu / Campaigns | P2 | Navegación implícita |
| 154 | **Create Campaign** | Campaigns / Header | P0 | Agregar `create-campaign` ActionId |
| 155 | **(Click campaign card)** | Campaigns | P2 | Navegación implícita |
| 156 | **Edit Campaign** | Campaigns / Card (⋯) | P0 | Agregar `edit-campaign` ActionId |
| 157 | **Pause Campaign** | Campaigns / Card (⋯) | P0 | Agregar `pause-campaign` ActionId |
| 158 | **Share Campaign** | Campaigns / Card (⋯) | P1 | Agregar `share-campaign` ActionId |
| 159 | **Delete Campaign** | Campaigns / Card (⋯) | P0 | Agregar `delete-campaign` ActionId |
| 160 | **Apply to Campaign** | Campaign Detail | P0 | Agregar `apply-to-campaign` ActionId |

### CATEGORÍA: EVENTS (8 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 161 | **(Navigate to Events)** | Menu / Events | P2 | Navegación implícita |
| 162 | **Create Event Hub** | Events / Header | P0 | Agregar `create-event-hub` ActionId |
| 163 | **(Click event hub card)** | Events | P2 | Navegación implícita |
| 164 | **Edit Event Hub** | Events / Card (⋯) | P0 | Agregar `edit-event-hub` ActionId |
| 165 | **Pause Event Hub** | Events / Card (⋯) | P0 | Agregar `pause-event-hub` ActionId |
| 166 | **Share Event Hub** | Events / Card (⋯) | P1 | Agregar `share-event-hub` ActionId |
| 167 | **Delete Event Hub** | Events / Card (⋯) | P0 | Agregar `delete-event-hub` ActionId |
| 168 | **Apply to Event Hub** | Event Hub Detail | P0 | Agregar `apply-to-event-hub` ActionId |

### CATEGORÍA: PROFILE (13 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 169 | **(Navigate to Profile)** | Menu / Profile | P2 | Navegación implícita |
| 170 | **Edit Personal Info** | Profile Hub / Personal section | P1 | Agregar `edit-personal-info` ActionId |
| 171 | **Edit Publishing Defaults** | Profile Hub / Publishing section | P1 | Agregar `edit-publishing-defaults` ActionId |
| 172 | **Manage Addresses** | Profile Hub / Addresses section | P1 | Agregar `manage-addresses` ActionId |
| 173 | **Manage Organizations** | Profile Hub / Organizations section | P1 | Agregar `manage-organizations` ActionId |
| 174 | **Verify Account** | Profile Hub / Account section | P0 | Agregar `verify-account` ActionId (ya existe `verify-identity` en registry) |
| 175 | **(Save personal info)** | PersonalInfoPage | P1 | Agregar `save-personal-info` ActionId |
| 176 | **(Save publishing defaults)** | PublishingPage | P1 | Agregar `save-publishing-defaults` ActionId |
| 177 | **Add Address** | AddressesPage | P1 | Agregar `add-address` ActionId |
| 178 | **Edit Address** | AddressesPage / Card | P1 | Agregar `edit-address` ActionId |
| 179 | **Delete Address** | AddressesPage / Card | P1 | Agregar `delete-address` ActionId |
| 180 | **Add Organization** | OrganizationsPage | P1 | Agregar `add-organization` ActionId |
| 181 | **Edit Organization** | OrganizationsPage / Card | P1 | Agregar `edit-organization` ActionId |
| 182 | **Delete Organization** | OrganizationsPage / Card | P1 | Agregar `delete-organization` ActionId |

### CATEGORÍA: SETTINGS (15 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 183 | **(Navigate to Settings)** | Menu / Settings | P2 | Navegación implícita |
| 184 | **Notification Preferences** | Settings Hub / Notifications | P1 | Agregar `edit-notification-preferences` ActionId |
| 185 | **Privacy Settings** | Settings Hub / Privacy | P1 | Agregar `edit-privacy-settings` ActionId |
| 186 | **Password & Security** | Settings Hub / Security | P1 | Agregar `edit-password-security` ActionId |
| 187 | **Saved Searches** | Settings Hub / Features | P1 | Agregar `manage-saved-searches` ActionId |
| 188 | **Delete Account** | Settings Hub / Account | P0 | Agregar `delete-account` ActionId |
| 189 | **(Toggle notification)** | NotificationPreferencesPage | P2 | UI pattern (implícito) |
| 190 | **(Save notification preferences)** | NotificationPreferencesPage | P1 | Agregar `save-notification-preferences` ActionId |
| 191 | **(Toggle privacy setting)** | PrivacySettingsPage | P2 | UI pattern (implícito) |
| 192 | **(Save privacy settings)** | PrivacySettingsPage | P1 | Agregar `save-privacy-settings` ActionId |
| 193 | **Change Password** | PasswordSecurityPage | P0 | Agregar `change-password` ActionId |
| 194 | **Enable 2FA** | PasswordSecurityPage | P0 | Agregar `enable-2fa` ActionId |
| 195 | **(Save security settings)** | PasswordSecurityPage | P1 | Agregar `save-security-settings` ActionId |
| 196 | **Delete Saved Search** | SavedSearchesPage / Card | P1 | Agregar `delete-saved-search` ActionId |
| 197 | **Confirm Delete Account** | DeleteAccountPage | P0 | Agregar `confirm-delete-account` ActionId |

### CATEGORÍA: MESSAGES / CHAT (10 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 198 | **(Navigate to Messages)** | Bottom Nav / Messages | P2 | Navegación implícita |
| 199 | **(Click conversation)** | Messages | P2 | Navegación implícita |
| 200 | **(Archive conversation)** | Messages / Card (swipe) | P2 | Agregar `archive-conversation` ActionId (not implemented) |
| 201 | **(Delete conversation)** | Messages / Card (⋯) | P1 | Agregar `delete-conversation` ActionId |
| 202 | **(Back from Chat)** | Chat / Header | P2 | Navegación implícita |
| 203 | **(Type message)** | Chat / Input | P2 | Implícito |
| 204 | **Send Message** | Chat / Input | P1 | Agregar `send-message` ActionId |
| 205 | **Make Offer** (Chat) | Chat / Quick actions | — | Mapeado a `make-offer` |
| 206 | **Mark as Sold** (Chat) | Chat / Quick actions | — | Mapeado a `mark-as-sold` |
| 207 | **View Listing** (Chat) | Chat / Header | P2 | Navegación implícita |

### CATEGORÍA: SAVED ITEMS (3 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 208 | **(Navigate to Saved)** | Bottom Nav / Saved | P2 | Navegación implícita |
| 209 | **(Click saved item)** | Saved Items | P2 | Navegación implícita |
| 210 | **(Remove from saved)** | Saved Items / Card | — | Mapeado a `save-listing` (toggle) |

### CATEGORÍA: MENU / NAVIGATION (13 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 211 | **Open Menu** | Header / MenuSheet trigger | P1 | Agregar `open-menu` ActionId |
| 212 | **Close Menu** | MenuSheet | P2 | UI pattern |
| 213 | **My Listings** (Menu) | MenuSheet | P2 | Navegación implícita |
| 214 | **Action Center** (Menu) | MenuSheet | P2 | Navegación implícita |
| 215 | **Campaigns** (Menu) | MenuSheet | P2 | Navegación implícita |
| 216 | **Events** (Menu) | MenuSheet | P2 | Navegación implícita |
| 217 | **My Trail** (Menu) | MenuSheet | P2 | Navegación implícita |
| 218 | **Billing** (Menu) | MenuSheet | P2 | Navegación implícita |
| 219 | **Statistics** (Menu) | MenuSheet | P2 | Navegación implícita |
| 220 | **Profile** (Menu) | MenuSheet | P2 | Navegación implícita |
| 221 | **Settings** (Menu) | MenuSheet | P2 | Navegación implícita |
| 222 | **Sign Out** (Menu) | MenuSheet | P0 | Agregar `sign-out` ActionId |

### CATEGORÍA: SYSTEM / IMPLICIT (11 acciones)

| # | Acción Visible | Ubicación | Severidad | Recomendación |
|---|----------------|-----------|-----------|---------------|
| 223 | **(implicit) Auto-refresh** | Home / Background | P2 | Sistema, no requiere ActionId |
| 224 | **(implicit) Load on scroll** | Home / Scroll bottom | P2 | Sistema (infinite scroll) |
| 225 | **(implicit) Network retry** | Any / Error state | P2 | Sistema |
| 226 | **(implicit) Form auto-save** | PublishFlow / Background | P2 | Sistema (not implemented) |
| 227 | **(implicit) Session timeout** | Any / Background | P2 | Sistema (not implemented) |
| 228 | **(implicit) Optimistic update** | Various | P2 | Sistema |
| 229 | **(implicit) Toast dismiss** | Any / Toast | P2 | Sistema |
| 230 | **(implicit) Modal backdrop click** | Any / Modal | P2 | Sistema |
| 231 | **(implicit) Swipe to go back** | Any / Mobile | P2 | Sistema (not implemented) |
| 232 | **(implicit) Pull to refresh** | Home / Top | P2 | Sistema (not implemented) |
| 233 | **(implicit) Image lazy load** | Any / Scroll | P2 | Sistema |

---

## B. LISTA: ACCIONES EN FIGMA QUE NO EXISTEN EN ACTION_REGISTRY

### P0 — CRÍTICAS (35 acciones)

| # | Acción Visible | Ubicación | Problema |
|---|----------------|-----------|----------|
| 1 | **Sign In** | SignInPage | Core auth flow no modelado |
| 2 | **Sign in with Google** | SignInPage | OAuth no modelado |
| 3 | **Sign in with Apple** | SignInPage | OAuth no modelado |
| 4 | **Sign in with Facebook** | SignInPage | OAuth no modelado |
| 5 | **Sign Up** | SignInPage | Core auth flow no modelado |
| 6 | **Create Account** | SignUpPage | Core auth flow no modelado |
| 7 | **Sign Out** | MenuSheet | Core auth flow no modelado |
| 8 | **Ask Question** | Listing Detail / Footer | Core communication action no modelada |
| 9 | **Continue** (Draft) | Action Center | Draft management no modelado |
| 10 | **Save Draft** | PublishFlow / Step 1 | Draft management no modelado |
| 11 | **Save as Draft** | PublishFlow / Step 5 | Draft management no modelado |
| 12 | **Publish Now** | PublishFlow / Step 5 | Core publish action no modelada |
| 13 | **Save Changes** | PublishFlow / Step 5 | Core edit action no modelada |
| 14 | **Edit Answer** | Listing Detail / Q&A | Core communication action no modelada |
| 15 | **Approve** (Campaign Request) | Action Center | Campaign workflow no modelado |
| 16 | **Reject** (Campaign Request) | Action Center | Campaign workflow no modelado |
| 17 | **Approve** (Event Request) | Action Center | Event workflow no modelado |
| 18 | **Reject** (Event Request) | Action Center | Event workflow no modelado |
| 19 | **Approve** (Join Request) | Action Center | Group workflow no modelado |
| 20 | **Decline** (Join Request) | Action Center | Group workflow no modelado |
| 21 | **Take Action** (Report) | Action Center | Moderation workflow no modelado |
| 22 | **Dismiss** (Report) | Action Center | Moderation workflow no modelado |
| 23 | **Take Action** (Platform Report) | Action Center | Platform moderation no modelado |
| 24 | **Dismiss** (Platform Report) | Action Center | Platform moderation no modelado |
| 25 | **Approve** (Flagged) | Action Center | Platform moderation no modelado |
| 26 | **Remove** (Flagged) | Action Center | Platform moderation no modelado |
| 27 | **Contact User** (Admin) | Action Center | Admin communication no modelada |
| 28 | **Join Group** | Group Detail | Core group action no modelada |
| 29 | **Request to Join** | Group Detail | Core group action no modelada |
| 30 | **Request Invitation** | Group Detail | Core group action no modelada |
| 31 | **Cancel Request** | Group Detail | Core group action no modelada |
| 32 | **Create Group** | Groups | Core group action no modelada |
| 33 | **Create Campaign** | Campaigns | Core campaign action no modelada |
| 34 | **Create Event Hub** | Events | Core event action no modelada |
| 35 | **Delete Account** | Settings | Core account action no modelada |

### P1 — ALTAS (28 acciones)

| # | Acción Visible | Ubicación |
|---|----------------|-----------|
| 36 | **Forgot password?** | SignInPage |
| 37 | **(Search input)** | Home / Search bar |
| 38 | **Advanced Filters** | Home / Search bar |
| 39 | **Toggle Map View** | Home / Search bar |
| 40 | **Apply Filters** | FilterSheet |
| 41 | **View Profile** | Listing Detail / Seller card |
| 42 | **Reply** (Owner Messages) | Listing Detail / Owner section |
| 43 | **(Upload images)** | PublishFlow / Step 1 |
| 44 | **(Remove image)** | PublishFlow / Step 1 |
| 45 | **Settings** | Action Center / Header |
| 46 | **Notifications** | Action Center / Header |
| 47 | **View Status** (Pending) | Action Center |
| 48 | **Edit & Resubmit** (Rejected) | Action Center |
| 49 | **Details** (Rejected) | Action Center |
| 50 | **Edit First** (Expiring) | Action Center |
| 51 | **Explore Groups** | Groups / Header |
| 52 | **Filter Notifications** | Notifications / Header |
| 53 | **Mark All as Read** | Notifications / Header |
| 54 | **Mark Section as Read** | Notifications / Section |
| 55 | **Clear Section** | Notifications / Section |
| 56 | **View** (Report Status Notif) | Notifications |
| 57 | **Edit Personal Info** | Profile Hub |
| 58 | **Edit Publishing Defaults** | Profile Hub |
| 59 | **Manage Addresses** | Profile Hub |
| 60 | **Manage Organizations** | Profile Hub |
| 61 | **Send Message** | Chat |
| 62 | **Delete conversation** | Messages |
| 63 | **Open Menu** | Header |

### P2 — MEDIAS (160 acciones)

*Ver lista completa en documento AS-IS Global Inventory*

---

## C. LISTA: ActionIds EN REGISTRY QUE NO EXISTEN EN FIGMA

### ActionIds NO Implementados (36 acciones)

| # | ActionId | Group | Contexts | Severidad | Notas |
|---|----------|-------|----------|-----------|-------|
| 1 | `archive-listing` | listing-management | my-listings, notifications, bulk | P2 | Feature deseada, no crítica |
| 2 | `boost-listing` | listing-management | my-listings, product-detail, notifications, bulk | P1 | Premium feature importante |
| 3 | `report-sold-elsewhere` | listing-management | my-listings, product-detail | P2 | Nice-to-have |
| 4 | `export-analytics` | listing-management | profile | P2 | Admin/power user feature |
| 5 | `print-qr` | listing-management | product-detail, my-listings | P2 | Offline marketing feature |
| 6 | `view-trade-offer` | transaction | notifications, messages | P1 | Trade flow incompleto sin esto |
| 7 | `reserve-item` | transaction | product-detail | P2 | Advanced feature |
| 8 | `confirm-delivery-received` | transaction | notifications, messages | P2 | Trust/reputation feature |
| 9 | `quick-reply` | communication | notifications, messages, product-detail, my-listings | P1 | UX feature importante |
| 10 | `request-more-photos` | communication | product-detail, messages | P2 | Nice-to-have |
| 11 | `follow-seller` | social | product-detail, profile, notifications | P1 | Social engagement feature |
| 12 | `block-user` | social | profile, messages, notifications, product-detail | P1 | Safety feature importante |
| 13 | `leave-review` | social | product-detail, notifications | P1 | Trust/reputation crítico |
| 14 | `report-user` | social | profile, messages, product-detail | P1 | Safety feature crítico |
| 15 | `preview-group` | group | notifications, groups | P2 | Discovery feature |
| 16 | `pin-group` | group | groups | P2 | Organization feature |
| 17 | `unpin-group` | group | groups | P2 | Organization feature |
| 18 | `view-group-reports` | group | group-detail | P1 | Admin feature crítico |
| 19 | `moderate-group-listings` | group | group-detail | P1 | Admin feature crítico |
| 20 | `manage-group-members` | group | group-detail | P1 | Admin feature crítico |
| 21 | `edit-group-profile` | group | group-detail | P1 | Admin feature importante |
| 22 | `message-owner` | moderation | group-detail | P2 | Moderator communication |
| 23 | `create-price-alert` | social | product-detail | P2 | Engagement feature |
| 24 | `stop-watching` | social | notifications, product-detail | P2 | Management feature |
| 25 | `view-saved-search` | social | notifications, profile | P2 | Discovery feature |
| 26 | `approve-member-listing` | organization | notifications, org-dashboard, my-listings | P1 | Org feature (si se implementa orgs) |
| 27 | `assign-listing` | organization | org-dashboard, my-listings, product-detail | P1 | Org feature |
| 28 | `transfer-ownership` | organization | my-listings, product-detail, org-dashboard | P1 | Org feature |
| 29 | `bulk-edit-prices` | organization | my-listings, org-dashboard | P1 | Org feature |
| 30 | `view-team-analytics` | organization | org-dashboard, profile | P1 | Org feature |
| 31 | `verify-identity` | social | profile, notifications | P1 | Trust feature (existe pero mal nombrado en Figma) |
| 32 | `upgrade-plan` | social | profile, notifications | P1 | Monetization feature |
| 33 | `manage-subscription` | social | profile, notifications | P1 | Monetization feature |
| 34 | `bulk-archive` | bulk | my-listings, org-dashboard | P2 | Bulk management |
| 35 | `bulk-boost` | bulk | my-listings, org-dashboard | P1 | Bulk premium feature |
| 36 | `bulk-reactivate` | bulk | my-listings, org-dashboard | P2 | Bulk management |

---

## D. LISTA: DUPLICACIONES SEMÁNTICAS DETECTADAS

| # | Acción 1 (Label Figma) | Acción 2 (Label Figma) | Ubicación | Problema | Recomendación |
|---|------------------------|------------------------|-----------|----------|---------------|
| 1 | **"Reply"** (Messages) | **"Open Chat"** | Action Center / MessageCard vs My Listings | Naming diferente, misma funcionalidad | Unificar a "Reply" o "Open Chat" |
| 2 | **"Answer"** (Questions) | **"Respond"** (Questions) | Action Center / QuestionCard vs My Listings / Messages | Sinónimos | Unificar a "Answer" |
| 3 | **"Message Seller"** | **"Open Chat"** | Listing Detail / Footer vs My Listings | Naming diferente, misma funcionalidad | Unificar naming |
| 4 | **"Decline"** (Trade) | **"Reject"** (Trade) | ActionId naming inconsistente | Label: Decline, ActionId: reject-trade | Unificar a "Decline" o "Reject" |
| 5 | **"Decline"** (Group Invite) | **"Reject"** (Group Invite) | ActionId naming inconsistente | Label: Decline, ActionId: reject-group-invite | Unificar a "Decline" o "Reject" |
| 6 | **"Accept"** | — | Múltiples contexts (Trade, Join Request, Group Invite) | Mismo label para actions muy diferentes | Aceptable si contexto es claro |
| 7 | **"Approve"** | — | Múltiples contexts (Campaign, Event, Join Request, Flagged, Listing) | Mismo label, múltiples flows | Aceptable si contexto es claro |
| 8 | **"Delete"** | **"Remove"** | Owner (Delete Listing) vs Moderator (Remove Listing) | Naming diferente según rol | Clarificar semántica: Delete = owner, Remove = moderator |
| 9 | **"Hide Listing"** | **"Remove Listing"** | Group Moderator actions | Temporal vs Permanente | Clarificar en UI/tooltips |
| 10 | **"Save Draft"** (Step 1) | **"Save as Draft"** (Step 5) | PublishFlow | Naming inconsistente ("as" agregado) | Unificar a "Save Draft" |
| 11 | **"Edit"** | **"Edit First"** (Expiring) | My Listings vs Action Center | "Edit First" implica orden | Simplificar a "Edit" con contexto claro |
| 12 | **"Edit & Resubmit"** | **"Edit"** | Action Center (Rejected) vs General | Naming compuesto para contexto | Decidir: ¿es acción separada o solo Edit con auto-resubmit? |
| 13 | **"Resume"** | **"Reactivate"** | UI Label vs ActionId | Label: Resume, ActionId: reactivate-listing | Aceptable (semántica similar) |

---

## E. LISTA: DEAD CLICKS / PLACEHOLDERS

### Dead Clicks Confirmados (5 acciones)

| # | Acción Visible | Ubicación | ActionId (si existe) | Problema | Severidad | Evidencia en Código |
|---|----------------|-----------|---------------------|----------|-----------|---------------------|
| 1 | **Review** (Report) | Action Center / Groups / ReportCard | `review-report` | Navega a "Report Detail Page" no implementado | P0 | `toast.info('Report Detail Page not yet implemented')` línea 492 ActionCenterPage.tsx |
| 2 | **Review** (Platform Report) | Action Center / Admin / PlatformReportCard | (no en registry) | Navega a "Platform Report Detail Page" no implementado | P0 | Similar a #1, admin context |
| 3 | **Review Listing** (Flagged) | Action Center / Admin / FlaggedListingCard | (no en registry) | Navega a "Listing Detail (Admin Mode)" no implementado | P0 | Dead click confirmado en código |
| 4 | **Review Issue** (User) | Action Center / Admin / UserIssueCard | (no en registry) | Navega a "User Issue Detail Sheet" no implementado | P0 | Dead click confirmado en código |
| 5 | **Review Report** | My Listings / Reported Tab | `review-report` | Navega a "Report Detail" no implementado | P0 | Mismo problema que #1, diferente entry point |

### Acciones con Implementación Placeholder (7 acciones)

| # | Acción Visible | Ubicación | ActionId | Problema | Severidad |
|---|----------------|-----------|----------|----------|-----------|
| 6 | **Zoom In** | MapView / Controls | (no en registry) | Implementado como placeholder, no funcional | P2 |
| 7 | **Zoom Out** | MapView / Controls | (no en registry) | Implementado como placeholder, no funcional | P2 |
| 8 | **(Archive conversation)** | Messages / Card (swipe) | (no en registry) | Marcado como "Not implemented" en código | P2 |
| 9 | **(Form auto-save)** | PublishFlow / Background | (no en registry) | Comentado como no implementado | P2 |
| 10 | **(Session timeout)** | Any / Background | (no en registry) | No implementado | P2 |
| 11 | **(Swipe to go back)** | Any / Mobile | (no en registry) | Mobile PWA feature no implementado | P2 |
| 12 | **(Pull to refresh)** | Home / Top | (no en registry) | No implementado | P2 |

---

## F. RESUMEN EJECUTIVO — HALLAZGOS CRÍTICOS

### COBERTURA REAL vs ESPERADA

| Dimensión | AS-IS (Figma) | TO-BE (Registry) | Gap |
|-----------|---------------|------------------|-----|
| **Total acciones** | 328 | 98 | +230 (68% overhead) |
| **Core actions implementadas** | 62/98 | 98/98 | 36 faltantes (37%) |
| **Duplicaciones semánticas** | 13 pares | 0 | 13 a resolver |
| **Dead clicks** | 5 | 0 | 5 P0 a implementar |
| **Ambiguedades naming** | 18 | 0 | 18 a clarificar |

### PROBLEMAS CRÍTICOS (P0)

| # | Problema | Cantidad | Impacto |
|---|----------|----------|---------|
| 1 | **Acciones core sin ActionId** | 35 | Bloquea escalabilidad del sistema de actions |
| 2 | **Dead clicks confirmados** | 5 | Frustración usuario, pérdida de confianza |
| 3 | **Draft management no modelado** | 3 acciones | Core flow de publicación incompleto |
| 4 | **Publish flow no modelado** | 3 acciones | Core flow de publicación incompleto |
| 5 | **Campaign/Event workflows no modelados** | 8 acciones | Features no escalables |
| 6 | **Group moderation no modelada** | 4 acciones | Admin features no escalables |
| 7 | **Auth flow no modelado** | 7 acciones | Security/audit imposible sin ActionIds |

### ACCIONES RECOMENDADAS (PRIORIDAD)

#### P0 — IMPLEMENTAR INMEDIATAMENTE (5-7 días)

1. **Agregar 35 ActionIds faltantes P0** (ver lista B.P0)
   - Auth flow: `sign-in`, `sign-out`, `sign-up`, `create-account`, OAuth variants
   - Draft management: `save-draft`, `continue-draft`
   - Publish flow: `publish-listing`, `save-listing-changes`
   - Campaign/Event: `create-campaign`, `approve-campaign-request`, etc.
   - Group: `join-group`, `request-to-join-group`, `cancel-join-request`, etc.
   - Account: `delete-account`

2. **Implementar 5 dead clicks**
   - `review-report` → Crear Report Detail Page/Sheet
   - Platform admin report detail → Crear Platform Report Detail
   - Flagged listing admin mode → Crear Listing Detail (Admin Mode)
   - User issue detail → Crear User Issue Detail Sheet

3. **Resolver duplicaciones semánticas críticas**
   - Unificar: "Reply" vs "Open Chat" → decidir naming único
   - Unificar: "Answer" vs "Respond" → usar "Answer"
   - Unificar: "Decline" vs "Reject" → decidir naming único
   - Unificar: "Save Draft" vs "Save as Draft" → usar "Save Draft"

#### P1 — SIGUIENTES 2 SEMANAS

1. **Agregar 28 ActionIds faltantes P1** (ver lista B.P1)
2. **Implementar ActionIds existentes pero no visibles** (36 acciones)
   - Priorizar: `boost-listing`, `follow-seller`, `block-user`, `leave-review`, `report-user`
   - Admin features: `view-group-reports`, `moderate-group-listings`, `manage-group-members`
3. **Resolver ambiguedades naming** (18 casos)

#### P2 — BACKLOG (Nice-to-Have)

1. Agregar ActionIds para acciones implícitas/sistema críticas
2. Implementar placeholders faltantes (zoom map, archive conversation, etc.)
3. Documentar acciones de navegación pura (no requieren ActionId)

### RECOMENDACIONES ARQUITECTÓNICAS

1. **Separar acciones de navegación**
   - Crear tipo `NavigationAction` separado de `ActionId`
   - Navegación pura no requiere ActionId (ej: tabs, back buttons, card clicks)

2. **Documentar acciones implícitas**
   - Crear documento `IMPLICIT_ACTIONS.md`
   - Clarificar qué requiere ActionId y qué no

3. **Unificar naming conventions**
   - Crear guía de naming para actions
   - Ejemplo: "Decline" para user-facing, "Reject" para admin-facing

4. **Priorizar implementación por dominio**
   - Auth flow (P0)
   - Draft/Publish flow (P0)
   - Campaign/Event workflows (P0)
   - Group moderation (P0)
   - Social features (P1: follow, review, report)

---

**FIN DEL REPORTE DE AUDITORÍA**

