"use client";

import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Calendar, ExternalLink } from "lucide-react";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  game: string;
  rarity: string;
  acquired: string;
}

export function NFTCard({ id, name, image, game, rarity, acquired }: NFTCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        {image ? (
          <Image
            src={image}
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
          <div className="flex items-center text-xs text-muted-foreground">
            <Calendar className="h-3 w-3 mr-1" />
            {acquired}
          </div>
        </div>
      </CardHeader>
      <CardFooter className="p-4 pt-0">
        <Link href={`/inventory/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            <ExternalLink className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
