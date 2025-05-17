"use client"

import * as React from 'react';
import type { ReactNode } from "react"
import { MainSidebar } from "@/components/main-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import ProtectedRoute from "@/components/protected-route"

export function MainLayout({ children }: { children: ReactNode }) {  return (
    <ProtectedRoute>
      <div className="flex min-h-screen w-full">
        <MainSidebar />
        <SidebarInset>
          <main className="flex-1 w-full p-6">{children}</main>
        </SidebarInset>
      </div>
    </ProtectedRoute>
  )
}
