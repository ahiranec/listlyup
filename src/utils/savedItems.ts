/**
 * Saved Items Utility
 * Maneja persistencia de items guardados con localStorage
 * Premium Design 2025 - ListlyUp
 */

export interface SavedItem {
  id: string;
  title: string;
  price?: string;
  image: string;
  location?: string;
  type?: string;
  savedAt: Date;
}

const STORAGE_KEY = 'listlyup_saved_items';
const STORAGE_VERSION = '1.0';

// ==================== CORE FUNCTIONS ====================

/**
 * Get all saved items
 */
export function getSavedItems(): SavedItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    
    const parsed = JSON.parse(data);
    
    // Convert date strings back to Date objects
    return parsed.map((item: any) => ({
      ...item,
      savedAt: new Date(item.savedAt),
    }));
  } catch (error) {
    console.error('Error loading saved items:', error);
    return [];
  }
}

/**
 * Save an item
 */
export function saveItem(item: Omit<SavedItem, 'savedAt'>): boolean {
  try {
    const items = getSavedItems();
    
    // Check if already saved
    if (items.some(i => i.id === item.id)) {
      return false; // Already saved
    }
    
    const newItem: SavedItem = {
      ...item,
      savedAt: new Date(),
    };
    
    items.unshift(newItem); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    
    return true;
  } catch (error) {
    console.error('Error saving item:', error);
    return false;
  }
}

/**
 * Remove a saved item
 */
export function unsaveItem(itemId: string): boolean {
  try {
    const items = getSavedItems();
    const filtered = items.filter(i => i.id !== itemId);
    
    if (filtered.length === items.length) {
      return false; // Item wasn't saved
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    console.error('Error removing saved item:', error);
    return false;
  }
}

/**
 * Check if an item is saved
 */
export function isItemSaved(itemId: string): boolean {
  const items = getSavedItems();
  return items.some(i => i.id === itemId);
}

/**
 * Toggle save status
 */
export function toggleSaveItem(item: Omit<SavedItem, 'savedAt'>): boolean {
  if (isItemSaved(item.id)) {
    unsaveItem(item.id);
    return false; // Now unsaved
  } else {
    saveItem(item);
    return true; // Now saved
  }
}

// ==================== STATS ====================

/**
 * Get saved items count
 */
export function getSavedItemsCount(): number {
  return getSavedItems().length;
}

/**
 * Clear all saved items
 */
export function clearAllSavedItems(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing saved items:', error);
    return false;
  }
}

// ==================== EXPORT FOR DEBUGGING ====================

export function exportSavedItems(): string {
  return JSON.stringify(getSavedItems(), null, 2);
}

export function importSavedItems(jsonString: string): boolean {
  try {
    const items = JSON.parse(jsonString);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error('Error importing saved items:', error);
    return false;
  }
}