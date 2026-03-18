/**
 * Profile Context
 * Centralized state management for Profile data
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProfileData, DEFAULT_PROFILE } from '../components/profile/types';

interface ProfileContextValue {
  profile: ProfileData;
  updateProfile: (updates: Partial<ProfileData>) => void;
  saveProfile: () => Promise<void>;
  resetProfile: () => void;
  isLoading: boolean;
  hasChanges: boolean;
}

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

const STORAGE_KEY = 'listlyup_profile_data';

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    // Load from localStorage on mount
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load profile from localStorage:', error);
    }
    return DEFAULT_PROFILE;
  });

  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateProfile = (updates: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      
      // TODO: Save to backend API when ready
      // await api.updateProfile(profile);
      
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save profile:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetProfile = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    setHasChanges(false);
  };

  // Auto-save to localStorage when profile changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasChanges) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        } catch (error) {
          console.error('Auto-save failed:', error);
        }
      }
    }, 1000); // 1 second debounce

    return () => clearTimeout(timer);
  }, [profile, hasChanges]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        saveProfile,
        resetProfile,
        isLoading,
        hasChanges,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
