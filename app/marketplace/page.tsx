import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Filter, Search } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { PageHeader } from "@/components/page-header"
import { MarketplaceNFT } from "@/components/marketplace-nft"

export default function MarketplacePage() {
  return (
    <MainLayout>
      <PageHeader title="Marketplace" description="Discover and collect unique gaming NFTs">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search NFTs..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
        </div>
      </PageHeader>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full md:w-auto">
              <Select defaultValue="all">
                <SelectTrigger id="game-filter" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Games" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Games</SelectItem>
                  <SelectItem value="epic-quest">Epic Quest</SelectItem>
                  <SelectItem value="dragon-riders">Dragon Riders</SelectItem>
                  <SelectItem value="wizard-wars">Wizard Wars</SelectItem>
                  <SelectItem value="shadow-assassin">Shadow Assassin</SelectItem>
                  <SelectItem value="racing-legends">Racing Legends</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger id="rarity-filter" className="w-full md:w-[180px]">
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Rarities</SelectItem>
                  <SelectItem value="common">Common</SelectItem>
                  <SelectItem value="uncommon">Uncommon</SelectItem>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="newest">
                <SelectTrigger id="sort-by" className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="all">
                <SelectTrigger id="price-range" className="w-full md:w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-500">Under 500</SelectItem>
                  <SelectItem value="500-1000">500 - 1,000</SelectItem>
                  <SelectItem value="1000-2000">1,000 - 2,000</SelectItem>
                  <SelectItem value="over-2000">Over 2,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="armor">Armor</TabsTrigger>
          <TabsTrigger value="mounts">Mounts</TabsTrigger>
          <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceNFT
              id="market-1"
              name="Excalibur"
              image="/placeholder.svg?height=300&width=300&text=Excalibur"
              game="Epic Quest"
              rarity="Legendary"
              price={2500}
              seller="GameMaster"
            />
            <MarketplaceNFT
              id="market-2"
              name="Phoenix Mount"
              image="/placeholder.svg?height=300&width=300&text=Phoenix+Mount"
              game="Dragon Riders"
              rarity="Legendary"
              price={5000}
              seller="DragonLord"
            />
            <MarketplaceNFT
              id="market-3"
              name="Stealth Armor"
              image="/placeholder.svg?height=300&width=300&text=Stealth+Armor"
              game="Shadow Assassin"
              rarity="Epic"
              price={1200}
              seller="NightStalker"
            />
            <MarketplaceNFT
              id="market-4"
              name="Wizard's Grimoire"
              image="/placeholder.svg?height=300&width=300&text=Wizard's+Grimoire"
              game="Wizard Wars"
              rarity="Epic"
              price={1500}
              seller="Merlin"
            />
            <MarketplaceNFT
              id="market-5"
              name="Healing Potion"
              image="/placeholder.svg?height=300&width=300&text=Healing+Potion"
              game="Epic Quest"
              rarity="Common"
              price={50}
              seller="Alchemist"
            />
            <MarketplaceNFT
              id="market-6"
              name="Racing Car Skin"
              image="/placeholder.svg?height=300&width=300&text=Racing+Car+Skin"
              game="Racing Legends"
              rarity="Rare"
              price={800}
              seller="SpeedDemon"
            />
          </div>
        </TabsContent>

        <TabsContent value="weapons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceNFT
              id="market-1"
              name="Excalibur"
              image="/placeholder.svg?height=300&width=300&text=Excalibur"
              game="Epic Quest"
              rarity="Legendary"
              price={2500}
              seller="GameMaster"
            />
            <MarketplaceNFT
              id="market-7"
              name="Frost Bow"
              image="/placeholder.svg?height=300&width=300&text=Frost+Bow"
              game="Epic Quest"
              rarity="Epic"
              price={1800}
              seller="IceHunter"
            />
            <MarketplaceNFT
              id="market-8"
              name="Shadow Dagger"
              image="/placeholder.svg?height=300&width=300&text=Shadow+Dagger"
              game="Shadow Assassin"
              rarity="Rare"
              price={950}
              seller="NightStalker"
            />
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
        <TabsContent value="armor">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceNFT
              id="market-3"
              name="Stealth Armor"
              image="/placeholder.svg?height=300&width=300&text=Stealth+Armor"
              game="Shadow Assassin"
              rarity="Epic"
              price={1200}
              seller="NightStalker"
            />
            <MarketplaceNFT
              id="market-9"
              name="Dragon Scale Armor"
              image="/placeholder.svg?height=300&width=300&text=Dragon+Scale+Armor"
              game="Dragon Riders"
              rarity="Epic"
              price={2200}
              seller="DragonLord"
            />
          </div>
        </TabsContent>

        <TabsContent value="mounts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceNFT
              id="market-2"
              name="Phoenix Mount"
              image="/placeholder.svg?height=300&width=300&text=Phoenix+Mount"
              game="Dragon Riders"
              rarity="Legendary"
              price={5000}
              seller="DragonLord"
            />
          </div>
        </TabsContent>

        <TabsContent value="collectibles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <MarketplaceNFT
              id="market-4"
              name="Wizard's Grimoire"
              image="/placeholder.svg?height=300&width=300&text=Wizard's+Grimoire"
              game="Wizard Wars"
              rarity="Epic"
              price={1500}
              seller="Merlin"
            />
            <MarketplaceNFT
              id="market-5"
              name="Healing Potion"
              image="/placeholder.svg?height=300&width=300&text=Healing+Potion"
              game="Epic Quest"
              rarity="Common"
              price={50}
              seller="Alchemist"
            />
            <MarketplaceNFT
              id="market-6"
              name="Racing Car Skin"
              image="/placeholder.svg?height=300&width=300&text=Racing+Car+Skin"
              game="Racing Legends"
              rarity="Rare"
              price={800}
              seller="SpeedDemon"
            />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}
