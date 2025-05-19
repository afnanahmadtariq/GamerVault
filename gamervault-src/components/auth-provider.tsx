"use client";

import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<{ success: boolean; error?: string }>;
  fetchUser: () => Promise<void>;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  register: async () => ({ success: false }),
  logout: async () => ({ success: false }),
  fetchUser: async () => {},
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/user/me", { 
        credentials: "include",
        cache: "no-store"
      });

      if (res.ok) {
        const userData = await res.json();
        setUser(userData.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Login failed" };
      }

      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };
  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }

      return await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      return { success: false, error: "An unexpected error occurred" };
    }
  };
  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include"
      });
      setUser(null);
      // No need to navigate here, let the component handle navigation
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error: "Failed to logout" };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Export hook for easy consumption throughout the app
export const useAuth = () => useContext(AuthContext);