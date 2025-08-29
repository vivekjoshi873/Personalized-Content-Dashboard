import type { PagedResponse, SocialPost } from "@/lib/types/content"
import type { NextRequest } from "next/server"

const AUTHORS = ["Alex Kim", "Jordan Lee", "Sam Patel", "Taylor Ortiz"]

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || "1")
  const pageSize = Number(url.searchParams.get("pageSize") || "12")
  const hashtag = url.searchParams.get("hashtag") || "news"

  const items: SocialPost[] = Array.from({ length: pageSize }).map((_, i) => ({
    id: `mock-social-${hashtag}-${page}-${i}`,
    type: "social",
    author: AUTHORS[i % AUTHORS.length],
    handle: `@${hashtag}_${i}`,
    text: `Trending #${hashtag} update ${page}-${i}. This is a mock post for layout and search.`,
    url: "#",
    imageUrl:
      i % 2 === 0 ? `/placeholder.svg?height=360&width=640&query=${encodeURIComponent("social post")}` : undefined,
    platform: i % 3 === 0 ? "twitter" : i % 3 === 1 ? "instagram" : "mock",
    publishedAt: "2025-01-01",
  }))

  const payload: PagedResponse<SocialPost> = {
    items,
    page,
    pageSize,
    hasMore: page < 5,
  }
  return Response.json(payload)
}
