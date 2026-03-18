/**
 * Trail Listings Mock Data
 * Listings that are sold or archived
 */

import type { TrailListing } from "../components/my-trail/types";

export const mockTrailListings: TrailListing[] = [
  {
    id: "trail-1",
    title: "iPhone 13 Pro 128GB",
    type: "product",
    offerType: "sale",
    price: "$450.000",
    location: "Valparaíso",
    username: "techseller",
    lifecycle: "sold",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1632633173522-c89a2a6e572f?w=400",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-12-01"),
    closedDate: new Date("2024-12-01"),
  },
  {
    id: "trail-2",
    title: "Laptop Dell XPS 13",
    type: "product",
    offerType: "sale",
    price: "$800.000",
    location: "Viña del Mar",
    username: "techseller",
    lifecycle: "sold",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=400",
    createdAt: new Date("2024-09-20"),
    updatedAt: new Date("2024-11-15"),
    closedDate: new Date("2024-11-15"),
  },
  {
    id: "trail-3",
    title: "Curso de React Advanced",
    type: "service",
    price: "$120.000",
    location: "Online",
    username: "techseller",
    lifecycle: "archived",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400",
    createdAt: new Date("2024-08-10"),
    updatedAt: new Date("2024-11-01"),
    closedDate: new Date("2024-11-01"),
  },
  {
    id: "trail-4",
    title: "Concierto Rock Festival 2024",
    type: "event",
    price: "$15.000",
    location: "Reñaca",
    username: "techseller",
    lifecycle: "archived",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=400",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-10-20"),
    closedDate: new Date("2024-10-20"),
  },
  {
    id: "trail-5",
    title: "Bicicleta de Montaña Trek",
    type: "product",
    offerType: "sale",
    price: "$350.000",
    location: "Valparaíso",
    username: "techseller",
    lifecycle: "sold",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=400",
    createdAt: new Date("2024-06-15"),
    updatedAt: new Date("2024-10-05"),
    closedDate: new Date("2024-10-05"),
  },
  {
    id: "trail-6",
    title: "Clases de Yoga Online",
    type: "service",
    price: "$25.000/mes",
    location: "Online",
    username: "techseller",
    lifecycle: "archived",
    visibility: "groups",
    groupIds: ["g1", "g3"],
    thumbnail: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400",
    createdAt: new Date("2024-05-01"),
    updatedAt: new Date("2024-09-15"),
    closedDate: new Date("2024-09-15"),
  },
  {
    id: "trail-7",
    title: "PlayStation 5 Console",
    type: "product",
    offerType: "sale",
    price: "$550.000",
    location: "Reñaca",
    username: "techseller",
    lifecycle: "sold",
    visibility: "public",
    thumbnail: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400",
    createdAt: new Date("2024-04-10"),
    updatedAt: new Date("2024-08-22"),
    closedDate: new Date("2024-08-22"),
  },
];

/**
 * Get all trail listings
 */
export function getTrailListings(): TrailListing[] {
  return mockTrailListings;
}

/**
 * Get trail listings by type
 */
export function getTrailListingsByType(type: 'product' | 'service' | 'event'): TrailListing[] {
  return mockTrailListings.filter(listing => listing.type === type);
}

/**
 * Get trail listings by lifecycle
 */
export function getTrailListingsByLifecycle(lifecycle: 'sold' | 'archived'): TrailListing[] {
  return mockTrailListings.filter(listing => listing.lifecycle === lifecycle);
}
