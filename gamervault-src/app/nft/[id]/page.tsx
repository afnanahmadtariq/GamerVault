"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Calendar, Share2, Trophy } from "lucide-react"
import { NFTHistoryItem } from "@/components/nft-history-item"
import { MainLayout } from "@/components/main-layout"

export default function NFTDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [nft, setNft] = useState<any>(null)
  const [isOwned, setIsOwned] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    // Get user data if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    // Fetch NFT data based on ID
    // In a real app, this would be an API call
    // For this demo, we'll use mock data
    const mockNFT = getMockNFT(params.id)
    setNft(mockNFT)

    // Check if the NFT is owned by the user
    // In a real app, this would be determined by blockchain data
    // For this demo, we'll use a simple check
    setIsOwned(params.id.startsWith("nft-"))

    setIsLoading(false)
  }, [params.id])

  const handlePurchase = () => {
    // In a real app, this would initiate a blockchain transaction
    // For this demo, we'll just show an alert
    alert(`Simulated purchase of ${nft.name} for ${nft.price} coins`)

    // Redirect to dashboard to simulate successful purchase
    setTimeout(() => {
      router.push("/dashboard")
    }, 1500)
  }

  // Mock function to get NFT data
  const getMockNFT = (id: string) => {
    // Owned NFTs
    if (id.startsWith("nft-")) {
      const ownedNFTs = [
        {
          id: "nft-1",
          name: "Legendary Sword",
          image: "https://www.freepik.com/free-photos-vectors/legendary-sword",
          game: "Epic Quest",
          rarity: "Legendary",
          acquired: "2023-05-15",
          description: "A legendary sword forged in dragon fire. Grants +50 attack power.",
          attributes: [
            { name: "Attack", value: "+50" },
            { name: "Durability", value: "Unbreakable" },
            { name: "Element", value: "Fire" },
            { name: "Level Requirement", value: "40" },
          ],
          history: [
            { date: "2023-05-15", event: "Acquired by Player One", price: "N/A" },
            { date: "2023-05-10", event: "Listed by GameMaster", price: "2000 coins" },
            { date: "2023-04-22", event: "Crafted by Blacksmith", price: "N/A" },
          ],
        },
        {
          id: "nft-2",
          name: "Golden Shield",
          image: "https://www.freepik.com/free-photos-vectors/golden-shield",
          game: "Epic Quest",
          rarity: "Epic",
          acquired: "2023-06-22",
          description: "A shield made of pure gold. Grants +30 defense and +10 magic resistance.",
          attributes: [
            { name: "Defense", value: "+30" },
            { name: "Magic Resistance", value: "+10" },
            { name: "Weight", value: "Heavy" },
            { name: "Level Requirement", value: "35" },
          ],
          history: [
            { date: "2023-06-22", event: "Acquired by Player One", price: "N/A" },
            { date: "2023-06-15", event: "Listed by ArmorMaster", price: "1500 coins" },
            { date: "2023-05-30", event: "Crafted by Goldsmith", price: "N/A" },
          ],
        },
      ]

      return ownedNFTs.find((nft) => nft.id === id) || null
    }

    // Marketplace NFTs
    if (id.startsWith("market-")) {
      const marketNFTs = [
        {
          id: "market-1",
          name: "Excalibur",
          image: "https://www.freepik.com/free-photos-vectors/excalibur",
          game: "Epic Quest",
          rarity: "Legendary",
          price: 2500,
          seller: "GameMaster",
          description: "The legendary sword of King Arthur. Grants +100 attack power and +50 charisma.",
          attributes: [
            { name: "Attack", value: "+100" },
            { name: "Charisma", value: "+50" },
            { name: "Durability", value: "Unbreakable" },
            { name: "Element", value: "Light" },
            { name: "Level Requirement", value: "50" },
          ],
          history: [
            { date: "2023-08-01", event: "Listed by GameMaster", price: "2500 coins" },
            { date: "2023-07-15", event: "Acquired by GameMaster", price: "2000 coins" },
            { date: "2023-06-30", event: "Listed by KingArthur", price: "2000 coins" },
            { date: "2023-01-01", event: "Forged by Merlin", price: "N/A" },
          ],
        },
        {
          id: "market-2",
          name: "Phoenix Mount",
          image: "https://www.freepik.com/free-photos-vectors/phoenix-mount",
          game: "Dragon Riders",
          rarity: "Legendary",
          price: 5000,
          seller: "DragonLord",
          description: "A majestic phoenix that can resurrect once per day and grants fire immunity.",
          attributes: [
            { name: "Speed", value: "+100" },
            { name: "Ability", value: "Resurrection (1/day)" },
            { name: "Resistance", value: "Fire Immunity" },
            { name: "Level Requirement", value: "60" },
          ],
          history: [
            { date: "2023-08-10", event: "Listed by DragonLord", price: "5000 coins" },
            { date: "2023-07-22", event: "Hatched by DragonLord", price: "N/A" },
            { date: "2023-06-15", event: "Egg discovered in Volcano", price: "N/A" },
          ],
        },
      ]

      return marketNFTs.find((nft) => nft.id === id) || null
    }

    return null
  }

  if (isLoading || !nft) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-center">Loading...</div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">NFT Details</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-square w-full bg-muted relative">
              <img src={nft.image || "https://www.freepik.com/free-photos-vectors/recycle-symbol"} alt={nft.name} className="h-full w-full object-cover" />
              <div className="absolute top-4 right-4 flex gap-2">
                <Button variant="secondary" size="icon" className="rounded-full h-8 w-8">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share</span>
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{nft.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <span>From {nft.game}</span>
                      <span>•</span>
                      <Badge
                        variant={
                          nft.rarity === "Legendary" ? "destructive" : nft.rarity === "Epic" ? "default" : "secondary"
                        }
                      >
                        {nft.rarity}
                      </Badge>
                    </CardDescription>
                  </div>
                  {isOwned ? (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Acquired {nft.acquired}</span>
                    </div>
                  ) : (
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Price</div>
                      <div className="text-2xl font-bold">{nft.price} coins</div>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{nft.description}</p>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="font-semibold">Attributes</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {nft.attributes.map((attr: any, index: number) => (
                      <div key={index} className="flex flex-col gap-1 rounded-lg border p-3">
                        <span className="text-xs text-muted-foreground">{attr.name}</span>
                        <span className="font-medium">{attr.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                {isOwned ? (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium">Owned by You</span>
                      </div>
                      <Button variant="outline">Transfer</Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>{nft.seller.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">
                          Sold by <span className="font-medium">{nft.seller}</span>
                        </span>
                      </div>
                    </div>
                    <Button className="w-full" size="lg" onClick={handlePurchase}>
                      Purchase for {nft.price} coins
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      This is a simulated purchase. No actual blockchain transaction will occur.
                    </p>
                  </div>
                )}
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>History</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="timeline">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="timeline" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      {nft.history.map((item: any, index: number) => (
                        <NFTHistoryItem
                          key={index}
                          date={item.date}
                          event={item.event}
                          price={item.price}
                          isFirst={index === 0}
                          isLast={index === nft.history.length - 1}
                        />
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="transactions" className="pt-4">
                    <div className="rounded-md border">
                      <div className="grid grid-cols-3 p-3 text-sm font-medium">
                        <div>Date</div>
                        <div>Event</div>
                        <div className="text-right">Price</div>
                      </div>
                      <Separator />
                      {nft.history.map((item: any, index: number) => (
                        <div key={index} className="grid grid-cols-3 p-3 text-sm">
                          <div>{item.date}</div>
                          <div>{item.event}</div>
                          <div className="text-right">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
