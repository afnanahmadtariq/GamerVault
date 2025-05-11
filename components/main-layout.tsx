"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)
    setIsLoading(false)

    // If not logged in and trying to access protected routes, redirect to login
    if (
      !loggedIn &&
      !pathname.startsWith("/auth/") &&
      pathname !== "/" &&
      !pathname.startsWith("/marketplace") &&
      !pathname.startsWith("/achievements") &&
      !pathname.startsWith("/leaderboard")
    ) {
      router.push("/auth/login")
    }
  }, [pathname, router])

  // Don't render sidebar for landing page and auth pages
  if (pathname === "/" || pathname.startsWith("/auth/")) {
    return <div className="min-h-screen">{children}</div>
  }

  // Show loading state
  if (isLoading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  // If not logged in, don't render the sidebar
  if (!isLoggedIn) {
    return <div className="min-h-screen">{children}</div>
  }

  // Render the main layout with sidebar for logged-in users
  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <SidebarInset className="w-full">
        <main className="container mx-auto p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}
