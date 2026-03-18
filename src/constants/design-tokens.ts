/**
 * Design Tokens - Mobile-First System
 * Constants that match the CSS variables in globals.css
 */

export const DESIGN_TOKENS = {
  // Heights
  HEADER_HEIGHT: 56,  // px
  BOTTOM_NAV_HEIGHT: 60,  // px
  STATUS_BAR_HEIGHT: 45,  // px
  FILTER_BUTTON_HEIGHT: 40,  // px
  CARD_MIN_HEIGHT: 280,  // px
  
  // Spacing (in px)
  SPACE: {
    XS: 4,    // 0.25rem
    SM: 8,    // 0.5rem
    MD: 12,   // 0.75rem
    LG: 16,   // 1rem
    XL: 24,   // 1.5rem
    '2XL': 32,  // 2rem
    '3XL': 48,  // 3rem
  },
  
  // Touch Targets
  TOUCH_TARGET_MIN: 44,  // px
  TOUCH_TARGET_COMFORTABLE: 48,  // px
  ICON_BUTTON_SIZE: 40,  // px
  
  // Font Sizes (in px)
  FONT_SIZE: {
    XS: 12,    // 0.75rem
    SM: 14,    // 0.875rem
    BASE: 16,  // 1rem
    LG: 18,    // 1.125rem
    XL: 20,    // 1.25rem
    '2XL': 24,   // 1.5rem
    '3XL': 30,   // 1.875rem
  },
  
  // Z-index
  Z_INDEX: {
    BASE: 1,
    DROPDOWN: 10,
    STICKY: 20,
    FIXED: 30,
    MODAL_BACKDROP: 40,
    MODAL: 50,
    POPOVER: 60,
    TOOLTIP: 70,
  },
  
  // Border Radius (in px)
  RADIUS: {
    SM: 6,     // 0.375rem
    MD: 8,     // 0.5rem
    LG: 12,    // 0.75rem
    XL: 16,    // 1rem
    '2XL': 24,   // 1.5rem
    FULL: 9999,
  },
  
  // Transitions (in ms)
  TRANSITION: {
    FAST: 150,
    BASE: 200,
    SLOW: 300,
  },
  
  // Breakpoints (match Tailwind defaults)
  BREAKPOINT: {
    SM: 640,   // px
    MD: 768,   // px
    LG: 1024,  // px
    XL: 1280,  // px
    '2XL': 1536, // px
  },
} as const;

// Helper function to get CSS variable value
export function getCSSVar(varName: string): string {
  return `var(--${varName})`;
}

// Common CSS variable names
export const CSS_VARS = {
  // Heights
  HEADER_HEIGHT: 'header-height',
  BOTTOM_NAV_HEIGHT: 'bottom-nav-height',
  
  // Spacing
  SPACE_XS: 'space-xs',
  SPACE_SM: 'space-sm',
  SPACE_MD: 'space-md',
  SPACE_LG: 'space-lg',
  SPACE_XL: 'space-xl',
  SPACE_2XL: 'space-2xl',
  
  // Colors
  PRIMARY: 'primary',
  PRIMARY_FOREGROUND: 'primary-foreground',
  SECONDARY: 'secondary',
  BACKGROUND: 'background',
  FOREGROUND: 'foreground',
  MUTED: 'muted',
  MUTED_FOREGROUND: 'muted-foreground',
  BORDER: 'border',
  
  // Shadows
  SHADOW_SM: 'shadow-sm',
  SHADOW_MD: 'shadow-md',
  SHADOW_LG: 'shadow-lg',
  SHADOW_XL: 'shadow-xl',
} as const;

// Utility type for design tokens
export type DesignTokens = typeof DESIGN_TOKENS;
