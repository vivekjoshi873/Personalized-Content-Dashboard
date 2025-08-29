// Content domain types and unified item model

export type NewsArticle = {
  id: string
  title: string
  description?: string
  url: string
  imageUrl?: string
  source?: string
  publishedAt?: string
  type: "news"
}

export type Movie = {
  id: string
  title: string
  overview?: string
  url: string
  imageUrl?: string
  source?: string
  releasedAt?: string
  type: "movie"
}

export type SocialPost = {
  id: string
  author: string
  handle?: string
  text: string
  url?: string
  imageUrl?: string
  platform: "twitter" | "instagram" | "mock"
  publishedAt?: string
  type: "social"
}

export type ContentItem = NewsArticle | Movie | SocialPost

export type Category = "technology" | "sports" | "finance" | "movies" | "music" | "social"

export type PagedResponse<T> = {
  items: T[]
  page: number
  pageSize: number
  hasMore: boolean
}
