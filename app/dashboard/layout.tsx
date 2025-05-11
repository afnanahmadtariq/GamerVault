import type React from "react"
import type { Metadata } from "next"
import { Container } from "@/components/layout-system"

export const metadata: Metadata = {
  title: "Dashboard | GamerVault",
  description: "Manage your gaming assets and achievements",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container className="py-6">{children}</Container>
}
