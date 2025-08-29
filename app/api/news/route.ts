import type { NewsArticle, PagedResponse } from "@/lib/types/content"
import type { NextRequest } from "next/server"

const NEWSAPI_URL = "https://newsapi.org/v2/top-headlines"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || "1")
  const pageSize = Number(url.searchParams.get("pageSize") || "12")
  const trending = url.searchParams.get("trending") === "1"
  const apiKey = "5f3d30ec458a4dd49f735ecf1b29a527"

  if (!apiKey) {
    return Response.json(
      { items: [], page: 1, pageSize, hasMore: false, error: "Missing NEWSAPI_KEY" },
      { status: 200 },
    )
  }

  const categories = ["technology", "sports", "business", "science", "health", "entertainment"]
  const category = trending ? "general" : categories[(page - 1) % categories.length]

  const qs = new URLSearchParams({
    apiKey,
    page: String(page),
    pageSize: String(pageSize),
    country: "us",
    category,
  })
  const resp = await fetch(`${NEWSAPI_URL}?${qs.toString()}`)
  const data = await resp.json()

  const items: NewsArticle[] =
    (data.articles || []).map((a: any, idx: number) => ({
      id: `${a.url || a.title}-${idx}`,
      type: "news",
      title: a.title,
      description: a.description,
      url: a.url,
      imageUrl: a.urlToImage || undefined,
      source: a.source?.name,
      publishedAt: a.publishedAt,
    })) ?? []

  const payload: PagedResponse<NewsArticle> = {
    items,
    page,
    pageSize,
    hasMore: items.length === pageSize,
  }
  return Response.json(payload)
}
