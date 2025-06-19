
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'employee' | 'admin') => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string, role: 'employee' | 'admin'): Promise<boolean> => {
    // Simulate API call
    console.log('Login attempt:', { email, password, role });
    
    // For demo purposes, accept any email/password combination
    const mockUser: User = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email,
      role,
      profilePicture: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=0891b2&color=fff`
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API call
    console.log('Signup attempt:', { name, email, password });
    
    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'employee',
      profilePicture: `https://ui-avatars.com/api/?name=${name}&background=0891b2&color=fff`
    };

    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
