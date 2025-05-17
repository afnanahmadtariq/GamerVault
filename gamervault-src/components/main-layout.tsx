import * as React from 'react';

"use client"
import type React from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import ProtectedRoute from "@/components/protected-route"

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <MainSidebar />
        <SidebarInset>
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </ProtectedRoute>
  )
}
