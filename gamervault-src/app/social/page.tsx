import * as React from 'react';

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Search } from "lucide-react"
import { MainLayout } from "@/components/main-layout"
import { PageHeader } from "@/components/page-header"
import { SocialPost } from "@/components/social-post"
import { FriendRequest } from "@/components/friend-request"
import { UserCard } from "@/components/user-card"

export default function SocialPage() {
  return (
    <MainLayout>
      <PageHeader title="Social" description="Connect with other gamers">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search users..." className="w-[200px] pl-8 md:w-[300px]" />
          </div>
        </div>
      </PageHeader>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <Textarea placeholder="What's on your mind?" className="min-h-[100px]" />
                <div className="flex justify-end">
                  <Button type="submit">Post</Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="all">All Posts</TabsTrigger>
              <TabsTrigger value="friends">Friends</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6 space-y-6">
              <SocialPost
                author={{
                  name: "GameMaster",
                  image: "https://source.unsplash.com/iFgRcqHznqg/40x40", // Replaced local placeholder
                  verified: true,
                }}
                content="Just reached level 100 in Epic Quest! Check out my new legendary sword NFT!"
                postImage="https://source.unsplash.com/aO-8_k3hQoY/600x400" // Replaced local placeholder
                timestamp="2 hours ago"
                likes={42}
                comments={8}
                shares={3}
                liked={false}
              />
              <SocialPost
                author={{
                  name: "DragonLord",
                  image: "https://source.unsplash.com/QXevDflbl8A/40x40", // Replaced local placeholder
                  verified: true,
                }}
                content="Created a new custom skin for my dragon mount. What do you think?"
                postImage="https://source.unsplash.com/qJtS_jA7H8Q/600x400" // Replaced local placeholder
                timestamp="5 hours ago"
                likes={78}
                comments={15}
                shares={7}
                liked={true}
              />
              <SocialPost
                author={{
                  name: "SpeedDemon",
                  image: "https://source.unsplash.com/iFgRcqHznqg/40x40", // Replaced local placeholder
                  verified: false,
                }}
                content="Just broke my personal record in Racing Legends! 1:42.56 on the Mountain Pass track."
                postImage={null}
                timestamp="Yesterday"
                likes={23}
                comments={5}
                shares={1}
                liked={false}
              />
            </TabsContent>

            <TabsContent value="friends">
              <div className="mt-6 space-y-6">
                <SocialPost
                  author={{
                    name: "DragonLord",
                    image: "https://source.unsplash.com/QXevDflbl8A/40x40", // Replaced local placeholder
                    verified: true,
                  }}
                  content="Created a new custom skin for my dragon mount. What do you think?"
                  postImage="https://source.unsplash.com/qJtS_jA7H8Q/600x400" // Replaced local placeholder
                  timestamp="5 hours ago"
                  likes={78}
                  comments={15}
                  shares={7}
                  liked={true}
                />
              </div>
            </TabsContent>

            <TabsContent value="trending">
              <div className="mt-6 space-y-6">
                <SocialPost
                  author={{
                    name: "GameMaster",
                    image: "https://source.unsplash.com/iFgRcqHznqg/40x40", // Replaced local placeholder
                    verified: true,
                  }}
                  content="Just reached level 100 in Epic Quest! Check out my new legendary sword NFT!"
                  postImage="https://source.unsplash.com/aO-8_k3hQoY/600x400" // Replaced local placeholder
                  timestamp="2 hours ago"
                  likes={42}
                  comments={8}
                  shares={3}
                  liked={false}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Friend Requests</CardTitle>
              <CardDescription>You have 2 pending requests</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FriendRequest
                name="DragonSlayer"
                image="https://source.unsplash.com/QXevDflbl8A/40x40" // Replaced local placeholder
                mutualFriends={3}
              />
              <FriendRequest
                name="MagicWizard"
                image="https://source.unsplash.com/iFgRcqHznqg/40x40" // Replaced local placeholder
                mutualFriends={1}
              />
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View All Requests
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Discover Friends</CardTitle>
              <CardDescription>Find other gamers to connect with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search users..." className="pl-8" />
              </div>

              <div className="space-y-4 mt-4">
                <UserCard
                  name="ArcaneMage"
                  image="https://source.unsplash.com/QXevDflbl8A/400x400" // Replaced local placeholder
                  mutualFriends={5}
                  level={42}
                  game="Wizard Wars"
                />
                <UserCard
                  name="ShadowNinja"
                  image="https://source.unsplash.com/iFgRcqHznqg/400x400" // Replaced local placeholder
                  mutualFriends={2}
                  level={38}
                  game="Shadow Assassin"
                />
                <UserCard
                  name="EpicWarrior"
                  image="https://source.unsplash.com/QXevDflbl8A/400x400" // Replaced local placeholder
                  mutualFriends={7}
                  level={56}
                  game="Epic Quest"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View More
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
