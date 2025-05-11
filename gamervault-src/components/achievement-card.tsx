import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, Lock, Trophy } from "lucide-react"

interface AchievementCardProps {
  id: string
  name: string
  image: string
  game: string
  points: number
  unlocked?: string
  progress?: number
  description: string
  status: "unlocked" | "locked" | "in-progress"
}

export function AchievementCard({
  id,
  name,
  image,
  game,
  points,
  unlocked,
  progress,
  description,
  status,
}: AchievementCardProps) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
              <img src={image || "/placeholder.svg"} alt={name} className="h-8 w-8" />
            </div>
            <div>
              <h3 className="font-semibold text-base">{name}</h3>
              <p className="text-xs text-muted-foreground">{game}</p>
            </div>
          </div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Trophy className="h-3 w-3" />
            {points} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {status === "unlocked" && (
          <>
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 mr-1" />
              Unlocked {unlocked}
            </div>
            <Progress value={100} className="h-2 w-24" />
          </>
        )}
        {status === "in-progress" && (
          <>
            <div className="flex items-center text-xs text-muted-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              In Progress
            </div>
            <Progress value={progress} className="h-2 w-24" />
          </>
        )}
        {status === "locked" && (
          <>
            <div className="flex items-center text-xs text-muted-foreground">
              <Lock className="h-3 w-3 mr-1" />
              Locked
            </div>
            <Progress value={0} className="h-2 w-24" />
          </>
        )}
      </CardFooter>
    </Card>
  )
}
