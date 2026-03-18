/**
 * ProfileRouter Component
 * Manages routing between all Profile pages
 */

import { Suspense } from 'react';
import { ProfileProvider } from '../../contexts/ProfileContext';
import { useProfileNavigation } from '../../hooks/useProfileNavigation';
import { ProfileHub } from './ProfileHub';
import { AccountVerificationPage } from './AccountVerificationPage';
import { PersonalInfoPage } from './PersonalInfoPage';
import { AccountTypePage } from './AccountTypePage';
import { PublishingPage } from './PublishingPage';
import { PublishingContactPage } from './PublishingContactPage';
import { PublishingDeliveryPage } from './PublishingDeliveryPage';
import { PublishingVisibilityPage } from './PublishingVisibilityPage';
import { PublishingCurrencyPage } from './PublishingCurrencyPage';
import { AddressesPage } from './AddressesPage';
import { AddressFormFlow } from './AddressFormFlow';
import { LanguageRegionPage } from './LanguageRegionPage';

interface ProfileRouterProps {
  onBack: () => void;
}

function LoadingFallback() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
}

export function ProfileRouter({ onBack }: ProfileRouterProps) {
  const { currentProfileView, addressEditId, organizationEditId, navigation } = useProfileNavigation(onBack);

  return (
    <ProfileProvider>
      <Suspense fallback={<LoadingFallback />}>
        {currentProfileView === 'hub' && (
          <ProfileHub
            onBack={navigation.goBack}
            onNavigate={navigation}
          />
        )}

        {currentProfileView === 'account' && (
          <AccountVerificationPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'personal' && (
          <PersonalInfoPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'account-type' && (
          <AccountTypePage 
            onBack={navigation.goBack}
            onNavigate={navigation}
          />
        )}

        {currentProfileView === 'publishing' && (
          <PublishingPage
            onBack={navigation.goBack}
            onNavigate={navigation}
          />
        )}

        {currentProfileView === 'publishing-contact' && (
          <PublishingContactPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'publishing-delivery' && (
          <PublishingDeliveryPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'publishing-visibility' && (
          <PublishingVisibilityPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'publishing-currency' && (
          <PublishingCurrencyPage onBack={navigation.goBack} />
        )}

        {currentProfileView === 'addresses' && (
          <AddressesPage
            onBack={navigation.goBack}
            onNavigate={navigation}
          />
        )}

        {currentProfileView === 'address-form' && (
          <AddressFormFlow
            addressId={addressEditId}
            onBack={navigation.goBack}
          />
        )}

        {currentProfileView === 'language' && (
          <LanguageRegionPage onBack={navigation.goBack} />
        )}
      </Suspense>
    </ProfileProvider>
  );
}

export default ProfileRouter;