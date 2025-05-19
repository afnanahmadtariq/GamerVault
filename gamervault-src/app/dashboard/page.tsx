import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Award, BarChart3, Bell, GamepadIcon, Trophy, Users } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { PageHeader } from "@/components/page-header"
import { RecentAchievement } from "@/components/recent-achievement"
import { NFTCard } from "@/components/nft-card"
import { ActivityFeed } from "@/components/activity-feed"

export default function DashboardPage() {
  return (
    <MainLayout>      <PageHeader title="Dashboard" description="Welcome back, Player One" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Level Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Level 42</div>
            <p className="text-xs text-muted-foreground">78% to Level 43</p>
            <Progress value={78} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128 / 250</div>
            <p className="text-xs text-muted-foreground">51% Completion</p>
            <Progress value={51} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NFTs Collected</CardTitle>
            <GamepadIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Rarity Score: Elite</p>
            <Progress value={85} className="h-2 mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Friends</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">12 Online Now</p>
            <Progress value={25} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
                <CardDescription>Your latest gaming accomplishments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <RecentAchievement
                  name="Dragon Slayer"
                  game="Epic Quest"
                  description="Defeat the mighty dragon in the Mountain of Doom"
                  date="2 days ago"
                  image="https://images.unsplash.com/photo-1577598971432-080890784379?w=80&h=80&fit=crop&q=80"
                  points={50}
                />
                <RecentAchievement
                  name="Master Wizard"
                  game="Wizard Wars"
                  description="Cast 1000 spells successfully"
                  date="5 days ago"
                  image="https://images.unsplash.com/photo-1598387993441-3cf0958d16e7?w=80&h=80&fit=crop&q=80"
                  points={100}
                />
                <RecentAchievement
                  name="Speed Demon"
                  game="Racing Legends"
                  description="Complete a race in under 2 minutes"
                  date="1 week ago"
                  image="https://images.unsplash.com/photo-1552642762-99c051b87899?w=80&h=80&fit=crop&q=80"
                  points={25}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Platform Updates</CardTitle>
                <CardDescription>Latest news and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Bell className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">New Game Added</p>
                    <p className="text-xs text-muted-foreground">
                      Cosmic Explorers is now available with 50+ achievements
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Trophy className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Weekend Challenge</p>
                    <p className="text-xs text-muted-foreground">Earn double XP in all racing games this weekend</p>
                    <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-primary/10 p-2">
                    <BarChart3 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Leaderboard Reset</p>
                    <p className="text-xs text-muted-foreground">Monthly leaderboards have been reset</p>
                    <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your NFT Collection</CardTitle>
              <CardDescription>Recently acquired digital assets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <NFTCard
                  id="nft-1"
                  name="Legendary Sword"
                  image="https://images.unsplash.com/photo-1601629657387-5df99902d615?w=800&h=800&fit=crop&q=80"
                  game="Epic Quest"
                  rarity="Legendary"
                  acquired="2023-05-15"
                />
                <NFTCard
                  id="nft-2"
                  name="Golden Shield"
                  image="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=800&h=800&fit=crop&q=80"
                  game="Epic Quest"
                  rarity="Epic"
                  acquired="2023-06-22"
                />
                <NFTCard
                  id="nft-3"
                  name="Mystic Staff"
                  image="https://images.unsplash.com/photo-1549122728-f51970943692?w=800&h=800&fit=crop&q=80"
                  game="Wizard Wars"
                  rarity="Rare"
                  acquired="2023-07-10"
                />
                <NFTCard
                  id="nft-4"
                  name="Dragon Mount"
                  image="https://images.unsplash.com/photo-1563003959-684481776534?w=800&h=800&fit=crop&q=80"
                  game="Dragon Riders"
                  rarity="Legendary"
                  acquired="2023-08-05"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
              <CardDescription>Your recent gaming activity</CardDescription>
            </CardHeader>
            <CardContent>
              <ActivityFeed />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Gaming Statistics</CardTitle>
              <CardDescription>Your gaming performance and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Detailed statistics visualization would appear here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>      </Tabs>
    </MainLayout>
  )
}
