/**
 * Mock Profiles - ProfileData Interface
 * Complete profile data for Profile module
 * 
 * Estructura completa para Profile system con todos los campos
 */

import type { ProfileData, Organization, Address } from '../components/profile/types';

/**
 * PERFIL 1: ANA GARCÍA - Google Sign-In
 */
export const mockProfileAna: ProfileData = {
  // Account & Verification
  email: 'ana.garcia@gmail.com',
  emailVerified: true,
  phone: '+56912345678',
  phoneVerified: false,
  loginMethod: 'google',
  username: 'ana_garcia',
  
  // Account Type & Plan
  accountType: 'personal',
  plan: 'Free',
  
  // Personal Information
  displayName: 'Ana García',
  bio: 'Estudiante de diseño | Santiago 📍',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
  
  // Public Profile Visibility
  publicProfile: {
    showDisplayName: true,
    showBio: true,
    showGeneralLocation: true,
  },
  
  // Organizations (Free = no puede crear)
  organizations: [],
  activeOrganizationId: undefined,
  
  // Publishing Defaults
  defaultContact: {
    inAppChat: true,
    whatsapp: false,
    phoneCall: false,
    email: false,
  },
  
  defaultDelivery: {
    pickup: true,
    meetup: false,
    delivery: false,
    shipping: false,
    virtual: false,
  },
  
  defaultVisibility: 'public',
  defaultCurrency: 'CLP',
  
  // Addresses
  addresses: [
    {
      id: 'addr-ana-1',
      label: 'Casa',
      type: 'house',
      formattedAddress: 'Los Leones 1234, Providencia, Santiago',
      coordinates: {
        latitude: -33.4169,
        longitude: -70.6035,
      },
      isGatedCommunity: false,
      hasDoorman: false,
      contact: {
        name: 'Ana García',
        phone: '+56912345678',
      },
      isDefaultForPublishing: true,
      createdAt: '2025-01-10T10:00:00Z',
    },
  ],
  
  // Language & Region
  appLanguage: 'es',
  region: 'Chile',
};

/**
 * PERFIL 2: CARLOS MENDOZA - Apple Sign-In
 */
export const mockProfileCarlos: ProfileData = {
  // Account & Verification
  email: 'carlos.mendoza@icloud.com',
  emailVerified: true,
  phone: '+56987654321',
  phoneVerified: true,
  loginMethod: 'apple',
  username: 'techstore_vina',
  
  // Account Type & Plan
  accountType: 'business',
  plan: 'Plus',
  
  // Personal Information
  displayName: 'Carlos Mendoza | TechStore',
  bio: '📱 Tecnología nueva y usada | Garantía 6 meses | Envíos V Región',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
  
  // Public Profile Visibility
  publicProfile: {
    showDisplayName: true,
    showBio: true,
    showGeneralLocation: true,
  },
  
  // Organizations (Plus + Business = 1 permitida)
  organizations: [
    {
      id: 'org-techstore',
      name: 'TechStore Viña',
      type: 'store',
      description: 'Venta de tecnología nueva y usada con garantía',
      logoUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechStore',
      role: 'owner',
      createdAt: '2024-11-15T10:00:00Z',
    },
  ],
  activeOrganizationId: 'org-techstore',
  
  // Publishing Defaults
  defaultContact: {
    inAppChat: true,
    whatsapp: true,
    phoneCall: true,
    email: false,
  },
  
  defaultDelivery: {
    pickup: true,
    meetup: false,
    delivery: true,
    shipping: true,
    virtual: false,
  },
  
  defaultVisibility: 'public',
  defaultCurrency: 'CLP',
  
  // Addresses
  addresses: [
    {
      id: 'addr-carlos-1',
      label: 'Tienda',
      type: 'building',
      formattedAddress: 'Valparaíso 456, Viña del Mar',
      coordinates: {
        latitude: -33.0247,
        longitude: -71.5514,
      },
      isGatedCommunity: false,
      hasDoorman: true,
      deliveryInstructions: 'Tocar timbre tienda. Horario 10-19h lun-sab',
      contact: {
        name: 'Carlos Mendoza',
        phone: '+56987654321',
      },
      isDefaultForPublishing: true,
      createdAt: '2024-11-15T10:00:00Z',
    },
    {
      id: 'addr-carlos-2',
      label: 'Bodega',
      type: 'warehouse',
      formattedAddress: 'Industrial Los Pinos 789, Quilpué',
      coordinates: {
        latitude: -33.0478,
        longitude: -71.4425,
      },
      isGatedCommunity: false,
      hasDoorman: false,
      contact: {
        name: 'Juan Pérez',
        phone: '+56911111111',
      },
      isDefaultForPublishing: false,
      createdAt: '2024-12-01T10:00:00Z',
    },
  ],
  
  // Language & Region
  appLanguage: 'es',
  region: 'Chile',
};

/**
 * PERFIL 3: MARÍA LÓPEZ - Email Sign-In
 */
export const mockProfileMaria: ProfileData = {
  // Account & Verification
  email: 'maria.lopez@example.com',
  emailVerified: true,
  phone: '+56922222222',
  phoneVerified: true,
  loginMethod: 'email',
  username: 'maria_concon',
  
  // Account Type & Plan
  accountType: 'personal',
  plan: 'Pro',
  
  // Personal Information
  displayName: 'María López',
  bio: '🧘‍♀️ Yoga instructor | 📸 Photography lover | Concón',
  avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
  
  // Public Profile Visibility
  publicProfile: {
    showDisplayName: true,
    showBio: true,
    showGeneralLocation: true,
  },
  
  // Organizations (Personal = no puede aunque tenga Pro)
  organizations: [],
  activeOrganizationId: undefined,
  
  // Publishing Defaults
  defaultContact: {
    inAppChat: true,
    whatsapp: true,
    phoneCall: false,
    email: true,
  },
  
  defaultDelivery: {
    pickup: true,
    meetup: false,
    delivery: true,
    shipping: false,
    virtual: true,
  },
  
  defaultVisibility: 'groups',
  defaultCurrency: 'CLP',
  
  // Addresses
  addresses: [
    {
      id: 'addr-maria-1',
      label: 'Casa',
      type: 'house',
      formattedAddress: 'Av. Borgoño 2345, Concón',
      coordinates: {
        latitude: -32.9265,
        longitude: -71.5206,
      },
      isGatedCommunity: true,
      hasDoorman: false,
      deliveryInstructions: 'Dejar en conserjería',
      contact: {
        name: 'María López',
        phone: '+56922222222',
      },
      isDefaultForPublishing: true,
      createdAt: '2025-01-05T10:00:00Z',
    },
    {
      id: 'addr-maria-2',
      label: 'Estudio Yoga',
      type: 'building',
      formattedAddress: 'Costanera 567, Reñaca',
      coordinates: {
        latitude: -32.9539,
        longitude: -71.5442,
      },
      isGatedCommunity: false,
      hasDoorman: false,
      contact: {
        name: 'María López',
        phone: '+56922222222',
      },
      isDefaultForPublishing: false,
      createdAt: '2024-12-10T10:00:00Z',
    },
  ],
  
  // Language & Region
  appLanguage: 'es',
  region: 'Chile',
};

/**
 * All mock profiles
 */
export const allMockProfiles = {
  ana: mockProfileAna,
  carlos: mockProfileCarlos,
  maria: mockProfileMaria,
};