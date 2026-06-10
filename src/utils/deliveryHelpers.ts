/**
 * Helpers para convertir access_mode del listing al formato de DeliveryOptions
 */

export function convertaccess_modeToOptions(access_mode?: string[]) {
  if (!access_mode || access_mode.length === 0) {
    return undefined; // DeliveryOptions component will not render
  }

  return {
    pickup: access_mode.includes('pickup'),
    meetup: access_mode.includes('meetup') 
      ? { enabled: true, radius: "5km", cost: "Free" } 
      : undefined,
    courier: access_mode.includes('delivery') 
      ? { enabled: true, cost: "$5 USD", area: "Local area" } 
      : undefined,
    postal: access_mode.includes('shipping') 
      ? { enabled: true, cost: "$8 USD", coverage: "nationwide" } 
      : undefined,
    locker: false,
    digital: access_mode.includes('virtual'),
  };
}
