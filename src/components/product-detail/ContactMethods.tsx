import { MessageCircle, CheckCircle2, Globe, Share2 } from "lucide-react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { Badge } from "../ui/badge";
import type { ContactMethod } from "../../types/canonical";

interface ContactMethodsProps {
  contact_methods?: ContactMethod[];
  contact_whatsapp_phone?: string;
  contact_website_url?: string;
  contact_social_url?: string;
  responseTime?: string; // ❌ MVP: Kept for compatibility but won't display
}

export function ContactMethods({ 
  contact_methods, 
  contact_whatsapp_phone,
  contact_website_url,
  contact_social_url,
  responseTime 
}: ContactMethodsProps) {
  // ✅ CANONICAL: Use contact_methods array
  const hasChat = contact_methods?.includes('in_app_chat') ?? false;
  const hasWhatsApp = contact_methods?.includes('whatsapp') ?? false;
  const hasWebsite = contact_methods?.includes('website') ?? false;
  const hasSocial = contact_methods?.includes('social_media') ?? false;

  // ✅ Count ALL contact methods
  const totalContactCount =
    (hasChat ? 1 : 0) +
    (hasWhatsApp ? 1 : 0) +
    (hasWebsite ? 1 : 0) +
    (hasSocial ? 1 : 0);

  // Only hide if NO contact methods at all (should never happen for valid products)
  if (totalContactCount === 0) return null;

  // ✅ Generate preview text from ALL contact methods
  const getPreviewText = () => {
    const methods = [];
    if (hasChat) methods.push("In-App Chat");
    if (hasWhatsApp) methods.push("WhatsApp");
    if (hasWebsite) methods.push("Website");
    if (hasSocial) methods.push("Social Media");
    
    if (methods.length <= 2) return methods.join(" · ");
    return `${methods[0]} · ${methods[1]} +${methods.length - 2}`;
  };

  // Renderizar lista de métodos
  const renderMethodsList = () => (
    <div className="space-y-1 text-xs">
      {hasChat && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>In-App Chat</span>
          <Badge variant="outline" className="text-xs h-4 px-1 ml-auto">Recommended</Badge>
        </div>
      )}
      {hasWhatsApp && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>WhatsApp</span>
          {contact_whatsapp_phone && (
            <span className="text-muted-foreground ml-auto text-[10px]">{contact_whatsapp_phone}</span>
          )}
        </div>
      )}
      {hasWebsite && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Website</span>
          {contact_website_url && (
            <Globe className="w-3 h-3 text-muted-foreground ml-auto" />
          )}
        </div>
      )}
      {hasSocial && (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
          <span>Social Media</span>
          {contact_social_url && (
            <Share2 className="w-3 h-3 text-muted-foreground ml-auto" />
          )}
        </div>
      )}
    </div>
  );

  // Si solo hay 1-2 métodos, mostrar preview inline
  if (totalContactCount <= 2) {
    return (
      <div className="px-4 py-3 space-y-1.5">
        <div className="flex items-center gap-2 text-sm">
          <MessageCircle className="w-4 h-4" />
          <span>Contact</span>
          {/* ❌ MVP: responseTime removed - no seller stats in MVP */}
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
        <AccordionItem value="contact-methods" className="border-none">
          <AccordionTrigger className="py-0 hover:no-underline">
            <div className="flex flex-col items-start gap-1 w-full">
              <div className="flex items-center gap-2 text-sm">
                <MessageCircle className="w-4 h-4" />
                <span>Contact</span>
                {/* ❌ MVP: responseTime removed - no seller stats in MVP */}
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