// Search results page using global query ?q=...

"use client"

import ReduxProvider from "@/components/providers/redux-provider"
import { Sidebar } from "@/components/layout/sidebar"
import { Topbar } from "@/components/layout/topbar"
import { useSearchParams } from "next/navigation"
import { useSearchAllQuery } from "@/lib/services/content-api"
import { ContentCard } from "@/components/feed/content-card"

export default function SearchPage() {
  return (
    <ReduxProvider>
      <div className="flex min-h-dvh">
        <Sidebar />
        <main className="flex-1">
          <Topbar />
          <div className="mx-auto max-w-7xl p-4">
            <SearchResults />
          </div>
        </main>
      </div>
    </ReduxProvider>
  )
}

function SearchResults() {
  const params = useSearchParams()
  const q = params.get("q") || ""
  const { data, isLoading } = useSearchAllQuery({ q, page: 1, pageSize: 24 }, { skip: !q })

  if (!q) {
    return <p className="text-sm text-muted-foreground">Type in the search bar to find content.</p>
  }
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Searching…</p>
  }
  if (!data || data.items.length === 0) {
    return <p className="text-sm text-muted-foreground">No results for “{q}”.</p>
  }

  return (
    <>
      <h2 className="mb-4 text-lg font-semibold">Results for “{q}”</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.items.map((i) => (
          <ContentCard key={i.id} item={i} />
        ))}
      </div>
    </>
  )
}
