/**
 * Mock User Stats
 * Seller ratings, stats, y métricas para cada usuario
 */

import type { Seller } from '../types';

/**
 * SELLER STATS: ANA GARCÍA
 * - Free plan: stats básicos
 */
export const mockSellerAna: Seller = {
  id: 'user-ana-google',
  name: 'Ana García',
  username: 'ana_garcia',
  rating: 4.2,
  reviews: 3,
  verified: false,
  isStore: false,
  memberSince: '2024-10-15',
  responseTime: '2h average',
  itemsSold: 5,
};

/**
 * SELLER STATS: CARLOS MENDOZA
 * - Plus plan: verified seller badge
 */
export const mockSellerCarlos: Seller = {
  id: 'user-carlos-apple',
  name: 'Carlos Mendoza | TechStore',
  username: 'techstore_vina',
  rating: 4.8,
  reviews: 47,
  verified: true, // Verified seller badge
  isStore: true,
  memberSince: '2024-03-20',
  responseTime: '30min average',
  itemsSold: 142,
};

/**
 * SELLER STATS: MARÍA LÓPEZ
 * - Pro plan: featured seller badge
 */
export const mockSellerMaria: Seller = {
  id: 'user-maria-email',
  name: 'María López',
  username: 'maria_concon',
  rating: 4.9,
  reviews: 28,
  verified: true, // Featured seller badge (Pro)
  isStore: false,
  memberSince: '2024-05-10',
  responseTime: '1h average',
  itemsSold: 34,
};

/**
 * All mock sellers
 */
export const allMockSellers = {
  ana: mockSellerAna,
  carlos: mockSellerCarlos,
  maria: mockSellerMaria,
};

/**
 * Get seller by user ID
 */
export function getSellerById(userId: string): Seller | undefined {
  switch (userId) {
    case 'user-ana-google':
      return mockSellerAna;
    case 'user-carlos-apple':
      return mockSellerCarlos;
    case 'user-maria-email':
      return mockSellerMaria;
    default:
      return undefined;
  }
}
