import * as React from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { PageHeader } from "@/components/page-header"
import { AchievementCard } from "@/components/achievement-card"

export default function AchievementsPage() {
  return (
    <MainLayout>
      <PageHeader title="Achievements" description="Track your gaming accomplishments">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search achievements..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
        </div>
      </PageHeader>

      <Card className="mb-6">
        <CardHeader className="pb-3">
          <CardTitle>Achievement Progress</CardTitle>
          <CardDescription>Your overall achievement completion</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span>Epic Quest</span>
                </div>
                <span>42/50</span>
              </div>
              <Progress value={84} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span>Dragon Riders</span>
                </div>
                <span>35/60</span>
              </div>
              <Progress value={58} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span>Wizard Wars</span>
                </div>
                <span>28/40</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span>Shadow Assassin</span>
                </div>
                <span>15/45</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span>Racing Legends</span>
                </div>
                <span>8/30</span>
              </div>
              <Progress value={27} className="h-2" />
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
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="unlocked">Unlocked</SelectItem>
            <SelectItem value="locked">Locked</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="all">
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
            <SelectItem value="extreme">Extreme</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Achievements</TabsTrigger>
          <TabsTrigger value="recent">Recently Unlocked</TabsTrigger>
          <TabsTrigger value="rare">Rare Achievements</TabsTrigger>
          <TabsTrigger value="progress">In Progress</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AchievementCard
              id="ach-1"
              name="First Victory"
              image="/placeholder.svg?height=100&width=100&text=Trophy"
              game="Epic Quest"
              points={10}
              unlocked="2023-04-10"
              description="Win your first battle against an enemy."
              status="unlocked"
            />
            <AchievementCard
              id="ach-2"
              name="Dragon Slayer"
              image="/placeholder.svg?height=100&width=100&text=Dragon"
              game="Epic Quest"
              points={50}
              unlocked="2023-05-20"
              description="Defeat the mighty dragon in the Mountain of Doom."
              status="unlocked"
            />
            <AchievementCard
              id="ach-3"
              name="Master Wizard"
              image="/placeholder.svg?height=100&width=100&text=Wizard"
              game="Wizard Wars"
              points={100}
              unlocked="2023-06-15"
              description="Cast 1000 spells successfully."
              status="unlocked"
            />
            <AchievementCard
              id="ach-4"
              name="Speed Demon"
              image="/placeholder.svg?height=100&width=100&text=Speed"
              game="Racing Legends"
              points={25}
              unlocked="2023-07-22"
              description="Complete a race in under 2 minutes."
              status="unlocked"
            />
            <AchievementCard
              id="ach-5"
              name="Treasure Hunter"
              image="/placeholder.svg?height=100&width=100&text=Treasure"
              game="Epic Quest"
              points={30}
              progress={65}
              description="Find 100 hidden treasures throughout the world."
              status="in-progress"
            />
            <AchievementCard
              id="ach-6"
              name="Legendary Rider"
              image="/placeholder.svg?height=100&width=100&text=Dragon"
              game="Dragon Riders"
              points={75}
              description="Tame and ride all 5 legendary dragons."
              status="locked"
            />
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AchievementCard
              id="ach-4"
              name="Speed Demon"
              image="/placeholder.svg?height=100&width=100&text=Speed"
              game="Racing Legends"
              points={25}
              unlocked="2023-07-22"
              description="Complete a race in under 2 minutes."
              status="unlocked"
            />
            <AchievementCard
              id="ach-3"
              name="Master Wizard"
              image="/placeholder.svg?height=100&width=100&text=Wizard"
              game="Wizard Wars"
              points={100}
              unlocked="2023-06-15"
              description="Cast 1000 spells successfully."
              status="unlocked"
            />
          </div>
        </TabsContent>

        <TabsContent value="rare">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AchievementCard
              id="ach-3"
              name="Master Wizard"
              image="/placeholder.svg?height=100&width=100&text=Wizard"
              game="Wizard Wars"
              points={100}
              unlocked="2023-06-15"
              description="Cast 1000 spells successfully."
              status="unlocked"
            />
            <AchievementCard
              id="ach-6"
              name="Legendary Rider"
              image="/placeholder.svg?height=100&width=100&text=Dragon"
              game="Dragon Riders"
              points={75}
              description="Tame and ride all 5 legendary dragons."
              status="locked"
            />
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementCard
              id="ach-5"
              name="Treasure Hunter"
              image="/placeholder.svg?height=100&width=100&text=Treasure"
              game="Epic Quest"
              points={30}
              progress={65}
              description="Find 100 hidden treasures throughout the world."
              status="in-progress"
            />
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  )
}
