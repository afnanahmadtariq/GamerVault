import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import mongoose from 'mongoose';

const IS_DEVELOPMENT = process.env.NODE_ENV === "development";

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

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (e) {
      return errorResponse("Invalid request body", 400);
    }
    
    const { name, email, password } = body;
    
    devLog('Register request:', { name, email, passwordLength: password?.length });

    // Validate required fields
    if (!name || !email || !password) {
      return errorResponse('Name, email, and password are required', 400);
    }

    // Validate name length
    if (name.length < 3 || name.length > 50) {
      return errorResponse('Name must be between 3 and 50 characters long', 400);
    }

    // Validate password strength
    if (password.length < 8) {
      return errorResponse('Password must be at least 8 characters long', 400);
    }

    // Check for password strength (at least one number and one letter)
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      return errorResponse('Password must contain at least one letter and one number', 400);
    }
    
    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return errorResponse('Please provide a valid email address', 400);
    }    // Connect to database
    try {
      await dbConnect();
      devLog("Connected to MongoDB successfully");
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      return errorResponse('Database connection error. Please try again later.', 500);
    }

    try {
      // Check if user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        devLog("Registration attempt with existing email:", email);
        // Use vague message to prevent user enumeration
        return errorResponse('An account with this email already exists', 400);
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        image: '/placeholder-user.jpg', // Add default placeholder image
      });
      
      await user.save();
      
      // Create additional user-related records here if needed
      // For example, automatically create an empty user profile
      
      devLog("User created successfully:", { id: user.id, name: user.name, email: user.email });
      
      // Remove sensitive data from response
      const userResponse = {
        id: user.id.toString(),
        name: user.name,
        email: user.email,
        image: user.image,
      };

      return NextResponse.json(
        { message: 'User registered successfully', user: userResponse },
        { status: 201 }
      );    } catch (mongoError) {
      console.error('MongoDB operation error:', mongoError);
      
      // Check for duplicate key error (another way to detect existing user)
      if (mongoError instanceof mongoose.Error.ValidationError) {
        return errorResponse('Validation error: Please check your input', 400);
      } else if ((mongoError as any).code === 11000) { // Duplicate key error code
        return errorResponse('An account with this email already exists', 400);
      }
      
      return errorResponse('Error creating user account. Please try again later.', 500);
    }
  } catch (error) {
    console.error('Registration error:', error);
    return errorResponse('Error registering user. Please try again later.', 500);
  }
}