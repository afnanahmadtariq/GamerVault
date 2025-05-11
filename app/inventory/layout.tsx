import type React from "react"
import type { Metadata } from "next"
import { Container } from "@/components/layout-system"

export const metadata: Metadata = {
  title: "Inventory | GamerVault",
  description: "Manage your gaming inventory",
}

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container className="py-6">{children}</Container>
}
