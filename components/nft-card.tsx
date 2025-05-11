import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Eye } from "lucide-react"

interface NFTCardProps {
  id: string
  name: string
  image: string
  game: string
  rarity: string
  acquired: string
}

export function NFTCard({ id, name, image, game, rarity, acquired }: NFTCardProps) {
  // Map rarity to color
  const rarityColor =
    {
      Common: "bg-gray-500",
      Uncommon: "bg-green-500",
      Rare: "bg-blue-500",
      Epic: "bg-purple-500",
      Legendary: "bg-yellow-500",
    }[rarity] || "bg-gray-500"

  // Format date
  const formattedDate = new Date(acquired).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="aspect-square relative">
        <img src={image || "/placeholder.svg"} alt={name} className="h-full w-full object-cover" />
        <div className="absolute top-2 right-2">
          <Badge variant="secondary" className="font-medium">
            {game}
          </Badge>
        </div>
        <div className="absolute bottom-2 left-2">
          <Badge className={`${rarityColor} text-white`}>{rarity}</Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm text-muted-foreground">Acquired {formattedDate}</p>
      </CardHeader>
      <CardContent className="p-4 pt-2 flex-grow">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">In Your Collection</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full">
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}
