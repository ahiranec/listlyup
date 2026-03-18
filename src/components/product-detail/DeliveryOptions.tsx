import { Package, CheckCircle2, AlertCircle } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import type { ExtendedProduct } from "./types";

interface DeliveryOptionsProps {
  deliveryOptions?: ExtendedProduct['deliveryOptions'];
}

export function DeliveryOptions({ deliveryOptions }: DeliveryOptionsProps) {
  if (!deliveryOptions) return null;

  // Contar métodos habilitados
  const deliveryMethodsCount = 
    (deliveryOptions.pickup ? 1 : 0) +
    (deliveryOptions.meetup?.enabled ? 1 : 0) +
    (deliveryOptions.courier?.enabled ? 1 : 0) +
    (deliveryOptions.postal?.enabled ? 1 : 0) +
    (deliveryOptions.locker ? 1 : 0) +
    (deliveryOptions.digital ? 1 : 0);

  if (deliveryMethodsCount === 0) return null;

  // Generar preview compacto (max 2 métodos visibles)
  const getPreviewText = () => {
    const methods = [];
    if (deliveryOptions.pickup) methods.push("Pickup");
    if (deliveryOptions.meetup?.enabled) methods.push("Meet-up");
    if (deliveryOptions.courier?.enabled) methods.push("Courier");
    if (deliveryOptions.postal?.enabled) methods.push("Postal");
    if (deliveryOptions.locker) methods.push("Locker");
    if (deliveryOptions.digital) methods.push("Digital");
    
    if (methods.length <= 2) return methods.join(" · ");
    return `${methods[0]} · ${methods[1]} +${methods.length - 2}`;
  };

  // Renderizar lista de métodos
  const renderMethodsList = () => (
    <div className="space-y-1 text-xs">
      {deliveryOptions.pickup && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Pickup (Free)</span>
        </div>
      )}
      {deliveryOptions.meetup?.enabled && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Meet-up ({deliveryOptions.meetup.cost}, within {deliveryOptions.meetup.radius})</span>
        </div>
      )}
      {deliveryOptions.courier?.enabled && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Courier ({deliveryOptions.courier.cost}, {deliveryOptions.courier.area})</span>
        </div>
      )}
      {deliveryOptions.postal?.enabled && (
        <div className="flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
          <span>Postal ({deliveryOptions.postal.cost}, {deliveryOptions.postal.coverage})</span>
        </div>
      )}
      {deliveryOptions.locker && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Locker Pickup</span>
        </div>
      )}
      {deliveryOptions.digital && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Digital Delivery</span>
        </div>
      )}
    </div>
  );

  // Si solo hay 1-2 métodos, mostrar directamente sin accordion
  if (deliveryMethodsCount <= 2) {
    return (
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm">
          <Package className="w-4 h-4" />
          <span>Delivery</span>
        </div>
        <div className="text-xs text-primary">
          {getPreviewText()}
        </div>
      </div>
    );
  }

  // Si hay 3+ métodos, usar accordion con preview
  return (
    <div className="px-4 py-3">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="delivery-methods" className="border-none">
          <AccordionTrigger className="py-0 hover:no-underline">
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-center gap-2 text-sm">
                <Package className="w-4 h-4" />
                <span className="font-bold font-normal">Delivery</span>
              </div>
              <div className="text-xs text-primary font-normal">
                {getPreviewText()}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-2">
            {renderMethodsList()}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}