"use client"

import { useGetTrendingQuery } from "@/lib/services/content-api"
import { ContentCard } from "@/components/feed/content-card"

export function TrendingSection() {
  const { data, isLoading } = useGetTrendingQuery({ page: 1, pageSize: 12 })

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Trending</h2>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data?.items.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
