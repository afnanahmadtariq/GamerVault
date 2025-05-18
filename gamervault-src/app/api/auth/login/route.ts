import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; 

const JWT_SECRET = process.env.JWT_SECRET || "";
const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

if (!JWT_SECRET) {
  console.error("JWT_SECRET environment variable is not defined");
  throw new Error("Please define the JWT_SECRET environment variable");
}

// Simple in-memory rate limiter
// In production, use Redis or another solution that works with serverless
const loginAttempts = new Map<string, { count: number, timestamp: number }>();

const RATE_LIMIT = 5000; // Maximum attempts (Bigger Number for testing)
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const userAttempts = loginAttempts.get(ip);
  
  // No previous attempts or window expired, reset counter
  if (!userAttempts || now - userAttempts.timestamp > RATE_LIMIT_WINDOW) {
    loginAttempts.set(ip, { count: 1, timestamp: now });
    return false;
  }
  
  // Increment attempt counter
  const newCount = userAttempts.count + 1;
  loginAttempts.set(ip, { count: newCount, timestamp: userAttempts.timestamp });
  
  // Check if limit exceeded
  return newCount > RATE_LIMIT;
}

// Helper for logging in development only
const devLog = (message: string, ...args: any[]) => {
  if (IS_DEVELOPMENT) {
    console.log(message, ...args);
  }
};

// Helper for consistent error responses
const errorResponse = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

export async function POST(req: NextRequest) {
  try {
    // Basic rate limiting
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    if (checkRateLimit(ip)) {
      return errorResponse("Too many login attempts, please try again later", 429);
    }

    await dbConnect();
    
    // Validate request body
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return errorResponse("Invalid request body", 400);
    }
    
    const { email, password } = body;
    devLog("Login attempt for email:", email);
    
    // Input validation
    if (!email) {
      return errorResponse("Email address is required", 400);
    }
    
    if (!password) {
      return errorResponse("Password is required", 400);
    }
    
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return errorResponse("Please provide a valid email address", 400);
    }

    // Find user and include password field for comparison
    const user = await User.findOne({ email }).select('+password');
    devLog("User found in DB:", user ? user.email : 'No user found');

    // Use consistent error message to prevent user enumeration
    if (!user || !user.password) {
      devLog("Login failed: User not found or password not set for", email);
      return errorResponse("Invalid email or password", 401);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    devLog("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      devLog("Login failed: Invalid password for", email);
      return errorResponse("Invalid email or password", 401);
    }

    try {
      // Create JWT token with user ID and minimal payload
      const token = sign(
        { 
          userId: user.id.toString(), 
          email: user.email,
          // Avoid putting sensitive data in JWT
        },
        JWT_SECRET,
        {
          expiresIn: "7d", // Token expires in 7 days
        }
      );

      const response = NextResponse.json({
        message: "Login successful",
        user: { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email, 
          image: user.image 
        },
      });

      // Set HTTP-only cookie in the response
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: false, // No longer requiring HTTPS even in production
        sameSite: "strict",      // Stricter same-site policy
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      devLog("Login successful, token set in cookie for user:", user.email);
      return response;
    } catch (jwtError) {
      console.error("JWT signing error:", jwtError);
      return errorResponse("Authentication error", 500);
    }
  } catch (error) {
    console.error("Login error:", error);
    return errorResponse("Internal server error", 500);
  }
}
