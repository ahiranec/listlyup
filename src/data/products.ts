export interface Product {
  id: string;
  image: string;
  title: string;
  price?: string;
  condition?: "New" | "Used" | "Like New";
  visibility: "public" | "group" | "private"; // Normalizado a lowercase
  location?: string;
  type: "service" | "sale" | "trade" | "free" | "sale_or_trade" | "rent" | "event";
  createdAt?: string;
  rating?: number;
  groupIds?: string[]; // IDs de grupos donde este producto está compartido (solo si visibility === "group")
  ownerId?: string; // ID del dueño del producto
  contactModes?: ('chat' | 'phone' | 'whatsapp' | 'email')[]; // Métodos de contacto preferidos del vendedor
  phoneNumber?: string; // Requerido si contactModes incluye 'phone'
  deliveryModes?: ('pickup' | 'meetup' | 'delivery' | 'shipping' | 'virtual')[]; // Métodos de entrega disponibles
  description?: string; // Descripción del producto
  // Event-specific fields
  eventDate?: string; // Fecha inicio del evento (solo para type === "event") - formato: "2025-12-17"
  eventEndDate?: string; // Fecha término del evento (solo si duration === 'multi') - formato: "2025-12-20"
  eventTime?: string; // Hora inicio del evento - formato: "09:00"
  eventTimeEnd?: string; // Hora término del evento - formato: "16:00"
  eventTimeAppliesToAllDays?: boolean; // Si el horario aplica a todos los días del evento multi-day
  // Additional metadata for card badges
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly'; // For services and rentals
  ticketType?: 'free' | 'paid'; // For events
  duration?: 'single' | 'multi'; // For events (single day vs multi-day)
  // Search and categorization fields
  tags?: string[];
  category?: string;
  subcategory?: string;
  // Service-specific fields
  businessHours?: string; // e.g., "Monday to Friday 8:30 AM - 6:00 PM"
  // Lifecycle status
  status?: 'active' | 'paused' | 'draft' | 'pending' | 'rejected' | 'archived';
  pausedAt?: string; // ISO timestamp when listing was paused
  pausedReason?: 'sold' | 'unavailable' | 'update' | 'other';
  pausedDaysAgo?: number; // Days since paused (for display)
  // My Listings - Messages state
  hasUnreadMessages?: boolean;
  messageType?: 'chat' | 'question'; // Type of unread message: private chat or public question
  lastMessagePreview?: string;
  lastMessageFrom?: string;
  lastMessageAt?: string;
  // My Listings - Reported state
  isReported?: boolean;
  reportReason?: string;
  reportDetails?: string;
  reportedBy?: string;
  reportedAt?: string;
  // My Listings - Expiring state
  daysUntilExpiration?: number;
  expiresAt?: string;
}

// Import user listings
import { allUserListings } from './mockUserListings';

/**
 * @deprecated LEGACY FORMAT - For authoring only
 * DO NOT CONSUME DIRECTLY IN UI
 * Use canonicalListings (default export) instead
 */
export const mockProducts: Product[] = [
  // User listings from Ana, Carlos, María
  ...allUserListings,
  
  // Existing products
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1759668358660-0d06064f0f84?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBkZXNrJTIwbGFtcHxlbnwxfHx8fDE3NjI5NjkwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Modern Desk Lamp",
    price: "7 USD",
    condition: "New",
    visibility: "public",
    location: "Puchuncaví",
    type: "sale",
    createdAt: "2026-01-05T10:00:00Z",
    rating: 4.5,
    ownerId: "user456", // Otro usuario
    contactModes: ['chat', 'whatsapp'], // Acepta ambos
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "A modern desk lamp with adjustable brightness and a sleek design.",
    tags: ["desk lamp", "modern", "adjustable"],
    category: "home",
    subcategory: "lighting",
  },
  // ==================== NEW: Productos para "Vecinos Valparaíso" (group id: "1") ====================
  {
    id: "1a",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800",
    title: "Bicicleta de Paseo - Usada",
    price: "45 USD",
    condition: "Used",
    visibility: "group",
    location: "Valparaíso - Cerro Alegre",
    type: "sale",
    createdAt: "2026-01-18T10:30:00Z",
    rating: 4.3,
    groupIds: ["1"], // Vecinos Valparaíso
    ownerId: "user456",
    contactModes: ['whatsapp', 'chat'],
    phoneNumber: "+56987654321",
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "Bicicleta de paseo en buen estado, ideal para recorrer el plan. Incluye canasta delantera y luz LED.",
    tags: ["bicicleta", "paseo", "valparaíso"],
    category: "sports",
    subcategory: "bikes",
  },
  {
    id: "1b",
    image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800",
    title: "Mesa de Comedor - 6 personas",
    price: "80 USD",
    condition: "Like New",
    visibility: "group",
    location: "Valparaíso - Cerro Concepción",
    type: "sale_or_trade",
    createdAt: "2026-01-17T15:00:00Z",
    rating: 4.6,
    groupIds: ["1"], // Vecinos Valparaíso
    ownerId: "user789",
    contactModes: ['chat', 'phone'],
    phoneNumber: "+56923456789",
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products (furniture - pickup only)
    description: "Mesa de madera maciza para 6 personas. Perfecta para comedores o cocinas grandes. Me mudo y no puedo llevarla.",
    tags: ["mesa", "comedor", "madera"],
    category: "home",
    subcategory: "furniture",
  },
  {
    id: "1c",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=800",
    title: "Plantas de Interior - Paquete",
    price: "12 USD",
    condition: "New",
    visibility: "group",
    location: "Valparaíso - Plaza Victoria",
    type: "sale",
    createdAt: "2026-01-16T09:00:00Z",
    rating: 4.8,
    groupIds: ["1"], // Vecinos Valparaíso
    ownerId: "user555",
    contactModes: ['whatsapp'],
    phoneNumber: "+56934567890",
    deliveryModes: ['pickup', 'meetup'], // ✅ P2 FIX: Added delivery modes for realistic product
    description: "Paquete de 4 plantas de interior: pothos, suculentas y cactus. Incluye macetas decorativas. Perfectas para departamentos.",
    tags: ["plantas", "interior", "decoración"],
    category: "home",
    subcategory: "plants",
  },
  // ==================== END: New products ====================
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1495121553079-4c61bcce1894?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwY2FtZXJhfGVufDF8fHx8MTc2Mjk0NDI1NHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Vintage Camera",
    condition: "Used",
    visibility: "group",
    location: "Valparaíso",
    type: "trade",
    createdAt: "2026-01-06T14:30:00Z",
    rating: 4.8,
    groupIds: ["2"], // Tech Lovers Chile (formerly "group2")
    ownerId: "user456", // Otro usuario
    contactModes: ['whatsapp', 'phone'], // Solo externos
    phoneNumber: "+56912345678",
    deliveryModes: ['pickup', 'shipping'], // ✅ P2 FIX: Added delivery modes for WhatsApp+Phone scenario
    description: "A vintage camera with a classic design and excellent condition.",
    tags: ["vintage camera", "classic design"],
    category: "electronics",
    subcategory: "cameras",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGhlYWRwaG9uZXN8ZW58MXx8fHwxNzYyOTQzNDM1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Wireless Headphones",
    price: "45 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale_or_trade",
    createdAt: "2026-01-07T09:15:00Z",
    rating: 4.2,
    ownerId: "user789", // Otro usuario
    contactModes: ['chat'], // Solo chat interno
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Wireless headphones with excellent sound quality and comfort.",
    tags: ["wireless headphones", "sound quality"],
    category: "electronics",
    subcategory: "headphones",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1608354580875-30bd4168b351?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBtYWtlciUyMG1hY2hpbmV8ZW58MXx8fHwxNzYyODcwNDE5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Coffee Maker",
    price: "25 USD",
    condition: "Like New",
    visibility: "group",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-19T10:00:00Z", // Updated: Newest (position 1)
    rating: 4.2,
    groupIds: ["3"], // Local Community V Region (formerly "group3")
    ownerId: "user789", // Otro usuario
    contactModes: ['chat', 'whatsapp'], // Acepta ambos
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "A coffee maker with a modern design and efficient brewing.",
    tags: ["coffee maker", "modern design"],
    category: "home",
    subcategory: "kitchen appliances",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1724047314116-de588bcd8c8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaWN5Y2xlJTIwYmlrZXxlbnwxfHx8fDE3NjI4NzE4MTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mountain Bike",
    condition: "Like New",
    visibility: "group",
    location: "Viña del Mar",
    type: "trade",
    createdAt: "2026-01-16T07:00:00Z", // Updated: Fourth newest (position 4)
    rating: 4.7,
    groupIds: ["3"], // Local Community V Region (formerly "group3")
    ownerId: "user456", // Otro usuario
    contactModes: ['whatsapp'], // Solo WhatsApp
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products (bike - pickup only)
    description: "A mountain bike in excellent condition, perfect for outdoor adventures.",
    tags: ["mountain bike", "outdoor adventures"],
    category: "sports",
    subcategory: "bikes",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1741061963569-9d0ef54d10d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydHBob25lJTIwbW9iaWxlJTIwcGhvbmV8ZW58MXx8fHwxNzYyOTMyNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Smartphone",
    price: "150 USD",
    condition: "New",
    visibility: "group",
    location: "Quilpué",
    type: "sale",
    createdAt: "2026-01-02T08:00:00Z",
    rating: 4.6,
    groupIds: ["1"], // Tech Enthusiasts Chile
    ownerId: "user789", // Otro usuario
    contactModes: ['chat', 'phone', 'whatsapp'], // Acepta todos
    phoneNumber: "+56987654321",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "A new smartphone with the latest technology and features.",
    tags: ["smartphone", "latest technology"],
    category: "electronics",
    subcategory: "mobile phones",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1520045892732-304bc3ac5d8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2F0ZWJvYXJkfGVufDF8fHx8MTc2MjkwMzA5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Skateboard",
    price: "30 USD",
    condition: "Like New",
    visibility: "public",
    location: "Concón",
    type: "sale_or_trade",
    createdAt: "2026-01-04T13:30:00Z",
    rating: 4.3,
    ownerId: "user999", // Otro usuario
    contactModes: ['phone'], // Solo teléfono
    phoneNumber: "+56923456789",
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "A skateboard in excellent condition, perfect for street riding.",
    tags: ["skateboard", "street riding"],
    category: "sports",
    subcategory: "skateboards",
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1673505705687-dffbfd02b613?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWNrcGFjayUyMHRyYXZlbCUyMGJhZ3xlbnwxfHx8fDE3NjI5MzgxMDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Backpack",
    price: "12 USD",
    condition: "Used",
    visibility: "public",
    location: "Zapallar",
    type: "sale",
    createdAt: "2026-01-01T15:10:00Z",
    rating: 4.0,
    ownerId: "user555", // Otro usuario
    contactModes: ['chat'], // Solo chat interno
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "A backpack with multiple compartments and a comfortable design.",
    tags: ["backpack", "multiple compartments"],
    category: "accessories",
    subcategory: "bags",
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpYyUyMGd1aXRhcnxlbnwxfHx8fDE3NjI5NjkwOTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Electric Guitar",
    price: "200 USD",
    condition: "Used",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-08T12:00:00Z",
    rating: 4.9,
    ownerId: "user888", // Otro usuario
    contactModes: ['whatsapp', 'chat'], // Ambos
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "An electric guitar in excellent condition, perfect for musicians.",
    tags: ["electric guitar", "musicians"],
    category: "music",
    subcategory: "guitars",
  },
  {
    id: "10",
    image: "https://images.unsplash.com/photo-1675528030415-dc82908eeb73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjaGFpciUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NjI5NjkwOTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Wooden Chair",
    price: "35 USD",
    condition: "Like New",
    visibility: "group",
    location: "Viña del Mar",
    type: "sale_or_trade",
    createdAt: "2026-01-17T08:00:00Z", // Updated: Third newest (position 3)
    rating: 4.4,
    groupIds: ["1", "2"], // Tech Enthusiasts Chile, Vintage Marketplace
    ownerId: "user777", // Otro usuario
    contactModes: ['chat', 'whatsapp', 'phone'], // Todos
    phoneNumber: "+56934567890",
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "A wooden chair with a classic design and excellent comfort.",
    tags: ["wooden chair", "classic design"],
    category: "home",
    subcategory: "furniture",
  },
  {
    id: "11",
    image: "https://images.unsplash.com/photo-1619253341026-74c609e6ce50?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydW5uaW5nJTIwc2hvZXMlMjBzbmVha2Vyc3xlbnwxfHx8fDE3NjI5NDUxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Running Shoes",
    price: "60 USD",
    condition: "New",
    visibility: "public",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-18T09:00:00Z", // Updated: Second newest (position 2)
    rating: 4.7,
    ownerId: "user666", // Otro usuario
    contactModes: ['chat'], // Solo chat
    deliveryModes: ['pickup'], // ✅ P2 FIX: Added delivery mode
    description: "New running shoes with excellent cushioning and support.",
    tags: ["running shoes", "cushioning"],
    category: "sports",
    subcategory: "shoes",
  },
  {
    id: "12",
    image: "https://images.unsplash.com/photo-1676487093282-f6a47e02848f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBib29rc3xlbnwxfHx8fDE3NjI5NjQ3MDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Bookshelf",
    condition: "Used",
    visibility: "public",
    location: "Quilpué",
    type: "free",
    createdAt: "2026-01-03T09:00:00Z",
    rating: 4.1,
    ownerId: "user444", // Otro usuario
    contactModes: ['whatsapp'], // Solo WhatsApp para items free
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products (free items - pickup only)
    description: "A bookshelf with multiple shelves and a sturdy design.",
    tags: ["bookshelf", "sturdy design"],
    category: "home",
    subcategory: "storage",
  },
  // ==================== SERVICES ====================
  {
    id: "13",
    image: "https://images.unsplash.com/photo-1726931535180-d27a2ffd7474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbHVtYmVyJTIwZml4aW5nJTIwcGlwZXxlbnwxfHx8fDE3NjU0NjQyOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Professional Plumbing",
    price: "25 USD",
    visibility: "public",
    location: "Valparaíso",
    type: "service",
    createdAt: "2026-01-10T08:00:00Z",
    rating: 4.8,
    ownerId: "user999", // Otro usuario
    contactModes: ['whatsapp', 'phone'], // Servicios profesionales prefieren contacto directo
    phoneNumber: "+56987654321",
    description: "Professional plumbing services: pipe repair, sanitary fixture installation, drain unclogging, 24/7 emergencies. 15 years of experience in the field.",
    pricingModel: 'fixed',
    businessHours: "Monday to Friday 8:30 AM - 6:00 PM",
    tags: ["plumbing", "pipe repair"],
    category: "services",
    subcategory: "home maintenance",
  },
  {
    id: "14",
    image: "https://images.unsplash.com/photo-1704455306251-b4634215d98f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50aXN0JTIwZGVudGFsJTIwb2ZmaWNlfGVufDF8fHx8MTc2NTUzODMzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "General Dentistry",
    price: "40 USD",
    visibility: "public",
    location: "Viña del Mar",
    type: "service",
    createdAt: "2026-01-12T10:00:00Z",
    rating: 4.9,
    ownerId: "user1000", // Otro usuario
    contactModes: ['phone', 'whatsapp', 'chat'], // Todos los métodos
    phoneNumber: "+56923456789",
    description: "Comprehensive dental care: dental cleaning, cavity treatment, orthodontics, whitening, and more. First consultation with discount. By appointment from Monday to Saturday.",
    pricingModel: 'fixed',
    businessHours: "Monday to Saturday 9:00 AM - 6:00 PM",
    tags: ["dentistry", "dental cleaning"],
    category: "services",
    subcategory: "healthcare",
  },
  // ==================== RENTALS ====================
  {
    id: "15",
    image: "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800",
    title: "Surfboard Rental - El Abanico",
    price: "15 USD",
    condition: "Like New",
    visibility: "public",
    location: "Maitencillo",
    type: "service",
    createdAt: "2026-01-15T09:00:00Z",
    rating: 4.9,
    ownerId: "user1001", // Otro usuario
    contactModes: ['whatsapp', 'phone'], // Contacto directo para alquileres
    phoneNumber: "+56945678901",
    description: "High-quality surfboard rentals in Maitencillo, El Abanico sector. Boards for all levels: beginners, intermediate and advanced. Includes wetsuit and leash. Hours: 8:00 AM - 6:00 PM every day. Discounts for multiple days.",
    pricingModel: 'daily',
    businessHours: "Every day 8:00 AM - 6:00 PM",
    tags: ["surfboard rental", "high-quality"],
    category: "rentals",
    subcategory: "water sports",
  },
  // ==================== EVENTS ====================
  {
    id: "16",
    image: "https://images.unsplash.com/photo-1633207634866-f737efc72c91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGVhJTIwbWFya2V0JTIwb3V0ZG9vciUyMHZlbmRvcnN8ZW58MXx8fHwxNzY1NTg0NTA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Laguna Flea Market",
    price: "Free",
    eventDate: "2025-12-17",
    eventEndDate: "2025-12-20",
    eventTime: "09:00",
    eventTimeEnd: "16:00",
    eventTimeAppliesToAllDays: true,
    visibility: "public",
    location: "Laguna Verde",
    type: "event",
    createdAt: "2026-01-16T06:00:00Z",
    rating: 4.7,
    ownerId: "user1003", // Otro usuario
    contactModes: ['whatsapp', 'chat'], // Contacto para info del evento
    phoneNumber: "+56967890123",
    description: "Flea market every Sunday in Laguna Verde. Find antiques, vintage clothing, local crafts, used books, restored furniture and much more. Over 50 vendors each week. Hours: 9:00 AM - 4:00 PM. Free entry. Parking available. Family-friendly atmosphere. Food trucks and live music. Don't miss it!",
    ticketType: 'free',
    duration: 'multi',
    tags: ["flea market", "antiques"],
    category: "events",
    subcategory: "community events",
  },
  
  // ==================== PRODUCTOS PRIVADOS (NO ACCESIBLES) - 7 productos ====================
  // Productos de grupos a los que el usuario NO pertenece (group4, group5, group6, group7)
  // Estos aparecerán como PINS GRISES en el mapa
  
  {
    id: "17",
    image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZGVjb3J8ZW58MXx8fHwxNzYyOTQ1MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Ceramic Vase Set",
    price: "40 USD",
    condition: "New",
    visibility: "group",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-10T10:00:00Z",
    rating: 4.5,
    groupIds: ["4"], // Private Design Collective
    ownerId: "user888",
    contactModes: ['chat'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "Handmade ceramic vase set, exclusive to group members.",
    tags: ["ceramic vase set", "handmade"],
    category: "home",
    subcategory: "decor",
  },
  {
    id: "18",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWF0aGVyJTIwamFja2V0fGVufDF8fHx8MTc2Mjk0NTE5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Leather Jacket",
    price: "120 USD",
    condition: "Like New",
    visibility: "group",
    location: "Viña del Mar",
    type: "sale_or_trade",
    createdAt: "2026-01-12T14:30:00Z",
    rating: 4.8,
    groupIds: ["5"], // Fashion Insiders
    ownerId: "user777",
    contactModes: ['whatsapp'],
    phoneNumber: "+56923456789",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Premium leather jacket, available only to group members.",
    tags: ["leather jacket", "premium"],
    category: "fashion",
    subcategory: "jackets",
  },
  {
    id: "19",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmVjb3JkfGVufDF8fHx8MTc2Mjk0NTE5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Vinyl Record Collection",
    condition: "Used",
    visibility: "group",
    location: "Quilpué",
    type: "trade",
    createdAt: "2026-01-13T11:00:00Z",
    rating: 4.6,
    groupIds: ["6"], // Music Collectors Club
    ownerId: "user666",
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products
    description: "Rare vinyl collection for trade within group.",
    tags: ["vinyl record collection", "rare"],
    category: "music",
    subcategory: "vinyl records",
  },
  {
    id: "20",
    image: "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBzdXBwbGllc3xlbnwxfHx8fDE3NjI5NDUxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Art Supplies Bundle",
    price: "65 USD",
    condition: "Like New",
    visibility: "group",
    location: "Concón",
    type: "sale",
    createdAt: "2026-01-14T09:30:00Z",
    rating: 4.3,
    groupIds: ["7"], // Artists Network
    ownerId: "user555",
    contactModes: ['phone'],
    phoneNumber: "+56934567890",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Professional art supplies for group members only.",
    tags: ["art supplies bundle", "professional"],
    category: "art",
    subcategory: "supplies",
  },
  {
    id: "21",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRjaCUyMGx1eHVyeXxlbnwxfHx8fDE3NjI5NDUxOTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Designer Watch",
    price: "200 USD",
    condition: "New",
    visibility: "group",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-15T16:00:00Z",
    rating: 4.9,
    groupIds: ["4"], // Private Design Collective
    ownerId: "user444",
    contactModes: ['chat', 'phone'],
    phoneNumber: "+56945678901",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Luxury designer watch for exclusive group.",
    tags: ["designer watch", "luxury"],
    category: "fashion",
    subcategory: "watches",
  },
  {
    id: "22",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwZ3ltJTIwZXF1aXBtZW50fGVufDF8fHx8MTc2Mjk0NTE5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Home Gym Equipment",
    condition: "Used",
    visibility: "group",
    location: "Viña del Mar",
    type: "trade",
    createdAt: "2026-01-16T12:00:00Z",
    rating: 4.4,
    groupIds: ["5"], // Fashion Insiders (also fitness)
    ownerId: "user333",
    contactModes: ['whatsapp'],
    phoneNumber: "+56956789012",
    deliveryModes: ['pickup'], // ✅ VALIDATION: Required for products (gym equipment - pickup only)
    description: "Complete home gym setup for group trade.",
    tags: ["home gym equipment", "complete setup"],
    category: "fitness",
    subcategory: "gym equipment",
  },
  {
    id: "23",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGpld2Vscnl8ZW58MXx8fHwxNzYyOTQ1MTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Handmade Jewelry Set",
    price: "85 USD",
    condition: "New",
    visibility: "group",
    location: "Puchuncaví",
    type: "sale_or_trade",
    createdAt: "2026-01-11T13:30:00Z",
    rating: 4.7,
    groupIds: ["6"], // Music Collectors Club (also artisans)
    ownerId: "user222",
    contactModes: ['chat', 'whatsapp', 'phone'],
    phoneNumber: "+56967890123",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Artisan jewelry collection, exclusive to group.",
    tags: ["handmade jewelry set", "artisan"],
    category: "art",
    subcategory: "jewelry",
  },
  // ==================== PHASE 2.2: Products for Chat + Event Hub "View" functionality ====================
  {
    id: "24",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    title: "MacBook Pro 14\" M2 - Like New",
    price: "1899 USD",
    condition: "Like New",
    visibility: "public",
    location: "Santiago",
    type: "sale",
    createdAt: "2026-01-14T10:00:00Z",
    rating: 4.9,
    ownerId: "user456",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56912345678",
    deliveryModes: ['pickup', 'meetup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "MacBook Pro 14\" with M2 chip, 16GB RAM, 512GB SSD. Like new condition, barely used. Includes original box and charger.",
    tags: ["macbook", "laptop", "m2", "apple"],
    category: "electronics",
    subcategory: "computers",
  },
  {
    id: "25",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800",
    title: "Canon EOS R6 + 24-105mm Lens",
    price: "2400 USD",
    condition: "Like New",
    visibility: "public",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-13T14:30:00Z",
    rating: 4.8,
    ownerId: "user789",
    contactModes: ['chat', 'phone'],
    phoneNumber: "+56923456789",
    deliveryModes: ['pickup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "Canon EOS R6 mirrorless camera with RF 24-105mm f/4-7.1 IS STM lens. Excellent condition, low shutter count. Perfect for both photo and video.",
    tags: ["canon", "camera", "photography", "mirrorless"],
    category: "electronics",
    subcategory: "cameras",
  },
  {
    id: "26",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    title: "iPad Pro 11\"",
    price: "650 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-12T11:00:00Z",
    rating: 4.7,
    ownerId: "user555",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56934567890",
    deliveryModes: ['pickup', 'meetup', 'shipping'], // ✅ VALIDATION: Required for products
    description: "iPad Pro 11\" with M1 chip, 128GB. Includes Apple Pencil (2nd gen) and Magic Keyboard. Perfect for students and professionals.",
    tags: ["ipad", "tablet", "apple", "m1"],
    category: "electronics",
    subcategory: "tablets",
  },
  // ==================== END: Phase 2.2 Products ====================
  
  // ==================== PHASE 3.4b: Action Center Campaign/Event Request Products ====================
  // Products for Campaign Owner Requests (View Details buttons)
  {
    id: "cr-1",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800",
    title: "iPad Pro 11\"",
    price: "699 USD",
    condition: "Like New",
    visibility: "public",
    location: "Santiago",
    type: "sale",
    createdAt: "2026-01-20T10:00:00Z",
    rating: 4.8,
    ownerId: "user456",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56912345678",
    deliveryModes: ['pickup', 'shipping'],
    description: "iPad Pro 11\" in excellent condition. Includes original charger and case.",
    tags: ["ipad", "tablet", "apple"],
    category: "electronics",
    subcategory: "tablets",
  },
  {
    id: "cr-2",
    image: "https://images.unsplash.com/photo-1625082994248-09347a0fdade?w=800",
    title: "AirPods Max",
    price: "449 USD",
    condition: "New",
    visibility: "public",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-20T11:00:00Z",
    rating: 4.9,
    ownerId: "user789",
    contactModes: ['chat', 'phone'],
    phoneNumber: "+56923456789",
    deliveryModes: ['pickup', 'shipping'],
    description: "Brand new AirPods Max with Active Noise Cancellation. Sealed in box.",
    tags: ["airpods", "headphones", "apple"],
    category: "electronics",
    subcategory: "headphones",
  },
  
  // Products for Event Hub Owner Requests (View Details buttons)
  {
    id: "er-1",
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800",
    title: "DJ Equipment Set",
    price: "850 USD",
    condition: "Like New",
    visibility: "public",
    location: "Santiago",
    type: "sale",
    createdAt: "2026-01-20T12:00:00Z",
    rating: 4.7,
    ownerId: "user888",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56934567890",
    deliveryModes: ['pickup'],
    description: "Professional DJ equipment set including controller, mixer, and headphones. Perfect for events.",
    tags: ["dj", "equipment", "music", "events"],
    category: "music",
    subcategory: "dj equipment",
  },
  {
    id: "er-2",
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800",
    title: "Yoga Mats",
    price: "35 USD",
    condition: "New",
    visibility: "public",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-20T13:00:00Z",
    rating: 4.6,
    ownerId: "user777",
    contactModes: ['whatsapp'],
    phoneNumber: "+56945678901",
    deliveryModes: ['pickup', 'delivery'],
    description: "Set of 5 high-quality yoga mats. Non-slip, eco-friendly material.",
    tags: ["yoga", "mats", "fitness", "wellness"],
    category: "sports",
    subcategory: "yoga",
  },
  
  // Products for User Event Hub Requests (View Details buttons)
  {
    id: "uer-1",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    title: "Laptop Stand",
    price: "45 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-20T14:00:00Z",
    rating: 4.5,
    ownerId: "user666",
    contactModes: ['chat'],
    deliveryModes: ['pickup', 'shipping'],
    description: "Adjustable aluminum laptop stand. Ergonomic design, improves posture.",
    tags: ["laptop", "stand", "ergonomic", "desk"],
    category: "electronics",
    subcategory: "accessories",
  },
  {
    id: "uer-2",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=800",
    title: "Wireless Headphones",
    price: "89 USD",
    condition: "New",
    visibility: "public",
    location: "Santiago",
    type: "sale",
    createdAt: "2026-01-20T15:00:00Z",
    rating: 4.7,
    ownerId: "user555",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56956789012",
    deliveryModes: ['pickup', 'shipping'],
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    tags: ["headphones", "wireless", "audio", "bluetooth"],
    category: "electronics",
    subcategory: "headphones",
  },
  // ==================== END: Phase 3.4b Products ====================
  
  // ✅ VD-1: Product for Notifications → Listing Lifecycle "sold-reserved"
  {
    id: "headphones-sony-1",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    title: "Headphones Sony",
    price: "200 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-19T10:00:00Z",
    rating: 4.8,
    ownerId: "user123",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56912345678",
    deliveryModes: ['pickup', 'delivery'],
    description: "Sony WH-1000XM4 wireless headphones with premium noise cancellation. Sold to Juan Pérez.",
    tags: ["headphones", "sony", "wireless", "noise cancellation"],
    category: "electronics",
    subcategory: "headphones",
  },
  
  // ✅ VD-1: Products for Action Center → Your Campaign Requests
  {
    id: "ucr-1",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800",
    title: "iPhone 13 Pro",
    price: "750 USD",
    condition: "Like New",
    visibility: "public",
    location: "Santiago",
    type: "sale",
    createdAt: "2026-01-18T14:00:00Z",
    rating: 4.9,
    ownerId: "user123",
    contactModes: ['chat', 'phone'],
    phoneNumber: "+56987654321",
    deliveryModes: ['pickup', 'shipping'],
    description: "iPhone 13 Pro with 128GB storage. In excellent condition with all accessories.",
    tags: ["iphone", "apple", "smartphone"],
    category: "electronics",
    subcategory: "phones",
  },
  {
    id: "ucr-2",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
    title: "MacBook Air M2",
    price: "1200 USD",
    condition: "New",
    visibility: "public",
    location: "Viña del Mar",
    type: "sale",
    createdAt: "2026-01-17T16:00:00Z",
    rating: 5.0,
    ownerId: "user123",
    contactModes: ['chat', 'whatsapp'],
    phoneNumber: "+56912348765",
    deliveryModes: ['pickup', 'delivery'],
    description: "Brand new MacBook Air M2 with 256GB SSD and 8GB RAM. Perfect for work and study.",
    tags: ["macbook", "apple", "laptop", "m2"],
    category: "electronics",
    subcategory: "computers",
  },
  
  // ✅ N-3: Products for Notifications → Sale notifications (data contract fix)
  {
    id: "vintage-lamp-1",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
    title: "Vintage Lamp",
    price: "100 USD",
    condition: "Used",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-20T10:00:00Z",
    rating: 4.5,
    ownerId: "user123",
    contactModes: ['chat'],
    deliveryModes: ['pickup', 'delivery'],
    description: "Beautiful vintage lamp with classic design. Sold to Pedro R.",
    tags: ["lamp", "vintage", "home decor"],
    category: "home",
    subcategory: "lighting",
  },
  {
    id: "mouse-logitech-1",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800",
    title: "Mouse Logitech",
    price: "50 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-20T12:00:00Z",
    rating: 4.7,
    ownerId: "user123",
    contactModes: ['chat', 'whatsapp'],
    deliveryModes: ['pickup', 'shipping'],
    description: "Logitech wireless mouse in excellent condition. Sold to Ana García.",
    tags: ["mouse", "logitech", "wireless", "computer"],
    category: "electronics",
    subcategory: "computer accessories",
  },
  {
    id: "keyboard-mechanical-1",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    title: "Mechanical Keyboard",
    price: "120 USD",
    condition: "Like New",
    visibility: "public",
    location: "Valparaíso",
    type: "sale",
    createdAt: "2026-01-21T08:00:00Z",
    rating: 4.8,
    ownerId: "user123",
    contactModes: ['chat'],
    deliveryModes: ['pickup', 'delivery'],
    description: "Mechanical keyboard with RGB lighting. Sale completed, confirmed by Juan.",
    tags: ["keyboard", "mechanical", "rgb", "gaming"],
    category: "electronics",
    subcategory: "computer accessories",
  },
];

// ============================================================================
// CANONICAL EXPORT
// ============================================================================

import { productsToCanonical } from '../utils/canonicalAdapters';
import type { CanonicalListing } from '../types/canonical';

/**
 * CANONICAL LISTINGS - Primary Export
 * This is the canonical version of all mock products.
 * UI components should consume this instead of mockProducts (legacy).
 */
export const canonicalListings: CanonicalListing[] = productsToCanonical(mockProducts);

/**
 * Default export: Canonical listings
 */
export default canonicalListings;