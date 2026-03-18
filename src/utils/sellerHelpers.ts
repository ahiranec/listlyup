/**
 * Seller Info Helpers
 * 
 * Centraliza la lógica para obtener información del vendedor/owner
 * basada en ownerId del producto.
 */

import { mockUserAna, mockUserCarlos, mockUserMaria } from '../data/mockUsers';

export interface SellerInfo {
  id: string;
  name: string;
  username: string;
  avatar?: string;
  rating?: number;
  reviews?: number;
  verified: boolean;
  isStore: boolean;
  memberSince: string;
  responseTime: string;
  itemsSold: number;
}

/**
 * Base de datos de usuarios conocidos con sus estadísticas
 */
const SELLER_DATABASE: Record<string, SellerInfo> = {
  'user-maria-email': {
    id: 'user-maria-email',
    name: 'María López',
    username: 'maria_concon',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
    rating: 4.9,
    reviews: 156,
    verified: true,
    isStore: false,
    memberSince: 'Jan 2024',
    responseTime: '~1h',
    itemsSold: 7,
  },
  'user-ana-google': {
    id: 'user-ana-google',
    name: 'Ana García',
    username: 'ana_vina',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
    rating: 4.5,
    reviews: 45,
    verified: true,
    isStore: false,
    memberSince: 'Mar 2024',
    responseTime: '~2h',
    itemsSold: 5,
  },
  'user-carlos-apple': {
    id: 'user-carlos-apple',
    name: 'Carlos Mendoza',
    username: 'carlosmendoza',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
    rating: 4.7,
    reviews: 89,
    verified: true,
    isStore: true,
    memberSince: 'Feb 2024',
    responseTime: '~30min',
    itemsSold: 34,
  },
  'user456': {
    id: 'user456',
    name: 'Juan Pérez',
    username: 'juanp',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
    rating: 4.8,
    reviews: 120,
    verified: false,
    isStore: false,
    memberSince: 'Dec 2023',
    responseTime: '~3h',
    itemsSold: 25,
  },
  'user789': {
    id: 'user789',
    name: 'Sofía Ramírez',
    username: 'sofia_r',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia',
    rating: 4.6,
    reviews: 67,
    verified: true,
    isStore: false,
    memberSince: 'Nov 2023',
    responseTime: '~2h',
    itemsSold: 18,
  },
};

/**
 * Obtiene información del vendedor basada en ownerId
 * 
 * @param ownerId - ID del owner del producto
 * @returns SellerInfo con datos completos del vendedor
 */
export function getSellerInfo(ownerId?: string): SellerInfo {
  if (!ownerId) {
    return createUnknownSeller();
  }

  // Buscar en base de datos de usuarios conocidos
  const seller = SELLER_DATABASE[ownerId];
  
  if (seller) {
    return seller;
  }

  // Fallback para usuarios desconocidos
  return createUnknownSeller(ownerId);
}

/**
 * Crea un objeto SellerInfo para usuarios desconocidos
 */
function createUnknownSeller(ownerId?: string): SellerInfo {
  return {
    id: ownerId || 'unknown',
    name: 'Usuario Desconocido',
    username: 'unknown',
    avatar: undefined,
    rating: undefined,
    reviews: undefined,
    verified: false,
    isStore: false,
    memberSince: 'Unknown',
    responseTime: 'Unknown',
    itemsSold: 0,
  };
}

/**
 * Verifica si un ownerId corresponde a un usuario conocido
 */
export function isKnownSeller(ownerId?: string): boolean {
  return !!ownerId && ownerId in SELLER_DATABASE;
}

/**
 * Obtiene el nombre completo del vendedor (fallback seguro)
 */
export function getSellerName(ownerId?: string): string {
  return getSellerInfo(ownerId).name;
}

/**
 * Obtiene el username del vendedor (fallback seguro)
 */
export function getSellerUsername(ownerId?: string): string {
  return getSellerInfo(ownerId).username;
}
