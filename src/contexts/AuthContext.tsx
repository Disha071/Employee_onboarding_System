import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  profilePicture?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string, role: 'employee' | 'admin') => Promise<{ success: boolean; error?: string }>;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<AuthUser>) => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [pendingRole, setPendingRole] = useState<'employee' | 'admin' | null>(null);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state change:', event, session);
        setSession(session);
        if (session?.user) {
          await loadUserProfile(session.user);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session:', session);
      setSession(session);
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: User) => {
    try {
      // Use pending role from login if available, otherwise check user metadata
      const role = pendingRole || authUser.user_metadata?.role || 'employee';
      console.log('Loading user profile with role:', role);
      
      // Clear pending role after using it
      if (pendingRole) {
        setPendingRole(null);
      }
      
      // For employees, verify they exist in employee_accounts
      if (role === 'employee') {
        const { data: employeeAccount, error: checkError } = await supabase
          .from('employee_accounts')
          .select('name, email')
          .eq('email', authUser.email)
          .maybeSingle();

        // Only treat this as an error if it's not a "no rows returned" error
        if (checkError && checkError.code !== 'PGRST116') {
          console.error('Database error checking employee account:', checkError);
          return;
        }

        if (!employeeAccount) {
          console.log('Employee not found in accounts, signing out');
          // Employee not found in accounts, sign them out
          await supabase.auth.signOut();
          return;
        }
      }

      // Load profile picture if exists
      let profilePicture = authUser.user_metadata?.avatar_url;
      
      if (role === 'employee') {
        const { data: profile } = await supabase
          .from('employee_profiles')
          .select('profile_picture_url')
          .eq('employee_email', authUser.email)
          .single();
        
        if (profile?.profile_picture_url) {
          profilePicture = profile.profile_picture_url;
        }
      }

      const userProfile = {
        id: authUser.id,
        name: authUser.user_metadata?.name || authUser.email?.split('@')[0] || 'User',
        email: authUser.email || '',
        role,
        profilePicture
      };

      console.log('Setting user profile:', userProfile);
      setUser(userProfile);
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(null);
    }
  };

  const login = async (email: string, password: string, role: 'employee' | 'admin'): Promise<{ success: boolean; error?: string }> => {
    try {
      // Store the role before login to use in loadUserProfile
      setPendingRole(role);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setPendingRole(null); // Clear pending role on error
        return { success: false, error: error.message };
      }

      // Update user metadata with role
      if (data.user) {
        console.log('Updating user metadata with role:', role);
        await supabase.auth.updateUser({
          data: { role }
        });
      }

      return { success: true };
    } catch (error) {
      setPendingRole(null); // Clear pending role on error
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role: 'admin' // Default to admin for signup
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const updateProfile = (updates: Partial<AuthUser>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
  };

  const resetPassword = async (email: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const value = {
    user,
    session,
    loading,
    login,
    signup,
    logout,
    updateProfile,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
