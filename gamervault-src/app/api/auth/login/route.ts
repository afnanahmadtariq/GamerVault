import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken"; // Using jsonwebtoken for signing
import bcrypt from "bcryptjs"; // Using bcryptjs for password hashing
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Assuming you have a User model

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Please define the JWT_SECRET environment variable");
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    console.log("Login attempt for email:", email); // Log email

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });
    console.log("User found in DB:", user ? user.email : 'No user found'); // Log if user was found

    if (!user || !user.password) {
      console.log("Login failed: User not found or password not set for", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid); // Log password validation result

    if (!isPasswordValid) {
      console.log("Login failed: Invalid password for", email);
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json(
        { error: "Internal Server Error - Configuration issue" },
        { status: 500 }
      );
    }

    // Create JWT token
    const token = sign(
      { userId: user._id, email: user.email, name: user.name },
      JWT_SECRET,
      {
        expiresIn: "7d", // Token expires in 7 days
      }
    );

    const response = NextResponse.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email, image: user.image },
    });

    // Set cookie in the response
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
