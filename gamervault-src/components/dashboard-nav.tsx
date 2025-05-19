import * as React from 'react';

import Link from "next/link"
import {
  Award,
  BarChart3,
  CreditCard,
  GamepadIcon as GameController,
  Home,
  Settings,
  Trophy,
  Wallet,
} from "lucide-react"

export function DashboardNav() {
  return (
    <nav className="grid items-start gap-2">
      <Link
        href="/dashboard"
        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
      >
        <Home className="h-4 w-4" />
        Dashboard
      </Link>
      <Link
        href="/profile"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <GameController className="h-4 w-4" />
        Profile
      </Link>
      <Link
        href="/collection"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Wallet className="h-4 w-4" />
        Collection
      </Link>
      <Link
        href="/achievements"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Trophy className="h-4 w-4" />
        Achievements
      </Link>
      <Link
        href="/nfts"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Award className="h-4 w-4" />
        NFTs
      </Link>
      <Link
        href="/leaderboard"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <BarChart3 className="h-4 w-4" />
        Leaderboard
      </Link>
      <Link
        href="/rewards"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Award className="h-4 w-4" />
        Rewards
      </Link>
      <Link
        href="/billing"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <CreditCard className="h-4 w-4" />
        Billing
      </Link>
      <Link
        href="/settings"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Settings className="h-4 w-4" />
        Settings
      </Link>
    </nav>
  )
}
