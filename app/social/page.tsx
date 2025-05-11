import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, Grid, Section, Flex } from "@/components/layout-system"
import { SocialPost } from "@/components/social-post"
import { FriendRequest } from "@/components/friend-request"
import { UserCard } from "@/components/user-card"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, UserPlus } from "lucide-react"

export const metadata: Metadata = {
  title: "Social | GamerVault",
  description: "Connect with other gamers",
}

export default function SocialPage() {
  return (
    <>
      <PageHeader
        title="Social"
        description="Connect with other gamers"
        actions={
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Friend
          </Button>
        }
      />

      <Section>
        <Tabs defaultValue="feed">
          <TabsList className="mb-6">
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="discover">Discover</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-0">
            <Grid cols={3} className="gap-6">
              <div className="col-span-2 space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <Flex gap="default" align="center">
                      <Input placeholder="What's on your mind?" />
                      <Button>Post</Button>
                    </Flex>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <SocialPost
                    user={{
                      name: "Alex Johnson",
                      avatar: "/placeholder.svg?height=40&width=40",
                      handle: "@alexj",
                    }}
                    content="Just unlocked the Legendary Dragon Slayer achievement! 🐉⚔️ #GamingLife"
                    image="/placeholder.svg?height=400&width=600"
                    likes={42}
                    comments={8}
                    time="2 hours ago"
                  />
                  <SocialPost
                    user={{
                      name: "Sarah Williams",
                      avatar: "/placeholder.svg?height=40&width=40",
                      handle: "@sarahw",
                    }}
                    content="Check out my new NFT collection! Limited edition items available now in the marketplace."
                    likes={24}
                    comments={5}
                    time="5 hours ago"
                  />
                  <SocialPost
                    user={{
                      name: "Mike Chen",
                      avatar: "/placeholder.svg?height=40&width=40",
                      handle: "@mikec",
                    }}
                    content="Looking for team members for the upcoming tournament. DM if interested!"
                    likes={18}
                    comments={12}
                    time="1 day ago"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Friend Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <FriendRequest name="Emma Davis" avatar="/placeholder.svg?height=40&width=40" mutualFriends={3} />
                      <FriendRequest
                        name="James Wilson"
                        avatar="/placeholder.svg?height=40&width=40"
                        mutualFriends={5}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Flex justify="between" align="center">
                      <CardTitle>Online Friends</CardTitle>
                      <Button variant="ghost" size="sm">
                        <Users className="mr-2 h-4 w-4" />
                        View All
                      </Button>
                    </Flex>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <UserCard
                        name="Ryan Thompson"
                        avatar="/placeholder.svg?height=40&width=40"
                        status="Playing Stellar Conquest"
                        online={true}
                      />
                      <UserCard
                        name="Lisa Brown"
                        avatar="/placeholder.svg?height=40&width=40"
                        status="Online"
                        online={true}
                      />
                      <UserCard
                        name="David Kim"
                        avatar="/placeholder.svg?height=40&width=40"
                        status="In Marketplace"
                        online={true}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
