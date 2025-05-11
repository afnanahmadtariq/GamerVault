import type { Metadata } from "next"
import { Card, CardContent, Grid, Section, Flex } from "@/components/layout-system"
import { NFTCard } from "@/components/nft-card"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Filter, Plus } from "lucide-react"

export const metadata: Metadata = {
  title: "Inventory | GamerVault",
  description: "Manage your gaming inventory",
}

export default function InventoryPage() {
  return (
    <>
      <PageHeader
        title="Inventory"
        description="Manage your gaming assets"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create NFT
          </Button>
        }
      />

      <Section>
        <Card className="mb-6">
          <CardContent className="pt-6">
            <Flex gap="default" className="flex-col md:flex-row">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search your inventory..." className="pl-10" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </Flex>
          </CardContent>
        </Card>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="weapons">Weapons</TabsTrigger>
            <TabsTrigger value="armor">Armor</TabsTrigger>
            <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Grid cols={4} gap="default">
              <NFTCard
                id="1"
                name="Cosmic Blade"
                rarity="Legendary"
                image="/placeholder.svg?height=400&width=400"
                game="Stellar Conquest"
              />
              <NFTCard
                id="2"
                name="Dragon Scale Armor"
                rarity="Epic"
                image="/placeholder.svg?height=400&width=400"
                game="Dragon Realms"
              />
              <NFTCard
                id="3"
                name="Enchanted Amulet"
                rarity="Rare"
                image="/placeholder.svg?height=400&width=400"
                game="Epic Quest"
              />
              <NFTCard
                id="4"
                name="Mystic Wand"
                rarity="Epic"
                image="/placeholder.svg?height=400&width=400"
                game="Arcane Legends"
              />
              <NFTCard
                id="5"
                name="Golden Crown"
                rarity="Legendary"
                image="/placeholder.svg?height=400&width=400"
                game="Kingdom Wars"
              />
              <NFTCard
                id="6"
                name="Stealth Cloak"
                rarity="Rare"
                image="/placeholder.svg?height=400&width=400"
                game="Night Raiders"
              />
              <NFTCard
                id="7"
                name="Plasma Rifle"
                rarity="Epic"
                image="/placeholder.svg?height=400&width=400"
                game="Galactic Warfare"
              />
              <NFTCard
                id="8"
                name="Ancient Relic"
                rarity="Legendary"
                image="/placeholder.svg?height=400&width=400"
                game="Lost Civilizations"
              />
            </Grid>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
