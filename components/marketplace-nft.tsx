import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Check, ShoppingCart } from "lucide-react"

interface MarketplaceNFTProps {
  id: string
  name: string
  image: string
  game: string
  rarity: string
  price: number
  seller: string
}

export function MarketplaceNFT({ id, name, image, game, rarity, price, seller }: MarketplaceNFTProps) {
  // Map rarity to color
  const rarityColor =
    {
      Common: "bg-gray-500",
      Uncommon: "bg-green-500",
      Rare: "bg-blue-500",
      Epic: "bg-purple-500",
      Legendary: "bg-yellow-500",
    }[rarity] || "bg-gray-500"

  return (
    <Card className="overflow-hidden">
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
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="font-bold text-lg">{price}</div>
        </div>
        <p className="text-sm text-muted-foreground">
          Sold by <span className="font-medium">{seller}</span>
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-muted-foreground">Available Now</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button className="w-full" size="sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy Now
        </Button>
        <Button variant="outline" size="sm" className="w-full">
          <Check className="mr-2 h-4 w-4" />
          Make Offer
        </Button>
      </CardFooter>
    </Card>
  )
}
