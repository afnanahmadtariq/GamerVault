"use client"

import * as React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  GamepadIcon as GameController,
  LogOut,
  Plus,
  Wallet,
} from "lucide-react"
import { LanguageSelector } from "@/components/language-selector"
import { Separator } from "@/components/ui/separator"

export default function WalletPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [amount, setAmount] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [isConnecting, setIsConnecting] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/wallet")
      return
    }

    // Get user data
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

  const handleConnectWallet = () => {
    setIsConnecting(true)

    // Simulate wallet connection delay
    setTimeout(() => {
      setWalletAddress("0x1a2b3c4d5e6f7g8h9i0j")
      setIsConnecting(false)
    }, 1500)
  }

  const handleDisconnectWallet = () => {
    setWalletAddress("")
  }

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process a deposit
    alert(`Simulated deposit of ${amount} coins`)
    setAmount("")
  }

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would process a withdrawal
    alert(`Simulated withdrawal of ${amount} coins`)
    setAmount("")
  }

  // Sample transaction history
  const transactions = [
    {
      id: "tx-1",
      type: "purchase",
      description: "Purchased Legendary Sword NFT",
      amount: -2500,
      date: "2023-05-15",
    },
    {
      id: "tx-2",
      type: "deposit",
      description: "Deposit",
      amount: 5000,
      date: "2023-05-10",
    },
    {
      id: "tx-3",
      type: "sale",
      description: "Sold Golden Shield NFT",
      amount: 1500,
      date: "2023-04-28",
    },
    {
      id: "tx-4",
      type: "purchase",
      description: "Purchased Mystic Staff NFT",
      amount: -1200,
      date: "2023-04-15",
    },
    {
      id: "tx-5",
      type: "reward",
      description: "Achievement Reward: Dragon Slayer",
      amount: 500,
      date: "2023-04-10",
    },
  ]

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
                  <AvatarImage src={user.avatar || "https://source.unsplash.com/random"} alt={user.name} />
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
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight">Virtual Wallet</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <Card className="md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="h-5 w-5 text-primary" />
                  Your Balance
                </CardTitle>
                <CardDescription>Manage your virtual currency for the GamerVault platform</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center p-6 space-y-4">
                  <div className="text-4xl font-bold">12,500</div>
                  <div className="text-muted-foreground">Game Coins</div>

                  <div className="flex gap-4 mt-4">
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Funds
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <ArrowUp className="h-4 w-4" />
                      Send
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  External Wallet
                </CardTitle>
                <CardDescription>Connect an external wallet</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {walletAddress ? (
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="text-xs text-muted-foreground mb-1">Connected Wallet</div>
                      <div className="font-mono text-sm truncate">{walletAddress}</div>
                    </div>
                    <Button variant="outline" className="w-full" onClick={handleDisconnectWallet}>
                      Disconnect Wallet
                    </Button>
                  </div>
                ) : (
                  <Button className="w-full" onClick={handleConnectWallet} disabled={isConnecting}>
                    {isConnecting ? "Connecting..." : "Connect Wallet"}
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="transactions">Transaction History</TabsTrigger>
              <TabsTrigger value="deposit">Deposit</TabsTrigger>
              <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>View your recent transaction history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-4 p-3 text-sm font-medium">
                      <div>Date</div>
                      <div className="col-span-2">Description</div>
                      <div className="text-right">Amount</div>
                    </div>
                    <Separator />
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-4 p-3 text-sm">
                        <div>{transaction.date}</div>
                        <div className="col-span-2">{transaction.description}</div>
                        <div className={`text-right ${transaction.amount > 0 ? "text-green-500" : "text-red-500"}`}>
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount} coins
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View All Transactions</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="deposit" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowDown className="h-5 w-5 text-primary" />
                    Deposit Funds
                  </CardTitle>
                  <CardDescription>Add virtual currency to your GamerVault account</CardDescription>
                </CardHeader>
                <form onSubmit={handleDeposit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="deposit-amount">Amount (coins)</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="deposit-amount"
                          type="number"
                          placeholder="1000"
                          className="rounded-l-none"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Payment Method</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span>Credit Card</span>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5" />
                            <span>Crypto Wallet</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <div className="text-sm font-medium mb-2">Deposit Summary</div>
                      <div className="flex justify-between text-sm">
                        <span>Amount:</span>
                        <span>{amount || 0} coins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fee:</span>
                        <span>0 coins</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{amount || 0} coins</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={!amount}>
                      Deposit Funds
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ArrowUp className="h-5 w-5 text-primary" />
                    Withdraw Funds
                  </CardTitle>
                  <CardDescription>Withdraw virtual currency from your GamerVault account</CardDescription>
                </CardHeader>
                <form onSubmit={handleWithdraw}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="withdraw-amount">Amount (coins)</Label>
                      <div className="flex">
                        <div className="flex items-center justify-center rounded-l-md border border-r-0 bg-muted px-3">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <Input
                          id="withdraw-amount"
                          type="number"
                          placeholder="1000"
                          className="rounded-l-none"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">Available balance: 12,500 coins</p>
                    </div>

                    <div className="space-y-2">
                      <Label>Withdrawal Method</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            <span>Bank Account</span>
                          </div>
                        </div>
                        <div className="rounded-lg border p-4 cursor-pointer hover:border-primary">
                          <div className="flex items-center gap-2">
                            <Wallet className="h-5 w-5" />
                            <span>Crypto Wallet</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-muted p-4">
                      <div className="text-sm font-medium mb-2">Withdrawal Summary</div>
                      <div className="flex justify-between text-sm">
                        <span>Amount:</span>
                        <span>{amount || 0} coins</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Fee:</span>
                        <span>50 coins</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{amount ? Number.parseInt(amount) - 50 : 0} coins</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="w-full" disabled={!amount || Number.parseInt(amount) > 12500}>
                      Withdraw Funds
                    </Button>
                  </CardFooter>
                </form>
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
