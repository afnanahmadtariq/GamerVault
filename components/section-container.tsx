import type React from "react"
import { cn } from "@/lib/utils"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
}

export function SectionContainer({ children, className }: SectionContainerProps) {
  return <section className={cn("space-y-4", className)}>{children}</section>
}
