"use client";

import React, { createContext, useState, useEffect, useCallback, useContext } from "react";
import { useRouter } from "next/navigation";
import { deleteAuthCookie } from "@/lib/auth-cookies";
import { apiGet, apiPost } from "@/lib/api-client";

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
  const router = useRouter();  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      // Using apiGet which will automatically handle 401s and token invalidation
      const userData = await apiGet("/api/user/me");
      setUser(userData.user);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
      // apiGet will automatically handle token invalidation on 401s,
      // but we'll still handle other errors by clearing the cookie and redirecting
      deleteAuthCookie();
      router.push('/auth/login');
    }
    setIsLoading(false);
  }, [router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const data = await apiPost("/api/auth/login", { email, password });
      await fetchUser();
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Login failed" 
      };
    }
  };
  const register = async (username: string, email: string, password: string) => {
    try {
      await apiPost("/api/auth/register", { 
        name: username, 
        email, 
        password 
      });
      
      // After successful registration, log the user in
      return await login(email, password);
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : "Registration failed" 
      };
    }
  };  const logout = async () => {
    try {
      await apiPost("/api/auth/logout");
      setUser(null);
      
      // Make sure to delete the cookie client-side as well
      deleteAuthCookie();
      
      // Redirect to login page
      router.push('/auth/login');
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      // Even if API fails, clear cookie and user state
      deleteAuthCookie();
      router.push('/auth/login');
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