import type React from "react"
import type { Metadata } from "next"
import { Container } from "@/components/layout-system"

export const metadata: Metadata = {
  title: "Marketplace | GamerVault",
  description: "Browse and trade gaming assets",
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container className="py-6">{children}</Container>
}
