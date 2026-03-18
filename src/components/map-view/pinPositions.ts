/**
 * Map Pin Positions Configuration
 * Coordenadas simuladas para los pins en el mapa
 * Distribuidos de forma dispersa sobre tierra entre Valparaíso y Zapallar
 * 
 * TOTAL: 23 productos
 * - 16 productos accesibles (11 públicos + 5 de grupos del usuario) → Pins AZULES
 * - 7 productos privados (grupos no accesibles) → Pins GRISES
 */

export interface PinPosition {
  id: string;
  left: string;
  top: string;
  visible: boolean; // Deprecated: use product accessibility logic instead
}

export const PIN_POSITIONS: PinPosition[] = [
  // ==================== PRODUCTOS - 16 pins ====================
  // id: 1 - Modern Desk Lamp (Puchuncaví) - public
  { id: "1", left: "45%", top: "65%", visible: true },
  
  // id: 2 - Vintage Camera (Valparaíso) - group2
  { id: "2", left: "65%", top: "55%", visible: true },
  
  // id: 3 - Wireless Headphones (Valparaíso) - public
  { id: "3", left: "38%", top: "35%", visible: true },
  
  // id: 4 - Coffee Maker (Viña del Mar) - group3
  { id: "4", left: "58%", top: "68%", visible: true },
  
  // id: 5 - Mountain Bike (Viña del Mar) - group3
  { id: "5", left: "50%", top: "48%", visible: true },
  
  // id: 6 - Smartphone (Quilpué) - group1
  { id: "6", left: "44%", top: "38%", visible: true },
  
  // id: 7 - Skateboard (Concón) - public
  { id: "7", left: "62%", top: "42%", visible: true },
  
  // id: 8 - Backpack (Zapallar) - public
  { id: "8", left: "52%", top: "78%", visible: true },
  
  // id: 9 - Electric Guitar (Valparaíso) - public
  { id: "9", left: "48%", top: "52%", visible: true },
  
  // id: 10 - Wooden Chair (Viña del Mar) - group1, group2
  { id: "10", left: "60%", top: "60%", visible: true },
  
  // id: 11 - Running Shoes (Viña del Mar) - public
  { id: "11", left: "55%", top: "28%", visible: true },
  
  // id: 12 - Bookshelf (Quilpué) - public
  { id: "12", left: "42%", top: "45%", visible: true },
  
  // id: 13 - Professional Plumbing (Valparaíso) - public
  { id: "13", left: "35%", top: "58%", visible: true },
  
  // id: 14 - General Dentistry (Viña del Mar) - public
  { id: "14", left: "58%", top: "32%", visible: true },
  
  // id: 15 - Surfboard Rental (Maitencillo) - public
  { id: "15", left: "70%", top: "38%", visible: true },
  
  // id: 16 - Laguna Flea Market (Laguna Verde) - public
  { id: "16", left: "32%", top: "72%", visible: true },
  
  // ==================== PRODUCTOS PRIVADOS - 7 pins GRISES ====================
  // Productos de grupos a los que el usuario NO pertenece (group4-group7)
  // Distribuidos aleatoriamente en el mapa
  
  // id: 17 - Ceramic Vase Set (Valparaíso) - group4
  { id: "17", left: "40%", top: "62%", visible: true },
  
  // id: 18 - Leather Jacket (Viña del Mar) - group5
  { id: "18", left: "54%", top: "44%", visible: true },
  
  // id: 19 - Vinyl Record Collection (Quilpué) - group6
  { id: "19", left: "47%", top: "38%", visible: true },
  
  // id: 20 - Art Supplies Bundle (Concón) - group7
  { id: "20", left: "65%", top: "36%", visible: true },
  
  // id: 21 - Designer Watch (Valparaíso) - group4
  { id: "21", left: "36%", top: "50%", visible: true },
  
  // id: 22 - Home Gym Equipment (Viña del Mar) - group5
  { id: "22", left: "52%", top: "58%", visible: true },
  
  // id: 23 - Handmade Jewelry Set (Puchuncaví) - group6
  { id: "23", left: "43%", top: "70%", visible: true },
];

/**
 * Get visible pin positions only
 */
export function getVisiblePins(): PinPosition[] {
  return PIN_POSITIONS.filter(pin => pin.visible);
}

/**
 * Get invisible pin positions only
 */
export function getInvisiblePins(): PinPosition[] {
  return PIN_POSITIONS.filter(pin => !pin.visible);
}