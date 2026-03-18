/**
 * Bottom Nav Configuration
 * Navigation items definition
 */

import { Home, Users, Plus, Search, Menu, LucideIcon } from 'lucide-react';

export interface NavItemConfig {
  id: string;
  icon: LucideIcon;
  label: string;
}

export const NAV_ITEMS: NavItemConfig[] = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'groups', icon: Users, label: 'My Groups' },
  { id: 'publish', icon: Plus, label: 'Publish' },
  { id: 'products', icon: Search, label: 'My Listings' },
  { id: 'menu', icon: Menu, label: 'Menu' },
];
