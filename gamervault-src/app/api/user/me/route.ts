import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; 

// Make sure JWT_SECRET is properly encoded
const JWT_SECRET_RAW = process.env.JWT_SECRET || "";
const JWT_SECRET = new TextEncoder().encode(JWT_SECRET_RAW);

if (!JWT_SECRET_RAW && process.env.NODE_ENV !== 'test') {
  console.error("JWT_SECRET environment variable is not defined");
  throw new Error("Please define the JWT_SECRET environment variable");
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    console.log("No token found in request cookies");
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();
      try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      console.log("Token verified, payload:", payload);

      if (!payload.userId) {
        console.log("Invalid token payload - missing userId:", payload);
        // Clear invalid token cookie
        const response = NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
        response.cookies.delete("token");
        return response;
      }

      const user = await User.findById(payload.userId).select("-password");

      if (!user) {
        console.log(`User not found with id: ${payload.userId}`);
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      console.log(`User found: ${user.email}`);
      return NextResponse.json({ 
        user: { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email, 
          image: user.image || "/placeholder-user.jpg" 
        } 
      });
    } catch (jwtError) {
      console.error("JWT verification error:", jwtError);
      // If token is invalid or expired
      const response = NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      response.cookies.delete("token"); // Clear the invalid token
      return response;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
