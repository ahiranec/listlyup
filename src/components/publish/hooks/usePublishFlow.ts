/**
 * Custom hook for managing publish flow state and navigation
 * Supports both CREATE and EDIT modes with change detection
 * 
 * GROUP PERMISSIONS INTEGRATION:
 * - Validates canPost() for selected groups
 * - Uses shouldAutoApproveListings() to determine listing status
 * - Blocks submission if user lacks permissions
 */

import { useState, useEffect, useMemo } from 'react';
import type { PublishFormData, PublishStep } from '../types';
import type { AISuggestions } from '../../../lib/services/types';
import { INITIAL_FORM_DATA, MOCK_AVAILABLE_GROUPS } from '../constants';
import { useProfile } from '../../../contexts/ProfileContext';
import { toast } from 'sonner';
import { canPost, shouldAutoApproveListings, type Group, type UserRole } from '../../../lib/groupPermissions';
import { locationsRepo } from '../../../data/repos/locationsRepo';
import { listingsRepo } from '../../../data/repos/listingsRepo';
import type { CurrentUser } from '../../../types';

interface UsePublishFlowProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<PublishFormData>;
  onClose: () => void;
  onPublish?: (data: PublishFormData & { status?: 'active' | 'pending' | 'draft' }) => void;
  currentUser?: CurrentUser | null; // User performing the publish
  currentUserRole?: UserRole; // NEW: Para validar permisos
  availableGroups?: Group[]; // NEW: Lista de grupos donde el usuario puede publicar
}

export function usePublishFlow({ 
  mode = 'create',
  initialData,
  onClose, 
  onPublish,
  currentUser,
  currentUserRole = 'member', // Default: member
  availableGroups = MOCK_AVAILABLE_GROUPS, // Default: central mock groups
}: UsePublishFlowProps) {
  const { profile } = useProfile();
  
  // Initialize form data with Profile defaults or initialData (for edit)
  const getInitialFormData = (): PublishFormData => {
    const defaults = { ...INITIAL_FORM_DATA };

    // EDIT MODE: Use initialData first
    if (mode === 'edit' && initialData) {
      return { ...defaults, ...initialData } as PublishFormData;
    }

    // CREATE MODE: Apply initialData first (for contextual publish from GroupDetail)
    if (mode === 'create' && initialData) {
      Object.assign(defaults, initialData);
      
      // Auto-set visibility_mode to "groups_only" if selectedGroups is provided
      if (initialData.selectedGroups && initialData.selectedGroups.length > 0 && !initialData.visibility_mode) {
        defaults.visibility_mode = 'groups_only';
      }
    }

    // CREATE MODE: Apply Profile defaults if available (and not overridden by initialData)
    if (mode === 'create' && profile) {
      // Default location from addresses (only if not set by initialData)
      if (!defaults.location) {
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
      }

      // Default visibility_mode (only if not set by initialData)
      if (!initialData?.visibility_mode) {
        defaults.visibility_mode = profile.default_visibility;
      }

      // Default access_mode - SOLO inicializar vacío aquí
      // Los defaults se aplicarán dinámicamente en PricingStep si es product
      defaults.access_mode = profile.default_access_mode || [];

      // Default contact_methods (CANONICAL)
      defaults.contact_methods = [profile.default_contact_method];

      // Phone number → contact_whatsapp_phone
      if (profile.phone && profile.phoneVerified && profile.default_contact_method === 'whatsapp') {
        defaults.contact_whatsapp_phone = profile.default_whatsapp_phone || profile.phone;
      }
      
      // Website URL
      if (profile.default_contact_method === 'website' && profile.default_website_url) {
        defaults.contact_website_url = profile.default_website_url;
      }
      
      // Social URL
      if (profile.default_contact_method === 'social_media' && profile.default_social_url) {
        defaults.contact_social_url = profile.default_social_url;
      }
    }

    return defaults;
  };

  const [currentStep, setCurrentStep] = useState<PublishStep>('media');
  const [completedSteps, setCompletedSteps] = useState<PublishStep[]>([]);
  const [formData, setFormData] = useState<PublishFormData>(getInitialFormData());
  const [aiSuggestions, setAISuggestions] = useState<AISuggestions | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  
  // Store original data for change detection (edit mode only)
  const [originalData] = useState<PublishFormData>(getInitialFormData());
  
  // Change detection (edit mode only)
  const changeDetection = useMemo(() => {
    if (mode !== 'edit') return null;
    
    const changes: Partial<PublishFormData> = {};
    let count = 0;
    
    (Object.keys(formData) as Array<keyof PublishFormData>).forEach(key => {
      const original = JSON.stringify(originalData[key]);
      const current = JSON.stringify(formData[key]);
      
      if (original !== current) {
        (changes as any)[key] = formData[key];
        count++;
      }
    });
    
    return {
      changes,
      count,
      hasChanges: count > 0,
    };
  }, [mode, formData, originalData]);

  // Navigation helpers
  const goToStep = (step: PublishStep) => {
    setCurrentStep(step);
  };

  const markStepCompleted = (step: PublishStep) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
  };

  const goToNextStep = (fromStep: PublishStep, toStep: PublishStep) => {
    markStepCompleted(fromStep);
    setCurrentStep(toStep);
  };

  // Step navigation handlers
  const handleMediaNext = () => goToNextStep('media', 'basic-info');
  const handleBasicInfoNext = () => goToNextStep('basic-info', 'location');
  const handleLocationNext = () => goToNextStep('location', 'pricing');
  const handlePricingNext = () => goToNextStep('pricing', 'preview');

  // Back navigation handlers
  const handleMediaBack = () => setCurrentStep('media');
  const handleBasicInfoBack = () => setCurrentStep('media');
  const handleLocationBack = () => setCurrentStep('basic-info');
  const handlePricingBack = () => setCurrentStep('location');

  // AI Suggestions handler
  const handleAISuggestions = (suggestions: AISuggestions) => {
    setAISuggestions(suggestions);
    
    // Auto-fill form with AI suggestions
    setFormData(prev => ({
      ...prev,
      title: suggestions.title || prev.title,
      description: suggestions.description || prev.description,
      category: suggestions.category || prev.category,
      subcategory: suggestions.subcategory || prev.subcategory,
      tags: suggestions.hashtags.map(h => h.replace('#', '')),
    }));
  };

  // ✅ VALIDACIÓN CENTRAL: Contrato de integridad del listing
  const validateListingContract = (data: PublishFormData): { valid: boolean; error?: string } => {
    // 1. Info Básica
    if (!data.title || data.title.trim().length < 3) {
      return { valid: false, error: "El título debe tener al menos 3 caracteres." };
    }
    if (data.images.length === 0) {
      return { valid: false, error: "Se requiere al menos una imagen." };
    }

    // 2. Location
    if (!data.location) {
      return { valid: false, error: "La ubicación es obligatoria." };
    }
    const hasValidCoords = data.location.latitude !== null && data.location.longitude !== null;
    const hasValidAddress = data.location.address && data.location.address.trim().length > 2 && !['.', ','].includes(data.location.address.trim());
    if (!hasValidCoords && !hasValidAddress) {
      return { valid: false, error: "La ubicación debe tener coordenadas válidas o una dirección de texto real." };
    }

    // 3. Reglas por Tipo
    if (data.type === 'event') {
      if (!data.eventDate) return { valid: false, error: "La fecha del evento es obligatoria." };
      if (!data.eventTime || data.eventTime.trim().length < 2) return { valid: false, error: "El horario/agenda del evento es obligatorio." };
    }

    if (data.type === 'service') {
      const needsPrice = data.pricingModel && data.pricingModel !== 'quote';
      if (needsPrice && (!data.price || parseFloat(data.price) <= 0)) {
        return { valid: false, error: "El precio es obligatorio para el modelo de cobro seleccionado." };
      }
    }

    if (data.type === 'product') {
      const isSelling = data.intent?.offerMode === 'sell' || data.intent?.offerMode === 'sell_or_trade' || data.offerType === 'sell' || data.offerType === 'sell_or_trade';
      if (isSelling && (!data.price || parseFloat(data.price) <= 0)) {
        return { valid: false, error: "El precio es obligatorio para productos en venta." };
      }
      if (data.access_mode.length === 0) {
        return { valid: false, error: "Debes seleccionar al menos un método de entrega (Pickup, Delivery, etc)." };
      }
    }

    // 4. Métodos de Contacto
    if (data.contact_methods.length === 0) {
      return { valid: false, error: "Debes seleccionar al menos un método de contacto." };
    }
    if (data.contact_methods.includes('website') && (!data.contact_website_url || data.contact_website_url.trim().length < 4)) {
      return { valid: false, error: "Falta la URL del sitio web de contacto." };
    }
    if (data.contact_methods.includes('social_media') && (!data.contact_social_url || data.contact_social_url.trim().length < 4)) {
      return { valid: false, error: "Falta la URL de redes sociales de contacto." };
    }
    if (data.contact_methods.includes('whatsapp') && (!data.contact_whatsapp_phone || data.contact_whatsapp_phone.trim().length < 8)) {
      return { valid: false, error: "El teléfono de WhatsApp es obligatorio e incompleto." };
    }

    return { valid: true };
  };

  // Publish handler
  const handlePublish = async () => {
    // ✅ GUARD 1: Prevent double-submit
    if (isPublishing) return;

    // ✅ VALIDACIÓN 1: Contrato de Integridad (Campos obligatorios y coherencia)
    const validation = validateListingContract(formData);
    if (!validation.valid) {
      toast.error(validation.error || "Datos incompletos en el formulario");
      return;
    }

    // ✅ VALIDACIÓN 2: Verificar permisos para grupos seleccionados
    if (formData.selectedGroups && formData.selectedGroups.length > 0) {
      const invalidGroups: string[] = [];
      
      formData.selectedGroups.forEach(groupId => {
        const group = availableGroups.find(g => g.id === groupId);
        if (!group) {
          invalidGroups.push(groupId);
          return;
        }
        
        // Validar canPost para este grupo
        if (!canPost(currentUserRole, group)) {
          invalidGroups.push(group.name);
        }
      });
      
      if (invalidGroups.length > 0) {
        toast.error(`No tienes permisos para publicar en: ${invalidGroups.join(', ')}`);
        setIsPublishing(false);
        return; // ❌ BLOQUEAR submit
      }
    }
    
    setIsPublishing(true);

    // Declare outside try so it's accessible in the success block
    let listingStatus: 'active' | 'pending' = 'active';

    let locationId: string | null = null;
    try {
      // ──────────────────────────────────────────────
      // STEP 1: Create location row in Supabase
      // ──────────────────────────────────────────────
      if (formData.location) {
        locationId = await locationsRepo.createLocation({
          latitude: formData.location.latitude,
          longitude: formData.location.longitude,
          address: formData.location.address,
          city: formData.location.city,
          region: formData.location.region,
          country: formData.location.country,
          place_id: formData.location.placeId,
        });
        console.log('[usePublishFlow] ✅ Location created:', locationId);
      }

      // ──────────────────────────────────────────────
      // STEP 2: Determine listing status
      // ──────────────────────────────────────────────
      if (formData.selectedGroups && formData.selectedGroups.length > 0) {
        const requiresApproval = formData.selectedGroups.some(groupId => {
          const group = availableGroups.find(g => g.id === groupId);
          if (!group) return false;
          return !shouldAutoApproveListings(group);
        });

        if (requiresApproval) {
          listingStatus = 'pending';
        }
      }

      // ──────────────────────────────────────────────
      // STEP 3: Create listing row in Supabase
      // ──────────────────────────────────────────────

      let userId = currentUser?.id;
      if (!userId) {
        throw new Error('Cannot publish without a logged-in user');
      }

      const result = await listingsRepo.createListing({
        user_id:            userId,
        location_id:        locationId,
        title:              formData.title,
        description:        formData.description || '',
        listing_type:       formData.type,
        offer_mode:         formData.intent?.offerMode ?? null,
        primary_image_url:  formData.images[0] ?? null,
        price_amount:       formData.price ? parseFloat(formData.price) : null,
        price_currency:     formData.currency,
        visibility_mode:    formData.visibility_mode || 'public',
        status:             listingStatus,
        ai_prefill_used:    false,
        ai_flagged:         false,
        
        category:           formData.category,
        subcategory:        formData.subcategory,
        tags:               formData.tags,
        condition:          formData.intent?.condition ?? formData.condition ?? null,
        pricing_model:      formData.pricingModel ?? null,
        contact_methods:    formData.contact_methods,
        contact_whatsapp_phone: formData.contact_whatsapp_phone ?? null,
        contact_website_url: formData.contact_website_url ?? null,
        contact_social_url: formData.contact_social_url ?? null,
        access_mode:        formData.access_mode,
        start_date:         formData.eventDate ?? null,
        end_date:           formData.eventEndDate ?? null,
        event_time_text:    formData.eventTime ?? null,
        event_duration_type: formData.intent?.eventDurationType ?? formData.eventDurationType ?? null,
        ticket_type:        formData.intent?.ticketType ?? formData.ticketType ?? null,
        image_urls:         formData.images,
      });
      console.log('[usePublishFlow] ✅ Listing created:', result.id);

    } catch (err: any) {
      console.error('[usePublishFlow] ❌ Publish failed:', err?.message || err);
      
      // ATOMICITY FIX: Rollback location if listing creation failed
      if (locationId) {
        console.warn('[usePublishFlow] 🔄 Rolling back location creation (ID:', locationId, ')');
        try {
          await locationsRepo.deleteLocation(locationId);
          console.log('[usePublishFlow] 🔄 Rollback successful.');
        } catch (rollbackErr: any) {
          console.error('[usePublishFlow] ❌ CRITICAL: Rollback failed:', rollbackErr.message);
        }
      }

      toast.error(err?.message || 'Failed to publish listing. Please try again.');
      setIsPublishing(false);
      return; // Abort — don't close the flow
    }

    setIsPublishing(false);
    
    // Different success message for edit vs create
    let message = mode === 'edit' 
      ? `✓ Changes saved${changeDetection?.count ? ` (${changeDetection.count} field${changeDetection.count > 1 ? 's' : ''} updated)` : ''}`
      : '🎉 Listing published successfully!';
    
    // Mensaje específico si va a pending
    if (mode === 'create' && listingStatus === 'pending') {
      message = '⏳ Listing submitted for approval';
    }
    
    toast.success(message);
    
    if (onPublish) {
      onPublish({ ...formData, status: listingStatus });
    }
    
    onClose();
  };
  
  // Save draft handler (edit mode only)
  const handleSaveDraft = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const message = mode === 'edit' 
      ? '💾 Draft saved'
      : '💾 Listing saved as draft';
    
    toast.success(message);
    
    if (onPublish) {
      onPublish({ ...formData, status: 'draft' });
    }
    
    onClose();
  };

  return {
    // State
    currentStep,
    completedSteps,
    formData,
    aiSuggestions,
    isPublishing,
    profile, // Expose profile for steps to check defaults
    changeDetection, // Add change detection for edit mode
    
    // Setters
    setFormData,
    
    // Navigation
    goToStep,
    handleMediaNext,
    handleBasicInfoNext,
    handleLocationNext,
    handlePricingNext,
    handleMediaBack,
    handleBasicInfoBack,
    handleLocationBack,
    handlePricingBack,
    
    // Actions
    handleAISuggestions,
    handlePublish,
    handleSaveDraft, // Add save draft
  };
}
