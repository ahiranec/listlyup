/**
 * Data Context (SCOPED)
 * Manages saved searches and storage info
 * Only used in Settings > Data pages
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SavedSearch, StorageInfo, DEFAULT_SETTINGS } from '../types';
import { toast } from 'sonner@2.0.3';

interface DataContextValue {
  savedSearches: SavedSearch[];
  storage: StorageInfo;
  isLoading: boolean;
  
  createSavedSearch: (searchData: Omit<SavedSearch, 'id' | 'createdAt' | 'notifyEnabled'>) => void;
  deleteSavedSearch: (id: string) => void;
  toggleSearchAlert: (id: string) => void;
  clearCache: () => Promise<void>;
  clearImageCache: () => Promise<void>;
  downloadData: () => Promise<void>;
}

const DataContext = createContext<DataContextValue | undefined>(undefined);

const STORAGE_KEY = 'listlyup_data_settings';

export function DataProvider({ children }: { children: ReactNode }) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [storage, setStorage] = useState<StorageInfo>(DEFAULT_SETTINGS.storage);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const data = JSON.parse(saved);
          setSavedSearches(data.savedSearches || DEFAULT_SETTINGS.savedSearches);
          setStorage(data.storage || DEFAULT_SETTINGS.storage);
        } else {
          setSavedSearches(DEFAULT_SETTINGS.savedSearches);
          setStorage(DEFAULT_SETTINGS.storage);
        }
      } catch (error) {
        console.error('Failed to load data settings:', error);
        setSavedSearches(DEFAULT_SETTINGS.savedSearches);
        setStorage(DEFAULT_SETTINGS.storage);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Auto-save
  useEffect(() => {
    if (!isLoading) {
      const data = { savedSearches, storage };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  }, [savedSearches, storage, isLoading]);

  const createSavedSearch = (searchData: Omit<SavedSearch, 'id' | 'createdAt' | 'notifyEnabled'>) => {
    const newSearch: SavedSearch = {
      ...searchData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      notifyEnabled: false,
    };
    setSavedSearches(prev => [...prev, newSearch]);
    toast.success('Saved search created');
  };

  const deleteSavedSearch = (id: string) => {
    setSavedSearches(prev => prev.filter(s => s.id !== id));
    toast.success('Saved search deleted');
  };

  const toggleSearchAlert = (id: string) => {
    const search = savedSearches.find(s => s.id === id);
    if (!search) return;
    
    const newState = !search.notifyEnabled;
    setSavedSearches(prev => prev.map(s => 
      s.id === id 
        ? { ...s, notifyEnabled: newState } 
        : s
    ));
    
    toast.success(
      newState 
        ? `Alerts enabled for "${search.query}"` 
        : `Alerts disabled for "${search.query}"`
    );
  };

  const clearCache = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setStorage(prev => ({
      ...prev,
      cacheSize: 0,
      total: prev.imageSize + prev.dataSize,
    }));
    toast.success('Cache cleared');
  };

  const clearImageCache = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    setStorage(prev => ({
      ...prev,
      imageSize: 0,
      total: prev.cacheSize + prev.dataSize,
    }));
    toast.success('Image cache cleared');
  };

  const downloadData = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Data export started. Download will begin shortly.');
    // TODO: Generate and download JSON file
  };

  return (
    <DataContext.Provider
      value={{
        savedSearches,
        storage,
        isLoading,
        createSavedSearch,
        deleteSavedSearch,
        toggleSearchAlert,
        clearCache,
        clearImageCache,
        downloadData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}