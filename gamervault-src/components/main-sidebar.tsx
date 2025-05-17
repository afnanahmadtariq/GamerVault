"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { useAuth } from "@/hooks/use-auth"
import { toast } from "sonner"

export function MainSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  // Default user data with actual auth data
  const userData = {
    name: user?.name || "Player One",
    email: user?.email || "player@example.com",
    image: user?.image || "https://source.unsplash.com/QXevDflbl8A/40x40", // Use image instead of avatar for consistency
    level: 42,
    notifications: 3,
  }
  const handleLogout = async () => {
    try {
      const result = await logout()
      if (result.success) {
        toast.success("Logged out successfully")
        router.push("/auth/login")
      } else {
        toast.error("Failed to logout")
      }
    } catch (error) {
      toast.error("Failed to logout")
      console.error("Logout error:", error)
    }
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
        <div className="px-4 py-2">          <div className="flex items-center gap-3 mb-6 mt-2">
            <Avatar>
              <AvatarImage src={userData.image || "https://source.unsplash.com/iFgRcqHznqg/40x40"} alt={userData.name} />
              <AvatarFallback>{userData.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{userData.name}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  Level {userData.level}
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
            {userData.notifications > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                {userData.notifications}
              </span>
            )}
          </Button>
          <Button variant="outline" size="icon">
            <Award className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
