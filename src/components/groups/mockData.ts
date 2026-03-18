/**
 * Mock data for Group Filters
 */

import type {
  Country,
  GroupCategory,
  GroupTag,
  GroupMember,
} from "./newTypes";

export const mockCountries: Country[] = [
  {
    id: "chile",
    name: "Chile",
    municipalities: [
      { id: "valparaiso", name: "Valparaíso", countryId: "chile" },
      { id: "vina-del-mar", name: "Viña del Mar", countryId: "chile" },
      { id: "renaca", name: "Reñaca", countryId: "chile" },
      { id: "concon", name: "Concón", countryId: "chile" },
      { id: "zapallar", name: "Zapallar", countryId: "chile" },
      { id: "quintero", name: "Quintero", countryId: "chile" },
      { id: "santiago", name: "Santiago", countryId: "chile" },
      { id: "providencia", name: "Providencia", countryId: "chile" },
    ],
  },
  {
    id: "argentina",
    name: "Argentina",
    municipalities: [
      { id: "buenos-aires", name: "Buenos Aires", countryId: "argentina" },
      { id: "cordoba", name: "Córdoba", countryId: "argentina" },
      { id: "rosario", name: "Rosario", countryId: "argentina" },
    ],
  },
];

export const mockGroupCategories: GroupCategory[] = [
  {
    id: "community",
    name: "Community",
    subcategories: [
      { id: "neighborhood", name: "Neighborhood", categoryId: "community" },
      { id: "building", name: "Building/Complex", categoryId: "community" },
      { id: "city", name: "City/Municipality", categoryId: "community" },
    ],
  },
  {
    id: "interests",
    name: "Interests & Hobbies",
    subcategories: [
      { id: "sports", name: "Sports", categoryId: "interests" },
      { id: "tech", name: "Technology", categoryId: "interests" },
      { id: "arts", name: "Arts & Crafts", categoryId: "interests" },
      { id: "music", name: "Music", categoryId: "interests" },
    ],
  },
  {
    id: "marketplace",
    name: "Marketplace",
    subcategories: [
      { id: "buy-sell", name: "Buy & Sell", categoryId: "marketplace" },
      { id: "services", name: "Services", categoryId: "marketplace" },
      { id: "real-estate", name: "Real Estate", categoryId: "marketplace" },
    ],
  },
  {
    id: "events",
    name: "Events",
    subcategories: [
      { id: "social", name: "Social Events", categoryId: "events" },
      { id: "professional", name: "Professional", categoryId: "events" },
      { id: "educational", name: "Educational", categoryId: "events" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    subcategories: [
      { id: "networking", name: "Networking", categoryId: "professional" },
      { id: "entrepreneurship", name: "Entrepreneurship", categoryId: "professional" },
      { id: "freelance", name: "Freelance", categoryId: "professional" },
    ],
  },
];

export const mockGroupTags: GroupTag[] = [
  { id: "local", name: "Local" },
  { id: "verified", name: "Verified" },
  { id: "active", name: "Active Community" },
  { id: "family-friendly", name: "Family Friendly" },
  { id: "pet-friendly", name: "Pet Friendly" },
  { id: "moderated", name: "Moderated" },
  { id: "educational", name: "Educational" },
  { id: "social", name: "Social" },
  { id: "professional", name: "Professional" },
  { id: "marketplace", name: "Marketplace" },
];

export const mockGroupMembers: GroupMember[] = [
  { id: "user1", name: "María González", avatarUrl: undefined },
  { id: "user2", name: "Juan Pérez", avatarUrl: undefined },
  { id: "user3", name: "Ana Rodríguez", avatarUrl: undefined },
  { id: "user4", name: "Carlos Martínez", avatarUrl: undefined },
  { id: "user5", name: "Sofía López", avatarUrl: undefined },
  { id: "user6", name: "Diego Silva", avatarUrl: undefined },
  { id: "user7", name: "Valentina Torres", avatarUrl: undefined },
  { id: "user8", name: "Mateo Hernández", avatarUrl: undefined },
];
