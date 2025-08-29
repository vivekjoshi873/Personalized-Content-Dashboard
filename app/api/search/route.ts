
import type { NextRequest } from "next/server"
import type { ContentItem, PagedResponse } from "@/lib/types/content"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const q = (url.searchParams.get("q") || "").toLowerCase()
  const page = Number(url.searchParams.get("page") || "1")
  const pageSize = Number(url.searchParams.get("pageSize") || "12")

  const [news, movies, social] = await Promise.all([
    fetch(`${url.origin}/api/news`).then((r) => r.json()),
    fetch(`${url.origin}/api/tmdb`).then((r) => r.json()),
    fetch(`${url.origin}/api/social`).then((r) => r.json()),
  ])

  const merged: ContentItem[] = [...(news.items || []), ...(movies.items || []), ...(social.items || [])]
  const filtered = q
    ? merged.filter((i) => {
        const hay = JSON.stringify(i).toLowerCase()
        return hay.includes(q)
      })
    : merged

  const start = (page - 1) * pageSize
  const end = start + pageSize
  const items = filtered.slice(start, end)
  const payload: PagedResponse<ContentItem> = {
    items,
    page,
    pageSize,
    hasMore: end < filtered.length,
  }
  return Response.json(payload)
}
