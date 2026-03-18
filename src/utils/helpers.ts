/**
 * Utility helper functions
 * Reusable functions to avoid duplication
 */

/**
 * Parse price string to number
 * Removes all non-numeric characters except decimal point
 * 
 * @example
 * parsePrice("$899.990") // 899.99
 * parsePrice("25 USD") // 25
 */
export function parsePrice(price?: string): number {
  if (!price) return 0;
  return parseFloat(price.replace(/[^0-9.]/g, "")) || 0;
}

/**
 * Format price number to display string
 * 
 * @example
 * formatPrice(899.99, "USD") // "$899.99"
 * formatPrice(1200000, "CLP") // "$1.200.000"
 */
export function formatPrice(amount: number, currency: string = "USD"): string {
  if (currency === "CLP") {
    return `$${amount.toLocaleString("es-CL")}`;
  }
  return `$${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/**
 * Check if a date is within N days from now
 * 
 * @example
 * isWithinDays(new Date("2024-11-15"), 7) // true if today is Nov 8-15
 */
export function isWithinDays(date: Date, days: number): boolean {
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays >= 0 && diffDays <= days;
}

/**
 * Check if listing is expiring soon (< 7 days)
 * Assumes active listings expire 30 days from creation
 * 
 * @example
 * isExpiringSoon(listing) // true if expires in < 7 days
 */
export function isExpiringSoon(
  listing: { createdAt: Date; lifecycle: string }
): boolean {
  if (listing.lifecycle !== "active") return false;
  
  const expiryDate = new Date(listing.createdAt);
  expiryDate.setDate(expiryDate.getDate() + 30);
  
  return isWithinDays(expiryDate, 7);
}

/**
 * Check if listing has low engagement (< 10 views)
 * 
 * @example
 * hasLowEngagement(listing) // true if views < 10
 */
export function hasLowEngagement(listing: { stats: { views: number } }): boolean {
  return listing.stats.views < 10;
}

/**
 * Truncate text to max length with ellipsis
 * 
 * @example
 * truncateText("Long text here", 10) // "Long text..."
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

/**
 * Calculate percentage discount
 * 
 * @example
 * calculateDiscount(100, 75) // 25
 */
export function calculateDiscount(
  originalPrice: number,
  currentPrice: number
): number {
  if (originalPrice === 0) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}

/**
 * Format relative time
 * 
 * @example
 * formatRelativeTime(new Date("2024-11-10")) // "1d ago"
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;
  
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears}y ago`;
}

/**
 * Debounce function
 * Returns a debounced version of the function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Share content using native share or fallback to clipboard
 */
export async function shareContent(data: {
  title?: string;
  text?: string;
  url?: string;
}): Promise<{ success: boolean; method: "native" | "clipboard" | "manual" | "failed" }> {
  console.log('[shareContent] Starting with data:', data);
  
  // Try native share first (check if it exists and can share)
  if (navigator.share) {
    try {
      // Check if canShare is available and the data is shareable
      if (navigator.canShare && !navigator.canShare(data)) {
        console.log('[shareContent] Data not shareable via native share, falling back');
      } else {
        await navigator.share(data);
        console.log('[shareContent] Native share successful');
        return { success: true, method: "native" };
      }
    } catch (shareError: any) {
      console.log('[shareContent] Native share error:', shareError);
      // User cancelled or permission denied
      if (shareError.name === "AbortError") {
        return { success: false, method: "failed" };
      }
      // If share failed for other reasons, fall through to clipboard
    }
  }
  
  // Fallback to clipboard API
  const shareUrl = data.url || window.location.href;
  console.log('[shareContent] Attempting clipboard API with URL:', shareUrl);
  
  try {
    await navigator.clipboard.writeText(shareUrl);
    console.log('[shareContent] Clipboard API successful');
    return { success: true, method: "clipboard" };
  } catch (clipboardError) {
    console.log('[shareContent] Clipboard API failed, trying manual fallback:', clipboardError);
    // Don't throw - continue to manual fallback
  }
  
  // Manual fallback: Create temporary textarea element
  console.log('[shareContent] Trying manual fallback method');
  try {
    const textToShare = data.url || window.location.href;
    const tempTextarea = document.createElement('textarea');
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.top = '0';
    tempTextarea.style.left = '0';
    tempTextarea.style.width = '2em';
    tempTextarea.style.height = '2em';
    tempTextarea.style.padding = '0';
    tempTextarea.style.border = 'none';
    tempTextarea.style.outline = 'none';
    tempTextarea.style.boxShadow = 'none';
    tempTextarea.style.background = 'transparent';
    tempTextarea.style.opacity = '0';
    tempTextarea.value = textToShare;
    document.body.appendChild(tempTextarea);
    
    tempTextarea.focus();
    tempTextarea.select();
    
    // Try modern selection API first
    try {
      tempTextarea.setSelectionRange(0, 99999);
    } catch (e) {
      // Fallback for older browsers
    }
    
    const successful = document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    
    if (successful) {
      console.log('[shareContent] Manual copy successful');
      return { success: true, method: "manual" };
    } else {
      console.log('[shareContent] Manual copy failed');
      return { success: false, method: "failed" };
    }
  } catch (manualError) {
    console.error('[shareContent] Manual copy error:', manualError);
    return { success: false, method: "failed" };
  }
}

/**
 * Format event date and time to human-readable format
 * 
 * @example
 * formatEventDateTime("2025-02-15", "11:00") // "15 Feb · 11:00 AM"
 * formatEventDateTime("2025-02-15T11:00:00Z") // "15 Feb · 11:00 AM"
 * formatEventDateTime("2025-12-25", "18:30") // "25 Dec · 6:30 PM"
 */
export function formatEventDateTime(dateStr?: string, timeStr?: string): string {
  if (!dateStr) return "";
  
  try {
    let date: Date;
    let hour: number | undefined;
    let minutes: string | undefined;
    
    // Check if dateStr is ISO format with time (e.g., "2025-02-15T11:00:00Z")
    if (dateStr.includes('T')) {
      date = new Date(dateStr);
      // Extract time from ISO date if no separate timeStr provided
      if (!timeStr) {
        hour = date.getHours();
        minutes = date.getMinutes().toString().padStart(2, '0');
      }
    } else {
      // Simple date format (e.g., "2025-02-15")
      date = new Date(dateStr + "T00:00:00");
    }
    
    // Validate date
    if (isNaN(date.getTime())) {
      return dateStr; // Fallback to original string if invalid
    }
    
    // Format date: "15 Feb"
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    
    let result = `${day} ${month}`;
    
    // Add time if available
    if (timeStr) {
      // Parse provided timeStr (e.g., "11:00")
      const [h, m] = timeStr.split(':');
      hour = parseInt(h, 10);
      minutes = m;
    }
    
    if (hour !== undefined && minutes !== undefined) {
      const isPM = hour >= 12;
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = isPM ? 'PM' : 'AM';
      
      result += ` · ${displayHour}:${minutes} ${period}`;
    }
    
    return result;
  } catch (error) {
    return dateStr; // Fallback to original string if parsing fails
  }
}

/**
 * Format event date range for multi-day events
 * 
 * @example
 * // Single-day with time:
 * formatEventDateRange("2025-01-25", "14:00", "18:00", "single") // "25 Jan · 2:00 PM"
 * 
 * // Multi-day without time (for cards):
 * formatEventDateRange("2025-12-17", undefined, undefined, "multi", "2025-12-20") // "17 - 20 Dec"
 * 
 * // Multi-day same month:
 * formatEventDateRange("2025-12-17", undefined, undefined, "multi", "2025-12-20") // "17 - 20 Dec"
 * 
 * // Multi-day different months:
 * formatEventDateRange("2025-12-28", undefined, undefined, "multi", "2026-01-02") // "28 Dec - 2 Jan"
 */
export function formatEventDateRange(
  startDateStr?: string,
  startTimeStr?: string,
  endTimeStr?: string,
  duration?: 'single' | 'multi',
  endDateStr?: string
): string {
  if (!startDateStr) return "";
  
  try {
    const startDate = new Date(startDateStr + (startDateStr.includes('T') ? '' : 'T00:00:00'));
    
    // Validate start date
    if (isNaN(startDate.getTime())) {
      return startDateStr;
    }
    
    const startDay = startDate.getDate();
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    
    // Single-day event: show date + time
    if (duration === 'single') {
      let result = `${startDay} ${startMonth}`;
      
      // Add start time if available
      if (startTimeStr) {
        const [h, m] = startTimeStr.split(':');
        const hour = parseInt(h, 10);
        const isPM = hour >= 12;
        const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
        const period = isPM ? 'PM' : 'AM';
        result += ` · ${displayHour}:${m} ${period}`;
      }
      
      return result;
    }
    
    // Multi-day event: show date range (NO time for cards)
    if (duration === 'multi' && endDateStr) {
      const endDate = new Date(endDateStr + (endDateStr.includes('T') ? '' : 'T00:00:00'));
      
      if (isNaN(endDate.getTime())) {
        return `${startDay} ${startMonth}`;
      }
      
      const endDay = endDate.getDate();
      const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
      
      // Same month: "17 - 20 Dec"
      if (startMonth === endMonth) {
        return `${startDay} - ${endDay} ${endMonth}`;
      }
      
      // Different months: "28 Dec - 2 Jan"
      return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    }
    
    // Fallback: just show start date
    return `${startDay} ${startMonth}`;
    
  } catch (error) {
    return startDateStr;
  }
}