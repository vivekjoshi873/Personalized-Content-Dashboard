// Aggregated personalized feed endpoint: merges news + movies + social based on categories

import type { NextRequest } from "next/server"
import type { ContentItem, PagedResponse } from "@/lib/types/content"

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const categories = searchParams.getAll("category")
  const page = Number(searchParams.get("page") || "1")
  const pageSize = Number(searchParams.get("pageSize") || "12")

  // Fan out to sources based on categories
  const wantsNews = categories.some((c) => ["technology", "sports", "finance"].includes(c))
  const wantsMovies = categories.includes("movies")
  const wantsSocial = categories.some((c) => ["social", "music"].includes(c))

  const [news, movies, social] = await Promise.all([
    wantsNews
      ? fetch(`${req.nextUrl.origin}/api/news?page=${page}&pageSize=${pageSize}`).then((r) => r.json())
      : { items: [] },
    wantsMovies
      ? fetch(`${req.nextUrl.origin}/api/tmdb?page=${page}&pageSize=${pageSize}`).then((r) => r.json())
      : { items: [] },
    wantsSocial
      ? fetch(`${req.nextUrl.origin}/api/social?page=${page}&pageSize=${pageSize}`).then((r) => r.json())
      : { items: [] },
  ])

  const merged: ContentItem[] = [...(news.items || []), ...(movies.items || []), ...(social.items || [])]

  // Simple slice pagination on merged list for demo purposes
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const paged = merged.slice(start, end)
  const hasMore = end < merged.length

  const payload: PagedResponse<ContentItem> = {
    items: paged,
    page,
    pageSize,
    hasMore,
  }

  return Response.json(payload)
}
