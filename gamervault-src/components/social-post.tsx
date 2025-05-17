"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Heart, MessageCircle, MoreHorizontal, Share2, ShieldCheck } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SocialPostProps {
  author: {
    name: string
    image: string // Changed from avatar to image for consistency
    verified?: boolean
  }
  content: string
  postImage: string | null // Changed from image to postImage to avoid confusion with author.image
  timestamp: string
  likes: number
  comments: number
  shares: number
  liked: boolean
}

export function SocialPost({  author,
  content,
  postImage,
  timestamp,
  likes,
  comments,
  shares,
  liked: initialLiked,
}: SocialPostProps) {
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  return (
    <Card>
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">          <div className="flex items-start gap-3">            <Avatar>
              <AvatarImage src={author.image || `https://source.unsplash.com/random/100x100?face,profile`} alt={author.name} />
              <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-medium">{author.name}</span>
                {author.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
              </div>
              <p className="text-xs text-muted-foreground">{timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">More options</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-4">        <p>{content}</p>        {postImage && (
          <div className="rounded-md overflow-hidden">
            <img src={postImage || "https://source.unsplash.com/random/1200x800?gaming,esports,technology"} alt="Post content" className="w-full h-auto" />
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col">
        <div className="flex items-center justify-between w-full text-sm text-muted-foreground mb-2">
          <span>{likeCount} likes</span>
          <div className="flex items-center gap-4">
            <span>{comments} comments</span>
            <span>{shares} shares</span>
          </div>
        </div>

        <Separator className="mb-2" />

        <div className="flex items-center justify-between w-full">
          <Button variant="ghost" size="sm" className="gap-2" onClick={handleLike}>
            <Heart className={`h-4 w-4 ${liked ? "fill-primary text-primary" : ""}`} />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
