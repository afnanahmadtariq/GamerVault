import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Eye, Lock, Trophy } from "lucide-react"

interface AchievementCardProps {
  id: string
  name: string
  image: string
  game: string
  points: number
  description: string
  status: "locked" | "unlocked" | "in-progress"
  unlocked?: string
  progress?: number
}

export function AchievementCard({
  id,
  name,
  image,
  game,
  points,
  description,
  status,
  unlocked,
  progress = 0,
}: AchievementCardProps) {
  // Format date if provided
  const formattedDate = unlocked
    ? new Date(unlocked).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-4 pb-0 flex flex-row items-center gap-4">
        <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
          {status === "locked" ? (
            <Lock className="h-8 w-8 text-muted-foreground" />
          ) : (
            <img src={image || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
          )}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-lg">{name}</h3>
            <Badge variant="outline" className="font-medium">
              {points} pts
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{game}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-sm mb-2">{description}</p>
        {status === "in-progress" && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        {status === "unlocked" && formattedDate && (
          <div className="flex items-center gap-2 mt-2">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="text-xs">Unlocked on {formattedDate}</span>
          </div>
        )}
        {status === "locked" && (
          <div className="flex items-center gap-2 mt-2">
            <Lock className="h-4 w-4 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">Achievement locked</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>

\
