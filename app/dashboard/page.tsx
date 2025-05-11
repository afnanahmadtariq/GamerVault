import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, Grid, Section, Flex } from "@/components/layout-system"
import { ActivityFeed } from "@/components/activity-feed"
import { RecentAchievement } from "@/components/recent-achievement"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Trophy, Zap } from "lucide-react"

export const metadata: Metadata = {
  title: "Dashboard | GamerVault",
  description: "Your gaming dashboard",
}

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Player One"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create NFT
          </Button>
        }
      />

      <Section>
        <Grid cols={3} gap="default">
          <Card>
            <CardHeader>
              <CardTitle>Total NFTs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">24</div>
              <p className="text-sm text-muted-foreground">+3 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <p className="text-sm text-muted-foreground">+12 from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Wallet Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,245 GC</div>
              <p className="text-sm text-muted-foreground">GameCoins</p>
            </CardContent>
          </Card>
        </Grid>
      </Section>

      <Section>
        <Tabs defaultValue="activity">
          <TabsList className="mb-4">
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <Flex justify="between" align="center">
                  <CardTitle>Activity Feed</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Flex>
              </CardHeader>
              <CardContent>
                <ActivityFeed />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <Flex justify="between" align="center">
                  <CardTitle>Recent Achievements</CardTitle>
                  <Button variant="outline" size="sm">
                    View All
                  </Button>
                </Flex>
              </CardHeader>
              <CardContent>
                <Grid cols={2} gap="default">
                  <RecentAchievement
                    title="First Victory"
                    description="Win your first match"
                    icon={Trophy}
                    date="2 days ago"
                    points={50}
                  />
                  <RecentAchievement
                    title="Power Player"
                    description="Play for 10 hours straight"
                    icon={Zap}
                    date="1 week ago"
                    points={100}
                  />
                </Grid>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
