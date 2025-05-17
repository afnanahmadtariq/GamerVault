"use client";

// Import the hook from the auth provider
import { useAuth as useAuthContext } from "@/components/auth-provider";

// Re-export the hook for backward compatibility
export function useAuth() {
  return useAuthContext();
}