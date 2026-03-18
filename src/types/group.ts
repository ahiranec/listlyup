export type GroupType = "Public" | "Private" | "Community" | "Event";
export type JoinPolicy = "Open" | "Approval" | "Invite";
export type GroupVisibility = "Public" | "Private";

export interface GroupPreset {
  id: string;
  name: string;
  subtitle: string;
  category: "general" | "community" | "event";
  type: GroupType;
  joinPolicy: JoinPolicy;
  visibility: GroupVisibility;
}

export const GROUP_PRESETS: GroupPreset[] = [
  // FOR GENERAL USE
  {
    id: "public-group",
    name: "Public Group",
    subtitle: "Anyone can join, fully visible",
    category: "general",
    type: "Public",
    joinPolicy: "Open",
    visibility: "Public",
  },
  {
    id: "standard-private",
    name: "Standard Private Group",
    subtitle: "Approval required, visible in searches",
    category: "general",
    type: "Private",
    joinPolicy: "Approval",
    visibility: "Public",
  },
  {
    id: "exclusive-private",
    name: "Exclusive Private Group",
    subtitle: "Approval required, hidden from searches",
    category: "general",
    type: "Private",
    joinPolicy: "Approval",
    visibility: "Private",
  },
  {
    id: "maximum-privacy",
    name: "Maximum Privacy Group",
    subtitle: "Invite only, completely hidden",
    category: "general",
    type: "Private",
    joinPolicy: "Invite",
    visibility: "Private",
  },
  // FOR COMMUNITIES
  {
    id: "open-community",
    name: "Open Community",
    subtitle: "Anyone can join and see content",
    category: "community",
    type: "Community",
    joinPolicy: "Open",
    visibility: "Public",
  },
  {
    id: "moderated-community",
    name: "Moderated Community",
    subtitle: "Approval required to join",
    category: "community",
    type: "Community",
    joinPolicy: "Approval",
    visibility: "Public",
  },
  // FOR EVENTS
  {
    id: "public-event",
    name: "Public Event",
    subtitle: "Everyone can see and join",
    category: "event",
    type: "Event",
    joinPolicy: "Open",
    visibility: "Public",
  },
  {
    id: "event-registration",
    name: "Event with Registration",
    subtitle: "Approval required to attend",
    category: "event",
    type: "Event",
    joinPolicy: "Approval",
    visibility: "Public",
  },
  {
    id: "private-event",
    name: "Private Event",
    subtitle: "Invite only, hidden event",
    category: "event",
    type: "Event",
    joinPolicy: "Invite",
    visibility: "Private",
  },
];

export interface Contact {
  id: string;
  name: string;
  avatar?: string;
  relationship: string;
  email?: string;
}

export const MOCK_CONTACTS: Contact[] = [
  {
    id: "1",
    name: "María González",
    relationship: "Friends",
    email: "maria@example.com",
  },
  {
    id: "2",
    name: "Juan Pérez",
    relationship: "Neighbors",
    email: "juan@example.com",
  },
  {
    id: "3",
    name: "Ana Silva",
    relationship: "Family",
    email: "ana@example.com",
  },
  {
    id: "4",
    name: "Carlos Rojas",
    relationship: "Friends",
    email: "carlos@example.com",
  },
  {
    id: "5",
    name: "Lucía Torres",
    relationship: "Neighbors",
    email: "lucia@example.com",
  },
  {
    id: "6",
    name: "Pedro Vargas",
    relationship: "Work",
    email: "pedro@example.com",
  },
];

export const GROUP_CONTENT_OPTIONS = [
  { value: "buy-sell", label: "Buy & Sell" },
  { value: "discussion", label: "Community Discussion" },
  { value: "events", label: "Events & Activities" },
  { value: "neighborhood", label: "Neighborhood Watch" },
  { value: "services", label: "Local Services" },
  { value: "hobbies", label: "Hobbies & Interests" },
  { value: "other", label: "Other" },
];

export const GROUP_CATEGORY_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "business", label: "Business" },
  { value: "social", label: "Social" },
  { value: "educational", label: "Educational" },
  { value: "sports", label: "Sports & Recreation" },
  { value: "arts", label: "Arts & Culture" },
  { value: "other", label: "Other" },
];

export const COUNTRY_OPTIONS = [
  { value: "chile", label: "Chile" },
  { value: "argentina", label: "Argentina" },
  { value: "peru", label: "Peru" },
  { value: "colombia", label: "Colombia" },
  { value: "mexico", label: "Mexico" },
];

export const MUNICIPALITY_OPTIONS: Record<string, { value: string; label: string }[]> = {
  chile: [
    { value: "valparaiso", label: "Valparaíso" },
    { value: "santiago", label: "Santiago" },
    { value: "vina-del-mar", label: "Viña del Mar" },
    { value: "concepcion", label: "Concepción" },
  ],
  argentina: [
    { value: "buenos-aires", label: "Buenos Aires" },
    { value: "cordoba", label: "Córdoba" },
    { value: "rosario", label: "Rosario" },
  ],
  peru: [
    { value: "lima", label: "Lima" },
    { value: "cusco", label: "Cusco" },
    { value: "arequipa", label: "Arequipa" },
  ],
  colombia: [
    { value: "bogota", label: "Bogotá" },
    { value: "medellin", label: "Medellín" },
    { value: "cali", label: "Cali" },
  ],
  mexico: [
    { value: "mexico-city", label: "Mexico City" },
    { value: "guadalajara", label: "Guadalajara" },
    { value: "monterrey", label: "Monterrey" },
  ],
};
