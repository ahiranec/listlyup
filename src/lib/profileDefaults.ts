/**
 * Profile Defaults System
 * Creates default profile with regional settings
 */

import { DEFAULT_PROFILE, type ProfileData } from '../components/profile/types';
import { detectUserRegion, getRegionalDefaultsSync, type RegionDefaults } from './regionDetection';

/**
 * Create a new default profile with regional settings
 * Async version - detects region first
 */
export async function createDefaultProfile(
  email: string,
  loginMethod: 'email' | 'google' | 'apple'
): Promise<ProfileData> {
  // Detect user's region
  const regionDefaults = await detectUserRegion();
  
  return buildProfileWithRegion(email, loginMethod, regionDefaults);
}

/**
 * Create a new default profile synchronously
 * Uses cached region or fallback
 */
export function createDefaultProfileSync(
  email: string,
  loginMethod: 'email' | 'google' | 'apple'
): ProfileData {
  // Get region synchronously (uses cache or browser detection)
  const regionDefaults = getRegionalDefaultsSync();
  
  return buildProfileWithRegion(email, loginMethod, regionDefaults);
}

/**
 * Build profile with region defaults
 */
function buildProfileWithRegion(
  email: string,
  loginMethod: 'email' | 'google' | 'apple',
  regionDefaults: RegionDefaults
): ProfileData {
  return {
    ...DEFAULT_PROFILE,
    email,
    loginMethod,
    
    // ✅ Fixed defaults según usuario
    defaultContact: {
      inAppChat: true,   // ✅ InAppChat por defecto
      whatsapp: false,
      phoneCall: false,
      email: false,
    },
    
    defaultDelivery: {
      pickup: false,
      meetup: true,      // ✅ Meetup por defecto
      delivery: false,
      shipping: false,
      virtual: false,
    },
    
    defaultVisibility: 'public',  // ✅ Public por defecto
    
    // ✨ Dynamic defaults basados en región detectada
    defaultCurrency: regionDefaults.currency,
    appLanguage: regionDefaults.language,
    region: regionDefaults.region,
  };
}

/**
 * Get default currency for a profile (for backwards compatibility)
 */
export function getDefaultCurrency(profile?: ProfileData): string {
  if (profile?.defaultCurrency) {
    return profile.defaultCurrency;
  }
  
  // Fallback to region detection
  const regionDefaults = getRegionalDefaultsSync();
  return regionDefaults.currency;
}

/**
 * Get default language for a profile
 */
export function getDefaultLanguage(profile?: ProfileData): 'es' | 'en' | 'pt' {
  if (profile?.appLanguage) {
    return profile.appLanguage;
  }
  
  // Fallback to region detection
  const regionDefaults = getRegionalDefaultsSync();
  return regionDefaults.language;
}

/**
 * Get default coordinates for new address
 */
export function getDefaultCoordinates(profile?: ProfileData): { latitude: number; longitude: number } {
  // If profile has addresses, use first one
  if (profile?.addresses && profile.addresses.length > 0) {
    return profile.addresses[0].coordinates;
  }
  
  // Otherwise use region default
  const regionDefaults = getRegionalDefaultsSync();
  return regionDefaults.coordinates;
}

/**
 * Migration helper: Update existing profile with missing fields
 */
export function migrateProfileDefaults(profile: ProfileData): ProfileData {
  const regionDefaults = getRegionalDefaultsSync();
  
  return {
    ...profile,
    
    // Ensure meetup field exists
    defaultDelivery: {
      ...profile.defaultDelivery,
      meetup: profile.defaultDelivery.meetup ?? false, // Conservative default for existing profiles
    },
    
    // Fill missing regional defaults if needed
    defaultCurrency: profile.defaultCurrency || regionDefaults.currency,
    appLanguage: profile.appLanguage || regionDefaults.language,
    region: profile.region || regionDefaults.region,
  };
}
