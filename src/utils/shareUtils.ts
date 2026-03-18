/**
 * Share utilities for ListlyUp
 * Handles social sharing, referral links, and Open Graph meta tags
 */

// ==================== TYPE EMOJI HELPERS ====================

/**
 * Get emoji based on product type
 */
function getTypeEmoji(type?: string): string {
  switch (type) {
    case 'sale':
      return '🛍️';
    case 'trade':
      return '🔄';
    case 'free':
      return '🎁';
    case 'sale_or_trade':
      return '💫';
    case 'rent':
      return '🏠';
    default:
      return '📦';
  }
}

// ==================== SHARE URL GENERATION ====================

/**
 * Generates a shareable URL with tracking parameters
 */
export function generateShareUrl(
  productId: string, 
  options?: {
    referralCode?: string;
    source?: 'whatsapp' | 'facebook' | 'twitter' | 'link' | 'email';
  }
): string {
  const baseUrl = `https://listlyup.com/p/${productId}`;
  const params = new URLSearchParams();
  
  if (options?.referralCode) {
    params.append('ref', options.referralCode);
  }
  
  if (options?.source) {
    params.append('utm_source', options.source);
    params.append('utm_medium', 'social');
    params.append('utm_campaign', 'product_share');
  }
  
  const queryString = params.toString();
  return queryString ? `${baseUrl}?${queryString}` : baseUrl;
}

// ==================== WHATSAPP SHARING ====================

/**
 * Formats a rich WhatsApp message with proper emojis and structure
 */
export function formatWhatsAppMessage(product: {
  title: string;
  price?: string;
  location: string;
  type?: string;
  condition?: string;
  description?: string;
}): string {
  // Build message starting with title
  let message = product.title;
  
  // Add type text if it's trade, free, or rent
  if (product.type === 'trade') {
    message += '\n✨ Para intercambio';
  } else if (product.type === 'free') {
    message += '\n✨ Gratis';
  } else if (product.type === 'rent') {
    message += '\n✨ Para alquilar';
  } else if (product.type === 'sale_or_trade') {
    message += '\n✨ Venta o intercambio';
  } else if (product.type === 'service') {
    message += '\n✨ Servicio';
  } else if (product.type === 'event') {
    message += '\n✨ Evento';
  }
  
  // Add price if exists
  if (product.price) {
    message += `\n💰 ${product.price}`;
  }
  
  // Add location
  message += `\n📍 ${product.location}`;
  
  return message;
}

/**
 * Shares to WhatsApp with rich formatting
 */
export function shareToWhatsApp(product: {
  id: string;
  title: string;
  price?: string;
  location: string;
  type?: string;
  condition?: string;
  description?: string;
}, referralCode?: string) {
  const message = formatWhatsAppMessage(product);
  const url = generateShareUrl(product.id, { 
    referralCode, 
    source: 'whatsapp' 
  });
  
  // Build the full message with proper line break
  const fullMessage = `${message}\n\n🔗 Ver más: ${url}`;
  
  // Encode for WhatsApp URL
  const encodedMessage = encodeURIComponent(fullMessage);
  
  // Open WhatsApp with the message
  window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
}

// ==================== OPEN GRAPH META TAGS ====================

/**
 * Updates Open Graph meta tags for rich link previews
 */
export function updateOpenGraphTags(data: {
  title: string;
  description: string;
  image: string;
  url: string;
  price?: string;
  location?: string;
  type?: string;
}) {
  // Helper to update or create a meta tag
  const setMetaTag = (property: string, content: string) => {
    let element = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute('property', property);
      document.head.appendChild(element);
    }
    
    element.setAttribute('content', content);
  };

  // Basic Open Graph tags
  setMetaTag('og:title', data.title);
  setMetaTag('og:description', data.description);
  setMetaTag('og:image', data.image);
  setMetaTag('og:url', data.url);
  setMetaTag('og:type', 'product');
  
  // Twitter Card tags
  setMetaTag('twitter:card', 'summary_large_image');
  setMetaTag('twitter:title', data.title);
  setMetaTag('twitter:description', data.description);
  setMetaTag('twitter:image', data.image);
  
  // Product-specific tags
  if (data.price) {
    setMetaTag('product:price:amount', data.price.replace(/[^0-9.]/g, ''));
    setMetaTag('product:price:currency', 'USD'); // Default currency
  }
  
  // Also update standard meta tags
  const descriptionMeta = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', data.description);
  }
  
  // Update page title
  document.title = data.title;
}

/**
 * Initialize Open Graph tags when product detail page loads
 */
export function initializeProductShareTags(product: {
  id: string;
  title: string;
  price?: string;
  location: string;
  image: string;
  description?: string;
  type?: string;
}) {
  const url = `https://listlyup.com/p/${product.id}`;
  
  // Build description with fallback
  let description = product.description || '';
  if (!description && product.price) {
    description = `${product.price} - ${product.location}`;
  } else if (!description) {
    description = product.location;
  }
  
  // Truncate if too long
  if (description.length > 160) {
    description = description.substring(0, 160);
  }

  updateOpenGraphTags({
    title: `${product.title} - ListlyUp`,
    description,
    image: product.image,
    url,
    price: product.price,
    location: product.location,
    type: product.type,
  });
}