import * as React from 'react';

import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

interface RecentAchievementProps {
  name: string
  game: string
  description: string
  date: string
  image: string
  points: number
}

export function RecentAchievement({ name, game, description, date, image, points }: RecentAchievementProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image || 'https://www.freepik.com/free-photos-vectors/graduation-background'} alt={name} className="h-full w-full object-cover" />
        ) : (
          <Trophy className="h-5 w-5 text-primary" />
        )}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div className="font-medium">{name}</div>
          <Badge variant="secondary">{points} pts</Badge>
        </div>
        <div className="text-sm text-muted-foreground">{game}</div>
        <div className="text-sm">{description}</div>
        <div className="text-xs text-muted-foreground">{date}</div>
      </div>
    </div>
  )
}
