import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify, JWTPayload } from "jose";

// Ensure JWT_SECRET is properly defined
const JWT_SECRET_RAW = process.env.JWT_SECRET || "";

// Only create the text encoder instance once, outside the middleware function for better performance
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

// Check for JWT_SECRET
if (!JWT_SECRET_RAW && process.env.NODE_ENV !== 'test') {
  console.error("CRITICAL: JWT_SECRET environment variable is not defined or is empty in middleware. This is a security risk.");
  // For a middleware, directly throwing might halt too many requests.
  // Consider how your application should behave - perhaps return a generic error response.
  // However, to be consistent with other checks and highlight the severity:
  throw new Error("JWT_SECRET is not configured properly in middleware.");
} else if (!JWT_SECRET_RAW && process.env.NODE_ENV === 'test') {
  console.warn("JWT_SECRET environment variable is not defined or empty in middleware (running in test environment).");
}

// Define protected routes only once, outside the middleware function
const PROTECTED_ROUTES = [
  "/dashboard",
  "/inventory",
  "/achievements",
  "/leaderboard",
  "/marketplace",
  "/nft",
  "/security",
  "/settings",
  "/social",
  "/wallet",
  "/create",
  "/analytics",
];

// Define public assets that should never be checked in a separate array
const PUBLIC_ASSETS = [
  "/api",
  "/_next/static",
  "/_next/image",
  "/favicon.ico",
  "/logo",
  "/images",
  "/fonts",
  "/robots.txt",
  "/manifest.json",
];

// Cache for token verification to reduce overhead on multiple requests
// This is a simple in-memory cache, for production consider using a more robust solution
const tokenCache = new Map<string, { userId: string; expires: number }>();

/**
 * Checks if the provided pathname is a protected route requiring authentication
 */
function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Checks if the provided pathname is a public asset that should bypass checks
 */
function isPublicAsset(pathname: string): boolean {
  return PUBLIC_ASSETS.some((asset) => pathname.startsWith(asset));
}

/**
 * Verifies a JWT token and returns the payload if valid, null otherwise
 */
async function verifyToken(token: string): Promise<JWTPayload | null> {
  try {
    // Check if token is in cache first
    const cached = tokenCache.get(token);
    if (cached && cached.expires > Date.now()) {
      return { userId: cached.userId };
    }

    const { payload } = await jwtVerify(token, JWT_SECRET);

    // Add to cache with expiration (5 minutes)
    if (payload.userId) {
      tokenCache.set(token, {
        userId: payload.userId as string,
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes cache
      });
    }

    return payload;
  } catch (err) {
    // Clean up cache entry if verification fails
    tokenCache.delete(token);
    return null;
  }
}

/**
 * Middleware function to handle authentication and routing
 */
export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Skip checks for public assets
  if (isPublicAsset(pathname)) {
    return NextResponse.next();
  }

  // User is explicitly accessing login/register pages
  if (pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register")) {
    // If user already has a valid token, redirect to dashboard
    const token = req.cookies.get("token")?.value;
    if (token) {
      const payload = await verifyToken(token);
      if (payload) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }
    return NextResponse.next();
  }

  const token = req.cookies.get("token")?.value;

  // No token, check if route is protected
  if (!token) {
    if (isProtectedRoute(pathname)) {
      const url = new URL("/auth/login", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Verify token
  const payload = await verifyToken(token);

  if (!payload) {
    // Token is invalid - clear it
    const response = isProtectedRoute(pathname)
      ? NextResponse.redirect(new URL("/auth/login", req.url))
      : NextResponse.next();

    // Clear the invalid token
    response.cookies.delete("token");
    return response;
  }

  // Token is valid, proceeding
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except explicitly excluded ones
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};