"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface MarketplaceNFTProps {
  id: string;
  name: string;
  image: string;
  game?: string;
  category?: string;
  rarity: string;
  price: number;
  seller?: {
    id: string;
    name: string;
    image?: string;
  };
  onBuy?: (id: string) => Promise<{ success: boolean, error?: any }>;
}

export function MarketplaceNFT({ 
  id, 
  name, 
  image, 
  game, 
  category,
  rarity, 
  price, 
  seller,
  onBuy 
}: MarketplaceNFTProps) {
  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    if (!onBuy) return;
    
    setBuying(true);
    try {
      await onBuy(id);
    } finally {
      setBuying(false);
    }
  };

  return (
    <Card className="overflow-hidden">      <div className="aspect-square relative">
        {image ? (
          <Image
            src={image || `https://source.unsplash.com/random/800x800?${encodeURIComponent(game || 'gaming')},nft,art,collectible`}
            alt={name}
            fill
            className="object-cover transition-all hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="h-full w-full bg-muted flex items-center justify-center text-muted-foreground">
            No Image
          </div>
        )}
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
      </CardHeader>      <CardContent className="p-4 pt-0">
        <div className="text-xs text-muted-foreground">
          {seller ? `Seller: ${seller.name}` : (category ? `Category: ${category}` : game ? `Game: ${game}` : '')}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <Link href={`/marketplace/${id}`} className="w-full">
          <Button className="w-full">View & Purchase</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
