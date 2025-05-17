import { NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Make sure JWT_SECRET is properly encoded
const JWT_SECRET_RAW = process.env.JWT_SECRET || "";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

/**
 * Extracts user ID from the authentication token in the request
 * @param req NextRequest object
 * @returns userId if authenticated, null otherwise
 */
export async function getUserIdFromRequest(req: NextRequest): Promise<string | null> {
  try {
    const token = req.cookies.get("token")?.value;
    
    if (!token) {
      return null;
    }
    
    const { payload } = await jwtVerify(token, JWT_SECRET);
    
    if (!payload.userId) {
      return null;
    }
    
    return payload.userId as string;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
