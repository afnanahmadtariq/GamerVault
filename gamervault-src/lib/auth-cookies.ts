/**
 * Helper functions for managing authentication cookies
 */

/**
 * Deletes the authentication token cookie
 */
export function deleteAuthCookie(): void {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict; Secure";
}

/**
 * Checks if the authentication token cookie exists
 */
export function hasAuthCookie(): boolean {
  return document.cookie.split(';').some(cookie => cookie.trim().startsWith('token='));
}

/**
 * Set an authentication token cookie with proper security settings
 * @param token The token value to set
 * @param expiresInDays Number of days until expiration (default: 7)
 */
export function setAuthCookie(token: string, expiresInDays = 7): void {
  const date = new Date();
  date.setTime(date.getTime() + (expiresInDays * 24 * 60 * 60 * 1000));
  
  document.cookie = `token=${token}; expires=${date.toUTCString()}; path=/; SameSite=Strict; Secure`;
}
