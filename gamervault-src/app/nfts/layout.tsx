import { Metadata } from "next"

export const metadata: Metadata = {
  title: "NFTs Collection | GamerVault",
  description: "Browse your NFT collection and marketplace items",
}

export default function NFTsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
