import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  // Check if user is already authenticated
  const session = await getServerSession(authOptions);
  
  // Redirect authenticated users to dashboard
  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {children}
    </div>
  );
}