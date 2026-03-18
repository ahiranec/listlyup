/**
 * Mock User Listings
 * Listings específicos para cada usuario de testing
 */

import type { Product } from './products';

/**
 * LISTINGS DE ANA GARCÍA (3 total)
 * - Plan Free: listings básicos, públicos
 * - 1 paused
 */
export const mockListingsAna: Product[] = [
  {
    id: 'product-ana-1',
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800',
    title: 'Lámpara de Escritorio',
    price: '25 USD',
    condition: 'Like New',
    visibility: 'public',
    location: 'Santiago',
    type: 'sale',
    createdAt: '2026-01-15T10:00:00Z',
    rating: 4.2,
    ownerId: 'user-ana-google',
    contactModes: ['chat'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: 'Lámpara de escritorio LED, regulable. Perfecta para estudiar. Casi sin uso.',
    // 💬 Messages (1 unread) - PUBLIC QUESTION
    hasUnreadMessages: true,
    messageType: 'question',
    lastMessagePreview: '¿Está disponible aún?',
    lastMessageFrom: 'Pedro López',
    lastMessageAt: '3h ago',
  },
  {
    id: 'product-ana-2',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800',
    title: 'Libros Universitarios',
    condition: 'Used',
    visibility: 'public',
    location: 'Santiago',
    type: 'free',
    createdAt: '2026-01-10T14:00:00Z',
    rating: 4.2,
    ownerId: 'user-ana-google',
    contactModes: ['chat'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products (free items - pickup only)
    description: 'Libros de diseño gráfico. Gratis para estudiantes. Pickup en Providencia.',
    // ⏰ Expiring (5 days left)
    daysUntilExpiration: 5,
    expiresAt: '2026-01-25T14:00:00Z',
  },
  // PAUSED
  {
    id: 'product-ana-paused',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
    title: 'Escritorio Minimalista',
    price: '120 USD',
    condition: 'Like New',
    visibility: 'public',
    location: 'Santiago',
    type: 'sale',
    createdAt: '2026-01-05T10:00:00Z',
    rating: 4.2,
    ownerId: 'user-ana-google',
    contactModes: ['chat'],
    deliveryModes: ['pickup'],
    description: 'Escritorio minimalista de madera. Pausado temporalmente mientras reorganizo mi hogar.',
    // ✅ Lifecycle status
    status: 'paused',
    pausedAt: '2026-01-23T10:00:00Z',
    pausedReason: 'unavailable',
    pausedDaysAgo: 5,
  },
];

/**
 * LISTINGS DE CARLOS MENDOZA (5 total)
 * - Plan Plus: features avanzadas, organization
 * - 1 draft
 */
export const mockListingsCarlos: Product[] = [
  {
    id: 'product-carlos-1',
    image: 'https://images.unsplash.com/photo-1592286927505-d0642a7ae2eb?w=800',
    title: 'iPhone 14 Pro',
    price: '850 USD',
    condition: 'Like New',
    visibility: 'public',
    location: 'Viña del Mar',
    type: 'sale',
    createdAt: '2026-01-12T10:00:00Z',
    rating: 4.8,
    ownerId: 'user-carlos-apple',
    contactModes: ['whatsapp', 'phone'], // ✅ P2 FIX: WhatsApp + Phone test case (no chat)
    phoneNumber: '+56987654321',
    deliveryModes: ['pickup', 'meetup', 'shipping'], // ✅ P2 FIX: Added delivery modes
    description: '256GB, Deep Purple. Impecable, con caja y todos los accesorios. Garantía TechStore 6 meses.',
    // 💬 Messages (2 unread) - PRIVATE CHAT
    hasUnreadMessages: true,
    messageType: 'chat',
    lastMessagePreview: '¿Aceptas $800?',
    lastMessageFrom: 'Ana Rodríguez',
    lastMessageAt: '1h ago',
  },
  {
    id: 'product-carlos-2',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    title: 'MacBook Air M2',
    price: '1200 USD',
    condition: 'New',
    visibility: 'group',
    location: 'Viña del Mar',
    type: 'sale',
    createdAt: '2026-01-14T10:00:00Z',
    rating: 4.8,
    groupIds: ['group-tech-traders'],
    ownerId: 'user-carlos-apple',
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: 'Nuevo en caja sellada. 8GB RAM, 256GB SSD. Precio especial para el grupo.',
    // ⏰ Expiring (2 days - URGENT)
    daysUntilExpiration: 2,
    expiresAt: '2026-01-22T10:00:00Z',
  },
  {
    id: 'product-carlos-3',
    image: 'https://images.unsplash.com/photo-1495121553079-4c61bcce1894?w=800',
    title: 'Cámara Vintage Olympus',
    condition: 'Used',
    visibility: 'group',
    location: 'Viña del Mar',
    type: 'trade',
    createdAt: '2026-01-09T10:00:00Z',
    rating: 4.8,
    groupIds: ['group2'],
    ownerId: 'user-carlos-apple',
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: 'Olympus OM-1. Excelente estado. Busco intercambiar por lente vintage o cámara digital.',
    // ⏰ Expiring (6 days)
    daysUntilExpiration: 6,
    expiresAt: '2026-01-26T10:00:00Z',
  },
  {
    id: 'product-carlos-4',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    title: 'Reparación iPhone - Servicio',
    price: '30 USD',
    visibility: 'public',
    location: 'Viña del Mar',
    type: 'service',
    createdAt: '2026-01-10T10:00:00Z',
    rating: 4.8,
    ownerId: 'user-carlos-apple',
    contactModes: ['chat', 'whatsapp', 'phone'],
    phoneNumber: '+56987654321',
    description: 'Reparación de pantallas, baterías y más. TechStore - servicio profesional con garantía.',
    pricingModel: 'fixed',
    businessHours: 'Monday to Saturday 10:00 AM - 7:00 PM',
  },
  // DRAFT
  {
    id: 'product-carlos-draft',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
    title: 'Samsung Galaxy S23',
    price: '650 USD',
    condition: 'Like New',
    visibility: 'public',
    location: 'Viña del Mar',
    type: 'sale',
    createdAt: '2026-01-19T10:00:00Z',
    rating: 4.8,
    ownerId: 'user-carlos-apple',
    contactModes: ['whatsapp'], // ✅ P2 FIX: WhatsApp only to test Contact-CTA contract
    phoneNumber: '+56987654321',
    deliveryModes: ['pickup', 'shipping'], // ✅ P2 FIX: Added delivery modes
    description: 'DRAFT - 128GB, Phantom Black. Aún configurando...',
  },
  // PAUSED
  {
    id: 'product-carlos-paused',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
    title: 'Reparación Mac - Servicio Premium',
    price: '50 USD',
    visibility: 'public',
    location: 'Viña del Mar',
    type: 'service',
    createdAt: '2026-01-08T10:00:00Z',
    rating: 4.8,
    ownerId: 'user-carlos-apple',
    contactModes: ['whatsapp', 'phone'],
    phoneNumber: '+56987654321',
    description: 'Servicio premium de reparación Mac. Pausado temporalmente por actualización de equipos.',
    pricingModel: 'fixed',
    businessHours: 'Monday to Saturday 10:00 AM - 7:00 PM',
    // ✅ Lifecycle status
    status: 'paused',
    pausedAt: '2026-01-20T10:00:00Z',
    pausedReason: 'update',
    pausedDaysAgo: 8,
  },
];

/**
 * LISTINGS DE MARÍA LÓPEZ (7 total)
 * - Plan Pro: features premium, analytics
 * - 1 paused, 1 pending
 */
export const mockListingsMaria: Product[] = [
  {
    id: 'product-maria-1',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    title: 'Clases de Yoga',
    price: '15 USD',
    visibility: 'public',
    location: 'Concón',
    type: 'service',
    createdAt: '2026-01-05T10:00:00Z',
    rating: 4.9,
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'whatsapp', 'email'],
    description: 'Clases personalizadas de Hatha y Vinyasa Yoga. Todos los niveles bienvenidos.',
    pricingModel: 'hourly',
    businessHours: 'Tuesday to Saturday 6:00 AM - 8:00 PM',
  },
  {
    id: 'product-maria-2',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    title: 'Cartera Diseñador',
    price: '120 USD',
    condition: 'Like New',
    visibility: 'group',
    location: 'Concón',
    type: 'trade',
    createdAt: '2026-01-07T10:00:00Z',
    rating: 4.9,
    groupIds: ['group2'],
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: 'Cartera de diseñador italiana. Casi nueva. Acepto intercambios por accesorios de fotografía.',
    // 💬 Messages (3 unread) - PRIVATE CHAT
    hasUnreadMessages: true,
    messageType: 'chat',
    lastMessagePreview: '¿Aceptas $100?',
    lastMessageFrom: 'Pablo Ruiz',
    lastMessageAt: '2h ago',
  },
  {
    id: 'product-maria-3',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    title: 'Canon EOS R5',
    price: '2800 USD',
    condition: 'Like New',
    visibility: 'group',
    location: 'Concón',
    type: 'sale',
    createdAt: '2026-01-11T10:00:00Z',
    rating: 4.9,
    groupIds: ['group-photography'],
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: 'Cámara profesional con menos de 5000 disparos. Incluye 3 baterías y SD card 64GB.',
    // 💬 Messages (1 read)
    hasUnreadMessages: false,
    lastMessagePreview: '¿Incluye accesorios?',
    lastMessageFrom: 'Sofía Martínez',
    lastMessageAt: '1d ago',
  },
  {
    id: 'product-maria-4',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
    title: 'Arriendo Departamento',
    price: '800 USD',
    visibility: 'public',
    location: 'Reñaca',
    type: 'service',
    createdAt: '2026-01-12T10:00:00Z',
    rating: 4.9,
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'whatsapp', 'email'],
    description: 'Depto 2D/2B frente al mar. Vista espectacular. Disponible desde enero.',
    pricingModel: 'monthly',
    // ⏰ Expiring (4 days)
    daysUntilExpiration: 4,
    expiresAt: '2026-01-24T10:00:00Z',
  },
  {
    id: 'product-maria-5',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800',
    title: 'Workshop Fotografía',
    price: '45 USD',
    visibility: 'public',
    location: 'Concón',
    type: 'event',
    eventDate: '2025-01-25',
    eventTime: '14:00',
    eventTimeEnd: '18:00',
    createdAt: '2026-01-10T10:00:00Z',
    rating: 4.9,
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'email'],
    description: 'Workshop de fotografía de paisajes. Incluye salida práctica y edición. 25 de enero 14:00.',
    ticketType: 'paid',
    duration: 'single',
    // 🛡️ REPORTED (spam - duplicate)
    isReported: true,
    reportReason: 'Spam - duplicate posting',
    reportDetails: 'Este workshop parece duplicado de otro evento publicado la semana pasada en el mismo grupo.',
    reportedBy: 'Juan Pérez',
    reportedAt: '1d ago',
  },
  // PAUSED
  {
    id: 'product-maria-paused',
    image: 'https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800',
    title: 'Sesiones Fotográficas',
    price: '80 USD',
    visibility: 'public',
    location: 'Concón',
    type: 'service',
    createdAt: '2026-01-11T10:00:00Z',
    rating: 4.9,
    ownerId: 'user-maria-email',
    contactModes: ['chat', 'whatsapp'],
    description: 'Sesiones de fotos profesionales. Temporalmente pausado por vacaciones.',
    pricingModel: 'session',
    businessHours: 'Monday to Friday 9:00 AM - 7:00 PM',
    // ✅ Lifecycle status
    status: 'paused',
    pausedAt: '2026-01-22T10:00:00Z',
    pausedReason: 'unavailable',
    pausedDaysAgo: 6,
  },
  // PENDING
  {
    id: 'product-maria-pending',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    title: 'Tour Gastronómico',
    price: '35 USD',
    visibility: 'group',
    location: 'Valparaíso',
    type: 'event',
    eventDate: '2025-02-15T11:00:00Z',
    createdAt: '2026-01-20T10:00:00Z',
    rating: 4.9,
    groupIds: ['group3'],
    ownerId: 'user-maria-email',
    contactModes: ['chat'],
    description: 'PENDING - Tour por restaurantes de Valparaíso. Esperando aprobación del grupo.',
    ticketType: 'paid',
    duration: 'single',
  },
];

/**
 * All mock user listings
 */
export const allMockUserListings = {
  ana: mockListingsAna,
  carlos: mockListingsCarlos,
  maria: mockListingsMaria,
};

/**
 * Combine all listings
 */
export const allUserListings: Product[] = [
  ...mockListingsAna,
  ...mockListingsCarlos,
  ...mockListingsMaria,
];