/**
 * Shared types for all services
 */

// ============================================
// COMMON RESULT TYPE
// ============================================

export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: string;
  fallbackUsed?: boolean; // true if mock service was used
}

// ============================================
// AI SERVICE TYPES
// ============================================

export interface AISuggestions {
  title?: string;
  description?: string;
  category?: string;
  subcategory?: string;
  hashtags: string[];
  attributes?: {
    brand?: string;
    model?: string;
    color?: string;
    size?: string;
    sku?: string;
  };
  confidence: number; // 0-1
  detectedObjects?: string[];
  dominantColors?: string[];
}

export interface AIAnalyzeOptions {
  images: string[];        // URLs or base64 of images
  maxSuggestions?: number; // Limit for hashtags, etc
  language?: 'es' | 'en';
}

// ============================================
// MAPS SERVICE TYPES
// ============================================

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  city?: string;
  region?: string;
  country?: string;
  postalCode?: string;
}

export interface GeocodingResult {
  location: Location;
  formattedAddress: string;
  placeId?: string;
}

export interface SearchLocationOptions {
  query: string;
  limit?: number;
  bounds?: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  language?: string;
}

// ============================================
// UPLOAD/STORAGE TYPES
// ============================================

export interface UploadProgress {
  loaded: number;
  total: number;
  percentage: number;
}

export interface UploadResult {
  url: string;
  path: string;
  size: number;
}

export interface UploadOptions {
  bucket: string;
  path?: string;
  maxSize?: number; // bytes
  allowedTypes?: string[]; // MIME types
  onProgress?: (progress: UploadProgress) => void;
}
