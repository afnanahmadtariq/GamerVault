"use client";

import { deleteAuthCookie } from "./auth-cookies";

/**
 * Utility for making authenticated API requests with automatic token invalidation handling
 */
export async function apiRequest<T = any>(
  url: string, 
  options?: RequestInit
): Promise<T> {
  try {
    // Default options with credentials included
    const fetchOptions: RequestInit = {
      credentials: 'include',
      ...options,
    };

    // Make the request
    const response = await fetch(url, fetchOptions);

    // Handle unauthorized responses
    if (response.status === 401) {
      // Delete auth cookie
      deleteAuthCookie();
      
      // Redirect to login if in browser context
      if (typeof window !== 'undefined') {
        const currentPath = window.location.pathname;
        window.location.href = `/auth/login?redirect=${encodeURIComponent(currentPath)}`;
      }
      
      throw new Error('Authentication failed');
    }

    // For other error responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API request failed with status ${response.status}`);
    }

    // Return successful response data
    return await response.json();
  } catch (error) {
    console.error(`API request error for ${url}:`, error);
    throw error;
  }
}

/**
 * GET request helper with auth handling
 */
export function apiGet<T = any>(url: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'GET' });
}

/**
 * POST request helper with auth handling
 */
export function apiPost<T = any>(url: string, data?: any, options?: RequestInit): Promise<T> {
  const fetchOptions: RequestInit = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  };
  
  return apiRequest<T>(url, fetchOptions);
}

/**
 * PUT request helper with auth handling
 */
export function apiPut<T = any>(url: string, data?: any, options?: RequestInit): Promise<T> {
  const fetchOptions: RequestInit = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  };
  
  return apiRequest<T>(url, fetchOptions);
}

/**
 * DELETE request helper with auth handling
 */
export function apiDelete<T = any>(url: string, options?: RequestInit): Promise<T> {
  return apiRequest<T>(url, { ...options, method: 'DELETE' });
}
