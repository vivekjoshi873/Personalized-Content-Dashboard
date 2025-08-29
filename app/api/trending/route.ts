// Trending endpoint: composes trending news and movies

import type { ContentItem, PagedResponse } from "@/lib/types/content"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || "1")
  const pageSize = Number(url.searchParams.get("pageSize") || "12")

  const [news, movies] = await Promise.all([
    fetch(`${url.origin}/api/news?trending=1&page=${page}&pageSize=${pageSize}`).then((r) => r.json()),
    fetch(`${url.origin}/api/tmdb?trending=1&page=${page}&pageSize=${pageSize}`).then((r) => r.json()),
  ])

  const merged: ContentItem[] = [...(news.items || []), ...(movies.items || [])]
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = merged.slice(start, end)

  const payload: PagedResponse<ContentItem> = {
    items,
    page,
    pageSize,
    hasMore: end < merged.length,
  }
  return Response.json(payload)
}
