/**
 * Notifications Context (SCOPED)
 * Manages notification preferences
 * Only used in Settings > Notifications page
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NotificationSettings, DEFAULT_SETTINGS } from '../types';

interface NotificationsContextValue {
  notifications: NotificationSettings;
  isLoading: boolean;
  updateNotifications: (updates: Partial<NotificationSettings>) => void;
  updatePushNotifications: (updates: Partial<NotificationSettings['push']>) => void;
  updateEmailNotifications: (updates: Partial<NotificationSettings['email']>) => void;
  updateInAppNotifications: (updates: Partial<NotificationSettings['inApp']>) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

const STORAGE_KEY = 'listlyup_notification_settings';

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationSettings>(
    DEFAULT_SETTINGS.notifications
  );
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setNotifications(JSON.parse(saved));
        }
      } catch (error) {
        console.error('Failed to load notification settings:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Auto-save
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
    }
  }, [notifications, isLoading]);

  const updateNotifications = (updates: Partial<NotificationSettings>) => {
    setNotifications(prev => ({ ...prev, ...updates }));
  };

  const updatePushNotifications = (updates: Partial<NotificationSettings['push']>) => {
    setNotifications(prev => ({
      ...prev,
      push: { ...prev.push, ...updates },
    }));
  };

  const updateEmailNotifications = (updates: Partial<NotificationSettings['email']>) => {
    setNotifications(prev => ({
      ...prev,
      email: { ...prev.email, ...updates },
    }));
  };

  const updateInAppNotifications = (updates: Partial<NotificationSettings['inApp']>) => {
    setNotifications(prev => ({
      ...prev,
      inApp: { ...prev.inApp, ...updates },
    }));
  };

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        isLoading,
        updateNotifications,
        updatePushNotifications,
        updateEmailNotifications,
        updateInAppNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationsProvider');
  }
  return context;
}
