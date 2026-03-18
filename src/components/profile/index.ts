/**
 * Profile Module - Barrel Export
 * Export all Profile components for easy importing
 */

export { ProfileRouter } from './ProfileRouter'; // Main router
export { ProfileHub } from './ProfileHub';
export { AccountVerificationPage } from './AccountVerificationPage';
export { PersonalInfoPage } from './PersonalInfoPage';
export { PublishingPage } from './PublishingPage';
export { PublishingContactPage } from './PublishingContactPage';
export { PublishingDeliveryPage } from './PublishingDeliveryPage';
export { PublishingVisibilityPage } from './PublishingVisibilityPage';
export { PublishingCurrencyPage } from './PublishingCurrencyPage';
export { AddressesPage } from './AddressesPage';
export { AddressFormFlow } from './AddressFormFlow';
export { LanguageRegionPage } from './LanguageRegionPage';

// Types
export * from './types';

// Shared components
export { ProfileSection } from './shared/ProfileSection';
export { CompletionChecklist } from './shared/CompletionChecklist';
export { VerificationBadge } from './shared/VerificationBadge';
export { VerificationDialog } from './shared/VerificationDialog';
export { PublicProfilePreview } from './shared/PublicProfilePreview';
export { AddressCard } from './shared/AddressCard';

// Utils
export * from './utils/validation';