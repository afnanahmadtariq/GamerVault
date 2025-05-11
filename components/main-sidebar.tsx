"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LanguageSelector } from "@/components/language-selector"
import {
  LayoutDashboard,
  ShoppingBag,
  Trophy,
  Backpack,
  Users,
  Settings,
  Wallet,
  BarChart3,
  Shield,
  LogOut,
  Award,
  Plus,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function MainSidebar() {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  const navigation = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Marketplace",
      href: "/marketplace",
      icon: ShoppingBag,
    },
    {
      name: "Achievements",
      href: "/achievements",
      icon: Trophy,
    },
    {
      name: "Inventory",
      href: "/inventory",
      icon: Backpack,
    },
    {
      name: "Social",
      href: "/social",
      icon: Users,
    },
    {
      name: "Wallet",
      href: "/wallet",
      icon: Wallet,
    },
    {
      name: "Leaderboard",
      href: "/leaderboard",
      icon: Award,
    },
    {
      name: "Analytics",
      href: "/analytics",
      icon: BarChart3,
    },
    {
      name: "Security",
      href: "/security",
      icon: Shield,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center justify-between px-2 py-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">GV</div>
            </div>
            <span className="text-xl font-bold">GamerVault</span>
          </Link>
          {!isMobile && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Plus className="h-4 w-4" />
              <span className="sr-only">Create</span>
            </Button>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarMenu>
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild isActive={isActive} tooltip={item.name}>
                  <Link href={item.href}>
                    <item.icon className={cn("h-5 w-5")} />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="px-2 py-3">
          <div className="mb-2 px-3">
            <LanguageSelector />
          </div>
          <div className="flex items-center justify-between px-3">
            <div className="flex items-center">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>GV</AvatarFallback>
              </Avatar>
              <div className="ml-2">
                <p className="text-sm font-medium">Player One</p>
                <p className="text-xs text-muted-foreground">Level 42</p>
              </div>
            </div>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
