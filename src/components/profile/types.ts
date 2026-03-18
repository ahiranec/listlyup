/**
 * Profile Module - Type Definitions
 * Central types for modular Profile system
 * CANONICAL ALIGNED
 */

import type { ContactMethod, AccessMode, VisibilityMode } from '../../types/canonical';

export interface Address {
  id: string;
  label: string; // "Casa", "Oficina", "Warehouse", etc.
  type: 'house' | 'building' | 'warehouse' | 'other';
  formattedAddress: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  isGatedCommunity: boolean;
  hasDoorman: boolean;
  deliveryInstructions?: string;
  contact: {
    name: string;
    phone: string;
  };
  isDefaultForPublishing: boolean;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  type: 'store' | 'agency' | 'other';
  customType?: string; // If type === 'other'
  description?: string;
  logoUrl?: string;
  role: 'owner' | 'admin' | 'member';
  createdAt: string;
}

export interface ProfileData {
  // Account & Verification
  email: string;
  emailVerified: boolean;
  phone?: string;
  phoneVerified: boolean;
  loginMethod: 'email' | 'google' | 'apple';
  username: string;
  
  // Account Type & Plan
  accountType: 'personal' | 'business';
  plan: 'Free' | 'Plus' | 'Pro';
  
  // Personal Information
  displayName: string;
  bio: string;
  avatarUrl?: string;
  
  // Public Profile Visibility
  publicProfile: {
    showDisplayName: boolean;
    showBio: boolean;
    showGeneralLocation: boolean;
  };
  
  // Organizations
  organizations: Organization[];
  activeOrganizationId?: string;
  
  // Publishing Defaults - CANONICAL
  default_contact_method: ContactMethod;
  default_whatsapp_phone?: string;
  default_website_url?: string;
  default_social_url?: string;
  
  default_access_mode: AccessMode[];
  
  default_visibility: VisibilityMode;
  defaultCurrency: string; // 'CLP', 'USD', 'EUR', etc.
  
  // Addresses
  addresses: Address[];
  
  // Language & Region
  appLanguage: 'es' | 'en' | 'pt';
  region: string;
}

export interface PublishingCompleteness {
  contact: boolean;
  access: boolean;
  visibility: boolean;
  currency: boolean;
  address: boolean;
}

export function getPublishingCompleteness(profile: ProfileData): PublishingCompleteness {
  return {
    contact: !!profile.default_contact_method,
    access: profile.default_access_mode.length > 0,
    visibility: !!profile.default_visibility,
    currency: !!profile.defaultCurrency,
    address: profile.addresses.some(a => a.isDefaultForPublishing),
  };
}

export function calculateCompletenessScore(completeness: PublishingCompleteness): number {
  const values = Object.values(completeness);
  const completed = values.filter(v => v === true).length;
  return completed; // 0-5
}

export const DEFAULT_PROFILE: ProfileData = {
  email: '',
  emailVerified: false,
  phone: undefined,
  phoneVerified: false,
  loginMethod: 'email',
  username: '',
  displayName: '',
  bio: '',
  avatarUrl: undefined,
  publicProfile: {
    showDisplayName: true,
    showBio: true,
    showGeneralLocation: true,
  },
  default_contact_method: 'in_app_chat',
  default_whatsapp_phone: undefined,
  default_website_url: undefined,
  default_social_url: undefined,
  default_access_mode: ['meetup'],
  default_visibility: 'public',
  defaultCurrency: 'CLP',
  addresses: [],
  appLanguage: 'es',
  region: 'Chile',
  accountType: 'personal',
  plan: 'Free',
  organizations: [],
};

// Navigation types
export type ProfileView = 
  | 'hub'
  | 'account'
  | 'personal'
  | 'account-type'
  | 'organizations'
  | 'organization-form'
  | 'publishing'
  | 'publishing-contact'
  | 'publishing-delivery'
  | 'publishing-visibility'
  | 'publishing-currency'
  | 'addresses'
  | 'address-form'
  | 'language';

export interface ProfileNavigation {
  navigateToHub: () => void;
  navigateToAccount: () => void;
  navigateToPersonal: () => void;
  navigateToAccountType: () => void;
  navigateToOrganizations: () => void;
  navigateToOrganizationForm: (organizationId?: string) => void;
  navigateToPublishing: () => void;
  navigateToPublishingContact: () => void;
  navigateToPublishingDelivery: () => void;
  navigateToPublishingVisibility: () => void;
  navigateToPublishingCurrency: () => void;
  navigateToAddresses: () => void;
  navigateToAddressForm: (addressId?: string) => void;
  navigateToLanguage: () => void;
  goBack: () => void;
}