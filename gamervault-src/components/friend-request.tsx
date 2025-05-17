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
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={image || "/placeholder-user.jpg"} alt={name} />
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
      <div className="flex gap-2">
        <Button size="sm" variant="outline">
          Ignore
        </Button>
        <Button size="sm">Accept</Button>
      </div>
    </div>
  )
}
