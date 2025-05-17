import * as React from 'react';

import type React from "react"
import { SidebarTrigger } from "@/components/ui/sidebar"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between pb-4 border-b mb-6">
      <div className="flex items-center gap-4">
        <div className="md:hidden">
          <SidebarTrigger />
        </div>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          {description && <p className="text-muted-foreground">{description}</p>}
        </div>
      </div>
      {children}
    </div>
  )
}
