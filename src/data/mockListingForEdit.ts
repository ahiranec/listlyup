/**
 * Mock listing data for testing EDIT mode in Publish Flow
 */

import type { PublishFormData } from '../components/publish/types';

export const mockListingForEdit: Partial<PublishFormData> = {
  // Step 1: Media + Type
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
  ],
  type: 'product',
  
  // Step 2: Basic Info
  title: 'Sony WH-1000XM4 Wireless Headphones',
  description: 'Industry-leading noise canceling headphones with premium sound quality. Barely used, in excellent condition with original box and all accessories.',
  category: 'Electronics',
  subcategory: 'Audio',
  tags: ['headphones', 'wireless', 'sony', 'noise-canceling'],
  
  // Product-specific
  condition: 'like-new',
  offerType: 'sell',
  
  // Step 3: Location
  location: {
    latitude: -33.4489,
    longitude: -70.6693,
    address: 'Providencia, Santiago, Chile',
    city: 'Santiago',
    region: 'Región Metropolitana',
  },
  locationPrecision: 'approximate',
  deliveryIntent: 'pickup',
  
  // Step 4: Pricing
  price: '250000',
  priceNegotiable: true,
  deliveryModes: ['pickup', 'shipping'],
  contactModes: ['chat', 'whatsapp'],
  phoneNumber: '+56912345678',
  visibility: 'public',
  selectedGroups: [],
  selectedCampaigns: [],
  selectedEvents: [],
};
