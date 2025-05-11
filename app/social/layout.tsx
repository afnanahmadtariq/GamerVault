import type React from "react"
import type { Metadata } from "next"
import { Container } from "@/components/layout-system"

export const metadata: Metadata = {
  title: "Social | GamerVault",
  description: "Connect with other gamers",
}

export default function SocialLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Container className="py-6">{children}</Container>
}
