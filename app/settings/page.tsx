import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle, Section, Flex } from "@/components/layout-system"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import { Save } from "lucide-react"

export const metadata: Metadata = {
  title: "Settings | GamerVault",
  description: "Manage your account settings",
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account preferences" />

      <Section>
        <Tabs defaultValue="profile">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Flex direction="col" gap="large">
                  <Flex gap="default" align="start" className="flex-col md:flex-row">
                    <div className="mb-4 md:mb-0">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" />
                        <AvatarFallback>P1</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="space-y-4 flex-grow">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">Display Name</Label>
                          <Input id="displayName" defaultValue="Player One" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="player_one" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" type="email" defaultValue="player@example.com" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="language">Language</Label>
                          <LanguageSelector />
                        </div>
                      </div>
                    </div>
                  </Flex>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about yourself"
                      defaultValue="Avid gamer and NFT collector. I've been gaming for over 10 years and love exploring new virtual worlds."
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button>
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </Flex>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  )
}
