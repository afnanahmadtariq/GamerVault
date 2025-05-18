import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GamepadIcon, Users } from "lucide-react"

interface UserCardProps {
  name: string
  image: string // Changed from avatar to image for consistency
  mutualFriends: number
  level: number
  game: string
}

export function UserCard({ name, image, mutualFriends, level, game }: UserCardProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={image || 'https://plus.unsplash.com/premium_photo-1677870728110-3b3b41677a9b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dmlkZW8lMjBnYW1lc3xlbnwwfHwwfHx8MA%3D%3D'} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="font-medium text-sm truncate">{name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">{mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}</span>
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <GamepadIcon className="h-3 w-3 flex-shrink-0" />
            <span className="truncate">Level {level} • {game}</span>
          </div>
        </div>
      </div>
      <Button size="sm" className="flex-shrink-0">Add</Button>
    </div>
  )
}
