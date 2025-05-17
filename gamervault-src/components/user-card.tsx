import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { GamepadIcon, Users } from "lucide-react"

interface UserCardProps {
  name: string
  avatar: string
  mutualFriends: number
  level: number
  game: string
}

export function UserCard({ name, avatar, mutualFriends, level, game }: UserCardProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={avatar || "https://source.unsplash.com/random"} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium text-sm">{name}</div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Users className="h-3 w-3" />
            {mutualFriends} mutual friend{mutualFriends !== 1 ? "s" : ""}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <GamepadIcon className="h-3 w-3" />
            Level {level} • {game}
          </div>
        </div>
      </div>
      <Button size="sm">Add</Button>
    </div>
  )
}
