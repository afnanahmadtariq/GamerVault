"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Award, BarChart3, Bell, GamepadIcon, LogOut, Settings, ShoppingBag, Trophy, Users, Wallet } from "lucide-react"

export function MainSidebar() {
  const pathname = usePathname()

  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "Player One",
    email: "player@example.com",
    avatar: "/placeholder.svg?height=40&width=40&text=P1",
    level: 42,
    notifications: 3,
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b pb-0">
        <div className="flex items-center gap-2 px-4 py-3">
          <GamepadIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">GamerVault</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 mb-6 mt-2">
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>P1</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{user.name}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Level {user.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Pro Gamer
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <BarChart3 className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/marketplace"}>
              <Link href="/marketplace">
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/achievements"}>
              <Link href="/achievements">
                <Trophy className="h-4 w-4" />
                <span>Achievements</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/inventory"}>
              <Link href="/inventory">
                <Wallet className="h-4 w-4" />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/social"}>
              <Link href="/social">
                <Users className="h-4 w-4" />
                <span>Social</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/settings"}>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t">
        <div className="flex items-center justify-between p-4">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {user.notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {user.notifications}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Award className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
