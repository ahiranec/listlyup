/**
 * Mock User Groups - MyGroup Interface
 * Group memberships con roles para cada usuario
 */

import type { MyGroup } from '../components/groups/types';

/**
 * GRUPOS DE ANA GARCÍA
 * - 2 grupos como 'member'
 */
export const mockGroupsAna: MyGroup[] = [
  {
    id: 'group1',
    name: 'Tech Enthusiasts Chile',
    description: 'Comunidad de tecnología y gadgets',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechChile',
    memberCount: 2847,
    productCount: 234,
    serviceCount: 45,
    location: 'Chile',
    role: 'member',
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-03-15'),
    lastActivityAt: new Date('2025-12-18'),
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'group3',
    name: 'Local Community V Region',
    description: 'Vecinos de la V Región',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=VRegion',
    memberCount: 1523,
    productCount: 189,
    serviceCount: 67,
    location: 'Valparaíso, Chile',
    role: 'member',
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-06-20'),
    lastActivityAt: new Date('2025-12-17'),
    isPinned: false,
    isMuted: false,
  },
];

/**
 * GRUPOS DE CARLOS MENDOZA
 * - 2 grupos como 'admin'
 * - 1 grupo como 'moderator'
 */
export const mockGroupsCarlos: MyGroup[] = [
  {
    id: 'group1',
    name: 'Tech Enthusiasts Chile',
    description: 'Comunidad de tecnología y gadgets',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechChile',
    memberCount: 2847,
    productCount: 234,
    serviceCount: 45,
    location: 'Chile',
    role: 'admin', // ADMIN
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-03-15'),
    lastActivityAt: new Date('2025-12-18'),
    isPinned: true,
    isMuted: false,
  },
  {
    id: 'group2',
    name: 'Vintage Marketplace',
    description: 'Compra y venta de artículos vintage',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Vintage',
    memberCount: 892,
    productCount: 156,
    serviceCount: 12,
    location: 'Santiago, Chile',
    role: 'moderator', // MODERATOR
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-05-10'),
    lastActivityAt: new Date('2025-12-16'),
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'group-tech-traders',
    name: 'Tech Traders Chile',
    description: 'Intercambio de tecnología usada',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechTraders',
    memberCount: 456,
    productCount: 89,
    serviceCount: 5,
    location: 'Chile',
    role: 'admin', // ADMIN (created by Carlos)
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-11-01'),
    lastActivityAt: new Date('2025-12-18'),
    isPinned: true,
    isMuted: false,
  },
];

/**
 * GRUPOS DE MARÍA LÓPEZ
 * - 1 grupo como 'admin'
 * - 1 grupo como 'moderator'
 * - 2 grupos como 'member'
 */
export const mockGroupsMaria: MyGroup[] = [
  {
    id: 'group1',
    name: 'Tech Enthusiasts Chile',
    description: 'Comunidad de tecnología y gadgets',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechChile',
    memberCount: 2847,
    productCount: 234,
    serviceCount: 45,
    location: 'Chile',
    role: 'member', // MEMBER
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-03-15'),
    lastActivityAt: new Date('2025-12-18'),
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'group2',
    name: 'Vintage Marketplace',
    description: 'Compra y venta de artículos vintage',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Vintage',
    memberCount: 892,
    productCount: 156,
    serviceCount: 12,
    location: 'Santiago, Chile',
    role: 'admin', // ADMIN
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-05-10'),
    lastActivityAt: new Date('2025-12-16'),
    isPinned: true,
    isMuted: false,
  },
  {
    id: 'group3',
    name: 'Local Community V Region',
    description: 'Vecinos de la V Región',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=VRegion',
    memberCount: 1523,
    productCount: 189,
    serviceCount: 67,
    location: 'Valparaíso, Chile',
    role: 'moderator', // MODERATOR
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-06-20'),
    lastActivityAt: new Date('2025-12-17'),
    isPinned: false,
    isMuted: false,
  },
  {
    id: 'group-photography',
    name: 'Photography Enthusiasts',
    description: 'Amantes de la fotografía',
    avatarUrl: 'https://api.dicebear.com/7.x/shapes/svg?seed=Photography',
    memberCount: 678,
    productCount: 45,
    serviceCount: 23,
    location: 'V Región, Chile',
    role: 'admin', // ADMIN (created by María)
    status: 'joined',
    groupType: 'public',
    isActive: true,
    createdAt: new Date('2024-12-01'),
    lastActivityAt: new Date('2025-12-18'),
    isPinned: true,
    isMuted: false,
  },
];

/**
 * All mock user groups
 */
export const allMockUserGroups = {
  ana: mockGroupsAna,
  carlos: mockGroupsCarlos,
  maria: mockGroupsMaria,
};
