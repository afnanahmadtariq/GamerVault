import type React from "react"
import type { Metadata } from "next"
import { Container } from "@/components/layout-system"

export const metadata: Metadata = {
  title: "NFT Details | GamerVault",
  description: "View NFT details",
}

export default function NFTLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container className="py-6">{children}</Container>
}
