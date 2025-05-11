"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { GamepadIcon as GameController, ImagePlus, LogOut, Paintbrush, Upload } from "lucide-react"
import { Slider } from "@/components/ui/slider"
import { LanguageSelector } from "@/components/language-selector"

export default function CreatePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    game: "",
    rarity: "Rare",
    price: 1000,
    contentType: "skin",
  })

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn")
    if (!isLoggedIn) {
      router.push("/auth/login?redirect=/create")
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePriceChange = (value: number[]) => {
    setFormData((prev) => ({ ...prev, price: value[0] }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, this would upload to a server
      // For this demo, we'll create a local object URL
      const imageUrl = URL.createObjectURL(file)
      setPreviewImage(imageUrl)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate submission delay
    setTimeout(() => {
      // In a real app, this would submit to a server
      alert("Your NFT has been submitted for review!")
      setIsSubmitting(false)
      router.push("/dashboard")
    }, 1500)
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
            <Link href="/create" className="text-sm font-medium text-primary">
              Create
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
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
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
            <h1 className="text-3xl font-bold tracking-tight">Create Content</h1>
          </div>

          <Tabs defaultValue="nft">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nft">NFT Item</TabsTrigger>
              <TabsTrigger value="skin">Game Skin</TabsTrigger>
              <TabsTrigger value="map">Game Map</TabsTrigger>
            </TabsList>

            <TabsContent value="nft" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create an NFT Item</CardTitle>
                  <CardDescription>Design a unique in-game item that can be traded on the marketplace.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Item Name</Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Legendary Sword"
                            value={formData.name}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="game">Game</Label>
                          <Select value={formData.game} onValueChange={(value) => handleSelectChange("game", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a game" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Epic Quest">Epic Quest</SelectItem>
                              <SelectItem value="Dragon Riders">Dragon Riders</SelectItem>
                              <SelectItem value="Wizard Wars">Wizard Wars</SelectItem>
                              <SelectItem value="Shadow Assassin">Shadow Assassin</SelectItem>
                              <SelectItem value="Racing Legends">Racing Legends</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="rarity">Rarity</Label>
                          <Select
                            value={formData.rarity}
                            onValueChange={(value) => handleSelectChange("rarity", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select rarity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Common">Common</SelectItem>
                              <SelectItem value="Uncommon">Uncommon</SelectItem>
                              <SelectItem value="Rare">Rare</SelectItem>
                              <SelectItem value="Epic">Epic</SelectItem>
                              <SelectItem value="Legendary">Legendary</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor="price">Price (coins)</Label>
                            <span className="text-sm text-muted-foreground">{formData.price} coins</span>
                          </div>
                          <Slider
                            id="price"
                            defaultValue={[1000]}
                            max={5000}
                            step={50}
                            value={[formData.price]}
                            onValueChange={handlePriceChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe your item and its attributes..."
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Item Image</Label>
                        <div className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center h-[300px]">
                          {previewImage ? (
                            <div className="relative w-full h-full">
                              <img
                                src={previewImage || "/placeholder.svg"}
                                alt="Preview"
                                className="w-full h-full object-contain"
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="absolute bottom-2 right-2"
                                onClick={() => setPreviewImage(null)}
                              >
                                Change
                              </Button>
                            </div>
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full w-full">
                              <ImagePlus className="h-10 w-10 text-muted-foreground mb-4" />
                              <p className="text-sm text-muted-foreground mb-2">
                                Drag and drop an image, or click to browse
                              </p>
                              <p className="text-xs text-muted-foreground mb-4">PNG, JPG or GIF, max 5MB</p>
                              <Button type="button" variant="outline" asChild>
                                <label>
                                  <input
                                    type="file"
                                    className="sr-only"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                  />
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Image
                                </label>
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="rounded-lg border p-4 space-y-4">
                          <h3 className="font-medium">Submission Guidelines</h3>
                          <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• All submissions are reviewed by our team</li>
                            <li>• Content must be original or properly licensed</li>
                            <li>• No offensive or inappropriate content</li>
                            <li>• Review process takes 1-3 business days</li>
                            <li>• You'll earn 80% of each sale</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button type="button" variant="outline" onClick={() => router.back()}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.name || !formData.description || !formData.game}
                    >
                      {isSubmitting ? "Submitting..." : "Submit for Review"}
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="skin" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Game Skin</CardTitle>
                  <CardDescription>Design a custom skin for characters or items in supported games.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <Paintbrush className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Skin Creator Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Our advanced skin creation tool is currently in development. You'll soon be able to design and
                    customize game skins directly in your browser.
                  </p>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="map" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Create a Game Map</CardTitle>
                  <CardDescription>Design custom maps and levels for supported games.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <GameController className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Map Creator Coming Soon</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Our map creation tool is currently in development. You'll soon be able to design custom game maps
                    with an intuitive editor.
                  </p>
                  <Button variant="outline" onClick={() => router.push("/dashboard")}>
                    Back to Dashboard
                  </Button>
                </CardContent>
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
