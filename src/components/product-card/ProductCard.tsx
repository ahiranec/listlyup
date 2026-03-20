/**
 * ProductCard Component
 * Premium marketplace listing card
 *
 * Qué hace:
 * - Renderiza una card visual para un listing del marketplace.
 * - Recibe datos ya preparados desde App/UI layer.
 * - No resuelve datos desde repos ni desde Supabase.
 *
 * Contrato actual esperado desde UI:
 * - id: listings.id
 * - image: listings.primary_image_url
 * - title: listings.title
 * - price: string ya formateado en la capa superior
 * - condition: listings.condition
 * - visibility: derivado desde listings.visibility_mode
 * - location: texto ya resuelto para mostrar
 * - ownerName: nombre ya resuelto del owner_user
 * - type: derivado desde listing_type / offer_mode
 * - eventDate / eventEndDate / eventTime: metadata de eventos
 * - pricingModel: metadata de pricing para servicios/arriendos
 * - ticketType: metadata de eventos
 * - duration: single | multi
 * - onClick: navegación al detail usando listings.id
 */

import { motion } from 'motion/react';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardContent } from './ProductCardContent';
import { useProductCard } from './useProductCard';

interface ProductCardProps {
  // Canonical listing ID
  id: string;

  // Main visual content
  image: string;
  title: string;

  // Already formatted display values from parent
  price?: string;
  location?: string;
  ownerName?: string;

  // Listing metadata
  condition?: string;
  visibility?: string;

  // UI card mode
  type?: "sale" | "trade" | "free" | "sale_or_trade" | "rent" | "service" | "event";

  // Event metadata
  eventDate?: string;
  eventEndDate?: string;
  eventTime?: string;
  eventTimeEnd?: string;

  // Service / rental / event metadata
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly';
  ticketType?: 'free' | 'paid';
  duration?: 'single' | 'multi';

  // Navigation / interaction
  onClick?: () => void;
}

export function ProductCard({
  id,
  image,
  title,
  price,
  condition,
  visibility,
  location,
  ownerName,
  type = "sale",
  eventDate,
  eventEndDate,
  eventTime,
  eventTimeEnd,
  pricingModel,
  ticketType,
  duration,
  onClick,
}: ProductCardProps) {
  /**
   * Local UI behavior only
   * - saved state
   * - save button interaction
   *
   * No data fetching here.
   */
  const { isSaved, handleSaveClick } = useProductCard({
    id,
    title,
    price,
    image,
    location,
    type,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      whileHover={{
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 10 },
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col h-full bg-gradient-to-b from-white to-gray-50/30 rounded-xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={onClick}
    >
      {/* Top image / badges / save action */}
      <ProductCardImage
        image={image}
        title={title}
        type={type}
        visibility={visibility}
        isSaved={isSaved}
        onSaveClick={handleSaveClick}
      />

      {/* Main textual content */}
      <ProductCardContent
        title={title}
        price={price}
        location={location}
        ownerName={ownerName}
        visibility={visibility}
        type={type}
        eventDate={eventDate}
        eventEndDate={eventEndDate}
        eventTime={eventTime}
        eventTimeEnd={eventTimeEnd}
        condition={condition}
        pricingModel={pricingModel}
        ticketType={ticketType}
        duration={duration}
      />
    </motion.div>
  );
}