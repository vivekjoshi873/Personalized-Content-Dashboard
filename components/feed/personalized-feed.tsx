"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useAppSelector } from "@/lib/store"
import { useGetPersonalizedFeedQuery } from "@/lib/services/content-api"
import { ContentCard } from "./content-card"
import { Reorder } from "framer-motion"
import type { ContentItem } from "@/lib/types/content"

export function PersonalizedFeed() {
  const categories = useAppSelector((s) => s.preferences.categories)
  const [page, setPage] = useState(1)
  const pageSize = 12
  const { data, isFetching, isLoading } = useGetPersonalizedFeedQuery({ categories, page, pageSize })
  const [items, setItems] = useState<ContentItem[]>([])
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  // Append pages
  useEffect(() => {
    if (data?.items) {
      setItems((prev) => {
        const existing = new Map(prev.map((i) => [i.id, i]))
        data.items.forEach((i) => existing.set(i.id, i))
        return Array.from(existing.values())
      })
    }
  }, [data])

  // Infinite scroll
  useEffect(() => {
    if (!sentinelRef.current) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && data?.hasMore && !isFetching) {
          setPage((p) => p + 1)
        }
      })
    })
    observer.observe(sentinelRef.current)
    return () => observer.disconnect()
  }, [data?.hasMore, isFetching])

  const grid = useMemo(
    () => (
      <Reorder.Group
        axis="y"
        values={items}
        onReorder={setItems}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <ContentCard item={item} />
          </Reorder.Item>
        ))}
      </Reorder.Group>
    ),
    [items],
  )

  return (
    <div className="space-y-4">
      {grid}
      <div ref={sentinelRef} />
      {(isLoading || isFetching) && <p className="text-center text-sm text-muted-foreground">Loading…</p>}
      {!isLoading && items.length === 0 && <p className="text-center text-sm text-muted-foreground">No content yet.</p>}
    </div>
  )
}
