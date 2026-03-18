/**
 * Constants for Publish Flow
 * CANONICAL ALIGNED
 */

import type { PublishFormData } from './types';

export const INITIAL_FORM_DATA: PublishFormData = {
  // Step 1
  images: [],
  type: 'product', // Default listing type
  
  // v1.2: Intent is undefined initially - will be set in Step 1 modal
  intent: undefined,
  
  // Step 2
  title: '',
  description: '',
  category: 'Other', // ✅ Default: Other (capitalized)
  subcategory: 'General', // ✅ Default: General (capitalized)
  tags: [],
  // Legacy fields kept for backward compatibility
  offerType: undefined, // Now set via intent in Step 1
  condition: undefined, // Now set via intent in Step 1
  serviceMode: undefined, // NEW v1.2: set via intent in Step 1
  pricingModel: 'fixed', // Default for services
  ticketType: undefined, // Now set via intent in Step 1
  
  // Step 3
  location: null,
  locationPrecision: 'approximate',
  
  // Step 4 - CANONICAL
  currency: 'CLP',
  discount: { type: 'none' },
  access_mode: [],
  contact_methods: [],
  visibility_mode: 'public',
};

export const ANIMATION_CONFIG = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.2 },
};

export const PUBLISH_SIMULATION_DELAY = 2000; // ms