"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart3,
  Crown,
  GamepadIcon as GameController,
  LogOut,
  Medal,
  Search,
  Trophy,
  Users,
  Wallet,
} from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { Badge } from "@/components/ui/badge"

export default function LeaderboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [gameFilter, setGameFilter] = useState("all")
  const [timeRange, setTimeRange] = useState("all-time")

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")

    // Get user data if logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }

    setIsLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("user")
    router.push("/")
  }

  // Sample leaderboard data
  const achievementLeaderboard = [
    {
      id: "user-1",
      rank: 1,
      name: "GameMaster",
      avatar: "/placeholder.svg?height=40&width=40&text=GM",
      achievements: 256,
      level: 78,
      game: "Epic Quest",
      verified: true,
    },
    {
      id: "user-2",
      rank: 2,
      name: "DragonLord",
      avatar: "/placeholder.svg?height=40&width=40&text=DL",
      achievements: 245,
      level: 75,
      game: "Dragon Riders",
      verified: true,
    },
    {
      id: "user-3",
      rank: 3,
      name: "WizardKing",
      avatar: "/placeholder.svg?height=40&width=40&text=WK",
      achievements: 230,
      level: 72,
      game: "Wizard Wars",
      verified: false,
    },
    {
      id: "user-4",
      rank: 4,
      name: "ShadowNinja",
      avatar: "/placeholder.svg?height=40&width=40&text=SN",
      achievements: 218,
      level: 68,
      game: "Shadow Assassin",
      verified: false,
    },
    {
      id: "user-5",
      rank: 5,
      name: "SpeedDemon",
      avatar: "/placeholder.svg?height=40&width=40&text=SD",
      achievements: 205,
      level: 65,
      game: "Racing Legends",
      verified: true,
    },
    {
      id: "user-6",
      rank: 6,
      name: "ArcaneMage",
      avatar: "/placeholder.svg?height=40&width=40&text=AM",
      achievements: 198,
      level: 63,
      game: "Wizard Wars",
      verified: false,
    },
    {
      id: "user-7",
      rank: 7,
      name: "BattleHero",
      avatar: "/placeholder.svg?height=40&width=40&text=BH",
      achievements: 187,
      level: 60,
      game: "Epic Quest",
      verified: false,
    },
    {
      id: "user-8",
      rank: 8,
      name: "StealthMaster",
      avatar: "/placeholder.svg?height=40&width=40&text=SM",
      achievements: 175,
      level: 58,
      game: "Shadow Assassin",
      verified: false,
    },
    {
      id: "user-9",
      rank: 9,
      name: "FireRider",
      avatar: "/placeholder.svg?height=40&width=40&text=FR",
      achievements: 168,
      level: 55,
      game: "Dragon Riders",
      verified: false,
    },
    {
      id: "user-10",
      rank: 10,
      name: "RacingChamp",
      avatar: "/placeholder.svg?height=40&width=40&text=RC",
      achievements: 160,
      level: 52,
      game: "Racing Legends",
      verified: false,
    },
  ]

  const nftLeaderboard = [
    {
      id: "user-1",
      rank: 1,
      name: "NFTWhale",
      avatar: "/placeholder.svg?height=40&width=40&text=NW",
      nftCount: 87,
      value: 125000,
      rarest: "Excalibur",
      verified: true,
    },
    {
      id: "user-2",
      rank: 2,
      name: "CryptoKing",
      avatar: "/placeholder.svg?height=40&width=40&text=CK",
      nftCount: 76,
      value: 112000,
      rarest: "Phoenix Mount",
      verified: true,
    },
    {
      id: "user-3",
      rank: 3,
      name: "DigitalCollector",
      avatar: "/placeholder.svg?height=40&width=40&text=DC",
      nftCount: 68,
      value: 98000,
      rarest: "Dragon Egg",
      verified: false,
    },
    {
      id: "user-4",
      rank: 4,
      name: "RarityHunter",
      avatar: "/placeholder.svg?height=40&width=40&text=RH",
      nftCount: 62,
      value: 85000,
      rarest: "Ancient Grimoire",
      verified: false,
    },
    {
      id: "user-5",
      rank: 5,
      name: "TokenMaster",
      avatar: "/placeholder.svg?height=40&width=40&text=TM",
      nftCount: 58,
      value: 76000,
      rarest: "Celestial Armor",
      verified: true,
    },
    {
      id: "user-6",
      rank: 6,
      name: "VirtualTycoon",
      avatar: "/placeholder.svg?height=40&width=40&text=VT",
      nftCount: 52,
      value: 68000,
      rarest: "Mystic Staff",
      verified: false,
    },
    {
      id: "user-7",
      rank: 7,
      name: "ArtifactSeeker",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
      nftCount: 47,
      value: 62000,
      rarest: "Void Blade",
      verified: false,
    },
    {
      id: "user-8",
      rank: 8,
      name: "DigitalMogul",
      avatar: "/placeholder.svg?height=40&width=40&text=DM",
      nftCount: 43,
      value: 55000,
      rarest: "Time Warp Device",
      verified: false,
    },
    {
      id: "user-9",
      rank: 9,
      name: "CryptoVisionary",
      avatar: "/placeholder.svg?height=40&width=40&text=CV",
      nftCount: 38,
      value: 48000,
      rarest: "Ethereal Wings",
      verified: false,
    },
    {
      id: "user-10",
      rank: 10,
      name: "PixelPioneer",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
      nftCount: 35,
      value: 42000,
      rarest: "Quantum Shield",
      verified: false,
    },
  ]

  // Filter leaderboard based on search query and filters
  const filteredAchievementLeaderboard = achievementLeaderboard.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = gameFilter === "all" || player.game === gameFilter

    return matchesSearch && matchesGame
  })

  const filteredNFTLeaderboard = nftLeaderboard.filter((player) => {
    return player.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <GameController className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GamerVault</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/marketplace" className="text-sm font-medium hover:text-primary">
              Marketplace
            </Link>
            <Link href="/achievements" className="text-sm font-medium hover:text-primary">
              Achievements
            </Link>
            <Link href="/social" className="text-sm font-medium hover:text-primary">
              Social
            </Link>
            <Link href="/leaderboard" className="text-sm font-medium text-primary">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSelector />

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Dashboard
                  </Button>
                </Link>
                <div className="hidden md:block">
                  <div className="text-sm font-medium">{user.name}</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/auth/login">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link href="/auth/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Leaderboards</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search players..."
                  className="w-[200px] pl-8 md:w-[250px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-primary" />
                Global Rankings
              </CardTitle>
              <CardDescription>See how players rank across different categories</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="achievements">
                <div className="flex justify-between items-center mb-6">
                  <TabsList>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="nfts">NFT Collection</TabsTrigger>
                    <TabsTrigger value="social">Social Influence</TabsTrigger>
                  </TabsList>

                  <div className="flex gap-4">
                    {/* Game filter for achievements tab */}
                    <div
                      className="hidden data-[state=active]:flex items-center gap-2"
                      data-state={gameFilter !== "all" || "active"}
                    >
                      <Select value={gameFilter} onValueChange={setGameFilter}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="All Games" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Games</SelectItem>
                          <SelectItem value="Epic Quest">Epic Quest</SelectItem>
                          <SelectItem value="Dragon Riders">Dragon Riders</SelectItem>
                          <SelectItem value="Wizard Wars">Wizard Wars</SelectItem>
                          <SelectItem value="Shadow Assassin">Shadow Assassin</SelectItem>
                          <SelectItem value="Racing Legends">Racing Legends</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Time range filter */}
                    <Select value={timeRange} onValueChange={setTimeRange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all-time">All Time</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="achievements">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium border-b">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-4">Player</div>
                      <div className="col-span-2 text-center">Level</div>
                      <div className="col-span-3">Game</div>
                      <div className="col-span-2 text-right">Achievements</div>
                    </div>

                    {filteredAchievementLeaderboard.map((player) => (
                      <div key={player.id} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-muted/50">
                        <div className="col-span-1 text-center font-medium">
                          {player.rank === 1 ? (
                            <Crown className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : player.rank === 2 ? (
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : player.rank === 3 ? (
                            <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                          ) : (
                            player.rank
                          )}
                        </div>
                        <div className="col-span-4">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-1">
                                {player.name}
                                {player.verified && (
                                  <Badge variant="outline" className="ml-1 text-xs py-0">
                                    Pro
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                            Lvl {player.level}
                          </div>
                        </div>
                        <div className="col-span-3">{player.game}</div>
                        <div className="col-span-2 text-right font-medium">{player.achievements}</div>
                      </div>
                    ))}

                    {filteredAchievementLeaderboard.length === 0 && (
                      <div className="p-8 text-center">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No players found</h3>
                        <p className="text-muted-foreground">Try adjusting your search or filters to find players.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="nfts">
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium border-b">
                      <div className="col-span-1 text-center">#</div>
                      <div className="col-span-3">Player</div>
                      <div className="col-span-2 text-center">NFTs Owned</div>
                      <div className="col-span-3">Rarest NFT</div>
                      <div className="col-span-3 text-right">Collection Value</div>
                    </div>

                    {filteredNFTLeaderboard.map((player) => (
                      <div key={player.id} className="grid grid-cols-12 p-4 text-sm items-center hover:bg-muted/50">
                        <div className="col-span-1 text-center font-medium">
                          {player.rank === 1 ? (
                            <Crown className="h-5 w-5 text-yellow-500 mx-auto" />
                          ) : player.rank === 2 ? (
                            <Medal className="h-5 w-5 text-gray-400 mx-auto" />
                          ) : player.rank === 3 ? (
                            <Medal className="h-5 w-5 text-amber-700 mx-auto" />
                          ) : (
                            player.rank
                          )}
                        </div>
                        <div className="col-span-3">
                          <div className="flex items-center gap-2">
                            <Avatar>
                              <AvatarImage src={player.avatar || "/placeholder.svg"} alt={player.name} />
                              <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium flex items-center gap-1">
                                {player.name}
                                {player.verified && (
                                  <Badge variant="outline" className="ml-1 text-xs py-0">
                                    Pro
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-0.5 text-sm font-medium text-primary">
                            {player.nftCount}
                          </div>
                        </div>
                        <div className="col-span-3">{player.rarest}</div>
                        <div className="col-span-3 text-right font-medium">{player.value.toLocaleString()} coins</div>
                      </div>
                    ))}

                    {filteredNFTLeaderboard.length === 0 && (
                      <div className="p-8 text-center">
                        <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No players found</h3>
                        <p className="text-muted-foreground">Try adjusting your search to find players.</p>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="social">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Social Influence Leaderboard</h3>
                    <p className="text-muted-foreground max-w-md mb-6">
                      Track the most influential players in the GamerVault community based on followers, engagement, and
                      content creation.
                    </p>
                    <Button>Coming Soon</Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {user && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Your Rankings
                </CardTitle>
                <CardDescription>See where you stand in the global rankings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="rounded-lg border p-6 flex flex-col items-center text-center">
                    <Trophy className="h-8 w-8 text-primary mb-2" />
                    <h3 className="text-lg font-medium mb-1">Achievement Rank</h3>
                    <div className="text-3xl font-bold mb-2">#42</div>
                    <p className="text-sm text-muted-foreground">Top 5% of all players</p>
                  </div>

                  <div className="rounded-lg border p-6 flex flex-col items-center text-center">
                    <Wallet className="h-8 w-8 text-primary mb-2" />
                    <h3 className="text-lg font-medium mb-1">NFT Collection Rank</h3>
                    <div className="text-3xl font-bold mb-2">#78</div>
                    <p className="text-sm text-muted-foreground">Top 12% of all players</p>
                  </div>

                  <div className="rounded-lg border p-6 flex flex-col items-center text-center">
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <h3 className="text-lg font-medium mb-1">Social Influence</h3>
                    <div className="text-3xl font-bold mb-2">#103</div>
                    <p className="text-sm text-muted-foreground">Top 18% of all players</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GamerVault. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
