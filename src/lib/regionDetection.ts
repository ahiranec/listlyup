/**
 * Region Detection System
 * Detects user's region/country to set appropriate defaults
 */

export interface RegionDefaults {
  country: string;
  countryCode: string;
  currency: string;
  language: 'es' | 'en' | 'pt';
  region: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  timezone: string;
}

/**
 * Map of country codes to their defaults
 */
const REGION_DEFAULTS_MAP: Record<string, RegionDefaults> = {
  CL: {
    country: 'Chile',
    countryCode: 'CL',
    currency: 'CLP',
    language: 'es',
    region: 'Chile',
    coordinates: { latitude: -33.4489, longitude: -70.6693 }, // Santiago
    timezone: 'America/Santiago',
  },
  US: {
    country: 'United States',
    countryCode: 'US',
    currency: 'USD',
    language: 'en',
    region: 'United States',
    coordinates: { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
    timezone: 'America/Los_Angeles',
  },
  BR: {
    country: 'Brazil',
    countryCode: 'BR',
    currency: 'BRL',
    language: 'pt',
    region: 'Brazil',
    coordinates: { latitude: -23.5505, longitude: -46.6333 }, // São Paulo
    timezone: 'America/Sao_Paulo',
  },
  AR: {
    country: 'Argentina',
    countryCode: 'AR',
    currency: 'ARS',
    language: 'es',
    region: 'Argentina',
    coordinates: { latitude: -34.6037, longitude: -58.3816 }, // Buenos Aires
    timezone: 'America/Argentina/Buenos_Aires',
  },
  MX: {
    country: 'Mexico',
    countryCode: 'MX',
    currency: 'MXN',
    language: 'es',
    region: 'Mexico',
    coordinates: { latitude: 19.4326, longitude: -99.1332 }, // Mexico City
    timezone: 'America/Mexico_City',
  },
  CO: {
    country: 'Colombia',
    countryCode: 'CO',
    currency: 'COP',
    language: 'es',
    region: 'Colombia',
    coordinates: { latitude: 4.7110, longitude: -74.0721 }, // Bogotá
    timezone: 'America/Bogota',
  },
  PE: {
    country: 'Peru',
    countryCode: 'PE',
    currency: 'PEN',
    language: 'es',
    region: 'Peru',
    coordinates: { latitude: -12.0464, longitude: -77.0428 }, // Lima
    timezone: 'America/Lima',
  },
  ES: {
    country: 'Spain',
    countryCode: 'ES',
    currency: 'EUR',
    language: 'es',
    region: 'Spain',
    coordinates: { latitude: 40.4168, longitude: -3.7038 }, // Madrid
    timezone: 'Europe/Madrid',
  },
  GB: {
    country: 'United Kingdom',
    countryCode: 'GB',
    currency: 'GBP',
    language: 'en',
    region: 'United Kingdom',
    coordinates: { latitude: 51.5074, longitude: -0.1278 }, // London
    timezone: 'Europe/London',
  },
};

/**
 * Fallback default (Chile)
 */
const FALLBACK_DEFAULTS: RegionDefaults = REGION_DEFAULTS_MAP['CL'];

/**
 * Detect user's region from browser/system
 * Uses multiple detection methods:
 * 1. Navigator language
 * 2. Timezone
 * 3. Cached value from localStorage
 */
export async function detectUserRegion(): Promise<RegionDefaults> {
  // Check if already cached
  const cached = getChachedRegion();
  if (cached) {
    return cached;
  }

  // Try to detect from browser
  const detected = detectFromBrowser();
  
  // Cache the detected region
  cacheRegion(detected);
  
  return detected;
}

/**
 * Detect region from browser APIs (synchronous)
 */
function detectFromBrowser(): RegionDefaults {
  // Method 1: Check navigator.language
  // Format: "es-CL", "en-US", "pt-BR", etc.
  const navigatorLanguage = navigator.language || navigator.languages?.[0];
  
  if (navigatorLanguage) {
    // Extract country code from language string (e.g., "es-CL" -> "CL")
    const parts = navigatorLanguage.split('-');
    if (parts.length === 2) {
      const countryCode = parts[1].toUpperCase();
      if (REGION_DEFAULTS_MAP[countryCode]) {
        return REGION_DEFAULTS_MAP[countryCode];
      }
    }
  }

  // Method 2: Check timezone
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map some common timezones
    const timezoneCountryMap: Record<string, string> = {
      'America/Santiago': 'CL',
      'America/Los_Angeles': 'US',
      'America/New_York': 'US',
      'America/Chicago': 'US',
      'America/Sao_Paulo': 'BR',
      'America/Argentina/Buenos_Aires': 'AR',
      'America/Mexico_City': 'MX',
      'America/Bogota': 'CO',
      'America/Lima': 'PE',
      'Europe/Madrid': 'ES',
      'Europe/London': 'GB',
    };
    
    const countryCode = timezoneCountryMap[timezone];
    if (countryCode && REGION_DEFAULTS_MAP[countryCode]) {
      return REGION_DEFAULTS_MAP[countryCode];
    }
  } catch (e) {
    // Timezone detection failed, continue to fallback
  }

  // Fallback to Chile
  return FALLBACK_DEFAULTS;
}

/**
 * Get region defaults by country code
 */
export function getRegionDefaults(countryCode: string): RegionDefaults {
  return REGION_DEFAULTS_MAP[countryCode] || FALLBACK_DEFAULTS;
}

/**
 * Get all available regions
 */
export function getAllRegions(): RegionDefaults[] {
  return Object.values(REGION_DEFAULTS_MAP);
}

/**
 * Cache detected region in localStorage
 */
function cacheRegion(region: RegionDefaults): void {
  try {
    localStorage.setItem('userRegion', JSON.stringify(region));
  } catch (e) {
    // localStorage not available, silent fail
  }
}

/**
 * Get cached region from localStorage
 */
function getChachedRegion(): RegionDefaults | null {
  try {
    const cached = localStorage.getItem('userRegion');
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    // Failed to parse, return null
  }
  return null;
}

/**
 * Clear cached region (useful for testing)
 */
export function clearCachedRegion(): void {
  try {
    localStorage.removeItem('userRegion');
  } catch (e) {
    // Silent fail
  }
}

/**
 * Get regional defaults (synchronous version)
 * Uses cached value or fallback
 */
export function getRegionalDefaultsSync(): RegionDefaults {
  const cached = getChachedRegion();
  if (cached) {
    return cached;
  }
  
  // Detect from browser immediately
  const detected = detectFromBrowser();
  cacheRegion(detected);
  
  return detected;
}
