"use client"

import { useAppSelector } from "@/lib/store"
import { ContentCard } from "@/components/feed/content-card"

export function FavoritesSection() {
  const ids = useAppSelector((s) => s.favorites.ids)
  const items = useAppSelector((s) => s.favorites.items)

  if (ids.length === 0) {
    return <p className="text-sm text-muted-foreground">No favorites yet. Add some from your feed!</p>
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {ids.map((id) => (
        <ContentCard key={id} item={items[id]} />
      ))}
    </div>
  )
}
