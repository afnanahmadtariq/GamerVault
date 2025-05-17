"use client";

import React from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  // SessionProvider is removed as we are not using NextAuth.js
  return <>{children}</>;
}