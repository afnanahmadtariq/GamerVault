"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { Loader2 } from "lucide-react"

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register", "/marketplace", "/achievements", "/leaderboard"]

export function MainLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is logged in
        const loggedIn = localStorage.getItem("isLoggedIn") === "true"
        setIsLoggedIn(loggedIn)
        
        // If not logged in and trying to access protected routes, redirect to login
        if (!loggedIn && !PUBLIC_PATHS.some(path => pathname.startsWith(path))) {
          router.push("/auth/login")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        router.push("/auth/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  // Don't render sidebar for landing page and auth pages
  if (pathname === "/" || pathname.startsWith("/auth/")) {
    return <div className="min-h-screen">{children}</div>
  }

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  // If not logged in, don't render the sidebar
  if (!isLoggedIn) {
    return <div className="min-h-screen">{children}</div>
  }

  // Render the main layout with sidebar for logged-in users
  return (
    <div className="flex min-h-screen">
      <MainSidebar />
      <SidebarInset>
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </div>
  )
}
