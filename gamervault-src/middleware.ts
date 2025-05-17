import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose"; // Using jose for JWT verification

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    if (isProtectedRoute(req.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/auth/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    await jwtVerify(token, JWT_SECRET);
    return NextResponse.next();
  } catch (err) {
    if (isProtectedRoute(req.nextUrl.pathname)) {
      const response = NextResponse.redirect(new URL("/auth/login", req.url));
      response.cookies.delete("token"); // Clear invalid token
      return response;
    }
    const response = NextResponse.next();
    response.cookies.delete("token"); // Clear invalid token
    return response;
  }
}

function isProtectedRoute(pathname: string) {
  const protectedRoutes = [
    "/dashboard",
    "/inventory",
    "/achievements",
    "/leaderboard",
    "/marketplace",
    "/nft", // Assuming /nft/* should also be protected
    "/security",
    "/settings",
    "/social",
    "/wallet",
    "/create",
    "/analytics",
  ];
  return protectedRoutes.some((route) => pathname.startsWith(route));
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - auth/login
     * - auth/register
     */
    "/((?!api|_next/static|_next/image|favicon.ico|auth/login|auth/register).*)",
  ],
};