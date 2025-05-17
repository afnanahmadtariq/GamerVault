import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { PageHeader } from "@/components/page-header"
import { NFTCard } from "@/components/nft-card"

export default function InventoryPage() {
  return (
    <MainLayout>
      <PageHeader title="Inventory" description="Manage your NFT collection">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search inventory..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
        </div>
      </PageHeader>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Collection Stats</CardTitle>
          <CardDescription>Overview of your NFT collection</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Total NFTs</div>
              <div className="text-2xl font-bold">24</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Estimated Value</div>
              <div className="text-2xl font-bold">42,500</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Rarest Item</div>
              <div className="text-2xl font-bold">Legendary</div>
            </div>
            <div className="rounded-lg border p-3">
              <div className="text-sm text-muted-foreground">Games Represented</div>
              <div className="text-2xl font-bold">5</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Game" />
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
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Rarity" />
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
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="rarity-high">Rarity: High to Low</SelectItem>
            <SelectItem value="rarity-low">Rarity: Low to High</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="weapons">Weapons</TabsTrigger>
          <TabsTrigger value="armor">Armor</TabsTrigger>
          <TabsTrigger value="mounts">Mounts</TabsTrigger>
          <TabsTrigger value="collectibles">Collectibles</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NFTCard
              id="nft-1"
              name="Legendary Sword"
              image="/placeholder.svg?height=200&width=200&text=Legendary+Sword"
              game="Epic Quest"
              rarity="Legendary"
              acquired="2023-05-15"
            />
            <NFTCard
              id="nft-2"
              name="Golden Shield"
              image="/placeholder.svg?height=200&width=200&text=Golden+Shield"
              game="Epic Quest"
              rarity="Epic"
              acquired="2023-06-22"
            />
            <NFTCard
              id="nft-3"
              name="Mystic Staff"
              image="/placeholder.svg?height=200&width=200&text=Mystic+Staff"
              game="Wizard Wars"
              rarity="Rare"
              acquired="2023-07-10"
            />
            <NFTCard
              id="nft-4"
              name="Dragon Mount"
              image="/placeholder.svg?height=200&width=200&text=Dragon+Mount"
              game="Dragon Riders"
              rarity="Legendary"
              acquired="2023-08-05"
            />
            <NFTCard
              id="nft-5"
              name="Shadow Cloak"
              image="/placeholder.svg?height=200&width=200&text=Shadow+Cloak"
              game="Shadow Assassin"
              rarity="Epic"
              acquired="2023-08-15"
            />
            <NFTCard
              id="nft-6"
              name="Healing Potion"
              image="/placeholder.svg?height=200&width=200&text=Healing+Potion"
              game="Epic Quest"
              rarity="Common"
              acquired="2023-09-01"
            />
            <NFTCard
              id="nft-7"
              name="Racing Car"
              image="/placeholder.svg?height=200&width=200&text=Racing+Car"
              game="Racing Legends"
              rarity="Rare"
              acquired="2023-09-10"
            />
            <NFTCard
              id="nft-8"
              name="Fire Wand"
              image="/placeholder.svg?height=200&width=200&text=Fire+Wand"
              game="Wizard Wars"
              rarity="Epic"
              acquired="2023-09-20"
            />
          </div>
        </TabsContent>

        <TabsContent value="weapons">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NFTCard
              id="nft-1"
              name="Legendary Sword"
              image="/placeholder.svg?height=200&width=200&text=Legendary+Sword"
              game="Epic Quest"
              rarity="Legendary"
              acquired="2023-05-15"
            />
            <NFTCard
              id="nft-3"
              name="Mystic Staff"
              image="/placeholder.svg?height=200&width=200&text=Mystic+Staff"
              game="Wizard Wars"
              rarity="Rare"
              acquired="2023-07-10"
            />
            <NFTCard
              id="nft-8"
              name="Fire Wand"
              image="/placeholder.svg?height=200&width=200&text=Fire+Wand"
              game="Wizard Wars"
              rarity="Epic"
              acquired="2023-09-20"
            />
          </div>
        </TabsContent>

        <TabsContent value="armor">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NFTCard
              id="nft-2"
              name="Golden Shield"
              image="/placeholder.svg?height=200&width=200&text=Golden+Shield"
              game="Epic Quest"
              rarity="Epic"
              acquired="2023-06-22"
            />
            <NFTCard
              id="nft-5"
              name="Shadow Cloak"
              image="/placeholder.svg?height=200&width=200&text=Shadow+Cloak"
              game="Shadow Assassin"
              rarity="Epic"
              acquired="2023-08-15"
            />
          </div>
        </TabsContent>

        <TabsContent value="mounts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NFTCard
              id="nft-4"
              name="Dragon Mount"
              image="/placeholder.svg?height=200&width=200&text=Dragon+Mount"
              game="Dragon Riders"
              rarity="Legendary"
              acquired="2023-08-05"
            />
            <NFTCard
              id="nft-7"
              name="Racing Car"
              image="/placeholder.svg?height=200&width=200&text=Racing+Car"
              game="Racing Legends"
              rarity="Rare"
              acquired="2023-09-10"
            />
          </div>
        </TabsContent>

        <TabsContent value="collectibles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <NFTCard
              id="nft-6"
              name="Healing Potion"
              image="/placeholder.svg?height=200&width=200&text=Healing+Potion"
              game="Epic Quest"
              rarity="Common"
              acquired="2023-09-01"
            />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}
