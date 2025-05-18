import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Users } from "lucide-react"

interface FriendRequestProps {
  name: string
  image: string // Changed from avatar to image for consistency
  mutualFriends: number
}

export function FriendRequest({ name, image, mutualFriends }: FriendRequestProps) {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={image || 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHZpZGVvJTIwZ2FtZXN8ZW58MHx8MHx8fDA%3D'} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            {mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-shrink-0">
        <Button size="sm" variant="outline">
          Ignore
        </Button>
        <Button size="sm">Accept</Button>
      </div>
    </div>
  )
}
