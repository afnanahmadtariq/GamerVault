"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, GamepadIcon as GameController, Key, LogOut, QrCode, Shield, Smartphone } from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

export default function SecurityPage() {
  const router = useRouter()
  const { user, isLoading, logout } = useAuth()
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isLoading && !user) {
      router.push("/auth/login?redirect=/security")
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      toast.success("Logged out successfully")
      router.push("/")
    } else {
      toast.error("Failed to logout")
    }
  }

  const handleEnableTwoFactor = () => {
    if (!twoFactorEnabled) {
      setShowQRCode(true)
    } else {
      setTwoFactorEnabled(false)
      setShowQRCode(false)
    }
  }

  const handleVerifyTwoFactor = () => {
    // In a real app, this would verify the code with the server
    if (verificationCode.length === 6) {
      setTwoFactorEnabled(true)
      setShowQRCode(false)
      alert("Two-factor authentication enabled successfully!")
    } else {
      alert("Please enter a valid 6-digit code")
    }
  }

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
            <Link href="/leaderboard" className="text-sm font-medium hover:text-primary">
              Leaderboard
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LanguageSelector />

            {user && (
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
                  <AvatarImage src={user.image || "/placeholder-user.jpg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="ghost" size="icon" onClick={handleLogout}>
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="flex-1 container py-6">
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Security Settings</h1>
          </div>

          <Tabs defaultValue="2fa">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="2fa">Two-Factor Authentication</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="sessions">Active Sessions</TabsTrigger>
            </TabsList>

            <TabsContent value="2fa" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorEnabled
                          ? "Your account is protected with two-factor authentication."
                          : "Protect your account with two-factor authentication."}
                      </p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={handleEnableTwoFactor} />
                  </div>

                  {showQRCode && (
                    <div className="rounded-lg border p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Set up Two-Factor Authentication</h4>
                      </div>

                      <ol className="space-y-4 text-sm">
                        <li className="flex gap-2">
                          <span className="font-bold">1.</span>
                          <span>Download an authenticator app like Google Authenticator or Authy.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold">2.</span>
                          <span>Scan the QR code below with your authenticator app.</span>
                        </li>
                        <li className="flex gap-2">
                          <span className="font-bold">3.</span>
                          <span>Enter the 6-digit code from your authenticator app below.</span>
                        </li>
                      </ol>

                      <div className="flex justify-center py-4">
                        <div className="bg-white p-4 rounded-lg">
                          <QrCode className="h-40 w-40 text-black" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="verification-code">Verification Code</Label>
                        <div className="flex gap-2">
                          <Input
                            id="verification-code"
                            placeholder="Enter 6-digit code"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            maxLength={6}
                          />
                          <Button onClick={handleVerifyTwoFactor}>Verify</Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {twoFactorEnabled && (
                    <div className="rounded-lg border p-6 space-y-4">
                      <div className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">Recovery Codes</h4>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        Recovery codes can be used to access your account if you lose your two-factor authentication
                        device.
                      </p>

                      <div className="bg-muted p-4 rounded-lg font-mono text-sm">
                        <div>ABCD-EFGH-IJKL-MNOP</div>
                        <div>QRST-UVWX-YZ12-3456</div>
                        <div>7890-ABCD-EFGH-IJKL</div>
                        <div>MNOP-QRST-UVWX-YZ12</div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-amber-500">
                        <AlertTriangle className="h-4 w-4" />
                        <span>Keep these codes in a safe place. They can only be viewed once.</span>
                      </div>

                      <Button variant="outline">Download Recovery Codes</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="password" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5 text-primary" />
                    Change Password
                  </CardTitle>
                  <CardDescription>Update your password to keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Update Password</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="sessions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Active Sessions
                  </CardTitle>
                  <CardDescription>Manage devices and locations where you're currently logged in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border divide-y">
                    <div className="p-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium">Current Session</div>
                        <div className="text-sm text-muted-foreground">Windows • Chrome • New York, USA</div>
                        <div className="text-xs text-muted-foreground">Started 2 hours ago</div>
                      </div>
                      <Button variant="outline" size="sm" disabled>
                        Current
                      </Button>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium">Mobile App</div>
                        <div className="text-sm text-muted-foreground">iOS • GamerVault App • New York, USA</div>
                        <div className="text-xs text-muted-foreground">Started 1 day ago</div>
                      </div>
                      <Button variant="outline" size="sm">
                        Logout
                      </Button>
                    </div>

                    <div className="p-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium">Unknown Device</div>
                        <div className="text-sm text-muted-foreground">Mac • Safari • Los Angeles, USA</div>
                        <div className="text-xs text-muted-foreground">Started 3 days ago</div>
                      </div>
                      <Button variant="destructive" size="sm">
                        Logout
                      </Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Logout of All Sessions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
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
