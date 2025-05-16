import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // If the user is authenticated, continue
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized({ token }) {
        // Check if the user is authenticated
        return !!token;
      },
    },
    pages: {
      signIn: "/auth/login",
    },
  }
);

// Protect these routes that require authentication
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/inventory/:path*",
    "/achievements/:path*",
    "/leaderboard/:path*",
    "/marketplace/:path*",
    "/nft/:path*",
    "/security/:path*",
    "/settings/:path*",
    "/social/:path*",
    "/wallet/:path*",
    "/create/:path*",
    "/analytics/:path*",
  ],
};