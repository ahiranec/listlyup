import { useState, useEffect } from 'react';
import type { CurrentUser } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export type LoginMethod = 'google' | 'facebook' | 'apple' | 'superadmin' | 'email' | null;

interface UseCurrentUserProps {
  isAuthenticated?: boolean;
}

const mapSupabaseUser = (sessionUser: any): CurrentUser => {
  return {
    id: sessionUser.id,
    email: sessionUser.email || '',
    name: sessionUser.user_metadata?.full_name || sessionUser.user_metadata?.name || sessionUser.email?.split('@')[0] || 'User',
    avatarUrl: sessionUser.user_metadata?.avatar_url || '',
    isAuthenticated: true,
    groupIds: [], // Empty initially for minimal impact
    role: sessionUser.user_metadata?.role || (sessionUser.email === 'ahirane@gmail.com' ? 'super_admin' : 'user'), // Map super_admin by email or metadata
  };
};

export function useCurrentUser(props?: UseCurrentUserProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [loginMethod, setLoginMethod] = useState<LoginMethod>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setIsLoading(false);
      return;
    }

    // Capture initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setCurrentUser(mapSupabaseUser(session.user));
      } else {
        setCurrentUser(null);
      }
      setIsLoading(false);
    });

    // Listen to auth changes (sign in, sign out, etc)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setCurrentUser(mapSupabaseUser(session.user));
      } else {
        setCurrentUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSetLoginMethod = (method: LoginMethod) => {
    setLoginMethod(method);
    // Persist logic could be re-added here if strictly necessary for local storage
  };

  const clearUser = async () => {
    setLoginMethod(null);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setCurrentUser(null);
  };

  return {
    currentUser,
    loginMethod,
    setLoginMethod: handleSetLoginMethod,
    clearUser,
    userId: currentUser?.id || '',
    isLoading
  };
}
