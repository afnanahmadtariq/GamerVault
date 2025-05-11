import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Award, GamepadIcon, ShoppingBag, Trophy } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: 1,
      type: "achievement",
      title: "Dragon Slayer Achievement",
      description: "You defeated the mighty dragon in Epic Quest",
      time: "2 days ago",
      icon: <Trophy className="h-5 w-5 text-primary" />,
    },
    {
      id: 2,
      type: "game",
      title: "Level Up!",
      description: "You reached level 42 in Wizard Wars",
      time: "5 days ago",
      icon: <GamepadIcon className="h-5 w-5 text-primary" />,
    },
    {
      id: 3,
      type: "purchase",
      title: "NFT Purchased",
      description: "You acquired the Legendary Sword NFT",
      time: "1 week ago",
      icon: <ShoppingBag className="h-5 w-5 text-primary" />,
    },
    {
      id: 4,
      type: "friend",
      title: "New Friend",
      description: "You are now friends with DragonLord",
      time: "1 week ago",
      icon: (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32&text=DL" alt="DragonLord" />
          <AvatarFallback>DL</AvatarFallback>
        </Avatar>
      ),
    },
    {
      id: 5,
      type: "achievement",
      title: "Master Wizard Achievement",
      description: "You cast 1000 spells successfully in Wizard Wars",
      time: "2 weeks ago",
      icon: <Award className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="space-y-6">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">{activity.icon}</div>
          <div className="space-y-1">
            <p className="text-sm font-medium">{activity.title}</p>
            <p className="text-xs text-muted-foreground">{activity.description}</p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
