/**
 * useProfileNavigation Hook
 * Centralized navigation for Profile modular system
 */

import { useState } from 'react';
import { ProfileView, ProfileNavigation } from '../components/profile/types';

export function useProfileNavigation(onNavigateToHome: () => void) {
  const [currentProfileView, setCurrentProfileView] = useState<ProfileView>('hub');
  const [addressEditId, setAddressEditId] = useState<string | undefined>(undefined);
  const [organizationEditId, setOrganizationEditId] = useState<string | undefined>(undefined);

  const navigation: ProfileNavigation = {
    navigateToHub: () => setCurrentProfileView('hub'),
    
    navigateToAccount: () => setCurrentProfileView('account'),
    
    navigateToPersonal: () => setCurrentProfileView('personal'),
    
    navigateToAccountType: () => setCurrentProfileView('account-type'),
    
    // MVP: Organizations feature hidden (no-op)
    navigateToOrganizations: () => {
      // Organizations feature not available in MVP
      console.log('[MVP] Organizations feature coming soon');
    },
    navigateToOrganizationForm: (organizationId?: string) => {
      // Organizations feature not available in MVP
      console.log('[MVP] Organizations feature coming soon');
    },
    
    navigateToPublishing: () => setCurrentProfileView('publishing'),
    navigateToPublishingContact: () => setCurrentProfileView('publishing-contact'),
    navigateToPublishingDelivery: () => setCurrentProfileView('publishing-delivery'),
    navigateToPublishingVisibility: () => setCurrentProfileView('publishing-visibility'),
    navigateToPublishingCurrency: () => setCurrentProfileView('publishing-currency'),
    
    navigateToAddresses: () => setCurrentProfileView('addresses'),
    navigateToAddressForm: (addressId?: string) => {
      setAddressEditId(addressId);
      setCurrentProfileView('address-form');
    },
    
    navigateToLanguage: () => setCurrentProfileView('language'),
    
    goBack: () => {
      // Smart back navigation
      if (currentProfileView.startsWith('publishing-')) {
        setCurrentProfileView('publishing');
      } else if (currentProfileView === 'address-form') {
        setAddressEditId(undefined);
        setCurrentProfileView('addresses');
      } else if (currentProfileView === 'account-type') {
        setCurrentProfileView('hub');
      } else if (currentProfileView === 'hub') {
        onNavigateToHome();
      } else {
        setCurrentProfileView('hub');
      }
    },
  };

  return {
    currentProfileView,
    addressEditId,
    organizationEditId,
    navigation,
  };
}