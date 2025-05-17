import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;
    
    console.log('Register request:', { name, email, passwordLength: password?.length });

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (name.length < 3) {
      return NextResponse.json(
        { error: 'Name must be at least 3 characters long' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    try {
      await dbConnect();
      console.log("Connected to MongoDB successfully");
    } catch (dbError) {
      console.error("MongoDB connection error:", dbError);
      return NextResponse.json(
        { error: 'Database connection error. Please try again later.' },
        { status: 500 }
      );
    }

    // Check if user already exists
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        console.log("Registration attempt with existing email:", email);
        return NextResponse.json(
          { error: 'User with this email already exists' },
          { status: 400 }
        );
      }

      // Create new user
      const user = new User({
        name,
        email,
        password,
        image: '/placeholder-user.jpg', // Add default placeholder image
      });      await user.save();
      console.log("User created successfully:", { id: user.id, name: user.name, email: user.email });// Remove password from response
      const userResponse = {
        id: user.id.toString(), // Use .id instead of ._id for proper typing
        name: user.name,
        email: user.email,
        image: user.image,
      };

      return NextResponse.json(
        { message: 'User registered successfully', user: userResponse },
        { status: 201 }
      );
    } catch (mongoError) {
      console.error('MongoDB operation error:', mongoError);
      return NextResponse.json(
        { error: 'Error creating user account. Please try again later.' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Registration error:', error);
    // Return more detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Error registering user: ${errorMessage}` },
      { status: 500 }
    );
  }
}