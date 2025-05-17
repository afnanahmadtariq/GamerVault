"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Using js-cookie for cookie management

// Define a user type (adjust as needed)
interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    const token = Cookies.get("token");
    if (token) {
      try {
        // In a real app, you'd verify the token with the backend and get user info
        // For now, we'll assume the token itself contains basic user info or we fetch it
        // This is a placeholder. You'll need an API endpoint to get the current user.
        const res = await fetch("/api/user/me"); // Example endpoint
        if (res.ok) {
          const userData = await res.json();
          setUser(userData.user);
        } else {
          Cookies.remove("token");
          setUser(null);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
        Cookies.remove("token");
        setUser(null);
      }
    } else {
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
      });

      const data = await response.json();

      if (!response.ok || !data.token) {
        return { success: false, error: data.error || "Login failed" };
      }

      Cookies.set("token", data.token, { expires: 7 }); // Store token in cookie
      await fetchUser(); // Refresh user state
      router.push("/dashboard"); // Redirect to dashboard or desired page
      return { success: true };
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || "Registration failed" };
      }
      // Optionally, log in the user directly after registration
      return await login(email, password);
    } catch (error) {
      return { success: false, error: "An unexpected error occurred" };
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/auth/login");
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    fetchUser, // expose fetchUser if manual refresh is needed
  };
}