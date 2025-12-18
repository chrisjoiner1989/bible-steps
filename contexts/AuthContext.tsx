'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface AuthUser {
  id: string;
  email: string;
  displayName: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (email: string, password: string, displayName: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'bible-steps-auth';
const USERS_STORAGE_KEY = 'bible-steps-users';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = () => {
      try {
        const authData = localStorage.getItem(AUTH_STORAGE_KEY);
        if (authData) {
          const userData = JSON.parse(authData);
          setUser(userData);
        }
      } catch (error) {
        console.error('Failed to load auth data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const getUsers = (): Record<string, { password: string; displayName: string }> => {
    try {
      const usersData = localStorage.getItem(USERS_STORAGE_KEY);
      return usersData ? JSON.parse(usersData) : {};
    } catch {
      return {};
    }
  };

  const saveUsers = (users: Record<string, { password: string; displayName: string }>) => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = getUsers();
      const userRecord = users[email.toLowerCase()];

      if (!userRecord || userRecord.password !== password) {
        return false;
      }

      const userData: AuthUser = {
        id: email.toLowerCase(),
        email: email.toLowerCase(),
        displayName: userRecord.displayName,
      };

      setUser(userData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const register = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<boolean> => {
    try {
      const users = getUsers();
      const emailLower = email.toLowerCase();

      // Check if user already exists
      if (users[emailLower]) {
        return false;
      }

      // Save new user
      users[emailLower] = { password, displayName };
      saveUsers(users);

      // Auto-login after registration
      const userData: AuthUser = {
        id: emailLower,
        email: emailLower,
        displayName,
      };

      setUser(userData);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
