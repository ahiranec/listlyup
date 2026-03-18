/**
 * Application Constants
 */

export const APP_NAME = "ListlyUp";

export const NAVIGATION_TABS = {
  HOME: "home",
  GROUPS: "groups",
  PUBLISH: "publish",
  PRODUCTS: "products",
  MENU: "menu",
} as const;

export const PRODUCT_TYPES = {
  SALE: "sale",
  TRADE: "trade",
} as const;

export const PRODUCT_CONDITIONS = {
  NEW: "New",
  LIKE_NEW: "Like New",
  USED: "Used",
} as const;

export const VISIBILITY_OPTIONS = {
  PUBLIC: "Public",
  GROUP: "Group",
} as const;

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 100,
  STEP: 5,
} as const;

export const ANIMATIONS = {
  STAGGER_DELAY: 50, // milliseconds
  LOADING_DURATION: 800, // milliseconds
} as const;

export const TOAST_MESSAGES = {
  FILTERS_APPLIED: "Filters applied successfully",
  NOTIFICATIONS_INFO: "You have 9 new notifications",
  PROFILE_INFO: "Opening profile",
} as const;

export const ROUTES = {
  HOME: "/",
  PROFILE: "/profile",
  NOTIFICATIONS: "/notifications",
  PRODUCT_DETAILS: "/product",
} as const;
