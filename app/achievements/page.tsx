import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, Grid, Section, Flex } from "@/components/layout-system"
import { AchievementCard } from "@/components/achievement-card"
import { PageHeader } from "@/components/page-header"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Zap, Target, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "Achievements | GamerVault",
  description: "View and manage your gaming achievements",
}

export default function AchievementsPage() {
  return (
    <>
      <PageHeader title="Achievements" description="Track your gaming milestones" />

      <Section>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Achievement Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Flex direction="col" gap="default">
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">Overall Completion</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              <Grid cols={3} gap="default">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="mb-2 flex justify-center">
                      <Trophy className="h-8 w-8 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold">128</div>
                    <p className="text-xs text-muted-foreground">Total Achievements</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="mb-2 flex justify-center">
                      <Star className="h-8 w-8 text-purple-500" />
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <p className="text-xs text-muted-foreground">Rare Achievements</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="mb-2 flex justify-center">
                      <Award className="h-8 w-8 text-blue-500" />
                    </div>
                    <div className="text-2xl font-bold">4,250</div>
                    <p className="text-xs text-muted-foreground">Total Points</p>
                  </CardContent>
                </Card>
              </Grid>
            </Flex>
          </CardContent>
        </Card>

        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="rare">Rare</TabsTrigger>
            <TabsTrigger value="locked">Locked</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Grid cols={3} gap="default">
              <AchievementCard
                title="First Victory"
                description="Win your first match"
                icon={Trophy}
                points={50}
                unlocked={true}
                date="2 days ago"
              />
              <AchievementCard
                title="Power Player"
                description="Play for 10 hours straight"
                icon={Zap}
                points={100}
                unlocked={true}
                date="1 week ago"
              />
              <AchievementCard
                title="Sharpshooter"
                description="Hit 10 consecutive targets"
                icon={Target}
                points={75}
                unlocked={true}
                date="2 weeks ago"
              />
              <AchievementCard
                title="Collector"
                description="Collect 50 unique items"
                icon={Star}
                points={150}
                unlocked={false}
                progress={32}
                total={50}
              />
              <AchievementCard
                title="Master Strategist"
                description="Win 5 matches without losing a unit"
                icon={Award}
                points={200}
                unlocked={false}
                progress={3}
                total={5}
              />
              <AchievementCard
                title="Explorer"
                description="Discover all map locations"
                icon={Zap}
                points={125}
                unlocked={false}
                progress={18}
                total={25}
              />
            </Grid>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
