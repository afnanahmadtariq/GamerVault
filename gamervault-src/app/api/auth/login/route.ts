import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; 
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; 

const JWT_SECRET = process.env.JWT_SECRET || "";

if (!JWT_SECRET) {
  console.error("JWT_SECRET environment variable is not defined");
  throw new Error("Please define the JWT_SECRET environment variable");
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    console.log("Login attempt for email:", email);    // Better validation with specific error messages
    if (!email) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }
    
    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }
    
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email }).select('+password');
    console.log("User found in DB:", user ? user.email : 'No user found');

    if (!user || !user.password) {
      console.log("Login failed: User not found or password not set for", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Login failed: Invalid password for", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    try {
      // Create JWT token with user ID as string
      const token = sign(
        { userId: user.id.toString(), email: user.email, name: user.name },
        JWT_SECRET,
        {
          expiresIn: "7d", // Token expires in 7 days
        }
      );

      const response = NextResponse.json({
        message: "Login successful",
        token,
        user: { 
          id: user.id.toString(), 
          name: user.name, 
          email: user.email, 
          image: user.image 
        },
      });

      // Set cookie in the response
      response.cookies.set("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      console.log("Login successful, token set in cookie for user:", user.email);
      return response;
    } catch (jwtError) {
      console.error("JWT signing error:", jwtError);
      return NextResponse.json(
        { error: "Error creating authentication token" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
