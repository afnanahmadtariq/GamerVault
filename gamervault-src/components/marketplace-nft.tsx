import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

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
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
        <Badge
          className="absolute top-2 right-2"
          variant={rarity === "Legendary" ? "destructive" : rarity === "Epic" ? "default" : "secondary"}
        >
          {rarity}
        </Badge>
      </div>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-lg leading-none">{name}</h3>
            <p className="text-sm text-muted-foreground">{game}</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-bold">{price} coins</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-xs text-muted-foreground">Seller: {seller}</div>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={`/marketplace/${id}`} className="w-full">
          <Button className="w-full">View & Purchase</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
