/**
 * ProductCard Component (Refactored)
 * Premium marketplace listing card
 * 
 * DB Mapping:
 * - image: listing_images.image_url (where is_primary = true)
 * - title: listings.title
 * - price: listings.price_amount + listings.currency
 * - condition: listings.condition
 * - type: listings.subtype (sale | trade)
 * - location: listing_locations.meetup_place_note OR locations.address_line1 + city
 * - onClick: Navigate to listing detail using listings.id
 * - pricingModel: pricing metadata for services/rentals
 * - ticketType: ticket type for events
 * - duration: single or multi-day for events
 */

import { motion } from 'motion/react';
import { ProductCardImage } from './ProductCardImage';
import { ProductCardContent } from './ProductCardContent';
import { useProductCard } from './useProductCard';

interface ProductCardProps {
  id: string;          // DB: listings.id - REQUIRED for save functionality
  image: string;       // DB: listing_images.image_url (is_primary = true)
  title: string;       // DB: listings.title
  price?: string;      // DB: listings.price_amount + listings.currency
  condition?: string;  // DB: listings.condition
  visibility?: string; // DB: listings.visibility (if applicable)
  location?: string;   // DB: listing_locations.meetup_place_note or locations.address_line1
  type?: "sale" | "trade" | "free" | "sale_or_trade" | "rent" | "service" | "event";  // DB: listings.subtype
  eventDate?: string;  // Event start date (only for type === "event")
  eventEndDate?: string; // Event end date (only for multi-day events)
  eventTime?: string;  // Event start time (only for type === "event")
  eventTimeEnd?: string; // Event end time (only for type === "event")
  pricingModel?: 'hourly' | 'fixed' | 'quote' | 'session' | 'daily' | 'monthly'; // Pricing model for services/rentals
  ticketType?: 'free' | 'paid'; // Ticket type for events
  duration?: 'single' | 'multi'; // Duration for events
  onClick?: () => void; // Navigate using listings.id
}

export function ProductCard({
  id,
  image,
  title,
  price,
  condition,
  visibility,
  location,
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
        damping: 20 
      }}
      whileHover={{ 
        y: -4,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col h-full bg-gradient-to-b from-white to-gray-50/30 rounded-xl border border-gray-200/60 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
      onClick={onClick}
    >
      {/* Image Section */}
      <ProductCardImage
        image={image}
        title={title}
        type={type}
        visibility={visibility}
        isSaved={isSaved}
        onSaveClick={handleSaveClick}
      />

      {/* Content Section */}
      <ProductCardContent
        title={title}
        price={price}
        location={location}
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