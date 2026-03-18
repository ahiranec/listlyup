/**
 * Publish Flow
 * Main component that orchestrates the 5-step publishing wizard
 * v1.1.1 - Updated to media-first flow
 * 
 * SUPPORTS TWO MODES:
 * 
 * 1. CREATE MODE (default):
 *    <PublishFlow 
 *      onClose={() => navigateToHome()}
 *      onPublish={(data) => saveListing(data)}
 *    />
 *    - Empty form
 *    - Type selector editable
 *    - AI detection active
 *    - Button: "Publish Now"
 * 
 * 2. EDIT MODE:
 *    <PublishFlow 
 *      mode="edit"
 *      initialData={existingListing}
 *      onClose={() => navigateToHome()}
 *      onPublish={(data) => updateListing(data)}
 *    />
 *    - Prefilled form
 *    - Type selector LOCKED
 *    - Change detection active
 *    - Jump navigation enabled
 *    - Button: "Save Changes"
 * 
 * See /EDIT_LISTING_IMPLEMENTATION.md for full documentation
 */

import { AnimatePresence } from 'motion/react';
import { FlowHeader } from './FlowHeader';
import { StepContainer } from './StepContainer';
import { MediaStepV2 } from './MediaStepV2';
import { BasicInfoStepV2 } from './BasicInfoStepV2';
import { LocationStepV2 } from './LocationStepV2';
import { PricingStep } from './PricingStep';
import { PreviewStepV2 } from './PreviewStepV2';
import { usePublishFlow } from './hooks/usePublishFlow';
import type { CurrentUser } from '../../types';
import type { PublishFormData } from './types';
import type { Group, UserRole } from '../../lib/groupPermissions';

interface PublishFlowProps {
  mode?: 'create' | 'edit';
  initialData?: Partial<PublishFormData>;
  currentUser?: CurrentUser;
  currentUserRole?: UserRole; // NEW: Para validar permisos
  availableGroups?: Group[]; // NEW: Grupos donde el usuario puede publicar
  onClose: () => void;
  onPublish?: (data: any) => void;
}

export function PublishFlow({ 
  mode = 'create',
  initialData,
  currentUser,
  currentUserRole = 'member', // Default: member
  availableGroups = [], // Default: sin grupos
  onClose, 
  onPublish 
}: PublishFlowProps) {
  const {
    currentStep,
    completedSteps,
    formData,
    aiSuggestions,
    isPublishing,
    changeDetection,
    setFormData,
    goToStep,
    handleMediaNext,
    handleBasicInfoNext,
    handleLocationNext,
    handlePricingNext,
    handleBasicInfoBack,
    handleLocationBack,
    handlePricingBack,
    handleAISuggestions,
    handlePublish,
    handleSaveDraft,
  } = usePublishFlow({ 
    mode, 
    initialData, 
    onClose, 
    onPublish,
    currentUserRole, // ✅ Pasar userRole
    availableGroups, // ✅ Pasar grupos disponibles
  });

  return (
    <div className="fixed inset-0 z-50 bg-background">
      <div className="h-screen bg-background flex flex-col max-w-[480px] lg:max-w-[640px] mx-auto relative overflow-x-hidden w-full">
        
        {/* Header */}
        <FlowHeader 
          mode={mode}
          changeCount={changeDetection?.count}
          currentStep={currentStep} 
          completedSteps={completedSteps}
          onClose={onClose}
          onStepClick={mode === 'edit' ? goToStep : undefined}
        />

        {/* Step Content */}
        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 'media' && (
              <StepContainer stepKey="media">
                <MediaStepV2
                  mode={mode}
                  images={formData.images}
                  selectedType={formData.type}
                  intent={formData.intent}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                  onTypeChange={(type) => setFormData({ ...formData, type })}
                  onIntentChange={(intent) => {
                    // Sync intent to legacy fields for backward compatibility
                    const updates: any = { intent };
                    if (intent.offerMode) updates.offerType = intent.offerMode;
                    if (intent.condition) updates.condition = intent.condition;
                    if (intent.serviceMode) updates.serviceMode = intent.serviceMode;
                    if (intent.ticketType) updates.ticketType = intent.ticketType;
                    setFormData({ ...formData, ...updates });
                  }}
                  onAISuggestions={handleAISuggestions}
                  onNext={handleMediaNext}
                  onSaveDraft={mode === 'edit' ? handleSaveDraft : undefined}
                />
              </StepContainer>
            )}

            {currentStep === 'basic-info' && (
              <StepContainer stepKey="basic-info">
                <BasicInfoStepV2
                  listingType={formData.type}
                  title={formData.title}
                  description={formData.description}
                  category={formData.category}
                  subcategory={formData.subcategory}
                  tags={formData.tags}
                  offerType={formData.offerType}
                  price={formData.price}
                  currency={formData.currency}
                  priceNegotiable={formData.priceNegotiable}
                  discount={formData.discount}
                  condition={formData.condition}
                  tradeInterests={formData.tradeInterests}
                  pricingModel={formData.pricingModel}
                  duration={formData.duration}
                  eventDate={formData.eventDate}
                  eventTime={formData.eventTime}
                  eventEndTime={formData.eventEndTime}
                  eventEndDate={formData.eventEndDate}
                  hasMultipleDates={formData.hasMultipleDates}
                  ticketType={formData.ticketType}
                  intent={formData.intent}
                  aiSuggestions={aiSuggestions}
                  onDataChange={(data) => setFormData({ ...formData, ...data })}
                  onNext={handleBasicInfoNext}
                  onBack={handleBasicInfoBack}
                />
              </StepContainer>
            )}

            {currentStep === 'location' && (
              <StepContainer stepKey="location">
                <LocationStepV2
                  currentUser={currentUser}
                  listingType={formData.type}
                  location={formData.location}
                  locationPrecision={formData.locationPrecision}
                  onDataChange={(data) => setFormData({ ...formData, ...data })}
                  onNext={handleLocationNext}
                  onBack={handleLocationBack}
                />
              </StepContainer>
            )}

            {currentStep === 'pricing' && (
              <StepContainer stepKey="pricing">
                <PricingStep
                  listingType={formData.type}
                  offerType={formData.offerType}
                  price={formData.price}
                  priceNegotiable={formData.priceNegotiable}
                  access_mode={formData.access_mode}
                  contact_methods={formData.contact_methods}
                  contact_whatsapp_phone={formData.contact_whatsapp_phone}
                  contact_website_url={formData.contact_website_url}
                  contact_social_url={formData.contact_social_url}
                  visibility_mode={formData.visibility_mode}
                  selectedGroups={formData.selectedGroups}
                  lockedGroups={formData.lockedGroups}
                  onDataChange={(data) => setFormData({ ...formData, ...data })}
                  onNext={handlePricingNext}
                  onBack={handlePricingBack}
                />
              </StepContainer>
            )}

            {currentStep === 'preview' && (
              <StepContainer stepKey="preview">
                <PreviewStepV2
                  mode={mode}
                  changeCount={changeDetection?.count}
                  hasChanges={changeDetection?.hasChanges}
                  formData={formData}
                  onPublish={handlePublish}
                  onSaveAsDraft={handleSaveDraft}
                  onBack={handlePricingBack}
                  onEdit={goToStep}
                  isPublishing={isPublishing}
                />
              </StepContainer>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default PublishFlow;