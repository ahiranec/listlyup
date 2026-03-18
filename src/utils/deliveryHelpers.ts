/**
 * Helpers para convertir deliveryModes del listing al formato de DeliveryOptions
 */

export function convertDeliveryModesToOptions(deliveryModes?: string[]) {
  if (!deliveryModes || deliveryModes.length === 0) {
    return undefined; // DeliveryOptions component will not render
  }

  return {
    pickup: deliveryModes.includes('pickup'),
    meetup: deliveryModes.includes('meetup') 
      ? { enabled: true, radius: "5km", cost: "Free" } 
      : undefined,
    courier: deliveryModes.includes('delivery') 
      ? { enabled: true, cost: "$5 USD", area: "Local area" } 
      : undefined,
    postal: deliveryModes.includes('shipping') 
      ? { enabled: true, cost: "$8 USD", coverage: "nationwide" } 
      : undefined,
    locker: false,
    digital: deliveryModes.includes('virtual'),
  };
}
