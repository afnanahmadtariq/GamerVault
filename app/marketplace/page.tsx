import type { Metadata } from "next"
import { Card, CardContent, Grid, Section, Flex } from "@/components/layout-system"
import { MarketplaceNFT } from "@/components/marketplace-nft"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, SortDesc } from "lucide-react"

export const metadata: Metadata = {
  title: "Marketplace | GamerVault",
  description: "Browse and trade gaming assets",
}

export default function MarketplacePage() {
  return (
    <>
      <PageHeader title="Marketplace" description="Browse and trade gaming assets" />

      <Section>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Flex gap="default" className="flex-col md:flex-row">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search NFTs, collections, games..." className="pl-10" />
              </div>
              <Flex gap="small">
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <SortDesc className="h-4 w-4" />
                </Button>
              </Flex>
            </Flex>
          </CardContent>
        </Card>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="art">Art</TabsTrigger>
            <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
            <TabsTrigger value="game-items">Game Items</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Grid cols={4} gap="default">
              <MarketplaceNFT
                id="1"
                name="Cosmic Blade"
                price={120}
                image="/placeholder.svg?height=400&width=400"
                creator="CryptoArtist"
                game="Stellar Conquest"
              />
              <MarketplaceNFT
                id="2"
                name="Dragon Egg"
                price={350}
                image="/placeholder.svg?height=400&width=400"
                creator="MythicForge"
                game="Dragon Realms"
              />
              <MarketplaceNFT
                id="3"
                name="Enchanted Armor"
                price={200}
                image="/placeholder.svg?height=400&width=400"
                creator="LegendCrafter"
                game="Epic Quest"
              />
              <MarketplaceNFT
                id="4"
                name="Mystic Wand"
                price={175}
                image="/placeholder.svg?height=400&width=400"
                creator="WizardWorks"
                game="Arcane Legends"
              />
              <MarketplaceNFT
                id="5"
                name="Golden Crown"
                price={500}
                image="/placeholder.svg?height=400&width=400"
                creator="RoyalForge"
                game="Kingdom Wars"
              />
              <MarketplaceNFT
                id="6"
                name="Stealth Cloak"
                price={150}
                image="/placeholder.svg?height=400&width=400"
                creator="ShadowCraft"
                game="Night Raiders"
              />
              <MarketplaceNFT
                id="7"
                name="Plasma Rifle"
                price={280}
                image="/placeholder.svg?height=400&width=400"
                creator="FutureTech"
                game="Galactic Warfare"
              />
              <MarketplaceNFT
                id="8"
                name="Ancient Relic"
                price={420}
                image="/placeholder.svg?height=400&width=400"
                creator="TreasureHunter"
                game="Lost Civilizations"
              />
            </Grid>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
