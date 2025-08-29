"use client"

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { ContentItem, PagedResponse } from "../types/content"

export type FeedParams = {
  categories: string[]
  page?: number
  pageSize?: number
}

export const contentApi = createApi({
  reducerPath: "contentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Feed", "Trending", "Search"],
  endpoints: (builder) => ({
    getPersonalizedFeed: builder.query<PagedResponse<ContentItem>, FeedParams>({
      query: ({ categories, page = 1, pageSize = 12 }) => {
        const qs = new URLSearchParams({
          page: String(page),
          pageSize: String(pageSize),
        })
        categories.forEach((c) => qs.append("category", c))
        return `/feed?${qs.toString()}`
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "Feed" as const, id })),
              { type: "Feed" as const, id: "PARTIAL-LIST" },
            ]
          : [{ type: "Feed" as const, id: "PARTIAL-LIST" }],
    }),
    getTrending: builder.query<PagedResponse<ContentItem>, { page?: number; pageSize?: number }>({
      query: ({ page = 1, pageSize = 12 } = {}) => `/trending?page=${page}&pageSize=${pageSize}`,
      providesTags: [{ type: "Trending", id: "LIST" }],
    }),
    searchAll: builder.query<PagedResponse<ContentItem>, { q: string; page?: number; pageSize?: number }>({
      query: ({ q, page = 1, pageSize = 12 }) => `/search?q=${encodeURIComponent(q)}&page=${page}&pageSize=${pageSize}`,
      providesTags: (_r, _e, arg) => [{ type: "Search", id: arg.q }],
    }),
  }),
})

export const {
  useGetPersonalizedFeedQuery,
  useLazyGetPersonalizedFeedQuery,
  useGetTrendingQuery,
  useLazySearchAllQuery,
  useSearchAllQuery,
} = contentApi
