/**
 * Offer Mode Compatibility Utils
 * Defines which offer modes are valid for each listing type
 * 
 * Rules:
 * - Product: For Sale, For Trade, For Free
 * - Service: For Sale, For Rent
 * - Event: For Sale, For Free
 * - All Types: All offer modes available
 */

export type ListingType = "all" | "product" | "service" | "event";
export type OfferMode = "for_sale" | "for_trade" | "for_free" | "for_rent";

/**
 * Matriz de compatibilidad entre listing types y offer modes
 */
export const OFFER_MODE_COMPATIBILITY: Record<ListingType, OfferMode[]> = {
  product: ["for_sale", "for_trade", "for_free"],
  service: ["for_sale", "for_rent"],
  event: ["for_sale", "for_free"],
  all: ["for_sale", "for_trade", "for_free", "for_rent"], // Todas disponibles
};

/**
 * Verifica si un offer mode es compatible con un listing type
 */
export function isOfferModeCompatible(
  listingType: ListingType,
  offerMode: OfferMode
): boolean {
  return OFFER_MODE_COMPATIBILITY[listingType].includes(offerMode);
}

/**
 * Obtiene los offer modes válidos para un listing type
 */
export function getValidOfferModes(listingType: ListingType): OfferMode[] {
  return OFFER_MODE_COMPATIBILITY[listingType];
}

/**
 * Filtra offer modes seleccionados para que solo incluya compatibles
 * Útil cuando el usuario cambia de listing type
 */
export function filterCompatibleOfferModes(
  listingType: ListingType,
  selectedOfferModes: string[]
): string[] {
  const validModes = OFFER_MODE_COMPATIBILITY[listingType];
  return selectedOfferModes.filter((mode) =>
    validModes.includes(mode as OfferMode)
  );
}

/**
 * Verifica si hay offer modes seleccionados incompatibles
 */
export function hasIncompatibleOfferModes(
  listingType: ListingType,
  selectedOfferModes: string[]
): boolean {
  const validModes = OFFER_MODE_COMPATIBILITY[listingType];
  return selectedOfferModes.some(
    (mode) => !validModes.includes(mode as OfferMode)
  );
}
