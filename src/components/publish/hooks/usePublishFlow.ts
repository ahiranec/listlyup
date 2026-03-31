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
import { INITIAL_FORM_DATA } from '../constants';
import { useProfile } from '../../../contexts/ProfileContext';
import { toast } from 'sonner@2.0.3';
import { canPost, shouldAutoApproveListings, type Group, type UserRole } from '../../../lib/groupPermissions';
import { locationsRepo } from '../../../data/repos/locationsRepo';
import { listingsRepo } from '../../../data/repos/listingsRepo';
import type { CurrentUser } from '../../../types';

interface UsePublishFlowProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<PublishFormData>;
  onClose: () => void;
  onPublish?: (data: PublishFormData & { status?: 'active' | 'pending' }) => void;
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
  availableGroups = [], // Default: sin grupos
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
        changes[key] = formData[key];
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

  // Publish handler
  const handlePublish = async () => {
    // ✅ GUARD: Prevent double-submit
    if (isPublishing) return;

    // ✅ VALIDACIÓN 1: Verificar permisos para grupos seleccionados
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
        toast.error(`You don't have permission to post in: ${invalidGroups.join(', ')}`);
        setIsPublishing(false);
        return; // ❌ BLOQUEAR submit
      }
    }
    
    setIsPublishing(true);

    // Declare outside try so it's accessible in the success block
    let listingStatus: 'active' | 'pending' = 'active';

    try {
      // ──────────────────────────────────────────────
      // STEP 1: Create location row in Supabase
      // ──────────────────────────────────────────────
      let locationId: string | null = null;

      if (formData.location) {
        locationId = await locationsRepo.createLocation({
          latitude: formData.location.latitude,
          longitude: formData.location.longitude,
          address: formData.location.address,
          city: formData.location.city,
          region: formData.location.region,
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
      });
      console.log('[usePublishFlow] ✅ Listing created:', result.id);

    } catch (err: any) {
      console.error('[usePublishFlow] ❌ Publish failed:', err?.message || err);
      toast.error('Failed to publish listing. Please try again.');
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