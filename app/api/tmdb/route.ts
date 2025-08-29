// TMDB proxy (requires TMDB_API_KEY) - falls back to mock if missing

import type { Movie, PagedResponse } from "@/lib/types/content"
import type { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const page = Number(url.searchParams.get("page") || "1")
  const pageSize = Number(url.searchParams.get("pageSize") || "12")
  const trending = url.searchParams.get("trending") === "1"
  const apiKey = process.env.TMDB_API_KEY

  if (!apiKey) {
    // Mock data when TMDB not available
    const items: Movie[] = Array.from({ length: pageSize }).map((_, i) => ({
      id: `mock-movie-${page}-${i}`,
      type: "movie",
      title: `Mock Movie ${page}-${i}`,
      overview: "An example movie overview to demonstrate layout.",
      url: "#",
      imageUrl: `/placeholder.svg?height=360&width=640&query=movie+poster`,
      source: "mock",
      releasedAt: "2024-01-01",
    }))
    const payload: PagedResponse<Movie> = { items, page, pageSize, hasMore: page < 3 }
    return Response.json(payload)
  }

  const endpoint = trending ? "trending/movie/day" : "movie/popular"
  const resp = await fetch(`https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&page=${page}`)
  const data = await resp.json()
  const baseImage = "https://image.tmdb.org/t/p/w780"

  const items: Movie[] = (data.results || []).slice(0, pageSize).map((m: any) => ({
    id: String(m.id),
    type: "movie",
    title: m.title,
    overview: m.overview,
    url: `https://www.themoviedb.org/movie/${m.id}`,
    imageUrl: m.backdrop_path ? `${baseImage}${m.backdrop_path}` : undefined,
    source: "tmdb",
    releasedAt: m.release_date,
  }))

  const payload: PagedResponse<Movie> = {
    items,
    page,
    pageSize,
    hasMore: (data.page || 1) < (data.total_pages || 1),
  }
  return Response.json(payload)
}
