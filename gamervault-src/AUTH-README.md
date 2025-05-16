# GamerVault - Authentication System

This document provides information about the authentication system implemented in the GamerVault application.

## Setup Instructions

1. **Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Fill in your MongoDB connection string
   - Generate a secure NEXTAUTH_SECRET (instructions in the file)

2. **Database Setup**
   - Make sure MongoDB is running locally or you have a MongoDB Atlas account
   - For testing, you can seed the database with a test user by visiting: `/api/seed`
   - Default test user: `test@example.com` / `password123`

3. **Running the Application**
   ```bash
   npm run dev
   # or
   pnpm run dev
   ```

## Authentication Flow

The application uses NextAuth.js with a credentials provider for authentication:

- **Login**: Users can log in at `/auth/login`
- **Registration**: New users can sign up at `/auth/register`
- **Protected Routes**: All routes under `/dashboard`, `/inventory`, etc. are protected

## Implementation Details

The authentication system consists of:

1. **User Model** (`models/User.ts`)
   - Mongoose schema with password hashing
   - Email validation
   - Password comparison method

2. **NextAuth Configuration** (`app/api/auth/[...nextauth]/route.ts`)
   - Credentials provider
   - JWT strategy
   - Custom callbacks for sessions and tokens

3. **API Routes**
   - `/api/auth/register` - User registration endpoint
   - `/api/auth/[...nextauth]` - NextAuth endpoints

4. **React Components**
   - `AuthProvider` - Next-Auth SessionProvider wrapper
   - `ProtectedRoute` - Client-side route protection
   - `MainLayout` - Includes the ProtectedRoute component

5. **React Hooks**
   - `useAuth` - Custom hook for authentication methods and user data

## Security Considerations

- Passwords are hashed using bcrypt
- JWT tokens are encrypted with NEXTAUTH_SECRET
- Protected routes are secured both client and server-side
- MongoDB connection is secured

## Production Deployment

Before deploying to production:

1. Replace the NEXTAUTH_SECRET with a strong random string
2. Update NEXTAUTH_URL to your production domain
3. Use a production MongoDB instance
4. Remove the seed route (`/api/seed`)

## Troubleshooting

If you encounter authentication issues:

1. Check MongoDB connection
2. Verify environment variables
3. Clear cookies and local storage
4. Regenerate NEXTAUTH_SECRET if needed
