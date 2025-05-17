import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User"; // Assuming you have a User model

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

if (!JWT_SECRET && process.env.NODE_ENV !== 'test') { // Allow missing secret in test for simplicity
  throw new Error("Please define the JWT_SECRET environment variable");
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    await dbConnect();
    const { payload } = await jwtVerify(token, JWT_SECRET);

    if (!payload.userId) {
      return NextResponse.json({ error: "Invalid token payload" }, { status: 401 });
    }

    const user = await User.findById(payload.userId).select("-password"); // Exclude password

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email, image: user.image } });
  } catch (error) {
    console.error("Error fetching user:", error);
    // If token is invalid or expired, jwtVerify will throw an error
    // Type check for error with a code property
    if (error instanceof Error && 'code' in error && 
        (error.code === 'ERR_JWT_EXPIRED' || error.code === 'ERR_JWS_INVALID' || error.code === 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED')) {
      const response = NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
      response.cookies.delete("token"); // Clear the invalid token
      return response;
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
