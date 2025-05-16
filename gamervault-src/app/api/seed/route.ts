import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

/**
 * This script creates a test user in the database.
 * Usage:
 * - Create a file in app/api/seed/route.ts
 * - Copy this code
 * - Make a GET request to /api/seed
 * - IMPORTANT: Remove this file in production!
 */

export async function GET() {
  try {
    await connectToDatabase();
    
    // Clear existing users (DANGEROUS in production!)
    await User.deleteMany({});
    
    // Create a test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      image: "/placeholder.svg?height=40&width=40&text=TU",
    });
    
    await testUser.save();
    
    return new Response(JSON.stringify({ 
      message: "Database seeded successfully",
      testUser: {
        email: testUser.email,
        password: "password123", // NEVER include real passwords in responses!
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      }
    });
  } catch (error) {
    console.error("Seed error:", error);
    return new Response(JSON.stringify({ 
      error: "Failed to seed database" 
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      }
    });
  }
}
