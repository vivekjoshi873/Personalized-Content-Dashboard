"use client"

import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useAppDispatch } from "@/lib/store"
import { toggleFavorite } from "@/lib/slices/favorites-slice"
import type { ContentItem } from "@/lib/types/content"

export function ContentCard({ item }: { item: ContentItem }) {
  const dispatch = useAppDispatch()
  const kind = item.type === "news" ? "News" : item.type === "movie" ? "Movie" : (item.platform ?? "Social")

  const title = item.type === "social" ? `${item.author}` : item.title
  const desc = item.type === "news" ? item.description : item.type === "movie" ? item.overview : item.text

  const href = (item as any).url ?? "#"

  return (
    <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="flex h-full flex-col overflow-hidden">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <Badge variant="secondary">{kind}</Badge>
          {item.publishedAt || (item as any).releasedAt ? (
            <span className="text-xs text-muted-foreground">
              {(item as any).publishedAt || (item as any).releasedAt}
            </span>
          ) : null}
        </CardHeader>
        {item.imageUrl ? (
          <div className="relative aspect-video w-full">
            <Image
              alt={title}
              src={item.imageUrl || "/placeholder.svg?height=360&width=640&query=content+image"}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className="aspect-video w-full bg-muted" aria-hidden />
        )}
        <CardContent className="space-y-1 pt-4">
          <h3 className="line-clamp-2 text-base font-semibold text-pretty">{title}</h3>
          {desc ? <p className="line-clamp-3 text-sm text-muted-foreground">{desc}</p> : null}
        </CardContent>
        <CardFooter className="mt-auto flex items-center justify-between">
          <Button asChild size="sm" variant="default">
            <a href={href} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
          </Button>
          <Button size="sm" variant="outline" onClick={() => dispatch(toggleFavorite(item))}>
            Favorite
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
